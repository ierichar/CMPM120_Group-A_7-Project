class LoadScreen extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    create() {
        // load credit card
        this.CreditSceen = this.add.tileSprite(0, 0, 960, 640, 'LoadingScreen').setOrigin(0, 0);

        //Wheel spinconfig
        this.anims.create({
            key:'WheelSpin', //key
            repeat: -1,
            frames: this.anims.generateFrameNames('WheelAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5
        })

        this.Wheel = this.add.sprite(470, 327, 'PushAtlas', 0);
        this.Wheel.anims.play('WheelSpin');

        this.clock = this.time.delayedCall(4000, () => {
            this.scene.start('playScene');
        }, null, this);

    }

    // update() {
    //     if (Phaser.Input.Keyboard.JustDown(keyM)) {
    //         // start game
    //         this.scene.start('playScene');
    //     }
    // }
}