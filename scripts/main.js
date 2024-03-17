class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.floatingstringsArray = [];
        this.background = new Background(this);
        this.planet = new Planet(this); // Creating an instence of planet
        this.layer = new Layer(this);
        this.robot = new Robot(this); // Creating an instence of player
        this.robotBody = this.robot.robotBodyObject;
        // this.robotShield = this.robot.shieldObject;

        this.gameOver = false;
        this.robotIsAlive = !this.gameOver ? true : false;  // later to activate animation explosion
        this.ui = new UI(this);
        this.score = 0;

        this.explosion1 = document.getElementById('explosion1');
        this.explosion2 = document.getElementById('explosion2');
        this.explosion3 = document.getElementById('explosion3');
        this.explosion4 = document.getElementById('explosion4');
        this.explosion5 = document.getElementById('explosion5');
        this.explosion6 = document.getElementById('explosion6');
        this.explosionSounds = [this.explosion1, this.explosion2, this.explosion3, this.explosion4, this.explosion5, this.explosion6];

        this.disappearSound = document.getElementById('disappear1');

        this.explosionPool = [];
        this.maxExplosions = 30;
        this.createExplosions();

        this.disappearancePool = [];
        this.maxDisappearance = 30;
        this.createDisappearances();

        this.smokeExplosionPool = [];
        this.maxSmokeExplosion = 30;
        this.createSmokeExplosions();

        this.threatPool = [];

        this.debug = false;
        this.pause = true;
        this.help = false;
        this.collect = true;
        this.isFullScreen = false;

        this.mouse = {
            x: 0,
            y: 0,
            radius: 2
        };


        this.initializeButtonListeners();
        this.initializeKeyboardControls();

        // window.addEventListener('touchend', e => {
        //     // touch controls logic identic to click event
        //     this.handleGameEventRelatedToCollision(e);
        // });

        window.addEventListener('click', e => {
            this.handleGameEventRelatedToCollision(e);
        });
    }

    // Initializing and adding eventListeners for buttons
    initializeButtonListeners() {
        // Buttons event listeners
        this.resetButton = document.getElementById('resetButton');
        this.pauseButton = document.getElementById('pauseButton');
        this.actionButton = document.getElementById('actionButton');
        this.fullScreenButton = document.getElementById('fullScreenButton');
        this.helpButton = document.getElementById('helpButton');

        // Adding event listeners for clicks using ES6 arrow function
        this.resetButton.addEventListener('click', () => this.startRestartGame());
        this.pauseButton.addEventListener('click', () => this.togglePause());
        this.actionButton.addEventListener('click', () => this.toggleAction());
        this.fullScreenButton.addEventListener('click', () => this.toggleFullScreen());
        this.helpButton.addEventListener('click', () => this.toggleHelp());

        // // Adding event listeners for touchend
        // this.resetButton.addEventListener('touchend', () => this.startRestartGame());
        // this.pauseButton.addEventListener('touchend', () => this.togglePause());
        // this.actionButton.addEventListener('touchend', () => this.toggleAction());
        // this.fullScreenButton.addEventListener('touchend', () => this.toggleFullScreen());
        // this.helpButton.addEventListener('touchend', () => this.toggleHelp());
    }

    // Initializing Keyboard controls event listener for keydown
    initializeKeyboardControls() {
        // Keyboard controls
        window.addEventListener('keyup', e => {
            if (e.key.toLowerCase() === 'd') this.toggleDebug();
            else if (e.key.toLowerCase() === 'p') this.togglePause();
            else if (e.key.toLowerCase() === 'r') this.startRestartGame();
            else if (e.key.toLowerCase() === 'h') this.toggleHelp();
            else if (e.key.toLowerCase() === 'f') this.toggleFullScreen();
            else if (e.key.toLowerCase() === 'a') this.toggleAction();
        });
    }

    toggleAction() {
        // toggle Action
        this.collect = !this.collect;
        // toggle background image for button
        this.actionButton.style.backgroundImage = !this.collect ? 'url(./assets/img/icons/action-destroy-pngwing-80px1.png)' : 'url(./assets/img/icons/action-collect-pngwing1-70.png)';
    }

    toggleFullScreen() {
        // toggle fullscreen
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.fullScreenButton.style.backgroundImage = 'url(./assets/img/icons/buttonExitFullScreen1.png)';
            // this.width = this.canvas.width;
            // this.height = window.innerHeight;
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            this.fullScreenButton.style.backgroundImage = 'url(./assets/img/icons/buttonFullScreen1.png)';
        }
    }

    toggleHelp() {
        // toggle help menu
        this.help = !this.help;
    }

    toggleDebug() {
        // method to toggle debug mode
        this.debug = !this.debug;
    }

    togglePause() {
        // method to togglee pause/resume
        this.pause = !this.pause;
    }

    startRestartGame() {
        // initiated empty to be implemented by subclasses
    }

    createThreatPool() {
        // initiated but empty to be implemented by subclassesy
    }

    getThreat() {
        for (let i = 0; i < this.threatPool.length; i++) {
            if (this.threatPool[i].free) return this.threatPool[i];
        }
    }

    handleThreats(deltaTime) {
        if (!this.gameOver) {
            if (this.threatTimer < this.threatInterval) {
                this.threatTimer += deltaTime;
            } else {
                this.threatTimer = 0;
                const threat = this.getThreat();
                if (threat) threat.start();
            }
        }
    }
    getMechaYoungling() {
        for (let i = 0; i < this.threatPool.length; i++) {
            if (this.threatPool[i].free && this.threatPool[i] instanceof MechaPikeYounglings) return this.threatPool[i];
        }
    }

    createExplosions() {
        // fill the explosion pool
        for (let i = 0; i < this.maxExplosions; i++) {
            this.explosionPool.push(new Explosion(this));
        }
    }

    createDisappearances() {
        // fill the disappearance pool
        for (let i = 0; i < this.maxDisappearance; i++) {
            this.disappearancePool.push(new DisappearanceExplosion(this));
        }
    }

    createSmokeExplosions() {
        // fill the smoke explosion pool
        for (let i = 0; i < this.maxSmokeExplosion; i++) {
            this.smokeExplosionPool.push(new SmokeExplosion(this));
        }
    }

    getExplosion() {
        for (let i = 0; i < this.explosionPool.length; i++) {
            if (this.explosionPool[i].free) {
                return this.explosionPool[i];
            }
        }
    }

    getDisappearance() {
        for (let i = 0; i < this.disappearancePool.length; i++) {
            if (this.disappearancePool[i].free) {
                return this.disappearancePool[i];
            }
        }
    }

    getSmokeExplosion() {
        for (let i = 0; i < this.smokeExplosionPool.length; i++) {
            if (this.smokeExplosionPool[i].free) {
                return this.smokeExplosionPool[i];
            }
        }
    }

    // Method to check collision between circles (mouse pointer and enemy two circle objects a and b)
    checkCircleCollision(a, b) {
        const sumOfRadii = a.radius + b.radius;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        return distance < sumOfRadii; // will return true if objects are overlapping else false
    }

    // Method to check for collision between rectangle and a circle
    checkCircleRectangleCollision(circle, rectangle) {
        let closestX = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
        let closestY = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));
        // Calculate the distance between the circle's center and this closest point
        let distanceX = circle.x - closestX;
        let distanceY = circle.y - closestY;
        // If distance is less than the circle's radius there is a collision
        let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        return distanceSquared < (circle.radius * circle.radius);
    }

    handleGameEventRelatedToCollision(e) {
        // Add explosions at a click coordinates with the default mouse click (left)
        this.mouse.x = e.offsetX; // since canvas isn't full screen we need to use offsetX and offsetY
        this.mouse.y = e.offsetY;
        // console.log(`mouseX ${this.mouse.x} and mouseY ${this.mouse.y}`);
        if (!this.gameOver && !this.pause) {
            // Cycle through threatPool array
            this.threatPool.forEach(threat => {
                this.handleThreatCollision(threat);
            })
        }
    }

    handleThreatCollision(threat) {
        // collision between mouse circle and threats
        // if threat is active & collide with mouse and not pause
        if (threat.category === 'circle') {
            if (!threat.free && this.checkCircleCollision(threat, this.mouse) && !this.collect) {
                if (threat.lives > 0) {
                    if (threat.play) {
                        threat.play();
                    }
                    threat.lives--;
                }
                if (threat.lives <= 0) {
                    // Helper temporary variable explosion
                    let explosion;
                    // Assign specific explosion to each threat type
                    if (threat.type === 'SpaceOrk') {
                        explosion = this.getSmokeExplosion();
                    } else {
                        explosion = this.getExplosion();
                    }
                    // start explosion if available
                    // setting explosion coordinates to asteroid and motion to a fraction 0.4 of threat speed
                    if (explosion) explosion.start(threat.x, threat.y, threat.speed * 0.4);
                    // remove the threat
                    threat.reset();
                    if (this.score < this.winningScore && threat.type === 'collectible') {
                        this.score -= threat.scoreRecduction; // deduct score for destroying an alien (special score)
                        // *** floatingStrings ***
                        this.floatingstringsArray.push(new FloatingStrings(`-${threat.scoreRecduction}`, threat.x, threat.y, 100, 40));
                    }
                    else if (this.score < this.winningScore) {
                        this.score += threat.score; // Add score for destroying a threat (could be special score)
                        // *** floatingStrings ***
                        this.floatingstringsArray.push(new FloatingStrings(`+${threat.score}`, threat.x, threat.y, 100, 40));
                    }
                }
            }
            else if (!threat.free && this.checkCircleCollision(threat, this.mouse) && !this.pause && this.collect && threat.type === 'collectible') {
                if (threat.lives > 0) {
                    if (threat.play) {
                        threat.play();
                    }
                    threat.lives--;
                }
                if (threat.lives <= 0) {
                    // Helper temporary variable explosion
                    let explosion;
                    explosion = this.getDisappearance();
                    // start explosion if available
                    // setting explosion coordinates to asteroid and motion to a fraction 0.4 of threat speed
                    if (explosion) explosion.start(threat.x, threat.y, threat.speed * 0.4);
                    // remove the threat
                    threat.reset();
                    if (this.score < this.winningScore) {
                        this.score += threat.score; // Add score for collecting an alien (special score)
                        // *** floatingStrings ***
                        this.floatingstringsArray.push(new FloatingStrings(`+${threat.score}`, threat.x, threat.y, 100, 40));
                    }
                }
            }
        }
        else if (threat.category === 'rectangle') {
            // Where to handle new threats checkCircleRectangleCollision(circle, rectangle)
            if (!threat.free && this.checkCircleRectangleCollision(this.mouse, threat) && !this.collect) {
                if (threat.lives > 0) {
                    if (threat.play) {
                        threat.play();
                    }
                    threat.lives--;
                }
                if (threat.lives <= 0) {
                    let explosion;
                    explosion = this.getExplosion();
                    // setting explosion coordinates to asteroid and motion to a fraction 0.4 of threat speed
                    if (explosion) explosion.start(threat.x + threat.width * 0.5, threat.y + threat.height * 0.5, -threat.speed * 0.4);
                    // remove the threat
                    threat.reset();
                    // if destroying a hivewhale
                    if (threat.type === 'MechaHives') {
                        // Enter the MechaPikeYounglings
                        for (let i = 0; i < 5; i++) {
                            const newMechaYoungling = new MechaPikeYounglings(this, threat.x + Math.random() * threat.width, threat.y + Math.random() * threat.height * 0.5)
                            newMechaYoungling.start();
                            this.threatPool.push(newMechaYoungling);
                            // console.log(this.threatPool);
                        }
                    }
                    if (this.score < this.winningScore) {
                        this.score += threat.score; // Add score for destroying a threat (could be special score)
                        // *** floatingStrings ***
                        this.floatingstringsArray.push(new FloatingStrings(`+${threat.score}`, threat.x + threat.width * 0.5, threat.y + threat.height * 0.5, 100, 40));
                    }
                }
            }
        }
    }

    startRestartGame() {
        this.initLevelValues();
        this.resetGameProperties();
    }

    resetGameProperties() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.gameOver = false;
        this.planet.radius = 380;
        this.planet.borderColor = 'hsla(175, 100%, 75%, 0.356)';
        this.planet.sphereColor = 'hsla(157, 100%, 75%, 0.11)';
        this.debug = false;
        this.pause = true;
        this.score = 0;
        this.floatingstringsArray = [];
        this.explosionPool = [];
        this.maxExplosions = 30;
        this.disappearancePool = [];
        this.maxDisappearance = 30;
        this.smokeExplosionPool = [];
        this.maxSmokeExplosion = 30;
        this.createExplosions();
        this.createDisappearances();
        this.createSmokeExplosions()
        this.threatPool = [];
        this.createThreatPool();
    }

    start() {
        // Logic common to all levels
        this.render(this.context, 0); // Start rendering the level
    }

    render(context, deltaTime) {
        // Method to render the game level
        this.background.update();
        this.background.draw(context);
        // Drawing the planet
        this.planet.draw(context);
        this.robot.update();
        this.robot.draw(context);

        // condition so it won't bulk appear after pause
        if (!this.pause) this.handleThreats(deltaTime);


        this.threatPool.forEach(threat => {
            threat.draw(context);
            // condition for updating the element
            if (!this.pause) threat.update(deltaTime);
        });

        // draw and update the mechaYounglings
        const mechaYoungling = this.getMechaYoungling();
        // this.handleMechaYoungling(mechaYoungling);
        if (mechaYoungling) {
            mechaYoungling.draw(context);
            // condition for updating the element
            if (!this.pause) mechaYoungling.update(deltaTime);
        }

        // Filter the floatingSringsArray and remove all active messages
        this.floatingstringsArray = this.floatingstringsArray.filter(msg => !msg.free);

        // for handeling floatingStrings
        this.floatingstringsArray.forEach(msg => {
            msg.draw(context);
            // condition for updating the element
            if (!this.pause) msg.update();
        });

        this.explosionPool.forEach(explosion => {
            explosion.draw(context);
            // condition for updating the element
            if (!this.pause) explosion.update(deltaTime);
        });
        this.disappearancePool.forEach(disappearance => {
            disappearance.draw(context);
            // condition for updating the element
            if (!this.pause) disappearance.update(deltaTime);
        });
        this.smokeExplosionPool.forEach(smokeExplosion => {
            smokeExplosion.draw(context);
            // condition for updating the element
            if (!this.pause) smokeExplosion.update(deltaTime);
        });
        // Conditions for gameTime update 
        if (!this.gameOver && !this.pause) this.gameTime += deltaTime;

        // Condition for winning and losing
        if (this.score >= this.winningScore) {
            // Planet border expands
            // made change in planet shield with effect vibration (actiated like electrifying)
            this.planet.radius < 1000 ? this.planet.radius += 2.5 : this.planet.radius = 995;
            this.gameOver = true;
        } else if (this.gameTime > this.timeLimit) {
            this.planet.borderColor = 'hsla(12, 75%, 45%, 0.315)';  // if game over changes in the planet border color
            this.planet.sphereColor = 'hsla(12, 80%, 53%, 0.185)';
            this.gameOver = true;
        }

        // Drawing the layer
        this.layer.update();
        this.layer.draw(context);
        // Drawing the UI
        this.ui.draw(context, this.score, this.gameTime, this.gameOver, this.winningScore, this.width, this.height);
    }
}

