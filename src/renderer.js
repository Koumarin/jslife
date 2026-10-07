export default class Renderer {
	constructor() {
		if (this.constructor == Renderer) {
			throw new Error('Class is of abstract type and can\'t be instantiated.');
		}

		if (this.render == undefined) {
			throw new Error('render method must be implemented.');
		}
	}
}
