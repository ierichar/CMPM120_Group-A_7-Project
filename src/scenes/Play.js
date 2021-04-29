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

        // initialize skater (scene, x, y, sprite, frame)
        this.playerOne = this.physics.add.sprite(50, 500, 'placeholder_char', 0);
        this.playerOne.setCollideWorldBounds(true);

        //physics collider for alien to ground 
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

        this.PurpleGuy = this.physics.add.sprite(480, 320, 'PurpleGuy', 0);
        this.PurpleGuy.setCollideWorldBounds(true);
        this.physics.add.collider(this.PurpleGuy, this.gameFloor);

        this.RedGuy = this.physics.add.sprite(580, 320, 'RedGuy', 0);
        this.RedGuy.setCollideWorldBounds(true);
        this.physics.add.collider(this.RedGuy, this.gameFloor);

        this.GreenGuy = this.physics.add.sprite(680, 320, 'GreenGuy', 0);
        this.GreenGuy.setCollideWorldBounds(true);
        this.physics.add.collider(this.GreenGuy, this.gameFloor);

        this.BlueGuy = this.physics.add.sprite(780, 320, 'BlueGuy', 0);
        this.BlueGuy.setCollideWorldBounds(true);
        this.physics.add.collider(this.BlueGuy, this.gameFloor);

        // add spikes
        this.spike01 = new Spike(this, 540, 605, 'spikes', 0, 30).setScale(2.0).setOrigin(0.5, 1);
        this.spike01.showBody = true;
        this.spike01.body.setSize(this.spike01.width*1,this.spike01.height*1);
        // add railings (short and long)
        this.shortRailing01 = new Railing(this, 400, 580, 'railing_short', 0, 30).setScale(2.0).setOrigin(0, 0);
        this.longRailing01 = new Railing(this, 600, 580, 'railing_long', 0, 30).setScale(2.0).setOrigin(0, 0);
        // add bonus
        
        // add physics between player and spikes, and player and railing
        this.longRailing01.body.immovable = true;
        this.shortRailing01.body.immovable = true;
        this.spike01.body.immovable = true;
        this.longRailing01.body.allowGravity = false;
        this.shortRailing01.body.allowGravity = false;
        this.spike01.body.allowGravity = false;
        this.physics.add.collider(this.playerOne, this.spike01,this.touchSpike, false, this);
        this.physics.add.collider(this.playerOne, this.shortRailing01);
        this.physics.add.collider(this.playerOne, this.longRailing01);

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
        this.JUMP_VELOCITY = -1000;

        //clock 
        this.clockRight = this.add.text(game.config.width- borderUISize*5 - borderPadding, borderUISize + borderPadding*2, this.clock / 1000, playConfig);



    }

    update() {
    
        
        //this.clockRight.text = this.game.time.getElapsedSeconds();

       // if(this.checkCollision(this.playerOne, this.spike01)){
        //    this.gameOver = true;
       // }

        // starfield movement
        this.starfield.tilePositionX += 1;  // update tile sprite
        this.Layer2.tilePositionX += 2;  // update tile sprite
        this.Layer3.tilePositionX += 3;  // update tile sprite

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.playerOne.body.setVelocityY(this.JUMP_VELOCITY);
        }

        if (this.playerOne.y > game.config.height-borderPadding) {
            this.playerOne.y = game.config.height - borderPadding;
        }

        // this.clockRight.text = (this.clock/1000);

        if (this.gameOver==true) {
            this.scene.start("gameOverScene");
        }

        if(!this.gameOver){
            this.playerOne.update();
            this.spike01.update();
            this.shortRailing01.update();
            this.longRailing01.update();
        }

        

    }

    touchSpike(){
            this.scene.start("gameOverScene");
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y){

                return true;
        }   else {
            return false;
        }
    }
    
}