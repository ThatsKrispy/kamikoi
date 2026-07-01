/* ============================================================
   KAMIKOI SUSHI FUSION  |  FX layer (bold, high-energy)  |  ThatsKrispy
   Adds scroll progress, site-wide reveals, hero parallax + scroll cue.
   All reveal classes are added here in JS, so with JS disabled the page
   renders fully visible (no hidden content). Motion respects
   prefers-reduced-motion.
   ============================================================ */
'use strict';
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -- SCROLL PROGRESS BAR ----------------------------------- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  function progress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', function () { requestAnimationFrame(progress); }, { passive: true });
  progress();

  if (reduce || !('IntersectionObserver' in window)) return;

  /* -- SITE-WIDE SCROLL REVEALS ------------------------------ */
  function tag(el, fx, delay) {
    if (!el || el.classList.contains('fade-up') || el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    if (fx) el.setAttribute('data-fx', fx);
    if (delay) el.style.transitionDelay = delay + 'ms';
  }

  // staggered grids
  var grids = ['.specials-grid', '.feature-grid', '.cat-grid', '.gallery-grid',
    '.gallery-grid--page', '.reviews', '.drink-grid', '.menu-pricegrid', '.order-row'];
  grids.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (g) {
      Array.prototype.slice.call(g.children).forEach(function (c, i) {
        tag(c, sel.indexOf('gallery') > -1 ? 'scale' : '', (i % 6) * 80);
      });
    });
  });

  // single blocks
  var singles = ['.split__img', '.split__text', '.event-feature__img', '.event-feature__text',
    '.section > .container > .text-center', '.page-head > *', '.menu-hero > *',
    '.hh-schedule', '.faq-item', '.contact-grid > *', '.split h2', '.band__inner'];
  singles.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { tag(el, ''); });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    // reveal immediately if already in view on load (avoids flash)
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add('in'); }
    else { io.observe(el); }
  });

  /* -- HERO PARALLAX + SCROLL CUE ---------------------------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var content = hero.querySelector('.hero__content');
    var cue = document.createElement('div');
    cue.className = 'scroll-cue';
    cue.setAttribute('aria-hidden', 'true');
    cue.innerHTML = '<span></span>';
    hero.appendChild(cue);
    if (content) {
      document.addEventListener('scroll', function () {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < 820) {
            content.style.transform = 'translateY(' + (y * 0.18) + 'px)';
            content.style.opacity = String(Math.max(0, 1 - y / 580));
            cue.style.opacity = String(Math.max(0, 1 - y / 180));
          }
        });
      }, { passive: true });
    }
  }
})();
