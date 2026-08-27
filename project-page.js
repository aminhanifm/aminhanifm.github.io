(function () {
  'use strict';

  var themeButton = document.querySelector('[data-theme-toggle]');
  var themeLabel = document.querySelector('[data-theme-label]');
  var scrollProgress = document.querySelector('[data-scroll-progress]');
  var siteHeader = document.querySelector('.site-header');
  var mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
  var mobileNavigation = document.querySelector('[data-mobile-navigation]');
  var mobileMenuClose = document.querySelector('[data-mobile-menu-close]');
  var shareButton = document.querySelector('[data-share-project]');
  var root = document.documentElement;
  var localeConfig = window.__aminLocaleConfig;

  function formatMessage(value, replacements) {
    if (typeof value !== 'string' || !replacements) return value;
    return Object.keys(replacements).reduce(function (message, key) {
      return message.replaceAll('{{' + key + '}}', String(replacements[key]));
    }, value);
  }

  function localeMessage(key, replacements) {
    if (!localeConfig) return key;
    var locale = root.dataset.locale || localeConfig.defaultLocale;
    var messages = localeConfig.messages[locale] || localeConfig.messages[localeConfig.defaultLocale];
    var value = key.split('.').reduce(function (result, segment) {
      return result && result[segment];
    }, messages);
    if (typeof value === 'string') return formatMessage(value, replacements);

    var fallback = localeConfig.messages[localeConfig.defaultLocale];
    var fallbackValue = key.split('.').reduce(function (result, segment) {
      return result && result[segment];
    }, fallback) || key;
    return formatMessage(fallbackValue, replacements);
  }

  function pageContentValue(key) {
    if (!localeConfig || !localeConfig.pageContent) return null;
    var locale = root.dataset.locale || localeConfig.defaultLocale;
    var content = localeConfig.pageContent[locale]
      || localeConfig.pageContent[localeConfig.defaultLocale]
      || {};
    var value = key.split('.').reduce(function (result, segment) {
      return result && result[segment];
    }, content);
    if (typeof value === 'string') return value;

    var fallback = localeConfig.pageContent[localeConfig.defaultLocale] || {};
    return key.split('.').reduce(function (result, segment) {
      return result && result[segment];
    }, fallback);
  }

  function applyLocale(localeCode, persist) {
    if (!localeConfig) return;
    var locale = localeConfig.locales.find(function (item) { return item.code === localeCode; })
      || localeConfig.locales.find(function (item) { return item.code === localeConfig.defaultLocale; })
      || localeConfig.locales[0];

    root.dataset.locale = locale.code;
    root.lang = locale.code;
    root.dir = locale.direction;
    if (siteHeader) {
      siteHeader.lang = locale.code;
      siteHeader.dir = locale.direction;
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (element) {
      element.textContent = localeMessage(element.dataset.i18n, {
        count: element.dataset.i18nCount,
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria-label]'), function (element) {
      element.setAttribute('aria-label', localeMessage(element.dataset.i18nAriaLabel));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-title]'), function (element) {
      element.setAttribute('title', localeMessage(element.dataset.i18nTitle));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-project-i18n]'), function (element) {
      var value = pageContentValue(element.dataset.projectI18n);
      if (typeof value === 'string') element.textContent = value;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-project-media-key]'), function (element) {
      var value = pageContentValue(element.dataset.projectMediaKey);
      if (typeof value !== 'string') return;
      element.dataset.galleryAlt = value;
      element.setAttribute('aria-label', localeMessage('detail.openMedia', { label: value }));
    });

    if (persist) {
      try {
        window.localStorage.setItem(localeConfig.storageKey, locale.code);
      } catch (error) {}
      if (window.gtag && window.__aminAnalyticsOptedOut !== true) {
        window.gtag('event', 'language_change', {
          language_to: locale.code,
          source: 'project_header',
          site_area: 'portfolio',
        });
      }
    }

    updateThemeButton();
    window.dispatchEvent(new CustomEvent('amin:locale-applied', {
      detail: { locale: locale.code },
    }));
  }

  function readStoredTheme() {
    try {
      return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    } catch (error) {
      return 'dark';
    }
  }

  function syncStoredTheme() {
    var storedTheme = readStoredTheme();
    root.dataset.theme = storedTheme;
    root.style.colorScheme = storedTheme;
    updateThemeButton();
  }

  function updateThemeButton() {
    if (!themeButton) return;
    var isLight = root.dataset.theme === 'light';
    var nextTheme = isLight ? 'dark' : 'light';
    var switchLabel = localeConfig
      ? localeMessage(isLight ? 'theme.switchToDark' : 'theme.switchToLight')
      : 'Switch to ' + nextTheme + ' mode';
    themeButton.setAttribute('aria-label', switchLabel);
    themeButton.setAttribute('title', switchLabel);
    themeButton.setAttribute('aria-pressed', String(isLight));
    if (themeLabel) {
      themeLabel.textContent = localeConfig
        ? localeMessage(isLight ? 'theme.dark' : 'theme.light')
        : isLight ? 'Dark' : 'Light';
    }
  }

  if (localeConfig) {
    applyLocale(root.dataset.locale || localeConfig.defaultLocale, false);
    window.addEventListener('amin:language-change', function (event) {
      if (!event.detail || typeof event.detail.locale !== 'string') return;
      applyLocale(event.detail.locale, true);
    });
  }

  if (themeButton) {
    syncStoredTheme();
    themeButton.addEventListener('click', function () {
      var nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      try {
        window.localStorage.setItem('theme', nextTheme);
      } catch (error) {}
      updateThemeButton();
    });
  }

  window.addEventListener('storage', function (event) {
    if (event.key === null || event.key === 'theme') syncStoredTheme();
    if (localeConfig && (event.key === null || event.key === localeConfig.storageKey)) {
      applyLocale(event.newValue || localeConfig.defaultLocale, false);
    }
  });
  window.addEventListener('pageshow', function () {
    syncStoredTheme();
    if (!localeConfig) return;
    try {
      applyLocale(
        window.localStorage.getItem(localeConfig.storageKey) || root.dataset.locale,
        false,
      );
    } catch (error) {
      applyLocale(root.dataset.locale, false);
    }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    syncStoredTheme();
    if (!localeConfig) return;
    try {
      applyLocale(
        window.localStorage.getItem(localeConfig.storageKey) || root.dataset.locale,
        false,
      );
    } catch (error) {
      applyLocale(root.dataset.locale, false);
    }
  });

  function setMobileMenuOpen(isOpen, restoreFocus) {
    if (!siteHeader || !mobileMenuButton || !mobileNavigation || !mobileMenuClose) return;

    siteHeader.classList.toggle('is-menu-open', isOpen);
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    var menuLabel = localeConfig
      ? localeMessage(isOpen ? 'nav.close' : 'nav.open')
      : isOpen ? 'Close navigation menu' : 'Open navigation menu';
    mobileMenuButton.setAttribute('aria-label', menuLabel);
    mobileMenuButton.setAttribute('title', menuLabel);
    mobileNavigation.hidden = !isOpen;
    mobileMenuClose.hidden = !isOpen;

    if (isOpen) {
      window.requestAnimationFrame(function () {
        var firstLink = mobileNavigation.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      });
    } else if (restoreFocus) {
      mobileMenuButton.focus({ preventScroll: true });
    }
  }

  if (mobileMenuButton && mobileNavigation && mobileMenuClose) {
    mobileMenuButton.addEventListener('click', function () {
      setMobileMenuOpen(mobileMenuButton.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenuClose.addEventListener('click', function () {
      setMobileMenuOpen(false);
    });
    Array.prototype.forEach.call(mobileNavigation.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () {
        setMobileMenuOpen(false);
      });
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenuButton.getAttribute('aria-expanded') === 'true') {
        setMobileMenuOpen(false, true);
      }
    });

    var mobileHeaderBreakpoint = window.matchMedia('(max-width: 640px)');
    mobileHeaderBreakpoint.addEventListener('change', function (event) {
      if (!event.matches) setMobileMenuOpen(false);
    });
  }

  if (scrollProgress || siteHeader) {
    var progressFrame = 0;
    var updateHeader = function () {
      window.cancelAnimationFrame(progressFrame);
      progressFrame = window.requestAnimationFrame(function () {
        if (siteHeader) siteHeader.classList.toggle('is-compact', window.scrollY > 28);
        if (scrollProgress) {
          var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
          var progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
          scrollProgress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, progress)) + ')';
        }
      });
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    window.addEventListener('pageshow', updateHeader);
    updateHeader();
  }

  var galleryTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-open]'));
  var galleryLightbox = document.querySelector('[data-gallery-lightbox]');

  if (galleryTriggers.length && galleryLightbox) {
    var lightboxDialog = galleryLightbox.querySelector('.gallery-lightbox-dialog');
    var lightboxStage = galleryLightbox.querySelector('[data-lightbox-stage]');
    var lightboxTitle = galleryLightbox.querySelector('[data-lightbox-title]');
    var lightboxCounter = galleryLightbox.querySelector('[data-lightbox-counter]');
    var lightboxCaption = galleryLightbox.querySelector('[data-lightbox-caption]');
    var lightboxPrevious = galleryLightbox.querySelector('[data-lightbox-prev]');
    var lightboxNext = galleryLightbox.querySelector('[data-lightbox-next]');
    var lightboxCloseControls = galleryLightbox.querySelectorAll('[data-lightbox-close]');
    var activeGalleryIndex = 0;
    var lastGalleryTrigger = null;

    function stopLightboxMedia() {
      var activeVideo = lightboxStage.querySelector('video');
      if (activeVideo) activeVideo.pause();
    }

    function renderLightboxMedia(index) {
      activeGalleryIndex = (index + galleryTriggers.length) % galleryTriggers.length;
      var trigger = galleryTriggers[activeGalleryIndex];
      var kind = trigger.dataset.galleryKind;
      var source = trigger.dataset.gallerySrc;
      var poster = trigger.dataset.galleryPoster;
      var alt = trigger.dataset.galleryAlt || 'Project media';
      var media;

      stopLightboxMedia();
      lightboxStage.textContent = '';

      if (kind === 'video') {
        media = document.createElement('video');
        media.src = source;
        if (poster) media.poster = poster;
        media.controls = true;
        media.autoplay = true;
        media.muted = true;
        media.playsInline = true;
        media.preload = 'metadata';
        media.setAttribute('aria-label', alt);
      } else {
        media = document.createElement('img');
        media.src = source;
        media.alt = alt;
        media.decoding = 'async';
      }

      lightboxStage.appendChild(media);
      lightboxTitle.textContent = alt;
      lightboxCaption.textContent = alt;
      lightboxCounter.textContent = localeMessage('detail.counter', {
        position: activeGalleryIndex + 1,
        count: galleryTriggers.length,
      });
      lightboxPrevious.hidden = galleryTriggers.length < 2;
      lightboxNext.hidden = galleryTriggers.length < 2;
    }

    function closeGalleryLightbox() {
      stopLightboxMedia();
      galleryLightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', onLightboxKeydown);
      if (lastGalleryTrigger && lastGalleryTrigger.isConnected) lastGalleryTrigger.focus();
    }

    function onLightboxKeydown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGalleryLightbox();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        renderLightboxMedia(activeGalleryIndex - 1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        renderLightboxMedia(activeGalleryIndex + 1);
        return;
      }
      if (event.key !== 'Tab') return;

      var focusable = Array.prototype.slice.call(
        galleryLightbox.querySelectorAll('button:not([disabled]):not([hidden]), video[controls]')
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function openGalleryLightbox(trigger) {
      lastGalleryTrigger = trigger;
      galleryLightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      renderLightboxMedia(Number(trigger.dataset.galleryIndex) || 0);
      document.addEventListener('keydown', onLightboxKeydown);
      lightboxDialog.focus();
    }

    galleryTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openGalleryLightbox(trigger);
      });
    });
    lightboxCloseControls.forEach(function (control) {
      control.addEventListener('click', closeGalleryLightbox);
    });
    lightboxPrevious.addEventListener('click', function () {
      renderLightboxMedia(activeGalleryIndex - 1);
    });
    lightboxNext.addEventListener('click', function () {
      renderLightboxMedia(activeGalleryIndex + 1);
    });
  }

  if (!shareButton) return;

  var resetTimer = null;

  function showStatus(labelKey) {
    shareButton.textContent = localeMessage(labelKey);
    if (resetTimer) window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(function () {
      shareButton.textContent = localeMessage('detail.share');
    }, 1800);
  }

  async function copyProjectUrl() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      return;
    }

    var textarea = document.createElement('textarea');
    textarea.value = window.location.href;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    var copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Unable to copy project URL.');
  }

  shareButton.addEventListener('click', async function () {
    var shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || '',
      url: window.location.href,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }

    try {
      await copyProjectUrl();
      showStatus('drawer.copied');
    } catch (error) {
      showStatus('drawer.copy');
    }
  });
})();
