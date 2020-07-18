function Link(x, y, direction) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = 'images/link.png';
    this.direction = direction;
    return this;
}
