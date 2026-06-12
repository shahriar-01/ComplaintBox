<?php
require_once __DIR__ . '/includes/db.php';
if (session_status() === PHP_SESSION_NONE) session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="js/page-boot.js?v=1781267907"></script>
<link rel="stylesheet" href="css/transitions.css?v=1781267907">

<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>ComplaintBox - Empowering Bangladesh Through Transparency</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/modal.css?v=1781267907">
<link rel="stylesheet" href="css/style.css?v=1781267907">

</head>
<body>

<!-- ===== NAVBAR ===== -->
<nav id="main-nav">
  <div class="nav-inner">
    <span class="nav-brand nav-text">ComplaintBox</span>
    <ul class="nav-links">
      <li><a href="index.php" class="nav-link active-link nav-text">Home</a></li>
      <li><a href="recent-complaints.php" class="nav-link nav-text">Recent Complaints</a></li>
      <li><a href="about.php" class="nav-link nav-text">About</a></li>
      <li><a href="contact.php" class="nav-link nav-text">Contacts</a></li>
    </ul>
    <div>
      <?php if (isset($_SESSION['user_id'])): ?>
      <a class="btn-signin nav-btn" href="<?php
          $role = $_SESSION['role'] ?? '';
          echo $role === 'admin' ? 'admin-dashboard.php' : ($role === 'staff' ? 'staff-dashboard.php' : 'citizen-dashboard.php');
        ?>" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
        <span class="material-symbols-rounded" style="font-size:20px;">account_circle</span>
        <?php echo htmlspecialchars($_SESSION['full_name'] ?? 'Dashboard'); ?>
      </a>
    <?php else: ?>
      <button class="btn-signin nav-btn">Sign In</button>
    <?php endif; ?>
    </div>
  </div>
</nav>

<!-- ===== HERO ===== -->
<section class="hero-section">
  <div class="hero-bg">
    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuClWyIGScRwf_zGC0IrB0s8MwnVk5DOHbuFInaWixYMhltUlCw9OKXtIdT4VcOYONxqMFcxUNguM--xkm9ofE05oEYqRk1abvWJoAgx1-VMXhwo5V27oYaC1bVSYnFZgO9Lg18idz-9zyZXzf9cTqARrFZTjjkwDjdAqk0MBd39Rsyrs2XCta8xAmeKK2ufb-8cQ8qCMEI9DtZAy2u5X0dTU6wtnJyIh3po3RH03o4KyQ3phRJCyG6WmWUiFK_QSat7m4n3mFpn_r4" alt="City Background">
    <div class="hero-overlay"></div>
  </div>

  <!-- Data Nodes -->
  <div class="data-nodes">
    <div class="data-node data-node-1 floating-pin">
      <div class="node-dot node-dot-red"></div>
      <div class="node-label node-label-red">
        <span>CVB_0142: INFRASTRUCTURE</span>
        <span>Massive Pothole</span>
      </div>
    </div>
    <div class="data-node data-node-2 floating-pin">
      <div class="node-dot node-dot-orange"></div>
      <div class="node-label node-label-orange">
        <span>CVB_0891: WATER_SERVICE</span>
        <span>No Water Supply</span>
      </div>
    </div>
    <div class="data-node data-node-3 floating-pin">
      <div class="node-dot node-dot-green"></div>
      <div class="node-label node-label-green">
        <span>CVB_1105: ELECTRICTY</span>
        <span>Power Restored</span>
      </div>
    </div>
  </div>

  <div class="hero-content reveal active">
    <h1 class="hero-title">A <span class="hero-title-gradient">Centralized Platform</span> for Efficient Public Issue Resolution.</h1>
    
    <p class="hero-desc">Empowering citizens and government authorities with real-time complaint reporting, tracking, and resolution management. Let's build a smarter Bangladesh together.</p>
    <div class="hero-buttons">
      <button class="btn-primary-hero" onclick="handleHeroReportIssue()">
        <span class="material-symbols-outlined btn-icon">campaign</span>
        Report an Issue
      </button>
      <button class="btn-outline-hero" onclick="handleHeroTrackStatus()">
        <span class="material-symbols-outlined">location_searching</span>
        Track Status
      </button>
    </div>
  </div>
</section>

