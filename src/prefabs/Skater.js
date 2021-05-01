class Skater extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene,x,y,texture,frame);
    
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        //this.JUMP_VELOCITY = -700;
        hasItem = false;
    }

    update() {
        if (keySPACE.isDown && this.x >= borderUISize + this.width) {
            this.x -= 1;
        }
    }
}