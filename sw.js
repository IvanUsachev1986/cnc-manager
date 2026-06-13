const CACHE_NAME = 'cnc-manager-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов (возвращаем из кэша, если есть)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Возвращаем из кэша
        }
        return fetch(event.request); // Идем в интернет
      })
  );
});