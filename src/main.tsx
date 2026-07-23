import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initGoogleAnalytics, initPortfolioAnalytics } from './analytics';
import './assets/index.css';

initGoogleAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

window.requestAnimationFrame(() => initPortfolioAnalytics());
