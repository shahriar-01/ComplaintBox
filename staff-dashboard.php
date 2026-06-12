<?php
require_once __DIR__ . '/includes/db.php';
if (session_status() === PHP_SESSION_NONE) session_start();
if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'staff') {
    header('Location: index.php');
    exit;
}
$userId       = (int)$_SESSION['user_id'];
$userName     = $_SESSION['full_name'] ?? '';
$userUID      = $_SESSION['user_uid'] ?? '';
$userEmail    = $_SESSION['email']    ?? '';
$departmentId = (int)($_SESSION['department_id'] ?? 0);

// Department name for display
$ds = $pdo->prepare('SELECT name FROM departments WHERE id = ?');
$ds->execute([$departmentId]);
$departmentName = $ds->fetchColumn() ?: '';
$maintenance = $pdo->query("SELECT setting_value FROM site_settings WHERE setting_key='maintenance_mode'")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="js/page-boot.js?v=1781267907"></script>
<link rel="stylesheet" href="css/transitions.css?v=1781267907">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Staff Dashboard — ComplaintBox</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/staff-dashboard.css?v=1781267907">
<script>
window.SESSION_USER = {
  id:        <?php echo json_encode($userId); ?>,
  uid:       <?php echo json_encode($userUID); ?>,
  name:      <?php echo json_encode($userName); ?>,
  email:     <?php echo json_encode($userEmail); ?>,
  role:      'staff',
  departmentId:    <?php echo json_encode($departmentId); ?>,
  departmentName:  <?php echo json_encode($departmentName); ?>,
  maintenance:     <?php echo json_encode($maintenance); ?>
};
</script>
</head>
<body>

<!-- MAINTENANCE OVERLAY -->
<div class="maintenance-overlay" id="maintenance-overlay">
  <span class="material-symbols-outlined maintenance-icon">construction</span>
  <h2>Under Maintenance</h2>
  <p>ComplaintBox is currently undergoing scheduled maintenance. Please check back later.</p>
  <p style="margin-top:12px;font-size:13px;opacity:0.6">Estimated time: 2 hours</p>
</div>

