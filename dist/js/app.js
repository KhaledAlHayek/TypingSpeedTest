if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Serviec Worker has been registered"))
    .catch(() => console.log("failed to register"));
}