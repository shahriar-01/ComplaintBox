<?php
require_once __DIR__ . '/includes/db.php';
if (session_status() === PHP_SESSION_NONE) session_start();
if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'citizen') {
    header('Location: index.php');
    exit;
}
$userId    = (int)$_SESSION['user_id'];
$userName  = $_SESSION['full_name'] ?? '';
$userUID   = $_SESSION['user_uid'] ?? '';
$userEmail = $_SESSION['email']    ?? '';

// Fetch profile_verified + maintenance setting
$ps = $pdo->prepare('SELECT profile_verified FROM users WHERE id = ?');
$ps->execute([$userId]);
$profileVerified = $ps->fetchColumn() ?: 'pending';
$maintenance = $pdo->query("SELECT setting_value FROM site_settings WHERE setting_key='maintenance_mode'")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="js/page-boot.js?v=1781267907"></script>
<link rel="stylesheet" href="css/transitions.css?v=1781267907">

<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Citizen Dashboard — ComplaintBox</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/citizen-dashboard.css?v=1781267907">
<script>
window.SESSION_USER = {
  id:        <?php echo json_encode($userId); ?>,
  uid:       <?php echo json_encode($userUID); ?>,
  name:      <?php echo json_encode($userName); ?>,
  email:     <?php echo json_encode($userEmail); ?>,
  role:      'citizen',
  profileVerified: <?php echo json_encode($profileVerified); ?>,
  maintenance:     <?php echo json_encode($maintenance); ?>
};
</script>
<!-- Leaflet (OpenStreetMap) for the New Complaint location picker — no API key required -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
</head>
<body>

<!-- MAINTENANCE OVERLAY -->
<div class="maintenance-overlay" id="maintenance-overlay">
  <div>
    <span class="material-symbols-outlined" style="font-size:64px;margin-bottom:16px;display:block">construction</span>
    <h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;margin-bottom:12px">Under Maintenance</h2>
    <p style="font-size:16px;opacity:0.8;max-width:400px">ComplaintBox is currently under maintenance. Please check back later.</p>
  </div>
</div>

<!-- SIDEBAR OVERLAY (mobile) -->
<div class="sidebar-overlay" id="sidebar-overlay" onclick="closeMobileSidebar()"></div>