<!-- DASHBOARD LAYOUT -->
<div class="dashboard-layout">

  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-top">
      <div class="sidebar-brand" onclick="window.location.href='index.php'">
        <div class="sidebar-logo"><span class="material-symbols-outlined">campaign</span></div>
        <span class="sidebar-brand-name">ComplaintBox</span>
      </div>
      <div class="sidebar-portal">Staff Portal</div>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-item active" data-section="overview" onclick="switchSection('overview',this)">
        <span class="material-symbols-outlined">dashboard</span>Overview
      </button>
      <button class="nav-item" data-section="all-complaints" onclick="switchSection('all-complaints',this)">
        <span class="material-symbols-outlined">assignment</span>All Complaints
      </button>
      <button class="nav-item" data-section="assigned-staff" onclick="switchSection('assigned-staff',this)">
        <span class="material-symbols-outlined">group</span>Assigned Staff
      </button>
      <button class="nav-item" data-section="update-status" onclick="switchSection('update-status',this)">
        <span class="material-symbols-outlined">update</span>Update Status
      </button>
      <button class="nav-item" data-section="activity-log" onclick="switchSection('activity-log',this)">
        <span class="material-symbols-outlined">history</span>Activity Log
      </button>
      <button class="nav-item" data-section="notifications" onclick="switchSection('notifications',this)">
        <span class="material-symbols-outlined">notifications</span>Admin Messages
        <span class="nav-badge" id="notif-badge">3</span>
      </button>
      <button class="nav-item" data-section="profile" onclick="switchSection('profile',this)">
        <span class="material-symbols-outlined">manage_accounts</span>Profile Settings
      </button>
    </nav>

    <div class="sidebar-bottom">
      <div class="staff-info">
        <div class="staff-avatar" id="sidebar-avatar">KH</div>
        <div class="staff-details">
          <div class="staff-name" id="sidebar-name">Karim Hossain</div>
          <div class="staff-dept" id="sidebar-dept">Infrastructure Dept.</div>
          <div class="staff-designation" id="sidebar-designation">Operations Manager</div>
          <div class="staff-id" id="sidebar-id">CB-STF-00001</div>
        </div>
      </div>
      <div style="margin-bottom:8px"><span class="staff-tag"><span class="material-symbols-outlined" style="font-size:12px">badge</span>Department Staff</span></div>
      <div class="sidebar-actions">
        <button class="btn-report-sidebar" onclick="openModal('report-modal')">
          <span class="material-symbols-outlined" style="font-size:16px">flag</span>Report
        </button>
        <button class="btn-signout" onclick="handleSignOut()">
          <span class="material-symbols-outlined" style="font-size:16px">logout</span>Sign Out
        </button>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="main-content" id="main-content">

    <!-- OVERVIEW SECTION -->
    <section class="dashboard-section active" id="section-overview">
      <div class="header-row">
        <div>
          <h1 id="overview-greeting">Good Morning, Karim</h1>
          <p style="font-size:14px;color:var(--on-surface-variant);margin-top:4px">Here's your department's complaint summary for today.</p>
        </div>
        <button class="btn-primary" onclick="switchSection('update-status',document.querySelector('[data-section=update-status]'))">
          <span class="material-symbols-outlined">update</span>Update Status
        </button>
      </div>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(0,106,78,0.1)"><span class="material-symbols-outlined" style="color:var(--primary)">assignment</span></div>
          <div class="stat-info"><div class="stat-num" id="stat-assigned">18</div><div class="stat-label">Assigned Complaints</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(234,179,8,0.12)"><span class="material-symbols-outlined" style="color:var(--status-pending)">hourglass_empty</span></div>
          <div class="stat-info"><div class="stat-num" id="stat-pending">5</div><div class="stat-label">Pending Review</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(249,115,22,0.12)"><span class="material-symbols-outlined" style="color:var(--status-in-progress)">sync</span></div>
          <div class="stat-info"><div class="stat-num" id="stat-inprogress">8</div><div class="stat-label">In Progress</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(34,197,94,0.12)"><span class="material-symbols-outlined" style="color:var(--status-resolved)">check_circle</span></div>
          <div class="stat-info"><div class="stat-num" id="stat-resolved">12</div><div class="stat-label">Resolved</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(245,158,11,0.12)"><span class="material-symbols-outlined" style="color:#f59e0b;font-variation-settings:'FILL' 1">star</span></div>
          <div class="stat-info">
            <div class="stat-num" id="stat-avg-rating">—</div>
            <div class="stat-label">Avg Citizen Rating <span style="font-size:11px;color:var(--on-surface-variant)" id="stat-avg-rating-count"></span></div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <!-- RECENT COMPLAINTS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">recent_actors</span>Recent Complaints</div>
            <button class="view-all-link" onclick="switchSection('all-complaints',document.querySelector('[data-section=all-complaints]'))">View All <span class="material-symbols-outlined">arrow_forward</span></button>
          </div>
          <div id="overview-complaints-list"></div>
        </div>

        <!-- RECENT STAFF -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">group</span>Assigned Staff</div>
            <button class="view-all-link" onclick="switchSection('assigned-staff',document.querySelector('[data-section=assigned-staff]'))">View All <span class="material-symbols-outlined">arrow_forward</span></button>
          </div>
          <div id="overview-staff-list"></div>
        </div>
      </div>
    </section>

    <!-- ALL COMPLAINTS SECTION -->
    <section class="dashboard-section" id="section-all-complaints">
      <div class="header-row">
        <h1>All Complaints</h1>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="tag-toggle active" id="recent-toggle" onclick="toggleRecentFilter(this)">
            <span class="material-symbols-outlined" style="font-size:14px">schedule</span>Recent First
          </button>
          <button class="btn-outline btn-sm" onclick="markAllSeen()">
            <span class="material-symbols-outlined" style="font-size:14px">done_all</span>Mark All Seen
          </button>
        </div>
      </div>

      <div class="card">
        <div class="filter-bar">
          <div class="search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search by ID or title..." id="ac-search" oninput="filterAllComplaints()">
          </div>
          <select class="form-select" style="width:auto;padding:9px 30px 9px 12px;font-size:13px" id="ac-status" onchange="filterAllComplaints()">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select class="form-select" style="width:auto;padding:9px 30px 9px 12px;font-size:13px" id="ac-priority" onchange="filterAllComplaints()">
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select class="form-select" style="width:auto;padding:9px 30px 9px 12px;font-size:13px" id="ac-category" onchange="filterAllComplaints()">
            <option value="">All Categories</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="water_service">Water Service</option>
            <option value="electricity">Electricity</option>
            <option value="waste_management">Waste Management</option>
            <option value="traffic_transport">Traffic</option>
            <option value="environment">Environment</option>
            <option value="public_services">Public Services</option>
            <option value="others">Others</option>
          </select>
          <button class="btn-outline" type="button" onclick="resetAllComplaintsFilters()"
                  style="padding:9px 14px;font-size:13px;display:inline-flex;align-items:center;gap:6px">
            <span class="material-symbols-outlined" style="font-size:16px">restart_alt</span>
            Reset Filters
          </button>
        </div>
        <div style="margin-bottom:12px;font-size:13px;color:var(--on-surface-variant)" id="ac-count">Showing all complaints</div>
        <div class="table-wrap">
          <table id="all-complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Subject</th>
                <th>Location</th>
                <th>Status</th>
                <th>Upvotes</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="all-complaints-tbody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ASSIGNED STAFF SECTION -->
    <section class="dashboard-section" id="section-assigned-staff">
      <div class="header-row">
        <h1>Assigned Staff</h1>
      </div>
      <div class="card">
        <div class="filter-bar">
          <div class="search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search by name, ID, designation..." id="staff-search" oninput="filterStaff()">
          </div>
          <select class="form-select" style="width:auto;padding:9px 30px 9px 12px;font-size:13px" id="staff-status-filter" onchange="filterStaff()">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID Card No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Work Status</th>
                <th>District / Ashon</th>
                <th>Handling Now</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="staff-table-body"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- UPDATE STATUS SECTION -->
    <section class="dashboard-section" id="section-update-status">
      <div class="header-row">
        <h1>Update Complaint Status</h1>
      </div>
      <div class="card">
        <div class="form-field">
          <label class="form-label">Select Complaint</label>
          <select class="form-select" id="us-complaint-select" onchange="loadComplaintPreview()">
            <option value="">-- Search or select a complaint --</option>
          </select>
        </div>

        <!-- Complaint Preview -->
        <div id="us-complaint-preview" style="display:none">
          <div class="complaint-preview-card">
            <div class="cp-id" id="us-preview-id"></div>
            <div class="cp-title" id="us-preview-title"></div>
            <div class="cp-meta" id="us-preview-meta"></div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label class="form-label">New Status *</label>
              <select class="form-select" id="us-new-status" onchange="handleStatusChange()">
                <option value="">Select new status...</option>
                <option value="in_review">In Review</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div style="display:flex;align-items:flex-end">
              <div style="background:var(--surface-container);border-radius:12px;padding:12px;flex:1">
                <div style="font-size:11px;font-weight:600;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Current Status</div>
                <div id="us-current-status"></div>
              </div>
            </div>
          </div>

          <!-- Proof Upload (shown when Resolved) -->
          <div id="us-proof-section" style="display:none" class="form-field">
            <label class="form-label" style="display:flex;align-items:center;gap:6px;color:var(--secondary)">
              <span class="material-symbols-outlined" style="font-size:16px">photo_camera</span>
              Upload Proof Images/Videos — Required for Resolution *
            </label>
            <div class="upload-zone" id="us-upload-zone">
              <input type="file" accept="image/*,video/*" multiple onchange="handleProofUpload(event)">
              <div class="upload-icon"><span class="material-symbols-outlined" style="font-size:36px;color:var(--outline)">add_photo_alternate</span></div>
              <p style="font-size:13px;color:var(--on-surface-variant);margin-top:8px">Drag and drop proof images/videos here, or click to browse</p>
              <small style="color:var(--outline)">Max 10 files. Images and videos accepted.</small>
            </div>
            <div class="upload-thumbnails" id="us-proof-thumbnails"></div>
            <div class="form-error" id="us-proof-error" style="display:none">
              <span class="material-symbols-outlined" style="font-size:14px">error</span>
              Please upload at least one proof image for resolution.
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">Notes (Optional — visible to citizen)</label>
            <textarea class="form-input" id="us-notes" placeholder="Add notes about this status update..." rows="4"></textarea>
          </div>

          <button class="btn-primary" style="width:100%;justify-content:center;padding:14px" onclick="submitStatusUpdate()">
            <span class="material-symbols-outlined">check_circle</span>Update Status
          </button>
        </div>
      </div>
    </section>

    <!-- ACTIVITY LOG SECTION -->
    <section class="dashboard-section" id="section-activity-log">
      <div class="header-row">
        <h1>Activity Log</h1>
      </div>
      <div class="card">
        <div class="filter-bar">
          <div class="search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search activities..." id="log-search" oninput="filterLogs()">
          </div>
          <input type="date" class="form-input" style="width:auto;padding:9px 14px;font-size:13px" id="log-date" onchange="filterLogs()">
          <select class="form-select" style="width:auto;padding:9px 30px 9px 12px;font-size:13px" id="log-sort" onchange="filterLogs()">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <button class="tag-toggle" id="reports-filter-btn" onclick="toggleReportsFilter(this)">
            <span class="material-symbols-outlined" style="font-size:14px">flag</span>Reports to Admin
          </button>
          <button class="btn-outline btn-sm" onclick="resetLogFilters()">Reset</button>
        </div>
        <div id="activity-log-list"></div>
      </div>
    </section>

    <!-- NOTIFICATIONS SECTION -->
    <section class="dashboard-section" id="section-notifications">
      <div class="header-row">
        <h1>Messages from Admin</h1>
        <button class="btn-outline btn-sm" onclick="markAllNotifsRead()">
          <span class="material-symbols-outlined" style="font-size:14px">done_all</span>Mark All as Read
        </button>
      </div>
      <div id="notifications-list"></div>
    </section>

    <!-- PROFILE SECTION -->
    <section class="dashboard-section" id="section-profile">
      <div class="header-row">
        <h1>Profile Settings</h1>
      </div>
      <div class="card">
        <div class="avatar-upload-wrap">
          <div class="avatar-upload-circle" id="profile-avatar-circle">KH
            <input type="file" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%" onchange="handleAvatarUpload(event)">
          </div>
          <label class="avatar-upload-label">
            <span class="material-symbols-outlined">upload</span>Upload Photo
          </label>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input class="form-input" type="text" id="p-fullname" value="Karim Hossain">
          </div>
          <div class="form-field">
            <label class="form-label">Designation</label>
            <input class="form-input" type="text" id="p-designation" value="Operations Manager">
          </div>
          <div class="form-field">
            <label class="form-label">ID Card Number</label>
            <input class="form-input" type="text" id="p-idcard" value="INFRA-MGR-0001">
          </div>
          <div class="form-field">
            <label class="form-label">Department</label>
            <input class="form-input" type="text" value="Infrastructure Department" readonly style="background:var(--surface-container);cursor:not-allowed">
          </div>
        </div>

        <!-- Change Password -->
        <div class="pw-section">
          <div class="pw-section-header" onclick="togglePwSection()">
            <h4><span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;margin-right:6px">lock</span>Change Password</h4>
            <span class="material-symbols-outlined" id="pw-chevron" style="font-size:18px;color:var(--on-surface-variant)">expand_more</span>
          </div>
          <div class="pw-section-body" id="pw-body">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">Current Password</label>
                <input class="form-input" type="password" id="p-current-pw" placeholder="Enter current password">
              </div>
              <div></div>
              <div class="form-field">
                <label class="form-label">New Password</label>
                <input class="form-input" type="password" id="p-new-pw" placeholder="Min 8 chars">
              </div>
              <div class="form-field">
                <label class="form-label">Confirm New Password</label>
                <input class="form-input" type="password" id="p-confirm-pw" placeholder="Re-enter new password">
              </div>
            </div>
            <button class="btn-outline btn-sm" onclick="updatePassword()">Update Password</button>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:20px">
          <button class="btn-primary" style="flex:1;justify-content:center;padding:13px" onclick="updateProfile()">
            <span class="material-symbols-outlined">save</span>Update Profile
          </button>
        </div>
      </div>
    </section>

  </main>
