class EnemyClass {
    constructor(scene, option) {
        this.scene = scene;
        this.matterSprite = null; // create a sprite frome phaser3
        this.blood = null;
        this.body = null;
        // this.blocked = null;
        // this.speed = null;
        // this.skill = null;
        this.option = option;

    };
    /* initialize this class
    create game sprite for enemy */
    initialization(scene) {

        this.createEnemyBody(scene);

    };




    //create enemy body

    createEnemyBody(scene) {
        let M = Phaser.Physics.Matter.Matter;
        let w = this.matterSprite.width;
        let h = this.matterSprite.height;
        let sx = w / 2;
        let sy = h / 2;
        this.blood = scene.add.image(this.matterSprite.x, this.matterSprite.y, 'blood').setOrigin(0, 0); //血条
        this.body = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
    }



}