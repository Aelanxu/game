class EnemyClass {
    constructor(scene, option) {
        this.scene = scene;
        this.matterSprite = null; // create a sprite frome phaser3
        this.bloodBar = null;
        this.body = null;
        // this.blocked = null;
        // this.speed = null;
        // this.skill = null;
        this.option = option; // 角色数据

    };
    /* initialize this class
    create game sprite for enemy */
    initialization() {

        this.createEnemyBody(this.scene);

    };

    //loading animations

    loadAnimations(animsArray) {
        if (Array.isArray(animsArray)) {
            for (let i = 0; i < animsArray.length; i++) {
                this.scene.anims.create(animsArray[i]);
            }
        } else {
            console.log('argurment is not Array')
            return
        }

    };


    //create enemy body

    createEnemyBody(scene) {
        let M = Phaser.Physics.Matter.Matter;
        let w = this.matterSprite.width;
        let h = this.matterSprite.height;
        let sx = w / 2;
        let sy = h / 2;
        this.bloodBar = scene.add.image(this.matterSprite.x, this.matterSprite.y, 'blood').setOrigin(0, 0); //血条
        this.body = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
        let compoundBody = M.Body.create({
            parts: [
                this.body
            ],
            restitution: 0.05 //与边界保持距离
        });
        this.matterSprite
            .setExistingBody(compoundBody)
            .setFixedRotation() // Sets max inertia to prevent rotation
            .setPosition(400, 200)
            //.play('e_idle', true);
    }



}