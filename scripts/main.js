const canvas = document.getElementById('snakeCanvas');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

function resize() {
    const height = window.innerHeight - 20;

    const ratio = canvas.width / canvas.height;
    const width = ratio * height;

    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
}

function GameBasic() {
    this.links = [];
    const head = new Link(LINK_WIDTH * 2 + BORDER_MARGIN, BORDER_MARGIN, true, 'R');
    const tail = new Link(BORDER_MARGIN, BORDER_MARGIN, false, 'R', true)

    this.head = head;
    this.tail = tail;

    this.links.push(this.head);
    this.links.push(new Link(LINK_WIDTH + BORDER_MARGIN, BORDER_MARGIN, false, 'R'));
    this.links.push(this.tail);

    this.speed = 300;
    this.food = null;
    this.pause = false;
}

GameBasic.prototype.updateFood = function() {
    if(!this.food) {
        const cordinates = getXYCordinateOfFood();
        const x = cordinates[0];
        const y = cordinates[1];
        const food = new Link(x, y, false, null);
        this.food = food;
    }

    ctx.drawImage(this.food.image, this.food.x, this.food.y);
}

GameBasic.prototype.growIfAteFood = function(){
    if(ateFood(this.head.x, this.head.y, this.food.x, this.food.y)) {
        const newLink = new Link(this.tail.x, this.tail.y, false, this.tail.direction, true);
        switch(newLink.direction) {
            case 'R':
                newLink.x -= newLink.width;
                break;
            case 'L':
                newLink.x += newLink.width;
                break;
            case 'U':
                newLink.y += newLink.height;
                break;
            case 'D':
                newLink.y -= newLink.height;
                break;
            default:
                break;
        }

        this.tail = newLink;
        this.links.push(newLink);

        this.food = null;
    }
}

GameBasic.prototype.updateSnakeLocation = function() {
    for(let link of this.links) {
        updateLinkLocation(link);
        ctx.drawImage(link.image, link.x, link.y);
    }

    for(let i = this.links.length - 1; i > 0; i--) {
        this.links[i].direction = this.links[i - 1].direction;
    }
}

GameBasic.prototype.onKeyDown = function(keyCode) {
    let x, y, direction;
    switch(keyCode) {
        case 40:
            this.head.direction = 'D';
            break;
        case 39:
            this.head.direction = 'R';   
            break;
        case 38:
            this.head.direction = 'U';
            break;
        case 37:
            this.head.direction = 'L';
            break;
        case 32:
            this.pause = !this.pause;
        default:
            break;
    }
}

GameBasic.prototype.start = function() {
    setInterval(() => {
        if(!this.pause) {
            gameLoop(this);
        }
    }, this.speed);
}

const game = new GameBasic();
game.start();

function gameLoop(game) {
    // 1. Clear canvas.
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Update Location of food.
    game.updateFood();

    // 3. Grow if snake eats food.
    game.growIfAteFood();

    // 4. Update snakes new location.
    game.updateSnakeLocation();
}

window.addEventListener('load', resize, false);

window.addEventListener('keydown', (e) => {
    const keyCode = e.which || event.keyCode;
    game.onKeyDown(keyCode);
});