class Level1 extends Game {
    constructor(game) {
        super(game);
        this.initLevelValues();
        this.createThreatPool();
    }

    initLevelValues() {
        // initializing level specific value
        this.background.image = document.getElementById('level1Background');
        this.planet.image = document.getElementById('level1Planet');
        this.layer.image = document.getElementById('layer1');
        this.ui.pauseImage = document.getElementById('level1PauseMenu');
        this.winningScore = 30;
        this.gameTime = 0;
        this.timeLimit = 30000;
        this.robotLives = 1;
        this.maxThreats = 30;
        this.threatTimer = 0;
        this.threatInterval = 1000;
    }

    createThreatPool() {
        // creating the Level collection of threats
        for (let i = 0; i < this.maxThreats; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.3) {
                this.threatPool.push(new Asteroid(this));
            } else if (randomNumber < 0.6) {
                this.threatPool.push(new Alien(this));
            } else {
                this.threatPool.push(new BabyAsteroid(this));
            }
        }
    }
}

class Level2 extends Game {
    constructor(game) {
        super(game);
        this.initLevelValues();
        this.createThreatPool();
    }

    initLevelValues() {
        // initializing level specific value
        this.background.image = document.getElementById('level2Background');
        this.planet.image = document.getElementById('level2Planet');
        this.layer.image = document.getElementById('layer2');
        this.ui.pauseImage = document.getElementById('level2PauseMenu');
        this.winningScore = 50;
        this.gameTime = 0;
        this.timeLimit = 40000;
        this.robotLives = 2;
        this.maxThreats = 40;
        this.threatTimer = 0;
        this.threatInterval = 1000;
    }