<div class="dashboard-layout">

  <!-- ===== SIDEBAR ===== -->
  <aside class="sidebar" id="main-sidebar">
    <div class="sidebar-top">
      <a href="index.php" class="sidebar-brand">
        <div class="sidebar-brand-icon">
          <span class="material-symbols-outlined" style="font-size:20px">campaign</span>
        </div>
        <span class="sidebar-brand-name">ComplaintBox</span>
      </a>
      <div class="sidebar-subtitle">Citizen Dashboard</div>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-btn active" data-section="overview" onclick="switchSection('overview')">
        <span class="material-symbols-outlined">dashboard</span>
        Overview
      </button>
      <button class="nav-btn" data-section="my-complaints" onclick="switchSection('my-complaints')">
        <span class="material-symbols-outlined">assignment</span>
        My Complaints
      </button>
      <button class="nav-btn" data-section="my-comments" onclick="switchSection('my-comments')">
        <span class="material-symbols-outlined">comment</span>
        My Comments
      </button>
      <button class="nav-btn" data-section="notifications" onclick="switchSection('notifications')">
        <span class="material-symbols-outlined">notifications</span>
        Notifications
        <span class="nav-badge" id="notif-badge">3</span>
      </button>
      <button class="nav-btn" data-section="profile" onclick="switchSection('profile')">
        <span class="material-symbols-outlined">manage_accounts</span>
        Profile Settings
      </button>
    </nav>

    <div class="sidebar-bottom">
      <div class="user-info">
        <div class="user-avatar" id="sidebar-avatar">DC</div>
        <div class="user-details">
          <div class="user-name" id="sidebar-name">Demo Citizen</div>
          <div class="user-id" id="sidebar-id">CB-USR-00001</div>
          <div class="user-location" id="sidebar-location">Dhaka · Dhaka-09</div>
        </div>
      </div>
      <div class="citizen-badge">
        <span class="material-symbols-outlined" style="font-size:12px">person</span>
        Citizen
      </div>
      <div class="sidebar-actions">
        <button class="btn-report-sidebar" onclick="openModal('report-modal')">
          <span class="material-symbols-outlined">flag</span>
          Report
        </button>
        <button class="btn-signout" onclick="handleSignOut()">
          <span class="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>
    </div>
  </aside>

  <!-- ===== MAIN CONTENT ===== -->
  <main class="main-content">
    <!-- Mobile Header -->
    <div class="mobile-header">
      <button class="mobile-hamburger" onclick="openMobileSidebar()">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <span class="mobile-brand">ComplaintBox</span>
      <div class="user-avatar" style="width:32px;height:32px;font-size:11px" id="mobile-avatar">DC</div>
    </div>

    <!-- ===== OVERVIEW SECTION ===== -->
    <section class="dashboard-section active" id="section-overview">
      <div class="section-top-row">
        <div>
          <div class="section-greeting" id="greeting-text">Good morning, <span>Demo</span></div>
          <div class="section-date" id="date-text"></div>
        </div>
        <button class="btn-primary" onclick="openNewComplaintModal()">
          <span class="material-symbols-outlined">add</span>
          New Complaint
        </button>
      </div>

      <!-- Profile Verification Warning -->
      <!-- <div class="verify-block" id="verify-warning" style="display:none">
        <span class="material-symbols-outlined">warning</span>
        <div class="verify-block-text">
          <h4>Profile Verification Pending</h4>
          <p>Your profile is under admin review. You cannot submit new complaints until verified. <button class="btn-text" style="font-size:13px" onclick="switchSection('profile')">Go to Profile Settings</button></p>
        </div>
      </div> -->

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card" style="--accent-color: var(--primary-container)">
          <div class="stat-card-icon" style="background: rgba(0,106,78,0.1)">
            <span class="material-symbols-outlined">list_alt</span>
          </div>
          <div class="stat-card-num" id="stat-total">5</div>
          <div class="stat-card-label">Total Complaints</div>
        </div>
        <div class="stat-card" style="--accent-color: var(--status-in-progress)">
          <div class="stat-card-icon" style="background: rgba(249,115,22,0.1)">
            <span class="material-symbols-outlined" style="color:var(--status-in-progress)">sync</span>
          </div>
          <div class="stat-card-num" id="stat-progress">2</div>
          <div class="stat-card-label">In Progress</div>
        </div>
        <div class="stat-card" style="--accent-color: var(--status-pending)">
          <div class="stat-card-icon" style="background: rgba(234,179,8,0.1)">
            <span class="material-symbols-outlined" style="color:var(--status-pending)">hourglass_empty</span>
          </div>
          <div class="stat-card-num" id="stat-pending">1</div>
          <div class="stat-card-label">Pending</div>
        </div>
        <div class="stat-card" style="--accent-color: var(--status-resolved)">
          <div class="stat-card-icon" style="background: rgba(34,197,94,0.1)">
            <span class="material-symbols-outlined" style="color:var(--status-resolved)">check_circle</span>
          </div>
          <div class="stat-card-num" id="stat-resolved">1</div>
          <div class="stat-card-label">Resolved</div>
        </div>
        <div class="stat-card" style="--accent-color: var(--status-rejected)">
          <div class="stat-card-icon" style="background: rgba(239,68,68,0.1)">
            <span class="material-symbols-outlined" style="color:var(--status-rejected)">cancel</span>
          </div>
          <div class="stat-card-num" id="stat-rejected">1</div>
          <div class="stat-card-label">Rejected</div>
        </div>
      </div>

      <div class="overview-grid">
        <!-- Recent Complaints Preview -->
        <div class="content-card">
          <div class="card-header-row">
            <div class="card-title">
              <span class="material-symbols-outlined">assignment</span>
              My Complaints
            </div>
            <button class="btn-text" onclick="switchSection('my-complaints')">View All <span class="material-symbols-outlined">arrow_forward</span></button>
          </div>
          <div class="complaints-list" id="overview-complaints"></div>
        </div>

        <!-- Recent Activity -->
        <div class="content-card">
          <div class="card-header-row">
            <div class="card-title">
              <span class="material-symbols-outlined">history</span>
              Recent Activity
            </div>
            <button class="btn-text" onclick="switchSection('notifications')">View All <span class="material-symbols-outlined">arrow_forward</span></button>
          </div>
          <div class="activity-list" id="activity-list"></div>
        </div>
      </div>

      <!-- Trending -->
      <div class="content-card">
        <div class="card-header-row">
          <div class="card-title">
            <span class="material-symbols-outlined">trending_up</span>
            Trending Complaints
          </div>
        </div>
        <div class="trending-grid" id="trending-grid"></div>
      </div>
    </section>

    <!-- ===== MY COMPLAINTS SECTION ===== -->
    <section class="dashboard-section" id="section-my-complaints">
      <div class="section-top-row">
        <div class="section-heading"><span class="material-symbols-outlined">assignment</span>My Complaints</div>
        <button class="btn-primary" onclick="openNewComplaintModal()">
          <span class="material-symbols-outlined">add</span>
          New
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <input class="filter-input" type="text" id="mc-search" placeholder="Search ID or title..." oninput="filterMyComplaints()">
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" id="mc-status" onchange="filterMyComplaints()">
            <option value="">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Category</label>
          <select class="filter-select" id="mc-category" onchange="filterMyComplaints()">
            <option value="">All Categories</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="water">Water Service</option>
            <option value="electricity">Electricity</option>
            <option value="waste">Waste Management</option>
            <option value="traffic">Traffic & Transit</option>
            <option value="environment">Environment</option>
            <option value="public">Public Service</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Priority</label>
          <select class="filter-select" id="mc-priority" onchange="filterMyComplaints()">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div style="display:flex;align-items:flex-end">
          <button class="btn-outline" onclick="clearFilters()">
            <span class="material-symbols-outlined">refresh</span>
            Clear
          </button>
        </div>
      </div>

      <div style="font-size:13px;color:var(--on-surface-variant);margin-bottom:12px" id="mc-count"></div>
      <div class="complaints-list" id="my-complaints-list"></div>
    </section>

    <!-- ===== MY COMMENTS SECTION ===== -->
    <section class="dashboard-section" id="section-my-comments">
      <div class="section-heading"><span class="material-symbols-outlined">comment</span>My Comments</div>
      <div class="comments-section-list" id="my-comments-list"></div>
    </section>

    <!-- ===== NOTIFICATIONS SECTION ===== -->
    <section class="dashboard-section" id="section-notifications">
      <div class="section-top-row">
        <div class="section-heading"><span class="material-symbols-outlined">notifications</span>Notifications</div>
        <button class="btn-text" onclick="markAllRead()">Mark All as Read</button>
      </div>
      <div class="notif-filter-row" id="notif-filter-row">
        <button class="filter-pill active" data-type="all" onclick="filterNotifs('all', this)">All</button>
        <button class="filter-pill" data-type="complaint_update" onclick="filterNotifs('complaint_update', this)">Complaint Updates</button>
        <button class="filter-pill" data-type="admin_message" onclick="filterNotifs('admin_message', this)">Admin Messages</button>
        <button class="filter-pill" data-type="comment" onclick="filterNotifs('comment', this)">Comments</button>
        <button class="filter-pill" data-type="upvote" onclick="filterNotifs('upvote', this)">Upvotes</button>
      </div>
      <div class="notif-list" id="notif-list"></div>
    </section>

    <!-- ===== PROFILE SECTION ===== -->
    <section class="dashboard-section" id="section-profile">
      <div class="section-heading"><span class="material-symbols-outlined">manage_accounts</span>Profile Settings</div>
      <div class="profile-card">
        <!-- Avatar -->
        <div class="avatar-section">
          <div class="profile-avatar-lg" id="profile-avatar-display" onclick="document.getElementById('profile-pic-input').click()">
            <span id="profile-initials">DC</span>
            <img id="profile-preview-img" src="" alt="" style="display:none">
            <div class="avatar-upload-overlay">
              <span class="material-symbols-outlined">photo_camera</span>
            </div>
            <input type="file" id="profile-pic-input" accept="image/*" style="display:none" onchange="previewProfilePic(this)">
          </div>
          <div>
            <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:700;margin-bottom:4px" id="profile-display-name">Demo Citizen</div>
            <div style="font-family:monospace;font-size:12px;color:var(--outline)" id="profile-display-id">CB-USR-00001</div>
            <button class="btn-outline" style="margin-top:10px" onclick="document.getElementById('profile-pic-input').click()">
              <span class="material-symbols-outlined">upload</span>
              Upload Photo
            </button>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="profile-form-grid">
          <div class="form-field">
            <label class="form-label">Full Name *</label>
            <input class="form-input" type="text" id="pf-fullname" value="Demo Citizen">
          </div>
          <div class="form-field">
            <label class="form-label">Phone Number *</label>
            <input class="form-input" type="tel" id="pf-phone" value="01712345678">
          </div>
          <div class="form-field">
            <label class="form-label">NID Number *</label>
            <input class="form-input" type="text" id="pf-nid" value="1234567890123">
          </div>
          <div class="form-field">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" id="pf-email" value="citizen@demo.complaintbox.bd" disabled style="opacity:0.6;cursor:not-allowed">
          </div>
          <div class="form-field">
            <label class="form-label">Select District *</label>
            <select class="form-select" id="pf-district" onchange="populateProfileAshons()">
              <option value="">Choose District</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Ashon No. *</label>
            <select class="form-select" id="pf-ashon" onchange="populateProfileAreas()">
              <option value="">Select District First</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Area *</label>
            <select class="form-select" id="pf-area">
              <option value="">Select Ashon First</option>
            </select>
          </div>
        </div>

        <!-- NID Upload -->
        <div class="nid-upload-section">
          <h4 style="font-size:15px;font-weight:600;margin-bottom:12px">NID Card Images</h4>
          <div class="nid-grid">
            <div class="nid-zone" id="nid-front-zone">
              <input type="file" id="nid-front-up" accept="image/*" onchange="previewNID(this,'nid-front-prev','nid-front-zone')">
              <img id="nid-front-prev" class="nid-preview-img" src="" alt="" style="display:none">
              <span class="material-symbols-outlined">id_card</span>
              <div class="nid-zone-text">NID Front Side</div>
              <div class="nid-zone-sub">Click to upload</div>
            </div>
            <div class="nid-zone" id="nid-back-zone">
              <input type="file" id="nid-back-up" accept="image/*" onchange="previewNID(this,'nid-back-prev','nid-back-zone')">
              <img id="nid-back-prev" class="nid-preview-img" src="" alt="" style="display:none">
              <span class="material-symbols-outlined">credit_card_off</span>
              <div class="nid-zone-text">NID Back Side</div>
              <div class="nid-zone-sub">Click to upload</div>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div class="change-password-section">
          <div class="collapsible-header" id="pw-header" onclick="toggleCollapsible()">
            <h4>Change Password</h4>
            <span class="material-symbols-outlined">expand_more</span>
          </div>
          <div class="collapsible-body" id="pw-body">
            <div class="form-field">
              <label class="form-label">Current Password</label>
              <input class="form-input" type="password" id="pf-cur-pw" placeholder="••••••••">
            </div>
            <div class="form-field">
              <label class="form-label">New Password</label>
              <input class="form-input" type="password" id="pf-new-pw" placeholder="Min 8 chars">
            </div>
            <div class="form-field">
              <label class="form-label">Confirm New Password</label>
              <input class="form-input" type="password" id="pf-conf-pw" placeholder="Repeat password">
            </div>
            <div style="display:flex;align-items:flex-end">
              <button class="btn-outline" onclick="updatePassword()" style="height:44px">Update Password</button>
            </div>
          </div>
        </div>

        <!-- Update Button -->
        <button class="btn-primary" style="width:100%;justify-content:center;border-radius:12px" onclick="updateProfile()">
          <span class="material-symbols-outlined">save</span>
          Update Profile
        </button>

        <!-- Danger Zone -->
        <div class="danger-zone">
          <h4 style="font-size:13px;font-weight:600;color:var(--on-surface-variant);margin-bottom:12px">Danger Zone</h4>
          <button class="btn-danger" onclick="confirmDeleteAccount()">
            <span class="material-symbols-outlined">delete_forever</span>
            Delete Account
          </button>
        </div>
      </div>
    </section>
  </main>
