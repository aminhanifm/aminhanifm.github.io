const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

type GtagCommand = 'config' | 'event' | 'js' | 'set';

type GtagArguments =
  | [GtagCommand, string | Date]
  | [GtagCommand, string, Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || window.gtag) {
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
