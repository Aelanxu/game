import { gameOption } from '../gameOption'
export class startScene extends Phaser.Scene {
    constructor() {
            super("startScene");

        }
        // “吃星星” 监测星星与玩家是否重叠
    collectStar(player, star) {

            star.disableBody(true, true);

            this.calculate(10);
            if (gameOption.stars.countActive(true) === 0) {
                gameOption.stars.children.iterate(function(child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                this.setBombs(player)
            }
        }
        //分数计算
    calculate(n) {
            gameOption.score += n;
            gameOption.scoreText.setText('Score: ' + gameOption.score);
        }
        //监测炸弹爆炸
    hitBomb(player, bomb) {

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');
        this.gameOver();


    }
    gameOver() {
            gameOption.gameOver = true;
            gameOption.score = 0;
            let gameOverTitle = this.add.image(gameOption.width / 2, gameOption.height / 2, 'gameover');
            let startButton = this.add.image(gameOption.width / 2, gameOption.height - 200, 'start').setInteractive();
            startButton.on('pointerdown', (pointer) => {
                gameOption.gameOver = false;
                gameOverTitle.destroy();
                startButton.destroy();
                gameOption.platforms.clear(true);
                gameOption.player.destroy();
                gameOption.cursors = null;
                gameOption.stars.destroy();
                gameOption.scoreText.destroy();
                gameOption.bombs.destroy();
                this.scene.start('startScene')
            })
        }
        //炸弹部署
    setBombs(player) {
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = gameOption.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    create() {

            // 创建静态物理组
            gameOption.platforms = this.physics.add.staticGroup();

            let bg = this.add.image(gameOption.width / 2, gameOption.height / 2, 'sky');



            gameOption.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

            gameOption.platforms.create(600, 400, 'ground');
            gameOption.platforms.create(50, 250, 'ground');
            gameOption.platforms.create(750, 220, 'ground');

            // 创建精灵
            gameOption.player = this.physics.add.sprite(100, 450, 'dude');
            gameOption.player.setBounce(0.3); //反弹
            gameOption.player.setCollideWorldBounds(true);
            //监测碰撞
            this.physics.add.collider(gameOption.player, gameOption.platforms);
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            }); //end
            //创建星星
            gameOption.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });
            gameOption.stars.children.iterate(function(child) {

                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });
            this.physics.add.collider(gameOption.stars, gameOption.platforms);
            this.physics.add.overlap(gameOption.player, gameOption.stars, this.collectStar, null, this);
            // 创建炸弹
            gameOption.bombs = this.physics.add.group();
            this.physics.add.collider(gameOption.bombs, gameOption.platforms);
            this.physics.add.collider(gameOption.player, gameOption.bombs, this.hitBomb, null, this);



            //构建分数
            gameOption.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            this.input.addPointer(1)


            this.input.on('pointerdown', (pointer, currentlyOver) => {
                console.log(888)
                gameOption.player.setVelocityY(-330);
            });
        }
        //

    update() {
        // gameOption.cursors = this.input.keyboard.createCursorKeys();

        //     if (gameOption.gameOver) return;
        //     if (gameOption.cursors.left.isDown) {
        //         gameOption.player.setVelocityX(-160);

        //         gameOption.player.anims.play('left', true);
        //     } else if (gameOption.cursors.right.isDown) {
        //         gameOption.player.setVelocityX(160);

        //         gameOption.player.anims.play('right', true);
        //     } else {
        //         gameOption.player.setVelocityX(0);

        //         gameOption.player.anims.play('turn');
        //     }

        //     if (gameOption.cursors.up.isDown && gameOption.player.body.touching.down) {
        //         gameOption.player.setVelocityY(-330);
        //     }
        // }


    }
}