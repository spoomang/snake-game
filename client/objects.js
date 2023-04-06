function Link(x, y, direction, imageSrc) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
    this.direction = direction;
    return this;
}

module.exports = Link;
