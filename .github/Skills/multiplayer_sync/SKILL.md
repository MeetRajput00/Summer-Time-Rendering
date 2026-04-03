# Multi-player Synchronization: State & Event Hub

**SKILL-ID:** `SYNC-01`
**Description:** Patterns for maintaining a synchronized world state between the Node.js server and React/Phaser clients.

---

## Core Guidelines

### 1. The `@summer/shared` Contract
All state interfaces (PlayerState, NpcState) and event names must be defined in `packages/shared/src/index.ts`.
- **Constraint:** Never add properties to `PlayerState` in the client/server files without updating the shared interface first.

### 2. Client -> Server (Input)
Clients should emit focused, low-frequency updates.
- **Example:** `playerMovement` should only emit when coordinates or animations change.
- **Protocol:** `socket.emit('playerMovement', { x, y, flipX, anim })`.

### 3. Server -> Client (State & Delta)
The server is the source of truth for all **NPCs** and **other players**.
- Use `socket.broadcast.emit` for player deltas (avoiding self-echo).
- Use `io.emit` for global state changes (Time Loops, major events).

### 4. Tick Rate & Interpolation
- **Server Tick:** 20Hz (50ms).
- **NPC Wandering:** Handled server-side with periodic broadcasts of `npcMoved`.
- **Collision:** Current version uses server-authoritative clamping for NPCs and client-side boundaries for players.

---

## Example Scenario: Adding a "Health" Property
1. Update `PlayerState` interface in `shared/src/index.ts`.
2. Update initial player state in `server/index.ts` under `io.on('connection')`.
3. Broadcast `healthChanged` event from the server when damage occurs.
4. Add listener in `GameScene.ts` to update the player's UI or sprite tint.

```typescript
// Shared
export interface PlayerState {
  id: string;
  hp: number; // [NEW]
  ...
}

// Client
this.socket.on('healthChanged', (data) => {
  if (data.id === this.socket.id) {
    this.updateHpBar(data.hp);
  }
});
```
