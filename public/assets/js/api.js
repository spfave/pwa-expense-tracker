import { populateTotal, populateTable, populateChart } from './displayMethods';

export default function getTransactions(transactions) {
  return fetch('/api/transaction')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // save db data on global variable
      transactions = data;

      populateTotal(transactions);
      populateTable(transactions);
      populateChart(transactions);
    });
}
