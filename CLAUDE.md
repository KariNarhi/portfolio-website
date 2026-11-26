# CLAUDE.md

Static portfolio website (plain HTML, SCSS-compiled CSS, vanilla JS). There are no tests and no linter.

## Commands

- `npm start` — compile SCSS once, then serve `dist/` over HTTP (`npm run serve` serves without compiling)
- `npm run sass` — watch `scss/` and recompile to `dist/css/` (Dart Sass, no source maps)
- `npm run build:css` — one-off compile of `scss/` to `dist/css/`

## Layout

- `dist/` is the served site. It holds `index.html`, `about.html`, `projects.html`, `contact.html`, `css/`, `js/` and `img/`.
- The 4 HTML pages each duplicate the menu markup. A change to the menu or navigation must be made in all four.
- `dist/locales/<lng>/translation.json` (`fi`, `en`) holds all user-facing text. Elements opt in with `data-i18n="key"` (or `data-i18n="[html]key"` for markup). Add or change keys in **both** language files; the English text left in the HTML is only a no-JS fallback.
- `dist/css/main.css` is generated from `scss/` but is committed. Recompile with `npm run build:css` and commit it with the SCSS changes.

## SCSS (`scss/`)

- `main.scss` is the only entry point. It does `@use "config" as *;` (so variables and mixins are unprefixed), `@use "menu";` and `@use "mobile";`, then holds the base, page and button styles.
- `_config.scss`: variables (`$primary-color`, `$secondary-color`, home image options), mixins (`easeOut`, `background`, and the media query mixins `mediaSm/Md/Lg/XL`), `set-text-color()`, and `shift-lightness()`. `shift-lightness()` replaces `lighten`/`darken` and clamps to 0–100%, so don't use `color.adjust` for this.
- `_menu.scss`: menu button and full-screen overlay styles.
- `_mobile.scss`: the responsive media queries, wrapped in `@mixin styles`. `main.scss` runs `@include mobile.styles;` at the very end, because `@use` hoists output and these rules must come last to override the earlier ones.
- The `background` mixin generates the `body#bg-img` home-page background image and its dark overlay (`:after`), controlled by `$show-home-image`.

## JavaScript

`dist/js/main.js` also holds the i18next setup (i18next and i18next-http-backend loaded from jsDelivr; Finnish default, choice saved in `localStorage`, FI/EN buttons `.lang-switch`). Translations are fetched, so serve `dist/` over HTTP locally with `npm run serve`; `file://` will not load them.

`dist/js/main.js` toggles the menu. Clicking `.menu-btn` adds or removes the `close` class on the button and `show` on `.menu`, `.menu-nav`, `.menu-branding` and every `.nav-item`, tracked by a `showMenu` flag.
