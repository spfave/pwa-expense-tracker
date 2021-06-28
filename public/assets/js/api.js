import { populateTotal, populateTable, populateChart } from './displayMethods';

export default async function getTransactions() {
  try {
    const response = await fetch('/api/transaction');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
