/* ═══════════════════════════════════════════════════════
   DressCode — main.js
   Vanilla JS · No dependencies · ~200 lines
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── 1. SCROLL REVEAL ─────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();


/* ── 2. HEADER: shrink on scroll ──────────────────────── */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── 3. MOBILE BURGER MENU ────────────────────────────── */
(function initBurger() {
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (!burger || !mobileNav) return;

  const toggle = () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  burger.addEventListener('click', toggle);

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
})();


/* ── 4. SMOOTH SCROLL for anchor links ───────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 5. ANIMATED COUNTERS ─────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.trust-bar__num[data-count]');
  if (!nums.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const DURATION = 1800; // ms

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const start  = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = Math.round(easeOut(progress) * target);

      // Format with thousands separator for Russian locale
      el.textContent = prefix + value.toLocaleString('ru-RU');

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach((el) => observer.observe(el));
})();


/* ── 6. GALLERY FILTER ────────────────────────────────── */
(function initGalleryFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      btns.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      // Show/hide items
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);

        // Re-trigger reveal animation for newly shown items
        if (show) {
          item.classList.remove('visible');
          requestAnimationFrame(() => item.classList.add('visible'));
        }
      });
    });
  });
})();


/* ── 7. GALLERY LIGHTBOX ──────────────────────────────── */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn   = document.getElementById('lightboxClose');
  if (!lightbox) return;

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  };

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => open(img.src, img.alt));
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') open(img.src, img.alt);
    });
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) close();
  });
})();


/* ── 8. TESTIMONIALS CAROUSEL (mobile) ───────────────── */
(function initTestimonialsCarousel() {
  const list = document.getElementById('testimonialsList');
  const prev = document.getElementById('testimonialPrev');
  const next = document.getElementById('testimonialNext');
  if (!list || !prev || !next) return;

  let current = 0;
  const cards = list.querySelectorAll('.testimonial-card');
  const total = cards.length;

  // Only activate as a slider on mid+ screens when 3 per row
  // Below 768px they're already a single column — no need
  const activate = () => window.innerWidth >= 768;

  const show = (index) => {
    if (!activate()) return;
    cards.forEach((c, i) => {
      c.style.display = i >= index && i < index + 3 ? '' : 'none';
    });
  };

  prev.addEventListener('click', () => {
    current = Math.max(0, current - 3);
    show(current);
  });

  next.addEventListener('click', () => {
    current = Math.min(total - 3, current + 3);
    show(current);
  });

  window.addEventListener('resize', () => {
    if (!activate()) {
      cards.forEach((c) => (c.style.display = ''));
    } else {
      show(current);
    }
  });
})();


/* ── 9. FAQ ACCORDION (details/summary) ──────────────── */
// Native <details> handles open/close automatically.
// We only add: close others when one opens.
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();


/* ── 10. ACTIVE NAV LINK on scroll ───────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--gold)';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();


/* ── 11. LAZY MAP (load Yandex map iframe only when visible) */
(function initLazyMap() {
  const mapWrap = document.querySelector('.map-wrap');
  const iframe  = mapWrap?.querySelector('iframe');
  if (!mapWrap || !iframe) return;

  // Store src and clear it so it doesn't load immediately
  const realSrc = iframe.getAttribute('src');
  iframe.removeAttribute('src');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        iframe.setAttribute('src', realSrc);
        observer.disconnect();
      }
    },
    { rootMargin: '200px' }
  );

  observer.observe(mapWrap);
})();


/* ── 12. CALL DROPDOWN ────────────────────────────────── */
(function initCallDropdown() {
  const trigger = document.getElementById('callTrigger');
  const panel   = document.getElementById('callPanel');
  if (!trigger || !panel) return;

  const open = () => {
    panel.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    panel.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !panel.contains(e.target)) close();
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Close when a phone link is tapped
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
})();
