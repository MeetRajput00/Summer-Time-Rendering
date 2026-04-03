---
name: Update Project Document Tasks
description: Automatically update the PM, SWE, and QA documentation files to mark items as done and append future tasks.
---

# Update Docs Skill
When you complete tasks and pass verification, you MUST update the project's tracking MD files located in the `docs/` folder:

1. `docs/01_PM_Roadmap_and_Tasks.md`
2. `docs/02_SWE_Architecture_and_Tasks.md`
3. `docs/03_QA_Test_Plan_and_Checklist.md`

## Instructions
- **Mark Complete**: Change `[ ]` to `[x]` for all items that directly relate to the feature you just finished. Be proactive.
- **Add Future Tasks**: When checking off items in a phase or epic, append new logical tasks (e.g., `[ ] TASK-XXX: Implement hitboxes for slimes`) to ensure the backlog is always full and looking ahead.
- Ensure all roles (PM, SWE, QA) have their respective documentation aligned with the current technical state of the project.
- Do this without being explicitly asked by the user after major implementations.
