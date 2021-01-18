import { animations } from '../animations/animations'
export class Add {
    constructor(scene, keyName, type) {
        this.scene = scene;
        this.name = keyName;
        this.type = type;
    };
    createSprite(x = 0, y = 0) {
        let enimy;
        enimy = this.scene.physics.add.sprite(x, y, this.keyName).setOrigin(0, 0);
        enimy.setBounce(0.3)
        enimy.setCollideWorldBounds(true);
        this.createAnims(this.scene, this.name);
        return enimy;

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



        // this.scene.anims.create({
        //     key: 'walk',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [0, 1, 2, 3] }),
        //     frameRate: 8,
        //     repeat: -1
        // });
        // this.scene.anims.create({
        //     key: 'idle',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [5, 6, 7, 8] }),
        //     frameRate: 8,
        //     repeat: -1,
        //     duration: 1000
        // });
        // this.scene.anims.create({
        //     key: 'kick',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [10, 11, 12, 13, 10] }),
        //     frameRate: 8,
        //     repeat: -1,
        //     repeatDelay: 2000,
        //     duration: 2000,
        // });
        // this.scene.anims.create({
        //     key: 'punch',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [15, 16, 17, 18, 17, 15] }),
        //     frameRate: 8,
        //     repeat: -1,
        //     repeatDelay: 2000,
        //     duration: 2000,
        // });
        // this.scene.anims.create({
        //     key: 'jump',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [20, 21, 22, 23] }),
        //     frameRate: 8,
        //     repeat: -1
        // });
        // this.scene.anims.create({
        //     key: 'jumpkick',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [20, 21, 22, 23, 25, 23, 22, 21] }),
        //     frameRate: 8,
        //     repeat: -1,
        //     repeatDelay: 2000,
        //     duration: 2000,
        // });
        // this.scene.anims.create({
        //     key: 'win',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [30, 31] }),
        //     frameRate: 8,
        //     repeat: -1,
        //     repeatDelay: 2000
        // });
        // this.scene.anims.create({
        //     key: 'die',
        //     frames: this.scene.anims.generateFrameNumbers(name, { frames: [35, 36, 37] }),
        //     frameRate: 8,
        // });

    };

}