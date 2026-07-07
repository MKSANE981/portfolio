/* ═══════════════════════════════════════════
   MAIN.JS — Nav, Lang, Dark mode, Cursor
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initLang();
  initCursor();
  initScroll();
  initReveal();
  markActiveNav();
  initHomeLink();
});

/* ── Dark mode ── */
function initDarkMode() {
  const btn = document.getElementById('btn-dark');
  if (!btn) return;
  const apply = (dark) => {
    document.documentElement.setAttribute('data-dark', dark);
    btn.textContent = dark === 'true' ? '☀' : '◐';
    localStorage.setItem('dark', dark);
  };
  apply(localStorage.getItem('dark') || 'false');
  btn.addEventListener('click', () => {
    apply(document.documentElement.getAttribute('data-dark') === 'true' ? 'false' : 'true');
  });
}

/* ── Language switch ── */
function initLang() {
  const btn = document.getElementById('btn-lang');
  if (!btn) return;
  const apply = (lang) => {
    document.querySelectorAll('[data-fr]').forEach(el => {
      el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    });
    document.querySelectorAll('[data-fr-html]').forEach(el => {
      el.innerHTML = lang === 'fr' ? el.dataset.frHtml : el.dataset.enHtml;
    });
    btn.textContent = lang === 'fr' ? 'EN' : 'FR';
    localStorage.setItem('lang', lang);
  };
  apply(localStorage.getItem('lang') || 'fr');
  btn.addEventListener('click', () => {
    apply(localStorage.getItem('lang') === 'fr' ? 'en' : 'fr');
  });
}

/* ── Cursor ── */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  document.documentElement.classList.add('custom-cursor');
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .card, .exp-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
  });
}

/* ── Nav scroll shadow ── */
function initScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* ── Scroll reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ── Mark active nav link ── */
function markActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes(page) || (page === 'index.html' && href.includes('index'))) {
      a.classList.add('active');
    }
  });
}

function initHomeLink() {
  const navRight = document.querySelector('.nav-right');
  if (!navRight) return;
  const a = document.createElement('a');
  a.href = '../index.html';
  a.className = 'nav-btn';
  a.title = 'Tous les profils';
  a.style.cssText = 'text-decoration:none;font-size:15px;';
  a.textContent = '⌂';
  navRight.insertBefore(a, navRight.firstChild);
}
