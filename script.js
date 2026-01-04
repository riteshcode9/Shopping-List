const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearButton = document.getElementById('clear');
const filterInput = document.getElementById('filter');
const items = document.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(function(item){
        addItemToDOM(item);
    });
    checkUI();
}

function onAddItemSubmit(event) {
    event.preventDefault();
    const newItem = itemInput.value.trim();
    //validate input
    if(newItem === '') {
        alert('Please enter an item.');
        return;
    }
    // Add item to DOM
   addItemToDOM(newItem);
    // Add item to local storage
    addItemToStorage(newItem);
    checkUI();
    itemInput.value = '';
}

function addItemToDOM(item) {
     const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    //Add li to the DOM
    itemList.appendChild(listItem);
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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    //Add new item to array
    itemsFromStorage.push(item);
    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

//handler for click on item list
function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(function(i){
        i.classList.remove('edit-mode');
    });
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if(confirm('Are you sure?')) {
        //Remove item from DOM
        item.remove();
        // Remove item from local storage
        removeItemFromStorage(item.textContent);
        checkUI();
    }   
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter(function(storageItem) {
        return storageItem !== item;
    });
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }  
    // Clear from local storage
    localStorage.removeItem('items');
    checkUI();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(function(item){
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex'; //block or flex based on your CSS
        } else {
            item.style.display = 'none';
        }   
    });
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

//Initialze app 
function init() {
    //Event listener
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems);
filterInput.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

//Initial UI check

checkUI();
}

//Run initialze app
init(); 
