# Image Slots — KamiKoi Sushi Fusion

The site currently ships with **branded placeholder images**. Replace them with the approved
photos from Google Drive → **Clients / KamiKoi / Images**.

## Easiest path
1. Copy the approved photos into `_source-photos/` in this project.
2. Rename each to the target filename below (left column), **or** keep their names and tell me the
   mapping and I'll handle it.
3. Run: `python3 _optimize_photos.py`
   → every image in `_source-photos/` is resized (max 1600px wide) and saved as optimized WebP
   into `assets/images/`, overwriting the matching placeholder. Aspect ratio is preserved; the CSS
   uses `object-fit: cover`, so any orientation looks clean.

## Slots

| Target filename (assets/images/) | Used on | Ideal subject | Approx size |
|---|---|---|---|
| kamikoi-sushi-fusion-hero-miami.webp | Home hero | Hero — signature platter or dining room (wide) | 1600×1066 |
| kamikoi-about-chef-plating.webp | Home / brunch | Chef plating a signature dish | 760×600 |
| kamikoi-signature-sushi-rolls.webp | Home / menu / gallery | Signature sushi rolls (portrait) | 520×650 |
| kamikoi-nikkei-ceviche.webp | Home / brunch / gallery | Nikkei ceviche (portrait) | 520×650 |
| kamikoi-wok-fried-rice.webp | Home | Wok fried rice / yakisoba (portrait) | 520×650 |
| kamikoi-grilled-seafood.webp | Home / gallery | Grilled octopus / steak (portrait) | 520×650 |
| kamikoi-interior-dining-miami.webp | About band | Interior dining room (wide) | 1600×900 |
| kamikoi-cocktails-happy-hour.webp | Bands | Cocktails / bar (wide) | 1600×900 |
| kamikoi-restaurant-interior.webp | About | Restaurant interior | 760×600 |
| kamikoi-chef-sushi-counter.webp | About | Chef at the sushi counter | 760×600 |
| kamikoi-menu-spread.webp | Menu OG | Table spread of dishes (wide) | 1600×900 |
| kamikoi-sunday-brunch-mimosas.webp | Brunch hero | Mimosas / brunch table (wide) | 1600×1000 |
| kamikoi-brunch-benedict.webp | Brunch | Benedict waffle / brunch dish | 760×600 |
| kamikoi-happy-hour-cocktails.webp | Happy hour | Cocktail lineup (wide) | 1600×1000 |
| kamikoi-storefront-miami.webp | Contact OG | Storefront / exterior (wide) | 1600×900 |
| kamikoi-gallery-1.webp … kamikoi-gallery-8.webp | Home + Gallery | Mix: dishes, rolls, ceviche, interior, cocktail, dessert, steak, sushi boat (square) | 640×640 |

## Logo
- `assets/logos/logo-white.webp` and `logo-icon.webp` are typographic placeholders.
  Swap in the official white KamiKoi wordmark (`Logo-W`) and koi mark (`Icono`) from Drive.
- `assets/logos/favicon.png` — replace with the official icon if desired.
