let db;
let expenseVersion;

// Variables and Functions
const request = indexedDB.open('ExpenseDB', expenseVersion || 1);

request.onupgradeneeded = function (event) {
  const { oldVersion } = event;
  const newVersion = event.newVersion || db.version;

  console.log(
    `Upgraded needed in IndexDB\nDB updated from version ${oldVersion} to ${newVersion}`
  );

  db = event.target.result;
  if (!db.objectStoreNames.length) {
    db.createObjectStore('ExpenseStore', { autoIncrement: true });
  }
};

request.onerror = function (event) {
  console.log(`Error: ${event.target.errorCode}`);
};

request.onsuccess = function (event) {
  console.log('success');
  db = event.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log('Backend online! 🗄️');
    checkDatabase();
  }
};

// Event Listeners
// window.addEventListener('online', checkDatabase);
