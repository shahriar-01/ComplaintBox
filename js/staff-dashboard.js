/* ============================================================
   MOCK DATA STORE
   ============================================================ */
const STAFF_SESSION = {
  id: 'CB-STF-00001',
  fullName: 'Karim Hossain',
  email: 'staff@infra.complaintbox.bd',
  designation: 'Operations Manager',
  department: 'Infrastructure Department',
  departmentId: 1,
  idCardNumber: 'INFRA-MGR-0001',
  district: 'Dhaka',
  ashon: 'Dhaka-09',
  avatar: null
};

let MOCK_COMPLAINTS = [
  {id:1,complaint_id:'CB-2025-00042',subject:'Massive Pothole on Ring Road',description:'A huge pothole has formed on the main ring road near the bus stand. Vehicles are getting damaged daily. Immediate repair is required before someone gets seriously injured.',priority:'critical',status:'in_progress',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Khilgaon',upvote_count:87,comment_count:24,submitted_at:'2025-11-15',map_lat:23.742,map_lng:90.428,assignedStaff:'Rahim Uddin',notes:'Repair crew dispatched on Nov 20.',mediaCount:3,
    statusHistory:[{status:'submitted',date:'2025-11-15',by:'citizen',notes:'Initial report filed.'},{status:'in_review',date:'2025-11-16',by:'staff',notes:'Under assessment by infrastructure team.'},{status:'in_progress',date:'2025-11-20',by:'staff',notes:'Repair crew dispatched.'}]},
  {id:2,complaint_id:'CB-2025-00043',subject:'Broken Street Lights on Main Avenue',description:'Multiple street lamps on the main avenue have been non-functional for three consecutive nights, creating unsafe conditions for commuters and pedestrians after dark.',priority:'high',status:'assigned',category:'electricity',district:'Dhaka',ashon:'Dhaka-10',area:'Gulshan-2',upvote_count:54,comment_count:12,submitted_at:'2025-11-18',map_lat:23.795,map_lng:90.414,assignedStaff:'Nazia Begum',notes:'',mediaCount:2,
    statusHistory:[{status:'submitted',date:'2025-11-18',by:'citizen',notes:''},{status:'assigned',date:'2025-11-19',by:'admin',notes:'Assigned to DESCO team.'}]},
  {id:3,complaint_id:'CB-2025-00044',subject:'Open Sewer Manhole Near School',description:'A manhole cover near the primary school has been missing for a week. Children are at serious risk of falling. Emergency action needed.',priority:'critical',status:'pending',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Mugda',upvote_count:132,comment_count:31,submitted_at:'2025-11-20',map_lat:23.738,map_lng:90.431,assignedStaff:null,notes:'',mediaCount:4,
    statusHistory:[{status:'submitted',date:'2025-11-20',by:'citizen',notes:''},{status:'pending',date:'2025-11-21',by:'admin',notes:'Marked as pending for site inspection.'}]},
  {id:4,complaint_id:'CB-2025-00038',subject:'Road Subsidence Near Market',description:'The road near the central market has started sinking, causing traffic jams and accidents. Engineering assessment needed urgently.',priority:'high',status:'resolved',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Khilgaon',upvote_count:67,comment_count:19,submitted_at:'2025-11-05',map_lat:23.741,map_lng:90.427,assignedStaff:'Rahim Uddin',notes:'Road has been repaired and tested.',mediaCount:3,
    statusHistory:[{status:'submitted',date:'2025-11-05',by:'citizen',notes:''},{status:'in_review',date:'2025-11-06',by:'staff',notes:''},{status:'in_progress',date:'2025-11-10',by:'staff',notes:'Repair work started.'},{status:'resolved',date:'2025-11-15',by:'staff',notes:'Road repaired successfully. Proof uploaded.'}],
    proofImages:['https://via.placeholder.com/300x200/006A4E/FFFFFF?text=Proof+1','https://via.placeholder.com/300x200/83D7B4/FFFFFF?text=Proof+2']},
  {id:5,complaint_id:'CB-2025-00047',subject:'Damaged Bridge Railing',description:'The bridge railing near sector 7 has collapsed. Pedestrians using the bridge are at risk of falling into the water below.',priority:'medium',status:'in_review',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Shobujbagh',upvote_count:29,comment_count:8,submitted_at:'2025-11-22',map_lat:23.744,map_lng:90.432,assignedStaff:'Nazia Begum',notes:'',mediaCount:2,
    statusHistory:[{status:'submitted',date:'2025-11-22',by:'citizen',notes:''},{status:'in_review',date:'2025-11-23',by:'staff',notes:'Under review by field officers.'}]},
  {id:6,complaint_id:'CB-2025-00051',subject:'Footpath Blockage by Construction',description:'Illegal construction materials are blocking the main footpath, forcing pedestrians onto the road.',priority:'medium',status:'pending',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-10',area:'Banani',upvote_count:18,comment_count:5,submitted_at:'2025-11-24',map_lat:23.793,map_lng:90.403,assignedStaff:null,notes:'',mediaCount:1,
    statusHistory:[{status:'submitted',date:'2025-11-24',by:'citizen',notes:''}]},
  {id:7,complaint_id:'CB-2025-00055',subject:'Waterlogging After Rain',description:'The main road floods every time it rains due to blocked drains. Residents cannot leave their homes after heavy rainfall.',priority:'high',status:'in_progress',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Malibagh',upvote_count:95,comment_count:27,submitted_at:'2025-11-25',map_lat:23.745,map_lng:90.426,assignedStaff:'Rahim Uddin',notes:'Drain cleaning in progress.',mediaCount:5,
    statusHistory:[{status:'submitted',date:'2025-11-25',by:'citizen',notes:''},{status:'in_review',date:'2025-11-26',by:'staff',notes:''},{status:'in_progress',date:'2025-11-28',by:'staff',notes:'Drain cleaning team deployed.'}]},
  {id:8,complaint_id:'CB-2025-00058',subject:'Cracked Sidewalk Hazard',description:'Multiple sections of the sidewalk on the university road are severely cracked and pose a tripping hazard especially for elderly pedestrians.',priority:'low',status:'in_review',category:'infrastructure',district:'Dhaka',ashon:'Dhaka-09',area:'Khilgaon',upvote_count:12,comment_count:3,submitted_at:'2025-11-26',map_lat:23.743,map_lng:90.430,assignedStaff:null,notes:'',mediaCount:2,
    statusHistory:[{status:'submitted',date:'2025-11-26',by:'citizen',notes:''},{status:'in_review',date:'2025-11-27',by:'staff',notes:''}]}
];

let MOCK_STAFF = [
  {id:1,staff_uid:'CB-STF-00002',id_card_number:'INFRA-FLD-0001',full_name:'Rahim Uddin',phone:'01712345678',designation:'Field Officer',work_status:'active',district:'Dhaka',ashon:'Dhaka-09',avatar_initials:'RU',handlingComplaints:['CB-2025-00042','CB-2025-00038','CB-2025-00055']},
  {id:2,staff_uid:'CB-STF-00003',id_card_number:'INFRA-FLD-0002',full_name:'Nazia Begum',phone:'01898765432',designation:'Site Inspector',work_status:'active',district:'Dhaka',ashon:'Dhaka-10',avatar_initials:'NB',handlingComplaints:['CB-2025-00043','CB-2025-00047']},
  {id:3,staff_uid:'CB-STF-00004',id_card_number:'INFRA-ENG-0001',full_name:'Samiul Haque',phone:'01555123456',designation:'Civil Engineer',work_status:'on_leave',district:'Dhaka',ashon:'Dhaka-09',avatar_initials:'SH',handlingComplaints:[]},
  {id:4,staff_uid:'CB-STF-00005',id_card_number:'INFRA-FLD-0003',full_name:'Fatema Khanam',phone:'01311234567',designation:'Field Officer',work_status:'active',district:'Dhaka',ashon:'Dhaka-11',avatar_initials:'FK',handlingComplaints:['CB-2025-00051']}
];

let MOCK_NOTIFICATIONS = [
  {id:1,title:'Complaint CB-2025-00044 Flagged',message:'Admin has flagged complaint CB-2025-00044 as high priority. Please ensure immediate site inspection and action within 24 hours.',type:'complaint_update',is_read:false,created_at:'2025-11-27 10:30',adminReply:null},
  {id:2,title:'Monthly Performance Report',message:'Your department\'s performance for November 2025 has been reviewed. Resolution rate: 67%. Please maintain the momentum and focus on the pending cases.',type:'admin_message',is_read:false,created_at:'2025-11-26 14:00',adminReply:'Keep up the good work. Aim for 80% resolution rate by month end.'},
  {id:3,title:'System Maintenance Notice',message:'ComplaintBox will undergo scheduled maintenance on November 30, 2025 from 11:00 PM to 1:00 AM. Please plan your work accordingly.',type:'system',is_read:false,created_at:'2025-11-25 09:00',adminReply:null},
  {id:4,title:'New Staff Assignment',message:'Field Officer Rahim Uddin (CB-STF-00002) has been assigned to your team. Please coordinate and distribute active complaints.',type:'admin_message',is_read:true,created_at:'2025-11-22 11:15',adminReply:null},
  {id:5,title:'Complaint Resolved — CB-2025-00038',message:'Complaint CB-2025-00038 (Road Subsidence Near Market) has been marked as resolved. Citizen rating: 5/5. Excellent work!',type:'complaint_update',is_read:true,created_at:'2025-11-15 17:00',adminReply:null}
];

