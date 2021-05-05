class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // load graphic assets
        this.load.image('placeholder_char', './assets/SlugSideView.png');
        this.load.image('bench1', './assets/Bench1.png');
        this.load.image('bench2', './assets/Bench2.png');
        this.load.image('trashcan', './assets/Trashcan.png');
        this.load.image('spikes', './assets/Spikes.png');
        this.load.image('coin_temp', './assets/Coin.png');
        this.load.image('TitleScreen', './assets/TitleScreen.png');
        this.load.image('EndScreen', './assets/GameOver.png');
        this.load.image('CreditScreen', './assets/Credits.png');
        this.load.image('LoadingScreen', './assets/LoadingScreen.png');

        this.load.atlas('PushAtlas', './assets/Push_Anims.png', './assets/Push_Anims.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); //push atlas
        this.load.atlas('JumpAtlas', './assets/Jump_Anims.png', './assets/Jump_Anims.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); //jump atlas
        this.load.atlas('HandAtlas', './assets/Hand_Anims.png', './assets/Hand_Anims.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); //hand atlas
        this.load.atlas('WheelAtlas', './assets/Wheel_Anims.png', './assets/Wheel_Anims.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); //hand atlas

        this.load.image('PurpleGuy', './assets/PurpleGuy.png');
        this.load.image('RedGuy', './assets/RedGuy.png');
        this.load.image('BlueGuy', './assets/BlueGuy.png');
        this.load.image('GreenGuy', './assets/GreenGuy.png');
        this.load.image('BurritoBubble', './assets/BurritoBubble.png');

        this.load.image('Layer1', './assets/Layer1.png');
        this.load.image('Layer2', './assets/Layer2.png');
        this.load.image('Layer3', './assets/Layer3.png');

        this.load.image('floor', './assets/Floor.png');

        // load audio assets
        this.load.audio('bgm', './assets/endless-runner-background-music.mp3');
        this.load.audio('gameOverNoise', './assets/dying-sound.wav');
    }

    create() {
        this.scene.start("menuScene");

        // var atlasTexture = this.textures.get('AnimsAtlas');

        // var frames = atlasTexture.getFrameNames();
    }
}