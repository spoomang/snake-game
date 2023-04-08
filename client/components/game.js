const { CANVAS_HEIGHT, CANVAS_WIDTH } = require('../enums/length');
const { EVENT_TYPES } = require('../enums/events');
const Event = require('../event/event');
const FoodComponent = require('./food');

function Game({ ctx, contollers }) {
    this.contollers = contollers;
    this.ctx = ctx;
}

Game.prototype.start = function() {
    Event.emit(EVENT_TYPES.GAME_STARTED, 'game started.');

    setInterval(() => {
        // 1. Clear canvas.
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const contoller of this.contollers) {
            const player = contoller.player;
            // 2. Update Location of food.
            FoodComponent.updateFood();
    
            // 3. Grow if snake eats food.
            // game.growIfAteFood();
    
            // 4. Update snakes new location.
            player.updateSnakeLocation();
        }
    }, 200);

    for (const controller of this.contollers) {
        if (controller.automated) {
            setInterval(() => {
                controller.automate();
            }, 2000);
        } else {
            window.addEventListener('keydown', (e) => {
                const keyCode = e.which || event.keyCode;
                controller.manual(keyCode);
            });
        }
    }
}

module.exports = Game;
