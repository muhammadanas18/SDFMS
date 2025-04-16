// DOM Elements
let getBarItem = document.querySelector(".bar-item");
let getSideBar = document.querySelector(".sidebar");
let getXmark = document.querySelector(".xmark");
let getPageContent = document.querySelector(".page-content");
let getLoader = document.querySelector(".loader");
let getToggle = document.querySelectorAll(".toggle");
let getHeart = document.querySelector(".heart");
let getSidebarLink = document.querySelectorAll(".sidebar-link");
let activePage = window.location.pathname;
let getSideBarStatus = false;

// Toggle sidebar on mobile
if (getBarItem) {
  getBarItem.onclick = () => {
    getSideBar.style = "transform: translateX(0px); width: 220px;";
    getSideBar.classList.add("sidebar-active");
  };
}

// Close sidebar on mobile
if (getXmark) {
  getXmark.onclick = () => {
    getSideBar.style =
      "transform: translateX(-220px); width: 220px; box-shadow: none;";
    getSideBarStatus = true;
    if (getSideBar.classList.contains("sidebar-active")) {
      getSideBar.classList.remove("sidebar-active");
    }
  };
}

// Handle window resize
window.addEventListener("resize", (e) => {
  if (getSideBarStatus === true) {
    if (e.target.innerWidth > 768) {
      getSideBar.style = "transform: translateX(0px); width: 220px;";
    } else {
      getSideBar.style =
        "transform: translateX(-220px); width: 220px; box-shadow: none;";
    }
  }
});

// Hide loader and show content on page load
if (getLoader) {
  window.addEventListener("load", () => {
    getLoader.style.display = "none";
    if (getPageContent) {
      getPageContent.style.display = "grid";
    }
    activePage = "index.html"; // Adjust based on your actual active page
    if (getSidebarLink) {
      getSidebarLink.forEach((item) => {
        if (item.href.includes(`${activePage}`)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  });
}

// Close sidebar when clicking outside
document.onclick = (e) => {
  if (getSideBar && getSideBar.classList.contains("sidebar-active")) {
    if (
      !e.target.classList.contains("bar-item") &&
      !e.target.classList.contains("sidebar") &&
      !e.target.classList.contains("brand") &&
      !e.target.classList.contains("brand-name")
    ) {
      getSideBar.style =
        "transform: translateX(-220px); width: 220px; box-shadow: none;";
      getSideBar.classList.remove("sidebar-active");
      getSideBarStatus = true;
    }
  }
};

// Close sidebar on scroll
window.addEventListener("scroll", () => {
  if (getSideBar && getSideBar.classList.contains("sidebar-active")) {
    getSideBar.style =
      "transform: translateX(-220px); width: 220px; box-shadow: none;";
    getSideBar.classList.remove("sidebar-active");
  }
});

// Toggle heart icon
if (getHeart) {
  getHeart.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-regular")) {
      getHeart.classList.replace("fa-regular", "fa-solid");
      getHeart.style.color = "red";
    } else {
      getHeart.classList.replace("fa-solid", "fa-regular");
      getHeart.style.color = "#888";
    }
  });
}

// Toggle switches
getToggle.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("left")) {
      item.classList.remove("left");
    } else {
      item.classList.add("left");
    }
  });
});

// Set active link
if (getSidebarLink) {
  getSidebarLink.forEach((item) => {
    if (item.href.includes(`${activePage}`)) {
      item.classList.add("active");
    }
  });
}

// Initialize dashboard-specific functionality
function initDashboard() {
  renderCharts();
  setupEventListeners();
}

function renderCharts() {
  // Chart rendering logic here
  // This would be similar to the previous chart implementation
}

function setupEventListeners() {
  // Additional event listeners for dashboard components
}

