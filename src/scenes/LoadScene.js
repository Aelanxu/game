import { gameOption } from '../gameOption'
export class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");

    }

    preload() {
        this.load.setBaseURL('assets');
        this.load.image('sky', 'sky.png');
        this.load.image('start', 'start.png');
        this.load.image('ground', 'ground.png');
        this.load.image('platform', 'platform.png')
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.image('gameover', 'gameover.png')
        this.load.image('title', 'title.png')
        this.load.image('leftB', 'leftB.png')
        this.load.image('rightB', 'rightB.png')
        this.load.image('upB', 'upB.png')

        this.load.spritesheet('dude',
            'dude.png', { frameWidth: 32, frameHeight: 48 }
        );

        gameOption.loadProgress.call(this);

    }
    create() {
        let bg = this.add.image(gameOption.width / 2, gameOption.height / 2, 'sky');
        let title = this.add.image(gameOption.width / 2, 100, 'title');
        let startButton = this.add.image(gameOption.width / 2, gameOption.height - 200, 'start').setInteractive();
        startButton.on('pointerdown', (pointer) => {
            title.destroy();
            startButton.destroy();
            bg.destroy();
            this.scene.start('startScene');


        });
    }


}