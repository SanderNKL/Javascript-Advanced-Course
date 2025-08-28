const pokemonsContainer = document.querySelector("#pokemons-container");
const POKEMON_API_URL = "https://pokeapi.co/api/v2";

let page = 1;

let pokemonList = [];

/* Store some states
- isShiny: boolean
- direction: string
- sex: string
*/

// Fetch Pokemons Service
const fetchPokemons = async (limit, offset) => {
    try {
        const response = await fetch(`${POKEMON_API_URL}/pokemon?limit=${limit}&offset=${offset}`);
        const jsonBody = await response.json();
        return jsonBody.results.map(pokemon => ({
            ...pokemon,
            isShiny: false,
            direction: 'front',
            sex: 'male'
        }));
    } catch (err) {
        return [];
    }
};

const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const jsonBody = await response.json();
    return jsonBody
}

const nextPageButton = () => {
    const nextPageBtn = document.createElement('button');
    nextPageBtn.textContent = 'Next Page';
    nextPageBtn.addEventListener('click', async () => {
        page++;
        renderPage();
    });
    return nextPageBtn;
};

const previousPageButton = () => {
    const previousPageBtn = document.createElement('button');
    previousPageBtn.textContent = 'Previous Page';
    previousPageBtn.addEventListener('click', async () => {
        if (page <= 1) {
            return;
        }

        page--;
        renderPage();
    });
    return previousPageBtn;
};

const renderPokemonImage = (pokemonObj, shiny, sex, direction) => {
    /* Account for:
    - Is it a shiny?
    - Is it male, or female?
    - Which direction am I facing?
    */

    if (sex === 'male') {
        return shiny ? (
            direction === 'front'
                ? pokemonObj.sprites.front_shiny
                : pokemonObj.sprites.back_shiny
        ) : (
            direction === 'front'
                ? pokemonObj.sprites.front_default
                : pokemonObj.sprites.back_default
        )
    } else {
        return shiny ? (
            direction === 'front'
                ? pokemonObj.sprites.front_shiny_female
                : pokemonObj.sprites.back_shiny_female
        ) : (
            direction === 'front'
                ? pokemonObj.sprites.front_female
                : pokemonObj.sprites.back_female
        )
    }
}

const buildPage = async (pokemons) => {
    pokemonsContainer.replaceChildren();
    for (let pokemon of pokemons) {
        const pokemonData = await fetchPokemon(pokemon.url)

        const pokemonCard = document.createElement('div');

        const pokemonImg = document.createElement('img');
        pokemonImg.src = pokemonData.sprites.front_default
        pokemonImg.height = 100;
        pokemonImg.width = 100;

        const pokemonNameEl = document.createElement('h1');
        pokemonNameEl.textContent = pokemonData.name;

        const rotateDirection = document.createElement('button');
        rotateDirection.textContent = 'Rotate Pokemon';
        rotateDirection.addEventListener('click', () => {
            pokemon.direction = pokemon.direction === 'front' ? 'back' : 'front';
            pokemonImg.src = renderPokemonImage(
                pokemonData,
                pokemon.isShiny,
                pokemon.sex,
                pokemon.direction
            )
        })

        const toggleShinyBtn = document.createElement('button');
        toggleShinyBtn.textContent = 'Toggle Shiny';
        toggleShinyBtn.addEventListener('click', () => {
            pokemon.isShiny = !pokemon.isShiny;
            pokemonImg.src = renderPokemonImage(
                pokemonData,
                pokemon.isShiny,
                pokemon.sex,
                pokemon.direction
            )
        })

        const swapGenderBtn = document.createElement('button');
        swapGenderBtn.textContent = 'Swap gender button';
        swapGenderBtn.addEventListener('click', () => {
            pokemon.sex = pokemon.sex === 'male' ? 'female' : 'male';
            pokemonImg.src = renderPokemonImage(
                pokemonData,
                pokemon.isShiny,
                pokemon.sex,
                pokemon.direction
            )
        });

        pokemonCard.append(
            pokemonImg,
            pokemonNameEl,
            rotateDirection,
            toggleShinyBtn,
            swapGenderBtn
        )
        pokemonsContainer.append(pokemonCard)
    };

    pokemonsContainer.append(
        previousPageButton(),
        nextPageButton()
    );

};

const renderPage = async () => {
    pokemonList = await fetchPokemons(10, (page - 1) * 10);
    await buildPage(pokemonList);
};

renderPage().then();