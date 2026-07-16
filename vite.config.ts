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

        window.__aminAnalyticsOptedOut = getOptOut();
        window['ga-disable-' + measurementId] = window.__aminAnalyticsOptedOut;
      })();
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}"></script>
    <script>
      if (!window.__aminAnalyticsOptedOut) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${escapedMeasurementId}, {
          page_title: document.title,
          page_path: window.location.pathname + window.location.search + window.location.hash
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
