import { register } from "riot";

let registration;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service1.ts", { scope: "/" })
    .then((res) => {
      registration = res;
    })
    .catch((e) => {
      console.log(e);
    });
}

window.addEventListener("message", (e) => {
  console.log(e);
});

window.addEventListener("online", (e) => {
  console.log("online", e);
});

window.addEventListener("offline", (e) => {
  console.log("offline", e);
});

new Promise((resolve, reject) => {
  Notification.requestPermission((result) => {
    console.log("result", result);
    if (result !== "granted") {
      return reject(Error("Denied notification permission."));
    }
    resolve(undefined);
  });
})
  .then(() => {
    return navigator.serviceWorker.ready;
  })
  .then(function (reg: any) {
    console.log(reg);
    return reg.sync.register("syncTest");
  })
  .then(() => {
    console.log("Sync registered");
  })
  .catch((err) => {
    console.log("It broke");
    console.log(err.message);
  });

setInterval(() => {
  // new Notification('테스트합니다')
  registration.pushManager.subscribe()
}, 1000);
