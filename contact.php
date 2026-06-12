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
<title>Contact & Department Directory — ComplaintBox</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/modal.css?v=1781267907">
<link rel="stylesheet" href="css/contact.css?v=1781267907">

</head>
<body>

<!-- ===== NAVBAR ===== -->
<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.php" class="nav-brand nav-text">
      ComplaintBox
    </a>
    <ul class="nav-links">
      <li><a href="index.php" class="nav-link nav-text">Home</a></li>
      <li><a href="recent-complaints.php" class="nav-link nav-text">Recent Complaints</a></li>
      <li><a href="about.php" class="nav-link nav-text">About</a></li>
      <li><a href="contact.php" class="nav-link nav-text active-link">Contacts</a></li>
    </ul>
    <div class="nav-right">
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
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Toggle menu">
        <span class="material-symbols-outlined hamburger-icon">menu</span>
      </button>
    </div>
  </div>
  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobile-menu">
    <ul class="mobile-nav-links">
      <li><a href="index.php" class="mobile-nav-link">Home</a></li>
      <li><a href="recent-complaints.php" class="mobile-nav-link">Recent Complaints</a></li>
      <li><a href="about.php" class="mobile-nav-link">About</a></li>
      <li><a href="contact.php" class="mobile-nav-link active">Contacts</a></li>
    </ul>
    <button class="btn-signin mobile-signin-btn">Sign In</button>
  </div>
</nav>

<!-- ===== PAGE HEADER ===== -->
<section class="page-header">
  <div class="page-header-bg"></div>
  <div class="page-header-overlay"></div>
  <div class="page-header-pattern"></div>
  <div class="page-header-content container">
    <div class="page-header-badge reveal active">
      <span class="material-symbols-outlined">contacts</span>
      Contact Us
    </div>
    <h1 class="page-header-title reveal active">Contact &amp; Department Directory</h1>
    <p class="page-header-sub reveal active">Find the right department for your issue or send us a message. We're here to help.</p>
    <div class="page-header-stats reveal active">
      <div class="header-stat">
        <span class="material-symbols-outlined">corporate_fare</span>
        <span><strong>8</strong> Departments</span>
      </div>
      <div class="header-stat">
        <span class="material-symbols-outlined">support_agent</span>
        <span>Helpline <strong>16123</strong></span>
      </div>
      <div class="header-stat">
        <span class="material-symbols-outlined">schedule</span>
        <span>24–48h Response</span>
      </div>
    </div>
  </div>
</section>

