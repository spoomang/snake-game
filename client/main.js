const {CANVAS_WIDTH, CANVAS_HEIGHT, LINK_WIDTH} = require('./enums/length');
const { EVENT_TYPES } = require('./enums/events');

const SnakePlayer = require('./components/snake');
const Game = require('./components/game');
const SnakeController = require('./controller/snake');
const FoodController = require('./controller/food');

const Event = require('./event/event');

const canvas = document.getElementById('snakeCanvas');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

function resize() {
    const height = window.innerHeight - 20;

    const ratio = canvas.width / canvas.height;
    const width = ratio * height;

    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
}
window.addEventListener('load', resize, false);

const playerAutomated = new SnakePlayer({
    imageSrc: 'images/link.png',
    automated: true, 
    ctx: ctx,
    initialPositionX: 0,
    initialPositionY: 0,
});
const playerManual = new SnakePlayer({
    imageSrc: 'images/link.png', 
    automated: false,
    ctx: ctx, 
    initialPositionX: 0,
    initialPositionY: 4 * LINK_WIDTH,
});

const controllerAutomated = new SnakeController(playerAutomated);
const controllerManual = new SnakeController(playerManual);

const contollers = [controllerManual, controllerAutomated];

Event.addListener(EVENT_TYPES.UPDATE_FOOD, () => console.log('update food event triggered...'))
Event.addListener(EVENT_TYPES.GAME_STARTED, () => console.log('game started ...'))

FoodController.setParams({ ctx, foodImageSrc: 'images/link.png' })

const game = new Game({
    ctx, 
    contollers
});
game.start();
