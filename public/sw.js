/* eslint-disable no-restricted-globals */


const CACHE_NAME = "quizapp_pwa_v1"


const urlsToCache = [
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/main.chunk.js',
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    'https://quizapi.io/api/v1/questions?difficulty=Medium&limit=10',
]


self.addEventListener("activate", () => {
    console.log("Service Worker Activated")
})


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            cache.addAll(urlsToCache)
            console.log("Urls cached")
        }).catch(err => {
            console.log(err)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });