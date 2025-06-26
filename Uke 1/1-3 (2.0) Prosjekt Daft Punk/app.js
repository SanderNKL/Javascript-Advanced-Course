/* Drum kit / Sound Board */
const soundMap = {
    q: 'work_it',
    w: 'make_it',
    e: 'do_it',
    r: 'makes_us',
    t: 'harder',
    y: 'better',
    u: 'faster',
    i: 'stronger',
    o: 'more_than',
    p: 'hour',
    a: 'our',
    s: 'never',
    d: 'ever',
    f: 'after',
    g: 'work_is',
    h: 'over'
}

const drumContainer = document.querySelector("#drum-container");
for (const key in soundMap) {
    const drumElement = document.createElement('div');
    drumElement.classList.add('soundButton');
    drumContainer.append(drumElement);

    const textElement = document.createElement('p');
    textElement.textContent = `${key}: ${soundMap[key]}`
    drumElement.append(textElement);

    drumElement.addEventListener('click', () => {
        playSound(soundMap[key]);
    });
};

const playSound = (sound) => {
    const audio = new Audio(`./sounds/${sound}.wav`);
    audio.play();
};

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const sound = soundMap[key];
    if (sound) {
        playSound(sound);
    }
});