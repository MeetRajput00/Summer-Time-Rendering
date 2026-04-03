# Phaser Mastery: 2D Scene & Sprite Engine

**SKILL-ID:** `PHASER-01`
**Description:** Essential patterns for managing sprites, animations, and scenes in the Summer Time Rendering Phaser environment.

---

## Core Guidelines

### 1. Scene Structure
Always separate **Preload** logic from **Create** logic.
- Assets must be loaded in `BootScene.ts`.
- Gameplay objects and input listeners belong in `GameScene.ts`.

### 2. Multi-Directional Animations
Animations must follow the `[entity]-[action]-[direction]` naming convention.
- **Actions:** `idle`, `move`, `attack`, `death`.
- **Directions:** `up`, `down`, `right`.
- **Note:** Left is handled via `sprite.setFlipX(true)` with the `right` animation.

**Example Implementation:**
```typescript
const isMoving = player.body.velocity.lengthSq() > 0;
const anim = isMoving ? `player-move-${dir}` : `player-idle-${dir}`;
player.play(anim, true);
```

### 3. Physics & Boundaries
The game uses **Arcade Physics**.
- Boundaries are often represented by `StaticGroup` tileSprites (Water/Walls).
- Always normalize diagonal movement to prevent "speed boost" bugs.

```typescript
const body = this.player.body as Phaser.Physics.Arcade.Body;
body.velocity.normalize().scale(speed);
```

### 4. World Camera
- The main camera must `startFollow` the local player.
- Ensure `setBounds` matches the server-synced map dimensions (default 2000x2000).

---

## Example Scenario: Adding a New Character
1. Load atlas in `BootScene`.
2. Instantiate sprite in `GameScene.create()`.
3. Add to `this.physics.add.collider(target, boundaries)`.
4. Define animation sequences in a `static` registry or helper.
