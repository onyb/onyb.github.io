# anirudha.co

Static site, built with [Eleventy](https://www.11ty.dev/). Plain HTML/CSS/JS
output, deployed to GitHub Pages via the workflow in `.github/workflows/`.

## Develop

```sh
npm install
npm run dev      # serves at http://localhost:8080 with live reload
npm run build    # one-shot build to ./_site
```

## Edit

| What                | Where                                    |
| ------------------- | ---------------------------------------- |
| Bio / homepage      | `src/index.njk`                          |
| Talks list          | `src/_data/talks.json`                   |
| Writing list        | `src/_data/writings.json`                |
| Quotes              | `src/_data/quotes.json`                  |
| Internal posts      | `src/writing/posts/<slug>.md`            |
| Styles              | `src/_includes/css/main.css` (inlined)   |
| Site meta + socials | `src/_data/site.js`                      |
| Page templates      | `src/_includes/*.njk`, `src/*.njk`       |

### Adding a talk

Append an entry to `src/_data/talks.json`:

```json
{
  "title": "What I said",
  "venue": "Conference Name",
  "date": "2026-05-17",
  "links": [
    { "label": "slides", "url": "https://..." }
  ]
}
```

Common link labels: `slides`, `video`, `notes`, `tweet`, `event`, `writeup`.

### Adding a writing

- **External** (hosted elsewhere): set `external`. Shows `↗ host` indicator.
- **Internal** (hosted here): set `slug`, then write the post markdown at
  `src/writing/posts/<slug>.md` with `title` + `date` front-matter.

Each entry must have **exactly one** of `external` or `slug` — the build
will fail loudly if both or neither are set.

### Adding a quote

Append to `src/_data/quotes.json`. Required: `text`, `source`. Optional: `year`.

## Deploy

Push to `develop`. The GitHub Actions workflow builds and publishes to the
`gh-pages` branch; GitHub serves it at `https://anirudha.co`.
