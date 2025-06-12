// our game's configuration

let dynW;
let dynH;

/*
dynW = window.innerWidth  * window.devicePixelRatio;
dynH = window.innerHeight * window.devicePixelRatio;
*/

dynW = 360;
dynH = 640;


let config = {
    type: Phaser.AUTO,
    width: dynW,
    height: dynH,
    scene: [bootScene, loadingScene, configScene, homeScene, gameScene, creditsScene],
    title: 'Graph Game',
    pixelArt: false,
    backgroundColor: 'ffffff'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
