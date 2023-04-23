const { createButton, createInput } = require('./util');

function PlayerInfo (additionalInfo){
    const automatedPlayerButton = createButton({ id: 'addAutomatedPlayer', text: 'play with automated' });
    const createPlayerButton = createButton({ id: 'addPlayer', text: 'add player' });
    const player1Input = createInput({ id: 'player1', text: 'player 1' });

    additionalInfo.appendChild(automatedPlayerButton);
    additionalInfo.appendChild(createPlayerButton);
    additionalInfo.appendChild(player1Input);

    const playerInfo = document.createElement("div");
    playerInfo.innerHTML = "<p> Player Info <p/>"

    this.playerInfo = playerInfo;

    this.createPlayerButton = createPlayerButton;
    this.automatedPlayerButton = automatedPlayerButton;

    
    // createPlayerButton.addEventListener('click', (e) => {
    //     const player1Info = document.createElement("div");

    //     const player1Name = document.createElement("div");
    //     player1Name.textContent = document.getElementById('player1').value;

    //     const player1ScoreLabel = document.createElement("label");
    //     player1ScoreLabel.textContent = 'score: ';

    //     const player1Score = document.createElement("label");
    //     player1Score.textContent = '0';

    //     player1ScoreLabel.append(player1Score)

    //     player1Info.appendChild(player1Name);
    //     player1Info.appendChild(player1ScoreLabel);

    //     playerInfo.appendChild(player1Info);

    //     this.player1Score = player1Score;
    //     this.player1 = player1Name;
    // });


    automatedPlayerButton.addEventListener('click', (e) => {
        const player1Info = document.createElement("div");

        const player1Name = document.createElement("div");
        player1Name.textContent = "Automated player";

        const player1ScoreLabel = document.createElement("label");
        player1ScoreLabel.textContent = 'score: ';

        const player1Score = document.createElement("label");
        player1Score.textContent = '0';

        player1ScoreLabel.append(player1Score)

        player1Info.appendChild(player1Name);
        player1Info.appendChild(player1ScoreLabel);

        playerInfo.appendChild(player1Info);

        this.automatedPlayerScore = player1Score;
        this.playerAutomated = player1Name;
    });

    additionalInfo.appendChild(playerInfo);
};

PlayerInfo.prototype.createButtonClick = function() {
        const player1Info = document.createElement("div");

        const player1Name = document.createElement("div");
        player1Name.textContent = document.getElementById('player1').value;

        const player1ScoreLabel = document.createElement("label");
        player1ScoreLabel.textContent = 'score: ';

        const player1Score = document.createElement("label");
        player1Score.textContent = '0';

        player1ScoreLabel.append(player1Score)

        player1Info.appendChild(player1Name);
        player1Info.appendChild(player1ScoreLabel);

        this.playerInfo.appendChild(player1Info);

        this.player1Score = player1Score;
        this.player1 = player1Name;
}

module.exports = PlayerInfo;
