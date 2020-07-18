function Link(x, y, isHead, direction, isTail) {
    this.height = LINK_HEIGHT;
    this.width = LINK_WIDTH;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = 'images/link.png';
    this.isHead = isHead;
    this.direction = direction;
    this.isTail = isTail;
    return this;
}
