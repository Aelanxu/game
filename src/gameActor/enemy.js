import { SmoothedHorionztalControl } from '../public/control'
//  创建游戏角色动画
const enemyConfig = {
    matterSprite: null,
    hitBox: null,
    health: 100,
    blood: {
        graphics: null,
        rect: null
    },
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
    stats: {
        idle: false,
        isAttacked: false,
        attacking: false,
        run: false,
    },
    damage: 0,

    speed: {
        run: 5,
        jump: 12
    },
    skill: {
        sword: {
            distance: 10,
            damage: 10,
            critical: 0.3,
        },

    },
    lastTimeAttack: 0,
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
        });
        scene.anims.create({
            key: 'attacted',
            frames: scene.anims.generateFrameNames('enemy', { prefix: 'attacted', start: 0, end: 0, suffix: '.png', zeroPad: 0 }),
            frameRate: 10,
            repeat: -1

        });
        scene.anims.create({
            key: 'attact',
            frames: scene.anims.generateFrameNames('enemy', { prefix: 'attact', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
            frameRate: 10,
            repeat: 0,
            duration: 1000,


        })
    },
    // create blood process
    createBlood(scene, sprite) {




        this.blood.setDisplaySize(this.health, 5);
        this.blood.x = sprite.x - this.matterSprite.width / 2;
        this.blood.y = sprite.y - this.matterSprite.height / 2;
        // this.blood.graphics.clear();
        // this.blood.graphics.fillRectShape(this.blood.rect);




    },
    //box bind for enemy
    createBody(scene) {
        let M = Phaser.Physics.Matter.Matter;
        let w = this.matterSprite.width;
        let h = this.matterSprite.height;
        let sx = w / 2;
        let sy = h / 2;
        //血条
        this.blood = scene.add.image(this.matterSprite.x, this.matterSprite.y, 'blood').setOrigin(0, 0);
        this.body = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
        this.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
        // this.sensors.left = M.Bodies.rectangle(sx - w * 0.4, sy, 5, h * 0.25, { isSensor: true });
        // this.sensors.right = M.Bodies.rectangle(sx + w * 0.4, sy, 5, h * 0.25, { isSensor: true });
        let compoundBody = M.Body.create({
            parts: [
                this.body,
                this.sensors.bottom
            ],
            restitution: 0.05 //与边界保持距离
        });
        this.anims(scene);
        this.matterSprite
            .setExistingBody(compoundBody)
            .setFixedRotation() // Sets max inertia to prevent rotation
            .setPosition(400, 200)
            //.play('e_idle', true);


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
        scene.matter.add.gameObject(this.hitBox, { label: 'e_hitBox', isSensor: true, isStatic: true })


    },
    //自动追踪
    autoWalk(scene, player, speed, time, delta) {



        let oldVelocityX;
        let targetVelocityX;
        let newVelocityX;
        let player_x = player.x
        let distance = player_x - this.matterSprite.x;
        let smoothedControls = new SmoothedHorionztalControl(speed);


        if (Math.abs(distance) < 80) {

            this.matterSprite.setVelocityX(0);

            this.autoAttack(time, 1)

        } else if (distance < 0 && Math.abs(distance) > 60) {


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

        } else if (distance > 0 && Math.abs(distance) > 60) {

            smoothedControls.moveRight(delta);
            this.matterSprite.anims.play('e_run', true);
            oldVelocityX = this.matterSprite.body.velocity.x;
            targetVelocityX = this.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, smoothedControls.value)
            this.matterSprite.setVelocityX(newVelocityX);
            if (this.matterSprite.flipX) {
                this.matterSprite.flipX = false;
            }

        } else {
            this.matterSprite.setVelocityX(0)

            this.matterSprite.anims.play('e_idle', true);
        }
    },
    autoAttack(time, num) {

        let interval = time - this.lastTimeAttack;

        if (interval > 2000) {
            this.matterSprite.anims.play('attact', true)
            this.matterSprite.anims.playAfterRepeat('e_idle');
            this.damage = num;
            this.lastTimeAttack = time;

        }






    },

    animsLisnter(scene, sprite) {
        this.matterSprite.on('animationupdate', (anim, frame, sprite, frameKey) => {

            if (frameKey === 'attact1.png') {

                this.createHitBox(scene, sprite, 20, 60)
                    // this.acluter(this.num);
                    //this.isAcctacked(1)

            }
        });
        this.matterSprite.on('animationcomplete', (anim, frame, sprite, frameKey) => {

            this.hitBox.destroy()




        })


    },
    isAcctacked(num) {


        this.health -= num;
        this.matterSprite.anims.play('attacted', true);
        this.matterSprite.anims.playAfterRepeat('e_idle');

        console.log(this.health)




    }




};
export { enemyConfig }