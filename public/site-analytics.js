(function () {
  'use strict';

  var script = document.currentScript;
  if (!script) return;

  var measurementId = script.dataset.measurementId;
  var siteArea = script.dataset.siteArea || 'static_page';
  var contentName = script.dataset.contentName || document.title;
  var storageKey = 'aminhanifm.analyticsOptOut';
  var isPrivacyPage = siteArea === 'privacy';
  var scrollThresholds = [25, 50, 75, 90];
  var engagementMilestones = [15, 30, 60, 120];

  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return;

  function setOptOut(enabled) {
    try {
      if (enabled) {
        window.localStorage.setItem(storageKey, 'true');
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch (error) {}
  }

  function getOptOut() {
    try {
      return window.localStorage.getItem(storageKey) === 'true';
    } catch (error) {
      return false;
    }
  }

  var params = new URLSearchParams(window.location.search);
  var analyticsMode = params.get('analytics');
  if (analyticsMode === 'off') setOptOut(true);
  if (analyticsMode === 'on') setOptOut(false);

  if (analyticsMode === 'off' || analyticsMode === 'on') {
    params.delete('analytics');
    var query = params.toString();
    var nextUrl = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
    window.history.replaceState(null, document.title, nextUrl);
  }

  window.__aminAnalyticsOptedOut = analyticsMode === 'off'
    ? true
    : analyticsMode === 'on'
      ? false
      : getOptOut();
  window['ga-disable-' + measurementId] = window.__aminAnalyticsOptedOut;
  document.documentElement.dataset.analytics = window.__aminAnalyticsOptedOut ? 'disabled' : 'enabled';
  if (window.__aminAnalyticsOptedOut) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    analytics_storage: isPrivacyPage ? 'denied' : 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('set', 'ads_data_redaction', true);

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(loader);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    anonymize_ip: true,
    content_group: siteArea,
    content_name: contentName,
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
    site_area: siteArea,
  });

  function track(eventName, eventParams) {
    var payload = Object.assign({
      site_area: siteArea,
      content_name: contentName,
    }, eventParams || {});
    window.gtag('event', eventName, payload);
  }

  function linkCategory(hostname) {
    if (hostname === 'play.google.com') return 'play_store';
    if (hostname === 'apps.apple.com') return 'app_store';
    if (hostname === 'drive.google.com') return 'google_drive';
    if (hostname === 'github.com') return 'github';
    if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) return 'linkedin';
    if (hostname.endsWith('.itch.io')) return 'itch_io';
    return 'external_website';
  }

  function safeControlName(element) {
    var candidate = element.dataset.analyticsAction
      || element.id
      || element.getAttribute('name')
      || element.getAttribute('aria-label');

    if (!candidate && element.tagName === 'BUTTON') {
      var text = (element.textContent || '').trim();
      if (/^[A-Za-z][A-Za-z ]{1,31}$/.test(text)) candidate = text;
    }

    if (!candidate || candidate.includes('@') || candidate.includes('://')) return null;
    return candidate
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 48) || null;
  }

  function scrollPercentage() {
    var documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    var viewportBottom = window.scrollY + window.innerHeight;
    if (documentHeight <= window.innerHeight) return 100;
    return Math.min(100, Math.round((viewportBottom / documentHeight) * 100));
  }

  var seenSections = new Set();
  var sentScrollThresholds = new Set();
  var sentEngagementMilestones = new Set();
  var activeSeconds = 0;
  var maxScrollPercent = scrollPercentage();
  var errorEventSent = false;

  function updateScrollDepth() {
    maxScrollPercent = Math.max(maxScrollPercent, scrollPercentage());
    scrollThresholds.forEach(function (threshold) {
      if (maxScrollPercent < threshold || sentScrollThresholds.has(threshold)) return;
      sentScrollThresholds.add(threshold);
      track('scroll_depth', { scroll_percent: threshold });
    });
  }

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var element = entry.target;
      var sectionName = element.dataset.analyticsSection || element.id;
      if (!sectionName || seenSections.has(sectionName)) return;

      seenSections.add(sectionName);
      track('section_view', {
        section_name: sectionName,
        section_position: seenSections.size,
      });
      sectionObserver.unobserve(element);
    });
  }, { rootMargin: '-18% 0px -48% 0px', threshold: 0.05 });

  document.querySelectorAll('[data-analytics-section], main section[id], main article[id]').forEach(function (section) {
    sectionObserver.observe(section);
  });

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;

    var link = event.target.closest('a[href]');
    if (link) {
      var href = link.getAttribute('href') || '';

      if (href.startsWith('mailto:')) {
        track(isPrivacyPage ? 'privacy_contact_click' : 'contact_click', {
          contact_method: 'email',
          request_type: href.toLowerCase().includes('deletion') ? 'data_deletion' : 'support',
        });
        return;
      }

      var url = new URL(link.href, window.location.href);
      var isDownload = link.hasAttribute('download')
        || /\.(apk|csv|docx?|gif|jpe?g|json|pdf|png|webp|xlsx?|zip)$/i.test(url.pathname);

      if (isDownload) {
        var fileMatch = url.pathname.match(/\.([a-z0-9]+)$/i);
        track('file_download', {
          file_extension: fileMatch ? fileMatch[1].toLowerCase() : 'unknown',
          link_domain: url.hostname,
        });
      } else if (url.hostname !== window.location.hostname) {
        track('outbound_link_click', {
          link_category: linkCategory(url.hostname),
          link_domain: url.hostname,
        });
      } else if (url.pathname.startsWith('/privacy/')) {
        var policySlug = url.pathname.split('/').filter(Boolean).pop() || 'directory';
        track('privacy_policy_select', { policy_slug: policySlug });
      } else if (url.pathname !== window.location.pathname) {
        track('internal_navigation_click', { target_path: url.pathname });
      }

      return;
    }

    var button = event.target.closest('button, [role="button"]');
    if (!button) return;

    var actionName = safeControlName(button);
    if (actionName) track('ui_action', { action_name: actionName });
  });

  document.addEventListener('submit', function (event) {
    if (!(event.target instanceof HTMLFormElement)) return;
    var formName = safeControlName(event.target) || 'unnamed_form';
    track('form_submit', { form_name: formName });
  });

  var engagementTimer = window.setInterval(function () {
    if (document.visibilityState !== 'visible') return;

    activeSeconds += 1;
    engagementMilestones.forEach(function (milestone) {
      if (activeSeconds < milestone || sentEngagementMilestones.has(milestone)) return;
      sentEngagementMilestones.add(milestone);
      track('engagement_milestone', { engagement_seconds: milestone });
    });
  }, 1000);

  function trackClientError(errorType) {
    if (errorEventSent) return;
    errorEventSent = true;
    track('client_error', { error_type: errorType });
  }

  window.addEventListener('error', function (event) {
    trackClientError(event instanceof ErrorEvent ? 'runtime' : 'resource');
  }, true);
  window.addEventListener('unhandledrejection', function () {
    trackClientError('unhandled_promise');
  });
  window.addEventListener('scroll', updateScrollDepth, { passive: true });
  window.addEventListener('pagehide', function () {
    window.clearInterval(engagementTimer);
    track('page_engagement_summary', {
      engagement_seconds: activeSeconds,
      max_scroll_percent: maxScrollPercent,
      sections_viewed: seenSections.size,
      transport_type: 'beacon',
    });
  }, { once: true });

  updateScrollDepth();
})();
