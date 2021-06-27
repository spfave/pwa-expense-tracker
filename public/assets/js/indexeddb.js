// Variables and Functions
const indexedDBName = 'ExpenseDB';
const storeName = 'ExpenseStore';
const dbVersion = 1;
let db;

function setupIndexedDB() {
  const request = indexedDB.open(indexedDBName, dbVersion);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore(storeName, { autoIncrement: true });

    console.log('indexedDB upgraded');
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log('connected to indexedDB');
  };

  request.onerror = function (event) {
    console.log(`Error: ${event.target.errorCode}`);
  };
}

// function saveRecord(record) {
//   // Create transaction on ExpenseStore DB, access ExpenseStore, and add to store
//   const transaction = db.transaction(storeName, 'readwrite');
//   const store = transaction.objectStore(storeName);
//   store.add(record);

//   console.log('Expense saved locally');
// }

// function checkDatabase() {
//   const storeName = 'ExpenseStore';

//   // Open transaction on ExpenseStore DB, access ExpenseStore, get all records
//   const transaction = db.transaction(storeName, 'readwrite');
//   const store = transaction.objectStore(storeName);
//   const allExpenses = store.getAll();

//   // If request for all expenses successful, bulk add them to to expenseDB
//   allExpenses.onsuccess = async () => {
//     try {
//       // if no expenses in store: exit function
//       if (!allExpenses.result.length) return;

//       const response = await fetch('/api/transaction/bulk', {
//         method: 'POST',
//         body: JSON.stringify(allExpenses.result),
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();

//       // if no  data returned: exit function
//       if (!data.length) return;

//       // Open transaction on ExpenseStore DB, access ExpenseStore, clear store
//       const transaction = db.transaction(storeName, 'readwrite');
//       const store = transaction.objectStore(storeName);
//       store.clear();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// Event Listeners
// window.addEventListener('online', checkDatabase);

// Page Execution
setupIndexedDB();
