class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // tiled space 
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'Layer1').setOrigin(0, 0);
        this.Layer3 = this.add.tileSprite(0, 0, 960, 640, 'Layer3').setOrigin(0, 0);
        this.Layer2 = this.add.tileSprite(0, 0, 960, 640, 'Layer2').setOrigin(0, 0);

        //set up background audio
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: .55,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        
        this.gameOverNoise = this.sound.add('gameOverNoise', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });
        //adding tiled floor! (curtesy of Nathan Altice Movemnet Studies Repository)
        this.gameFloor =  this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'floor', 0).setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.gameFloor.add(groundTile);
        }

        // initialize skater (scene, x, y, sprite, frame)
        this.playerOne = this.physics.add.sprite(100, 500, 'placeholder_char', 0);
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

        // add trashcan
        this.trashcan01 = new Spike(this, 0 - game.config.width, 605, 'trashcan', 0, 30).setOrigin(0.5, 1);
        this.trashcan01.showBody = true;
        this.trashcan01.body.setSize(this.trashcan01.width*1,this.trashcan01.height*1);
        this.trashcan01.body.immovable = true;
        this.trashcan01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.trashcan01, this.touchSpike, false, this);

        // add spike
        this.spike01 = new Spike(this, 0 - game.config.width, 605, 'spikes', 0, 30).setOrigin(0.5, 1);
        this.spike01.showBody = true;
        this.spike01.body.setSize(this.spike01.width*1,this.spike01.height*1);
        this.spike01.body.immovable = true;
        this.spike01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.spike01, this.touchSpike, false, this);
        //this.physics.world.on('overlap', function(this.playerOne, this.railing))
        

        // add bird
        this.bird01 = new Spike(this, 0 - game.config.width, 200, 'spikes', 0, 30).setOrigin(0,0);
        this.bird01.showBody = true;
        this.bird01.body.setSize(this.bird01.width*1,this.bird01.height*1);
        this.bird01.body.setAllowGravity(false);
        this.physics.add.collider(this.playerOne, this.bird01, this.touchSpike, false, this);

        // add railings (short and long)
        this.shortRailing01 = new Railing(this, 0 - game.config.width, 600, 'bench1', 0, 30).setOrigin(0, 1);
        this.shortRailing01.body.immovable = true;
        this.shortRailing01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.shortRailing01);
        this.physics.add.collider(this.playerOne, this.shortRailing01, this.shortRailingCheck, false, this);

        this.longRailing01 = new Railing(this, 0 - game.config.width, 600, 'bench2', 0, 30).setOrigin(0, 1);
        this.longRailing01.body.immovable = true;
        this.longRailing01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.longRailing01, this.longRailingCheck, false, this);

        // add bonus
        //this.bonus01 = new Bonus(this, 0 - game.config.width, 300, 'coin_temp', 0, 30).setScale(2.0).setOrigin(0, 0);
        this.bonus01 = this.physics.add.sprite(0, 0, 'coint_temp', 0);
        this.bonus01.showBody = true;
        this.bonus01.body.setAllowGravity(false);
        this.bonus01.body.setCollideWorldBounds(true);
        this.bonus01.body.immovable = true;
        

        // add buyers
        this.PurpleGuy = new Buyer(this, 0, 400, 'PurpleGuy', 0, 30).setOrigin(0, 0);
        this.PurpleGuy.setOnWorldBounds = true;
        this.PurpleGuy.body.immovable = true;
        this.PurpleGuy.body.allowGravity = false;
        this.PurpleGuy.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.PurpleGuy, this.playerOne, this.addPoints());
        this.showBody

        this.RedGuy = new Buyer(this, 0, 400, 'RedGuy', 0, 30).setOrigin(0, 0);
        this.RedGuy.setOnWorldBounds = true;
        this.RedGuy.body.immovable = true;
        this.RedGuy.body.allowGravity = false;
        this.RedGuy.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.RedGuy, this.playerOne, this.addPoints());

        this.GreenGuy = new Buyer(this, 0, 400, 'GreenGuy', 0, 30).setOrigin(0, 0);
        this.GreenGuy.setOnWorldBounds = true;
        this.GreenGuy.body.immovable = true;
        this.GreenGuy.body.allowGravity = false;
        this.GreenGuy.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.GreenGuy, this.playerOne, this.addPoints());

        this.BlueGuy = new Buyer(this, 0, 400, 'BlueGuy', 0, 30).setOrigin(0, 0);
        this.BlueGuy.setOnWorldBounds = true;
        this.BlueGuy.body.immovable = true;
        this.BlueGuy.body.allowGravity = false;
        this.BlueGuy.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.BlueGuy, this.playerOne, this.addPoints());

        // create burrito thought bubble
        this.BurritoBubble = new Buyer(this, 0 + 40, 400, 'BurritoBubble', 0, 30).setOrigin(0, 1);
        this.BurritoBubble.body.immovable = true;
        this.BurritoBubble.body.allowGravity = false;
        this.BurritoBubble.body.setCollideWorldBounds(false);

        // define key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // game over Flag
        this.gameOver = false;

        // set up speed-up timer
        // see: https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Play.js
        this.diffcultyTimer = this.time.addEvent({
            delay: 60000,
            callback: this.nextLevel,
            callbackScope: this,
            repeat: 4,
            loop: false,
            startAt: 60000
        });
        // set up bench loop
        this.benchTimer = this.time.addEvent({
            delay: 2500,
            callback: this.addBench,
            callbackScope: this,
            loop: true
        });
        // set up obstacle loop
        this.obstacleTimer = this.time.addEvent({
            delay: 3250,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true,
            startAt: 60000
        });
        // set up bonus loop
        this.buyerTimer = this.time.addEvent({
            delay: 7000,
            callback: this.addBonus,
            callbackScope: this,
            loop: true,
            startAt: 30000
        });
        // set up buyer loop
        this.buyerTimer = this.time.addEvent({
            delay: 7000,
            callback: this.addBuyer,
            callbackScope: this,
            loop: true,
            startAt: 35000
        });
            
        // give world physics
        this.physics.world.gravity.y = 2600;
        this.JUMP_VELOCITY = -600;

        // game score
        this.displayScore = this.add.text(game.config.width- borderUISize*4 - borderPadding, borderUISize + borderPadding*2, score, playConfig);

    }

    update() {
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
	        
	    }

        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(keySPACE)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        // update score
        this.displayScore.text = score;

        //if they're grinding on bench
        if(this.playerOne.body.touching.down && (this.shortRailing01.body.touching.up || this.longRailing01.body.touching.up)){
            score += 1;
            
        }


        if (this.gameOver == true) {
            this.scene.start("gameOverScene");
        }


        if (!this.gameOver) {
            this.playerOne.update();
            this.spike01.update();
            this.bird01.update();
            this.trashcan01.update();
            this.shortRailing01.update();
            this.longRailing01.update();
            this.bonus01.update();
            this.PurpleGuy.update();
            this.RedGuy.update();
            this.GreenGuy.update();
            this.BlueGuy.update();
            this.BurritoBubble.update();
        }
    }

    nextLevel() {
        gameSpeed += 0.5;
    }

    giveItem() {
        this.playerOne.hasItem == true;
    }

    addPoints() {
        score += 500;
        this.playerOne.hasItem == false;
    }

    addBench() {
        let z = Phaser.Math.Between(0, 1);
        switch (z) {
            case 0:
                // add short railing
                this.shortRailing01.reset();
                break;
            case 1:
                // add long railing
                this.longRailing01.reset();
                break;

        }
    }

    addObstacle() {
        let y = Phaser.Math.Between(0, 2);
        switch (y) {
            case 0:
                // add spike
                this.spike01.reset();
                break;
            case 1:
                // add bird
                this.bird01.reset();
                break;
            case 2:
                // add trashcan
                this.trashcan01.reset();
                break;
        }
    }

    addBonus() {
        this.bonus01.reset();
    }

    addBuyer() {
        let x = Phaser.Math.Between(0, 3);
        switch (x) {
            case 0:
                this.PurpleGuy.reset();
                this.BurritoBubble.reset();
                break;
            case 1:
                this.RedGuy.reset();
                this.BurritoBubble.reset();
                break;
            case 2:
                this.GreenGuy.reset();
                this.BurritoBubble.reset();
                break;
            case 3:
                this.BlueGuy.reset();
                this.BurritoBubble.reset();
                break;

        }
    }

    touchSpike() {
        this.scene.start("gameOverScene");
        this.bgm.mute = true;
        this.gameOverNoise.play();
    }
<<<<<<< HEAD
=======

    shortRailingCheck() {
        if(this.playerOne.body.touching.down && this.shortRailing01.body.touching.up){
            score += 1;
        }
        else{
            this.scene.start("gameOverScene");
            this.bgm.mute = true;
            this.gameOverNoise.play();
        }
    }

    longRailingCheck(){
        if(this.playerOne.body.touching.down && this.longRailing01.body.touching.up){
            score += 1;
        }
        else{
            this.scene.start("gameOverScene");
            this.bgm.mute = true;
            this.gameOverNoise.play();
        }
    }
>>>>>>> d8298c06e41e71794e41809b5aad5750d92f3b09
}