let MOCK_ACTIVITY = [
  {id:1,type:'status_update',action:'Updated status of CB-2025-00055 to In Progress',complaint_id:'CB-2025-00055',created_at:'2025-11-28 14:32',color:'var(--primary)',icon:'update'},
  {id:2,type:'status_update',action:'Updated status of CB-2025-00042 to In Progress',complaint_id:'CB-2025-00042',created_at:'2025-11-27 09:15',color:'var(--primary)',icon:'update'},
  {id:3,type:'report',action:'Submitted report to Admin: Technical Issue with mobile form uploads',complaint_id:null,created_at:'2025-11-26 16:45',color:'var(--secondary)',icon:'flag',isReport:true},
  {id:4,type:'status_update',action:'Updated status of CB-2025-00038 to Resolved with proof',complaint_id:'CB-2025-00038',created_at:'2025-11-25 11:20',color:'var(--status-resolved)',icon:'check_circle'},
  {id:5,type:'assign',action:'Assigned complaint CB-2025-00047 to Nazia Begum',complaint_id:'CB-2025-00047',created_at:'2025-11-24 13:05',color:'var(--status-assigned)',icon:'person_add'},
  {id:6,type:'status_update',action:'Updated status of CB-2025-00043 to In Review',complaint_id:'CB-2025-00043',created_at:'2025-11-23 10:30',color:'var(--status-in-review)',icon:'search'},
  {id:7,type:'report',action:'Submitted report to Admin: Add New Staff Member — Samiul Haque',complaint_id:null,created_at:'2025-11-22 08:15',color:'var(--secondary)',icon:'flag',isReport:true},
  {id:8,type:'status_update',action:'Updated status of CB-2025-00044 to Pending',complaint_id:'CB-2025-00044',created_at:'2025-11-21 15:40',color:'var(--status-pending)',icon:'hourglass_empty'}
];

let currentDetailComplaint = null;
let currentQuickStatusComplaintId = null;
let proofFiles = [];
let reportImages = [];
let recentFilterActive = true;
let reportsFilterActive = false;
let filteredComplaints = [...MOCK_COMPLAINTS];
let filteredLogs = [...MOCK_ACTIVITY];

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  setGreeting();
  renderOverview();
  renderAllComplaints();
  renderStaffTable();
  renderUpdateStatusDropdown();
  renderActivityLog();
  renderNotifications();
  updateNotifBadge();
  checkMaintenance();
  loadStaffLiveData();
});

function checkSession() {
  // Server-side PHP page guard already validates role; nothing else needed here.
}

function getSession() {
  if (window.SESSION_USER && window.SESSION_USER.id) {
    return {
      userId: window.SESSION_USER.uid,
      role:   window.SESSION_USER.role,
      fullName: window.SESSION_USER.name,
      email:  window.SESSION_USER.email,
      departmentId: window.SESSION_USER.departmentId,
    };
  }
  try { return JSON.parse(localStorage.getItem('cb_user')); } catch { return null; }
}

function setGreeting() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
  const session = getSession();
  const name = (session?.fullName || 'Staff').split(' ')[0];
  const el = document.getElementById('overview-greeting');
  if (el) el.textContent = `${greet}, ${name}`;
}

function checkMaintenance() {
  const m = (window.SESSION_USER && window.SESSION_USER.maintenance === '1')
         || (JSON.parse(localStorage.getItem('cb_settings') || '{}').maintenance === '1');
  if (m) {
    const overlay = document.getElementById('maintenance-overlay');
    if (overlay) overlay.classList.add('show');
  }
}

