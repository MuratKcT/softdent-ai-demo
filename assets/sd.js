/* SoftDent AI demo — shared runtime: i18n, header/footer, API, price formatting */
(function () {
  'use strict';
  var SD = window.SD, C = SD.clinic;
  var base = document.body.getAttribute('data-base') || '';
  var page = document.body.getAttribute('data-page') || '';

  /* ── Language ── */
  var qs = new URLSearchParams(location.search);
  var lang = qs.get('lang');
  if (lang !== 'pl' && lang !== 'en') {
    try { lang = localStorage.getItem('sd_lang'); } catch (e) { lang = null; }
  }
  if (lang !== 'pl' && lang !== 'en') lang = 'pl';

  var COMMON = {
    pl: {
      nav_home: 'Prezentacja', nav_umi: 'Umi', nav_zara: 'Zara', nav_calc: 'Kalkulator', nav_chat: 'Asystent',
      brand_tag: 'AI · Demo',
      f_clinic: 'Klinika', f_hours: 'Godziny pracy', f_contact: 'Kontakt', f_demo: 'Narzędzia AI',
      f_closed: 'nieczynne',
      f_legal: 'Prezentacja demonstracyjna przygotowana dla SoftDent. Nie jest oficjalną stroną kliniki. Dane kliniki pochodzą z softdent.com.pl.',
      mode_live: 'Na żywo · AI', mode_demo: 'Tryb demo',
      menu: 'Menu'
    },
    en: {
      nav_home: 'Overview', nav_umi: 'Umi', nav_zara: 'Zara', nav_calc: 'Calculator', nav_chat: 'Assistant',
      brand_tag: 'AI · Demo',
      f_clinic: 'Clinic', f_hours: 'Opening hours', f_contact: 'Contact', f_demo: 'AI tools',
      f_closed: 'closed',
      f_legal: 'Demonstration prepared for SoftDent. Not the official clinic website. Clinic data taken from softdent.com.pl.',
      mode_live: 'Live · AI', mode_demo: 'Demo mode',
      menu: 'Menu'
    }
  };
  var dict = { pl: Object.assign({}, COMMON.pl), en: Object.assign({}, COMMON.en) };
  var listeners = [];

  function t(k) { return (dict[lang] && dict[lang][k] != null) ? dict[lang][k] : (dict.pl[k] != null ? dict.pl[k] : k); }
  function L(o) { return o && typeof o === 'object' ? (o[lang] || o.pl) : o; }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i')); });
    document.querySelectorAll('[data-ih]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-ih')); });
    document.querySelectorAll('[data-iph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-iph'))); });
    document.querySelectorAll('[data-ial]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-ial'))); });
    var tt = document.querySelector('meta[name="sd-title"]');
    if (tt) document.title = t(tt.getAttribute('content'));
    document.querySelectorAll('.sd-lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-l') === lang)); });
    renderFoot();
    listeners.forEach(function (fn) { try { fn(lang); } catch (e) { console.error(e); } });
  }

  function setLang(l) {
    if (l !== 'pl' && l !== 'en' || l === lang) return;
    lang = l;
    try { localStorage.setItem('sd_lang', l); } catch (e) {}
    var u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u);
    apply();
  }

  /* ── API ──
     ?api=<base url> switches this browser to live mode (stored locally, removed from the address bar);
     ?api=off switches it back to demo mode. The endpoint itself is never part of the published code. */
  (function () {
    var a = qs.get('api');
    if (a === null) return;
    try {
      if (a === 'off') localStorage.removeItem('sd_api');
      else if (/^https:\/\/[^\s]+$/.test(a)) localStorage.setItem('sd_api', a);
    } catch (e) {}
    var u = new URL(location.href); u.searchParams.delete('api'); history.replaceState(null, '', u);
  })();
  function apiBase() {
    var b = '';
    try { b = localStorage.getItem('sd_api') || ''; } catch (e) {}
    return (b || window.SD_API_BASE || '').replace(/\/+$/, '');
  }
  async function api(path, payload, timeoutMs) {
    var b = apiBase();
    if (!b) throw new Error('no_api');
    var ctrl = new AbortController();
    var tm = setTimeout(function () { ctrl.abort(); }, timeoutMs || 60000);
    try {
      var r = await fetch(b + '/' + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var d = await r.json();
      return Array.isArray(d) ? d[0] : d;
    } finally { clearTimeout(tm); }
  }

  /* ── Prices ── */
  function money(n) {
    return lang === 'pl'
      ? n.toLocaleString('pl-PL').replace(/ /g, ' ') + ' zł'
      : n.toLocaleString('en-GB') + ' PLN';
  }
  function priceOf(o) {
    var s = o.to ? money(o.p).replace(/ (zł|PLN)$/, '') + '–' + money(o.to) : money(o.p);
    return o.from ? (lang === 'pl' ? 'od ' : 'from ') + s : s;
  }
  /* AI answers sometimes use "PLN" in Polish — keep the house style */
  function fixPrice(s) {
    s = lang === 'pl' ? String(s || '').replace(/\b(\d{2,3})(\d{3})\b/g, '$1 $2') : String(s || '').replace(/\b(\d{1,3})(\d{3})\b/g, '$1,$2');
    return lang === 'pl' ? s.replace(/\bPLN\b/g, 'zł').replace(/\bfrom\b/gi, 'od') : s.replace(/\bzł\b/g, 'PLN').replace(/^od\b/i, 'from');
  }
  function unitOf(u) { return u === 'tooth' ? (lang === 'pl' ? 'ząb' : 'tooth') : ''; }

  /* ── Header & footer ── */
  var I = {
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  function renderHead() {
    var h = document.getElementById('sd-head');
    if (!h) return;
    var items = [['home', 'index.html', 'nav_home'], ['umi', 'umi/', 'nav_umi'], ['zara', 'zara/', 'nav_zara'], ['calc', 'kalkulator/', 'nav_calc'], ['chat', 'asystent/', 'nav_chat']];
    h.className = 'sd-head';
    h.innerHTML = '<div class="wrap">'
      + '<a class="sd-brand" href="' + base + 'index.html"><img src="' + C.logo + '" alt="SoftDent" width="120" height="28"><span data-i="brand_tag"></span></a>'
      + '<nav class="sd-nav" id="sd-nav">' + items.map(function (x) {
          return '<a href="' + base + x[1] + '"' + (x[0] === page ? ' aria-current="page"' : '') + ' data-i="' + x[2] + '"></a>';
        }).join('') + '</nav>'
      + '<div class="sd-lang" role="group" aria-label="Language"><button type="button" data-l="pl">PL</button><button type="button" data-l="en">EN</button></div>'
      + '<button class="sd-burger" type="button" aria-expanded="false" data-ial="menu">' + I.burger + '</button>'
      + '</div>';
    h.querySelectorAll('.sd-lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-l')); }); });
    var bg = h.querySelector('.sd-burger'), nav = h.querySelector('.sd-nav');
    bg.addEventListener('click', function () { var o = nav.classList.toggle('open'); bg.setAttribute('aria-expanded', String(o)); });
    /* keep ?lang when moving between pages */
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { a.href = a.href.split('?')[0] + '?lang=' + lang; }); });
    h.querySelector('.sd-brand').addEventListener('click', function () { this.href = this.href.split('?')[0] + '?lang=' + lang; });
  }
  function renderFoot() {
    var f = document.getElementById('sd-foot');
    if (!f) return;
    f.className = 'sd-foot';
    var hours = C.hours.map(function (x) { return L(x.d) + ': <span class="nw">' + (x.h || t('f_closed')) + '</span>'; }).join('<br>');
    f.innerHTML = '<div class="wrap">'
      + '<div><img class="logo" src="' + C.logo + '" alt="SoftDent" width="120" height="28"><p>' + C.street + '<br>' + C.city + '<br>' + L(C.district) + '</p></div>'
      + '<div><h4>' + t('f_hours') + '</h4><p>' + hours + '</p></div>'
      + '<div><h4>' + t('f_contact') + '</h4><p><a href="' + C.phoneHref + '">' + C.phone + '</a><br><a href="' + C.phone2Href + '">' + C.phone2 + '</a><br><a href="mailto:' + C.email + '">' + C.email + '</a></p></div>'
      + '<div><h4>' + t('f_demo') + '</h4><p><a href="' + base + 'umi/?lang=' + lang + '">Umi</a><br><a href="' + base + 'zara/?lang=' + lang + '">Zara</a><br><a href="' + base + 'kalkulator/?lang=' + lang + '">' + t('nav_calc') + '</a><br><a href="' + base + 'asystent/?lang=' + lang + '">' + t('nav_chat') + '</a></p></div>'
      + '</div><p class="legal">' + t('f_legal') + '</p>';
  }
  function modeBadge(el) {
    if (!el) return;
    var live = !!apiBase();
    el.className = 'mode' + (live ? ' live' : '');
    el.innerHTML = '<i></i><span data-i="' + (live ? 'mode_live' : 'mode_demo') + '">' + t(live ? 'mode_live' : 'mode_demo') + '</span>';
  }

  window.SDI = {
    get lang() { return lang; },
    base: base,
    add: function (d) { ['pl', 'en'].forEach(function (l) { Object.assign(dict[l], d[l] || {}); }); },
    t: t, L: L, apply: apply, setLang: setLang,
    onLang: function (fn) { listeners.push(fn); },
    api: api, live: function () { return !!apiBase(); },
    money: money, priceOf: priceOf, fixPrice: fixPrice, unitOf: unitOf,
    modeBadge: modeBadge,
    initials: function (s) { return String(s).replace(/^(dr n\. med\.|lek\. dent\.)\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); },
    start: function () { renderHead(); apply(); document.querySelectorAll('[data-mode]').forEach(modeBadge); }
  };
})();
