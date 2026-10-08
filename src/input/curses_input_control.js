import { emitKeypressEvents } from 'node:readline';
import InputControl from './input_control.js';

export default class CursesInputControl extends InputControl {
	constructor(input, getGrid, renderer, onCommand) {
		super();
		this.input = input;
		this.getGrid = getGrid;
		this.renderer = renderer;
		this.onCommand = onCommand;
		this.cursor = { x: 0, y: 0 };
		this.onKeypress = (character, key) => this.handleKeypress(character, key);
	}

	register(onInput) {
		this.onInput = onInput;
		emitKeypressEvents(this.input);
		this.input.on('keypress', this.onKeypress);
		this.wasRaw = this.input.isRaw;
		if (this.input.isTTY && typeof this.input.setRawMode === 'function')
			this.input.setRawMode(true);
		this.input.resume();
	}

	dispose() {
		this.input.removeListener('keypress', this.onKeypress);
		if (this.input.isTTY && typeof this.input.setRawMode === 'function')
			this.input.setRawMode(this.wasRaw ?? false);
	}

	handleKeypress(character, key = {}) {
		if (key.ctrl && key.name === 'c') {
			this.onCommand('quit');
			return;
		}

		if (['up', 'down', 'left', 'right'].includes(key.name)) {
			this.moveCursor(key.name);
			return;
		}

		if (key.name === 'space' || character === ' ') {
			const grid = this.getGrid();
			this.onInput(this.cursor.x, this.cursor.y,
			             !grid.getState(this.cursor.x, this.cursor.y));
			return;
		}

		const commands = {
			c: 'clear',
			n: 'step',
			p: 'playPause',
			q: 'quit',
			r: 'randomize',
			x: 'kill',
		};
		const command = commands[character];
		if (command === 'kill')
			this.onInput(this.cursor.x, this.cursor.y, false);
		else if (command)
			this.onCommand(command);
	}

	moveCursor(direction) {
		const grid = this.getGrid();
		if (direction === 'up')
			this.cursor.y = Math.max(0, this.cursor.y - 1);
		else if (direction === 'down')
			this.cursor.y = Math.min(grid.height - 1, this.cursor.y + 1);
		else if (direction === 'left')
			this.cursor.x = Math.max(0, this.cursor.x - 1);
		else if (direction === 'right')
			this.cursor.x = Math.min(grid.width - 1, this.cursor.x + 1);
		this.updateCursor();
	}

	updateCursor() {
		this.renderer.setCursor(this.cursor.x, this.cursor.y);
		this.renderer.render(this.getGrid());
	}
}
