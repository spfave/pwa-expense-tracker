import { populateTotal, populateTable, populateChart } from './displayMethods';

export default async function getTransactions(transactions) {
  try {
    const response = await fetch('/api/transaction');
    transactions = await response.json();

    populateTotal(transactions);
    populateTable(transactions);
    populateChart(transactions);

    return transactions;
  } catch (error) {
    console.log(error);
  }
}
