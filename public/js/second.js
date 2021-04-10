var url = window.location.href;
url = url.split('?id=');
url = "https://pokeapi.co/api/v2/pokemon/" + url[1];
console.log(url);


fetch(url)
    .then(function(result) {
        return result.json()
    })
    .then(function(data){
        
        console.log(data.abilities)

        data.abilities.forEach(function(element, index, array) {
            console.log(element.ability.name)
        })    
})



    



