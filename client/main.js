const {CANVAS_WIDTH, CANVAS_HEIGHT, LINK_WIDTH} = require('./enums/length');
const { EVENT_TYPES } = require('./enums/events');
const { CONTROL } = require('./enums/control');

const Game = require('./components/game');
const SnakeFactory = require('./factory/snake_factory');

const FoodController = require('./controller/food');

const Dashboard = require('./components/nav/dashboard');

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

Event.addListener(EVENT_TYPES.UPDATE_FOOD, () => console.log('update food event triggered...'))
Event.addListener(EVENT_TYPES.GAME_STARTED, () => console.log('game started ...'))

FoodController.setParams({ ctx, foodImageSrc: 'images/link.png' })

const game = new Game({
    ctx,
});

Dashboard.setStartListener(() => {
    if (game.isStop) {
        game.start();
    }
});

Dashboard.setStopListener(() => {
    if (!game.isStop) {
        game.stopLoop();
    }
});

Dashboard.setPlayerListener((playerName, playerScore) => {
    const playerController = SnakeFactory.create({
        imageSrc: 'images/link.png', 
        automated: false,
        ctx: ctx, 
        initialPositionX: 0,
        initialPositionY: 4 * LINK_WIDTH,
    });
    playerController.player.setScoreBoard(playerScore);
    game.addController({
        name: playerName,
        controller: playerController,
    });
    game.setControl({ name: playerName, type: CONTROL.MANUAL })
});

Dashboard.setAutomaticPlayerListener((playerName, playerScore) => {
    const playerController = SnakeFactory.create({
        imageSrc: 'images/link.png', 
        automated: false,
        ctx: ctx, 
        initialPositionX: 0,
        initialPositionY: 4 * LINK_WIDTH,
    });
    playerController.player.setScoreBoard(playerScore);
    game.stopLoop();
    game.addController({
        name: playerName,
        controller: playerController,
    });
    game.setControl({ name: playerName, type: CONTROL.AUTOMATE })
    game.start();
});


// window.addEventListener('keydown', (e) => {
//     const keyCode = e.which || event.keyCode;
//     console.log("keyCode   ", keyCode);
//     switch (keyCode) {
//         case 32:
//             if (!game.stop) {
//                 game.stopLoop();
//             } else {
//                 game.start();
//             }
            
//             break;
//         case 65: // Create new snake
//             const playerController = SnakeFactory.create({
//                 imageSrc: 'images/link.png', 
//                 automated: false,
//                 ctx: ctx, 
//                 initialPositionX: 0,
//                 initialPositionY: 4 * LINK_WIDTH,
//             });
//             game.addController({
//                 name: 'player_1',
//                 controller: playerController,
//             });
//             game.setControl({ name:'player_1', type: CONTROL.MANUAL })
//             break;
//         case 66: // create automated snake
//             game.stopLoop();
//             const controllerAutomated = SnakeFactory.create({
//                 imageSrc: 'images/link.png',
//                 automated: true, 
//                 ctx: ctx,
//                 initialPositionX: 0,
//                 initialPositionY: 0,
//             });
//             game.addController({
//                 name: 'player_automated',
//                 controller: controllerAutomated,
//             });
//             game.setControl({ name:'player_automated', type: CONTROL.AUTOMATE })
//             break;
//         default:
//             break;
//     }
// });
