import { populateTotal, populateTable, populateChart } from './displayMethods';

export default async function getTransactions() {
  try {
    const response = await fetch('/api/transaction');
    const transactions = await response.json();

    return transactions;
  } catch (error) {
    console.log(error);
  }
}
