// class LevelTransitionState {
//     constructor(game){
//         this.game = game;
//         this.transitionTime = 3000; // Transition time im ms
//         this.transitionTimer = 0;
//     }
//     update(deltaTime){
//         this.transitionTimer += deltaTime;
//         if (this.transitionTimer>= this.transitionTime){
//             // Transition to the next level
//             this.game.updateGameState(new PlayingState(this.game));
//         }
//     }
//     draw(context){
//         // Draw transition animation or message - for now ui draw gameOver message but maybe after it with 4s a new message
//     }
// }


// // // Inside Game class
// // Method to trigger level transition
// triggerLevelTransition(){
//     this.updateGameState(new LevelTransitionState(this));
// }

// class GameLevels {
//     constructor(game) {
//         this.game = game;
//         this.gameOver = false;
//         this.robotIsAlive = true; // Assuming the robot is initially alive
//         this.score = 0;
//         // Add other common properties here

//         // Initialize common game elements
//         this.background = new Background(this.game);
//         this.planet = new Planet(this.game);
//         this.layer = new Layer(this.game);
//         this.robot = new Robot(this.game);
//         this.robotBody = this.robot.robotBodyObject;
//         this.robotShield = this.robot.shieldObject;
//         this.ui = new UI(this.game);
//         // Initialize common game sounds and effects
//         this.initSounds();
//         // Initialize game controls
//         this.initControls();
//     }

//     // Method to initialize game sounds and effects
//     initSounds() {
//         // Initialize explosion sounds
//         this.explosion1 = document.getElementById('explosion1');
//         this.explosion2 = document.getElementById('explosion2');
//         this.explosion3 = document.getElementById('explosion3');
//         this.explosion4 = document.getElementById('explosion4');
//         this.explosion5 = document.getElementById('explosion5');
//         this.explosion6 = document.getElementById('explosion6');
//         this.explosionSounds = [this.explosion1, this.explosion2, this.explosion3, this.explosion4, this.explosion5, this.explosion6];
//         // Initialize disappearance sounds
//         this.disappear1 = document.getElementById('disappear1');
//         this.disappear2 = document.getElementById('disappear2');
//         this.disappear3 = document.getElementById('disappear3');
//         this.disappearanceSounds = [this.disappear1, this.disappear2, this.disappear3];
//     }

//     // Method to initialize game controls
//     initControls() {
//         // Add event listeners for buttons
//         this.initResetButton();
//         this.initPauseButton();
//         this.initActionButton();
//         this.initFullScreenButton();
//         this.initHelpButton();
//         this.initKeyboardControls();
//         this.initTouchControls();
//         this.initMouseControls();
//     }

//     // Method to initialize the reset button
//     initResetButton() {
//         this.resetButton = document.getElementById('resetButton');
//         this.resetButton.addEventListener('click', e => {
//             this.startRestartGame();
//         });
//         this.resetButton.addEventListener('touchend', e => {
//             this.startRestartGame();
//         });
//     }

//     // Method to initialize the pause button
//     initPauseButton() {
//         this.pauseButton = document.getElementById('pauseButton');
//         this.pauseButton.addEventListener('click', e => {
//             this.togglePause();
//         });
//         this.pauseButton.addEventListener('touchend', e => {
//             this.togglePause();
//         });
//     }

//     // Method to initialize the action button
//     initActionButton() {
//         this.actionButton = document.getElementById('actionButton');
//         this.actionButton.addEventListener('click', e => {
//             this.toggleAction();
//         });
//         this.actionButton.addEventListener('touchend', e => {
//             this.toggleAction();
//         });
//     }

//     // Method to initialize the fullscreen button
//     initFullScreenButton() {
//         this.fullScreenButton = document.getElementById('fullScreenButton');
//         this.fullScreenButton.addEventListener('click', e => {
//             this.toggleFullScreen();
//         });
//         this.fullScreenButton.addEventListener('touchend', e => {
//             this.toggleFullScreen();
//         });
//     }

//     // Method to initialize the help button
//     initHelpButton() {
//         this.helpButton = document.getElementById('helpButton');
//         this.helpButton.addEventListener('click', e => {
//             this.toggleHelp();
//         });
//         this.helpButton.addEventListener('touchend', e => {
//             this.toggleHelp();
//         });
//     }

//     // Method to initialize keyboard controls
//     initKeyboardControls() {
//         window.addEventListener('keyup', e => {
//             // Handle keyboard controls
//             // Add your keyboard control logic here
//         });
//     }

//     // Method to initialize touch controls
//     initTouchControls() {
//         window.addEventListener('touchend', e => {
//             // Handle touch controls
//             // Add your touch control logic here
//         });
//     }

//     // Method to initialize mouse controls
//     initMouseControls() {
//         window.addEventListener('click', e => {
//             // Handle mouse controls
//             // Add your mouse control logic here
//         });
//     }

//     // Method to toggle action between destroy and collect
//     toggleAction() {
//         this.collect = !this.collect;
//         // Toggle button background image
//         this.actionButton.style.backgroundImage = !this.collect ? 'url(./assets/img/icons/action-destroy-pngwing-80px1.png)' : 'url(./assets/img/icons/action-collect-pngwing1-70.png)';
//     }

//     // Method to toggle fullscreen
//     toggleFullScreen() {
//         if (!document.fullscreenElement) {
//             document.documentElement.requestFullscreen();
//             this.fullScreenButton.style.backgroundImage = 'url(./assets/img/icons/buttonExitFullScreen1.png)';
//         } else if (document.exitFullscreen) {
//             document.exitFullscreen();
//             this.fullScreenButton.style.backgroundImage = 'url(./assets/img/icons/buttonFullScreen1.png)';
//         }
//     }

//     // Method to toggle help
//     toggleHelp() {
//         this.help = !this.help;
//     }

//     // Method to toggle pause
//     togglePause() {
//         this.pause = !this.pause;
//     }

//     // Method to start or restart the game
//     startRestartGame() {
//         // Reset game properties and elements
//         // Add your game reset logic here
//     }

//     // Other common methods for game functionality can be added here
// }



// // Define other level classes (e.g., Level2, Level3) as needed

// // Usage example:
// const game = new GameLevels();
// const level1 = new Level1(game);
// level1.start(); // Start Level 1