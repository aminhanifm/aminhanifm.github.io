# Amin Hanif Portfolio

Custom portfolio website for Amin Hanif, built with Vite, React, and TypeScript.

## Documents

Resume and portfolio PDFs are served from stable site URLs:

- `/docs/Amin-Hanif-Resume.pdf`
- `/docs/Amin-Hanif-Portfolio.pdf`

After regenerating PDFs in the CV repository, refresh the website copies with:

```bash
npm run sync:docs
```

If the CV repository is not in the expected sibling/local path, pass the PDF folder explicitly:

```bash
npm run sync:docs -- --source="F:\Github Projects\CV\output\pdf"
```

## Local Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

The site deploys to GitHub Pages through `.github/workflows/deploy.yml`.

## Privacy policy hub

App and game privacy policies use stable directory-based URLs so they work on
GitHub Pages without client-side routing:

- Policy directory: `/privacy/`
- LaterPin: `/privacy/laterpin/`

Add future policies under `public/privacy/<app-slug>/index.html`, link them from
`public/privacy/index.html`, and add their canonical URL to `public/sitemap.xml`.
The policy pages intentionally load no analytics or external resources.

## Google Analytics

Google Analytics is optional and disabled unless `VITE_GA_MEASUREMENT_ID` is set.

For GitHub Pages, add a repository variable named `VITE_GA_MEASUREMENT_ID` with the GA4 measurement ID, for example `G-XXXXXXXXXX`, then rerun the deploy workflow.
The deploy build injects the official Google tag into the generated HTML when this variable is present.

For local testing, create a local `.env.local` file with:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Custom events are sent for primary portfolio actions:

- `resume_click`
- `portfolio_click`
- `project_link_click`
- `project_detail_open`
- `project_detail_close`
- `project_detail_browse`
- `project_filter_click`
- `theme_toggle`
- `site_navigation_click`
- `awards_toggle`
- `contact_click`
- `external_profile_click`
