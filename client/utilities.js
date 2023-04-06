const { CANVAS_HEIGHT, CANVAS_WIDTH, LINK_HEIGHT, LINK_WIDTH, BORDER_MARGIN } = require('./enums/length');
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('./enums/direction');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function ateFood(x1, y1, x2, y2) {
    return (Math.abs(x1 - x2) < LINK_WIDTH) && (Math.abs(y1 - y2) < LINK_HEIGHT);
}

function getXYCordinateOfFood() {
    let randX = getRndInteger(0, CANVAS_WIDTH);
    let randY = getRndInteger(0, CANVAS_HEIGHT);

    return [(randX - randX % LINK_WIDTH) + BORDER_MARGIN, (randY - randY % LINK_HEIGHT) + BORDER_MARGIN];
}

function updateLinkLocation(link) {
    switch(link.direction) {
        case DIRECTION_RIGHT:
            link.x += LINK_WIDTH;
            break;
        case DIRECTION_LEFT:
            link.x -= LINK_WIDTH;
            break;
        case DIRECTION_UP:
            link.y -= LINK_HEIGHT;
            break;
        case DIRECTION_DOWN:
            link.y += LINK_HEIGHT;
            break;
        default:
            break;
    }

    if(link.x + LINK_WIDTH > CANVAS_WIDTH) {
        link.x = BORDER_MARGIN;
    } else if(link.x < BORDER_MARGIN) {
        link.x = CANVAS_WIDTH - (LINK_WIDTH + BORDER_MARGIN);
    }

    if(link.y + LINK_HEIGHT > CANVAS_HEIGHT) {
        link.y = BORDER_MARGIN;
    } else if(link.y < BORDER_MARGIN) {
        link.y = CANVAS_HEIGHT - (LINK_HEIGHT + BORDER_MARGIN);
    }
}

module.exports = {
    getRndInteger,
    ateFood,
    getXYCordinateOfFood,
    updateLinkLocation,
};

