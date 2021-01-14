import { Storage } from "./storage.js";

let data = new Storage();

// localStorage.clear();

const tbody = document.getElementById("item_list");
const formToAdd = document.getElementById("form_to_add");

function ShowItems() 
{ 
    RefreshItemList()

    let allData = data.GetAllData();
    
    for (let i = 0; i < allData.length; i++) {
        tbody.innerHTML += `
        <tr>
            <td class="item_id">${ allData[i].id }</td>
            <td class="item_name">${ allData[i].name }</td>
            <td id="btns_actions">
                <button class="btn_edit" value="${ allData[i].id }">Edit Item</button>
                <button class="btn_delete" value="${ allData[i].id }">Delete</button>
            </td>
            <td>
                <form class="form_to_edit" hidden>
                    <input type="text" name="name" id="name" placeholder="Name Item">
                    <button class="btn_edit_item" value="${ allData[i].id }">Edit</button>
                </form>
            </td>
        </tr>
        `;
    }
    
}


function AddItem()
{   
    let count = localStorage.length;

    let itemsList = [];
    let newItem = new Object();
    newItem.id = count + 1;
    newItem.name = formToAdd[0].value;
    itemsList.push(newItem);

    data.SaveData(itemsList);

    RefreshItemList();
    ShowItems();
}

function DeleteItem(id)
{
    data.Delete(id);
    RefreshItemList();
    ShowItems();
}

function ShowFormEdit(id)
{
    const formEdit = document.getElementsByClassName('form_to_edit');
    formEdit[id - 1].hidden = false;

    let item = data.GetItemData(id);
    formEdit[id - 1][0].value = item.name;
}

function EditItem(id)
{
    const formEdit = document.getElementsByClassName('form_to_edit');
    let newName = formEdit[id - 1][0].value;
    data.EditData(id, newName);

    RefreshItemList();
    ShowItems();
}

function RefreshItemList()
{
    tbody.innerHTML = '';
}

ShowItems();

formToAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    AddItem();
});

tbody.addEventListener('click', (event) => {
    event.preventDefault();
    let id = event.target.value;
    
    if(event.target.className == 'btn_delete') {
        DeleteItem(id);
    }

    if(event.target.className == 'btn_edit') {
        ShowFormEdit(id);
    }

    if(event.target.className == 'btn_edit_item') {
        EditItem(id);
    }

})



document.addEventListener('DOMContentLoaded', ShowItems());




