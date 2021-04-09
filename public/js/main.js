let table = document.getElementById('poke-table')
let tbody = table.getElementsByTagName('tbody')[0];
let navPrevious = document.getElementById('nav-previous')
let navNext = document.getElementById('nav-next')

let nextURL = ''
let previousURL = ''
let pokemonList = []

navNext.addEventListener("click", function(event){
    if(!navNext.classList.contains('disabled')){
        getPokemonList(nextURL).then(function(data){
            clearTable()
            fillTable(data)
        })
    }
})


navPrevious.addEventListener("click", function(event){
    if(!navPrevious.classList.contains('disabled')){
        getPokemonList(previousURL).then(function(data){
            clearTable()
            fillTable(data)
            
        })
    }
})

async function getPokemonList(url){
    let response = await fetch(url)
    let json = await response.json()
    return json
}


function clearTable() {
    let new_tbody = document.createElement('tbody')
    table.replaceChild(new_tbody, tbody)
    tbody = new_tbody
}


function fillTable(data) {
    if(data.previous == null) {
        navPrevious.classList.add("disabled")
    } else {
        navPrevious.classList.remove("disabled")
    }

    if(data.next == null) {
        navNext.classList.add("disabled")
    } else {
        navNext.classList.remove("disabled")
    }

    nextURL = data.next
    previousURL = data.previous

    // getTodos(data)


// async function getTodos(data) {

//     for (const [idx, element] of data.results.entries()) {
//         const todo = await fetch(element.url)
//         // console.log(`Received Todo ${idx+1}:`, todo.id);
        
//         const newDATA = await fetch(todo.url)
//         console.log(`Received Todo ${idx+1}:`, newDATA.id);
//     }
//     console.log('finished')
// }
    
    data.results.forEach(function(element, index, array) {
        fetch(element.url)
        .then(function(result) {
            return result.json()
        })
        .then(async function(data){
            
            let pokemonInfo = {id:data.id, name:data.name, weight:data.weight}
            pokemonList[data.id-1] = pokemonInfo     
            insertNewRow(data)
        }) 
        

    })
}

console.log("qualquer cois")

// for (var i = 0; i < 20; i++) {
//     console.log(i)
//     insertNewRow(pokemonList[i])
// }



function insertNewRow(data) {
    let newRow = tbody.insertRow();

    let idCell = newRow.insertCell(0);
    let idText = document.createTextNode(data.id);
    idCell.appendChild(idText);

    let nameCell = newRow.insertCell(1);
    let nameText = document.createTextNode(data.name);
    nameCell.appendChild(nameText);

    let weightCell = newRow.insertCell(2);
    let weightText = document.createTextNode(data.weight);
    weightCell.appendChild(weightText);

    let detailCell = newRow.insertCell(3);
    let detailButton = document.createElement('button');
    detailButton.type = "button"
    detailButton.classList.add("btn")
    detailButton.classList.add("btn-dark")
    detailButton.innerHTML = "Detalhes"
    detailButton.addEventListener("click", function(event){
        window.open(`file:///home/brennoharten/Estudo/pokedex/new.html?id=${data.id}`, "_self")
        //window.open("http://localhost:8080/new.html")
    })
    detailCell.appendChild(detailButton);
}

getPokemonList("https://pokeapi.co/api/v2/pokemon").then(function(data){
    clearTable()
    fillTable(data)
})
