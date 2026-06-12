// =============================================
// DATA STORE
// =============================================
const BD_DATA = {
  districts: [
    {id:1,name:'Dhaka'},{id:2,name:'Chattogram'},{id:3,name:'Sylhet'},
    {id:4,name:'Rajshahi'},{id:5,name:'Khulna'},{id:6,name:'Barishal'},
    {id:7,name:'Rangpur'},{id:8,name:'Mymensingh'},{id:9,name:'Gazipur'},
    {id:10,name:'Narayanganj'},{id:11,name:'Cumilla'},{id:12,name:'Bogura'}
  ],
  ashons: [
    {id:1,district_id:1,label:'Dhaka-01'},{id:2,district_id:1,label:'Dhaka-06'},
    {id:3,district_id:1,label:'Dhaka-09'},{id:4,district_id:1,label:'Dhaka-10'},
    {id:5,district_id:1,label:'Dhaka-11'},{id:6,district_id:1,label:'Dhaka-17'},
    {id:7,district_id:2,label:'Chattogram-01'},{id:8,district_id:2,label:'Chattogram-05'},
    {id:9,district_id:2,label:'Chattogram-09'},{id:10,district_id:3,label:'Sylhet-01'},
    {id:11,district_id:3,label:'Sylhet-02'},{id:12,district_id:3,label:'Sylhet-03'},
    {id:13,district_id:4,label:'Rajshahi-01'},{id:14,district_id:4,label:'Rajshahi-02'},
    {id:15,district_id:5,label:'Khulna-01'},{id:16,district_id:5,label:'Khulna-02'},
    {id:17,district_id:6,label:'Barishal-01'},{id:18,district_id:7,label:'Rangpur-01'},
    {id:19,district_id:8,label:'Mymensingh-01'},{id:20,district_id:9,label:'Gazipur-01'},
    {id:21,district_id:10,label:'Narayanganj-01'},{id:22,district_id:11,label:'Cumilla-01'}
  ],
  areas: [
    {id:1,ashon_id:3,name:'Khilgaon'},{id:2,ashon_id:3,name:'Mugda'},
    {id:3,ashon_id:3,name:'Shobujbagh'},{id:4,ashon_id:3,name:'Malibagh'},
    {id:5,ashon_id:4,name:'Gulshan-1'},{id:6,ashon_id:4,name:'Gulshan-2'},
    {id:7,ashon_id:4,name:'Baridhara'},{id:8,ashon_id:4,name:'Niketan'},
    {id:9,ashon_id:5,name:'Banani'},{id:10,ashon_id:5,name:'Mohakhali'},
    {id:11,ashon_id:5,name:'Tejgaon'},{id:12,ashon_id:1,name:'Lalbagh'},
    {id:13,ashon_id:1,name:'Chawkbazar'},{id:14,ashon_id:2,name:'Mirpur-1'},
    {id:15,ashon_id:2,name:'Mirpur-10'},{id:16,ashon_id:6,name:'Dhanmondi'},
    {id:17,ashon_id:6,name:'Hazaribagh'},{id:18,ashon_id:7,name:'Kotwali'},
    {id:19,ashon_id:7,name:'Panchlaish'},{id:20,ashon_id:8,name:'Agrabad'},
    {id:21,ashon_id:8,name:'Halishahar'},{id:22,ashon_id:9,name:'Pahartali'},
    {id:23,ashon_id:10,name:'Zindabazar'},{id:24,ashon_id:10,name:'Amberkhana'},
    {id:25,ashon_id:11,name:'Shahporan'},{id:26,ashon_id:12,name:'Moglabazar'},
    {id:27,ashon_id:13,name:'Boalia'},{id:28,ashon_id:14,name:'Motihar'},
    {id:29,ashon_id:15,name:'Daulatpur'},{id:30,ashon_id:16,name:'Sonadanga'}
  ]
};

let complaints = [
  {
    id:'CB-2025-00042',status:'in_progress',category:'infrastructure',priority:'high',
    subject:'Massive Pothole on Main Road',
    description:'There is a large pothole near the school junction that has already caused two accidents this week. Immediate repair is needed.',
    location:'Khilgaon, Dhaka-09',district:'Dhaka',ashon:'Dhaka-09',area:'Khilgaon',
    submittedAt: new Date(Date.now()-7*86400000),upvotes:42,comments:12,
    statusHistory:[
      {status:'submitted',date:new Date(Date.now()-7*86400000),notes:'Complaint submitted'},
      {status:'pending',date:new Date(Date.now()-6*86400000),notes:'Under admin review'},
      {status:'in_review',date:new Date(Date.now()-5*86400000),notes:'Department notified'},
      {status:'assigned',date:new Date(Date.now()-3*86400000),notes:'Assigned to field officer'},
      {status:'in_progress',date:new Date(Date.now()-1*86400000),notes:'Road repair crew dispatched'},
    ],
    hasImage:false
  },
  {
    id:'CB-2025-00055',status:'pending',category:'water',priority:'critical',
    subject:'No Water Supply for 3 Days',
    description:'Our entire block has had no water supply for three consecutive days. WASA needs to investigate the pipeline issue urgently.',
    location:'Dhanmondi, Dhaka-17',district:'Dhaka',ashon:'Dhaka-17',area:'Dhanmondi',
    submittedAt: new Date(Date.now()-2*86400000),upvotes:89,comments:24,
    statusHistory:[
      {status:'submitted',date:new Date(Date.now()-2*86400000),notes:''},
      {status:'pending',date:new Date(Date.now()-1*86400000),notes:'Under review'},
    ],
    hasImage:false
  },
  {
    id:'CB-2025-00067',status:'resolved',category:'electricity',priority:'medium',
    subject:'Broken Street Lamps on Avenue',
    description:'Multiple street lamps on the main avenue have been non-functional for a week creating safety concerns.',
    location:'Mirpur-10, Dhaka-06',district:'Dhaka',ashon:'Dhaka-06',area:'Mirpur-10',
    submittedAt: new Date(Date.now()-20*86400000),upvotes:34,comments:8,
    resolvedAt: new Date(Date.now()-5*86400000),
    statusHistory:[
      {status:'submitted',date:new Date(Date.now()-20*86400000),notes:''},
      {status:'pending',date:new Date(Date.now()-19*86400000),notes:''},
      {status:'in_review',date:new Date(Date.now()-15*86400000),notes:''},
      {status:'assigned',date:new Date(Date.now()-12*86400000),notes:''},
      {status:'in_progress',date:new Date(Date.now()-8*86400000),notes:'Technicians on site'},
      {status:'resolved',date:new Date(Date.now()-5*86400000),notes:'All lamps replaced and functional'},
    ],
    rating: 4,
    hasImage:false
  },
  {
    id:'CB-2025-00071',status:'submitted',category:'waste',priority:'low',
    subject:'Garbage Collection Missed for a Week',
    description:'The garbage truck has not come to our area for the past 7 days. Waste is piling up on the streets.',
    location:'Banani, Dhaka-11',district:'Dhaka',ashon:'Dhaka-11',area:'Banani',
    submittedAt: new Date(Date.now()-1*86400000),upvotes:15,comments:3,
    statusHistory:[
      {status:'submitted',date:new Date(Date.now()-1*86400000),notes:''},
    ],
    hasImage:false
  },
  {
    id:'CB-2025-00033',status:'rejected',category:'traffic',priority:'medium',
    subject:'Traffic Signal Malfunction',
    description:'The traffic signal at the main intersection has been showing red continuously.',
    location:'Gulshan-1, Dhaka-10',district:'Dhaka',ashon:'Dhaka-10',area:'Gulshan-1',
    submittedAt: new Date(Date.now()-15*86400000),upvotes:5,comments:1,
    statusHistory:[
      {status:'submitted',date:new Date(Date.now()-15*86400000),notes:''},
      {status:'rejected',date:new Date(Date.now()-14*86400000),notes:''},
    ],
    rejectionReason: 'A similar complaint (CB-2025-00029) was already filed and is being handled by the Traffic Department.',
    rejectionRef: 'CB-2025-00029',
    hasImage:false
  }
];

let myComments = [
  {id:1,complaintId:'CB-2025-00042',subject:'Massive Pothole on Main Road',text:'I saw this pothole yesterday and it\'s getting worse. Please fix this urgently!',timestamp:new Date(Date.now()-5*86400000)},
  {id:2,complaintId:'CB-2025-00055',subject:'No Water Supply for 3 Days',text:'Same issue in our building. Please resolve this ASAP.',timestamp:new Date(Date.now()-1*86400000)},
  {id:3,complaintId:'CB-2025-00067',subject:'Broken Street Lamps on Avenue',text:'Thank you for resolving this quickly. The avenue is much safer now.',timestamp:new Date(Date.now()-4*86400000)},
];

let notifications = [
  {id:1,type:'complaint_update',title:'Complaint Status Updated',message:'CB-2025-00042 has been moved to "In Progress" by the Infrastructure Department.',time:new Date(Date.now()-2*3600000),read:false,color:'var(--primary-container)',icon:'update'},
  {id:2,type:'admin_message',title:'Admin Message',message:'Your complaint CB-2025-00055 has been approved and is now pending department assignment.',time:new Date(Date.now()-5*3600000),read:false,color:'var(--status-in-review)',icon:'admin_panel_settings'},
  {id:3,type:'upvote',title:'New Upvote',message:'Someone upvoted your complaint CB-2025-00042. Total upvotes: 42.',time:new Date(Date.now()-1*86400000),read:false,color:'var(--status-pending)',icon:'thumb_up'},
  {id:4,type:'comment',title:'New Comment',message:'A citizen commented on your complaint CB-2025-00042.',time:new Date(Date.now()-2*86400000),read:true,color:'var(--status-assigned)',icon:'comment'},
  {id:5,type:'complaint_update',title:'Complaint Resolved',message:'CB-2025-00067 has been marked as Resolved. Please rate the resolution.',time:new Date(Date.now()-5*86400000),read:true,color:'var(--status-resolved)',icon:'check_circle'},
];

let trendingComplaints = [
  {id:'CB-2025-00055',subject:'No Water Supply for 3 Days',category:'water',upvotes:89,status:'pending',location:'Dhanmondi, Dhaka'},
  {id:'CB-2025-00042',subject:'Massive Pothole on Main Road',category:'infrastructure',upvotes:42,status:'in_progress',location:'Khilgaon, Dhaka'},
  {id:'CB-2025-00067',subject:'Broken Street Lamps on Avenue',category:'electricity',upvotes:34,status:'resolved',location:'Mirpur-10, Dhaka'},
];

// State
let currentStep = 1;
let ncMediaFiles = [];
let ncSelectedCategories = [];
let ncSelectedPriority = 'medium';
let ncMapPinned = false;
let currentDetailComplaint = null;
let confirmCallback = null;

// Session — prefer SESSION_USER injected by PHP, fall back to localStorage.
let session = null;
if (window.SESSION_USER && window.SESSION_USER.id) {
  session = {
    userId:     window.SESSION_USER.uid || ('CB-USR-' + window.SESSION_USER.id),
    serverId:   window.SESSION_USER.id,
    role:       window.SESSION_USER.role,
    fullName:   window.SESSION_USER.name,
    email:      window.SESSION_USER.email,
    isVerified: window.SESSION_USER.profileVerified === 'verified',
  };
} else {
  try { session = JSON.parse(localStorage.getItem('cb_user')); } catch(e){}
  if (!session) {
    session = {userId:'CB-USR-00001',role:'citizen',fullName:'Demo Citizen',email:'citizen@demo.complaintbox.bd',isVerified:true};
  }
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  // Wipe the demo mock data BEFORE first render so brand-new users never
  // see ghost complaints / activity flash on the overview page.
  // Live data from loadLiveDashboard() will repopulate everything below.
  complaints     = [];
  notifications  = [];
  myComments     = [];
  trendingComplaints = [];

  setGreeting();
  setUserInfo();
  populateSidebars();
  renderOverview();
  renderMyComplaints();
  renderMyComments();
  renderNotifications();
  updateNotifBadge();
  updateStats();
  checkMaintenance();
  // Live data — replaces mock data and re-renders.
  loadLiveDashboard();
  loadDistrictsFromAPI();
  // Handle deep-link hashes coming from the landing-page hero buttons.
  handleEntryHash();
}

