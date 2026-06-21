    (function () {
      'use strict';

      /* ---- Mobile Drawer ---- */
      var drawerOverlay = document.getElementById('mobile-drawer-overlay');
      var drawer        = document.getElementById('mobile-drawer');
      var drawerClose   = document.getElementById('mobile-drawer-close');
      var menuBtn       = document.getElementById('mobile-menu-btn');

      function openDrawer() {
        drawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        drawer.setAttribute('aria-hidden', 'false');
        drawerOverlay.setAttribute('aria-hidden', 'false');
        menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
      }

      window.closeDrawer = function () {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
        drawer.setAttribute('aria-hidden', 'true');
        drawerOverlay.setAttribute('aria-hidden', 'true');
        menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
      };

      if (menuBtn) {
        menuBtn.addEventListener('click', function () {
          drawer.classList.contains('open') ? closeDrawer() : openDrawer();
        });
      }
      if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
      if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
      });

      /* ---- Back to Top ---- */
      var backBtn = document.getElementById('back-to-top-btn');
      if (backBtn) {
        window.addEventListener('scroll', function () {
          if (window.scrollY > 400) {
            backBtn.classList.add('visible');
          } else {
            backBtn.classList.remove('visible');
          }
        }, { passive: true });

        backBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      /* ---- Image fallbacks (CSP-safe, replaces inline onerror) ---- */
      var fallbackImgs = document.querySelectorAll('img[data-fallback]');
      Array.prototype.forEach.call(fallbackImgs, function (img) {
        function applyFallback() {
          if (img.getAttribute('data-fallback-applied')) return;
          img.setAttribute('data-fallback-applied', '1');
          img.src = img.getAttribute('data-fallback');
        }
        img.addEventListener('error', applyFallback);
        if (img.complete && img.naturalWidth === 0) applyFallback();
      });

      /* ---- Close drawer on nav click (CSP-safe, replaces inline onclick) ---- */
      var closeEls = document.querySelectorAll('[data-close-drawer]');
      Array.prototype.forEach.call(closeEls, function (el) {
        el.addEventListener('click', function () { window.closeDrawer(); });
      });

    })();
  