<!-- ===== FEATURED COMPLAINTS ===== -->
<section class="section-featured">
  <div class="section-header reveal active">
    <div>
      <span class="section-tag">Real-time reports</span>
      <h2 class="section-title font-jakarta">Featured Complaints</h2>
    </div>
  </div>

  <div class="cards-grid">
    <!-- Card 1 -->
    <div class="complaint-card hover-card reveal active" style="transition-delay:100ms">
      <div class="card-header">
        <div class="card-tags">
          <span class="tag tag-waste">
            <span class="material-symbols-outlined animate-pulse-soft" style="font-size:12px">restore_from_trash</span>
            Waste Management
          </span>
          <span class="tag tag-critical">Critical</span>
        </div>
        <span class="card-id">CB-2025-0042</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">#Illegal Waste Dumping</h3>
        <p class="card-desc">Unauthorized garbage disposal blocking the main drainage system and causing severe health hazards for the residents.</p>
        <div class="card-meta">
          <a href="#" class="card-location">
            <span class="material-symbols-outlined">location_on</span>
            Dhanmondi, Dhaka
          </a>
          <span>Nov 15, 2025</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="progress-bar-wrap">
          <div class="progress-bar bar-pending" style="width:40%"></div>
        </div>
        <div class="card-actions">
          <span class="status-badge status-pending-color">
            <span class="status-dot status-pending-dot"></span>
            In Review
          </span>
          <div class="action-btns">
            <button class="action-btn">
              <span class="material-symbols-outlined">thumb_up</span>
              42
            </button>
            <button class="action-btn">
              <span class="material-symbols-outlined">comment</span>
              12
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="complaint-card hover-card reveal active" style="transition-delay:200ms">
      <div class="card-header">
        <div class="card-tags">
          <span class="tag tag-power">
            <span class="material-symbols-outlined animate-pulse-soft" style="font-size:12px">electric_bolt</span>
            Power
          </span>
          <span class="tag tag-medium">Medium</span>
        </div>
        <span class="card-id">CB-2026-0043</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">#Broken Street Lamps</h3>
        <p class="card-desc">Street lamps on the main avenue have been non-functional for three nights, creating safety concerns for commuters.</p>
        <div class="card-meta">
          <a href="#" class="card-location">
            <span class="material-symbols-outlined">location_on</span>
            Agrabad, Chattogram
          </a>
          <span>Jan 7, 2026</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="progress-bar-wrap">
          <div class="progress-bar bar-assigned" style="width:65%"></div>
        </div>
        <div class="card-actions">
          <span class="status-badge status-assigned-color">
            <span class="status-dot status-assigned-dot"></span>
            Assigned
          </span>
          <div class="action-btns">
            <button class="action-btn">
              <span class="material-symbols-outlined">thumb_up</span>
              128
            </button>
            <button class="action-btn">
              <span class="material-symbols-outlined">comment</span>
              24
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="complaint-card hover-card reveal active" style="transition-delay:300ms">
      <div class="card-header">
        <div class="card-tags">
          <span class="tag tag-infra">
            <span class="material-symbols-outlined animate-pulse-soft" style="font-size:12px">construction</span>
            Infrastructure
          </span>
          <span class="tag tag-high">High</span>
        </div>
        <span class="card-id">CB-2026-0044</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">#Open Sewer Manhole</h3>
        <p class="card-desc">A manhole cover is missing near the primary school, posing a significant risk to children and pedestrians at night.</p>
        <div class="card-meta">
          <a href="#" class="card-location">
            <span class="material-symbols-outlined">location_on</span>
            Zindabazar, Sylhet
          </a>
          <span>April 24, 2026</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="progress-bar-wrap">
          <div class="progress-bar bar-inprogress" style="width:85%"></div>
        </div>
        <div class="card-actions">
          <span class="status-badge status-blue-color">
            <span class="status-dot status-blue-dot"></span>
            In Progress
          </span>
          <div class="action-btns">
            <button class="action-btn">
              <span class="material-symbols-outlined">thumb_up</span>
              89
            </button>
            <button class="action-btn">
              <span class="material-symbols-outlined">comment</span>
              18
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="view-more-wrap reveal active">
    <button class="btn-view-more">
      View More Complaints
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
  </div>
</section>

