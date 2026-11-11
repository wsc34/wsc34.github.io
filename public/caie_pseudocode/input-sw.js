// Service worker that lets the Python worker wait for INPUT with an ordinary,
// blocking input() call. The Python worker makes a synchronous request to
// ./__pseudo_input__?id=...; this service worker holds that request open until
// the page sends the typed text. It handles no other requests, caches nothing
// and needs no special HTTP headers, so it works on any static host.
const PATH = '/__pseudo_input__';
const RETRY_AFTER_MS = 50_000; // reply "retry" well before browsers time out a fetch event

const waiting = new Map(); // request id -> function(text | null)
const answers = new Map(); // request id -> text | null (answer arrived before the request)

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
  const msg = event.data;
  if (!msg || msg.type !== 'PSEUDO_INPUT') return;
  const deliver = waiting.get(msg.id);
  if (deliver) {
    waiting.delete(msg.id);
    deliver(msg.text);
  } else {
    answers.set(msg.id, msg.text);
  }
});

const json = (body) =>
  new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.endsWith(PATH)) return; // everything else: normal network
  const id = url.searchParams.get('id');
  if (id === 'ping') {
    event.respondWith(json({ ok: true }));
    return;
  }
  event.respondWith(
    new Promise((resolve) => {
      if (answers.has(id)) {
        const text = answers.get(id);
        answers.delete(id);
        resolve(json({ text }));
        return;
      }
      const timer = setTimeout(() => {
        waiting.delete(id);
        resolve(json({ retry: true }));
      }, RETRY_AFTER_MS);
      waiting.set(id, (text) => {
        clearTimeout(timer);
        resolve(json({ text }));
      });
    }),
  );
});
