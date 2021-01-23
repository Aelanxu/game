function animations(scene, name) {
    let enemy = {
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

    }

    let renzhe = {
        idle: {
            key: 'E_idle',
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
        attack: {
            key: 'attack',
            frames: scene.anims.generateFrameNames(name, { prefix: 'Attack__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 30,
            repeat: 0,
            duration: 2000,
        },
        throw: {
            key: 'throw',
            frames: scene.anims.generateFrameNames(name, { prefix: 'Throw__', start: 0, end: 9, suffix: '.png', zeroPad: 3 }),
            frameRate: 30,
            repeat: -1
        },
    }

    let keyName = name;
    switch (keyName) {
        case 'renzhe':
            return renzhe;
            break;
        case 'enemy':
            return enemy;
            break;
    }







};


export { animations };