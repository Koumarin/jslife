import CanvasRenderer from './canvas_renderer.js';
import Grid from './grid.js';
import LifeRuleset from './life_ruleset.js';
import Simulation from './simulation.js';

const canvas = document.getElementById('canvas');

let renderer = new CanvasRenderer(canvas);
let sim = new Simulation(new Grid(20, 10), new LifeRuleset([3], [2,3]));

canvas.addEventListener('mouseup', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    let cellWidth = canvas.width / sim.grid.width;
    let cellHeight = canvas.height / sim.grid.height;
    let cellX = Math.floor(x / cellWidth);
    let cellY = Math.floor(y / cellHeight);

    switch (event.button) {
    case 0:
	sim.grid.setState(cellX, cellY, true);
	break;
    case 1:
	sim.step();
	renderer.render(sim.grid);
	break;
    case 2:
	sim.grid.setState(cellX, cellY, false);
	break;
    }

    renderer.render(sim.grid);
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

renderer.render(sim.grid);
