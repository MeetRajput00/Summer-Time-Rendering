import { Scene } from 'phaser';
import { io } from 'socket.io-client';
export class GameScene extends Scene {
    player;
    cursors;
    socket;
    otherPlayers = {};
    npcs = {};
    constructor() {
        super('GameScene');
    }
    playerDirStr = 'down';
    create() {
        // Connect to server
        this.socket = io('http://localhost:3001');
        // Create environment backing using frame 0 of plains.png
        this.add.tileSprite(0, 0, 2000, 2000, 'plains', 0).setOrigin(0, 0);
        // Create World Boundaries using frame 0 of water1.png
        const boundaries = this.physics.add.staticGroup();
        // Top & Bottom borders
        for (let x = 0; x <= 2000; x += 32) {
            boundaries.create(x + 16, 16, 'water', 0).setDisplaySize(32, 32).refreshBody();
            boundaries.create(x + 16, 2000 - 16, 'water', 0).setDisplaySize(32, 32).refreshBody();
        }
        // Left & Right borders (skipping corners to avoid overlap)
        for (let y = 32; y < 2000 - 16; y += 32) {
            boundaries.create(16, y + 16, 'water', 0).setDisplaySize(32, 32).refreshBody();
            boundaries.create(2000 - 16, y + 16, 'water', 0).setDisplaySize(32, 32).refreshBody();
        }
        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, 2000, 2000);
        // Apply environmental boundary collisions
        this.physics.add.collider(this.player, boundaries);
        // Play idle animation by default
        this.player.play('player-idle-down');
        this.cameras.main.startFollow(this.player);
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
            // Setup interaction key (Space)
            this.input.keyboard.on('keydown-SPACE', () => {
                this.dispatchDialogue("You inspect the area... It's quiet. Too quiet for July 22nd.");
            });
        }
        this.dispatchDialogue("July 22nd. I'm back on the island. Press Space to investigate and click dialog to dismiss.");
        // Socket Listeners
        this.socket.on('currentPlayers', (players) => {
            Object.keys(players).forEach((id) => {
                if (id !== this.socket.id) {
                    this.addOtherPlayer(players[id]);
                }
            });
        });
        this.socket.on('newPlayer', (playerInfo) => {
            this.addOtherPlayer(playerInfo);
        });
        this.socket.on('playerDisconnect', (id) => {
            if (this.otherPlayers[id]) {
                this.otherPlayers[id].destroy();
                delete this.otherPlayers[id];
            }
        });
        this.socket.on('playerMoved', (playerInfo) => {
            if (this.otherPlayers[playerInfo.id]) {
                const otherSprite = this.otherPlayers[playerInfo.id];
                otherSprite.setPosition(playerInfo.x, playerInfo.y);
                otherSprite.setFlipX(playerInfo.flipX);
                otherSprite.play(playerInfo.anim, true);
            }
        });
        this.socket.on('currentNpcs', (receivedNpcs) => {
            Object.keys(receivedNpcs).forEach((id) => {
                this.addNpc(receivedNpcs[id]);
            });
        });
        this.socket.on('npcMoved', (npcInfo) => {
            if (this.npcs[npcInfo.id]) {
                const npcSprite = this.npcs[npcInfo.id];
                npcSprite.setPosition(npcInfo.x, npcInfo.y);
                npcSprite.setFlipX(npcInfo.flipX);
                npcSprite.play(npcInfo.anim, true);
            }
            else {
                this.addNpc(npcInfo);
            }
        });
    }
    addOtherPlayer(playerInfo) {
        const otherSprite = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'player');
        otherSprite.setFlipX(playerInfo.flipX);
        otherSprite.play(playerInfo.anim);
        this.otherPlayers[playerInfo.id] = otherSprite;
    }
    addNpc(npcInfo) {
        const npcSprite = this.physics.add.sprite(npcInfo.x, npcInfo.y, npcInfo.npcType);
        npcSprite.setFlipX(npcInfo.flipX);
        npcSprite.play(npcInfo.anim);
        this.npcs[npcInfo.id] = npcSprite;
    }
    update() {
        if (!this.cursors)
            return;
        const speed = 200;
        this.player.setVelocity(0);
        // Store old values for changed detection
        const oldX = this.player.x;
        const oldY = this.player.y;
        const oldFlipX = this.player.flipX;
        const oldAnim = this.player.anims.currentAnim?.key;
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
            this.playerDirStr = 'right'; // We flip the 'right' animation visually to achieve 'left'
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
            this.playerDirStr = 'right';
        }
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.playerDirStr = 'up';
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.playerDirStr = 'down';
        }
        // Normalize diagonal movement speed
        const body = this.player.body;
        body.velocity.normalize().scale(speed);
        const isMoving = body.velocity.lengthSq() > 0;
        const currentAnim = isMoving ? `player-move-${this.playerDirStr}` : `player-idle-${this.playerDirStr}`;
        this.player.anims.play(currentAnim, true);
        if (this.player.x !== oldX ||
            this.player.y !== oldY ||
            this.player.flipX !== oldFlipX ||
            currentAnim !== oldAnim) {
            this.socket.emit('playerMovement', {
                x: this.player.x,
                y: this.player.y,
                flipX: this.player.flipX,
                anim: currentAnim
            });
        }
    }
    dispatchDialogue(text) {
        const event = new CustomEvent('show-dialogue', { detail: { text } });
        window.dispatchEvent(event);
    }
}
