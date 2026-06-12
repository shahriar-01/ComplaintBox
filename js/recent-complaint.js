/* === Defensive DOM helpers (added) === */
function $by(id){ return document.getElementById(id); }
function $do(id, fn){ const el = document.getElementById(id); if (el) { try { fn(el); } catch(e){ console.warn(e); } } }

/* ===================================================================
   DATA STORE — Mock complaints for Recent Complaints page
=================================================================== */
const DISTRICTS = [
  { id: 1, name: 'Dhaka' }, { id: 2, name: 'Chattogram' },
  { id: 3, name: 'Sylhet' }, { id: 4, name: 'Rajshahi' },
  { id: 5, name: 'Khulna' }, { id: 6, name: 'Barishal' },
  { id: 7, name: 'Rangpur' }, { id: 8, name: 'Mymensingh' },
  { id: 9, name: 'Gazipur' }, { id: 10, name: 'Narayanganj' },
  { id: 11, name: 'Cumilla' }, { id: 12, name: 'Cox\'s Bazar' },
];

const ASHONS = [
  { id: 1, district_id: 1, label: 'Dhaka-01' }, { id: 2, district_id: 1, label: 'Dhaka-06' },
  { id: 3, district_id: 1, label: 'Dhaka-09' }, { id: 4, district_id: 1, label: 'Dhaka-10' },
  { id: 5, district_id: 1, label: 'Dhaka-11' }, { id: 6, district_id: 1, label: 'Dhaka-17' },
  { id: 7, district_id: 2, label: 'Chattogram-01' }, { id: 8, district_id: 2, label: 'Chattogram-05' },
  { id: 9, district_id: 2, label: 'Chattogram-09' }, { id: 10, district_id: 3, label: 'Sylhet-01' },
  { id: 11, district_id: 3, label: 'Sylhet-02' }, { id: 12, district_id: 3, label: 'Sylhet-03' },
  { id: 13, district_id: 4, label: 'Rajshahi-01' }, { id: 14, district_id: 4, label: 'Rajshahi-02' },
  { id: 15, district_id: 5, label: 'Khulna-01' }, { id: 16, district_id: 5, label: 'Khulna-02' },
];

const AREAS = [
  { id: 1, ashon_id: 3, district_id: 1, name: 'Khilgaon' },
  { id: 2, ashon_id: 3, district_id: 1, name: 'Mugda' },
  { id: 3, ashon_id: 3, district_id: 1, name: 'Shobujbagh' },
  { id: 4, ashon_id: 3, district_id: 1, name: 'Malibagh' },
  { id: 5, ashon_id: 4, district_id: 1, name: 'Gulshan-1' },
  { id: 6, ashon_id: 4, district_id: 1, name: 'Gulshan-2' },
  { id: 7, ashon_id: 4, district_id: 1, name: 'Baridhara' },
  { id: 8, ashon_id: 5, district_id: 1, name: 'Banani' },
  { id: 9, ashon_id: 5, district_id: 1, name: 'Mohakhali' },
  { id: 10, ashon_id: 6, district_id: 1, name: 'Dhanmondi' },
  { id: 11, ashon_id: 6, district_id: 1, name: 'Hazaribagh' },
  { id: 12, ashon_id: 7, district_id: 2, name: 'Kotwali' },
  { id: 13, ashon_id: 7, district_id: 2, name: 'Panchlaish' },
  { id: 14, ashon_id: 8, district_id: 2, name: 'Agrabad' },
  { id: 15, ashon_id: 8, district_id: 2, name: 'Halishahar' },
  { id: 16, ashon_id: 9, district_id: 2, name: 'Pahartali' },
  { id: 17, ashon_id: 10, district_id: 3, name: 'Zindabazar' },
  { id: 18, ashon_id: 10, district_id: 3, name: 'Amberkhana' },
];

