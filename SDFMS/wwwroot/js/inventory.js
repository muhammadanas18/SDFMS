// Sample inventory data (would normally come from your database)
const sampleInventory = [
  {
    ItemID: 1,
    ItemName: "Hay Bale",
    Category: "Feed",
    QuantityAvailable: 150,
    ReorderLevel: 50,
    LastUpdated: "2023-10-15T10:30:00",
  },
  {
    ItemID: 2,
    ItemName: "Grain Mix",
    Category: "Feed",
    QuantityAvailable: 80,
    ReorderLevel: 30,
    LastUpdated: "2023-10-14T16:45:00",
  },
  {
    ItemID: 3,
    ItemName: "Vitamin Supplement",
    Category: "Medicine",
    QuantityAvailable: 12,
    ReorderLevel: 5,
    LastUpdated: "2023-10-10T09:20:00",
  },
  {
    ItemID: 4,
    ItemName: "Mineral Block",
    Category: "Supplies",
    QuantityAvailable: 25,
    ReorderLevel: 10,
    LastUpdated: "2023-10-05T14:15:00",
  },
];

// DOM Elements
const inventoryBody = document.getElementById("inventory-body");
const totalItemsElement = document.getElementById("total-items");
const reorderItemsElement = document.getElementById("reorder-items");
const lastUpdatedElement = document.getElementById("last-updated");
const searchInput = document.getElementById("search-input");

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
searchInput.addEventListener("input", filterInventory);

// Functions
function init() {
  renderInventoryTable();
  updateSummaryStats();
}

function renderInventoryTable(inventory = sampleInventory) {
  inventoryBody.innerHTML = "";

  inventory.forEach((item) => {
    const row = document.createElement("tr");

    // Check if reorder is needed
    const needsReorder = item.QuantityAvailable <= item.ReorderLevel;

    row.innerHTML = `
            <td>${item.ItemID}</td>
            <td>${item.ItemName}</td>
            <td>${item.Category}</td>
            <td ${needsReorder ? 'class="reorder-needed"' : ""}>
                ${item.QuantityAvailable}
                ${needsReorder ? " (Reorder Needed)" : ""}
            </td>
            <td>${item.ReorderLevel}</td>
            <td>${new Date(item.LastUpdated).toLocaleString()}</td>
            <td>
                <button class="action-btn view-btn">View</button>
                <button class="action-btn edit-btn">Edit</button>
            </td>
        `;

    inventoryBody.appendChild(row);
  });
}

function updateSummaryStats() {
  if (sampleInventory.length === 0) {
    totalItemsElement.textContent = "0";
    reorderItemsElement.textContent = "0";
    lastUpdatedElement.textContent = "-";
    return;
  }

  // Calculate items needing reorder
  const reorderItems = sampleInventory.filter(
    (item) => item.QuantityAvailable <= item.ReorderLevel
  ).length;

  // Find most recent update
  const lastUpdated = new Date(
    Math.max(...sampleInventory.map((item) => new Date(item.LastUpdated)))
  ).toLocaleString();

  totalItemsElement.textContent = sampleInventory.length;
  reorderItemsElement.textContent = reorderItems;
  lastUpdatedElement.textContent = lastUpdated;
}

function filterInventory() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredInventory = sampleInventory.filter(
    (item) =>
      item.ItemName.toLowerCase().includes(searchTerm) ||
      item.Category.toLowerCase().includes(searchTerm) ||
      item.ItemID.toString().includes(searchTerm)
  );

  renderInventoryTable(filteredInventory);
}
