    (function () {
      'use strict';

      /* --- Arabic date injection --- */
      var dateEl = document.getElementById('db-date-display');
      if (dateEl) {
        var now  = new Date();
        var opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        try {
          dateEl.textContent = now.toLocaleDateString((window.AbdoI18n && window.AbdoI18n.currentLang() === 'en') ? 'en-US' : 'ar-EG', opts);
        } catch (e) {
          dateEl.textContent = now.toLocaleDateString();
        }
      }

      /* --- EGX live snapshot rendering --- */
      var egxRoot = document.getElementById('db-egx-live');

      function setText(id, value) {
        var node = document.getElementById(id);
        if (node) node.textContent = value == null || value === '' ? '—' : String(value);
      }

      function formatPct(value, decimals) {
        if (value == null || value === '') return '—';
        var number = Number(value);
        if (!Number.isFinite(number)) return '—';
        return (number * 100).toFixed(decimals == null ? 1 : decimals) + '%';
      }

      function formatSignedPct(value, decimals) {
        if (value == null || value === '') return '—';
        var number = Number(value);
        if (!Number.isFinite(number)) return '—';
        var pct = number * 100;
        return (pct > 0 ? '+' : '') + pct.toFixed(decimals == null ? 1 : decimals) + '%';
      }

      function formatNumber(value, decimals) {
        if (value == null || value === '') return '—';
        var number = Number(value);
        if (!Number.isFinite(number)) return '—';
        return number.toLocaleString('en-US', {
          maximumFractionDigits: decimals == null ? 2 : decimals,
          minimumFractionDigits: decimals == null ? 0 : decimals
        });
      }

      function formatTime(value) {
        if (!value) return 'لم يتم التحديث بعد';
        try {
          return 'آخر تحديث ' + new Date(value).toLocaleString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        } catch (error) {
          return value;
        }
      }

      function renderChips(id, items, emptyText) {
        var node = document.getElementById(id);
        if (!node) return;
        var list = Array.isArray(items) ? items.filter(Boolean) : [];
        if (list.length === 0) {
          node.innerHTML = '<span class="db-egx-chip is-muted">' + emptyText + '</span>';
          return;
        }
        node.innerHTML = list.map(function (item) {
          return '<span class="db-egx-chip">' + String(item).replace(/[&<>"']/g, function (char) {
            return {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;'
            }[char];
          }) + '</span>';
        }).join('');
      }

      function setEgxStatus(status) {
        var node = document.getElementById('egx-feed-status');
        var clean = String(status || 'UNKNOWN').toUpperCase();
        if (!node) return;
        node.classList.remove('is-good', 'is-bad', 'is-warn');
        if (clean === 'OK' || clean === 'READY' || clean === 'PASS') {
          node.classList.add('is-good');
        } else if (clean === 'BLOCKED' || clean === 'FAIL' || clean === 'FAILED') {
          node.classList.add('is-bad');
        } else {
          node.classList.add('is-warn');
        }
        node.textContent = clean;
      }

      async function loadEgxLiveSnapshot() {
        if (!egxRoot) return;
        try {
          var response = await fetch('egx-live-lite.json', { cache: 'default' });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          var data = await response.json();
          var feed = data.feed || {};
          var portfolio = data.portfolio || {};
          var live = data.live || {};
          var strategy = data.strategy || {};
          var health = data.health || {};

          setEgxStatus(feed.status || health.status);
          setText('egx-latest-session', feed.latest_session);
          setText('egx-snapshot-time', formatTime(data.generated_at));
          setText('egx-data-coverage', (feed.symbols_ok || 0) + ' / ' + (feed.symbols_total || 0));
          setText('egx-data-errors', (health.failed_count || 0) + ' فشل · ' + (health.stale_count || 0) + ' متأخر');
          setText('egx-cagr', formatPct(portfolio.cagr, 1));
          setText('egx-risk-line', 'Sharpe ' + formatNumber(portfolio.sharpe, 2) + ' · DD ' + formatSignedPct(portfolio.max_dd, 1));
          setText('egx-next-action', live.fire_at_next_close ? 'إعادة توازن' : ((live.daily_scan_targets || []).length ? 'Daily scan' : 'متابعة'));
          setText('egx-decision-date', live.decided_at ? 'تاريخ القرار ' + live.decided_at : 'لا يوجد قرار إعادة توازن');
          setText('egx-daily-scan', (live.daily_scan_targets || []).join(', ') || 'لا يوجد');
          setText('egx-rebalance', (live.rebalance_targets || []).join(', ') || 'لا يوجد');
          setText('egx-max-positions', strategy.max_positions || '—');
          setText('egx-live-note', data.note || 'هذه اللقطة للمتابعة البحثية والإشارات التعليمية فقط وليست توصية تداول أو استثمار.');
          renderChips('egx-current-holdings', live.current_holdings, 'لا توجد مراكز حالية');
        } catch (error) {
          setEgxStatus('UNAVAILABLE');
          setText('egx-snapshot-time', 'قم بتشغيل node scripts/sync-egx-live.js لتوليد اللقطة');
          setText('egx-live-note', 'تعذر تحميل ملف egx-live.json من الموقع. تأكد من توليد اللقطة ورفعها مع آخر نشر.');
          renderChips('egx-current-holdings', [], 'اللقطة غير متاحة');
        }
      }

      loadEgxLiveSnapshot();
      if (egxRoot) {
        window.setInterval(loadEgxLiveSnapshot, 60000);
      }

      /* --- Section switching --- */
      var sectionLabels = {
        overview:  'نظرة عامة',
        portfolio: 'محفظتي',
        research:  'الأبحاث والإشارات',
        'admin-posts':  'إدارة المحتوى',
        'admin-videos': 'مكتبة الفيديو',
        'admin-users':  'طلبات الحسابات',
        settings:  'الإعدادات'
      };

      var breadcrumb = document.getElementById('db-breadcrumb');

      function switchSection(sectionId) {
        /* Hide all sections */
        var sections = document.querySelectorAll('.db-section');
        for (var i = 0; i < sections.length; i++) {
          sections[i].style.display = 'none';
        }

        /* Show the requested section */
        var target = document.getElementById('db-section-' + sectionId);
        if (target) {
          target.style.display = '';
        }

        /* Update nav active state */
        var links = document.querySelectorAll('.db-nav-link');
        for (var j = 0; j < links.length; j++) {
          if (links[j].dataset.section === sectionId) {
            links[j].classList.add('active');
            links[j].setAttribute('aria-current', 'page');
          } else {
            links[j].classList.remove('active');
            links[j].removeAttribute('aria-current');
          }
        }

        /* Update breadcrumb */
        if (breadcrumb) {
          breadcrumb.textContent = 'لوحة التحكم › ' + (sectionLabels[sectionId] || sectionId);
        }

        /* Close mobile sidebar if open */
        if (sidebar && sidebar.classList.contains('open')) {
          closeSidebar();
        }
      }

      /* Wire up nav links */
      var navLinks = document.querySelectorAll('.db-nav-link');
      for (var k = 0; k < navLinks.length; k++) {
        navLinks[k].addEventListener('click', function (e) {
          e.preventDefault();
          var sec = this.dataset.section;
          if (sec) {
            switchSection(sec);
          }
        });
      }

      /* --- Sidebar mobile toggle --- */
      var toggle  = document.getElementById('dbMobileToggle');
      var sidebar = document.getElementById('dbSidebar');
      var overlay = document.getElementById('dbSidebarOverlay');

      if (!toggle || !sidebar || !overlay) return;

      function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = '✕';
        document.body.style.overflow = 'hidden'; // prevent bg scroll
      }

      function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
        document.body.style.overflow = '';
      }

      toggle.addEventListener('click', function () {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
      });

      overlay.addEventListener('click', closeSidebar);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
          closeSidebar();
        }
      });

    })();
  