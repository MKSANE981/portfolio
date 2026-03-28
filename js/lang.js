/* ═══════════════════════════════════════════
   LANG.JS — Bilingual FR/EN switching
═══════════════════════════════════════════ */

let currentLang = localStorage.getItem('lang') || 'fr';

function setLang(l) {
  currentLang = l;
  localStorage.setItem('lang', l);
  document.documentElement.setAttribute('lang', l);

  // Update all [data-fr] / [data-en] elements
  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = l === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fr');
    if (!val) return;
    // Don't overwrite elements with child elements
    if (el.children.length === 0) {
      el.textContent = val;
    } else if (el.hasAttribute('data-html')) {
      el.innerHTML = val;
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-fr-placeholder]').forEach(el => {
    el.placeholder = l === 'en' ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-fr-placeholder');
  });

  // Update button states
  document.querySelectorAll('.lbtn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === l);
  });
}

function initLang() {
  const params = new URLSearchParams(location.search);
  const p = params.get('lang');
  if (p === 'en' || p === 'fr') currentLang = p;
  setLang(currentLang);
}

// Dark mode
let isDark = localStorage.getItem('dark') === 'true';
function toggleDark() {
  isDark = !isDark;
  localStorage.setItem('dark', isDark);
  document.body.setAttribute('data-dark', isDark ? 'true' : 'false');
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = isDark ? '☀' : '☽';
}
function initDark() {
  document.body.setAttribute('data-dark', isDark ? 'true' : 'false');
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = isDark ? '☀' : '☽';
}
