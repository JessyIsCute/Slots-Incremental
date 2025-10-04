class SlotSymbol {
    constructor(name, imgPath, isUnlocked, weight, winValue, multiplierPerSymbol = 2, isWild = false) {
        this.imgPath = imgPath;  // Image path or emoji
        this.name = name;      // The name
        this.weight = weight;      // Chance to appear
        this.isUnlocked = isUnlocked;
        this.winValue = winValue;  // Base win value
        this.multiplierPerSymbol = multiplierPerSymbol; // Multiplier per additional symbol
        this.isWild = isWild; // Whether it can substitute for other symbols
    }

    // Unlock the symbol
    unlock() {
        this.isUnlocked = true;
    }

    // Trigger its effect
    triggerEffect(reels, index) {
        return 0;
    }
}

const slotSymbols = [
    new SlotSymbol("Wild", "Wild.png", true, 50, 1 , 1, true),
    new SlotSymbol("X", "X.png", true, 25, 0, 0),
    new SlotSymbol("Cherry", "Cherry.png", true, 100, 1, 2),
    new SlotSymbol("Lemon", "Lemon.png", true, 75, 5 , 2),
    new SlotSymbol("Diamond", "Diamond.png", true, 25, 10, 2),
];



function showSymbolsDetails() {
    const symbolDetails = document.getElementById("symbol-details");
    symbolDetails.innerHTML = ""; // Clear previous details

    for (const symbol of slotSymbols) {
        const symbolDiv = document.createElement("div");
        symbolDiv.className = "symbol-detail";
        if (!symbol.isUnlocked) symbolDiv.classList.add("locked");


        const img = document.createElement("img");
        img.src = `images/${symbol.imgPath}`;
        symbolDiv.appendChild(img);

        symbolDiv.innerHTML += `
            <strong>${symbol.name}</strong> - ${symbol.isUnlocked ? "Unlocked" : "Locked"}<br>
            Weight: ${symbol.weight}<br>
            Win Value: ${symbol.winValue}<br>
            Multiplier per Symbol: x${symbol.multiplierPerSymbol}<br>
            ${symbol.isWild ? "<em>Wild Symbol</em><br>" : ""}
        `;

        symbolDetails.appendChild(symbolDiv);
    }
}

showSymbolsDetails();