</div>

<!-- MOBILE BOTTOM NAV -->
<nav class="mobile-nav" id="mobile-nav">
  <button class="mobile-nav-item active" data-section="overview" onclick="switchSection('overview',this);updateMobileNav(this)">
    <span class="material-symbols-outlined">dashboard</span>Overview
  </button>
  <button class="mobile-nav-item" data-section="all-complaints" onclick="switchSection('all-complaints',this);updateMobileNav(this)">
    <span class="material-symbols-outlined">assignment</span>Complaints
  </button>
  <button class="mobile-nav-item" data-section="update-status" onclick="switchSection('update-status',this);updateMobileNav(this)">
    <span class="material-symbols-outlined">update</span>Update
  </button>
  <button class="mobile-nav-item" data-section="notifications" onclick="switchSection('notifications',this);updateMobileNav(this)">
    <span class="material-symbols-outlined">notifications</span>Messages
  </button>
  <button class="mobile-nav-item" data-section="profile" onclick="switchSection('profile',this);updateMobileNav(this)">
    <span class="material-symbols-outlined">person</span>Profile
  </button>
</nav>

<!-- TOAST CONTAINER -->
<div id="toast-container"></div>

<!-- =================== MODALS =================== -->

<!-- UPDATE STATUS QUICK MODAL -->
<div class="modal-overlay" id="quick-status-modal">
  <div class="modal-box">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2>Update Status — <span id="qs-complaint-id" class="mono"></span></h2>
      <button class="modal-close" onclick="closeModal('quick-status-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label class="form-label">New Status</label>
        <select class="form-select" id="qs-status">
          <option value="in_review">In Review</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div class="form-field">
        <label class="form-label">Notes (optional — visible to citizen)</label>
        <textarea class="form-input" id="qs-notes" placeholder="Add notes about this update..." rows="3"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('quick-status-modal')">Cancel</button>
      <button class="btn-primary" onclick="saveQuickStatus()"><span class="material-symbols-outlined">save</span>Save Status</button>
    </div>
  </div>
