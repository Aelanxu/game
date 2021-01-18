import { gameOption } from '../gameOption'
export class loadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");

    }

    preload() {
        this.load.setBaseURL('assets');

        this.load.image('start', 'start.png');
        this.load.image('ground', 'ground.png');
        this.load.image('platform', 'platform.png')
        this.load.image('gameover', 'gameover.png');
        this.load.image('title', 'title.png');
        this.load.image('leftB', 'leftB.png');
        this.load.image('rightB', 'rightB.png');
        this.load.image('upB', 'upB.png');
        this.load.image('tiles', 'tileds/tiles.png');
        this.load.tilemapTiledJSON('map', 'tileds/map.json');
        this.load.atlas('renzhe', 'player/renzhe.png', 'player/renzhe.json');
        this.load.spritesheet('enimy1', 'enimies/enimy1.png', { frameWidth: 48, frameHeight: 48 });


        gameOption.loadProgress.call(this);

    }
    create() {
        let bg = this.add.image(gameOption.width / 2, gameOption.height / 2, 'sky');
        let title = this.add.image(gameOption.width / 2, 100, 'title');
        let startButton = this.add.image(gameOption.camerasWidth / 2, gameOption.height - 200, 'start').setInteractive();
        startButton.on('pointerdown', (pointer) => {
            title.destroy();
            startButton.destroy();
            bg.destroy();
            this.scene.start('startScene');


        });
    }


}