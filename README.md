# butterflyengine.app — Story Factory site

The public marketing website for **Butterfly Story Factory** — a local-first
Windows studio that turns one topic into a scripted, narrated, subtitled 1080p
documentary plus vertical Reels.

Live path (after deployment): **https://butterflyengine.app/story-factory/**

The apex domain **https://butterflyengine.app/** keeps serving the existing
Butterfly Engine brand site. This repository contains **only the Story Factory
website**; the product source code, installer build scripts and customer
licenses live in a separate private repository.

## Stack

- Static HTML, CSS and vanilla JavaScript
- No build step, no framework, no tracking
- GitHub Pages project site, proxied under `/story-factory/` by a Cloudflare
  Worker

## Structure

```text
/
├── index.html              # landing page (EN by default, TR toggle)
├── 404.html
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── legal/
│   ├── eula.html
│   ├── privacy.html
│   └── third-party.html
├── cloudflare/
│   └── story-factory-worker.js
├── assets/
│   ├── style.css
│   ├── site.js             # EN/TR copy + interactions
│   ├── logo.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── ui-main.png         # product panel screenshot
│   ├── demo.mp4            # real 57-second output
│   ├── demo-poster.jpg
│   ├── scene-1..6.webp     # output stills
│   └── og-image.png
└── README.md
```

## Local preview

```powershell
python -m http.server 8080
# open http://127.0.0.1:8080/
```

The page also supports `?lang=tr` and the EN/TR switch.

## Deployment: GitHub Pages + Cloudflare Worker

The apex domain is currently served by the existing Butterfly Engine site. Do
not change its DNS records. We add only the `/story-factory/` path.

### 1. Enable GitHub Pages (project site)

1. Repository **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Do **not** set a custom domain in this repository (there is no `CNAME`).
5. Wait for `https://kad1rss.github.io/butterflyengine.app/` to load.

### 2. Add the Cloudflare Worker route

In the Cloudflare dashboard for `butterflyengine.app`:

1. **Workers & Pages → Create → Worker**.
2. Paste `cloudflare/story-factory-worker.js` into the editor and deploy.
3. Add a route: `butterflyengine.app/story-factory/*` → this Worker.
4. Keep the apex site route (`butterflyengine.app/*` → existing Lovable site)
   untouched. Cloudflare evaluates the more specific route first.

The Worker rewrites:

```text
https://butterflyengine.app/story-factory/assets/style.css
        ↓
https://kad1rss.github.io/butterflyengine.app/assets/style.css
```

It also redirects `/story-factory` to `/story-factory/` and serves the custom
404 page.

### 3. Link it from the main site

Add a “Story Factory” button/link in the existing Butterfly Engine site to
`/story-factory/`. No DNS change is required.

## SEO

Canonical and social URLs already point to:

```text
https://butterflyengine.app/story-factory/
```

If you later move the site to a subdomain (for example
`storyfactory.butterflyengine.app`), update the canonical, Open Graph,
`sitemap.xml` and Worker upstream at the same time.

## Editing copy

All user-facing strings are in `assets/site.js` under the `I18N.en` and
`I18N.tr` objects. Markup uses `data-i18n="key"`. The page starts in English;
Turkish is selected with the EN/TR switch or `?lang=tr`. The choice is stored in
`localStorage`.

## Updating media

Replace these files with optimized versions:

- `assets/ui-main.png` — 1600 px wide panel screenshot
- `assets/demo.mp4` — H.264 MP4, 16:9, keep it under ~10 MB
- `assets/demo-poster.jpg` — 1600 px wide poster frame
- `assets/scene-*.webp` — 1600×900, WebP quality ~80
- `assets/og-image.png` — 1200×630 social preview

## Content rules

- Do **not** add the product source code, API keys, `.env` files or customer
  data to this repository.
- The installer and source ZIP are **not** distributed from this public repo.
  Sales go through the contact/checkout link on the landing page.
- Keep the legal pages in sync with the product license and privacy policy.

## License

Website content, design and code are **© 2026 Kad1rs. All rights reserved.**
See [LICENSE](LICENSE). The Butterfly Story Factory product is licensed
separately under the Developer Edition EULA.
