import Application from 'jslife/core/application.js';
import CanvasInputControl from 'jslife/input/canvas_input_control.js';
import CanvasRenderer from 'jslife/renderer/canvas_renderer.js';
import Grid from 'jslife/core/grid.js';
import LifeRuleset from 'jslife/core/life_ruleset.js';
import Simulation from 'jslife/core/simulation.js';

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
