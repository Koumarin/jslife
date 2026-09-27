import Renderer from './renderer.js';

export default class CanvasRenderer extends Renderer {
    constructor(canvas) {
	super();
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	this.ctx.imageSmoothingEnabled = false;
    }

    render(grid) {
	let height = grid.length;
	let width = grid[0].length;
	let cellWidth = canvas.width / width;
	let cellHeight = canvas.height / height;

	this.ctx.fillStyle = 'rgb(255 255 255)';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.fillStyle = 'rgb(0 0 0)';
	for (let i = 0; i < height; i++) {
	    for (let j = 0; j < width; j++) {
		if (grid[i][j])
		    this.ctx.fillRect(j * cellWidth,
				      i * cellHeight,
				      cellWidth,
				      cellHeight);
	    }
	}
    }
}
