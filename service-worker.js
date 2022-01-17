var staticStickyNotes= "stickynotes-site-v1"
var precacheConfig = [
  ["sticky-note.png", "57f44c7e84e8db553271cc408bbaad22"],
  ["index.html", "09cfa67d0f55dd2591b9f9ed72f747a0"],
  ["manifest.json", "350a5c214307ff3d11eee259369449b7"],
  ["myscripts.js", "298e946e4029dce801f90d9c6ce3cc44"],
  ["style.css", "265a2c3891fe945c12ce436f7fb85b5e"],
];
var cacheName =
  "sw-precache-v3-sw-precache-" +
  (self.registration ? self.registration.scope : "");

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(stickynotes-site-v1).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})