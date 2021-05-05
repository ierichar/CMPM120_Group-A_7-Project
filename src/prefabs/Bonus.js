// Modification of Barrier Class
// see: https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/prefabs/Barrier.js
class Bonus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, velocity, texture) {
        super(scene, game.config.width, y, texture);
        // set up physics sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.onOverlap = true;
        scene.physics.onCollide = true;
        scene.physics.onWorldBounds = true;
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.allowGravity = false;
        this.newBonus = true;
    }

    update() {
<<<<<<< HEAD
        if (this.newBonus && this.x < game.config.width/2) {
            this.newBonus = false;
            // (recursively) call parent scene method from this context
            this.scene.addBonus(this.parent, this.velocity);
        }
        // destroy buyer if it reaches the left edge of the screen
        if (this.x < -this.width) {
            this.destroy();
=======
        // move bonus left
        this.x -= this.moveSpeed;
        //config.log('coin updating')
        // wrap around from left to right edge
        if (this.x <= 0 - this.width) {
            this.moveSpeed = 0;
            this.setAlpha(0);
>>>>>>> 595e10f73f069e173289e68d14d6d1bffe896a87
        }
    }
}
