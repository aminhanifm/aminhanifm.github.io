(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeLabel = document.querySelector('[data-theme-label]');
  var missingPath = document.querySelector('[data-missing-path]');
  var lostWorld = document.querySelector('[data-lost-world]');
  var storedTheme = 'dark';
  var requestedRoute = null;

  try {
    var missingRoute = new URLSearchParams(window.location.search).get('missing');
    if (missingRoute && missingRoute.charAt(0) === '/' && missingRoute.slice(0, 2) !== '//') {
      var requestedUrl = new URL(missingRoute, window.location.origin);
      if (requestedUrl.origin === window.location.origin) {
        requestedRoute = requestedUrl.pathname + requestedUrl.search + requestedUrl.hash;
        window.history.replaceState(null, document.title, requestedRoute);
      }
    }
  } catch (error) {}

  try {
    storedTheme = window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch (error) {}

  function applyTheme(theme) {
    var nextTheme = theme === 'light' ? 'light' : 'dark';
    var targetTheme = nextTheme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Use ' + targetTheme + ' theme');
    }
    if (themeLabel) {
      themeLabel.textContent = targetTheme.charAt(0).toUpperCase() + targetTheme.slice(1);
    }

    try {
      window.localStorage.setItem('theme', nextTheme);
    } catch (error) {}
  }

  applyTheme(storedTheme);

  if (missingPath) {
    missingPath.textContent = requestedRoute || window.location.pathname || '/';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  if (lostWorld && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    lostWorld.addEventListener('pointermove', function (event) {
      var bounds = lostWorld.getBoundingClientRect();
      var x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      var y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      lostWorld.style.setProperty('--pointer-x', x.toFixed(2) + 'px');
      lostWorld.style.setProperty('--pointer-y', y.toFixed(2) + 'px');
    });

    lostWorld.addEventListener('pointerleave', function () {
      lostWorld.style.setProperty('--pointer-x', '0px');
      lostWorld.style.setProperty('--pointer-y', '0px');
    });
  }
})();
