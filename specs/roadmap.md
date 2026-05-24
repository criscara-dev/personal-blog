# Roadmap

> The task list. The agent works these top to bottom. Each task is a trip
> through the feature loop (spec → implement → validate).
>
> KEY DISCIPLINE: write each task detailed enough to act on directly. A good
> task line carries its own what + why + a hint of acceptance. If a task is too
> big to express in a few bullet points, it's not a task — it's a phase. Break
> it down, OR write a dedicated spec.md for it (see spec.md template).
>
> Tick `- [x]` when validated. Leave `- [ ]` until acceptance criteria pass.
> "Do the next unticked task" should always give the agent enough to work with.

## Phase 1 — Foundation

### 1.1 Repo & scaffold

- [x] Initialise the repo with Eleventy via npm. Acceptance:
      `npx @11ty/eleventy --serve` boots locally and renders an empty index
      page from a hand-written base layout.
- [x] Configure `.eleventy.js` (input/output dirs, permalink pattern,
      markdown engine) and put site metadata (title, description, author)
      in `_data/site.json`. Acceptance: a built page reads metadata from
      `_data/site.json`; post URLs match the chosen permalink pattern
      (e.g. `/:year/:month/:day/:slug/`).
- [x] Set up the GitHub Actions workflow that builds with Eleventy and
      deploys the artifact to GitHub Pages. Acceptance: pushing to `main`
      produces a green Actions run and the built site is live at the Pages
      URL.
- [x] Wire the custom domain and enforce HTTPS via GitHub Pages settings
      (CNAME file + DNS). Acceptance: the domain serves the site over HTTPS
      with a valid certificate.

### 1.2 Site primitives

- [x] Implement the dark/light toggle in vanilla JS: persisted in
      `localStorage`, respects `prefers-color-scheme` on first visit, applied
      before first paint to avoid FOUC. Acceptance: toggle flips theme,
      choice persists across reloads, no white flash on a hard reload in
      dark mode.

## Phase 2 — Design

### 2.1 Typography & colour

- [x] Establish typography (system font stack, base sizes, line-height,
      max content width) in our base SCSS, applied to our own layouts.
      Acceptance: a sample post renders with the chosen scale on both
      desktop and mobile.
- [x] Define light and dark colour tokens as CSS variables. Acceptance:
      switching theme swaps every colour without per-component overrides;
      links, borders, code blocks all adapt.

### 2.2 Layout

- [x] Build the homepage layout from scratch as a single chronological post
      list — H4 title with a muted date below, mirroring the bcantrill
      aesthetic. Acceptance: homepage shows only nav, post list, and footer;
      nothing else.
- [x] Build the navigation: `[Blog Name] | About | LIGHT/DARK`. Acceptance:
      header is a single row, no hamburger on mobile, not sticky.

## Phase 3 — Content structure

### 3.1 Pages & taxonomy

- [x] Define the post front-matter convention and the four mutually
      exclusive categories: `tech`, `practice`, `art`, `other`. Acceptance:
      a post tagged `tech` is collected and appears at `/categories/tech/`.
- [x] Build the About page at `/about/`. Acceptance: page renders via the
      page layout with no sidebar and no photo requirement.
- [x] Author 2–3 seed posts (one per active domain) to validate the writing
      flow end-to-end. Acceptance: posts render correctly, category links
      work, dates display in the chosen format.

## Phase 4 — Polish

### 4.1 SEO, feeds, footer

- [x] Wire RSS, sitemap, and SEO meta. Use `@11ty/eleventy-plugin-rss` for
      the feed; hand-write the sitemap template; put SEO meta tags in the
      base layout. Acceptance: `/feed.xml` and `/sitemap.xml` are valid;
      per-page `<meta description>` and Open Graph tags are present.
- [x] Build the minimal footer with inline SVG icons (LinkedIn, GitHub, X,
      RSS), gated by social keys in `_data/site.json`. Acceptance: only
      configured links appear; icons inherit `--muted` and hover to `--fg`;
      every link has an `aria-label`.

### 4.2 Quality pass

- [x] Mobile review across the homepage, a post, and the About page.
      Acceptance: no horizontal scroll on a 360px-wide viewport; tap
      targets ≥ 44px; text remains readable.
- [x] Final FOUC check (theme applied before first paint via inline init
      in `<head>`). Acceptance: hard reload in dark mode shows no white
      flash.

### 4.3 Header & footer refinements

- [x] Replace the nav site-title text link with an inline home-icon SVG
      linking to `/`. Acceptance: the icon inherits the nav styling, remains
      keyboard-focusable, and the link has `aria-label="Home"`.
- [x] Replace the `LIGHT`/`DARK` text theme toggle with inline sun/moon SVG
      icons that swap with the active theme. Acceptance: the toggle JS leaves
      no visible text behind, the icon updates immediately on click and on
      initial load, and the control keeps an accessible `aria-label`.
- [x] Correct the footer attribution to read exactly `© Cristian Caratti`
      followed by a new line reading `Powered by Eleventy`. Acceptance: the
      two footer lines render in that order across pages.

### 4.4 Nav and typography polish

- [x] Rebalance the nav so the home icon stays on the left while the About
      link and theme toggle sit on the far right. Acceptance: header remains a
      single non-sticky row, no hamburger is introduced, and all tap targets
      remain at least 44px.
- [x] Update the body font stack to a more characterful Avenir-led system
      sans-serif stack. Acceptance: no font assets, CDNs, or dependencies are
      added; unavailable fonts fall back to the existing system sans stack.

## Phase 5 — Launch

### 5.1 Go live

- [x] Submit the sitemap to Google Search Console and verify the domain.
      Acceptance: Search Console reports the sitemap as successfully read.
- [x] Announce. Acceptance: domain serves the published site, RSS works,
      first post is dated and live.

---

## Replan log

> When you DO replan (the rare "yes" at the decision gate), jot one line here.
> Not ceremony — just a breadcrumb trail so future you knows why the
> constitution changed. If this log fills up fast, your plan was too thin.

- 2026-05-23 — Swapped SSG from Jekyll/Chirpy to Eleventy with hand-written
  Nunjucks layouts. Eleventy fits the JS toolchain, removes the Ruby
  version-conflict risk, and minimal custom layouts suit a bare text-first
  aesthetic better than stripping a heavy theme. Build/deploy moves from
  Pages-native Jekyll to GitHub Actions → Pages.
