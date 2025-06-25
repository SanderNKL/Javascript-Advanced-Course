// HTTP(S) HyperText Transfer Protocol (Secure)

/* setTimeout */
const buttonWithCooldown = document.querySelector('#cooldown-button');
buttonWithCooldown.addEventListener('click', () => {
    let buttonText = buttonWithCooldown.textContent;
    buttonWithCooldown.textContent = 'This button is currently unavailable.',
    buttonWithCooldown.disabled = true;
    setTimeout(
        () => {
            buttonWithCooldown.textContent = buttonText
            buttonWithCooldown.disabled = false;
        },
        2000
    )
});

// Ex: 1
setTimeout(() => console.log('This is a delayed message!'), 5000);

// Ex 2:
const sayHello = () => console.log('Hello world');
setTimeout(() => sayHello, 100);

// Ex 3:
const sayBye = () => console.log('Bye world');
setTimeout(sayBye, 100);

// setTimeout()
const timedResponse = () => {
    console.log('Starting the time!')
    setTimeout(() => console.log('Hello!'), 5000)
}

// timedResponse();


/* API
METODER
- GET: Henter data fra API.
- POST: Lage data.
- PUT: Endre på dataene. Overskriver det ligger der fra før.
- PATCH: Endrer vi på spesefike felt i dataene våre.
- DELETE: Sletter data.

INFORMASJONSKODER
- 100-199: Informasjonskoder.
- 200-299: Godkjentkoder.
- 300-399: Omdirigeringskoder.
- 400-499: Klient Error.
- 500-599: Server Error.
*/

// TODO: DRY (For API Link)
// Parametere

const API_URL = 'https://catfact.ninja';

const getFact = async () => {
    const response = await fetch(`${API_URL}/fact`); // Vi får en <Promise>
    console.log('response type:', response.status);
    return response.ok ? await response.json() : null; // Ternary Operator
}

async function getFacts() {
    const response = await fetch(`${API_URL}/facts?limit=5&max_length=50`); // Vi får en <Promise>
    console.log('response type:', response.status);
    return response.ok ? await response.json() : null; // Ternary Operator
}

const factButton = document.createElement("button");
factButton.textContent = "Get Fact";
factButton.addEventListener('click', async () => {
    console.log(await getFact())
});

const factsButton = document.createElement("button");
factsButton.textContent = "Get Facts";
factsButton.addEventListener('click', async () => {
    console.log(await getFacts())
});

document.body.append(factButton, factsButton);