// Call initDashboard when the page loads
document.addEventListener("DOMContentLoaded", initDashboard);
// animal component js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize records display
  displayHealthRecords();
  displayVaccinationRecords();

  // Form validation and submission for Health Check Form
  const healthCheckForm = document.getElementById("health-check-form");
  healthCheckForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const animalId = document.getElementById("animal-id").value;
    const healthStatus = document.getElementById("health-status").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const treatment = document.getElementById("treatment").value;
    const timestamp = new Date().toISOString();

    // Create new health record
    const healthRecord = {
      animalId,
      healthStatus,
      diagnosis,
      treatment,
      timestamp,
    };

    // Save to localStorage
    let healthRecords = JSON.parse(
      localStorage.getItem("healthRecords") || "[]"
    );
    healthRecords.push(healthRecord);
    localStorage.setItem("healthRecords", JSON.stringify(healthRecords));

    // Show success message
    alert("Health information saved successfully!");
    healthCheckForm.reset();

    // Update display
    displayHealthRecords();
  });

  // Form validation and submission for Vaccination Form
  const vaccinationForm = document.getElementById("vaccination-form");
  vaccinationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const animalId = document.getElementById("animal-id-vaccine").value;
    const vaccineName = document.getElementById("vaccine-name").value;
    const vaccineDate = document.getElementById("vaccine-date").value;
    const timestamp = new Date().toISOString();

    // Create new vaccination record
    const vaccinationRecord = {
      animalId,
      vaccineName,
      vaccineDate,
      timestamp,
    };

    // Save to localStorage
    let vaccinationRecords = JSON.parse(
      localStorage.getItem("vaccinationRecords") || "[]"
    );
    vaccinationRecords.push(vaccinationRecord);
    localStorage.setItem(
      "vaccinationRecords",
      JSON.stringify(vaccinationRecords)
    );

    // Show success message
    alert("Vaccination record saved successfully!");
    vaccinationForm.reset();

    // Update display
    displayVaccinationRecords();
  });

  // Function to display health records
  function displayHealthRecords() {
    const healthRecordsContainer = document.getElementById("health-records");
    healthRecordsContainer.innerHTML = "";

    let healthRecords = JSON.parse(
      localStorage.getItem("healthRecords") || "[]"
    );

    if (healthRecords.length === 0) {
      healthRecordsContainer.innerHTML = "<p>No health records available.</p>";
      return;
    }

    // Sort records by timestamp (newest first)
    healthRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    healthRecords.forEach((record) => {
      const recordCard = document.createElement("div");
      recordCard.className = "record-card";

      const formattedDate = new Date(record.timestamp).toLocaleString();

      recordCard.innerHTML = `
        <h3>Animal ID: ${record.animalId}</h3>
        <p><strong>Status:</strong> ${record.healthStatus}</p>
        <p><strong>Diagnosis:</strong> ${record.diagnosis}</p>
        <p><strong>Treatment:</strong> ${record.treatment}</p>
        <p class="record-date">Recorded on: ${formattedDate}</p>
        <button class="delete-btn" data-timestamp="${record.timestamp}">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      `;

      healthRecordsContainer.appendChild(recordCard);

      // Add event listener to delete button
      const deleteBtn = recordCard.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        const timestamp = this.getAttribute("data-timestamp");
        deleteHealthRecord(timestamp);
      });
    });
  }

  // Function to display vaccination records
  function displayVaccinationRecords() {
    const vaccinationRecordsContainer = document.getElementById(
      "vaccination-records"
    );
    vaccinationRecordsContainer.innerHTML = "";

    let vaccinationRecords = JSON.parse(
      localStorage.getItem("vaccinationRecords") || "[]"
    );

    if (vaccinationRecords.length === 0) {
      vaccinationRecordsContainer.innerHTML =
        "<p>No vaccination records available.</p>";
      return;
    }

    // Sort records by timestamp (newest first)
    vaccinationRecords.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    vaccinationRecords.forEach((record) => {
      const recordCard = document.createElement("div");
      recordCard.className = "record-card";

      const formattedDate = new Date(record.timestamp).toLocaleString();
      const vaccineDate = new Date(record.vaccineDate).toLocaleDateString();

      recordCard.innerHTML = `
        <h3>Animal ID: ${record.animalId}</h3>
        <p><strong>Vaccine:</strong> ${record.vaccineName}</p>
        <p><strong>Vaccination Date:</strong> ${vaccineDate}</p>
        <p class="record-date">Recorded on: ${formattedDate}</p>
        <button class="delete-btn" data-timestamp="${record.timestamp}">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      `;

      vaccinationRecordsContainer.appendChild(recordCard);

      // Add event listener to delete button
      const deleteBtn = recordCard.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        const timestamp = this.getAttribute("data-timestamp");
        deleteVaccinationRecord(timestamp);
      });
    });
  }

  // Function to delete a health record
  function deleteHealthRecord(timestamp) {
    let healthRecords = JSON.parse(
      localStorage.getItem("healthRecords") || "[]"
    );
    healthRecords = healthRecords.filter(
      (record) => record.timestamp !== timestamp
    );
    localStorage.setItem("healthRecords", JSON.stringify(healthRecords));
    displayHealthRecords();
    alert("Health record deleted successfully!");
  }

  // Function to delete a vaccination record
  function deleteVaccinationRecord(timestamp) {
    let vaccinationRecords = JSON.parse(
      localStorage.getItem("vaccinationRecords") || "[]"
    );
    vaccinationRecords = vaccinationRecords.filter(
      (record) => record.timestamp !== timestamp
    );
    localStorage.setItem(
      "vaccinationRecords",
      JSON.stringify(vaccinationRecords)
    );
    displayVaccinationRecords();
    alert("Vaccination record deleted successfully!");
  }
});
