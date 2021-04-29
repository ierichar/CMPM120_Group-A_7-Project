class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // load graphic assets
        this.load.image('placeholder_char', './assets/Slug.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('railing_short', './assets/Railing.png');
        this.load.image('railing_long', './assets/Railing2.png');
        this.load.image('spikes', './assets/Spikes.png');
        this.load.image('dirt', './assets/dirt.jpg');
        this.load.image('coin_temp', './assets/coin_temp.png');
        this.load.image('TitleScreen', './assets/TitleScreen.png');

        this.load.image('PurpleGuy', './assets/PurpleGuy.png');
        this.load.image('RedGuy', './assets/RedGuy.png');
        this.load.image('BlueGuy', './assets/BlueGuy.png');
        this.load.image('GreenGuy', './assets/GreenGuy.png');

        this.load.image('Layer1', './assets/Layer1.png');
        this.load.image('Layer2', './assets/Layer2.png');
        this.load.image('Layer3', './assets/Layer3.png');

        this.load.image('floor', './assets/Floor.png');

        // load audio assets
        
    }

    create() {
        this.scene.start("menuScene");
    }
}