 /* ===== CONTACT PAGE JS ===== */
(function () {
  'use strict';

  /* ============================================================
     NAVBAR
  ============================================================ */
  function initNavbar() {
    const nav = document.getElementById('main-nav');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = hamburgerBtn?.querySelector('.hamburger-icon');
    let menuOpen = false;

    // Scroll behavior
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }, { passive: true });

    // Hamburger toggle
    hamburgerBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      if (hamburgerIcon) {
        hamburgerIcon.textContent = menuOpen ? 'close' : 'menu';
      }
      // Expand nav border-radius when open
      nav.style.borderRadius = menuOpen ? '24px' : '9999px';
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (menuOpen && !nav.contains(e.target)) {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        if (hamburgerIcon) hamburgerIcon.textContent = 'menu';
        nav.style.borderRadius = '9999px';
      }
    });

    // Sign in buttons in navbar
    const signinBtns = document.querySelectorAll('.btn-signin, .mobile-signin-btn');
    signinBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.AuthModal) window.AuthModal.open('signin');
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ============================================================
     FAQ ACCORDION
  ============================================================ */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');

      questionBtn?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
        questionBtn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ============================================================
     STAR RATING
  ============================================================ */
  let selectedRating = 0;

  function initStarRating() {
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingLabel = document.getElementById('star-rating-label');

    const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    starBtns.forEach(btn => {
      const value = parseInt(btn.dataset.value);

      // Hover in
      btn.addEventListener('mouseenter', () => {
        updateStars(value, 'hover');
        if (ratingLabel) ratingLabel.textContent = ratingLabels[value];
      });

      // Hover out — revert to selected
      btn.addEventListener('mouseleave', () => {
        updateStars(selectedRating, 'selected');
        if (ratingLabel) {
          ratingLabel.textContent = selectedRating > 0
            ? ratingLabels[selectedRating]
            : 'Click to rate';
        }
      });

      // Click — lock rating
      btn.addEventListener('click', () => {
        selectedRating = value;
        updateStars(selectedRating, 'selected');
        if (ratingLabel) ratingLabel.textContent = `${ratingLabels[value]} (${value}/5)`;
        // Clear rating error
        clearFieldError('feedback-rating-err');
      });
    });
  }

  function updateStars(upTo, mode) {
    const starBtns = document.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      const value = parseInt(btn.dataset.value);
      btn.classList.remove('filled', 'hovered');
      if (value <= upTo) {
        btn.classList.add(mode === 'hover' ? 'hovered' : 'filled');
      }
    });
  }

  function resetStarRating() {
    selectedRating = 0;
    updateStars(0, 'selected');
    const ratingLabel = document.getElementById('star-rating-label');
    if (ratingLabel) ratingLabel.textContent = 'Click to rate';
  }

  /* ============================================================
     CHARACTER COUNTER
  ============================================================ */
  function initCharCounter() {
    const textarea = document.getElementById('feedback-message');
    const counter = document.getElementById('msg-char-count');

    if (textarea && counter) {
      textarea.addEventListener('input', () => {
        counter.textContent = textarea.value.length;
        if (textarea.value.length > 900) {
          counter.style.color = 'var(--error)';
        } else {
          counter.style.color = 'var(--outline)';
        }
      });
    }
  }

  /* ============================================================
     FEEDBACK FORM VALIDATION
  ============================================================ */
  function showFieldError(errId, message) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.innerHTML = `<span class="material-symbols-outlined">error</span> ${message}`;
  }

  function clearFieldError(errId) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.innerHTML = '';
  }

  function setInputError(inputEl, hasError) {
    if (!inputEl) return;
    inputEl.classList.toggle('error', hasError);
  }

  function validateFeedbackForm() {
    let valid = true;

    const topic = document.getElementById('feedback-topic');
    const message = document.getElementById('feedback-message');

    // Clear previous errors
    clearFieldError('feedback-topic-err');
    clearFieldError('feedback-rating-err');
    clearFieldError('feedback-message-err');
    setInputError(topic, false);
    setInputError(message, false);

    // Topic
    if (!topic?.value.trim()) {
      showFieldError('feedback-topic-err', 'Please enter a feedback topic.');
      setInputError(topic, true);
      valid = false;
    } else if (topic.value.trim().length < 3) {
      showFieldError('feedback-topic-err', 'Topic must be at least 3 characters.');
      setInputError(topic, true);
      valid = false;
    }

    // Rating
    if (selectedRating === 0) {
      showFieldError('feedback-rating-err', 'Please select a star rating.');
      valid = false;
    }

    // Message
    if (!message?.value.trim()) {
      showFieldError('feedback-message-err', 'Please enter your feedback message.');
      setInputError(message, true);
      valid = false;
    } else if (message.value.trim().length < 10) {
      showFieldError('feedback-message-err', 'Message must be at least 10 characters long.');
      setInputError(message, true);
      valid = false;
    }

    return valid;
  }

  /* ============================================================
     FEEDBACK FORM SUBMISSION
  ============================================================ */
  function initFeedbackForm() {
    const form = document.getElementById('feedback-form');
    const submitBtn = document.getElementById('btn-feedback-submit');
    const successState = document.getElementById('feedback-success');
    const feedbackLoginNotice = document.getElementById('feedback-login-notice');
    const feedbackLoginLink = document.getElementById('feedback-login-link');
    const resetBtn = document.getElementById('btn-feedback-reset');

    // Check auth status via API (falls back to localStorage)
    async function checkAuthStatus() {
      let session = null;
      try {
        const res = await window.API.session();
        session = res.data;
      } catch (e) { session = null; }
      if (!session) session = window.AuthModal?.getSession?.() || null;
      if (!session) {
        // Show login notice
        if (feedbackLoginNotice) feedbackLoginNotice.classList.add('show');
        // Disable form fields
        setFormDisabled(true);
      } else {
        if (feedbackLoginNotice) feedbackLoginNotice.classList.remove('show');
        setFormDisabled(false);
      }
    }

    function setFormDisabled(disabled) {
      const inputs = form?.querySelectorAll('input, textarea, button.star-btn');
      inputs?.forEach(el => {
        el.disabled = disabled;
        if (disabled) {
          el.style.opacity = '0.5';
          el.style.cursor = 'not-allowed';
        } else {
          el.style.opacity = '';
          el.style.cursor = '';
        }
      });
      if (submitBtn) {
        submitBtn.disabled = disabled;
        if (disabled) {
          submitBtn.style.opacity = '0.5';
          submitBtn.style.cursor = 'not-allowed';
        } else {
          submitBtn.style.opacity = '';
          submitBtn.style.cursor = '';
        }
      }
    }

    // Login link in notice
    feedbackLoginLink?.addEventListener('click', () => {
      if (window.AuthModal) window.AuthModal.open('signin');
    });

    // Check auth on load
    checkAuthStatus();

    // Re-check auth when form is interacted with
    form?.addEventListener('focusin', checkAuthStatus);

    // Clear errors on input
    document.getElementById('feedback-topic')?.addEventListener('input', () => {
      clearFieldError('feedback-topic-err');
      setInputError(document.getElementById('feedback-topic'), false);
    });
    document.getElementById('feedback-message')?.addEventListener('input', () => {
      clearFieldError('feedback-message-err');
      setInputError(document.getElementById('feedback-message'), false);
    });

    // Submit
    form?.addEventListener('submit', handleFeedbackSubmit);
    submitBtn?.addEventListener('click', handleFeedbackSubmit);

    function handleFeedbackSubmit(e) {
      e.preventDefault();
      if (!validateFeedbackForm()) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      const btnText = document.getElementById('btn-feedback-text');
      if (btnText) btnText.textContent = 'Sending...';

      const topic   = document.getElementById('feedback-topic')?.value.trim();
      const message = document.getElementById('feedback-message')?.value.trim();

      window.API.submitFeedback(topic, selectedRating, message)
        .then(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Send Feedback';

          if (form) form.style.display = 'none';
          if (successState) successState.classList.add('show');

          if (window.showToast) window.showToast('Thank you for your feedback!', 'success');
        })
        .catch(err => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Send Feedback';
          if (err && err.status === 401) {
            if (window.AuthModal) window.AuthModal.open('signin');
          } else {
            if (window.showToast) window.showToast(err.message || 'Could not send feedback.', 'error');
          }
        });
    }

    // Reset form
    resetBtn?.addEventListener('click', () => {
      // Reset fields
      if (form) {
        form.reset();
        form.style.display = '';
      }
      if (successState) successState.classList.remove('show');

      // Reset star rating
      resetStarRating();

      // Reset character counter
      const counter = document.getElementById('msg-char-count');
      if (counter) counter.textContent = '0';

      // Clear all errors
      clearFieldError('feedback-topic-err');
      clearFieldError('feedback-rating-err');
      clearFieldError('feedback-message-err');

      // Re-check auth
      checkAuthStatus();
    });
  }

  /* ============================================================
     DEPARTMENT CARDS — hover animation enhancement
  ============================================================ */
  function initDeptCards() {
    const cards = document.querySelectorAll('.dept-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.willChange = 'transform';
      });
      card.addEventListener('mouseleave', () => {
        card.style.willChange = 'auto';
      });
    });
  }

  /* ============================================================
     CTA BUTTONS
  ============================================================ */
  function initCTAButtons() {
    // Register Now in CTA
    const ctaRegisterBtn = document.getElementById('cta-register-btn');
    ctaRegisterBtn?.addEventListener('click', () => {
      if (window.AuthModal) window.AuthModal.open('register');
    });
  }

  /* ============================================================
     SMOOTH SCROLL — anchor links (if any)
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 90; // navbar height
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     MAP CARD — fallback if iframe fails
  ============================================================ */
  function initMap() {
    const iframe = document.querySelector('.map-embed-wrap iframe');
    if (!iframe) return;

    iframe.addEventListener('error', () => {
      const wrap = document.querySelector('.map-embed-wrap');
      if (wrap) {
        wrap.innerHTML = `
          <div style="
            display:flex; flex-direction:column; align-items:center; justify-content:center;
            height:100%; gap:12px; background:var(--surface-container);
            color:var(--on-surface-variant); font-family:'Inter',sans-serif;
          ">
            <span class="material-symbols-outlined" style="font-size:48px; color:var(--outline)">map</span>
            <p style="font-size:14px; font-weight:500;">Map unavailable. Please check your connection.</p>
            <a href="https://maps.google.com/?q=Bangladesh" target="_blank" rel="noopener noreferrer"
               style="
                 font-size:13px; color:var(--primary-container); font-weight:600;
                 text-decoration:underline; cursor:pointer;
               ">Open in Google Maps</a>
          </div>
        `;
      }
    });
  }

  /* ============================================================
     ACCESSIBILITY — keyboard navigation for dept cards
  ============================================================ */
  function initAccessibility() {
    // Make dept cards keyboard accessible
    document.querySelectorAll('.dept-contact-item').forEach(link => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });

    // FAQ keyboard support
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* ============================================================
     ACTIVE LINK HIGHLIGHT ON SCROLL
  ============================================================ */
  function initNavHighlight() {
    // Already set in HTML — just ensure nav-scrolled state on page load if needed
    if (window.scrollY > 50) {
      document.getElementById('main-nav')?.classList.add('nav-scrolled');
    }
  }

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initFAQ();
    initStarRating();
    initCharCounter();
    initFeedbackForm();
    initDeptCards();
    initCTAButtons();
    initSmoothScroll();
    initMap();
    initAccessibility();
    initNavHighlight();
    loadDepartmentsLive();

    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));
  });

  // Fetch real department contact info and patch into the static cards.
  async function loadDepartmentsLive() {
    if (!window.API) return;
    try {
      const res = await window.API.departments();
      const depts = (res.data && res.data.departments) || [];
      // Map category_key -> dept icon class on the static cards
      const ICON_CLASS_MAP = {
        infrastructure:'dept-icon-infra', water_service:'dept-icon-water',
        electricity:'dept-icon-electric', waste_management:'dept-icon-waste',
        traffic_transport:'dept-icon-traffic', environment:'dept-icon-env',
        public_services:'dept-icon-public', others:'dept-icon-others'
      };
      depts.forEach(d => {
        const cls = ICON_CLASS_MAP[d.category_key];
        if (!cls) return;
        const card = document.querySelector('.' + cls)?.closest('.dept-card');
        if (!card) return;
        const mail = card.querySelector('a[href^="mailto:"]');
        const tel  = card.querySelector('a[href^="tel:"]');
        if (mail && d.contact_email) {
          mail.href = 'mailto:' + d.contact_email;
          const txt = mail.querySelector('span:not(.material-symbols-outlined)');
          if (txt) txt.textContent = d.contact_email;
        }
        if (tel && d.contact_phone) {
          tel.href = 'tel:' + d.contact_phone.replace(/[^\d+]/g, '');
          const txt = tel.querySelector('span:not(.material-symbols-outlined)');
          if (txt) txt.textContent = d.contact_phone;
        }
      });
    } catch (e) { console.warn('contact deps live load failed', e); }
  }

})();
