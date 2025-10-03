

const slotConfig = {
    height: 3,    // number of rows
    width: 3,       // number of reels
    reelSpinDuration: 1000 // duration of reel spin in milliseconds
};

const slotState = {
    displayedSymbols: Array.from({ length: slotConfig.width }, () => Array.from({ length: slotConfig.height }, () => null)), // 2D array of displayed symbols
}

const reels = document.querySelectorAll("#slot-machine-grid .reel");
const spinBtn = document.getElementById("spin-btn");
const resultEl = document.getElementById("slot-result");

spinBtn.addEventListener("click", () => {
    spinSlot();
    payOut(checkWin());
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
    const lineSymbols = [];
    for (let i = 0; i < positions.length; i++) {
        lineSymbols.push(slotState.displayedSymbols[positions[i][0]][positions[i][1]]);
    }
    const firstSymbol = lineSymbols[0];

    if (lineSymbols.every(s => s.name === firstSymbol.name)) {
        const winAmount = firstSymbol.winValue * line.winMutliplier * (1 + (lineSymbols.length - 1) * firstSymbol.multiplierPerSymbol);
        return winAmount;
    }

}

function checkWin() {
    let totalWin = 0;

    for (const line of slotLines.filter(l => l.isUnlocked)) {
        
        const winamount = checkLine(line)
        if (winamount) {
            totalWin += winamount;
        }
        
        
    }

    return totalWin;
}

const moneyEl = document.getElementById("money");

function payOut(amount) {
    if (amount > 0) {
        resultEl.textContent = `You win ${amount}!`;
        moneyEl.textContent = parseInt(moneyEl.textContent) + amount;

    } else {
        resultEl.textContent = "No win, try again!";
    }
}