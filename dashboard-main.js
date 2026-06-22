    (async function () {
      'use strict';
      var session = await window.AbdoAuth.requireSession();
      if (!session) return;

      var user = session.user || {};
      var displayName = user.user_metadata && user.user_metadata.full_name ? user.user_metadata.full_name : user.email;
      var nameEl = document.querySelector('.db-user-name');
      var tierEl = document.querySelector('.db-user-tier');
      var client = window.AbdoAuth.getClient();
      var isAdmin = false;

      try {
        if (client) {
          var adminResult = await client.rpc('is_admin');
          if (!adminResult.error) {
            isAdmin = Boolean(adminResult.data);
          } else {
            console.warn('Admin check failed:', adminResult.error.message);
          }
        }
      } catch (error) {
        console.warn('Admin check failed:', error);
      }

      setupLogout();

      var profile = await loadCurrentProfile(client, user);
      if (!isAdmin && (!profile || profile.access_status !== 'approved')) {
        var pendingStatus = profile && profile.access_status ? profile.access_status : 'pending';
        if (nameEl && displayName) nameEl.textContent = displayName;
        if (tierEl) tierEl.textContent = accessStatusLabel(pendingStatus);
        renderAccessNotice(pendingStatus);
        document.body.classList.remove('auth-pending');
        return;
      }

      if (nameEl && displayName) nameEl.textContent = displayName;
      if (tierEl) tierEl.textContent = isAdmin ? 'أدمن' : 'عضو مؤكد';
      initDashboardResearch(client);

      if (isAdmin) {
        revealAdminControls();
        initAdminPosts(client, user);
        initAdminVideos(client);
        initAccountApprovals(client, user);
      }

      document.body.classList.remove('auth-pending');

      function setupLogout() {
        var logoutBtn = document.getElementById('db-logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function () {
            window.AbdoAuth.signOut();
          });
        }
      }

      async function loadCurrentProfile(client, user) {
        if (!client || !user || !user.id) return null;
        try {
          var result = await client
            .from('profiles')
            .select('id,full_name,email,access_status')
            .eq('id', user.id)
            .single();
          if (result.error) {
            console.warn('Profile load failed:', result.error.message);
            return null;
          }
          return result.data;
        } catch (error) {
          console.warn('Profile load failed:', error);
          return null;
        }
      }

      function accessStatusLabel(status) {
        if (status === 'approved') return 'عضو مؤكد';
        if (status === 'rejected') return 'مرفوض';
        return 'قيد المراجعة';
      }

      function renderAccessNotice(status) {
        var content = document.querySelector('.db-content');
        if (!content) return;
        var rejected = status === 'rejected';
        content.innerHTML = [
          '<div class="db-access-notice">',
            '<h2>' + (rejected ? 'لم يتم قبول الحساب' : 'الحساب قيد المراجعة') + '</h2>',
            '<p>' + (rejected
              ? 'تم رفض هذا الحساب من لوحة الإدارة. تواصل معي إذا كنت تعتقد أن القرار يحتاج مراجعة.'
              : 'تم إنشاء الحساب بنجاح، لكنه يحتاج موافقة الأدمن قبل فتح لوحة التحكم.')
            + '</p>',
          '</div>'
        ].join('');
      }

      function revealAdminControls() {
        var adminEls = document.querySelectorAll('.db-admin-only');
        for (var i = 0; i < adminEls.length; i++) {
          adminEls[i].hidden = false;
        }
      }

      function initDashboardResearch(client) {
        var grid = document.querySelector('#db-section-research .db-research-grid');
        if (!client || !grid) return;

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

        function renderResearchPosts(posts) {
          grid.innerHTML = posts.map(function (post) {
            var telegramUrl = /^https?:\/\//i.test(post.telegram_url || '') ? post.telegram_url : 'https://t.me/Abdo_Research';
            return [
              '<article class="db-research-card">',
                '<div class="db-research-meta">',
                  '<span class="insight-tag">' + escapeHtml(post.tag || 'بحثي') + '</span>',
                  '<span class="db-research-date">' + formatDate(post.published_at || post.created_at) + '</span>',
                '</div>',
                '<h3>' + escapeHtml(post.title) + '</h3>',
                '<p>' + escapeHtml(post.excerpt) + '</p>',
                '<div class="db-research-footer">',
                  '<span class="db-research-read-time">تيليجرام</span>',
                  '<a href="' + escapeHtml(telegramUrl) + '" class="db-research-link" target="_blank" rel="noopener noreferrer">اقرأ على تيليجرام ←</a>',
                '</div>',
              '</article>'
            ].join('');
          }).join('');
        }

        client
          .from('posts')
          .select('id,title,excerpt,telegram_url,tag,published_at,created_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false, nullsFirst: false })
          .limit(12)
          .then(function (result) {
            if (result.error && /telegram_url/i.test(result.error.message || '')) {
              client
                .from('posts')
                .select('id,title,excerpt,tag,published_at,created_at')
                .eq('status', 'published')
                .order('published_at', { ascending: false, nullsFirst: false })
                .limit(12)
                .then(function (fallbackResult) {
                  if (fallbackResult.error || !fallbackResult.data || fallbackResult.data.length === 0) {
                    if (fallbackResult.error) console.warn('Research load failed:', fallbackResult.error.message);
                    return;
                  }
                  renderResearchPosts(fallbackResult.data.map(function (post) {
                    post.telegram_url = '';
                    return post;
                  }));
                });
              return;
            }

            if (result.error || !result.data || result.data.length === 0) {
              if (result.error) console.warn('Research load failed:', result.error.message);
              return;
            }

            renderResearchPosts(result.data);
          });
      }

      function initAdminPosts(client, user) {
        var form = document.getElementById('db-post-form');
        var list = document.getElementById('db-admin-posts-list');
        var message = document.getElementById('db-post-message');
        var submitBtn = document.getElementById('db-publish-btn');
        var submitLabel = document.getElementById('db-publish-btn-label');
        var cancelEditBtn = document.getElementById('db-cancel-edit-btn');
        var titleInput = document.getElementById('post-title');
        var tagInput = document.getElementById('post-tag');
        var excerptInput = document.getElementById('post-excerpt');
        var telegramUrlInput = document.getElementById('post-telegram-url');
        var contentInput = document.getElementById('post-content');
        var imageFileInput = document.getElementById('post-image-file');
        var imageUrlInput = document.getElementById('post-image-url');
        var imagePreview = document.getElementById('post-image-preview');
        var imagePreviewImg = document.getElementById('post-image-preview-img');
        var statusInput = document.getElementById('post-status');
        var editingPostId = null;
        var postsCache = [];

        if (!client || !form || !list) return;

        function setPostMessage(text, type) {
          if (!message) return;
          message.textContent = text || '';
          message.classList.remove('is-success', 'is-error');
          if (type) message.classList.add('is-' + type);
        }

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

        function formatPostDate(value) {
          if (!value) return 'غير منشور';
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

        function setImagePreview(url) {
          if (!imagePreview || !imagePreviewImg) return;
          var cleanUrl = String(url || '').trim();
          if (!cleanUrl) {
            imagePreview.style.display = 'none';
            imagePreviewImg.removeAttribute('src');
            return;
          }
          imagePreview.style.display = 'block';
          imagePreviewImg.src = cleanUrl;
        }

        function imageExtension(file) {
          var name = file && file.name ? file.name : 'post-image';
          var match = name.match(/\.([a-z0-9]+)$/i);
          var ext = match ? match[1].toLowerCase() : 'jpg';
          return ['jpg', 'jpeg', 'png', 'webp', 'gif'].indexOf(ext) >= 0 ? ext : 'jpg';
        }

        async function uploadPostImage(file) {
          if (!file) return '';
          var safeName = String(file.name || 'post-image')
            .replace(/[^a-z0-9._-]+/gi, '-')
            .replace(/-+/g, '-')
            .slice(0, 80);
          var filePath = user.id + '/' + Date.now() + '-' + safeName.replace(/\.[^.]+$/, '') + '.' + imageExtension(file);
          var upload = await client.storage
            .from('post-images')
            .upload(filePath, file, {
              cacheControl: '31536000',
              contentType: file.type || 'image/jpeg',
              upsert: true
            });
          if (upload.error) throw upload.error;
          var publicUrl = client.storage.from('post-images').getPublicUrl(filePath);
          return publicUrl && publicUrl.data ? publicUrl.data.publicUrl : '';
        }

        function renderPost(post) {
          var dateValue = post.published_at || post.updated_at || post.created_at;
          var statusLabel = post.status === 'published' ? 'منشور' : 'مسودة';
          var telegramUrl = /^https?:\/\//i.test(post.telegram_url || '') ? post.telegram_url : 'https://t.me/Abdo_Research';
          return [
            '<article class="db-admin-post-item">',
              post.image_url ? '<img class="db-admin-post-thumb" src="' + escapeHtml(post.image_url) + '" alt="">' : '',
              '<div class="db-admin-post-meta">',
                '<span class="insight-tag">' + escapeHtml(post.tag || 'بحثي') + '</span>',
                '<span class="db-admin-post-status">' + statusLabel + '</span>',
              '</div>',
              '<h4>' + escapeHtml(post.title) + '</h4>',
              '<p>' + escapeHtml(post.excerpt) + '</p>',
              '<div class="db-admin-post-meta">',
                '<span>' + formatPostDate(dateValue) + '</span>',
              '</div>',
              '<div class="db-admin-post-actions">',
                '<a href="' + escapeHtml(telegramUrl) + '" class="db-admin-action-btn" target="_blank" rel="noopener noreferrer">فتح تيليجرام</a>',
                '<button class="db-admin-action-btn" type="button" data-post-action="edit" data-post-id="' + escapeHtml(post.id) + '">تعديل</button>',
                '<button class="db-admin-action-btn is-reject" type="button" data-post-action="delete" data-post-id="' + escapeHtml(post.id) + '">حذف</button>',
              '</div>',
            '</article>'
          ].join('');
        }

        function setEditingPost(post) {
          editingPostId = post ? post.id : null;
          titleInput.value = post ? (post.title || '') : '';
          tagInput.value = post ? (post.tag || 'بحثي') : 'بحثي';
          excerptInput.value = post ? (post.excerpt || '') : '';
          if (telegramUrlInput) telegramUrlInput.value = post ? (post.telegram_url || '') : '';
          contentInput.value = post ? (post.content || post.excerpt || '') : '';
          if (imageUrlInput) imageUrlInput.value = post ? (post.image_url || '') : '';
          if (imageFileInput) imageFileInput.value = '';
          setImagePreview(post ? post.image_url : '');
          statusInput.value = post && post.status === 'draft' ? 'draft' : 'published';

          if (submitLabel) submitLabel.textContent = post ? 'حفظ التعديل' : 'نشر المنشور';
          if (cancelEditBtn) cancelEditBtn.hidden = !post;
          setPostMessage(post ? 'وضع التعديل مفعل لهذا المنشور.' : '', post ? 'success' : '');
          if (post) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        async function loadPosts() {
          list.innerHTML = '<p class="db-settings-helper">جاري تحميل المنشورات...</p>';
          var result = await client
            .from('posts')
            .select('id,title,excerpt,content,image_url,telegram_url,tag,status,published_at,updated_at,created_at')
            .order('updated_at', { ascending: false })
            .limit(8);

          if (result.error && /(image_url|telegram_url)/i.test(result.error.message || '')) {
            result = await client
              .from('posts')
              .select('id,title,excerpt,content,tag,status,published_at,updated_at,created_at')
              .order('updated_at', { ascending: false })
              .limit(8);
            if (result.data) {
              result.data = result.data.map(function (post) {
                post.image_url = '';
                post.telegram_url = '';
                return post;
              });
            }
          }

          if (result.error) {
            list.innerHTML = '<p class="db-settings-helper">لم يتم تحميل المنشورات. تأكد من تشغيل ملف supabase.sql.</p>';
            console.warn('Post load failed:', result.error.message);
            return;
          }

          if (!result.data || result.data.length === 0) {
            list.innerHTML = '<p class="db-settings-helper">لا توجد منشورات بعد.</p>';
            return;
          }

          postsCache = result.data;
          list.innerHTML = postsCache.map(renderPost).join('');
        }

        form.addEventListener('submit', async function (event) {
          event.preventDefault();
          setPostMessage('', '');

          var title = titleInput.value.trim();
          var excerpt = excerptInput.value.trim();
          var telegramUrl = telegramUrlInput ? telegramUrlInput.value.trim() : '';
          var content = contentInput.value.trim() || excerpt;
          var status = statusInput.value === 'draft' ? 'draft' : 'published';
          var imageUrl = imageUrlInput ? imageUrlInput.value.trim() : '';
          var imageFile = imageFileInput && imageFileInput.files && imageFileInput.files[0]
            ? imageFileInput.files[0]
            : null;

          if (!title || !excerpt || !telegramUrl) {
            setPostMessage('أكمل العنوان والملخص ورابط تيليجرام قبل النشر.', 'error');
            return;
          }

          if (submitBtn) submitBtn.disabled = true;

          try {
            if (imageFile) {
              setPostMessage('جاري رفع صورة المنشور...', 'success');
              imageUrl = await uploadPostImage(imageFile);
            }
          } catch (error) {
            if (submitBtn) submitBtn.disabled = false;
            setPostMessage('لم يتم رفع الصورة. تأكد من تشغيل supabase.sql وإنشاء bucket باسم post-images.', 'error');
            console.warn('Post image upload failed:', error.message || error);
            return;
          }

          var payload = {
            author_id: user.id,
            title: title,
            excerpt: excerpt,
            content: content,
            telegram_url: telegramUrl,
            tag: tagInput.value.trim() || 'بحثي',
            status: status,
            published_at: status === 'published' ? new Date().toISOString() : null
          };
          if (imageUrl) payload.image_url = imageUrl;

          var saveQuery = editingPostId
            ? client.from('posts').update(payload).eq('id', editingPostId).select('id').single()
            : client.from('posts').insert(payload).select('id').single();
          var insertResult = await saveQuery;
          if (submitBtn) submitBtn.disabled = false;

          if (insertResult.error) {
            var saveMessage = /telegram_url/i.test(insertResult.error.message || '')
              ? 'لم يتم حفظ رابط تيليجرام. شغّل آخر نسخة من supabase.sql لإضافة عمود telegram_url.'
              : 'لم يتم حفظ المنشور. راجع صلاحيات الأدمن أو قاعدة البيانات.';
            setPostMessage(saveMessage, 'error');
            console.warn('Post save failed:', insertResult.error.message);
            return;
          }

          form.reset();
          if (tagInput) tagInput.value = 'بحثي';
          if (telegramUrlInput) telegramUrlInput.value = '';
          if (imageUrlInput) imageUrlInput.value = '';
          if (imageFileInput) imageFileInput.value = '';
          setImagePreview('');
          if (statusInput) statusInput.value = 'published';
          editingPostId = null;
          if (cancelEditBtn) cancelEditBtn.hidden = true;
          if (submitLabel) submitLabel.textContent = 'نشر المنشور';
          setPostMessage('تم حفظ المنشور بنجاح.', 'success');
          loadPosts();
        });

        if (imageUrlInput) {
          imageUrlInput.addEventListener('input', function () {
            setImagePreview(imageUrlInput.value);
          });
        }

        if (imageFileInput) {
          imageFileInput.addEventListener('change', function () {
            var file = imageFileInput.files && imageFileInput.files[0];
            if (!file) {
              setImagePreview(imageUrlInput ? imageUrlInput.value : '');
              return;
            }
            setImagePreview(URL.createObjectURL(file));
          });
        }

        list.addEventListener('click', async function (event) {
          var actionEl = event.target.closest('[data-post-action]');
          if (!actionEl) return;

          var postId = actionEl.getAttribute('data-post-id');
          var action = actionEl.getAttribute('data-post-action');
          var post = postsCache.find(function (item) { return item.id === postId; });

          if (action === 'edit' && post) {
            setEditingPost(post);
            return;
          }

          if (action === 'delete' && postId) {
            var ok = window.confirm('حذف هذا المنشور نهائيا؟');
            if (!ok) return;

            actionEl.disabled = true;
            var deleteResult = await client.from('posts').delete().eq('id', postId);
            if (deleteResult.error) {
              console.warn('Post delete failed:', deleteResult.error.message);
              setPostMessage('لم يتم حذف المنشور. راجع صلاحيات الأدمن.', 'error');
              actionEl.disabled = false;
              return;
            }

            if (editingPostId === postId) setEditingPost(null);
            setPostMessage('تم حذف المنشور.', 'success');
            loadPosts();
          }
        });

        if (cancelEditBtn) {
          cancelEditBtn.addEventListener('click', function () {
            form.reset();
            setEditingPost(null);
          });
        }

        loadPosts();
      }

      function initAdminVideos(client) {
        var sectionForm = document.getElementById('db-video-section-form');
        var sectionList = document.getElementById('db-admin-video-sections-list');
        var sectionMessage = document.getElementById('db-video-section-message');
        var sectionSubmitBtn = document.getElementById('db-video-section-save-btn');
        var sectionSubmitLabel = document.getElementById('db-video-section-save-label');
        var sectionCancelBtn = document.getElementById('db-video-section-cancel-edit-btn');
        var sectionLabelInput = document.getElementById('video-section-label');
        var sectionLanguageInput = document.getElementById('video-section-language');
        var sectionScopeInput = document.getElementById('video-section-scope');
        var sectionStatusInput = document.getElementById('video-section-status');
        var sectionSortInput = document.getElementById('video-section-sort-order');

        var form = document.getElementById('db-video-form');
        var list = document.getElementById('db-admin-videos-list');
        var message = document.getElementById('db-video-message');
        var submitBtn = document.getElementById('db-video-save-btn');
        var submitLabel = document.getElementById('db-video-save-label');
        var cancelEditBtn = document.getElementById('db-video-cancel-edit-btn');
        var titleInput = document.getElementById('video-title');
        var sectionInput = document.getElementById('video-section-id');
        var marketInput = document.getElementById('video-market');
        var tagInput = document.getElementById('video-tag');
        var youtubeInput = document.getElementById('video-youtube-url');
        var descriptionInput = document.getElementById('video-description');
        var statusInput = document.getElementById('video-status');
        var sortInput = document.getElementById('video-sort-order');

        var editingSectionId = null;
        var editingVideoId = null;
        var sectionsCache = [];
        var videosCache = [];

        if (!client || !form || !list || !sectionForm || !sectionList) return;

        function setMessage(node, text, type) {
          if (!node) return;
          node.textContent = text || '';
          node.classList.remove('is-success', 'is-error');
          if (type) node.classList.add('is-' + type);
        }

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

        function makeSlug(label) {
          var base = String(label || '').trim().toLowerCase()
            .replace(/[^\w\u0600-\u06FF]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return base || ('section-' + Date.now());
        }

        function sectionLanguage(value, slug, label) {
          var raw = String(value || '').toLowerCase();
          if (raw === 'en' || raw === 'english') return 'en';
          if (raw === 'ar' || raw === 'arabic') return 'ar';
          var slugText = String(slug || '').toLowerCase();
          if (slugText.indexOf('en-') === 0) return 'en';
          if (slugText.indexOf('ar-') === 0) return 'ar';
          return /[\u0600-\u06ff]/.test(String(label || '')) ? 'ar' : 'en';
        }

        function makeSectionSlug(label, language) {
          var lang = language === 'en' ? 'en' : 'ar';
          var slug = makeSlug(label);
          return slug.indexOf(lang + '-') === 0 ? slug : lang + '-' + slug;
        }

        function extractYoutubeId(url) {
          var text = String(url || '').trim();
          if (!text) return '';
          var patterns = [
            /youtu\.be\/([A-Za-z0-9_-]{6,})/,
            /youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]{6,})/,
            /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
            /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
          ];
          for (var i = 0; i < patterns.length; i++) {
            var match = text.match(patterns[i]);
            if (match && match[1]) return match[1];
          }
          return '';
        }

        function buildYoutubeEmbedUrl(url) {
          var id = extractYoutubeId(url);
          return id ? 'https://www.youtube.com/embed/' + id + '?rel=0&controls=1' : '';
        }

        function marketLabel(value) {
          return {
            saudi: 'السعودية',
            uae: 'الإمارات',
            egypt: 'مصر',
            qatar: 'قطر',
            kuwait: 'بورصة الكويت'
          }[value] || 'عام';
        }

        function formatDate(value) {
          if (!value) return 'غير منشور';
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

        function sectionById(id) {
          return sectionsCache.find(function (section) { return section.id === id; }) || null;
        }

        function sectionScopeLabel(section) {
          return section && section.market_scoped ? 'منفصل حسب السوق' : 'كل الأسواق';
        }

        function sectionLanguageLabel(section) {
          return sectionLanguage(section && section.language, section && section.slug, section && section.label) === 'en' ? 'English' : 'العربية';
        }

        function renderSection(section) {
          var statusLabel = section.status === 'published' ? 'ظاهر' : 'مخفي';
          return [
            '<article class="db-admin-post-item">',
              '<div class="db-admin-post-meta">',
                '<span class="insight-tag">' + sectionScopeLabel(section) + '</span>',
                '<span class="insight-tag">' + sectionLanguageLabel(section) + '</span>',
                '<span class="db-admin-post-status">' + statusLabel + '</span>',
              '</div>',
              '<h4>' + escapeHtml(section.label) + '</h4>',
              '<p>ترتيب العرض: ' + escapeHtml(section.sort_order || 0) + ' · الرمز: ' + escapeHtml(section.slug || '') + '</p>',
              '<div class="db-admin-post-actions">',
                '<button class="db-admin-action-btn" type="button" data-video-section-action="edit" data-video-section-id="' + escapeHtml(section.id) + '">تعديل</button>',
                '<button class="db-admin-action-btn is-reject" type="button" data-video-section-action="delete" data-video-section-id="' + escapeHtml(section.id) + '">حذف القسم</button>',
              '</div>',
            '</article>'
          ].join('');
        }

        function populateSectionSelect(selectedId) {
          sectionInput.innerHTML = '';
          if (!sectionsCache.length) {
            sectionInput.innerHTML = '<option value="">أضف قسماً أولاً</option>';
            sectionInput.disabled = true;
            return;
          }
          sectionInput.disabled = false;
          sectionInput.innerHTML = sectionsCache.map(function (section) {
            return '<option value="' + escapeHtml(section.id) + '"' + (section.id === selectedId ? ' selected' : '') + '>' + escapeHtml(section.label) + '</option>';
          }).join('');
        }

        function syncMarketAvailability() {
          var section = sectionById(sectionInput.value);
          var isMarketScoped = Boolean(section && section.market_scoped);
          marketInput.disabled = !isMarketScoped;
          marketInput.title = isMarketScoped ? '' : 'هذا القسم يظهر في كل الأسواق';
          if (tagInput && !tagInput.value.trim()) tagInput.value = isMarketScoped ? 'تحليل سوق' : 'تعليمي';
        }

        function setEditingSection(section) {
          editingSectionId = section ? section.id : null;
          sectionLabelInput.value = section ? (section.label || '') : '';
          if (sectionLanguageInput) sectionLanguageInput.value = section ? sectionLanguage(section.language, section.slug, section.label) : 'ar';
          sectionScopeInput.value = section && section.market_scoped ? 'market' : 'global';
          sectionStatusInput.value = section && section.status === 'draft' ? 'draft' : 'published';
          sectionSortInput.value = section && section.sort_order != null ? section.sort_order : 0;
          if (sectionSubmitLabel) sectionSubmitLabel.textContent = section ? 'حفظ تعديل القسم' : 'حفظ القسم';
          if (sectionCancelBtn) sectionCancelBtn.hidden = !section;
          setMessage(sectionMessage, section ? 'وضع التعديل مفعل لهذا القسم.' : '', section ? 'success' : '');
          if (section) sectionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        async function loadSections() {
          sectionList.innerHTML = '<p class="db-settings-helper">جاري تحميل أقسام الفيديو...</p>';
          var result = await client
            .from('video_sections')
            .select('id,slug,label,language,market_scoped,status,sort_order,created_at,updated_at')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: true });

          if (result.error && /language/i.test(result.error.message || '')) {
            result = await client
              .from('video_sections')
              .select('id,slug,label,market_scoped,status,sort_order,created_at,updated_at')
              .order('sort_order', { ascending: true })
              .order('created_at', { ascending: true });
          }

          if (result.error) {
            sectionList.innerHTML = '<p class="db-settings-helper">لم يتم تحميل الأقسام. شغل ملف supabase.sql لتفعيل إدارة الأقسام.</p>';
            list.innerHTML = '<p class="db-settings-helper">لم يتم تحميل الفيديوهات لأن جدول الأقسام غير جاهز.</p>';
            console.warn('Video section load failed:', result.error.message);
            populateSectionSelect('');
            return;
          }

          sectionsCache = result.data || [];
          sectionList.innerHTML = sectionsCache.length
            ? sectionsCache.map(renderSection).join('')
            : '<p class="db-settings-helper">لا توجد أقسام بعد. أضف أول قسم من النموذج.</p>';

          populateSectionSelect(editingVideoId ? sectionInput.value : (sectionsCache[0] && sectionsCache[0].id));
          syncMarketAvailability();
        }

        function renderVideo(video) {
          var section = sectionById(video.section_id);
          var statusLabel = video.status === 'published' ? 'منشور' : 'مسودة';
          var marketText = section && section.market_scoped ? marketLabel(video.market) : 'كل الأسواق';
          return [
            '<article class="db-admin-post-item">',
              '<div class="db-admin-post-meta">',
                '<span class="insight-tag">' + escapeHtml(video.tag || 'فيديو') + '</span>',
                '<span class="db-admin-post-status">' + statusLabel + '</span>',
              '</div>',
              '<h4>' + escapeHtml(video.title) + '</h4>',
              '<p>' + escapeHtml(video.description) + '</p>',
              '<div class="db-admin-post-meta">',
                '<span>' + escapeHtml(section ? section.label : 'بدون قسم') + ' · ' + marketText + '</span>',
                '<span>' + formatDate(video.published_at || video.updated_at || video.created_at) + '</span>',
              '</div>',
              '<div class="db-admin-post-actions">',
                '<a href="' + escapeHtml(video.youtube_url) + '" class="db-admin-action-btn" target="_blank" rel="noopener noreferrer">يوتيوب</a>',
                '<button class="db-admin-action-btn" type="button" data-video-action="edit" data-video-id="' + escapeHtml(video.id) + '">تعديل</button>',
                '<button class="db-admin-action-btn is-reject" type="button" data-video-action="delete" data-video-id="' + escapeHtml(video.id) + '">حذف</button>',
              '</div>',
            '</article>'
          ].join('');
        }

        function setEditingVideo(video) {
          editingVideoId = video ? video.id : null;
          titleInput.value = video ? (video.title || '') : '';
          populateSectionSelect(video ? video.section_id : (sectionsCache[0] && sectionsCache[0].id));
          marketInput.value = video && video.market ? video.market : 'saudi';
          tagInput.value = video ? (video.tag || '') : '';
          youtubeInput.value = video ? (video.youtube_url || '') : '';
          descriptionInput.value = video ? (video.description || '') : '';
          statusInput.value = video && video.status === 'draft' ? 'draft' : 'published';
          sortInput.value = video && video.sort_order != null ? video.sort_order : 0;
          syncMarketAvailability();

          if (submitLabel) submitLabel.textContent = video ? 'حفظ تعديل الفيديو' : 'حفظ الفيديو';
          if (cancelEditBtn) cancelEditBtn.hidden = !video;
          setMessage(message, video ? 'وضع التعديل مفعل لهذا الفيديو.' : '', video ? 'success' : '');
          if (video) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        async function loadVideos() {
          list.innerHTML = '<p class="db-settings-helper">جاري تحميل مكتبة الفيديو...</p>';
          var result = await client
            .from('videos')
            .select('id,title,description,youtube_url,embed_url,tag,category,section_id,market,status,sort_order,published_at,updated_at,created_at')
            .order('updated_at', { ascending: false })
            .limit(40);

          if (result.error) {
            list.innerHTML = '<p class="db-settings-helper">لم يتم تحميل الفيديوهات. شغل ملف supabase.sql لتفعيل مكتبة الفيديو.</p>';
            console.warn('Video load failed:', result.error.message);
            return;
          }

          videosCache = result.data || [];
          list.innerHTML = videosCache.length
            ? videosCache.map(renderVideo).join('')
            : '<p class="db-settings-helper">لا توجد فيديوهات بعد.</p>';
        }

        sectionForm.addEventListener('submit', async function (event) {
          event.preventDefault();
          setMessage(sectionMessage, '', '');
          var label = sectionLabelInput.value.trim();
          var language = sectionLanguageInput && sectionLanguageInput.value === 'en' ? 'en' : 'ar';
          var sortOrder = Number(sectionSortInput.value || 0);
          if (!label) {
            setMessage(sectionMessage, 'اكتب اسم القسم قبل الحفظ.', 'error');
            return;
          }
          if (sectionSubmitBtn) sectionSubmitBtn.disabled = true;

          var payload = {
            label: label,
            language: language,
            market_scoped: sectionScopeInput.value === 'market',
            status: sectionStatusInput.value === 'draft' ? 'draft' : 'published',
            sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
          };
          if (!editingSectionId) payload.slug = makeSectionSlug(label, language);

          var saveQuery = editingSectionId
            ? client.from('video_sections').update(payload).eq('id', editingSectionId).select('id').single()
            : client.from('video_sections').insert(payload).select('id').single();
          var saveResult = await saveQuery;
          if (saveResult.error && /language/i.test(saveResult.error.message || '')) {
            var fallbackPayload = Object.assign({}, payload);
            delete fallbackPayload.language;
            saveResult = await (editingSectionId
              ? client.from('video_sections').update(fallbackPayload).eq('id', editingSectionId).select('id').single()
              : client.from('video_sections').insert(fallbackPayload).select('id').single());
          }
          if (sectionSubmitBtn) sectionSubmitBtn.disabled = false;

          if (saveResult.error) {
            setMessage(sectionMessage, 'لم يتم حفظ القسم. راجع صلاحيات الأدمن أو قاعدة البيانات.', 'error');
            console.warn('Video section save failed:', saveResult.error.message);
            return;
          }

          sectionForm.reset();
          if (sectionLanguageInput) sectionLanguageInput.value = 'ar';
          sectionScopeInput.value = 'market';
          sectionStatusInput.value = 'published';
          sectionSortInput.value = 0;
          editingSectionId = null;
          if (sectionCancelBtn) sectionCancelBtn.hidden = true;
          if (sectionSubmitLabel) sectionSubmitLabel.textContent = 'حفظ القسم';
          setMessage(sectionMessage, 'تم حفظ القسم بنجاح.', 'success');
          await loadSections();
          await loadVideos();
        });

        sectionList.addEventListener('click', async function (event) {
          var actionEl = event.target.closest('[data-video-section-action]');
          if (!actionEl) return;
          var sectionId = actionEl.getAttribute('data-video-section-id');
          var action = actionEl.getAttribute('data-video-section-action');
          var section = sectionById(sectionId);

          if (action === 'edit' && section) {
            setEditingSection(section);
            return;
          }

          if (action === 'delete' && sectionId) {
            var ok = window.confirm('حذف هذا القسم؟ الفيديوهات المرتبطة به ستبقى في قاعدة البيانات بدون قسم حتى تنقلها.');
            if (!ok) return;
            actionEl.disabled = true;
            var deleteResult = await client.from('video_sections').delete().eq('id', sectionId);
            if (deleteResult.error) {
              actionEl.disabled = false;
              setMessage(sectionMessage, 'لم يتم حذف القسم. راجع صلاحيات الأدمن.', 'error');
              console.warn('Video section delete failed:', deleteResult.error.message);
              return;
            }
            if (editingSectionId === sectionId) setEditingSection(null);
            setMessage(sectionMessage, 'تم حذف القسم.', 'success');
            await loadSections();
            await loadVideos();
          }
        });

        form.addEventListener('submit', async function (event) {
          event.preventDefault();
          setMessage(message, '', '');
          var title = titleInput.value.trim();
          var section = sectionById(sectionInput.value);
          var youtubeUrl = youtubeInput.value.trim();
          var embedUrl = buildYoutubeEmbedUrl(youtubeUrl);
          var description = descriptionInput.value.trim();
          var status = statusInput.value === 'draft' ? 'draft' : 'published';
          var sortOrder = Number(sortInput.value || 0);

          if (!section) {
            setMessage(message, 'اختر القسم أولاً. إن لم تجد أي قسم في القائمة، أضف قسماً من نموذج "الأقسام" بالأعلى ثم عُد لإضافة الفيديو.', 'error');
            return;
          }
          if (!title || !youtubeUrl || !description) {
            setMessage(message, 'أكمل العنوان والرابط والوصف قبل الحفظ.', 'error');
            return;
          }
          if (!embedUrl) {
            setMessage(message, 'رابط YouTube غير صحيح. استخدم رابط مشاهدة أو Shorts أو youtu.be.', 'error');
            return;
          }
          if (submitBtn) submitBtn.disabled = true;

          var payload = {
            title: title,
            description: description,
            youtube_url: youtubeUrl,
            embed_url: embedUrl,
            tag: tagInput.value.trim() || (section.market_scoped ? 'تحليل سوق' : 'فيديو'),
            category: section.market_scoped ? 'analysis' : 'tutorials',
            section_id: section.id,
            market: section.market_scoped ? marketInput.value : null,
            status: status,
            sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
            published_at: status === 'published' ? new Date().toISOString() : null
          };

          var saveQuery = editingVideoId
            ? client.from('videos').update(payload).eq('id', editingVideoId).select('id').single()
            : client.from('videos').insert(payload).select('id').single();
          var saveResult = await saveQuery;
          if (submitBtn) submitBtn.disabled = false;

          if (saveResult.error) {
            setMessage(message, 'لم يتم حفظ الفيديو. راجع صلاحيات الأدمن أو شغل ملف supabase.sql.', 'error');
            console.warn('Video save failed:', saveResult.error.message);
            return;
          }

          form.reset();
          populateSectionSelect(sectionsCache[0] && sectionsCache[0].id);
          marketInput.value = 'saudi';
          statusInput.value = 'published';
          sortInput.value = 0;
          editingVideoId = null;
          if (cancelEditBtn) cancelEditBtn.hidden = true;
          if (submitLabel) submitLabel.textContent = 'حفظ الفيديو';
          syncMarketAvailability();
          setMessage(message, 'تم حفظ الفيديو بنجاح.', 'success');
          loadVideos();
        });

        list.addEventListener('click', async function (event) {
          var actionEl = event.target.closest('[data-video-action]');
          if (!actionEl) return;
          var videoId = actionEl.getAttribute('data-video-id');
          var action = actionEl.getAttribute('data-video-action');
          var video = videosCache.find(function (item) { return item.id === videoId; });

          if (action === 'edit' && video) {
            setEditingVideo(video);
            return;
          }

          if (action === 'delete' && videoId) {
            var ok = window.confirm('حذف هذا الفيديو نهائيا من مكتبة الفيديو؟');
            if (!ok) return;
            actionEl.disabled = true;
            var deleteResult = await client.from('videos').delete().eq('id', videoId);
            if (deleteResult.error) {
              actionEl.disabled = false;
              setMessage(message, 'لم يتم حذف الفيديو. راجع صلاحيات الأدمن.', 'error');
              console.warn('Video delete failed:', deleteResult.error.message);
              return;
            }
            if (editingVideoId === videoId) setEditingVideo(null);
            setMessage(message, 'تم حذف الفيديو.', 'success');
            loadVideos();
          }
        });

        sectionInput.addEventListener('change', syncMarketAvailability);
        if (sectionCancelBtn) {
          sectionCancelBtn.addEventListener('click', function () {
            sectionForm.reset();
            sectionScopeInput.value = 'market';
            sectionStatusInput.value = 'published';
            sectionSortInput.value = 0;
            setEditingSection(null);
          });
        }
        if (cancelEditBtn) {
          cancelEditBtn.addEventListener('click', function () {
            form.reset();
            setEditingVideo(null);
          });
        }

        loadSections().then(loadVideos);
      }

      function initAccountApprovals(client, adminUser) {
        var list = document.getElementById('db-admin-users-list');
        if (!client || !list) return;

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

        function statusClass(status) {
          if (status === 'approved') return 'is-approved';
          if (status === 'rejected') return 'is-rejected';
          return 'is-pending';
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

        function renderUser(profile) {
          var isSelf = profile.id === adminUser.id;
          var name = profile.full_name || profile.email || 'مستخدم جديد';
          var email = profile.email || '';
          var status = profile.access_status || 'pending';
          return [
            '<article class="db-admin-user-item" data-profile-id="' + escapeHtml(profile.id) + '">',
              '<div class="db-admin-user-main">',
                '<strong>' + escapeHtml(name) + '</strong>',
                '<span>' + escapeHtml(email) + '</span>',
                '<div class="db-admin-user-meta">',
                  '<span class="db-access-pill ' + statusClass(status) + '">' + accessStatusLabel(status) + '</span>',
                  '<span class="db-access-pill">' + (formatDate(profile.created_at) || 'بدون تاريخ') + '</span>',
                  (isSelf ? '<span class="db-access-pill is-approved">أنت</span>' : ''),
                '</div>',
              '</div>',
              '<div class="db-admin-user-actions">',
                '<button class="db-admin-action-btn is-approve" type="button" data-access-action="approved" data-profile-id="' + escapeHtml(profile.id) + '"' + (status === 'approved' ? ' disabled' : '') + '>قبول</button>',
                '<button class="db-admin-action-btn is-reject" type="button" data-access-action="rejected" data-profile-id="' + escapeHtml(profile.id) + '"' + (isSelf || status === 'rejected' ? ' disabled' : '') + '>رفض</button>',
              '</div>',
            '</article>'
          ].join('');
        }

        async function loadProfiles() {
          list.innerHTML = '<p class="db-settings-helper">جاري تحميل طلبات الحسابات...</p>';
          var result = await client
            .from('profiles')
            .select('id,full_name,email,access_status,created_at,reviewed_at')
            .order('created_at', { ascending: false })
            .limit(80);

          if (result.error) {
            list.innerHTML = '<p class="db-settings-helper">لم يتم تحميل المستخدمين. أعد تشغيل ملف supabase.sql لتفعيل الموافقات.</p>';
            console.warn('Profiles load failed:', result.error.message);
            return;
          }

          if (!result.data || result.data.length === 0) {
            list.innerHTML = '<p class="db-settings-helper">لا توجد حسابات مسجلة بعد.</p>';
            return;
          }

          list.innerHTML = result.data.map(renderUser).join('');
        }

        list.addEventListener('click', async function (event) {
          var button = event.target.closest('[data-access-action]');
          if (!button) return;

          var profileId = button.getAttribute('data-profile-id');
          var nextStatus = button.getAttribute('data-access-action');
          if (!profileId || !nextStatus) return;

          var buttons = list.querySelectorAll('button[data-profile-id="' + profileId + '"]');
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
          }

          var result = await client
            .from('profiles')
            .update({
              access_status: nextStatus,
              reviewed_at: new Date().toISOString(),
              reviewed_by: adminUser.id
            })
            .eq('id', profileId);

          if (result.error) {
            console.warn('Profile update failed:', result.error.message);
          }

          loadProfiles();
        });

        loadProfiles();
      }
    })();
  