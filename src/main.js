import CanvasRenderer from './canvas_renderer.js';
import Grid from './grid.js';
import Simulation from './simulation.js';

const canvas = document.getElementById('canvas');

let renderer = new CanvasRenderer(canvas);
let grid = new Grid(20, 10);
let sim = new Simulation(grid);

canvas.addEventListener('mouseup', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    let cellWidth = canvas.width / grid.width;
    let cellHeight = canvas.height / grid.height;
    let cellX = Math.floor(x / cellWidth);
    let cellY = Math.floor(y / cellHeight);

    switch (event.button) {
    case 0:
	grid.setState(cellX, cellY, true);
	break;
    case 1:
	sim.step();
	renderer.render(grid);
	break;
    case 2:
	grid.setState(cellX, cellY, false);
	break;
    }

    renderer.render(grid);
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

renderer.render(grid);
