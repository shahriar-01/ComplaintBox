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
<title>About — ComplaintBox</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/modal.css?v=1781267907">
<link rel="stylesheet" href="css/about.css?v=1781267907">


</head>
<body>

<!-- ===== NAVBAR ===== -->
<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.php" class="nav-brand-wrap" style="text-decoration:none">
      <span class="nav-brand nav-text">ComplaintBox</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.php" class="nav-link nav-text">Home</a></li>
      <li><a href="recent-complaints.php" class="nav-link nav-text">Recent Complaints</a></li>
      <li><a href="about.php" class="nav-link active-link nav-text">About</a></li>
      <li><a href="contact.php" class="nav-link nav-text">Contacts</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:12px">
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
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="nav-mobile-menu" id="nav-mobile-menu">
  <a href="index.php" class="nav-mobile-link">Home</a>
  <a href="recent-complaints.php" class="nav-mobile-link">Recent Complaints</a>
  <a href="about.php" class="nav-mobile-link active-link">About</a>
  <a href="contact.php" class="nav-mobile-link">Contacts</a>
  <button class="nav-mobile-signin" onclick="closeMobileMenu(); window.AuthModal && window.AuthModal.open('signin')">
    <span class="material-symbols-outlined" style="font-size:18px">login</span>
    Sign In
  </button>
</div>

<!-- ===== HERO SECTION ===== -->
<section class="about-hero">
  <div class="hero-geo-pattern"></div>
  <div class="hero-circle-1"></div>
  <div class="hero-circle-2"></div>
  <div class="hero-circle-3"></div>
  <div class="about-hero-content reveal active">
    <div class="hero-eyebrow">
      <span class="material-symbols-outlined">info</span>
      <span>About ComplaintBox</span>
    </div>
    <h1>Bridging the Gap Between <span class="gradient-text">Citizens & Government</span></h1>
    <p>Learn how we're transforming civic issue management across Bangladesh — making it faster, fairer, and fully transparent for every citizen.</p>
    <div class="hero-quick-stats">
      <div class="hero-stat-pill">
        <span class="material-symbols-outlined">location_city</span>
        <div>
          <div class="hero-stat-pill-num">64</div>
          <div class="hero-stat-pill-label">Districts Covered</div>
        </div>
      </div>
      <div class="hero-stat-pill">
        <span class="material-symbols-outlined">corporate_fare</span>
        <div>
          <div class="hero-stat-pill-num">8</div>
          <div class="hero-stat-pill-label">Departments</div>
        </div>
      </div>
      <div class="hero-stat-pill">
        <span class="material-symbols-outlined">check_circle</span>
        <div>
          <div class="hero-stat-pill-num about-total-count">24+</div>
          <div class="hero-stat-pill-label">Issues Addressed</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== ABOUT THE PLATFORM ===== -->
