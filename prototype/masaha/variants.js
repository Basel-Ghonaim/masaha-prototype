// Page variants: `<Page>.html?v=<name>` draws a variant of the page, the page itself staying the
// original (README › Variants). Loaded after i18n.js and variants/index.js, before Babel.
//
// A registered `?v=` sets the page's own inline <script type="text/babel"> blocks inert and loads
// `variants/<Page>/<name>.jsx` in their place, with `<name>.css` when the entry says `css: true`.
// It runs on document's DOMContentLoaded, which comes before Babel's own listener on window, so
// Babel compiles the shared modules and the variant, never the original block. An unknown `?v=` is
// the original, as an unknown `?identity=` is the default.
//
// The switcher lists the original and the variants. It is drawn only on a page that has a variant,
// never inside a frame (the board), and not with `?switcher=0` (screenshots).
(function () {
  const params = new URLSearchParams(location.search);
  const file = decodeURIComponent(location.pathname.split('/').pop() || '');
  const page = file.replace(/\.html$/, '');
  const list = (window.MASAHA_VARIANTS || {})[page] || [];
  const active = list.find((entry) => entry.name === params.get('v')) || null;
  window.MASAHA_VARIANT = active ? active.name : null;

  const label = (entry) => (window.LANG === 'en' ? entry.en : entry.ar) || entry.name;
  const folder = 'variants/' + encodeURIComponent(page) + '/' + encodeURIComponent(active ? active.name : '');

  if (active && active.css) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = folder + '.css';
    document.head.appendChild(link);
  }

  // A link to this same page keeps the variant, so its own states (`?v=calm&state=error`) stay in it;
  // a link to another page does not carry it, since a variant belongs to its page.
  if (active) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
      const [path, hash] = href.split('#');
      const [base, qs] = path.split('?');
      if (decodeURIComponent(base.split('/').pop()) !== file) return;
      const q = new URLSearchParams(qs || '');
      if (q.has('v')) return;
      q.set('v', active.name);
      a.setAttribute('href', base + '?' + q.toString() + (hash ? '#' + hash : ''));
    }, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (active) {
      document.querySelectorAll('script[type="text/babel"]:not([src])').forEach((s) => { s.type = 'text/x-original'; });
      const script = document.createElement('script');
      script.type = 'text/babel';
      script.src = folder + '.jsx';
      document.body.appendChild(script);
    }
    if (!list.length || window.self !== window.top || params.get('switcher') === '0') return;

    const box = document.createElement('div');
    box.className = 'variant-switcher flex items-center gap-2 rounded-md border bg-background text-foreground shadow-floating px-2 py-1 text-caption';
    const id = 'variant-switcher-select';
    const caption = document.createElement('label');
    caption.htmlFor = id;
    caption.className = 'text-muted-foreground';
    caption.textContent = window.tr ? window.tr('النسخة', 'Version') : 'Version';
    const select = document.createElement('select');
    select.id = id;
    select.className = 'bg-transparent text-foreground font-medium';
    const options = [{ name: '', ar: 'الأصل', en: 'Original' }, ...list];
    for (const entry of options) {
      const option = document.createElement('option');
      option.value = entry.name;
      option.textContent = label(entry);
      option.selected = entry.name === (active ? active.name : '');
      select.appendChild(option);
    }
    select.addEventListener('change', () => {
      const q = new URLSearchParams(location.search);
      if (select.value) q.set('v', select.value); else q.delete('v');
      const s = q.toString();
      location.search = s ? '?' + s : '';
    });
    box.append(caption, select);
    document.body.appendChild(box);
  });
})();