    createThreatPool() {
        // creating the Level collection of threats
        for (let i = 0; i < this.maxThreats; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.25) {
                this.threatPool.push(new Asteroid(this));
            } else if (randomNumber < 0.5) {
                this.threatPool.push(new Alien(this));
            } else if (randomNumber < 0.75) {
                this.threatPool.push(new BabyAsteroid(this));
            } else {
                this.threatPool.push(new SpaceOrk(this));
            }
        }
    }
}

class Level3 extends Game {
    constructor(game) {
        super(game);
        this.initLevelValues();
        this.createThreatPool();
    }

    initLevelValues() {
        // initializing level specific value
        this.background.image = document.getElementById('level3Background');
        this.planet.image = document.getElementById('level3Planet');
        this.layer.image = document.getElementById('layer1');
        this.ui.pauseImage = document.getElementById('level3PauseMenu');
        this.winningScore = 100;
        this.gameTime = 0;
        this.timeLimit = 60000;
        this.robotLives = 3;
        this.maxThreats = 40;
        this.threatTimer = 0;
        this.threatInterval = 1000;
    }

    createThreatPool() {
        // creating the Level collection of threats
        for (let i = 0; i < this.maxThreats; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.25) {
                this.threatPool.push(new Asteroid(this));
            } else if (randomNumber < 0.5) {
                this.threatPool.push(new SpaceHornet(this));
            } else if (randomNumber < 0.75) {
                this.threatPool.push(new BabyAsteroid(this));
            } else {
                this.threatPool.push(new SpaceOrk(this));
            }
        }
    }
}

