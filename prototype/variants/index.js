// The registry of page variants (README › Variants). One key per page, its file name without
// `.html`; one entry per variant, in the switcher's order:
//
//   'Sign in': [{ name: 'calm', ar: 'هادئة', en: 'Calm', css: true }],
//
// `name` is the `?v=` value and the file `variants/Sign in/calm.jsx`, which replaces the page's
// inline script; `css: true` also loads `variants/Sign in/calm.css`. `ar` and `en` label it in the
// switcher. A page with no entry has no switcher. Each variant is described in
// `decisions/<page>.md`.
// The auth pages' three designs (decisions/auth.md): one kit, variants/_auth/, drawn on each page.
const AUTH_DESIGNS = [
  { name: 'slate', ar: 'اللوح', en: 'Slate', css: true },
  { name: 'coast', ar: 'الساحل', en: 'Coast', css: true },
  { name: 'dots', ar: 'النقاط', en: 'Dots', css: true },
];
window.MASAHA_VARIANTS = {
  'Sign in': AUTH_DESIGNS,
  'Register': AUTH_DESIGNS,
  'Forgot password': AUTH_DESIGNS,
  'Reset password': AUTH_DESIGNS,
  'Change password': AUTH_DESIGNS,
};
