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
        if (this.newBonus && this.x < game.config.width/2) {
            this.newBonus = false;
            // (recursively) call parent scene method from this context
            this.scene.addBonus(this.parent, this.velocity);
        }
        // destroy buyer if it reaches the left edge of the screen
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}
