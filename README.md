# edwinroosevelt.com

Edwin Roosevelt's personal site. Next.js 16 (App Router, Cache Components), Tailwind CSS 4, deployed on Vercel.

The design is a two-ink risograph poster: blue and fluorescent pink, overprinted. Headings are printed twice slightly out of register (the hero's pink pass drifts with the pointer), photos are blue halftone until you hover them, and career reads like a gig poster's tour dates with a pink highlighter on the current role.

## Develop

```sh
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # builds, serves on :3100, runs Playwright (desktop + mobile)
```

## Where things live

| To change…                          | Edit                          |
| ----------------------------------- | ----------------------------- |
| Name, email, résumé link, socials   | `src/content/site.ts`         |
| Jobs and education                  | `src/content/career.ts`       |
| Projects                            | `src/content/projects.ts`     |
| Gallery works and home-page selects | `src/content/gallery.ts`      |
| Colours and type                    | `src/app/globals.css`, `src/app/layout.tsx` |

Gallery and project images are in `src/assets/` and imported statically, so `next/image` gets their dimensions and blur placeholders at build time. To add a work, drop the image in `src/assets/gallery/`, import it in `gallery.ts` and add an entry. It gets its own page at `/gallery/<slug>/` automatically.

When you publish a content change, bump `updated` in `site.ts` (it feeds the sitemap and footer).

## Edz Central pages

`public/edz-central/index.html` and `public/edz-central/privacy/index.html` are the home page and privacy policy registered on the Edz Central Google OAuth consent screen. They are plain HTML served byte-for-byte through rewrites in `next.config.ts`, and an end-to-end test checks they stay identical. `trailingSlash: true` keeps their URLs (`/edz-central/`, `/edz-central/privacy/`) exactly as registered. Edit them deliberately, and update the effective date in the policy when you do.

The contact section's footer links to the privacy policy. Google's verification expects the app's home page to link to it, so keep that link.

## Contact form

The form posts to Formspree (`site.formspree`) from the browser, so it needs no server secrets. A hidden `_gotcha` field catches basic spam bots.
