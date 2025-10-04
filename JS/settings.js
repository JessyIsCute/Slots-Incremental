function saveGame() {
    const gameState = {
        slotLines: slotLines.map(line => ({ ...line })), // save all properties
        achievements: achivements.map(ach => ({ ...ach })),
        upgrades: upgrades.map(up => ({ ...up })),
        slotState: slotState.displayedSymbols, // 2D array of displayed symbols
        slotSymbols: slotSymbols.map(sym => ({ ...sym })) // save all symbol properties
    };

    localStorage.setItem('slotGame', JSON.stringify(gameState));
    console.log("Game saved!");
}

function loadGame() {
    const saved = JSON.parse(localStorage.getItem('slotGame'));
    if (!saved) return; // no saved game

    // Restore slot lines
    saved.slotLines.forEach(savedLine => {
        const line = slotLines.find(l => l.id === savedLine.id);
        if (line) Object.assign(line, savedLine);
    });

    // Restore achievements
    saved.achievements.forEach(savedAch => {
        const ach = achivements.find(a => a.id === savedAch.id);
        if (ach) Object.assign(ach, savedAch);
    });

    // Restore upgrades
    saved.upgrades.forEach(savedUp => {
        const up = upgrades.find(u => u.id === savedUp.id);
        if (up) Object.assign(up, savedUp);
    });

    // Restore slotSymbols
    saved.slotSymbols.forEach(savedSym => {
        const sym = slotSymbols.find(s => s.name === savedSym.name);
        if (sym) Object.assign(sym, savedSym);
    });

    // Restore slotState
    if (saved.slotState) slotState.displayedSymbols = saved.slotState;

    console.log("Game loaded!");
}

// Create deep copies of default state at load
const defaultState = {
    slotLines: slotLines.map(line => ({ ...line })),
    achievements: achivements.map(ach => ({ ...ach })),
    upgrades: upgrades.map(up => ({ ...up })),
    slotSymbols: slotSymbols.map(sym => ({ ...sym })),
    slotState: Array.from({ length: slotConfig.width }, () => Array.from({ length: slotConfig.height }, () => null))
};

function resetGame() {
    // Restore from default state
    slotLines.forEach((line, i) => Object.assign(line, defaultState.slotLines[i]));
    achivements.forEach((ach, i) => Object.assign(ach, defaultState.achievements[i]));
    upgrades.forEach((up, i) => Object.assign(up, defaultState.upgrades[i]));
    slotSymbols.forEach((sym, i) => Object.assign(sym, defaultState.slotSymbols[i]));
    slotState.displayedSymbols = JSON.parse(JSON.stringify(defaultState.slotState));

    localStorage.removeItem('slotGame');
    console.log("Game reset to default!");
}

document.getElementById('saveGameBtn').addEventListener('click', saveGame);
document.getElementById('loadGameBtn').addEventListener('click', loadGame);
document.getElementById('resetGameBtn').addEventListener('click', resetGame);