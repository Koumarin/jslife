import CanvasRenderer from './canvas_renderer.js';
import Grid from './grid.js';

const canvas = document.getElementById('canvas');

let renderer = new CanvasRenderer(canvas);
let grid = new Grid(20, 10);

canvas.addEventListener('mouseup', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    let cellWidth = canvas.width / grid.width;
    let cellHeight = canvas.height / grid.height;
    let cellX = Math.floor(x / cellWidth);
    let cellY = Math.floor(y / cellHeight);

    switch (event.button) {
    case 0:
	grid.setAlive(cellX, cellY, true);
	break;
    case 1:
	console.log(grid.getLivingNeighborCount(cellX, cellY));
	break;
    case 2:
	grid.setAlive(cellX, cellY, false);
	break;
    }

    renderer.render(grid);
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

renderer.render(grid);
