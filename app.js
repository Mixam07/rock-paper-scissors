class App {
    constructor() {
        this.playersScoreLabel = document.querySelector('#player');
        this.computersScoreLabel = document.querySelector('#computer');
        this.rockBtn = document.querySelector('#rock');
        this.paperBtn = document.querySelector('#paper');
        this.scissorsBtn = document.querySelector('#scissors');
        this.playersHand = document.querySelector('#players_hand');
        this.computersHand = document.querySelector('#computers_hand');
        this.winnerLabel = document.querySelector('.winner');

        this.rockPath = './assets/rock.png';
        this.paperPath = './assets/paper.png';
        this.scissorsPath = './assets/scissors.png';

        this.variants = [this.rockPath, this.paperPath, this.scissorsPath];

        this.playersChoice = null;
        this.computersChoice = null;
        this.playersScore = 0;
        this.computersScore = 0;

        this.init();
    }

    init() {
        this.rockBtn.addEventListener('click', () => this.makeMove(this.rockPath));
        this.paperBtn.addEventListener('click', () => this.makeMove(this.paperPath));
        this.scissorsBtn.addEventListener('click', () => this.makeMove(this.scissorsPath));

        this.playersHand.addEventListener('webkitAnimationEnd', () => this.onAnimationEnd());
    }

    makeMove(choice) {
        this.addAnimation(this.playersHand, 'animated1');
        this.addAnimation(this.computersHand, 'animated2');
        this.playersChoice = choice;
        this.computersChoice = this.variants[this.getRandomInt(0, 3)];
        this.disableButtons();
    }

    onAnimationEnd() {
        this.clearAnimation(this.playersHand, 'animated1');
        this.clearAnimation(this.computersHand, 'animated2');
        this.throwHands();
        this.determineWinner();
        setTimeout(() => {
            this.resetGame();
            this.enableButtons();
        }, 2000);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addAnimation(elem, animation) {
        elem.classList.add(animation);
    }

    clearAnimation(elem, animation) {
        elem.classList.remove(animation);
    }

    disableButtons() {
        this.rockBtn.setAttribute('disabled', 'true');
        this.paperBtn.setAttribute('disabled', 'true');
        this.scissorsBtn.setAttribute('disabled', 'true');
    }

    enableButtons() {
        this.rockBtn.removeAttribute('disabled');
        this.paperBtn.removeAttribute('disabled');
        this.scissorsBtn.removeAttribute('disabled');
    }

    throwHands() {
        this.playersHand.setAttribute('src', this.playersChoice);
        this.computersHand.setAttribute('src', this.computersChoice);
    }

    determineWinner() {
        if (this.playersChoice === this.computersChoice) {
            this.setWinnerLabel('Draw!!!');
        } else if (
            (this.playersChoice === this.rockPath && this.computersChoice === this.scissorsPath) ||
            (this.playersChoice === this.paperPath && this.computersChoice === this.rockPath) ||
            (this.playersChoice === this.scissorsPath && this.computersChoice === this.paperPath)
        ) {
            this.playerWon();
        } else {
            this.computerWon();
        }
    }

    setWinnerLabel(text) {
        this.winnerLabel.textContent = text;
    }

    playerWon() {
        this.setWinnerLabel('Player won');
        this.playersScore++;
        this.updateScores();
    }

    computerWon() {
        this.setWinnerLabel('Computer won');
        this.computersScore++;
        this.updateScores();
    }

    updateScores() {
        this.playersScoreLabel.textContent = this.playersScore;
        this.computersScoreLabel.textContent = this.computersScore;
    }

    resetGame() {
        this.playersHand.setAttribute('src', this.rockPath);
        this.computersHand.setAttribute('src', this.rockPath);
        this.setWinnerLabel('Choose an option');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});