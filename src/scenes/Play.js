class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // tiled space 
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'Layer1').setOrigin(0, 0);
        this.Layer3 = this.add.tileSprite(0, 0, 960, 640, 'Layer3').setOrigin(0, 0);
        this.Layer2 = this.add.tileSprite(0, 0, 960, 640, 'Layer2').setOrigin(0, 0);

        //adding tiled floor! (curtesy of Nathan Altice Movemnet Studies Repository)
        this.gameFloor =  this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'floor', 0).setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.gameFloor.add(groundTile);
        }

        // add buyers
        this.PurpleGuy = new Buyer(this, 480, 420, 'PurpleGuy', 0, 30).setOrigin(0, 0);
        this.PurpleGuy.setOnWorldBounds = true;
        this.PurpleGuy.body.immovable = true;
        this.PurpleGuy.body.allowGravity = false;

        this.RedGuy = new Buyer(this, 580, 420, 'RedGuy', 0, 30).setOrigin(0, 0);
        this.RedGuy.setOnWorldBounds = true;
        this.RedGuy.body.immovable = true;
        this.RedGuy.body.allowGravity = false;

        this.GreenGuy = new Buyer(this, 680, 420, 'GreenGuy', 0, 30).setOrigin(0, 0);
        this.GreenGuy.setOnWorldBounds = true;
        this.GreenGuy.body.immovable = true;
        this.GreenGuy.body.allowGravity = false;

        this.BlueGuy = new Buyer(this, 780, 420, 'BlueGuy', 0, 30).setOrigin(0, 0);
        this.BlueGuy.setOnWorldBounds = true;
        this.BlueGuy.body.immovable = true;
        this.BlueGuy.body.allowGravity = false;

        // initialize skater (scene, x, y, sprite, frame)
        this.playerOne = this.physics.add.sprite(50, 500, 'placeholder_char', 0);
        this.playerOne.setCollideWorldBounds(true);

        // physics collider for skater to ground 
        this.physics.add.collider(this.playerOne, this.gameFloor);

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

        // add spike
        this.spike01 = new Spike(this, 540, 605, 'trashcan', 0, 30).setOrigin(0.5, 1);
        this.spike01.showBody = true;
        this.spike01.body.setSize(this.spike01.width*1,this.spike01.height*1);
        this.spike01.body.immovable = true;
        this.spike01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.spike01, this.touchSpike, false, this);

        // add bird
        this.bird01 = new Spike(this, 540, 200, 'spikes', 0, 30).setScale(2.0).setOrigin(0,0);
        this.bird01.showBody = true;
        this.bird01.body.setSize(this.bird01.width*1,this.bird01.height*1);
        this.bird01.body.setAllowGravity(false);
        this.physics.add.collider(this.playerOne, this.bird01, this.touchSpike, false, this);

        // add railings (short and long)
        this.shortRailing01 = new Railing(this, 400, 580, 'bench1', 0, 30).setScale(2.0).setOrigin(0, 0);
        this.shortRailing01.body.immovable = true;
        this.shortRailing01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.shortRailing01);

        this.longRailing01 = new Railing(this, 600, 580, 'bench2', 0, 30).setScale(2.0).setOrigin(0, 0);
        this.longRailing01.body.immovable = true;
        this.longRailing01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.longRailing01);

        // add bonus
        this.bonus01 = new Bonus(this, 540, 300, 'coin_temp', 0, 30).setScale(2.0).setOrigin(0, 0);
        this.bonus01.showBody = true;
        this.bonus01.body.setAllowGravity(false);
        this.bonus01.body.onOverlap = true;
        this.bonus01.body.onCollide = true;
        this.bonus01.body.onWorldBounds = true;

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // initialize score
        this.playerScore = 0;

        //game over Flag
        this.gameOver = false;

        //bring up game over
        this.clock = this.time.delayedCall(10000, () => {
         //   this.gameOver = true;
        }, null, this);
            
        //initiate clock
        this.clock = this.clock.getElapsed();
            
        //give world physics
        this.physics.world.gravity.y = 2600;
        this.JUMP_VELOCITY = -600;

        //clock 
        this.clockRight = this.add.text(game.config.width- borderUISize*5 - borderPadding, borderUISize + borderPadding*2, this.clock / 1000, playConfig);
        this.add.text(game.config.width- borderUISize*4 - borderPadding, borderUISize + borderPadding*2, score, playConfig)
    }

    update() {
        //this.clockRight.text = this.game.time.getElapsedSeconds();

        // background movement
        this.starfield.tilePositionX += 1;  // update tile sprite
        this.Layer2.tilePositionX += 2;  // update tile sprite
        this.Layer3.tilePositionX += 3;  // update tile sprite


        // check if alien is grounded
	    this.playerOne.isGrounded = this.playerOne.body.touching.down;
	    // if so, we have jumps to spare 
	    if (this.playerOne.isGrounded) {
	    	this.jumps = 1;
	    	this.jumping = false;
	    } else {
	    	//this.alien.anims.play('jump');
	    }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        //thanks for the code nathan!
	    if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(keySPACE, 200)) {
	        this.playerOne.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	        
	    } else {
	    	
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(keySPACE)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        // collider between player, buyer, and item for inventory
        this.physics.onOverlap(this.playerOne, this.bonus01);
        this.physics.collide(this.playerOne, this.BlueGuy);
        this.physics.collide(this.playerOne, this.GreenGuy);
        this.physics.collide(this.playerOne, this.PurpleGuy);
        this.physics.collide(this.playerOne, this.RedGuy);

        // this.clockRight.text = (this.clock/1000);

        if (this.gameOver==true) {
            this.scene.start("gameOverScene");
        }

        if (!this.gameOver){
            this.playerOne.update();
            this.spike01.update();
            this.shortRailing01.update();
            this.longRailing01.update();
            this.bird01.update();
            this.bonus01.update();
            this.PurpleGuy.update();
            this.RedGuy.update();
            this.GreenGuy.update();
            this.BlueGuy.update();
        }
    }

    touchSpike() {
        this.scene.start("gameOverScene");
    }

    addInventory() {
        if (!this.playerOne.hasItem) {
            this.playerOne.hasItem = true;
        }
    }

    getBonus() {
        if (this.playerOne.hasItem) {
            score += 500;
        }
    }
}