/* Respond to URL hashes used by the landing page hero CTAs:
   #new-complaint  → open the New Complaint modal
   #my-complaints  → switch to the My Complaints section            */
function handleEntryHash() {
  const hash = (window.location.hash || '').replace('#','').toLowerCase();
  if (!hash) return;
  // small delay so DOM + nav buttons are ready
  setTimeout(() => {
    if (hash === 'new-complaint') {
      if (typeof switchSection === 'function') switchSection('overview');
      if (typeof openNewComplaintModal === 'function') openNewComplaintModal();
    } else if (hash === 'my-complaints' || hash === 'mycomplaints') {
      if (typeof switchSection === 'function') switchSection('my-complaints');
    } else if (hash === 'profile' || hash === 'notifications' || hash === 'my-comments' || hash === 'overview') {
      if (typeof switchSection === 'function') switchSection(hash);
    }
    // Clear the hash so reloads don't keep re-opening the modal.
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, 250);
}

async function loadLiveDashboard() {
  if (!window.API || !session || !session.serverId) return;
  try {
    const [mineRes, notifRes, allRes, profRes] = await Promise.all([
      window.API.complaints({ user_id: session.serverId, per_page: 200, sort: 'newest' }).catch(e => null),
      window.API.getNotifications().catch(e => null),
      // Trending list = same trending as Recent Complaints page (all public, sort: trending)
      window.API.complaints({ per_page: 6, sort: 'trending' }).catch(e => null),
      window.API.getUser(session.serverId).catch(e => null),
    ]);

    // --- 1) Map my-complaints to the shape the UI expects (matches mock shape) ---
    if (mineRes && mineRes.data && mineRes.data.complaints) {
      complaints = mineRes.data.complaints.map(c => _mapApiComplaint(c));
    } else {
      complaints = [];
    }

    // --- 2) Notifications: provide icon + color so renderNotifications doesn't show "undefined" ---
    if (notifRes && notifRes.data && notifRes.data.notifications) {
      notifications = notifRes.data.notifications.map(n => {
        const meta = _notifMeta(n.type);
        return {
          id: n.id,
          type: n.type,
          title: n.title || meta.title,
          message: n.message || '',
          complaintId: n.related_complaint_id || null,
          time: _toDate(n.created_at),
          read: !!n.is_read,
          color: meta.color,
          icon: meta.icon,
        };
      });
    }

    // --- 3) Trending: drawn from public approved complaints, same source as Recent Complaints ---
    if (allRes && allRes.data && allRes.data.complaints) {
      trendingComplaints = allRes.data.complaints.slice(0, 3).map(c => ({
        id:       c.complaint_id,
        serverId: c.id,
        subject:  c.subject,
        category: (c.categories || [])[0] || 'others',
        categories: c.categories || [],
        priority: c.priority || 'medium',
        upvotes:  c.upvote_count || 0,
        comments: c.comment_count || 0,
        status:   c.status,
        location: [c.area_name, c.ashon_code, c.district_name].filter(Boolean).join(', '),
        is_own:   !!c.is_own,
      }));
    }

    // --- 4) My comments: fetch from API (per complaint) so My Comments section is real ---
    await _loadMyComments();

    // --- 5) Profile form pre-fill from real DB data ---
    if (profRes && profRes.data) {
      const u = profRes.data;
      session.fullName = u.full_name || session.fullName;
      session.email    = u.email     || session.email;
      _fillProfileForm(u);
      setUserInfo();
    }

    if (typeof renderMyComplaints === 'function')  renderMyComplaints();
    if (typeof renderMyComments    === 'function') renderMyComments();
    if (typeof renderNotifications === 'function') renderNotifications();
    if (typeof updateNotifBadge    === 'function') updateNotifBadge();
    if (typeof updateStats         === 'function') updateStats();
    if (typeof renderOverview      === 'function') renderOverview();
  } catch (e) { console.warn('citizen live load failed', e); }
}

/* Map a /api/complaints row into the shape this dashboard's UI expects. */
function _mapApiComplaint(c) {
  const cats = (c.categories && c.categories.length) ? c.categories : ['others'];
  const district = c.district_name || '';
  const ashon    = c.ashon_code    || '';
  const area     = c.area_name     || '';
  const locParts = [area, ashon, district].filter(Boolean);
  // statusHistory not in list endpoint — we lazy-load when detail modal opens
  return {
    id:           c.complaint_id,         // string ID used everywhere (CB-YYYY-NNNNN)
    serverId:     c.id,                   // numeric DB id (used for API calls)
    complaint_uid:c.complaint_id,
    status:       c.status,
    approval_status: c.approval_status,
    category:     cats[0],
    categories:   cats,
    priority:     c.priority,
    subject:      c.subject || '',
    description:  c.description || '',
    location:     locParts.join(', ') || '—',
    district:     district,
    ashon:        ashon,
    area:         area,
    district_id:  c.district_id,
    ashon_id:     c.ashon_id,
    area_id:      c.area_id,
    map_lat:      c.map_lat,
    map_lng:      c.map_lng,
    map_address:  c.map_address || '',
    submittedAt:  _toDate(c.submitted_at),
    upvotes:      c.upvote_count  || 0,
    comments:     c.comment_count || 0,
    has_upvoted:  !!c.has_upvoted,
    is_featured:  !!c.is_featured,
    rejectionReason: c.rejection_reason,
    rejectionRef:    c.rejected_complaint_ref,
    statusHistory: [],   // populated on detail open
    media:        c.first_image_url ? [{ url: c.first_image_url, type: 'image' }] : [],
    first_image_url: c.first_image_url,
    department_name: c.department_name,
    hasImage:     !!c.first_image_url,
    is_own:       !!c.is_own,
    rating:       c.rating || null,
    user_rating:  c.rating || null,
    assigned_staff_name: c.assigned_staff_name || null,
    submitted_by_user_id: c.submitted_by_user_id || null,
  };
}

function _toDate(s) {
  if (!s) return new Date();
  if (s instanceof Date) return s;
  const d = new Date(typeof s === 'string' ? s.replace(' ', 'T') : s);
  return isNaN(d.getTime()) ? new Date() : d;
}

function _notifMeta(type) {
  const map = {
    complaint_update: { icon:'update',                color:'var(--primary-container)',   title:'Complaint Update' },
    admin_message:    { icon:'admin_panel_settings', color:'var(--status-in-review)',    title:'Admin Message' },
    upvote:           { icon:'thumb_up',              color:'var(--status-pending)',      title:'New Upvote' },
    comment:          { icon:'comment',               color:'var(--status-assigned)',     title:'New Comment' },
    profile_update:   { icon:'manage_accounts',       color:'var(--status-in-review)',    title:'Profile Update' },
    system:           { icon:'info',                  color:'var(--status-assigned)',     title:'System' },
  };
  return map[type] || { icon:'notifications', color:'var(--status-assigned)', title:'Notification' };
}

/* Load ALL comments authored by the current user — across ANY complaint
   (own or someone else's). Uses dedicated /api/comments/get-my-comments.php. */
async function _loadMyComments() {
  if (!window.API || !session || !session.serverId) return;
  try {
    const res = await window.API.getMyComments({ per_page: 100 });
    const list = (res.data && res.data.comments) || [];
    myComments = list.map(cm => ({
      id:                cm.id,
      complaintId:       cm.complaint_id,          // string CB-YYYY-NNNNN
      complaintServerId: cm.complaint_server_id,   // numeric for detail fetch
      subject:           cm.subject,
      text:              cm.comment_text,
      timestamp:         _toDate(cm.created_at),
      is_edited:         cm.is_edited,
      // Snapshot of the underlying complaint so the My-Comments click can open
      // a fully-rendered detail modal even if the complaint isn't in `complaints`.
      _complaint: {
        id: cm.complaint_id, serverId: cm.complaint_server_id,
        subject: cm.subject, status: cm.status, priority: cm.priority,
        categories: cm.categories || [], category: (cm.categories || [])[0] || 'others',
        district: cm.district_name, ashon: cm.ashon_code, area: cm.area_name,
        location: [cm.area_name, cm.ashon_code, cm.district_name].filter(Boolean).join(', ') || '—',
        upvotes: cm.upvote_count || 0, comments: cm.comment_count || 0,
        map_lat: cm.map_lat, map_lng: cm.map_lng,
        first_image_url: cm.first_image_url,
        media: cm.first_image_url ? [{ url: cm.first_image_url, type: 'image' }] : [],
        is_own: false,   // will be set authoritatively from API on modal open
        statusHistory: [],
      },
    }));
  } catch (e) { console.warn('loadMyComments failed', e); myComments = []; }
}

function _fillProfileForm(u) {
  const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined && v !== null) el.value = v; };
  set('pf-fullname', u.full_name || '');
  set('pf-phone',    u.phone || '');
  set('pf-nid',      u.nid_number || '');
  set('pf-email',    u.email || '');
  set('pf-username', u.username || '');
  // District / Ashon / Area need cascade load; do it if values present.
  if (u.district_id) {
    const dSel = document.getElementById('pf-district');
    if (dSel) {
      dSel.value = u.district_id;
      if (typeof populateProfileAshons === 'function') populateProfileAshons();
      if (u.ashon_id) {
        setTimeout(() => {
          const aSel = document.getElementById('pf-ashon');
          if (aSel) {
            aSel.value = u.ashon_id;
            if (typeof populateProfileAreas === 'function') populateProfileAreas();
            if (u.area_id) {
              setTimeout(() => {
                const arSel = document.getElementById('pf-area');
                if (arSel) arSel.value = u.area_id;
              }, 250);
            }
          }
        }, 250);
      }
    }
  }
  // Avatar / NID preview images
  if (u.profile_picture_url) {
    const img = document.getElementById('profile-preview-img');
    if (img) { img.src = u.profile_picture_url; img.style.display = 'block'; }
    const initials = document.getElementById('profile-initials');
    if (initials) initials.style.display = 'none';
  }
  // Paint the previously-uploaded NID images into the Profile Settings zones.
  // The markup in citizen-dashboard.php uses `nid-front-prev` / `nid-back-prev`
  // for the preview <img>, and `nid-front-zone` / `nid-back-zone` for the
  // dashed dropzone container. We hide the placeholder icon/text when an
  // image is present.
  const paintNid = (zoneId, prevId, url) => {
    if (!url) return;
    const prev = document.getElementById(prevId);
    const zone = document.getElementById(zoneId);
    if (prev) { prev.src = url; prev.style.display = 'block'; prev.onclick = () => window.open(url, '_blank'); prev.style.cursor = 'zoom-in'; }
    if (zone) {
      zone.classList.add('has-preview');
      // Hide the icon + helper texts that would otherwise overlap the preview
      zone.querySelectorAll(':scope > .material-symbols-outlined, :scope > .nid-zone-text, :scope > .nid-zone-sub')
          .forEach(el => { el.style.display = 'none'; });
    }
  };
  paintNid('nid-front-zone', 'nid-front-prev', u.nid_front_image_url);
  paintNid('nid-back-zone',  'nid-back-prev',  u.nid_back_image_url);
}

async function loadDistrictsFromAPI() {
  if (!window.API) return;
  try {
    const res = await window.API.districts();
    const list = (res.data && res.data.districts) || [];
    if (!list.length) return;
    // Populate any district selects
    ['nc-district','pf-district'].forEach(selId => {
      const sel = document.getElementById(selId);
      if (!sel) return;
      const current = sel.value;
      sel.innerHTML = '<option value="">Select District</option>';
      list.forEach(d => {
        const o = document.createElement('option');
        o.value = d.id; o.textContent = d.name;
        sel.appendChild(o);
      });
      if (current) sel.value = current;
    });
  } catch (e) { console.warn('districts load failed', e); }
}

