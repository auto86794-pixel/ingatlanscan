const LEGACY_CACHE_PREFIX = "ingatlanscan-";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(LEGACY_CACHE_PREFIX)).map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clientsList = await self.clients.matchAll({ type: "window" });
    for (const client of clientsList) client.navigate(client.url);
  })());
});
