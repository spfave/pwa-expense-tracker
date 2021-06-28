import getTransactions from './api';
import loadServiceWorker from './load-service-worker';
import updateDataDisplay from './displayMethods';
import { saveRecord, execIndexedDB } from './indexeddb';

// Variables and Functions
let transactions = [];

function sendTransaction(isAdding) {
  let nameEl = document.querySelector('#t-name');
  let amountEl = document.querySelector('#t-amount');
  let errorEl = document.querySelector('.form .error');

  // validate form
  if (nameEl.value === '' || amountEl.value === '') {
    errorEl.hidden = false;
    setTimeout(() => (errorEl.hidden = true), 2000);
    return;
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: isAdding ? amountEl.value : -amountEl.value,
    date: new Date().toISOString(),
  };

  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  updateDataDisplay(transactions);

  // also send to server
  fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        errorEl.textContent = 'Missing Information';
      } else {
        // clear form
        nameEl.value = '';
        amountEl.value = '';
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = '';
      amountEl.value = '';
    });
}

// Event Listeners
document.querySelector('#add-btn').onclick = function () {
  sendTransaction(true);
};

document.querySelector('#sub-btn').onclick = function () {
  sendTransaction(false);
};

// Page Execution
getTransactions()
  .then((response) => {
    transactions = response;
    updateDataDisplay(transactions);
  })
  .catch((error) => console.log(error));

execIndexedDB();

loadServiceWorker();
