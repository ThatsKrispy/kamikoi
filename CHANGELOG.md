# KamiKoi Sushi Fusion — Rebuild Changelog

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
