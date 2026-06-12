<?php
require_once __DIR__ . '/includes/db.php';
if (session_status() === PHP_SESSION_NONE) session_start();
if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'admin') {
    header('Location: index.php');
    exit;
}
$userId    = (int)$_SESSION['user_id'];
$userName  = $_SESSION['full_name'] ?? '';
$userUID   = $_SESSION['user_uid'] ?? '';
$userEmail = $_SESSION['email']    ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="js/page-boot.js?v=1781267907"></script>
<link rel="stylesheet" href="css/transitions.css?v=1781267907">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard — ComplaintBox</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link rel="stylesheet" href="css/admin-dashboard.css?v=1781267907">
<script>
window.SESSION_USER = {
  id:        <?php echo json_encode($userId); ?>,
  uid:       <?php echo json_encode($userUID); ?>,
  name:      <?php echo json_encode($userName); ?>,
  email:     <?php echo json_encode($userEmail); ?>,
  role:      'admin'
};
</script>
</head>
<body>

<!-- Mobile menu button -->
<button class="mobile-menu-btn" id="mobileMenuBtn">
  <span class="material-symbols-outlined">menu</span>
</button>
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- ===== SIDEBAR ===== -->
<aside class="admin-sidebar" id="adminSidebar">
  <div class="sidebar-brand">
    <a href="index.php" class="sidebar-logo">
      <div class="sidebar-logo-icon">
        <span class="material-symbols-outlined" style="font-size:18px">campaign</span>
      </div>
      <span class="sidebar-logo-text">ComplaintBox</span>
    </a>
    <div class="sidebar-sub">Admin Dashboard</div>
  </div>

  <nav class="sidebar-nav">
    <button class="nav-item active" data-section="overview">
      <span class="material-symbols-outlined">dashboard</span> Overview
    </button>
    <button class="nav-item" data-section="users">
      <span class="material-symbols-outlined">manage_accounts</span> User Management
    </button>
    <button class="nav-item" data-section="profile-review">
      <span class="material-symbols-outlined">verified_user</span> User Profile Review
    </button>
    <button class="nav-item" data-section="complaint-requests">
      <span class="material-symbols-outlined">pending_actions</span> Complaint Requests
      <span class="nav-badge" id="req-badge">5</span>
    </button>
    <button class="nav-item" data-section="all-complaints">
      <span class="material-symbols-outlined">list_alt</span> All Complaints
    </button>
    <button class="nav-item" data-section="all-departments">
      <span class="material-symbols-outlined">corporate_fare</span> All Departments
    </button>
    <button class="nav-item" data-section="feedback">
      <span class="material-symbols-outlined">star</span> Feedback Messages
    </button>
    <button class="nav-item" data-section="reports">
      <span class="material-symbols-outlined">flag</span> All Reports
      <span class="nav-badge" id="report-badge">3</span>
    </button>
    <button class="nav-item" data-section="activity">
      <span class="material-symbols-outlined">history</span> Recent Activity
    </button>
    <button class="nav-item" data-section="settings">
      <span class="material-symbols-outlined">settings</span> Settings
    </button>
  </nav>

  <div class="sidebar-bottom">
    <div class="admin-profile">
      <div class="admin-avatar">SA</div>
      <div class="admin-info">
        <div class="admin-name">System Admin</div>
        <div class="admin-email">admin@complaintbox.gov.bd</div>
      </div>
    </div>
    <button class="btn-signout" onclick="signOut()">
      <span class="material-symbols-outlined">logout</span> Sign Out
    </button>
  </div>
</aside>

