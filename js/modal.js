/* ===== AUTH MODAL SYSTEM — auth.js ===== */

(function () {
  'use strict';

  /* ============================================================
     BANGLADESH GEOGRAPHIC DATA
  ============================================================ */
  const BD_DATA = {
    districts: [
      { id: 1, name: 'Dhaka' },
      { id: 2, name: 'Chattogram' },
      { id: 3, name: 'Sylhet' },
      { id: 4, name: 'Rajshahi' },
      { id: 5, name: 'Khulna' },
      { id: 6, name: 'Barishal' },
      { id: 7, name: 'Rangpur' },
      { id: 8, name: 'Mymensingh' },
    ],
    ashons: [
      { id: 1,  district_id: 1, label: 'Dhaka-01' },
      { id: 2,  district_id: 1, label: 'Dhaka-06' },
      { id: 3,  district_id: 1, label: 'Dhaka-09' },
      { id: 4,  district_id: 1, label: 'Dhaka-10' },
      { id: 5,  district_id: 1, label: 'Dhaka-11' },
      { id: 6,  district_id: 1, label: 'Dhaka-17' },
      { id: 7,  district_id: 2, label: 'Chattogram-01' },
      { id: 8,  district_id: 2, label: 'Chattogram-05' },
      { id: 9,  district_id: 2, label: 'Chattogram-09' },
      { id: 10, district_id: 3, label: 'Sylhet-01' },
      { id: 11, district_id: 3, label: 'Sylhet-02' },
      { id: 12, district_id: 3, label: 'Sylhet-03' },
      { id: 13, district_id: 4, label: 'Rajshahi-01' },
      { id: 14, district_id: 4, label: 'Rajshahi-02' },
      { id: 15, district_id: 5, label: 'Khulna-01' },
      { id: 16, district_id: 5, label: 'Khulna-02' },
      { id: 17, district_id: 6, label: 'Barishal-01' },
      { id: 18, district_id: 6, label: 'Barishal-02' },
      { id: 19, district_id: 7, label: 'Rangpur-01' },
      { id: 20, district_id: 7, label: 'Rangpur-02' },
      { id: 21, district_id: 8, label: 'Mymensingh-01' },
      { id: 22, district_id: 8, label: 'Mymensingh-02' },
    ],
    areas: [
      { id: 1,  ashon_id: 3, district_id: 1, name: 'Khilgaon' },
      { id: 2,  ashon_id: 3, district_id: 1, name: 'Mugda' },
      { id: 3,  ashon_id: 3, district_id: 1, name: 'Shobujbagh' },
      { id: 4,  ashon_id: 3, district_id: 1, name: 'Malibagh' },
      { id: 5,  ashon_id: 4, district_id: 1, name: 'Gulshan-1' },
      { id: 6,  ashon_id: 4, district_id: 1, name: 'Gulshan-2' },
      { id: 7,  ashon_id: 4, district_id: 1, name: 'Baridhara' },
      { id: 8,  ashon_id: 4, district_id: 1, name: 'Niketan' },
      { id: 9,  ashon_id: 5, district_id: 1, name: 'Banani' },
      { id: 10, ashon_id: 5, district_id: 1, name: 'Mohakhali' },
      { id: 11, ashon_id: 5, district_id: 1, name: 'Tejgaon' },
      { id: 12, ashon_id: 1, district_id: 1, name: 'Lalbagh' },
      { id: 13, ashon_id: 1, district_id: 1, name: 'Chawkbazar' },
      { id: 14, ashon_id: 2, district_id: 1, name: 'Mirpur-1' },
      { id: 15, ashon_id: 2, district_id: 1, name: 'Mirpur-10' },
      { id: 16, ashon_id: 6, district_id: 1, name: 'Dhanmondi' },
      { id: 17, ashon_id: 6, district_id: 1, name: 'Hazaribagh' },
      { id: 18, ashon_id: 7, district_id: 2, name: 'Kotwali' },
      { id: 19, ashon_id: 7, district_id: 2, name: 'Panchlaish' },
      { id: 20, ashon_id: 8, district_id: 2, name: 'Agrabad' },
      { id: 21, ashon_id: 8, district_id: 2, name: 'Halishahar' },
      { id: 22, ashon_id: 9, district_id: 2, name: 'Pahartali' },
      { id: 23, ashon_id: 10, district_id: 3, name: 'Zindabazar' },
      { id: 24, ashon_id: 10, district_id: 3, name: 'Amberkhana' },
      { id: 25, ashon_id: 11, district_id: 3, name: 'Shahporan' },
      { id: 26, ashon_id: 12, district_id: 3, name: 'Moglabazar' },
      { id: 27, ashon_id: 13, district_id: 4, name: 'Boalia' },
      { id: 28, ashon_id: 14, district_id: 4, name: 'Motihar' },
      { id: 29, ashon_id: 15, district_id: 5, name: 'Daulatpur' },
      { id: 30, ashon_id: 16, district_id: 5, name: 'Sonadanga' },
      { id: 31, ashon_id: 17, district_id: 6, name: 'Kotwali' },
      { id: 32, ashon_id: 18, district_id: 6, name: 'Bakerganj' },
      { id: 33, ashon_id: 19, district_id: 7, name: 'Rangpur Sadar' },
      { id: 34, ashon_id: 20, district_id: 7, name: 'Badarganj' },
      { id: 35, ashon_id: 21, district_id: 8, name: 'Mymensingh Sadar' },
      { id: 36, ashon_id: 22, district_id: 8, name: 'Trishal' },
    ],
  };

  /* ============================================================
     DEMO CREDENTIALS
  ============================================================ */
  const DEMO_CREDS = {
    citizen: {
      email: 'citizen@complaintbox.gov.bd',
      password: 'Citizen@1234',
      role: 'citizen',
      fullName: 'Demo Citizen',
      userId: 'CB-USR-00001',
      redirectTo: 'citizen-dashboard.php',
    },
    staff: {
      email: 'staff@complaintbox.gov.bd',
      password: 'Staff@1234',
      role: 'staff',
      fullName: 'Demo Staff',
      userId: 'CB-STF-00001',
      redirectTo: 'staff-dashboard.php',
    },
    admin: {
      email: 'admin@complaintbox.gov.bd',
      password: 'Admin@1234',
      role: 'admin',
      fullName: 'System Admin',
      userId: 'CB-ADM-00001',
      redirectTo: 'admin-dashboard.php',
    },
  };

  /* ============================================================
     STATE
  ============================================================ */
  let currentTab = 'signin';   // 'signin' | 'register' | 'forgot'
  let currentStep = 1;         // 1 | 2 | 3
  let regData = {};            // accumulated registration form data
  let nidFrontFile = null;
  let nidBackFile  = null;

  /* ============================================================
     INJECT MODAL HTML
  ============================================================ */
  function injectModal() {
    if (document.getElementById('auth-modal-overlay')) return;

    const html = `
      <div id="auth-modal-overlay" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Authentication">
        <div class="auth-modal" id="auth-modal">

          <!-- HEADER -->
          <div class="auth-modal-header">
            <div class="auth-modal-top">
              <div class="auth-brand">
                <div class="auth-brand-icon">
                  <span class="material-symbols-outlined" style="font-size:18px">campaign</span>
                </div>
                <span class="auth-brand-name">ComplaintBox</span>
              </div>
              <button class="auth-close-btn" id="auth-close-btn" aria-label="Close modal">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <!-- TAB ROW — hidden during forgot-password view -->
            <div class="auth-tabs" id="auth-tabs-row" role="tablist">
              <button class="auth-tab active" id="tab-signin"   role="tab" aria-selected="true">Sign In</button>
              <button class="auth-tab"        id="tab-register" role="tab" aria-selected="false">Register</button>
            </div>
          </div>

          <!-- BODY -->
          <div class="auth-modal-body">

            <!-- ── SIGN IN PANEL ── -->
            <div class="auth-panel active" id="panel-signin">
              <h2 class="signin-heading">Welcome back</h2>
              <p class="signin-sub">Sign in to track and report civic issues.</p>

              <div class="form-field">
                <label class="form-label" for="si-identifier">Email / Username / NID / Phone</label>
                <div class="form-input-wrap">
                  <input class="form-input" type="text" id="si-identifier"
                    placeholder="e.g. citizen@complaintbox.gov.bd"
                    autocomplete="username" aria-required="true">
                </div>
                <div class="form-error" id="si-identifier-err"></div>
              </div>

              <div class="form-field">
                <label class="form-label" for="si-password">Password</label>
                <div class="form-input-wrap">
                  <input class="form-input has-icon-right" type="password" id="si-password"
                    placeholder="Enter your password"
                    autocomplete="current-password" aria-required="true">
                  <button class="input-icon-btn" id="si-eye-btn" type="button" aria-label="Toggle password visibility">
                    <span class="material-symbols-outlined" id="si-eye-icon">visibility</span>
                  </button>
                </div>
                <div class="form-error" id="si-password-err"></div>
              </div>

              <div class="forgot-row">
                <button class="forgot-link" id="forgot-link-btn" type="button">Forgot password?</button>
              </div>

              <button class="btn-auth-primary" id="si-submit-btn" type="button">
                <div class="btn-spinner"></div>
                <span class="btn-text">Sign In</span>
              </button>

              <div class="auth-divider">
                <div class="auth-divider-line"></div>
                <span>Demo Quick Access</span>
                <div class="auth-divider-line"></div>
              </div>

              ${buildDemoBtnsHTML('signin')}

              <p class="auth-switch">
                Don't have an account?
                <button class="auth-switch-btn" id="go-register-from-signin" type="button">Register</button>
              </p>
            </div>

            <!-- ── FORGOT PASSWORD PANEL ── -->
            <div class="forgot-panel" id="panel-forgot">
              <button class="btn-back-signin" id="btn-back-to-signin" type="button">
                <span class="material-symbols-outlined">arrow_back</span>
                Back to Sign In
              </button>
              <h2 class="forgot-heading" style="margin-top:16px">Reset Password</h2>
              <p class="forgot-sub">Enter your registered email address and we'll send you a reset link.</p>

              <div class="form-field">
                <label class="form-label" for="forgot-email">Registered Email</label>
                <div class="form-input-wrap">
                  <input class="form-input" type="email" id="forgot-email"
                    placeholder="your@email.com" autocomplete="email">
                </div>
                <div class="form-error" id="forgot-email-err"></div>
              </div>

              <button class="btn-auth-primary" id="forgot-submit-btn" type="button">
                <div class="btn-spinner"></div>
                <span class="btn-text">Send Reset Link</span>
              </button>
            </div>

            <!-- ── REGISTER PANEL ── -->
            <div class="auth-panel" id="panel-register">
              <h2 class="register-heading">Create Account</h2>
              <p class="register-sub">Join thousands of citizens making Bangladesh better.</p>

              <!-- STEP INDICATOR -->
              <div class="step-indicator" id="step-indicator" aria-label="Registration progress">
                <div class="step-pill active" id="pill-1" data-step="1">
                  <div class="step-dot" id="dot-1">01</div>
                  <span class="step-pill-label">Personal Info</span>
                </div>
                <div class="step-line" id="line-1"></div>
                <div class="step-pill" id="pill-2" data-step="2">
                  <div class="step-dot" id="dot-2">02</div>
                  <span class="step-pill-label">Verification</span>
                </div>
                <div class="step-line" id="line-2"></div>
                <div class="step-pill" id="pill-3" data-step="3">
                  <div class="step-dot" id="dot-3">03</div>
                  <span class="step-pill-label">Security</span>
                </div>
              </div>

              <!-- STEP 1 — Personal Info -->
              <div class="reg-step active" id="reg-step-1">
                <div class="step-section-label">Personal Information</div>

                <div class="form-row">
                  <div class="form-field">
                    <label class="form-label" for="r-fullname">Full Name *</label>
                    <input class="form-input" type="text" id="r-fullname"
                      placeholder="Arif Ahmed" autocomplete="name" aria-required="true">
                    <div class="form-error" id="r-fullname-err"></div>
                  </div>
                  <div class="form-field">
                    <label class="form-label" for="r-username">Username *</label>
                    <input class="form-input" type="text" id="r-username"
                      placeholder="arif_ahmed99" autocomplete="username" aria-required="true">
                    <div class="form-error" id="r-username-err"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label class="form-label" for="r-phone">Phone Number *</label>
                    <input class="form-input" type="tel" id="r-phone"
                      placeholder="01XXXXXXXXX" autocomplete="tel" aria-required="true">
                    <div class="form-error" id="r-phone-err"></div>
                  </div>
                  <div class="form-field">
                    <label class="form-label" for="r-email">Email Address *</label>
                    <input class="form-input" type="email" id="r-email"
                      placeholder="you@example.com" autocomplete="email" aria-required="true">
                    <div class="form-error" id="r-email-err"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label class="form-label" for="r-district">Select District *</label>
                    <select class="form-select" id="r-district" aria-required="true">
                      <option value="">Choose District </option>
                    </select>
                    <div class="form-error" id="r-district-err"></div>
                  </div>
                  <div class="form-field">
                    <label class="form-label" for="r-ashon">Ashon No. *</label>
                    <select class="form-select" id="r-ashon" disabled aria-required="true">
                      <option value="">Select District First </option>
                    </select>
                    <div class="form-error" id="r-ashon-err"></div>
                  </div>
                </div>

                <div class="step-nav">
                  <button class="btn-step-next" id="step1-next" type="button">
                    <span class="btn-text">Continue</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- STEP 2 — Verification -->
              <div class="reg-step" id="reg-step-2">
                <div class="step-section-label">NID Verification</div>

                <div class="form-field">
                  <label class="form-label" for="r-nid">NID Number *</label>
                  <input class="form-input" type="text" id="r-nid"
                    placeholder="10–17 digit NID" aria-required="true">
                  <div class="form-error" id="r-nid-err"></div>
                </div>

                <div class="form-field">
                  <label class="form-label">Upload NID Images *</label>
                  <div class="nid-upload-grid">
                    <div class="nid-upload-zone" id="nid-front-zone">
                      <input type="file" id="nid-front-input" accept="image/*" aria-label="NID Front Image">
                      <img class="nid-preview" id="nid-front-preview" alt="NID Front">
                      <div class="nid-preview-overlay"><span class="material-symbols-outlined">edit</span></div>
                      <span class="material-symbols-outlined nid-upload-icon">id_card</span>
                      <div class="nid-upload-text">Front Side</div>
                      <div class="nid-upload-subtext">Click to upload</div>
                    </div>
                    <div class="nid-upload-zone" id="nid-back-zone">
                      <input type="file" id="nid-back-input" accept="image/*" aria-label="NID Back Image">
                      <img class="nid-preview" id="nid-back-preview" alt="NID Back">
                      <div class="nid-preview-overlay"><span class="material-symbols-outlined">edit</span></div>
                      <span class="material-symbols-outlined nid-upload-icon">credit_card_off</span>
                      <div class="nid-upload-text">Back Side</div>
                      <div class="nid-upload-subtext">Click to upload</div>
                    </div>
                  </div>
                  <div class="form-error" id="r-nid-img-err"></div>
                </div>

                <div class="step-nav">
                  <button class="btn-step-back" id="step2-back" type="button">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Back
                  </button>
                  <button class="btn-step-next" id="step2-next" type="button">
                    <span class="btn-text">Last Step</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- STEP 3 — Security -->
              <div class="reg-step" id="reg-step-3">
                <div class="step-section-label">Security Setup</div>

                <div class="form-field">
                  <label class="form-label" for="r-password">Password *</label>
                  <div class="form-input-wrap">
                    <input class="form-input has-icon-right" type="password" id="r-password"
                      placeholder="Min 8 chars, uppercase + number"
                      autocomplete="new-password" aria-required="true">
                    <button class="input-icon-btn" id="r-eye-btn" type="button" aria-label="Toggle password">
                      <span class="material-symbols-outlined" id="r-eye-icon">visibility</span>
                    </button>
                  </div>
                  <div class="password-strength-bar">
                    <div class="password-strength-fill" id="pw-strength-fill"></div>
                  </div>
                  <div class="password-strength-label" id="pw-strength-label" style="color:var(--outline)"></div>
                  <div class="form-error" id="r-password-err"></div>
                </div>

                <div class="form-field">
                  <label class="form-label" for="r-confirm">Confirm Password *</label>
                  <div class="form-input-wrap">
                    <input class="form-input has-icon-right" type="password" id="r-confirm"
                      placeholder="Re-enter password"
                      autocomplete="new-password" aria-required="true">
                    <button class="input-icon-btn" id="r-confirm-eye-btn" type="button" aria-label="Toggle password">
                      <span class="material-symbols-outlined" id="r-confirm-eye-icon">visibility</span>
                    </button>
                  </div>
                  <div class="form-error" id="r-confirm-err"></div>
                </div>

                <div class="terms-row">
                  <input class="terms-checkbox" type="checkbox" id="r-terms" aria-required="true">
                  <label class="terms-text" for="r-terms">
                    I agree to the <a href="#" onclick="return false;">Terms of Service</a>
                    and <a href="#" onclick="return false;">Privacy Policy</a> of ComplaintBox.
                  </label>
                </div>
                <div class="form-error" id="r-terms-err"></div>

                <div class="step-nav">
                  <button class="btn-step-back" id="step3-back" type="button">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Back
                  </button>
                  <button class="btn-step-next btn-auth-primary" id="reg-submit-btn" type="button"
                    style="padding:12px 20px; font-size:15px;">
                    <div class="btn-spinner"></div>
                    <span class="btn-text">Create Account</span>
                  </button>
                </div>
              </div>

              <!-- SUCCESS STATE -->
              <div class="register-success" id="reg-success">
                <div class="success-icon-wrap">
                  <span class="material-symbols-outlined">check_circle</span>
                </div>
                <div class="success-title">Account Created!</div>
                <div class="success-id" id="success-user-id">CB-USR-00000</div>
                <p class="success-msg">
                  Welcome to ComplaintBox! Your account has been created.
                  Redirecting to your dashboard…
                </p>
                <button class="btn-auth-primary" id="success-go-btn" type="button"
                  style="max-width:260px; margin:0 auto;">
                  <span class="material-symbols-outlined">dashboard</span>
                  <span class="btn-text">Go to Dashboard</span>
                </button>
              </div>

              <!-- DEMO BUTTONS in Register panel -->
              <div id="reg-demo-section">
                <div class="auth-divider" style="margin-top:20px">
                  <div class="auth-divider-line"></div>
                  <span>Or use demo access</span>
                  <div class="auth-divider-line"></div>
                </div>
                ${buildDemoBtnsHTML('register')}
              </div>

              <p class="auth-switch">
                Already have an account?
                <button class="auth-switch-btn" id="go-signin-from-register" type="button">Sign In</button>
              </p>
            </div>

          </div><!-- /auth-modal-body -->
        </div><!-- /auth-modal -->
      </div><!-- /modal-overlay -->

      <!-- TOAST CONTAINER -->
      <div id="toast-container" role="status" aria-live="polite"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  /**
   * Build demo autofill button HTML
   * @param {string} context - 'signin' | 'register'
   */
  function buildDemoBtnsHTML(context) {
    return `
      <p class="demo-label">Demo Login</p>
      <div class="demo-btns">
        <button class="demo-btn" data-demo="citizen" data-ctx="${context}" type="button" aria-label="Citizen demo login">
          <div class="demo-btn-icon demo-icon-citizen">
            <span class="material-symbols-outlined" style="font-size:16px">person</span>
          </div>
          <div class="demo-btn-role">Citizen</div>
          <div class="demo-btn-email">citizen@…</div>
        </button>
        <button class="demo-btn" data-demo="staff" data-ctx="${context}" type="button" aria-label="Department staff demo login">
          <div class="demo-btn-icon demo-icon-staff">
            <span class="material-symbols-outlined" style="font-size:16px">badge</span>
          </div>
          <div class="demo-btn-role">Staff</div>
          <div class="demo-btn-email">staff@…</div>
        </button>
        <button class="demo-btn" data-demo="admin" data-ctx="${context}" type="button" aria-label="Admin demo login">
          <div class="demo-btn-icon demo-icon-admin">
            <span class="material-symbols-outlined" style="font-size:16px">admin_panel_settings</span>
          </div>
          <div class="demo-btn-role">Admin</div>
          <div class="demo-btn-email">admin@…</div>
        </button>
      </div>
    `;
  }

  /* ============================================================
     INJECT TOAST CONTAINER (if missing)
  ============================================================ */
  function ensureToastContainer() {
    if (!document.getElementById('toast-container')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div id="toast-container" role="status" aria-live="polite"></div>');
    }
  }

  /* ============================================================
     TOAST SYSTEM
  ============================================================ */

  /**
   * Show a toast notification
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {string} title
   * @param {string} message
   * @param {number} [duration=4000]
   */
  function showToast(type, title, message, duration = 4000) {
    ensureToastContainer();
    const container = document.getElementById('toast-container');

    const icons = {
      success: 'check_circle',
      error:   'error',
      warning: 'warning',
      info:    'info',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined toast-icon"
        style="font-variation-settings:'FILL' 1">${icons[type]}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.replace('show', 'hide');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  }

  /* ============================================================
     MODAL OPEN / CLOSE
  ============================================================ */

  /**
   * Open the auth modal
   * @param {'signin'|'register'} [tab='signin'] - which tab to show
   */
  function openAuthModal(tab = 'signin') {
    injectModal();
    bindEvents();
    populateDistricts();

    const overlay = document.getElementById('auth-modal-overlay');
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('active'));
    });

    switchTab(tab);
  }

  /** Close the auth modal */
  function closeAuthModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    overlay.addEventListener('transitionend', () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, { once: true });
  }

  /* ============================================================
     TAB SWITCHING
  ============================================================ */

  /**
   * Switch between signin/register tabs
   * @param {'signin'|'register'} tab
   */
  function switchTab(tab) {
    currentTab = tab;

    const panelSignin   = document.getElementById('panel-signin');
    const panelRegister = document.getElementById('panel-register');
    const panelForgot   = document.getElementById('panel-forgot');
    const tabsRow       = document.getElementById('auth-tabs-row');
    const tabSignin     = document.getElementById('tab-signin');
    const tabRegister   = document.getElementById('tab-register');

    // Hide forgot panel
    panelForgot.classList.remove('active');
    tabsRow.style.display = '';

    if (tab === 'signin') {
      panelSignin.classList.add('active');
      panelRegister.classList.remove('active');
      tabSignin.classList.add('active');
      tabRegister.classList.remove('active');
      tabSignin.setAttribute('aria-selected', 'true');
      tabRegister.setAttribute('aria-selected', 'false');
    } else {
      panelRegister.classList.add('active');
      panelSignin.classList.remove('active');
      tabRegister.classList.add('active');
      tabSignin.classList.remove('active');
      tabRegister.setAttribute('aria-selected', 'true');
      tabSignin.setAttribute('aria-selected', 'false');
    }
  }

  /** Show forgot-password sub-panel */
  function showForgot() {
    const panelSignin = document.getElementById('panel-signin');
    const panelForgot = document.getElementById('panel-forgot');
    const tabsRow     = document.getElementById('auth-tabs-row');

    panelSignin.classList.remove('active');
    panelForgot.classList.add('active');
    tabsRow.style.display = 'none';
  }

  /* ============================================================
     GEOGRAPHIC DROPDOWNS
  ============================================================ */

  function populateDistricts() {
    const sel = document.getElementById('r-district');
    if (!sel || sel.options.length > 1) return;
    // Prefer live API (all 64 districts); fall back to BD_DATA if API unavailable.
    if (window.API) {
      window.API.districts().then(res => {
        const list = (res && res.data && res.data.districts) || [];
        if (!list.length) { fillFallback(); return; }
        list.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.id;
          opt.textContent = d.name + (d.division ? ` — ${d.division}` : '');
          sel.appendChild(opt);
        });
      }).catch(fillFallback);
    } else {
      fillFallback();
    }
    function fillFallback() {
      BD_DATA.districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        sel.appendChild(opt);
      });
    }
  }

  function populateAshons(districtId) {
    const sel = document.getElementById('r-ashon');
    sel.innerHTML = '<option value="">Choose Ashon No.</option>';
    if (!districtId) { sel.disabled = true; return; }
    if (window.API) {
      window.API.ashons(districtId).then(res => {
        const list = (res && res.data && res.data.ashons) || [];
        list.forEach(a => {
          const opt = document.createElement('option');
          opt.value = a.id;
          opt.textContent = a.ashon_code;
          sel.appendChild(opt);
        });
        sel.disabled = list.length === 0;
      }).catch(() => fillFallback());
    } else {
      fillFallback();
    }
    function fillFallback() {
      const filtered = BD_DATA.ashons.filter(a => a.district_id === Number(districtId));
      filtered.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = a.label;
        sel.appendChild(opt);
      });
      sel.disabled = filtered.length === 0;
    }
  }

  /* ============================================================
     STEP INDICATOR UPDATE
  ============================================================ */

  function updateStepIndicator(step) {
    for (let i = 1; i <= 3; i++) {
      const pill = document.getElementById(`pill-${i}`);
      const dot  = document.getElementById(`dot-${i}`);

      pill.classList.remove('active', 'done');

      if (i < step) {
        pill.classList.add('done');
        dot.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">check</span>';
      } else if (i === step) {
        pill.classList.add('active');
        dot.textContent = `0${i}`;
      } else {
        dot.textContent = `0${i}`;
      }
    }

    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    if (line1) line1.classList.toggle('done', step > 1);
    if (line2) line2.classList.toggle('done', step > 2);
  }

  /* ============================================================
     STEP NAVIGATION
  ============================================================ */

  function goToStep(step, direction = 'forward') {
    const current = document.getElementById(`reg-step-${currentStep}`);
    const next    = document.getElementById(`reg-step-${step}`);

    if (!current || !next) return;

    current.classList.remove('active');
    next.classList.add('active');
    if (direction === 'back') next.classList.add('slide-back');
    setTimeout(() => next.classList.remove('slide-back'), 350);

    currentStep = step;
    updateStepIndicator(step);

    // scroll modal body to top
    const body = document.querySelector('.auth-modal-body');
    if (body) body.scrollTop = 0;
  }

  /* ============================================================
     VALIDATION HELPERS
  ============================================================ */

  /**
   * Show field error
   * @param {string} id - error element id
   * @param {string} msg - error message
   */
  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<span class="material-symbols-outlined">error</span> ${msg}`;
    const input = el.previousElementSibling?.querySelector?.('.form-input') ||
                  el.closest('.form-field')?.querySelector('.form-input, .form-select');
    if (input) input.classList.add('error');
  }

  /**
   * Clear field error
   * @param {string} id - error element id
   */
  function clearErr(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    const input = el.closest('.form-field')?.querySelector('.form-input, .form-select');
    if (input) input.classList.remove('error');
  }

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = phone =>
    /^01[3-9]\d{8}$/.test(phone);

  const validateNID = nid =>
    /^\d{10,17}$/.test(nid.replace(/\s/g, ''));

  /**
   * Evaluate password strength
   * @returns {0|1|2|3|4} strength level
   */
  function getPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function updateStrengthUI(pw) {
    const fill  = document.getElementById('pw-strength-fill');
    const label = document.getElementById('pw-strength-label');
    if (!fill || !label) return;

    const score = getPasswordStrength(pw);
    const levels = [
      { cls: '',               text: '',               color: 'var(--outline)' },
      { cls: 'strength-weak',  text: 'Weak',           color: 'var(--error)' },
      { cls: 'strength-fair',  text: 'Fair',           color: 'var(--status-pending)' },
      { cls: 'strength-good',  text: 'Good',           color: '#22c55e' },
      { cls: 'strength-strong',text: 'Strong ✓',       color: 'var(--status-resolved)' },
    ];

    fill.className = `password-strength-fill ${levels[score]?.cls || ''}`;
    label.textContent  = levels[score]?.text || '';
    label.style.color  = levels[score]?.color || 'var(--outline)';
  }

  /* ============================================================
     STEP VALIDATION
  ============================================================ */

  function validateStep1() {
    let ok = true;

    const fullname = document.getElementById('r-fullname').value.trim();
    const username = document.getElementById('r-username').value.trim();
    const phone    = document.getElementById('r-phone').value.trim();
    const email    = document.getElementById('r-email').value.trim();
    const district = document.getElementById('r-district').value;
    const ashon    = document.getElementById('r-ashon').value;

    clearErr('r-fullname-err'); clearErr('r-username-err');
    clearErr('r-phone-err');    clearErr('r-email-err');
    clearErr('r-district-err'); clearErr('r-ashon-err');

    if (!fullname) { showErr('r-fullname-err', 'Full name is required.'); ok = false; }
    if (!username || /\s/.test(username)) {
      showErr('r-username-err', 'Username required (no spaces).'); ok = false;
    }
    if (!validatePhone(phone)) {
      showErr('r-phone-err', 'Enter valid BD phone (01XXXXXXXXX).'); ok = false;
    }
    if (!validateEmail(email)) {
      showErr('r-email-err', 'Enter a valid email address.'); ok = false;
    }
    if (!district) { showErr('r-district-err', 'Please select a district.'); ok = false; }
    if (!ashon)    { showErr('r-ashon-err',    'Please select an Ashon No.'); ok = false; }

    if (ok) {
      regData.fullName   = fullname;
      regData.username   = username;
      regData.phone      = phone;
      regData.email      = email;
      regData.districtId = district;
      regData.ashonId    = ashon;
    }
    return ok;
  }

  function validateStep2() {
    let ok = true;

    const nid = document.getElementById('r-nid').value.trim();
    clearErr('r-nid-err'); clearErr('r-nid-img-err');

    if (!validateNID(nid)) {
      showErr('r-nid-err', 'NID must be 10–17 digits.'); ok = false;
    }
    if (!nidFrontFile) {
      showErr('r-nid-img-err', 'Please upload NID front image.'); ok = false;
    }
    if (!nidBackFile && ok) {
      showErr('r-nid-img-err', 'Please upload NID back image.'); ok = false;
    }

    if (ok) regData.nid = nid;
    return ok;
  }

  function validateStep3() {
    let ok = true;

    const pw      = document.getElementById('r-password').value;
    const confirm = document.getElementById('r-confirm').value;
    const terms   = document.getElementById('r-terms').checked;

    clearErr('r-password-err'); clearErr('r-confirm-err'); clearErr('r-terms-err');

    if (getPasswordStrength(pw) < 3) {
      showErr('r-password-err',
        'Password needs 8+ chars, 1 uppercase, 1 number.'); ok = false;
    }
    if (pw !== confirm) {
      showErr('r-confirm-err', 'Passwords do not match.'); ok = false;
    }
    if (!terms) {
      showErr('r-terms-err', 'You must agree to the Terms of Service.'); ok = false;
    }

    if (ok) regData.password = pw;
    return ok;
  }

  /* ============================================================
     SIGN IN LOGIC
  ============================================================ */

  function handleSignIn() {
    const identVal = document.getElementById('si-identifier').value.trim();
    const passVal  = document.getElementById('si-password').value;

    clearErr('si-identifier-err'); clearErr('si-password-err');

    let valid = true;
    if (!identVal) { showErr('si-identifier-err', 'This field is required.'); valid = false; }
    if (!passVal)  { showErr('si-password-err',   'Password is required.');  valid = false; }
    if (!valid) return;

    const btn = document.getElementById('si-submit-btn');
    setButtonLoading(btn, true);

    window.API.login(identVal, passVal)
      .then(result => {
        setButtonLoading(btn, false);
        const u = result.data;
        saveSession({
          userId:     u.user_uid,
          role:       u.role,
          fullName:   u.full_name,
          email:      u.email,
          redirectTo: u.redirect_url,
          isVerified: u.profile_verified === 'verified',
        });
        closeAuthModal();
        showToast('success', 'Signed In!', `Welcome back, ${u.full_name}.`);
        setTimeout(() => { window.location.href = u.redirect_url; }, 600);
      })
      .catch(err => {
        setButtonLoading(btn, false);
        showErr('si-identifier-err', err.message || 'Invalid credentials.');
        document.getElementById('si-identifier').classList.add('error');
        document.getElementById('si-password').classList.add('error');
      });
  }

  /* ============================================================
     REGISTER LOGIC
  ============================================================ */

  function handleRegisterSubmit() {
    if (!validateStep3()) return;

    const btn = document.getElementById('reg-submit-btn');
    setButtonLoading(btn, true);

    // Build FormData (NID files may be present in regData)
    const fd = new FormData();
    fd.append('full_name',        regData.fullName || '');
    fd.append('username',         regData.username || '');
    fd.append('phone',            regData.phone || '');
    fd.append('email',            regData.email || '');
    fd.append('nid_number',       regData.nidNumber || '');
    fd.append('district_id',      regData.districtId || '');
    fd.append('ashon_id',         regData.ashonId || '');
    if (regData.areaId)        fd.append('area_id', regData.areaId);
    fd.append('password',         regData.password || '');
    fd.append('confirm_password', regData.confirmPassword || regData.password || '');
    fd.append('nid_number',       regData.nid || regData.nidNumber || '');
    if (nidFrontFile) fd.append('nid_front_image', nidFrontFile);
    if (nidBackFile)  fd.append('nid_back_image',  nidBackFile);

    window.API.register(fd)
      .then(result => {
        setButtonLoading(btn, false);
        const u = result.data;
        regData.userId = u.user_uid;
        regData.role   = u.role;
        saveSession({
          userId:    u.user_uid,
          role:      u.role,
          fullName:  u.full_name,
          email:     regData.email,
          redirectTo: u.redirect_url,
          isVerified: false,
        });
        showRegisterSuccess(u.user_uid);
      })
      .catch(err => {
        setButtonLoading(btn, false);
        showToast('error', 'Registration failed', err.message || 'Could not create account.');
      });
  }

  function showRegisterSuccess(uid) {
    // Hide all steps + demo section
    for (let i = 1; i <= 3; i++) {
      const s = document.getElementById(`reg-step-${i}`);
      if (s) s.style.display = 'none';
    }
    const demoSection = document.getElementById('reg-demo-section');
    const switchLink  = document.querySelector('#panel-register .auth-switch');
    if (demoSection) demoSection.style.display = 'none';
    if (switchLink)  switchLink.style.display  = 'none';

    // Update step indicator to all done
    for (let i = 1; i <= 3; i++) {
      const pill = document.getElementById(`pill-${i}`);
      const dot  = document.getElementById(`dot-${i}`);
      pill.classList.remove('active');
      pill.classList.add('done');
      dot.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">check</span>';
    }
    document.getElementById('line-1')?.classList.add('done');
    document.getElementById('line-2')?.classList.add('done');

    document.getElementById('success-user-id').textContent = uid;
    document.getElementById('reg-success').classList.add('show');

    showToast('success', 'Account Created!', `Your ID: ${uid}. Redirecting…`);

    // Auto redirect after 3s
    setTimeout(() => { window.location.href = 'citizen-dashboard.php'; }, 3000);
  }

  /* ============================================================
     DEMO AUTOFILL + LOGIN
  ============================================================ */

  /**
   * Handle demo button click
   * @param {string} demoKey - 'citizen' | 'staff' | 'admin'
   * @param {string} ctx - 'signin' | 'register'
   */
  function handleDemoClick(demoKey, ctx) {
    const cred = DEMO_CREDS[demoKey];
    if (!cred) return;

    // Always switch to sign in tab
    switchTab('signin');

    const identInput = document.getElementById('si-identifier');
    const passInput  = document.getElementById('si-password');

    // Autofill with flash animation
    identInput.value = cred.email;
    passInput.value  = cred.password;

    identInput.classList.add('flash-fill');
    passInput.classList.add('flash-fill');

    setTimeout(() => {
      identInput.classList.remove('flash-fill');
      passInput.classList.remove('flash-fill');
    }, 600);

    // Trigger real login through the API after autofill animation
    setTimeout(() => {
      handleSignIn();
    }, 600);
  }

  /* ============================================================
     FORGOT PASSWORD
  ============================================================ */

  function handleForgotSubmit() {
    const emailVal = document.getElementById('forgot-email').value.trim();
    clearErr('forgot-email-err');

    if (!validateEmail(emailVal)) {
      showErr('forgot-email-err', 'Enter a valid email address.');
      return;
    }

    const btn = document.getElementById('forgot-submit-btn');
    setButtonLoading(btn, true);

    setTimeout(() => {
      setButtonLoading(btn, false);
      showToast('info', 'Reset Link Sent', `If ${emailVal} is registered, a reset link has been sent.`);
      switchTab('signin');
    }, 1000);
  }

  /* ============================================================
     SESSION MANAGEMENT
  ============================================================ */

  /**
   * Save user session to localStorage
   * @param {object} data
   */
  function saveSession(data) {
    localStorage.setItem('cb_user', JSON.stringify({
      userId:    data.userId    || '',
      role:      data.role      || 'citizen',
      fullName:  data.fullName  || '',
      email:     data.email     || '',
      district:  data.district  || '',
      ashonId:   data.ashonId   || '',
      isVerified: data.isVerified || false,
      token:     btoa(data.email + ':' + Date.now()),
    }));
  }

  /** Get current session */
  function getSession() {
    try {
      return JSON.parse(localStorage.getItem('cb_user'));
    } catch { return null; }
  }

  /** Clear session (server-side) and redirect */
  function signOut() {
    localStorage.removeItem('cb_user');
    if (window.API) {
      window.API.logout().finally(() => { window.location.href = 'index.php'; });
    } else {
      window.location.href = 'index.php';
    }
  }

  /* ============================================================
     NAVBAR STATE (update Sign In btn if logged in)
  ============================================================ */
  function updateNavbar() {
    const session = getSession();
    const btn = document.querySelector('.btn-signin');
    if (!btn) return;

    if (session) {
      const initials = session.fullName
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      btn.outerHTML = `
        <div style="position:relative" id="nav-user-wrap">
          <button id="nav-avatar-btn"
            style="
              display:flex; align-items:center; gap:8px;
              background:var(--primary-container); color:white;
              border:none; border-radius:9999px; padding:8px 16px 8px 8px;
              cursor:pointer; font-family:'Inter',sans-serif; font-weight:600;
              font-size:14px; transition:all 0.2s;
            ">
            <span style="
              width:28px; height:28px; border-radius:50%;
              background:var(--primary-fixed); color:var(--primary);
              display:flex; align-items:center; justify-content:center;
              font-weight:800; font-size:11px;
            ">${initials}</span>
            ${session.fullName.split(' ')[0]}
            <span class="material-symbols-outlined" style="font-size:16px">expand_more</span>
          </button>
          <div id="nav-dropdown"
            style="
              display:none; position:absolute; right:0; top:calc(100% + 8px);
              background:white; border-radius:16px; padding:8px;
              box-shadow:0 20px 40px rgba(0,0,0,0.15);
              border:1px solid var(--outline-variant); min-width:180px; z-index:100;
            ">
            <a href="${session.role === 'admin' ? 'admin-dashboard.php' : session.role === 'staff' ? 'staff-dashboard.php' : 'citizen-dashboard.php'}"
              style="
                display:flex; align-items:center; gap:10px; padding:10px 14px;
                border-radius:10px; color:var(--on-surface); text-decoration:none;
                font-family:'Inter',sans-serif; font-size:14px; font-weight:500;
                transition:background 0.2s;
              "
              onmouseover="this.style.background='var(--surface-container)'"
              onmouseout="this.style.background='transparent'">
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">dashboard</span>
              My Dashboard
            </a>
            <button id="nav-signout-btn"
              style="
                width:100%; display:flex; align-items:center; gap:10px;
                padding:10px 14px; border-radius:10px; border:none; background:transparent;
                color:var(--error); cursor:pointer; font-family:'Inter',sans-serif;
                font-size:14px; font-weight:500; transition:background 0.2s;
              "
              onmouseover="this.style.background='#fff5f5'"
              onmouseout="this.style.background='transparent'">
              <span class="material-symbols-outlined" style="font-size:18px">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      `;

      // Bind dropdown toggle
      setTimeout(() => {
        const avatarBtn  = document.getElementById('nav-avatar-btn');
        const dropdown   = document.getElementById('nav-dropdown');
        const signoutBtn = document.getElementById('nav-signout-btn');

        avatarBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = dropdown.style.display === 'block';
          dropdown.style.display = isOpen ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
          if (dropdown) dropdown.style.display = 'none';
        });
        signoutBtn?.addEventListener('click', signOut);
      }, 50);
    }
  }

  /* ============================================================
     UTILITY: BUTTON LOADING STATE
  ============================================================ */

  function setButtonLoading(btn, state) {
    if (!btn) return;
    btn.disabled = state;
    btn.classList.toggle('loading', state);
  }

  /* ============================================================
     PASSWORD TOGGLE
  ============================================================ */

  function bindPasswordToggle(inputId, iconId) {
    const icon = document.getElementById(iconId);
    const input = document.getElementById(inputId);
    if (!icon || !input) return;

    icon.closest('button')?.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      icon.textContent = isHidden ? 'visibility_off' : 'visibility';
    });
  }

  /* ============================================================
     NID PREVIEW
  ============================================================ */

  function bindNIDUpload(inputId, previewId, zoneId) {
    const input   = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const zone    = document.getElementById(zoneId);
    if (!input || !preview || !zone) return;

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;

      if (inputId === 'nid-front-input') nidFrontFile = file;
      else nidBackFile = file;

      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.classList.add('show');
        zone.classList.add('has-file');
        // Hide the icon + text
        const icon = zone.querySelector('.nid-upload-icon');
        const text = zone.querySelector('.nid-upload-text');
        const sub  = zone.querySelector('.nid-upload-subtext');
        if (icon) icon.style.display = 'none';
        if (text) text.style.display = 'none';
        if (sub)  sub.style.display  = 'none';
        clearErr('r-nid-img-err');
      };
      reader.readAsDataURL(file);
    });
  }

  /* ============================================================
     EVENT BINDING (called once per modal inject)
  ============================================================ */

  let eventsBound = false;

  function bindEvents() {
    if (eventsBound) return;
    eventsBound = true;

    const overlay = document.getElementById('auth-modal-overlay');
    const modal   = document.getElementById('auth-modal');

    /* Close button */
    document.getElementById('auth-close-btn')
      ?.addEventListener('click', closeAuthModal);

    /* Click overlay background to close */
    overlay?.addEventListener('click', e => {
      if (e.target === overlay) closeAuthModal();
    });

    /* ESC key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAuthModal();
    });

    /* Tab switchers */
    document.getElementById('tab-signin')
      ?.addEventListener('click', () => switchTab('signin'));
    document.getElementById('tab-register')
      ?.addEventListener('click', () => switchTab('register'));

    /* Switch links */
    document.getElementById('go-register-from-signin')
      ?.addEventListener('click', () => switchTab('register'));
    document.getElementById('go-signin-from-register')
      ?.addEventListener('click', () => switchTab('signin'));

    /* Forgot password */
    document.getElementById('forgot-link-btn')
      ?.addEventListener('click', showForgot);
    document.getElementById('btn-back-to-signin')
      ?.addEventListener('click', () => switchTab('signin'));
    document.getElementById('forgot-submit-btn')
      ?.addEventListener('click', handleForgotSubmit);

    /* Sign In submit */
    document.getElementById('si-submit-btn')
      ?.addEventListener('click', handleSignIn);

    /* Sign In on Enter */
    ['si-identifier', 'si-password'].forEach(id => {
      document.getElementById(id)
        ?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSignIn(); });
    });

    /* Password visibility toggles */
    bindPasswordToggle('si-password', 'si-eye-icon');
    bindPasswordToggle('r-password',  'r-eye-icon');
    bindPasswordToggle('r-confirm',   'r-confirm-eye-icon');

    /* Password strength meter */
    document.getElementById('r-password')
      ?.addEventListener('input', e => updateStrengthUI(e.target.value));

    /* District → Ashon cascade */
    document.getElementById('r-district')
      ?.addEventListener('change', e => populateAshons(e.target.value));

    /* Step 1 next */
    document.getElementById('step1-next')
      ?.addEventListener('click', () => {
        if (validateStep1()) goToStep(2);
      });

    /* Step 2 navigation */
    document.getElementById('step2-back')
      ?.addEventListener('click', () => goToStep(1, 'back'));
    document.getElementById('step2-next')
      ?.addEventListener('click', () => {
        if (validateStep2()) goToStep(3);
      });

    /* Step 3 navigation */
    document.getElementById('step3-back')
      ?.addEventListener('click', () => goToStep(2, 'back'));
    document.getElementById('reg-submit-btn')
      ?.addEventListener('click', handleRegisterSubmit);

    /* Success go button */
    document.getElementById('success-go-btn')
      ?.addEventListener('click', () => { window.location.href = 'citizen-dashboard.php'; });

    /* NID file inputs */
    bindNIDUpload('nid-front-input', 'nid-front-preview', 'nid-front-zone');
    bindNIDUpload('nid-back-input',  'nid-back-preview',  'nid-back-zone');

    /* Demo buttons — event delegation */
    overlay?.addEventListener('click', e => {
      const btn = e.target.closest('[data-demo]');
      if (btn) handleDemoClick(btn.dataset.demo, btn.dataset.ctx);
    });

    /* Clear errors on input */
    const fieldMap = {
      'r-fullname': 'r-fullname-err', 'r-username': 'r-username-err',
      'r-phone':    'r-phone-err',    'r-email':    'r-email-err',
      'r-district': 'r-district-err', 'r-ashon':    'r-ashon-err',
      'r-nid':      'r-nid-err',      'r-password': 'r-password-err',
      'r-confirm':  'r-confirm-err',
    };
    Object.entries(fieldMap).forEach(([inputId, errId]) => {
      document.getElementById(inputId)
        ?.addEventListener('input', () => clearErr(errId));
    });
    document.getElementById('r-terms')
      ?.addEventListener('change', () => clearErr('r-terms-err'));
    document.getElementById('si-identifier')
      ?.addEventListener('input', () => clearErr('si-identifier-err'));
    document.getElementById('si-password')
      ?.addEventListener('input', () => clearErr('si-password-err'));
  }

  /* ============================================================
     BIND LANDING PAGE TRIGGERS
  ============================================================ */

  function bindPageTriggers() {
    // Sign In button in navbar
    document.querySelector('.btn-signin')
      ?.addEventListener('click', () => openAuthModal('signin'));

    // "Register Now" in CTA
    document.querySelector('.btn-cta-primary')
      ?.addEventListener('click', () => openAuthModal('register'));

    // Hero "Report an Issue"
    document.querySelector('.btn-primary-hero')
      ?.addEventListener('click', () => {
        const session = getSession();
        if (session?.role === 'citizen') {
          window.location.href = 'citizen-dashboard.php';
        } else {
          openAuthModal('signin');
        }
      });

    // Hero "Track Status"
    document.querySelector('.btn-outline-hero')
      ?.addEventListener('click', () => {
        const session = getSession();
        if (session?.role === 'citizen') {
          window.location.href = 'citizen-dashboard.php#my-complaints';
        } else {
          openAuthModal('signin');
        }
      });

    // "View More Complaints"
    document.querySelector('.btn-view-more')
      ?.addEventListener('click', () => {
        window.location.href = 'recent-complaints.php';
      });

    // "Learn More" in CTA
    document.querySelector('.btn-cta-outline')
      ?.addEventListener('click', () => {
        window.location.href = 'about.php';
      });
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */
  window.AuthModal = {
    open:      openAuthModal,
    close:     closeAuthModal,
    showToast: showToast,
    getSession,
    signOut,
  };

  /* ============================================================
     INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    bindPageTriggers();
  });

})();