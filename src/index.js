import Phaser from 'phaser'
import { gameOption } from './gameOption'
import { loadScene } from './scenes/loadScene'
import { startScene } from './scenes/startScene';



window.onload = () => {
    gameOption.getScreenSize();
    const config = {
        type: Phaser.AUTO,
        width: gameOption.width,
        height: gameOption.height,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 800 },
                debug: false
            }

        },
        parent: 'game',
        scene: [loadScene, startScene]
    };
    const game = new Phaser.Game(config);
    game.input.touch.capture = true;
    window.focus();
    resize();
    window.addEventListener('resize', resize, false);
}

function resize() {
    gameOption.getScreenSize();
    console.log(gameOption.width)
    console.log(gameOption.height)
        // let canvas = document.querySelector('canvas');
        // let windowWidth = window.innerWidth;
        // let windowHeight = window.innerHeight;
        // let windowRatio = windowWidth / windowHeight;
        // let gameRatio = game.config.width / game.config.height;
        // console.log(gameRatio)
        // if (windowRatio < gameRatio) {
        //     canvas.style.width = windowWidth + 'px';
        //     canvas.style.height = (windowWidth / gameRatio) + 'px';
        // } else {
        //     canvas.style.width = (windowHeight * gameRatio) + 'px';
        //     canvas.style.height = windowHeight + 'px';
        // }


}