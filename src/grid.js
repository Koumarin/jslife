export default class Grid {
    constructor(width, height) {
	this.width = width;
	this.height = height;
	this.cells = Array.from({length: height},
				() => Array(width).fill(false));
    }

    setAlive(x, y, alive) {
	this.cells[y][x] = alive;
    }

    isAlive(x, y) {
	return this.cells[y][x];
    }

    getLivingNeighborCount(x, y) {
	const within = (x, lo, hi) => (x >= lo && x < hi);
	let acc = 0;

	for (let i = -1; i <= 1; i++) {
	    if (!within(y + i, 0, this.height))
		continue;
	    for (let j = -1; j <= 1; j++) {
		if (!within(x + j, 0, this.width))
		    continue;
		if (i == 0 && j == 0)
		    continue;
		if (this.isAlive(x + j, y + i))
		    acc++;
	    }
	}
	return acc;
    }
}