// Avatar color palette
const AVATAR_COLORS = ['#006A4E','#1d4ed8','#7c3aed','#ea580c','#0f766e','#b45309','#dc2626','#0369a1'];
function getAvatarColor(id) { return AVATAR_COLORS[id % AVATAR_COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }

// Gradient backgrounds for category placeholders
const CAT_GRADIENTS = {
  infrastructure: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
  water_service: 'linear-gradient(135deg,#0c4a6e,#0369a1)',
  electricity: 'linear-gradient(135deg,#451a03,#b45309)',
  waste_management: 'linear-gradient(135deg,#14532d,#15803d)',
  traffic_transport: 'linear-gradient(135deg,#3b0764,#7c3aed)',
  environment: 'linear-gradient(135deg,#042f2e,#0f766e)',
  public_services: 'linear-gradient(135deg,#431407,#c2410c)',
  others: 'linear-gradient(135deg,#1f2937,#4b5563)',
};
const CAT_ICONS = {
  infrastructure:'construction', water_service:'water_drop', electricity:'electric_bolt',
  waste_management:'delete_sweep', traffic_transport:'traffic', environment:'eco',
  public_services:'local_police', others:'more_horiz'
};
const STATUS_PROGRESS = {
  submitted:10, pending:25, in_review:40, assigned:55, in_progress:75, resolved:100, rejected:0
};
const STATUS_LABELS = {
  submitted:'Submitted', pending:'Pending', in_review:'In Review',
  assigned:'Assigned', in_progress:'In Progress', resolved:'Resolved', rejected:'Rejected'
};

// Live complaints (initialized as mock fallback; replaced by API data on load)
let COMPLAINTS = [
  {
    id: 1, complaint_uid: 'CB-2025-00042',
    subject: 'Illegal Waste Dumping Near Drainage Canal',
    description: 'Unauthorized garbage disposal is blocking the main drainage system in our area. Residents are severely affected by the resulting health hazards, foul smell and stagnant water. Immediate action is needed to clear the debris.',
    category: 'waste_management', priority: 'critical',
    status: 'in_review', district_id: 1, ashon_id: 6, area_name: 'Dhanmondi',
    map_lat: 23.7461, map_lng: 90.3742,
    upvote_count: 142, comment_count: 18,
    submitted_at: new Date('2025-11-15T10:22:00'),
    media: [],
    comments: [
      { id:1, user_id:2, username:'Sara Nazneen', text:'This is causing major health issues for our children!', created_at: new Date('2025-11-16T08:10:00') },
      { id:2, user_id:3, username:'Rakib Hasan', text:'The municipality needs to act fast on this.', created_at: new Date('2025-11-17T14:30:00') },
    ],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-15T10:22:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-16T09:00:00'), notes:'Complaint verified and forwarded.' },
      { status:'in_review', changed_at: new Date('2025-11-18T11:30:00'), notes:'Field inspection scheduled for tomorrow.' },
    ],
    is_featured: 1,
  },
  {
    id: 2, complaint_uid: 'CB-2025-00043',
    subject: 'Broken Street Lamps on Main Avenue',
    description: 'Multiple street lamps along the main avenue near Agrabad have been non-functional for over three weeks. This creates serious safety concerns especially for night commuters and pedestrians. Robberies have been reported twice in the dark stretch.',
    category: 'electricity', priority: 'medium',
    status: 'assigned', district_id: 2, ashon_id: 8, area_name: 'Agrabad',
    map_lat: 22.3301, map_lng: 91.8187,
    upvote_count: 128, comment_count: 24,
    submitted_at: new Date('2025-11-07T14:15:00'),
    media: [],
    comments: [
      { id:3, user_id:4, username:'Arif Ahmed', text:'Been reporting this for months. Please fix!', created_at: new Date('2025-11-08T10:00:00') },
    ],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-07T14:15:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-09T09:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-11-11T10:00:00'), notes:'Survey team dispatched.' },
      { status:'assigned', changed_at: new Date('2025-11-14T12:00:00'), notes:'Assigned to DESCO Chattogram team.' },
    ],
    is_featured: 1,
  },
  {
    id: 3, complaint_uid: 'CB-2025-00044',
    subject: 'Open Sewer Manhole Near Primary School',
    description: 'A manhole cover is missing near Zindabazar Primary School. Children and pedestrians walk past this dangerous open hole every day. There is no safety barrier or warning sign placed. This is a critical safety hazard that must be addressed immediately.',
    category: 'infrastructure', priority: 'high',
    status: 'in_progress', district_id: 3, ashon_id: 10, area_name: 'Zindabazar',
    map_lat: 24.8932, map_lng: 91.8688,
    upvote_count: 89, comment_count: 12,
    submitted_at: new Date('2025-10-24T08:30:00'),
    media: [],
    comments: [
      { id:4, user_id:1, username:'Demo Citizen', text:'My kid almost fell into this yesterday. Very dangerous!', created_at: new Date('2025-10-25T09:00:00') },
    ],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-10-24T08:30:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-10-25T10:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-10-27T11:00:00'), notes:'' },
      { status:'assigned', changed_at: new Date('2025-10-29T09:00:00'), notes:'Assigned to City Corporation.' },
      { status:'in_progress', changed_at: new Date('2025-11-02T14:00:00'), notes:'Repair work initiated. Cover ordered.' },
    ],
    is_featured: 1,
  },
  {
    id: 4, complaint_uid: 'CB-2025-00055',
    subject: 'Water Supply Completely Cut for 5 Days',
    description: 'Residents of Gulshan-2 have been without water supply for 5 consecutive days. WASA has not responded to multiple calls. This is affecting hundreds of families. Children and elderly residents are the most vulnerable.',
    category: 'water_service', priority: 'critical',
    status: 'resolved', district_id: 1, ashon_id: 4, area_name: 'Gulshan-2',
    map_lat: 23.7925, map_lng: 90.4078,
    upvote_count: 203, comment_count: 35,
    submitted_at: new Date('2025-09-12T07:00:00'),
    media: [
      { type:'image', url:'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=800&q=80' },
      { type:'image', url:'https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=800&q=80', is_proof:1 },
    ],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-09-12T07:00:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-09-12T12:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-09-13T09:00:00'), notes:'' },
      { status:'assigned', changed_at: new Date('2025-09-14T10:00:00'), notes:'WASA team assigned.' },
      { status:'in_progress', changed_at: new Date('2025-09-15T08:00:00'), notes:'Pipeline repair underway.' },
      { status:'resolved', changed_at: new Date('2025-09-17T16:00:00'), notes:'Water supply fully restored. Pipeline repaired.' },
    ],
    is_featured: 0,
  },
  {
    id: 5, complaint_uid: 'CB-2025-00067',
    subject: 'Massive Pothole on Mohakhali Flyover Road',
    description: 'A large pothole has formed on the main road near Mohakhali intersection. Multiple vehicles have been damaged. The pothole is approximately 2 feet wide and 8 inches deep. Night-time visibility is poor making it extremely dangerous.',
    category: 'infrastructure', priority: 'high',
    status: 'pending', district_id: 1, ashon_id: 5, area_name: 'Mohakhali',
    map_lat: 23.7783, map_lng: 90.3998,
    upvote_count: 67, comment_count: 9,
    submitted_at: new Date('2025-11-20T11:45:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-20T11:45:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-21T09:30:00'), notes:'Under review by city engineers.' },
    ],
    is_featured: 0,
  },
  {
    id: 6, complaint_uid: 'CB-2025-00071',
    subject: 'Unauthorized Construction Blocking Public Footpath',
    description: 'An unauthorized building is being constructed on the public footpath in Banani area. Pedestrians are being forced to walk on the main road which is extremely dangerous. The construction has been going on for 2 weeks without any permit.',
    category: 'infrastructure', priority: 'medium',
    status: 'submitted', district_id: 1, ashon_id: 5, area_name: 'Banani',
    map_lat: 23.7942, map_lng: 90.4021,
    upvote_count: 31, comment_count: 4,
    submitted_at: new Date('2025-11-22T09:00:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-22T09:00:00'), notes:'' },
    ],
    is_featured: 0,
  },
  {
    id: 7, complaint_uid: 'CB-2025-00078',
    subject: 'Severe Air Pollution from Brick Kiln',
    description: 'A nearby brick kiln is operating round the clock emitting extremely thick black smoke. Residents are suffering from respiratory issues. Children are especially affected. The kiln appears to be operating without proper environmental clearance.',
    category: 'environment', priority: 'high',
    status: 'in_review', district_id: 2, ashon_id: 9, area_name: 'Pahartali',
    map_lat: 22.4105, map_lng: 91.8074,
    upvote_count: 55, comment_count: 7,
    submitted_at: new Date('2025-11-10T16:20:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-10T16:20:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-12T10:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-11-15T09:00:00'), notes:'Environmental dept inspection scheduled.' },
    ],
    is_featured: 0,
  },
  {
    id: 8, complaint_uid: 'CB-2025-00081',
    subject: 'Traffic Signal Malfunction at Major Intersection',
    description: 'The traffic signal at Sylhet-Sunamganj highway junction has been malfunctioning for 10 days. During peak hours, there is complete chaos and multiple near-miss accidents have been reported. Immediate repair is urgent.',
    category: 'traffic_transport', priority: 'critical',
    status: 'assigned', district_id: 3, ashon_id: 10, area_name: 'Amberkhana',
    map_lat: 24.8997, map_lng: 91.8744,
    upvote_count: 77, comment_count: 11,
    submitted_at: new Date('2025-11-13T07:30:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-13T07:30:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-14T10:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-11-16T09:00:00'), notes:'' },
      { status:'assigned', changed_at: new Date('2025-11-18T11:00:00'), notes:'Traffic department assigned. Repair scheduled.' },
    ],
    is_featured: 0,
  },
  {
    id: 9, complaint_uid: 'CB-2025-00085',
    subject: 'Public Park Turned into Garbage Dump',
    description: 'The children\'s park in Sonadanga has been taken over by unauthorized waste dumping. The area is littered with industrial and household waste. Children can no longer use the park facilities. This is a serious public health concern.',
    category: 'waste_management', priority: 'medium',
    status: 'pending', district_id: 5, ashon_id: 16, area_name: 'Sonadanga',
    map_lat: 22.8456, map_lng: 89.5403,
    upvote_count: 42, comment_count: 6,
    submitted_at: new Date('2025-11-18T14:00:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-18T14:00:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-19T09:00:00'), notes:'' },
    ],
    is_featured: 0,
  },
  {
    id: 10, complaint_uid: 'CB-2025-00089',
    subject: 'Power Outage Lasting Over 12 Hours Daily',
    description: 'Residents in Khilgaon are experiencing 12+ hours of power outage every day for the past 2 weeks. DESCO offices are not responding. Businesses have suffered massive losses. Food spoilage and health equipment failures are becoming critical issues.',
    category: 'electricity', priority: 'critical',
    status: 'in_progress', district_id: 1, ashon_id: 3, area_name: 'Khilgaon',
    map_lat: 23.7411, map_lng: 90.4223,
    upvote_count: 156, comment_count: 29,
    submitted_at: new Date('2025-11-05T08:00:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-05T08:00:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-06T09:00:00'), notes:'' },
      { status:'in_review', changed_at: new Date('2025-11-07T10:00:00'), notes:'' },
      { status:'assigned', changed_at: new Date('2025-11-09T11:00:00'), notes:'' },
      { status:'in_progress', changed_at: new Date('2025-11-12T09:00:00'), notes:'Transformer replacement in progress.' },
    ],
    is_featured: 0,
  },
  {
    id: 11, complaint_uid: 'CB-2025-00091',
    subject: 'Waterlogging After Heavy Rain Destroys Roads',
    description: 'The drainage system in Halishahar collapses every time there is heavy rainfall. Roads turn into rivers making travel impossible. Local businesses and homes suffer severe damage. The drainage infrastructure needs a complete overhaul.',
    category: 'water_service', priority: 'high',
    status: 'submitted', district_id: 2, ashon_id: 8, area_name: 'Halishahar',
    map_lat: 22.3892, map_lng: 91.7888,
    upvote_count: 49, comment_count: 8,
    submitted_at: new Date('2025-11-23T10:00:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-23T10:00:00'), notes:'' },
    ],
    is_featured: 0,
  },
  {
    id: 12, complaint_uid: 'CB-2025-00093',
    subject: 'Illegal Tree Cutting in Protected Forest Area',
    description: 'Illegal logging is taking place in the protected forest boundary near the hills. Trees are being cut at night. The forest department seems unaware. Significant wildlife habitat is being destroyed. Immediate intervention is urgently needed.',
    category: 'environment', priority: 'high',
    status: 'pending', district_id: 2, ashon_id: 7, area_name: 'Kotwali',
    map_lat: 22.3384, map_lng: 91.8264,
    upvote_count: 38, comment_count: 5,
    submitted_at: new Date('2025-11-21T17:30:00'),
    media: [],
    comments: [],
    status_history: [
      { status:'submitted', changed_at: new Date('2025-11-21T17:30:00'), notes:'' },
      { status:'pending', changed_at: new Date('2025-11-22T10:00:00'), notes:'Under assessment.' },
    ],
    is_featured: 0,
  },
];

// Save upvotes/comments to memory
let upvotedComplaints = new Set(JSON.parse(localStorage.getItem('rc_upvotes') || '[]'));
let commentsData = {}; // complaint_id -> extra comments added in session
COMPLAINTS.forEach(c => { commentsData[c.id] = [...c.comments]; });

