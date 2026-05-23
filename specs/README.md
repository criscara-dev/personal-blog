# Spec-driven framework (solo build)

A lightweight framework for building with an AI agent — the structure of how
real engineers work (principles first, then feature-by-feature with review
gates), without the team-scale ceremony.

Borrowed mental model from the DeepLearning.AI / JetBrains course (constitution
→ feature loop → replan), kept lightweight in the spirit of OpenSpec. The
single-file spec and per-project setup are tuned for a solo Cursor workflow.

## The files

| File | What | When you touch it |
|---|---|---|
| `mission.md` | What & why of the project | Write once. Rarely. |
| `tech-stack.md` | The guardrail — stack + rules | Write once. On replan only. |
| `roadmap.md` | The task list | Tick tasks as you go; add tasks as needed. |
| `spec.md` | Per-task working doc (template) | On demand — only for big/fuzzy tasks. |
| `.cursor/rules/constitution.mdc` | Makes the constitution always-on | Set once per project. |

## The mental model

```
Constitution (mission + tech-stack + roadmap)
        │
        ▼
   Roadmap = tasks A, B, C ...
        │
        ▼  (for each task)
   ┌─ Feature loop ──────────────┐
   │  spec → implement → validate │
   └──────────────┬───────────────┘
                  ▼
        anything changed?
         ├─ no  → next task          (usual)
         └─ yes → replan constitution (rare)
```

The "anything changed?" gate is a half-second mental check after each task —
not a process. Most laps it's "no". Frequent "yes" means the plan was too thin.

## Daily workflow in Cursor

1. **One-time setup:** drop these files in your project root. The
   `.cursor/rules/constitution.mdc` makes mission + tech-stack + roadmap
   load automatically in every chat (any model).
2. **Each task:** tell the agent *"do the next unticked roadmap task."* It
   confirms which task, then builds.
3. **Big/fuzzy task only:** copy `spec.md`, fill it, `@`-reference it, then build.
4. **After validating:** tick the task in `roadmap.md`. Hit the mental gate —
   anything changed? Usually no → next task. Rarely yes → edit the constitution,
   log one line in the roadmap's replan log, continue.

## Two things that keep you safe

- **Files only work when loaded.** "The file exists" ≠ "the model follows it."
  The constitution is always-on via Rules; the spec you attach by hand. A fresh
  model in a new chat with nothing loaded will improvise — don't let it.
- **Stay at intent altitude.** Specs describe what + why + acceptance. The agent
  writes the code. If you're writing pseudocode, you've stopped supervising and
  started doing its job.
