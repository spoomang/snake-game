const {CANVAS_WIDTH, CANVAS_HEIGHT, LINK_WIDTH} = require('./enums/length');
const SnakePlayer = require('./components/player');
const Game = require('./components/game');

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

const playerAutomated = new SnakePlayer('images/link.png', true, ctx, 0, 0);
const playerManual = new SnakePlayer('images/link.png', false, ctx, 0, 4 * LINK_WIDTH);
players = [playerManual, playerAutomated];

const game = new Game(players, ctx, 'images/link.png');
game.start();

