/* ============================================================
   KAMIKOI SUSHI FUSION  |  FX layer (bold, high-energy)  |  ThatsKrispy
   Adds scroll progress, site-wide reveals, hero parallax + scroll cue,
   festive photo headers, and the homepage party hero.
   All reveal classes are added here in JS, so with JS disabled the page
   renders fully visible (no hidden content). Motion respects
   prefers-reduced-motion.
   ============================================================ */
'use strict';

/* -- PAGE-HEADER PHOTOS (festive / women-enjoying imagery behind titles) --- */
(function () {
  var page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  var MAP = {
    about: 'kamikoi-venue-miami',
    gallery: 'kamikoi-ladies-night-drinks',
    contact: 'kamikoi-interior-dining-miami',
    menu: 'kamikoi-signature-sushi-rolls',
    privacy: 'kamikoi-interior-dining-miami',
    accessibility: 'kamikoi-interior-dining-miami'
  };
  // Homepage hero: use a fun, younger party photo, never the empty-venue shot.
  if (page === 'index') {
    var heroImg = document.querySelector('.hero__img');
    if (heroImg && /nightlife-hero-miami|ladies-night-miami/.test(heroImg.getAttribute('src') || '')) {
      heroImg.setAttribute('src', 'assets/images/kamikoi-events-hero.webp');
      heroImg.setAttribute('alt', 'Young guests cheering with sparklers and cocktails at KamiKoi Sushi Fusion in Miami');
      heroImg.style.objectPosition = 'center 28%';
    }
  }
  var img = MAP[page];
  if (!img) return;
  var el = document.querySelector('.menu-hero') || document.querySelector('.page-head');
  if (!el) return;
  var ov = page === 'menu'
    ? 'rgba(8,8,10,.5),rgba(8,8,10,.72)'
    : 'rgba(8,8,11,.3),rgba(8,8,11,.58) 68%,rgba(8,8,11,.74)';
  el.style.backgroundImage = "linear-gradient(180deg," + ov + "),url('assets/images/" + img + ".webp')";
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = 'center 30%';
  el.classList.add('kk-photohead');
  var s = document.createElement('style');
  s.textContent = '.kk-photohead{min-height:clamp(340px,50vh,500px);display:flex;flex-direction:column;'
    + 'align-items:center;justify-content:center}'
    + '.kk-photohead h1,.kk-photohead p,.kk-photohead .eyebrow{text-shadow:0 2px 18px rgba(0,0,0,.8)}'
    + '.kk-photohead h1,.kk-photohead p{color:#fff}';
  document.head.appendChild(s);
})();

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
