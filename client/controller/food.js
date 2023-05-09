const API = require('../api');
const { EVENT_TYPES } = require('../enums/events');
const { getXYCordinateOfFood } = require('../utilities/utilities');
const Event = require('../event/event');
const Link = require('../model/objects');

function FoodController() {
}

FoodController.prototype.setParams = function({ ctx, foodImageSrc }) {
    this.ctx = ctx;
    this.foodImageSrc = foodImageSrc;
}

FoodController.prototype.updateFood = async function() {
    if(!this.food) {
        const cordinates = await API.callAPI({
            path: 'food/cordinates',
        });

        const x = cordinates.randX;
        const y = cordinates.randY;
        const food = new Link(x, y, false, this.foodImageSrc);
        this.food = food;

        Event.emit(EVENT_TYPES.UPDATE_FOOD, { food: this.food });
    }


    this.ctx.drawImage(this.food.image, this.food.x, this.food.y);
}

module.exports = new FoodController();
