// Sample financial data
let transactions = [
  {
    id: 1,
    date: "2023-10-10",
    description: "Farm Equipment Purchase",
    category: "business",
    amount: 1500.0,
    type: "expense",
  },
  {
    id: 2,
    date: "2023-10-05",
    description: "Milk Sale",
    category: "business",
    amount: 850.0,
    type: "income",
  },
  {
    id: 3,
    date: "2023-10-15",
    description: "Veterinary Services",
    category: "healthcare",
    amount: 250.0,
    type: "expense",
  },
  {
    id: 4,
    date: "2023-10-01",
    description: "Government Subsidy",
    category: "business",
    amount: 2000.0,
    type: "income",
  },
];

const bills = [
  {
    description: "Electricity Bill",
    amount: 150.0,
    dueDate: "2023-10-20",
  },
  {
    description: "Internet Service",
    amount: 60.0,
    dueDate: "2023-10-25",
  },
  {
    description: "Equipment Lease",
    amount: 300.0,
    dueDate: "2023-10-30",
  },
];

// DOM Elements
const totalIncomeElement = document.getElementById("total-income");
const totalExpensesElement = document.getElementById("total-expenses");
const netProfitElement = document.getElementById("net-profit");
const availableBalanceElement = document.getElementById("available-balance");
const transactionsBody = document.getElementById("transactions-body");
const billList = document.getElementById("bill-list");
const budgetProgress = document.getElementById("budget-progress");
const budgetStatus = document.getElementById("budget-status");
const addTransactionBtn = document.getElementById("add-transaction");
const modal = document.getElementById("transaction-modal");
const closeBtn = document.querySelector(".close-btn");
const transactionForm = document.getElementById("transaction-form");

// Chart Elements
const incomeExpenseCtx = document
  .getElementById("income-expense-chart")
  .getContext("2d");
const expenseBreakdownCtx = document
  .getElementById("expense-breakdown-chart")
  .getContext("2d");

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
addTransactionBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
transactionForm.addEventListener("submit", handleTransactionSubmit);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Functions
function init() {
  updateFinancialSummary();
  renderTransactionsTable();
  renderBills();
  setupCharts();
  updateBudgetStatus();
}

function updateFinancialSummary() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netProfit = income - expenses;
  const availableBalance = netProfit; // Simplified for demonstration

  totalIncomeElement.textContent = `$${income.toFixed(2)}`;
  totalExpensesElement.textContent = `$${expenses.toFixed(2)}`;
  netProfitElement.textContent = `$${netProfit.toFixed(2)}`;
  availableBalanceElement.textContent = `$${availableBalance.toFixed(2)}`;
}

function renderTransactionsTable() {
  transactionsBody.innerHTML = "";

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sortedTransactions.forEach((transaction) => {
    const formattedDate = new Date(transaction.date).toLocaleDateString();
    const amountClass = transaction.type === "income" ? "income" : "expense";
    const amountPrefix = transaction.type === "income" ? "+" : "-";

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${amountClass}">${amountPrefix} $${transaction.amount.toFixed(
      2
    )}</td>
            <td>${transaction.type}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

    transactionsBody.appendChild(row);
  });
}

function renderBills() {
  billList.innerHTML = "";

  bills.forEach((bill) => {
    const formattedDate = new Date(bill.dueDate).toLocaleDateString();

    const billItem = document.createElement("div");
    billItem.className = "bill-item";
    billItem.innerHTML = `
            <div class="bill-details">
                <div class="bill-description">${bill.description}</div>
                <div class="bill-due-date">Due: ${formattedDate}</div>
            </div>
            <div class="bill-amount">$${bill.amount.toFixed(2)}</div>
        `;

    billList.appendChild(billItem);
  });
}

function setupCharts() {
  setupIncomeExpenseChart();
  setupExpenseBreakdownChart();
}

function setupIncomeExpenseChart() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  new Chart(incomeExpenseCtx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Amount ($)",
          data: [income, expenses],
          backgroundColor: ["rgba(76, 175, 80, 0.6)", "rgba(244, 67, 54, 0.6)"],
          borderColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function setupExpenseBreakdownChart() {
  const expenseCategories = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      if (!expenseCategories[transaction.category]) {
        expenseCategories[transaction.category] = 0;
      }
      expenseCategories[transaction.category] += transaction.amount;
    });

  const categories = Object.keys(expenseCategories);
  const amounts = Object.values(expenseCategories);

  new Chart(expenseBreakdownCtx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Expenses by Category",
          data: amounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  });
}

function updateBudgetStatus() {
  const monthlyBudget = 5000; // Example budget
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const usagePercentage = (expenses / monthlyBudget) * 100;
  budgetProgress.style.width = `${Math.min(usagePercentage, 100)}%`;

  if (usagePercentage > 100) {
    budgetProgress.style.backgroundColor = "#f44336";
    budgetStatus.textContent = `${usagePercentage.toFixed(
      1
    )}% Used (Over Budget)`;
  } else if (usagePercentage > 75) {
    budgetProgress.style.backgroundColor = "#ff9800";
    budgetStatus.textContent = `${usagePercentage.toFixed(1)}% Used (Warning)`;
  } else {
    budgetProgress.style.backgroundColor = "#4caf50";
    budgetStatus.textContent = `${usagePercentage.toFixed(1)}% Used`;
  }
}

function openModal() {
  modal.style.display = "block";
  document.getElementById("transaction-date").valueAsDate = new Date();
}

function closeModal() {
  modal.style.display = "none";
  transactionForm.reset();
}

function handleTransactionSubmit(e) {
  e.preventDefault();

  const date = document.getElementById("transaction-date").value;
  const description = document.getElementById("transaction-description").value;
  const category = document.getElementById("transaction-category").value;
  const amount = parseFloat(
    document.getElementById("transaction-amount").value
  );
  const type = document.getElementById("transaction-type").value;

  const newTransaction = {
    id: Date.now(),
    date,
    description,
    category,
    amount,
    type,
  };

  transactions.push(newTransaction);

  closeModal();
  updateFinancialSummary();
  renderTransactionsTable();
  setupCharts();
  updateBudgetStatus();
}
