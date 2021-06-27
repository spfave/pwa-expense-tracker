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

function saveRecord(record) {
  console.log('Expense saved locally');

  const transaction = db.transaction(['ExpenseStore'], 'readwrite');
  const store = transaction.objectStore('ExpenseStore');
  store.add(record);
}

// Event Listeners
// window.addEventListener('online', checkDatabase);
