/* ================================================================
   SetPointRx™ — MASTER JAVASCRIPT FOR GO HIGH LEVEL
   ================================================================
   WHERE TO PUT THIS:
   Page Settings > Custom Code > Footer
   Wrap in <script> tags OR link via CDN
   ================================================================
   NOTE: GHL uses Nuxt.js which renders content AFTER DOMContentLoaded.
   All observers use a polling/retry pattern to wait for elements.
   ================================================================ */

(function() {

  /* ========================================
     GHL-COMPATIBLE INIT
     Polls until GHL finishes rendering content,
     then initializes all features.
     ======================================== */
  function initAll() {
    initScrollReveals();
    initFaqAccordion();
    initHeaderShadow();
    initCounters();
    initSmoothScroll();
  }

  // Try immediately, retry every 500ms until content exists (max 20 attempts)
  var attempts = 0;
  function waitForGHL() {
    var hasContent = document.querySelector('.sp-reveal') ||
                     document.querySelector('.sp-faq-question') ||
                     document.querySelector('.sp-stat-counter') ||
                     document.querySelector('[class*="sp-"]');
    if (hasContent || attempts >= 20) {
      initAll();
      return;
    }
    attempts++;
    setTimeout(waitForGHL, 500);
  }

  if (document.readyState === 'complete') {
    waitForGHL();
  } else {
    window.addEventListener('load', waitForGHL);
  }


  /* ========================================
     SCROLL REVEAL ANIMATION
     Automatically animates any element with class "sp-reveal"
     ======================================== */
  function initScrollReveals() {
    var reveals = document.querySelectorAll('.sp-reveal');
    if (reveals.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add('sp-visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }


  /* ========================================
     FAQ ACCORDION
     Works with the FAQ HTML structure
     ======================================== */
  function initFaqAccordion() {
    document.querySelectorAll('.sp-faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = this.closest('.sp-faq-item');
        document.querySelectorAll('.sp-faq-item.open').forEach(function(openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
          }
        });
        item.classList.toggle('open');
      });
    });
  }


  /* ========================================
     HEADER SCROLL SHADOW
     Adds subtle shadow when user scrolls
     ======================================== */
  function initHeaderShadow() {
    var header = document.querySelector('.hl_header') ||
                 document.querySelector('.hl_navbar') ||
                 document.querySelector('[class*="header"]');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.style.boxShadow = '0 2px 8px rgba(42,42,42,0.06)';
        } else {
          header.style.boxShadow = 'none';
        }
      });
    }
  }


  /* ========================================
     STAT COUNTER ANIMATION
     Animates numbers on scroll into view
     ======================================== */
  function initCounters() {
    var counters = document.querySelectorAll('.sp-stat-counter');
    if (counters.length === 0) return;

    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var duration = 2000;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = prefix + target.toLocaleString() + suffix;
            }
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) {
      counterObserver.observe(el);
    });
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

})();
