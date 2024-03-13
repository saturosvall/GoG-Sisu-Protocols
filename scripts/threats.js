class Threats {
    constructor(game) {
        this.game = game;
        this.speed = Math.random() * 0.3 + 0.5; // speed between 0.5 and 0.8
        this.free = true;
        this.lives;
        this.score;
        this.lifeReset;
    }
    draw(context) {
        // initiated empty to be implemented by subclasses
    }
    update() {
        // Common logic for all subclasses
        if (!this.free) {
            this.x -= this.speed; // to move to the right on the horizontal x axis
        }
    }
    highThreatVsPlanetCollisionResult() {
        this.game.planet.borderColor = 'hsla(12, 75%, 45%, 0.315)';
        this.game.planet.sphereColor = 'hsla(12, 80%, 53%, 0.185)';
        this.reset();
        const explosion = this.game.getExplosion();
        if (explosion) {
            if (this.category === 'rectangle') {
                explosion.start(this.x + this.width * 0.5, this.y + this.height * 0.5, -this.speed);
            } else explosion.start(this.x, this.y, -this.speed);
        }
        this.game.robotLives = 0;
        this.game.gameOver = true;
    }
    lowThreatVsPlanetCollisionResult() {
        this.reset();
        // if a threat crash on the planet score -= threat.scoreReduction
        if (!this.game.gameOver) {
            this.game.score -= (this.scoreRecduction);
            this.game.floatingstringsArray.push(new FloatingStrings(`-${this.scoreRecduction}`, this.x, this.y, 100, 40));
        }
        const explosion = this.game.getExplosion();
        if (explosion) explosion.start(this.x, this.y, -this.speed);
    }
    threatVsRobotCollisionResult() {
        this.reset();
        // if a threat crash on the robot score -= this.scoreReduction
        if (!this.game.gameOver) {
            this.game.score -= (this.scoreRecduction);
            this.game.floatingstringsArray.push(new FloatingStrings(`-${this.scoreRecduction}`, this.x, this.y, 100, 40));
            this.game.robotLives--;
            this.game.floatingstringsArray.push(new FloatingStrings(`       & -1 life`, this.x, this.y, 100, 40));
            if (this.game.robotLives <= 0) this.game.gameOver = true;
        }
        const explosion = this.game.getExplosion();
        if (explosion) {
            if (this.category === 'rectangle') {
                explosion.start(this.x + this.width * 0.5, this.y + this.height * 0.5, -this.speed);
            } else explosion.start(this.x, this.y, -this.speed);
        }
    }
    reset() {
        this.free = true;
    }
    start() {
        this.free = false;
        this.lives = this.lifeReset;
        this.x = this.game.width + (this.spriteWidth * 0.5); // initialize position off screen
        this.y = Math.random() * (this.game.height * 0.97 - (this.spriteHeight * 0.9)); // random psition within canvas height
    }
}

class Asteroid extends Threats {
    constructor(game) {
        super(game);
        this.image = document.getElementById('asteroid');
        this.spriteWidth = 150;
        this.spriteHeight = 155;
        this.radius = 75;
        this.speed = Math.random() * 2.5 + 0.7;// 5.5 + 2; // random speed from 2 to 7 fps
        this.angle = 0;
        this.va = Math.random() * 0.02 - 0.01;
        this.lives = 2;
        this.lifeReset = this.lives;
        this.score = this.lives;
        this.scoreRecduction = 4;
        this.type = 'Asteroid';
        this.category = 'circle';
        this.hitSound = document.getElementById('asteroidHit');
        this.asteroidDescription = `${this.lives}Hits/+${this.lives}Y/High threat`;
    }
    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }
    // Method to draw the asteroid
    draw(context) {
        super.draw(context);
        // Only draw if free space (object is out from the pool/active)
        if (!this.free) {
            context.save();
            // the white circle asteroid border and description for debug
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.font = '25px Bangers';
                context.fillText(this.asteroidDescription, this.x - this.radius, this.y - this.radius);
            }
            // The asteroid 
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, -this.spriteWidth * 0.5, -this.spriteHeight * 0.5, this.spriteWidth, this.spriteHeight);
            context.restore();
            // Drawing the lives left over the sprite image in debug
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '50px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        // update rotation angle
        if (!this.free) {
            this.angle += this.va;
            // this.x -= this.speed; // to move to the right on the horizontal x axis change to -= to move from left
            if (this.game.checkCircleCollision(this, this.game.planet)) {
                this.highThreatVsPlanetCollisionResult();
            } else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}


