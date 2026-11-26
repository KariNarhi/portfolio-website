// Select DOM items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

// Set initial state of menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach((item) => item.classList.add("show"));
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach((item) => item.classList.remove("show"));
    showMenu = false;
  }
}

// ---------------------------------------------------------------------------
// Localization (i18next + i18next-http-backend). Finnish is the default.
// Texts live in locales/<lng>/translation.json; elements opt in with
// data-i18n="key" (textContent) or data-i18n="[html]key" (innerHTML).
// ---------------------------------------------------------------------------
const SUPPORTED_LANGS = ["fi", "en"];
const DEFAULT_LANG = "fi";
const LANG_STORAGE_KEY = "lang";

function getSavedLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    let key = el.dataset.i18n;
    const isHtml = key.startsWith("[html]");
    if (isHtml) key = key.slice(6);
    const text = i18next.t(key);
    if (isHtml) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Page title comes from meta.<main id>, e.g. meta.about
  const page = document.querySelector("main")?.id;
  if (page) document.title = i18next.t(`meta.${page}`);

  document.documentElement.lang = i18next.language;
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const active = btn.dataset.lang === i18next.language;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active);
  });
}

function setLanguage(lng) {
  i18next.changeLanguage(lng).then(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lng);
    } catch (e) {
      // storage unavailable (private mode): language just won't persist
    }
    translatePage();
  });
}

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

i18next
  .use(i18nextHttpBackend)
  .init({
    lng: getSavedLang(),
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS,
    backend: { loadPath: "locales/{{lng}}/translation.json" },
  })
  .then(translatePage)
  .catch((err) => console.error("i18next init failed", err))
  .finally(() => document.documentElement.classList.remove("i18n-loading"));
