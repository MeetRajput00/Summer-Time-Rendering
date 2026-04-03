# Summer Time Rendering: Story & Gameplay Task List

This document outlines the specific narrative and mechanic-driven tasks required to bring the world of "Summer Time Rendering" to life within the game. It complements the technical roadmap in `01_PM_Roadmap_and_Tasks.md`.

## Epic 1: The Cast of Hitogashima (Characters)

Define and implement the core characters with their unique traits and dialogue trees.

- [x] **TASK-S101: Shinpei Ajiro (The Protagonist)**
    - Implement player model with signature blue/red eyes.
    - Set up base stats: High Observation, Moderate Agility, Low physical strength.
- [ ] **TASK-S102: Ushio Kofune (The Shadow/Partner)**
    - Create a "Follower" AI system for Ushio.
    - Implement her "Hair Blade" attack animations.
    - Build mechanics for her to "Copy" objects for the player.
- [ ] **TASK-S103: Mio Kofune (The Sister/Shadow)**
    - Implement both Human Mio (at Kofune Curry) and Shadow Mio (Antagonist).
    - Design Shadow Mio's "Silent Assassination" move (Instant death if caught from behind).
- [ ] **TASK-S104: Hizuru Minakata (The Strategist)**
    - Set up Hizuru (Ryunosuke) as a high-tier combat NPC.
    - Implement her "Switch" mechanic (Visual change to Ryunosuke during combat).
- [ ] **TASK-S105: Haine & Shide (The Antagonists)**
    - Design the "Mother Shadow" boss encounter logic.
    - Implement Shide's multi-armed multi-hit attack patterns.

## Epic 2: The Island of Hitogashima (Places)

Create the layout of the island with interactive transition points.

- [x] **TASK-S201: Hitogashima Port & Arrival Scene**
    - Render the ferry arrival point and the iconic bridge.
    - Set up the "Mio Slams Shinpei" introductory cutscene/dialogue.
- [ ] **TASK-S202: Kofune Curry & Residential Area**
    - Design the interior of the Kofune restaurant.
    - Link the residential alleyways with branching paths.
- [ ] **TASK-S203: Hitoshi Shrine & Mountain Path**
    - Implement the shrine as a "Safe Zone" (Shadows cannot enter).
    - Map the forest trails leading to the Old Clinic.
- [ ] **TASK-S204: The Old Hishigata Clinic**
    - Create the "Hidden Underground" entrance via the examination room.
    - Design the "Shadow Nursery" environment.
- [ ] **TASK-S205: Hiruko Cave (The Sacred Ground)**
    - Map the final descent into the shadow's origin.
    - Implement water/cave hazard tiles.

## Epic 3: Observations & Loops (Special Mechanics)

The core "Time" and "Space" systems of the game.

- [x] **TASK-S301: The Reset Loop (Teleportation)**
    - Implement player "Death" trigger that reloads the `GameScene` at a `LoopCheckpoint`.
    - Create the "Loop Advancement" logic: Every 3 deaths, the starting time moves forward (rendering early quests inaccessible).
    - Design the visual "Shattering" effect when a loop starts.
- [ ] **TASK-S302: Shadow Gateways (Teleportation Points)**
    - Set up "Shadow Puddles" as fast-travel points across the island.
    - Restrict usage to players who have unlocked "Shadow Form" (e.g., assisted by Ushio).
- [ ] **TASK-S303: Observation Eye (Shinpei's Power)**
    - Implement a "Vision Mode" (Grayscale overlay) that highlights interactable objects and invisible shadows.
    - Add "Future Flashback" markers on the map that give hints for puzzles.
- [ ] **TASK-S304: Shadow Eradication (Combat)**
    - Implement the "Kill the Shadow, Kill the Clone" mechanic: Shadows take 0 damage unless the player hits their shadow on the ground.
    - Create the "Shadow Eraser" item class (Nail gun, Shotgun, Flashlight).

## Epic 4: Narrative Progression (Quests)

- [ ] **TASK-S401: Loop 1 - The First Shadow**
    - Dialogue: Meeting Mio, getting copied.
    - Combat: Survive the first encounter with Shadow Mio.
- [ ] **TASK-S402: Loop 2 - Seeking Hizuru**
    - Quest: Identify the riddle in "The Hammer of Minakata".
    - Location: Meet Hizuru at the shrine.
- [ ] **TASK-S403: The Festival Night (Major Event)**
    - Implement a timed event where the "Shadow Erasure" begins.
    - Failure Condition: If the player doesn't reach the shrine by time T, a server-wide "Loop Reset" occurs.

---
*Note: These tasks should be cross-referenced with technical tasks in 01_PM_Roadmap_and_Tasks.md.*
