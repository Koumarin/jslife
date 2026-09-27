"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let life;

ctx.imageSmoothingEnabled = false;

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    console.log(`Click coordinates: (${x}, ${y})`);
});

function main()
{
    let cellSize

    life = new Life(20, 20);
    cellSize = canvas.width / life.width;

    ctx.fillStyle = "rgb(0 0 0)";
    for (let i = 0; i < life.height; i++) {
	for (let j = 0; j < life.width; j++) {
	    if (life.grid[i][j])
		ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
	}
    }
}

class Life {
    constructor(height, width) {
	this.height = height;
	this.width = width;
	this.grid = Array.from({length: height},
			       () => Array.from({length: width},
						() => Math.random() < 0.5));
    }

    setAlive(x, y, isAlive) {
	this.grid[y][x] = isAlive;
    }
}

main();