</div>

<!-- Mobile Bottom Nav -->
<nav class="mobile-nav">
  <button class="mobile-nav-btn active" data-section="overview" onclick="switchSection('overview');updateMobileNav(this)">
    <span class="material-symbols-outlined">dashboard</span>
    Overview
  </button>
  <button class="mobile-nav-btn" data-section="my-complaints" onclick="switchSection('my-complaints');updateMobileNav(this)">
    <span class="material-symbols-outlined">assignment</span>
    Complaints
  </button>
  <button class="mobile-nav-btn" data-section="notifications" onclick="switchSection('notifications');updateMobileNav(this)">
    <span class="material-symbols-outlined">notifications</span>
    Alerts
    <span class="mob-badge" id="mob-notif-badge">3</span>
  </button>
  <button class="mobile-nav-btn" data-section="profile" onclick="switchSection('profile');updateMobileNav(this)">
    <span class="material-symbols-outlined">person</span>
    Profile
  </button>
</nav>

<!-- ===== NEW COMPLAINT MODAL ===== -->
<div class="modal-overlay" id="new-complaint-modal">
  <div class="modal-container" style="max-width:680px">
    <div class="modal-header">
      <div class="modal-title">New Complaint</div>
      <button class="modal-close" onclick="closeModal('new-complaint-modal')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- Step Indicator -->
      <div class="step-indicator">
        <div class="step-pill active" id="nc-pill-1">
          <div class="step-dot" id="nc-dot-1">01</div>
          <span class="step-label">Details</span>
        </div>
        <div class="step-connector-line" id="nc-line-1"></div>
        <div class="step-pill" id="nc-pill-2">
          <div class="step-dot" id="nc-dot-2">02</div>
          <span class="step-label">Media</span>
        </div>
        <div class="step-connector-line" id="nc-line-2"></div>
        <div class="step-pill" id="nc-pill-3">
          <div class="step-dot" id="nc-dot-3">03</div>
          <span class="step-label">Preview</span>
        </div>
      </div>

      <!-- Step 1 -->
      <div class="form-step active" id="nc-step-1">
        <p style="font-size:12px;font-weight:700;color:var(--primary-container);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px">Select Category (one or more)</p>
        <div class="category-grid" id="nc-category-grid">
          <div class="category-option" data-cat="infrastructure" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">construction</span>
            <span>Infrastructure</span>
          </div>
          <div class="category-option" data-cat="water" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">water_drop</span>
            <span>Water Service</span>
          </div>
          <div class="category-option" data-cat="electricity" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">electric_bolt</span>
            <span>Electricity</span>
          </div>
          <div class="category-option" data-cat="waste" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">delete_sweep</span>
            <span>Waste Mgmt</span>
          </div>
          <div class="category-option" data-cat="traffic" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">traffic</span>
            <span>Traffic</span>
          </div>
          <div class="category-option" data-cat="environment" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">eco</span>
            <span>Environment</span>
          </div>
          <div class="category-option" data-cat="public" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">local_police</span>
            <span>Public Service</span>
          </div>
          <div class="category-option" data-cat="others" onclick="toggleCategory(this)">
            <span class="material-symbols-outlined">more_horiz</span>
            <span>Others</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
          <div class="form-field">
            <label class="form-label">District *</label>
            <select class="form-select" id="nc-district" onchange="populateNCDistrict()">
              <option value="">Select District</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Ashon No. *</label>
            <select class="form-select" id="nc-ashon" onchange="populateNCAreas()" disabled>
              <option value="">District first</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Area</label>
            <select class="form-select" id="nc-area" disabled>
              <option value="">Ashon first</option>
            </select>
          </div>
        </div>

        <div class="form-field" style="margin-bottom:14px">
          <label class="form-label">Subject *</label>
          <input class="form-input" type="text" id="nc-subject" maxlength="200" placeholder="Brief title of your complaint..." oninput="updateCharCount('nc-subject','nc-subject-count',200)">
          <div class="char-counter"><span id="nc-subject-count">0</span>/200</div>
          <div style="font-size:12px;color:var(--error);margin-top:4px;display:none" id="nc-err-1"></div>
        </div>

        <div class="form-field" style="margin-bottom:16px">
          <label class="form-label">Description *</label>
          <textarea class="form-input" id="nc-description" rows="4" maxlength="2000" placeholder="Describe the issue in detail..." oninput="updateCharCount('nc-description','nc-desc-count',2000)" style="resize:vertical"></textarea>
          <div class="char-counter"><span id="nc-desc-count">0</span>/2000</div>
        </div>

        <p style="font-size:12px;font-weight:700;color:var(--primary-container);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Priority Level *</p>
        <div class="priority-row" id="nc-priority-row">
          <div class="priority-option" data-prio="low" onclick="selectPriority(this)" style="border-color:rgba(107,114,128,0.3)">
            <div class="prio-icon" style="color:#6B7280">⬤</div>
            <div class="prio-label" style="color:#374151">Low</div>
            <div class="prio-desc">Minor inconvenience</div>
          </div>
          <div class="priority-option selected-priority" data-prio="medium" onclick="selectPriority(this)" style="border-color:#3B82F6;background:rgba(59,130,246,0.06)">
            <div class="prio-icon" style="color:#3B82F6">⚠</div>
            <div class="prio-label" style="color:#1d4ed8">Medium</div>
            <div class="prio-desc">Needs attention</div>
          </div>
          <div class="priority-option" data-prio="high" onclick="selectPriority(this)" style="border-color:rgba(249,115,22,0.3)">
            <div class="prio-icon" style="color:#F97316">⬆</div>
            <div class="prio-label" style="color:#c2410c">High</div>
            <div class="prio-desc">Urgent issue</div>
          </div>
          <div class="priority-option" data-prio="critical" onclick="selectPriority(this)" style="border-color:rgba(239,68,68,0.3)">
            <div class="prio-icon" style="color:#EF4444">🚨</div>
            <div class="prio-label" style="color:#b91c1c">Critical</div>
            <div class="prio-desc">Immediate action</div>
          </div>
        </div>

        <div class="form-nav-row">
          <button class="btn-primary" onclick="ncStep1Next()">
            Next Step
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="form-step" id="nc-step-2">
        <p style="font-size:12px;font-weight:700;color:var(--primary-container);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px">Upload Media (Optional)</p>
        <div class="media-drop-zone" id="nc-drop-zone">
          <input type="file" id="nc-media-input" accept="image/*,video/*" multiple onchange="handleMediaUpload(this)">
          <span class="material-symbols-outlined">cloud_upload</span>
          <p style="font-size:14px;font-weight:600;color:var(--on-surface-variant)">Drag & drop or click to browse</p>
          <p style="font-size:12px;color:var(--outline)">Images & videos accepted · Max 10 files</p>
        </div>
        <div class="media-thumbs" id="nc-media-thumbs"></div>

        <div style="margin-top:20px">
          <p style="font-size:12px;font-weight:700;color:var(--primary-container);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">
            <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">map</span>
            Pin Your Location
          </p>
          <!-- Search bar -->
          <div style="display:flex;gap:6px;margin-bottom:8px;position:relative">
            <div style="flex:1;position:relative">
              <span class="material-symbols-outlined" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:18px;color:var(--outline);pointer-events:none">search</span>
              <input type="text" id="nc-map-search" placeholder="Search a place, area, or address in Bangladesh..." autocomplete="off"
                style="width:100%;padding:10px 12px 10px 36px;border:1px solid var(--outline-variant);border-radius:10px;font-size:13px;font-family:inherit;background:var(--surface)">
              <div id="nc-map-search-results" style="display:none;position:absolute;top:100%;left:0;right:0;margin-top:4px;background:var(--surface);border:1px solid var(--outline-variant);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.12);max-height:240px;overflow-y:auto;z-index:10;font-size:13px"></div>
            </div>
            <button class="btn-outline" type="button" onclick="ncDoMapSearch()" style="padding:8px 14px">Search</button>
          </div>
          <div id="nc-leaflet-map" style="width:100%;height:260px;border-radius:12px;border:1px solid var(--outline-variant);background:#eaeaea;position:relative;z-index:0"></div>
          <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;align-items:center">
            <button class="btn-outline" type="button" onclick="ncUseCurrentLocation()">
              <span class="material-symbols-outlined">my_location</span>
              Use Current Location
            </button>
            <span style="font-size:12px;color:var(--outline)">Tap the map to drop / move the pin.</span>
          </div>
          <div id="nc-map-pinned" style="display:none;margin-top:8px;padding:10px;background:rgba(0,106,78,0.08);border-radius:10px;font-size:13px">
            <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary-container);vertical-align:middle">location_on</span>
            <span id="nc-map-address">—</span>
            <button class="btn-text" style="margin-left:8px;font-size:12px" type="button" onclick="clearMapPin()">Remove</button>
          </div>
          <!-- Keep legacy placeholder hidden so existing JS toggles don't break -->
          <div class="map-placeholder" id="nc-map-placeholder" style="display:none"></div>
        </div>

        <div class="form-nav-row">
          <button class="btn-outline" onclick="ncGoStep(1)">
            <span class="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button class="btn-primary" onclick="ncGoStep(3)">
            Last Step
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Step 3 Preview -->
      <div class="form-step" id="nc-step-3">
        <p style="font-size:12px;font-weight:700;color:var(--primary-container);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px">Preview & Submit</p>
        <div id="nc-preview-card" style="background:var(--surface-container-low);border-radius:16px;padding:18px;border:1px solid var(--outline-variant);margin-bottom:16px">
          <!-- Rendered by JS -->
        </div>
        <div style="background:rgba(234,179,8,0.08);border-left:4px solid var(--status-pending);border-radius:8px;padding:12px;font-size:13px;color:var(--on-surface-variant);margin-bottom:20px">
          <strong>Note:</strong> Your complaint will be reviewed by an admin before appearing publicly.
        </div>
        <div class="form-nav-row" style="justify-content:space-between">
          <button class="btn-outline" onclick="ncGoStep(2)">
            <span class="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <div style="display:flex;gap:10px">
            <button class="btn-outline" onclick="closeModal('new-complaint-modal')">Cancel</button>
            <button class="btn-primary" onclick="submitComplaint()">
              <span class="material-symbols-outlined">send</span>
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===== COMPLAINT DETAIL MODAL ===== -->
<div class="modal-overlay" id="detail-modal">
  <div class="modal-container detail-modal-container">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="complaint-id-badge" id="detail-id-badge" style="font-size:12px">CB-2025-00001</span>
        <div id="detail-action-btns" style="display:flex;gap:6px"></div>
      </div>
      <button class="modal-close" onclick="closeModal('detail-modal')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="detail-modal-body">
      <!-- Rendered by JS -->
    </div>
  </div>
