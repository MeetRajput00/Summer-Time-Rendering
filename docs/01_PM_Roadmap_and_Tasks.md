# Product Manager Roadmap & Tasks

## Vision
To build a compelling, production-grade 2D browser-based MMORPG inspired by "Summer Time Rendering" using Node.js, React, and Phaser. The game focuses on mystery, dialogue interactions, and a fully synchronized multiplayer world experience.

## Feature Epics & User Stories

### Epic 1: The Foundation (Current Phase)
- **[x] TASK-101**: Initialize monorepo structure (client, server, shared).
- **[x] TASK-102**: Set up Phaser inside a React client.
- **[x] TASK-103**: Hook up local assets (character, skeleton, slime).
- **[x] TASK-104**: Basic movement boundaries and map collision with tilesets.

### Epic 2: Multiplayer & Networking
- **[x] TASK-201**: Implement WebSocket server (using Socket.io).
- **[x] TASK-202**: Share state serialization between Server and Client via `packages/shared`.
- **[x] TASK-203**: Handle arbitrary numbers of connected players.
- **[ ] TASK-204**: Render Player Name Tags floating above character sprites.
- **[ ] TASK-205**: Add global textual chat system synchronizing with UI.

### Epic 3: Game Mechanics & Combat
- **[x] TASK-301**: Build out the interactions/dialogue system UI dismissal logic.
- **[x] TASK-302**: Implement basic server-authoritative wandering AI for slimes.
- **[ ] TASK-303**: Add a synchronized combat system (hitboxes, health points, damage).
- **[x] TASK-304**: Handle player death, respawning, and the time loop thematic element.
- **[ ] TASK-305**: Setup pursuit AI mechanism (enemies chase player on aggro).

### Epic 4: World Building
- **[x] TASK-401**: Configured Map Generation with dynamic array rendering (Plains + Water boundaries).
- **[ ] TASK-402**: Add interactive objects (chests, water sprites).
- **[ ] TASK-403**: Build a minimap or map zoning system to handle large areas.
- **[ ] TASK-404**: Render interactive objects and decorations (trees, buildings) scattered across the plains.
- **[ ] TASK-405**: Develop a Tilemap Editor. Create a browser-based tool to visually layout the map, drag and drop different environment tiles, and define collision areas for the player.
- **[ ] TASK-406**: Implement Day/Night Cycle. Visual overlay darkening or tinting based on server-synced time.
- **[ ] TASK-407**: Dynamic Weather System. Random rain, fog, or mist effects with corresponding ambient sounds.

### Epic 5: Systems & Progression
- **[ ] TASK-501**: Inventory Management UI. Player can view, move, and use items collected in the world.
- **[ ] TASK-502**: Loot & Drops. NPCs spawn items on death with randomized rarity tables.
- **[ ] TASK-503**: Quest Registry. Track active, completed, and failed quests for the "Summer Time Rendering" story.
- **[ ] TASK-504**: Stat Progression. XP and Leveling mechanics with health/stamina increases.
- **[ ] TASK-505**: Skill Tree / Abilities. Unlockable active and passive skills for combat and utility.
- **[ ] TASK-506**: Shop Interaction. Speak with NPCs to buy/sell items using island currency.
- **[ ] TASK-507**: Trading System. Secure item/currency exchange between two live players.
- **[ ] TASK-508**: Party/Guild Management. Grouping logic for shared XP and quests.

### Epic 6: Multimedia & Final Polish
- **[ ] TASK-601**: Original Sound Tracks (OST). Integrate looping background music per zone.
- **[ ] TASK-602**: Sound FX Library. Footsteps, attacks, UI clicks, and ambient environment sounds.
- **[ ] TASK-603**: Title Screen & Login UI. Professional landing page with account creation.
- **[ ] TASK-604**: Performance Profiling. Ensure smooth 60fps on low-end hardware.
- **[ ] TASK-605**: Multi-Language Support. Localization system (Japanese, English, etc.).
- **[ ] TASK-606**: Deployment Pipeline. Automated staging and production releases.

## Checklists for Next Sprint
- [x] Finalize server architecture choice (authoritative websockets).
- [x] Get a second player model rendering across two browser instances.
- [ ] Implement Phaser Camera configurations for large maps.
- [ ] Determine user authentication flow.

---

## Story & Mechanics Integration

For the narrative-driven tasks (Characters, Locations, Powers, and Time Loops), please refer to the specialized document:
- [02_Story_and_Gameplay_Tasks.md](file:///e:/Projects/Summer%20Time%20Rendering/docs/02_Story_and_Gameplay_Tasks.md)
