const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearButton = document.getElementById('clear');
const filterInput = document.getElementById('filter');
const items = document.querySelectorAll('li');


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
    //Add li to the DOM
    itemList.appendChild(listItem);
    checkUI();
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

function removeItem(e) {
    //event delegation
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
        
    }   
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }  
    checkUI();
}

function checkUI() {
    const items = document.querySelectorAll('li');
    if(items.length === 0) {
        clearButton.style.display = 'none';
        filterInput.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        filterInput.style.display = 'block';
    }   
}

//Event listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);

checkUI();