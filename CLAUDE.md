# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, responsive portfolio website (placeholder content, no real personal info). Plain HTML + SCSS + vanilla JS; no framework, no bundler, no tests, no linter.

## Commands

- `npm run sass` — Dart Sass in watch mode, compiling `scss/` → `dist/css/`. Must be running while editing styles. `npm run build:css` does a one-off compile.
- `npm run deploy` — publishes `dist/` to GitHub Pages via `gh-pages` (site: https://KariNarhi.github.io/portfolio-website).
- To view the site, open `dist/index.html` directly or serve `dist/` statically.

## Architecture

- `dist/` is both the served site and the deploy root. HTML pages (`index`, `about`, `work`, `contact`) are hand-written and each duplicates the same header/menu markup and loads `css/main.css` and `js/main.js`. A change to the nav/menu must be repeated in all four pages (set the `current` class on the active `nav-item` per page).
- `dist/css/main.css` is **generated** from `scss/` and committed. Edit the SCSS, not the CSS, and commit the recompiled output (watcher running, or `npm run build:css`).
- SCSS layout: `main.scss` imports `_config` (variables such as `$primary-color`, `$secondary-color`, `$show-home-image`, plus mixins/functions like `background` and `set-text-color`) and `_menu`, with `_mobile` (a `styles` mixin) included at the *end* of `main.scss` so its media-query overrides win — `@use` hoists output, hence the mixin. Uses Dart Sass module syntax (`@use`, `sass:color`); `shift-lightness()` in `_config` replaces the deprecated `lighten`/`darken`.
- The background image is applied only to pages whose `<body id="bg-img">`, via the `background` mixin (a pseudo-element overlay tinted with `$primary-color` at `$background-opacity`). Image paths in SCSS are relative to the compiled CSS (`../img/...`).
- `dist/js/main.js` only toggles the mobile/hamburger menu by adding/removing a `show` class on `.menu`, `.menu-nav`, `.menu-branding`, and each `.nav-item` (and `close` on `.menu-btn`). Menu animations live in `_menu.scss` keyed off those classes.
