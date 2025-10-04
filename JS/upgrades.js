const map = document.getElementById('map');
let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

map.parentElement.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    map.parentElement.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.parentElement.style.cursor = 'grab';
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    map.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});


class UpgradeNode {
    constructor(id, name, isUnlocked, position) {
        this.id = id;
        this.name = name;
        this.isUnlocked = isUnlocked;
        this.position = position;

    }

    
    unlock() {
        this.isUnlocked = true;
    }
}


const upgrades = [
    new UpgradeNode(1, "First" , true, [50, 50]),
    new UpgradeNode(2, "DoubleChance", true, [500, 100]),
    new UpgradeNode(2, "DoubleChance", true, [300, 100]),
    new UpgradeNode(2, "DoubleChance", true, [200, 100]),
];

function renderUpgrades() {
    upgrades.forEach(upgrade => {
        const node = document.createElement('div');
        node.className = 'upgrade-node';
        node.style.left = `${upgrade.position[0]}px`;
        node.style.top = `${upgrade.position[1]}px`;
        node.dataset.id = upgrade.id;
        node.title = upgrade.name + (upgrade.isUnlocked ? " (Unlocked)" : " (Locked)");
        node.innerText = upgrade.name;
        if (upgrade.isUnlocked) {
            node.classList.add('unlocked');
        }
        map.appendChild(node);
    });

    document.querySelectorAll('.upgrade-node').forEach(node => {
    node.addEventListener('click', () => {
        const id = node.dataset.id;
        alert(`Upgrade node ${id} clicked!`);
        // unlock upgrade, show tooltip, etc.
    });
    
});

}

renderUpgrades();

