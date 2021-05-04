class Buyer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = gameSpeed;
    }

    update() {
        // move buyer left
        this.x -= this.moveSpeed;
        // wrap around from left to right edge
        if (this.x <= 0 - this.width) {
            this.moveSpeed = 0;
            this.setAlpha(0);
        }
    }

    reset() {
        this.x = game.config.width;
        this.moveSpeed = gameSpeed;
        this.setAlpha(1);
    }
}
