// Handle explosion types
class Explosion {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.image = document.getElementById('explosions');
        this.spriteWidth = 300;
        this.spriteHeight = 300;
        this.free = true;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
        this.maxFrame = 22;
        this.animationTimer = 0;
        this.animationInterval = 1000 / 25; // to control the frame rate per second
        this.sound = this.game.explosionSounds[Math.floor(Math.random() * this.game.explosionSounds.length)]; // Randomizing one of explosionSounds array sounds starting from index 0 to array length
    }
    // method to draw the sprite sheets
    draw(context) {
        if (!this.free) {
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - this.spriteWidth * 0.5, this.y - this.spriteWidth * 0.5, this.spriteWidth, this.spriteHeight);
        }
    }
    // Method to cycle through the sprite sheets of the explosion
    update(deltaTime) {
        if (!this.free) {
            // Adjusting the motion of the explosion animation on horizontal coordinates
            this.x += this.speed;
            // setting the periodic event for animation
            if (this.animationTimer > this.animationInterval) {
                this.frameX++;
                if (this.frameX > this.maxFrame) this.reset();
                // reset animationTimer to 0
                this.animationTimer = 0;
            } else {
                this.animationTimer += deltaTime;
            }
        }
    }
    // Method to play explosion sound
    play() {
        this.sound.currentTime = 0;
        this.sound.play(); // a built in function for html audio
    }
    // Method to return the object back to the object Pool
    reset() {
        this.free = true;
    }
    // Method that takes the object from the pool
    start(x, y, speed) {
        this.free = false;
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.speed = speed;
        this.play();
    }
}

// Will handle the disappearance explosion of aliens
class DisappearanceExplosion extends Explosion {
    constructor(game) {
        super(game);
        // Custom properties specific for disappearance effect
        this.image = document.getElementById('disappear');
        this.spriteWidth = 79.5;
        this.spriteHeight = 80;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 7;
        this.sound = this.game.disappearSound;
    }
    // Overriding start method
    start(x, y, speed) {
        this.sound.play();
        super.start(x, y, speed);
    }
}

// Will handle the explosion of space orks
class SmokeExplosion extends Explosion {
    constructor(game) {
        super(game);
        // Custom properties specific for smoke explosion effect
        this.image = document.getElementById('smokeExplosion');
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.frameY = 0;
        this.maxFrame = 9;
        this.sound = document.getElementById('monsterRoar');
    }
    // Overriding start method
    start(x, y, speed) {
        this.sound = document.getElementById('monsterRoar');
        this.sound.play();
        super.start(x, y, speed);
    }
}