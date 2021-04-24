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

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        let playConfig = {
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

        // add spikes
        this.spike01 = new Spike(this, game.config.width + borderUISize * 6, 
            borderUISize * 4, 'spikes', 0, 30).setOrigin(0, 0);
        // add railings (short and long)
        this.shortRailing01 = new Spike(this, game.config.width + borderUISize * 3, 
            borderUISize * 4, 'railing_short', 0, 30).setOrigin(0, 0);
        this.shortRailing01 = new Spike(this, game.config.width + borderUISize * 3, 
            borderUISize * 4, 'railing_long', 0, 30).setOrigin(0, 0);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // initialize score
        this.playerScore = 0;

        // initialize skater (scene, x, y, sprite, frame)
        this.playerOne = new Skater(this, game.config.width/2, game.config.width/2, "placeholder_char" ).setOrigin(0.5, 0);

        //game over Flag
        this.gameOver = false;

              //bring up game over
        this.clock = this.time.delayedCall(3000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', playConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (P) for Menu', playConfig).setOrigin(0.5);
            this.gameOver = true;
            }, null, this);
            
            //initiate clock
            this.clock = this.clock.getElapsed();
            

        //give world physics
        //this.physics.world.gravity.y = 2600;

        //clock 
        this.clockRight = this.add.text(game.config.width- borderUISize*5 - borderPadding, borderUISize + borderPadding*2, this.clock / 1000, playConfig);
    }

    update() {
        
        //this.gameOver = true;
        
        //this.clockRight.text = this.game.time.getElapsedSeconds();

        this.clockRight.text = (this.clock/1000);

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("menuScene");
        }
    }
}