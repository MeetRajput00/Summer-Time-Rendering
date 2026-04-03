# QA Test Plan & Quality Checklist

## Overview
As a Quality Analyst, our goal is to ensure the "Summer Time Rendering" MMORPG is highly optimized, visually consistent, and free of game-breaking bugs or networking exploits. Testing an MMORPG requires rigorous scenario-based checklists.

## 1. Functional Testing Checklist
- **Movement & Collision**
  - [x] Player correctly collides with world bounds and static objects (buildings, water, rocks).
  - [x] Player movement speed matches intended design and isn't sped up by diagonal movement.
  - [x] Animations cleanly transition (idle -> move -> attack -> idle).
- **Multiplayer State & NPC Verification**
  - [x] 2+ players connecting to the server immediately see each other.
  - [x] Player disconnection immediately removes their sprite from other connected clients.
  - [x] Slimes randomly navigate autonomously over the maps gracefully synced alongside live client players.
  - [ ] Emotes, dialogues, or attacks accurately synchronize across clients.
- **UI & Interaction**
  - [x] React UI overlays properly above the Phaser Canvas.
  - [x] Spacebar dialogue events trigger correctly and gracefully wipe when cleanly clicked!
  - [ ] **Tilemap Editor Verification**
    - [ ] Tiles can be placed and dragged onto the grid correctly.
    - [ ] Fill tool correctly populates areas with the selected tile.
    - [ ] Collision flags set in the editor are correctly respected by the player in-game.

## 2. Performance & Load Checklist
- **Client-Side Rendering**
  - [ ] Constant 60 FPS in Chrome, Firefox, and Edge under standard configurations.
  - [ ] Canvas element scales correctly in different window sizes without blurriness (manage devicePixelRatio).
  - [ ] No major memory leaks as scenes swap or as new entities spawn/despawn.
- **Server Load**
  - [x] Server remains steady tick rate computing robust AI decisions simultaneously across 20Hz increments.
  - [ ] Server remains steady tick rate when 100+ concurrent players are simulated.
  - [ ] Websocket bandwidth overhead is minimized (only sending deltas rather than the entire state when possible).

## 3. Exploit & Edge-Case Testing
- **Latency / Network Throttling**
  - [ ] Simulate 200ms ping: Verify game is still playable and client-side prediction prevents severe rubber-banding.
  - [ ] Simulate 500ms ping + packet loss: Verify game handles abrupt jumps correctly without crashing client.
- **Security Check**
  - [ ] Ensure clients cannot manipulate their coordinates instantly (speed hack protection on the server).
  - [ ] Ensure clients cannot trigger dialogue/interactions far away from the interaction point.
  - [ ] **SQL/NoSQL Injection**: Server sanitizes all inputs for player names and chat messages.
  - [ ] **Inventory Duplication**: Transactional logic prevents item cloning during simultaneous trades.
  - [ ] **Rate Limiting**: Socket connections are rate-limited per IP to prevent connection flooding.
  - [ ] **Data Encryption**: JWT tokens used for authentication are properly signed and verified.

## 4. Systems & Logic Checklist
- **Inventory & Items**
  - [ ] Items can be picked up, dropped, and moved between inventory slots correctly.
  - [ ] Equipping/Unequipping gear updates player stats and visual sprite (if applicable).
  - [ ] Item durability or stack counts decrement correctly when used or sold.
- **Quest & Progression**
  - [ ] Quests correctly track progress across multiple objectives/stages.
  - [ ] Quest items are only interactable while the quest is active.
  - [ ] Level-up events trigger visual flair and attribute point allocations.
- **AI & Pathfinding**
  - [ ] NPCs correctly navigate around dynamic obstacles or other players.
  - [ ] Pursuit AI loses interest if the player crosses a "tether" distance.
  - [ ] NPC dialogue correctly branches based on player reputation or completed quests.

## Bug Reporting Template (For QA use)
- **Title**: [Feature] Description
- **Steps to Reproduce**: 1... 2... 3...
- **Expected Result**: 
- **Actual Result**:
- **Environment**: OS / Browser / Network Ping

## 4. Active Bug Reports (To Be Fixed)
- [ ] **BUG-001 (Map Rendering)**: The map currently looks visually jumbled rather than a proper tilemap. The `tileSprite` loading needs to be heavily refined to parse actual coordinates mapping seamless environments rather than just generic static repeating textures.
- [ ] **BUG-002 (Sprite Facings)**: When the player moves Left, Right, or Up, the body/face direction does not physically change on the spritesheet. Need to map directional animations (Rows 0-2 for Idle, 3-5 for Walking) precisely corresponding to directional vectors rather than generic flipping.
