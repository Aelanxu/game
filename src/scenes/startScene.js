import { gameOption } from '../gameOption'

export class startScene extends Phaser.Scene {
    constructor() {
        super("startScene");
        this.bottomY = gameOption.height - gameOption.height * 0.3; // 地面离屏幕下边缘的距离
        this.map = null;


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
        // hitBomb(player, bomb) {

    //         this.physics.pause();

    //         player.setTint(0xff0000);

    //         player.anims.play('turn');
    //         this.gameOver();


    //     }
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
                gameOption.cursors = null;
                gameOption.stars.destroy();
                gameOption.scoreText.destroy();
                gameOption.bombs.destroy();
                this.scene.start('startScene')
            })
        }
        //炸弹部署
        // setBombs(player) {
        //         let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //         let bomb = gameOption.bombs.create(x, 16, 'bomb');
    //         bomb.setBounce(1);
    //         bomb.setCollideWorldBounds(true);
    //         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //     }
    //创建地板
    // createPlatforms() {
    //         //地面的固定位置
    //         let rx = Phaser.Math.Between(0, 2) * 20;
    //         let rd = Phaser.Math.Between(1, 2) * 30;
    //         let ld = Phaser.Math.Between(1, 3) * 40;
    //         let md = Phaser.Math.Between(0, 2) * 20;
    //         let pY = this.bottomY - 150;


    //         console.log('y' + rx)

    //         gameOption.platforms.create(50 - rx, pY - ld, 'platform');
    //         gameOption.platforms.create(gameOption.width / 2, pY - md, 'platform');
    //         gameOption.platforms.create(gameOption.width - 50 + rx, pY - rd, 'platform');
    //         gameOption.platforms.children.iterate(function(child) {
    //             child.body.allowGravity = false;
    //         })
    //         if (gameOption.platforms.children.size < 6) {
    //             this.createPlatforms()

    //         }
    //         console.log(gameOption.platforms.children.size)
    //     }
    // keybroad for contral
    createKeyContral() {
        if (gameOption.gameOver) return;



        this.input.keyboard.on('keydown', function(event) {
            if (gameOption.gameOver) return;
            console.log(event.key)

            switch (event.key) {
                case "ArrowLeft":
                    if (!gameOption.player.matterSprite.flipX) {
                        gameOption.player.matterSprite.flipX = true;
                    }
                    gameOption.player.matterSprite.setVelocityX(-16);
                    gameOption.player.matterSprite.anims.play('run', true);
                    break;
                case "ArrowRight":
                    if (gameOption.player.matterSprite.flipX) {
                        gameOption.player.matterSprite.flipX = false;
                    }
                    gameOption.player.matterSprite.setVelocityX(16);
                    gameOption.player.matterSprite.anims.play('run', true);
                    break;
                case "ArrowUp":
                    if (gameOption.player.matterSprite.body.blocked.bottom) {
                        gameOption.player.matterSprite.setVelocityY(-330);

                    }
                    break;
                case "a":


                    gameOption.player.matterSprite.anims.play('attack', true);
                    gameOption.player.matterSprite.anims.playAfterRepeat('idle')

                    break;


            }



        });

        this.input.keyboard.on('keyup', function(event) {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                gameOption.player.matterSprite.setVelocityX(0);
                gameOption.player.matterSprite.anims.play('idle', true);
            }




        });




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
    create() {
            this.createKeyContral();
            this.matter.world.setBounds(0, 0, gameOption.width, gameOption.height)
                // 地图
            this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

            let tileset = this.map.addTilesetImage('tiles')
            let bg = this.map.createLayer('bg', tileset, 0, 0);
            gameOption.ground = this.map.createLayer('ground', tileset, 0, 0)
            gameOption.ground.setCollisionByProperty({ collides: true });
            this.matter.world.convertTilemapLayer(gameOption.ground);
            // 初始化主角

            let createPlayer = gameOption.createSpriteFactory(this, 'renzhe', 1);
            gameOption.player.matterSprite = createPlayer.createSprite(300, this.bottomY - 360, 'renzhe');
            let M = Phaser.Physics.Matter.Matter;
            let w = gameOption.player.matterSprite.width;
            let h = gameOption.player.matterSprite.height;
            let sx = w / 2;
            let sy = h / 2;


            let playBody = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
            gameOption.player.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
            gameOption.player.sensors.left = M.Bodies.rectangle(sx - w * 0.45, sy, 5, h * 0.25, { isSensor: true });
            gameOption.player.sensors.right = M.Bodies.rectangle(sx + w * 0.45, sy, 5, h * 0.25, { isSensor: true });
            let compoundBody = M.Body.create({
                parts: [
                    playBody, gameOption.player.sensors.bottom, gameOption.player.sensors.left,
                    gameOption.player.sensors.right
                ],
                restitution: 0.05 //与边界保持距离
            })
            gameOption.player.matterSprite
                .setExistingBody(compoundBody)
                .setFixedRotation() // Sets max inertia to prevent rotation
                .setPosition(200, 200);

            gameOption.player.matterSprite.play('idle')

            //  设置碰撞

            // this.map.setCollision([1, 33])



            // 创建敌人
            /*  let createEnimies = gameOption.createSpriteFactory(this, 'enimy1', 2);
             gameOption.enimy = createEnimies.createSprite(200, this.bottomY - 160, 'enimy1');
             gameOption.enimy.play('idle')
             console.log(gameOption.enimy);
             this.physics.add.collider(gameOption.enimy, gameOption.ground); */
            //this.physics.add.collider(gameOption.player, gameOption.enimy);

            this.cameras.main.setSize(gameOption.camerasWidth, gameOption.camerasHeight);
            this.cameras.main.setBounds(0, 0, gameOption.width, this.bottomY);


            this.cameras.main.startFollow(gameOption.player.matterSprite);
            // gameOption.platforms = this.physics.add.staticGroup();


            //gameOption.ground = this.physics.add.staticGroup();
            //gameOption.ground.create(0, this.bottomY, 'ground').refreshBody();

            //  this.createPlatforms();
            //  this.createButton();



            //this.physics.add.collider(gameOption.enimy, groundLayer);
            //监测碰撞
            // this.physics.add.collider(gameOption.player, gameOption.ground);
            // this.physics.add.collider(gameOption.player, gameOption.platforms);


            //创建星星
            // gameOption.stars = this.physics.add.group({
            //     key: 'star',
            //     repeat: 9,
            //     setXY: { x: 14, y: 0, stepX: gameOption.width / 10 }
            // });
            // gameOption.stars.children.iterate(function(child) {

            //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            // });
            // this.physics.add.collider(gameOption.stars, gameOption.platforms);
            //this.physics.add.collider(gameOption.stars, groundLayer);
            // this.physics.add.overlap(gameOption.player, gameOption.stars, this.collectStar, null, this);
            // 创建炸弹
            // gameOption.bombs = this.physics.add.group();
            // this.physics.add.collider(gameOption.bombs, gameOption.platforms);
            // this.physics.add.collider(gameOption.bombs, gameOption.ground);
            // this.physics.add.collider(gameOption.player, gameOption.bombs, this.hitBomb, null, this);



            //构建分数
            gameOption.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });






        }
        //

    update(time, delta) {


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