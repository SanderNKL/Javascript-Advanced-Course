var pokemon = undefined;
const API_URL = "https://pokeapi.co/api/v2";
const pokemonContainer = document.querySelector("#pokemonContainer");
const filters = { shiny: true, direction: 'front'}
let search = "";

const rotatePokemon = () => filters.direction === 'front'
    ? filters.direction = 'back'
    : filters.direction = 'front';

const rotatePokemonButton = () => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Rotate Pokemon";
    buttonElement.addEventListener('click', () => {
        rotatePokemon();
        renderPage();
    });
    return buttonElement;
}

const fetchPokemonButton = () => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Fetch random pokemon";
    buttonElement.addEventListener('click', fetchRandomPokemon)
    return buttonElement;
}

const toggleShinyButton = () => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Toggle shiny";
    buttonElement.addEventListener('click', () => {
        filters.shiny = !filters.shiny
        renderPage();
    });
    return buttonElement;
}

const searchButton = () => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Search";
    buttonElement.addEventListener('click', async () => {
        if (search.length > 0) {
            await fetchPokemon(search);
            renderPage();
        } else {
            alert("**Ooo, let me go on a tedious adventure, just to find you nothing. [Processing....] Ahh! Here you go my good sir, absolutely nothing.")
        }
    })
    return buttonElement
}

const searchInput = () => {
    const inputElement = document.createElement("input");
    inputElement.value = search;
    inputElement.placeholder = "ID or Pokemon name here..."
    inputElement.addEventListener('input', () => {search = inputElement.value});

    return inputElement;
}

const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`${API_URL}/pokemon/${id}`);
        pokemon = await response.json();
    } catch (err) {
        pokemon = undefined;
    }
}

const fetchRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 1000);
    await fetchPokemon(id);
    renderPage();
}

const displayPokemon = (pokemon) => {
    const imgElement = document.createElement("img");
    
    if (filters.shiny) {
        imgElement.src = filters.direction === 'front'
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.back_shiny
    } else {
        imgElement.src = filters.direction === 'front'
        ? pokemon.sprites.front_default
        : pokemon.sprites.back_default
    }

    imgElement.width = 200;
    imgElement.height = 200;

    pokemonContainer.appendChild(imgElement); 
}

const renderPage = () => {
    pokemonContainer.replaceChildren();

    if (pokemon) {
        displayPokemon(pokemon, pokemonContainer);
    };

    const fetchPokemonBtn = fetchPokemonButton();
    const rotatePokemonBtn = rotatePokemonButton();
    const toggleShinyBtn = toggleShinyButton();
    const searchField = searchInput();
    const searchBtn = searchButton();

    const interactionContainer = document.createElement("div");
    interactionContainer.append(fetchPokemonBtn, rotatePokemonBtn, toggleShinyBtn, searchField, searchBtn);
    pokemonContainer.append(interactionContainer);
}

renderPage();