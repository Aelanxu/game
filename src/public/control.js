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
export { SmoothedHorionztalControl }