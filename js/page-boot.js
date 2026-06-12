/* ComplaintBox page-boot: prevents FOUC + icon-text flash. Loaded first. */
(function () {
  'use strict';
  const html = document.documentElement;
  html.classList.add('cb-page-loading');

  // Reveal body after fonts are ready (or after a small max-wait safety net).
  function ready() {
    html.classList.remove('cb-page-loading');
    html.classList.add('cb-page-ready');
  }
  function fontsReady() { html.classList.add('fonts-ready'); }

  // Fonts API (modern browsers)
  if (document.fonts && document.fonts.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise(r => setTimeout(r, 1500)),
    ]).then(fontsReady).catch(fontsReady);
  } else {
    setTimeout(fontsReady, 600);
  }

  // Reveal body on DOMContentLoaded (after CSS is parsed), capped by a safety
  // timer so it never stays hidden if something is slow.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(ready));
  } else {
    requestAnimationFrame(ready);
  }
  setTimeout(ready, 1200);
})();
