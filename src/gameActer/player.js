//  创建游戏角色动画
const playConfig = {
    matterSprite: null,
    health: 100,
    sensors: {
        bottom: null,
        left: null,
        right: null
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
        playerController.time.rightDown += delta;
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