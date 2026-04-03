---
description: Guidelines for developing the 2D narrative game in this repository
---

## Project Overview
This repository contains a single-player narrative 2D sprite game, heavily inspired by "Summer Time Rendering". It uses a monolithic repository structure with `client`, `server`, and `shared` logic, relying entirely on the Node.js ecosystem with TypeScript.

## Tech Stack
- Frontend: Phaser 3 (for rendering and game logic/physics) overlaid with React (for sophisticated UI like menus, dialogues, inventory). Both bundled via Vite.
- Backend: Node.js with Express for handling save states and auth logic.
- Language: Strict TypeScript across the entire monorepo.

## AI Agent Guidelines
When assisting with this repository, AI agents must adhere to the following principles:

1. **Monorepo Awareness**:
   - Always verify if a type or feature should reside in `packages/shared` before creating it in `client` or `server`.
   - Never import server specific modules inside client or vice versa.

2. **Phaser + React Architecture**:
   - Complex interfaces (HUDs, Menus, Dialogues) should be implemented in React and mounted over the canvas in absolute positioning.
   - Phaser scenes should dispatch standard DOM Events or Custom Events that the React layer listens to for synchronization.
   - Maintain logic in Phaser for anything requiring 60 FPS (movement, collisions), and use React merely as a declarative representation of static or slow-moving state.

3. **Time Loop Mechanics**:
   - Assume there's a strict conceptual division between "Persistent State" (what is retained across loops) and "Loop State" (which resets).
   - Ensure components accessing logic handle state restorations elegantly.

4. **Code Quality**:
   - Strive for clean Object-Oriented patterns or ECS (Entity Component System) in the Phaser game engine. Avoid fat scene classes. Keep modular managers for handling Time, Save, and Input.
   - We are currently using **placeholders** for sprites. Use primitive rendering (`Phaser.GameObjects.Rectangle`, `Graphics`) when visual assets are not available.