async function loadStaffLiveData() {
  if (!window.API) return;
  const deptId = window.SESSION_USER && window.SESSION_USER.departmentId;
  try {
    const [cmps, staff, notifs, act] = await Promise.all([
      // ⬇ Scope to THIS staff's department only — fixes Issue #4
      window.API.complaints({
        per_page: 200, sort: 'newest',
        department_id: deptId || undefined
      }).catch(()=>null),
      deptId ? window.API.getStaff({ department_id: deptId }).catch(()=>null) : Promise.resolve(null),
      window.API.getNotifications().catch(()=>null),
      window.API.getActivity({ per_page: 50 }).catch(()=>null),
    ]);

    if (cmps && cmps.data && cmps.data.complaints) {
      MOCK_COMPLAINTS = cmps.data.complaints.map(c => {
        // Use both old and new field names so all UI references work.
        return {
          id: c.id, serverId: c.id,
          complaint_id: c.complaint_id,
          subject: c.subject || '', description: c.description || '',
          category: (c.categories || [])[0] || 'others',
          categories: c.categories || [],
          priority: c.priority || 'medium',
          status:   c.status   || 'submitted',
          district: c.district_name || '—',
          ashon:    c.ashon_code    || '—',
          area:     c.area_name     || '—',
          location: [c.area_name, c.district_name].filter(Boolean).join(', '),
          // Provide BOTH naming styles — older renderer reads .upvote_count etc.
          upvotes:       c.upvote_count  || 0,
          comments:      c.comment_count || 0,
          upvote_count:  c.upvote_count  || 0,
          comment_count: c.comment_count || 0,
          mediaCount:    c.media_count   || (c.first_image_url ? 1 : 0),
          submitted_at:  c.submitted_at,
          map_lat:       c.map_lat,
          map_lng:       c.map_lng,
          statusHistory: [],
          media: c.first_image_url ? [{ url: c.first_image_url, type: 'image' }] : [],
          proofImages: [],            // populated on detail open
          first_image_url: c.first_image_url,
          assignedStaff: c.assigned_staff_name || null,
          assignedStaffId: c.assigned_staff_id || null,
          assignedStaffIds: c.assigned_staff_id ? [c.assigned_staff_id] : [],
          rating:       c.rating || null,
          notes:        '',
        };
      });
    }
    if (staff && staff.data && staff.data.staff) {
      MOCK_STAFF = staff.data.staff.map(s => {
        const fn = s.full_name || 'Staff';
        const initials = fn.split(' ').filter(Boolean).map(w => w[0]).slice(0,2).join('').toUpperCase() || 'S';
        // Build handlingComplaints from the loaded MOCK_COMPLAINTS, matching
        // their assigned department to this dept. We approximate "in progress"
        // by listing all complaints with status in (assigned, in_progress, in_review).
        const handling = MOCK_COMPLAINTS
          .filter(c => c.assignedStaff === fn ||
                       c.assignedStaff === s.full_name ||
                       (Array.isArray(c.assignedStaffIds) && c.assignedStaffIds.includes(s.id)))
          .map(c => c.complaint_id);
        return {
          id: s.id, serverId: s.id,
          staff_uid: s.staff_uid || '',
          full_name: fn,
          id_card_number: s.id_card_number || '',
          email: s.email || '',
          phone: s.phone || '',
          nid_number: s.nid_number || '—',
          designation: s.designation || '—',
          department_id: s.department_id,
          department_name: s.department_name || '',
          district: s.district_name || s.district || '—',
          ashon:    s.ashon_code    || s.ashon    || '—',
          work_status: s.work_status,
          joined_date: s.joined_date,
          avatar_initials: initials,
          // Real count from server, plus a stub array for the table chips
          complaints_handled:  s.complaints_handled  || 0,
          complaints_resolved: s.complaints_resolved || 0,
          handlingComplaints: handling,
        };
      });
    }
    if (notifs && notifs.data && notifs.data.notifications) {
      MOCK_NOTIFICATIONS = notifs.data.notifications.map(n => ({
        id: n.id, type: n.type, title: n.title, message: n.message,
        complaint_id: '', created_at: n.created_at, read: !!n.is_read,
      }));
    }
    if (act && act.data && act.data.activity) {
      MOCK_ACTIVITY = act.data.activity.map(a => ({
        id: a.id, type: 'status_update', action: a.action,
        complaint_id: a.related_complaint_id, created_at: a.created_at,
        color: 'var(--primary)', icon: 'history',
      }));
    }

    // After live data loads, recompute filteredComplaints from the new MOCK_COMPLAINTS
    // (the file-load default reference is stale).
    filteredComplaints = [...MOCK_COMPLAINTS];
    filteredLogs       = [...MOCK_ACTIVITY];

    ['renderOverview','filterAllComplaints','renderAllComplaints','renderStaffTable',
     'renderUpdateStatusDropdown','renderActivityLog','renderNotifications',
     'updateNotifBadge'].forEach(fn => {
       if (typeof window[fn] === 'function') { try { window[fn](); } catch(e){} }
     });

    // Apply this staff's saved profile photo (from the API) wherever the avatar shows.
    if (window.SESSION_USER && window.SESSION_USER.id) {
      const me = (staff?.data?.staff || []).find(s => s.id === window.SESSION_USER.id);
      const pic = me && me.profile_picture;
      if (pic) {
        const circle = document.getElementById('profile-avatar-circle');
        if (circle) circle.innerHTML = `<img src="${pic}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%"><input type="file" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;border-radius:50%" onchange="handleAvatarUpload(event)">`;
        const sb = document.getElementById('sidebar-avatar');
        if (sb) sb.innerHTML = `<img src="${pic}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
      }
    }
  } catch (e) { console.warn('staff live load failed', e); }
}

/* ============================================================
   SECTION SWITCHING
   ============================================================ */
function switchSection(sectionId, clickedBtn) {
  document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + sectionId)?.classList.add('active');

  // Sidebar nav
  document.querySelectorAll('.sidebar .nav-item').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.sidebar .nav-item[data-section="${sectionId}"]`)?.classList.add('active');

  if (sectionId === 'notifications') markNotifsAsLoaded();
}

function updateMobileNav(item) {
  document.querySelectorAll('.mobile-nav-item').forEach(b => b.classList.remove('active'));
  item.classList.add('active');
}

/* ============================================================
   OVERVIEW
   ============================================================ */
function renderOverview() {
  const assigned = MOCK_COMPLAINTS.length;
  const pending = MOCK_COMPLAINTS.filter(c => c.status === 'pending').length;
  const inprogress = MOCK_COMPLAINTS.filter(c => c.status === 'in_progress').length;
  const resolved = MOCK_COMPLAINTS.filter(c => c.status === 'resolved').length;

  document.getElementById('stat-assigned').textContent = assigned;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-inprogress').textContent = inprogress;
  document.getElementById('stat-resolved').textContent = resolved;

  // Average citizen rating across this department's resolved+rated complaints
  const rated = MOCK_COMPLAINTS.filter(c => c.rating && c.rating > 0);
  const avgEl   = document.getElementById('stat-avg-rating');
  const avgCnt  = document.getElementById('stat-avg-rating-count');
  if (avgEl) {
    if (rated.length) {
      const avg = rated.reduce((s, c) => s + c.rating, 0) / rated.length;
      avgEl.textContent = avg.toFixed(1) + ' / 5';
      if (avgCnt) avgCnt.textContent = `(${rated.length} rated)`;
    } else {
      avgEl.textContent = '—';
      if (avgCnt) avgCnt.textContent = '(no ratings yet)';
    }
  }

  renderOverviewComplaints();
  renderOverviewStaff();
}

function renderOverviewComplaints() {
  const container = document.getElementById('overview-complaints-list');
  const recent = MOCK_COMPLAINTS.slice(0, 6);
  container.innerHTML = recent.map(c => `
    <div class="complaint-row" onclick="openComplaintDetail(${c.id})">
      <div class="complaint-row-priority" style="background:${getPriorityColor(c.priority)}"></div>
      <div class="complaint-row-info">
        <div class="complaint-row-id">${c.complaint_id}</div>
        <div class="complaint-row-title">${c.subject}</div>
        <div class="complaint-row-meta">${formatDate(c.submitted_at)} • ${c.area}</div>
      </div>
      <div class="complaint-row-actions">
        ${getStatusPill(c.status)}
        <button class="btn-primary btn-sm" onclick="event.stopPropagation();openQuickStatus('${c.complaint_id}')">
          Update
        </button>
      </div>
    </div>
  `).join('');
}

function renderOverviewStaff() {
  const container = document.getElementById('overview-staff-list');
  container.innerHTML = MOCK_STAFF.map(s => `
    <div class="staff-card" onclick="openStaffDetail(${s.id})">
      <div class="staff-card-avatar">${s.avatar_initials}</div>
      <div class="staff-card-info">
        <div class="staff-card-name">${s.full_name}</div>
        <div class="staff-card-id">${s.id_card_number}</div>
        <div class="staff-card-designation">${s.designation}</div>
      </div>
      <div>
        <span class="work-status-badge ${s.work_status === 'active' ? 'ws-active' : 'ws-leave'}">${s.work_status === 'active' ? 'Active' : 'On Leave'}</span>
        <div style="font-size:11px;color:var(--on-surface-variant);margin-top:4px">${s.complaints_handled || s.handlingComplaints.length || 0} cases</div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   ALL COMPLAINTS
   ============================================================ */
function renderAllComplaints() {
  const tbody = document.getElementById('all-complaints-tbody');
  tbody.innerHTML = filteredComplaints.map(c => `
    <tr style="cursor:pointer" onclick="openComplaintDetail(${c.id})">
      <td><span class="mono">${c.complaint_id}</span></td>
      <td>${getCategoryPill(c.category)}</td>
      <td>${getPriorityPill(c.priority)}</td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500">${c.subject}</td>
      <td style="font-size:12px;color:var(--on-surface-variant)">${c.area}, ${c.district}</td>
      <td>
        <select class="inline-status-select" onclick="event.stopPropagation()" onchange="handleInlineStatusChange(event,'${c.complaint_id}',${c.id})">
          ${['pending','in_review','assigned','in_progress','resolved'].map(s => `<option value="${s}" ${c.status===s?'selected':''}>${formatStatus(s)}</option>`).join('')}
        </select>
      </td>
      <td style="text-align:center">
        <span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600">
          <span class="material-symbols-outlined" style="font-size:14px;color:var(--primary)">thumb_up</span>${c.upvote_count}
        </span>
      </td>
      <td style="font-size:12px;color:var(--on-surface-variant)">${formatDate(c.submitted_at)}</td>
      <td>
        <div style="display:flex;gap:6px" onclick="event.stopPropagation()">
          <button class="action-icon-btn" title="View Details" onclick="openComplaintDetail(${c.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button class="action-icon-btn" title="Update Status" onclick="openQuickStatus('${c.complaint_id}')">
            <span class="material-symbols-outlined">update</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--on-surface-variant)">No complaints found</td></tr>';

  document.getElementById('ac-count').textContent = `Showing ${filteredComplaints.length} complaint${filteredComplaints.length !== 1 ? 's' : ''}`;
}

function filterAllComplaints() {
  const search   = (document.getElementById('ac-search')?.value || '').toLowerCase();
  const status   = document.getElementById('ac-status')?.value || '';
  const priority = document.getElementById('ac-priority')?.value || '';
  const category = document.getElementById('ac-category')?.value || '';

  filteredComplaints = MOCK_COMPLAINTS.filter(c => {
    const matchSearch = !search || (c.complaint_id||'').toLowerCase().includes(search) || (c.subject||'').toLowerCase().includes(search);
    const matchStatus = !status || c.status === status;
    const matchPriority = !priority || c.priority === priority;
    // Match against ANY of the complaint's categories (some have multiple)
    const cats = Array.isArray(c.categories) && c.categories.length ? c.categories : [c.category || 'others'];
    const matchCategory = !category || cats.includes(category);
    return matchSearch && matchStatus && matchPriority && matchCategory;
  });

  if (recentFilterActive) {
    filteredComplaints.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
  }

  renderAllComplaints();
}

function toggleRecentFilter(btn) {
  recentFilterActive = !recentFilterActive;
  btn.classList.toggle('active', recentFilterActive);
  filterAllComplaints();
}

function resetAllComplaintsFilters() {
  const ids = ['ac-search','ac-status','ac-priority','ac-category'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  recentFilterActive = true;
  filterAllComplaints();
  showToast('info','Filters Reset','All filters cleared.');
}

function markAllSeen() {
  showToast('success', 'Marked as Seen', 'All complaints marked as seen.');
}

function handleInlineStatusChange(event, complaintId, compIndex) {
  const newStatus = event.target.value;
  const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === complaintId);
  if (newStatus === 'resolved') {
    event.target.value = comp?.status || 'pending';
    openUpdateForComplaintById(complaintId, 'resolved');
    showToast('info', 'Resolution Required', 'Please upload proof images to mark as resolved.');
    return;
  }
  if (newStatus === 'assigned') {
    // Don't apply immediately — assigning requires picking a staff member.
    event.target.value = comp?.status || 'pending';
    if (comp) routeToAssignedStaffFor(comp);
    return;
  }
  if (comp) {
    comp.status = newStatus;
    // Persist on the server so the change matches everywhere
    if (window.API && comp.serverId) {
      const fd = new FormData();
      fd.append('complaint_id', comp.serverId);
      fd.append('new_status', newStatus);
      window.API.updateStatus(fd).catch(() => {});
    }
    if (typeof addActivityLog === 'function')
      addActivityLog(`Updated status of ${complaintId} to ${formatStatus(newStatus)}`, complaintId);
    showToast('success', 'Status Updated', `${complaintId} marked as ${formatStatus(newStatus)}.`);
    renderOverview();
    renderAllComplaints();
  }
}

/* When the user picks "assigned" anywhere, send them to the Assigned Staff
   section and pre-open the assign modal for the staff that currently owns
   this complaint (or the first available active staff in the department). */
function routeToAssignedStaffFor(complaint) {
  switchSection('assigned-staff', document.querySelector('[data-section="assigned-staff"]'));
  if (typeof renderStaffTable === 'function') renderStaffTable();
  setTimeout(() => {
    // Prefer the staff who already handles this complaint, else first active staff
    const owner = MOCK_STAFF.find(s => s.id === complaint.assignedStaffId);
    const fallback = MOCK_STAFF.find(s => s.work_status === 'active');
    const target = owner || fallback;
    if (target) {
      openAssignModal(target.id, owner ? 'reassign' : 'assign');
      // Pre-select the complaint
      setTimeout(() => {
        const sel = document.getElementById('assign-complaint-select');
        if (sel) sel.value = String(complaint.id);
      }, 100);
    } else {
      showToast('warning','No staff','No active staff in your department to assign to.');
    }
  }, 200);
}

/* ============================================================
   ASSIGNED STAFF TABLE
   ============================================================ */
function renderStaffTable() {
  const tbody = document.getElementById('staff-table-body');
  const search = document.getElementById('staff-search')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('staff-status-filter')?.value || '';

  let staff = MOCK_STAFF.filter(s => {
    const matchSearch = !search || s.full_name.toLowerCase().includes(search) || s.id_card_number.toLowerCase().includes(search) || s.designation.toLowerCase().includes(search);
    const matchStatus = !statusFilter || s.work_status === statusFilter;
    return matchSearch && matchStatus;
  });

  tbody.innerHTML = staff.map(s => `
    <tr>
      <td><span class="mono">${s.id_card_number}</span></td>
      <td style="font-weight:600">${s.full_name}</td>
      <td style="font-size:12px">${s.phone}</td>
      <td><span style="font-size:12px;font-weight:500;color:var(--on-surface-variant)">${s.designation}</span></td>
      <td>
        <select class="inline-status-select" onchange="handleStaffStatusChange(event,${s.id})">
          <option value="active" ${s.work_status==='active'?'selected':''}>Active</option>
          <option value="on_leave" ${s.work_status==='on_leave'?'selected':''}>On Leave</option>
        </select>
      </td>
      <td style="font-size:12px;color:var(--on-surface-variant)">${s.district} / ${s.ashon}</td>
      <td>
        ${s.work_status === 'on_leave' ? '<span style="color:var(--on-surface-variant);font-size:12px">—</span>' :
          s.handlingComplaints.length > 0
            ? `<div class="complaint-ids-cell">${s.handlingComplaints.map(cid => {
                const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === cid);
                return `<span class="complaint-id-chip" onclick="openComplaintDetail(${comp?.id || 0})" style="border-left:3px solid ${comp ? getPriorityColor(comp.priority) : '#ccc'}">${cid}</span>`;
              }).join('')}</div>`
            : '<span style="color:var(--on-surface-variant);font-size:12px">No active cases</span>'
        }
      </td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="action-icon-btn" title="View Details" onclick="openStaffDetail(${s.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button class="action-icon-btn" title="Assign Complaint" onclick="openAssignModal(${s.id},'assign')">
            <span class="material-symbols-outlined">assignment_ind</span>
          </button>
          <button class="action-icon-btn" title="Reassign" onclick="openAssignModal(${s.id},'reassign')">
            <span class="material-symbols-outlined">swap_horiz</span>
          </button>
          <button class="action-icon-btn danger" title="Remove Assignment" onclick="openRemoveModal(${s.id})">
            <span class="material-symbols-outlined">person_remove</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--on-surface-variant)">No staff found</td></tr>';
}

function filterStaff() { renderStaffTable(); }

function handleStaffStatusChange(event, staffId) {
  const s = MOCK_STAFF.find(s => s.id === staffId);
  if (s) {
    s.work_status = event.target.value;
    showToast('success', 'Status Updated', `${s.full_name}'s status changed to ${event.target.value === 'active' ? 'Active' : 'On Leave'}.`);
    renderStaffTable();
  }
}

function openStaffDetail(staffId) {
  const s = MOCK_STAFF.find(x => x.id === staffId);
  if (!s) return;
  const safe = v => (v === null || v === undefined || v === '') ? '—' : v;
  const body = document.getElementById('staff-detail-body');
  body.innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:16px;background:var(--surface-container-low);border-radius:14px">
      <div style="width:64px;height:64px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:22px">${s.avatar_initials || 'S'}</div>
      <div>
        <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:700">${safe(s.full_name)}</div>
        <div style="font-size:13px;color:var(--on-surface-variant)">${safe(s.designation)}</div>
        <div style="font-family:monospace;font-size:11px;color:var(--on-surface-variant)">${safe(s.staff_uid)} · ${safe(s.id_card_number)}</div>
        <div style="margin-top:6px"><span class="work-status-badge ${s.work_status === 'active' ? 'ws-active' : 'ws-leave'}">${s.work_status === 'active' ? 'Active' : 'On Leave'}</span></div>
      </div>
    </div>
    <div class="form-row" style="margin-bottom:16px">
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">Phone</div><div style="font-size:14px;font-weight:500">${safe(s.phone)}</div></div>
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">Email</div><div style="font-size:14px;font-weight:500">${safe(s.email)}</div></div>
    </div>
    <div class="form-row" style="margin-bottom:16px">
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">District</div><div style="font-size:14px;font-weight:500">${safe(s.district)}</div></div>
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">Ashon No.</div><div style="font-size:14px;font-weight:500">${safe(s.ashon)}</div></div>
    </div>
    <div class="form-row" style="margin-bottom:16px">
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">NID Number</div><div style="font-size:14px;font-weight:500;font-family:monospace">${safe(s.nid_number)}</div></div>
      <div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--on-surface-variant);margin-bottom:4px">Complaints Handled</div><div style="font-size:14px;font-weight:700">${s.complaints_handled || 0} <span style="font-weight:400;color:var(--on-surface-variant);font-size:12px">(resolved: ${s.complaints_resolved || 0})</span></div></div>
    </div>
    <div class="detail-section-title">Currently Assigned Complaints</div>
    ${s.handlingComplaints && s.handlingComplaints.length > 0
      ? s.handlingComplaints.map(cid => {
          const c = MOCK_COMPLAINTS.find(x => x.complaint_id === cid);
          if (!c) return '';
          return `<div class="complaint-row" onclick="closeModal('staff-detail-modal');openComplaintDetail(${c.id})">
            <div class="complaint-row-priority" style="background:${getPriorityColor(c.priority)}"></div>
            <div class="complaint-row-info">
              <div class="complaint-row-id">${c.complaint_id}</div>
              <div class="complaint-row-title">${c.subject || ''}</div>
              <div class="complaint-row-meta">${c.area || '—'} · ${c.submitted_at ? formatDate(c.submitted_at) : ''}</div>
            </div>
            ${getStatusPill(c.status)}
          </div>`;
        }).join('')
      : '<p style="color:var(--on-surface-variant);font-size:13px;text-align:center;padding:20px">No active complaints assigned</p>'
    }
  `;
  openModal('staff-detail-modal');
}

/* ============================================================
   ASSIGN / REASSIGN / REMOVE — full client-side state sync
   ============================================================
   IMPORTANT: every action updates BOTH the server (API) and the local
   MOCK_STAFF + MOCK_COMPLAINTS arrays so the Handling Now column,
   the status pills, and the cards all stay in sync without a reload. */

let _assignCtx = { staffId: null, type: 'assign' };

function openAssignModal(staffId, type) {
  _assignCtx = { staffId, type };
  const targetStaff = MOCK_STAFF.find(s => s.id === staffId);

  document.getElementById('assign-modal-title').textContent =
    type === 'assign' ? `Assign Complaint to ${targetStaff?.full_name || 'Staff'}` : 'Reassign Complaint';
  const hint = document.getElementById('assign-complaint-hint');
  if (hint) {
    hint.textContent = type === 'assign'
      ? `The complaint will be assigned to ${targetStaff?.full_name || 'this staff member'}.`
      : `Pick one of ${targetStaff?.full_name || 'this staff member'}'s complaints and a new owner.`;
  }

  // Complaint list:
  //  - "assign":   show all dept complaints EXCEPT the ones already owned by this target
  //                (so the action always changes something). Picking one owned by
  //                someone else is a transfer.
  //  - "reassign": show ONLY this staff's currently-handled complaints
  const cmpSel = document.getElementById('assign-complaint-select');
  const pool = (type === 'reassign')
    ? MOCK_COMPLAINTS.filter(c => (targetStaff?.handlingComplaints || []).includes(c.complaint_id))
    : MOCK_COMPLAINTS.filter(c => c.assignedStaffId !== staffId);
  cmpSel.innerHTML = '<option value="">Select a complaint...</option>' +
    pool.map(c => {
      const owner = c.assignedStaff ? ` (currently: ${c.assignedStaff})` : '';
      return `<option value="${c.id}">${c.complaint_id} — ${(c.subject||'').substring(0,40)}${owner}</option>`;
    }).join('');

  // Staff dropdown:
  //  - "assign":   hidden — target is already known
  //  - "reassign": shows OTHER active staff in same department
  const staffField = document.getElementById('assign-staff-field');
  const staffSel   = document.getElementById('assign-to-staff');
  const staffLabel = document.getElementById('assign-staff-label');
  if (type === 'reassign') {
    staffField.style.display = 'block';
    if (staffLabel) staffLabel.textContent = 'Reassign To Staff Member';
    staffSel.innerHTML = '<option value="">Select staff member...</option>' +
      MOCK_STAFF.filter(s => s.id !== staffId && s.work_status === 'active')
        .map(s => `<option value="${s.id}">${s.full_name} — ${s.designation}</option>`).join('');
  } else {
    staffField.style.display = 'none';
  }
  openModal('assign-modal');
}

