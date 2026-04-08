import { Scene } from 'phaser';
export class GameScene extends Scene {
    player;
    cursors;
    npcs = {};
    npcWanderState = {};
    currentLoopId = 0;
    constructor() {
        super('GameScene');
    }
    init(data) {
        this.currentLoopId = data.loopId || 0;
    }
    playerDirStr = 'down';
    create() {
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
            // Setup Loop Reset debug key (R)
            this.input.keyboard.on('keydown-R', () => {
                this.triggerLoopReset();
            });
        }
        if (this.currentLoopId === 0) {
            this.dispatchDialogue("July 22nd. I'm back on the island. Everything feels... familiar. Press Space to investigate or R to reset the loop.");
        }
        else {
            this.dispatchDialogue(`Loop ${this.currentLoopId}. I'm back again. The starting point is the same, but for how long?`);
        }
        // Initialize NPCs locally
        for (let i = 0; i < 5; i++) {
            const id = `npc_slime_${i}`;
            this.npcWanderState[id] = { dx: 0, dy: 0, timer: 0 };
            const x = 400 + Math.random() * 400 - 200;
            const y = 300 + Math.random() * 400 - 200;
            const npcSprite = this.physics.add.sprite(x, y, 'slime');
            npcSprite.play('slime-idle-down');
            this.npcs[id] = npcSprite;
        }
    }
    update(time, delta) {
        if (!this.cursors)
            return;
        this.updatePlayerMovement();
        this.updateNpcMovement(delta);
    }
    updatePlayerMovement() {
        const speed = 200;
        this.player.setVelocity(0);
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
    }
    updateNpcMovement(delta) {
        Object.keys(this.npcs).forEach(id => {
            const npc = this.npcs[id];
            const state = this.npcWanderState[id];
            state.timer -= delta;
            if (state.timer <= 0) {
                const rand = Math.random();
                let dirStr = 'down';
                if (Math.abs(state.dx) > Math.abs(state.dy)) {
                    dirStr = 'right';
                }
                else if (state.dy < 0) {
                    dirStr = 'up';
                }
                else {
                    dirStr = 'down';
                }
                if (rand < 0.5) {
                    state.dx = 0;
                    state.dy = 0;
                    npc.play(`slime-idle-${dirStr}`, true);
                }
                else {
                    const angle = Math.random() * Math.PI * 2;
                    state.dx = Math.cos(angle);
                    state.dy = Math.sin(angle);
                    let moveDirStr = 'down';
                    if (Math.abs(state.dx) > Math.abs(state.dy)) {
                        moveDirStr = 'right';
                    }
                    else if (state.dy < 0) {
                        moveDirStr = 'up';
                    }
                    npc.play(`slime-move-${moveDirStr}`, true);
                    npc.setFlipX(state.dx < 0);
                }
                state.timer = 1000 + Math.random() * 2000;
            }
            if (state.dx !== 0 || state.dy !== 0) {
                const speed = 100;
                let nx = npc.x + state.dx * speed * (delta / 1000);
                let ny = npc.y + state.dy * speed * (delta / 1000);
                // Clamp to grass area avoiding water boundaries (32 to 1968)
                nx = Math.max(32, Math.min(1968, nx));
                ny = Math.max(32, Math.min(1968, ny));
                npc.setPosition(nx, ny);
            }
        });
    }
    dispatchDialogue(text) {
        const event = new CustomEvent('show-dialogue', { detail: { text } });
        window.dispatchEvent(event);
    }
    triggerLoopReset() {
        // Visual effects for the loop reset
        this.cameras.main.shake(500, 0.02);
        this.cameras.main.flash(500, 255, 0, 0); // Red flash
        this.dispatchDialogue("Everything is shattering... I'm looping back.");
        // Wait for effects then restart
        this.time.delayedCall(1000, () => {
            // API call to save loop state
            fetch('http://localhost:3001/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loopId: this.currentLoopId + 1, position: { x: 400, y: 300 } })
            }).catch(err => console.error("Could not save game state", err));
            this.scene.restart({ loopId: this.currentLoopId + 1 });
        });
    }
}
