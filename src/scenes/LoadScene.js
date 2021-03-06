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
        this.load.atlas('renzhe', 'player/player.png', 'player/player.json');
        this.load.atlas('enemy', 'enimies/enemy.png', 'enimies/enemy.json');
        this.load.image('blood', 'enimies/blood.png');
        //this.load.spritesheet('enemy', 'enimies/enemy.png', { frameWidth: 100, frameHeight: 180 });



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