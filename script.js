const myStorage = 'todo-list-data-1.0'   // local storage name
let tempVarIndex = 0             // temporarily store item index while updating



// Display Item List - - - - - - - - - - - - - - - 
const showItemList = () => {
  let allData = localStorage.getItem(myStorage)
  if (allData == null)
    allData = []
  else
    allData = JSON.parse(allData)

  let html = ``;

  allData.forEach((item, index) => {
    html += `<div class="item">
              <span class="remove-item-btn1 mr-2" onclick="deletItem(${index})">x</span>
              <p class="item-content">${item}</p>
              <span><img src="edit-icon.png" class="edit-item-btn1" onclick="editItem(${index})"></span>
            </div>`
  });

  if (html == ``)
    html = `<div class="item">
              <p class="text-center light-text">Empty</p>
            </div>`

  let itemList = document.getElementById('item-list');
  itemList.innerHTML = html
}


// Edit Item - - - - - - - - - - - - - - - 
const editItem = (index) => {
  tempVarIndex = index     // store item index in temp variable, will be useful while updating the item

  let allData = localStorage.getItem(myStorage)
  if (allData == null) allData = []
  else allData = JSON.parse(allData)

  let inputField = document.getElementById('input-1')
  inputField.value = allData[index]

  document.getElementById('item-add-btn').style.display = "none"
  document.getElementById('item-save-btn').style.display = "inline-block"
}


// Update item - - - - - - - - - - - - - - - 
const updateItem = () => {
  let inputField = document.getElementById('input-1')
  let newItem = inputField.value.trim()

  if (newItem == '') {
    deletItem(tempVarIndex);
  } else {
    let allData = localStorage.getItem(myStorage)
    allData = JSON.parse(allData)

    allData[tempVarIndex] = newItem
    localStorage.setItem(myStorage, JSON.stringify(allData))
  }

  inputField.value = ''
  showItemList();

  document.getElementById('item-save-btn').style.display = "none"
  document.getElementById('item-add-btn').style.display = "inline-block"
}


// Delete Item - - - - - - - - - - - - - - - 
const deletItem = (index) => {
  // console.log(index)
  let allData = localStorage.getItem(myStorage)
  if (allData == null) allData = []
  else allData = JSON.parse(allData)

  allData.splice(index, 1)
  localStorage.setItem(myStorage, JSON.stringify(allData))
  showItemList()
}

// Add Item - - - - - - - - - - - - - - - 
const addNewItem = () => {
  let inputField = document.getElementById('input-1')
  let newItem = inputField.value.trim()
  if (newItem == '') return;

  let allData = localStorage.getItem(myStorage)
  if (allData == null) allData = []
  else allData = JSON.parse(allData)

  allData.push(newItem)
  localStorage.setItem(myStorage, JSON.stringify(allData))

  inputField.value = ''
  showItemList();
}

// By default call - - - - - - - - - - - - - - - 
showItemList()