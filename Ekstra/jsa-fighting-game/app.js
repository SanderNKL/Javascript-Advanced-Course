const startBtn = document.getElementById("startBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const playerNameInput = document.getElementById("playerNameInput");
const startSection = document.getElementById("startSection");
const fightSection = document.getElementById("fighters");
const attackBtn = document.getElementById("attackBtn");
const criticalAttackBtn = document.getElementById("criticalAttackBtn");
const comabtLogElement = document.getElementById("comabtLog");

let fighter1 = null;
let fighter2 = null;
let wave = 1;

class Entity {
    constructor(
        name,
        hp = 20,
        atk = 1,
        helmet = null,
        sword = null
    ) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.atk = atk;
        this.helmet = helmet;
        this.sword = sword;
    }

    fight(entity, multiplier) {
        const entityDefense = entity.helmet ? entity.helmet.def : 0;
        const attackPower = this.atk + (this.sword ? this.sword.atk : 0);
        const damage = Math.max(attackPower - entityDefense, 0) * multiplier;
        entity.hp -= damage;
        return damage;
    }
}

class Helmet {
    constructor(name, def) {
        this.name = name;
        this.def = def;
    }
}

class Sword {
    constructor(name, atk) {
        this.name = name;
        this.atk = atk;
    }
}

tryAgainBtn.addEventListener("click", () => {
    // Reset the Wave
    wave = 1;

    // Reset the UI
    startSection.style.display = "block";
    fightSection.style.display = "none";
    document.getElementById("defeatedScreen").style.display = "none";
    document.getElementById("rewardSection").style.display = "none";
    comabtLogElement.innerHTML = "";

    // Reset the fighters
    playerNameInput.value = "";
    fighter1 = null;
    fighter2 = null;
});

const getRandomOpponent = () => {
    const names = ["Bandit", "Orc", "Goblin", "Skeleton", "Raider"];
    const name = names[Math.floor(Math.random() * names.length)];

    // Randomly generate stats for the opponent
    const hp = 15 + Math.floor(Math.random() * 10) + wave * 5;
    const atk = 3 + Math.floor(Math.random() * 3) + Math.floor(wave / 2);
    const helmet = Math.random() > 0.5 ? new Helmet("Basic Helmet", Math.floor(Math.random() * 3) + Math.floor(wave / 3)) : null;
    const sword = Math.random() > 0.5 ? new Sword("Basic Sword", Math.floor(Math.random() * 3) + Math.floor(wave / 3)) : null;

    return new Entity(name, hp, atk, helmet, sword);
}

const updateStats = () => {
    document.getElementById("fighter-one-name").textContent = fighter1.name;
    document.getElementById("fighter-one-stats").innerHTML = `
        HP: ${fighter1.hp}<br>
        ATK: ${fighter1.atk} (+${fighter1.sword ? fighter1.sword.atk : 0})<br>
        Helmet DEF: ${fighter1.helmet ? fighter1.helmet.def : 0}
    `;
    if (fighter2) {
        document.getElementById("fighter-two-name").textContent = fighter2.name;
        document.getElementById("fighter-two-stats").innerHTML = `
            HP: ${fighter2.hp}<br>
            ATK: ${fighter2.atk} (+${fighter2.sword ? fighter2.sword.atk : 0})<br>
            Helmet DEF: ${fighter2.helmet ? fighter2.helmet.def : 0}
        `;
    }
}

const showRewards = () => {
    const rewards = [];
    for (let i = 0; i < 3; i++) {
        const rng = Math.random();
        if (rng < 0.33) {
            rewards.push({ type: "helmet upgrade", amount: Math.floor(Math.random() * 3) + 1 });
        } else if (rng < 0.66) {
            rewards.push({ type: "sword upgrade", amount: Math.floor(Math.random() * 3) + 1 });
        } else {
            rewards.push({ type: "hp" });
        }
    }

    const rewardsDiv = document.getElementById("rewards");
    rewardsDiv.innerHTML = "";

    rewards.forEach((reward) => {
        const btn = document.createElement("button");
        if (reward.type === "helmet upgrade") {
            btn.textContent = `${reward.type} (+${reward.amount} DEF)`;
            btn.onclick = () => {
                fighter1.helmet.def += reward.amount;
                finalizeReward();
            };
        } else if (reward.type === "sword upgrade") {
            btn.textContent = `${reward.type} (+${reward.amount} ATK)`;
            btn.onclick = () => {
                fighter1.sword.atk += reward.amount;
                finalizeReward();
            };
        } else {
            btn.textContent = `Restore Health`;
            btn.onclick = () => {
                fighter1.hp = fighter1.maxHp;
                finalizeReward();
            };
        }
        rewardsDiv.appendChild(btn);
    });

    document.getElementById("rewardSection").style.display = "block";
}

const finalizeReward = () => {
    document.getElementById("rewardSection").style.display = "none";
    fighter2 = getRandomOpponent();
    comabtLogElement.innerHTML = `<p>A new opponent, ${fighter2.name}, approaches!</p>`;
    attackBtn.disabled = false;
    criticalAttackBtn.disabled = false;
    wave++;
    updateStats();
}

const fight = (move) =>  {
    if ( move === 'critical') {
        if (Math.random() < 0.2) {
            fighter1.fight(fighter2, 2);
            comabtLogElement.innerHTML += `<p>${fighter1.name} hits a critical hit on ${fighter2.name}!</p>`;
        }
        else {
            comabtLogElement.innerHTML += `<p>${fighter1.name} missed!</p>`;
        }
    } else {
        fighter1.fight(fighter2, 1);
        comabtLogElement.innerHTML += `<p>${fighter1.name} attacks ${fighter2.name}!</p>`;
    };

    if (fighter2.hp <= 0) {
        comabtLogElement.innerHTML += `<p>${fighter2.name} has been defeated!</p>`;

        attackBtn.disabled = true;
        criticalAttackBtn.disabled = true;

        showRewards();
        updateStats();
        return;
    };

    if (Math.random() < 0.2) {
        fighter2.fight(fighter1, 2);
        comabtLogElement.innerHTML += `<p>${fighter2.name} hits a critical hit on ${fighter1.name}!</p>`;
    } else {
        fighter2.fight(fighter1, 1);
        comabtLogElement.innerHTML += `<p>${fighter2.name} attacks ${fighter1.name}!</p>`;
    }

    if (fighter1.hp <= 0) {
        comabtLogElement.innerHTML += `<p>${fighter1.name} has been defeated! Game over.</p>`;

        attackBtn.disabled = true;
        criticalAttackBtn.disabled = true;

        fightSection.style.display = "none";
        document.getElementById("rewardSection").style.display = "none";
        document.getElementById("defeatedScreen").style.display = "block";
    }

    updateStats();
}

attackBtn.addEventListener("click", () => fight('attack'));
criticalAttackBtn.addEventListener("click", () => fight('critical'));

startBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name === "") {
        alert("Please enter your name to start the game.");
        return;
    }

    attackBtn.disabled = false;
    criticalAttackBtn.disabled = false;
    startSection.style.display = "none";
    fightSection.style.display = "block";
    document.getElementById("rewardSection").style.display = "none";

    fighter1 = new Entity(
        name,
        20,
        5,
        new Helmet("Iron Helmet", 2),
        new Sword("Steel Sword", 3)
    );
    fighter2 = getRandomOpponent();

    comabtLogElement.innerHTML = `<p>A new opponent, ${fighter2.name}, approaches!</p>`;
    updateStats();
});
