/* =====================================================================
   ComplaintBox — API client shim
   Exposes: window.API (apiCall, get, post, postForm, login, logout, etc.)
   Loaded on every page BEFORE the page-specific JS.
===================================================================== */
(function () {
  'use strict';

  // ----- Detect base API path (works under XAMPP /complaintbox subfolder too) -----
  function detectBase() {
    const p = window.location.pathname;
    // strip trailing filename
    const dir = p.endsWith('/') ? p : p.replace(/\/[^\/]*$/, '/');
    return dir;
  }
  const BASE = detectBase();
  const API_BASE = BASE + 'api/';

  async function apiCall(url, method, body) {
    method = (method || 'GET').toUpperCase();
    if (!/^https?:\/\//.test(url) && !url.startsWith(API_BASE) && url.startsWith('/api/')) {
      url = BASE.replace(/\/$/, '') + url;
    } else if (!/^https?:\/\//.test(url) && !url.startsWith(API_BASE) && url.startsWith('api/')) {
      url = BASE + url;
    }
    const opts = { method, credentials: 'same-origin', headers: {} };
    if (body && method !== 'GET') {
      if (body instanceof FormData) {
        opts.body = body;
      } else {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
      }
    }
    let res, data;
    try {
      res = await fetch(url, opts);
    } catch (e) {
      throw new Error('Network error: ' + e.message);
    }
    try {
      data = await res.json();
    } catch (e) {
      throw new Error('Invalid server response (' + res.status + ')');
    }
    if (!data.success) {
      const err = new Error(data.message || 'Request failed');
      err.status = res.status;
      err.code   = data.code || null;
      err.data   = data;
      throw err;
    }
    return data;
  }

  // Helpers
  const API = {
    BASE,
    API_BASE,
    call: apiCall,
    get: (path, params) => {
      const url = API_BASE + path.replace(/^\//, '');
      if (params && typeof params === 'object') {
        const qs = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== '') qs.append(k, v);
        });
        const q = qs.toString();
        return apiCall(url + (q ? '?' + q : ''), 'GET');
      }
      return apiCall(url, 'GET');
    },
    post: (path, body) => apiCall(API_BASE + path.replace(/^\//, ''), 'POST', body),
    postForm: (path, formData) => apiCall(API_BASE + path.replace(/^\//, ''), 'POST', formData),

    // Auth
    login:    (identifier, password) => API.post('auth/login.php', { identifier, password }),
    logout:   () => API.post('auth/logout.php', {}),
    session:  () => API.get('auth/session.php'),
    register: (formData) => API.postForm('auth/register.php', formData),

    // Common
    districts:    () => API.get('districts/get-districts.php'),
    ashons:       (district_id) => API.get('districts/get-ashons.php', { district_id }),
    areas:        (ashon_id) => API.get('districts/get-areas.php', { ashon_id }),
    departments:  () => API.get('departments/get-departments.php'),

    // Complaints
    complaints:    (filters) => API.get('complaints/get-complaints.php', filters || {}),
    complaint:     (id) => API.get('complaints/get-complaint.php', { complaint_id: id }),
    createComplaint: (formData) => API.postForm('complaints/create-complaint.php', formData),
    approveComplaint: (complaint_id) => API.post('complaints/approve-complaint.php', { complaint_id }),
    rejectComplaint:  (complaint_id, rejection_reason, rejected_complaint_ref) =>
      API.post('complaints/reject-complaint.php', { complaint_id, rejection_reason, rejected_complaint_ref }),
    assignDepartment: (complaint_id, department_id) =>
      API.post('complaints/assign-department.php', { complaint_id, department_id }),
    updateStatus: (formData) => API.postForm('complaints/update-status.php', formData),
    updateComplaint: (formData) => API.postForm('complaints/update-complaint.php', formData),
    deleteComplaint: (id) => API.post('complaints/delete-complaint.php', { id }),

    // Engagement
    toggleUpvote: (complaint_id) => API.post('upvotes/toggle-upvote.php', { complaint_id }),
    addComment:   (complaint_id, comment_text) =>
      API.post('comments/add-comment.php', { complaint_id, comment_text }),
    getComments:  (complaint_id, page, per_page) =>
      API.get('comments/get-comments.php', { complaint_id, page, per_page }),
    getMyComments: (params) => API.get('comments/get-my-comments.php', params || {}),
    deleteComment: (id) => API.post('comments/delete-comment.php', { id }),
    submitRating: (complaint_id, rating) => API.post('ratings/submit-rating.php', { complaint_id, rating }),

    // Notifications
    getNotifications: (type) => API.get('notifications/get-notifications.php', type ? { type } : {}),
    markRead:         (ids)  => API.post('notifications/mark-read.php', { ids: Array.isArray(ids) ? ids : [ids] }),
    markAllRead:      ()     => API.post('notifications/mark-all-read.php', {}),

    // Users (admin)
    getUsers:    (filters) => API.get('users/get-users.php', filters || {}),
    getUser:     (id) => API.get('users/get-user.php', { id }),
    banUser:     (user_id, action) => API.post('users/ban-user.php', { user_id, action }),
    verifyUser:  (user_id) => API.post('users/verify-user.php', { user_id }),
    deleteUser:  (user_id) => API.post('users/delete-user.php', { user_id }),
    updateProfile: (formData) => API.postForm('users/update-profile.php', formData),

    // Staff
    getStaff:        (filters) => API.get('staff/get-staff.php', filters || {}),
    createStaff:     (formData) => API.postForm('staff/create-staff.php', formData),
    updateStaff:     (formData) => API.postForm('staff/update-staff.php', formData),
    deleteStaff:     (id) => API.post('staff/delete-staff.php', { id }),
    assignComplaint: (complaint_id, staff_id) => API.post('staff/assign-complaint.php', { complaint_id, staff_id }),
    removeAssignment:(complaint_id) => API.post('staff/remove-assignment.php', { complaint_id }),

    // Reports / Feedback / Activity / Stats / Settings
    getReports:    (filters) => API.get('reports/get-reports.php', filters || {}),
    submitReport:  (formData) => API.postForm('reports/submit-report.php', formData),
    replyReport:   (report_id, reply) => API.post('reports/reply-report.php', { report_id, reply }),
    getFeedback:   (featured) => API.get('feedback/get-feedback.php', featured ? { featured: 1 } : {}),
    submitFeedback:(topic, rating, message) => API.post('feedback/submit-feedback.php', { topic, rating, message }),
    featureFeedback:(feedback_id, is_featured) =>
      API.post('feedback/feature-feedback.php', { feedback_id, is_featured }),
    deleteFeedback:(id) => API.post('feedback/delete-feedback.php', { id }),
    getActivity:   (filters) => API.get('activity/get-activity.php', filters || {}),
    overviewStats: () => API.get('stats/get-overview-stats.php'),
    departmentStats: () => API.get('stats/get-department-stats.php'),
    getSettings:   () => API.get('settings/get-settings.php'),
    updateSettings:(settings) => API.post('settings/update-settings.php', settings),
  };

  window.API = API;

  // ---------- Toast helper (lightweight, used by patches) ----------
  function ensureToastContainer() {
    let c = document.getElementById('cb-toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'cb-toast-container';
      c.style.cssText = 'position:fixed;top:80px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(c);
    }
    return c;
  }
  window.showToast = window.showToast || function (msg, type) {
    type = type || 'info';
    const colors = { success:'#15803d', error:'#dc2626', info:'#1d4ed8', warning:'#ea580c' };
    const c = ensureToastContainer();
    const t = document.createElement('div');
    t.style.cssText = `
      background:${colors[type]||colors.info};color:#fff;padding:12px 18px;border-radius:12px;
      font-family:'Inter',sans-serif;font-size:14px;font-weight:500;
      box-shadow:0 8px 24px rgba(0,0,0,.18);max-width:340px;pointer-events:auto;
      transform:translateX(120%);transition:transform .3s ease;`;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(() => { t.style.transform = 'translateX(0)'; });
    setTimeout(() => {
      t.style.transform = 'translateX(120%)';
      setTimeout(() => t.remove(), 320);
    }, 3200);
  };

  // ---------- Helper to centralize 401 handling ----------
  window.handleApiError = function (err) {
    if (err && err.status === 401) {
      window.showToast('Please sign in to continue.', 'warning');
      if (window.AuthModal && window.AuthModal.open) {
        try { window.AuthModal.open('signin'); } catch (e) {}
      }
      return;
    }
    if (err && err.status === 403 && err.code === 'profile_unverified') {
      window.showToast('Please complete profile verification first.', 'warning');
      return;
    }
    window.showToast((err && err.message) || 'Something went wrong.', 'error');
  };
})();
