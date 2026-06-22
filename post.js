    (async function () {
      'use strict';

      var article = document.getElementById('post-article');
      var params = new URLSearchParams(window.location.search);
      var postId = params.get('id');

      function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (char) {
          return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
          }[char];
        });
      }

      function formatDate(value) {
        if (!value) return '';
        try {
          return new Date(value).toLocaleDateString((window.AbdoI18n && window.AbdoI18n.currentLang() === 'en') ? 'en-US' : 'ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } catch (error) {
          return value;
        }
      }

      function renderBody(content) {
        return String(content || '')
          .split(/\n{2,}/)
          .map(function (paragraph) {
            return '<p>' + escapeHtml(paragraph).replace(/\n/g, '<br>') + '</p>';
          })
          .join('');
      }

      function showState(text) {
        article.innerHTML = '<p class="post-state">' + escapeHtml(text) + '</p>';
      }

      if (!window.AbdoAuth || !window.AbdoAuth.isConfigured()) {
        showState('لم يتم تفعيل اتصال قاعدة البيانات بعد.');
        return;
      }

      var client = window.AbdoAuth.getClient();
      var result;

      if (postId) {
        result = await client
          .from('posts')
          .select('id,title,excerpt,content,image_url,telegram_url,tag,status,published_at,created_at')
          .eq('id', postId)
          .eq('status', 'published')
          .single();

        if (result.error && /(image_url|telegram_url)/i.test(result.error.message || '')) {
          result = await client
            .from('posts')
            .select('id,title,excerpt,content,tag,status,published_at,created_at')
            .eq('id', postId)
            .eq('status', 'published')
            .single();
          if (result.data) {
            result.data.image_url = '';
            result.data.telegram_url = '';
          }
        }
      } else {
        result = await client
          .from('posts')
          .select('id,title,excerpt,content,image_url,telegram_url,tag,status,published_at,created_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false, nullsFirst: false })
          .limit(1);

        if (result.error && /(image_url|telegram_url)/i.test(result.error.message || '')) {
          result = await client
            .from('posts')
            .select('id,title,excerpt,content,tag,status,published_at,created_at')
            .eq('status', 'published')
            .order('published_at', { ascending: false, nullsFirst: false })
            .limit(1);
        }
        result.data = Array.isArray(result.data) ? result.data[0] : result.data;
        if (result.data && !Object.prototype.hasOwnProperty.call(result.data, 'image_url')) result.data.image_url = '';
        if (result.data && !Object.prototype.hasOwnProperty.call(result.data, 'telegram_url')) result.data.telegram_url = '';
      }

      if (result.error || !result.data) {
        showState('هذا المنشور غير متاح أو لم يتم نشره بعد.');
        return;
      }

      var post = result.data;
      if (post.telegram_url && /^https?:\/\//i.test(post.telegram_url)) {
        window.location.replace(post.telegram_url);
        return;
      }
      document.title = post.title + ' | عبدالرحمن محمد';

      // Per-post SEO / social meta (CSP-safe: handled here, not inline)
      (function () {
        var fullTitle = post.title + ' | عبدالرحمن محمد';
        var desc = (post.excerpt || '').toString().slice(0, 160);
        function setMeta(selector, value) {
          var el = document.querySelector(selector);
          if (el && value) el.setAttribute('content', value);
        }
        setMeta('meta[name="description"]', desc);
        setMeta('meta[property="og:title"]', fullTitle);
        setMeta('meta[property="og:description"]', desc);
        setMeta('meta[name="twitter:title"]', fullTitle);
        setMeta('meta[name="twitter:description"]', desc);
        if (post.image_url) setMeta('meta[property="og:image"]', post.image_url);
        try {
          var id = new URL(window.location.href).searchParams.get('id');
          var canonical = document.querySelector('link[rel="canonical"]');
          if (canonical && id) {
            canonical.setAttribute('href', window.location.origin + '/post.html?id=' + encodeURIComponent(id));
          }
        } catch (e) {}
      })();

      article.innerHTML = [
        '<div class="post-meta">',
          '<span class="insight-tag">' + escapeHtml(post.tag || 'بحثي') + '</span>',
          '<span class="insight-date">' + formatDate(post.published_at || post.created_at) + '</span>',
        '</div>',
        post.image_url ? '<figure class="post-cover"><img src="' + escapeHtml(post.image_url) + '" alt=""></figure>' : '',
        '<h1 class="post-title">' + escapeHtml(post.title) + '</h1>',
        '<p class="post-excerpt">' + escapeHtml(post.excerpt) + '</p>',
        '<div class="post-body">' + renderBody(post.content) + '</div>'
      ].join('');
      if (window.AbdoI18n) window.AbdoI18n.applyLanguage();
    })();
  