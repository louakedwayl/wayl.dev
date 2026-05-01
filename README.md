# wayl.dev

Personal portfolio site for Wayl Louaked

Live: [wayl.dev](https://wayl.dev)

## Stack

- React 18 + Vite 6 (SPA, state-based routing via `useState`)
- `react-helmet-async` for per-page SEO
- 9-language i18n (en, fr, es, it, nl, ru, ar, zh, ja) with RTL support
- Dark / light theme via React Context
- Express + Nodemailer API for the contact form (OVH SMTP)

## Project structure

```
.
├── index.html          # Static head: OG, Twitter, JSON-LD, fonts
├── src/
│   ├── App.jsx         # Root: page state, theme, lang, Helmet
│   ├── main.jsx
│   ├── components/     # Navbar, HomePage, PortfolioPage, ContactPage, ...
│   ├── context/        # theme, lang
│   ├── data/projects.js
│   ├── hooks/useT.js   # i18n hook
│   └── i18n/index.js   # All translations
├── public/             # favicon, manifest, sitemap, robots, OG cover, project images
└── api/
    ├── server.js       # POST /contact → SMTP send
    └── .env.example
```

## Development

```bash
npm install
npm run dev      # Vite dev server on 0.0.0.0:5173
npm run build    # Output to dist/
npm run preview
```

### Contact API

```bash
cd api
npm install
cp .env.example .env   # Fill SMTP_USER and SMTP_PASS
node server.js         # Listens on :3001
```

The frontend posts to `https://wayl.dev/api/contact` — adjust your reverse proxy to forward `/api/*` to the Express server.

## License

MIT — see [LICENSE](./LICENSE).
