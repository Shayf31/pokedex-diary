//get the container
const pokemonContainer = document.getElementById("pokemonContainer");

//Shape the Pokémon data
function shapePokemon(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
    },
  };
}


// Fetch the Pokémon via fetch API
async function fetchPokemon() {
  const pokemonArray = [];

  for (let i = 1; i <= 20; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    const pokemon = shapePokemon(data);
    pokemonArray.push(pokemon);
  }

  renderPokemon(pokemonArray);
}

//Render the cards - loop through pokemon array gen 1 card per pokemon
function renderPokemon(pokemonArray) {
  pokemonContainer.innerHTML = "";

  pokemonArray.forEach((pokemon) => {
    const card = document.createElement("article");


    //main card outer styling
    card.className = "bg-white rounded-3xl shadow-md overflow-hidden";

    //inner card styling + insert dynamic data (${})
    card.innerHTML = `
      <div class="bg-slate-100 h-56 flex items-center justify-center">
        <img src="${pokemon.image}" alt="${pokemon.name}" class="w-28 h-28 object-contain" />
      </div>

      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-extrabold capitalize">${pokemon.name}</h2>
          <span class="text-slate-500 font-semibold text-2xl">#${pokemon.id}</span>
        </div>

        <div class="space-y-3 text-xl">
          <div class="flex justify-between">
            <span class="text-slate-600">HP:</span>
            <span class="font-bold">${pokemon.stats.hp}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Attack:</span>
            <span class="font-bold">${pokemon.stats.attack}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Defense:</span>
            <span class="font-bold">${pokemon.stats.defense}</span>
          </div>
        </div>
      </div>
    `;


    //Add the cards to the page
    pokemonContainer.appendChild(card);
  });
}

fetchPokemon();