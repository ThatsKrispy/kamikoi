/* ============================================================
   KAMIKOI SUSHI FUSION  |  v1  |  ThatsKrispy
   ============================================================ */
'use strict';

/* -- NAVBAR SCROLL SHADOW ---------------------------------- */
(function () {
  var nav = document.querySelector('.navbar');
  if (!nav) return;
  var tick = false;
  window.addEventListener('scroll', function () {
    if (!tick) {
      requestAnimationFrame(function () {
        nav.classList.toggle('scrolled', window.scrollY > 8);
        tick = false;
      });
      tick = true;
    }
  });
})();

/* -- HERO KEN BURNS ---------------------------------------- */
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  setTimeout(function () { hero.classList.add('loaded'); }, 60);
})();

/* -- MOBILE NAV -------------------------------------------- */
(function () {
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();

/* -- ACTIVE NAV LINK --------------------------------------- */
(function () {
  var raw = window.location.pathname;
  var path = raw.split('/').pop().replace(/\.html$/, '') || 'index';
  document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\.html$/, '').split('/').pop() || 'index';
    if (path === href) a.classList.add('active');
  });
})();

/* -- SCROLL REVEAL ----------------------------------------- */
(function () {
  var items = document.querySelectorAll('.fade-up');
  if (!window.IntersectionObserver) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });
  items.forEach(function (el) { io.observe(el); });
  ['.stats-bar__inner', '.feature-grid'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (group) {
      group.querySelectorAll('.fade-up, .stat, .feature').forEach(function (el, i) {
        el.style.transitionDelay = (i * 70) + 'ms';
      });
    });
  });
})();

/* -- MENU SECTION-NAV ACTIVE STATE ------------------------- */
(function () {
  var links = document.querySelectorAll('.menu-nav a');
  if (!links.length || !window.IntersectionObserver) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-140px 0px -70% 0px' });
  document.querySelectorAll('.menu-cat').forEach(function (s) { io.observe(s); });
})();

/* -- FAQ ACCORDION ----------------------------------------- */
(function () {
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      if (!item) return;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
})();

/* -- GALLERY LIGHTBOX --------------------------------------- */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid img'));
  if (!imgs.length) return;
  var lb = null, lbImg, lbCount, idx = 0, lastFocus = null;

  function build() {
    lb = document.createElement('div');
    lb.className = 'kk-lb';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      '<img class="kk-lb__img" alt="">' +
      '<span class="kk-lb__count" aria-hidden="true"></span>' +
      '<button type="button" class="kk-lb__btn kk-lb__close" aria-label="Close photo viewer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
      '<button type="button" class="kk-lb__btn kk-lb__prev" aria-label="Previous photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg></button>' +
      '<button type="button" class="kk-lb__btn kk-lb__next" aria-label="Next photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg></button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.kk-lb__img');
    lbCount = lb.querySelector('.kk-lb__count');
    lb.querySelector('.kk-lb__close').addEventListener('click', close);
    lb.querySelector('.kk-lb__prev').addEventListener('click', function () { nav(-1); });
    lb.querySelector('.kk-lb__next').addEventListener('click', function () { nav(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') nav(-1);
      else if (e.key === 'ArrowRight') nav(1);
    });
  }

  function show() {
    var src = imgs[idx].currentSrc || imgs[idx].src;
    lbImg.src = src;
    lbImg.alt = imgs[idx].alt || '';
    lbCount.textContent = (idx + 1) + ' / ' + imgs.length;
  }
  function nav(dir) { idx = (idx + dir + imgs.length) % imgs.length; show(); }
  function open(i) {
    if (!lb) build();
    idx = i;
    show();
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lb.classList.add('open'); });
    lb.querySelector('.kk-lb__close').focus();
  }
  function close() {
    lb.classList.remove('open');
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  imgs.forEach(function (img, i) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'photo'));
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });
})();

/* -- CONTACT FORM (Web3Forms) ------------------------------ */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var statusEl = form.querySelector('.form-status');
    var btn = form.querySelector('[type="submit"]');
    var orig = btn.textContent;
    btn.textContent = 'Sending...'; btn.disabled = true;
    if (statusEl) { statusEl.className = 'form-status'; statusEl.textContent = ''; }
    var payload = { access_key: form.dataset.accessKey, from_name: 'KamiKoi Website' };
    new FormData(form).forEach(function (v, k) { payload[k] = v; });
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        btn.textContent = orig; btn.disabled = false;
        if (statusEl) {
          if (res.success) {
            statusEl.className = 'form-status success';
            statusEl.textContent = "Thank you! We'll get back to you shortly.";
            form.reset();
          } else { throw new Error(); }
        }
      })
      .catch(function () {
        btn.textContent = orig; btn.disabled = false;
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = 'Something went wrong. Please call (305) 967-8286 or email info@kamikoisushifusion.com.';
        }
      });
  });
})();

/* -- NEWSLETTER FORMS -------------------------------------- */
(function () {
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var orig = btn.textContent;
      btn.textContent = '...'; btn.disabled = true;
      var payload = { access_key: form.dataset.accessKey, from_name: 'KamiKoi Website', subject: 'Newsletter Sign-Up - KamiKoi Sushi Fusion' };
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          btn.textContent = res.success ? "You're in!" : orig;
          btn.disabled = false;
          if (res.success) form.reset();
        })
        .catch(function () { btn.textContent = orig; btn.disabled = false; });
    });
  });
})();
