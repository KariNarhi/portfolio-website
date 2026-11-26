# Responsive portfolio website

Simple example portfolio website: a responsive, GTA VI "Vice City" inspired site with four pages (Home, About Me, Projects, Contact Me). The site is localized in Finnish (default) and English, switchable from the FI/EN buttons next to the menu button.

## Technologies

- **HTML5**: four static pages in `dist/`
- **SCSS**, compiled to CSS with [Dart Sass](https://sass-lang.com/dart-sass)
- **Vanilla JavaScript**: menu toggle and localization logic (`dist/js/main.js`)
- **[i18next](https://www.i18next.com/)** + **[i18next-http-backend](https://github.com/i18next/i18next-http-backend)**: Finnish/English localization, loaded from jsDelivr
- **[Font Awesome 4.7](https://fontawesome.com/v4/)**: icons
- **Google Fonts**: Bebas Neue and Poppins
- **[serve](https://github.com/vercel/serve)**: local static server
- Theme based on the GTA VI inspired `gta-vi-theme.css` (kept in the repo root as a reference; it is not part of the build)

## Prerequisites

[Node.js](https://nodejs.org/) and npm.

## Run

```bash
npm install
npm start
```

`npm start` compiles the SCSS and serves `dist/`. Open the address printed in the terminal (usually <http://localhost:3000>).

> The site must be opened through the local server. Opening `dist/index.html` directly from the file system (`file://`) does not work, because the translation files are fetched over HTTP and the browser blocks that request.

While editing styles, run `npm run sass` in a second terminal to recompile `scss/` automatically on every change. Commit the regenerated `dist/css/main.css` together with SCSS changes.

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Compile SCSS once, then serve `dist/` |
| `npm run serve` | Serve `dist/` without compiling |
| `npm run build:css` | One-off compile of `scss/` to `dist/css/` |
| `npm run sass` | Watch `scss/` and recompile on change |

## Project structure

```
dist/               Served site
  index.html, about.html, projects.html, contact.html
  css/main.css      Generated from scss/ (committed)
  js/main.js        Menu toggle + i18next setup
  locales/fi|en/    translation.json files (all user-facing text)
  img/
scss/               main.scss (entry), _config, _menu, _mobile
gta-vi-theme.css    Original theme file (reference only)
```

## Localization

All visible text lives in `dist/locales/fi/translation.json` and `dist/locales/en/translation.json`. Elements opt in with `data-i18n="key"` (or `data-i18n="[html]key"` for text containing markup). When adding or changing text, update **both** language files. The selected language is stored in `localStorage`; Finnish is the default.

## License

[MIT](LICENSE)
