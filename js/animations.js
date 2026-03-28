/* ═══════════════════════════════════════════
   ANIMATIONS.JS — Scroll reveals, progress bars, cursor
═══════════════════════════════════════════ */

// ── Scroll reveal ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Progress bars ──
function initProgress() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.progress-fill');
        fills.forEach((f, i) => {
          setTimeout(() => f.classList.add('animated'), i * 80);
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-list').forEach(el => observer.observe(el));
}

// ── Cursor ──
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    dot.style.cssText  = `left:${mx}px;top:${my}px`;
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(loop);
  }
  loop();

  const style = document.createElement('style');
  style.textContent = `
    .cursor-dot,.cursor-ring{
      position:fixed;pointer-events:none;z-index:9999;border-radius:50%;
      transform:translate(-50%,-50%);transition:width .15s,height .15s,opacity .2s;
    }
    .cursor-dot{
      width:7px;height:7px;
      background:var(--accent);
      mix-blend-mode:multiply;
    }
    .cursor-ring{
      width:30px;height:30px;
      border:1.5px solid var(--accent);
      opacity:.4;
    }
    a:hover ~ .cursor-dot,button:hover ~ .cursor-dot{width:12px;height:12px;}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('a, button, .card-hover, .stack-item, .domain-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = dot.style.height = '12px';
      ring.style.width = ring.style.height = '46px';
      ring.style.opacity = '.25';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = dot.style.height = '7px';
      ring.style.width = ring.style.height = '30px';
      ring.style.opacity = '.4';
    });
  });
}

// ── Stagger children ──
function staggerChildren(selector, delay = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * delay}ms`;
    el.classList.add('reveal');
  });
}

// ── Nav scroll style ──
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 1px 24px rgba(0,0,0,.08)'
      : 'none';
  }, { passive: true });
}

// ── Init all ──
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initProgress();
  initCursor();
  initNavScroll();
  if (typeof initLang === 'function') initLang();
  if (typeof initDark  === 'function') initDark();
});
