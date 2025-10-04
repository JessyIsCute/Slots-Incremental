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
    new SlotSymbol("X", "X.png", true, 500, 0, 0),
    new SlotSymbol("Cherry", "Cherry.png", true, 500, 1, 2),
    new SlotSymbol("Lemon", "Lemon.png", true, 1, 5 , 2),
    new SlotSymbol("Wild", "Wild.png", false, 1, 10 , 1, true),
    new SlotSymbol("Diamond", "Diamond.png", false),
];

