class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // load graphic assets
        this.load.image('floor', './assets/Floor.png');
        this.load.image('placeholder_char', './assets/Slug.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('railing_short', './assets/Railing.png');
        this.load.image('railing_long', './assets/Railing2.png');
        this.load.image('spikes', './assets/Spikes.png');
        this.load.image('dirt', './assets/dirt.jpg');
        this.load.image('coin_temp', './assets/coin_temp.png');
        this.load.image('TitleScreen', './assets/TitleScreen.png');

        // load audio assets
        
    }

    create() {
        this.scene.start("menuScene");
    }
}