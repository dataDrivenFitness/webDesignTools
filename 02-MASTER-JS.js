/* ================================================================
   SetPointRx — MASTER JAVASCRIPT FOR GO HIGH LEVEL
   ================================================================
   WHERE TO PUT THIS:
   Page Settings > Tracking Code > Footer Tracking
   Paste inline wrapped in <script> tags

   ANIMATION: Add class "sp-animate" to any element's Custom Class
   field in GHL to trigger fade-in-on-scroll animation.

   GHL runs on Nuxt.js which breaks traditional event listeners
   and IntersectionObserver. All features use setInterval polling
   which is the only reliable pattern in GHL's environment.
   ================================================================ */

/* Scroll reveal animation */
setInterval(function() {
  document.querySelectorAll('.sp-animate:not(.sp-done)').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.top > -rect.height) {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.classList.add('sp-done');
    } else if (!el.classList.contains('sp-done')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    }
  });
}, 200);

/* FAQ accordion */
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.sp-faq-question');
  if (!btn) return;
  var item = btn.closest('.sp-faq-item');
  document.querySelectorAll('.sp-faq-item.open').forEach(function(openItem) {
    if (openItem !== item) openItem.classList.remove('open');
  });
  item.classList.toggle('open');
});

/* Header scroll shadow */
setInterval(function() {
  try {
    var header = document.querySelector('.hl_header');
    if (header) header.style.boxShadow = document.documentElement.scrollTop > 50 ? '0 2px 8px rgba(42,42,42,0.06)' : 'none';
  } catch(e) {}
}, 200);

/* Stat counter animation */
setInterval(function() {
  document.querySelectorAll('.sp-stat-counter:not(.sp-counted)').forEach(function(el) {
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
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString() + suffix;
      }
      requestAnimationFrame(step);
    }
  });
}, 200);

/* Smooth scroll for anchor links */
document.addEventListener('click', function(e) {
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
