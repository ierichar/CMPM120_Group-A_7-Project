class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio and title card
        this.MenuScreen = this.add.tileSprite(0, 0, 960, 640, 'TitleScreen').setOrigin(0, 0);
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            // start game
            this.scene.start('loadingScene');
            //this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // see credits
            this.scene.start('creditScene');
        }
    }
}