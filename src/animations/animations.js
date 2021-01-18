const animations = {

    createEnimies(scene, name) {

        return {
            walk: {
                key: 'walk',
                frames: scene.anims.generateFrameNumbers(name, { frames: [0, 1, 2, 3] }),
                frameRate: 8,
                repeat: -1
            },
            idle: {
                key: 'idle',
                frames: scene.anims.generateFrameNumbers(name, { frames: [5, 6, 7, 8] }),
                frameRate: 8,
                repeat: -1,
                duration: 1000
            },
            kick: {
                key: 'kick',
                frames: scene.anims.generateFrameNumbers(name, { frames: [10, 11, 12, 13, 10] }),
                frameRate: 8,
                repeat: -1,
                repeatDelay: 2000,
                duration: 2000,
            },
            punch: {
                key: 'punch',
                frames: scene.anims.generateFrameNumbers(name, { frames: [15, 16, 17, 18, 17, 15] }),
                frameRate: 8,
                repeat: -1,
                repeatDelay: 2000,
                duration: 2000,
            },
            jump: {
                key: 'jump',
                frames: scene.anims.generateFrameNumbers(name, { frames: [20, 21, 22, 23] }),
                frameRate: 8,
                repeat: -1
            },
            jumpkick: {
                key: 'jumpkick',
                frames: scene.anims.generateFrameNumbers(name, { frames: [20, 21, 22, 23, 25, 23, 22, 21] }),
                frameRate: 8,
                repeat: -1,
                repeatDelay: 2000,
                duration: 2000,
            },
            win: {
                key: 'win',
                frames: scene.anims.generateFrameNumbers(name, { frames: [30, 31] }),
                frameRate: 8,
                repeat: -1,
                repeatDelay: 2000
            },
            die: {
                key: 'die',
                frames: scene.anims.generateFrameNumbers(name, { frames: [35, 36, 37] }),
                frameRate: 8,
            }
        }

    },
    createPlayer(scene, name) {
        console.log(scene.anims)
        return {
            idle: {
                key: 'idle',
                frames: scene.anims.generateFrameNames(name, { prefix: 'Idle__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
                frameRate: 20,
                repeat: -1
            },
            run: {
                key: 'run',
                frames: scene.anims.generateFrameNames(name, { prefix: 'Run__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
                frameRate: 30,
                repeat: -1
            },
        }


    }
}
export { animations };