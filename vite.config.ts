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
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${escapedMeasurementId}, {
        page_title: document.title,
        page_path: window.location.pathname + window.location.search + window.location.hash
      });
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
