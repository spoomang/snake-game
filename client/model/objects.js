const Utilities = require('../utilities/utilities');

function Link(x, y, direction, imageSrc) {
    this.x = x;
    this.y = y;
    this.image = Utilities.createImage(imageSrc);
    this.direction = direction;
    return this;
}

module.exports = Link;
