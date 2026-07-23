import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function googleAnalyticsPlugin(): Plugin {
  return {
    name: 'inject-google-analytics',
    transformIndexHtml(html) {
      const measurementId = process.env.VITE_GA_MEASUREMENT_ID?.trim();

      if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) {
        return html;
      }

      const encodedMeasurementId = encodeURIComponent(measurementId);
      const escapedMeasurementId = JSON.stringify(measurementId);
      const snippet = `
    <script>
      (function() {
        var measurementId = ${escapedMeasurementId};
        var storageKey = 'aminhanifm.analyticsOptOut';
        var params = new URLSearchParams(window.location.search);
        var analyticsMode = params.get('analytics');

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

        if (analyticsMode === 'off') {
          setOptOut(true);
        } else if (analyticsMode === 'on') {
          setOptOut(false);
        }

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
      })();
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}"></script>
    <script>
      if (!window.__aminAnalyticsOptedOut) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}
        window.gtag('consent', 'default', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
        window.gtag('set', 'ads_data_redaction', true);
        window.gtag('js', new Date());
        window.gtag('config', ${escapedMeasurementId}, {
          allow_ad_personalization_signals: false,
          allow_google_signals: false,
          anonymize_ip: true,
          page_title: document.title,
          page_path: window.location.pathname + window.location.search,
          site_area: 'portfolio'
        });
      }
    </script>`;

      return html.replace('</head>', `${snippet}
  </head>`);
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), googleAnalyticsPlugin()],
});