class BabyAsteroid extends Threats {
    constructor(game) {
        super(game);
        this.spriteImage = document.getElementById('babyAsteroid');
        this.spriteWidth = 89;
        this.spriteHeight = 88;
        this.frameY = Math.floor(Math.random() * 4);
        this.radius = 45;
        this.speed = Math.random() * 4.1 + 2.6;// 5.5 + 2; // random speed from 2.6 to 7 fps
        this.angle = 0;
        this.va = Math.random() * 0.03 - 0.01;
        this.lives = 1;
        this.lifeReset = this.lives;
        this.score = this.lives;
        this.scoreRecduction = this.score * 2;
        this.type = 'BabyAsteroid';
        this.category = 'circle';
        this.babyAsteroidDescription = `${this.lives}Hits/+${this.lives}Y/-2Y`;
    }

    // Method to draw the babyAsteroid
    draw(context) {
        super.draw(context);
        // Only draw if free space (object is out from the pool/active)
        if (!this.free) {
            context.save();
            // the white circle babyAsteroid border and description for debug
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '25px Bangers';
                context.fillText(this.babyAsteroidDescription, this.x - this.radius, this.y - this.radius);
            }
            // The babyAsteroid 
            context.translate(this.x, this.y);
            context.rotate(this.angle);

            context.drawImage(this.spriteImage, 0, this.frameY, this.spriteWidth, this.spriteHeight, -this.spriteWidth * 0.5, -this.spriteWidth * 0.5, this.spriteWidth, this.spriteHeight);
            context.restore();
            // Drawing the lives left over the sprite image in debug
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '50px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        // update rotation angle
        if (!this.free) {
            this.angle += this.va;
            // this.x -= this.speed; // to move to the right on the horizontal x axis change to -= to move from left

            if (this.game.checkCircleCollision(this, this.game.planet)) {
                this.lowThreatVsPlanetCollisionResult();
            }
            else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}

class Alien extends Threats {
    constructor(game) {
        super(game);
        this.alienSprite = document.getElementById('aliens');
        this.spriteWidth = 70;
        this.spriteHeight = 70;
        this.radius = 32;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
        this.maxFrame = 12;
        this.speed = Math.random() * 4.1 + 0.4; // random speed from 0.2 to 4.7 fps
        this.lives = 1;
        this.lifeReset = this.lives;
        this.score = this.lives * 5;
        this.scoreRecduction = this.score * 2;
        this.type = 'collectible';
        this.category = 'circle';
        this.alienDescription = `${this.lives}Hits/±5Y/Collectible`; // Text for debug mode
        this.mouvementAngle = 0; // initiating the mouvemebt angle for alien
    }
    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            context.save();
            // the white circle, alien border and description for debug mode
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                // Adding the text fill method
                context.font = '25px Bangers';
                context.fillText(this.alienDescription, this.x - this.radius * 2, this.y - this.radius);
            };
            // the alien figurine
            context.drawImage(this.alienSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - (this.spriteWidth * 0.5 - 6), this.y - (this.spriteWidth * 0.5 - 12), this.spriteWidth * 0.8, this.spriteHeight * 0.8);
            context.restore();
            // Drawing the lives left over the sprite image in debug mode
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '30px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            // Applying a mouvement animation
            this.mouvementAngle += 0.1; // how fast up & down
            this.y = this.y + Math.sin(this.mouvementAngle) * 4; // how much up & down
            // update rotation angle
            // Sprite animation
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            // this.x -= this.speed; // += to move to the right on the horizontal x axis change to -= to move from left
            if (this.game.checkCircleCollision(this, this.game.planet)) {
                this.lowThreatVsPlanetCollisionResult();
            }
            else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}

class SpaceOrk extends Threats {
    constructor(game) {
        super(game);
        this.orkSprite = document.getElementById('spaceOrk');
        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.radius = 65;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
        this.maxFrame = 58;
        this.speed = Math.random() * 3.5 + 0.5;// 6.5 + 2; // random speed from 0.5 to 4 fps
        this.lives = 5;
        this.lifeReset = this.lives;
        this.score = this.lives;
        this.scoreRecduction = this.score - 1;
        this.type = 'SpaceOrk'; // Helper variable 
        this.category = 'circle';
        this.hitSound = document.getElementById('orkHit')
        this.orkDescription = `${this.lives}Hits/+5Y/High Threat`;

    }
    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }
    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            context.save();

            // the white circle monster border and description for debug
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '25px Bangers';
                context.fillText(this.orkDescription, this.x - this.radius, this.y - this.radius);
            }
            // The space ork animated sprite sheet (9 arguments)
            context.drawImage(this.orkSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - (this.spriteWidth * 0.5 - this.radius + 25), this.y - (this.spriteHeight * 0.5 - this.radius + 25), this.spriteWidth * 0.7, this.spriteHeight * 0.7);
            context.restore();
            // Drawing the lives left over the sprite image in debug mode
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '40px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            // Sprite animation for spaceOrk
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            if (!this.free) {
                if (this.x > this.game.width) this.x -= 5; // to push into the scene (effect)
                // this.x -= this.speed;
                if (this.game.checkCircleCollision(this, this.game.planet)) {
                    this.highThreatVsPlanetCollisionResult();
                }
                else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                    this.threatVsRobotCollisionResult();
                }
            }
        }
    }
    // start() {
    //     super.start();
    //     this.lives = 5; // reseting spaceOrk lives
    // }
}

