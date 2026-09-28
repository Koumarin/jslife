import Grid from './grid.js';

export default class Simulation {
    constructor(grid, ruleset) {
	this.grid = grid;
	this.ruleset = ruleset;
    }

    step() {
	let nextGrid = new Grid(this.grid.width, this.grid.height);
	
	for (let i = 0; i < this.grid.height; i++)
	    for (let j = 0; j < this.grid.width; j++)
		nextGrid.setState(j, i, this.ruleset.nextState(j, i, this.grid));
	this.grid = nextGrid;
    }
}
