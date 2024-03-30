import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

const restoDicodingAPI = new Route(
  ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/"),
  new StaleWhileRevalidate({
    cacheName: "restoid-api",
  }),
);

const googleFont = new Route(
  ({ url }) => url.href.startsWith("https://fonts.googleapis.com/"),
  new StaleWhileRevalidate({
    cacheName: "google-font",
  }),
);

registerRoute(restoDicodingAPI);
registerRoute(googleFont);

self.addEventListener("install", () => {
  self.skipWaiting();
});
