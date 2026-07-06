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

## Google Analytics

Google Analytics is optional and disabled unless `VITE_GA_MEASUREMENT_ID` is set.

For GitHub Pages, add a repository variable named `VITE_GA_MEASUREMENT_ID` with the GA4 measurement ID, for example `G-XXXXXXXXXX`, then rerun the deploy workflow.

For local testing, create a local `.env.local` file with:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
