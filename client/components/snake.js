const Link = require('../model/objects');
const FoodController = require('../controller/food');

const { ateFood, updateLinkLocation } = require('../utilities/utilities');
const { LINK_HEIGHT, LINK_WIDTH, BORDER_MARGIN } = require('../enums/length');
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('../enums/direction');

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
    this.score = 0;
}

SnakePlayer.prototype.setScoreBoard = function(scoreBoardtext) {
    this.scoreBoardtext = scoreBoardtext;
}

SnakePlayer.prototype.updateScore = function() {
    this.score += 1;
    if (this.scoreBoardtext) {
        this.scoreBoardtext.textContent = this.score;
    }
}

SnakePlayer.prototype.growIfAteFood = function(){
    if(FoodController.food && ateFood(this.head.x, this.head.y, FoodController.food.x, FoodController.food.y)) {
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

        FoodController.food = null;
        this.updateScore();
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

module.exports = SnakePlayer;