<section class="about-platform">
  <div class="about-platform-inner">
    <!-- Left: Text -->
    <div class="about-platform-text reveal active">
      <span class="section-tag">Our Mission</span>
      <h2 class="section-title">Empowering Citizens Through Transparency</h2>
      <p>ComplaintBox is Bangladesh's first centralized civic complaint management system — designed to give every citizen a direct, transparent channel to report, track, and resolve public infrastructure and service issues across all 64 districts.</p>
      <p>In a country where civic issues often go unaddressed due to bureaucratic bottlenecks, ComplaintBox connects citizens with the right government departments in real time. From broken roads in Dhaka to water shortages in Rajshahi, every complaint is logged, assigned, and tracked with full accountability.</p>
      <p>We believe that when citizens have a voice and governments are held accountable, communities thrive. Our platform leverages modern technology to create a smarter, fairer, and more responsive Bangladesh — one complaint at a time.</p>
    </div>
    <!-- Right: Stat Card -->
    <div class="reveal" style="transition-delay:150ms">
      <div class="platform-stat-card">
        <div class="stat-card-header">
          <span class="material-symbols-outlined">monitoring</span>
          <div>
            <h4>Platform Overview</h4>
            <p>Live data across Bangladesh</p>
          </div>
        </div>
        <div class="stat-card-body">
          <div class="stat-items-grid">
            <div class="stat-item-box">
              <div class="stat-icon"><span class="material-symbols-outlined">list_alt</span></div>
              <span class="stat-num" data-target="24" id="about-stat-1">0</span>
              <span class="stat-label">Total Complaints</span>
            </div>
            <div class="stat-item-box">
              <div class="stat-icon"><span class="material-symbols-outlined">check_circle</span></div>
              <span class="stat-num green" data-target="8" id="about-stat-2">0</span>
              <span class="stat-label">Resolved</span>
            </div>
            <div class="stat-item-box">
              <div class="stat-icon"><span class="material-symbols-outlined">location_city</span></div>
              <span class="stat-num blue" data-target="64" id="about-stat-3">0</span>
              <span class="stat-label">Districts</span>
            </div>
            <div class="stat-item-box">
              <div class="stat-icon"><span class="material-symbols-outlined">corporate_fare</span></div>
              <span class="stat-num" data-target="8" id="about-stat-4">0</span>
              <span class="stat-label">Departments</span>
            </div>
          </div>
          <div class="stat-card-progress">
            <div class="stat-card-progress-label">
              <span>Resolution Rate</span>
              <span>65.6%</span>
            </div>
            <div class="stat-card-bar-wrap">
              <div class="stat-card-bar-fill" id="resolution-bar" style="width:0"></div>
            </div>
            <div class="stat-card-progress-label">
              <span>Citizen Satisfaction</span>
              <span>94%</span>
            </div>
            <div class="stat-card-bar-wrap">
              <div class="stat-card-bar-fill" id="satisfaction-bar" style="width:0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== HOW IT WORKS (detailed) ===== -->
