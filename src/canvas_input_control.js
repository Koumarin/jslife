import InputControl from './input_control.js';

export default class CanvasInputControl extends InputControl {
	constructor(canvas, getGrid) {
		super();
		this.canvas = canvas;
		this.getGrid = getGrid;
	}

	register(onInput) {
		this.canvas.addEventListener('mouseup', (event) => {
			const grid = this.getGrid();
			const cellWidth = this.canvas.width / grid.width;
			const cellHeight = this.canvas.height / grid.height;
			const cellX = Math.floor(event.offsetX / cellWidth);
			const cellY = Math.floor(event.offsetY / cellHeight);

			if (event.button === 0)
				onInput(cellX, cellY, true);
			else if (event.button === 2)
				onInput(cellX, cellY, false);
		});

		this.canvas.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});
	}
}
