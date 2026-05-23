# Tech Stack

> THE GUARDRAIL. This is the file that stops the agent from introducing random
> libraries or patterns mid-build. Every choice has a one-line rationale — the
> "why" matters as much as the "what", because it tells the agent (and future
> you) when a choice can be revisited and when it can't.
>
> Format: a table of Layer | Choice | Why. Keep it scannable.

## Overview

<!-- 1-2 sentences describing the shape of the system.
     Example: "TypeScript-first monorepo on Next.js. React frontend, Next.js API
     routes for the backend. Prioritises type safety and fast iteration." -->

## Frontend

| Layer | Choice | Why |
|---|---|---|
| Framework |  |  |
| Language |  |  |
| Styling |  |  |
| State management |  |  |
| Forms / validation |  |  |
| Data fetching |  |  |

## Backend

| Layer | Choice | Why |
|---|---|---|
| Runtime |  |  |
| API style |  |  |
| Database |  |  |
| ORM / data access |  |  |
| Auth |  |  |

## Tooling & conventions

| Concern | Choice | Why |
|---|---|---|
| Package manager |  |  |
| Testing |  |  |
| Linting / formatting |  |  |
| CI |  |  |

## Hard rules for the agent

<!-- Explicit "do not" instructions. This is where you preempt the classic
     drift problems. Examples:
     - Do NOT add a new dependency without flagging it and explaining why first.
     - Do NOT introduce a state library if local state or Context suffices.
     - Do NOT mix styling approaches — stick to the one above.
     - If a task seems to need a tool not listed here, STOP and ask. -->

- Do not add a new dependency without flagging it and explaining the rationale first.
-
-
