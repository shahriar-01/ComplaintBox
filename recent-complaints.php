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
<title>Recent Complaints — ComplaintBox</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/modal.css?v=1781267907">
<link rel="stylesheet" href="css/recent-complaint.css?v=1781267907">
</head>
<body>

<!-- ===== NAVBAR ===== -->
<nav id="main-nav">
  <div class="nav-inner">
    <a class="nav-brand" href="index.php">
      ComplaintBox
    </a>
    <ul class="nav-links">
      <li><a href="index.php" class="nav-link">Home</a></li>
      <li><a href="recent-complaints.php" class="nav-link active-link">Recent Complaints</a></li>
      <li><a href="about.php" class="nav-link">About</a></li>
      <li><a href="contact.php" class="nav-link">Contacts</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:12px;">
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
      <button class="nav-hamburger" id="hamburger-btn" aria-label="Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobile-menu">
  <a href="index.php" class="mobile-menu-link">Home</a>
  <a href="recent-complaints.php" class="mobile-menu-link active">Recent Complaints</a>
  <a href="about.php" class="mobile-menu-link">About</a>
  <a href="contact.php" class="mobile-menu-link">Contacts</a>
  <div class="mobile-menu-signin">
    <button class="mobile-btn-signin" id="mobile-signin-btn">Sign In</button>
  </div>
</div>

<!-- ===== PAGE HERO ===== -->
<section class="page-hero">
  <div class="hero-grid-pattern"></div>
  <div class="hero-glow hero-glow-1"></div>
  <div class="hero-glow hero-glow-2"></div>


  </div>
  <div class="page-hero-content reveal active">
    <div class="page-hero-tag">
      <span class="material-symbols-outlined">rss_feed</span>
      Live Feed
    </div>
    <h1 class="page-hero-title">Recent <span>Complaints</span></h1>
    <p class="page-hero-subtitle">Browse and engage with civic issues reported by citizens across Bangladesh. Filter, search and upvote the issues that matter.</p>
    
    <div class="hero-stats-row">
      
      <div class="hero-stat">
       <span class="material-symbols-outlined">assignment</span>
        <span class="hero-stat-num" id="hero-total">24</span>
        <span class="hero-stat-label">Total Issues</span>
      </div>
      
      <div class="hero-stat">
        <span class="material-symbols-outlined">location_on</span>
        <span class="hero-stat-num">64</span>
        <span class="hero-stat-label">Districts</span>
      </div>
      
      <div class="hero-stat">
        <span class="material-symbols-outlined">check_circle</span>
        <span class="hero-stat-num">8</span>
        <span class="hero-stat-label">Resolved Today</span>
      </div>
    
    
    </div>
  </div>


  <!-- Live Ticker -->
  <div class="live-ticker">
    <div class="ticker-inner">
      <div class="ticker-label">
        <span class="material-symbols-outlined">fiber_manual_record</span>
        LIVE
      </div>
      <div class="ticker-track-wrap">
        <div class="ticker-track" id="ticker-track">
          <div class="ticker-item"><span class="ticker-badge ticker-new">NEW</span> CB-2025-00089 — Broken road near Gulshan-2 · Dhaka</div>
          <div class="ticker-item"><span class="ticker-badge ticker-resolved">RESOLVED</span> CB-2025-00042 — Illegal waste dumping · Dhanmondi resolved</div>
          <div class="ticker-item"><span class="ticker-badge ticker-urgent">URGENT</span> CB-2025-00091 — Water supply cut · Agrabad, Chattogram</div>
          <div class="ticker-item"><span class="ticker-badge ticker-new">NEW</span> CB-2025-00093 — Power outage · Amberkhana, Sylhet</div>
          <div class="ticker-item"><span class="ticker-badge ticker-pending">PENDING</span> CB-2025-00078 — Open sewer manhole · Zindabazar</div>
          <div class="ticker-item"><span class="ticker-badge ticker-resolved">RESOLVED</span> CB-2025-00055 — Traffic signal malfunction fixed</div>
         
          <div class="ticker-item"><span class="ticker-badge ticker-new">NEW</span> CB-2025-00089 — Broken road near Gulshan-2 · Dhaka</div>
          <div class="ticker-item"><span class="ticker-badge ticker-resolved">RESOLVED</span> CB-2025-00042 — Illegal waste dumping · Dhanmondi resolved</div>
          <div class="ticker-item"><span class="ticker-badge ticker-urgent">URGENT</span> CB-2025-00091 — Water supply cut · Agrabad, Chattogram</div>
          <div class="ticker-item"><span class="ticker-badge ticker-new">NEW</span> CB-2025-00093 — Power outage · Amberkhana, Sylhet</div>
          <div class="ticker-item"><span class="ticker-badge ticker-pending">PENDING</span> CB-2025-00078 — Open sewer manhole · Zindabazar</div>
          <div class="ticker-item"><span class="ticker-badge ticker-resolved">RESOLVED</span> CB-2025-00055 — Traffic signal malfunction fixed</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== MAIN PAGE BODY ===== -->
