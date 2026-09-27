import CanvasRenderer from './canvas_renderer.js';

const canvas = document.getElementById('canvas');

let renderer = new CanvasRenderer(canvas);
let life;

canvas.addEventListener('mouseup', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    let cellWidth = canvas.width / life.width;
    let cellHeight = canvas.height / life.height;
    let cellX = Math.floor(x / cellWidth);
    let cellY = Math.floor(y / cellHeight);

    switch (event.button) {
    case 0:
	life.setAlive(cellX, cellY, true);
	break;
    case 2:
	life.setAlive(cellX, cellY, false);
	break;
    }

    renderer.render(life.grid);
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

function main()
{
    life = new Life(20, 10);
    renderer.render(life.grid);
}

class Life {
    constructor(width, height) {
	this.height = height;
	this.width = width;
	this.grid = Array.from({length: height},
			       () => Array(width).fill(false));
    }

    setAlive(x, y, isAlive) {
	this.grid[y][x] = isAlive;
    }
}

main();
