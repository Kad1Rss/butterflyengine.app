# butterflyengine.app

The public marketing website for **Butterfly Story Factory** — a local-first
Windows studio that turns one topic into a scripted, narrated, subtitled 1080p
documentary plus vertical Reels.

Live site: **https://butterflyengine.app/**

This repository contains **only the website**. The product source code,
installer build scripts and customer licenses live in a separate private
repository and are not published here.

## Stack

- Static HTML, CSS and a small amount of vanilla JavaScript
- No build step, no framework, no tracking
- Hosted on GitHub Pages from the repository root

## Structure

```text
/
├── index.html              # landing page (EN by default, TR toggle)
├── 404.html
├── CNAME                   # butterflyengine.app
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── legal/
│   ├── eula.html
│   ├── privacy.html
│   └── third-party.html
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

## Deploying with GitHub Pages

1. Repository **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Custom domain: `butterflyengine.app`.
5. Enable **Enforce HTTPS** after DNS verification.
6. `CNAME` must stay in the repository root.

### DNS records

Apex `butterflyengine.app` (A records):

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Apex AAAA records:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

`www`:

```text
CNAME  www  →  Kad1Rss.github.io
```

If you use Cloudflare, keep the records **DNS only** (grey cloud) until GitHub
issues the certificate, then optionally enable the proxy.

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
  Sales go through the checkout/contact link on the landing page.
- Keep the legal pages in sync with the product license and privacy policy.

## License

Website content, design and code are **© 2026 Kad1rs. All rights reserved.**
See [LICENSE](LICENSE). The Butterfly Story Factory product is licensed
separately under the Developer Edition EULA.
