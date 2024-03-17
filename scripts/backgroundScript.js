// class to handle Background
class Background {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('level1Background');
        this.width = 2400; // original width
        this.height = this.game.height; // original height
        this.scaledWidth = this.width;
        this.scaledHeight = this.height;
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.x -= 0.1; // need to scaled speed (this.game.speed)
        if (this.x <= -this.scaledWidth) this.x = 0;
        // console.log('BG updated');
    }

    draw(context) {
        context.drawImage(this.image, this.x, 0, this.scaledWidth, this.scaledHeight);
        context.drawImage(this.image, this.x + this.scaledWidth, 0, this.scaledWidth, this.scaledHeight);
        if (this.game.canvas.width >= this.scaledWidth) {
            context.drawImage(this.image, this.x + this.scaledWidth * 2, 0, this.scaledWidth, this.scaledHeight);
        }
    }

}

// Class to handle Layers animation
class Layer {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('layer1');
        this.width = 2400;
        this.height = 1080;
        this.scaledWidth = this.width 
        this.scaledHeight = this.height
        this.x = -1200; // starts from spesific position from left outside canvas
        this.y = 0;
    }

    update() {
        if (!this.game.pause) {
            this.x += 1  // layer moving from left to right certain speed
            if (this.x > this.width)  // when reaching this position starts again
                this.x = -1200;
            // console.log(this.x);
        }

    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.scaledWidth, this.scaledHeight);
    }
}