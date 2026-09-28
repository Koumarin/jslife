import Grid from './grid.js';

export default class Simulation {
    constructor(grid) {
	this.grid = grid;
    }

    step() {
	let nextGrid = new Grid(this.grid.width, this.grid.height);
	
	for (let i = 0; i < this.grid.height; i++)
	    for (let j = 0; j < this.grid.width; j++)
		nextGrid.setState(j, i, this.nextState(j, i, this.grid));
	this.grid.cells = nextGrid.cells;
    }

    nextState(x, y, grid) {
	let liveNeighbors = this.getLivingNeighborCount(x, y);
	let oldState = grid.getState(x, y);

	if (oldState && [2, 3].includes(liveNeighbors))
	    return true;
	else if (!oldState && liveNeighbors == 3)
	    return true;
	return false;
    }

    getLivingNeighborCount(x, y) {
	const within = (x, lo, hi) => (x >= lo && x < hi);
	let acc = 0;

	for (let i = -1; i <= 1; i++) {
	    if (!within(y + i, 0, this.grid.height))
		continue;
	    for (let j = -1; j <= 1; j++) {
		if (!within(x + j, 0, this.grid.width))
		    continue;
		if (i == 0 && j == 0)
		    continue;
		if (this.grid.getState(x + j, y + i))
		    acc++;
	    }
	}
	return acc;
    }
}
