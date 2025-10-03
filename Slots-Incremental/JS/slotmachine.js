
document.addEventListener("DOMContentLoaded", () => {

    const slotConfig = {
        reels: 3,       // number of reels
        reelSpinDuration: 1000 // duration of reel spin in milliseconds
    };

    const reels = document.querySelectorAll("#slot-reels-table .reel");
    const spinBtn = document.getElementById("spin-btn");
    const resultEl = document.getElementById("slot-result");

    spinBtn.addEventListener("click", () => {
        spinReels();
        console.log("ReelSpin!");
        //checkWin();
    });

    function spinReels() {
        for (let i = 0; i < slotConfig.reels; i++) {
            spinReel(reels[i]);
        }
    }

    function spinReel(reel) {

        const symbol = generateSymbol();
        const img = reel.querySelector("img");
        img.src = `images/${symbol.imgPath}`;
        reel.symbolData = symbol;

    };

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
});