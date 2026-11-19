// The registry of page variants (README › Variants). One key per page, its file name without
// `.html`; one entry per variant, in the switcher's order:
//
//   'Sign in': [{ name: 'calm', ar: 'هادئة', en: 'Calm', css: true }],
//
// `name` is the `?v=` value and the file `variants/Sign in/calm.jsx`, which replaces the page's
// inline script; `css: true` also loads `variants/Sign in/calm.css`. `ar` and `en` label it in the
// switcher. A page with no entry has no switcher. Each variant is described in
// `decisions/<page>.md`.
// The auth pages' design, Slate (decisions/auth.md): one kit, variants/_auth/, drawn on each page; Sign in
// also has Slate 2, its second version (2026-11-19). Coast and
// Dots were retired by the owner on 2026-11-19. Built inside a function, so this file adds no top-level name
// to the pages' one global scope (README).
window.MASAHA_VARIANTS = (function () {
  const auth = [
    { name: 'slate', ar: 'اللوح', en: 'Slate', css: true },
  ];
  return {
    'Sign in': auth.concat([{ name: 'slate2', ar: 'اللوح ٢', en: 'Slate 2', css: true }]),
    'Register': auth,
    'Forgot password': auth,
    'Reset password': auth,
    'Change password': auth,
  };
})();
