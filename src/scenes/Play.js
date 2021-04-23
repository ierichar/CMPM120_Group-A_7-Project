class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('floor', './assets/Floor.png');
        this.load.image('placeholder_char', './assets/Placeholder_Character.png');
        this.load.image('railing_short', './assets/Railing.png');
        this.load.image('railing_long,', './assets/Railing2.png');
        this.load.image('spikes', './assets/Spikes.png');
    }

    create() {
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // initialize score
        this.playerScore = 0;
    }

    update() {
        
    }
}