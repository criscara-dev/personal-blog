# Spec: <!-- feature name -->

> ON-DEMAND. You do NOT need one of these per task. Reach for a spec.md only
> when a roadmap task is too big or fuzzy to build directly from its one-liner.
> For small, clear tasks, skip this — just tell the agent "do the next unticked
> roadmap task."
>
> This single file folds in the three concerns DL.AI splits across three files:
> Specification (what) + Implementation notes (how, lightly) + Validation
> (acceptance). Copy it, fill it, `@`-reference it in Cursor, build, then delete
> or archive it once the task is ticked.
>
> Stay at the altitude of INTENT, not pseudocode. Describe what and why and what
> "done" looks like. Let the agent write the actual logic — you supervise.

## What

<!-- The feature in 2-3 sentences. What does it do, from the user's point of view? -->

## Why

<!-- Why this feature, why now. How does it serve the mission? This is what lets
     the agent make sensible micro-decisions when your spec doesn't cover a detail. -->

## Scope

**In:**
<!-- What this task includes. Be concrete. -->
-
-

**Out:**
<!-- What this task explicitly does NOT include — pushes back against creep. -->
-

## Implementation notes

<!-- LIGHT touch. Constraints and pointers, not line-by-line logic. Examples:
     - Reuse the existing <Card> component, don't build a new one.
     - This touches the /api/diagnose route — keep the response shape stable.
     - Follow the data model already defined for Patient.
     Leave the actual coding to the agent. If you're writing pseudocode here,
     you've dropped below the supervisor altitude. -->

-
-

## Acceptance criteria

<!-- The "done" checklist. This IS the validation step of the feature loop.
     Each item is testable — a yes/no the agent (and you) can check.
     Examples:
     - [ ] Submitting valid input returns a 200 with the expected shape.
     - [ ] Invalid input shows an inline error, no crash.
     - [ ] Existing tests still pass; new behaviour has at least one test. -->

- [ ]
- [ ]
- [ ]