<!-- ===== DEPARTMENT CONTACTS ===== -->
<section class="section-departments">
  <div class="container">
    <div class="section-header-block reveal active">
      <span class="section-tag">Department Directory</span>
      <h2 class="section-title font-jakarta">Find the Right Department</h2>
      <p class="section-desc">Each department handles specific categories of civic complaints. Contact them directly or submit a complaint through the platform.</p>
    </div>

    <div class="departments-grid">

      <!-- Infrastructure -->
      <div class="dept-card reveal active" style="transition-delay:50ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-infra">
            <span class="material-symbols-outlined">construction</span>
          </div>
          <div class="dept-badge">Infrastructure</div>
        </div>
        <h3 class="dept-name">Roads &amp; Infrastructure Department</h3>
        <p class="dept-desc">Handles pothole repairs, road damage, bridge maintenance, footpath issues, and all civil infrastructure complaints.</p>
        <div class="dept-contacts">
          <a href="mailto:infrastructure@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>infrastructure@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000001" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000001</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Roads</span>
          <span class="dept-tag">Bridges</span>
          <span class="dept-tag">Footpaths</span>
        </div>
      </div>

      <!-- Water Service -->
      <div class="dept-card reveal active" style="transition-delay:100ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-water">
            <span class="material-symbols-outlined">water_drop</span>
          </div>
          <div class="dept-badge dept-badge-water">Water Service</div>
        </div>
        <h3 class="dept-name">WASA — Water Supply Authority</h3>
        <p class="dept-desc">Manages water supply complaints, pipe leaks, water contamination, supply disruptions, and drainage system issues.</p>
        <div class="dept-contacts">
          <a href="mailto:water@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>water@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000002" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000002</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Water Supply</span>
          <span class="dept-tag">Drainage</span>
          <span class="dept-tag">Leaks</span>
        </div>
      </div>

      <!-- Electricity -->
      <div class="dept-card reveal active" style="transition-delay:150ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-power">
            <span class="material-symbols-outlined">electric_bolt</span>
          </div>
          <div class="dept-badge dept-badge-power">Electricity</div>
        </div>
        <h3 class="dept-name">DESCO — Power Distribution</h3>
        <p class="dept-desc">Responsible for power outages, illegal connections, transformer issues, street lighting failures, and electricity billing complaints.</p>
        <div class="dept-contacts">
          <a href="mailto:electricity@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>electricity@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000003" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000003</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Power Outage</span>
          <span class="dept-tag">Street Lights</span>
          <span class="dept-tag">Billing</span>
        </div>
      </div>

      <!-- Waste Management -->
      <div class="dept-card reveal active" style="transition-delay:200ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-waste">
            <span class="material-symbols-outlined">delete_sweep</span>
          </div>
          <div class="dept-badge dept-badge-waste">Waste Management</div>
        </div>
        <h3 class="dept-name">City Corporation — Waste Division</h3>
        <p class="dept-desc">Handles illegal dumping, garbage collection delays, waste disposal complaints, and sanitation-related issues in urban areas.</p>
        <div class="dept-contacts">
          <a href="mailto:waste@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>waste@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000004" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000004</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Garbage</span>
          <span class="dept-tag">Sanitation</span>
          <span class="dept-tag">Dumping</span>
        </div>
      </div>

      <!-- Traffic & Transport -->
      <div class="dept-card reveal active" style="transition-delay:250ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-traffic">
            <span class="material-symbols-outlined">traffic</span>
          </div>
          <div class="dept-badge dept-badge-traffic">Traffic &amp; Transit</div>
        </div>
        <h3 class="dept-name">Traffic Police &amp; Transport Authority</h3>
        <p class="dept-desc">Addresses traffic signal failures, illegal parking, road congestion issues, public transport complaints, and traffic law violations.</p>
        <div class="dept-contacts">
          <a href="mailto:traffic@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>traffic@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000005" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000005</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Traffic Signals</span>
          <span class="dept-tag">Parking</span>
          <span class="dept-tag">Transport</span>
        </div>
      </div>

      <!-- Environment -->
      <div class="dept-card reveal active" style="transition-delay:300ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-env">
            <span class="material-symbols-outlined">eco</span>
          </div>
          <div class="dept-badge dept-badge-env">Environment</div>
        </div>
        <h3 class="dept-name">Department of Environment</h3>
        <p class="dept-desc">Manages air pollution, water contamination, noise complaints, deforestation, and environmental hazard reports across Bangladesh.</p>
        <div class="dept-contacts">
          <a href="mailto:environment@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>environment@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000006" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000006</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Air Quality</span>
          <span class="dept-tag">Noise</span>
          <span class="dept-tag">Pollution</span>
        </div>
      </div>

      <!-- Public Services -->
      <div class="dept-card reveal active" style="transition-delay:350ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-public">
            <span class="material-symbols-outlined">local_police</span>
          </div>
          <div class="dept-badge dept-badge-public">Public Services</div>
        </div>
        <h3 class="dept-name">Public Services &amp; Civil Administration</h3>
        <p class="dept-desc">Handles complaints related to government services, public health, parks, recreational facilities, and civil administration inefficiencies.</p>
        <div class="dept-contacts">
          <a href="mailto:publicservices@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>publicservices@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000007" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000007</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">Public Health</span>
          <span class="dept-tag">Parks</span>
          <span class="dept-tag">Admin</span>
        </div>
      </div>

      <!-- Others -->
      <div class="dept-card reveal active" style="transition-delay:400ms">
        <div class="dept-card-top">
          <div class="dept-icon-wrap dept-icon-others">
            <span class="material-symbols-outlined">more_horiz</span>
          </div>
          <div class="dept-badge dept-badge-others">General</div>
        </div>
        <h3 class="dept-name">General &amp; Miscellaneous Department</h3>
        <p class="dept-desc">Handles all complaints that don't fall under a specific category. Routes issues to appropriate departments after review and assessment.</p>
        <div class="dept-contacts">
          <a href="mailto:general@complaintbox.gov.bd" class="dept-contact-item">
            <span class="material-symbols-outlined">mail</span>
            <span>general@complaintbox.gov.bd</span>
          </a>
          <a href="tel:+8801700000008" class="dept-contact-item">
            <span class="material-symbols-outlined">phone</span>
            <span>+880 1700-000008</span>
          </a>
        </div>
        <div class="dept-footer">
          <span class="dept-tag">General</span>
          <span class="dept-tag">Miscellaneous</span>
          <span class="dept-tag">Other</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ===== SUPPORT INFO + FEEDBACK ===== -->
