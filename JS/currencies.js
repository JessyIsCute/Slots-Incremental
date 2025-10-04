class Currency {
    constructor(name, value, displayType) {
        this.name = name;
        this.value = value;
        this.displayType = displayType; // "text" or "image"

    }

    updateDisplays() {
        const elements = document.querySelectorAll(`.display-${this.name}`);
        elements.forEach(el => {
            
            el.textContent = `${this.value}`;
            
        });
    }
}

const currencies = [
    new Currency("money", 0, "default"),
    new Currency("gold", 0, "default")
];

function getCurrency(name) {
    return currencies.find(c => c.name === name);
}

function payOut(amount, currencyName = "money") {
    if (amount > 0) {
        resultEl.textContent = `You win ${amount}!`;
        getCurrency(currencyName).value += amount;
        getCurrency(currencyName).updateDisplays();
    } else {
        resultEl.textContent = "No win, try again!";
    }
}