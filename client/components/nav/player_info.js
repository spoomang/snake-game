const { createButton, createInput, createLabel } = require('./util');

function PlayerInfo (additionalInfo) {
    const automatedPlayerButton = createButton({ id: 'addAutomatedPlayer', text: 'play with automated' });
    const createPlayerButton = createButton({ id: 'addPlayer', text: 'add player' });
    const player1Input = createInput({ id: 'player1', text: 'player 1' });


    const div  = document.createElement("div");
    div.className = "outer";
    div.appendChild(automatedPlayerButton.div);
    div.appendChild(createPlayerButton.div);


    additionalInfo.appendChild(div);
    additionalInfo.appendChild(player1Input);

    const playerInfo = document.createElement("div");
    playerInfo.innerHTML = "<p> Player Info <p/>"

    this.playerInfo = playerInfo;

    this.createPlayerButton = createPlayerButton.button;
    this.automatedPlayerButton = automatedPlayerButton.button;

    additionalInfo.appendChild(playerInfo);
};

PlayerInfo.prototype.createButtonClick = function({ name, scoreInfo }) {
    const player1Info = document.createElement("div");

    const player1Name = document.createElement("div");
    player1Name.textContent = name;

    const player1ScoreLabel = scoreInfo.label;
    const player1Score = scoreInfo.score;

    player1ScoreLabel.append(player1Score)

    player1Info.appendChild(player1Name);
    player1Info.appendChild(player1ScoreLabel);

    this.playerInfo.appendChild(player1Info);

    this.player1Score = player1Score;
    this.player1 = player1Name;
}

PlayerInfo.prototype.addAutomaticButtonClick = function({ name, scoreInfo }) {
    const player1Info = document.createElement("div");

    const player1Name = document.createElement("div");
    player1Name.textContent = name;

    const player1ScoreLabel = scoreInfo.label;
    const player1Score = scoreInfo.score;

    player1ScoreLabel.append(player1Score)

    player1Info.appendChild(player1Name);
    player1Info.appendChild(player1ScoreLabel);

    this.playerInfo.appendChild(player1Info);

    this.automatedPlayerScore = player1Score;
    this.playerAutomated = player1Name;
}

module.exports = PlayerInfo;