function saveUpvotes() {
  localStorage.setItem('rc_upvotes', JSON.stringify([...upvotedComplaints]));
}

/* ===================================================================
   FILTER STATE
=================================================================== */
const filterState = {
  search: '',
  district: '',
  ashon: '',
  areas: new Set(),
  categories: new Set(),
  status: '',
  month: '',
  year: '',
};

let displayedCount = 12;
let activeComplaintId = null;
let currentGalleryIndex = 0;

/* ===================================================================
   UTILITY FUNCTIONS
=================================================================== */
function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff/60) + 'm ago';
  if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
  if (diff < 2592000) return Math.floor(diff/86400) + 'd ago';
  return date.toLocaleDateString('en-BD', { day:'numeric', month:'short', year:'numeric' });
}

function formatDateTime(date) {
  return date.toLocaleDateString('en-BD', { day:'numeric', month:'short', year:'numeric' }) +
    ' at ' + date.toLocaleTimeString('en-BD', { hour:'2-digit', minute:'2-digit', hour12:true });
}

function getDistrict(id) { id = parseInt(id); return DISTRICTS.find(d => d.id === id); }
function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function getAshon(id) { id = parseInt(id); return ASHONS.find(a => a.id === id); }

function showToast(type, title, message) {
  const icons = { success:'check_circle', error:'error', info:'info', warning:'warning' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon" style="font-variation-settings:'FILL' 1">${icons[type]||'info'}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.replace('show','hide');
    toast.addEventListener('transitionend', () => toast.remove(), {once:true});
  }, 4000);
}

function getSession() {
  try { return JSON.parse(localStorage.getItem('cb_user')); } catch { return null; }
}

/* ===================================================================
   FILTER & SORT LOGIC
=================================================================== */
function applyFilters() {
  let results = COMPLAINTS.filter(c => {
    if (filterState.search) {
      const q = filterState.search.toLowerCase();
      const hay = ((c.subject||'') + ' ' + (c.complaint_uid||'') + ' ' + (c.description||'')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filterState.district && String(c.district_id) !== String(filterState.district)) return false;
    if (filterState.ashon    && String(c.ashon_id)    !== String(filterState.ashon))    return false;
    if (filterState.areas.size > 0 && !filterState.areas.has(c.area_name)) return false;
    if (filterState.categories.size > 0) {
      // Match if ANY of the complaint's categories is selected.
      const cats = Array.isArray(c.categories) && c.categories.length ? c.categories : [c.category || 'others'];
      if (!cats.some(x => filterState.categories.has(x))) return false;
    }
    if (filterState.status && c.status !== filterState.status) return false;
    const d = c.submitted_at instanceof Date ? c.submitted_at : _toDate(c.submitted_at);
    if (filterState.month && (d.getMonth() + 1) !== parseInt(filterState.month)) return false;
    if (filterState.year  &&  d.getFullYear() !== parseInt(filterState.year))    return false;
    return true;
  });
  results = sortComplaints(results);
  return results;
}

function sortComplaints(list) {
  const sort = document.getElementById('sort-select')?.value || 'newest';
  return [...list].sort((a, b) => {
    if (sort === 'newest') return b.submitted_at - a.submitted_at;
    if (sort === 'oldest') return a.submitted_at - b.submitted_at;
    if (sort === 'most_upvotes') return b.upvote_count - a.upvote_count;
    if (sort === 'least_upvotes') return a.upvote_count - b.upvote_count;
    if (sort === 'trending') {
      const scoreA = a.upvote_count * 0.7 + a.comment_count * 0.3;
      const scoreB = b.upvote_count * 0.7 + b.comment_count * 0.3;
      return scoreB - scoreA;
    }
    return 0;
  });
}

/* ===================================================================
   RENDER COMPLAINT CARDS
=================================================================== */
function renderCards() {
  const grid = document.getElementById('complaints-grid');
  if (!grid) { console.warn('[recent-complaints] grid #complaints-grid not found'); return; }
  const results = applyFilters();
  $do('results-count', el => { el.textContent = results.length });
  $do('hero-total', el => { el.textContent = results.length });

  const toShow = results.slice(0, displayedCount);
  grid.innerHTML = '';

  if (toShow.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="material-symbols-outlined">search_off</span>
        <h3>No Complaints Found</h3>
        <p>Try adjusting your filters or search query to find relevant issues.</p>
      </div>`;
    $do('load-more-wrap', el => { el.style.display = 'none' });
    return;
  }

  toShow.forEach((complaint, i) => {
    const card = createComplaintCard(complaint, i);
    grid.appendChild(card);
    // Animate progress bar after paint
    setTimeout(() => {
      const bar = card.querySelector('.progress-bar-v2');
      if (bar) bar.style.width = STATUS_PROGRESS[complaint.status] + '%';
    }, 100 + i * 60);
  });

  const remaining = results.length - displayedCount;
  const loadMoreWrap = document.getElementById('load-more-wrap');
  if (remaining > 0) {
    loadMoreWrap.style.display = 'flex';
    $do('load-more-text', el => { el.textContent = `${remaining} more complaint${remaining !== 1 ? 's' : ''} available` });
  } else {
    loadMoreWrap.style.display = 'none';
  }
}

function createComplaintCard(c, index) {
  const div = document.createElement('div');
  div.className = 'complaint-card-v2 reveal';
  div.style.transitionDelay = (index * 60) + 'ms';
  div.dataset.id = c.id;

  // Resolve location labels: prefer API-supplied names, fall back to id lookups.
  const districtName = c.district_name || (getDistrict(c.district_id)?.name) || '';
  const ashonLabel   = c.ashon_code   || (getAshon(c.ashon_id)?.label)     || '';
  const areaName     = c.area_name    || '';

  const cat = c.category || (Array.isArray(c.categories) && c.categories[0]) || 'others';
  const catLabel = String(cat).replace(/_/g, ' ');
  const isUpvoted = upvotedComplaints.has(c.id);
  const media = c.media && c.media.length > 0 ? c.media[0] : null;

  const imageSection = media
    ? `<div class="card-image-wrap"><img class="card-image" src="${media.url}" alt="${escHtml(c.subject)}" loading="lazy" onerror="this.parentNode.innerHTML='<div class=\\'card-image-placeholder\\' style=\\'background:${CAT_GRADIENTS[cat]||'linear-gradient(135deg,#1f2937,#374151)'}\\'><span class=\\'material-symbols-outlined\\'>${CAT_ICONS[cat]||'report'}</span><span class=\\'placeholder-cat\\'>${catLabel}</span></div><div class=\\'card-uid-badge\\'>${c.complaint_uid}</div>'"><div class="card-uid-badge">${c.complaint_uid}</div></div>`
    : `<div class="card-image-wrap"><div class="card-image-placeholder" style="background:${CAT_GRADIENTS[cat]||'linear-gradient(135deg,#1f2937,#374151)'}"><span class="material-symbols-outlined">${CAT_ICONS[cat]||'report'}</span><span class="placeholder-cat">${catLabel}</span></div><div class="card-uid-badge">${c.complaint_uid}</div></div>`;

  const locParts = [areaName, ashonLabel, districtName].filter(Boolean);
  div.innerHTML = `
    ${imageSection}
    <div class="card-content">

      <div class="card-tags-row">
        <span class="cat-tag cat-${cat}"><span class="material-symbols-outlined">${CAT_ICONS[cat]||'label'}</span>${catLabel}</span>
        <span class="priority-tag priority-${c.priority}"><span class="priority-dot"></span>${c.priority}</span>
        <div class="card-timestamp">${timeAgo(c.submitted_at)}</div>
        </div>
      <div class="card-title-v2">${escHtml(c.subject)}</div>
      <div class="card-desc-v2">${escHtml(c.description)}</div>
      <div class="card-location-v2">
        <span class="material-symbols-outlined">location_on</span>
        ${locParts.join(', ') || '—'}
      </div>
      <div class="card-footer-v2">
        <div class="progress-bar-wrap-v2">
          <div class="progress-bar-v2 pb-${c.status}" style="width:0%"></div>
        </div>
        <div class="card-actions-v2">
          <div class="status-badge-v2 s-${c.status}">
            <span class="status-dot-v2"></span>
            ${STATUS_LABELS[c.status] || c.status}
          </div>
          <div class="card-action-btns">
            <button class="action-btn-v2 upvote-btn ${isUpvoted ? 'upvoted' : ''}" data-id="${c.id}" title="Upvote">
              <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${isUpvoted?1:0}">thumb_up</span>
              <span class="upvote-count-${c.id}">${c.upvote_count}</span>
            </button>
            <button class="action-btn-v2 comment-btn" data-id="${c.id}" title="View Comments">
              <span class="material-symbols-outlined">comment</span>
              <span class="comment-count-${c.id}">${commentsData[c.id]?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;

  // Card click -> open modal (except action buttons)
  div.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn-v2')) return;
    openDetailModal(c.id);
  });

  // Upvote button
  div.querySelector('.upvote-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    handleUpvote(c.id);
  });

  // Comment button -> open modal scrolled to comments
  div.querySelector('.comment-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openDetailModal(c.id, true);
  });

  // Observe for scroll reveal
  revealObserver.observe(div);

  return div;
}

