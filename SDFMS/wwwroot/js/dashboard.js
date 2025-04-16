// Sample data
const milkProductionData = [
  { date: "2023-10-01", morning: 350, evening: 420 },
  { date: "2023-10-02", morning: 360, evening: 410 },
  { date: "2023-10-03", morning: 355, evening: 415 },
  { date: "2023-10-04", morning: 365, evening: 425 },
  { date: "2023-10-05", morning: 370, evening: 430 },
  { date: "2023-10-06", morning: 360, evening: 420 },
  { date: "2023-10-07", morning: 350, evening: 410 },
];

const financialData = [
  { month: "Jan", income: 12000, expenses: 8000 },
  { month: "Feb", income: 13000, expenses: 8500 },
  { month: "Mar", income: 12500, expenses: 9000 },
  { month: "Apr", income: 13500, expenses: 9500 },
  { month: "May", income: 14000, expenses: 10000 },
  { month: "Jun", income: 14500, expenses: 9800 },
  { month: "Jul", income: 13800, expenses: 9200 },
  { month: "Aug", income: 14200, expenses: 9300 },
  { month: "Sep", income: 14800, expenses: 9700 },
  { month: "Oct", income: 15000, expenses: 10000 },
];

// DOM Elements
const currentDateElement = document.getElementById("current-date");
const totalMilkElement = document.getElementById("total-milk");
const totalFeedElement = document.getElementById("total-feed");
const totalIncomeElement = document.getElementById("total-income");
const pendingTasksElement = document.getElementById("pending-tasks");

// Charts
let milkChart;
let financialChart;

// Event Listeners
document.addEventListener("DOMContentLoaded", init);

// Functions
function init() {
  setCurrentDate();
  updateSummaryStats();
  renderCharts();
}

function setCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateElement.textContent = now.toLocaleDateString("en-US", options);
}

function updateSummaryStats() {
  // Calculate total milk production
  const totalMilk = milkProductionData.reduce(
    (sum, day) => sum + day.morning + day.evening,
    0
  );
  totalMilkElement.textContent = totalMilk;

  // Set sample values for other stats
  totalFeedElement.textContent = "12.5 Tons";
  totalIncomeElement.textContent = "$14,500";
  pendingTasksElement.textContent = "7";
}

function renderCharts() {
  renderMilkProductionChart();
  renderFinancialChart();
}

function renderMilkProductionChart() {
  const ctx = document.getElementById("milk-production-chart").getContext("2d");

  const labels = milkProductionData.map((data) => {
    return new Date(data.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  const morningData = milkProductionData.map((data) => data.morning);
  const eveningData = milkProductionData.map((data) => data.evening);

  if (milkChart) {
    milkChart.destroy();
  }

  milkChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Morning Yield",
          data: morningData,
          borderColor: "rgba(52, 152, 219, 1)",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Evening Yield",
          data: eveningData,
          borderColor: "rgba(46, 204, 113, 1)",
          backgroundColor: "rgba(46, 204, 113, 0.1)",
          tension: 0.3,
          fill: true,
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
            text: "Milk Yield (Liters)",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Daily Milk Production",
        },
      },
    },
  });
}

function renderFinancialChart() {
  const ctx = document.getElementById("financial-chart").getContext("2d");

  const labels = financialData.map((data) => data.month);
  const incomeData = financialData.map((data) => data.income);
  const expenseData = financialData.map((data) => data.expenses);

  if (financialChart) {
    financialChart.destroy();
  }

  financialChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(46, 204, 113, 0.6)",
          borderColor: "rgba(46, 204, 113, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "rgba(231, 76, 60, 0.6)",
          borderColor: "rgba(231, 76, 60, 1)",
          borderWidth: 1,
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
            text: "Amount ($)",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Monthly Financial Overview",
        },
      },
    },
  });
}
