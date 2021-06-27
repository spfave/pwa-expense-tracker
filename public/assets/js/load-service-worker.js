// Functions
function loadServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js', {
        scope: '/',
      })
      .then((res) => {
        console.log(res);
        console.log('Service Worker registered successfully.');
      })
      .catch((error) =>
        console.log('Service Worker registration failed:', error)
      );
  }
}

// Page Execution
loadServiceWorker();