<!-- ===== HOW IT WORKS ===== -->
<section class="section-hiw">
  <div class="hiw-header reveal active">
    <h2 class="section-title font-jakarta">- How This Works -</h2>
    <p>Transparent civic resolution made easy for every Bangladeshi citizen.</p>
  </div>

  <div class="steps-grid">
    <div class="step-connector"></div>

    <div class="step-item reveal active" style="transition-delay:100ms">
      <div class="step-num">01</div>
      <h4>Register</h4>
      <p>Create your verified profile using NID or Phone.</p>
    </div>

    <div class="step-item reveal active" style="transition-delay:200ms">
      <div class="step-num">02</div>
      <h4>Report</h4>
      <p>Capture photos, pin location and describe the issue.</p>
    </div>

    <div class="step-item reveal active" style="transition-delay:300ms">
      <div class="step-num">03</div>
      <h4>Track</h4>
      <p>Real-time monitoring as the ticket moves to departments.</p>
    </div>

    <div class="step-item reveal active" style="transition-delay:400ms">
      <div class="step-num">04</div>
      <h4>Rate</h4>
      <p>Close the ticket and rate the quality of resolution.</p>
    </div>
  </div>
</section>

<!-- ===== STATISTICS ===== -->
<section class="section-stats">
  <div class="stats-inner">
    <div class="stats-left reveal active">
      <h2>Transparency in Numbers</h2>
      <p>We believe in data-driven governance. See how many issues are being solved in your community right now.</p>
      <div class="stats-grid">
        <div class="stat-item">
          <p class="stat-fixed stat-number" data-target="12500">12.5k+</p>
          <p>Total Complaints</p>
        </div>
        <div class="stat-item">
          <p class="stat-green stat-number" data-target="8200">8.2k+</p>
          <p>Issues Resolved</p>
        </div>
        <div class="stat-item">
          <p style="color:white" class="stat-number" data-target="45">45m</p>
          <p>Avg Response (m)</p>
        </div>
        <div class="stat-item">
          <p style="color:white" class="stat-number" data-target="94">94%</p>
          <p>Citizen Sat %</p>
        </div>
      </div>
    </div>

    <div class="reveal active" style="transition-delay:200ms">
      <div class="chart-card">
        <div class="chart-header">
          <h4>Resolution Efficiency</h4>
          <div class="chart-dots">
            <div class="chart-dot-green"></div>
            <div class="chart-dot-blue"></div>
          </div>
        </div>
        <div class="chart-bars">
          <div class="chart-bar bar-fixed-color" style="height:40%"></div>
          <div class="chart-bar bar-fixed-color" style="height:60%"></div>
          <div class="chart-bar bar-fixed-color" style="height:85%"></div>
          <div class="chart-bar bar-resolved-color" style="height:70%"></div>
          <div class="chart-bar bar-fixed-color" style="height:95%"></div>
          <div class="chart-bar bar-fixed-color" style="height:50%"></div>
          <div class="chart-bar bar-fixed-color" style="height:80%"></div>
        </div>
        <div class="chart-labels">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== TESTIMONIALS ===== -->
<section class="section-testimonials">
  <div class="testimonials-header reveal active">
    <span class="section-tag">Community Impact</span>
    <h2 class="section-title font-jakarta">- Citizen Feedbacks -</h2>
    <p>Real stories from citizens who made a difference using ComplaintBox.</p>
  </div>

  <div class="scroll-wrapper">
    <div class="scroll-track animate-scroll-x">
      <!-- Original -->
      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-green">AA</div>
          <div>
            <h4>Arif Ahmed</h4>
            <p>Bashundhara, Dhaka</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"I reported a major water leak in our block. Within 48 hours, WASA team arrived and fixed it. This platform really works and brings transparency!"</p>
      </div>

      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-red">SN</div>
          <div>
            <h4>Sara Nazneen</h4>
            <p>Halishahar, Chattogram</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"The illegal dumping near the school was a nightmare. ComplaintBox helped me escalate the issue, and now the area is completely clean and fenced."</p>
      </div>

      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-teal">RH</div>
          <div>
            <h4>Rakib Hasan</h4>
            <p>Amberkhana, Sylhet</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"The real-time tracking feature is amazing. I knew exactly which department was handling my street light complaint. Sylhet is becoming smarter!"</p>
      </div>

      <!-- Duplicated for seamless loop -->
      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-green">AA</div>
          <div>
            <h4>Arif Ahmed</h4>
            <p>Bashundhara, Dhaka</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"I reported a major water leak in our block. Within 48 hours, WASA team arrived and fixed it. This platform really works and brings transparency!"</p>
      </div>

      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-red">SN</div>
          <div>
            <h4>Sara Nazneen</h4>
            <p>Halishahar, Chattogram</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"The illegal dumping near the school was a nightmare. ComplaintBox helped me escalate the issue, and now the area is completely clean and fenced."</p>
      </div>

      <div class="testi-card">
        <div class="testi-author">
          <div class="testi-avatar avatar-teal">RH</div>
          <div>
            <h4>Rakib Hasan</h4>
            <p>Amberkhana, Sylhet</p>
          </div>
        </div>
        <div class="testi-stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testi-text">"The real-time tracking feature is amazing. I knew exactly which department was handling my street light complaint. Sylhet is becoming smarter!"</p>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA ===== -->
