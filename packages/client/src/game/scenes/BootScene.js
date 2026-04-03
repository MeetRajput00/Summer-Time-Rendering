import { Scene } from 'phaser';
export class BootScene extends Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        // Load character spritesheets
        this.load.spritesheet('player', '/assets/sprites/characters/player.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.spritesheet('enemy', '/assets/sprites/characters/skeleton.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.spritesheet('slime', '/assets/sprites/characters/slime.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        // Load environment tiles
        this.load.spritesheet('plains', '/assets/sprites/tilesets/plains.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('water', '/assets/sprites/tilesets/water1.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }
    create() {
        const dirs = ['down', 'right', 'up'];
        // Player Animations (6 cols)
        dirs.forEach((dir, i) => {
            this.anims.create({
                key: `player-idle-${dir}`,
                frames: this.anims.generateFrameNumbers('player', { start: i * 6, end: i * 6 + 5 }),
                frameRate: 6,
                repeat: -1,
            });
            this.anims.create({
                key: `player-move-${dir}`,
                frames: this.anims.generateFrameNumbers('player', { start: (i + 3) * 6, end: (i + 3) * 6 + 5 }),
                frameRate: 8,
                repeat: -1,
            });
        });
        // Slime Animations (7 cols)
        dirs.forEach((dir, i) => {
            this.anims.create({
                key: `slime-idle-${dir}`,
                frames: this.anims.generateFrameNumbers('slime', { start: i * 7, end: i * 7 + 6 }),
                frameRate: 6,
                repeat: -1,
            });
            this.anims.create({
                key: `slime-move-${dir}`,
                frames: this.anims.generateFrameNumbers('slime', { start: (i + 3) * 7, end: (i + 3) * 7 + 6 }),
                frameRate: 8,
                repeat: -1,
            });
        });
        this.scene.start('GameScene');
    }
}
