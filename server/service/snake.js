
let player = {};

module.exports = {
    getSnakeDetails: (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(player), 'utf-8');
    },

    addSnakeDetails: (req, res) => {
        req.on('data', (chunk) => {
            console.log(`Data chunk available: ${chunk}`)

            const json = JSON.parse(chunk);

            player.x = json.x;
            player.y = json.y;
            player.direction = json.direction;

            console.log('di ga', player);

            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify({ player }), 'utf-8');
        })
    },
}