</div>

<!-- COMPLAINT DETAIL MODAL -->
<div class="modal-overlay" id="complaint-detail-modal">
  <div class="modal-box large">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <div>
        <div style="font-family:monospace;font-size:12px;color:var(--on-surface-variant)" id="detail-id-label"></div>
        <h2 id="detail-title-label">Complaint Details</h2>
      </div>
      <button class="modal-close" onclick="closeModal('complaint-detail-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body" id="complaint-detail-body">
      <!-- Dynamically injected -->
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('complaint-detail-modal')">Close</button>
      <button class="btn-primary" onclick="openUpdateForComplaint(currentDetailComplaint)" id="detail-update-btn">
        <span class="material-symbols-outlined">update</span>Update Status
      </button>
    </div>
  </div>
</div>

<!-- STAFF DETAIL MODAL -->
<div class="modal-overlay" id="staff-detail-modal">
  <div class="modal-box large">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2>Staff Details</h2>
      <button class="modal-close" onclick="closeModal('staff-detail-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body" id="staff-detail-body"></div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('staff-detail-modal')">Close</button>
    </div>
  </div>
</div>

<!-- ASSIGN COMPLAINT MODAL -->
<div class="modal-overlay" id="assign-modal">
  <div class="modal-box">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2 id="assign-modal-title">Assign Complaint</h2>
      <button class="modal-close" onclick="closeModal('assign-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label class="form-label">Select Complaint</label>
        <select class="form-select" id="assign-complaint-select">
          <option value="">Select a complaint...</option>
        </select>
        <p style="margin-top:6px;font-size:12px;color:var(--on-surface-variant)" id="assign-complaint-hint"></p>
      </div>
      <div class="form-field" id="assign-staff-field">
        <label class="form-label" id="assign-staff-label">Assign To Staff Member</label>
        <select class="form-select" id="assign-to-staff">
          <option value="">Select staff...</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('assign-modal')">Cancel</button>
      <button class="btn-primary" onclick="confirmAssign()"><span class="material-symbols-outlined">check</span>Confirm</button>
    </div>
  </div>