function handleUpvote(complaintId) {
  const complaint = COMPLAINTS.find(c => c.id === complaintId);
  if (!complaint) return;

  if (!window.API) return;
  window.API.toggleUpvote(complaintId)
    .then(res => {
      const upvoted = !!res.data.upvoted;
      const newCount = res.data.new_count;
      complaint.upvote_count = newCount;
      if (upvoted) upvotedComplaints.add(complaintId);
      else upvotedComplaints.delete(complaintId);
      saveUpvotes();

      const countEl = document.querySelector(`.upvote-count-${complaintId}`);
      if (countEl) countEl.textContent = newCount;
      const btns = document.querySelectorAll(`.upvote-btn[data-id="${complaintId}"]`);
      btns.forEach(btn => {
        btn.classList.toggle('upvoted', upvoted);
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = upvoted ? "'FILL' 1" : "'FILL' 0";
      });

      if (activeComplaintId === complaintId) {
        const modalUpvoteBtn = document.getElementById('btn-modal-upvote');
        if (modalUpvoteBtn) {
          modalUpvoteBtn.classList.toggle('upvoted', upvoted);
          const mc = document.getElementById('modal-upvote-count');
          if (mc) mc.textContent = newCount;
        }
      }
    })
    .catch(err => {
      if (err.status === 401) {
        if (window.AuthModal) window.AuthModal.open('signin');
        else if (window.showToast) window.showToast('Please sign in to upvote.', 'warning');
      } else if (window.showToast) {
        window.showToast(err.message || 'Could not upvote.', 'error');
      }
    });
}