</div>

<!-- ===== REJECTED REASON MODAL ===== -->
<div class="modal-overlay" id="rejected-modal">
  <div class="modal-container" style="max-width:400px">
    <div class="modal-header">
      <div class="modal-title" style="color:var(--error)">
        <span class="material-symbols-outlined" style="vertical-align:middle;font-size:20px;margin-right:6px">cancel</span>
        Complaint Rejected
      </div>
      <button class="modal-close" onclick="closeModal('rejected-modal')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <div style="background:var(--error-container);border-radius:12px;padding:16px;margin-bottom:16px">
        <p style="font-size:13px;color:var(--on-error-container);line-height:1.6" id="rejected-reason-text">Your complaint was rejected due to insufficient details.</p>
      </div>
      <div id="rejected-ref" style="display:none;font-size:13px;color:var(--on-surface-variant)">
        Similar complaint: <button class="btn-text" style="font-size:13px" id="rejected-ref-link">View</button>
      </div>
    </div>
  </div>
</div>

<!-- ===== REPORT MODAL ===== -->
<div class="modal-overlay" id="report-modal">
  <div class="modal-container report-modal-container">
    <div class="modal-header">
      <div class="modal-title">
        <span class="material-symbols-outlined" style="vertical-align:middle;font-size:20px;margin-right:6px;color:var(--error)">flag</span>
        Submit a Report
      </div>
      <button class="modal-close" onclick="closeModal('report-modal')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-field" style="margin-bottom:14px">
        <label class="form-label">Topic *</label>
        <input class="form-input" type="text" id="report-topic" placeholder="Report topic...">
      </div>
      <div class="form-field" style="margin-bottom:14px">
        <label class="form-label">Category *</label>
        <select class="form-select" id="report-category">
          <option value="">Select Category</option>
          <option value="fake_complaint">Fake Complaint Post</option>
          <option value="fake_user">Fake User</option>
          <option value="fake_comment">Fake Comment</option>
          <option value="technical_issue">Technical Issue</option>
          <option value="department_staff">Department Staff</option>
        </select>
      </div>
      <div class="form-field" style="margin-bottom:20px">
        <label class="form-label">Description *</label>
        <textarea class="form-input" id="report-desc" rows="4" placeholder="Describe your report..." style="resize:vertical"></textarea>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;border-radius:12px" onclick="submitReport()">
        <span class="material-symbols-outlined">send</span>
        Submit Report
      </button>
    </div>
  </div>
