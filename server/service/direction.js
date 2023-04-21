const { DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT } = require('../enums/direction');

module.exports = {
    getDirection: (req, res) => {
        const currentDirection = req.pathParamsMap.currentDirection

        const randomNum = Math.floor(Math.random() * 2);

        let newDirection = currentDirection;
        switch(currentDirection) {
            case DIRECTION_LEFT:
            case DIRECTION_RIGHT:
                if (randomNum == 0) {
                    newDirection = DIRECTION_UP;
                } else {
                    newDirection = DIRECTION_DOWN;
                }
    
                break;
            case DIRECTION_DOWN:
            case DIRECTION_UP:
                if (randomNum == 0) {
                    newDirection = DIRECTION_LEFT;
                } else {
                    newDirection = DIRECTION_RIGHT;
                }
                break;
        
            default:
                break;
        }

        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({ newDirection }), 'utf-8');
    },
};
