import Application from './core/application.js';
import CursesInputControl from './input/curses_input_control.js';
import CursesRenderer from './renderer/curses_renderer.js';
import Grid from './core/grid.js';
import LifeRuleset from './core/life_ruleset.js';
import Simulation from './core/simulation.js';

const output = process.stdout;
const width = Math.max(1, (output.columns || 80) - 1);
const height = Math.max(1, (output.rows || 24) - 3);
const simulation = new Simulation(new Grid(width, height),
                                  new LifeRuleset([3], [2, 3]));
const renderer = new CursesRenderer(output);
let application;
let closed = false;

function close() {
	if (closed)
		return;
	closed = true;
	application.pause();
	inputControl.dispose();
	output.write('\x1b[0m\x1b[?25h\n');
	process.stdin.pause();
}

const inputControl = new CursesInputControl(
	process.stdin,
	() => simulation.grid,
	renderer,
	(command) => {
		switch (command) {
		case 'clear':
			application.clear();
			break;
		case 'playPause':
			if (application.stepInterval === null)
				application.play();
			else
				application.pause();
			break;
		case 'quit':
			close();
			break;
		case 'randomize':
			application.randomize();
			break;
		case 'step':
			application.step();
			break;
		}
	},
);

application = new Application(simulation, renderer, [inputControl]);
application.start();
process.on('SIGINT', close);
