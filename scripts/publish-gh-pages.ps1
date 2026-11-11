# Builds the site and commits the output to the local `gh-pages` branch.
# Afterwards, push `gh-pages` (GitHub Desktop: switch to gh-pages -> Push origin,
# or `git push origin gh-pages`). GitHub Pages must be set to
# "Deploy from a branch" -> gh-pages / (root).
#
# Usage (from the project folder):  npm run publish:pages

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# Use git from PATH, or the copy bundled with GitHub Desktop.
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) {
  $git = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe" -ErrorAction SilentlyContinue |
    Sort-Object FullName -Descending | Select-Object -First 1 -ExpandProperty FullName
}
if (-not $git) { throw 'git not found. Install Git or GitHub Desktop.' }

Write-Host 'Building site...'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }

$source = (& $git rev-parse --short HEAD).Trim()
$work = Join-Path $env:TEMP "wsc34-gh-pages-$([guid]::NewGuid().ToString('N').Substring(0,8))"

& $git worktree prune
$hasBranch = (& $git branch --list gh-pages)
if ($hasBranch) {
  & $git worktree add $work gh-pages
} else {
  & $git worktree add --orphan -b gh-pages $work
}
if ($LASTEXITCODE -ne 0) { throw 'Could not create gh-pages worktree.' }

try {
  # Replace everything on the branch with the fresh build.
  Get-ChildItem -Force $work | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
  Copy-Item -Recurse -Force (Join-Path $root 'dist\*') $work
  Copy-Item -Force (Join-Path $root 'dist\.nojekyll') $work

  Push-Location $work
  & $git add --all
  & $git diff --cached --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Host 'No changes since the last publish.'
  } else {
    & $git commit -m "Publish site from $source"
    if ($LASTEXITCODE -ne 0) { throw 'Commit failed.' }
    Write-Host "Committed build of $source to gh-pages. Now push the gh-pages branch."
  }
  Pop-Location
} finally {
  & $git worktree remove --force $work
}
