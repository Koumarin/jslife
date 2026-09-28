export default class Ruleset {
    constructor() {
	if (this.constructor == Ruleset)
	    throw new Error('Class is of abstract type and can\'t be instantiated.');
    }
}
