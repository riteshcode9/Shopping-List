const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');


function addItem(event) {
    event.preventDefault();
    const newItem = itemInput.value.trim();
    //validate input
    if(newItem === '') {
        alert('Please enter an item.');
        return;
    }
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    itemList.appendChild(listItem);
    itemInput.value = '';
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


//Event listener for form submission
itemForm.addEventListener('submit', addItem);