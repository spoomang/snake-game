const { LINK_HEIGHT, LINK_WIDTH, BORDER_MARGIN } = require('../enums/length');
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('../enums/direction');

const Link = require('../model/objects');
const { ateFood, updateLinkLocation } = require('../utilities/utilities');

function SnakePlayer({ imageSrc, automated, ctx, initialPositionX, initialPositionY }) {
    let startPositionX = !!initialPositionX ? initialPositionX : 0;
    let startPositionY = !!initialPositionY ? initialPositionY : 0;

    this.links = [];
    this.imageSrc = imageSrc
    const head = new Link(startPositionX + LINK_WIDTH * 2 + BORDER_MARGIN, startPositionY + BORDER_MARGIN, DIRECTION_RIGHT, this.imageSrc);
    const middle = new Link(startPositionX + LINK_WIDTH + BORDER_MARGIN, startPositionY + BORDER_MARGIN, DIRECTION_RIGHT, this.imageSrc);
    const tail = new Link(startPositionX + BORDER_MARGIN, startPositionY + BORDER_MARGIN, DIRECTION_RIGHT, this.imageSrc);

    this.head = head;
    this.tail = tail;

    this.links.push(this.head);
    this.links.push(middle);
    this.links.push(this.tail);

    this.pause = false;
    this.automated = automated
    this.ctx = ctx;
}

SnakePlayer.prototype.growIfAteFood = function(){
    if(ateFood(this.head.x, this.head.y, this.food.x, this.food.y)) {
        const newLink = new Link(this.tail.x, this.tail.y, this.tail.direction, this.imageSrc);
        switch(newLink.direction) {
            case DIRECTION_RIGHT:
                newLink.x -= LINK_WIDTH;
                break;
            case DIRECTION_LEFT:
                newLink.x += LINK_WIDTH;
                break;
            case DIRECTION_UP:
                newLink.y += LINK_HEIGHT;
                break;
            case DIRECTION_DOWN:
                newLink.y -= LINK_HEIGHT;
                break;
            default:
                break;
        }

        this.tail = newLink;
        this.links.push(newLink);

        this.food = null;
    }
}

SnakePlayer.prototype.updateSnakeLocation = function() {
    for(let link of this.links) {
        updateLinkLocation(link);
        this.ctx.drawImage(link.image, link.x, link.y);
    }

    for(let i = this.links.length - 1; i > 0; i--) {
        this.links[i].direction = this.links[i - 1].direction;
    }
}

SnakePlayer.prototype.onKeyDown = function(keyCode) {
    if (this.automated) {
        return
    }

    let x, y, direction;
    const currentDirection = this.head.direction;
    switch(keyCode) {
        case 40:
            if (currentDirection == DIRECTION_LEFT || currentDirection == DIRECTION_RIGHT) {
                this.head.direction = DIRECTION_DOWN;
            }
            break;
        case 39:
            if (currentDirection == DIRECTION_UP || currentDirection == DIRECTION_DOWN) {
                this.head.direction = DIRECTION_RIGHT;
            }
            break;
        case 38:
            if (currentDirection == DIRECTION_LEFT || currentDirection == DIRECTION_RIGHT) {
                this.head.direction = DIRECTION_UP;
            }
            break;
        case 37:
            if (currentDirection == DIRECTION_UP || currentDirection == DIRECTION_DOWN) {
                this.head.direction = DIRECTION_LEFT;
            }
            break;
        case 32:
            this.pause = !this.pause;
        default:
            break;
    }
}

SnakePlayer.prototype.automate = function() {
    const randomNum = Math.floor(Math.random() * 2);

    switch(this.head.direction) {
        case DIRECTION_LEFT:
        case DIRECTION_RIGHT:
            if (randomNum == 0) {
                this.head.direction = DIRECTION_UP;
            } else {
                this.head.direction = DIRECTION_DOWN;
            }

            break;
        case DIRECTION_DOWN:
        case DIRECTION_UP:
            if (randomNum == 0) {
                this.head.direction = DIRECTION_LEFT;
            } else {
                this.head.direction = DIRECTION_RIGHT;
            }
            break;
    
        default:
            break;
    }
}

module.exports = SnakePlayer;
