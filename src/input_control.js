export default class InputControl {
	constructor() {
		if (new.target === InputControl)
			throw new TypeError('InputControl is an abstract class');
	}

	register(onInput) {
		throw new Error(`${this.constructor.name} must implement register()`);
	}
}