<!-- ===== MAIN CONTENT ===== -->
<main class="admin-main">

  <!-- ============ OVERVIEW ============ -->
  <section class="admin-section active" id="section-overview">
    <div class="section-header">
      <h2 class="section-title">Overview</h2>
      <span class="muted text-sm" id="overview-date"></span>
    </div>

    <div class="stats-grid" id="overviewStats"></div>

    <div class="charts-grid">
      <!-- Bar Chart -->
      <div class="chart-card">
        <div class="chart-title">Monthly Complaint Volume (2025)</div>
        <div class="bar-chart" id="barChart"></div>
      </div>
      <!-- Donut Chart -->
      <div class="chart-card">
        <div class="chart-title">Complaint Status Distribution</div>
        <div class="donut-wrap">
          <div class="donut-svg-wrap">
            <svg id="donutSvg" width="160" height="160" viewBox="0 0 160 160"></svg>
            <div class="donut-center">
              <div class="donut-total" id="donutTotal">0</div>
              <div class="donut-sub">Total</div>
            </div>
          </div>
          <div class="donut-legend" id="donutLegend"></div>
        </div>
      </div>
    </div>

    <!-- Recent Complaints Table -->
    <div class="table-container">
      <div class="table-header">
        <span class="table-title">Recent Complaints</span>
        <button class="btn btn-primary" onclick="switchSection('all-complaints')">
          <span class="material-symbols-outlined">open_in_new</span> View All
        </button>
      </div>
      <div style="overflow-x:auto">
        <table id="recentComplaintsTable">
          <thead>
            <tr>
              <th>Complaint ID</th><th>Subject</th><th>Category</th>
              <th>Priority</th><th>Status</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="recentComplaintsBody"></tbody>
        </table>
      </div>
    </div>

    <!-- Dept Performance -->
    <div class="table-container">
      <div class="table-header">
        <span class="table-title">All Departments Performance</span>
        <div style="display:flex;gap:8px">
          <select class="filter-select" id="deptPerfMonth" style="min-width:unset" onchange="renderDeptPerfTable()">
            <option value="" selected>All Months</option>
            <option value="1">Jan</option><option value="2">Feb</option>
            <option value="3">Mar</option><option value="4">Apr</option>
            <option value="5">May</option><option value="6">Jun</option>
            <option value="7">Jul</option><option value="8">Aug</option>
            <option value="9">Sep</option><option value="10">Oct</option>
            <option value="11">Nov</option><option value="12">Dec</option>
          </select>
          <select class="filter-select" id="deptPerfYear" style="min-width:unset" onchange="renderDeptPerfTable()">
            <option value="" selected>All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table id="deptPerfTable">
          <thead>
            <tr><th>Department</th><th>Total Assigned</th><th>In Progress</th><th>Resolved</th><th>Performance</th></tr>
          </thead>
          <tbody id="deptPerfBody"></tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ============ USER MANAGEMENT ============ -->
  <section class="admin-section" id="section-users">
    <div class="section-header">
      <h2 class="section-title">User Management</h2>
    </div>
    <div class="tab-switcher" style="margin-bottom:20px">
      <button class="tab-btn active" id="tab-citizens" onclick="switchUserTab('citizens')">Citizens</button>
      <button class="tab-btn" id="tab-staff" onclick="switchUserTab('staff')">Department Staff</button>
    </div>

    <!-- Citizens Tab -->
    <div id="citizens-tab">
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <div class="search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input class="search-input" id="citizenSearch" placeholder="Name, email, phone, NID..." oninput="filterCitizens()">
          </div>
        </div>
        <div class="filter-group">
          <label class="filter-label">Verification</label>
          <select class="filter-select" id="citizenVerified" onchange="filterCitizens()">
            <option value="">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" id="citizenBanned" onchange="filterCitizens()">
            <option value="">All</option>
            <option value="0">Active</option>
            <option value="1">Banned</option>
          </select>
        </div>
        <button class="btn btn-outline" onclick="resetCitizenFilters()">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>
      <div class="table-container">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>User ID</th><th>Name</th><th>Username</th><th>Phone</th>
                <th>NID</th><th>Location</th><th>Joined</th>
                <th>Complaints</th><th>Verified</th><th>Actions</th>
              </tr>
            </thead>
            <tbody id="citizensBody"></tbody>
          </table>
        </div>
      </div>
      <div class="recently-joined">
        <div class="rj-title">Recently Joined Citizens</div>
        <div class="rj-list" id="recentlyCitizens"></div>
      </div>
    </div>

    <!-- Staff Tab -->
    <div id="staff-tab" style="display:none">
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <div class="search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input class="search-input" id="staffSearch" placeholder="Name, ID card, NID..." oninput="filterStaff()">
          </div>
        </div>
        <div class="filter-group">
          <label class="filter-label">Department</label>
          <select class="filter-select" id="staffDeptFilter" onchange="filterStaff()">
            <option value="">All Departments</option>
          </select>
        </div>
        <button class="btn btn-outline" onclick="resetStaffFilters()">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>
      <div class="table-container">
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Staff ID</th><th>Name</th><th>Phone</th><th>Department</th>
                <th>Designation</th><th>Joined</th><th>Complaints Handled</th><th>Actions</th>
              </tr>
            </thead>
            <tbody id="staffBody"></tbody>
          </table>
        </div>
      </div>
      <div class="recently-joined">
        <div class="rj-title">Recently Joined Staff</div>
        <div class="rj-list" id="recentlyStaff"></div>
      </div>
    </div>
  </section>

  <!-- ============ PROFILE REVIEW ============ -->
  <section class="admin-section" id="section-profile-review">
    <div class="section-header">
      <h2 class="section-title">User Profile Review</h2>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Search</label>
        <div class="search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input class="search-input" id="reviewSearch" placeholder="User ID, name..." oninput="filterReviews()">
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Status</label>
        <select class="filter-select" id="reviewStatus" onchange="filterReviews()">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
        </select>
      </div>
    </div>
    <div class="review-grid" id="reviewGrid"></div>
  </section>

  <!-- ============ COMPLAINT REQUESTS ============ -->
  <section class="admin-section" id="section-complaint-requests">
    <div class="section-header">
      <h2 class="section-title">Complaint Requests</h2>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Search</label>
        <div class="search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input class="search-input" id="reqSearch" placeholder="Complaint ID, title..." oninput="filterRequests()">
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Category</label>
        <select class="filter-select" id="reqCategory" onchange="filterRequests()">
          <option value="">All Categories</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="water_service">Water Service</option>
          <option value="electricity">Electricity</option>
          <option value="waste_management">Waste Management</option>
          <option value="traffic_transport">Traffic & Transit</option>
          <option value="environment">Environment</option>
          <option value="public_services">Public Services</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Approval Status</label>
        <select class="filter-select" id="reqApproval" onchange="filterRequests()">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button class="btn btn-outline" onclick="resetReqFilters()">
        <span class="material-symbols-outlined">refresh</span> Reset
      </button>
    </div>
    <div class="cards-grid-2" id="requestsGrid"></div>
  </section>

  <!-- ============ ALL COMPLAINTS ============ -->
  <section class="admin-section" id="section-all-complaints">
    <div class="section-header">
      <h2 class="section-title">All Complaints</h2>
      <button class="btn btn-primary" onclick="exportCSV()">
        <span class="material-symbols-outlined">download</span> Export CSV
      </button>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Search</label>
        <div class="search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input class="search-input" id="complaintSearch" placeholder="ID, title, citizen..." oninput="filterAllComplaints()">
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Category</label>
        <select class="filter-select" id="complaintCatFilter" onchange="filterAllComplaints()">
          <option value="">All</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="water_service">Water Service</option>
          <option value="electricity">Electricity</option>
          <option value="waste_management">Waste Management</option>
          <option value="traffic_transport">Traffic & Transit</option>
          <option value="environment">Environment</option>
          <option value="public_services">Public Services</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Priority</label>
        <select class="filter-select" id="complaintPriorityFilter" onchange="filterAllComplaints()">
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Status</label>
        <select class="filter-select" id="complaintStatusFilter" onchange="filterAllComplaints()">
          <option value="">All</option>
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
        <label class="filter-label">Department</label>
        <select class="filter-select" id="complaintDeptFilter" onchange="filterAllComplaints()">
          <option value="">All</option>
        </select>
      </div>
      <button class="btn btn-outline" onclick="resetComplaintFilters()">
        <span class="material-symbols-outlined">refresh</span> Reset
      </button>
    </div>
    <div class="table-container">
      <div style="overflow-x:auto">
        <table>
          <thead>
            <tr>
              <th>Complaint ID</th><th>Subject</th><th>District</th>
              <th>Submitted By</th><th>Category</th><th>Priority</th>
              <th>Status</th><th>Department</th><th>Date</th><th>Upvotes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="allComplaintsBody"></tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ============ ALL DEPARTMENTS ============ -->
  <section class="admin-section" id="section-all-departments">
    <div class="section-header">
      <h2 class="section-title">All Departments</h2>
      <button class="btn btn-primary" onclick="openAddDeptModal()">
        <span class="material-symbols-outlined">add</span> Add New Department
      </button>
    </div>
    <div class="cards-grid" id="deptsGrid"></div>
  </section>

  <!-- ============ FEEDBACK ============ -->
  <section class="admin-section" id="section-feedback">
    <div class="section-header">
      <h2 class="section-title">Feedback Messages</h2>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Search</label>
        <div class="search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input class="search-input" id="feedbackSearch" placeholder="Topic, user..." oninput="filterFeedback()">
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Rating</label>
        <select class="filter-select" id="feedbackRating" onchange="filterFeedback()">
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Featured</label>
        <select class="filter-select" id="feedbackFeatured" onchange="filterFeedback()">
          <option value="">All</option>
          <option value="1">Featured Only</option>
        </select>
      </div>
    </div>
    <div class="cards-grid" id="feedbackGrid"></div>
  </section>

  <!-- ============ REPORTS ============ -->
  <section class="admin-section" id="section-reports">
    <div class="section-header">
      <h2 class="section-title">All Reports</h2>
    </div>
    <div class="tab-switcher" style="margin-bottom:20px">
      <button class="tab-btn active" id="tab-rep-citizen" onclick="switchReportTab('citizen')">Citizens</button>
      <button class="tab-btn" id="tab-rep-staff" onclick="switchReportTab('staff')">Department Staff</button>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Category</label>
        <select class="filter-select" id="reportCatFilter" onchange="filterReports()">
          <option value="">All Categories</option>
          <option value="fake_complaint">Fake Complaint</option>
          <option value="fake_user">Fake User</option>
          <option value="fake_comment">Fake Comment</option>
          <option value="technical_issue">Technical Issue</option>
          <option value="department_staff">Department Staff</option>
          <option value="add_new_staff">Add New Staff</option>
        </select>
      </div>
      <button class="btn btn-outline" onclick="resetReportFilters()">
        <span class="material-symbols-outlined">refresh</span> Reset
      </button>
    </div>
    <div id="reportsList"></div>
  </section>

  <!-- ============ ACTIVITY ============ -->
  <section class="admin-section" id="section-activity">
    <div class="section-header">
      <h2 class="section-title">Recent Activity</h2>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Search</label>
        <div class="search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input class="search-input" id="actSearch" placeholder="Complaint ID, action..." oninput="filterActivity()">
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Actor Type</label>
        <select class="filter-select" id="actType" onchange="filterActivity()">
          <option value="">All</option>
          <option value="citizen">Citizen</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
          <option value="system">System</option>
        </select>
      </div>
      <button class="btn btn-outline" onclick="resetActivityFilters()">
        <span class="material-symbols-outlined">refresh</span> Reset
      </button>
    </div>
    <div class="activity-list" id="activityList"></div>
  </section>

  <!-- ============ SETTINGS ============ -->
  <section class="admin-section" id="section-settings">
    <div class="section-header">
      <h2 class="section-title">Settings</h2>
    </div>

    <div class="settings-card">
      <div class="settings-card-title">Auto-Assignment System</div>
      <div class="settings-card-desc">Automatically assign complaints to departments based on selected category. When off, admin must assign manually.</div>
      <div class="toggle-wrap">
        <button class="toggle on" id="autoAssignToggle" onclick="toggleSetting('auto_assignment')"></button>
        <span class="toggle-label" id="autoAssignLabel">Enabled</span>
      </div>
    </div>

    <div class="settings-card">
      <div class="settings-card-title">Maintenance Mode</div>
      <div class="settings-card-desc">When enabled, citizens and staff cannot perform actions on the website. They will see a maintenance message. Admin dashboard is unaffected.</div>
      <div class="toggle-wrap">
        <button class="toggle" id="maintToggle" onclick="toggleSetting('maintenance_mode')"></button>
        <span class="toggle-label" id="maintLabel">Disabled</span>
      </div>
    </div>

    <div class="settings-card">
      <div class="settings-card-title">Site Configuration</div>
      <div class="settings-input-row">
        <input class="settings-input" id="siteNameInput" value="ComplaintBox" placeholder="Site Name">
        <button class="btn btn-primary" onclick="updateSetting('site_name','siteNameInput')">Update</button>
      </div>
      <div class="settings-input-row">
        <input class="settings-input" id="supportEmailInput" value="support@complaintbox.gov.bd" placeholder="Support Email">
        <button class="btn btn-primary" onclick="updateSetting('support_email','supportEmailInput')">Update</button>
      </div>
    </div>

    <div class="settings-card">
      <div class="settings-card-title">Change Admin Password</div>
      <div class="form-row-2" style="margin-bottom:10px">
        <input class="form-ctrl" type="password" id="currPass" placeholder="Current Password">
        <input class="form-ctrl" type="password" id="newPass" placeholder="New Password">
      </div>
      <div class="settings-input-row">
        <input class="settings-input" type="password" id="confirmPass" placeholder="Confirm New Password">
        <button class="btn btn-primary" onclick="changeAdminPassword()">Update Password</button>
      </div>
    </div>

    <div style="text-align:center;margin-top:24px">
      <button class="btn btn-danger" onclick="signOut()" style="padding:14px 32px;font-size:15px">
        <span class="material-symbols-outlined">logout</span> Sign Out
      </button>
    </div>
  </section>

