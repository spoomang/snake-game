const { CANVAS_HEIGHT, CANVAS_WIDTH } = require('../enums/length');
const { EVENT_TYPES } = require('../enums/events');
const { CONTROL } = require('../enums/control');
const Event = require('../event/event');
const FoodController = require('../controller/food');

function Game({ ctx }) {
    this.contollers = new Map();
    this.ctx = ctx;
    this.isStop = true;
}

Game.prototype.addController = function({name, controller, type }) {
    if (this.contollers.size == 2) {
        console.log('Max player reached.');
        return false;
    }

    if (this.contollers.has(name)) {
        console.log('Player already added.');
        return false;
    }

    this.contollers.set(name, controller);
    this.setControl({ name, type })
    
    return true;
}

Game.prototype.start = function() {
    if (!this.isStop){
        return;
    }
    this.isStop = false;

    Event.emit(EVENT_TYPES.GAME_STARTED, 'game started.');

    const gameLoop = setInterval(() => {
        this.executeSingleLoop();
    }, 200);
    this.gameLoop = gameLoop;
}

Game.prototype.setControl = function({ name, type }) {
    const controller = this.contollers.get(name);
    switch (type) {
        case CONTROL.MANUAL:
            window.addEventListener('keydown', (e) => {
                const keyCode = e.which || event.keyCode;
                controller.manual(keyCode);
            });

            break;
        case CONTROL.AUTOMATE:
            const automateInterval = setInterval(() => {
                controller.automate();
            }, 2000);

            this.automateInterval = automateInterval;
            break;
        default:
            break;
    }
}

Game.prototype.executeSingleLoop = function() {
    // 1. Clear canvas.
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let [key, contoller] of this.contollers) {
        const player = contoller.player;
        // 2. Update Location of food.
        FoodController.updateFood();

        // 3. Grow if snake eats food.
        player.growIfAteFood();

        // 4. Update snakes new location.
        player.updateSnakeLocation();
    }
}

Game.prototype.stopLoop = function() {
    if (this.isStop){
        return;
    }
    this.isStop = true;

    if (this.gameLoop) {
        clearInterval(this.gameLoop);
    }

    if (this.automateInterval) {
        clearInterval(this.automateInterval);
    }
}

module.exports = Game;
