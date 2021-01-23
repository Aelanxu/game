import { SmoothedHorionztalControl } from '../public/control'
//  创建游戏角色动画
const enemyConfig = {
    matterSprite: null,
    health: 100,
    body: null,
    blocked: {
        left: false,
        right: false,
        bottom: false
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
    // bind for animations for this player
    anims(scene) { //动画播放
        scene.anims.create({
            key: 'e_idle',
            frames: scene.anims.generateFrameNames('enemy', { prefix: 'idle', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'e_run',
            frames: scene.anims.generateFrameNames('enemy', { prefix: 'walk', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
            frameRate: 10,
            repeat: -1,
            duration: 1000
        })
    },
    //box bind for enemy
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
            .setPosition(400, 200)
            .play('e_idle', true);

    },
    //自动追踪
    autoWalk(player, speed, delta) {

        let oldVelocityX;
        let targetVelocityX;
        let newVelocityX;
        let player_x = player.x
        let distance = player_x - this.matterSprite.x;
        let smoothedControls = new SmoothedHorionztalControl(speed);

        if (distance < 0) {


            smoothedControls.moveLeft(delta);
            this.matterSprite.anims.play('e_run', true);

            oldVelocityX = this.matterSprite.body.velocity.x;
            targetVelocityX = -this.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, -smoothedControls.value)
            this.matterSprite.setVelocityX(newVelocityX);
            //只有加入动画以后flipX 属性才能生效
            if (!this.matterSprite.flipX) {
                this.matterSprite.flipX = true;
            }

        } else if (distance > 0) {

            smoothedControls.moveRight(delta);
            this.matterSprite.anims.play('e_run', true);
            oldVelocityX = this.matterSprite.body.velocity.x;
            targetVelocityX = this.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, smoothedControls.value)
            this.matterSprite.setVelocityX(newVelocityX);
            if (this.matterSprite.flipX) {
                this.matterSprite.flipX = false;
            }

        }
    }




};
export { enemyConfig }