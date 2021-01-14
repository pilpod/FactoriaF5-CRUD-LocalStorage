
export class Storage {

    GetAllData()
    {       
            let itemList = [];

            for(let i = 0; i < localStorage.length; i++) {
                let item = localStorage.getItem(localStorage.key(i));
                item = JSON.parse(item);
                console.log(item['name'])
                itemList.push(item);
            }
            
            return itemList;

    }

    SaveData(data)
    {
        data.forEach(item => {
            let key = item.id;
            let itemString = JSON.stringify(item);
            localStorage.setItem(key, itemString)
        });
    }

    GetLastItemData()
    {
        let lastItem = localStorage.getItem(localStorage.length)
        lastItem = JSON.parse(lastItem);
        return lastItem;
    }

    GetItemData(id)
    {
        let item = localStorage.getItem(id);
        item = JSON.parse(item);

        return item;
    }

    EditData(id, data)
    {   
        let item = {
            id: id,
            name: data
        }

        data = JSON.stringify(item);

        localStorage.setItem(id, data);
    }

    Delete(id)
    {
        localStorage.removeItem(id);
    }

}