class Level4 extends Game {
    constructor(game) {
        super(game);
        this.initLevelValues();
        this.createThreatPool();
    }

    initLevelValues() {
        // initializing level specific value
        this.background.image = document.getElementById('level4Background');
        this.planet.image = document.getElementById('level4Planet');
        this.layer.image = document.getElementById('layer4');
        this.ui.pauseImage = document.getElementById('level4PauseMenu');
        this.winningScore = 150;
        this.gameTime = 0;
        this.timeLimit = 90000;
        this.robotLives = 4;
        this.maxThreats = 40;
        this.threatTimer = 0;
        this.threatInterval = 1000;
        // this.toggleAction();
    }

    createThreatPool() {
        // creating the Level collection of threats
        for (let i = 0; i < this.maxThreats; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.25) {
                this.threatPool.push(new Asteroid(this));
            } else if (randomNumber < 0.5) {
                this.threatPool.push(new SpaceHornet(this));
            } else if (randomNumber < 0.75) {
                this.threatPool.push(new AstroMechaBat(this));
            } else {
                this.threatPool.push(new SpaceOrk(this));
            }
        }
    }
}

class Level5 extends Game {
    constructor(game) {
        super(game);
        this.initLevelValues();
        this.createThreatPool();
    }

    initLevelValues() {
        // initializing level specific value
        this.background.image = document.getElementById('level5Background');
        this.planet.image = document.getElementById('level5Planet');
        this.layer.image = document.getElementById('layer5');
        this.ui.pauseImage = document.getElementById('level5PauseMenu');
        this.winningScore = 250;
        this.gameTime = 0;
        this.timeLimit = 120000;
        this.robotLives = 5;
        this.maxThreats = 50;
        this.threatTimer = 0;
        this.threatInterval = 1200;
        // this.toggleAction();
    }