</div>

<!-- ===== REMOVE ASSIGNMENT MODAL (pick which complaint to unassign) ===== -->
<div class="modal-overlay" id="remove-modal">
  <div class="modal-box">
    <div class="modal-accent" style="background:var(--status-rejected,#dc2626)"></div>
    <div class="modal-header">
      <h2>Remove Assignment</h2>
      <button class="modal-close" onclick="closeModal('remove-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body">
      <p style="font-size:13px;color:var(--on-surface-variant);margin-bottom:12px" id="remove-modal-staff-line">—</p>
      <div class="form-field">
        <label class="form-label">Which complaint do you want to remove?</label>
        <select class="form-select" id="remove-complaint-select">
          <option value="">Select a complaint...</option>
        </select>
      </div>
      <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;cursor:pointer">
        <input type="checkbox" id="remove-all-toggle">
        Remove all complaint assignments from this staff
      </label>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('remove-modal')">Cancel</button>
      <button class="btn-primary" style="background:var(--status-rejected,#dc2626);border-color:var(--status-rejected,#dc2626)" onclick="confirmRemoveAssignment()">
        <span class="material-symbols-outlined">delete</span>Remove
      </button>
    </div>
  </div>
</div>

<!-- NOTIFICATION DETAIL MODAL -->
<div class="modal-overlay" id="notif-detail-modal">
  <div class="modal-box">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2 id="notif-detail-title">Message</h2>
      <button class="modal-close" onclick="closeModal('notif-detail-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body" id="notif-detail-body"></div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('notif-detail-modal')">Close</button>
    </div>
  </div>
