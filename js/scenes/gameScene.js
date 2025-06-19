class gameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    } // constructor
    init(conf) {
        this.gameConfig = conf || {};
    } // init
    create() {
        let gc = this.gameConfig;
        this.graphics = this.add.graphics();
        this.gameConfig.segments = [];
        this.prevPoint = undefined;
        this.allPoints = [];
        this.miniPoints = [];
        this.winningSet = new Set(gc.solutions[gc.level]);
        this.playerSet = new Set();

        this.graphics.clear();

        if (gc.level > (gc.levelDesign.length - 1)) {
            // We are past the end level
            gc.info("Going to jump to Credits");
            this.scene.stop();
            this.scene.start('Credits', gc);
        } else {
            // We are ready to play the game.

            gc.info("Game Scene for level " + gc.level);
            gc.score = 0;

            let gameH = this.sys.game.config.height;
            let gameW = this.sys.game.config.width;

            this.cameras.main.setBackgroundColor('#000000');

            this.createHUD();
            this.createScenario(gc.levelDesign[gc.level]);
        }

    } // create()
    createScenario(scenarioMap) {
        let gc = this.gameConfig;
        gc.info("Creating a Scenario");
        // let points = [];
        let scale = 0.5; // later set this in config, perhaps from the loading screen

        let offsetX = gc.playArea.offsetX;
        let offsetY = gc.playArea.offsetY;
        let playScale = gc.playArea.scale;
        // Helper function. Take the coordinate point, scale and offset it
        function translate(i, off, scale) {
            return (i * scale) + off;
        }

        // obj {id, x, y}
        scenarioMap.forEach(function(obj) {
            let transX = translate(obj.x, offsetX, playScale);
            let transY = translate(obj.y, offsetY, playScale);
            let miniX = translate(obj.x, gc.miniArea.offsetX, gc.miniArea.scale);
            let miniY = translate(obj.y, gc.miniArea.offsetY, gc.miniArea.scale);
            // gc.info("Add Main Point [X,Y] : [ " + transX + "," + transY + " ] ");
            let p = this.add.image(transX, transY, 'star1').setScale(scale).setInteractive();
            let m = this.add.image(miniX, miniY, 'star1').setScale(scale / 2);
            p.id = obj.id; // add an 'id' to each image object.  Makes it easier.
            this.allPoints[obj.id] = p; // put game array together
            this.miniPoints[obj.id] = m; // put mini array together
            this.registerPoint(p, obj.id);

        }, this);

        this.drawSolution();
    } // createScenario
    validSelection(id) {
        let retval = true;

        if (this.prevPoint) {
            if (id === this.prevPoint.id) {
                this.gameConfig.info("Invalid selection.  Same point selected as before");
                retval = false;
            }
            let segment = this.strPair(id, this.prevPoint.id);
            if (this.playerSet.has(segment)) {
                retval = false; // path already chosen.
                this.gameConfig.info("Path already made");
            }
        }

        if (!retval) {
            this.cameras.main.shake(35);
        } // Negative response
        return retval;
    }
    registerPoint(image, id) {
        image.on('pointerdown', function(pointer, point) {
            if (this.validSelection(id)) {
                if (this.prevPoint) {
                    this.playerSet.add(this.strPair(image.id, this.prevPoint.id)); // addSegment to what we've done.
                }
                this.addSegment(image, id);
                // this.gameConfig.debug("I believe point[" + id + "] was tagged");
                // this.gameConfig.debug("Image.id [" + image.id + "]");
                if (this.prevPoint) {
                    this.prevPoint.setTexture('star1');
                }
                this.prevPoint = image;
                image.setTexture('star2'); // set as Selected
            } // only do all this if the selection was valid
        }, this);
    } //registerPoint - gives 'closure' to id field
    playerWon() {
        return this.setEqual(this.playerSet, this.winningSet);
    }
    createHUD() {
        let gc = this.gameConfig;
        let lastDrawn;
        var xOffset = (gc.miniArea.scale * 100) + (3 * gc.border);
        var yOffset = gc.border * 2;
        xOffset = game.config.width - (gc.border); // 20230503 working to right justify refresh
        lastDrawn = this.add.image(xOffset, yOffset, 'refresh').setScale(0.5).setInteractive().on('pointerdown', function(pointer) {
            this.disablePoints();
            this.scene.stop();
            this.scene.start('Game', this.gameConfig);
        }, this);
    } // createHUD
    addSegment(img, id) {
        let gc = this.gameConfig;
        let lineColor = gc.lineColor;

        /* if we have previous point, draw a line */
        if (this.prevPoint) {
            this.graphics.lineStyle(4, lineColor, 1);
            let prev = this.prevPoint;
            let curr = img;
            this.graphics.lineBetween(prev.x, prev.y, curr.x, curr.y);
        }
        if (this.playerWon()) {
            this.gameConfig.info("Player Won!!!!");
            // Disable any more points being drawn
            this.disablePoints();
            this.timeEventStats = this.time.addEvent({
                delay: 1000,
                repeat: 0, // repeat forever = -1
                callbackScope: this,
                callback: function() {
                    // Clean up this HUD and take them HOME
                    this.gameConfig.level += 1;
                    this.scene.stop();
                    this.scene.start('Game', this.gameConfig);
                }
            }, this);
        };
    } // addSegment
    /*
     * disablePoints
     *   Remove any interactions with the main points
     */
    disablePoints() {
        this.allPoints.forEach(function(image) {
            image.off('pointerdown');
        }, this);
    }
    // compare two sets.  Only way is via iteration
    setEqual(setA, setB) {
        if (setA.size !== setB.size) {
            return false;
        }
        for (var a of setA)
            if (!setB.has(a)) {
                return false;
            }
        return true;
    }
    strPair(x, y) {
        // given 2 numbers 'stringify' them such that it's in the format x.y where x is the smaller of the two
        // and y is the larger.
        // strPair(3,2) == strPair(2,3) == "2.3"
        let retval = "";
        retval += Math.min(x, y);
        retval += ".";
        retval += Math.max(x, y);
        return retval;
    }
    drawSolution() {
        let gc = this.gameConfig;
        let ws = this.winningSet;
        let lineColor = gc.miniLineColor;

        this.graphics.lineStyle(1, lineColor, 1);
        ws.forEach(function(s) {
            let a = s.split(".");

            let id1 = parseInt(a[0]);
            let id2 = parseInt(a[1]);
            let from = this.miniPoints[id1];
            let to = this.miniPoints[id2];
            this.graphics.lineBetween(from.x, from.y, to.x, to.y);
        }, this);

    }
    gameOver() {
        this.gameConfig.info("In Game Over");
        let gc = this.gameConfig;

        this.timeEventStats = this.time.addEvent({
            delay: 1000,
            repeat: 0, // repeat forever = -1
            callbackScope: this,
            callback: function() {
                // Clean up this HUD and take them HOME
                this.scene.stop();
                this.scene.start('Credits', gc);
            }
        });

    } // gameOver()
    shutdown() {
        // Clear all graphics
        if (this.graphics) {
            this.graphics.clear();
            this.graphics.destroy();
        }

        // Clear all points and their event listeners
        if (this.allPoints) {
            this.allPoints.forEach(point => {
                if (point) {
                    point.off('pointerdown');
                    point.destroy();
                }
            });
            this.allPoints = [];
        }

        // Clear all mini points
        if (this.miniPoints) {
            this.miniPoints.forEach(point => {
                if (point) {
                    point.destroy();
                }
            });
            this.miniPoints = [];
        }

        // Clear any active timers
        if (this.timeEventStats) {
            this.timeEventStats.remove();
        }

        // Reset game state
        this.prevPoint = undefined;
        this.playerSet = new Set();
        this.winningSet = new Set();

        // Clear any remaining game objects
        this.children.each(child => {
            if (child) {
                child.destroy();
            }
        });
    }
} // gameScene