    createThreatPool() {
        // creating the Level collection of threats
        for (let i = 0; i < this.maxThreats; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.2) {
                this.threatPool.push(new MechaHives(this));
            } else if (randomNumber < 0.4) {
                this.threatPool.push(new MechaPiraijat(this));
            } else if (randomNumber < 0.6) {
                this.threatPool.push(new AstroMechaBat(this));
            } else if (randomNumber < 0.8) {
                this.threatPool.push(new SpaceOrk(this));
            } else {
                this.threatPool.push(new SpaceHornet(this));
            }
        }
    }
}




window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 720;
    ctx.strokeStyle = 'hsla(240, 2%, 91%, 0.959)'; // Overriding the default black strokeStyle
    ctx.fillStyle = 'hsla(240, 2%, 91%, 0.959)';
    ctx.lineWidth = 3; // Overriding the default lineWidth

    // const game = new Game(canvas, ctx);
    let currentLevel = new Level1(canvas, ctx); // Start with Level 1
    let transitionTimeout = null;

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // method to delete old animation frame drawn on canvas since animation is a loop that keeps drawing so we only see the current and becomes moving/animated objects
        currentLevel.render(ctx, deltaTime); // Start the current level
        // Check if the game is over
        if (currentLevel.gameOver && (currentLevel.score >= currentLevel.winningScore) && !currentLevel.pause) {
            // Transition to the next level based on the current level
            switch (currentLevel.constructor) {
                case Level1:
                    clearTimeout(transitionTimeout);
                    // setting a timeout for transition for each
                    transitionTimeout = setTimeout(() => {
                        currentLevel = new Level2(canvas, ctx);
                        currentLevel.ui.levelEnterSound.play();
                        // transitionTimeout=null;
                    }, 6100);
                    transitionTimeout = null;
                    break;

                case Level2:
                    clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        currentLevel = new Level3(canvas, ctx);
                        currentLevel.ui.levelEnterSound.play();
                    }, 6100);
                    transitionTimeout = null;
                    break;
                case Level3:
                    clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        currentLevel = new Level4(canvas, ctx);
                        currentLevel.ui.levelEnterSound.play();
                    }, 6100);
                    transitionTimeout = null;
                    break;
                case Level4:
                    clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        currentLevel = new Level5(canvas, ctx);
                        currentLevel.ui.levelEnterSound.play();
                    }, 6100);
                    transitionTimeout = null;
                    break;
                case Level5:
                    // we need to add a farewell message on the ui 
                    clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        currentLevel.ui.gameEndImage.classList.remove('hidden');
                        currentLevel.ui.levelEnterSound.play();
                    }, 9200);
                    transitionTimeout = null;
                    break;
                default:
                    clearTimeout(transitionTimeout);
                    // break if something unexpected happen
                    console.log('something happens a bug escaped!!');
                    break;
            }
        }
        requestAnimationFrame(animate);
    }
    animate(0); // setting the first timeStamp to 0 avoidin the NaN for the first loop
});