<section class="how-it-works" id="how-it-works">
  <div class="how-it-works-inner">
    <div class="hiw-header reveal">
      <span class="section-tag">The Process</span>
      <h2 class="section-title">How ComplaintBox Works</h2>
      <p>A simple, transparent 4-step process that ensures your civic issues are heard, assigned, and resolved efficiently.</p>
    </div>
    <div class="hiw-grid">
      <!-- Step 1 -->
      <div class="hiw-card reveal" style="transition-delay:100ms">
        <span class="hiw-step-num">01</span>
        <div class="hiw-card-icon-row">
          <div class="hiw-card-icon">
            <span class="material-symbols-outlined">person_add</span>
          </div>
          <h3>Register & Verify</h3>
        </div>
        <p>Create your citizen account using your National ID card and phone number. Our verification process ensures accountability and prevents misuse of the platform.</p>
        <ul>
          <li><span class="material-symbols-outlined">check_small</span>NID-based identity verification</li>
          <li><span class="material-symbols-outlined">check_small</span>Select your district, ashon, and area</li>
          <li><span class="material-symbols-outlined">check_small</span>Profile reviewed and approved by admin</li>
          <li><span class="material-symbols-outlined">check_small</span>Unique Citizen ID (CB-USR-XXXXXX) issued</li>
        </ul>
      </div>
      <!-- Step 2 -->
      <div class="hiw-card reveal" style="transition-delay:200ms">
        <span class="hiw-step-num">02</span>
        <div class="hiw-card-icon-row">
          <div class="hiw-card-icon">
            <span class="material-symbols-outlined">campaign</span>
          </div>
          <h3>Report Your Issue</h3>
        </div>
        <p>Submit your civic complaint with a detailed description, photos, videos, and precise GPS location. Categorize it under the relevant department for faster routing.</p>
        <ul>
          <li><span class="material-symbols-outlined">check_small</span>Upload photos and videos as evidence</li>
          <li><span class="material-symbols-outlined">check_small</span>Pin exact location on interactive map</li>
          <li><span class="material-symbols-outlined">check_small</span>Set priority: Low, Medium, High, or Critical</li>
          <li><span class="material-symbols-outlined">check_small</span>Unique Complaint ID (CB-YYYY-NNNNN) generated</li>
        </ul>
      </div>
      <!-- Step 3 -->
      <div class="hiw-card reveal" style="transition-delay:300ms">
        <span class="hiw-step-num">03</span>
        <div class="hiw-card-icon-row">
          <div class="hiw-card-icon">
            <span class="material-symbols-outlined">location_searching</span>
          </div>
          <h3>Track in Real Time</h3>
        </div>
        <p>Monitor your complaint's progress through every stage — from admin review to department assignment and active resolution. Never be left in the dark again.</p>
        <ul>
          <li><span class="material-symbols-outlined">check_small</span>7-stage progress timeline with timestamps</li>
          <li><span class="material-symbols-outlined">check_small</span>Push notifications on every status change</li>
          <li><span class="material-symbols-outlined">check_small</span>View department notes and updates</li>
          <li><span class="material-symbols-outlined">check_small</span>Upvote and comment to amplify your report</li>
        </ul>
      </div>
      <!-- Step 4 -->
      <div class="hiw-card reveal" style="transition-delay:400ms">
        <span class="hiw-step-num">04</span>
        <div class="hiw-card-icon-row">
          <div class="hiw-card-icon">
            <span class="material-symbols-outlined">star</span>
          </div>
          <h3>Rate & Provide Feedback</h3>
        </div>
        <p>Once your complaint is resolved with photographic proof, rate the quality of resolution. Your feedback drives continuous improvement across all departments.</p>
        <ul>
          <li><span class="material-symbols-outlined">check_small</span>Department uploads proof-of-resolution images</li>
          <li><span class="material-symbols-outlined">check_small</span>Rate resolution quality from 1–5 stars</li>
          <li><span class="material-symbols-outlined">check_small</span>Send detailed feedback to admin</li>
          <li><span class="material-symbols-outlined">check_small</span>Featured feedback appears on homepage</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ===== INTERACTIVE MAP SECTION ===== -->
<section class="map-section">
  <div class="map-section-inner">
    <!-- Left: Content -->
    <div class="map-left reveal">
      <span class="section-tag">Coverage</span>
      <h2>Complaints Across Bangladesh</h2>
      <p>ComplaintBox is active in all 8 divisions and 64 districts of Bangladesh. Here's a real-time snapshot of complaint categories across the country.</p>

      <div class="category-stats-list" id="category-stats-list">
        <!-- Populated by JS -->
      </div>

      <a href="recent-complaints.php" class="btn-view-all-complaints">
        <span class="material-symbols-outlined">list_alt</span>
        View All Complaints
      </a>
    </div>

    <!-- Right: Map -->
    <div class="map-right reveal" style="transition-delay:150ms">
      <div class="map-container">
        <div class="map-header">
          <div class="map-header-left">
            <span class="material-symbols-outlined">map</span>
            <span>Bangladesh — Live Complaint Map</span>
          </div>
          <div class="map-legend">
            <div class="map-legend-item">
              <div class="map-legend-dot" style="background:var(--priority-critical)"></div>
              Critical
            </div>
            <div class="map-legend-item">
              <div class="map-legend-dot" style="background:var(--priority-high)"></div>
              High
            </div>
            <div class="map-legend-item">
              <div class="map-legend-dot" style="background:var(--priority-medium)"></div>
              Medium
            </div>
          </div>
        </div>
        <div class="bd-map-svg-wrap" id="bd-map-wrap">
          <div class="bd-map-bg"></div>
          <!-- Simplified Bangladesh outline SVG -->
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2941357.1870008493!2d90.51273750270782!3d23.73223126292361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1778951162766!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          
          <!-- <svg class="bd-svg" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60,20 L80,10 L110,15 L140,25 L160,45 L170,70 L165,100 L155,125 L165,145 L160,170 L145,190 L135,210 L120,230 L100,250 L85,260 L70,255 L55,240 L45,220 L35,200 L30,175 L35,150 L25,130 L20,105 L30,80 L40,55 L55,35 Z"
              fill="rgba(0,106,78,0.08)" stroke="rgba(0,106,78,0.3)" stroke-width="2"/>
          </svg> -->
          <!-- Markers layer -->
          <div class="map-markers-layer" id="map-markers-layer">
            <!-- Populated by JS -->
          </div>
          <!-- Tooltip -->
          <div class="map-tooltip" id="map-tooltip">
            <div class="tooltip-city-name" id="tt-city">
              <span class="material-symbols-outlined">location_on</span>
              <span id="tt-city-name">Dhaka</span>
            </div>
            <div class="tooltip-rows" id="tt-rows"></div>
            <div class="tooltip-total-row">
              <span>Total Complaints</span>
              <span id="tt-total">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== FAQ SECTION ===== -->