/* ===================================================================
   DETAIL MODAL
=================================================================== */
function openDetailModal(complaintId, scrollToComments = false) {
  const complaint = COMPLAINTS.find(c => c.id === complaintId);
  if (!complaint) return;
  activeComplaintId = complaintId;
  currentGalleryIndex = 0;

  // Load full details + comments asynchronously when the API is available.
  if (window.API) {
    Promise.all([
      window.API.complaint(complaintId).catch(() => null),
      window.API.getComments(complaintId, 1, 50).catch(() => null),
    ]).then(([detailRes, commentsRes]) => {
      if (detailRes && detailRes.data) {
        const d = detailRes.data;
        // Merge proof + media + history
        complaint.media = [
          ...(d.citizen_media || []).map(m => ({ url: m.url, type: m.file_type, is_proof: 0 })),
          ...(d.proof_media   || []).map(m => ({ url: m.url, type: m.file_type, is_proof: 1 })),
        ];
        complaint.status_history = (d.status_history || []).map(h => ({
          status: h.status, changed_at: new Date(h.changed_at.replace(' ', 'T')), notes: h.notes,
        }));
        complaint.department_name = d.department_name;
        complaint.area_name       = d.area_name || d.ashon_code || d.district_name;
        complaint.upvote_count    = d.upvote_count;
        complaint.comment_count   = d.comment_count;
        complaint.is_own          = !!d.is_own;
        complaint.rating          = (d.rating && typeof d.rating === 'object') ? (d.rating.rating || null) : (d.rating || null);
        complaint.user_rating     = complaint.rating;
        if (d.has_upvoted) upvotedComplaints.add(complaintId);
        else upvotedComplaints.delete(complaintId);
      }
      if (commentsRes && commentsRes.data) {
        commentsData[complaintId] = (commentsRes.data.comments || []).map(c => ({
          id: c.id, user_id: c.user_id, username: c.full_name,
          text: c.comment_text, created_at: new Date(c.created_at.replace(' ', 'T')),
        })).reverse(); // server returns newest-first; UI expects ASC
      }
      // re-render body
      const body2 = document.getElementById('modal-body-content');
      if (body2) {
        body2.innerHTML = buildModalBody(complaint);
        initGallery(complaint);
        if (typeof bindCommentActions === 'function') bindCommentActions(complaint);
        // Re-attach star rating handlers — the body just got rewritten so
        // any listeners we attached in the first pass are now stale.
        if (typeof initStarRating === 'function') initStarRating(complaint);
      }
      const badge = document.getElementById('modal-comment-count');
      if (badge) badge.textContent = (commentsData[complaintId] || []).length;
    });
  }

  $do('modal-uid', el => { el.textContent = complaint.complaint_uid });

  const isUpvoted = upvotedComplaints.has(complaintId);
  const modalUpvoteBtn = document.getElementById('btn-modal-upvote');
  modalUpvoteBtn.classList.toggle('upvoted', isUpvoted);
  $do('modal-upvote-count', el => { el.textContent = complaint.upvote_count });

  // Build modal body
  const body = document.getElementById('modal-body-content');
  body.innerHTML = buildModalBody(complaint);

  // Initialize gallery
  initGallery(complaint);

  // Animate progress bars in modal
  setTimeout(() => {
    const bars = body.querySelectorAll('.progress-bar-v2');
    bars.forEach(b => {
      b.style.width = b.getAttribute('data-target') + '%';
    });
  }, 100);

  // Init star rating if applicable
  initStarRating(complaint);

  // Bind comment actions
  bindCommentActions(complaint);

  // Open overlay
  const overlay = document.getElementById('detail-modal-overlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (scrollToComments) {
    setTimeout(() => {
      const commSection = body.querySelector('.comments-section');
      if (commSection) commSection.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 300);
  }
}

function closeDetailModal() {
  document.getElementById('detail-modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
  activeComplaintId = null;
}

function buildModalBody(complaint) {
  const district = getDistrict(complaint.district_id);
  const ashon = getAshon(complaint.ashon_id);
  const session = getSession();
  const isUpvoted = upvotedComplaints.has(complaint.id);
  const proofMedia = complaint.media ? complaint.media.filter(m => m.is_proof) : [];

  // Gallery
  const galleryHTML = buildGalleryHTML(complaint);

  // Map
  const mapHTML = (complaint.map_lat && complaint.map_lng)
    ? `<div class="map-embed"><iframe src="https://maps.google.com/maps?q=${complaint.map_lat},${complaint.map_lng}&z=16&hl=en&output=embed" allowfullscreen></iframe></div>`
    : `<div class="map-placeholder"><span class="material-symbols-outlined">map</span><p>Location not specified</p></div>`;

  // Progress Timeline
  const stagesOrder = ['submitted','pending','in_review','assigned','in_progress','resolved'];
  const currentStageIndex = stagesOrder.indexOf(complaint.status);
  const timelineHTML = stagesOrder.map((stage, i) => {
    const isReached = i <= currentStageIndex && complaint.status !== 'rejected';
    const isCurrent = stage === complaint.status;
    const histEntry = complaint.status_history.find(h => h.status === stage);
    const tsText = histEntry ? formatDateTime(histEntry.changed_at) : '';
    const noteText = histEntry && histEntry.notes ? `<div class="timeline-note">${histEntry.notes}</div>` : '';
    const icons = { submitted:'send', pending:'hourglass_empty', in_review:'manage_search', assigned:'assignment_ind', in_progress:'sync', resolved:'check_circle' };
    return `
      <div class="timeline-item ${isReached ? 'reached' : ''} ${isCurrent ? 'current' : ''}">
        <div class="timeline-icon-wrap">
          <span class="material-symbols-outlined">${icons[stage]||'radio_button_unchecked'}</span>
        </div>
        <div class="timeline-content">
          <div class="timeline-label">${STATUS_LABELS[stage]}</div>
          ${isReached && tsText ? `<div class="timeline-ts">${tsText}</div>` : ''}
          ${noteText}
        </div>
      </div>`;
  }).join('');

  // Proof section (if resolved) — images AND videos open full-screen in the
  // lightbox. The top gallery never shows these (citizen media only).
  const proofHTML = (complaint.status === 'resolved' && proofMedia.length > 0) ? `
    <div class="proof-section">
      <h4><span class="material-symbols-outlined">photo_camera</span> Proof of Resolution</h4>
      <div class="proof-grid">
        ${proofMedia.map(m => m.type === 'video'
          ? `<div class="proof-thumb" style="cursor:zoom-in;position:relative" onclick="openLightbox('${m.url}','video')">
               <video src="${m.url}" muted preload="metadata" style="width:100%;height:100%;object-fit:cover;background:#000;pointer-events:none"></video>
               <span class="material-symbols-outlined" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:42px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.7);font-variation-settings:'FILL' 1">play_circle</span>
             </div>`
          : `<div class="proof-thumb" style="cursor:zoom-in"><img src="${m.url}" alt="Proof" onclick="openLightbox('${m.url}','image')" style="cursor:zoom-in"></div>`
        ).join('')}
      </div>
    </div>` : '';

  // Star rating section — only show interactive stars to the submitter.
  // Other viewers see a read-only display when a rating exists.
  const isOwn      = !!complaint.is_own;
  const myRating   = complaint.user_rating || complaint.rating || 0;
  let ratingHTML = '';
  if (complaint.status === 'resolved') {
    if (isOwn && session) {
      ratingHTML = `
        <div style="margin-bottom:16px;padding:12px 16px;background:var(--surface-container-low);border-radius:12px;">
          <div style="font-size:13px;font-weight:600;color:var(--on-surface);margin-bottom:8px;">${myRating ? 'Your Rating' : 'Rate this Resolution'}</div>
          <div class="star-rating-input" id="star-rating-wrap" data-current="${myRating}">
            ${[1,2,3,4,5].map(n => `<span class="star-icon material-symbols-outlined ${n <= myRating ? 'filled' : ''}" style="cursor:pointer;${n <= myRating ? "color:#f59e0b;font-variation-settings:'FILL' 1;" : ''}" data-star="${n}">star</span>`).join('')}
          </div>
          <div style="font-size:11px;color:var(--outline);margin-top:4px;" id="rating-label">${myRating ? `You rated: ${myRating}/5` : 'Tap a star to rate'}</div>
        </div>`;
    } else if (myRating) {
      ratingHTML = `
        <div style="margin-bottom:16px;padding:12px 16px;background:var(--surface-container-low);border-radius:12px;">
          <div style="font-size:13px;font-weight:600;color:var(--on-surface);margin-bottom:8px;">Citizen Rating</div>
          <div class="star-rating-input" style="pointer-events:none">
            ${[1,2,3,4,5].map(n => `<span class="star-icon material-symbols-outlined ${n <= myRating ? 'filled' : ''}" style="${n <= myRating ? "color:#f59e0b;font-variation-settings:'FILL' 1;" : ''}" data-star="${n}">star</span>`).join('')}
          </div>
          <div style="font-size:11px;color:var(--outline);margin-top:4px;">${myRating}/5 rated by the citizen who submitted this</div>
        </div>`;
    }
  }

  // Comments
  const comments = commentsData[complaint.id] || [];
  const commentsHTML = comments.slice(0, 10).map(comm => buildCommentHTML(comm, complaint.id)).join('');
  const commentInputHTML = session
    ? `<div class="comment-input-section">
        <div class="comment-input-wrap">
          <textarea class="comment-textarea" id="new-comment-input" placeholder="Add a comment..." rows="2"></textarea>
          <button class="btn-send-comment" id="btn-send-comment">
            <span class="material-symbols-outlined">send</span> Send
          </button>
        </div>
       </div>`
    : `<div class="comment-input-section">
        <div class="signin-to-comment">
          <button onclick="if(window.AuthModal)window.AuthModal.open('signin')">Sign in</button> to add a comment.
        </div>
       </div>`;

  return `
    ${galleryHTML}
    <div class="modal-content-inner">
      <div class="modal-meta-row">
        <div class="modal-location">
          <span class="material-symbols-outlined">location_on</span>
          ${complaint.area_name}${ashon ? ' · '+ashon.label : ''}${district ? ' · '+district.name : ''}
        </div>
        <span class="modal-timestamp">${formatDateTime(complaint.submitted_at)}</span>
      </div>
      <div class="modal-tags-row">
        <span class="cat-tag cat-${complaint.category}"><span class="material-symbols-outlined">${CAT_ICONS[complaint.category]||'label'}</span>${complaint.category.replace(/_/g,' ')}</span>
        <span class="priority-tag priority-${complaint.priority}"><span class="priority-dot"></span>${complaint.priority}</span>
        <span class="status-badge-v2 s-${complaint.status}" style="padding:4px 10px;border-radius:9999px;background:var(--surface-container)"><span class="status-dot-v2"></span>${STATUS_LABELS[complaint.status]}</span>
      </div>
      <h2 class="modal-title">${complaint.subject}</h2>
      <p class="modal-desc">${complaint.description}</p>

      <div class="modal-map-section">
        <h4><span class="material-symbols-outlined">map</span> Location</h4>
        ${mapHTML}
      </div>

      <div class="modal-timeline">
        <h4><span class="material-symbols-outlined">timeline</span> Progress Timeline</h4>
        <div class="timeline-list">${timelineHTML}</div>
      </div>

      ${proofHTML}
      ${ratingHTML}

      <div class="comments-section">
        <div class="comments-header">
          <h4>Comments</h4>
          <span class="comment-count-badge" id="modal-comment-count">${comments.length}</span>
        </div>
        <div class="comment-list" id="modal-comment-list">
          ${commentsHTML || '<div style="font-size:13px;color:var(--outline);padding:8px 0;">No comments yet. Be the first!</div>'}
        </div>
        ${comments.length > 10 ? `<button class="btn-load-more-comments" id="btn-load-more-comments">Load More Comments</button>` : ''}
        ${commentInputHTML}
      </div>
    </div>`;
}

function buildCommentHTML(comm, complaintId) {
  const session = getSession();
  const isOwn = session && (session.fullName === comm.username || comm.user_id === 1);
  const color = getAvatarColor(comm.user_id || 0);
  const initials = getInitials(comm.username || 'User');
  return `
    <div class="comment-item" id="comment-${comm.id}" data-comment-id="${comm.id}" data-complaint-id="${complaintId}">
      <div class="comment-avatar" style="background:${color}">${initials}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="comment-username">${comm.username || 'Anonymous'}</span>
          <span class="comment-ts">${timeAgo(comm.created_at)}</span>
        </div>
        <div class="comment-text" id="comment-text-${comm.id}">${comm.text}</div>
        ${isOwn ? `
          <div class="comment-actions" style="margin-top:6px;">
            <button class="btn-comment-action btn-edit-comment" data-id="${comm.id}">
              <span class="material-symbols-outlined">edit</span> Edit
            </button>
            <div style="position:relative;">
              <button class="btn-comment-action delete btn-delete-comment" data-id="${comm.id}">
                <span class="material-symbols-outlined">delete</span> Delete
              </button>
              <div class="confirm-popup" id="confirm-${comm.id}">
                <p>Delete this comment?</p>
                <div class="confirm-popup-btns">
                  <button class="btn-confirm-yes" data-id="${comm.id}" data-complaint="${complaintId}">Yes</button>
                  <button class="btn-confirm-no" data-id="${comm.id}">No</button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>`;
}

function bindCommentActions(complaint) {
  const body = document.getElementById('modal-body-content');
  if (!body) return;

  // Send comment
  const sendBtn = body.querySelector('#btn-send-comment');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => addComment(complaint.id));
  }
  const textarea = body.querySelector('#new-comment-input');
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment(complaint.id); }
    });
  }

  // Edit buttons
  body.querySelectorAll('.btn-edit-comment').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      startEditComment(id, complaint.id);
    });
  });

  // Delete buttons
  body.querySelectorAll('.btn-delete-comment').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const popup = document.getElementById(`confirm-${btn.dataset.id}`);
      document.querySelectorAll('.confirm-popup.open').forEach(p => { if(p!==popup) p.classList.remove('open'); });
      popup.classList.toggle('open');
    });
  });

  // Confirm yes/no
  body.querySelectorAll('.btn-confirm-yes').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteComment(parseInt(btn.dataset.id), parseInt(btn.dataset.complaint));
    });
  });
  body.querySelectorAll('.btn-confirm-no').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(`confirm-${btn.dataset.id}`)?.classList.remove('open');
    });
  });

  // Load more comments
  const loadMoreBtn = body.querySelector('#btn-load-more-comments');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const list = body.querySelector('#modal-comment-list');
      const allComments = commentsData[complaint.id] || [];
      const currentCount = list.querySelectorAll('.comment-item').length;
      const nextBatch = allComments.slice(currentCount, currentCount + 10);
      nextBatch.forEach(comm => {
        list.insertAdjacentHTML('beforeend', buildCommentHTML(comm, complaint.id));
      });
      if (currentCount + 10 >= allComments.length) loadMoreBtn.remove();
    });
  }
}

