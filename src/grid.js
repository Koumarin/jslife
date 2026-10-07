export default class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = Array.from({ length: height },
		                        () => Array(width).fill(false));
	}

	setState(x, y, state) {
		this.cells[y][x] = state;
	}

	getState(x, y) {
		return this.cells[y][x];
	}
}