</div>

<!-- REPORT MODAL -->
<div class="modal-overlay" id="report-modal">
  <div class="modal-box">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2><span class="material-symbols-outlined" style="font-size:20px;vertical-align:middle;margin-right:6px;color:var(--secondary)">flag</span>Submit a Report</h2>
      <button class="modal-close" onclick="closeModal('report-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label class="form-label">Topic *</label>
        <input class="form-input" type="text" id="report-topic" placeholder="Report topic...">
      </div>
      <div class="form-field">
        <label class="form-label">Category *</label>
        <select class="form-select" id="report-category" onchange="handleReportCategoryChange()">
          <option value="">Select category...</option>
          <option value="fake_complaint">Fake Complaint Post</option>
          <option value="technical_issue">Technical Issue</option>
          <option value="add_new_staff">Add New Staff Member Details</option>
        </select>
      </div>
      <div class="form-field">
        <label class="form-label">Description *</label>
        <textarea class="form-input" id="report-desc" placeholder="Describe the issue..." rows="4"></textarea>
      </div>

      <!-- Add New Staff fields -->
      <div id="new-staff-fields" style="display:none">
        <div style="background:rgba(0,106,78,0.06);border-radius:12px;padding:14px;margin-bottom:14px;border:1.5px solid var(--primary-fixed)">
          <div style="font-size:12px;font-weight:700;color:var(--primary);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.06em">New Staff Information</div>
          <div class="form-row">
            <div class="form-field">
              <label class="form-label">Full Name</label>
              <input class="form-input" type="text" id="ns-name" placeholder="Staff full name">
            </div>
            <div class="form-field">
              <label class="form-label">Phone</label>
              <input class="form-input" type="text" id="ns-phone" placeholder="01XXXXXXXXX">
            </div>
            <div class="form-field">
              <label class="form-label">NID Number</label>
              <input class="form-input" type="text" id="ns-nid" placeholder="NID number">
            </div>
            <div class="form-field">
              <label class="form-label">Designation</label>
              <input class="form-input" type="text" id="ns-designation" placeholder="e.g. Field Officer">
            </div>
          </div>
          <div class="form-field">
            <label class="form-label">Department</label>
            <input class="form-input" type="text" value="Infrastructure Department" readonly style="background:var(--surface-container);cursor:not-allowed">
          </div>
          <p style="font-size:12px;color:var(--on-surface-variant);margin-top:8px;padding:10px;background:white;border-radius:8px;border:1px solid var(--outline-variant)">
            <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;color:var(--primary)">info</span>
            Admin will add this staff member and provide login credentials.
          </p>
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">Upload Images (optional, max 3)</label>
        <div class="upload-zone" style="padding:16px">
          <input type="file" accept="image/*" multiple onchange="handleReportImages(event)">
          <span class="material-symbols-outlined" style="font-size:28px;color:var(--outline)">add_photo_alternate</span>
          <p style="font-size:12px;color:var(--on-surface-variant);margin-top:6px">Click to upload supporting images</p>
        </div>
        <div class="upload-thumbnails" id="report-thumbs"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('report-modal')">Cancel</button>
      <button class="btn-primary" style="background:var(--secondary)" onclick="submitReport()">
        <span class="material-symbols-outlined">send</span>Submit Report
      </button>
    </div>
  </div>
</div>

<!-- CONFIRM MODAL -->
<div class="modal-overlay" id="confirm-modal">
  <div class="modal-box" style="max-width:400px">
    <div class="modal-accent"></div>
    <div class="modal-header">
      <h2 id="confirm-title">Confirm Action</h2>
      <button class="modal-close" onclick="closeModal('confirm-modal')"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="modal-body">
      <p id="confirm-message" style="font-size:14px;color:var(--on-surface-variant);line-height:1.6"></p>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" onclick="closeModal('confirm-modal')">Cancel</button>
      <button class="btn-primary" id="confirm-yes-btn"><span class="material-symbols-outlined">check</span>Yes, Confirm</button>
    </div>
  </div>
</div>

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/staff-dashboard.js?v=1781267907"></script>
</body>
</html>