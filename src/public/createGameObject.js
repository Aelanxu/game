import { animations } from '../animations/animations'
export class Add {
    constructor(scene, keyName, type) {
        this.scene = scene;
        this.name = keyName;
        this.type = type;
    };
    createSprite(x = 0, y = 0) {
        let sprite = null;
        sprite = this.scene.physics.add.sprite(x, y, this.name)
        sprite.setBounce(0.3)
        sprite.setCollideWorldBounds(true);
        this.createAnims(this.scene, this.name);
        return sprite;

    }
    createAnims(scene, keyName) {

        let mySprite = null;
        switch (this.type) {
            case 1:
                mySprite = animations.createPlayer(scene, keyName);
                break;
            case 2:

                mySprite = animations.createEnimies(scene, keyName);
                break;
        }


        Object.getOwnPropertyNames(mySprite).forEach((key) => {
            this.scene.anims.create(mySprite[key]);
        })





    };

}