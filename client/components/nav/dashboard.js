const additionalInfo = document.getElementById('additionalInfo');
const PlayerInfo = require('./player_info');
const util = require('./util');

function Dashboard() {
    const startButton = util.createButton({ id: 'start', text: 'start' });
    const stopButton = util.createButton({ id: 'stop', text: 'stop' });
    additionalInfo.appendChild(startButton);
    additionalInfo.appendChild(stopButton);

    this.startButton = startButton;
    this.stopButton = stopButton;

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
        this.playerInfo.createButtonClick();
        fn(this.playerInfo.player1, this.playerInfo.player1Score);
    });
}

Dashboard.prototype.setAutomaticPlayerListener = function(fn) {
    this.playerInfo.automatedPlayerButton.addEventListener('click', () => {
        this.playerInfo.addAutomaticButtonClick();
        fn(this.playerInfo.playerAutomated, this.playerInfo.automatedPlayerScore);
    });
}

module.exports = new Dashboard();
