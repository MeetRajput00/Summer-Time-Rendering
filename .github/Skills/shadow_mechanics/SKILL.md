# Shadow Mechanics: Lore-Specific Gameplay

**SKILL-ID:** `SHADOW-01`
**Description:** Essential patterns for implementing "Summer Time Rendering" specific features like Time Loops and Shadow Combat.

---

## Core Guidelines

### 1. Loop Reset logic
When a player "dies" or fails a core objective:
- **Client:** `scene.restart({ loopId: currentLoopId + 1 })`.
- **Server:** Preserve relevant quest flags but reset player coordinates.
- **Visuals:** Use the "Shatter" effect (Screen shake + Grayscale) to signal a reset.

### 2. Shadow-Hitbox Logic (Base Targeting)
Standard HP damage doesn't apply to Shadows.
- **Rule:** Damage only counts if the `attackHitbox` overlaps with the `shadowPoint` (the circle at the base of the sprite).
- **Implementation:** Offset hit-detection logic downward from the sprite center.

### 3. Copying & Erasing
Ushio's shadow can "Copy" objects (e.g., duplicated weapons, items).
- **Pattern:** Instantiate a mirrored sprite with identical properties and a "Cyan" tint.

### 4. The Observation Eye (Visual Mode)
- Use a **Post-Processing Shader** (Grayscale) to simulate Shinpei's Observation mode.
- Render "Flashback" sprites at 0.5 alpha during this mode.

---

## Example Scenario: Killing a Shadow
1. `onPlayerAttack()`: Calculate the player's front-facing arc.
2. Check if any `NpcState.npcType === 'shadow'`.
3. Perform `physics.overlap(attackHitbox, targetShadowSprite.body.shadowOffset)`.
4. If hit: `playShadowEraseAnim()` -> `server.removeNpc(id)`.

```typescript
// Hit detection
const targetShadow = npc.getShadowHitbox();
if (Phaser.Geom.Intersects.RectangleToRectangle(attack, targetShadow)) {
  this.cameras.main.shake(100, 0.01);
  this.dispatchDialogue("The shadow was erased...");
}
```
