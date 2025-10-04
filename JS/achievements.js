class Achievement {
    constructor(id, name, isUnlocked, position, winMutliplier = 1) {
        this.id = id;
        this.name = name;
        this.isUnlocked = isUnlocked;
        this.position = position;
        this.winMutliplier = winMutliplier;

    }

    
    unlock() {
        this.isUnlocked = true;
    }
}

const achivements = [
    new Achievement(1, "Spin 10 Times", false, [0, 0]),
    new Achievement(2, "Hit 3 Cherries", false, [0, 1]),
    new Achievement(3, "Win 50 Coins", false, [0, 2]),
    new Achievement(4, "Get a Wild Line", false, [1, 0]),
];

function renderAchievements() {
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = ""; // clear existing

    achievements.forEach(ach => {
        const div = document.createElement("div");
        div.classList.add("achievement");
        if (ach.isUnlocked) div.classList.add("unlocked");

        div.dataset.id = ach.id;

        div.innerHTML = `
            <img src="images/achievement${ach.id}.png" alt="${ach.name}">
            <p>${ach.name}</p>
        `;

        grid.appendChild(div);
    });
}

renderAchievements();
