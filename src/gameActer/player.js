//  创建游戏角色动画
const playConfig = {
    matterSprite: null,
    health: 100,
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
    }



};
let SmoothedHorionztalControl = new Phaser.Class({

    initialize:

        function SmoothedHorionztalControl(speed) {
        this.msSpeed = speed;
        this.value = 0;
    },

    moveLeft: function(delta) {
        if (this.value > 0) { this.reset(); }
        this.value -= this.msSpeed * delta;
        if (this.value < -1) { this.value = -1; }

    },

    moveRight: function(delta) {
        if (this.value < 0) { this.reset(); }
        this.value += this.msSpeed * delta;
        if (this.value > 1) { this.value = 1; }
    },

    reset: function() {
        this.value = 0;
    }
});

export { playConfig, SmoothedHorionztalControl }