class AstroMechaBat extends Threats {
    constructor(game) {
        super(game);
        this.astroMechaBatSprite = document.getElementById('astroMechaBat');
        this.spriteWidth = 95;
        this.spriteHeight = 94;
        this.radius = 42;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 10;
        this.speed = Math.random() * 3.5 + 0.6; // random speed from 0.4 to 3.9 fps
        this.lives = 5;
        this.lifeReset = this.lives;
        this.score = this.lives * 3;
        this.scoreRecduction = this.score;
        this.type = 'collectible';
        this.category = 'circle';
        this.hitSound = document.getElementById('astroMechaBatHitSound');
        this.astroMechaBatDescription = `${this.lives}Hits/±15Y/Collectible`; // Text for debug mode
        this.mouvementAngle = 0; // initiating the mouvemebt angle for AstroMechaBat
    }
    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }
    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            context.save();
            // the white circle, AstroMechaBat border and description for debug mode
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                // Adding the text fill method
                context.font = '25px Bangers';
                context.fillText(this.astroMechaBatDescription, this.x - this.radius * 2, this.y - this.radius);
            };
            // the AstroMechaBat figurine
            context.drawImage(this.astroMechaBatSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - (this.spriteWidth * 0.5), this.y - (this.spriteWidth * 0.5), this.spriteWidth, this.spriteHeight);
            context.restore();
            // Drawing the lives left over the sprite image in debug mode
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '30px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            // Applying a mouvement animation
            this.mouvementAngle += 0.2; // how fast up & down
            this.y = this.y + Math.sin(this.mouvementAngle) * 4; // how much up & down
            // update rotation angle
            // Sprite animation
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }

            if (this.game.checkCircleCollision(this, this.game.planet)) {
                this.lowThreatVsPlanetCollisionResult();
            }
            else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}


class SpaceHornet extends Threats {
    constructor(game) {
        super(game);
        this.spaceHornetSprite = document.getElementById('spaceHornet');
        this.spriteWidth = 96.8;
        this.spriteHeight = 100;
        this.radius = 45;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 12;
        this.speed = Math.random() * 3.5 + 0.7; // random speed from 0.7 to 5.2 fps
        this.lives = 3;
        this.lifeReset = this.lives;
        this.score = 10;
        this.scoreRecduction = this.score;
        this.type = 'collectible';
        this.category = 'circle';
        this.hitSound = document.getElementById('spaceHornetHitSound');
        this.spaceHornetDescription = `${this.lives}Hits/±10Y/Collectible`; // Text for debug mode
        this.mouvementAngle = 0; // initiating the mouvemebt angle for spaceHornet
    }
    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }
    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            context.save();
            // the white circle, spaceHornet border and description for debug mode
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
                // Adding the text fill method
                context.font = '25px Bangers';
                context.fillText(this.spaceHornetDescription, this.x - this.radius * 2, this.y - this.radius);
            };
            // the spaceHornet figurine
            context.drawImage(this.spaceHornetSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - (this.spriteWidth * 0.5), this.y - (this.spriteWidth * 0.5), this.spriteWidth, this.spriteHeight);
            context.restore();
            // Drawing the lives left over the sprite image in debug mode
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '30px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x, this.y);
                context.restore();
            }
        }
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            // Applying a mouvement animation
            this.mouvementAngle += 0.2; // how fast up & down
            this.y = this.y + Math.sin(this.mouvementAngle) * 4.5; // how much up & down
            // update rotation angle
            // Sprite animation
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }

            if (this.game.checkCircleCollision(this, this.game.planet)) {
                this.lowThreatVsPlanetCollisionResult();
            }
            else if (this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}