function addComment(complaintId) {
  const textarea = document.getElementById('new-comment-input');
  if (!textarea || !textarea.value.trim()) return;
  const text = textarea.value.trim();

  if (!window.API) return;
  window.API.addComment(complaintId, text)
    .then(res => {
      const c = res.data;
      const newComment = {
        id: c.id,
        user_id: c.user_id,
        username: c.full_name,
        text: c.comment_text,
        created_at: new Date(c.created_at),
      };
      if (!commentsData[complaintId]) commentsData[complaintId] = [];
      commentsData[complaintId].push(newComment);

      const comp = COMPLAINTS.find(cc => cc.id === complaintId);
      if (comp) comp.comment_count++;

      textarea.value = '';
      _renderNewComment(newComment, complaintId);
    })
    .catch(err => {
      if (err.status === 401 && window.AuthModal) window.AuthModal.open('signin');
      else if (window.showToast) window.showToast(err.message || 'Could not post comment.', 'error');
    });
  return;
}

function _renderNewComment(newComment, complaintId) {
  // Re-render comment list
  const list = document.getElementById('modal-comment-list');
  if (list) {
    const noCommentMsg = list.querySelector('div');
    if (noCommentMsg && !noCommentMsg.classList.contains('comment-item')) noCommentMsg.remove();
    list.insertAdjacentHTML('beforeend', buildCommentHTML(newComment, complaintId));
    const complaint = COMPLAINTS.find(c => c.id === complaintId);
    if (complaint) bindCommentActions(complaint);
  }
  const badge = document.getElementById('modal-comment-count');
  if (badge) badge.textContent = commentsData[complaintId].length;
  document.querySelectorAll(`.comment-count-${complaintId}`).forEach(el => {
    el.textContent = commentsData[complaintId].length;
  });

  if (window.showToast) window.showToast('Comment posted.', 'success');
}

function startEditComment(commentId, complaintId) {
  const textEl = document.getElementById(`comment-text-${commentId}`);
  if (!textEl) return;
  const currentText = textEl.textContent;
  textEl.innerHTML = `
    <div class="comment-edit-wrap">
      <textarea class="comment-edit-textarea" id="edit-ta-${commentId}">${currentText}</textarea>
      <div class="comment-edit-actions">
        <button class="btn-save-comment" onclick="saveEditComment(${commentId},${complaintId})">Save</button>
        <button class="btn-cancel-comment" onclick="cancelEditComment(${commentId},'${currentText}')">Cancel</button>
      </div>
    </div>`;
}

function saveEditComment(commentId, complaintId) {
  const ta = document.getElementById(`edit-ta-${commentId}`);
  if (!ta || !ta.value.trim()) return;
  const comment = commentsData[complaintId]?.find(c => c.id === commentId);
  if (comment) comment.text = ta.value.trim();
  const textEl = document.getElementById(`comment-text-${commentId}`);
  if (textEl) textEl.innerHTML = ta.value.trim();
  showToast('success','Edited','Comment updated.');
}

function cancelEditComment(commentId, originalText) {
  const textEl = document.getElementById(`comment-text-${commentId}`);
  if (textEl) textEl.innerHTML = originalText;
}

function deleteComment(commentId, complaintId) {
  if (!commentsData[complaintId]) return;
  commentsData[complaintId] = commentsData[complaintId].filter(c => c.id !== commentId);
  const comp = COMPLAINTS.find(c => c.id === complaintId);
  if (comp) comp.comment_count = Math.max(0, comp.comment_count - 1);
  const commentEl = document.getElementById(`comment-${commentId}`);
  if (commentEl) commentEl.remove();
  const badge = document.getElementById('modal-comment-count');
  if (badge) badge.textContent = commentsData[complaintId].length;
  showToast('success','Deleted','Comment removed.');
}

/* ===================================================================
   GALLERY
=================================================================== */
function _citizenMedia(complaint) {
  // The top gallery must ONLY show citizen-uploaded media. Proof-of-resolution
  // media (uploaded by department staff) belongs solely to the dedicated
  // "Proof of Resolution" section at the bottom.
  return (complaint.media || []).filter(m => m && m.url && !m.is_proof);
}

function buildGalleryHTML(complaint) {
  const media = _citizenMedia(complaint);
  if (media.length === 0) {
    return `<div class="media-gallery"><div class="gallery-main"><div class="gallery-main-placeholder" style="background:${CAT_GRADIENTS[complaint.category]}"><span class="material-symbols-outlined">${CAT_ICONS[complaint.category]||'image'}</span><p>No media available</p></div></div></div>`;
  }
  const renderMain = (m) => m.type === 'video'
    ? `<video id="gallery-main-vid" src="${m.url}" controls style="width:100%;height:100%;object-fit:contain;background:#000"></video>`
    : `<img id="gallery-main-img" src="${m.url}" alt="${complaint.subject}" style="cursor:zoom-in" onclick="openLightbox('${m.url}')">`;
  const thumbsHTML = media.length > 1
    ? `<div class="gallery-thumbs">${media.map((m,i) => `<div class="gallery-thumb ${i===0?'active':''}" data-index="${i}">${
        m.type === 'video'
          ? `<video src="${m.url}" muted preload="metadata"></video><span class="material-symbols-outlined" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.6);font-size:24px">play_circle</span>`
          : `<img src="${m.url}" alt="Media ${i+1}">`
      }</div>`).join('')}</div>`
    : '';
  return `
    <div class="media-gallery">
      <div class="gallery-main" id="gallery-main-wrap">
        ${renderMain(media[0])}
        ${media.length > 1 ? `
          <button class="gallery-nav prev" id="gallery-prev"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="gallery-nav next" id="gallery-next"><span class="material-symbols-outlined">chevron_right</span></button>
        ` : ''}
      </div>
      ${thumbsHTML}
    </div>`;
}

function initGallery(complaint) {
  const media = _citizenMedia(complaint);
  if (media.length <= 1) return;
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const wrap    = document.getElementById('gallery-main-wrap');
  const thumbs  = document.querySelectorAll('.gallery-thumb');

  function showSlide(idx) {
    currentGalleryIndex = (idx + media.length) % media.length;
    if (wrap) {
      const m = media[currentGalleryIndex];
      // Preserve nav buttons; swap the media element in-place
      const navs = wrap.querySelectorAll('.gallery-nav');
      wrap.innerHTML = m.type === 'video'
        ? `<video id="gallery-main-vid" src="${m.url}" controls style="width:100%;height:100%;object-fit:contain;background:#000"></video>`
        : `<img id="gallery-main-img" src="${m.url}" alt="" style="cursor:zoom-in" onclick="openLightbox('${m.url}')">`;
      navs.forEach(n => wrap.appendChild(n));
    }
    thumbs.forEach((t,i) => t.classList.toggle('active', i === currentGalleryIndex));
  }
  prevBtn?.addEventListener('click', () => showSlide(currentGalleryIndex - 1));
  nextBtn?.addEventListener('click', () => showSlide(currentGalleryIndex + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => showSlide(i)));
}

function openLightbox(url, kind) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-vid');
  if (!lb) return;
  // Auto-detect video by extension if no explicit kind given
  if (!kind) {
    kind = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url) ? 'video' : 'image';
  }
  if (kind === 'video') {
    if (img) { img.src = ''; img.style.display = 'none'; }
    if (vid) {
      vid.src = url;
      vid.style.display = 'block';
      try { vid.currentTime = 0; vid.play().catch(()=>{}); } catch(_) {}
    }
  } else {
    if (vid) { try { vid.pause(); } catch(_) {} vid.src = ''; vid.style.display = 'none'; }
    if (img) { img.src = url; img.style.display = 'block'; }
  }
  lb.classList.add('open');
}

