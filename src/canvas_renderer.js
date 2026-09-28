import Renderer from './renderer.js';

export default class CanvasRenderer extends Renderer {
    constructor(canvas) {
	super();
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	this.ctx.imageSmoothingEnabled = false;
    }

    render(grid) {
	let cellWidth = canvas.width / grid.width;
	let cellHeight = canvas.height / grid.height;

	this.ctx.fillStyle = 'rgb(255 255 255)';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.fillStyle = 'rgb(0 0 0)';
	for (let i = 0; i < grid.height; i++) {
	    for (let j = 0; j < grid.width; j++) {
		if (grid.getState(j, i))
		    this.ctx.fillRect(j * cellWidth,
				      i * cellHeight,
				      cellWidth,
				      cellHeight);
	    }
	}
    }
}