function openRemoveModal(staffId) {
  const s = MOCK_STAFF.find(x => x.id === staffId);
  if (!s) return;
  _assignCtx = { staffId, type: 'remove' };
  document.getElementById('remove-modal-staff-line').textContent =
    `${s.full_name} — ${s.designation} (${(s.handlingComplaints||[]).length} active)`;
  const sel = document.getElementById('remove-complaint-select');
  const handled = (s.handlingComplaints || []).map(cid => MOCK_COMPLAINTS.find(c => c.complaint_id === cid)).filter(Boolean);
  sel.innerHTML = '<option value="">Select a complaint...</option>' +
    handled.map(c => `<option value="${c.id}">${c.complaint_id} — ${(c.subject||'').substring(0,40)}</option>`).join('');
  document.getElementById('remove-all-toggle').checked = false;
  openModal('remove-modal');
}

function confirmRemoveAssignment() {
  const { staffId } = _assignCtx;
  const s = MOCK_STAFF.find(x => x.id === staffId);
  if (!s) return;
  const all = document.getElementById('remove-all-toggle').checked;
  const selected = document.getElementById('remove-complaint-select').value;
  if (!all && !selected) { showToast('error','Pick one','Choose a complaint or check "Remove all".'); return; }

  // Build the list of complaint server-ids we need to unassign on the server
  const toRemove = all
    ? (s.handlingComplaints || []).map(cid => MOCK_COMPLAINTS.find(c => c.complaint_id === cid)).filter(Boolean)
    : [MOCK_COMPLAINTS.find(c => String(c.id) === String(selected))].filter(Boolean);

  if (toRemove.length === 0) { closeModal('remove-modal'); return; }

  const apply = () => {
    toRemove.forEach(c => {
      // Local sync: clear assignment + drop from staff.handlingComplaints
      c.assignedStaff       = null;
      c.assignedStaffId     = null;
      c.assignedStaffIds    = [];
      s.handlingComplaints  = (s.handlingComplaints || []).filter(cid => cid !== c.complaint_id);
      // Optional: drop the status back to "in_review" if it was 'assigned'
      if (c.status === 'assigned') c.status = 'in_review';
      if (typeof addActivityLog === 'function')
        addActivityLog(`Removed ${c.complaint_id} from ${s.full_name}`, c.complaint_id);
    });
    closeModal('remove-modal');
    showToast('success','Removed', `${toRemove.length} complaint${toRemove.length>1?'s':''} unassigned from ${s.full_name}.`);
    renderStaffTable();
    if (typeof renderOverview === 'function') renderOverview();
    if (typeof renderAllComplaints === 'function') renderAllComplaints();
  };

  if (window.API) {
    Promise.all(toRemove.map(c => window.API.removeAssignment(c.serverId || c.id).catch(() => null)))
      .then(apply);
  } else apply();
}

