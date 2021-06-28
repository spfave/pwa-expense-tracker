// Functions
async function loadServiceWorker() {
  // Check if browser supports service workers
  if (!('serviceWorker' in navigator)) {
    return alert(
      'Browser does not support service workers.\nOffline functionality will not work.'
    );
  }

  // Try to register service worker
  try {
    const res = await navigator.serviceWorker.register('./service-worker.js', {
      scope: '/',
    });
    console.log('Service Worker registered successfully.');
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
}

// Page Execution
loadServiceWorker();
