
let count = 0; let responseData = []; let editIndex = -1;

const fetchData = async () => {
    try {

        let data = await fetch('assets/js/contact.json')
        data = await data.json()
        return data

    } catch (error) {

        alert(error)
    }

}


window.onload = async () => {

    responseData = await fetchData();
    listContact(responseData);
};

function listContact() {

    document.getElementById("contactList").innerHTML = "";
    let search = document.getElementById('searchInput').value.toLowerCase();
    responseData = responseData.filter((el) => el.name.toLowerCase().includes(search) || el.phone.includes(search))

    for (let i = 0; i < responseData?.length; i++) {

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-success";

        //create a span with content as the id and append to li
        const id = document.createElement("span");
        id.textContent = responseData[i]?.id;
        li.appendChild(id);

        //create a span with content as the name and append to li
        const name = document.createElement("span");
        name.textContent = responseData[i]?.name;
        li.appendChild(name);

        //create a span with content as the phone number and append to li
        const phone = document.createElement("span");
        phone.textContent = responseData[i]?.phone;
        li.appendChild(phone);

        const button = document.createElement("span");
         //create a delete button and append to li
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-sm btn-danger";
        deleteButton.onclick = () => deleteContact(i);
        button.appendChild(deleteButton);

        //create an edit button and append to li
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn btn-sm btn-success mx-3";
        editButton.onclick = () => editContact(i);
        button.appendChild(editButton);
        li.appendChild(button);

        document.getElementById("contactList").appendChild(li);

    }

    count = responseData.length;
}

const form = document.getElementById("contactForm");
const nameField = document.getElementById("name");
const phoneField = document.getElementById("phone");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    let name = nameField.value.trim();
    let phone = phoneField.value.trim();
    count++;
    let obj = {};
    obj["id"] = count;
    obj["name"] = name;
    obj["phone"] = phone;

    if (editIndex == -1)
        responseData.push(obj);
    else
    {   
        obj["id"] = editIndex+1;
        responseData[editIndex] = obj;
        editIndex=-1;
    }

    form.reset();
    document.getElementById("contactList").innerHTML = "";
    listContact()

});

function deleteContact(index) {
    responseData.splice(index, 1);
    document.getElementById("contactList").innerHTML = "";
    listContact()
}

function editContact(index) {
   
    nameField.value = responseData[index].name;
    phoneField.value = responseData[index].phone;
    editIndex = index;
}
