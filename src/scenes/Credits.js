class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    create() {
        // load credit card
        this.CreditSceen = this.add.tileSprite(0, 0, 960, 640, 'CreditScreen').setOrigin(0, 0);

        // define key
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // start game
            this.scene.start('menuScene');
        }
    }
}