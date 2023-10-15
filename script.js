const pokepedia = document.getElementById("content");
console.log(pokepedia);
 for(let i =1;i<=150;i++){
 (fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
 .then((response) => {
    return response.json()
 }))
 .then((data) => {
    // console.log(data);
   
    const pokemon = {
        name : data.name,
        id : data.id,
        image : data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(','),
        stats : data.stats.map((stat) => `${stat.stat.name}:${stat.base_stat}`),
     height: data.height,
     weight: data.weight,
     ability : data.abilities.map(ability => ability.ability.name),
      
    };
   console.log(pokemon)

const pokemonCard = document.createElement("div");
pokemonCard.classList.add("pokemon-card");

const image = document.createElement("img");
image.src = pokemon.image;

const name = document.createElement("h2");
name.textContent = pokemon.name;

const id = document.createElement("p");
id.textContent = `ID: ${pokemon.id}`;

const type = document.createElement("p");
type.textContent = `Type: ${pokemon.type}`;

const stats = document.createElement("p");
stats.textContent = `Stats: ${pokemon.stats.join('\n')}`;

const height = document.createElement("p");
height.textContent = `Height: ${pokemon.height} decimetres`;

const weight = document.createElement("p");
weight.textContent = `Weight: ${pokemon.weight} hectograms`;

const ability = document.createElement("p");
ability.textContent = `Abilities: ${pokemon.ability.join(',')}`;


pokemonCard.appendChild(image);
pokemonCard.appendChild(name);
pokemonCard.appendChild(id);
pokemonCard.appendChild(type);
pokemonCard.appendChild(stats);
pokemonCard.appendChild(height);
pokemonCard.appendChild(weight);
pokemonCard.appendChild(ability);

pokepedia.appendChild(pokemonCard);
});
}