</main>

<!-- ===== COMPLAINT DETAIL MODAL ===== -->
<div class="modal-overlay" id="complaintDetailOverlay" onclick="closeModalOnOverlay(event,'complaintDetailOverlay')">
  <div class="modal-box modal-lg" id="complaintDetailBox">
    <div class="modal-header">
      <div>
        <div class="detail-id" id="cdModalId">CB-2025-00001</div>
        <h3 id="cdModalTitle">Complaint Details</h3>
      </div>
      <button class="btn-modal-close" onclick="closeModal('complaintDetailOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="cdModalBody">
    </div>
  </div>
</div>

<!-- ===== USER DETAIL MODAL ===== -->
<div class="modal-overlay" id="userDetailOverlay" onclick="closeModalOnOverlay(event,'userDetailOverlay')">
  <div class="modal-box" id="userDetailBox">
    <div class="modal-header">
      <h3>User Details</h3>
      <button class="btn-modal-close" onclick="closeModal('userDetailOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="userDetailBody"></div>
  </div>
</div>

<!-- ===== PROFILE REVIEW MODAL ===== -->
<div class="modal-overlay" id="reviewModalOverlay" onclick="closeModalOnOverlay(event,'reviewModalOverlay')">
  <div class="modal-box" id="reviewModalBox">
    <div class="modal-header">
      <h3>Profile Review</h3>
      <button class="btn-modal-close" onclick="closeModal('reviewModalOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="reviewModalBody"></div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('reviewModalOverlay')">Close</button>
      <button class="btn btn-primary" id="reviewApproveBtn">
        <span class="material-symbols-outlined">verified_user</span> Mark as Verified
      </button>
    </div>
  </div>
