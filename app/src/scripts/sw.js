const name = 'sw@1.0.0'
const url = 'offline.html'

self.oninstall = (e) => {
  e.waitUntil(caches.open(name).then((cache) => cache.addAll([url])))
}

self.onfetch = (e) => {
  if (
    e.request.mode === 'navigate' ||
    (e.request.method === 'GET' &&
      e.request.headers.get('accept').includes('text/html'))
  ) {
    e.respondWith(
      fetch(e.request.url).catch((error) => {
        return caches.match(url)
      }),
    )
  }
  return
}
