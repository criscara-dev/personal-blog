# Personal Blog — Architecture & Build Specification

**Stack:** Jekyll (SSG) \+ GitHub Pages \+ Markdown  
**Reference aesthetic:** [bcantrill.dtrace.org](https://bcantrill.dtrace.org) — text-first, minimal chrome, fast  
**Theme base:** Chirpy (heavily customised)  
**Author:** Cristian \[your surname\]

---

## 1\. Goals & Principles

- Writing-first: the post list and reading experience are the primary UI  
- No visual noise: no sidebars, no widgets, no social share clutter  
- Three domains, one voice: tech, physical practice, art — unified under one personal brand  
- Dark/light toggle: user-controlled, persistent via `localStorage`  
- Fast and accessible: no JS frameworks, minimal JS, semantic HTML  
- Owned infrastructure: custom domain, no vendor lock-in beyond GitHub Pages

---

## 2\. Tech Stack

| Layer | Choice | Reason |
| :---- | :---- | :---- |
| SSG | Jekyll 4.x | Native GitHub Pages support, markdown-first, no build server needed |
| Hosting | GitHub Pages | Free, CI/CD on push, custom domain support |
| Theme base | Chirpy | Category/tag support, dark mode, good typography baseline |
| Markup | Markdown (kramdown) | Portable, editor-agnostic |
| Styling | SCSS (override Chirpy) | Scoped customisation without forking |
| JS | Vanilla only | Dark/light toggle; nothing else |
| Domain | Custom (TBD) | yourname.com or similar — configure from day one |

---

## 3\. Repository Structure

my-blog/

├── \_config.yml               \# Site-wide config

├── \_posts/                   \# All blog posts

│   └── YYYY-MM-DD-title.md

├── \_pages/

│   └── about.md              \# About page

├── \_layouts/

│   ├── default.html          \# Base layout

│   ├── home.html             \# Homepage post list

│   └── post.html             \# Single post

├── \_includes/

│   ├── head.html             \# \<head\> block

│   ├── header.html           \# Nav: title | About | \[LIGHT/DARK\]

│   └── footer.html           \# Minimal: RSS \+ optional socials

├── assets/

│   ├── css/

│   │   └── main.scss         \# Imports \+ overrides

│   ├── js/

│   │   └── theme-toggle.js   \# Dark/light switch logic

│   └── img/                  \# Static images (favour srcset)

├── Gemfile                   \# Jekyll \+ plugins

├── Gemfile.lock

├── .github/

│   └── workflows/

│       └── pages.yml         \# GitHub Actions deploy (if using custom plugins)

└── index.html                \# Homepage (uses home layout)

---

## 4\. Configuration (`_config.yml`)

title: "\[Your Blog Name\]"

description: "Tech, art, and physical practice."

url: "https://yourdomain.com"

baseurl: ""

author:

  name: "Cristian \[Surname\]"

\# Build

markdown: kramdown

highlighter: rouge

permalink: /:year/:month/:day/:title/

\# Plugins (GitHub Pages whitelist)

plugins:

  \- jekyll-feed

  \- jekyll-seo-tag

  \- jekyll-sitemap

\# Pagination (optional — only if you want paginated home)

\# paginate: 20

\# paginate\_path: "/page:num/"

\# Exclude from build

exclude:

  \- Gemfile

  \- Gemfile.lock

  \- README.md

  \- node\_modules

---

## 5\. Taxonomy

Four categories — mutually exclusive per post. Use Jekyll's native `categories` front matter field.

| Category | Slug | Scope |
| :---- | :---- | :---- |
| Tech | `tech` | Software, AI, engineering, tools, dev work |
| Physical Practice | `practice` | Training, PT, bouldering, kenjutsu, movement philosophy |
| Art | `art` | Painting, sculpture, classical technique, process |
| Other | `other` | Everything else — career, life, thinking out loud |

**Implementation:** categories will be filterable on the home page via simple anchor links (no JS filter needed — link to `/categories/tech/` etc.). Tags within categories are optional and can be added later.

### Post Front Matter Template

\---

layout: post

title: "Post Title Here"

date: YYYY-MM-DD HH:MM:SS \+0000

categories: \[tech\]          \# one of: tech, practice, art, other

tags: \[ai, jekyll\]          \# optional, freeform

description: "Short summary for SEO and post list subtitle"

\---

---

## 6\. Pages

### 6.1 Homepage (`/`)

- Layout: `home`  
- Content: chronological post list, all categories combined  
- Each entry: `#### Post Title` \+ date below (bcantrill style — title dominant, date subordinate)  
- Optional: category badge/label as a subtle tag next to title  
- No pagination initially — full list, user scrolls  
- Nav: `[Blog Name]` (left) | `About` | `LIGHT / DARK` (right)

### 6.2 About (`/about/`)

- Layout: `page`  
- Static markdown file at `_pages/about.md`  
- Free-form: who you are, what the three domains are, what to expect  
- No sidebar, no photo requirement — text-first

### 6.3 Category Pages (auto-generated)

- Jekyll generates `/categories/tech/`, `/categories/art/` etc. via plugin or custom `_layouts/category.html`  
- Linked from nav or a thin sub-nav line on homepage

---

## 7\. Design Specification

### 7.1 Typography

- Body font: system font stack — `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`  
- Monospace (code): `"JetBrains Mono", "Fira Code", monospace`  
- No Google Fonts (avoids external request, faster, privacy-preserving)  
- Base font size: 18px on desktop, 16px mobile  
- Line height: 1.7 (long-form reading comfort)  
- Max content width: 680px (tight column, reading-optimised)

### 7.2 Colour Tokens

// Light mode

\--bg:        \#ffffff;

\--fg:        \#1a1a1a;

\--muted:     \#666666;

\--accent:    \#1a1a1a;    // links same as text, underlined

\--border:    \#e5e5e5;

\--code-bg:   \#f5f5f5;

// Dark mode

\--bg:        \#0f0f0f;

\--fg:        \#e8e8e8;

\--muted:     \#888888;

\--accent:    \#e8e8e8;

\--border:    \#2a2a2a;

\--code-bg:   \#1a1a1a;

Accent colour (links, hover) can be a single muted tone — charcoal, slate, or a very desaturated warm — decided during build. Avoid bright colours.

### 7.3 Dark/Light Toggle

- Button label: `LIGHT` or `DARK` (text, no icon required — matches bcantrill)  
- Behaviour: toggles `data-theme="dark"` on `<html>`, CSS variables handle the rest  
- Persistence: `localStorage.setItem("theme", "dark|light")`  
- Default: respect `prefers-color-scheme` on first visit

// assets/js/theme-toggle.js

const toggle \= document.getElementById("theme-toggle");

const root \= document.documentElement;

const saved \= localStorage.getItem("theme");

const preferred \= window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initial \= saved || preferred;

root.setAttribute("data-theme", initial);

toggle.textContent \= initial \=== "dark" ? "LIGHT" : "DARK";

toggle.addEventListener("click", () \=\> {

  const next \= root.getAttribute("data-theme") \=== "dark" ? "light" : "dark";

  root.setAttribute("data-theme", next);

  localStorage.setItem("theme", next);

  toggle.textContent \= next \=== "dark" ? "LIGHT" : "DARK";

});

### 7.4 Navigation

\[Blog Name / Logo text\]          About   DARK

- No hamburger menu on mobile — items collapse gracefully in a single line  
- No sticky header — static, scrolls away  
- Separator between About and toggle: `|` or just spacing

### 7.5 Post List (homepage)

Mirrors bcantrill exactly:

\#\#\# Posts

\#\#\#\# Post Title One

Jan 8, 2026

\#\#\#\# Post Title Two

Dec 31, 2025

- Titles are H4 and are links  
- Date is small, muted, below title  
- No excerpt, no image thumbnail, no category badge on this view (clean)  
- Category filter links available above the list as a thin nav row (optional v2)

---

## 8\. Local Development Setup

\# Prerequisites: Ruby 3.x, Bundler

gem install bundler

\# Clone repo

git clone https://github.com/yourusername/your-blog.git

cd your-blog

\# Install dependencies

bundle install

\# Serve locally with live reload

bundle exec jekyll serve \--livereload

\# Preview at http://localhost:4000

### Gemfile

source "https://rubygems.org"

gem "jekyll", "\~\> 4.3"

gem "jekyll-chirpy", "\~\> 7.0"   \# or use chirpy as remote\_theme

gem "jekyll-feed"

gem "jekyll-seo-tag"

gem "jekyll-sitemap"

group :jekyll\_plugins do

  gem "jekyll-feed"

  gem "jekyll-seo-tag"

end

**Note:** Chirpy can be used as a `remote_theme` (no local files needed) or as a gem. Using it as a gem gives you more control over overrides. Decide during setup.

---

## 9\. Deployment

### Option A — GitHub Pages Native (simplest)

1. Push to `main` branch  
2. In repo Settings → Pages → Source: `Deploy from branch` → `main` → `/ (root)`  
3. GitHub auto-builds with Jekyll  
4. **Constraint:** only GitHub Pages whitelisted plugins work (jekyll-feed, seo-tag, sitemap are all OK)

### Option B — GitHub Actions (full control)

Use if you need plugins outside the whitelist, or want explicit build control.

\# .github/workflows/pages.yml

name: Deploy Jekyll site

on:

  push:

    branches: \["main"\]

jobs:

  build-deploy:

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v4

      \- uses: actions/configure-pages@v5

      \- uses: ruby/setup-ruby@v1

        with:

          ruby-version: "3.2"

          bundler-cache: true

      \- run: bundle exec jekyll build

      \- uses: actions/upload-pages-artifact@v3

      \- uses: actions/deploy-pages@v4

**Recommendation:** Start with Option A. Move to Option B only if you hit a plugin constraint.

### Custom Domain Setup

1. Add `CNAME` file to repo root containing `yourdomain.com`  
2. In GitHub Pages settings, set custom domain  
3. At your DNS provider: add `A` records pointing to GitHub Pages IPs, or `CNAME` for `www`  
4. Enable "Enforce HTTPS" in GitHub settings (free Let's Encrypt cert)

---

## 10\. Writing Workflow

### Preferred (local):

1\. Write post in VS Code or Obsidian as .md

2\. Preview with \`bundle exec jekyll serve\`

3\. git add, commit, push → auto-deploy

### Lightweight (browser-only):

1\. Open GitHub → \_posts/ → Create new file

2\. Name: YYYY-MM-DD-title.md

3\. Write markdown → Commit directly to main → auto-deploy

Use the browser workflow for quick notes/thoughts. Use local for longer posts where you want to preview rendering, code blocks, etc.

---

## 11\. SEO & Feeds

- `jekyll-seo-tag` handles `<title>`, `<meta description>`, Open Graph automatically — populate `description` in each post's front matter  
- `jekyll-feed` generates `/feed.xml` — link it in footer  
- `jekyll-sitemap` generates `/sitemap.xml` — submit to Google Search Console  
- No analytics initially (keep it simple); add Plausible (privacy-first, no cookies) later if needed

---

## 11b. Footer

Minimal single-row footer. SVG icons only — no icon font libraries (no Font Awesome, no external CDN dependency).

**Links to include (left to right):**

| Icon | Destination | Config key |
| :---- | :---- | :---- |
| LinkedIn | `https://linkedin.com/in/[your-handle]` | `social.linkedin` |
| GitHub | `https://github.com/[your-username]` | `social.github` |
| X (Twitter) | `https://x.com/[your-handle]` | `social.x` |
| RSS | `/feed.xml` (auto-generated by jekyll-feed) | hardcoded |

**Implementation:**

- Icons are inline SVGs stored in `_includes/icons/` (one file per icon: `linkedin.svg`, `github.svg`, `x.svg`, `rss.svg`)  
- Footer include loops over configured social links and renders each icon as an `<a>` tag  
- Icon size: 20px × 20px, colour inherits from CSS `--muted` variable, hover transitions to `--fg`  
- No labels — icons only, with `aria-label` for accessibility

**`_config.yml` social block:**

social:

  linkedin: your-linkedin-handle

  github:   your-github-username

  x:        your-x-handle

**`_includes/footer.html` pattern:**

\<footer\>

  \<nav aria-label="Social links"\>

    {% if site.social.linkedin %}

    \<a href="https://linkedin.com/in/{{ site.social.linkedin }}" aria-label="LinkedIn" target="\_blank" rel="noopener"\>

      {% include icons/linkedin.svg %}

    \</a\>

    {% endif %}

    {% if site.social.github %}

    \<a href="https://github.com/{{ site.social.github }}" aria-label="GitHub" target="\_blank" rel="noopener"\>

      {% include icons/github.svg %}

    \</a\>

    {% endif %}

    {% if site.social.x %}

    \<a href="https://x.com/{{ site.social.x }}" aria-label="X" target="\_blank" rel="noopener"\>

      {% include icons/x.svg %}

    \</a\>

    {% endif %}

    \<a href="/feed.xml" aria-label="RSS feed"\>

      {% include icons/rss.svg %}

    \</a\>

  \</nav\>

\</footer\>

---

## 12\. Risks & Known Constraints

| Risk | Detail | Mitigation |
| :---- | :---- | :---- |
| Plugin whitelist | GitHub Pages native only supports \~10 plugins | All required plugins are on the whitelist; verify before adding new ones |
| Chirpy version drift | Chirpy updates can break overrides | Pin the gem version; update deliberately |
| Ruby version conflicts | Jekyll is Ruby-based; local Ruby version matters | Use `rbenv` or `asdf` to pin Ruby version per project |
| Dark mode flash (FOUC) | Theme applied after page load can cause white flash | Inline the theme-init script in `<head>` before CSS loads |
| Image hosting | GitHub LFS or large images slow build | Keep images under 1MB; use external hosting (Cloudinary free tier) for larger art/portfolio images |
| Custom domain SSL | DNS propagation takes up to 48h | Set up domain first, before launching — don't announce until HTTPS is active |

---

## 13\. Phase Plan

| Phase | Scope |
| :---- | :---- |
| **1 — Foundation** | Repo setup, Chirpy installed, `_config.yml`, custom domain, dark/light toggle working |
| **2 — Design** | Typography, colour tokens, layout overrides, homepage post list matching reference aesthetic |
| **3 — Content structure** | About page, category pages, post template, first 2–3 test posts |
| **4 — Polish** | SEO tags, RSS feed, sitemap, mobile review, FOUC fix |
| **5 — Launch** | Domain live, HTTPS active, announced |

---

*Spec version: 1.0 — May 2026*  
