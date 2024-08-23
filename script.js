// Default items for each category
const defaultItems = {
  "food-tools": [
    "Aluminum foil",
    "Tongs",
    "Knife and cutting board",
    "Skewer",
    "Cooler",
    "Dry Ice",
    "Cast iron skillet",
    "Spatula",
    "Mixing Bowl",
    "Cleaning supplies",
    "Coconut Oil",
    "Oven Mitts",
    "Table Cloth",
    "Avocado Spray",
    "Paper Plates",
    "Dish soap",
    "Grill Brush",
    "Plastic Utensils",
    "Camping Stove",
    "Can Opener",
    "Marshmallow Roasting Sticks",
    "Ziplock Bags",
    "Trash Bags",
    "Paper Towels",
    "Reusable Containers",
    "Coffee Maker",
    "Measuring Cups",
    "Griddle",
    "Portable Grill",
    "Thermos",
    "Roasting Pan",
    "Butter Dish",
    "Salt and Pepper Shakers"
  ],
  "day-1": [],
  "day-2": [],
  "day-3": [],
  "equipment": [
    "Flashlight / Lanterns",
    "Yoga Mat",
    "Tent",
    "Firewood / Fluid / Lighters",
    "Sleeping Bags",
    "Paper Towels",
    "Air Mattress",
    "Toilet Paper",
    "Air Pump",
    "Headphones",
    "Sheets / Pillows",
    "Sunglasses",
    "Hammock",
    "Hats",
    "Books",
    "Chairs",
    "Mobile Battery",
    "Change of Clothes x 2",
    "Bluetooth Speaker",
    "Drinks: Wine/Beer/Rum/Soda/Water/Coconut Water",
    "Cards or Games",
    "Sun Block",
    "Towels / Washcloths",
    "First Aid Kit",
    "Body Soap / Shampoo",
    "Waterproof Phone Bags / Cases",
    "Toothbrush",
    "Water Shoes",
    "Deodorant",
    "Hiking Boots",
    "Wet Wipes",
    "Flip Flops (Camp Shoes)",
    "Hand Sanitizer",
    "Insect Repellent",
    "J's",
    "Dry Bag",
    "Propane Grill",
    "Swim Towels",
    "Drawstring Day Bag",
    "Water Cantines",
    "Portable Water Filter"
  ],
  "notes": []
};

// Restore default items function
function restoreDefaults() {
  Object.keys(defaultItems).forEach((categoryId) => {
    const ul = document.getElementById(categoryId);

    // Clear existing items
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    // Add default items
    defaultItems[categoryId].forEach((item) => {
      const newLi = document.createElement("li");
      newLi.textContent = item;

      // Create and append a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-item";
      newLi.appendChild(removeButton);

      // Apply default styles for new items
      newLi.style.backgroundColor = '#b8c1ec'; // Set default background color
      newLi.classList.add("item"); // Ensure item class for consistent styling

      ul.appendChild(newLi);
    });
  });

  // Save the restored default items to localStorage
  saveChecklistState();
}

// Event listener for the "Restore Default Items" button
document.getElementById("restore-defaults").addEventListener("click", restoreDefaults);

// Event delegation for removing items
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const li = event.target.parentElement;
    li.remove();
    saveChecklistState(); // Save the updated state
  }
});

// Function to toggle the 'crossed' class on list items
function toggleItem(item) {
  if (item.classList.contains('crossed')) {
    item.classList.remove('crossed');
    item.style.backgroundColor = '#b8c1ec'; // Revert to original background color
  } else {
    item.classList.add('crossed');
    item.style.backgroundColor = '#fffffe'; // Apply the crossed-off background color
  }
  saveChecklistState(); // Save the updated state after toggle
}

// Event delegation for click and touch events
function handleItemToggle(event) {
  if (event.target.tagName === "LI") {
    event.preventDefault(); // Prevent default touch actions
    toggleItem(event.target);
  }
}

document.addEventListener("click", handleItemToggle, { passive: false });
document.addEventListener("touchend", handleItemToggle, { passive: false });

// Function to load the checklist state from localStorage
function loadChecklistState() {
  const savedData = JSON.parse(localStorage.getItem("checklistData")) || {};
  
  Object.keys(savedData).forEach((id) => {
    const ul = document.getElementById(id);
    
    // Clear existing items
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    savedData[id].items.forEach((itemData) => {
      const newLi = document.createElement("li");
      newLi.textContent = itemData.text;

      // Create and append a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-item";
      newLi.appendChild(removeButton);

      // Apply styles based on item state
      if (itemData.crossed) {
        newLi.classList.add("crossed");
        newLi.style.backgroundColor = '#fffffe'; // Apply crossed-off background color
      } else {
        newLi.style.backgroundColor = '#b8c1ec'; // Apply default background color
      }

      newLi.classList.add("item"); // Ensure item class for consistent styling

      ul.appendChild(newLi);
    });
  });
}

// Function to save the checklist state to localStorage
function saveChecklistState() {
  const checklistData = {};
  document.querySelectorAll(".category ul").forEach((ul) => {
    const id = ul.id;
    checklistData[id] = {
      items: []
    };
    ul.querySelectorAll("li").forEach((item) => {
      checklistData[id].items.push({
        text: item.textContent.replace("Remove", "").trim(),
        crossed: item.classList.contains("crossed")
      });
    });
  });
  localStorage.setItem("checklistData", JSON.stringify(checklistData));
}

// Function to uncheck all items
function uncheckAll() {
  document.querySelectorAll("li.crossed").forEach((item) => {
    item.classList.remove("crossed");
    item.style.backgroundColor = '#b8c1ec'; // Revert to original background color
  });
  saveChecklistState();
}

// Add event listener for the "Uncheck All" button
document.getElementById("uncheck-all").addEventListener("click", uncheckAll);

// Function to add a new item to a category
function addNewItem(event) {
  const button = event.target;
  const targetId = button.getAttribute("data-target");
  const inputId = `${targetId}-input`;
  const input = document.getElementById(inputId);
  const newItemText = input.value.trim();

  if (newItemText !== "") {
    const ul = document.getElementById(targetId);
    const newLi = document.createElement("li");
    newLi.textContent = newItemText;

    // Create and append a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-item";
    newLi.appendChild(removeButton);

    // Apply default styles for new items
    newLi.style.backgroundColor = '#b8c1ec'; // Set default background color
    newLi.classList.add("item"); // Ensure item class for consistent styling

    ul.appendChild(newLi);
    input.value = ""; // Clear the input field
    saveChecklistState(); // Save state if needed
  }
}

// Function to handle Enter key press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    const input = event.target;
    const addButton = input.nextElementSibling; // Assuming the Add Item button is immediately after the input
    if (addButton && addButton.classList.contains("add-item")) {
      addButton.click();
    }
  }
}

// Add event listeners to the add-item buttons
document.querySelectorAll(".add-item").forEach((button) => {
  button.addEventListener("click", addNewItem);
});

// Add event listener for Enter key press in input fields
document.querySelectorAll(".category input[type='text']").forEach((input) => {
  input.addEventListener("keypress", handleKeyPress);
});

// Load the checklist state on page load
window.addEventListener("DOMContentLoaded", loadChecklistState);
