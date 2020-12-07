import Phaser from 'phaser'
import { LoadScene } from './scenes/LoadScene'
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }

    },
    parent: 'game',
    scene: [LoadScene]
};
const game = new Phaser.Game(config);