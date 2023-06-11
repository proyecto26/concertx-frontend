// Imports Workbox from the CDN. Note that "6.2.0" of the URL
// is the version of the Workbox runtime.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({ debug: false, logLevel: 'warn' });
  initializeWorkbox();
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

function initializeWorkbox() {
  // Automatically adds an activate event listener to service worker
  workbox.core.clientsClaim();

  /*
  const navigationRoute = new workbox.routing.NavigationRoute(new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'navigations'
  }));
  */
  
  const staticAssetsRoute = new workbox.routing.Route(({request}) => {
    return [
      'image',
      'font',
      'style',
    ].includes(request.destination);
  }, new workbox.strategies.CacheFirst({
    cacheName: 'static-assets'
  }));

  const mediaAssetsRoute = new workbox.routing.Route(({request}) => {
    return [
      'video',
      'audio',
    ].includes(request.destination);
  }, new workbox.strategies.CacheFirst({
    cacheName: 'media-assets',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200]
      }),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
  }));
  
  // workbox.routing.registerRoute(navigationRoute);
  workbox.routing.registerRoute(staticAssetsRoute);
  workbox.routing.registerRoute(mediaAssetsRoute);
}

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});