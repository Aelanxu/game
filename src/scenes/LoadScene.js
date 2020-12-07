import Phaser from 'phaser'
export class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene");
        this.platforms;
        this.player;
        this.cursors;
    }
    preload() {
        this.load.setBaseURL('assets');

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png', { frameWidth: 32, frameHeight: 48 }
        );

    }
    create() {
        this.platforms = this.physics.add.staticGroup();
     
   
        this.add.image(400, 300, 'sky');
      

        this.platforms.create(400,568, 'ground').setScale(2).refreshBody();
        this.add.image(400, 300, 'star');
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // 创建精灵
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
     
    }
    //

    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
   

}