<section class="faq-section" id="faq">
  <div class="faq-inner">
    <div class="faq-header reveal">
      <span class="section-tag">FAQ</span>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p>Everything you need to know about using ComplaintBox as a citizen, department staff, or admin.</p>
    </div>
    <div class="faq-list" id="faq-list">
      <!-- Populated by JS -->
    </div>
  </div>
</section>

<!-- ===== CORE VALUES ===== -->
<section class="core-values" id="core-values">
  <div class="core-values-inner">
    <div class="core-values-header reveal">
      <span class="section-tag">Why ComplaintBox</span>
      <h2 class="section-title">Built on Core Values</h2>
      <p>Three principles guide everything we build — from how complaints are submitted to how resolutions are verified.</p>
    </div>
    <div class="core-values-grid">
      <!-- Transparency -->
      <div class="core-value-card reveal" style="transition-delay:100ms">
        <div class="cv-icon-wrap">
          <span class="material-symbols-outlined">shield</span>
        </div>
        <h3>Transparency</h3>
        <p>Every complaint is logged with a unique ID and tracked through a public, auditable status pipeline. Citizens can see exactly where their complaint stands at every moment.</p>
        <p>We believe that open governance is the foundation of public trust. Our platform makes it impossible for complaints to simply disappear without accountability.</p>
        <ul class="cv-features">
          <li><span class="material-symbols-outlined">check_circle</span>Public complaint tracking with unique IDs</li>
          <li><span class="material-symbols-outlined">check_circle</span>Full status history with timestamps</li>
          <li><span class="material-symbols-outlined">check_circle</span>Department assignment visible to citizens</li>
          <li><span class="material-symbols-outlined">check_circle</span>Proof-of-resolution photos required</li>
        </ul>
      </div>
      <!-- Accountability -->
      <div class="core-value-card reveal" style="transition-delay:200ms">
        <div class="cv-icon-wrap">
          <span class="material-symbols-outlined">verified</span>
        </div>
        <h3>Accountability</h3>
        <p>Government departments are directly responsible for assigned complaints. Our admin dashboard tracks department performance metrics including resolution rates and response times.</p>
        <p>Department staff cannot close a complaint as resolved without uploading photographic proof — ensuring that resolutions are genuine and verifiable.</p>
        <ul class="cv-features">
          <li><span class="material-symbols-outlined">check_circle</span>NID-verified citizen accounts</li>
          <li><span class="material-symbols-outlined">check_circle</span>Department performance dashboards</li>
          <li><span class="material-symbols-outlined">check_circle</span>Mandatory proof-of-resolution upload</li>
          <li><span class="material-symbols-outlined">check_circle</span>Admin oversight of all operations</li>
        </ul>
      </div>
      <!-- Community -->
      <div class="core-value-card reveal" style="transition-delay:300ms">
        <div class="cv-icon-wrap">
          <span class="material-symbols-outlined">groups</span>
        </div>
        <h3>Community</h3>
        <p>Civic change happens when communities come together. Citizens can upvote complaints they care about, pushing the most impactful issues to the forefront and ensuring collective voices are heard.</p>
        <p>The more citizens engage — reporting, upvoting, and commenting — the stronger the platform becomes as a tool for real change across Bangladesh.</p>
        <ul class="cv-features">
          <li><span class="material-symbols-outlined">check_circle</span>Community upvoting to amplify issues</li>
          <li><span class="material-symbols-outlined">check_circle</span>Public comments and discussions</li>
          <li><span class="material-symbols-outlined">check_circle</span>Trending complaints surfaced automatically</li>
          <li><span class="material-symbols-outlined">check_circle</span>Citizen feedback loop with admins</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ===== MISSION STRIP ===== -->
