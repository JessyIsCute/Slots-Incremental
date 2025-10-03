class SlotSymbol {
    constructor(name, imgPath, isUnlocked, weight, winValue, multiplierPerSymbol) {
        this.imgPath = imgPath;  // Image path or emoji
        this.name = name;      // The name
        this.weight = weight;      // Chance to appear
        this.isUnlocked = isUnlocked;
        this.winValue = winValue;  // Base win value
        this.multiplierPerSymbol = multiplierPerSymbol; // Multiplier per additional symbol
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
    new SlotSymbol("X", "X.png", true, 10, 0, 0),
    new SlotSymbol("Cherry", "Cherry.png", true, 50, 10, 2),
    new SlotSymbol("Diamond", "Diamond.png", false),
    new SlotSymbol("Lemon", "Lemon.png", false),
];

