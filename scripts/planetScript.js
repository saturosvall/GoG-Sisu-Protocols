// Class to handle the planet, the planet boarder and Generated Shield
class Planet {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('planet');
        this.imageWidth = 1100;
        this.imageHeight = this.game.height + 440;
        this.x = -100;
        this.y = 360;
        this.radius = 380;
        this.imageX = this.x + 30;
        this.borderColor = 'hsla(175, 100%, 75%, 0.356)'; // initial border color
        this.sphereColor = 'hsla(157, 100%, 75%, 0.11)'; // initial sphere color
        this.planetBorderDescription = '';
    }
    draw(context) {
        context.drawImage(this.image, this.imageX - (this.imageWidth * 0.5), this.y - this.imageHeight * 0.5, this.imageWidth, this.imageHeight);
        // console.log(this.x, this.y);
        // drawing the circle boarder of the planet
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.sphereColor;
        context.fill();
        // Setting the border color
        context.strokeStyle = this.borderColor;
        context.lineWidth = 10;
        context.stroke();
        context.restore();
        if (this.game.debug) {
            // for debug mode showing the border limits and border description
            if (this.game.score >= this.game.winningScore) {
                this.planetBorderDescription = 'Border status: Shield Active';
            } else if (this.game.gameOver && this.game.score <= this.game.winningScore) {
                this.planetBorderDescription = 'Border status: No Defense';
            } else {
                this.planetBorderDescription = 'Border status: Basic Defense';
            }
            context.save();
            context.beginPath();
            context.arc(this.x + 4, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.font = '28px Bangers';
            context.fillText(this.planetBorderDescription, this.x + this.radius - 45, this.y - 250);
            context.restore();
        }
    }
}