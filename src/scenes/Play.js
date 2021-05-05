class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // tiled space 
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'Layer1').setOrigin(0, 0);
        this.Layer3 = this.add.tileSprite(0, 0, 960, 640, 'Layer3').setOrigin(0, 0);
        this.Layer2 = this.add.tileSprite(0, 0, 960, 640, 'Layer2').setOrigin(0, 0);

        this.ScoreBoard = this.add.tileSprite(720, 20, 223, 58, 'ScoreBoard').setOrigin(0, 0);

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

        this.grindNoise = this.sound.add('grind', {
            mute: false,
            volume: .50,
            rate: 3,
            loop: false
        });

        let playConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding tiled floor! (curtesy of Nathan Altice Movemnet Studies Repository)
        this.gameFloor =  this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'floor', 0).setOrigin(0,0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.gameFloor.add(groundTile);
        }

        //slug push config
        this.anims.create({
            key:'SlugPush', //key
            repeat: -1,
            frames: this.anims.generateFrameNames('PushAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5
        })

        //slug jump config
        this.anims.create({
            key:'SlugJump', //key
            //repeat: -1,
            frames: this.anims.generateFrameNames('JumpAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5
        })

        //hand config
        this.anims.create({
            key:'HandChomp', //key
            repeat: -1,
            frames: this.anims.generateFrameNames('HandAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5
        })

        this.playerOne = this.physics.add.sprite(100, 500, 'PushAtlas', 0);
        this.playerOne.anims.play('SlugPush');
        this.playerOne.setCollideWorldBounds(true);

        // physics collider for skater to ground 
        this.physics.add.collider(this.playerOne, this.gameFloor);

        // add trashcan
        this.trashcan01 = new Spike(this, 30 - game.config.width, 605, 'trashcan', 0, 30).setOrigin(0.5, 1);
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

        // add bird
        this.bird01 = new Spike(this, 0 - game.config.width, 200, 'HandAtlas', 0, 30).setOrigin(0,0);
        this.bird01.anims.play('HandChomp');
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

        // set up buyer group
        // see: https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Play.js 
        this.buyerGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })
        // set up bonus group
        this.bonusGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })

        // introduce buyers
        this.TutorialScript = this.add.tileSprite(20, 100 , 873, 232, 'TutorialScript').setOrigin(0, 0);
        this.time.delayedCall(3000, () => {
            this.TutorialScript.destroy();
        })
        // set up buyer loop
        this.time.delayedCall(20000, () => {
            this.addBuyer();
        })
        // introduce points
        // set up buyer loop
        this.time.delayedCall(15000, () => {
            this.addBonus();
        })

        // set up physics overlap
        // see: https://github.com/nathanaltice/BigBodies/blob/master/src/scenes/BodyBumps.js
        this.physics.world.on('overlap', ()=>{
            console.log('overlapping...');
        });

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
            loop: true,
            startAt: 600,
        });

        // set up bench loop
        this.benchTimer = this.time.addEvent({
            delay: 2500,
            callback: this.addBench,
            callbackScope: this,
            loop: true,
            startAt: 0,
        });
        // set up obstacle loop
        this.obstacleTimer = this.time.addEvent({
            delay: 5555,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true,
            startAt: 10,
        });
            
        // give world physics
        this.physics.world.gravity.y = 2600;
        this.JUMP_VELOCITY = -600;

        // game score
        this.displayScore = this.add.text(880, 28, score, playConfig);
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
            this.playerOne.anims.play('SlugPush', true);
	    }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        //thanks for the code nathan!
	    if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(keySPACE, 200)) {
            this.playerOne.anims.play('SlugJump', true);
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

        // if they're grinding on bench
        if(this.playerOne.body.touching.down && (this.shortRailing01.body.touching.up || this.longRailing01.body.touching.up)){
            score += 1;
        }

        // don't know if this code breaks the game or not :) not about to find out
        if (this.gameOver == true) {
            this.scene.start("gameOverScene");
        }

        this.physics.world.overlap(this.playerOne, this.bonusGroup, this.addItem, null, this);
        this.physics.world.overlap(this.playerOne, this.buyerGroup, this.giveItem, null, this);

        if (!this.gameOver) {
            this.spike01.update();
            this.bird01.update();
            this.trashcan01.update();
            this.shortRailing01.update();
            this.longRailing01.update();
        }
    }

    // increase game speed up to 12
    nextLevel() {
        if (gameSpeed <= 12) {
            gameSpeed += 1;
        }
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

    touchSpike() {
        this.scene.start("gameOverScene");
        this.bgm.mute = true;
        this.gameOverNoise.play();
    }

    shortRailingCheck() {
        if(this.playerOne.body.touching.down && this.shortRailing01.body.touching.up){
            score += 1;
            this.grindNoise.play();
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
            this.grindNoise.play();
        }
        else{
            this.scene.start("gameOverScene");
            this.bgm.mute = true;
            this.gameOverNoise.play();
        }
    }

    addBonus() {
        let z = Phaser.Math.Between(0, 1);
        switch (z) {
            case 0:
                // add burrito
                let burrito = new Bonus(this, 320, -300, 'burrito').setScale(0.5);
                this.bonusGroup.add(burrito);
                break;
            case 1:
                // add burger
                let burger = new Bonus(this, 320, -300, 'burger').setScale(0.5);
                this.bonusGroup.add(burger);
                break;
        }
    }

    // called on overlap to give player item
    addItem() {
        console.log('calling add item');
        hasItem = true;
    }

    addBuyer() {
        let x = Phaser.Math.Between(0, 3);
        switch (x) {
            case 0:
                let buyer0 = new Buyer(this, 550, -300, 'PurpleGuy');
                this.buyerGroup.add(buyer0);
                break;
            case 1:
                let buyer1 = new Buyer(this, 550, -300, 'BlueGuy');
                this.buyerGroup.add(buyer1);
                break;
            case 2:
                let buyer2 = new Buyer(this, 550, -300, 'GreenGuy');
                this.buyerGroup.add(buyer2);
                break;
            case 3:
                let buyer3 = new Buyer(this, 550, -300, 'RedGuy');
                this.buyerGroup.add(buyer3);
                break;
        }
    }

    // called on overlap to give buyer item
    giveItem() {
        if (hasItem == true && !this.physics.world.overlap(this.playerOne, this.bonusGroup, this.addItem, null, this)) {
            console.log('calling give item');
            score += 500;
            hasItem = false;
        }
    }
}