function confirmAssign() {
  const { staffId, type } = _assignCtx;
  const complaintId = document.getElementById('assign-complaint-select').value;
  // For "assign" the destination is the row's staff; for "reassign" the user picks.
  const destStaffId = (type === 'reassign')
    ? parseInt(document.getElementById('assign-to-staff').value)
    : staffId;

  if (!complaintId)  { showToast('error','Pick a complaint','Please select a complaint.'); return; }
  if (!destStaffId)  { showToast('error','Pick a staff','Please select a staff member.'); return; }

  const comp     = MOCK_COMPLAINTS.find(c => String(c.id) === String(complaintId));
  const destStaff= MOCK_STAFF.find(s => s.id === destStaffId);
  if (!comp || !destStaff) return;

  const apply = () => {
    // === Local state sync ===
    // 1) Drop this complaint from whoever was holding it before
    MOCK_STAFF.forEach(s => {
      s.handlingComplaints = (s.handlingComplaints || []).filter(cid => cid !== comp.complaint_id);
    });
    // 2) Add to new staff's Handling Now
    destStaff.handlingComplaints = destStaff.handlingComplaints || [];
    if (!destStaff.handlingComplaints.includes(comp.complaint_id))
      destStaff.handlingComplaints.push(comp.complaint_id);
    // 3) Stamp the complaint with the new owner + bump status
    comp.assignedStaff    = destStaff.full_name;
    comp.assignedStaffId  = destStaff.id;
    comp.assignedStaffIds = [destStaff.id];
    if (['submitted','pending','in_review'].includes(comp.status)) comp.status = 'assigned';

    if (typeof addActivityLog === 'function')
      addActivityLog(
        type === 'reassign'
          ? `Reassigned ${comp.complaint_id} to ${destStaff.full_name}`
          : `Assigned ${comp.complaint_id} to ${destStaff.full_name}`,
        comp.complaint_id
      );

    closeModal('assign-modal');
    showToast('success', type === 'reassign' ? 'Reassigned' : 'Assigned',
      `${comp.complaint_id} → ${destStaff.full_name}`);

    // Re-render every surface that shows assignment / status
    renderStaffTable();
    if (typeof renderOverview === 'function') renderOverview();
    if (typeof renderAllComplaints === 'function') renderAllComplaints();
  };

  if (window.API) {
    window.API.assignComplaint(comp.serverId || comp.id, destStaffId)
      .then(apply)
      .catch(err => showToast('error','Failed', err.message || 'Could not assign.'));
  } else apply();
}

/* ============================================================
   UPDATE STATUS SECTION
   ============================================================ */
function renderUpdateStatusDropdown() {
  const sel = document.getElementById('us-complaint-select');
  sel.innerHTML = '<option value="">-- Search or select a complaint --</option>' +
    MOCK_COMPLAINTS.map(c => `<option value="${c.id}">${c.complaint_id} — ${c.subject.substring(0,50)}</option>`).join('');
}

function loadComplaintPreview() {
  const id = document.getElementById('us-complaint-select').value;
  const preview = document.getElementById('us-complaint-preview');
  if (!id) { preview.style.display = 'none'; return; }
  const c = MOCK_COMPLAINTS.find(c => c.id == id);
  if (!c) return;
  document.getElementById('us-preview-id').textContent = c.complaint_id;
  document.getElementById('us-preview-title').textContent = c.subject;
  document.getElementById('us-preview-meta').innerHTML = `${getCategoryPill(c.category)} ${getPriorityPill(c.priority)} <span style="font-size:12px;color:var(--on-surface-variant)">${c.area}, ${c.district}</span>`;
  document.getElementById('us-current-status').innerHTML = getStatusPill(c.status);
  document.getElementById('us-new-status').value = '';
  document.getElementById('us-proof-section').style.display = 'none';
  document.getElementById('us-notes').value = '';
  proofFiles = [];
  document.getElementById('us-proof-thumbnails').innerHTML = '';
  preview.style.display = 'block';
}

function handleStatusChange() {
  const statusSel = document.getElementById('us-new-status');
  const status = statusSel.value;
  document.getElementById('us-proof-section').style.display = status === 'resolved' ? 'block' : 'none';
  document.getElementById('us-proof-error').style.display = 'none';

  // "Assigned" is not a status the staff can just toggle — it must come from
  // assigning a specific staff member to the complaint. Bounce the user into
  // the Assigned Staff section with the assign-modal pre-opened for this
  // complaint.
  if (status === 'assigned') {
    const id = document.getElementById('us-complaint-select').value;
    const comp = MOCK_COMPLAINTS.find(c => c.id == id);
    // Reset the dropdown so it doesn't look like we applied the change
    statusSel.value = '';
    document.getElementById('us-proof-section').style.display = 'none';
    if (!comp) {
      showToast('warning', 'Pick a complaint first', 'Please select a complaint above before choosing "Assigned".');
      return;
    }
    showToast('info', 'Pick a Staff Member', `Assigning ${comp.complaint_id} — choose the staff member who will handle it.`);
    if (typeof routeToAssignedStaffFor === 'function') {
      routeToAssignedStaffFor(comp);
    } else {
      switchSection('assigned-staff', document.querySelector('[data-section="assigned-staff"]'));
    }
  }
}

function handleProofUpload(event) {
  const files = Array.from(event.target.files);
  proofFiles = [...proofFiles, ...files].slice(0, 10);
  renderProofThumbnails();
}

function renderProofThumbnails() {
  const container = document.getElementById('us-proof-thumbnails');
  container.innerHTML = proofFiles.map((f, i) => {
    const url = URL.createObjectURL(f);
    return `<div class="upload-thumb">
      <img src="${url}" alt="proof">
      <button class="remove-thumb" onclick="removeProof(${i})"><span class="material-symbols-outlined" style="font-size:12px">close</span></button>
    </div>`;
  }).join('');
}

function removeProof(index) {
  proofFiles.splice(index, 1);
  renderProofThumbnails();
}