<section class="section-support">
  <div class="container">
    <div class="support-grid">

      <!-- Left: Support Info Card -->
      <div class="support-info-card reveal active">
        <div class="support-info-header">
          <div class="support-info-icon-wrap">
            <span class="material-symbols-outlined">support_agent</span>
          </div>
          <div>
            <h2 class="support-info-title">Get in Touch</h2>
            <p class="support-info-sub">We're available to help you navigate the platform.</p>
          </div>
        </div>

        <div class="support-contacts-list">
          <div class="support-contact-row">
            <div class="support-contact-icon">
              <span class="material-symbols-outlined">support_agent</span>
            </div>
            <div class="support-contact-body">
              <div class="support-contact-label">Helpline</div>
              <div class="support-contact-value">16123</div>
              <div class="support-contact-note">Available 24/7 for urgent civic issues</div>
            </div>
          </div>

          <div class="support-contact-row">
            <div class="support-contact-icon">
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div class="support-contact-body">
              <div class="support-contact-label">Support Email</div>
              <a href="mailto:support@complaintbox.gov.bd" class="support-contact-value support-contact-link">support@complaintbox.gov.bd</a>
              <div class="support-contact-note">For general inquiries and platform support</div>
            </div>
          </div>

          <div class="support-contact-row">
            <div class="support-contact-icon">
              <span class="material-symbols-outlined">schedule</span>
            </div>
            <div class="support-contact-body">
              <div class="support-contact-label">Response Time</div>
              <div class="support-contact-value">Within 24–48 hours</div>
              <div class="support-contact-note">On business days for email inquiries</div>
            </div>
          </div>

          <div class="support-contact-row">
            <div class="support-contact-icon">
              <span class="material-symbols-outlined">work</span>
            </div>
            <div class="support-contact-body">
              <div class="support-contact-label">Office Hours</div>
              <div class="support-contact-value">Sun–Thu, 9:00 AM – 5:00 PM</div>
              <div class="support-contact-note">Bangladesh Standard Time (BST, UTC+6)</div>
            </div>
          </div>
        </div>

        <div class="support-social-section">
          <div class="support-social-label">Connect With Us</div>
          <div class="support-socials">
            <a href="#" class="support-social-btn" title="Website">
              <span class="material-symbols-outlined">public</span>
            </a>
            <a href="mailto:support@complaintbox.gov.bd" class="support-social-btn" title="Email">
              <span class="material-symbols-outlined">alternate_email</span>
            </a>
            <a href="#" class="support-social-btn" title="Share">
              <span class="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        <!-- Quick Info Pills -->
        <div class="support-quick-facts">
          <div class="quick-fact">
            <span class="material-symbols-outlined">verified</span>
            Government Verified Platform
          </div>
          <div class="quick-fact">
            <span class="material-symbols-outlined">security</span>
            Data Secured & Encrypted
          </div>
          <div class="quick-fact">
            <span class="material-symbols-outlined">language</span>
            Serving All 64 Districts
          </div>
        </div>
      </div>

      <!-- Right: Feedback Form Card -->
      <div class="feedback-card reveal active" style="transition-delay:100ms">
        <div class="feedback-card-header">
          <div class="feedback-card-icon">
            <span class="material-symbols-outlined">rate_review</span>
          </div>
          <div>
            <h2 class="feedback-card-title">Send Feedback to Admin</h2>
            <p class="feedback-card-sub">Share your experience or suggestions to help us improve.</p>
          </div>
        </div>

        <!-- Login Required Notice -->
        <div class="feedback-login-notice" id="feedback-login-notice">
          <span class="material-symbols-outlined">lock</span>
          <p>You must be <button class="feedback-login-link" id="feedback-login-link">signed in</button> to send feedback.</p>
        </div>

        <!-- Feedback Form -->
        <form class="feedback-form" id="feedback-form" novalidate>

          <div class="form-field">
            <label class="form-label-custom" for="feedback-topic">Feedback Topic <span class="required-star">*</span></label>
            <div class="form-input-wrap-custom">
              <span class="material-symbols-outlined input-prefix-icon">label</span>
              <input type="text" id="feedback-topic" class="form-input-custom" placeholder="Your feedback topic" maxlength="200">
            </div>
            <div class="form-error-custom" id="feedback-topic-err"></div>
          </div>

          <!-- Star Rating -->
          <div class="form-field">
            <label class="form-label-custom">Your Rating <span class="required-star">*</span></label>
            <div class="star-rating-input" id="star-rating-input" role="group" aria-label="Star rating">
              <button type="button" class="star-btn" data-value="1" aria-label="1 star">
                <span class="material-symbols-outlined">star</span>
              </button>
              <button type="button" class="star-btn" data-value="2" aria-label="2 stars">
                <span class="material-symbols-outlined">star</span>
              </button>
              <button type="button" class="star-btn" data-value="3" aria-label="3 stars">
                <span class="material-symbols-outlined">star</span>
              </button>
              <button type="button" class="star-btn" data-value="4" aria-label="4 stars">
                <span class="material-symbols-outlined">star</span>
              </button>
              <button type="button" class="star-btn" data-value="5" aria-label="5 stars">
                <span class="material-symbols-outlined">star</span>
              </button>
              <span class="star-rating-label" id="star-rating-label">Click to rate</span>
            </div>
            <div class="form-error-custom" id="feedback-rating-err"></div>
          </div>

          <div class="form-field">
            <label class="form-label-custom" for="feedback-message">Your Message <span class="required-star">*</span></label>
            <textarea id="feedback-message" class="form-textarea-custom" placeholder="Share your experience, suggestions, or thoughts..." rows="5" maxlength="1000"></textarea>
            <div class="textarea-counter"><span id="msg-char-count">0</span>/1000</div>
            <div class="form-error-custom" id="feedback-message-err"></div>
          </div>

          <button type="submit" class="btn-feedback-submit" id="btn-feedback-submit">
            <div class="btn-spinner-custom" id="feedback-spinner"></div>
            <span class="material-symbols-outlined">send</span>
            <span id="btn-feedback-text">Send Feedback</span>
          </button>
        </form>

        <!-- Success State -->
        <div class="feedback-success" id="feedback-success">
          <div class="feedback-success-icon">
            <span class="material-symbols-outlined">check_circle</span>
          </div>
          <h3 class="feedback-success-title">Feedback Sent!</h3>
          <p class="feedback-success-msg">Thank you for your feedback. Our admin team will review it shortly.</p>
          <button class="btn-feedback-reset" id="btn-feedback-reset">
            <span class="material-symbols-outlined">refresh</span>
            Send Another
          </button>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ===== MAP SECTION ===== -->
