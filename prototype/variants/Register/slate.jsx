// Register in the auth design «slate» (decisions/auth.md). The three auth designs share one kit,
// variants/_auth/kit.jsx: loaded once, compiled by this page's Babel, then it draws the page.
(function () {
  if (!window.AxKit) {
    const request = new XMLHttpRequest();
    request.open('GET', 'variants/_auth/kit.jsx', false);
    request.send();
    (0, eval)(Babel.transform(request.responseText, { presets: ['react'] }).code);
  }
  window.AxKit.render('register', 'slate');
})();
