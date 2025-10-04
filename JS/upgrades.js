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

document.querySelectorAll('.upgrade-node').forEach(node => {
    node.addEventListener('click', () => {
        const id = node.dataset.id;
        alert(`Upgrade node ${id} clicked!`);
        // unlock upgrade, show tooltip, etc.
    });
});
