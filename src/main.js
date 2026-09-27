"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let life;

ctx.imageSmoothingEnabled = false;

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    let cellWidth = canvas.width / life.width;
    let cellHeight = canvas.height / life.height;
    let cellX = Math.floor(x / cellWidth);
    let cellY = Math.floor(y / cellHeight);

    life.setAlive(cellX, cellY, true);
    render();
});

function main()
{
    life = new Life(20, 10);
    render();
}

function render()
{
    let cellWidth = canvas.width / life.width;
    let cellHeight = canvas.height / life.height;

    ctx.fillStyle = "rgb(255 255 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0 0 0)";
    for (let i = 0; i < life.height; i++) {
	for (let j = 0; j < life.width; j++) {
	    if (life.grid[i][j])
		ctx.fillRect(j * cellWidth,
			     i * cellHeight,
			     cellWidth,
			     cellHeight);
	}
    }
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
