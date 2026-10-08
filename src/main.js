import Application from './core/application.js';
import CanvasInputControl from './input/canvas_input_control.js';
import CanvasRenderer from './renderer/canvas_renderer.js';
import Grid from './core/grid.js';
import LifeRuleset from './core/life_ruleset.js';
import Simulation from './core/simulation.js';

const canvas = document.getElementById('canvas');
const buttonPlay = document.getElementById('button_play');
const buttonPause = document.getElementById('button_pause');
const buttonStep = document.getElementById('button_step');
const buttonRandomize = document.getElementById('button_randomize');
const buttonClear = document.getElementById('button_clear');

const renderer = new CanvasRenderer(canvas);
const simulation = new Simulation(new Grid(20, 10), new LifeRuleset([3], [2, 3]));
const canvasInputControl = new CanvasInputControl(canvas, () => simulation.grid);
const application = new Application(simulation, renderer, [canvasInputControl]);

application.start();

buttonPlay.addEventListener('click', () => application.play());
buttonPause.addEventListener('click', () => application.pause());
buttonStep.addEventListener('click', () => application.step());
buttonRandomize.addEventListener('click', () => application.randomize());
buttonClear.addEventListener('click', () => application.clear());
