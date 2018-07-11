let showId = (id) => {
    console.log(id);
}

let getNames = () => {
    fetch('http://localhost:3000', {
        method : 'get'
    }).then(response => {
        return response.json();
    }).then(data => {
        document.querySelector('#app').innerHTML = `
            <ul>
            ${data.map(i => `
                <li onclick="showId('${i._id}')">${i.name}</li>
            `).join('')}
            </ul>
        `;
    }).catch(err => {
        console.log(err);
    });
}

let postName = () => {
    let name = document.querySelector('#name').value;
    let obj = { "name" : name };
    fetch('http://localhost:3000/cadastrar', {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        getNames();
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

getNames();
document.querySelector('#form').addEventListener('submit', (event) => { 
    event.preventDefault();
    postName(); 
});