function submitStatusUpdate() {
  const id = document.getElementById('us-complaint-select').value;
  const newStatus = document.getElementById('us-new-status').value;
  const notes = document.getElementById('us-notes').value;

  if (!id) { showToast('error', 'Error', 'Please select a complaint.'); return; }
  if (!newStatus) { showToast('error', 'Error', 'Please select a new status.'); return; }
  if (newStatus === 'resolved' && proofFiles.length === 0) {
    document.getElementById('us-proof-error').style.display = 'flex';
    return;
  }

  const comp = MOCK_COMPLAINTS.find(c => c.id == id);
  if (!comp) return;

  const applyLocal = () => {
    comp.status = newStatus;
    comp.statusHistory = comp.statusHistory || [];
    comp.statusHistory.push({ status: newStatus, date: new Date().toISOString().split('T')[0], by: 'staff', notes: notes });
    if (notes) comp.notes = notes;
    if (newStatus === 'resolved') comp.proofImages = proofFiles.map(f => URL.createObjectURL(f));
    if (typeof addActivityLog === 'function')
      addActivityLog(`Updated status of ${comp.complaint_id} to ${formatStatus(newStatus)}${notes ? ' with notes' : ''}`, comp.complaint_id);
    if (typeof addNotificationToMock === 'function')
      addNotificationToMock(comp, newStatus, notes);
    showToast('success', 'Status Updated!', `${comp.complaint_id} is now ${formatStatus(newStatus)}.`);
    renderOverview();
    renderAllComplaints();
    document.getElementById('us-complaint-select').value = '';
    document.getElementById('us-complaint-preview').style.display = 'none';
    proofFiles = [];
  };

  if (window.API) {
    const fd = new FormData();
    fd.append('complaint_id', comp.serverId || comp.id);
    fd.append('new_status', newStatus);
    if (notes) fd.append('notes', notes);
    if (newStatus === 'resolved') proofFiles.forEach(f => fd.append('proof[]', f));
    window.API.updateStatus(fd)
      .then(applyLocal)
      .catch(err => showToast('error', 'Update failed', err.message || 'Could not update status.'));
  } else {
    applyLocal();
  }
}

function openUpdateForComplaint(comp, prefilledStatus) {
  if (!comp) return;
  switchSection('update-status', document.querySelector('[data-section="update-status"]'));
  document.getElementById('us-complaint-select').value = comp.id;
  loadComplaintPreview();
  // After loadComplaintPreview clears the new-status field, pre-fill it if asked.
  if (prefilledStatus) {
    setTimeout(() => {
      const sel = document.getElementById('us-new-status');
      if (sel) {
        sel.value = prefilledStatus;
        handleStatusChange();   // toggles the proof-upload section into view
        if (prefilledStatus === 'resolved') {
          // Scroll the proof section into view so the user knows what to do next.
          const proofSec = document.getElementById('us-proof-section');
          if (proofSec) proofSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 30);
  }
  closeModal('complaint-detail-modal');
}

function openUpdateForComplaintById(complaintId, prefilledStatus) {
  const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === complaintId);
  if (comp) openUpdateForComplaint(comp, prefilledStatus);
}

/* ============================================================
   QUICK STATUS MODAL
   ============================================================ */
function openQuickStatus(complaintId) {
  currentQuickStatusComplaintId = complaintId;
  const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === complaintId);
  document.getElementById('qs-complaint-id').textContent = complaintId;
  const sel = document.getElementById('qs-status');
  if (sel) {
    sel.value = comp?.status || 'in_review';
    // Wire up the auto-redirect-on-special-status behavior just once.
    if (!sel._cbBound) {
      sel.addEventListener('change', () => {
        const cmp = MOCK_COMPLAINTS.find(c => c.complaint_id === currentQuickStatusComplaintId);
        if (sel.value === 'resolved') {
          closeModal('quick-status-modal');
          // Jump to the full Update Status form with the complaint + status pre-selected
          openUpdateForComplaintById(currentQuickStatusComplaintId, 'resolved');
          showToast('info', 'Upload Proof', 'Please upload proof images to resolve this complaint.');
        } else if (sel.value === 'assigned' && cmp) {
          closeModal('quick-status-modal');
          routeToAssignedStaffFor(cmp);
        }
      });
      sel._cbBound = true;
    }
  }
  document.getElementById('qs-notes').value = '';
  openModal('quick-status-modal');
}

function saveQuickStatus() {
  const newStatus = document.getElementById('qs-status').value;
  const notes = document.getElementById('qs-notes').value;
  const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === currentQuickStatusComplaintId);

  if (newStatus === 'resolved') {
    closeModal('quick-status-modal');
    // Take the user to Update Status with the complaint AND "Resolved" pre-selected
    openUpdateForComplaintById(currentQuickStatusComplaintId, 'resolved');
    showToast('info', 'Upload Proof', 'Please upload proof images to resolve this complaint.');
    return;
  }
  if (!comp) { closeModal('quick-status-modal'); return; }

  const applyLocal = () => {
    comp.status = newStatus;
    comp.statusHistory = comp.statusHistory || [];
    comp.statusHistory.push({ status: newStatus, date: new Date().toISOString().split('T')[0], by: 'staff', notes });
    if (typeof addActivityLog === 'function') addActivityLog(`Updated status of ${comp.complaint_id} to ${formatStatus(newStatus)}`, comp.complaint_id);
    if (typeof addNotificationToMock === 'function') addNotificationToMock(comp, newStatus, notes);
    showToast('success', 'Updated!', `${comp.complaint_id} → ${formatStatus(newStatus)}`);
    renderOverview();
    renderAllComplaints();
  };

  if (window.API) {
    const fd = new FormData();
    fd.append('complaint_id', comp.serverId || comp.id);
    fd.append('new_status', newStatus);
    if (notes) fd.append('notes', notes);
    window.API.updateStatus(fd)
      .then(applyLocal)
      .catch(err => showToast('error', 'Update failed', err.message));
  } else {
    applyLocal();
  }
  closeModal('quick-status-modal');
}

/* ============================================================
   COMPLAINT DETAIL MODAL
   ============================================================ */
function openComplaintDetail(compId) {
  const c = MOCK_COMPLAINTS.find(c => c.id === compId);
  if (!c) return;
  currentDetailComplaint = c;

  // Initial render with whatever we have; refresh from API for full details.
  _renderComplaintDetailBody(c);
  openModal('complaint-detail-modal');
  if (window.API && c.serverId) {
    window.API.complaint(c.serverId).then(res => {
      const d = (res && res.data) || {};
      c.statusHistory = (d.status_history || []).map(h => ({
        status: h.status,
        date:   (h.changed_at || '').replace(' ', 'T'),
        by:     h.changed_by_type,
        notes:  h.notes || '',
      }));
      c.media = (d.citizen_media || []).map(m => ({ url: m.url, type: m.file_type }));
      c.proofImages = (d.proof_media || []).map(m => m.url);
      c.proofMedia  = (d.proof_media || []).map(m => ({ url: m.url, type: m.file_type }));
      c.mediaCount   = c.media.length;
      c.upvote_count = c.upvotes  = d.upvote_count  || 0;
      c.comment_count= c.comments = d.comment_count || 0;
      c.description  = d.description || c.description;
      c.subject      = d.subject     || c.subject;
      c.priority     = d.priority    || c.priority;
      c.status       = d.status      || c.status;
      c.map_lat = d.map_lat; c.map_lng = d.map_lng;
      c.assignedStaff = (d.assignment && d.assignment.staff_name) || null;
      c.assignedStaffDesignation = (d.assignment && d.assignment.designation) || '';
      c.rating = (d.rating && typeof d.rating === 'object') ? (d.rating.rating || null) : (d.rating || null);
      _renderComplaintDetailBody(c);
    }).catch(() => {});
  }
}

