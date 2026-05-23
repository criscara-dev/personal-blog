# Tech Stack

> THE GUARDRAIL. This is the file that stops the agent from introducing random
> libraries or patterns mid-build. Every choice has a one-line rationale — the
> "why" matters as much as the "what", because it tells the agent (and future
> you) when a choice can be revisited and when it can't.
>
> Format: a table of Layer | Choice | Why. Keep it scannable.

## Overview

Static Eleventy (11ty) site rendered to plain HTML/CSS, hosted on GitHub Pages
and deployed via GitHub Actions. Content authored in markdown. Layouts are
hand-written in Nunjucks/HTML — no pre-built theme. Near-zero JS — vanilla
only, currently just for the dark/light toggle.

## Frontend

| Layer | Choice | Why |
|---|---|---|
| Generator | Eleventy (11ty) | JavaScript/Node generator — fits the JS toolchain and avoids the Ruby version-conflict risk |
| Language | Markdown (markdown-it, Eleventy's default) | Portable, editor-agnostic, the natural format for long-form writing |
| Layouts | Hand-written minimal Nunjucks/HTML templates | Custom minimal layouts suit a bare, text-first aesthetic better than stripping down a heavy opinionated theme |
| Styling | SCSS | Light nesting/variables for a hand-rolled stylesheet; scoped to our own layouts |
| State management | None | Static site; nothing to manage |
| Forms / validation | None | No interactive forms in v1 |
| Data fetching | None | Everything is build-time |
| JS | Vanilla only | Dark/light toggle and nothing else |

## Backend

| Layer | Choice | Why |
|---|---|---|
| Runtime | GitHub Pages | Free, push-to-deploy, custom domain, free HTTPS via Let's Encrypt |
| API style | None | Static site |
| Database | None | Content is markdown files in the repo |
| ORM / data access | None | — |
| Auth | None | Public, read-only site |

## Tooling & conventions

| Concern | Choice | Why |
|---|---|---|
| Package manager | npm | Standard for Node tooling; `package-lock.json` gives reproducible builds |
| Node version pinning | `.nvmrc` (or `asdf`) | Avoids local Node drift breaking the build |
| Plugins | `@11ty/eleventy-plugin-rss` for the feed; sitemap and SEO meta hand-written into layouts | Keep the dependency surface small — Eleventy gives us enough primitives to do the rest in templates |
| CI / deploy | GitHub Actions → GitHub Pages | Eleventy isn't on the native Pages pipeline (which is Jekyll-only), so we build with Actions and deploy the artifact to Pages |
| Domain | Custom domain (TBD), HTTPS enforced | Configured from day one to avoid migrating links later |
| Fonts | System font stack | No external request; faster, privacy-preserving |
| Icons | Inline SVGs (no icon-font libraries) | Avoids icon-font CDN dependency; size is trivial |
| Testing | None initially | Static markdown — manual review is enough until proven otherwise |
| Linting / formatting | None initially | — |

## Hard rules for the agent

- Do NOT add a new dependency without flagging it and explaining why first.
- Do NOT introduce a JS framework. Vanilla JS only. If a feature seems to need
  a framework, STOP and ask.
- Do NOT add an Eleventy plugin without flagging it and explaining why first.
- Do NOT pull in a pre-built Eleventy theme or starter — layouts stay
  hand-written and minimal.
- Do NOT add Google Fonts, external font CDNs, or icon-font libraries
  (Font Awesome etc.).
- Do NOT add analytics, trackers, cookies, or anything that fires a
  third-party request on page load.
- If a task seems to need a tool not listed here, STOP and ask.
