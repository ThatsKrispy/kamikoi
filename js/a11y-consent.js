/* ============================================================
   KAMIKOI SUSHI FUSION — Cookie Consent + Accessibility Toolbar
   Self-contained, zero-dependency, no third-party calls.
   Styled to match the site (dark neon theme, Jost / Playfair).
   Site by ThatsKrispy.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     THEME + STYLES (injected once, matches css/style.css)
     ========================================================== */
  var CSS = `
  :root{
    --kk-crimson:#E4141F; --kk-crimson-d:#B30F18; --kk-gold:#E7B84B;
    --kk-magenta:#E8368F; --kk-ink:#0E0D11; --kk-ink-2:#151219;
    --kk-ink-3:#1E1A24; --kk-text:#E9E5E0; --kk-muted:#A7A1AC;
    --kk-line:rgba(255,255,255,.12);
  }
  .kk-cc, .kk-cc *, .kk-a11y, .kk-a11y *{ box-sizing:border-box; }

  /* ---------- COOKIE CONSENT ---------- */
  .kk-cc{
    position:fixed; left:0; right:0; bottom:0; z-index:100000;
    background:linear-gradient(180deg,rgba(20,18,25,.98),rgba(10,9,13,.99));
    backdrop-filter:blur(10px);
    border-top:2px solid transparent;
    border-image:linear-gradient(90deg,var(--kk-crimson),var(--kk-gold),var(--kk-magenta)) 1;
    box-shadow:0 -14px 40px rgba(0,0,0,.55);
    color:var(--kk-text); font-family:'Jost',system-ui,sans-serif;
    animation:kk-slide-up .45s cubic-bezier(.16,.84,.44,1);
  }
  @keyframes kk-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
  .kk-cc__inner{
    max-width:1200px; margin:0 auto; padding:20px 22px;
    display:flex; align-items:center; gap:22px; flex-wrap:wrap;
  }
  .kk-cc__text{ flex:1; min-width:260px; }
  .kk-cc__text strong{
    display:block; font-family:'Playfair Display',serif; font-weight:700;
    font-size:1.12rem; color:#fff; margin-bottom:4px;
  }
  .kk-cc__text p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--kk-muted); }
  .kk-cc__text a{ color:var(--kk-gold); text-decoration:underline; }
  .kk-cc__actions{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
  .kk-btn{
    font-family:'Jost',sans-serif; font-weight:600; font-size:.82rem;
    letter-spacing:.04em; text-transform:uppercase; cursor:pointer;
    border-radius:50px; padding:12px 22px; border:2px solid transparent;
    transition:.2s ease; white-space:nowrap; line-height:1;
  }
  .kk-btn--solid{ background:var(--kk-crimson); color:#fff; border-color:var(--kk-crimson);
    box-shadow:0 0 18px rgba(228,20,31,.5); }
  .kk-btn--solid:hover,.kk-btn--solid:focus-visible{ background:var(--kk-crimson-d);
    transform:translateY(-2px); box-shadow:0 0 28px rgba(228,20,31,.7); outline:none; }
  .kk-btn--gold{ background:var(--kk-gold); color:#12100c; border-color:var(--kk-gold); }
  .kk-btn--gold:hover,.kk-btn--gold:focus-visible{ background:#d3a53a; transform:translateY(-2px); outline:none; }
  .kk-btn--ghost{ background:transparent; color:#fff; border-color:var(--kk-line); }
  .kk-btn--ghost:hover,.kk-btn--ghost:focus-visible{ border-color:var(--kk-gold); color:var(--kk-gold); outline:none; }
  .kk-btn:focus-visible{ outline:3px solid var(--kk-gold); outline-offset:2px; }

  .kk-cc__panel{ border-top:1px solid var(--kk-line); background:rgba(0,0,0,.25); }
  .kk-cc__panel[hidden]{ display:none; }
  .kk-cc__panel-inner{ max-width:1200px; margin:0 auto; padding:6px 22px 20px;
    display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .kk-cc__opt{ background:var(--kk-ink-3); border:1px solid var(--kk-line);
    border-radius:12px; padding:16px; }
  .kk-cc__opt-top{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:6px; }
  .kk-cc__opt-title{ font-weight:700; color:#fff; font-size:.95rem; }
  .kk-cc__opt-desc{ font-size:.82rem; color:var(--kk-muted); line-height:1.45; margin:0; }
  .kk-cc__badge{ font-size:.62rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
    background:rgba(231,184,75,.16); color:var(--kk-gold); border:1px solid rgba(231,184,75,.4);
    padding:3px 9px; border-radius:50px; }
  .kk-cc__panel-actions{ max-width:1200px; margin:0 auto; padding:0 22px 20px; }

  /* toggle switch */
  .kk-switch{ position:relative; width:46px; height:26px; flex-shrink:0; }
  .kk-switch input{ position:absolute; opacity:0; width:0; height:0; }
  .kk-switch__s{ position:absolute; inset:0; background:#3a343f; border-radius:26px; cursor:pointer; transition:.2s; }
  .kk-switch__s::before{ content:''; position:absolute; width:20px; height:20px; left:3px; top:3px;
    background:#fff; border-radius:50%; transition:.2s; }
  .kk-switch input:checked + .kk-switch__s{ background:var(--kk-crimson); box-shadow:0 0 12px rgba(228,20,31,.6); }
  .kk-switch input:checked + .kk-switch__s::before{ transform:translateX(20px); }
  .kk-switch input:disabled + .kk-switch__s{ background:var(--kk-gold); opacity:.65; cursor:not-allowed; }
  .kk-switch input:focus-visible + .kk-switch__s{ outline:3px solid var(--kk-gold); outline-offset:2px; }

  /* persistent "manage cookies" reopen button */
  .kk-cc-reopen{ position:fixed; left:18px; bottom:22px; z-index:99990;
    display:inline-flex; align-items:center; gap:7px; background:var(--kk-ink-2);
    color:var(--kk-muted); border:1px solid var(--kk-line); border-radius:50px;
    padding:9px 15px; font-family:'Jost',sans-serif; font-size:.75rem; font-weight:600;
    letter-spacing:.03em; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,.4); transition:.2s; }
  .kk-cc-reopen:hover,.kk-cc-reopen:focus-visible{ color:#fff; border-color:var(--kk-crimson);
    box-shadow:0 0 18px rgba(228,20,31,.4); outline:none; }
  .kk-cc-reopen svg{ width:15px; height:15px; }

  /* ---------- ACCESSIBILITY TOOLBAR ---------- */
  .kk-a11y-btn{ position:fixed; right:24px; bottom:24px; z-index:99991;
    width:56px; height:56px; border-radius:50%; cursor:pointer; padding:0;
    background:var(--kk-ink-2); border:2px solid var(--kk-crimson);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 24px rgba(0,0,0,.45),0 0 16px rgba(228,20,31,.35); transition:.2s; }
  .kk-a11y-btn:hover,.kk-a11y-btn:focus-visible{ transform:scale(1.08);
    border-color:var(--kk-gold); box-shadow:0 0 26px rgba(231,184,75,.6); outline:none; }
  .kk-a11y-btn svg{ width:28px; height:28px; color:var(--kk-gold); }
  .kk-a11y-btn:hover svg,.kk-a11y-btn:focus-visible svg{ color:#fff; }

  .kk-a11y-panel{ position:fixed; right:24px; bottom:92px; z-index:99992;
    width:330px; max-width:calc(100vw - 32px); max-height:calc(100vh - 130px); overflow-y:auto;
    background:linear-gradient(180deg,var(--kk-ink-2),var(--kk-ink));
    border:1px solid var(--kk-line); border-radius:16px;
    box-shadow:0 22px 60px rgba(0,0,0,.6); color:var(--kk-text);
    font-family:'Jost',sans-serif; animation:kk-pop .25s ease; }
  @keyframes kk-pop{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .kk-a11y-panel[hidden]{ display:none; }
  .kk-a11y-head{ display:flex; align-items:center; justify-content:space-between;
    padding:16px 18px; border-bottom:1px solid var(--kk-line);
    background:linear-gradient(90deg,rgba(228,20,31,.14),transparent); }
  .kk-a11y-head h2{ margin:0; font-family:'Playfair Display',serif; font-size:1.15rem; color:#fff; }
  .kk-a11y-close{ background:none; border:none; color:var(--kk-muted); font-size:1.5rem;
    line-height:1; cursor:pointer; padding:4px 8px; border-radius:8px; }
  .kk-a11y-close:hover,.kk-a11y-close:focus-visible{ color:#fff; background:rgba(255,255,255,.1); outline:none; }
  .kk-a11y-body{ padding:16px 18px 20px; }
  .kk-a11y-label{ font-size:.68rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
    color:var(--kk-gold); margin:16px 0 9px; }
  .kk-a11y-label:first-child{ margin-top:0; }
  .kk-a11y-grid{ display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .kk-a11y-grid--3{ grid-template-columns:repeat(3,1fr); }
  .kk-opt{ display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center;
    padding:12px 8px; border:1.5px solid var(--kk-line); border-radius:11px;
    background:var(--kk-ink-3); color:var(--kk-text); cursor:pointer;
    font-family:inherit; font-size:.75rem; font-weight:600; line-height:1.2; transition:.15s; }
  .kk-opt:hover,.kk-opt:focus-visible{ border-color:var(--kk-gold); color:#fff; outline:none; }
  .kk-opt[aria-pressed="true"]{ border-color:var(--kk-crimson); background:rgba(228,20,31,.18);
    color:#fff; box-shadow:0 0 14px rgba(228,20,31,.3); }
  .kk-font{ display:flex; align-items:center; justify-content:space-between; gap:10px;
    background:var(--kk-ink-3); border:1.5px solid var(--kk-line); border-radius:11px; padding:8px 12px; }
  .kk-font span{ font-weight:700; font-size:.82rem; color:#fff; }
  .kk-font button{ width:36px; height:36px; border-radius:9px; border:1.5px solid var(--kk-line);
    background:var(--kk-ink-2); color:#fff; font-size:1rem; font-weight:700; cursor:pointer; font-family:inherit; transition:.15s; }
  .kk-font button:hover:not(:disabled),.kk-font button:focus-visible:not(:disabled){
    border-color:var(--kk-gold); color:var(--kk-gold); outline:none; }
  .kk-font button:disabled{ opacity:.35; cursor:not-allowed; }
  .kk-a11y-reset{ width:100%; margin-top:16px; padding:11px; border-radius:10px;
    border:1.5px solid var(--kk-line); background:none; color:var(--kk-muted);
    font-family:inherit; font-weight:700; font-size:.8rem; cursor:pointer; transition:.15s; }
  .kk-a11y-reset:hover,.kk-a11y-reset:focus-visible{ border-color:var(--kk-crimson); color:#fff;
    background:rgba(228,20,31,.12); outline:none; }

  /* ---------- ACCESSIBILITY ACTIVE STATES ---------- */
  html.kk-contrast-high body{ filter:contrast(1.55) saturate(1.15); }
  html.kk-contrast-dark{ background:#000; }
  html.kk-contrast-dark body{ filter:invert(1) hue-rotate(180deg); }
  html.kk-contrast-dark img, html.kk-contrast-dark video,
  html.kk-contrast-dark iframe, html.kk-contrast-dark .hero__img,
  html.kk-contrast-dark [style*="background-image"]{ filter:invert(1) hue-rotate(180deg); }
  html.kk-grayscale body{ filter:grayscale(1); }
  html.kk-contrast-dark.kk-grayscale body{ filter:invert(1) hue-rotate(180deg) grayscale(1); }
  html.kk-links a:not(.btn):not(.navbar__logo):not(.skip-link):not(.kk-btn){
    background:#ffe100 !important; color:#000 !important; text-decoration:underline !important;
    outline:2px solid #000 !important; border-radius:2px; }
  html.kk-nomotion *, html.kk-nomotion *::before, html.kk-nomotion *::after{
    animation:none !important; transition:none !important; scroll-behavior:auto !important; }
  html.kk-cursor, html.kk-cursor *{ cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38'%3E%3Cpath d='M4 2l0 30 8-8 5 12 5-2-5-12 11 0z' fill='%23fff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 4 2, auto !important; }
  @font-face{ font-family:'OpenDyslexic'; font-display:swap;
    src:url('https://cdn.jsdelivr.net/npm/opendyslexic@0.91.12/fonts/OpenDyslexic-Regular.woff2') format('woff2'); }
  html.kk-dyslexia body, html.kk-dyslexia body *:not(i):not(svg):not(.kk-a11y):not(.kk-a11y *){
    font-family:'OpenDyslexic',Verdana,sans-serif !important; letter-spacing:.03em; word-spacing:.12em; line-height:1.75 !important; }
  html.kk-readable body, html.kk-readable body *:not(svg):not(.kk-a11y):not(.kk-a11y *){
    font-family:Verdana,Tahoma,Arial,sans-serif !important; letter-spacing:.01em; }
  .kk-guide{ position:fixed; left:0; right:0; height:40px; z-index:99989; pointer-events:none;
    background:rgba(231,184,75,.16); border-top:2px solid rgba(231,184,75,.6);
    border-bottom:2px solid rgba(231,184,75,.6); transform:translateY(-50%); display:none; }
  .kk-guide.on{ display:block; }

  @media (max-width:620px){
    .kk-cc__panel-inner{ grid-template-columns:1fr; }
    .kk-cc__inner{ gap:14px; }
    .kk-cc__actions{ width:100%; }
    .kk-cc__actions .kk-btn{ flex:1; text-align:center; }
    .kk-a11y-panel{ right:12px; left:12px; width:auto; }
  }
  `;
  var st = document.createElement('style');
  st.id = 'kk-widget-styles';
  st.textContent = CSS;
  document.head.appendChild(st);

  var PRIVACY = 'privacy.html';

  /* ==========================================================
     1) COOKIE CONSENT  (GDPR / CCPA)
     ========================================================== */
  var CONSENT_KEY = 'kk_consent';
  var CONSENT_VERSION = '1';

  function getConsent() {
    try {
      var c = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      return c && c.v === CONSENT_VERSION ? c : null;
    } catch (e) { return null; }
  }
  function saveConsent(analytics, marketing) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        v: CONSENT_VERSION, essential: true,
        analytics: !!analytics, marketing: !!marketing, ts: Date.now()
      }));
    } catch (e) {}
    applyConsent(!!analytics, !!marketing);
  }
  // Consent gate for any future non-essential tags. Nothing loads until allowed.
  function applyConsent(analytics, marketing) {
    if (analytics) document.dispatchEvent(new CustomEvent('kk:analytics-allowed'));
    if (marketing) document.dispatchEvent(new CustomEvent('kk:marketing-allowed'));
  }

  var ccEl = null, reopenEl = null, lastFocus = null;

  function buildConsent() {
    var bar = document.createElement('div');
    bar.className = 'kk-cc';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-modal', 'false');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<div class="kk-cc__inner">' +
        '<div class="kk-cc__text">' +
          '<strong>We value your privacy</strong>' +
          '<p>We use cookies to run the site, analyze traffic, and remember your preferences. ' +
          'You can accept all, reject non-essential, or choose what to allow. See our ' +
          '<a href="' + PRIVACY + '">Privacy Policy</a> and ' +
          '<a href="' + PRIVACY + '#cookies">Cookie Policy</a>.</p>' +
        '</div>' +
        '<div class="kk-cc__actions">' +
          '<button type="button" class="kk-btn kk-btn--ghost" data-cc="customize" aria-expanded="false">Customize</button>' +
          '<button type="button" class="kk-btn kk-btn--ghost" data-cc="reject">Reject Non-Essential</button>' +
          '<button type="button" class="kk-btn kk-btn--solid" data-cc="accept">Accept All</button>' +
        '</div>' +
      '</div>' +
      '<div class="kk-cc__panel" hidden>' +
        '<div class="kk-cc__panel-inner">' +
          optRow('Essential', 'Required for the site to work — security, forms, your accessibility and cookie choices. Always active.', 'essential', true, true) +
          optRow('Analytics', 'Anonymous stats on how the site is used so we can improve it. No personal data is sold.', 'analytics', false, false) +
          optRow('Marketing', 'Used to measure and personalize promotions, and by embedded social platforms (Instagram, Meta).', 'marketing', false, false) +
        '</div>' +
        '<div class="kk-cc__panel-actions">' +
          '<button type="button" class="kk-btn kk-btn--gold" data-cc="save">Save My Preferences</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    ccEl = bar;

    var panel = bar.querySelector('.kk-cc__panel');
    var custBtn = bar.querySelector('[data-cc="customize"]');

    bar.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cc]'); if (!t) return;
      var a = t.getAttribute('data-cc');
      if (a === 'customize') {
        var open = panel.hidden;
        panel.hidden = !open;
        custBtn.setAttribute('aria-expanded', String(open));
      } else if (a === 'accept') {
        saveConsent(true, true); closeConsent();
      } else if (a === 'reject') {
        saveConsent(false, false); closeConsent();
      } else if (a === 'save') {
        saveConsent(bar.querySelector('#kk-c-analytics').checked,
                    bar.querySelector('#kk-c-marketing').checked);
        closeConsent();
      }
    });

    trapFocus(bar);
    lastFocus = document.activeElement;
    var firstBtn = bar.querySelector('[data-cc="accept"]');
    if (firstBtn) setTimeout(function () { firstBtn.focus(); }, 60);
  }

  function optRow(title, desc, id, on, disabled) {
    var input = '<input type="checkbox"' + (id === 'essential' ? '' : ' id="kk-c-' + id + '"') +
      (on ? ' checked' : '') + (disabled ? ' disabled' : '') +
      ' aria-label="' + title + ' cookies">';
    return '<div class="kk-cc__opt">' +
      '<div class="kk-cc__opt-top">' +
        '<span class="kk-cc__opt-title">' + title + '</span>' +
        (disabled ? '<span class="kk-cc__badge">Always On</span>' :
          '<label class="kk-switch">' + input + '<span class="kk-switch__s"></span></label>') +
      '</div>' +
      '<p class="kk-cc__opt-desc">' + desc + '</p></div>';
  }

  function closeConsent() {
    if (!ccEl) return;
    ccEl.style.animation = 'kk-slide-up .3s ease reverse';
    var el = ccEl; ccEl = null;
    setTimeout(function () { el.remove(); addReopen(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }, 260);
  }

  function addReopen() {
    if (reopenEl) return;
    reopenEl = document.createElement('button');
    reopenEl.type = 'button';
    reopenEl.className = 'kk-cc-reopen';
    reopenEl.setAttribute('aria-label', 'Manage cookie preferences');
    reopenEl.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 00-2-19.8 3 3 0 01-3 3 3 3 0 01-3 3 3 3 0 01-1 2.3A10 10 0 0112 2z"/><circle cx="9" cy="13" r="1.3"/><circle cx="14" cy="16" r="1.3"/><circle cx="15" cy="10" r="1.2"/></svg> Cookies';
    reopenEl.addEventListener('click', function () {
      reopenEl.remove(); reopenEl = null;
      buildConsent();
    });
    document.body.appendChild(reopenEl);
  }

  function trapFocus(container) {
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeConsent(); return; }
      if (e.key !== 'Tab') return;
      var f = container.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ==========================================================
     2) ACCESSIBILITY TOOLBAR (ADA / WCAG helper)
     ========================================================== */
  var A11Y_KEY = 'kk_a11y';
  var defaults = { fontStep: 0, contrast: 'none', grayscale: false, links: false,
    cursor: false, nomotion: false, guide: false, dyslexia: false, readable: false };
  var state = Object.assign({}, defaults);
  try { var s = JSON.parse(localStorage.getItem(A11Y_KEY) || 'null'); if (s) state = Object.assign({}, defaults, s); } catch (e) {}
  function saveA11y() { try { localStorage.setItem(A11Y_KEY, JSON.stringify(state)); } catch (e) {} }

  var FONT_LABELS = ['Smaller', 'Default', 'Larger', 'Large', 'X-Large', 'XX-Large'];
  var guideEl;

  function applyA11y() {
    var root = document.documentElement;
    root.style.fontSize = (100 + state.fontStep * 12.5) + '%';
    root.classList.toggle('kk-contrast-high', state.contrast === 'high');
    root.classList.toggle('kk-contrast-dark', state.contrast === 'dark');
    root.classList.toggle('kk-grayscale', state.grayscale);
    root.classList.toggle('kk-links', state.links);
    root.classList.toggle('kk-cursor', state.cursor);
    root.classList.toggle('kk-nomotion', state.nomotion);
    root.classList.toggle('kk-dyslexia', state.dyslexia);
    root.classList.toggle('kk-readable', state.readable);
    if (guideEl) guideEl.classList.toggle('on', state.guide);
  }

  function iconAxe() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="3.6" r="2.1"/><path d="M21 8.3c0 .6-.5 1.1-1.1 1.1-.2 0-3.2-.5-3.9-.6V21c0 .6-.5 1-1.1 1s-1.1-.4-1.1-1v-6h-1.6v6c0 .6-.5 1-1.1 1s-1.1-.4-1.1-1V8.8c-.7.1-3.7.6-3.9.6C4.5 9.4 4 8.9 4 8.3s.4-1 1-1.1c.1 0 4-.7 5.4-.7h3.2c1.4 0 5.3.6 5.4.7.6.1 1 .5 1 1.1z"/></svg>';
  }

  function buildA11y() {
    var btn = document.createElement('button');
    btn.className = 'kk-a11y kk-a11y-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open accessibility tools');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = iconAxe();

    var panel = document.createElement('div');
    panel.className = 'kk-a11y kk-a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility tools');
    panel.hidden = true;
    panel.innerHTML =
      '<div class="kk-a11y-head"><h2>Accessibility</h2>' +
        '<button type="button" class="kk-a11y-close" aria-label="Close accessibility tools">&times;</button></div>' +
      '<div class="kk-a11y-body">' +
        '<div class="kk-a11y-label">Text Size</div>' +
        '<div class="kk-font">' +
          '<button type="button" data-font="-1" aria-label="Decrease text size">A&minus;</button>' +
          '<span data-fontlabel>Default</span>' +
          '<button type="button" data-font="1" aria-label="Increase text size">A+</button>' +
        '</div>' +
        '<div class="kk-a11y-label">Color &amp; Contrast</div>' +
        '<div class="kk-a11y-grid kk-a11y-grid--3">' +
          opt('contrast:none', 'Normal') + opt('contrast:high', 'High') + opt('contrast:dark', 'Dark') +
        '</div>' +
        '<div class="kk-a11y-label">Visual Aids</div>' +
        '<div class="kk-a11y-grid">' +
          opt('grayscale', 'Grayscale') + opt('links', 'Highlight Links') +
          opt('cursor', 'Big Cursor') + opt('nomotion', 'Pause Motion') +
        '</div>' +
        '<div class="kk-a11y-label">Reading</div>' +
        '<div class="kk-a11y-grid">' +
          opt('guide', 'Reading Guide') + opt('readable', 'Readable Font') +
          '<span style="grid-column:1/-1">' + opt('dyslexia', 'Dyslexia-Friendly Font', true) + '</span>' +
        '</div>' +
        '<button type="button" class="kk-a11y-reset">&#8635; Reset All</button>' +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);
    guideEl = document.createElement('div');
    guideEl.className = 'kk-guide'; guideEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(guideEl);
    window.addEventListener('mousemove', function (e) { if (state.guide) guideEl.style.top = e.clientY + 'px'; });

    var fontLabel = panel.querySelector('[data-fontlabel]');
    function sync() {
      panel.querySelectorAll('.kk-opt').forEach(function (o) {
        var a = o.getAttribute('data-opt'), on = false;
        if (a.indexOf('contrast:') === 0) on = state.contrast === a.split(':')[1];
        else on = !!state[a];
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      fontLabel.textContent = FONT_LABELS[state.fontStep + 1] || 'Default';
      panel.querySelector('[data-font="-1"]').disabled = state.fontStep <= -1;
      panel.querySelector('[data-font="1"]').disabled = state.fontStep >= 4;
    }

    function open() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
      panel.querySelector('.kk-a11y-close').focus(); }
    function close() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    btn.addEventListener('click', function () { panel.hidden ? open() : close(); });

    panel.addEventListener('click', function (e) {
      var c = e.target.closest('.kk-a11y-close'); if (c) { close(); return; }
      var r = e.target.closest('.kk-a11y-reset'); if (r) { state = Object.assign({}, defaults); saveA11y(); applyA11y(); sync(); return; }
      var f = e.target.closest('[data-font]');
      if (f) { state.fontStep = Math.max(-1, Math.min(4, state.fontStep + parseInt(f.getAttribute('data-font'), 10))); saveA11y(); applyA11y(); sync(); return; }
      var o = e.target.closest('[data-opt]'); if (!o) return;
      var a = o.getAttribute('data-opt');
      if (a.indexOf('contrast:') === 0) {
        var v = a.split(':')[1]; state.contrast = (state.contrast === v ? 'none' : v);
      } else { state[a] = !state[a]; }
      saveA11y(); applyA11y(); sync();
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(); });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) close();
    });

    sync();
  }
  function opt(id, label, full) {
    return '<button type="button" class="kk-opt" data-opt="' + id + '" aria-pressed="false"' +
      (full ? ' style="width:100%"' : '') + '>' + label + '</button>';
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function init() {
    applyA11y();                 // restore saved a11y prefs immediately
    buildA11y();                 // accessibility toolbar (always available)
    if (getConsent()) addReopen(); else buildConsent();
    // Honor OS reduced-motion the first time, without locking the user in.
    if (reduceMotion && state.nomotion === false && !localStorage.getItem(A11Y_KEY)) {
      state.nomotion = true; saveA11y(); applyA11y();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
