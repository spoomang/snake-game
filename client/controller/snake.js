const API = require('../api');
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('../enums/direction');

function SnakeController(player) {
    this.player = player;
    this.automated = player.automated;
}

SnakeController.prototype.manual = function(keyCode) {
    if (this.automated) {
        return
    }

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

SnakeController.prototype.automate = async function() {
    const currentDirection = this.player.head.direction;

    const response = await API.callAPI({
        path: 'snake/automated/direction',
        urlParamMap: { currentDirection },
    });
    this.player.head.direction = response.newDirection;
}

module.exports = SnakeController;
