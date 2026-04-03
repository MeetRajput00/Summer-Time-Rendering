# Progressive AI Systems: Server-Side Behavior

**SKILL-ID:** `AI-01`
**Description:** Patterns for managing NPC state, wandering logic, and pursuit behavior on the Node.js server.

---

## Core Guidelines

### 1. Server Tick Loop (20Hz)
All NPC calculations must occur within the `setInterval` loop in `packages/server/src/index.ts`.
- **Tick duration:** 50ms (20Hz).
- **Scale:** Scale all movement vectors by `(TICK_RATE / 1000)` to ensure framerate independence.

### 2. State Machine: Wander vs. Pursuit
NPCs should cycle between distinct `Wander` (idle/low speed) and `Pursuit` (fast movement toward player) states.

- **Wander:** Random intervals of 1000-3000ms.
- **Pursuit:** Trigged when `distanceToPlayer < AGGRO_RADIUS`.

### 3. Collision Clamping
NPCs do not use Phaser physics on the server. Clamping to map boundaries is manual.
- **Logic:** `npc.x = Math.max(minX, Math.min(maxX, npc.x))`.

### 4. Animation Synchronization
NPC animations must be updated on the server and broadcasted via the `npcMoved` event to ensure all clients see the same action.

---

## Example Scenario: Adding "Shadow Pursuit"
1. Calculate distance between `npc` and all `players` in the server tick.
2. If `distance < 300`, set `state.dx` and `state.dy` to point toward the closest player.
3. Update `npc.anim` to `[npcType]-move-[dir]`.
4. Broadcast updated `npc` state via `io.emit('npcMoved', npc)`.

```typescript
// Server Tick Logic
const dx = targetPlayer.x - npc.x;
const dy = targetPlayer.y - npc.y;
const dist = Math.sqrt(dx*dx + dy*dy);

if (dist < pursuitRange) {
  // Normalize vector to speed
  state.dx = dx / dist;
  state.dy = dy / dist;
}
```