<section class="section-cta">
  <div class="cta-box reveal active">
    <div class="cta-circle-1"></div>
    <div class="cta-circle-2"></div>
    <div class="cta-content">
      <h2>Ready to Make Your City Better?</h2>
      <p>Join thousands of citizens today and start reporting. Your contribution matters for a cleaner, safer, and better Bangladesh.</p>
      <div class="cta-btns">
        <button class="btn-cta-primary">Register Now</button>
        <button class="btn-cta-outline">Learn More</button>
      </div>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand reveal active">
      <span class="footer-brand-name">ComplaintBox</span>
      <p>ComplaintBox is a civic engagement platform dedicated to bridge the gap between citizens and local government bodies in Bangladesh. Empowering the people for a better tomorrow.</p>
      <div class="footer-socials">
        <a href="#" class="social-btn"><span class="material-symbols-outlined">public</span></a>
        <a href="#" class="social-btn"><span class="material-symbols-outlined">alternate_email</span></a>
        <a href="#" class="social-btn"><span class="material-symbols-outlined">share</span></a>
      </div>
    </div>

    <div class="footer-col reveal active" style="transition-delay:100ms">
      <h4>Quick Links</h4>
      <ul class="footer-links">
        <li><a href="about.php">About Us</a></li>
        <li><a href="about.php">Terms of Service</a></li>
        <li><a href="about.php">Privacy Policy</a></li>
        <li><a href="contact.php">Contact Support</a></li>
      </ul>
    </div>

    <div class="footer-col reveal active" style="transition-delay:200ms">
      <h4>Departments</h4>
      <ul class="footer-links dept">
        <li><a href="contact.php">City Corporation</a></li>
        <li><a href="contact.php">WASA (Water)</a></li>
        <li><a href="contact.php">DESCO (Power)</a></li>
        <li><a href="contact.php">Traffic Police</a></li>
      </ul>
    </div>

    <div class="footer-col reveal active" style="transition-delay:300ms">
      <h4>Support Center</h4>
      <div class="footer-contact">
        <div class="contact-item">
          <span class="material-symbols-outlined">support_agent</span>
          <div>
            <p>Helpline</p>
            <p>16123</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="material-symbols-outlined">mail</span>
          <div>
            <p>Email Us</p>
            <p>support@complaintbox.gov.bd</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom reveal active">
    <p>© 2026 ComplaintBox - Empowering Bangladesh Through Transparency</p>
    <div class="footer-bottom-links">
      <a href="#">Sitemap</a>
      <a href="#">Cookies Policy</a>
      <a href="#">Accessibility</a>
    </div>
  </div>
</footer>

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/modal.js?v=1781267907"></script>

