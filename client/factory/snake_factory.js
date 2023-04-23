// TODO
// 4. create dashboard
// 6. shift control to backend

const SnakePlayer = require('../components/snake');
const SnakeController = require('../controller/snake');

function SnakeFactory() {}

SnakeFactory.prototype.create = function(options) {
    const player = new SnakePlayer(options);
    const controller = new SnakeController(player);

    return controller;
}


module.exports = new SnakeFactory();