/* ===================================================================
   STAR RATING
=================================================================== */
function initStarRating(complaint) {
  const wrap = document.getElementById('star-rating-wrap');
  if (!wrap) return;
  // Read-only display — no listeners attached
  if (wrap.style && wrap.style.pointerEvents === 'none') return;
  const stars = wrap.querySelectorAll('.star-icon');
  const label = document.getElementById('rating-label');
  let currentRating = complaint.user_rating || complaint.rating || 0;
  let saving = false;

  function paint(n, permanent = false) {
    stars.forEach((s, i) => {
      const fill = i < n;
      s.classList.toggle('filled', fill);
      s.style.color = fill ? '#f59e0b' : '';
      s.style.fontVariationSettings = fill ? "'FILL' 1" : "'FILL' 0";
    });
    if (label) {
      if (permanent && n > 0) label.textContent = `You rated: ${n}/5`;
      else if (n > 0)         label.textContent = `Rate ${n}/5`;
      else                    label.textContent = 'Tap a star to rate';
    }
  }

  paint(currentRating, currentRating > 0);

  stars.forEach((s, i) => {
    s.addEventListener('mouseenter', () => paint(i + 1, false));
    s.addEventListener('mouseleave', () => paint(currentRating, currentRating > 0));
    s.addEventListener('click', () => {
      if (saving) return;
      const session = getSession();
      if (!session) {
        showToast('info', 'Sign In', 'Please sign in to rate.');
        if (window.AuthModal && window.AuthModal.open) window.AuthModal.open('signin');
        return;
      }
      if (!complaint.is_own) {
        showToast('warning', 'Cannot Rate', 'Only the citizen who filed this complaint can rate it.');
        return;
      }
      if (complaint.status !== 'resolved') {
        showToast('warning', 'Not Yet', 'You can rate only after the complaint is marked resolved.');
        return;
      }
      const rating = i + 1;
      saving = true;
      paint(rating, false);
      if (!window.API || !window.API.submitRating) {
        currentRating = rating;
        complaint.user_rating = rating;
        complaint.rating      = rating;
        paint(rating, true);
        showToast('success', 'Rating Saved', `You rated this complaint ${rating}/5 stars.`);
        saving = false;
        return;
      }
      window.API.submitRating(complaint.id, rating)
        .then(() => {
          currentRating = rating;
          complaint.user_rating = rating;
          complaint.rating      = rating;
          paint(rating, true);
          showToast('success', 'Rating Saved', `You rated this complaint ${rating}/5 stars.`);
        })
        .catch(err => {
          showToast('error', 'Rating Failed', (err && err.message) || 'Could not save rating.');
          paint(currentRating, currentRating > 0);
        })
        .finally(() => { saving = false; });
    });
  });
}

/* ===================================================================
   GEOGRAPHIC DROPDOWNS
=================================================================== */
function populateDistrictDropdown(sel) {
  sel.innerHTML = '<option value="">All Districts</option>';
  DISTRICTS.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.name;
    sel.appendChild(opt);
  });
}

function populateAshonDropdown(sel, districtId) {
  sel.innerHTML = districtId
    ? '<option value="">All Ashon Numbers</option>'
    : '<option value="">Select District First</option>';
  sel.disabled = !districtId;
  if (!districtId) return;
  if (window.API) {
    window.API.ashons(districtId).then(res => {
      const list = (res.data && res.data.ashons) || [];
      list.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = a.ashon_code;
        sel.appendChild(opt);
      });
    }).catch(() => {
      // Fallback to mock data if API fails
      ASHONS.filter(a => a.district_id === parseInt(districtId)).forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = a.label;
        sel.appendChild(opt);
      });
    });
  } else {
    ASHONS.filter(a => a.district_id === parseInt(districtId)).forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = a.label;
      sel.appendChild(opt);
    });
  }
}

function populateAreaCheckboxes(container, ashonId) {
  if (!ashonId) {
    container.innerHTML = '<div style="font-size:12px;color:var(--outline);padding:4px 0;">Select Ashon No. first</div>';
    return;
  }
  const render = (areas) => {
    if (!areas || areas.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:var(--outline);padding:4px 0;">No areas found</div>';
      return;
    }
    container.innerHTML = areas.map(a => `
      <label class="area-checkbox-item">
        <input type="checkbox" value="${a.name}" ${filterState.areas.has(a.name)?'checked':''}> ${a.name}
      </label>`).join('');
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) filterState.areas.add(cb.value);
        else filterState.areas.delete(cb.value);
        onFilterChange();
      });
    });
  };
  if (window.API) {
    window.API.areas(ashonId).then(res => render((res.data && res.data.areas) || []))
      .catch(() => render(AREAS.filter(a => a.ashon_id === parseInt(ashonId))));
  } else {
    render(AREAS.filter(a => a.ashon_id === parseInt(ashonId)));
  }
}

/* ===================================================================
   FILTER INIT & EVENTS
=================================================================== */
function initFilters() {
  const districtSel = document.getElementById('filter-district');
  const ashonSel = document.getElementById('filter-ashon');
  const areaContainer = document.getElementById('area-checkboxes');
  const searchInput = document.getElementById('filter-search');
  const monthSel = document.getElementById('filter-month');
  const yearSel = document.getElementById('filter-year');

  populateDistrictDropdown(districtSel);

  districtSel.addEventListener('change', () => {
    filterState.district = districtSel.value;
    filterState.ashon = '';
    filterState.areas.clear();
    ashonSel.value = '';
    populateAshonDropdown(ashonSel, districtSel.value);
    populateAreaCheckboxes(areaContainer, '');
    onFilterChange();
  });

  ashonSel.addEventListener('change', () => {
    filterState.ashon = ashonSel.value;
    filterState.areas.clear();
    populateAreaCheckboxes(areaContainer, ashonSel.value);
    onFilterChange();
  });

  // Search (debounced)
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterState.search = searchInput.value;
      onFilterChange();
    }, 300);
  });

  // Category toggles
  document.querySelectorAll('.cat-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      if (filterState.categories.has(cat)) { filterState.categories.delete(cat); btn.classList.remove('selected'); }
      else { filterState.categories.add(cat); btn.classList.add('selected'); }
      onFilterChange();
    });
  });

  // Status pills
  document.querySelectorAll('.status-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.status = btn.dataset.status;
      onFilterChange();
    });
  });

  // Month/Year
  monthSel.addEventListener('change', () => { filterState.month = monthSel.value; onFilterChange(); });
  yearSel.addEventListener('change', () => { filterState.year = yearSel.value; onFilterChange(); });

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', () => {
    displayedCount = 12;
    renderCards();
  });

  // Reset buttons
  document.getElementById('btn-reset-all')?.addEventListener('click', resetFilters);
  document.getElementById('btn-reset-full')?.addEventListener('click', resetFilters);

  // Load more
  document.getElementById('btn-load-more')?.addEventListener('click', () => {
    displayedCount += 12;
    renderCards();
  });
}

function onFilterChange() {
  displayedCount = 12;
  renderCards();
}

function resetFilters() {
  filterState.search = '';
  filterState.district = '';
  filterState.ashon = '';
  filterState.areas.clear();
  filterState.categories.clear();
  filterState.status = '';
  filterState.month = '';
  filterState.year = '';

  $do('filter-search', el => { el.value = '' });
  $do('filter-district', el => { el.value = '' });
  const ashonSel = document.getElementById('filter-ashon');
  ashonSel.innerHTML = '<option value="">Select District First</option>';
  ashonSel.disabled = true;
  $do('area-checkboxes', el => { el.innerHTML = '<div style="font-size:12px;color:var(--outline);padding:4px 0;">Select Ashon No. first</div>'; });
  document.querySelectorAll('.cat-toggle').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.status-pill-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.status-pill-btn[data-status=""]')?.classList.add('active');
  $do('filter-month', el => { el.value = '' });
  $do('filter-year', el => { el.value = '' });

  displayedCount = 12;
  renderCards();
  showToast('info','Filters Reset','All filters have been cleared.');
}

/* ===================================================================
   NAVBAR
=================================================================== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 50);
});

document.getElementById('hamburger-btn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (menu) menu.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#mobile-menu') && !e.target.closest('#hamburger-btn')) {
    document.getElementById('mobile-menu')?.classList.remove('open');
    document.getElementById('hamburger-btn')?.classList.remove('open');
  }
});

// Sign In buttons
document.getElementById('btn-signin-nav')?.addEventListener('click', () => {
  if (window.AuthModal) window.AuthModal.open('signin');
  else showToast('info','Sign In','Auth modal not loaded.');
});
document.getElementById('mobile-signin-btn')?.addEventListener('click', () => {
  document.getElementById('mobile-menu')?.classList.remove('open');
  if (window.AuthModal) window.AuthModal.open('signin');
});

/* ===================================================================
   MODAL EVENTS
=================================================================== */
document.getElementById('btn-modal-close')?.addEventListener('click', closeDetailModal);
document.getElementById('detail-modal-overlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeDetailModal();
});
function _closeLightbox() {
  const lb  = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-vid');
  if (vid) { try { vid.pause(); } catch(_) {} vid.src = ''; vid.style.display = 'none'; }
  const img = document.getElementById('lightbox-img');
  if (img) { img.src = ''; }
  if (lb) lb.classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('detail-modal-overlay')?.classList.contains('open')) {
    closeDetailModal();
  }
  if (e.key === 'Escape' && document.getElementById('lightbox')?.classList.contains('open')) {
    _closeLightbox();
  }
});

