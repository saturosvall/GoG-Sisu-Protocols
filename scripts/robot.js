
class Robot {
    constructor(game) {
        this.game = game;
        this.canvas = this.game.canvas;
        this.context = this.game.context;
        this.x = this.game.width * 0.09;
        this.y = this.game.height * 0.55;
        this.centerX = this.x;
        this.centerY = this.y;
        this.radius = 55;
        this.angle = 0;
        this.spriteWidth = 222;
        this.spriteHeight = 233;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frameX = 0;
        this.maxFrame = 75;
        this.bodyImage = document.getElementById('body');
        this.bodySprite = document.getElementById('bodySprite');
        this.eye1Image = document.getElementById('eye1');
        this.eye2Image = document.getElementById('eye2');

        // this.assignEye2(); eye2basic

        this.reflectionImage = document.getElementById('reflection');
        this.detectorLightImage = document.getElementById('detectorLight');
        this.eye1Radius = this.radius * 0.4;
        this.eye2Radius = this.radius * 0.6;
        this.eye1Distance = this.eye1Radius;
        this.eye2Distance = this.eye2Radius;
        this.robotBodyDescription = 'Robot Body';
        this.robotBodyObject = {
            x: this.x + 20,
            y: this.y - 40,
            radius: this.radius * 2.4 // to be double checked
        };
        // this.powerUp = false; //******* */
        // this.shieldColor = 'hsla(56, 89%, 54%, 0.571)';
        // this.shieldRadius = this.powerUp ? this.radius + 130 : this.radius - 10; // *******
        // this.shieldObject = {
        //     x: this.x,
        //     y: this.y - 30,
        //     radius: this.shieldRadius
        // };
        // this.shieldDescription = '';
        this.tracking = false;
        this.mouvementAngle = 0;
        // mouse is the trigger pointer for mouse or touch
        this.mouse = {
            x: 0,
            y: 0
        }

        // Event listener for screen touches for robot tracking eye
        this.canvas.addEventListener('touchmove', e => {
            // prevent default touch behavior like scrolling
            e.preventDefault();
            // retreave the touch coordinates relative to the canvas
            let touch = e.touches[0];
            let canvasRect = this.canvas.getBoundingClientRect(); // built in to get bounding client coordinates on designated rectanglle (canvas here)
            this.mouse.x = touch.clientX - canvasRect.left;
            this.mouse.y = touch.clientY - canvasRect.top;
            // console.log('touch');
            this.tracking = true;
        });

        this.canvas.addEventListener('touchend', e => {
            // console.log('no touch');
            this.tracking = false;
        });

        this.canvas.addEventListener('mousemove', e => {
            // console.log(this.angle);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.tracking = true;
        });
        // Handle what happen when mouse leave the canvas
        this.canvas.addEventListener('mouseleave', e => {
            this.tracking = false;
        });


    }
    // assignEye2() {
    //     const eye2basic = document.getElementById('eye2basic');
    //     const eye2hot = document.getElementById('eye2red');
    //     const eye2cold = document.getElementById('eye2blue');
    //     if (this.game.destroyed) {
    //         this.eye2Image = eye2hot;
    //     } else if (this.game.collected) {
    //         this.eye2Image = eye2cold;
    //     } else {
    //         this.eye2Image = eye2basic;
    //     }
    // }

