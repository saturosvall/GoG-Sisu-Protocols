// Will draw score, timer and other information that will display for the player
class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 35;
        this.fontFamily = 'Bangers';
        this.color = 'white';
        this.livesImage = document.getElementById('RobotLives');
        this.gameOverWinSound = document.getElementById('gameOverWin');
        this.gameOverLossSound = document.getElementById('gameOverLoss');
        this.pauseImage = document.getElementById('level1PauseMenu');
        this.helpImage = document.getElementById('helpImage');
    }
    playGameOverSound(isWin) {
        if (isWin) {
            this.gameOverWinSound.play();
        } else {
            this.gameOverLossSound.play();
        }
    }
    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;

        if (!this.game.debug) {
            // Photons Energy (ʏ) / Defensive power remaining
            // Photons Energy
            context.fillText('Photons: ' + this.game.score + '/' + this.game.winningScore, 20, 40);
            // Remaining defensive power
            const remainingTime = this.game.timeLimit - this.game.gameTime;
            const percentage = ((remainingTime / this.game.timeLimit) * 100).toFixed(0); // toFixed method formats a number using fixed point notation (after decimal point)
            // Style with condition for percentage
            if (percentage > 25) {
                context.fillText('Defence: ' + percentage + ' %', 20, 80);
            } else {
                context.save();
                context.fillStyle = 'red';
                context.fillText('Defence: ' + percentage + ' %', 20, 80);
                context.restore();
            }


        } else {
            // Show score and timer in debug mode
            // Score
            context.fillText('Score: ' + this.game.score + '/' + this.game.winningScore, 20, 40);
            // Timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1); // toFixed method formats a number using fixed point notation (after decimal point)
            // Style with condition for percentage
            if (formattedTime > formattedTime - (formattedTime * 0.25)) {
                context.fillText('Timer: ' + formattedTime, 20, 80);
            } else {
                context.save();
                context.fillStyle = 'red';
                context.fillText('Timer: ' + formattedTime, 20, 80);
                context.restore();
            }
        }
        // Drawing Robot lives
        for (let i = 0; i < this.game.robotLives; i++) {
            context.drawImage(this.livesImage, 47 * i + 20, 90, 40, 47);
        }


        // Pause menu
        if (this.game.help) {
            // conditions for menu images
            this.game.pause = true;
            this.helpImage.classList.remove('hidden');
            this.pauseImage.classList.add('hidden');
        }
        else if (this.game.pause && !this.game.help) {
            this.pauseImage.classList.remove('hidden');
            this.helpImage.classList.add('hidden');
        } else {
            this.pauseImage.classList.add('hidden');
            this.helpImage.classList.add('hidden');
        }
        // Game over message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            let message3;
            if (this.game.score >= this.game.winningScore) {

                message1 = 'SISU Protocols Succeeded!';
                message2 = 'The Planet is Safe and the shield is now active!!';
                message3 = 'Press R to restart          Press H to Help Menu';
                this.playGameOverSound(true)
            } else {
                message1 = 'Mission Failed!';
                message2 = 'This planet is lost!';
                message3 = 'Press R to restart          Press H to Help Menu';
                this.playGameOverSound(false)
            }
            context.font = '100px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '35px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 25);
            context.font = '25px ' + this.fontFamily;
            context.fillText(message3, this.game.width * 0.5, this.game.height * 0.5 + 120);
        }
        context.restore();

    }
}