document.getElementById('btn-modal-upvote')?.addEventListener('click', () => {
  if (activeComplaintId) handleUpvote(activeComplaintId);
});
document.getElementById('btn-modal-share-top')?.addEventListener('click', shareComplaint);
document.getElementById('btn-modal-share-bottom')?.addEventListener('click', shareComplaint);

function shareComplaint() {
  const complaint = COMPLAINTS.find(c => c.id === activeComplaintId);
  if (!complaint) return;
  const text = `${complaint.subject} — ${complaint.complaint_uid}`;
  if (navigator.share) {
    navigator.share({ title: text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('success','Link Copied','Complaint link copied to clipboard.');
    });
  }
}

document.getElementById('btn-lightbox-close')?.addEventListener('click', _closeLightbox);
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) _closeLightbox();
});

/* ===================================================================
   MOBILE BOTTOM SHEET
=================================================================== */
document.getElementById('btn-open-filters')?.addEventListener('click', () => {
  const overlay = document.getElementById('bottom-sheet-overlay');
  const content = document.getElementById('bottom-sheet-content');
  if (!overlay || !content) return;
  content.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:18px;padding-bottom:20px;">
      <div class="filter-group">
        <div class="filter-group-label">Search</div>
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined filter-search-icon">search</span>
          <input type="text" class="filter-search" id="mob-search" placeholder="Search..." value="${filterState.search}">
        </div>
      </div>
      <div class="filter-group">
        <div class="filter-group-label">Status</div>
        <select class="filter-select" id="mob-status">
          <option value="">All Statuses</option>
          ${Object.entries(STATUS_LABELS).map(([k,v]) => `<option value="${k}" ${filterState.status===k?'selected':''}>${v}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <div class="filter-group-label">Category</div>
        <div class="category-grid">
          ${Object.entries(CAT_ICONS).map(([cat, icon]) => `
            <button class="cat-toggle ${filterState.categories.has(cat)?'selected':''}" data-cat="${cat}">
              <span class="material-symbols-outlined">${icon}</span>
              ${cat.replace(/_/g,' ')}
            </button>`).join('')}
        </div>
      </div>
      <button class="btn-reset-full" id="mob-reset">Reset All Filters</button>
      <button style="padding:12px;border-radius:12px;background:var(--primary-container);color:white;border:none;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;cursor:pointer;" id="mob-apply">Apply Filters</button>
    </div>`;
  overlay.classList.add('open');

  content.querySelector('#mob-search').addEventListener('input', (e) => filterState.search = e.target.value);
  content.querySelector('#mob-status').addEventListener('change', (e) => filterState.status = e.target.value);
  content.querySelectorAll('.cat-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      btn.classList.toggle('selected');
      if (filterState.categories.has(cat)) filterState.categories.delete(cat);
      else filterState.categories.add(cat);
    });
  });
  content.querySelector('#mob-reset').addEventListener('click', () => {
    resetFilters();
    overlay.classList.remove('open');
  });
  content.querySelector('#mob-apply').addEventListener('click', () => {
    onFilterChange();
    overlay.classList.remove('open');
    showToast('success','Filters Applied','Complaints filtered successfully.');
  });
});

document.getElementById('btn-sheet-close')?.addEventListener('click', () => {
  document.getElementById('bottom-sheet-overlay')?.classList.remove('open');
});
document.getElementById('bottom-sheet-overlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// Mobile quick filter buttons (in filter bar)
document.querySelectorAll('.mobile-filter-bar [data-cat]').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    if (filterState.categories.has(cat)) {
      filterState.categories.delete(cat);
      btn.classList.remove('active');
    } else {
      filterState.categories.clear();
      document.querySelectorAll('.mobile-filter-bar [data-cat]').forEach(b => b.classList.remove('active'));
      filterState.categories.add(cat);
      btn.classList.add('active');
    }
    onFilterChange();
  });
});
document.querySelectorAll('.mobile-filter-bar [data-status]').forEach(btn => {
  btn.addEventListener('click', () => {
    filterState.status = btn.dataset.status;
    document.querySelectorAll('.mobile-filter-bar [data-status]').forEach(b => b.classList.remove('active'));
    btn.classList.toggle('active', true);
    onFilterChange();
  });
});

/* ===================================================================
   SCROLL REVEAL
=================================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===================================================================
   INIT
=================================================================== */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // If the user has a server-side session (cookie) but no localStorage entry
    // (e.g. they logged in on another tab or via API), sync it so getSession()
    // sees them as signed-in. Without this, "Sign in to rate/comment" appears
    // even though the API requests succeed.
    try {
      if (window.API && !localStorage.getItem('cb_user')) {
        const s = await window.API.session().catch(() => null);
        if (s && s.success && s.data && s.data.id) {
          localStorage.setItem('cb_user', JSON.stringify({
            userId:    s.data.user_uid || '',
            serverId:  s.data.id,
            role:      s.data.role     || 'citizen',
            fullName:  s.data.full_name|| '',
            email:     s.data.email    || '',
            isVerified: true,
            token:     'cookie',
          }));
        }
      }
    } catch (_) {}
    // Block the initial mock render — show only real DB data.
    COMPLAINTS = [];
    // Load real geo data first so the filter dropdowns match the DB IDs.
    try { await loadLiveGeo(); }       catch (e) { console.warn('[recent] loadLiveGeo:', e); }
    try { await loadLiveComplaints(); } catch (e) { console.warn('[recent] loadLiveComplaints:', e); }
    try { initFilters(); }              catch (e) { console.warn('[recent] initFilters:', e); }
    try { renderCards(); }              catch (e) { console.error('[recent] renderCards:', e); }
  } catch (e) {
    console.error('[recent] init failed:', e);
  }
});

function _mapApiCategory(catKey) { return catKey || 'others'; }

/** Replace the static DISTRICTS/ASHONS/AREAS arrays with live DB data. */
async function loadLiveGeo() {
  if (!window.API) return;
  try {
    const dRes = await window.API.districts();
    const ds = (dRes.data && dRes.data.districts) || [];
    if (ds.length) {
      DISTRICTS.length = 0;
      ds.forEach(d => DISTRICTS.push({ id: d.id, name: d.name }));
    }
  } catch (e) { console.warn('loadLiveGeo districts failed', e); }
}

async function loadLiveComplaints() {
  if (!window.API) return;
  try {
    // Always treat this view as PUBLIC: only approved, non-deleted complaints
    // are visible regardless of who is logged in. (Rejected complaints should
    // never appear here.)
    const res = await window.API.complaints({ per_page: 200, sort: 'newest', public: 1 });
    const list = (res.data && res.data.complaints) || [];
    COMPLAINTS = list.map(c => {
      const cats = (c.categories && c.categories.length) ? c.categories : ['others'];
      return {
        id:             c.id,
        complaint_uid:  c.complaint_id,
        subject:        c.subject || '',
        description:    c.description || '',
        category:       cats[0],
        categories:     cats,
        priority:       c.priority || 'medium',
        status:         c.status || 'submitted',
        district_id:    c.district_id || null,
        ashon_id:       c.ashon_id || null,
        area_id:        c.area_id || null,
        area_name:      c.area_name || c.ashon_code || c.district_name || '—',
        district_name:  c.district_name || '',
        ashon_code:     c.ashon_code || '',
        department_name:c.department_name || '',
        map_lat:        c.map_lat,
        map_lng:        c.map_lng,
        upvote_count:   c.upvote_count || 0,
        comment_count:  c.comment_count || 0,
        submitted_at:   _toDate(c.submitted_at),
        media:          c.first_image_url ? [{ url: c.first_image_url, type: 'image' }] : [],
        first_image_url:c.first_image_url,
        comments:       [],
        status_history: [],
        is_featured:    c.is_featured ? 1 : 0,
        has_upvoted:    !!c.has_upvoted,
        is_own:         !!c.is_own,
        rating:         c.rating || null,
        user_rating:    c.rating || null,
        citizen_name:   c.citizen_name || 'Citizen',
      };
    });
    upvotedComplaints = new Set(COMPLAINTS.filter(c => c.has_upvoted).map(c => c.id));
    commentsData = {};
    COMPLAINTS.forEach(c => { commentsData[c.id] = []; });
  } catch (e) {
    console.warn('loadLiveComplaints failed', e);
    COMPLAINTS = [];
  }
}

function _toDate(s) {
  if (!s) return new Date();
  if (s instanceof Date) return s;
  // MySQL DATETIME → ISO
  const d = new Date(typeof s === 'string' ? s.replace(' ', 'T') : s);
  return isNaN(d.getTime()) ? new Date() : d;
}

// Also expose for inline calls
window.openLightbox = openLightbox;
window.saveEditComment = saveEditComment;
window.cancelEditComment = cancelEditComment;
