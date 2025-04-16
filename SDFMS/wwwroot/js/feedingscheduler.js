// Sample data for demonstration
const sampleFeedings = [
  {
    date: new Date().toISOString().split("T")[0],
    time: "08:00",
    animalName: "Cow #12",
    amount: 2.5,
    type: "Grain",
    notes: "Regular feeding",
  },
  {
    date: new Date().toISOString().split("T")[0],
    time: "16:30",
    animalName: "Cow #15",
    amount: 2.0,
    type: "Hay",
    notes: "Afternoon feeding",
  },
  {
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "07:45",
    animalName: "Cow #03",
    amount: 3.0,
    type: "Grain",
    notes: "Morning feeding",
  },
];

// DOM Elements
const calendar = document.getElementById("calendar");
const feedingList = document.getElementById("feeding-list");
const avgFeedingAmountElement = document.getElementById("avg-feeding-amount");
const totalFeedingsElement = document.getElementById("total-feedings");
const upcomingFeedingsCountElement = document.getElementById(
  "upcoming-feedings-count"
);

// Functions
function init() {
  renderCalendar();
  renderFeedingList();
  updateStatistics();
}

function renderCalendar() {
  calendar.innerHTML = "";

  // Create calendar header
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const header = document.createElement("div");
  header.className = "calendar-header";
  days.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    header.appendChild(dayElement);
  });
  calendar.appendChild(header);

  // Get days in current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  // Create calendar grid
  const calendarGrid = document.createElement("div");
  calendarGrid.style.display = "grid";
  calendarGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
  calendarGrid.style.gap = "5px";

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    // Check if this day has any feedings
    const dateString = new Date(year, month, i).toISOString().split("T")[0];
    const hasFeedings = sampleFeedings.some(
      (feeding) => feeding.date === dateString
    );

    if (hasFeedings) {
      dayElement.classList.add("has-feeding");
    }

    dayElement.textContent = i;
    calendarGrid.appendChild(dayElement);
  }

  calendar.appendChild(calendarGrid);
}

function renderFeedingList() {
  feedingList.innerHTML = "";

  // Sort feedings by date and time (upcoming first)
  const sortedFeedings = [...sampleFeedings].sort((a, b) => {
    const dateA = new Date(a.date);
    dateA.setHours(0, 0, 0, 0);
    const dateB = new Date(b.date);
    dateB.setHours(0, 0, 0, 0);
    return dateA - dateB;
  });

  sortedFeedings.forEach((feeding) => {
    const formattedDate = new Date(feeding.date).toLocaleDateString();
    const formattedTime = new Date(
      `2000-01-01T${feeding.time}`
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const feedingItem = document.createElement("div");
    feedingItem.className = "feeding-item";
    feedingItem.innerHTML = `
            <div class="feeding-time">${formattedTime}</div>
            <div class="feeding-details">
                <div>${feeding.animalName}</div>
                <div>${feeding.amount} kg of ${feeding.type}</div>
                ${
                  feeding.notes
                    ? `<div class="feeding-notes">${feeding.notes}</div>`
                    : ""
                }
            </div>
            <div class="feeding-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;

    feedingList.appendChild(feedingItem);
  });
}

function updateStatistics() {
  if (sampleFeedings.length === 0) {
    avgFeedingAmountElement.textContent = "0.0 kg";
    totalFeedingsElement.textContent = "0";
    upcomingFeedingsCountElement.textContent = "0";
    return;
  }

  // Calculate average feeding amount
  const totalAmount = sampleFeedings.reduce(
    (sum, feeding) => sum + feeding.amount,
    0
  );
  const avgAmount = totalAmount / sampleFeedings.length;

  avgFeedingAmountElement.textContent = avgAmount.toFixed(1) + " kg";
  totalFeedingsElement.textContent = sampleFeedings.length;
  upcomingFeedingsCountElement.textContent = sampleFeedings.length;
}

// Initialize the component
document.addEventListener("DOMContentLoaded", init);
