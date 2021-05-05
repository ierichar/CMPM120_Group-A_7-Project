// Modification of Barrier Class
// see: https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/prefabs/Barrier.js
class Buyer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture) {
        super(scene, game.config.width, 450, texture);
        // set up physics sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.allowGravity = false;
        this.newBuyer = true;
    }

    update() {
        if (this.newBuyer && this.x < game.config.width/2) {
            this.newBuyer = false;
            // (recursively) call parent scene method from this context
            this.scene.addBuyer(this.parent, this.velocity);
        }

        // destroy buyer if it reaches the left edge of the screen
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}
