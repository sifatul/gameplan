const CACHE_NAME = 'my-app-cache-v6'; // Increment this version to refresh cache
const urlsToCache = [
  '/',
  '/gameplan/index.html',
  '/gameplan/manifest.json'
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // Delete old caches
          }
        })
      );
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  // Cache-first strategy for specific assets
  if (event.request.url.includes('/gameplan/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone()); // Cache the new response
              return networkResponse;
            });
          });
        })
        .catch(() => {
          // Fallback if both cache and network fail
          console.error('Fetch failed; returning offline page instead.');
          return caches.match('/gameplan/index.html'); // Optional offline page
        })
    );
  } else {
    // Default network-first strategy for other requests
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request); // Fall back to cache
      })
    );
  }
});