// 14.02 : made change in planet shield now full circle with effect vibration (actiated like electrifying) + for debug mode show the border and border description
// 14.02 : robot ready as a separate script (robot.script)
// 15.02 : robot body border to an object that can be detected with checkCircleCcollision
// 15.02 : robot shield also an object
// 16.02 : removing right mouse click event
// 16.02 : added Responsiveness and compatibility + reorganizing the code + adding touch event listeners to robot tracking
// 20.02 : robot motion pause added and eye and tracker light do not pause for better UX
// 20.02 : inner eye animates red on explosion from robot to threat and blue to collecting *** to be fixed
// 20:02 : class threats as a parent for asteroid, alien.... separate script
// 20.02 : added checkCircleRectangleCollision()
// 20.02 : Fixed issue with planet axis x and y (now takes full planet instead of cropped image) and added background image animation in background class and both separate scripts
// 21.02 : added Style for ui with condition from timer to percentage
// 21:02 : testing Layer animation and including it to the game as separate script
// 22.02 : Debugging issue with the screen
// 22.02 : Changed percentage/score on ui to style 'red' when <= 25
// 23.02 : Space ork rush into scene
// 23.02 : Space ork takes 5 hits and added sound effect for hit
// 23.02 : 4 hours of debugging on why the objects aren't showing on the canvas with no apparent issue to the code ended up to be mistake of + sign instead of - (mouvement on x axis)
// 23.02 : Added special sound effects for gameOver win & loss
// 23.02 : Lowered the volume of all sound effects by 60% *** files need to be updated
// 23.02 : Added condition to play explosion sound based on threat.type. added this.type to Treat sub classes
// 23.02 : intro message must be included in pause menu since the game will start in pause r to restart p to play/pause
// 23.02 : Added buttons and their style and associated functions (fullscreen, pause, start/restart, actionButton, help)
// 23.02 : Threat acts differently when alien is the threat
// 23.02 : Added .toLowerCase() to keyboard controls
// 26.02 : Added Robot lives + flag this.robotIsAlive in game class to trigger robot particles + explosion
// 27.02 : Added FloatingStrings class and visual response from the game showing score collection and deduction and robot lives
// 27.02 : Added new concepts help menu and pause menu for level 1 that fits with the game story and dynamics
// 29.02 : added Level 1 and two new threats AstroMachaBat and SpaceHornet
// 01.03 : resized images to fix and improve smoothness
// 01:03 : reorganized Threat class
// 03.03 : refactored all level class and included all common logic into game class
// 03.03 : modified MechaHive spritesheet, mechaPiraaijat.. with compressed one much lower size also spaceOrk spritesheet
// 03.03 : added sound effects for hits and entrence sound effect for MechaHives
// 03.03 : updated the website, added footer (refactored older one)
// 03.03 : we can add to the difficulty by changing the tyoe of threat from medium to high for the mechapiraaijat for example
// 06.03 : found a way to level transition, not the best but it is for our code structure the easiest or else we need to restructure the code Game would be undependent and a new parent class for levels and another for handling transition
// 06.03 : setting a timeout for all switches causes a bug (transition directly to level 5) *** if solved, it would be better else this work
// 06.03 : adjusting win and lose messages in th ui according to the timout and level transition
// 07.03 : bug found related to timeout, timout counts again at the beginning after transition causing glitch when trying to start playing ==> need to look in StackOverFlow !!