<div class="page-body">

  <!-- ===== FILTER SIDEBAR ===== -->
  <aside class="filter-sidebar" id="filter-sidebar">
    <div class="filter-header">
      <div class="filter-title">
        <span class="material-symbols-outlined">filter_list</span>
        Filters
      </div>
      <button class="btn-reset-all" id="btn-reset-all">Reset All</button>
    </div>
    <div class="filter-body" id="filter-body">

      <!-- Search -->
      <div class="filter-group">
        <div class="filter-group-label">Search</div>
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined filter-search-icon">search</span>
          <input type="text" class="filter-search" id="filter-search" placeholder="Search by title, ID, keyword...">
        </div>
      </div>

      <!-- District -->
      <div class="filter-group">
        <div class="filter-group-label">District</div>
        <select class="filter-select" id="filter-district">
          <option value="">All Districts</option>
        </select>
      </div>

      <!-- Ashon -->
      <div class="filter-group">
        <div class="filter-group-label">Ashon Number</div>
        <select class="filter-select" id="filter-ashon" disabled>
          <option value="">Select District First</option>
        </select>
      </div>

      <!-- Area -->
      <div class="filter-group">
        <div class="filter-group-label">Areas</div>
        <div class="area-checkboxes" id="area-checkboxes">
          <div style="font-size:12px;color:var(--outline);padding:4px 0;">Select Ashon No. first</div>
        </div>
      </div>

      <!-- Category -->
      <div class="filter-group">
        <div class="filter-group-label">Category</div>
        <div class="category-grid">
          <button class="cat-toggle" data-cat="infrastructure" title="Infrastructure">
            <span class="material-symbols-outlined">construction</span>
            Infrastructure
          </button>
          <button class="cat-toggle" data-cat="water_service" title="Water Service">
            <span class="material-symbols-outlined">water_drop</span>
            Water
          </button>
          <button class="cat-toggle" data-cat="electricity" title="Electricity">
            <span class="material-symbols-outlined">electric_bolt</span>
            Electricity
          </button>
          <button class="cat-toggle" data-cat="waste_management" title="Waste Management">
            <span class="material-symbols-outlined">delete_sweep</span>
            Waste
          </button>
          <button class="cat-toggle" data-cat="traffic_transport" title="Traffic & Transit">
            <span class="material-symbols-outlined">traffic</span>
            Traffic
          </button>
          <button class="cat-toggle" data-cat="environment" title="Environment">
            <span class="material-symbols-outlined">eco</span>
            Environment
          </button>
          <button class="cat-toggle" data-cat="public_services" title="Public Services">
            <span class="material-symbols-outlined">local_police</span>
            Public
          </button>
          <button class="cat-toggle" data-cat="others" title="Others">
            <span class="material-symbols-outlined">more_horiz</span>
            Others
          </button>
        </div>
      </div>

      <!-- Status -->
      <div class="filter-group">
        <div class="filter-group-label">Status</div>
        <div class="status-pills" id="status-pills">
          <button class="status-pill-btn active" data-status="">
            <span class="status-pill-dot" style="background:var(--outline)"></span>
            All Statuses
          </button>
          <button class="status-pill-btn" data-status="submitted">
            <span class="status-pill-dot" style="background:var(--status-submitted)"></span>
            Submitted
          </button>
          <button class="status-pill-btn" data-status="pending">
            <span class="status-pill-dot" style="background:var(--status-pending)"></span>
            Pending
          </button>
          <button class="status-pill-btn" data-status="in_review">
            <span class="status-pill-dot" style="background:var(--status-in-review)"></span>
            In Review
          </button>
          <button class="status-pill-btn" data-status="assigned">
            <span class="status-pill-dot" style="background:var(--status-assigned)"></span>
            Assigned
          </button>
          <button class="status-pill-btn" data-status="in_progress">
            <span class="status-pill-dot" style="background:var(--status-in-progress)"></span>
            In Progress
          </button>
          <button class="status-pill-btn" data-status="resolved">
            <span class="status-pill-dot" style="background:var(--status-resolved)"></span>
            Resolved
          </button>
        </div>
      </div>

      <!-- Month / Year -->
      <div class="filter-group">
        <div class="filter-group-label">Date Range</div>
        <div class="date-filter-row">
          <select class="filter-select" id="filter-month" ">
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select class="filter-select" id="filter-year">
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <button class="btn-reset-full" id="btn-reset-full">
        Reset All Filters
      </button>
    </div>
  </aside>

  <!-- ===== COMPLAINTS PANEL ===== -->
  <main class="complaints-panel">

    <!-- Mobile Filter Bar -->
    <div class="mobile-filter-bar">
      <button class="mobile-filter-btn" id="btn-open-filters">
        <span class="material-symbols-outlined">tune</span>
        Filters
      </button>
      <button class="mobile-filter-btn" data-cat="infrastructure">
        <span class="material-symbols-outlined">construction</span>
        Infrastructure
      </button>
      <button class="mobile-filter-btn" data-cat="water_service">
        <span class="material-symbols-outlined">water_drop</span>
        Water
      </button>
      <button class="mobile-filter-btn" data-cat="electricity">
        <span class="material-symbols-outlined">electric_bolt</span>
        Electricity
      </button>
      <button class="mobile-filter-btn" data-cat="waste_management">
        <span class="material-symbols-outlined">delete_sweep</span>
        Waste
      </button>
      <button class="mobile-filter-btn" data-status="resolved">
        <span class="material-symbols-outlined">check_circle</span>
        Resolved
      </button>
    </div>

    <!-- Top Bar -->
    <div class="panel-topbar reveal active">
      <div class="results-count">
        Showing <span id="results-count">0</span> results
      </div>
      <div class="sort-wrap">
        <span class="sort-label">Sort by:</span>
        <select class="sort-select" id="sort-select">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_upvotes">Most Upvotes</option>
          <option value="least_upvotes">Least Upvotes</option>
          <option value="trending">Trending</option>
        </select>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="complaints-grid" id="complaints-grid"></div>

    <!-- Load More -->
    <div class="load-more-wrap" id="load-more-wrap" style="display:none;">
      <button class="btn-load-more" id="btn-load-more">
        <span class="material-symbols-outlined">expand_more</span>
        Load More Complaints
      </button>
      <div class="load-more-text" id="load-more-text"></div>
    </div>
  </main>
