// The registry of page variants (README › Variants). One key per page, its file name without
// `.html`; one entry per variant, in the switcher's order:
//
//   'Sign in': [{ name: 'calm', ar: 'هادئة', en: 'Calm', css: true }],
//
// `name` is the `?v=` value and the file `variants/Sign in/calm.jsx`, which replaces the page's
// inline script; `css: true` also loads `variants/Sign in/calm.css`. `ar` and `en` label it in the
// switcher. A page with no entry has no switcher. Each variant is described in
// `decisions/<page>.md`.
window.MASAHA_VARIANTS = {};
