# wsc34

Personal portfolio and Computer Science resource hub: React + TypeScript + Tailwind CSS v4 + React Router, built with Vite.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build
```

## Deploying (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to **https://wsc34.github.io**.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

**Fallback (no Actions):** run `npm run publish:pages`. It builds the site and commits it to the local `gh-pages` branch. Push that branch, and set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / (root)**.

The build also writes `dist/404.html` (a copy of `index.html`) so deep links such as `/a-level` or `/extras/some-post` work on GitHub Pages.

## Where to edit content

Almost everything visible lives in `src/content/`. You should not need to touch any layout code.

| What | File |
| --- | --- |
| Name, title, intro, location, photo, About me | `src/content/profile.ts` → `profile` |
| Education timeline | `src/content/profile.ts` → `education` |
| Work experience | `src/content/profile.ts` → `work` |
| Skills (empty list = "to be added") | `src/content/profile.ts` → `skills` |
| Email / GitHub / LinkedIn / links | `src/content/profile.ts` → `contactLinks` |
| CV download | put the PDF in `public/files/`, set `cvFile = '/files/cv.pdf'` |
| Profile photo | put the image in `public/images/`, set `profile.photo = '/images/profile.jpg'` |
| AQA 7517 topics | `src/content/curriculum/aqa-7517.ts` |
| CAIE 9618 topics | `src/content/curriculum/caie-9618.ts` |
| Edexcel 1CP2 topics | `src/content/curriculum/edexcel-1cp2.ts` |
| Page titles/intros, card order, Programming card | `src/content/curriculum/index.ts` |
| Super-curricular articles | `src/content/articles/super-curricular.ts` |
| Extras articles | `src/content/articles/extras.ts` |
| Article images | `public/images/articles/` (16:9 works best) |
| Nav tabs, footer line, site name | `src/content/site.ts` |

### Syllabus topics

```ts
topic('4.1', 'Fundamentals of programming', 'Optional short description', {
  documentUrl: 'https://…/notes.pdf',   // optional: adds an "Open resource" button
})
```

- **Add / rename / reorder:** edit the list; order in the file = order on the page.
- **URLs:** each topic gets `/resources/{level}/{board}/{slug}`. The slug comes from the title, so renaming a topic changes its URL. Pass `{ slug: 'my-fixed-slug' }` to keep it stable.
- **Topics without `documentUrl`** show a polished "Resource coming soon" page.
- **New exam board:** copy `aqa-7517.ts`, change it, then add `{ kind: 'board', board: yourBoard }` to `entries` in `curriculum/index.ts`.

### Articles

Each article is one object: `slug`, `title`, `excerpt`, `category`, `date` (`'YYYY-MM-DD'`), `image`, `imageAlt`, optional `featured: true`, and a Markdown `body`. The URL is `/{collection}/{slug}`.

## Structure

```
src/
  content/          ← editable content (profile, curriculum, articles, site)
  components/
    layout/         SiteLayout, SiteHeader, MainNavigation, SiteFooter
    portfolio/      ProfileImage, CVSection, TimelineEntry, SkillsSection, ContactSection
    curriculum/     CurriculumAccordion (card + panel), TopicLink, LinkCard
    articles/       FeaturedArticle, ArticleCard, ArticleGrid, ArticleImage, ArticleMeta
    ui/             PageHeader, PlaceholderPage
  pages/            Portfolio, Curriculum, Collection, Article, Resource, PythonEmulator, NotFound
  router.tsx        all routes
  styles/index.css  design tokens, prose styles, motion
```

The Python emulator route (`/python-emulator`) is a standalone placeholder page. When the emulator is ready, swap its element in `src/router.tsx`.
