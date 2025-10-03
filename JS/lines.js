class slotLine {
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
    new slotLine(1, "0Hor" , true, [[0,0], [1,0], [2,0]]),
    new slotLine(2, "1Hor", true, [[0,1], [1,1], [2,1]]),
    new slotLine(3, "2Hor", true, [[0,2], [1,2], [2,2]]),
    new slotLine(4, "0-2Diag", false, [[0,0], [1,1], [2,2]]),
    new slotLine(5, "2-0Diag",false, [[0,2], [1,1], [2,0]]),
];