    draw(context) {
        if (this.game.robotIsAlive) {
            // Drawing the shield for robot: moved first so it is visually starting from behind (to give impression it is coming from within the robot)
            // should start at this.shieldRadius
            // should be in condition shield is active and a range for radius (this.shieldRadius++ like in planet)


            // drawing the robot shield
            // context.save();
            // context.shadowOffsetX = 5;
            // context.shadowOffsetY = -1;
            // context.shadowColor = 'hsla(29, 89%, 44%, 0.671)';
            // context.beginPath();
            // context.arc(this.x, this.y - 30, this.shieldRadius, -1.24, Math.PI * 0.4);
            // // Setting the robot shield color : style (shieldColor) hardcoded untill result needed
            // context.strokeStyle = this.shieldColor;
            // context.lineWidth = 8;
            // context.stroke();
            // context.restore()



            // for debug mode: adding outer bow for Robot Shield border ** started from circle and hardcoded untill result needed
            // if (this.game.debug) {
            //     context.save();
            //     context.beginPath();
            //     context.arc(this.x + 5, this.y - 30, this.shieldRadius + 2, -1.24, Math.PI * 0.4);
            //     context.stroke();
            //     context.restore()
                
            //     // context.save();
            //     context.stroke();
            //     // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
            //     context.font = '28px Bangers';
            //     context.fillText(this.shieldDescription, this.x + this.shieldRadius + 15, this.y - 50);
            //     context.restore();
            // }


            // Body
            context.drawImage(this.bodySprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.spriteWidth * 0.5 + 40, this.y - this.spriteHeight * 0.5 - 34, this.spriteWidth, this.spriteHeight);

            // for debug mode: adding outer circle for Robot border 
            if (this.game.debug) {
                context.save();
                context.beginPath();
                context.arc(this.x + 22, this.y - 32, this.radius * 2.6, 0, Math.PI * 2);
                context.stroke();
                context.lineWidth = 3;
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '25px Bangers';
                context.fillText(this.robotBodyDescription, this.x + this.radius + 15, this.y - this.radius * 0.2);
                context.restore();
            }


            // Eye 1
            const eye1X = this.x + Math.cos(this.angle) * this.eye1Radius;
            const eye1Y = this.y + Math.sin(this.angle) * this.eye1Radius;
            context.drawImage(this.eye1Image, eye1X - this.eye1Image.width * 0.5, eye1Y - this.eye1Image.height * 0.5, this.eye1Image.width, this.eye1Image.height);
            //1 this.image,
            //2 this.x - this.image.width * 0.5 -18,
            //3 this.y - this.image.height * 0.5 - 190,
            //4 this.this.image.width * this.scale,
            //5 this.image.height * this.scale 

            // // for debug mode Eye1 border
            // context.beginPath();
            // context.arc(eye1X, eye1Y, this.radius * 0.6, 0, Math.PI * 2);
            // context.stroke();

            // Eye 2
            const eye2X = this.x + Math.cos(this.angle) * this.eye2Radius;
            const eye2Y = this.y + Math.sin(this.angle) * this.eye2Radius;
            context.drawImage(this.eye2Image, eye2X - this.eye2Image.width * 0.5, eye2Y - this.eye2Image.height * 0.5, this.eye2Image.width, this.eye2Image.height);
            //1 this.image,
            //2 this.x - this.image.width * 0.5,
            //3 this.y - this.image.height * 0.5,
            //4 this.image.width,
            //5 this.image.height; 

            // // for debug mode Eye 2 border
            // context.beginPath();
            // context.arc(eye2X, eye2Y, this.radius * 0.3, 0, Math.PI * 2);
            // context.stroke();

            // Reflection
            context.drawImage(this.reflectionImage, this.x - this.reflectionImage.width * 0.5, this.y - this.reflectionImage.height * 0.5, this.reflectionImage.width, this.reflectionImage.height);
            //1 this.image,
            //2 this.x - this.image.width * 0.5 -18,
            //3 this.y - this.image.height * 0.5 - 190,
            //4 this.this.image.width * this.scale,
            //5 this.image.height * this.scale 

            // // for debug mode: adding Reflection outer circle for border clarification
            // context.beginPath();
            // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // context.stroke();

            // Detector Light
            if (this.tracking) {
                context.drawImage(this.detectorLightImage, this.x - this.detectorLightImage.width * 0.5 + 1, this.y - this.detectorLightImage.height * 0.5 - 120, this.detectorLightImage.width, this.detectorLightImage.height);
            }
            // for debug mode Detector Light outer circle for border clarification
            if (this.game.debug) {
                context.save()
                context.beginPath();
                context.arc(this.x + 1, this.y - 120, (this.reflectionImage.width * 0.5) * 0.7, 0, Math.PI * 2);
                context.stroke();
                context.lineWidth = 3;
                // context.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
                context.font = '25px Bangers';
                this.tracking ? context.fillText('mouse or touch move detected', this.x + 10, this.y - 155) : context.fillText('no mouse or touch', this.x + 10, this.y - 155);
                context.restore();
            }
        }

    }
    update() {
        if (this.game.robotIsAlive) {
            // Angles
            const dx = this.mouse.x - this.x; // distance between first object x is this.mouse.x, instead of this.mouse.x could be most proximate enemy or special kind of enemy detected (this.enemy.y)
            const dy = this.mouse.y - this.y; // distance between first object y is this.mouse.y, instead of this.mouse.y could be most proximate enemy or special kind of enemy detected (this.enemy.y)

            // Calculating distance between two point
            const distance = Math.hypot(dx, dy);
            this.angle = Math.atan2(dy, dx); // to calculate the projected line (distance between the two points) between object 1 (starting point) and object 2 (end point)

            // To maintain the ratio when mouse is over the eye1
            if (distance <= this.eye1Distance * 2.5) {
                this.eye1Radius = distance * 0.4;
                this.eye2Radius = distance * 0.6;
            } else if (this.tracking) {
                // mouse still in canvas and not too close or over the eye
                this.eye1Radius = this.eye1Distance;
                this.eye2Radius = this.eye2Distance;
            } else {
                this.eye1Radius = this.eye1Distance * Math.cos(this.mouvementAngle);
                this.eye2Radius = this.eye2Distance * Math.cos(this.mouvementAngle);
            }

            // Animating the robot shield: Adjusting the range and toggle back shield to inactive
            // if (this.powerUp) {

            //     // Adjusting the range and toggle back shield to inactive
            //     // this.shieldRadius +=5
            // }

            // Sprite animation
            if (!this.game.pause) {
                this.frameX >= this.maxFrame ? this.frameX = 0 : this.frameX++;

                // Mouvement
                this.mouvementAngle += 0.005; // less is more and slower
                // combining cos and sin for circular mouvement
                this.x = this.centerX + Math.cos(this.mouvementAngle) * 50; // *50 to increase left & right range
                this.y = this.centerY + Math.sin(this.mouvementAngle) * 50; // *50 to increase the range up & down
                // console.log(this.mouvementAngle);
                if (this.mouvementAngle > Math.PI * 2) {
                    // console.log('RESET');
                    this.mouvementAngle = 0;
                }
            }
        }
    }
}

// if patrolling : nothing -> same inner eye color
// if threats: inner eye color yellow/fire yellow
// if destroying : red
// if collecting : blue