<section class="section-map">
  <div class="container">
    <div class="map-section-inner">
      <div class="map-content reveal active">
        <span class="section-tag">Coverage</span>
        <h2 class="section-title font-jakarta">We Cover All of Bangladesh</h2>
        <p class="map-desc">ComplaintBox operates across all 64 districts of Bangladesh, ensuring every citizen has access to civic complaint resolution regardless of location.</p>

        <div class="map-stats-list">
          <div class="map-stat-item">
            <div class="map-stat-icon" style="background: rgba(59,130,246,0.1); color: #3B82F6;">
              <span class="material-symbols-outlined">construction</span>
            </div>
            <div class="map-stat-body">
              <div class="map-stat-number">3,200+</div>
              <div class="map-stat-label">Infrastructure Complaints</div>
            </div>
          </div>
          <div class="map-stat-item">
            <div class="map-stat-icon" style="background: rgba(6,182,212,0.1); color: #06B6D4;">
              <span class="material-symbols-outlined">water_drop</span>
            </div>
            <div class="map-stat-body">
              <div class="map-stat-number">1,840+</div>
              <div class="map-stat-label">Water Service Issues</div>
            </div>
          </div>
          <div class="map-stat-item">
            <div class="map-stat-icon" style="background: rgba(249,115,22,0.1); color: #F97316;">
              <span class="material-symbols-outlined">electric_bolt</span>
            </div>
            <div class="map-stat-body">
              <div class="map-stat-number">2,150+</div>
              <div class="map-stat-label">Electricity Complaints</div>
            </div>
          </div>
          <div class="map-stat-item">
            <div class="map-stat-icon" style="background: rgba(34,197,94,0.1); color: #22C55E;">
              <span class="material-symbols-outlined">delete_sweep</span>
            </div>
            <div class="map-stat-body">
              <div class="map-stat-number">1,590+</div>
              <div class="map-stat-label">Waste Management Issues</div>
            </div>
          </div>
        </div>

        <a href="recent-complaints.php" class="btn-view-all-complaints">
          <span class="material-symbols-outlined">list_alt</span>
          View All Complaints
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>

      <div class="map-visual reveal active" style="transition-delay:150ms">
        <div class="map-card">
          <div class="map-card-header">
            <div class="map-card-title">
              <span class="material-symbols-outlined">map</span>
              Bangladesh — Active Complaint Zones
            </div>
            <div class="map-card-live">
              <span class="live-dot"></span>
              Live
            </div>
          </div>
          <div class="map-embed-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d90.3563!3d23.6850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sBangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Bangladesh Complaint Map">
            </iframe>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== FAQ SECTION ===== -->
