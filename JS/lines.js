class SlotLine {
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

const slotLines = [
    new SlotLine(1, "0Hor" , true, [[0,0], [1,0], [2,0]]),
    new SlotLine(2, "1Hor", true, [[0,1], [1,1], [2,1]]),
    new SlotLine(3, "2Hor", true, [[0,2], [1,2], [2,2]]),
    new SlotLine(12, "3Hor", true, [[0,3], [1,3], [2,3]]),

    new SlotLine(4, "0-2Diag", true, [[0,0], [1,1], [2,2]]),
    new SlotLine(5, "2-0Diag",true, [[0,2], [1,1], [2,0]]),
    new SlotLine(13, "1-3Diag",true, [[0,1], [1,2], [2,3]]),
    new SlotLine(14, "3-1Diag",true, [[0,3], [1,2], [2,1]]),

    new SlotLine(6, "0Horx4",true, [[0,0], [1,0], [2,0], [3,0]]),
    new SlotLine(7, "1Horx4",true, [[0,1], [1,1], [2,1], [3,1]]),
    new SlotLine(8, "2Horx4",true, [[0,2], [1,2], [2,2], [3,2]]),
    new SlotLine(11, "3Horx4",true, [[0,3], [1,3], [2,3], [3,3]]),

    new SlotLine(9, "0-3Diagx4",false, [[0,0], [1,1], [2,2], [3,3]]),
    new SlotLine(10, "3-0Diagx4",true, [[0,3], [1,2], [2,1], [3,0]]),
];


function showLinesDetails() {
    const lineDetails = document.getElementById("line-details");
    lineDetails.innerHTML = ""; // Clear previous lines

    slotLines.forEach(line => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line-detail";
        if (!line.isUnlocked) lineDiv.classList.add("locked");

        lineDiv.innerHTML = `
            <strong>${line.name}</strong> - ${line.isUnlocked ? "Unlocked" : "Locked"}<br>
            Win Multiplier: x${line.winMutliplier}<br>
        `;

        // Detect max grid size
        const maxX = Math.max(...line.position.map(p => p[0]));
        const maxY = Math.max(...line.position.map(p => p[1]));

        // Build grid container
        const grid = document.createElement("div");
        grid.className = "line-grid";
        grid.style.gridTemplateColumns = `repeat(${maxX + 1}, 24px)`;
        grid.style.gridTemplateRows = `repeat(${maxY + 1}, 24px)`;

        // Fill grid with cells
        for (let y = 0; y <= maxY; y++) {
            for (let x = 0; x <= maxX; x++) {
                const cell = document.createElement("div");
                cell.className = "line-cell";
                if (line.position.some(pos => pos[0] === x && pos[1] === y)) {
                    cell.classList.add("active");
                }
                grid.appendChild(cell);
            }
        }

        lineDiv.appendChild(grid);
        lineDetails.appendChild(lineDiv);
    });
}

// Run on load
showLinesDetails();
