const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const ANALYTICS_OPT_OUT_KEY = 'aminhanifm.analyticsOptOut';

type GtagCommand = 'config' | 'event' | 'js' | 'set';
type AnalyticsEventValue = string | number | boolean;
type AnalyticsEventParams = Record<string, AnalyticsEventValue | null | undefined>;

type GtagArguments =
  | [GtagCommand, string | Date]
  | [GtagCommand, string, Record<string, AnalyticsEventValue>];

declare global {
  interface Window {
    __aminAnalyticsOptedOut?: boolean;
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

function isAnalyticsOptedOut() {
  if (window.__aminAnalyticsOptedOut === true) {
    return true;
  }

  try {
    return window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === 'true';
  } catch (error) {
    return false;
  }
}

export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || window.gtag || isAnalyticsOptedOut()) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: GtagArguments) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    page_title: document.title,
    page_path: window.location.pathname + window.location.search + window.location.hash,
  });
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!window.gtag || isAnalyticsOptedOut()) {
    return;
  }

  const eventParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, AnalyticsEventValue>;

  window.gtag('event', eventName, eventParams);
}
