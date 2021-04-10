let pokemonName = document.getElementById('name')
let frontDefault = document.getElementById('front-default')
let backDefault = document.getElementById('back-default')
let frontShiny = document.getElementById('front-shiny')
let backShiny = document.getElementById('back-shiny')
let tableBase = document.getElementById('baseInformation')
let tableBase_body = tableBase.getElementsByTagName('tbody')[0];
let tableStatus = document.getElementById('baseStatus')
let tableStatus_body = tableStatus.getElementsByTagName('tbody')[0];

let url = window.location.href;
url = url.split('?id=');
url = "https://pokeapi.co/api/v2/pokemon/" + url[1];



fetch(url)
    .then(function(result) {
        return result.json()
    })
    .then(function(data){
        
        let components = []

        pokemonName.innerHTML = data.name
        frontDefault.src = data.sprites.front_default
        backDefault.src = data.sprites.back_default
        frontShiny.src = data.sprites.front_shiny
        backShiny.src = data.sprites.back_shiny

        components.push(data.id)
        insertNewRow(tableBase_body, 'ID', components)
        components = []

        data.types.forEach(function(element, index, array) {
            components.push(element.type.name)
        })  
        insertNewRow(tableBase_body, 'Type', components)
        components = []

        data.abilities.forEach(function(element, index, array) {
            components.push(element.ability.name)
        }) 
        insertNewRow(tableBase_body, 'Abilities', components)
        components = [] 
        
        components.push(data.height)
        insertNewRow(tableBase_body, 'High', components)
        components = []

        components.push(data.weight)
        insertNewRow(tableBase_body, 'Weight', components)
        components = []
        
        components.push(data.base_experience)
        insertNewRow(tableBase_body, 'Base Exp.', components)
        components = []
        
        data.stats.forEach(function(element, index, array) {
            components.push(element.base_stat)
            insertNewRow(tableStatus_body, element.stat.name , components)
            components = [] 
        }) 
})

function insertNewRow(body, title, components) {
    let newRow = body.insertRow();

    let idCell = newRow.insertCell(0);
    let idText = document.createTextNode(title);
    idCell.appendChild(idText);

    let id_Cell = newRow.insertCell(1);
    let id_Text = document.createTextNode(toStringComponents(components));
    id_Cell.appendChild(id_Text);

}

function toStringComponents(components) {
    let value = ""
    components.forEach(function(element) {
        value += `${element} | `
    })
    return value
}




    



