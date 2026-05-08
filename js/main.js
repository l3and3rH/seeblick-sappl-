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

  // --- Lightbox with Navigation ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__content');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__prev');
    const lightboxNext = lightbox.querySelector('.lightbox__next');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-src]'));
    let currentIndex = 0;

    function showImage(index) {
      currentIndex = index;
      lightboxImg.src = galleryItems[index].dataset.src;
      lightboxImg.alt = galleryItems[index].dataset.alt || '';
      if (lightboxCounter) {
        lightboxCounter.textContent = (index + 1) + ' / ' + galleryItems.length;
      }
    }

    function showNext() {
      showImage((currentIndex + 1) % galleryItems.length);
    }

    function showPrev() {
      showImage((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        showImage(i);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Touch/swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showPrev();
        else showNext();
      }
    }, { passive: true });
  }

  // --- Scroll to Top ---
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Map Consent ---
  document.querySelectorAll('.map-container').forEach(container => {
    const consent = container.querySelector('.map-consent');
    const iframe = container.querySelector('iframe[data-src]');
    if (!consent || !iframe) return;

    function loadMap() {
      iframe.src = iframe.dataset.src;
      consent.classList.add('hidden');
    }

    if (localStorage.getItem('mapConsent') === 'true') {
      loadMap();
    } else {
      consent.querySelector('.map-consent__btn').addEventListener('click', () => {
        localStorage.setItem('mapConsent', 'true');
        loadMap();
      });
    }
  });

  // --- Form: Pre-select apartment from URL ---
  const form = document.querySelector('#anfrageForm');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const wohnung = params.get('wohnung');
    if (wohnung) {
      const checkbox = form.querySelector('input[name="wohnung"][value="' + wohnung + '"]');
      if (checkbox) checkbox.checked = true;
    }

    // --- Form Validation with Error Messages ---
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const hp = form.querySelector('[name="website"]');
      if (hp && hp.value) return;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => el.remove());
      form.querySelectorAll('.input--error').forEach(el => el.classList.remove('input--error'));
      const consentLabel = form.querySelector('[name="datenschutz"]');
      if (consentLabel) consentLabel.parentElement.style.color = '';

      let valid = true;

      function showError(field, message) {
        field.classList.add('input--error');
        const err = document.createElement('span');
        err.className = 'form-error';
        err.textContent = message;
        field.parentElement.appendChild(err);
        valid = false;
      }

      // Required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (field.type === 'checkbox') return; // handled separately
        if (!field.value.trim()) {
          const label = field.parentElement.querySelector('label');
          const name = label ? label.textContent.replace(/\s*\*\s*/, '').trim() : 'Dieses Feld';
          showError(field, name + ' ist erforderlich.');
        }
      });

      // Email validation
      const email = form.querySelector('[name="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      }

      // Consent
      const consent = form.querySelector('[name="datenschutz"]');
      if (consent && !consent.checked) {
        consent.parentElement.style.color = 'var(--error)';
        const err = document.createElement('span');
        err.className = 'form-error';
        err.textContent = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
        consent.parentElement.appendChild(err);
        valid = false;
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