</div>

<!-- ===== REJECTION MODAL ===== -->
<div class="modal-overlay" id="rejectModalOverlay" onclick="closeModalOnOverlay(event,'rejectModalOverlay')">
  <div class="modal-box modal-sm" id="rejectModalBox">
    <div class="modal-header">
      <h3>Reject Complaint</h3>
      <button class="btn-modal-close" onclick="closeModal('rejectModalOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="info-box" id="rejectComplaintId"></div>
      <div class="form-group">
        <label class="form-label-md">Reason for Rejection *</label>
        <textarea class="rejection-textarea" id="rejectReason" placeholder="e.g. Similar complaint already exists. See: CB-2025-00038"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label-md">Reference Complaint ID (optional)</label>
        <input class="form-ctrl" id="rejectRef" placeholder="CB-2025-XXXXX">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('rejectModalOverlay')">Cancel</button>
      <button class="btn btn-danger" onclick="submitRejection()">Submit Rejection</button>
    </div>
  </div>
</div>

<!-- ===== ADD DEPT MODAL ===== -->
<div class="modal-overlay" id="addDeptOverlay" onclick="closeModalOnOverlay(event,'addDeptOverlay')">
  <div class="modal-box modal-sm" id="addDeptBox">
    <div class="modal-header">
      <h3>Add New Department</h3>
      <button class="btn-modal-close" onclick="closeModal('addDeptOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label-md">Department Name *</label>
        <input class="form-ctrl" id="newDeptName" placeholder="Department name">
      </div>
      <div class="form-group">
        <label class="form-label-md">Category Key *</label>
        <select class="form-ctrl" id="newDeptCat">
          <option value="infrastructure">Infrastructure</option>
          <option value="water_service">Water Service</option>
          <option value="electricity">Electricity</option>
          <option value="waste_management">Waste Management</option>
          <option value="traffic_transport">Traffic & Transport</option>
          <option value="environment">Environment</option>
          <option value="public_services">Public Services</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label-md">Contact Email</label>
          <input class="form-ctrl" id="newDeptEmail" type="email" placeholder="dept@gov.bd">
        </div>
        <div class="form-group">
          <label class="form-label-md">Contact Phone</label>
          <input class="form-ctrl" id="newDeptPhone" placeholder="01XXXXXXXXX">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label-md">Description</label>
        <textarea class="form-ctrl" id="newDeptDesc" rows="3" placeholder="Brief description..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addDeptOverlay')">Cancel</button>
      <button class="btn btn-primary" onclick="saveNewDept()">
        <span class="material-symbols-outlined">save</span> Save Department
      </button>
    </div>
  </div>
