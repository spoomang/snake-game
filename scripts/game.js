function Game(players, ctx, imageSrc) {
    this.players = players;
    this.ctx = ctx;
    this.imageSrc = imageSrc;
}

Game.prototype.updateFood = function() {
    if(!this.food) {
        const cordinates = getXYCordinateOfFood();
        const x = cordinates[0];
        const y = cordinates[1];
        const food = new Link(x, y, false, this.imageSrc);
        this.food = food;
    }

    this.ctx.drawImage(this.food.image, this.food.x, this.food.y);
}

Game.prototype.start = function() {
    setInterval(() => {
        // 1. Clear canvas.
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const player of this.players) {

            // 2. Update Location of food.
            this.updateFood();
    
            // 3. Grow if snake eats food.
            // game.growIfAteFood();
    
            // 4. Update snakes new location.
            player.updateSnakeLocation();
        }
    }, 200);

    for (const player of this.players) {
        if (player.automated) {
            setInterval(() => {
                player.automate();
            }, 2000);
        } else {
            window.addEventListener('keydown', (e) => {
                const keyCode = e.which || event.keyCode;
                player.onKeyDown(keyCode);
            });
        }
    }
}
