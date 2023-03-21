/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const SERVICE_NAME_TOKEN = "service worker";

const capitalize = (str) =>
  str.replace(
    /([\w\r\n.\-\_\\/!@#$%^&*()=+\[\]|;'"/,]+)/,
    ($0, $1) => $1.charAt(0).toUpperCase() + $1.slice(1).toLowerCase()
  );

self.addEventListener("sync", (e) => {
  console.log(e);
  self.registration.showNotification("Sync fired!");
});

self.addEventListener("push", (e) => {
  console.log(e);
  self.registration.showNotification(e.data)
});

self.addEventListener("install", (e) => {
  console.log("service", e);
  console.log(`[${capitalize(SERVICE_NAME_TOKEN)}] service was installed`);
  console.log(caches);
  console.log(caches.open("test"));
  e.waitUntil(
    caches
      .open("test")
      .then((cache) => {
        console.log(cache);
        cache.add("/assets/styles/main.css").then((result) => {
          console.log("success", result);
        });
      })
      .catch((e) => {
        console.log(e);
      })
  );
});

self.addEventListener("active", (e) => {
  console.log(e);
});
