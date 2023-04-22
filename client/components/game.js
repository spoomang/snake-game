const { CANVAS_HEIGHT, CANVAS_WIDTH } = require('../enums/length');
const { EVENT_TYPES } = require('../enums/events');
const Event = require('../event/event');
const FoodController = require('../controller/food');

function Game({ ctx }) {
    this.contollers = [];
    this.ctx = ctx;
    this.stop = true;
}

Game.prototype.addController = function(controller) {
    this.contollers.push(controller);
}

Game.prototype.start = function() {
    if (!this.stop){
        return;
    }
    this.stop = false;

    Event.emit(EVENT_TYPES.GAME_STARTED, 'game started.');

    const gameLoop = setInterval(() => {
        this.executeSingleLoop();
    }, 200);
    this.gameLoop = gameLoop;

    for (const controller of this.contollers) {
        if (controller.automated) {
            const automateInterval = setInterval(() => {
                controller.automate();
            }, 2000);

            this.automateInterval = automateInterval;
        } else {
            window.addEventListener('keydown', (e) => {
                const keyCode = e.which || event.keyCode;
                controller.manual(keyCode);
            });
        }
    }
}

Game.prototype.executeSingleLoop = function() {
    // 1. Clear canvas.
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const contoller of this.contollers) {
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
    if (this.stop){
        return;
    }
    this.stop = true;

    if (this.gameLoop) {
        clearInterval(this.gameLoop);
    }

    if (this.automateInterval) {
        clearInterval(this.automateInterval);
    }
}

module.exports = Game;
