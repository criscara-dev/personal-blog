# Post Front Matter

Posts live in `posts/` as markdown files and use this required front matter:

```yaml
---
title: Post title
date: YYYY-MM-DD
category: tech
---
```

`category` must be exactly one of:

- `tech`
- `practice`
- `art`
- `other`

Categories are mutually exclusive. Use one string value, not a list.
