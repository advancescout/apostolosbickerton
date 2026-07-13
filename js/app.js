(function () {
  'use strict';
  var root = document.documentElement;
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var STORAGE_KEY = 'apostolos-theme';
  var DEFAULT = 'ultramodern';

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    chips.forEach(function (c) {
      var on = c.getAttribute('data-set') === theme;
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
    // Replay the entrance animation when switching themes
    document.querySelectorAll('.panel').forEach(function (p) {
      p.style.animation = 'none';
      // force reflow then restore
      void p.offsetWidth;
      p.style.animation = '';
    });
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      apply(c.getAttribute('data-set'), true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Restore saved theme (default ultramodern)
  var saved = DEFAULT;
  try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT; } catch (e) {}
  apply(saved, false);

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Burger menu ----
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var scrim = document.getElementById('drawerScrim');
    var closeBtn = document.getElementById('drawerClose');

    function openMenu() {
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      var first = drawer.querySelector('.drawer__link');
      if (first) first.focus();
    }
    function closeMenu(returnFocus) {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      if (returnFocus !== false) burger.focus();
    }
    function toggleMenu() {
      if (document.body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    }

    burger.addEventListener('click', toggleMenu);
    if (scrim) scrim.addEventListener('click', function () { closeMenu(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { closeMenu(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
    });
    // Close after choosing a destination (don't steal focus back for anchors)
    drawer.querySelectorAll('.drawer__link').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(false); });
    });
  }

  // Windows 98 live clock
  function tick() {
    var el = document.getElementById('win98Clock');
    if (!el) return;
    var d = new Date();
    var h = d.getHours(); var m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    el.textContent = h + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
  }
  tick();
  setInterval(tick, 15000);
})();
