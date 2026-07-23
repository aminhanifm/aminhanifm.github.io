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
- TillTally: `/privacy/tilltally/`
- LaterPin: `/privacy/laterpin/`
- Loose Ends: `/privacy/loose-ends/`
- WordJig: `/privacy/wordjig/`
- BlinkGrid: `/privacy/blinkgrid/`
- Cipher Four: `/privacy/cipher-four/`

Add future policies under `public/privacy/<app-slug>/index.html`, link them from
`public/privacy/index.html`, and add their canonical URL to `public/sitemap.xml`.
Policy pages use Consent Mode with analytics storage denied. They send cookieless
page, navigation, scroll, and engagement signals without collecting policy
contact addresses, link text, or other page content.

## Google Analytics

Google Analytics is optional and disabled unless `VITE_GA_MEASUREMENT_ID` is set.

For GitHub Pages, add a repository variable named `VITE_GA_MEASUREMENT_ID` with the GA4 measurement ID, for example `G-XXXXXXXXXX`, then rerun the deploy workflow.
The deploy build injects the official Google tag into the portfolio and a shared
tracker into the nested tools and privacy pages when this variable is present.
Every HTML file under `dist/projects/<project-name>/` is discovered recursively,
assigned `site_area=nested_project`, and assigned a `content_name` from its
project folder. Adding another deployed nested project requires no analytics
code, measurement ID, or workflow assertion.

For local testing, create a local `.env.local` file with:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

To opt out a personal browser or device, visit:

```txt
https://aminhanifm.github.io/?analytics=off
```

The site stores the opt-out in that browser's local storage and removes the query parameter from the address bar. To turn analytics back on for that browser, visit:

```txt
https://aminhanifm.github.io/?analytics=on
```

Custom events are sent for primary portfolio actions:

- `resume_click`
- `portfolio_click`
- `project_link_click`
- `project_source_click`
- `project_detail_open`
- `project_detail_close`
- `project_detail_browse`
- `project_media_select`
- `project_media_control`
- `project_share_copy`
- `share`
- `project_filter_click`
- `theme_toggle`
- `site_navigation_click`
- `awards_toggle`
- `contact_click`
- `external_profile_click`
- `outbound_link_click`
- `section_view`
- `scroll_depth`
- `engagement_milestone`
- `page_engagement_summary`
- `client_error`

Nested tools additionally report privacy-safe `ui_action`, `form_submit`, and
`internal_navigation_click` events. Privacy pages report
`privacy_policy_select` and `privacy_contact_click`; analytics storage remains
denied on those pages.

No event includes user-entered form values, uploaded file names or contents,
email addresses, error messages, or full outbound URLs.

For useful GA4 reports, register `site_area`, `content_name`, `section_name`,
`project_title`, `source`, `link_category`, and `action_name` as event-scoped
custom dimensions. Consider marking `contact_click`, `resume_click`,
`portfolio_click`, and `project_link_click` as key events.
