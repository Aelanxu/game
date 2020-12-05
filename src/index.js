import Phaser from 'phaser'
import { LoadScene } from './scenes/LoadScene'
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }

    },
    parent: 'game',
    scene: [LoadScene]
};
const game = new Phaser.Game(config);