<script>
  // Session info injected by PHP for the hero CTA buttons
  window.IS_LOGGED_IN = <?php echo isset($_SESSION['user_id']) ? 'true' : 'false'; ?>;
  window.USER_ROLE    = <?php echo json_encode($_SESSION['role'] ?? null); ?>;

  // === Hero "Report an Issue" button ===
  // Logged-in citizen: jump to citizen dashboard with the New Complaint modal open.
  // Other logged-in roles: route to their own dashboard.
  // Anonymous: open the sign-in modal.
  window.handleHeroReportIssue = function () {
    if (!window.IS_LOGGED_IN) {
      if (window.AuthModal && window.AuthModal.open) window.AuthModal.open('signin');
      return;
    }
    if (window.USER_ROLE === 'citizen') {
      // Hash signals the citizen dashboard to auto-open the new-complaint modal.
      window.location.href = 'citizen-dashboard.php#new-complaint';
    } else if (window.USER_ROLE === 'admin') {
      window.location.href = 'admin-dashboard.php';
    } else if (window.USER_ROLE === 'staff') {
      window.location.href = 'staff-dashboard.php';
    }
  };

  // === Hero "Track Status" button ===
  // Logged-in citizen: jump to My Complaints section.
  // Anonymous: open sign-in modal.
  window.handleHeroTrackStatus = function () {
    if (!window.IS_LOGGED_IN) {
      if (window.AuthModal && window.AuthModal.open) window.AuthModal.open('signin');
      return;
    }
    if (window.USER_ROLE === 'citizen') {
      window.location.href = 'citizen-dashboard.php#my-complaints';
    } else if (window.USER_ROLE === 'admin') {
      window.location.href = 'admin-dashboard.php';
    } else if (window.USER_ROLE === 'staff') {
      window.location.href = 'staff-dashboard.php';
    }
  };

  // Intersection Observer for scroll reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.querySelector('.stat-number')) {
          startStatsCounter(entry.target);
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Stats Counter
  function startStatsCounter(container) {
    container.querySelectorAll('.stat-number').forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current < target) {
          if (target >= 1000) {
            stat.innerText = (current / 1000).toFixed(1) + 'k+';
          } else if (target === 94) {
            stat.innerText = Math.ceil(current) + '%';
          } else if (target === 45) {
            stat.innerText = Math.ceil(current) + 'm';
          }
          requestAnimationFrame(update);
        } else {
          if (target === 12500) stat.innerText = '12.5k+';
          else if (target === 8200) stat.innerText = '8.2k+';
          else if (target === 45) stat.innerText = '45m';
          else if (target === 94) stat.innerText = '94%';
        }
      };
      update();
    });
  }

  // Navbar scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  // ---- Live data from API: replace stat data-target values and testimonials ----
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.API) return;
    window.API.overviewStats().then(res => {
      const pub = (res.data && res.data.public) || {};
      // Map the 4 hero stat cards by their existing data-target values.
      const map = { '12500': pub.total_complaints, '8200': pub.resolved,
                    '45':    pub.citizens_count,   '94': pub.resolution_rate };
      document.querySelectorAll('.stat-number').forEach(el => {
        const cur = el.getAttribute('data-target');
        if (map[cur] !== undefined && map[cur] !== null) {
          el.setAttribute('data-target', Math.round(map[cur]));
          el.innerText = Math.round(map[cur]);
        }
      });
    }).catch(()=>{});

    window.API.getFeedback(true).then(res => {
      const items = (res.data && res.data.feedback) || [];
      if (!items.length) return;
      const track = document.querySelector('.scroll-track');
      if (!track) return;
      const COLORS = ['avatar-green','avatar-red','avatar-teal','avatar-blue','avatar-purple','avatar-orange'];
      const initials = n => (n || '?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      const card = (f, i) => `
        <div class="testi-card">
          <div class="testi-author">
            <div class="testi-avatar ${COLORS[i % COLORS.length]}">${initials(f.full_name)}</div>
            <div>
              <h4>${(f.full_name || 'Citizen').replace(/</g,'&lt;')}</h4>
              <p>${(f.topic || '').replace(/</g,'&lt;')}</p>
            </div>
          </div>
          <div class="testi-stars">
            ${Array.from({length: 5}, (_, k) => `<span class="material-symbols-outlined">${k < f.rating ? 'star' : 'star_border'}</span>`).join('')}
          </div>
          <p class="testi-text">"${(f.message || '').replace(/</g,'&lt;')}"</p>
        </div>`;
      // Replace with duplicated set for seamless loop
      track.innerHTML = items.map(card).join('') + items.map(card).join('');
    }).catch(()=>{});
  });
</script>

</body>
</html>