</div>

<!-- ===== BOTTOM SHEET (Mobile Filters) ===== -->
<div class="bottom-sheet-overlay" id="bottom-sheet-overlay">
  <div class="bottom-sheet">
    <div class="bottom-sheet-handle"></div>
    <div class="bottom-sheet-header">
      <div class="bottom-sheet-title">Filters</div>
      <button class="btn-sheet-close" id="btn-sheet-close">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div id="bottom-sheet-content">
      <!-- Content populated by JS -->
    </div>
  </div>
</div>

<!-- ===== DETAIL MODAL ===== -->
<div class="modal-overlay-v2" id="detail-modal-overlay">
  <div class="detail-modal" id="detail-modal">
    <div class="modal-header-bar">
      <span class="modal-uid" id="modal-uid">CB-2025-00000</span>
      <div class="modal-header-actions">
        <button class="btn-modal-share" id="btn-modal-share-top">
          <span class="material-symbols-outlined">share</span>
          Share
        </button>
        <button class="btn-modal-close" id="btn-modal-close" aria-label="Close">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <div class="modal-body" id="modal-body-content">
      <!-- Populated by JS -->
    </div>

    <div class="modal-bottom-bar">
      <button class="btn-modal-upvote" id="btn-modal-upvote">
        <span class="material-symbols-outlined">thumb_up</span>
        <span id="modal-upvote-count">0</span> Upvote
      </button>
      <button class="btn-modal-share-bottom" id="btn-modal-share-bottom" title="Share">
        <span class="material-symbols-outlined">share</span>
      </button>
    </div>
  </div>
</div>

<!-- Lightbox (supports image + video) -->
<div class="lightbox" id="lightbox">
  <button class="btn-lightbox-close" id="btn-lightbox-close">
    <span class="material-symbols-outlined">close</span>
  </button>
  <img id="lightbox-img" src="" alt="" style="display:none">
  <video id="lightbox-vid" src="" controls style="display:none;max-width:90vw;max-height:90vh;background:#000"></video>
</div>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand reveal active">
      <span class="footer-brand-name">ComplaintBox</span>
      <p>ComplaintBox is a civic engagement platform dedicated to bridge the gap between citizens and local government bodies in Bangladesh.</p>
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
  <div class="footer-bottom">
    <p>© 2025 ComplaintBox — Empowering Bangladesh Through Transparency</p>
    <div class="footer-bottom-links">
      <a href="#">Sitemap</a>
      <a href="#">Cookies Policy</a>
      <a href="#">Accessibility</a>
    </div>
  </div>
</footer>

<!-- Toast Container -->
<div id="toast-container" role="status" aria-live="polite"></div>

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/recent-complaint.js?v=1781267907"></script>
<script src="js/modal.js?v=1781267907"></script>
</body>
</html>