</div>

<!-- ===== REPORT DETAIL MODAL ===== -->
<div class="modal-overlay" id="reportDetailOverlay" onclick="closeModalOnOverlay(event,'reportDetailOverlay')">
  <div class="modal-box" id="reportDetailBox">
    <div class="modal-header">
      <h3>Report Details</h3>
      <button class="btn-modal-close" onclick="closeModal('reportDetailOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="reportDetailBody"></div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('reportDetailOverlay')">Close</button>
      <button class="btn btn-primary" id="reportReplyBtn" onclick="sendReportReply()">
        <span class="material-symbols-outlined">send</span> Send Reply
      </button>
    </div>
  </div>
</div>

<!-- ===== CONFIRM MODAL ===== -->
<div class="confirm-overlay" id="confirmOverlay">
  <div class="confirm-box">
    <div class="confirm-icon" id="confirmIcon">⚠️</div>
    <div class="confirm-title" id="confirmTitle">Are you sure?</div>
    <div class="confirm-message" id="confirmMessage">This action cannot be undone.</div>
    <div class="confirm-btns">
      <button class="btn btn-outline" onclick="closeConfirm()">Cancel</button>
      <button class="btn btn-danger" id="confirmYesBtn">Yes, Proceed</button>
    </div>
  </div>
</div>

<!-- ===== FEEDBACK DETAIL MODAL ===== -->
<div class="modal-overlay" id="feedbackDetailOverlay" onclick="closeModalOnOverlay(event,'feedbackDetailOverlay')">
  <div class="modal-box modal-sm">
    <div class="modal-header">
      <h3>Feedback Detail</h3>
      <button class="btn-modal-close" onclick="closeModal('feedbackDetailOverlay')">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="feedbackDetailBody"></div>
  </div>
</div>

<!-- ===== TOAST ===== -->
<div id="toast-container"></div>

<script src="js/api-client.js?v=1781267907"></script>
<script src="js/admin-dashboard.js?v=1781267907"></script>
</body>
</html>