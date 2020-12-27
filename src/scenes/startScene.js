import { gameOption } from '../gameOption'
export class startScene extends Phaser.Scene {
    constructor() {
        super("startScene");
        this.bottomY = gameOption.height - gameOption.height * 0.3; // 地面离屏幕下边缘的距离

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
        // 游戏结束
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
                // gameOption.cursors = null;
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
        //创建地板
    createPlatforms() {
            //地面的固定位置
            let rx = Phaser.Math.Between(0, 2) * 20;
            let rd = Phaser.Math.Between(1, 2) * 30;
            let ld = Phaser.Math.Between(1, 3) * 40;
            let md = Phaser.Math.Between(0, 2) * 20;
            let pY = this.bottomY - 150;


            console.log('y' + rx)

            gameOption.platforms.create(50 - rx, pY - ld, 'platform');
            gameOption.platforms.create(gameOption.width / 2, pY - md, 'platform');
            gameOption.platforms.create(gameOption.width - 50 + rx, pY - rd, 'platform');
            gameOption.platforms.children.iterate(function(child) {
                child.body.allowGravity = false;
            })
            if (gameOption.platforms.children.size < 3) {
                this.createPlatforms()

            }
            console.log(gameOption.platforms.children.size)
        }
        // 创建操作按钮
    createButton() {
        let hitArea = new Phaser.Geom.Rectangle(-48, -48, gameOption.width / 3, gameOption.height * 0.3)
        let leftButton = this.add.image(0, 0, 'leftB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        let upButton = this.add.image(0, 0, 'upB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        let rightButton = this.add.image(0, 0, 'rightB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        Phaser.Actions.GridAlign([leftButton, upButton, rightButton], {
            width: 3,
            height: 3,
            cellWidth: (gameOption.width - 144) / 2,
            cellHeight: 48,
            x: 120,
            y: this.bottomY + this.bottomY * 0.25
        });
        //操作
        this.input.addPointer(1)

        upButton.on('pointerdown', () => {

            if (gameOption.player.body.touching.down) {
                gameOption.player.setVelocityY(-330);
            }

        });
        upButton.on('pointerup', () => {


            gameOption.player.setVelocityX(0);
            gameOption.player.anims.play('turn');


        });
        leftButton.on('pointerdown', () => {
            if (gameOption.gameOver) return;
            gameOption.player.setVelocityX(-160);
            gameOption.player.anims.play('left', true);
            //leftButton.setTint(0x44ff44);
        });
        leftButton.on('pointerup', () => {
            gameOption.player.setVelocityX(0);
            gameOption.player.anims.play('turn');
        });
        rightButton.on('pointerdown', () => {
            if (gameOption.gameOver) return;
            gameOption.player.setVelocityX(160);
            gameOption.player.anims.play('right', true);
        });
        rightButton.on('pointerup', () => {
            gameOption.player.setVelocityX(0);
            gameOption.player.anims.play('turn');
        });

    }
    create() {
            gameOption.platforms = this.physics.add.staticGroup();
            let bg = this.add.image(gameOption.width / 2, this.bottomY / 2, 'sky');
            bg.setScale(1.5);

            gameOption.ground = this.physics.add.staticGroup();
            gameOption.ground.create(gameOption.width / 2, this.bottomY, 'ground').refreshBody();

            this.createPlatforms();
            this.createButton();
            // 创建精灵
            gameOption.player = this.physics.add.sprite(100, this.bottomY - 160, 'dude');
            gameOption.player.setBounceY(0.3); //反弹
            gameOption.player.setCollideWorldBounds(true);
            //监测碰撞
            this.physics.add.collider(gameOption.player, gameOption.ground);
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
                repeat: 9,
                setXY: { x: 14, y: 0, stepX: gameOption.width / 10 }
            });
            gameOption.stars.children.iterate(function(child) {

                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });
            this.physics.add.collider(gameOption.stars, gameOption.platforms);
            this.physics.add.collider(gameOption.stars, gameOption.ground);
            this.physics.add.overlap(gameOption.player, gameOption.stars, this.collectStar, null, this);
            // 创建炸弹
            gameOption.bombs = this.physics.add.group();
            this.physics.add.collider(gameOption.bombs, gameOption.platforms);
            this.physics.add.collider(gameOption.bombs, gameOption.ground);
            this.physics.add.collider(gameOption.player, gameOption.bombs, this.hitBomb, null, this);



            //构建分数
            gameOption.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });






        }
        //

    update() {
        if (gameOption.gameOver) return;

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