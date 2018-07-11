let deleteRow = (id) => {
    let obj = { "_id" : id };
    fetch('http://localhost:3000/delete', {
        method : 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        getNames();
        console.log(data.status);
    }).catch(err => {
        console.log(err);
    });
}

let updateRow = (id, name) => {
    let upId = id;
    let upName;
    document.querySelector('#name').value = name;
    document.querySelector('#submit').addEventListener('click', (event) => {
        event.preventDefault();
        upName = document.querySelector('#name').value;
        document.querySelector('#submit').removeEventListener('click', () => {});
        let obj = { 
            _id : upId,
            name : upName
        };
        fetch('http://localhost:3000/update', {
            method : 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(obj)
        }).then(response => {
            return response.json();
        }).then(data => {
            getNames();
            document.querySelector('#form').reset();
            document.querySelector('#status').innerHTML = 'Name updated successfully';
            setTimeout(() => { document.querySelector('#status').innerHTML = '' }, 3000);
            console.log(data.status);
        }).catch(err => {
            console.log(err);
        });
    });
}

let getNames = () => {
    fetch('http://localhost:3000', {
        method : 'get'
    }).then(response => {
        return response.json();
    }).then(data => {
        document.querySelector('#app').innerHTML = `
            <table>
            <tr>
                <th>Nome</th>
                <th>ID</th>
            </tr>
            ${data.map(i => `
                <tr>
                    <td>${i.name}</td>
                    <td><button onclick="deleteRow('${i._id}')">Delete</button></td>
                    <td><button onclick="updateRow('${i._id}', '${i.name}')">Update</button></td>
                </tr>
            `).join('')}
            </table>
        `;
    }).catch(err => {
        console.log(err);
    });
}

let postName = () => {
    let name = document.querySelector('#name').value;
    if(!name) {
        alert("Name missing");
        return false;
    }
    let obj = { "name" : name };
    fetch('http://localhost:3000/cadastrar', {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        getNames();
        document.querySelector('#form').reset();
        document.querySelector('#status').innerHTML = 'Name inserted successfully';
        setTimeout(() => { document.querySelector('#status').innerHTML = '' }, 3000);
        console.log(data.status);
    }).catch(err => {
        console.log(err);
    });
}

getNames();
document.querySelector('#form').addEventListener('submit', (event) => { 
    event.preventDefault();
    postName(); 
});