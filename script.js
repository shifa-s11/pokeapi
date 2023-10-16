const pokepedia = document.getElementById("content");
const search = document.getElementById("search");
console.log(pokepedia);
 for(let i =1;i<=150;i++){
 (fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
 .then((response) => {
    return response.json()
 }))
 .then((data) => {
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

const pokemonCard1 = document.createElement("div");
pokemonCard1.classList.add("pokemon-card1");

const image = document.createElement("img");
image.src = pokemon.image;
image.id='image';

const name = document.createElement("h2");
name.textContent = pokemon.name;
name.id='name';
const id = document.createElement("p");
id.textContent = `# ${pokemon.id}`;
id.id = 'id';
const type = document.createElement("p");
type.textContent = `Type: ${pokemon.type}`;
type.id = 'type';
const ability = document.createElement("p");
ability.textContent = `Abilities: ${pokemon.ability.join(',')}`;
ability.id='ability';
  const stats = document.createElement('p');
   stats.textContent = `Stats: ${pokemon.stats.join(" \n ")}`;
  stats.id = 'stats';
const height = document.createElement("p");
height.textContent = `Height: ${pokemon.height} decimeters`;
height.id = 'height';
const weight = document.createElement("p");
weight.textContent = `Weight: ${pokemon.weight} hectograms`;
weight.id ='weight';


pokemonCard1.appendChild(image);
pokemonCard1.appendChild(id);
pokemonCard1.appendChild(name);
pokemonCard1.appendChild(type);
pokemonCard1.appendChild(stats);
pokemonCard1.appendChild(height);
pokemonCard1.appendChild(weight);
pokemonCard1.appendChild(ability);
pokepedia.appendChild(pokemonCard1);
});
}
search.addEventListener("input", (event) => {
   const Term = event.target.value.toLowerCase();
   const pokemonCards = document.querySelectorAll(".pokemon-card1");
   pokemonCards.forEach((card) => {
     const pokemonName = card.querySelector("#name").textContent.toLowerCase();
     if (pokemonName.includes(Term)) {
       card.style.display = "block";
     } else {
       card.style.display = "none";
     }
   });
 });


