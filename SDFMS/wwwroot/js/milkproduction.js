// Initialize data storage
let productionData = JSON.parse(localStorage.getItem("productionData")) || [];

// DOM Elements
const productionForm = document.getElementById("production-form");
const productionList = document.getElementById("production-list");
const productionChart = document.getElementById("production-chart");
const avgYieldElement = document.getElementById("avg-yield");
const totalProductionElement = document.getElementById("total-production");

// Initialize chart
let chart;

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
productionForm.addEventListener("submit", handleFormSubmit);

// Functions
function init() {
  renderProductionList();
  updateSummaryStats();
  renderChart();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const morningYield = parseFloat(
    document.getElementById("morning-yield").value
  );
  const eveningYield = parseFloat(
    document.getElementById("evening-yield").value
  );

  const newEntry = {
    date,
    morningYield,
    eveningYield,
    totalYield: morningYield + eveningYield,
  };

  productionData.push(newEntry);
  saveData();

  renderProductionList();
  updateSummaryStats();
  renderChart();

  // Reset form
  productionForm.reset();
}

function renderProductionList() {
  productionList.innerHTML = "";

  // Sort data by date (newest first)
  const sortedData = [...productionData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sortedData.forEach((entry) => {
    const formattedDate = new Date(entry.date).toLocaleDateString();

    const listItem = document.createElement("div");
    listItem.className = "production-item";
    listItem.innerHTML = `
            <div class="production-date">${formattedDate}</div>
            <div class="production-yield">
                Morning: ${entry.morningYield.toFixed(1)} L<br>
                Evening: ${entry.eveningYield.toFixed(1)} L<br>
                Total: ${entry.totalYield.toFixed(1)} L
            </div>
        `;

    productionList.appendChild(listItem);
  });
}

function updateSummaryStats() {
  if (productionData.length === 0) {
    avgYieldElement.textContent = "0.0 L";
    totalProductionElement.textContent = "0.0 L";
    return;
  }

  const totalProduction = productionData.reduce(
    (sum, entry) => sum + entry.totalYield,
    0
  );
  const avgYield = totalProduction / productionData.length;

  avgYieldElement.textContent = avgYield.toFixed(1) + " L";
  totalProductionElement.textContent = totalProduction.toFixed(1) + " L";
}

function renderChart() {
  const labels = productionData.map((entry) => {
    return new Date(entry.date).toLocaleDateString();
  });

  const morningData = productionData.map((entry) => entry.morningYield);
  const eveningData = productionData.map((entry) => entry.eveningYield);
  const totalData = productionData.map((entry) => entry.totalYield);

  const ctx = document.getElementById("production-chart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Morning Yield",
          data: morningData,
          borderColor: "#4fc3f7",
          backgroundColor: "rgba(79, 195, 247, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Evening Yield",
          data: eveningData,
          borderColor: "#29b6f6",
          backgroundColor: "rgba(41, 182, 246, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Total Yield",
          data: totalData,
          borderColor: "#1565c0",
          backgroundColor: "rgba(21, 101, 192, 0.1)",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Milk Yield (L)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Milk Production Trends",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
    },
  });
}

function saveData() {
  localStorage.setItem("productionData", JSON.stringify(productionData));
}
