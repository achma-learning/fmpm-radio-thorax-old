/* ============================================================
   FMPM Radio-Thorax — UI Enhancements
   - Injects sticky Anki resources banner on every page
   - Adds link to original website
   - Adds responsive viewport meta tag
   - Fixes legacy fixed-width inline styles for responsiveness
   ============================================================ */
(function () {
  'use strict';

  // --- 1. Add viewport meta if missing -----------------------
  if (!document.querySelector('meta[name="viewport"]')) {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    if (document.head) {
      document.head.insertBefore(meta, document.head.firstChild);
    }
  }

  // --- 2. Resource links data --------------------------------
  var ANKI_DRIVE = 'https://drive.google.com/file/d/1VbQZSZC1IkJtpMR5pS-U1dWEz3NWeY8Y/view?usp=sharing';
  var ANKI_BACKUP = 'https://github.com/achma-learning/anki-decks/raw/refs/heads/main/rx%20thoax-tubercolose/rx_thorax_tuberculose%20(1).apkg';
  var ORIGINAL_SITE = 'https://archives.uness.fr/sites/umvf/media/ressPneumo/M1127/cc.html';

  function init() {
    // --- 3. Fix legacy inline width styles -------------------
    var fixed = document.querySelectorAll('div[style]');
    for (var i = 0; i < fixed.length; i++) {
      var w = fixed[i].style.width;
      if (w === '860px' || w === '880px' || w === '900px' || w === '920px') {
        fixed[i].style.width = '100%';
        fixed[i].style.float = 'none';
      }
    }

    // --- 4. Inject Anki resources sticky banner --------------
    if (!document.getElementById('anki-banner')) {
      var banner = document.createElement('div');
      banner.id = 'anki-banner';
      banner.innerHTML =
        '<div class="anki-banner-inner">' +
          '<span class="anki-label">\u{1F9E0} Ressources Anki</span>' +
          '<a href="' + ANKI_DRIVE + '" target="_blank" rel="noopener" class="anki-link" title="Télécharger depuis Google Drive">' +
            '\u2B07 rx_thorax_tuberculose.apkg (Drive)' +
          '</a>' +
          '<a href="' + ANKI_BACKUP + '" target="_blank" rel="noopener" class="anki-link anki-backup" title="Téléchargement de secours depuis GitHub">' +
            '\u2B07 rx_thorax_tuberculose.apkg (Backup)' +
          '</a>' +
          '<a href="' + ORIGINAL_SITE + '" target="_blank" rel="noopener" class="anki-link anki-source" title="Voir le site original">' +
            '\u{1F517} Site original' +
          '</a>' +
        '</div>';
      document.body.insertBefore(banner, document.body.firstChild);
    }

    // --- 5. Add original-site credit to footer ---------------
    var footer = document.getElementById('footer');
    if (footer && !footer.querySelector('.original-credit')) {
      var credit = document.createElement('div');
      credit.className = 'original-credit';
      credit.style.cssText = 'margin-top:8px; font-size:12px; opacity:0.85;';
      credit.innerHTML =
        'Source originale : ' +
        '<a href="' + ORIGINAL_SITE + '" target="_blank" rel="noopener">' +
          'archives.uness.fr — UMVF / FMPM' +
        '</a>';
      footer.appendChild(credit);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
