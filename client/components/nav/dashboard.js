const additionalInfo = document.getElementById('additionalInfo');
const PlayerInfo = require('./player_info');
const util = require('./util');

function Dashboard() {
    const startButton = util.createButton({ id: 'start', text: 'start' });
    const stopButton = util.createButton({ id: 'stop', text: 'stop' });
    additionalInfo.appendChild(startButton.div);
    additionalInfo.appendChild(stopButton.div);

    this.startButton = startButton.button;
    this.stopButton = stopButton.button;

    const playerInfo = new PlayerInfo(additionalInfo);
    this.playerInfo = playerInfo;
}

Dashboard.prototype.setStartListener = function(fn) {
    this.startButton.addEventListener('click', () => {
        fn();
    });
}

Dashboard.prototype.setStopListener = function(fn) {
    this.stopButton.addEventListener('click', () => {
        fn();
    });
}

Dashboard.prototype.setPlayerListener = function(fn) {
    this.playerInfo.createPlayerButton.addEventListener('click', () => {
        const name = document.getElementById('player1').value;
        const scoreInfo = createScoreLabel('player1');
        const done = fn(name, scoreInfo.score);
        if (done) {
            this.playerInfo.createButtonClick({ name, scoreInfo });
        }
    });
}

Dashboard.prototype.setAutomaticPlayerListener = function(fn) {
    this.playerInfo.automatedPlayerButton.addEventListener('click', () => {
        const name = 'AutomaticPlayer';
        const scoreInfo = createScoreLabel(name);
    
        const done = fn(name, scoreInfo.score);
        if (done) {
            this.playerInfo.addAutomaticButtonClick({ name, scoreInfo });
        }
    });
}

function createScoreLabel(name) {
    const label = util.createLabel({ id: `${name}Label`, text: 'score: '});
    const score = util.createLabel({ id: `${name}Score`, text: '0'});;

    return {
        label,
        score,
    }
}

module.exports = new Dashboard();
