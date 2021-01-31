//  创建游戏角色动画
const playConfig = {
    matterSprite: null,
    health: 100,
    body: null,
    hitBox: null,
    blocked: {
        left: false,
        right: false,
        bottom: true
    },
    sensors: {
        bottom: null,
        left: null,
        right: null
    },
    numTouching: {
        left: 0,
        right: 0,
        bottom: 0
    },
    speed: {
        run: 5,
        jump: 12
    },
    skill: {
        sword: {
            distance: 10,
            damage: 10,
            critical: 0.3,
        }
    },
    anims(scene) {
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'idle', start: 1, end: 1, suffix: '.png', zeroPad: 2 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'run', start: 1, end: 4, suffix: '.png', zeroPad: 2 }),
            frameRate: 12,
            repeat: -1
        });
        scene.anims.create({
            key: 'kuaiquan',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'kuaiquan', start: 1, end: 5, suffix: '.png', zeroPad: 2 }),
            frameRate: 12,
            repeat: 0,
            duration: 2000,
        });
        scene.anims.create({
            key: 'roundleg',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'roundleg', start: 1, end: 9, suffix: '.png', zeroPad: 2 }),
            frameRate: 12,
            repeat: 0
        });
        scene.anims.create({
            key: 'tiaoti',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'tiaoti', start: 1, end: 5, suffix: '.png', zeroPad: 2 }),
            frameRate: 12,
            repeat: 0
        });

    },
    createBody(scene) {
        let M = Phaser.Physics.Matter.Matter;
        let w = this.matterSprite.width;
        let h = this.matterSprite.height;
        let sx = w / 2;
        let sy = h / 2;
        this.body = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
        this.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
        // this.sensors.left = M.Bodies.rectangle(sx - w * 0.4, sy, 5, h * 0.25, { isSensor: true });
        // this.sensors.right = M.Bodies.rectangle(sx + w * 0.4, sy, 5, h * 0.25, { isSensor: true });
        let compoundBody = M.Body.create({
            parts: [
                this.body,
                this.sensors.bottom,

            ],
            restitution: 0.05 //与边界保持距离
        });
        this.anims(scene);
        this.matterSprite
            .setExistingBody(compoundBody)
            .setFixedRotation() // Sets max inertia to prevent rotation
            .setPosition(200, 200)
            .play('idle', true);

    },
    //技能控制
    skillContral(scene) {

        scene.input.keyboard.on('keydown', (event) => {
            // if (gameOption.gameOver) return;
            // console.log(event.key)

            switch (event.key) {
                case "a":
                    this.matterSprite.anims.play('kuaiquan', true);
                    this.matterSprite.setVelocityX(1)

                    break;
                case "s":
                    this.matterSprite.anims.play('roundleg', true);
                    this.matterSprite.setVelocityX(2)

                    break;
                case "d":
                    this.matterSprite.anims.play('tiaoti', true);
                    this.matterSprite.setVelocityX(2)


                    break;


            }
        });

        scene.input.keyboard.on('keyup', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                this.matterSprite.anims.play('idle', true)
            } else {
                this.matterSprite.anims.playAfterRepeat('idle')
            };
            if (event.key === 'a') {
                this.isAcctacking = false;
            }

        })
    },
    //监听动画

    animsLisnter(scene, sprite) {
        this.matterSprite.on('animationupdate', (anim, frame, sprite, frameKey) => {

            if (frameKey === 'kuaiquan01.png') {

                this.createHitBox(scene, sprite, 20, 60)

            }
            if (frameKey === 'roundleg06.png') {

                this.createHitBox(scene, sprite, 20, 60)
                this.matterSprite.setVelocity(2, -5)

            }
            if (frameKey === 'tiaoti03.png') {

                this.createHitBox(scene, sprite, 20, 60)
                this.matterSprite.setVelocity(1, -5)

            }
        });
        this.matterSprite.on('animationcomplete', (anim, frame, sprite, frameKey) => {

            if (this.hitBox) {
                this.hitBox.destroy()
            }





        })


    },
    createHitBox(scene, sprite, width, height) {
        if (this.hitBox) {
            this.hitBox.destroy();
        }

        let w = width;
        let h = height;
        if (sprite.flipX) {
            this.hitBox = scene.add.rectangle(sprite.x - sprite.width / 2, sprite.y, w, h)
        } else {
            this.hitBox = scene.add.rectangle(sprite.x + sprite.width / 2, sprite.y, w, h)
        }
        scene.matter.add.gameObject(this.hitBox, { label: 'p_hitBox', isSensor: true, isStatic: true })


    },
}








export { playConfig }