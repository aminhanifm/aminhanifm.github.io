const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const ANALYTICS_OPT_OUT_KEY = 'aminhanifm.analyticsOptOut';
const SITE_AREA = 'portfolio';
const SCROLL_THRESHOLDS = [25, 50, 75, 90];
const ENGAGEMENT_MILESTONES = [15, 30, 60, 120];

type AnalyticsEventValue = string | number | boolean;
type AnalyticsEventParams = Record<string, AnalyticsEventValue | null | undefined>;
type GtagArguments = [command: string, ...args: unknown[]];

declare global {
  interface Window {
    __aminAnalyticsOptedOut?: boolean;
    __aminPortfolioAnalyticsInitialized?: boolean;
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

function isAnalyticsOptedOut() {
  if (typeof window.__aminAnalyticsOptedOut === 'boolean') {
    return window.__aminAnalyticsOptedOut;
  }

  try {
    return window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === 'true';
  } catch {
    return false;
  }
}

function applyAnalyticsPreferenceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const analyticsMode = params.get('analytics');
  if (analyticsMode !== 'off' && analyticsMode !== 'on') return;

  try {
    if (analyticsMode === 'off') {
      window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, 'true');
    } else {
      window.localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
    }
  } catch {
    // The in-memory flag still applies when storage is unavailable.
  }

  window.__aminAnalyticsOptedOut = analyticsMode === 'off';
  if (GA_MEASUREMENT_ID) {
    const analyticsWindow = window as unknown as Record<string, unknown>;
    analyticsWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = analyticsMode === 'off';
  }

  params.delete('analytics');
  const query = params.toString();
  const nextUrl = window.location.pathname + (query ? `?${query}` : '') + window.location.hash;
  window.history.replaceState(null, document.title, nextUrl);
}

function currentPagePath() {
  return window.location.pathname + window.location.search;
}

function linkCategory(hostname: string) {
  if (hostname === 'play.google.com') return 'play_store';
  if (hostname === 'apps.apple.com') return 'app_store';
  if (hostname === 'drive.google.com') return 'google_drive';
  if (hostname === 'github.com') return 'github';
  if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) return 'linkedin';
  if (hostname.endsWith('.itch.io')) return 'itch_io';
  return 'external_website';
}

function scrollPercentage() {
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
  const viewportBottom = window.scrollY + window.innerHeight;

  if (documentHeight <= window.innerHeight) return 100;
  return Math.min(100, Math.round((viewportBottom / documentHeight) * 100));
}

export function initGoogleAnalytics() {
  applyAnalyticsPreferenceFromUrl();

  if (!GA_MEASUREMENT_ID || isAnalyticsOptedOut()) {
    document.documentElement.dataset.analytics = 'disabled';
    return;
  }

  document.documentElement.dataset.analytics = 'enabled';
  if (window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: GtagArguments) => {
    window.dataLayer?.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('set', 'ads_data_redaction', true);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    anonymize_ip: true,
    page_title: document.title,
    page_path: currentPagePath(),
    site_area: SITE_AREA,
  });
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!window.gtag || isAnalyticsOptedOut()) {
    return;
  }

  const eventParams = Object.fromEntries(
    Object.entries({
      site_area: SITE_AREA,
      ...params,
    }).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, AnalyticsEventValue>;

  window.gtag('event', eventName, eventParams);
}

export function initPortfolioAnalytics() {
  if (window.__aminPortfolioAnalyticsInitialized) return;
  window.__aminPortfolioAnalyticsInitialized = true;

  const seenSections = new Set<string>();
  const sentScrollThresholds = new Set<number>();
  const sentEngagementMilestones = new Set<number>();
  let activeSeconds = 0;
  let maxScrollPercent = scrollPercentage();
  let errorEventSent = false;

  const updateScrollDepth = () => {
    maxScrollPercent = Math.max(maxScrollPercent, scrollPercentage());

    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (maxScrollPercent < threshold || sentScrollThresholds.has(threshold)) return;
      sentScrollThresholds.add(threshold);
      trackEvent('scroll_depth', { scroll_percent: threshold });
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionName = (entry.target as HTMLElement).dataset.analyticsSection;
        if (!sectionName || seenSections.has(sectionName)) return;

        seenSections.add(sectionName);
        trackEvent('section_view', {
          section_name: sectionName,
          section_position: seenSections.size,
        });
        sectionObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '-18% 0px -48% 0px', threshold: 0.05 },
  );

  document.querySelectorAll<HTMLElement>('[data-analytics-section]').forEach((section) => {
    sectionObserver.observe(section);
  });

  const engagementTimer = window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;

    activeSeconds += 1;
    ENGAGEMENT_MILESTONES.forEach((milestone) => {
      if (activeSeconds < milestone || sentEngagementMilestones.has(milestone)) return;
      sentEngagementMilestones.add(milestone);
      trackEvent('engagement_milestone', { engagement_seconds: milestone });
    });
  }, 1000);

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (!link || !link.href.startsWith('http')) return;

    const url = new URL(link.href, window.location.href);
    if (url.hostname === window.location.hostname) return;

    trackEvent('outbound_link_click', {
      link_domain: url.hostname,
      link_category: linkCategory(url.hostname),
    });
  };

  const trackClientError = (errorType: 'runtime' | 'resource' | 'unhandled_promise') => {
    if (errorEventSent) return;
    errorEventSent = true;
    trackEvent('client_error', { error_type: errorType });
  };

  const onWindowError = (event: ErrorEvent | Event) => {
    trackClientError(event instanceof ErrorEvent ? 'runtime' : 'resource');
  };

  const onPageHide = () => {
    window.clearInterval(engagementTimer);
    trackEvent('page_engagement_summary', {
      engagement_seconds: activeSeconds,
      max_scroll_percent: maxScrollPercent,
      sections_viewed: seenSections.size,
      transport_type: 'beacon',
    });
  };

  window.addEventListener('scroll', updateScrollDepth, { passive: true });
  document.addEventListener('click', onDocumentClick);
  window.addEventListener('error', onWindowError, true);
  window.addEventListener('unhandledrejection', () => trackClientError('unhandled_promise'));
  window.addEventListener('pagehide', onPageHide, { once: true });

  updateScrollDepth();
}
