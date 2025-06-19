class configScene extends Phaser.Scene {
    constructor() {
        super('Config');
    } // constructor
    init(conf) {
        this.gameConfig = conf || {};
    } // init
    preload() {}
    create() {
        let gameConfig = {
            "score": 0,
            "logLevel": 0, // 0 is error only, 1 is info and error, 2 is info, error and debug, -1 will turn it all off
            "title": "Constellation Connection\n\n\nTangential Cold Studios",
            "border": 15,
            "minMenu": 120,
            "playArea": {
                "scale": 1,
                "offsetX": 0,
                "offsetY": 0
            },
            "miniArea": {
                "scale": 1,
                "offsetX": 0,
                "offsetY": 0
            },
            "segments": [],
            "prevPoint": {},
            "level": 0,
            "lineColor": 0xff0000,
            "miniLineColor": 0x00ff00,
            "info": function(x) {
                if (this.logLevel > 0) {
                    console.log(x);
                }
            },
            "debug": function(x) {
                if (this.logLevel > 1) {
                    console.log(x);
                }
            },
            "error": function(x) {
                if (this.logLevel > -1) {
                    console.log(x);
                }
            }
        };



        gameConfig.info("Config Scene");
        this.scene.start('Home', gameConfig);
    } // create
}
