export let gameOption = {
    score: 0,
    gameOver: false,
    platforms: null,
    player: null,
    cursors: null,
    stars: null,
    scoreText: null,
    bombs: null,
    width: 640,
    height: 360,
    loadProgress() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', function() {
            loadingText.destroy();
            percentText.destroy();
        });
    },
    getScreenSize() {
        this.width = window.screen.availWidth;
        this.height = window.screen.availHeight;
    }
}