<section class="mission-strip">
  <div class="mission-strip-inner">
    <div class="mission-card reveal" style="transition-delay:100ms">
      <div class="mission-icon-circle">
        <span class="material-symbols-outlined">flag</span>
      </div>
      <h3>Our Mission</h3>
      <p>To create a Bangladesh where every civic issue is heard, every department is accountable, and every citizen is empowered to drive meaningful change in their community.</p>
    </div>
    <div class="mission-card reveal" style="transition-delay:200ms">
      <div class="mission-icon-circle">
        <span class="material-symbols-outlined">visibility</span>
      </div>
      <h3>Our Vision</h3>
      <p>A future where government responsiveness is measured in hours, not months — where data-driven governance transforms cities, towns, and villages across the nation.</p>
    </div>
    <div class="mission-card reveal" style="transition-delay:300ms">
      <div class="mission-icon-circle">
        <span class="material-symbols-outlined">emoji_objects</span>
      </div>
      <h3>Our Approach</h3>
      <p>We combine transparent technology, NID-verified identity, department accountability metrics, and community engagement to bridge the gap between citizens and governance.</p>
    </div>
  </div>
</section>

<!-- ===== CTA SECTION ===== -->
<section class="section-cta">
  <div class="cta-box reveal active">
    <div class="cta-circle-1"></div>
    <div class="cta-circle-2"></div>
    <div class="cta-content">
      <h2>Ready to Make Bangladesh Better?</h2>
      <p>Join thousands of citizens across Bangladesh who are already reporting, tracking, and resolving civic issues through ComplaintBox.</p>
      <div class="cta-btns">
        <button class="btn-cta-primary" id="cta-report-btn">
          <span class="material-symbols-outlined" style="font-size:20px">campaign</span>
          Report an Issue
        </button>
        <button class="btn-cta-outline" id="cta-faq-btn">
          <span class="material-symbols-outlined" style="font-size:20px">help</span>
          View FAQ
        </button>
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
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="contact.php">Contact Support</a></li>
      </ul>
    </div>
    <div class="footer-col reveal active" style="transition-delay:200ms">
      <h4>Departments</h4>
      <ul class="footer-links dept">
        <li><a href="#">City Corporation</a></li>
        <li><a href="#">WASA (Water)</a></li>
        <li><a href="#">DESCO (Power)</a></li>
        <li><a href="#">Traffic Police</a></li>
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
    <p>© 2026 ComplaintBox — Empowering Bangladesh Through Transparency</p>
    <div class="footer-bottom-links">
      <a href="#">Sitemap</a>
      <a href="#">Cookies Policy</a>
      <a href="#">Accessibility</a>
    </div>
  </div>
</footer>

<!-- Toast Container -->
<div id="toast-container" role="status" aria-live="polite"></div>

<!-- ===== SCRIPTS ===== -->
<script src="js/api-client.js?v=1781267907"></script>
<script src="js/about.js?v=1781267907"></script>
<script src="js/modal.js?v=1781267907"></script>

</body>
</html>