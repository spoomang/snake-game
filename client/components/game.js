const { CANVAS_HEIGHT, CANVAS_WIDTH } = require('../enums/length');
const { EVENT_TYPES } = require('../enums/events');

const { getXYCordinateOfFood } = require('../utilities/utilities');

const Event = require('../event/event');
const Link = require('../model/objects');

function Game(players, ctx, imageSrc, contollers) {
    this.players = players;
    this.ctx = ctx;
    this.imageSrc = imageSrc;
    this.contollers = contollers;
}

Game.prototype.updateFood = function() {
    if(!this.food) {
        const cordinates = getXYCordinateOfFood();
        const x = cordinates[0];
        const y = cordinates[1];
        const food = new Link(x, y, false, this.imageSrc);
        this.food = food;
    }

    Event.emit(EVENT_TYPES.UPDATE_FOOD, { food: this.food });

    this.ctx.drawImage(this.food.image, this.food.x, this.food.y);
}

Game.prototype.start = function() {
    Event.emit(EVENT_TYPES.GAME_STARTED, 'game started.');

    setInterval(() => {
        // 1. Clear canvas.
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const player of this.players) {

            // 2. Update Location of food.
            this.updateFood();
    
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
