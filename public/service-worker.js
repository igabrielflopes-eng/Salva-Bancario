const CACHE_NAME = 'salva-bancario-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

const isDevelopment = () => {
  return self.location.hostname === 'localhost' || 
         self.location.hostname === '127.0.0.1' ||
         self.location.hostname.includes('replit.dev');
};

self.addEventListener('install', (event) => {
  if (isDevelopment()) {
    console.log('Service Worker: Ambiente de desenvolvimento detectado - cache desabilitado');
    self.skipWaiting();
    return;
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  if (isDevelopment()) {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Service Worker: Removendo cache de desenvolvimento:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
    self.clients.claim();
    return;
  }
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (isDevelopment()) {
    event.respondWith(
      fetch(event.request).then((response) => {
        return response;
      })
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
