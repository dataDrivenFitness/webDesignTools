/* ================================================================
   SetPointRx — MASTER JAVASCRIPT FOR GO HIGH LEVEL (V2)
   ================================================================
   WHERE TO PUT THIS:
   Page Settings > Tracking Code > Footer Tracking
   Paste inline wrapped in <script> tags

   ANIMATION: Add class "sp-animate" to any element's Custom Class
   field in GHL to trigger fade-in-on-scroll animation.

   COUNTERS: Add class "sp-stat-counter" plus data-count="1000"
   (and optional data-suffix="+" data-prefix="$") to animate
   a number counting up when scrolled into view.

   FAQ: Add "sp-faq-item" to the wrapper and "sp-faq-question"
   to the clickable header for accordion behavior.

   GHL runs on Nuxt.js which breaks traditional event listeners
   and IntersectionObserver. All features use setInterval polling
   which is the only reliable pattern in GHL's environment.
   ================================================================ */

/* ── 1. Scroll reveal animation — cascading stagger ────────────── */
setInterval(function () {
  var pending = document.querySelectorAll('.sp-animate:not(.sp-done):not(.sp-queued)');
  var batch = [];

  pending.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.top > -rect.height) {
      batch.push(el);
    }
  });

  batch.forEach(function (el, i) {
    el.classList.add('sp-queued');
    setTimeout(function () {
      el.classList.add('sp-done');
    }, i * 150);
  });
}, 200);

/* ── 2. FAQ accordion ──────────────────────────────────────────── */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.sp-faq-question');
  if (!btn) return;
  var item = btn.closest('.sp-faq-item');
  document.querySelectorAll('.sp-faq-item.open').forEach(function (openItem) {
    if (openItem !== item) openItem.classList.remove('open');
  });
  item.classList.toggle('open');
});

/* ── 3. Header scroll shadow ──────────────────────────────────── */
setInterval(function () {
  try {
    var header = document.querySelector('.hl_header');
    if (header) {
      header.style.boxShadow =
        document.documentElement.scrollTop > 50
          ? '0 2px 12px rgba(42,42,42,0.08)'
          : 'none';
    }
  } catch (e) {}
}, 200);

/* ── 4. Stat counter animation ─────────────────────────────────── */
setInterval(function () {
  document
    .querySelectorAll('.sp-stat-counter:not(.sp-counted)')
    .forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.top > 0) {
        el.classList.add('sp-counted');
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / 2000, 1);
          /* easeOutCubic */
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent =
            prefix + Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(step);
      }
    });
}, 200);

/* ── 5. Smooth scroll for anchor links ─────────────────────────── */
document.addEventListener('click', function (e) {
  var anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  var targetId = anchor.getAttribute('href');
  if (targetId === '#') return;
  var target = document.querySelector(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
