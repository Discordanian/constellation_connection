class creditsScene extends Phaser.Scene {
    constructor() {
        super('Credits');
    }
    init(data) {
        this.gameConfig = data || {};
    }

    create() {
        this.gameConfig.info("credits Scene");
        let gameH = this.sys.game.config.height;
        let gameW = this.sys.game.config.width;
        let halfW = this.sys.game.config.width / 2;
        let halfH = this.sys.game.config.height / 2;


        let logo = this.add.sprite(halfW, 100, 'logo'); // This logo is available
        let hScale = (0.5) * this.sys.game.config.height / logo.height;
        let wScale = (0.5) * this.sys.game.config.width / logo.width;
        let minScale = Math.min(hScale, wScale);
        logo.setScale(minScale, minScale);
        logo.setAlpha(1.0);


        let gc = this.gameConfig; // Let's it pass into the inner 'this' of the pointerdown function

        let pA = "-= PLAY AGAIN =-";
        let pAText = this.add.text(gameW / 2, gameH / 2.7, pA, {
            font: '40px Arial',
            fill: '#222222'
        }).setOrigin(0.5, 0.5).setInteractive();

        let myUrl = "https://tangentialcold.com";
        let urlText = this.add.text(gameW / 2, gameH / 1.7, myUrl, {
            font: '40px Arial',
            fill: '#222222'
        }).setOrigin(0.5, 0.5).setInteractive();
        urlText.setScale(this.sys.game.config.width / urlText.width);


        this.input.keyboard.on('keydown', function() {
            gc.level = 0;
            this.scene.start('Game', gc);
        }, this);

        pAText.on('pointerdown', function() {
            gc.level = 0;
            this.scene.start('Game', gc);
        }, this);

        urlText.on('pointerdown', function() {
            window.open(myUrl);
        }, this);


    } // create()
}
