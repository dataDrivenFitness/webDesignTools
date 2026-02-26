/* ================================================================
   SetPointRx™ — MASTER JAVASCRIPT FOR GO HIGH LEVEL
   ================================================================
   WHERE TO PUT THIS:
   Page Settings > Custom Code > Footer
   Wrap in <script> tags
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* ========================================
     SCROLL REVEAL ANIMATION
     Automatically animates any element with class "sp-reveal"
     ======================================== */
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.sp-reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          // Stagger the animations slightly
          setTimeout(function() {
            entry.target.classList.add('visible');
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

  initScrollReveals();


  /* ========================================
     FAQ ACCORDION
     Works with the FAQ HTML structure
     ======================================== */
  document.querySelectorAll('.sp-faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = this.closest('.sp-faq-item');
      // Close other open items (optional — remove this block for multi-open)
      document.querySelectorAll('.sp-faq-item.open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
        }
      });
      // Toggle current item
      item.classList.toggle('open');
    });
  });


  /* ========================================
     HEADER SCROLL SHADOW
     Adds subtle shadow when user scrolls
     ======================================== */
  var header = document.querySelector('.hl_header') || document.querySelector('.hl_navbar') || document.querySelector('[class*="header"]');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 8px rgba(42,42,42,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }


  /* ========================================
     STAT COUNTER ANIMATION (optional)
     Animates numbers on scroll into view
     ======================================== */
  function animateCounters() {
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
          var start = 0;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
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

  animateCounters();


  /* ========================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ======================================== */
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

});
