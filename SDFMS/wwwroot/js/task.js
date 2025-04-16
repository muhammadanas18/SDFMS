// Sample task data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: 1,
    employee: 1,
    employeeName: "John Doe",
    title: "Milk Production Report",
    description: "Prepare daily milk production report for October",
    dueDate: "2023-10-20",
    priority: "high",
    status: "in-progress",
  },
  {
    id: 2,
    employee: 2,
    employeeName: "Jane Smith",
    title: "Equipment Maintenance",
    description: "Perform routine maintenance on milking equipment",
    dueDate: "2023-10-15",
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    employee: 3,
    employeeName: "Mark Johnson",
    title: "Feed Inventory Check",
    description: "Check and report current feed inventory levels",
    dueDate: "2023-10-10",
    priority: "low",
    status: "completed",
  },
  {
    id: 4,
    employee: 1,
    employeeName: "John Doe",
    title: "Vaccination Schedule",
    description: "Update vaccination schedule for all livestock",
    dueDate: "2023-10-25",
    priority: "high",
    status: "pending",
  },
];

// DOM Elements
const tasksGrid = document.getElementById("tasks-grid");
const totalTasksElement = document.getElementById("total-tasks");
const pendingTasksElement = document.getElementById("pending-tasks");
const inProgressTasksElement = document.getElementById("in-progress-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const assignTaskBtn = document.getElementById("assign-task");
const modal = document.getElementById("task-modal");
const closeBtn = document.querySelector(".close-btn");
const taskForm = document.getElementById("task-form");
const employeeFilter = document.getElementById("employee-filter");
const statusFilter = document.getElementById("status-filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
assignTaskBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
taskForm.addEventListener("submit", handleTaskSubmit);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
employeeFilter.addEventListener("change", filterTasks);
statusFilter.addEventListener("change", filterTasks);

// Functions
function init() {
  renderTasks();
  updateSummaryStats();
}

function renderTasks() {
  tasksGrid.innerHTML = "";

  // Apply filters
  const employeeValue = employeeFilter.value;
  const statusValue = statusFilter.value;

  const filteredTasks = tasks.filter((task) => {
    const employeeMatch =
      employeeValue === "all" || task.employee.toString() === employeeValue;
    const statusMatch = statusValue === "all" || task.status === statusValue;
    return employeeMatch && statusMatch;
  });

  if (filteredTasks.length === 0) {
    const noTasks = document.createElement("div");
    noTasks.className = "no-tasks";
    noTasks.textContent = "No tasks found matching the selected filters";
    noTasks.style.gridColumn = "1 / -1";
    noTasks.style.textAlign = "center";
    noTasks.style.padding = "30px";
    noTasks.style.color = "#888";
    tasksGrid.appendChild(noTasks);
    return;
  }

  filteredTasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = `task-card ${task.priority}-priority`;
    taskCard.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-employee">Assigned to: ${
                      task.employeeName
                    }</div>
                </div>
                <div class="task-due-date">Due: ${formatDate(
                  task.dueDate
                )}</div>
            </div>
            <div class="task-description">${task.description}</div>
            <div class="task-status status-${task.status}">${capitalizeStatus(
      task.status
    )}</div>
            <div class="task-actions">
                <button class="btn-edit" onclick="editTask(${
                  task.id
                })">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${
                  task.id
                })">Delete</button>
            </div>
        `;

    tasksGrid.appendChild(taskCard);
  });
}

function updateSummaryStats() {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  totalTasksElement.textContent = totalTasks;
  pendingTasksElement.textContent = pendingTasks;
  inProgressTasksElement.textContent = inProgressTasks;
  completedTasksElement.textContent = completedTasks;
}

function openModal() {
  modal.style.display = "block";
  document.getElementById("task-due-date").valueAsDate = new Date();
}

function closeModal() {
  modal.style.display = "none";
  taskForm.reset();
}

function handleTaskSubmit(e) {
  e.preventDefault();

  const employee = document.getElementById("task-employee").value;
  const employeeName = document.querySelector(
    `#task-employee option[value="${employee}"]`
  ).text;
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const dueDate = document.getElementById("task-due-date").value;
  const priority = document.getElementById("task-priority").value;
  const status = "pending";

  const newTask = {
    id: Date.now(),
    employee,
    employeeName,
    title,
    description,
    dueDate,
    priority,
    status,
  };

  tasks.push(newTask);
  saveTasks();

  closeModal();
  renderTasks();
  updateSummaryStats();
}

function filterTasks() {
  renderTasks();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function capitalizeStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  // Populate form with task data
  document.getElementById("task-employee").value = task.employee;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description;
  document.getElementById("task-due-date").value = task.dueDate;
  document.getElementById("task-priority").value = task.priority;

  // Add edit mode
  taskForm.onsubmit = function (e) {
    e.preventDefault();

    task.employee = document.getElementById("task-employee").value;
    task.employeeName = document.querySelector(
      `#task-employee option[value="${task.employee}"]`
    ).text;
    task.title = document.getElementById("task-title").value;
    task.description = document.getElementById("task-description").value;
    task.dueDate = document.getElementById("task-due-date").value;
    task.priority = document.getElementById("task-priority").value;

    saveTasks();

    closeModal();
    renderTasks();
    updateSummaryStats();
  };

  openModal();
}

function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
    updateSummaryStats();
  }
}