function setGreeting() {
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (session?.fullName || 'Citizen').split(' ')[0];
  document.getElementById('greeting-text').innerHTML = `${greeting}, <span>${firstName}</span>`;
  document.getElementById('date-text').textContent = new Date().toLocaleDateString('en-BD', {weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

function setUserInfo() {
  const name = session?.fullName || 'Citizen';
  const id   = session?.userId   || '';
  const initials = name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'C';
  const setText = (sel, val) => { const el = document.getElementById(sel); if (el) el.textContent = val; };
  setText('sidebar-avatar',  initials);
  setText('sidebar-name',    name);
  setText('sidebar-id',      id);
  setText('mobile-avatar',   initials);
  setText('profile-initials', initials);
  setText('profile-display-name', name);
  setText('profile-display-id',   id);
  // Also pre-fill the editable full name field once on first paint, when its
  // current value is still the demo placeholder.
  const nameInput = document.getElementById('pf-fullname');
  if (nameInput && (!nameInput.value || nameInput.value === 'Demo Citizen')) {
    nameInput.value = name;
  }
}

function populateSidebars() {
  // Districts for NC form and Profile
  ['nc-district','pf-district'].forEach(selId => {
    const sel = document.getElementById(selId);
    if(!sel) return;
    BD_DATA.districts.forEach(d => {
      const o = document.createElement('option');
      o.value = d.id; o.textContent = d.name;
      sel.appendChild(o);
    });
  });
}

function checkMaintenance() {
  const maintenance = (window.SESSION_USER && window.SESSION_USER.maintenance === '1')
                   || localStorage.getItem('cb_maintenance') === '1';
  if(maintenance) {
    const overlay = document.getElementById('maintenance-overlay');
    if (overlay) overlay.classList.add('active');
  }
}

function updateStats() {
  const total = complaints.length;
  const inProg = complaints.filter(c=>c.status==='in_progress').length;
  const pend = complaints.filter(c=>c.status==='pending').length;
  const res = complaints.filter(c=>c.status==='resolved').length;
  const rej = complaints.filter(c=>c.status==='rejected').length;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-progress').textContent = inProg;
  document.getElementById('stat-pending').textContent = pend;
  document.getElementById('stat-resolved').textContent = res;
  document.getElementById('stat-rejected').textContent = rej;
}

function updateNotifBadge() {
  const count = notifications.filter(n=>!n.read).length;
  ['notif-badge','mob-notif-badge'].forEach(id => {
    const el = document.getElementById(id);
    if(el) { el.textContent = count; el.style.display = count > 0 ? '' : 'none'; }
  });
}

// =============================================
// SECTION SWITCHING
// =============================================
function switchSection(section) {
  document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  const sec = document.getElementById('section-' + section);
  if(sec) sec.classList.add('active');
  
  const btn = document.querySelector(`.nav-btn[data-section="${section}"]`);
  if(btn) btn.classList.add('active');

  // Close sidebar on mobile
  closeMobileSidebar();
}

function updateMobileNav(btn) {
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function openMobileSidebar() {
  document.getElementById('main-sidebar').classList.add('mobile-open');
  document.getElementById('sidebar-overlay').classList.add('active');
}
function closeMobileSidebar() {
  document.getElementById('main-sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// =============================================
// RENDER OVERVIEW
// =============================================
function renderOverview() {
  // My Complaints Preview (last 3)
  const container = document.getElementById('overview-complaints');
  if (container) {
    container.innerHTML = '';
    const recent = [...complaints].slice(-3).reverse();
    if (recent.length === 0) {
      container.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined">assignment</span><h4>No complaints yet</h4><p>Submit your first complaint!</p></div>';
    } else {
      recent.forEach(c => {
        container.appendChild(createHorizontalCard(c, true));
      });
    }
  }
  // NOTE: do NOT early-return when there are no complaints — the rest of the
  // overview (Recent Activity placeholder, Trending list) still needs to
  // render so brand-new accounts see the proper empty states.

  // Activity — strictly the current user's COMPLAINT activity.
  //   * notifications that reference one of the user's complaints
  //     (related_complaint_id is set), and
  //   * status_history entries we've already loaded for those complaints.
  // We deliberately exclude system / welcome / generic notifications that
  // have no related_complaint_id — a brand-new account with no complaints
  // must show "No recent activity yet." even if the welcome notification
  // exists in their notifications list.
  const actList = document.getElementById('activity-list');
  if (actList) {
    actList.innerHTML = '';
    const activities = [];
    // From notifications — only complaint-related ones
    (notifications || []).forEach(n => {
      if (!n.complaintId) return;                       // skip system/welcome
      const matching = complaints.find(x => x.serverId === n.complaintId);
      if (!matching) return;                            // skip if not user's complaint
      activities.push({
        status:      n.type === 'complaint_update' ? 'in_progress' : 'submitted',
        date:        n.time,
        complaintId: matching.id,
        text:        n.message || n.title || '',
        icon:        n.icon,
        color:       n.color,
      });
    });
    // From any locally-loaded status_history of the user's complaints
    complaints.forEach(c => {
      (c.statusHistory || []).slice(-2).forEach(h => {
        activities.push({
          status:      h.status,
          date:        _toDate(h.date),
          complaintId: c.id,
          text:        `${c.id} status changed to ${formatStatus(h.status)}`,
        });
      });
    });
    activities.sort((a, b) => b.date - a.date);
    const top = activities.slice(0, 6);
    if (top.length === 0) {
      actList.innerHTML = '<div class="empty-state" style="padding:20px 0"><span class="material-symbols-outlined">history</span><p style="font-size:13px;color:var(--outline)">No recent activity yet.</p></div>';
    } else {
      top.forEach(a => {
        const colors = a.color ? { bg: a.color + '20', color: a.color } : getStatusColors(a.status);
        const icon = a.icon || getStatusIcon(a.status);
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
          <div class="activity-icon" style="background:${colors.bg}">
            <span class="material-symbols-outlined" style="font-size:16px;color:${colors.color}">${icon}</span>
          </div>
          <div class="activity-text">
            <div class="activity-title">${a.text || ((a.complaintId || '') + ' status updated to <strong>' + formatStatus(a.status) + '</strong>')}</div>
            <div class="activity-time">${relativeTime(a.date)}</div>
          </div>`;
        actList.appendChild(div);
      });
    }
  }

  // Trending — uses the same trending source as the public Recent Complaints page
  const trendGrid = document.getElementById('trending-grid');
  if (!trendGrid) return;
  trendGrid.innerHTML = '';
  if (!trendingComplaints || trendingComplaints.length === 0) {
    trendGrid.innerHTML = '<div class="empty-state" style="padding:20px;grid-column:1/-1;"><span class="material-symbols-outlined">trending_up</span><p style="font-size:13px;color:var(--outline)">No trending complaints right now.</p></div>';
    return;
  }
  trendingComplaints.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'trending-card';
    div.style.cursor = 'pointer';
    div.onclick = () => {
      // Prefer locally-loaded full version, else build a stub from the trending row
      const local = complaints.find(c => c.id === t.id);
      openDetailModal(local || {
        id: t.id, serverId: t.serverId,
        subject: t.subject, category: t.category, categories: [t.category],
        priority: t.priority || 'medium',   // safe default until API fills it
        status: t.status, location: t.location,
        upvotes: t.upvotes, comments: 0,
        statusHistory: [], media: [],
        is_own: false,    // unknown — will be replaced by API response
      });
    };
    div.innerHTML = `
      <div class="trending-rank"><span class="material-symbols-outlined" style="font-size:14px">trending_up</span>#${i+1} Trending</div>
      <div class="trending-title">${t.subject}</div>
      <div class="trending-meta">${t.location || ''}</div>
      <div class="trending-upvotes">
        <span class="material-symbols-outlined">thumb_up</span>
        ${t.upvotes} upvotes · <span style="color:${getStatusColors(t.status).color}">${formatStatus(t.status)}</span>
      </div>
    `;
    trendGrid.appendChild(div);
  });
}

// =============================================
// CREATE HORIZONTAL COMPLAINT CARD
// =============================================
function createHorizontalCard(c, compact=false) {
  const div = document.createElement('div');
  div.className = 'complaint-card-h' + (c.status === 'rejected' ? ' rejected' : '');
  
  const stages = ['submitted','pending','in_review','assigned','in_progress','resolved'];
  const currentStageIdx = stages.indexOf(c.status === 'rejected' ? 'submitted' : c.status);
  const progressPct = c.status === 'resolved' ? 100 : c.status === 'rejected' ? 10 : [10,25,40,55,75,100][currentStageIdx] || 10;
  const statusC = getStatusColors(c.status);

  const catClass = getCategoryClass(c.category);
  const catLabel = formatCategory(c.category);
  const prioClass = 'priority-' + c.priority;

  div.innerHTML = `
    <div class="complaint-thumb">
      <span class="material-symbols-outlined" style="color:${getCategoryColor(c.category)}">${getCategoryIcon(c.category)}</span>
    </div>
    <div class="complaint-main">
      <div class="complaint-meta-row">
        <span class="complaint-id-badge">${c.id}</span>
        <span class="tag-pill ${catClass}">${catLabel}</span>
        <span class="priority-pill ${prioClass}">${c.priority}</span>
      </div>
      <div class="complaint-title">${c.subject}</div>
      <div class="complaint-loc-time">
        <span class="material-symbols-outlined">location_on</span>
        ${c.location} &nbsp;·&nbsp; ${relativeTime(c.submittedAt)}
        &nbsp;·&nbsp; <span class="material-symbols-outlined" style="font-size:13px;color:var(--primary-container)">thumb_up</span> ${c.upvotes}
      </div>
      <div class="complaint-progress-wrap">
        <div class="progress-stages">
          ${stages.map((s,i) => {
            const isDone = i < currentStageIdx || c.status === 'resolved';
            const isActive = i === currentStageIdx && c.status !== 'rejected';
            const sc = getStatusColors(s);
            return `<div class="stage-item ${isDone?'done':''} ${isActive?'active':''}" style="--stage-color:${sc.color}">
              <div class="stage-dot"></div>
              ${!compact ? `<span>${s.replace('_',' ')}</span>` : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="progress-bar-h">
          <div class="progress-fill-h" style="width:${progressPct}%;background:${statusC.color}"></div>
        </div>
      </div>
    </div>
    ${c.status === 'rejected' ? `<span class="rejected-badge" onclick="event.stopPropagation();showRejectedReason(complaints.find(x=>x.id==='${c.id}'))">Rejected</span>` : ''}
  `;
  
  div.addEventListener('click', () => {
    if(c.status === 'rejected') return; // handled by badge
    openDetailModal(c);
  });
  return div;
}

// =============================================
// MY COMPLAINTS
// =============================================
function renderMyComplaints(filtered=null) {
  const list = document.getElementById('my-complaints-list');
  list.innerHTML = '';
  const data = filtered || complaints;
  document.getElementById('mc-count').textContent = `Showing ${data.length} result${data.length!==1?'s':''}`;
  if(data.length === 0) {
    list.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined">search_off</span><h4>No complaints found</h4><p>Try adjusting your filters.</p></div>';
    return;
  }
  data.forEach(c => {
    list.appendChild(createHorizontalCard(c));
  });
}

function filterMyComplaints() {
  const search = document.getElementById('mc-search').value.toLowerCase();
  const status = document.getElementById('mc-status').value;
  const category = document.getElementById('mc-category').value;
  const priority = document.getElementById('mc-priority').value;
  
  const filtered = complaints.filter(c => {
    const matchSearch = !search || c.id.toLowerCase().includes(search) || c.subject.toLowerCase().includes(search);
    const matchStatus = !status || c.status === status;
    const matchCat = !category || c.category === category;
    const matchPrio = !priority || c.priority === priority;
    return matchSearch && matchStatus && matchCat && matchPrio;
  });
  renderMyComplaints(filtered);
}

function clearFilters() {
  document.getElementById('mc-search').value = '';
  document.getElementById('mc-status').value = '';
  document.getElementById('mc-category').value = '';
  document.getElementById('mc-priority').value = '';
  renderMyComplaints();
}

// =============================================
// MY COMMENTS
// =============================================
function renderMyComments() {
  const list = document.getElementById('my-comments-list');
  list.innerHTML = '';
  if(myComments.length === 0) {
    list.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined">chat_bubble_outline</span><h4>No comments yet</h4><p>Engage with complaints by leaving comments.</p></div>';
    return;
  }
  myComments.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comment-ref-card';
    card.innerHTML = `
      <div class="comment-ref-complaint">${c.complaintId}</div>
      <div class="comment-ref-subject">${c.subject}</div>
      <div class="comment-text-preview" id="comment-text-${c.id}">${c.text}</div>
      <div class="comment-footer-row">
        <span class="comment-time">${relativeTime(c.timestamp)}</span>
        <div class="comment-actions">
          <button class="icon-btn" onclick="event.stopPropagation();editComment(${c.id})" title="Edit">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="icon-btn delete" onclick="event.stopPropagation();deleteComment(${c.id})" title="Delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      // Use locally-known complaint if user owns it; otherwise use the
      // snapshot we fetched with the comment.
      const local = complaints.find(x => x.id === c.complaintId);
      const target = local || c._complaint || { id: c.complaintId, serverId: c.complaintServerId, subject: c.subject };
      openDetailModal(target, { scrollToComments: true, highlightCommentId: c.id });
    });
    list.appendChild(card);
  });
}

function editComment(id) {
  const comment = myComments.find(c => c.id === id);
  if(!comment) return;
  const textEl = document.getElementById('comment-text-' + id);
  if(!textEl) return;
  const original = comment.text;
  textEl.innerHTML = `
    <div class="inline-edit-wrap">
      <textarea class="inline-edit-textarea" id="edit-ta-${id}">${original}</textarea>
      <div class="inline-edit-btns">
        <button class="btn-save-inline" onclick="saveEditComment(${id})">Save</button>
        <button class="btn-cancel-inline" onclick="cancelEditComment(${id},'${original.replace(/'/g,"\\'")}')">Cancel</button>
      </div>
    </div>
  `;
}

function saveEditComment(id) {
  const ta = document.getElementById('edit-ta-' + id);
  if (!ta) return;
  const newText = ta.value.trim();
  if (!newText) { showToast('error','Error','Comment cannot be empty.'); return; }
  const apply = () => {
    const comment = myComments.find(c => c.id === id);
    if (comment) { comment.text = newText; comment.is_edited = 1; }
    renderMyComments();
    showToast('success','Updated','Comment updated successfully.');
  };
  if (window.API) {
    window.API.post('comments/edit-comment.php', { id, comment_text: newText })
      .then(apply)
      .catch(err => showToast('error','Failed', err.message || 'Could not update comment.'));
  } else { apply(); }
}

function cancelEditComment(id, original) {
  const textEl = document.getElementById('comment-text-' + id);
  if (textEl) textEl.textContent = original;
}

function deleteComment(id) {
  openConfirm(
    'Delete Comment',
    'Are you sure you want to delete this comment? This action cannot be undone.',
    () => {
      const apply = () => {
        myComments = myComments.filter(c => c.id !== id);
        renderMyComments();
        showToast('success','Deleted','Comment removed.');
      };
      if (window.API) {
        window.API.deleteComment(id).then(apply)
          .catch(err => showToast('error','Failed', err.message || 'Could not delete.'));
      } else { apply(); }
    }
  );
}

// =============================================
// NOTIFICATIONS
// =============================================
function renderNotifications(filter='all') {
  const list = document.getElementById('notif-list');
  list.innerHTML = '';
  const data = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  if(data.length === 0) {
    list.innerHTML = '<div class="empty-state"><span class="material-symbols-outlined">notifications_none</span><h4>No notifications</h4><p>You\'re all caught up!</p></div>';
    return;
  }
  data.forEach(n => {
    // Defensive defaults so we never render "undefined"
    const meta = _notifMeta(n.type);
    const color = n.color || meta.color;
    const icon  = n.icon  || meta.icon;
    const title = n.title || meta.title;
    const msg   = n.message || '';
    const time  = n.time ? relativeTime(n.time) : '';
    const card = document.createElement('div');
    card.className = 'notif-card' + (!n.read ? ' unread' : '');
    card.style.setProperty('--notif-color', color);
    card.innerHTML = `
      <div class="notif-icon" style="background:${color}20">
        <span class="material-symbols-outlined" style="color:${color};font-size:18px;font-variation-settings:'FILL' 1">${icon}</span>
      </div>
      <div class="notif-body">
        <div class="notif-title">${title}</div>
        <div class="notif-msg">${msg}</div>
        <div class="notif-time">${time}</div>
      </div>
      ${!n.read ? '<div class="unread-dot"></div>' : ''}
    `;
    card.addEventListener('click', () => {
      n.read = true;
      // Mark as read on the server
      if (window.API && n.id) { window.API.markRead(n.id).catch(()=>{}); }
      // If linked to a complaint, open its detail modal
      if (n.complaintId) {
        const complaint = complaints.find(c => c.serverId === n.complaintId);
        if (complaint) openDetailModal(complaint);
      }
      renderNotifications(filter);
      updateNotifBadge();
    });
    list.appendChild(card);
  });
}

function filterNotifs(type, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderNotifications(type);
}

function markAllRead() {
  notifications.forEach(n => n.read = true);
  renderNotifications();
  updateNotifBadge();
  if (window.API) window.API.markAllRead().catch(()=>{});
  showToast('success','Done','All notifications marked as read.');
}

// =============================================
// PROFILE
// =============================================
function populateProfileAshons() {
  const districtId = parseInt(document.getElementById('pf-district').value);
  const ashonSel = document.getElementById('pf-ashon');
  const areaSel = document.getElementById('pf-area');
  ashonSel.innerHTML = '<option value="">Choose Ashon No.</option>';
  areaSel.innerHTML = '<option value="">Select Ashon First</option>';
  if(!districtId) { ashonSel.disabled = true; return; }
  if (window.API) {
    window.API.ashons(districtId).then(res => {
      (res.data.ashons || []).forEach(a => {
        const o = document.createElement('option');
        o.value = a.id; o.textContent = a.ashon_code;
        ashonSel.appendChild(o);
      });
      ashonSel.disabled = false;
    });
  } else {
    BD_DATA.ashons.filter(a => a.district_id === districtId).forEach(a => {
      const o = document.createElement('option');
      o.value = a.id; o.textContent = a.label;
      ashonSel.appendChild(o);
    });
    ashonSel.disabled = false;
  }
}

function populateProfileAreas() {
  const ashonId = parseInt(document.getElementById('pf-ashon').value);
  const areaSel = document.getElementById('pf-area');
  areaSel.innerHTML = '<option value="">Choose Area</option>';
  if(!ashonId) { areaSel.disabled = true; return; }
  if (window.API) {
    window.API.areas(ashonId).then(res => {
      (res.data.areas || []).forEach(a => {
        const o = document.createElement('option');
        o.value = a.id; o.textContent = a.name;
        areaSel.appendChild(o);
      });
      areaSel.disabled = false;
    });
  } else {
    BD_DATA.areas.filter(a => a.ashon_id === ashonId).forEach(a => {
      const o = document.createElement('option');
      o.value = a.id; o.textContent = a.name;
      areaSel.appendChild(o);
    });
    areaSel.disabled = false;
  }
}

function previewProfilePic(input) {
  if(!input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('profile-preview-img');
    img.src = e.target.result;
    img.style.display = 'block';
    document.getElementById('profile-initials').style.display = 'none';
    showToast('success','Photo Selected','Click Update Profile to save.');
  };
  reader.readAsDataURL(input.files[0]);
}

function previewNID(input, previewId, zoneId) {
  if(!input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById(previewId);
    img.src = e.target.result;
    img.style.display = 'block';
    const zone = document.getElementById(zoneId);
    zone.querySelector('.material-symbols-outlined').style.display = 'none';
    zone.querySelector('.nid-zone-text').style.display = 'none';
    zone.querySelector('.nid-zone-sub').style.display = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

function toggleCollapsible() {
  const header = document.getElementById('pw-header');
  const body = document.getElementById('pw-body');
  header.classList.toggle('open');
  body.classList.toggle('open');
}

function updateProfile() {
  const name  = document.getElementById('pf-fullname').value.trim();
  const phone = document.getElementById('pf-phone').value.trim();
  const nid   = document.getElementById('pf-nid').value.trim();
  if(!name || !phone) { showToast('error','Error','Full name and phone are required.'); return; }

  if (!window.API) return;
  const fd = new FormData();
  fd.append('full_name', name);
  fd.append('phone', phone);
  if (nid) fd.append('nid_number', nid);
  const dist = document.getElementById('pf-district')?.value;
  const ash  = document.getElementById('pf-ashon')?.value;
  const area = document.getElementById('pf-area')?.value;
  if (dist) fd.append('district_id', dist);
  if (ash)  fd.append('ashon_id', ash);
  if (area) fd.append('area_id', area);

  const pfPic = document.getElementById('pf-profile-pic');
  if (pfPic && pfPic.files && pfPic.files[0]) fd.append('profile_picture', pfPic.files[0]);
  // NID images — the Profile form uses inputs `nid-front-up` and `nid-back-up`
  // (defined in citizen-dashboard.php). Fall back to the legacy `pf-nid-front`
  // ids in case any older markup is still around.
  const nidF = document.getElementById('nid-front-up') || document.getElementById('pf-nid-front');
  const nidB = document.getElementById('nid-back-up')  || document.getElementById('pf-nid-back');
  if (nidF && nidF.files && nidF.files[0]) fd.append('nid_front_image', nidF.files[0]);
  if (nidB && nidB.files && nidB.files[0]) fd.append('nid_back_image',  nidB.files[0]);

  window.API.updateProfile(fd)
    .then(() => {
      if (session) {
        session.fullName = name;
        try { localStorage.setItem('cb_user', JSON.stringify(session)); } catch(e){}
      }
      setUserInfo();
      openModal('profile-success-modal');
    })
    .catch(err => showToast('error','Update failed', err.message || 'Could not update profile.'));
}

function updatePassword() {
  const cur = document.getElementById('pf-cur-pw').value;
  const nw = document.getElementById('pf-new-pw').value;
  const conf = document.getElementById('pf-conf-pw').value;
  if(!cur || !nw || !conf) { showToast('error','Error','All password fields are required.'); return; }
  if(nw !== conf) { showToast('error','Error','New passwords do not match.'); return; }
  if(nw.length < 8) { showToast('error','Error','Password must be at least 8 characters.'); return; }
  document.getElementById('pf-cur-pw').value = '';
  document.getElementById('pf-new-pw').value = '';
  document.getElementById('pf-conf-pw').value = '';
  showToast('success','Password Updated','Your password has been changed.');
}

function confirmDeleteAccount() {
  openConfirm(
    'Delete Account',
    'Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.',
    () => {
      const finish = () => {
        localStorage.removeItem('cb_user');
        showToast('info','Account Deleted','Redirecting...');
        setTimeout(() => { window.location.href = 'index.php'; }, 1200);
      };
      if (window.API && session && session.serverId) {
        window.API.deleteUser(session.serverId).then(finish).catch(finish);
      } else finish();
    }
  );
  document.getElementById('confirm-yes-btn').textContent = 'Yes, Delete';
  document.getElementById('confirm-yes-btn').style.background = 'var(--error)';
}

// =============================================
// NEW COMPLAINT MODAL
// =============================================
let ncCurrentStep = 1;

function openNewComplaintModal() {
  // if(!session?.isVerified) {
  //   document.getElementById('verify-warning').style.display = 'flex';
  //   switchSection('overview');
  //   showToast('warning','Verification Required','Complete your profile to submit complaints.');
  //   return;
  // }
  resetNCForm();
  openModal('new-complaint-modal');
}

function resetNCForm() {
  ncCurrentStep = 1;
  ncMediaFiles = [];
  ncSelectedCategories = [];
  ncSelectedPriority = 'medium';
  ncMapPinned = false;

  // Reset category selections
  document.querySelectorAll('.category-option').forEach(el => el.classList.remove('selected'));

  // Reset form fields
  ['nc-subject','nc-description'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });

  $do('nc-subject-count', el => { el.textContent = '0'; });
  $do('nc-desc-count',    el => { el.textContent = '0'; });
  $do('nc-media-thumbs',  el => { el.innerHTML = ''; });
  $do('nc-map-pinned',    el => { el.style.display = 'none'; });
  // Old static placeholder (kept hidden) — leave alone
  // Map state
  _ncLat = null; _ncLng = null;
  if (_ncMarker && _ncMap) { _ncMap.removeLayer(_ncMarker); _ncMarker = null; }

  // Reset priority
  document.querySelectorAll('.priority-option').forEach(el => {
    el.classList.remove('selected-priority');
    if(el.dataset.prio === 'medium') el.classList.add('selected-priority');
  });

  ncGoStepDirect(1);
}

/* Defensive helper used above and in many places — define if missing */
if (typeof $do !== 'function') {
  window.$do = function (id, fn) {
    const el = document.getElementById(id);
    if (el) { try { fn(el); } catch (e) { console.warn(e); } }
  };
}

function ncStep1Next() {
  if(ncSelectedCategories.length === 0) { showToast('error','Error','Please select at least one category.'); return; }
  const subject = document.getElementById('nc-subject').value.trim();
  if(!subject) { showToast('error','Error','Please enter a complaint subject.'); return; }
  if(!document.getElementById('nc-district').value) { showToast('error','Error','Please select a district.'); return; }
  const desc = document.getElementById('nc-description').value.trim();
  if(!desc) { showToast('error','Error','Please add a description.'); return; }
  ncGoStep(2);
}

function ncGoStep(step) {
  ncCurrentStep = step;
  ncGoStepDirect(step);
  if (step === 2) {
    // Step 2 contains the location map — initialize / re-render Leaflet.
    setTimeout(() => ncEnsureMap(), 80);
  }
  if (step === 3) renderNCPreview();
}

function ncGoStepDirect(step) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('nc-step-' + step).classList.add('active');
  
  for(let i=1; i<=3; i++) {
    const pill = document.getElementById('nc-pill-' + i);
    const dot = document.getElementById('nc-dot-' + i);
    const line = document.getElementById('nc-line-' + i);
    pill.classList.remove('active','done');
    if(i < step) {
      pill.classList.add('done');
      dot.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">check</span>';
    } else if(i === step) {
      pill.classList.add('active');
      dot.textContent = '0' + i;
    } else {
      dot.textContent = '0' + i;
    }
    if(line) line.classList.toggle('done', i < step);
  }
}

function toggleCategory(el) {
  el.classList.toggle('selected');
  const cat = el.dataset.cat;
  if(el.classList.contains('selected')) {
    if(!ncSelectedCategories.includes(cat)) ncSelectedCategories.push(cat);
  } else {
    ncSelectedCategories = ncSelectedCategories.filter(c => c !== cat);
  }
}

function selectPriority(el) {
  document.querySelectorAll('.priority-option').forEach(e => {
    e.classList.remove('selected-priority');
    e.style.transform = '';
  });
  el.classList.add('selected-priority');
  ncSelectedPriority = el.dataset.prio;
  const prioColors = {low:'rgba(107,114,128,0.3)',medium:'#3B82F6',high:'rgba(249,115,22,0.8)',critical:'rgba(239,68,68,0.8)'};
  el.style.borderColor = prioColors[ncSelectedPriority];
}

function updateCharCount(inputId, countId, max) {
  const val = document.getElementById(inputId)?.value?.length || 0;
  document.getElementById(countId).textContent = val;
}

function handleMediaUpload(input) {
  const files = Array.from(input.files);
  const remaining = 10 - ncMediaFiles.length;
  const toAdd = files.slice(0, remaining);
  ncMediaFiles.push(...toAdd);
  renderMediaThumbs();
  if(files.length > remaining) showToast('warning','Limit','Max 10 files allowed.');
}

function renderMediaThumbs() {
  const container = document.getElementById('nc-media-thumbs');
  container.innerHTML = '';
  ncMediaFiles.forEach((file, i) => {
    const div = document.createElement('div');
    div.className = 'media-thumb';
    if(file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        div.innerHTML = `<img src="${e.target.result}" alt=""><button class="media-thumb-remove" onclick="removeMedia(${i})">×</button>`;
      };
      reader.readAsDataURL(file);
    } else {
      div.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--surface-container)"><span class="material-symbols-outlined" style="font-size:24px;color:var(--outline)">videocam</span></div><button class="media-thumb-remove" onclick="removeMedia(${i})">×</button>`;
    }
    container.appendChild(div);
  });
}

function removeMedia(idx) {
  ncMediaFiles.splice(idx, 1);
  renderMediaThumbs();
}

/* ======= Leaflet (OpenStreetMap) Pin-your-location ======= */
let _ncMap = null, _ncMarker = null, _ncLat = null, _ncLng = null;

function ncEnsureMap() {
  if (typeof L === 'undefined') { console.warn('Leaflet not loaded'); return null; }
  if (_ncMap) {
    // The modal may have just opened — Leaflet needs a resize hint.
    setTimeout(() => _ncMap.invalidateSize(), 100);
    return _ncMap;
  }
  const el = document.getElementById('nc-leaflet-map');
  if (!el) return null;
  // Default view: Dhaka, Bangladesh
  _ncMap = L.map(el, { scrollWheelZoom: false }).setView([23.8103, 90.4125], 12);
  // CartoDB "Voyager" — labels are in English (Latin) script, unlike the
  // default OSM tiles which render Bangladesh place-names in Bangla.
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(_ncMap);
  _ncMap.on('click', (e) => ncSetMapPin(e.latlng.lat, e.latlng.lng));
  // Enable scroll-zoom only while the map has focus, so it doesn't hijack the modal scroll.
  _ncMap.getContainer().addEventListener('mouseenter', () => _ncMap.scrollWheelZoom.enable());
  _ncMap.getContainer().addEventListener('mouseleave', () => _ncMap.scrollWheelZoom.disable());

  // Bind the search-bar handlers (one-shot — won't double-bind on subsequent opens
  // since we early-return when _ncMap is already set above).
  const input = document.getElementById('nc-map-search');
  if (input) {
    let to = null;
    input.addEventListener('input', () => {
      if (to) clearTimeout(to);
      to = setTimeout(() => ncDoMapSearch(true), 350);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); ncDoMapSearch(false); }
      if (e.key === 'Escape') { _ncHideSearchResults(); }
    });
    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('nc-map-search-results');
      if (wrap && !wrap.contains(e.target) && e.target !== input) _ncHideSearchResults();
    });
  }

  setTimeout(() => _ncMap.invalidateSize(), 200);
  return _ncMap;
}

function _ncHideSearchResults() {
  const r = document.getElementById('nc-map-search-results');
  if (r) r.style.display = 'none';
}

function ncDoMapSearch(asYouType) {
  const input = document.getElementById('nc-map-search');
  const resultsEl = document.getElementById('nc-map-search-results');
  if (!input || !resultsEl) return;
  const q = input.value.trim();
  if (q.length < 2) { _ncHideSearchResults(); return; }

  // Limit results to Bangladesh (countrycodes=bd) for relevance.
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&addressdetails=1&countrycodes=bd&accept-language=en&q=${encodeURIComponent(q)}`;
  resultsEl.innerHTML = '<div style="padding:10px 12px;color:var(--outline)">Searching…</div>';
  resultsEl.style.display = 'block';
  fetch(url, { headers: { 'Accept-Language': 'en' } })
    .then(r => r.json())
    .then(arr => {
      if (!arr || arr.length === 0) {
        resultsEl.innerHTML = '<div style="padding:10px 12px;color:var(--outline)">No matches found in Bangladesh.</div>';
        return;
      }
      resultsEl.innerHTML = arr.map((it, i) =>
        `<div class="nc-map-result" style="padding:8px 12px;cursor:pointer;border-top:${i===0?'none':'1px solid var(--outline-variant)'}"
             data-lat="${it.lat}" data-lon="${it.lon}" data-name="${(it.display_name||'').replace(/"/g,'&quot;')}">
          <div style="font-weight:600;color:var(--on-surface);font-size:13px">${(it.display_name||'').split(',').slice(0,2).join(',')}</div>
          <div style="font-size:11px;color:var(--outline);margin-top:2px">${(it.display_name||'').split(',').slice(2).join(',').trim()}</div>
        </div>`
      ).join('');
      resultsEl.querySelectorAll('.nc-map-result').forEach(el => {
        el.addEventListener('mouseenter', () => { el.style.background = 'var(--surface-container)'; });
        el.addEventListener('mouseleave', () => { el.style.background = ''; });
        el.addEventListener('click', () => {
          const lat = parseFloat(el.dataset.lat);
          const lon = parseFloat(el.dataset.lon);
          const name = el.dataset.name;
          if (!isNaN(lat) && !isNaN(lon)) {
            ncEnsureMap();
            if (_ncMap) _ncMap.setView([lat, lon], 16);
            ncSetMapPin(lat, lon, name);
          }
          _ncHideSearchResults();
        });
      });
    })
    .catch(() => {
      resultsEl.innerHTML = '<div style="padding:10px 12px;color:var(--outline)">Search failed. Check your connection.</div>';
    });
}

function ncSetMapPin(lat, lng, addressLabel) {
  if (!_ncMap) ncEnsureMap();
  if (!_ncMap) return;
  _ncLat = lat; _ncLng = lng; ncMapPinned = true;
  if (_ncMarker) _ncMarker.setLatLng([lat, lng]);
  else _ncMarker = L.marker([lat, lng], { draggable: true }).addTo(_ncMap)
        .on('dragend', (e) => { const ll = e.target.getLatLng(); ncSetMapPin(ll.lat, ll.lng); });
  const addrEl = document.getElementById('nc-map-address');
  const wrap   = document.getElementById('nc-map-pinned');
  if (wrap) wrap.style.display = 'block';
  // Quick label = "lat, lng" while we try to reverse-geocode.
  if (addrEl) addrEl.textContent = addressLabel || (`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
  if (!addressLabel) {
    // Reverse-geocode via OSM (free, rate-limited). Failure is harmless.
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=0`)
      .then(r => r.json()).then(j => {
        if (j && j.display_name && addrEl) addrEl.textContent = j.display_name;
      }).catch(()=>{});
  }
}

function ncUseCurrentLocation() {
  if (!navigator.geolocation) { showToast('error','Unavailable','Geolocation is not supported by your browser.'); return; }
  ncEnsureMap();
  navigator.geolocation.getCurrentPosition(
    pos => {
      ncSetMapPin(pos.coords.latitude, pos.coords.longitude);
      if (_ncMap) _ncMap.setView([pos.coords.latitude, pos.coords.longitude], 16);
      showToast('success','Location Set','Your current location has been pinned.');
    },
    err => showToast('error','Failed', err.message || 'Could not get your location.')
  );
}

function clearMapPin() {
  ncMapPinned = false; _ncLat = null; _ncLng = null;
  if (_ncMarker && _ncMap) { _ncMap.removeLayer(_ncMarker); _ncMarker = null; }
  const wrap = document.getElementById('nc-map-pinned');
  if (wrap) wrap.style.display = 'none';
}

/* Back-compat shim — old HTML may still call simulateMapPin() */
function simulateMapPin() { ncUseCurrentLocation(); }

function renderNCPreview() {
  const subject = document.getElementById('nc-subject').value;
  const desc = document.getElementById('nc-description').value;
  const districtSel = document.getElementById('nc-district');
  const districtName = districtSel.options[districtSel.selectedIndex]?.text || '-';
  const cats = ncSelectedCategories;
  
  const preview = document.getElementById('nc-preview-card');
  preview.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
      ${cats.map(c => `<span class="tag-pill ${getCategoryClass(c)}">${formatCategory(c)}</span>`).join('')}
      <span class="priority-pill priority-${ncSelectedPriority}">${ncSelectedPriority}</span>
    </div>
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;margin-bottom:8px">${subject}</div>
    <div style="font-size:13px;color:var(--on-surface-variant);margin-bottom:10px;line-height:1.5">${desc.slice(0,150)}${desc.length>150?'...':''}</div>
    <div style="font-size:12px;color:var(--outline);display:flex;align-items:center;gap:4px">
      <span class="material-symbols-outlined" style="font-size:14px;color:var(--primary-container)">location_on</span>
      ${districtName} ${ncMapPinned ? '· Location Pinned' : ''}
    </div>
    <div style="margin-top:10px;font-size:12px;color:var(--outline)">${ncMediaFiles.length} media file${ncMediaFiles.length!==1?'s':''} attached</div>
  `;
}

function submitComplaint() {
  const districtSel = document.getElementById('nc-district');
  const ashonSel    = document.getElementById('nc-ashon');
  const areaSel     = document.getElementById('nc-area');

  if (!window.API) { showToast('error','Error','API not available.'); return; }

  const isEdit = !!window._editingComplaintId;

  const fd = new FormData();
  if (isEdit) fd.append('id', window._editingComplaintId);
  ncSelectedCategories.forEach(c => fd.append('category[]', c));
  fd.append('subject',     document.getElementById('nc-subject').value);
  fd.append('description', document.getElementById('nc-description').value);
  fd.append('priority',    ncSelectedPriority);
  fd.append('district_id', districtSel?.value || '');
  fd.append('ashon_id',    ashonSel?.value || '');
  if (areaSel?.value) fd.append('area_id', areaSel.value);
  const mapAddr = document.getElementById('nc-map-address')?.textContent;
  if (mapAddr && mapAddr !== '—') fd.append('map_address', mapAddr);
  if (_ncLat != null && _ncLng != null) {
    fd.append('map_lat', _ncLat);
    fd.append('map_lng', _ncLng);
  }
  ncMediaFiles.forEach(f => fd.append('media[]', f));
  // Marked-for-removal existing media (ids)
  if (window._ncRemoveMedia && window._ncRemoveMedia.length) {
    window._ncRemoveMedia.forEach(id => fd.append('remove_media[]', id));
  }

  const fn = isEdit ? window.API.updateComplaint(fd) : window.API.createComplaint(fd);
  fn.then(res => {
      closeModal('new-complaint-modal');
      window._editingComplaintId = null;
      window._ncRemoveMedia = [];
      if (isEdit) {
        showToast('success','Saved','Your complaint has been updated.');
      } else {
        showToast('success','Complaint Submitted!',`ID: ${res.data.complaint_id} · Pending admin review.`);
      }
      loadLiveDashboard();
    })
    .catch(err => {
      if (err.code === 'profile_unverified') {
        showToast('warning','Profile not verified','Please complete your profile verification first.');
        const profileTab = document.querySelector('[data-tab="profile"], [data-section="profile"]');
        if (profileTab) profileTab.click();
      } else {
        showToast('error', isEdit ? 'Update failed' : 'Submission failed', err.message || 'Could not save complaint.');
      }
    });
}

// =============================================
// COMPLAINT DETAIL MODAL
// =============================================
function openDetailModal(c, opts) {
  if (!c) return;
  opts = opts || {};
  // Defensive defaults so first render never shows "undefined" for stubs
  c.priority    = c.priority    || 'medium';
  c.status      = c.status      || 'submitted';
  c.category    = c.category    || (Array.isArray(c.categories) && c.categories[0]) || 'others';
  c.categories  = (c.categories && c.categories.length) ? c.categories : [c.category];
  c.subject     = c.subject     || '';
  c.description = c.description || '';
  c.location    = c.location    || [c.area, c.ashon, c.district].filter(Boolean).join(', ') || '—';
  c.submittedAt = c.submittedAt || new Date();
  c.upvotes     = (typeof c.upvotes === 'number') ? c.upvotes : (c.upvote_count || 0);
  c.comments    = (typeof c.comments === 'number') ? c.comments : (c.comment_count || 0);
  c.media       = c.media || [];

  currentDetailComplaint = c;
  const idBadge = document.getElementById('detail-id-badge');
  if (idBadge) idBadge.textContent = c.id || c.complaint_uid || '';

  // Render once with whatever we have so user sees content immediately
  _renderDetailActions(c);
  renderDetailBody(c);
  openModal('detail-modal');

  // Then refresh from API for full data (media, status_history, comments)
  if (window.API && c.serverId) {
    Promise.all([
      window.API.complaint(c.serverId).catch(() => null),
      window.API.getComments(c.serverId, 1, 100).catch(() => null),
    ]).then(([detRes, comRes]) => {
      if (detRes && detRes.data) {
        const d = detRes.data;
        // CRITICAL: trust the server about ownership — stops Edit/Delete leaking
        // onto trending complaints submitted by other users.
        c.is_own        = !!d.is_own;
        c.priority      = d.priority   || c.priority;
        c.status        = d.status     || c.status;
        c.description   = d.description || c.description;
        c.subject       = d.subject    || c.subject;
        c.categories    = (d.categories && d.categories.length) ? d.categories : c.categories;
        c.category      = c.categories[0];
        c.submittedAt   = _toDate(d.submitted_at);
        c.statusHistory = (d.status_history || []).map(h => ({
          status: h.status, date: _toDate(h.changed_at), notes: h.notes,
        }));
        c.media = [
          ...(d.citizen_media || []).map(m => ({ url: m.url, type: m.file_type, is_proof: false })),
          ...(d.proof_media   || []).map(m => ({ url: m.url, type: m.file_type, is_proof: true  })),
        ];
        c.upvotes     = d.upvote_count;
        c.comments    = d.comment_count;
        c.has_upvoted = d.has_upvoted;
        // Pull saved rating so the star row paints correctly on open
        c.rating      = (d.rating && typeof d.rating === 'object') ? (d.rating.rating || null) : (d.rating || null);
        c.assignment  = d.assignment || null;
        c.assigned_staff_name = (d.assignment && d.assignment.staff_name) || c.assigned_staff_name || null;
        c.department_name = d.department_name || c.department_name;
        c.map_lat = d.map_lat; c.map_lng = d.map_lng; c.map_address = d.map_address;
        c.district = d.district_name || c.district;
        c.ashon    = d.ashon_code    || c.ashon;
        c.area     = d.area_name     || c.area;
        c.location = [c.area, c.ashon, c.district].filter(Boolean).join(', ') || '—';
      }
      const comments = (comRes && comRes.data && comRes.data.comments) || [];
      _renderDetailActions(c);
      renderDetailBody(c, comments);

      if (opts.scrollToComments) {
        setTimeout(() => {
          const node = document.getElementById('detail-comments-anchor');
          if (node) node.scrollIntoView({ behavior:'smooth', block:'start' });
          if (opts.highlightCommentId) {
            const el = document.getElementById('detail-comment-' + opts.highlightCommentId);
            if (el) {
              el.style.outline = '2px solid var(--primary-container)';
              el.style.outlineOffset = '4px';
              el.style.borderRadius = '8px';
            }
          }
        }, 250);
      }
    });
  }
}

function _renderDetailActions(c) {
  const actionDiv = document.getElementById('detail-action-btns');
  if (!actionDiv) return;
  // Only own complaints expose Edit + Delete. Honor the server's authoritative `is_own`
  // flag; fall back to comparing submitter id when offline.
  const isOwn = (typeof c.is_own === 'boolean') ? c.is_own
              : (c.submitted_by_user_id && session && c.submitted_by_user_id === session.serverId);
  if (isOwn) {
    actionDiv.innerHTML = `
      <button class="btn-outline" style="padding:6px 12px;font-size:12px" onclick="editComplaint('${c.id}')">
        <span class="material-symbols-outlined" style="font-size:14px">edit</span>Edit
      </button>
      <button class="btn-outline" style="padding:6px 12px;font-size:12px;border-color:var(--error);color:var(--error)" onclick="deleteComplaint('${c.id}')">
        <span class="material-symbols-outlined" style="font-size:14px">delete</span>Delete
      </button>`;
  } else {
    actionDiv.innerHTML = '';
  }
}

function renderDetailBody(c, commentsList) {
  const body = document.getElementById('detail-modal-body');
  if (!body) return;
  const stages = ['submitted','pending','in_review','assigned','in_progress','resolved'];
  const currentIdx = stages.indexOf(c.status === 'rejected' ? 'submitted' : c.status);
  const stageIcons = {submitted:'check_circle',pending:'hourglass_empty',in_review:'manage_search',assigned:'assignment_ind',in_progress:'sync',resolved:'task_alt'};
  const stageLabels = {submitted:'Submitted',pending:'Pending',in_review:'In Review',assigned:'Assigned',in_progress:'In Progress',resolved:'Resolved'};
  // Display-safe values
  const location = c.location || [c.area, c.ashon, c.district].filter(Boolean).join(', ') || '—';
  const submittedAtTxt = c.submittedAt ? formatDate(c.submittedAt) : '';
  const upvotes  = c.upvotes  || 0;
  const commentsCount = (typeof c.comments === 'number') ? c.comments : (c.comment_count || 0);

  // Build media block: prefer real images, otherwise a category placeholder
  const mediaImgs = (c.media || []).filter(m => m && m.url && !m.is_proof);
  const proofImgs = (c.media || []).filter(m => m && m.url &&  m.is_proof);
  const mediaBlock = mediaImgs.length
    ? `<div class="detail-img-placeholder" style="background:#000;padding:0;overflow:hidden;display:flex;align-items:center;justify-content:center">
         <img src="${mediaImgs[0].url}" alt="" style="width:100%;height:100%;object-fit:cover;cursor:zoom-in" onerror="this.parentNode.innerHTML='<span class=\\'material-symbols-outlined\\'>${getCategoryIcon(c.category)}</span>'">
       </div>`
    : `<div class="detail-img-placeholder">
         <span class="material-symbols-outlined">${getCategoryIcon(c.category)}</span>
       </div>`;

  body.innerHTML = `
    <!-- Image / Placeholder -->
    ${mediaBlock}

    <!-- Location & Time -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:4px;font-size:13px;color:var(--on-surface-variant)">
        <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary-container)">location_on</span>
        ${location}
      </div>
      <div style="font-size:12px;color:var(--outline)">${submittedAtTxt}</div>
    </div>
    
    <!-- Tags -->
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
      <span class="tag-pill ${getCategoryClass(c.category)}">${formatCategory(c.category)}</span>
      <span class="priority-pill priority-${c.priority}">${c.priority}</span>
      <span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:9999px;font-size:10px;font-weight:700;background:${getStatusColors(c.status).bg};color:${getStatusColors(c.status).color}">
        <span style="width:6px;height:6px;border-radius:50%;background:${getStatusColors(c.status).color}"></span>
        ${formatStatus(c.status)}
      </span>
    </div>
    
    <!-- Title & Description -->
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:700;margin-bottom:10px">${c.subject}</div>
    <div style="font-size:14px;color:var(--on-surface-variant);line-height:1.7;margin-bottom:20px">${c.description}</div>
    
    <!-- Map (keyless embed) -->
    ${(c.map_lat && c.map_lng)
      ? `<iframe
            src="https://maps.google.com/maps?q=${c.map_lat},${c.map_lng}&z=15&hl=en&output=embed"
            style="width:100%;height:220px;border:1px solid var(--outline-variant);border-radius:12px;margin-bottom:20px"
            loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`
      : `<iframe
            src="https://maps.google.com/maps?q=${encodeURIComponent(location + ', Bangladesh')}&z=13&hl=en&output=embed"
            style="width:100%;height:220px;border:1px solid var(--outline-variant);border-radius:12px;margin-bottom:20px"
            loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`}
    
    <!-- Progress Timeline -->
    <div style="font-size:14px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:6px">
      <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary-container)">timeline</span>
      Status Timeline
    </div>
    <div class="progress-timeline">
      ${stages.map((s, i) => {
        const histEntry = c.statusHistory?.find(h => h.status === s);
        const isDone = i < currentIdx || c.status === 'resolved';
        const isActive = i === currentIdx && c.status !== 'rejected';
        const sc = getStatusColors(s);
        return `
          <div class="timeline-stage ${isDone?'done':''} ${isActive?'active':''}">
            <div class="timeline-icon">
              <span class="material-symbols-outlined" style="font-size:12px;color:${isDone||isActive?sc.color:'var(--outline)'};font-variation-settings:'FILL' ${isDone||isActive?1:0}">${stageIcons[s]}</span>
            </div>
            <div style="flex:1">
              <div class="timeline-label">${stageLabels[s]}</div>
              ${histEntry ? `<div class="timeline-time">${formatDate(histEntry.date)}${histEntry.notes ? ' — ' + histEntry.notes : ''}</div>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    ${c.status === 'rejected' ? `
    <div style="background:var(--error-container);border-radius:12px;padding:16px;margin-top:16px">
      <div style="font-weight:700;color:var(--on-error-container);margin-bottom:6px">Rejection Reason</div>
      <p style="font-size:13px;color:var(--on-error-container)">${c.rejectionReason || 'No reason provided.'}</p>
    </div>
    ` : ''}
    
    ${c.status === 'resolved' ? `
    <div style="margin-top:20px;padding:16px;background:rgba(34,197,94,0.08);border-radius:12px;border:1px solid rgba(34,197,94,0.3)">
      <div style="font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <span class="material-symbols-outlined" style="font-size:18px;color:var(--status-resolved)">photo_camera</span>
        Proof of Resolution
      </div>
      ${proofImgs.length ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:6px">
          ${proofImgs.map((m, idx) => m.type === 'video'
            ? `<video src="${m.url}" controls style="width:100%;height:140px;object-fit:cover;border-radius:10px;background:#000"></video>`
            : `<img src="${m.url}" alt="Proof ${idx+1}" loading="lazy" style="width:100%;height:140px;object-fit:cover;border-radius:10px;cursor:zoom-in;border:1px solid rgba(0,0,0,0.05);background:#f3f4f6" onclick="window.open(this.src,'_blank')" onerror="this.alt='Proof image unavailable';this.style.opacity='0.4'">`
          ).join('')}
        </div>
      ` : `<p style="font-size:13px;color:var(--on-surface-variant);margin-bottom:8px">Resolution proof has not been uploaded yet by the department.</p>`}
      ${c.is_own ? `<div style="margin-top:12px">
        <p style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--on-surface-variant)">${c.rating ? 'Your rating (tap to change):' : 'Rate this resolution:'}</p>
        <div class="star-rating" id="star-rating-row" data-current="${c.rating || 0}">
          ${[1,2,3,4,5].map(n => `<button class="star-btn" data-star="${n}" onclick="rateComplaint(${n},'${c.id}')" style="background:none;border:none;cursor:pointer;font-size:28px;padding:0 2px;color:${n <= (c.rating || 0) ? 'var(--status-pending, #f59e0b)' : 'var(--outline-variant, #d1d5db)'}">★</button>`).join('')}
        </div>
        <p style="font-size:11px;color:var(--outline);margin-top:6px" id="rating-status-label">${c.rating ? `You rated: ${c.rating}/5` : 'Tap a star to rate'}</p>
      </div>` : (c.rating ? `<div style="margin-top:10px;font-size:13px">Citizen Rating: ${'⭐'.repeat(c.rating)} <span style="color:var(--outline);font-size:12px">(${c.rating}/5)</span></div>` : '')}
    </div>
    ` : ''}
    
    <!-- Comments Section -->
    <div style="margin-top:24px" id="detail-comments-anchor">
      <div style="font-size:14px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:6px">
        <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary-container)">comment</span>
        Comments
        <span style="background:var(--surface-container);padding:2px 8px;border-radius:9999px;font-size:11px">${commentsCount}</span>
      </div>
      <div class="comments-list" id="detail-comments-list">
        ${_renderCommentsHtml(commentsList || [], (session && session.serverId))}
      </div>
      <div class="comment-input-wrap">
        <textarea class="comment-textarea" id="new-comment-input" placeholder="Add a comment..." rows="2"></textarea>
        <button class="btn-primary" style="padding:10px 16px;border-radius:10px;font-size:13px" onclick="sendComment('${c.id}')">
          <span class="material-symbols-outlined" style="font-size:16px">send</span>
        </button>
      </div>
    </div>
    
    <!-- Bottom Upvote Bar -->
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--outline-variant);display:flex;align-items:center;justify-content:space-between">
      <button class="btn-primary" id="detail-upvote-btn" style="flex:1;justify-content:center;border-radius:12px;margin-right:10px;${c.has_upvoted?'background:var(--status-pending);':''}" onclick="upvoteComplaint('${c.id}')">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${c.has_upvoted?1:0}">thumb_up</span>
        ${c.has_upvoted ? 'Upvoted' : 'Upvote'} · <span id="detail-upvote-count">${upvotes}</span>
      </button>
      <button class="icon-btn" onclick="shareComplaint('${c.id}')" style="width:44px;height:44px" title="Share">
        <span class="material-symbols-outlined">share</span>
      </button>
    </div>
  `;
}

function rateComplaint(rating, complaintId) {
  const c = (complaints.find(x => x.id === complaintId)) || currentDetailComplaint;
  if (!c) { showToast('error','Error','Complaint not found.'); return; }
  if (!c.is_own) { showToast('warning','Cannot Rate','Only the citizen who filed this complaint can rate it.'); return; }
  if (c.status !== 'resolved') { showToast('warning','Not Yet','Rating is enabled once the complaint is resolved.'); return; }

  const paint = (n, permanent) => {
    const row = document.getElementById('star-rating-row');
    if (row) {
      row.dataset.current = n;
      row.querySelectorAll('.star-btn').forEach((btn, i) => {
        btn.style.color = i < n ? 'var(--status-pending, #f59e0b)' : 'var(--outline-variant, #d1d5db)';
      });
    }
    const lbl = document.getElementById('rating-status-label');
    if (lbl) lbl.textContent = permanent ? `You rated: ${n}/5` : `Rate ${n}/5`;
  };
  paint(rating, false);

  if (window.API && c.serverId) {
    window.API.submitRating(c.serverId, rating)
      .then(() => {
        c.rating = rating; c.user_rating = rating;
        paint(rating, true);
        showToast('success','Rating Saved',`You rated this resolution ${rating}/5 stars.`);
      })
      .catch(err => {
        paint(c.rating || 0, !!c.rating);
        showToast('error','Rating failed', err.message || 'Could not save rating.');
      });
  } else {
    c.rating = rating; c.user_rating = rating;
    paint(rating, true);
    showToast('success','Rating Saved',`You rated this resolution ${rating}/5 stars.`);
  }
}

function upvoteComplaint(id) {
  const c = complaints.find(x => x.id === id) || currentDetailComplaint;
  if (!c) return;
  if (!window.API || !c.serverId) {
    // Fallback (no API): toggle locally
    c.has_upvoted = !c.has_upvoted;
    c.upvotes = (c.upvotes || 0) + (c.has_upvoted ? 1 : -1);
    _refreshUpvoteUI(c);
    return;
  }
  window.API.toggleUpvote(c.serverId)
    .then(res => {
      c.has_upvoted = !!res.data.upvoted;
      c.upvotes     = res.data.new_count;
      _refreshUpvoteUI(c);
      showToast('success', c.has_upvoted ? 'Upvoted!' : 'Upvote removed', c.has_upvoted ? 'Your upvote has been recorded.' : 'Your upvote has been removed.');
    })
    .catch(err => showToast('error','Upvote failed', err.message || 'Could not toggle upvote.'));
}

function _refreshUpvoteUI(c) {
  const btn = document.getElementById('detail-upvote-btn');
  if (btn) {
    btn.style.background = c.has_upvoted ? 'var(--status-pending)' : '';
    // Rebuild the contents from scratch — easier than patching text nodes.
    btn.innerHTML = `
      <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${c.has_upvoted?1:0}">thumb_up</span>
      ${c.has_upvoted ? 'Upvoted' : 'Upvote'} · <span id="detail-upvote-count">${c.upvotes}</span>`;
  }
  // Also update card list / overview / trending counts if visible
  if (typeof renderMyComplaints === 'function') renderMyComplaints();
}

/* Renders the comment list HTML for the detail modal. */
function _renderCommentsHtml(list, currentUserId) {
  if (!list || list.length === 0) {
    return '<div style="font-size:13px;color:var(--outline);padding:8px 0;">No comments yet. Be the first to comment.</div>';
  }
  return list.map(cm => {
    const name = cm.full_name || 'Citizen';
    const initials = name.split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase() || 'C';
    const isMine = currentUserId && cm.user_id === currentUserId;
    const time = relativeTime(_toDate(cm.created_at));
    const actions = isMine ? `
      <div style="display:flex;gap:6px;margin-left:auto;">
        <button class="icon-btn" style="width:24px;height:24px;" onclick="editDetailComment(${cm.id})" title="Edit">
          <span class="material-symbols-outlined" style="font-size:14px">edit</span>
        </button>
        <button class="icon-btn delete" style="width:24px;height:24px;" onclick="deleteDetailComment(${cm.id})" title="Delete">
          <span class="material-symbols-outlined" style="font-size:14px">delete</span>
        </button>
      </div>` : '';
    return `
      <div class="comment-item" id="detail-comment-${cm.id}">
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content" style="flex:1">
          <div class="comment-header" style="display:flex;align-items:center;gap:6px;">
            <span class="comment-username">${name}</span>
            <span class="comment-timestamp">${time}${cm.is_edited ? ' · edited' : ''}</span>
            ${actions}
          </div>
          <div class="comment-text-p" id="detail-comment-text-${cm.id}">${_escHtml(cm.comment_text || cm.text || '')}</div>
        </div>
      </div>`;
  }).join('');
}
function _escHtml(s) {
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* In-modal edit of one of MY comments. */
function editDetailComment(id) {
  const wrap = document.getElementById('detail-comment-text-' + id);
  if (!wrap) return;
  const original = wrap.textContent;
  wrap.innerHTML = `
    <textarea class="comment-textarea" id="detail-edit-ta-${id}" style="margin-top:4px;width:100%;min-height:60px">${_escHtml(original)}</textarea>
    <div style="display:flex;gap:6px;margin-top:6px;">
      <button class="btn-primary" style="padding:6px 12px;font-size:12px" onclick="saveDetailComment(${id})">Save</button>
      <button class="btn-outline" style="padding:6px 12px;font-size:12px" onclick="cancelDetailComment(${id}, ${JSON.stringify(original)})">Cancel</button>
    </div>`;
}
function cancelDetailComment(id, original) {
  const wrap = document.getElementById('detail-comment-text-' + id);
  if (wrap) wrap.textContent = original;
}
function saveDetailComment(id) {
  const ta = document.getElementById('detail-edit-ta-' + id);
  if (!ta) return;
  const newText = ta.value.trim();
  if (!newText) { showToast('error','Empty','Comment cannot be empty.'); return; }
  if (!window.API) return;
  window.API.post('comments/edit-comment.php', { id, comment_text: newText })
    .then(() => {
      // Update everywhere
      const wrap = document.getElementById('detail-comment-text-' + id);
      if (wrap) wrap.textContent = newText;
      const m = myComments.find(c => c.id === id);
      if (m) { m.text = newText; m.is_edited = 1; }
      renderMyComments();
      showToast('success','Updated','Your comment has been updated.');
    })
    .catch(err => showToast('error','Failed', err.message || 'Could not update comment.'));
}
function deleteDetailComment(id) {
  openConfirm('Delete Comment','Are you sure you want to delete this comment?', () => {
    window.API.deleteComment(id)
      .then(() => {
        const item = document.getElementById('detail-comment-' + id);
        if (item) item.remove();
        myComments = myComments.filter(c => c.id !== id);
        // Decrement count on current complaint
        if (currentDetailComplaint) {
          currentDetailComplaint.comments = Math.max(0, (currentDetailComplaint.comments || 1) - 1);
        }
        renderMyComments();
        showToast('success','Deleted','Your comment has been removed.');
      })
      .catch(err => showToast('error','Failed', err.message || 'Could not delete comment.'));
  });
}

function shareComplaint(id) {
  if(navigator.share) {
    navigator.share({title:'ComplaintBox', text:`Complaint ${id}`, url: window.location.href});
  } else {
    navigator.clipboard.writeText(window.location.href + '#' + id);
    showToast('info','Link Copied','Complaint link copied to clipboard.');
  }
}

function sendComment(complaintId) {
  const input = document.getElementById('new-comment-input');
  if (!input || !input.value.trim()) { showToast('error','Error','Comment cannot be empty.'); return; }
  const text = input.value.trim();
  const c = complaints.find(x => x.id === complaintId) || currentDetailComplaint;
  if (!c) return;
  if (!window.API || !c.serverId) {
    // Offline / no-API fallback
    const fake = { id: Date.now(), complaintId: c.id, complaintServerId: c.serverId, subject: c.subject, text, timestamp: new Date() };
    myComments.unshift(fake);
    c.comments = (c.comments || 0) + 1;
    input.value = '';
    renderMyComments();
    return;
  }
  window.API.addComment(c.serverId, text)
    .then(res => {
      const cm = res.data || {};
      // Append to in-modal comments list
      const list = document.getElementById('detail-comments-list');
      if (list) {
        const emptyMsg = list.querySelector('div[style*="No comments"]');
        if (emptyMsg) emptyMsg.remove();
        list.insertAdjacentHTML('beforeend', _renderCommentsHtml([cm], session.serverId));
      }
      // Push to local My Comments
      myComments.unshift({
        id: cm.id, complaintId: c.id, complaintServerId: c.serverId,
        subject: c.subject, text: cm.comment_text || text, timestamp: _toDate(cm.created_at),
      });
      c.comments = (c.comments || 0) + 1;
      input.value = '';
      renderMyComments();
      showToast('success','Comment Added','Your comment has been posted.');
    })
    .catch(err => showToast('error','Failed', err.message || 'Could not post comment.'));
}

function editComplaint(id) {
  const c = complaints.find(x => x.id === id);
  if (!c) return;
  closeModal('detail-modal');
  openNewComplaintModal();
  // Mark NC form as edit-mode
  window._editingComplaintId = c.serverId;
  setTimeout(() => {
    const subj = document.getElementById('nc-subject');
    const desc = document.getElementById('nc-description');
    if (subj) subj.value = c.subject || '';
    if (desc) desc.value = c.description || '';
    if (typeof updateCharCount === 'function') {
      updateCharCount('nc-subject','nc-subject-count',200);
      updateCharCount('nc-description','nc-desc-count',2000);
    }
    // Priority
    ncSelectedPriority = c.priority || 'medium';
    document.querySelectorAll('.priority-option').forEach(el => {
      el.classList.toggle('selected-priority', el.dataset.prio === ncSelectedPriority);
    });
    // Categories
    ncSelectedCategories = (c.categories && c.categories.length) ? [...c.categories] : (c.category ? [c.category] : []);
    document.querySelectorAll('.category-option').forEach(el => {
      el.classList.toggle('selected', ncSelectedCategories.includes(el.dataset.cat));
    });
    // District / Ashon / Area
    const dSel = document.getElementById('nc-district');
    if (dSel && c.district_id) {
      dSel.value = c.district_id;
      if (typeof populateNCDistrict === 'function') populateNCDistrict();
      if (c.ashon_id) {
        setTimeout(() => {
          const aSel = document.getElementById('nc-ashon');
          if (aSel) {
            aSel.value = c.ashon_id;
            if (typeof populateNCAreas === 'function') populateNCAreas();
            if (c.area_id) setTimeout(() => {
              const arSel = document.getElementById('nc-area');
              if (arSel) arSel.value = c.area_id;
            }, 250);
          }
        }, 250);
      }
    }
    // Pre-fill the map if we have lat/lng
    if (c.map_lat && c.map_lng) {
      setTimeout(() => {
        ncEnsureMap();
        if (_ncMap) _ncMap.setView([c.map_lat, c.map_lng], 16);
        ncSetMapPin(c.map_lat, c.map_lng, c.map_address);
      }, 500);
    }
    // Update modal title + submit button text to "Save changes"
    const submitBtn = document.getElementById('nc-submit-btn') || document.querySelector('#new-complaint-modal .btn-primary[onclick*="submitComplaint"]');
    if (submitBtn) submitBtn.textContent = 'Save Changes';
    showToast('info','Edit Mode','Modify your complaint and click Save Changes.');
  }, 300);
}

function deleteComplaint(id) {
  const c = complaints.find(x => x.id === id);
  if (!c) return;
  closeModal('detail-modal');
  openConfirm(
    'Delete Complaint',
    `Are you sure you want to delete complaint ${c.id}? This action cannot be undone.`,
    () => {
      const finish = () => {
        const idx = complaints.findIndex(x => x.id === id);
        if (idx > -1) complaints.splice(idx, 1);
        updateStats();
        renderOverview();
        renderMyComplaints();
        showToast('success','Deleted',`Complaint ${c.id} has been deleted.`);
      };
      if (window.API && c.serverId) {
        window.API.deleteComplaint(c.serverId).then(finish)
          .catch(err => showToast('error','Failed', err.message || 'Could not delete.'));
      } else { finish(); }
    }
  );
}

// =============================================
// REJECTED REASON MODAL
// =============================================
function showRejectedReason(c) {
  if(!c) return;
  document.getElementById('rejected-reason-text').textContent = c.rejectionReason || 'No reason provided.';
  const refDiv = document.getElementById('rejected-ref');
  if(c.rejectionRef) {
    refDiv.style.display = 'block';
    document.getElementById('rejected-ref-link').textContent = c.rejectionRef;
    document.getElementById('rejected-ref-link').onclick = () => {
      closeModal('rejected-modal');
      const refC = complaints.find(x => x.id === c.rejectionRef);
      if(refC) setTimeout(() => openDetailModal(refC), 300);
    };
  } else {
    refDiv.style.display = 'none';
  }
  openModal('rejected-modal');
}

// =============================================
// REPORT MODAL
// =============================================
function submitReport() {
  const topic = document.getElementById('report-topic').value.trim();
  const desc = document.getElementById('report-desc').value.trim();
  const cat = document.getElementById('report-category').value;
  if(!topic || !desc || !cat) { showToast('error','Error','Please fill all required fields.'); return; }
  document.getElementById('report-topic').value = '';
  document.getElementById('report-desc').value = '';
  document.getElementById('report-category').value = '';
  closeModal('report-modal');
  showToast('success','Report Submitted','Thank you for your report. Admin will review it.');
}

// =============================================
// MODAL MANAGEMENT
// =============================================
let openModals = [];
function openModal(id) {
  const overlay = document.getElementById(id);
  if(!overlay) return;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('active')));
  if(!openModals.includes(id)) openModals.push(id);
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if(!overlay) return;
  overlay.classList.remove('active');
  overlay.addEventListener('transitionend', () => {
    overlay.style.display = 'none';
    if(openModals.length <= 1) document.body.style.overflow = '';
  }, {once:true});
  openModals = openModals.filter(m => m !== id);
}

// Click backdrop to close
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if(e.target === overlay) closeModal(overlay.id);
  });
});

// ESC key
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && openModals.length > 0) {
    closeModal(openModals[openModals.length - 1]);
  }
});

// =============================================
// CONFIRM MODAL
// =============================================
function openConfirm(title, msg, callback) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = callback;
  document.getElementById('confirm-yes-btn').onclick = () => {
    if(confirmCallback) confirmCallback();
    closeModal('confirm-modal');
  };
  openModal('confirm-modal');
}

// =============================================
// TOAST
// =============================================
function showToast(type, title, message, duration=4000) {
  const icons = {success:'check_circle',error:'error',warning:'warning',info:'info'};
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon" style="font-variation-settings:'FILL' 1">${icons[type]}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.replace('show','hide');
    toast.addEventListener('transitionend', () => toast.remove(), {once:true});
  }, duration);
}

// =============================================
// SIGN OUT
// =============================================
function handleSignOut() {
  openConfirm(
    'Sign Out',
    'Are you sure you want to sign out?',
    () => {
      localStorage.removeItem('cb_user');
      if (window.API) window.API.logout().finally(() => { window.location.href = 'index.php'; });
      else window.location.href = 'index.php';
    }
  );
  document.getElementById('confirm-yes-btn').textContent = 'Sign Out';
  document.getElementById('confirm-yes-btn').style.background = 'var(--primary-container)';
}

// =============================================
// HELPERS
// =============================================
function relativeTime(date) {
  if(!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff/60000);
  const hrs = Math.floor(diff/3600000);
  const days = Math.floor(diff/86400000);
  if(mins < 1) return 'Just now';
  if(mins < 60) return `${mins}m ago`;
  if(hrs < 24) return `${hrs}h ago`;
  if(days === 1) return 'Yesterday';
  if(days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString('en-BD',{month:'short',day:'numeric',year:'numeric'});
}

function formatDate(date) {
  if(!date) return '';
  return new Date(date).toLocaleDateString('en-BD',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'});
}

function formatStatus(s) {
  const map = {submitted:'Submitted',pending:'Pending',in_review:'In Review',assigned:'Assigned',in_progress:'In Progress',resolved:'Resolved',rejected:'Rejected'};
  return map[s] || s;
}

function formatCategory(c) {
  const map = {infrastructure:'Infrastructure',water:'Water Service',water_service:'Water Service',electricity:'Electricity',waste:'Waste Mgmt',waste_management:'Waste Mgmt',traffic:'Traffic',traffic_transport:'Traffic',environment:'Environment',public:'Public Service',public_services:'Public Service',others:'Others'};
  return map[c] || c;
}

function getCategoryClass(c) {
  const map = {infrastructure:'tag-infrastructure',water:'tag-water',water_service:'tag-water',electricity:'tag-electricity',waste:'tag-waste',waste_management:'tag-waste',traffic:'tag-traffic',traffic_transport:'tag-traffic',environment:'tag-environment',public:'tag-public',public_services:'tag-public',others:'tag-others'};
  return map[c] || 'tag-others';
}

function getCategoryIcon(c) {
  const map = {infrastructure:'construction',water:'water_drop',water_service:'water_drop',electricity:'electric_bolt',waste:'delete_sweep',waste_management:'delete_sweep',traffic:'traffic',traffic_transport:'traffic',environment:'eco',public:'local_police',public_services:'local_police',others:'more_horiz'};
  return map[c] || 'report';
}

function getCategoryColor(c) {
  const map = {infrastructure:'#1d4ed8',water:'#0e7490',water_service:'#0e7490',electricity:'#92400e',waste:'#166534',traffic:'#6d28d9',environment:'#0f766e',public:'#c2410c',public_services:'#c2410c',others:'#374151'};
  return map[c] || '#374151';
}

function getStatusColors(s) {
  const map = {
    submitted: {color:'#6B7280',bg:'rgba(107,114,128,0.1)'},
    pending: {color:'#EAB308',bg:'rgba(234,179,8,0.1)'},
    in_review: {color:'#3B82F6',bg:'rgba(59,130,246,0.1)'},
    assigned: {color:'#8B5CF6',bg:'rgba(139,92,246,0.1)'},
    in_progress: {color:'#F97316',bg:'rgba(249,115,22,0.1)'},
    resolved: {color:'#22C55E',bg:'rgba(34,197,94,0.1)'},
    rejected: {color:'#EF4444',bg:'rgba(239,68,68,0.1)'},
  };
  return map[s] || {color:'#6B7280',bg:'rgba(107,114,128,0.1)'};
}

function getStatusIcon(s) {
  const map = {submitted:'check_circle',pending:'hourglass_empty',in_review:'manage_search',assigned:'assignment_ind',in_progress:'sync',resolved:'task_alt',rejected:'cancel'};
  return map[s] || 'info';
}

// NC District cascade — live data via API (falls back to BD_DATA mock)
function populateNCDistrict() {
  const districtId = parseInt(document.getElementById('nc-district').value);
  const ashonSel = document.getElementById('nc-ashon');
  const areaSel = document.getElementById('nc-area');
  ashonSel.innerHTML = '<option value="">Choose Ashon No.</option>';
  areaSel.innerHTML = '<option value="">Ashon first</option>';
  areaSel.disabled = true;
  if(!districtId) { ashonSel.disabled = true; return; }
  if (window.API) {
    window.API.ashons(districtId).then(res => {
      (res.data.ashons || []).forEach(a => {
        const o = document.createElement('option');
        o.value = a.id; o.textContent = a.ashon_code;
        ashonSel.appendChild(o);
      });
      ashonSel.disabled = false;
    }).catch(() => fallback());
  } else fallback();
  function fallback() {
    BD_DATA.ashons.filter(a => a.district_id === districtId).forEach(a => {
      const o = document.createElement('option');
      o.value = a.id; o.textContent = a.label;
      ashonSel.appendChild(o);
    });
    ashonSel.disabled = false;
  }
}

function populateNCAreas() {
  const ashonId = parseInt(document.getElementById('nc-ashon').value);
  const areaSel = document.getElementById('nc-area');
  areaSel.innerHTML = '<option value="">Choose Area</option>';
  if(!ashonId) { areaSel.disabled = true; return; }
  if (window.API) {
    window.API.areas(ashonId).then(res => {
      (res.data.areas || []).forEach(a => {
        const o = document.createElement('option');
        o.value = a.id; o.textContent = a.name;
        areaSel.appendChild(o);
      });
      areaSel.disabled = false;
    }).catch(() => fallback());
  } else fallback();
  function fallback() {
    BD_DATA.areas.filter(a => a.ashon_id === ashonId).forEach(a => {
      const o = document.createElement('option');
      o.value = a.id; o.textContent = a.name;
      areaSel.appendChild(o);
    });
    areaSel.disabled = false;
  }
}
