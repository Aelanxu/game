import { Player } from './player/player';
import { Add } from './enimy/enimies';
export let gameOption = {
        score: 0,
        gameOver: false,
        ground: null,
        platforms: null,
        player: null,
        cursors: null,
        stars: null,
        scoreText: null,
        animy: null,
        width: 1600,
        height: 360,
        camerasWidth: 640,
        camerasHeight: 360,

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
    // 创建游戏角色动画
gameOption.createSprite = function(scene, x, y, playName) {

        this.player = scene.physics.add.sprite(x, y, playName);
        this.player.setBounceY(Player.bounce); //物理反弹参数设置
        this.player.setCollideWorldBounds(Player.setCollideWorldBounds);

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.player.play('turn')

    }
    // 创建玩家
gameOption.createPlayer = function(scene, name, type) {
        return new Add(scene, name, type);
    }
    // 创建敌人
gameOption.createEnimy = function(scene, name, type) {
    return new Add(scene, name, type);

}