import Ruleset from './ruleset.js';

export default class LifeRuleset {
    constructor(birth, survival) {
	this.birth = birth;
	this.survival = survival;
    }

    nextState(x, y, grid) {
	let liveNeighbors = this.getLivingNeighborCount(x, y, grid);
	let oldState = grid.getState(x, y);

	if (oldState && this.survival.includes(liveNeighbors))
	    return true;
	else if (!oldState && this.birth.includes(liveNeighbors))
	    return true;
	return false;
    }

    getLivingNeighborCount(x, y, grid) {
	const within = (x, lo, hi) => (x >= lo && x < hi);
	let acc = 0;

	for (let i = -1; i <= 1; i++) {
	    if (!within(y + i, 0, grid.height))
		continue;
	    for (let j = -1; j <= 1; j++) {
		if (!within(x + j, 0, grid.width))
		    continue;
		if (i == 0 && j == 0)
		    continue;
		if (grid.getState(x + j, y + i))
		    acc++;
	    }
	}
	return acc;
    }
}
