/* ============================================
   TORSTEN GOREZITZA – ELEKTRIKER BERLIN
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  }

  // ---- HEADER SCROLL EFFECT ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('[type="submit"]');
      const successMsg = document.getElementById('formSuccess');

      // Simple validation
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');

      let valid = true;

      [name, email, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#e53935';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Simulate sending
      btn.textContent = 'Wird gesendet...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Anfrage senden';
        btn.disabled = false;
        contactForm.reset();
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(function () {
            successMsg.style.display = 'none';
          }, 5000);
        }
      }, 1500);
    });
  }

  // ---- SCROLL ANIMATIONS ----
  const animateElements = document.querySelectorAll(
    '.service-card, .review-card, .trust-box, .referenz-card, .value-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease ' + (i * 0.07) + 's, transform 0.5s ease ' + (i * 0.07) + 's';
      observer.observe(el);
    });
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- STICKY BUTTONS VISIBILITY ----
  const stickyPhone = document.querySelector('.sticky-phone');
  const stickyWhatsapp = document.querySelector('.sticky-whatsapp');

  if (stickyPhone && stickyWhatsapp) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        stickyPhone.style.opacity = '1';
        stickyPhone.style.pointerEvents = 'auto';
        stickyWhatsapp.style.opacity = '1';
        stickyWhatsapp.style.pointerEvents = 'auto';
      } else {
        stickyPhone.style.opacity = '0';
        stickyPhone.style.pointerEvents = 'none';
        stickyWhatsapp.style.opacity = '0';
        stickyWhatsapp.style.pointerEvents = 'none';
      }
    });

    // Initial state
    stickyPhone.style.opacity = '0';
    stickyPhone.style.pointerEvents = 'none';
    stickyPhone.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
    stickyWhatsapp.style.opacity = '0';
    stickyWhatsapp.style.pointerEvents = 'none';
    stickyWhatsapp.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
  }

});