</div>

<!-- ===== CONFIRM MODAL ===== -->
<div class="modal-overlay" id="confirm-modal">
  <div class="modal-container confirm-modal-container">
    <div class="modal-body" style="padding-top:32px">
      <div class="confirm-icon">
        <span class="material-symbols-outlined">warning</span>
      </div>
      <div class="confirm-title" id="confirm-title">Are you sure?</div>
      <div class="confirm-msg" id="confirm-msg">This action cannot be undone.</div>
      <div class="confirm-btns">
        <button class="btn-confirm-cancel" onclick="closeModal('confirm-modal')">Cancel</button>
        <button class="btn-confirm-yes" id="confirm-yes-btn">Yes, Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- ===== PROFILE UPDATE SUCCESS MODAL ===== -->
<div class="modal-overlay" id="profile-success-modal">
  <div class="modal-container" style="max-width:420px;text-align:center">
    <div class="modal-body" style="padding-top:32px">
      <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-fixed),var(--primary-fixed-dim));display:flex;align-items:center;justify-content:center;margin:0 auto 16px;animation:pulse 2s infinite">
        <span class="material-symbols-outlined" style="font-size:36px;color:var(--primary-container);font-variation-settings:'FILL' 1">check_circle</span>
      </div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px">Profile Update Submitted</div>
      <p style="font-size:14px;color:var(--on-surface-variant);line-height:1.6;margin-bottom:24px">Admin will review your profile details shortly. Check Notifications for updates.</p>
      <button class="btn-primary" style="margin:0 auto;display:flex" onclick="closeModal('profile-success-modal')">
        <span class="material-symbols-outlined">check</span>
        Got it
      </button>
    </div>
  </div>
</div>

<!-- Toast Container -->
<div id="toast-container"></div>

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/citizen-dashboard.js?v=1781267907"></script>
</body>
</html>