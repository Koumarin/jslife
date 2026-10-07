export default class Application {
	constructor(simulation, renderer, inputControls = []) {
		this.simulation = simulation;
		this.renderer = renderer;
		this.inputControls = inputControls;
		this.stepInterval = null;
	}

	start() {
		this.inputControls.forEach((control) => {
			control.register((x, y, state) => this.setCellState(x, y, state));
		});
		this.render();
	}

	setCellState(x, y, state) {
		this.simulation.grid.setState(x, y, state);
		this.render();
	}

	play() {
		if (this.stepInterval === null)
			this.stepInterval = setInterval(() => this.step(), 50);
	}

	pause() {
		if (this.stepInterval !== null) {
			clearInterval(this.stepInterval);
			this.stepInterval = null;
		}
	}

	step() {
		this.simulation.step();
		this.render();
	}

	render() {
		this.renderer.render(this.simulation.grid);
	}
}
