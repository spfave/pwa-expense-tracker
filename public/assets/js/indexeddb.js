let db;
let expenseVersion;

// Variables and Functions
const request = indexedDB.open('ExpenseDB', expenseVersion || 1);

request.onupgradeneeded = (event) => {
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

// Event Listeners
// window.addEventListener('online', checkDatabase);
