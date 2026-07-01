# KamiKoi Sushi Fusion — Rebuild Changelog

## v2.1 — 2026-07-01 — Gallery cleanup + real logo (ThatsKrispy)

**Gallery**
- **Removed 6 near-duplicate gallery photos** (same person or same dish from the same shoot),
  keeping the stronger shot from each pair: blue-dress guest, white-cardigan guest,
  whole fried snapper, poke bowl, chicken-saltado bowl, and churrasco steak.
- Gallery renumbered to contiguous `kamikoi-gallery-1..42` (was 48); `_build.py` loop range
  updated and all pages rebuilt. No broken image references remain.

**Logo**
- **Replaced placeholder logo with the real KAMIKOI Sushi Fusion artwork** sitewide
  (nav, footer, newsletter watermark, favicon), from client-supplied vector PDFs.
- Generated a **white-on-transparent** version for the dark nav/footer (derived from the
  standard artwork so letter counters and the shrimp stay transparent — portable to any bg),
  plus `logo-black` for light backgrounds, `logo-icon` (koi mark) and a new favicon +
  apple-touch-icon.
- Corrected logo aspect ratio in markup (199×52) and added `?v=20260701` cache-busting so
  browsers/Cloudflare pick up the new files.

## v2.0 — 2026-06-30 — Nightlife redesign (ThatsKrispy)

**Direction shift:** repositioned KamiKoi as Miami's sushi + nightlife hotspot — darker,
more vibrant and high-energy, with party/people photography front and center.

- **New dark theme** across every page — near-black backgrounds, glowing crimson/gold/magenta
  neon accents, energetic type. (`css/style.css` fully rewritten; cache-busted to `?v=20260630-v2`.)
- **Removed Sunday Brunch** entirely (page, nav, sitemap). `/brunch` now 301-redirects to `/nightlife`.
- **New Nightlife & Events page** (`nightlife.html`) with the weekly lineup, Ladies Night and Live Music.
- **Weekly specials** (home + nightlife):
  Mon 10% Off · Tue Kids Eat Free · Wed ½ Off Wine & Sake · Thu Ladies Night (free drinks) · Fri Weekend Kickoff.
  Live music called out for **Thursday & Friday**.
- **Homepage reworked** — nightlife hero, weekly-specials strip, Ladies Night band, Happy Hour band,
  bigger food+drinks+nightlife gallery.
- **48 curated real photos placed** (up from 23), no duplicates — party crowds, Ladies Night,
  the live-music performer, cocktails, interiors and food. Gallery expanded to 30 images.
- Unreferenced/placeholder images pruned from the repo.

_Pre-launch confirmations from v1.0 still apply (logo, email, order links, Web3Forms key)._

## v1.0 — 2026-06-30 — Full static rebuild (ThatsKrispy)

**What changed:** Rebuilt KamiKoiSushiFusion.com from the old WordPress / Slider Revolution
site into a clean, fast, mobile-first static site, deployable to Cloudflare Pages — matching
the structure/convention of our other client sites (thelazyoyster, progressrum, etc.).

### Pages built (clean URLs)
- `index.html` — Home (hero, about teaser, category grid, brunch band, why-us, reviews, gallery strip, order online, newsletter)
- `about.html` — Story / promise / experience
- `menu.html` — Full menu, all 13 categories with prices + section nav + PDF download link
- `brunch.html` — Sunday Brunch ($40 prix-fixe, appetizers, entrées, bottomless drinks)
- `happy-hour.html` — Everyday happy hour (cocktails $6, classics $6, beer/wine $5, food specials, $12 rolls)
- `gallery.html` — Photo gallery
- `contact.html` — Location, hours, map, Web3Forms contact form, socials
- `privacy.html`, `accessibility.html` — Legal / compliance

### Content
- All copy, menu items, prices, hours, address, phone, reviews and social links pulled from the
  live site + official KamiKoi-Menu.pdf. No invented services, claims, reviews or contact info.
- Address: 13816 SW 56th St, Miami, FL 33175 · Phone: (305) 967-8286 (clickable on all pages).
- Hours: Mon–Thu 11a–10p · Fri/Sat 11a–11p · Sun 11a–10p.
- Reviews are the three real Google reviews shown on the original site.

### SEO / performance / accessibility
- Unique title + meta description + canonical + Open Graph per page.
- One H1 per page; semantic H2/H3 structure; Restaurant schema (JSON-LD) on home + menu.
- SEO-friendly WebP image names (e.g. `kamikoi-signature-sushi-rolls.webp`), lazy-loaded below the fold.
- `_headers` (security + caching), `_redirects` (old WP URLs → clean URLs), `robots.txt`, `sitemap.xml`.
- Skip link, keyboard-friendly nav, visible focus, reduced-motion support, accessibility toolbar +
  cookie-consent banner (`js/a11y-consent.js`, reused from house template).

### ⚠️ Needs client confirmation before launch
1. **Real photos** — the page images are branded PLACEHOLDERS. Drop the approved Drive photos
   (Clients/KamiKoi/Images) into `_source-photos/`, run `python3 _optimize_photos.py`, and they
   auto-convert to web-sized WebP. See `IMAGES.md` for the slot list. (Logo is also a typographic
   placeholder — swap in the official `Logo-W` / `Icono` files.)
2. **Email address** — used `info@kamikoisushifusion.com` as a placeholder. Confirm the real address.
3. **Order-online links** — DoorDash / Uber Eats / Grubhub buttons point to each platform's homepage.
   Replace with KamiKoi's direct store URLs.
4. **Web3Forms key** — replace `YOUR_WEB3FORMS_KEY` in `contact.html` + newsletter forms with the real key.
5. **Reservations** — brunch "Reserve a Table" currently dials the restaurant. Wire to a booking system if one exists.
