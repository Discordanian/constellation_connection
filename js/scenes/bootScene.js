// Minimalist boot.  Let's us create a better
// User experience if loading lots of assets later
class bootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('logo', 'assets/images/Tangential_Cold_Studios.jpg');
    }
    create() {
        this.scene.start('Loading');
        console.log(`
88888888888                                           888    d8b          888       .d8888b.           888      888
    888                                               888    Y8P          888      d88P  Y88b          888      888
    888                                               888                 888      888    888          888      888
    888   8888b.  88888b.   .d88b.   .d88b.  88888b.  888888 888  8888b.  888      888         .d88b.  888  .d88888
    888      "88b 888 "88b d88P"88b d8P  Y8b 888 "88b 888    888     "88b 888      888        d88""88b 888 d88" 888
    888  .d888888 888  888 888  888 88888888 888  888 888    888 .d888888 888      888    888 888  888 888 888  888
    888  888  888 888  888 Y88b 888 Y8b.     888  888 Y88b.  888 888  888 888      Y88b  d88P Y88..88P 888 Y88b 888
    888  "Y888888 888  888  "Y88888  "Y8888  888  888  "Y888 888 "Y888888 888       "Y8888P"   "Y88P"  888  "Y88888
                                888
                           Y8b d88P
                            "Y88P"


  .d8888b.  888                  888 d8b
 d88P  Y88b 888                  888 Y8P
 Y88b.      888                  888
  "Y888b.   888888 888  888  .d88888 888  .d88b.  .d8888b
     "Y88b. 888    888  888 d88" 888 888 d88""88b 88K
       "888 888    888  888 888  888 888 888  888 "Y8888b.
 Y88b  d88P Y88b.  Y88b 888 Y88b 888 888 Y88..88P      X88
  "Y8888P"   "Y888  "Y88888  "Y88888 888  "Y88P"   88888P'

        `);

    }
}
