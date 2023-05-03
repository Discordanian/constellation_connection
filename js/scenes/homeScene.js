class homeScene extends Phaser.Scene {
    constructor() {
        super('Home');
    }
    init(data) {
        this.gameConfig = data || {};
    }
    create() {
        this.gameConfig.info("Home Scene");
        let gameH = this.sys.game.config.height;
        let gameW = this.sys.game.config.width;


        // let bg = this.add.sprite(0,0,'background').setOrigin(0,0).setInteractive(); // upper corner in the upper corner

        // game Background with active input to start the game
        let bg = this.add.sprite(gameW / 2, gameH / 2, 'background').setOrigin(0.5, 0.5).setInteractive();

        // scale logo
        let hScale = gameH / bg.height;
        let wScale = gameW / bg.width;
        let maxScale = Math.max(hScale, wScale); // we want the background to 'runover'
        bg.setScale(maxScale, maxScale);
        bg.setTint(0x999999, 0x777777, 0x333333, 0x555555);


        let gc = this.gameConfig; // Let's it pass into the inner 'this' of the pointerdown function

        let text = this.add.text(gameW / 2, gameH / 2, this.gameConfig.title, {
            font: '40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);
        text.depth = 3;
        text.setScale((0.9 * gameW) / text.width);

        let offset = 10 + (text.height / 2);

        let textBg = this.add.graphics();
        textBg.fillStyle(0x000000, 0.5);
        textBg.fillRect(0, (gameH / 2) - offset, gameW, offset * 2);

        this.calculateGameArea();

        // console.log(this.gameConfig.myJson);

        // Take the JSON data and save it to the config
        let levelData = this.cache.json.get('levelData');
        this.gameConfig.levelDesign = levelData.levelDesign;
        this.gameConfig.solutions = levelData.solutions;

        bg.on('pointerdown', function() {
            this.gameConfig.info("Home Scene 2 Game");
            this.scene.start('Game', gc);
        }, this);
        //

    } // create()
    /*
     * calculateGameArea
     *   Calculates the scale and offsets for the points
     */
    calculateGameArea() {
        let gc = this.gameConfig;

        let minMH = gc.minMenu;
        let border = gc.border;
        let gameH = this.sys.game.config.height;
        let gameW = this.sys.game.config.width;
        /*
        console.log({
            myH: gameH,
            myW: gameW
        });
        */

        // border is the space we don't use around the game
        // We want to use width less a border on each side
        // And the height less a border on each side AND a menu with a 2 border between it and play area.
        let heightPossible = gameH - (minMH + (4 * border));
        let widthPossible = gameW - (2 * border);

        let squareDim = Math.min(heightPossible, widthPossible);
        gc.playArea.scale = squareDim / 100;
        gc.playArea.offsetX = (gameW / 2) - (squareDim / 2);
        // check for offsetY below.  Need to know menu height

        // Given our new play area, we might be able to increase 'menu' area.
        gc.miniArea.offsetY = border;
        gc.miniArea.offsetX = border;
        // The 'used' height is now squareDim + 2B
        let remainderH = squareDim + (2 * border);
        let maxMiniWidth = Math.floor((gameW * 2) / 6);
        gc.miniArea.scale = Math.min(remainderH, maxMiniWidth) / 100;
        gc.miniArea.scale = 1; // My mini area scale isn't quite right.
        let newMenuHeight = (100 * gc.miniArea.scale);

        let usedHeight = squareDim + newMenuHeight;
        remainderH = gameH - usedHeight; // BEWARE variable re-use
        /*
        console.log({
            h: gameH,
            nmh: newMenuHeight,
            sd: squareDim
        });
        */
        /*
        gc.playArea.offsetY = Math.floor(
            ((gameH - newMenuHeight)/2) - (squareDim/2)
            );
            */
        gc.playArea.offsetY = newMenuHeight + (6 * border);

        gc.info(gc.playArea);
        gc.info(gc.miniArea);

    }
}
