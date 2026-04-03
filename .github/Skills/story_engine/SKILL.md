# Story & Interaction Engine: Narrative Flow

**SKILL-ID:** `STORY-01`
**Description:** Patterns for managing dialogue, mission triggers, and scene-level narrative events in the Summer Time Rendering game.

---

## Core Guidelines

### 1. Dialogue System
The project uses a **Global Event Dispatcher** to communicate between Phaser and the React UI.
- **Dispatch:** `window.dispatchEvent(new CustomEvent('show-dialogue', { detail: { text } }))`.
- **Dismissal:** Dialogue UI should automatically dismiss on click or `Timeout`.

### 2. Interaction Triggers
Use Phaser's `input.keyboard.on('keydown-SPACE', ...)` for spatial interactions.
- Interaction distance must be calculated between the player and the target NPC/object.

### 3. Quest Registry
Keep track of "Event Flags" (e.g., `hasMetHizuru`, `firstLoopCompleted`).
- State must be saved to the server via the `/api/save` endpoint occasionally.

### 4. Scene-Level Timelines
Narrative events that happen regardless of player action (e.g., The Shadow Festival) should be managed by a **Story Controller** in `GameScene`.

---

## Example Scenario: Triggering an Island Event
1. Detect `collision` or `proximity` between player and a trigger zone.
2. Disable player input: `this.player.setVelocity(0)`.
3. Dispatch `show-dialogue` event with character name and text.
4. Execute narrative logic (e.g., Fade to Black, Move NPC, Start Combat).

```typescript
// GameScene interaction
if (dist < INTERACT_DISTANCE) {
  this.dispatchDialogue("July 22nd. The ferry arrived exactly as it did before...");
  this.cameras.main.flash(500, 255, 255, 255);
}
```
