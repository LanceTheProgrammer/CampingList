// Function to load the checklist state from localStorage
function loadChecklistState() {
  const savedData = JSON.parse(localStorage.getItem("checklistData")) || {};
  
  Object.keys(savedData).forEach((id) => {
    const ul = document.getElementById(id);
    savedData[id].items.forEach((itemData) => {
      const newLi = document.createElement("li");
      newLi.textContent = itemData.text;

      // Create and append a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-item";
      newLi.appendChild(removeButton);

      if (itemData.crossed) {
        newLi.classList.add("crossed");
      }

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

// Function to toggle the 'crossed' class on click
document.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("crossed");
    saveChecklistState();
  }
});

// Function to uncheck all items
function uncheckAll() {
  document.querySelectorAll("li.crossed").forEach((item) => {
    item.classList.remove("crossed");
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

    ul.appendChild(newLi);
    input.value = ""; // Clear the input field
    saveChecklistState(); // Save state if needed
  }
}

// Event delegation for removing items
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const li = event.target.parentElement;
    li.remove();
    saveChecklistState(); // Save the updated state
  }
});

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