function _renderComplaintDetailBody(c) {
  document.getElementById('detail-id-label').textContent    = c.complaint_id || '';
  document.getElementById('detail-title-label').textContent = c.subject || '';

  const statuses = ['submitted','pending','in_review','assigned','in_progress','resolved'];
  const currentIndex = statuses.indexOf(c.status);
  const progress = [10,25,40,55,75,100][currentIndex] || 10;

  const body = document.getElementById('complaint-detail-body');
  const mediaArr = Array.isArray(c.media) ? c.media.filter(m => m && m.url) : [];
  const mediaCount = (typeof c.mediaCount === 'number') ? c.mediaCount : mediaArr.length;
  body.innerHTML = `
    <!-- Media -->
    <div style="width:100%;height:240px;border-radius:14px;background:#000;display:flex;align-items:center;justify-content:center;margin-bottom:16px;position:relative;overflow:hidden">
      ${mediaArr.length
        ? (mediaArr[0].type === 'video'
            ? `<video src="${mediaArr[0].url}" controls style="width:100%;height:100%;object-fit:contain;background:#000"></video>`
            : `<img src="${mediaArr[0].url}" alt="" style="width:100%;height:100%;object-fit:contain;background:#000;cursor:zoom-in" onclick="window.open(this.src,'_blank')" onerror="this.style.display='none';this.parentNode.querySelector('.material-symbols-outlined').style.display='block'">`
          )
        : ''}
      <span class="material-symbols-outlined" style="font-size:56px;color:rgba(255,255,255,0.4);${mediaArr.length?'display:none':'display:block'}">${mediaArr.length ? '' : 'image'}</span>
      <div style="position:absolute;top:10px;right:10px"><span style="font-family:monospace;font-size:10px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:6px">${c.complaint_id || ''}</span></div>
      <div style="position:absolute;bottom:10px;left:10px;font-size:11px;color:rgba(255,255,255,0.85);background:rgba(0,0,0,0.5);padding:3px 8px;border-radius:6px">${mediaCount} media file${mediaCount !== 1 ? 's' : ''} attached</div>
    </div>

    <!-- Meta -->
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap">
      ${getCategoryPill(c.category)}${getPriorityPill(c.priority)}${getStatusPill(c.status)}
    </div>

    <!-- Location + Date -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--on-surface-variant)">
        <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary)">location_on</span>
        ${c.area}, ${c.ashon}, ${c.district}
      </div>
      <div style="font-size:12px;color:var(--on-surface-variant)">${formatDateLong(c.submitted_at)}</div>
    </div>

    <!-- Description -->
    <div class="detail-section">
      <div class="detail-section-title">Description</div>
      <p style="font-size:14px;color:var(--on-surface-variant);line-height:1.7">${c.description}</p>
    </div>

    <!-- Assigned Staff -->
    <div class="detail-section">
      <div class="detail-section-title">Assigned Staff</div>
      ${c.assignedStaff
        ? `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--surface-container-low);border-radius:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--primary-fixed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:var(--primary)">${c.assignedStaff.split(' ').map(w=>w[0]).join('')}</div>
            <div><div style="font-weight:600;font-size:13px">${c.assignedStaff}</div><div style="font-size:11px;color:var(--on-surface-variant)">Infrastructure Department</div></div>
          </div>`
        : '<p style="font-size:13px;color:var(--on-surface-variant);font-style:italic">No staff assigned yet</p>'
      }
    </div>

    <!-- Stats -->
    <div style="display:flex;gap:16px;margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600">
        <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary)">thumb_up</span>${c.upvote_count || c.upvotes || 0} upvotes
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600">
        <span class="material-symbols-outlined" style="font-size:16px;color:var(--status-in-review)">comment</span>${c.comment_count || c.comments || 0} comments
      </div>
    </div>

    <!-- Map (keyless: OpenStreetMap via the keyless google-maps embed) -->
    <div class="detail-section">
      <div class="detail-section-title">Location</div>
      ${c.map_lat && c.map_lng
        ? `<iframe class="detail-map" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=${c.map_lat},${c.map_lng}&z=15&hl=en&output=embed"></iframe>
           <p style="font-size:11px;color:var(--on-surface-variant);margin-top:4px">
             <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle">location_on</span>
             ${c.map_lat}°N, ${c.map_lng}°E
           </p>`
        : `<iframe class="detail-map" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=${encodeURIComponent((c.area||'')+', '+(c.district||'')+', Bangladesh')}&z=13&hl=en&output=embed"></iframe>`
      }
    </div>

    <!-- Progress Timeline -->
    <div class="detail-section">
      <div class="detail-section-title">Progress Timeline</div>
      <div class="timeline">
        ${statuses.map((s, i) => {
          const reached = i <= currentIndex;
          const current = i === currentIndex;
          const histEntry = c.statusHistory?.find(h => h.status === s);
          const cls = reached ? (current ? 'current' : 'completed') : '';
          return `<div class="timeline-item">
            ${i < statuses.length - 1 ? '<div class="timeline-line"></div>' : ''}
            <div class="timeline-dot ${cls}">
              <span class="material-symbols-outlined">${reached ? (current ? 'radio_button_checked' : 'check') : 'radio_button_unchecked'}</span>
            </div>
            <div class="timeline-content">
              <div class="timeline-label ${cls}">${formatStatus(s)}</div>
              ${histEntry ? `<div class="timeline-time">${histEntry.date}</div>` : ''}
              ${histEntry?.notes ? `<div class="timeline-note">${histEntry.notes}</div>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Proof (if resolved) -->
    ${c.status === 'resolved' && c.proofImages?.length ? `
      <div class="detail-section">
        <div class="detail-section-title">Proof of Resolution</div>
        <div class="proof-grid">
          ${c.proofImages.map((img, i) => {
            const pm = (c.proofMedia && c.proofMedia[i]) || { url: img, type: 'image' };
            return pm.type === 'video'
              ? `<div class="proof-item"><video src="${pm.url}" controls style="width:100%;height:100%;object-fit:cover;background:#000"></video></div>`
              : `<div class="proof-item"><img src="${pm.url}" alt="Proof ${i+1}" loading="lazy" style="cursor:zoom-in" onclick="window.open(this.src,'_blank')" onerror="this.style.display='none'"></div>`;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Citizen rating for resolved complaints -->
    ${c.status === 'resolved' ? `
      <div class="detail-section">
        <div class="detail-section-title">Citizen Rating</div>
        ${c.rating ? `
          <div style="display:flex;align-items:center;gap:10px;padding:12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:10px">
            <div style="font-size:22px;letter-spacing:2px;color:#f59e0b">
              ${'★'.repeat(c.rating)}<span style="color:#d1d5db">${'★'.repeat(5 - c.rating)}</span>
            </div>
            <div style="font-size:13px;font-weight:700">${c.rating}/5</div>
            <div style="font-size:11px;color:var(--on-surface-variant);margin-left:auto">Rated by the citizen who filed this complaint</div>
          </div>
        ` : `<p style="font-size:13px;color:var(--on-surface-variant);margin:0">The citizen has not rated this resolution yet.</p>`}
      </div>
    ` : ''}
  `;
}

/* ============================================================
   ACTIVITY LOG
   ============================================================ */
function addActivityLog(action, complaintId) {
  MOCK_ACTIVITY.unshift({
    id: MOCK_ACTIVITY.length + 1,
    type: 'status_update',
    action,
    complaint_id: complaintId,
    created_at: new Date().toLocaleString(),
    color: 'var(--primary)',
    icon: 'update'
  });
  renderActivityLog();
}

function renderActivityLog() {
  const container = document.getElementById('activity-log-list');
  const search = document.getElementById('log-search')?.value.toLowerCase() || '';
  const dateFilter = document.getElementById('log-date')?.value || '';
  const sort = document.getElementById('log-sort')?.value || 'newest';

  let logs = [...MOCK_ACTIVITY];

  if (reportsFilterActive) logs = logs.filter(l => l.isReport);
  if (search) logs = logs.filter(l => l.action.toLowerCase().includes(search) || (l.complaint_id && l.complaint_id.toLowerCase().includes(search)));
  if (dateFilter) logs = logs.filter(l => l.created_at.includes(dateFilter));
  if (sort === 'oldest') logs.reverse();

  if (logs.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:32px;color:var(--on-surface-variant)">No activity found</p>';
    return;
  }

  container.innerHTML = logs.map(log => `
    <div class="log-card" style="border-left-color:${log.color}" onclick="${log.isReport ? '' : `log.complaint_id && openComplaintDetailById('${log.complaint_id}')`}">
      <div class="log-icon" style="background:${log.color}20">
        <span class="material-symbols-outlined" style="color:${log.color}">${log.icon}</span>
      </div>
      <div class="log-info">
        <div class="log-action">${log.action}${log.complaint_id ? ` — <span class="log-id" onclick="event.stopPropagation();openComplaintDetailById('${log.complaint_id}')">${log.complaint_id}</span>` : ''}</div>
        <div class="log-time">${log.created_at}</div>
      </div>
      ${log.isReport ? '<span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:9999px;background:rgba(244,42,65,0.1);color:var(--secondary)">REPORT</span>' : ''}
    </div>
  `).join('');
}

function openComplaintDetailById(complaintId) {
  const comp = MOCK_COMPLAINTS.find(c => c.complaint_id === complaintId);
  if (comp) openComplaintDetail(comp.id);
}

function filterLogs() { renderActivityLog(); }
function toggleReportsFilter(btn) {
  reportsFilterActive = !reportsFilterActive;
  btn.classList.toggle('active', reportsFilterActive);
  renderActivityLog();
}
function resetLogFilters() {
  document.getElementById('log-search').value = '';
  document.getElementById('log-date').value = '';
  document.getElementById('log-sort').value = 'newest';
  reportsFilterActive = false;
  document.getElementById('reports-filter-btn').classList.remove('active');
  renderActivityLog();
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function renderNotifications() {
  const container = document.getElementById('notifications-list');
  container.innerHTML = MOCK_NOTIFICATIONS.map(n => `
    <div class="notif-card ${n.is_read ? '' : 'unread'}" onclick="openNotifDetail(${n.id})">
      <div class="notif-icon" style="background:${getNotifColor(n.type)}20">
        <span class="material-symbols-outlined" style="color:${getNotifColor(n.type)}">${getNotifIcon(n.type)}</span>
      </div>
      <div class="notif-content">
        <div class="notif-title">
          ${n.title}
          <span class="updates-tag">Update</span>
          ${!n.is_read ? '<div style="width:8px;height:8px;border-radius:50%;background:var(--secondary);flex-shrink:0"></div>' : ''}
        </div>
        <div class="notif-msg">${n.message}</div>
        <div class="notif-time">${n.created_at}</div>
      </div>
    </div>
  `).join('');
}

function openNotifDetail(notifId) {
  const n = MOCK_NOTIFICATIONS.find(n => n.id === notifId);
  if (!n) return;
  n.is_read = true;
  updateNotifBadge();
  renderNotifications();

  document.getElementById('notif-detail-title').textContent = n.title;
  document.getElementById('notif-detail-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
      <span style="font-size:12px;color:var(--on-surface-variant)">${n.created_at}</span>
      <span class="updates-tag">Update</span>
    </div>
    <p style="font-size:14px;color:var(--on-surface-variant);line-height:1.7;margin-bottom:16px">${n.message}</p>
    ${n.adminReply ? `
      <div style="background:rgba(0,106,78,0.06);border-radius:12px;padding:14px;border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700">A</div>
          <div style="font-size:12px;font-weight:700;color:var(--primary)">Reply from Admin</div>
        </div>
        <p style="font-size:13px;color:var(--on-surface);line-height:1.6">${n.adminReply}</p>
      </div>
    ` : ''}
  `;
  openModal('notif-detail-modal');
}

function markAllNotifsRead() {
  MOCK_NOTIFICATIONS.forEach(n => n.is_read = true);
  updateNotifBadge();
  renderNotifications();
  showToast('success', 'Marked as Read', 'All notifications marked as read.');
}

function markNotifsAsLoaded() {
  // Badge clears when section viewed
}

function updateNotifBadge() {
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.is_read).length;
  const badge = document.getElementById('notif-badge');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'inline-flex' : 'none';
  }
}

function addNotificationToMock(comp, status, notes) {
  // Simulate sending notification to citizen
}

function getNotifColor(type) {
  const map = { complaint_update: 'var(--primary)', admin_message: 'var(--status-in-review)', system: 'var(--status-pending)' };
  return map[type] || 'var(--on-surface-variant)';
}
function getNotifIcon(type) {
  const map = { complaint_update: 'assignment', admin_message: 'admin_panel_settings', system: 'settings' };
  return map[type] || 'notifications';
}

/* ============================================================
   REPORT MODAL
   ============================================================ */
function handleReportCategoryChange() {
  const cat = document.getElementById('report-category').value;
  document.getElementById('new-staff-fields').style.display = cat === 'add_new_staff' ? 'block' : 'none';
}

function handleReportImages(event) {
  const files = Array.from(event.target.files).slice(0, 3);
  reportImages = files;
  const container = document.getElementById('report-thumbs');
  container.innerHTML = files.map((f, i) => {
    const url = URL.createObjectURL(f);
    return `<div class="upload-thumb"><img src="${url}" alt="report img"></div>`;
  }).join('');
}

function submitReport() {
  const topic = document.getElementById('report-topic').value.trim();
  const cat = document.getElementById('report-category').value;
  const desc = document.getElementById('report-desc').value.trim();

  if (!topic || !cat || !desc) {
    showToast('error', 'Missing Fields', 'Please fill all required fields.');
    return;
  }

  const finish = () => {
    if (typeof addActivityLog === 'function') addActivityLog(`Submitted report to Admin: ${topic}`, null);
    if (MOCK_ACTIVITY[0]) {
      MOCK_ACTIVITY[0].isReport = true;
      MOCK_ACTIVITY[0].color = 'var(--secondary)';
      MOCK_ACTIVITY[0].icon = 'flag';
    }
    closeModal('report-modal');
    showToast('success', 'Report Submitted', 'Your report has been sent to the admin.');
    document.getElementById('report-topic').value = '';
    document.getElementById('report-category').value = '';
    document.getElementById('report-desc').value = '';
    const nsf = document.getElementById('new-staff-fields');
    if (nsf) nsf.style.display = 'none';
    const rt = document.getElementById('report-thumbs');
    if (rt) rt.innerHTML = '';
    reportImages = [];
  };

  if (window.API) {
    const fd = new FormData();
    fd.append('topic', topic);
    fd.append('category', cat);
    fd.append('description', desc);
    (reportImages || []).forEach(f => fd.append('images[]', f));
    window.API.submitReport(fd)
      .then(finish)
      .catch(err => showToast('error', 'Submit failed', err.message));
  } else {
    finish();
  }
}

/* ============================================================
   PROFILE
   ============================================================ */
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Show local preview immediately
  const url = URL.createObjectURL(file);
  const previewIntoCircle = (src) => {
    const circle = document.getElementById('profile-avatar-circle');
    if (circle) circle.innerHTML = `<img src="${src}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%"><input type="file" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;border-radius:50%" onchange="handleAvatarUpload(event)">`;
    const sb = document.getElementById('sidebar-avatar');
    if (sb) sb.innerHTML = `<img src="${src}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  };
  previewIntoCircle(url);

  // Upload to server so the DB is updated and the avatar persists across reloads.
  if (!window.API || !window.SESSION_USER || !window.SESSION_USER.id) {
    showToast('warning', 'Saved locally', 'Photo preview only — not connected to server.');
    return;
  }
  const fd = new FormData();
  fd.append('id', window.SESSION_USER.id);
  fd.append('profile_picture', file);
  window.API.updateStaff(fd)
    .then(() => {
      showToast('success', 'Photo Updated', 'Profile photo saved to your account.');
    })
    .catch(err => {
      showToast('error', 'Upload failed', err.message || 'Could not save photo.');
    });
}

function togglePwSection() {
  const body = document.getElementById('pw-body');
  const chevron = document.getElementById('pw-chevron');
  body.classList.toggle('open');
  chevron.textContent = body.classList.contains('open') ? 'expand_less' : 'expand_more';
}

function updatePassword() {
  const current = document.getElementById('p-current-pw').value;
  const newPw = document.getElementById('p-new-pw').value;
  const confirm = document.getElementById('p-confirm-pw').value;

  if (!current || !newPw || !confirm) { showToast('error', 'Error', 'Please fill all password fields.'); return; }
  if (newPw !== confirm) { showToast('error', 'Mismatch', 'New passwords do not match.'); return; }
  if (newPw.length < 8) { showToast('error', 'Too Short', 'Password must be at least 8 characters.'); return; }

  showToast('success', 'Password Updated', 'Your password has been changed successfully.');
  document.getElementById('p-current-pw').value = '';
  document.getElementById('p-new-pw').value = '';
  document.getElementById('p-confirm-pw').value = '';
}

function updateProfile() {
  const name = document.getElementById('p-fullname').value.trim();
  const designation = document.getElementById('p-designation').value.trim();
  const idcard = document.getElementById('p-idcard').value.trim();

  if (!name) { showToast('error', 'Error', 'Full name is required.'); return; }

  document.getElementById('sidebar-name').textContent = name;
  document.getElementById('sidebar-designation').textContent = designation;
  showToast('success', 'Profile Updated', 'Your profile has been updated successfully.');
}

/* ============================================================
   MODAL SYSTEM
   ============================================================ */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.addEventListener('transitionend', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, { once: true });
}

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
});

// ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const open = document.querySelector('.modal-overlay.open');
    if (open) closeModal(open.id);
  }
});

/* ============================================================
   CONFIRM MODAL
   ============================================================ */
function showConfirm(title, message, onConfirm) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  const btn = document.getElementById('confirm-yes-btn');
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', () => { onConfirm(); closeModal('confirm-modal'); });
  openModal('confirm-modal');
}

/* ============================================================
   SIGN OUT
   ============================================================ */
function handleSignOut() {
  showConfirm('Sign Out', 'Are you sure you want to sign out?', () => {
    localStorage.removeItem('cb_user');
    if (window.API) window.API.logout().finally(() => { window.location.href = 'index.php'; });
    else window.location.href = 'index.php';
  });
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toast-container');
  const icons = { success: 'check_circle', error: 'error', info: 'info', warning: 'warning' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">${icons[type]}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.replace('show', 'hide');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function getPriorityColor(priority) {
  const map = { low: '#6B7280', medium: '#3B82F6', high: '#F97316', critical: '#EF4444' };
  return map[priority] || '#6B7280';
}

function getStatusPill(status) {
  const cls = { submitted:'s-submitted',pending:'s-pending',in_review:'s-in-review',assigned:'s-assigned',in_progress:'s-in-progress',resolved:'s-resolved',rejected:'s-rejected' };
  return `<span class="status-pill ${cls[status] || 's-submitted'}"><span class="status-dot"></span>${formatStatus(status)}</span>`;
}

function getPriorityPill(priority) {
  const cls = { low:'p-low',medium:'p-medium',high:'p-high',critical:'p-critical' };
  return `<span class="priority-pill ${cls[priority] || 'p-low'}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>`;
}

function getCategoryPill(category) {
  const map = {
    infrastructure:'cat-infrastructure',water:'cat-water',electricity:'cat-electricity',
    waste:'cat-waste',traffic:'cat-traffic',environment:'cat-environment',
    public:'cat-public',others:'cat-others'
  };
  const label = { infrastructure:'Infrastructure',water:'Water',electricity:'Electricity',waste:'Waste Mgmt',traffic:'Traffic',environment:'Environment',public:'Public Svc',others:'Others' };
  const cls = map[category] || 'cat-others';
  return `<span class="cat-pill ${cls}">${label[category] || category}</span>`;
}

function formatStatus(status) {
  const map = { submitted:'Submitted',pending:'Pending',in_review:'In Review',assigned:'Assigned',in_progress:'In Progress',resolved:'Resolved',rejected:'Rejected' };
  return map[status] || status;
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / (1000*60*60*24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 30) return `${diff}d ago`;
  return d.toLocaleDateString('en-GB', { day:'numeric',month:'short',year:'numeric' });
}

function formatDateLong(dateStr) {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric',month:'long',year:'numeric' });
}
