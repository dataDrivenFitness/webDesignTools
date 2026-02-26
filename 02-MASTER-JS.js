/* ================================================================
   SetPointRx — MASTER JAVASCRIPT FOR GO HIGH LEVEL
   ================================================================
   WHERE TO PUT THIS:
   Page Settings > Tracking Code > Footer Tracking
   Link via CDN or paste inline wrapped in <script> tags
   ================================================================
   GHL uses Nuxt.js which renders content dynamically.

   ANIMATION TRIGGER OPTIONS:
   1. data-animate attribute (for Custom Code elements)
   2. sp-animate class (for native GHL elements via Custom Class field)

   Both work identically. Use whichever fits the element type.
   ================================================================ */

(function() {
  var attempts = 0;

  function waitForGHL() {
    var hasContent = document.querySelector('[data-animate]') ||
                     document.querySelector('.sp-animate') ||
                     document.querySelector('.sp-faq-question') ||
                     document.querySelector('.sp-stat-counter') ||
                     document.querySelector('[class*="sp-"]');
    if (!hasContent && attempts < 20) {
      attempts++;
      setTimeout(waitForGHL, 500);
      return;
    }
    initReveals();
    initFaq();
    initHeaderShadow();
    initCounters();
    initSmoothScroll();
  }

  /* ========================================
     SCROLL REVEAL ANIMATION
     Supports both [data-animate] and .sp-animate
     JS adds sp-reveal class + observes in same pass
     so there is no gap where content is hidden but unwatched.
     ======================================== */
  function initReveals() {
    var items = document.querySelectorAll('[data-animate], .sp-animate');
    if (items.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sp-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(function(el) {
      el.classList.add('sp-reveal');
      observer.observe(el);
    });
  }

  /* ========================================
     FAQ ACCORDION
     ======================================== */
  function initFaq() {
    document.querySelectorAll('.sp-faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = this.closest('.sp-faq-item');
        document.querySelectorAll('.sp-faq-item.open').forEach(function(openItem) {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  }

  /* ========================================
     HEADER SCROLL SHADOW
     ======================================== */
  function initHeaderShadow() {
    var header = document.querySelector('.hl_header') ||
                 document.querySelector('.hl_navbar') ||
                 document.querySelector('[class*="header"]');
    if (header) {
      window.addEventListener('scroll', function() {
        header.style.boxShadow = window.scrollY > 50 ? '0 2px 8px rgba(42,42,42,0.06)' : 'none';
      });
    }
  }

  /* ========================================
     STAT COUNTER ANIMATION
     ======================================== */
  function initCounters() {
    var counters = document.querySelectorAll('.sp-stat-counter');
    if (counters.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
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
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  /* ========================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ======================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  if (document.readyState === 'complete') waitForGHL();
  else window.addEventListener('load', waitForGHL);
})();
