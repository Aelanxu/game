import { gameOption } from '../gameOption'


export class startScene extends Phaser.Scene {
    constructor() {
        super("startScene");
        this.bottomY = gameOption.height - gameOption.height * 0.3; // 地面离屏幕下边缘的距离
        this.map = null;
        this.flag = false;


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




    // 创建操作按钮
    // createButton() {
    //     let hitArea = new Phaser.Geom.Rectangle(-48, -48, gameOption.width / 3, gameOption.height * 0.3)
    //     let leftButton = this.add.image(0, 0, 'leftB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    //     let upButton = this.add.image(0, 0, 'upB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    //     let rightButton = this.add.image(0, 0, 'rightB').setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    //     Phaser.Actions.GridAlign([leftButton, upButton, rightButton], {
    //         width: 3,
    //         height: 1,
    //         cellWidth: (gameOption.width - 166) / 2,
    //         cellHeight: 48,
    //         x: 124,
    //         y: this.bottomY + this.bottomY * 0.2
    //     });
    //     //操作
    //     this.input.addPointer(1)

    //     upButton.on('pointerdown', () => {

    //         if (gameOption.player.body.touching.down) {
    //             gameOption.player.setVelocityY(-330);
    //         }

    //     });
    //     upButton.on('pointerup', () => {
    //         gameOption.player.setVelocityX(0);
    //         gameOption.player.anims.play('turn');
    //     });
    //     leftButton.on('pointerdown', () => {
    //         if (gameOption.gameOver) return;
    //         gameOption.player.setVelocityX(-160);
    //         gameOption.player.anims.play('left', true);
    //         //leftButton.setTint(0x44ff44);
    //     });
    //     leftButton.on('pointerup', () => {
    //         gameOption.player.setVelocityX(0);
    //         gameOption.player.anims.play('turn');
    //     });
    //     rightButton.on('pointerdown', () => {
    //         if (gameOption.gameOver) return;
    //         gameOption.player.setVelocityX(160);
    //         gameOption.player.anims.play('right', true);
    //     });
    //     rightButton.on('pointerup', () => {
    //         gameOption.player.setVelocityX(0);
    //         gameOption.player.anims.play('turn');
    //     });

    // }



    battle(distance, item, enimy, dt) {

        //按照距离判断使用什么技能
        Object.getOwnPropertyNames(item.skill).forEach((key) => {

            if (Math.round(distance) > item.skill[key].distance[0] && Math.round(distance) < item.skill[key].distance[1]) {

                enimy.setVelocityX(0);
                enimy.anims.play(key, true);



            }
        })
    }



    acluter(bool) {

        let is = bool;
        if (is) {
            gameOption.enemy.health -= 1;
            // console.log(gameOption.enemy.health)


        }

    }



    create() {


            this.matter.world.setBounds(0, 0, gameOption.width, gameOption.height)
                // 地图
            this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

            let tileset = this.map.addTilesetImage('tiles')
            let bg = this.map.createLayer('bg', tileset, 0, 0);
            gameOption.ground = this.map.createLayer('ground', tileset, 0, 0)
            gameOption.ground.setCollisionByProperty({ collides: true });
            this.matter.world.convertTilemapLayer(gameOption.ground);
            // 初始化player


            gameOption.player.matterSprite = this.matter.add.sprite(100, this.bottomY - 360, 'renzhe');
            gameOption.player.createBody(this);


            // Update over, so now we can determine if any direction is blocked


            gameOption.cursors = this.input.keyboard.createCursorKeys();







            //创建敌人
            gameOption.enemy.matterSprite = this.matter.add.sprite(280, this.bottomY - 160, 'enemy');
            gameOption.enemy.createBody(this);



            //相机设置
            this.cameras.main.setSize(gameOption.camerasWidth, gameOption.camerasHeight);
            this.cameras.main.setBounds(0, 0, gameOption.width, this.bottomY);
            this.cameras.main.startFollow(gameOption.player.matterSprite);

            // 监测碰撞
            gameOption.player.matterSprite.on('animationupdate', (anim, frame, sprite, frameKey) => {

                if (frameKey === 'Attack__004.png' && this.flag) {
                    console.log('sss', this.flag)
                        // this.acluter(this.num);
                    gameOption.enemy.isAcctacked(1)



                }
            })


            this.matter.world.on('collisionstart', (event) => {

                for (let i = 0; i < event.pairs.length; i++) {
                    let bodyA = event.pairs[i].bodyA;
                    let bodyB = event.pairs[i].bodyB;


                    if ((bodyA === gameOption.player.body && bodyB === gameOption.enemy.sensors.left) || (bodyA === gameOption.enemy.sensors.left && bodyB === gameOption.player.body)) {
                        console.log('----！')

                    } else if ((bodyA === gameOption.player.body && bodyB === gameOption.enemy.sensors.right) || (bodyA === gameOption.enemy.sensors.right && bodyB === gameOption.player.body)) {

                        console.log('-----！')
                    } else if ((bodyA === gameOption.enemy.body && bodyB === gameOption.player.sensors.left) || (bodyA === gameOption.player.sensors.left && bodyB === gameOption.enemy.body)) {

                        this.flag = true;
                        console.log('玩家的zuo边攻击了！')


                    } else if ((bodyA === gameOption.enemy.body && bodyB === gameOption.player.sensors.right) || (bodyA === gameOption.player.sensors.right && bodyB === gameOption.enemy.body)) {
                        this.flag = true;
                        console.log('玩家的右边攻击了！')


                    } else if ((bodyA === gameOption.enemy.body && bodyB === gameOption.player.body) || (bodyA === gameOption.player.body && bodyB === gameOption.enemy.body)) {
                        this.flag = true;

                    } else {
                        this.flag = false;
                    }



                }

            });

            this.matter.world.on('collisionend', (event) => {

                // console.log(gameOption.enemy.health)
            })


            gameOption.player.skillContral(this);

            //构建分数
            gameOption.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });






        }
        //

    update(time, delta) {

        gameOption.enemy.autoWalk(gameOption.player.matterSprite, 0.01, time, delta)
        gameOption.enemy.createBlood(this, gameOption.enemy.matterSprite)
        let oldVelocityX;
        let targetVelocityX;
        let newVelocityX;

        if (gameOption.cursors.left.isDown && !gameOption.player.blocked.left) {
            gameOption.smoothedControls.moveLeft(delta);
            gameOption.player.matterSprite.anims.play('run', true);
            if (!gameOption.player.matterSprite.flipX) {
                gameOption.player.matterSprite.flipX = true;
            }

            // Lerp the velocity towards the max run using the smoothed controls. This simulates a
            // player controlled acceleration.
            oldVelocityX = gameOption.player.matterSprite.body.velocity.x;
            targetVelocityX = -gameOption.player.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, -gameOption.smoothedControls.value);

            gameOption.player.matterSprite.setVelocityX(newVelocityX);
        } else if (gameOption.cursors.right.isDown && !gameOption.player.blocked.right) {
            gameOption.smoothedControls.moveRight(delta);
            gameOption.player.matterSprite.anims.play('run', true);
            if (gameOption.player.matterSprite.flipX) {
                gameOption.player.matterSprite.flipX = false;
            }

            // Lerp the velocity towards the max run using the smoothed controls. This simulates a
            // player controlled acceleration.
            oldVelocityX = gameOption.player.matterSprite.body.velocity.x;
            targetVelocityX = gameOption.player.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, gameOption.smoothedControls.value);

            gameOption.player.matterSprite.setVelocityX(newVelocityX);
        } else {

            gameOption.smoothedControls.reset();


        }


        if (gameOption.cursors.up.isDown && gameOption.player.blocked.bottom) {
            gameOption.player.matterSprite.setVelocityY(-gameOption.player.speed.jump);

        }


        /*  let player_x = gameOption.player.x;
        let enimy_x = gameOption.enimy.x;
        let distend = player_x - enimy_x;
        // let keys = ['walk', 'idle', 'kick', 'punch', 'jump', 'jumpkick', 'win', 'die'] 
        let skill = ['kick', 'punch', 'jumpkick'];


        if (Math.abs(distend) <= 40) {

            this.battle(Math.abs(distend), gameOption.animy_item, gameOption.enimy, delta)

        } else if (distend < 0) {
            gameOption.enimy.flipX = false;
            gameOption.enimy.setVelocityX(-80);
            gameOption.enimy.play('walk', true);

        } else {
            gameOption.enimy.setVelocityX(80);
            gameOption.enimy.play('walk', true)
            gameOption.enimy.flipX = true;
        }
 */

    }
}