import Phaser from 'phaser'
import { gameOption } from './gameOption'
import { loadScene } from './scenes/loadScene'
import { startScene } from './scenes/startScene';


const config = {
    type: Phaser.AUTO,
    width: gameOption.width,
    height: gameOption.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }

    },
    parent: 'game',
    scene: [loadScene, startScene]
};
const game = new Phaser.Game(config);