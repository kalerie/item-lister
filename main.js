let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');
let deleteAllButton = document.getElementById('btn-del-all');
let textField = document.getElementById('item');
let submitButton = document.getElementById('submit');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);
// Delete all event
deleteAllButton.addEventListener('click', removeAllItems);
// Text field type event
textField.addEventListener('keyup', enableSubmit);


// Add item
function addItem(e) {
    e.preventDefault();

    // Get input value
    let newItem = document.getElementById("item").value;
    let newTag = document.getElementById('select').value;

    // Create a new li element
    let li = document.createElement('li');
    // Add class
    li.className = 'list-group-item d-flex  align-items-center';
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));
    // Clear input value
    textField.value = "";
    submitButton.disabled = true;

    // Create tag element
    let tagEl = document.createElement('div');
    // Add classes to tag element
    if(newTag == 'Garden'){
        tagEl.className = 'badge bg-success text-white bd-highlight p-2 bd-highlight';    
    } else if(newTag == 'House') {
        tagEl.className = 'badge bg-warning text-dark bd-highlight p-2 bd-highlight';
    } else if(newTag == 'Pets') {
        tagEl.className = 'badge bg-info text-white bd-highlight p-2 bd-highlight';
    }
    // Append text node
    tagEl.appendChild(document.createTextNode(newTag));

    // Create del button element
    let deleteButton = document.createElement('button');
    // Add classes to delete button
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    deleteButton.appendChild(document.createTextNode('X'));

    // Create container for tag and button
    let container = document.createElement('div');
    // Add class to container
    container.className = 'd-flex justify-content-between align-items-center flex-fill ml-3';
    // Append tag and button to container
    container.append(tagEl, deleteButton);

    // Append container to li
    li.appendChild(container);
    // Append li to list
    itemList.appendChild(li);
    deleteAllButton.style.display = 'block';
}

// Remove item from list
function removeItem(e) {
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            let container = e.target.parentElement;
            let li = container.parentElement;
            itemList.removeChild(li);
        }
    }

    // Hide delete-all-button if there is no any item
    let items = itemList.getElementsByTagName('li');
    if(Array.from(items).length == 0) {
        deleteAllButton.style.display = 'none';
    }
}

// Filter items
function filterItems(e) {
    // Convert text to lowercase
    let text = e.target.value.toLowerCase();
    // Get lis
    let items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function(item) {
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) !== -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


// Remove all items
function removeAllItems(e) {
    if(confirm('Are you 100% sure?')){
        // let li = e.target.parentElement;
        // itemList.removeChild(li);
        console.log(document.getElementById('items'));
        console.log(itemList.children);
        itemList.innerHTML = '';
        deleteAllButton.style.display = 'none';
    }    
}


// Enabled submit button
function enableSubmit(e) {
    if(textField.value.length > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}