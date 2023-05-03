class loadingScene extends Phaser.Scene {
    constructor() {
        super('Loading');
    }
    init() {
        this.gameConfig = config || {};
    }
    preload() {
        let halfW = this.sys.game.config.width / 2;
        let halfH = this.sys.game.config.height / 2;

        let logo = this.add.sprite(halfW, 100, 'logo'); // This logo is available
        // scale logo
        let hScale = this.sys.game.config.height / logo.height;
        let wScale = this.sys.game.config.width / logo.width;
        let minScale = Math.min(hScale, wScale);

        let text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / (1.5), "LOADING", {
            font: '40px Arial',
            fill: '#000080'
        }).setOrigin(0.5, 0.5);
        text.depth = 3;
        logo.setScale(minScale, minScale);



        // progressBar
        let bgBar = this.add.graphics();
        let barW = 150;
        let barH = 30;
        bgBar.setPosition(halfW - (barW / 2), halfH - (barH / 2));
        bgBar.fillStyle(0xF5F5F5, 1);
        bgBar.fillRect(0, 0, barW, barH);

        let progBar = this.add.graphics();
        progBar.setPosition(halfW - (barW / 2), halfH - (barH / 2));

        this.load.on('progress', function(value) {
            // clearing progress bar (to draw again)
            progBar.clear();

            // set Style
            progBar.fillStyle(0x9AD98D, 1);

            // draw Rect
            progBar.fillRect(0, 0, value * barW, barH);

        }, this);


        // load assets
        this.load.image('background', 'assets/images/banner.png');
        this.load.image('star1', 'assets/images/star.png');
        this.load.image('star2', 'assets/images/star2.png');
        // this.load.image('refresh', 'assets/images/refresh.png');
        this.load.image('end', 'assets/images/end_arrow_right.png');
        this.load.image('back', 'assets/images/left_arrow_back.png');
        this.load.image('begin', 'assets/images/left_arrow_back_begin.png');
        this.load.image('refresh', 'assets/images/reload_refresh_arrow.png');
        this.load.image('next', 'assets/images/right_forward_arrow.png');
        this.load.atlas('points', 'assets/images/Point.png', 'assets/images/Point.json');
        /*
        this.load.spritesheet('point','assets/images/point.png',
            {
                frameWidth: 32,
                frameHeight: 32
            });
        */
        // this.load.atlas(
        this.load.audio('stab', 'assets/sfx/TC_Splash_Stab.mp3');

        // Load the levels and solution
        // Try and disable cache
        let dc="assets/data/levels.json?"+Math.random();
        this.load.json('levelData',dc);


    }
    create() {
        // animations can be created here
        // FLY
        /*
        this.anims.create({
            key: 'funnyfaces',
            frames: this.anims.generateFrameNames('pet',{ frames: [1,2,3] } ),
            yoyo: true,
            frameRate: 7,
            repeat: 0
        });
        */

        this.scene.start('Config', this.gameConfig);

    }
} // loadingScene
