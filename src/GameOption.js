import { Player } from './gameActer/player';
import { Add } from './public/createGameObject';
import { playConfig, SmoothedHorionztalControl } from './gameActer/player'
export let gameOption = {
    score: 0,
    gameOver: false,
    ground: null,
    player: null,
    scoreText: null,
    animy: null,
    width: 1600,
    height: 360,
    camerasWidth: 640,
    camerasHeight: 360,
    player: playConfig,
    controlMove: SmoothedHorionztalControl,
    animy_item: {
        health: 100,
        skill: {
            kick: {
                name: 'kick',
                distance: [30, 50],
                damage: 10,
                critical: 0.3,
            },
            punch: {
                distance: [0, 30],
                damage: 5,
                critical: 0.4,
            }
        }

    },
    //载入游戏进度
    loadProgress() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', function() {
            loadingText.destroy();
            percentText.destroy();
        });
    },
    // 响应式设置场景
    getScreenSize() {
        this.camerasWidth = window.innerWidth;
        this.camerasHeight = this.height = window.innerHeight;

    }
    //创建敌人
}

// 创建游戏角色工厂
gameOption.createSpriteFactory = function(scene, name, type) {
    return new Add(scene, name, type);
}