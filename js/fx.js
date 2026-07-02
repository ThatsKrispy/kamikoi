/* ============================================================
   KAMIKOI SUSHI FUSION  |  FX layer (bold, high-energy)  |  ThatsKrispy
   Brand accent, live order/review links, festive photo headers, rotating
   food cover, scroll progress, site-wide reveals, hero parallax + cue.
   All reveal classes are added here in JS, so with JS disabled the page
   renders fully visible (no hidden content). Motion respects
   prefers-reduced-motion.
   ============================================================ */
'use strict';

/* -- BRAND: match accent to the logo red + calmer buttons (all pages) --- */
(function () {
  var s = document.createElement('style');
  s.textContent =
    ':root{--crimson:#ed1c24;--crimson-d:#c2121b;' +
    '--glow-red:0 0 13px rgba(237,28,36,.26);--glow-mag:0 0 15px rgba(232,54,143,.30)}' +
    '.btn-primary{animation:none;box-shadow:0 4px 16px rgba(237,28,36,.26)}' +
    '.btn-primary:hover{box-shadow:0 6px 22px rgba(237,28,36,.42)}' +
    '.navbar__order{animation:none;box-shadow:0 3px 14px rgba(237,28,36,.22)}';
  document.head.appendChild(s);
})();

/* -- LIVE ORDER + REVIEW LINKS (all pages) --- */
(function () {
  var UBER = 'https://www.ubereats.com/store/kami-koi-sushi-fusion/H_1ltwIhQrSnu_xtrYCXhA';
  var GRUB = 'https://www.grubhub.com/restaurant/kami-koi-sushi-fusion-13816-sw-56th-st-miami/10610608';
  var TOAST = 'https://www.toasttab.com/local/order/kami-koi-sushi-fusion-13816-southwest-56th-street';
  var YELP = 'https://www.yelp.com/biz/kami-koi-sushi-fusion-kendale-lakes';
  document.querySelectorAll('a.order-chip').forEach(function (a) {
    var h = a.getAttribute('href') || '';
    if (/ubereats\.com/.test(h)) a.href = UBER;
    else if (/grubhub\.com/.test(h)) a.href = GRUB;
    else if (/doordash\.com/.test(h)) { a.href = TOAST; a.textContent = 'Order Online'; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  });
  document.querySelectorAll('.footer__social').forEach(function (soc) {
    if (soc.querySelector('[data-yelp]')) return;
    var y = document.createElement('a');
    y.href = YELP; y.target = '_blank'; y.rel = 'noopener noreferrer';
    y.setAttribute('aria-label', 'Yelp'); y.setAttribute('data-yelp', '1');
    y.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 21l1.5-6.8L2.2 9l6.9-.7z"/></svg>';
    soc.appendChild(y);
  });
})();

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
  // Homepage hero: rotate through a few high-impact shots (starts on the steak/risotto).
  if (page === 'index') {
    var heroImg = document.querySelector('.hero__img');
    var reduceM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (heroImg && !reduceM) {
      var shots = ['kamikoi-fusion-plating', 'kamikoi-gallery-21', 'kamikoi-gallery-24', 'kamikoi-events-hero'];
      var hidx = 0;
      heroImg.style.transition = 'opacity .7s ease, transform 8s ease';
      setInterval(function () {
        hidx = (hidx + 1) % shots.length;
        var pre = new Image();
        pre.onload = function () {
          heroImg.style.opacity = '0';
          setTimeout(function () {
            heroImg.src = 'assets/images/' + shots[hidx] + '.webp';
            heroImg.style.opacity = '1';
          }, 350);
        };
        pre.src = 'assets/images/' + shots[hidx] + '.webp';
      }, 6000);
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
