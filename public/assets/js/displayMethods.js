export function populateTotal(transactions) {
  // Reduce transaction expenses to a total value
  let total = transactions.reduce((total, t) => total + parseFloat(t.value), 0);

  let totalEl = document.querySelector('#total');
  totalEl.textContent = total;
}

export function populateTable(transactions) {
  let tbody = document.querySelector('#tbody');
  tbody.innerHTML = '';

  transactions.forEach((transaction) => {
    // create and populate a table row
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

let myChart;
export function populateChart(transactions) {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Over Time',
          fill: true,
          borderColor: '#1a7431',
          backgroundColor: '#25a244',
          data,
        },
      ],
    },
    options: {
      plugins: {
        title: { display: true, text: 'Running Balance' },
        legend: { display: false },
      },
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Balance' }, beginAtZero: true },
      },
    },
  });
}

export default function updateDataDisplay(transactions) {
  populateTotal(transactions);
  populateTable(transactions);
  populateChart(transactions);
}
