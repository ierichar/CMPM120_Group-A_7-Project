class Skater extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame) {
        super(scene,x,y,texture,frame);
    
        scene.add.existing(this);
        //scene.physics.add.existing(this); 
        //this.JUMP_VELOCITY = -700;

    }
}