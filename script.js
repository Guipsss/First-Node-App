let formMethod = 'POST';
let idHolder;
window.handleTableAction = (id, name, method) => {
    if(method == 'PUT') {
        formMethod = method;
        document.querySelector('#name').value = name;
        idHolder = id;
    } else if(method == 'DELETE') {
        formAction(id, null, method);
    }
}

let formAction = (id, name, method) => {
    let body;
    if(method == 'POST') {
        if(name) {
            body = { name : name };
            fetchData(body, method, 'insert');
        } else {
            document.querySelector('#status').innerHTML = 'Insert a name!';
        }
    } else if(method == 'PUT') {
        if(name) {
            body = {
                _id : idHolder,
                name : name
            };
            fetchData(body, method, 'update');
            formMethod = 'POST';
        } else {
            document.querySelector('#status').innerHTML = "Name field can't be empty!";
        }
    } else if(method == 'DELETE') {
        body = { _id : id };
        fetchData(body, method, 'delete');
    } else {
        return false;
    }
}

let fetchData = (body, method, path) => {
    fetch(`http://localhost:3000/${path}`, {
        method : method,
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(body)
    }).then(response => {
        return response.json();
    }).then(data => {
        getNames();
        document.querySelector('#form').reset();
        document.querySelector('#status').innerHTML = 'Action successful!';
        setTimeout(() => { document.querySelector('#status').innerHTML = '' }, 3000);
        console.log(data.status);
    }).catch(err => {
        console.log(err);
    });
}

let getNames = () => {
    fetch('http://localhost:3000', {
        method : 'get'
    }).then(response => {
        return response.json();
    }).then(data => {
        document.querySelector('#app').innerHTML = `
            <table id="namesTable">
            <tr>
                <th>Nome</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            ${data.map(i => `
                <tr>
                    <td>${i.name}</td>
                    <td><button onclick="handleTableAction('${i._id}', null, 'DELETE')"><i class="fas fa-trash-alt"></i></button></td>
                    <td><button onclick="handleTableAction('${i._id}', '${i.name}', 'PUT')"><i class="fas fa-pen"></i></button></td>
                </tr>
            `).join('')}
            </table>
        `;
    }).catch(err => {
        console.log(err);
    });
}

getNames();
document.querySelector('#form').addEventListener('submit', (event) => { 
    event.preventDefault();
    formAction(idHolder, document.querySelector('#name').value, formMethod);
});