<section class="section-faq">
  <div class="container">
    <div class="faq-header reveal active">
      <span class="section-tag">Help Center</span>
      <h2 class="section-title font-jakarta">Frequently Asked Questions</h2>
      <p class="faq-desc">Everything you need to know about ComplaintBox and how to use it effectively.</p>
    </div>

    <div class="faq-grid">
      <div class="faq-list">

        <div class="faq-item reveal active" style="transition-delay:50ms">
          <button class="faq-question" aria-expanded="false">
            <span>How do I submit a complaint on ComplaintBox?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>To submit a complaint, you need to first create an account and verify your NID. Once your profile is verified by an admin, you can click "Report an Issue" from your Citizen Dashboard. Fill in the complaint details, attach photos, pin the location on the map, and submit. Your complaint will be reviewed by an admin before going live.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:100ms">
          <button class="faq-question" aria-expanded="false">
            <span>How long does it take for a complaint to be resolved?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>Resolution time varies by complaint type and priority. Critical issues are typically addressed within 24–72 hours. High priority complaints are resolved within 3–7 days. Medium and low priority issues may take 7–30 days depending on department workload and resources. You can track real-time status updates in your dashboard.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:150ms">
          <button class="faq-question" aria-expanded="false">
            <span>Why is NID verification required to report a complaint?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>NID verification ensures the authenticity of complainants and prevents fake or duplicate complaints. This helps maintain the integrity of the platform and ensures government departments can respond to genuine civic issues. Your NID information is securely stored and never shared publicly.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:200ms">
          <button class="faq-question" aria-expanded="false">
            <span>Can I track the status of my complaint in real time?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>Yes! Your Citizen Dashboard shows a real-time progress tracker for each complaint. The tracker shows 6 stages: Submitted → Pending → In Review → Assigned → In Progress → Resolved. You'll receive notifications whenever your complaint status changes, and department staff can add notes visible to you.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:250ms">
          <button class="faq-question" aria-expanded="false">
            <span>What happens if my complaint is rejected?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>If your complaint is rejected, you'll receive a notification with the specific reason for rejection. Common reasons include duplicate complaints, insufficient information, or complaints outside our jurisdiction. If rejected as a duplicate, you'll see a reference to the similar existing complaint. You can edit and resubmit if the issue persists.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:300ms">
          <button class="faq-question" aria-expanded="false">
            <span>How do I upvote a complaint and what does it do?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>Upvoting a complaint shows community support for that issue. Complaints with more upvotes are treated with higher priority and are more likely to be featured on the platform. You need to be logged in to upvote. You can toggle your upvote at any time, and the count updates immediately.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:350ms">
          <button class="faq-question" aria-expanded="false">
            <span>Is my personal information visible to other users?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>No. Your personal information (name, phone, NID, address) is never shown publicly. Public complaint pages only show the complaint content, location, and status. Department staff can only see complaint data and location — they cannot access your personal details. Only administrators have access to user profiles for verification purposes.</p>
          </div>
        </div>

        <div class="faq-item reveal active" style="transition-delay:400ms">
          <button class="faq-question" aria-expanded="false">
            <span>How can I contact a specific department directly?</span>
            <span class="material-symbols-outlined faq-chevron">expand_more</span>
          </button>
          <div class="faq-answer">
            <p>You can find all department contact information on this Contact page. Each department has a dedicated email and phone number. For the fastest response, we recommend submitting a complaint through the platform as it automatically routes your issue to the correct department and creates an accountable record.</p>
          </div>
        </div>

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
        <button class="btn-cta-primary" id="cta-register-btn">Register Now</button>
        <a href="about.php" class="btn-cta-outline">Learn More</a>
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
        <a href="mailto:support@complaintbox.gov.bd" class="social-btn"><span class="material-symbols-outlined">alternate_email</span></a>
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

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/contact.js?v=1781267907"></script>
<script src="js/modal.js?v=1781267907"></script>
</body>
</html>