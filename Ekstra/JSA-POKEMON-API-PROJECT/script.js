const grid = document.getElementById("pokemonGrid");
const favGrid = document.getElementById("favoritesGrid");
const pageInfo = document.getElementById("pageInfo");

/* PAGINATION */
let page = 0;
const limit = 10;

/* FAVORITES */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchPokemonList() {
    const offset = page * limit;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    return await Promise.all(
        data.results.map(p => fetch(p.url).then(r => r.json()))
    );
}

async function renderPage() {
    const details = await fetchPokemonList()
    renderGrid(details);
    pageInfo.textContent = `Page ${page + 1}`;
}

function getSprite(pokemon, shiny, female, back) {
    const sprite = pokemon.sprites;

    if (shiny && female && sprite.front_shiny_female)
        return back ? sprite.back_shiny_female : sprite.front_shiny_female;

    if (shiny && sprite.front_shiny)
        return back ? sprite.back_shiny : sprite.front_shiny;

    if (female && sprite.front_female)
        return back ? sprite.back_female : sprite.front_female;

    return back ? sprite.back_default : sprite.front_default;
}

function renderGrid(pokemons) {
    grid.innerHTML = "";

    pokemons.forEach(pokemon => {
        let flipped = false;
        let shiny = false;
        let female = false;

        const sprite = pokemon.sprites;

        const hasShiny = sprite.front_shiny !== null;
        const hasFemale = sprite.front_female !== null;
        const hasCry = !!(pokemon.cries?.latest || pokemon.cries?.legacy);

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = getSprite(pokemon, shiny, female, flipped);

        const title = document.createElement("div");
        title.textContent = `#${pokemon.id} ${pokemon.name}`;

        const controls = document.createElement("div");
        controls.className = "controls";

        /* FLIP POKEMON */
        const flipBtn = document.createElement("button");
        flipBtn.textContent = "Flip";
        flipBtn.addEventListener('click', () => {
            flipped = !flipped;
            img.src = getSprite(pokemon, shiny, female, flipped);
        });

        /* TOGGLE SHINY */
        const shinyBtn = document.createElement("button");
        shinyBtn.textContent = "Shiny";
        shinyBtn.disabled = !hasShiny;
        shinyBtn.addEventListener('click', () => {
            shiny = !shiny;
            img.src = getSprite(pokemon, shiny, female, flipped);
        });

        /* TOGGLE FEMALE/MALE */
        const femaleBtn = document.createElement("button");
        femaleBtn.textContent = "Male";
        femaleBtn.disabled = !hasFemale;
        femaleBtn.addEventListener('click',() => {
            female = !female;
            femaleBtn.textContent = female ? "Female" : "Male";
            img.src = getSprite(pokemon, shiny, female, flipped);
        });

        /* PLAY POKEMON CRY */
        const soundBtn = document.createElement("button");
        soundBtn.textContent = "Cry";
        soundBtn.disabled = !hasCry;
        soundBtn.addEventListener('click', () => {
            const audio = new Audio(pokemon.cries?.latest || pokemon.cries?.legacy);
            audio.play();
        });

        /* FAVORITE A POKEMON */
        const favBtn = document.createElement("button");
        favBtn.innerHTML = favorites.includes(pokemon.id) ? "❤️" : "🤍";
        if (favorites.includes(pokemon.id)) favBtn.classList.add("fav");
        favBtn.addEventListener('click', () => toggleFavorite(pokemon.id)) 

        controls.append(flipBtn, shinyBtn, femaleBtn, soundBtn, favBtn);
        card.append(img, title, controls);
        grid.appendChild(card);
    });

    renderFavorites();
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        if (favorites.length >= 5) {
            alert("Max 5 favorites allowed!");
            return;
        }
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderPage();
}

async function renderFavorites() {
    favGrid.innerHTML = "";

    const favData = await Promise.all(
        favorites.map(id =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
        )
    );

    favData.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = p.sprites.front_default;

        const title = document.createElement("div");
        title.textContent = `#${p.id} ${p.name}`;

        card.append(img, title);
        favGrid.appendChild(card);
    });
}

function nextPage() {
    page++;
    renderPage();
}

function prevPage() {
    if (page > 0) page--;
    renderPage();
}

renderPage();