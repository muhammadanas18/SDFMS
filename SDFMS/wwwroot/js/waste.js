// Sample waste data
let wasteData = JSON.parse(localStorage.getItem("wasteData")) || [];

// DOM Elements
const wasteBody = document.getElementById("waste-body");
const addWasteBtn = document.getElementById("add-waste");
const modal = document.getElementById("waste-modal");
const closeBtn = document.querySelector(".close-btn");
const wasteForm = document.getElementById("waste-form");
const totalWasteElement = document.getElementById("total-waste");
const wasteSoldElement = document.getElementById("waste-sold");
const totalDisposedElement = document.getElementById("total-disposed");

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
addWasteBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
wasteForm.addEventListener("submit", handleWasteSubmit);

// Functions
function init() {
  renderWasteTable();
  updateSummaryStats();
}

function renderWasteTable() {
  wasteBody.innerHTML = "";

  wasteData.forEach((waste) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${waste.WasteID}</td>
            <td>${waste.WasteType}</td>
            <td>${formatDate(waste.DisposalDate)}</td>
            <td>${waste.DisposalMethod}</td>
            <td>${waste.Quantity}</td>
            <td>${waste.Sold === "1" ? "Yes" : "No"}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editWaste(${
                  waste.WasteID
                })">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteWaste(${
                  waste.WasteID
                })">Delete</button>
            </td>
        `;

    wasteBody.appendChild(row);
  });
}

function updateSummaryStats() {
  const totalWaste = wasteData.length;
  const wasteSold = wasteData.filter((waste) => waste.Sold === "1").length;
  const totalDisposed = wasteData.filter((waste) => waste.DisposalDate).length;

  totalWasteElement.textContent = totalWaste;
  wasteSoldElement.textContent = wasteSold;
  totalDisposedElement.textContent = totalDisposed;
}

function openModal() {
  modal.style.display = "block";
  document.getElementById("waste-type").focus();
}

function closeModal() {
  modal.style.display = "none";
  wasteForm.reset();
}

function handleWasteSubmit(e) {
  e.preventDefault();

  const wasteType = document.getElementById("waste-type").value;
  const disposalDate = document.getElementById("disposal-date").value;
  const disposalMethod = document.getElementById("disposal-method").value;
  const quantity = document.getElementById("quantity").value;
  const sold = document.getElementById("sold").value;

  const newWaste = {
    WasteID: Date.now(),
    WasteType: wasteType,
    DisposalDate: disposalDate,
    DisposalMethod: disposalMethod,
    Quantity: quantity,
    Sold: sold,
  };

  wasteData.push(newWaste);
  saveWasteData();

  closeModal();
  renderWasteTable();
  updateSummaryStats();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function saveWasteData() {
  localStorage.setItem("wasteData", JSON.stringify(wasteData));
}

function editWaste(wasteID) {
  const waste = wasteData.find((item) => item.WasteID === wasteID);
  if (!waste) return;

  // Populate form with waste data
  document.getElementById("waste-type").value = waste.WasteType;
  document.getElementById("disposal-date").value = waste.DisposalDate;
  document.getElementById("disposal-method").value = waste.DisposalMethod;
  document.getElementById("quantity").value = waste.Quantity;
  document.getElementById("sold").value = waste.Sold;

  // Add edit mode
  wasteForm.onsubmit = function (e) {
    e.preventDefault();

    waste.WasteType = document.getElementById("waste-type").value;
    waste.DisposalDate = document.getElementById("disposal-date").value;
    waste.DisposalMethod = document.getElementById("disposal-method").value;
    waste.Quantity = document.getElementById("quantity").value;
    waste.Sold = document.getElementById("sold").value;

    saveWasteData();

    closeModal();
    renderWasteTable();
    updateSummaryStats();
  };

  openModal();
}

function deleteWaste(wasteID) {
  if (confirm("Are you sure you want to delete this waste record?")) {
    wasteData = wasteData.filter((waste) => waste.WasteID !== wasteID);
    saveWasteData();
    renderWasteTable();
    updateSummaryStats();
  }
}
