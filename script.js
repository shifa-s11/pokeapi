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

   const poke = document.createElement("div");
    poke.classList.add("poke");
    poke.id = 'poke';
    const poke1 = document.getElementById("poke")
const pokemonCard1 = document.createElement("div");
pokemonCard1.id= 'pokemon-card1'

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
const pokemonCard2 = document.createElement("div")
pokemonCard2.id = 'pokemon-card2'
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
pokemonCard2.appendChild(stats);
pokemonCard2.appendChild(height);
pokemonCard2.appendChild(weight);
pokemonCard1.appendChild(ability);
pokepedia.appendChild(poke);
poke.appendChild(pokemonCard1);
poke.appendChild(pokemonCard2);
  // events
 pokemonCard1.addEventListener("mouseenter", function () { 
  pokemonCard1.style.visibility="hidden"; 
  pokemonCard2.style.visibility = "visible";
 });
pokemonCard1.addEventListener("click",function(){
  setTimeout(function (){
    pokemonCard2.style.visibility = "visible"
  pokemonCard1.style.visibility = "hidden";
 ;},3000
)})
  pokemonCard1.addEventListener("mouseleave", function () {
  setTimeout(function (){
  pokemonCard2.style.visibility="hidden";
  pokemonCard1.style.visibility = "visible";
},3000);
});
});}
//search
 search.addEventListener("input", (event) => {
    const Term = event.target.value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".poke");
  pokemonCards.forEach((card) => {
     const pokemonName = card.querySelector("#name").textContent.toLowerCase(); 
     const pokemonId = card.querySelector("#id").textContent;
     const pokemonAbilities = card.querySelector("#ability").textContent.toLowerCase();
     
        if (pokemonName.includes(Term)||pokemonAbilities.includes(Term)||pokemonId===Term) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
     }
   });
 })
 //loader
 const load = document.getElementById("loader");
 window.addEventListener("load",function(){
   load.style.display = "none"
 })
//download
const dowbtn = document.getElementById("download");

function Data() {
    const cards = document.querySelectorAll(".poke");
    const pokeData = [];
    cards.forEach((card) => {
        const name = card.querySelector("#name").textContent;
        const id = card.querySelector("#id").textContent;
        const type = card.querySelector("#type").textContent;
        const ability = card.querySelector("#ability").textContent;
        const stats = card.querySelector("#stats").textContent;
        const height = card.querySelector("#height").textContent;
        const weight = card.querySelector("#weight").textContent;

        const dd = `
Name: ${name}
ID: ${id}
Type: ${type}
Abilities: ${ability}
Stats: ${stats}
Height: ${height}
Weight: ${weight}
`;
        pokeData.push(dd);
    });

    return pokeData.join("\n\n");
}

function download(format) {
    const data = Data();
    if (format === "txt") {
        const blob = new Blob([data], { type: "text/plain" });
        dowfile(blob, "pokemon_data.txt");
    } else if (format === "csv") {
        const cards = document.querySelectorAll(".poke");
        const cardArray = Array.from(cards);
        const csvData = "Name,ID,Type,Abilities,Stats,Height,Weight\n" +
            cardArray.map(card =>
                `${card.querySelector("#name").textContent},${card.querySelector("#id").textContent},${card.querySelector("#type").textContent},${card.querySelector("#ability").textContent},${card.querySelector("#stats").textContent},${card.querySelector("#height").textContent},${card.querySelector("#weight").textContent}`
            ).join("\n");
        const blob = new Blob([csvData], { type: "text/csv" });
        dowfile(blob, "pokemon_data.csv");
    } else if (format === "json") {
        const jsonData = JSON.stringify(Data(), null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        dowfile(blob, "pokemon_data.json");
    }
}

function dowfile(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

dowbtn.addEventListener("change", function () {
    const sel = dowbtn.value;
    if (sel === "txt") {
        download("txt");
    } else if (sel === "csv") {
        download("csv");
    } else if (sel === "json") {
        download("json");
    }
});










