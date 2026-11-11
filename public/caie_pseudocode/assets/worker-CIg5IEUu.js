const e=`/home/pyodide/files`;let t=null,n=null,r=`none`,i=``,a=null,o=0,s=0,c=!1,l=``,u=0;const d=new TextDecoder,f=new TextDecoder;function p(e){self.postMessage(e)}function m(){l&&=(p({type:`STDOUT`,runId:o,text:l}),``),u=performance.now()}function h(e){return l+=d.decode(e,{stream:!0}),(l.length>16384||performance.now()-u>40)&&m(),e.length}function g(e){return m(),p({type:`STDERR`,runId:o,text:f.decode(e,{stream:!0})}),e.length}function _(){throw c=!0,Error(`PSEUDO_RUN_CANCELLED`)}function v(){if(m(),c&&_(),r===`none`)throw Error(`INPUT is not available: reload the page once so the input helper can start.`);let e=`${o}-${++s}-${Math.random().toString(36).slice(2,10)}`;if(r===`sab`&&a){for(Atomics.store(a.control,0,0),p({type:`INPUT_REQUEST`,runId:o,requestId:e});Atomics.wait(a.control,0,0,3e4)===`timed-out`;);let t=Atomics.load(a.control,1);t<0&&_();let n=new Uint8Array(t);return n.set(a.data.subarray(0,t)),new TextDecoder().decode(n)+`
`}for(p({type:`INPUT_REQUEST`,runId:o,requestId:e});;){let t=new XMLHttpRequest;if(t.open(`GET`,`${i}?id=${encodeURIComponent(e)}`,!1),t.send(),t.status!==200)throw Error(`INPUT failed (HTTP ${t.status}). Reload the page and try again.`);let n=JSON.parse(t.responseText);if(!n.retry)return(n.text===null||n.text===void 0)&&_(),n.text+`
`}}function y(){try{let e=new XMLHttpRequest;return e.open(`GET`,`${i}?id=ping`,!1),e.send(),e.status===200&&JSON.parse(e.responseText).ok===!0}catch{return!1}}async function b(n){if(i=n.inputURL,n.sab){let e=n.sab;a={control:new Int32Array(e.control),data:new Uint8Array(e.data),interrupt:new Uint8Array(e.interrupt)},r=`sab`}else r=y()?`sw`:`none`;p({type:`LOADING`,message:`Loading Python (Pyodide)…`});let o=await(await import(
/* @vite-ignore */
new URL(`pyodide.mjs`,n.indexURL).href)).loadPyodide({indexURL:n.indexURL});o.setStdout({write:h}),o.setStderr({write:g}),o.setStdin({stdin:v}),a&&o.setInterruptBuffer(a.interrupt),o.FS.mkdirTree(`/home/pyodide/pseudo`),o.FS.mkdirTree(e),o.FS.writeFile(`/home/pyodide/pseudo/pseudo_driver.py`,`"""Runs one generated program and reports the result as JSON.

The program is ordinary Python. This driver only:
  * puts the user's files into a working folder and collects them afterwards,
  * runs the code in a fresh namespace,
  * turns Python errors into messages about the pseudocode line.
It is used by the browser worker (Pyodide) and by the tests (CPython).
"""
import base64
import json
import os
import re
import shutil
import sys
import traceback
import types


def _prepare_folder(workdir, files):
    if os.path.isdir(workdir):
        shutil.rmtree(workdir)
    os.makedirs(workdir)
    for name, entry in files.items():
        if "/" in name or "\\\\" in name or name in (".", ".."):
            continue
        path = os.path.join(workdir, name)
        if entry.get("type") == "binary":
            with open(path, "wb") as fh:
                fh.write(base64.b64decode(entry.get("base64", "")))
        else:
            content = entry.get("content", "")
            with open(path, "w", encoding="utf-8", newline="\\n") as fh:
                fh.write(content + ("\\n" if content and not content.endswith("\\n") else ""))


def _collect_folder(workdir):
    out = {}
    if not os.path.isdir(workdir):
        return out
    for name in sorted(os.listdir(workdir)):
        path = os.path.join(workdir, name)
        if not os.path.isfile(path):
            continue
        with open(path, "rb") as fh:
            data = fh.read()
        try:
            text = data.decode("utf-8")
            if "\\x00" in text:
                raise UnicodeDecodeError("utf-8", data, 0, 1, "binary")
            out[name] = {"type": "text", "content": text[:-1] if text.endswith("\\n") else text}
        except UnicodeDecodeError:
            out[name] = {"type": "binary", "base64": base64.b64encode(data).decode("ascii")}
    return out


def _quoted(msg):
    m = re.search(r"'([^']*)'", msg)
    return m.group(1) if m else None


def explain(e, code_line):
    """A message about the pseudocode for a Python exception."""
    msg = str(e)
    name = type(e).__name__
    if name == "UnsupportedOperation":
        if "not readable" in msg:
            return "This file was opened for WRITE or APPEND, so it cannot be read. Open it FOR READ."
        if "not writable" in msg:
            return "This file was opened for READ, so it cannot be written to. Open it FOR WRITE or APPEND."
        return msg
    if isinstance(e, ValueError):
        if "invalid literal for int()" in msg:
            return f'The input "{_quoted(msg) or ""}" is not a valid INTEGER (whole number).'
        if "could not convert string to float" in msg:
            return f'The input "{_quoted(msg) or ""}" is not a valid REAL number.'
        if "does not match format" in msg:
            return f'The input "{_quoted(msg) or ""}" is not a valid DATE in the format dd/mm/yyyy.'
        if "I/O operation on closed file" in msg:
            return "The file has already been closed with CLOSEFILE."
        if "is not a valid" in msg:
            return f"There is no enumerated value with that position ({msg})."
        return f"ValueError: {msg}"
    if isinstance(e, ZeroDivisionError):
        return "Division by zero."
    if isinstance(e, IndexError):
        if "string index" in msg:
            return "A position in the string is past its end (check MID / RIGHT and the string's length)."
        return "Array index out of range: the index is larger than the array's upper bound."
    if isinstance(e, RecursionError):
        return "Too many nested subroutine calls (is there a recursive call that never stops?)."
    if isinstance(e, UnboundLocalError) or isinstance(e, NameError):
        var = getattr(e, "name", None) or _quoted(msg) or "A variable"
        return f"{var} was used before it had been given a value."
    if isinstance(e, FileNotFoundError):
        return f'The file "{e.filename}" does not exist, so it cannot be opened for READ.'
    if isinstance(e, KeyError) and "files[" in code_line:
        return f'The file "{e.args[0] if e.args else ""}" is not open. Use OPENFILE first (file names must match exactly, including capital letters).'
    if isinstance(e, AttributeError) and "NoneType" in msg:
        return "An object, pointer or date was used before it had been given a value (objects are created with NEW)."
    if isinstance(e, TypeError):
        if "NoneType" in msg:
            return "A value was used before it had been assigned (check that every variable is given a value first)."
        if "can only concatenate str" in msg or "must be str" in msg:
            return f"& can only join strings. Python does not convert numbers to text automatically ({msg})."
        if "not supported between instances of" in msg or "unsupported operand" in msg:
            return f"These values have different data types and cannot be combined or compared ({msg})."
        return f"Type error: {msg}"
    if isinstance(e, MemoryError):
        return "The program ran out of memory."
    if isinstance(e, OverflowError):
        return f"A number became too large ({msg})."
    if isinstance(e, OSError) and "PSEUDO_RUN_CANCELLED" in msg:
        return "The program was stopped."
    if isinstance(e, LookupError) and msg.startswith("No record"):
        return msg + " (GETRECORD needs a record to have been written there with PUTRECORD)."
    return f"{name}: {msg}"


def run_program(code, line_map_json, files_json, workdir):
    line_map = json.loads(line_map_json)
    _prepare_folder(workdir, json.loads(files_json or "{}"))
    old_cwd = os.getcwd()
    os.chdir(workdir)
    # Run as a real __main__ module so that pickle can save the program's records.
    module = types.ModuleType("__main__")
    program_globals = module.__dict__
    saved_main = sys.modules.get("__main__")
    sys.modules["__main__"] = module
    result = {"ok": True}
    code_lines = code.split("\\n")
    try:
        exec(compile(code, "<pseudocode>", "exec"), program_globals)
    except KeyboardInterrupt:
        result = {"ok": False, "interrupted": True}
    except SystemExit:
        pass
    except BaseException as e:  # noqa: BLE001 - every failure is reported to the user
        py_line = 0
        for frame in traceback.extract_tb(e.__traceback__):
            if frame.filename == "<pseudocode>":
                py_line = frame.lineno or 0
        src_line = line_map[py_line] if 0 < py_line < len(line_map) else 0
        code_line = code_lines[py_line - 1] if 0 < py_line <= len(code_lines) else ""
        result = {
            "ok": False,
            "error": {
                "message": explain(e, code_line),
                "type": type(e).__name__,
                "pyLine": py_line,
                "line": src_line,
                "detail": "".join(traceback.format_exception_only(type(e), e)).strip(),
            },
        }
    finally:
        try:
            sys.stdout.flush()
        except Exception:  # noqa: BLE001
            pass
        # Close any files the program left open so their contents are saved.
        open_files = program_globals.get("files")
        if isinstance(open_files, dict):
            for f in list(open_files.values()):
                try:
                    f.close()
                except Exception:  # noqa: BLE001
                    pass
        program_globals.clear()
        if saved_main is not None:
            sys.modules["__main__"] = saved_main
        os.chdir(old_cwd)
    result["files"] = _collect_folder(workdir)
    return json.dumps(result)
`),o.runPython(`import sys
sys.path.insert(0, '/home/pyodide/pseudo')
import pseudo_driver`),t=o,p({type:`READY`,version:o.version,inputMode:r})}function x(n){if(!t){p({type:`RUNTIME_ERROR`,runId:n.runId,error:{message:`Python is not loaded.`,line:0,pyLine:0,type:`Error`,detail:``},files:n.files});return}o=n.runId,c=!1,l=``,u=performance.now(),a&&(a.interrupt[0]=0);let r=t.toPy({code:n.code,line_map:JSON.stringify(n.lineMap),files:JSON.stringify(n.files),workdir:e}),i;try{i=t.runPython(`import pseudo_driver
pseudo_driver.run_program(code, line_map, files, workdir)`,{globals:r})}catch(e){m(),p({type:`RUNTIME_ERROR`,runId:n.runId,error:{message:`Internal error: ${e.message}`,line:0,pyLine:0,type:`InternalError`,detail:String(e)},files:n.files});return}finally{r.destroy()}m();let s=JSON.parse(i);c||s.interrupted?p({type:`CANCELLED`,runId:n.runId,files:s.files}):s.ok?p({type:`COMPLETED`,runId:n.runId,files:s.files}):p({type:`RUNTIME_ERROR`,runId:n.runId,error:s.error,files:s.files})}self.onmessage=e=>{let t=e.data;t.type===`INITIALISE`?n??=b(t).catch(e=>{n=null,p({type:`INIT_ERROR`,message:e?.message??String(e)})}):t.type===`RUN`&&x(t)};