import * as Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
export const initGame = (containerId) => {
    const config = {
        type: Phaser.AUTO,
        parent: containerId,
        width: 800,
        height: 600,
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
                debug: false
            }
        },
        scene: [BootScene, GameScene]
    };
    return new Phaser.Game(config);
};