// For Näyttö:
// Maybe a game responsive and playable on any device (android, iPhone, tablet and desktop)
// Game responsive to touchscreen (finding a different way to collect aliens, maybe two clicks?)
// Game fully compatible with touchscreens, joystick-like Player responsive to touch up and down and two transparent water drop-like action buttons (fire & collect), and controls also (Start/restart/pause/quit/debug)??
// Cleaning up the code and fixing the game logic we left place in comments
// The planet border : maybe lives for planet ???
// Adding Player/Robot
// Adding a circle/shield that last for 5 for robot if hitting 10 or 15 asteroids for example (form like atmosphere of planet but full circle around thr robot, color golden radian transparent for example)
// Adding sprite sheet for destroyed Robot when lose all lives (maybe the mechanique debree sprite sheet from project 1)
// Add the video intro and keyboards 't' for tarina maybe ???


// Adding/updating README ** done
// // Fixing the game story **  done
// Planet defencive capability is critically low against asteroids and spaceOrks & will totally collapse in (maxTime) decreasing percentage ** added to tarina
// SISU Protocols are in place to defend the planet & collect enough photons to power up & activate the shield
// shield activates if enough photons/Gamma radiation is colleted to power up ** added to Hoe to play menu ** done
// Changing Timer to percentage until Planet loses its last defencive capability in IU time limit is maxTime in seconds: replace //  const formattedTime = (this.game.gameTime * 0.001).toFixed(1); with const percentage = ((this.game.gameTime * 0.001)/this.timeLimit)*100; and then replace in 374 this: context.fillText('Power left: ' + percentage.toFixed(2) + '%', 20, 80); ** done
// display is responsive to screen sizes ** done
// fixing the position of menu to be responsive and keep location related to canvas element ** done
// fixing the how to play menu to fit with the game story ** done
// preparing a video for game story EN/FIN ** done
// adding style to canvas for polish look ** done
// Adding Press 'r' to restart & Press 'h' to get how to play menu to game over messages ** done
// Maybe a gradiant color for the planet border for better look ** gradian doesn't work on canvas
// Pause menu *** to be checked BUG ** solved
// Bug related to restart mode: cause/solution --> the state of the Planet border isn't re-initialized to original so it is still expanded!! **  found solved
// Adding restart mode using 'r' (maybe same technique as debug mode using 'r' or 's') ** done
// Add a favicon to the html ** done
// Add animated sprite sheet for aliens ** done
// Added keyup condition for pause using spacebar ** done
// Added pause/resume mode and conditions ** done
// Add animated sprite sheet for spaceOrk ** done
// Add spaceOrk Class and function (takes three hits and give +10 score) ** done
// Add smokeExplosion Class and function and use animated sprite sheet for spaceOrk explosion ** done
// **** WE NEED A BETTER BACKGROUND with exact width and height 1280*720 ** done
// responsive any device screen (android, iPhone, tablet and desktop) ** done
// Creating a debug mode trigger by key 'd' ** done
// Adding description for asteroids and aliens in debug mode ** done
// Adding grab sprite sheet for collecting aliens ** done
// Adding random sounds and sound array for collecting aliens (aliens sounds) ** done
// if one asteroid hits the planet Game over ** done
// Adding an event listener for right mouse button click ** done
// Collecting an alien add special score ** done
// Shouting an alien deduct score or time ** done
// if an alien crash on the planet score -= 5 ** done
// Adding a protective sphere (planet border expands) that activate if gameOver and score > maxScore by changing in draw() method in Planet class ---> context.arc(this.x - 900, this.y, this.radius * 5, -1, 1, false); ** done
// Applying a mouvement animation to aliens ** done
// New Asteroids and Aliens stop being created when game over fixed ** done
//  Aliens spawn randomly and less frequent than spaceOrks and steroids ** done