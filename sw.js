/* ================================================
   SERVICE WORKER — Iftekhar's Treatment Tracker
   Offline-first caching strategy
   ================================================ */

const CACHE_NAME = 'iftekhar-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Install — cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for app shell, network-first for others
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return resp;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});

// Push notifications handler
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: "Treatment Reminder", body: "Medicine নেওয়ার সময় হয়েছে!" };
  event.waitUntil(
    self.registration.showNotification(data.title || "Iftekhar's Treatment", {
      body: data.body || "Medicine নেওয়ার সময় হয়েছে!",
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'medicine-reminder',
      requireInteraction: false,
      actions: [
        { action: 'taken', title: '✓ নিয়েছি' },
        { action: 'later', title: '⏰ পরে মনে করিয়ে দাও' }
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'taken') {
    // Could update state via message to client
  }
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow('./index.html');
    })
  );
});
