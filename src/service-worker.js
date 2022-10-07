/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

const CACHE_STATIC_NAME  = 'static-v6';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  console.log("message");
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener('install', e => {
  self.skipWaiting();

  const cacheProm = caches.open( CACHE_STATIC_NAME )
      .then( cache => {

          return cache.addAll([
              '/',
              'index.html',
              // '../src/paginas/estudios.html',
              // '../src/paginas/insumos.html',
              // '../src/paginas/trtamientos.html',
              // '../src/paginas/signosVitales.html',
              // '../src/paginas/alerta.html',
              // '../src/paginas/menu.html',
              // '../src/paginas/Home.html',
              // 'App.js'
          ]);

      
      });

  const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
          .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


  e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});


// function limpiarCache( cacheName, numeroItems ) {


//   caches.open( cacheName )
//       .then( cache => {

//           return cache.keys()
//               .then( keys => {

//                   if ( keys.length > numeroItems ) {
//                       cache.delete( keys[0] )
//                           .then( limpiarCache(cacheName, numeroItems) );
//                   }
//               });


//       });
// }

// self.addEventListener('fetch', e => {


//   // 2- Cache with Network Fallback
//   const respuesta = caches.match( e.request )
//       .then( res => {

//           if ( res ) return res;

//           // No existe el archivo

//           return fetch( e.request ).then( newResp => {

//               caches.open( CACHE_DYNAMIC_NAME )
//                   .then( cache => {
//                       cache.put( e.request, newResp );
//                       limpiarCache( CACHE_DYNAMIC_NAME, 50 );
//                   });

//               return newResp.clone();
//           })
//           .catch( err => {

//               if ( e.request.headers.get('accept').includes('text/html') ) {
//                   return caches.match('/pages/offline.html');
//               }


//           });


//       });

//   e.respondWith( respuesta );
// });



// self.addEventListener("fetch", event => {
//   if (
//     event.request.mode === "navigate" ||
//     event.request.destination === "style" ||
//     event.request.destination === "script" ||
//     event.request.destination === "image"
//   ) {
//     event.respondWith(cacheResponse(event.request, event));
//   }
// });
// async function cacheResponse(request, event) {
//   const cache = await caches.open(CACHE_DYNAMIC_NAME);
//   const match = await cache.match(request.url);
//   if (match) {
//     return match;
//   }
//   // Create promises for both the network response,
//   // and a copy of the response that can be used in the cache.
//   const fetchResponseP = fetch(request);
//   const fetchResponseCloneP = fetchResponseP.then(r => r.clone());
//   event.waitUntil(
//     (async function() {
//       await cache.put(request, await fetchResponseCloneP);
//     })()
//   );
//   return fetchResponseP;
// }