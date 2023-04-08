const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('../enums/direction');

function SnakeController(player) {
    this.player = player;
    this.automated = player.automated;
}

SnakeController.prototype.manual = function(keyCode) {
    if (this.automated) {
        return
    }

    let x, y, direction;
    const currentDirection = this.player.head.direction;
    switch(keyCode) {
        case 40:
            if (currentDirection == DIRECTION_LEFT || currentDirection == DIRECTION_RIGHT) {
                this.player.head.direction = DIRECTION_DOWN;
            }
            break;
        case 39:
            if (currentDirection == DIRECTION_UP || currentDirection == DIRECTION_DOWN) {
                this.player.head.direction = DIRECTION_RIGHT;
            }
            break;
        case 38:
            if (currentDirection == DIRECTION_LEFT || currentDirection == DIRECTION_RIGHT) {
                this.player.head.direction = DIRECTION_UP;
            }
            break;
        case 37:
            if (currentDirection == DIRECTION_UP || currentDirection == DIRECTION_DOWN) {
                this.player.head.direction = DIRECTION_LEFT;
            }
            break;
        case 32:
            this.player.player.pause = !this.player.player.pause;
        default:
            break;
    }
}

SnakeController.prototype.automate = function() {
    const randomNum = Math.floor(Math.random() * 2);

    switch(this.player.head.direction) {
        case DIRECTION_LEFT:
        case DIRECTION_RIGHT:
            if (randomNum == 0) {
                this.player.head.direction = DIRECTION_UP;
            } else {
                this.player.head.direction = DIRECTION_DOWN;
            }

            break;
        case DIRECTION_DOWN:
        case DIRECTION_UP:
            if (randomNum == 0) {
                this.player.head.direction = DIRECTION_LEFT;
            } else {
                this.player.head.direction = DIRECTION_RIGHT;
            }
            break;
    
        default:
            break;
    }
}

module.exports = SnakeController;
