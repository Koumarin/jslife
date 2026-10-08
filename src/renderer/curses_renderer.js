import Renderer from './renderer.js';

export default class CursesRenderer extends Renderer {
	constructor(output = process.stdout) {
		super();
		this.output = output;
		this.cursor = { x: 0, y: 0 };
	}

	setCursor(x, y) {
		this.cursor = { x, y };
	}

	render(grid) {
		const lines = [
			'Arrows move, Space toggle, p play/pause, n step, r randomize, c clear, q quit',
		];

		for (let y = 0; y < grid.height; y++) {
			let line = '';
			for (let x = 0; x < grid.width; x++) {
				if (x === this.cursor.x && y === this.cursor.y)
					line += '@';
				else
					line += grid.getState(x, y) ? '#' : '·';
			}
			lines.push(line);
		}

		this.output.write(`\x1b[2J\x1b[H${lines.join('\n')}\n`);
	}
}
