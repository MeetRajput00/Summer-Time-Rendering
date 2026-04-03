# 🧾 Issue Template — Agent-Executable Specification

> This template is designed for AI agents using MCP (GitHub, Memory, Sequential Thinking).
> It must be filled with precision. Avoid ambiguity.

---

# 🏷️ Issue Type

* [ ] Feature
* [ ] Bug
* [ ] Refactor
* [ ] Research

---

# 🧠 Context

## Problem / Goal

Describe **what needs to happen**, not how.

* What is the expected behavior?
* Why is this needed?

---

## System Scope

Specify where this applies:

* [ ] Client (Phaser)
* [ ] Client (React UI)
* [ ] Server (Node/Express)
* [ ] Shared (Types / Logic)

---

## Related Systems

List affected systems:

* Time Loop System
* Save System
* Input System
* Physics / Collision
* Dialogue System
* Rendering
* Other: ___

---

# ⚙️ Requirements (Strict)

## Functional Requirements

* [ ] Clearly defined behavior
* [ ] Deterministic across runs
* [ ] Compatible with time-loop reset model

---

## Non-Functional Requirements

* [ ] No cross-boundary imports (client/server)
* [ ] Types defined in `shared` where applicable
* [ ] No performance regression (60 FPS safe)
* [ ] No hidden global state

---

# 🧩 Implementation Constraints

## Architecture Rules

* Phaser handles:

  * simulation
  * physics
  * real-time updates

* React handles:

  * UI only
  * no direct state mutation

---

## State Rules

* Must define:

  * Persistent State (if any)
  * Loop State (resettable)

---

## Data Ownership

Explicitly define:

* Source of truth:
* Who mutates it:
* Who reads it:

---

# 📦 Expected Changes

## Files / Modules

List expected areas of modification:

* `packages/client/...`
* `packages/server/...`
* `packages/shared/...`

---

## New Types / Interfaces

Define or reference:

```ts
// Example
type CollisionResult = {
  entityId: string;
  collidedWith: string;
};
```

---

# 🔌 MCP Usage Requirements (MANDATORY)

Agent MUST:

## 1. GitHub MCP

* Read existing code before modifying
* Avoid duplicate implementations

## 2. Sequential Thinking MCP

* Plan implementation before coding

## 3. Memory MCP

* Store key decisions if architectural

---

# 🧪 Acceptance Criteria (Testable)

Define **observable outcomes**:

* [ ] Feature behaves as expected
* [ ] No regression in existing systems
* [ ] Works across multiple loop resets
* [ ] Deterministic behavior verified

---

# 🔁 Repro Steps (FOR BUGS ONLY)

If Issue Type = Bug:

## Steps to Reproduce

1.
2.
3.

## Expected Behavior

## Actual Behavior

## Frequency

* [ ] Always
* [ ] Sometimes
* [ ] Rare

---

# 📊 Edge Cases

List known edge cases:

*
*

---

# 🚫 Anti-Patterns to Avoid

* Mutating loop state instead of reconstructing
* Mixing React and Phaser responsibilities
* Introducing implicit state

---

# 🧭 Implementation Notes (Optional)

Hints, constraints, or references.

---

# 🎯 Definition of Done

* [ ] Code follows architecture rules
* [ ] Deterministic across loops
* [ ] No duplicated types
* [ ] Proper separation of concerns
* [ ] MCP tools used during implementation

---

# 🤖 Agent Instruction (IMPORTANT)

When using this issue:

1. Fetch full repository context via GitHub MCP
2. Plan using Sequential Thinking MCP
3. Validate architecture constraints before coding
4. Implement incrementally
5. Verify against Acceptance Criteria

---
