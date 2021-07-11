// Base Service Worker implementation.  To use your own Service Worker, set the PWA_SERVICE_WORKER_PATH variable in settings.py

var staticCacheName = "django-pwa-v" + new Date().getTime();
var filesToCache = [
  '/offline',
  // '/static/js/homepage.js',
  // '/static/js/profile.js',
  // '/static/js/login.js',
  // '/static/js/eventwindow.js',
  // '/static/js/navbar.js',
  // '/static/sass/eventwindow.css',
  // '/static/sass/homepage.css',
  // '/static/sass/profile.css',
  // '/static/sass/navbar.css',
  // '/static/sass/variable.css',
  // '/static/sass/login.css',
  '/static/file/groupphoto_M.png',
  '/static/file/app-notice.png',
  '/static/file/app-message.png',
  '/static/file/app-home.png',
  '/static/file/app-group.png',
  '/static/file/app-notice_red.png',
  '/static/file/feedbackicon.png',
  '/static/file/like-bg-n.png',
  '/static/file/like-bg-y.png',
  '/static/file/like-grey.png',
  '/static/file/like-y.png',
  '/static/file/like-n.png'
];

// Cache on install
self.addEventListener("install", event => {
  this.skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
          return cache.addAll(filesToCache);
      })
  )
});

// Clear cache on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith("django-pwa-")))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Serve from Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('offline');
      })
  )
});