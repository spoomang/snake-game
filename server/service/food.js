const { BORDER_MARGIN, CANVAS_HEIGHT, CANVAS_WIDTH, LINK_HEIGHT, LINK_WIDTH } = require('../enums/length');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getXYCordinateOfFood() {
    let randX = getRndInteger(0, CANVAS_WIDTH);
    let randY = getRndInteger(0, CANVAS_HEIGHT);

    return [(randX - randX % LINK_WIDTH) + BORDER_MARGIN, (randY - randY % LINK_HEIGHT) + BORDER_MARGIN];
}

module.exports = {
    getRandomCooridinatesForFood: (req, res) => {
        const coordinates = getXYCordinateOfFood();

        const result = {
            randX: coordinates[0],
            randY: coordinates[1],
        }

        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(result), 'utf-8');
    },
}