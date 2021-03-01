export const anims = [{
        key: 'e_idle',
        frames: scene.anims.generateFrameNames('enemy', { prefix: 'idle', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
        frameRate: 4,
        repeat: -1
    },
    {
        key: 'e_run',
        frames: scene.anims.generateFrameNames('enemy', { prefix: 'walk', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
        frameRate: 10,
        repeat: -1,
        duration: 1000
    },
    {
        key: 'attacted',
        frames: scene.anims.generateFrameNames('enemy', { prefix: 'attacted', start: 0, end: 0, suffix: '.png', zeroPad: 0 }),
        frameRate: 10,
        repeat: -1

    },
    {
        key: 'attact',
        frames: scene.anims.generateFrameNames('enemy', { prefix: 'attact', start: 0, end: 3, suffix: '.png', zeroPad: 0 }),
        frameRate: 10,
        repeat: 0,
        duration: 1000,


    }


];