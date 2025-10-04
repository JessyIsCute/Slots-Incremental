

const slotConfig = {
    height: 4,    // number of rows
    width: 4,       // number of reels
    reelSpinDuration: 1000, // duration of reel spin in milliseconds
    highlightTime: 1500, // cooldown time between spins in milliseconds
    buttonDisableTime: 1000 // cooldown time between spins in milliseconds
};

const slotState = {
    displayedSymbols: Array.from({ length: slotConfig.width }, () => Array.from({ length: slotConfig.height }, () => null)), // 2D array of displayed symbols
}

const reels = document.querySelectorAll("#slot-machine-grid .reel");
const spinBtn = document.getElementById("spin-btn");
const resultEl = document.getElementById("slot-result");

spinBtn.addEventListener("click", () => {
    if (spinBtn.disabled) return; // prevent multiple clicks during cooldown
    spinBtn.disabled = true;

    spinSlot();
    const { totalWin, winningLines } = checkWin()

    if (winningLines.length > 0) {
        highlightLinesSequentially(winningLines);
        setTimeout(() => {
        spinBtn.disabled = false;}, slotConfig.highlightTime);
    }
    else { 
        setTimeout(() => {
        spinBtn.disabled = false;}, slotConfig.buttonDisableTime);
    }
    payOut(totalWin, "money");
});

function spinSlot() {
    for (let x = 0; x < slotConfig.width; x++) {
        for (let y = 0; y < slotConfig.height; y++) {
            const symbol = generateSymbol();

            slotState.displayedSymbols[x][y] = symbol;

            const imgEl = document.querySelector(`#slot-machine-grid .reel[data-x='${x}'][data-y='${y}'] img`);
            imgEl.src = `images/${symbol.imgPath}`;

        }
    }
}



function generateSymbol() {

    const unlocked = slotSymbols.filter(s => s.isUnlocked) // only unlocked symbols
    const totalWeight = unlocked.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const symbol of unlocked) {
        if (rand < symbol.weight) {
            return symbol;
        }
        rand -= symbol.weight;
    }
    return slotSymbols.find(s => s.name === "X") // fallback

};
function checkLine(line) {
    const positions = line.position;
    let lineSymbols = positions.map(([x, y]) => slotState.displayedSymbols[x][y]);

    let firstSymbol = lineSymbols.find(s => !s.isWild);

    if (!firstSymbol) {
        const unlockedSymbols = slotSymbols.filter(s => s.isUnlocked && !s.isWild);
        firstSymbol = unlockedSymbols.reduce((max, s) => (s.winValue > max.winValue ? s : max), unlockedSymbols[0]);
    }


    if (firstSymbol.name === "X") return null;

    const allMatch = lineSymbols.every(s => s.isWild || s.name === firstSymbol.name);

    if (allMatch) {
        const count = lineSymbols.length;
        let winAmount = firstSymbol.winValue

         * line.winMutliplier
         if (count >= 4) {
            winAmount *= Math.pow(firstSymbol.multiplierPerSymbol, count - 3);
         }
        return {winAmount, line};
    }

}

function checkWin() {
    let totalWin = 0;
    const winningLines = [];

    for (const line of slotLines.filter(l => l.isUnlocked)) {
        
        const result = checkLine(line)
        if (result) {
            totalWin += result.winAmount;
            winningLines.push(result.line);
        }
    }

    return {totalWin, winningLines}; 
}


function highlightLinesSequentially(winningLines) {
    let i = 0;

    function highlightNext() {
        if (i >= winningLines.length) return; // stop if no more lines

        const line = winningLines[i];

        // highlight this line
        for (const [x, y] of line.position) {
            const reelEl = document.querySelector(`#slot-machine-grid .reel[data-x='${x}'][data-y='${y}']`);
            reelEl.classList.add("highlight");
        }

        // remove highlight after some time
        setTimeout(() => {
            for (const [x, y] of line.position) {
                const reelEl = document.querySelector(`#slot-machine-grid .reel[data-x='${x}'][data-y='${y}']`);
                reelEl.classList.remove("highlight");
            }

            i++; // move to next line
            highlightNext(); // recursive step
        }, slotConfig.highlightTime/winningLines.length + 300);
    }

    highlightNext();
}

function renderSlotMachine() {
    const grid = document.getElementById("slot-machine-grid");
    grid.innerHTML = ""; // clear existing  content
    for (let y = 0; y < slotConfig.height; y++) {
        for (let x = 0; x < slotConfig.width; x++) {
            const reel = document.createElement("div");
            reel.className = "reel";
            reel.dataset.x = x;
            reel.dataset.y = y; 
            const img = document.createElement("img");
            img.src = "images/X.png"; // default image
            reel.appendChild(img);
            grid.appendChild(reel);
            slotState.displayedSymbols[x][y] = slotSymbols.find(s => s.name === "X");
        }
    }   
    grid.style.gridTemplateColumns = `repeat(${slotConfig.width}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${slotConfig.height}, 1fr)`;

}

renderSlotMachine();