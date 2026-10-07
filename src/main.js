import Application from './application.js';
import CanvasInputControl from './canvas_input_control.js';
import CanvasRenderer from './canvas_renderer.js';
import Grid from './grid.js';
import LifeRuleset from './life_ruleset.js';
import Simulation from './simulation.js';

const canvas = document.getElementById('canvas');
const buttonPlay = document.getElementById('button_play');
const buttonPause = document.getElementById('button_pause');
const buttonStep = document.getElementById('button_step');

const renderer = new CanvasRenderer(canvas);
const simulation = new Simulation(new Grid(20, 10), new LifeRuleset([3], [2, 3]));
const canvasInputControl = new CanvasInputControl(canvas, () => simulation.grid);
const application = new Application(simulation, renderer, [canvasInputControl]);

application.start();

buttonPlay.addEventListener('click', () => application.play());
buttonPause.addEventListener('click', () => application.pause());
buttonStep.addEventListener('click', () => application.step());
