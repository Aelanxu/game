//  创建游戏角色动画
const playConfig = {
    matterSprite: null,
    health: 100,
    body: null,

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
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'Idle__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 20,
            repeat: -1
        });
        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'Run__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 30,
            repeat: -1
        });
        scene.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'Attack__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 30,
            repeat: 0,
            duration: 2000,
        });
        scene.anims.create({
            key: 'throw',
            frames: scene.anims.generateFrameNames('renzhe', { prefix: 'Throw__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 30,
            repeat: -1
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
        this.sensors.left = M.Bodies.rectangle(sx - w * 0.45, sy, 5, h * 0.25, { isSensor: true });
        this.sensors.right = M.Bodies.rectangle(sx + w * 0.45, sy, 5, h * 0.25, { isSensor: true });
        let compoundBody = M.Body.create({
            parts: [
                this.body, this.sensors.bottom, this.sensors.left,
                this.sensors.right
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
                    this.matterSprite.anims.play('attack', true);
                    this.matterSprite.setVelocityX(0)

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
    animsLisnter(sprite) {


    }
}








export { playConfig }