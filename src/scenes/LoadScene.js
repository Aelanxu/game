import Phaser from 'phaser'
export class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene");
    }
    preload() {
        this.load.setBaseURL('assets');

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png', { frameWidth: 32, frameHeight: 48 }
        );

    }
    create() {

        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'star');
    }

}