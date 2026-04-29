/* ============================================
   Seeblick Sappl — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Header Shadow ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-item__answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-item__answer').style.maxHeight = null;
      });

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__content');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightboxImg.alt = item.dataset.alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // --- Form Validation ---
  const form = document.querySelector('#anfrageForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const hp = form.querySelector('[name="website"]');
      if (hp && hp.value) return;

      // Basic validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--error)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      const email = form.querySelector('[name="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = 'var(--error)';
        valid = false;
      }

      // Consent
      const consent = form.querySelector('[name="datenschutz"]');
      if (consent && !consent.checked) {
        consent.parentElement.style.color = 'var(--error)';
        valid = false;
      } else if (consent) {
        consent.parentElement.style.color = '';
      }

      if (valid) {
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(response => {
          if (response.ok) {
            form.innerHTML = `
              <div style="text-align:center; padding: 3rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--forest-500);">&#10003;</div>
                <h3>Vielen Dank für Ihre Anfrage!</h3>
                <p style="color: var(--stone-600);">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            `;
          } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Anfrage absenden';
            alert('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
          }
        }).catch(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Anfrage absenden';
          alert('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
        });
      }
    });
  }
});
