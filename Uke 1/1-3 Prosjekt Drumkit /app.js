
/* Class Example */
class Entity {
    constructor (hp) {
        this.hp = hp;
    };

    fight(entity) {
        entity.hp -= 10
    }
}

const player = new Entity(100);
const monster = new Entity(100);
console.log(player.hp, monster.hp)

while (player.hp > 0 || monster > 0) {
    player.fight(monster);
    monster.fight(player);
    console.log(player.hp, monster.hp);
}

/* DrumKit*/
const soundMap = {
    b: 'bongo',
    k: 'kick',
    s: 'snare'
};

const drumContainer = document.querySelector('#drum-container');
for (const key in soundMap) {
    const drumElement = document.createElement('div');
    drumElement.classList.add('drum');
    drumContainer.appendChild(drumElement);

    const imgElement = document.createElement('img');
    imgElement.src = `./images/${soundMap[key]}.jpg`;
    imgElement.width = 100;
    imgElement.height = 100;
    drumElement.appendChild(imgElement);

    const textElement = document.createElement('p');
    textElement.textContent = `${key}: ${soundMap[key]}`;
    drumElement.appendChild(textElement);

    drumElement.addEventListener('click', () => {
        playSound(soundMap[key]);
    })
};

const playSound = (sound) => {
    const audio = new Audio(`./sounds/${sound}.mp3`);
    audio.play();
};

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const sound = soundMap[key];
    if (sound) {
        playSound(sound)
    }
})