class MechaPiraijat extends Threats {
    constructor(game) {
        super(game);
        this.spriteImage = document.getElementById('mechaPiraijat');
        this.spriteWidth = 213;
        this.spriteHeight = 165;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.y = Math.random() * (this.game.height * 0.95 - this.spriteHeight);
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 2);
        this.maxFrame = 38;
        this.speed = Math.random() * 2.4 + 0.6; // random speed from 0.6 to 3 fps
        this.lives = 6;
        this.lifeReset = this.lives;
        this.score = this.lives * 1.5;
        this.scoreRecduction = this.score;
        this.type = 'mechaPiraijat';
        this.category = 'rectangle';
        this.hitSound = document.getElementById('piraajaHitSound');
        this.mechaPiraajaDescription = `${this.lives}Hits/+${this.score}Y/High Threat`;
    }

    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }

    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            if (this.game.debug) context.strokeRect(this.x + 10, this.y + 10, (this.spriteWidth * 0.8) - 20, (this.spriteHeight * 0.8) - 20);
            // drawing the sprite after the debug rectangle
            context.drawImage(this.spriteImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * 0.8, this.spriteHeight * 0.8);
            // Adding the text descrption method
            if (this.game.debug) {
                context.font = '25px Bangers';
                context.fillText(this.mechaPiraajaDescription, this.x, this.y);
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '50px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
                context.restore();
            }
        };
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            if (this.game.checkCircleRectangleCollision(this.game.planet, this)) {
                this.highThreatVsPlanetCollisionResult();
            }
            else if (this.game.checkCircleRectangleCollision(this.game.robotBody, this)) {
                this.threatVsRobotCollisionResult();
            }
        }
    }
}

class MechaHives extends Threats {
    constructor(game) {
        super(game);
        this.spriteImage = document.getElementById('MechaHives');
        this.spriteWidth = 400;
        this.spriteHeight = 227;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.y = Math.random() * (this.game.height * 0.95 - this.spriteHeight);
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 38;
        this.speed = Math.random() * 1.2 + 0.2; // random speed from 0.6 to 3 fps
        this.lives = 12;
        this.lifeReset = this.lives;
        this.score = this.lives * 1.5;
        this.scoreRecduction = this.score;
        this.type = 'MechaHives';
        this.category = 'rectangle';
        this.entrenceSound = document.getElementById('mechaHiveEntrenceSound');
        this.hitSound = document.getElementById('mechaHiveHitSound');
        this.mechaHivesDescription = `${this.lives}Hits/+${this.score}Y/Very High Threat`;
    }

    entrancePlay() {
        this.entrenceSound.currentTime = 0;
        this.entrenceSound.play(); // a built in function for html audio
    }
    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }

    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            if (this.game.debug) context.strokeRect(this.x + 10, this.y + 10, (this.spriteWidth) - 20, (this.spriteHeight) - 20);
            // drawing the sprite after the debug rectangle
            context.drawImage(this.spriteImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
            // Adding the text descrption method
            if (this.game.debug) {
                context.font = '25px Bangers';
                context.fillText(this.mechaHivesDescription, this.x, this.y);
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '50px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
                context.restore();
            }
        };
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            if (!this.free) {
                // making and entrence sound effect when appearing 
                if (this.x >= this.game.width) {
                    this.entrancePlay();
                }
            }
            if (this.game.checkCircleRectangleCollision(this.game.planet, this) || this.game.checkCircleRectangleCollision(this.game.robotBody, this)) {
                this.highThreatVsPlanetCollisionResult();
            }
        }
    }
}

class MechaPikeYounglings extends Threats {
    constructor(game, x, y) {
        super(game);
        this.spriteImage = document.getElementById('mechaPikeYounglings');
        this.spriteWidth = 115;
        this.spriteHeight = 95;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 2);
        this.maxFrame = 38;
        this.speed = Math.random() * 5.2 + 2.1; // random speed from 0.6 to 3 fps
        this.lives = 2;
        this.lifeReset = this.lives;
        this.score = this.lives;
        this.scoreRecduction = this.score * 5;
        this.type = 'mechaPikeYounglings';
        this.category = 'rectangle';
        this.hitSound = document.getElementById('mechaPikeYounglingsHitSound');
        this.mechaPikeYounglingsDescription = `${this.score}Hits/+${this.score}Y/High Threat`;
    }

    play() {
        this.hitSound.currentTime = 0;
        this.hitSound.play(); // a built in function for html audio
    }

    // Method to draw the object
    draw(context) {
        super.draw(context);
        // Only draw if free space
        if (!this.free) {
            if (this.game.debug) context.strokeRect(this.x + 10, this.y + 10, (this.spriteWidth * 0.9) - 20, (this.spriteHeight * 0.9) - 20);
            // drawing the sprite after the debug rectangle
            context.drawImage(this.spriteImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * 0.9, this.spriteHeight * 0.9);
            // Adding the text descrption method
            if (this.game.debug) {
                context.font = '25px Bangers';
                context.fillText(this.mechaPikeYounglingsDescription, this.x, this.y);
                context.save();
                context.beginPath();
                context.stroke();
                context.font = '50px Bangers';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
                context.restore();
            }
        };
    }
    // Method to update the object
    update() {
        super.update();
        if (!this.free) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            if (this.game.checkCircleRectangleCollision(this.game.planet, this) || this.game.checkCircleCollision(this, this.game.robotBody)) {
                this.lowThreatVsPlanetCollisionResult();
            }
        }
    }
    // method to start
    start() {
        this.free = false;
    }
}
