import Phaser from 'phaser'
import { globalVar } from '../GameOption'
export class LoadScene extends Phaser.Scene {
    constructor() {
            super("LoadScene");
            this.platforms = null;
            this.player = null;
            this.cursors = null;
            this.starts = null;
            this.scoreText = null;
            this.bombs = null;
        }
        // “吃星星” 监测星星与玩家是否重叠
    collectStar(player, star) {
            star.disableBody(true, true);
            this.calculate(10);
            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function(child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                this.setBombs(player)
            }
        }
        //分数计算
    calculate(n) {
            globalVar.score += n;
            this.scoreText.setText('Score: ' + globalVar.score);
        }
        //监测炸弹爆炸
    hitBomb(player, bomb) {

            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            //gameOver = true;

        }
        //炸弹部署
    setBombs(player) {
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    preload() {
        this.load.setBaseURL('assets');

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png', { frameWidth: 32, frameHeight: 48 }
        );

    }
    create() {

            // 创建静态物理组
            this.platforms = this.physics.add.staticGroup();


            this.add.image(400, 300, 'sky');


            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 250, 'ground');
            this.platforms.create(750, 220, 'ground');

            // 创建精灵
            this.player = this.physics.add.sprite(100, 450, 'dude');
            this.player.setBounce(0.2); //反弹
            this.player.setCollideWorldBounds(true);
            //监测碰撞
            this.physics.add.collider(this.player, this.platforms);
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
            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });
            this.stars.children.iterate(function(child) {

                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
            // 创建炸弹
            this.bombs = this.physics.add.group();
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);



            //构建分数
            this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        }
        //

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }


}