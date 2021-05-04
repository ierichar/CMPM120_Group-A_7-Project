class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }
    create() {

        let gameOverConfig = {
            fontFamily: 'Arial',
            fontSize: '46px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // define keys
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.MenuScreen = this.add.tileSprite(0, 0, 960, 640, 'EndScreen').setOrigin(0, 0);

        //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2+180, game.config.height/2 + 78, `${score}`, gameOverConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + 104, 'Press (P) to Play Again', gameOverConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + 144, 'Press (M) for Menu', gameOverConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
            gameSpeed = 2;
        }
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("playScene");
            gameSpeed = 2;
        }
    }
}