const { EVENT_TYPES } = require('../enums/events');

const { getXYCordinateOfFood } = require('../utilities/utilities');

const Event = require('../event/event');
const Link = require('../model/objects');

function FoodComponent() {
}

FoodComponent.prototype.setParams = function({ ctx, foodImageSrc }) {
    this.ctx = ctx;
    this.foodImageSrc = foodImageSrc;
}

FoodComponent.prototype.updateFood = function() {
    if(!this.food) {
        const cordinates = getXYCordinateOfFood();
        const x = cordinates[0];
        const y = cordinates[1];
        const food = new Link(x, y, false, this.foodImageSrc);
        this.food = food;
    }

    Event.emit(EVENT_TYPES.UPDATE_FOOD, { food: this.food });

    this.ctx.drawImage(this.food.image, this.food.x, this.food.y);
}

module.exports = new FoodComponent();
