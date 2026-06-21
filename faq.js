    (function () {
      'use strict';

      function bindFaqBlock(block) {
        var faqItems = Array.prototype.slice.call(block.querySelectorAll('.faq-item'));
        var faqFilters = Array.prototype.slice.call(block.querySelectorAll('[data-faq-filter]'));

        faqItems.forEach(function (item) {
          var trigger = item.querySelector('.faq-trigger');
          var content = item.querySelector('.faq-content');
          if (!trigger || !content) return;
          if (!content.id) content.id = (trigger.id || 'faq') + '-content';
          trigger.setAttribute('aria-controls', content.id);
          trigger.setAttribute('aria-expanded', 'false');
          trigger.addEventListener('click', function () {
            var isActive = item.classList.contains('active');
            faqItems.forEach(function (other) {
              other.classList.remove('active');
              var btn = other.querySelector('.faq-trigger');
              if (btn) btn.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
              item.classList.add('active');
              trigger.setAttribute('aria-expanded', 'true');
            }
          });
        });

        function setFaqFilter(filter) {
          var activeFilter = filter || 'all';
          faqFilters.forEach(function (btn) {
            var isActive = btn.dataset.faqFilter === activeFilter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          });
          faqItems.forEach(function (item) {
            var shouldShow = activeFilter === 'all' || item.dataset.faqCategory === activeFilter;
            item.hidden = !shouldShow;
            if (!shouldShow) {
              item.classList.remove('active');
              var btn = item.querySelector('.faq-trigger');
              if (btn) btn.setAttribute('aria-expanded', 'false');
            }
          });
        }

        faqFilters.forEach(function (btn) {
          btn.addEventListener('click', function () {
            setFaqFilter(btn.dataset.faqFilter);
          });
        });
        setFaqFilter('all');
      }

      document.addEventListener('DOMContentLoaded', function () {
        Array.prototype.slice.call(document.querySelectorAll('[data-faq-block]')).forEach(bindFaqBlock);
      });
    })();
  