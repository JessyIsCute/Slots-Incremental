const slotSymbols = [
    new SlotSymbol(X, "X.png", 100, () => 0, true),
    new SlotSymbol(Cherry, "Cherry.png", 50, () => 0, true),
    new SlotSymbol(Diamond, "Diamond.png", 40, () => 0, true),
    new SlotSymbol(Lemon, "Lemon.png", 30, () => 0, true),
];

class SlotSymbol {
    constructor(name,imgPath, weight, isUnlocked = false) {
        this.imgPath = imgPath;  // Image path or emoji
        this.name = name;      // The name
        this.weight = weight;      // Chance to appear
        this.isUnlocked = isUnlocked;
    }

    // Unlock the symbol
    unlock() {
        this.isUnlocked = true;
    }

    // Trigger its effect
    triggerEffect(reels, index) {
        return this.onWin(reels, index);
    }
}

