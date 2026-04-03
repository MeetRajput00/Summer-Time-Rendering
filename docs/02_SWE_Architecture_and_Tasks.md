# Senior SWE Architecture & Engineering Tasks

## Architecture Overview
This MMORPG uses a distinct 3-package monorepo design:
- `packages/client`: React (Vite) + Phaser for rendering and UI.
- `packages/server`: Node.js for authoritative game state and real-time networking.
- `packages/shared`: Shared TypeScript types, constants, and math/logic used by both server and client.

## Engineering Task Backlog

### Phase 1: Core Networking & Logic
- **[x] SWE-001**: Set up WebSocket Server. Configured `socket.io` cross-origin within `packages/server`.
- **[x] SWE-002**: Message Protocol. Defined `PlayerState` and `NpcState` payloads for ServerToClient and ClientToServer.
- **[x] SWE-003**: Authoritative Server Loop. Created a fast 20Hz tick updating server simulation mechanics.
- **[x] SWE-004**: Client-side Interpolation. Simulated fluid sprites updating natively tracking internal logic.

### Phase 2: State Management & Data
- **[x] SWE-005**: Game State Management. Handled server entity arrays efficiently using internal Dictionaries.
- **[ ] SWE-006**: Persisting Data. Set up a database (PostgreSQL/Redis) for player accounts, positions, and inventory.
- **[x] SWE-007**: Map Loading. Replaced rigid JSON loading with programmatic `tileSprite` bounds hooking directly into `StaticGroup` Phaser bodies for fast map limits.

### Phase 3: Assets & Tooling
- **[ ] SWE-008**: Build an asset pipeline or constants file in `packages/shared` mapping asset strings to IDs to save bandwidth.
- **[ ] SWE-009**: Implement full sprite animations dynamically using JSON configuration to avoid hardcoding frame numbers in code.
- **[ ] SWE-010**: Integrate Server Spatial Hashing to prevent N^2 broadcasting overheads. 
- [ ] **SWE-011**: Build a Tilemap Editor. Develop a custom drag-and-drop tilemap editor for level design. Features should include background tile placement, filling functionality, and a collision manager to define player-collidable tiles.
- [ ] **SWE-012**: Database Layer. Integrate PostgreSQL for persistent player metadata and Redis for fast session/location lookups.
- [ ] **SWE-013**: Authenticated Messaging. Implement JWT-based socket handshaking to prevent spoofing or unauthorized sessions.
- [ ] **SWE-014**: Asset Loading Manager. Build a system to selectively load and cache assets based on player location to save VRAM.
- [ ] **SWE-015**: Movement Interpolation / Prediction. Implement client-side prediction to remove latency perceived in player movement.
- [ ] **SWE-016**: Server Reconciliation Logic. Allow the server to correct client movement if discrepancies occur beyond thresholds.
- [ ] **SWE-017**: A* Pathfinding. Develop a navigation mesh parser and NPC pathfinder for intelligent movement across complex maps.
- [ ] **SWE-018**: Global Event System. Create a listener architecture to synchronize global states like weather, day-night, or server-wide events.
- [ ] **SWE-019**: State Compression. Optimize the binary protocol for WebSocket packets to reduce bandwidth usage per tick.
- [ ] **SWE-020**: Inventory Storage Engine. Implement transactional item moves between player accounts or containers to prevent dupes.
- [ ] **SWE-021**: Combat Hitbox Detection. Create a spatial hashing grid on the server for fast, accurate collision of attacks and spells.
- [ ] **SWE-022**: FX Engine. Build a reusable particle and shader system in Phaser for visual flair without killing performance.
- [ ] **SWE-023**: Dialogue Scripting. Create a custom YAML-based story engine for complex branching dialogues.
- [ ] **SWE-024**: Dynamic Audio Manager. Implement localized 2D audio panning and fading based on proximity to objects/players.
- [ ] **SWE-025**: Admin Debugging Dashboard. Create an internal tool to observe server metrics, spawn entities, and teleport players.
- [ ] **SWE-026**: Crash Reporting & Logging. Integrate Sentry/Winston for production-grade error aggregation.
- [ ] **SWE-027**: Automated Scalability. Configure PM2 clustering or Node child processes to leverage multi-core CPU availability.
- [ ] **SWE-028**: Asset Pre-pass. Script to automatically generate spritesheet atlases and optimize image sizes for web delivery.
- [ ] **SWE-029**: Hot-Reloading of Game Configs. Allow the server to reload stats/item data without a full process restart.
- [ ] **SWE-030**: WebGL Performance Tuning. Manage draw calls and texture swaps to maintain 60FPS on integrated GPUs.

## Code Quality Checklist
- [ ] Pre-commit hooks set up (Husky/Lint-staged).
- [ ] ESLint and Prettier configured uniformly across all workspaces.
- [x] Type-sharing between client/server is strictly enforced.
- [ ] Github Actions implemented for CI/CD.
