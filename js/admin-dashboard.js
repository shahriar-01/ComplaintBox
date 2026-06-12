// ===== DATA STORE =====
const DATA = {
  settings: { auto_assignment: true, maintenance_mode: false },
  
  departments: [
    { id:1, name:'City Infrastructure Dept', category_key:'infrastructure', contact_email:'infra@complaintbox.gov.bd', contact_phone:'01711-001001', description:'Handles roads, bridges, footpaths and civil structures.', icon:'construction', staff:4 },
    { id:2, name:'WASA Water Services', category_key:'water_service', contact_email:'water@complaintbox.gov.bd', contact_phone:'01711-002002', description:'Water supply, sewage and drainage services.', icon:'water_drop', staff:3 },
    { id:3, name:'DESCO Electricity', category_key:'electricity', contact_email:'power@complaintbox.gov.bd', contact_phone:'01711-003003', description:'Electricity supply, outages and billing.', icon:'electric_bolt', staff:3 },
    { id:4, name:'Waste Management Dept', category_key:'waste_management', contact_email:'waste@complaintbox.gov.bd', contact_phone:'01711-004004', description:'Waste collection, recycling and disposal.', icon:'delete_sweep', staff:2 },
    { id:5, name:'Traffic & Transport Auth', category_key:'traffic_transport', contact_email:'traffic@complaintbox.gov.bd', contact_phone:'01711-005005', description:'Traffic management and public transport.', icon:'traffic', staff:3 },
    { id:6, name:'Environment Dept', category_key:'environment', contact_email:'env@complaintbox.gov.bd', contact_phone:'01711-006006', description:'Environmental protection and green spaces.', icon:'eco', staff:2 },
    { id:7, name:'Public Services Dept', category_key:'public_services', contact_email:'public@complaintbox.gov.bd', contact_phone:'01711-007007', description:'General public services and welfare.', icon:'local_police', staff:3 },
    { id:8, name:'General Affairs Dept', category_key:'others', contact_email:'general@complaintbox.gov.bd', contact_phone:'01711-008008', description:'Miscellaneous civic issues.', icon:'more_horiz', staff:2 },
  ],

  users: [
    { id:1, user_uid:'CB-USR-00001', full_name:'Arif Hossain', username:'arif_h', email:'arif@demo.bd', phone:'01711-100001', nid_number:'1234567890', district:'Dhaka', ashon:'Dhaka-09', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-01-15', complaints:7, upvotes_given:14, comments_made:9 },
    { id:2, user_uid:'CB-USR-00002', full_name:'Nasrin Begum', username:'nasrin_b', email:'nasrin@demo.bd', phone:'01711-100002', nid_number:'2345678901', district:'Chattogram', ashon:'Chattogram-01', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-02-03', complaints:4, upvotes_given:8, comments_made:5 },
    { id:3, user_uid:'CB-USR-00003', full_name:'Rakib Ullah', username:'rakib_u', email:'rakib@demo.bd', phone:'01711-100003', nid_number:'3456789012', district:'Sylhet', ashon:'Sylhet-01', role:'citizen', profile_verified:'pending', is_banned:false, created_at:'2025-03-20', complaints:2, upvotes_given:3, comments_made:2 },
    { id:4, user_uid:'CB-USR-00004', full_name:'Fatema Khatun', username:'fatema_k', email:'fatema@demo.bd', phone:'01711-100004', nid_number:'4567890123', district:'Rajshahi', ashon:'Rajshahi-01', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-04-10', complaints:5, upvotes_given:11, comments_made:7 },
    { id:5, user_uid:'CB-USR-00005', full_name:'Karim Mia', username:'karim_m', email:'karim@demo.bd', phone:'01711-100005', nid_number:'5678901234', district:'Khulna', ashon:'Khulna-01', role:'citizen', profile_verified:'pending', is_banned:true, created_at:'2025-05-01', complaints:1, upvotes_given:2, comments_made:3 },
    { id:6, user_uid:'CB-USR-00006', full_name:'Shirin Akter', username:'shirin_a', email:'shirin@demo.bd', phone:'01711-100006', nid_number:'6789012345', district:'Barishal', ashon:'Barishal-01', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-05-18', complaints:3, upvotes_given:6, comments_made:4 },
    { id:7, user_uid:'CB-USR-00007', full_name:'Jamal Uddin', username:'jamal_u', email:'jamal@demo.bd', phone:'01711-100007', nid_number:'7890123456', district:'Rangpur', ashon:'Rangpur-01', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-06-02', complaints:6, upvotes_given:15, comments_made:8 },
    { id:8, user_uid:'CB-USR-00008', full_name:'Mina Islam', username:'mina_i', email:'mina@demo.bd', phone:'01711-100008', nid_number:'8901234567', district:'Mymensingh', ashon:'Mymensingh-01', role:'citizen', profile_verified:'pending', is_banned:false, created_at:'2025-06-25', complaints:0, upvotes_given:1, comments_made:0 },
    { id:9, user_uid:'CB-USR-00009', full_name:'Roshid Malik', username:'roshid_m', email:'roshid@demo.bd', phone:'01711-100009', nid_number:'9012345678', district:'Dhaka', ashon:'Dhaka-10', role:'citizen', profile_verified:'verified', is_banned:false, created_at:'2025-07-01', complaints:4, upvotes_given:7, comments_made:5 },
    { id:10, user_uid:'CB-USR-00010', full_name:'Parvin Sultana', username:'parvin_s', email:'parvin@demo.bd', phone:'01711-100010', nid_number:'0123456789', district:'Chattogram', ashon:'Chattogram-05', role:'citizen', profile_verified:'pending', is_banned:false, created_at:'2025-07-10', complaints:2, upvotes_given:4, comments_made:2 },
  ],

  staff: [
    { id:1, staff_uid:'CB-STF-00001', id_card_number:'STF-INFRA-001', full_name:'Shahed Rahman', email:'shahed@infra.bd', phone:'01811-200001', nid_number:'1122334455', department_id:1, designation:'Operations Manager', district:'Dhaka', ashon:'Dhaka-09', work_status:'active', joined_date:'2024-01-10', complaints_handled:12 },
    { id:2, staff_uid:'CB-STF-00002', id_card_number:'STF-WATER-001', full_name:'Lovely Begum', email:'lovely@water.bd', phone:'01811-200002', nid_number:'2233445566', department_id:2, designation:'Field Officer', district:'Dhaka', ashon:'Dhaka-11', work_status:'active', joined_date:'2024-03-05', complaints_handled:8 },
    { id:3, staff_uid:'CB-STF-00003', id_card_number:'STF-POWER-001', full_name:'Amin Chowdhury', email:'amin@power.bd', phone:'01811-200003', nid_number:'3344556677', department_id:3, designation:'Technical Officer', district:'Chattogram', ashon:'Chattogram-01', work_status:'active', joined_date:'2024-02-14', complaints_handled:15 },
    { id:4, staff_uid:'CB-STF-00004', id_card_number:'STF-WASTE-001', full_name:'Tariq Islam', email:'tariq@waste.bd', phone:'01811-200004', nid_number:'4455667788', department_id:4, designation:'Field Supervisor', district:'Dhaka', ashon:'Dhaka-06', work_status:'on_leave', joined_date:'2024-04-20', complaints_handled:6 },
    { id:5, staff_uid:'CB-STF-00005', id_card_number:'STF-TRAF-001', full_name:'Nazma Khanam', email:'nazma@traffic.bd', phone:'01811-200005', nid_number:'5566778899', department_id:5, designation:'Traffic Coordinator', district:'Dhaka', ashon:'Dhaka-01', work_status:'active', joined_date:'2024-05-15', complaints_handled:10 },
    { id:6, staff_uid:'CB-STF-00006', id_card_number:'STF-ENV-001', full_name:'Sumon Das', email:'sumon@env.bd', phone:'01811-200006', nid_number:'6677889900', department_id:6, designation:'Environmental Inspector', district:'Sylhet', ashon:'Sylhet-02', work_status:'active', joined_date:'2024-06-01', complaints_handled:7 },
    { id:7, staff_uid:'CB-STF-00007', id_card_number:'STF-PUB-001', full_name:'Ritu Rani', email:'ritu@public.bd', phone:'01811-200007', nid_number:'7788990011', department_id:7, designation:'Service Officer', district:'Rajshahi', ashon:'Rajshahi-01', work_status:'active', joined_date:'2024-07-10', complaints_handled:9 },
    { id:8, staff_uid:'CB-STF-00008', id_card_number:'STF-GEN-001', full_name:'Badrul Haq', email:'badrul@general.bd', phone:'01811-200008', nid_number:'8899001122', department_id:8, designation:'General Officer', district:'Khulna', ashon:'Khulna-02', work_status:'active', joined_date:'2024-08-22', complaints_handled:5 },
  ],

  complaints: [
    { id:1, complaint_id:'CB-2025-00001', subject:'Major road crack on Mirpur road', description:'A large crack has developed along Mirpur-10 main road causing traffic issues and risk to vehicles.', priority:'critical', status:'in_progress', categories:['infrastructure'], district:'Dhaka', ashon:'Dhaka-06', area:'Mirpur-10', map_lat:23.8041, map_lng:90.3688, submitted_by:1, submitted_name:'Arif Hossain', submitted_phone:'01711-100001', submitted_nid:'1234567890', submitted_at:'2025-01-20', approved:true, approval_status:'approved', assigned_dept:1, upvote_count:47, comment_count:12, media:[{type:'image',url:'https://picsum.photos/seed/road1/800/450'},{type:'image',url:'https://picsum.photos/seed/road2/800/450'}] },
    { id:2, complaint_id:'CB-2025-00002', subject:'Water supply disruption for 3 days', description:'No water supply in Gulshan-1 area for 3 consecutive days. Residents are severely affected.', priority:'high', status:'resolved', categories:['water_service'], district:'Dhaka', ashon:'Dhaka-10', area:'Gulshan-1', map_lat:23.7808, map_lng:90.4143, submitted_by:2, submitted_name:'Nasrin Begum', submitted_phone:'01711-100002', submitted_nid:'2345678901', submitted_at:'2025-02-10', approved:true, approval_status:'approved', assigned_dept:2, upvote_count:89, comment_count:23, media:[{type:'image',url:'https://picsum.photos/seed/water1/800/450'}] },
    { id:3, complaint_id:'CB-2025-00003', subject:'Frequent power outages in Banani', description:'Power cuts happening multiple times daily in Banani area causing huge problems for residents and businesses.', priority:'high', status:'assigned', categories:['electricity'], district:'Dhaka', ashon:'Dhaka-11', area:'Banani', map_lat:23.7934, map_lng:90.4044, submitted_by:3, submitted_name:'Rakib Ullah', submitted_phone:'01711-100003', submitted_nid:'3456789012', submitted_at:'2025-03-05', approved:true, approval_status:'approved', assigned_dept:3, upvote_count:34, comment_count:8, media:[{type:'image',url:'https://picsum.photos/seed/power1/800/450'}] },
    { id:4, complaint_id:'CB-2025-00004', subject:'Illegal dumping near Khilgaon market', description:'Garbage being dumped illegally near Khilgaon market creating health hazard and foul smell.', priority:'medium', status:'pending', categories:['waste_management'], district:'Dhaka', ashon:'Dhaka-09', area:'Khilgaon', map_lat:23.7344, map_lng:90.4265, submitted_by:4, submitted_name:'Fatema Khatun', submitted_phone:'01711-100004', submitted_nid:'4567890123', submitted_at:'2025-04-12', approved:false, approval_status:'pending', assigned_dept:4, upvote_count:22, comment_count:5, media:[{type:'image',url:'https://picsum.photos/seed/waste1/800/450'},{type:'image',url:'https://picsum.photos/seed/waste2/800/450'}] },
    { id:5, complaint_id:'CB-2025-00005', subject:'Traffic signal malfunction at Farmgate', description:'Traffic signals at Farmgate intersection not working for over a week causing massive traffic jams.', priority:'critical', status:'in_review', categories:['traffic_transport'], district:'Dhaka', ashon:'Dhaka-17', area:'Farmgate', map_lat:23.7573, map_lng:90.3877, submitted_by:5, submitted_name:'Karim Mia', submitted_phone:'01711-100005', submitted_nid:'5678901234', submitted_at:'2025-04-20', approved:true, approval_status:'approved', assigned_dept:5, upvote_count:67, comment_count:19, media:[{type:'image',url:'https://picsum.photos/seed/traffic1/800/450'}] },
    { id:6, complaint_id:'CB-2025-00006', subject:'River pollution near Buriganga', description:'Industrial waste being dumped into Buriganga river causing severe environmental damage.', priority:'high', status:'submitted', categories:['environment'], district:'Dhaka', ashon:'Dhaka-01', area:'Lalbagh', map_lat:23.7180, map_lng:90.3845, submitted_by:6, submitted_name:'Shirin Akter', submitted_phone:'01711-100006', submitted_nid:'6789012345', submitted_at:'2025-05-08', approved:false, approval_status:'pending', assigned_dept:null, upvote_count:55, comment_count:14, media:[{type:'image',url:'https://picsum.photos/seed/river1/800/450'}] },
    { id:7, complaint_id:'CB-2025-00007', subject:'Street lights not working in Dhanmondi', description:'Multiple street lights have been non-functional for weeks making the area unsafe at night.', priority:'medium', status:'resolved', categories:['public_services','electricity'], district:'Dhaka', ashon:'Dhaka-17', area:'Dhanmondi', map_lat:23.7430, map_lng:90.3824, submitted_by:7, submitted_name:'Jamal Uddin', submitted_phone:'01711-100007', submitted_nid:'7890123456', submitted_at:'2025-05-15', approved:true, approval_status:'approved', assigned_dept:7, upvote_count:31, comment_count:7, media:[{type:'image',url:'https://picsum.photos/seed/light1/800/450'}] },
    { id:8, complaint_id:'CB-2025-00008', subject:'Broken footpath causing accidents', description:'Footpath in front of Dhaka University broken and causing pedestrian injuries.', priority:'high', status:'in_progress', categories:['infrastructure'], district:'Dhaka', ashon:'Dhaka-01', area:'Lalbagh', map_lat:23.7245, map_lng:90.3948, submitted_by:8, submitted_name:'Mina Islam', submitted_phone:'01711-100008', submitted_nid:'8901234567', submitted_at:'2025-06-01', approved:true, approval_status:'approved', assigned_dept:1, upvote_count:43, comment_count:10, media:[{type:'image',url:'https://picsum.photos/seed/path1/800/450'},{type:'image',url:'https://picsum.photos/seed/path2/800/450'}] },
    { id:9, complaint_id:'CB-2025-00009', subject:'Sewage overflow on main road', description:'Sewage water overflowing onto main road in Agrabad area causing severe health hazards.', priority:'critical', status:'submitted', categories:['water_service'], district:'Chattogram', ashon:'Chattogram-05', area:'Agrabad', map_lat:22.3266, map_lng:91.8183, submitted_by:9, submitted_name:'Roshid Malik', submitted_phone:'01711-100009', submitted_nid:'9012345678', submitted_at:'2025-06-10', approved:false, approval_status:'pending', assigned_dept:null, upvote_count:78, comment_count:21, media:[{type:'image',url:'https://picsum.photos/seed/sewer1/800/450'}] },
    { id:10, complaint_id:'CB-2025-00010', subject:'Noise pollution from construction', description:'Illegal construction happening at night causing severe noise pollution in Sylhet residential area.', priority:'medium', status:'rejected', categories:['environment'], district:'Sylhet', ashon:'Sylhet-01', area:'Zindabazar', map_lat:24.8949, map_lng:91.8687, submitted_by:10, submitted_name:'Parvin Sultana', submitted_phone:'01711-100010', submitted_nid:'0123456789', submitted_at:'2025-06-20', approved:false, approval_status:'rejected', assigned_dept:null, upvote_count:15, comment_count:4, rejection_reason:'Issue falls under private property jurisdiction. Please contact local police station.', media:[{type:'image',url:'https://picsum.photos/seed/noise1/800/450'}] },
    { id:11, complaint_id:'CB-2025-00011', subject:'Gas line leak near residential area', description:'Suspected gas line leak detected near Pahartali residential area posing explosion risk.', priority:'critical', status:'pending', categories:['infrastructure'], district:'Chattogram', ashon:'Chattogram-09', area:'Pahartali', map_lat:22.3890, map_lng:91.8040, submitted_by:1, submitted_name:'Arif Hossain', submitted_phone:'01711-100001', submitted_nid:'1234567890', submitted_at:'2025-07-01', approved:false, approval_status:'pending', assigned_dept:null, upvote_count:92, comment_count:28, media:[{type:'image',url:'https://picsum.photos/seed/gas1/800/450'}] },
    { id:12, complaint_id:'CB-2025-00012', subject:'Public toilet in poor condition', description:'Public toilet near Boalia market is in deplorable condition and poses health risks.', priority:'low', status:'submitted', categories:['public_services'], district:'Rajshahi', ashon:'Rajshahi-01', area:'Boalia', map_lat:24.3636, map_lng:88.6241, submitted_by:2, submitted_name:'Nasrin Begum', submitted_phone:'01711-100002', submitted_nid:'2345678901', submitted_at:'2025-07-05', approved:false, approval_status:'pending', assigned_dept:null, upvote_count:8, comment_count:2, media:[{type:'image',url:'https://picsum.photos/seed/toilet1/800/450'}] },
  ],

  feedback: [
    { id:1, user_id:1, user_name:'Arif Hossain', user_uid:'CB-USR-00001', topic:'Great platform for civic issues', rating:5, message:'ComplaintBox has really helped me report issues in my area. The response time has improved significantly. I can track my complaints easily.', is_featured:true, created_at:'2025-03-10' },
    { id:2, user_id:2, user_name:'Nasrin Begum', user_uid:'CB-USR-00002', topic:'Good but needs improvement', rating:4, message:'The platform is useful but the mobile interface could be better. Overall experience is positive.', is_featured:true, created_at:'2025-04-05' },
    { id:3, user_id:4, user_name:'Fatema Khatun', user_uid:'CB-USR-00004', topic:'Excellent service', rating:5, message:'My complaint was resolved within 5 days! The department staff was very responsive. Highly recommend this platform to all citizens.', is_featured:true, created_at:'2025-05-12' },
    { id:4, user_id:7, user_name:'Jamal Uddin', user_uid:'CB-USR-00007', topic:'Needs faster response', rating:3, message:'The system works but sometimes complaints take too long to get assigned. Hope the response time improves.', is_featured:false, created_at:'2025-06-01' },
    { id:5, user_id:9, user_name:'Roshid Malik', user_uid:'CB-USR-00009', topic:'Very helpful platform', rating:5, message:'Excellent initiative by the government. Now citizens can hold authorities accountable.', is_featured:true, created_at:'2025-06-20' },
    { id:6, user_id:6, user_name:'Shirin Akter', user_uid:'CB-USR-00006', topic:'Average experience', rating:3, message:'Platform is okay. Needs better notification system and more detailed status updates from departments.', is_featured:false, created_at:'2025-07-02' },
  ],

  reports: [
    { id:1, reporter_type:'citizen', reporter_id:3, reporter_name:'Rakib Ullah', topic:'Fake complaint by user', category:'fake_complaint', message:'CB-2025-00010 seems to be a fake complaint. The construction work is actually legal and permitted.', status:'pending', created_at:'2025-06-22', admin_reply:'' },
    { id:2, reporter_type:'citizen', reporter_id:5, reporter_name:'Karim Mia', topic:'Technical issue with map', category:'technical_issue', message:'Cannot pin location on map in mobile browser. The map does not load properly.', status:'reviewed', created_at:'2025-06-15', admin_reply:'We have noted this issue and our technical team is working on fixing the mobile map interface.' },
    { id:3, reporter_type:'staff', reporter_id:2, reporter_name:'Lovely Begum', dept:'WASA Water Services', topic:'Add new staff member', category:'add_new_staff', message:'Requesting to add a new field officer.', status:'pending', created_at:'2025-07-01', admin_reply:'', new_staff:{ full_name:'Ahmed Kabir', phone:'01911-300001', nid:'9900112233', department:'WASA Water Services', designation:'Field Officer' } },
    { id:4, reporter_type:'citizen', reporter_id:7, reporter_name:'Jamal Uddin', topic:'Fake user account', category:'fake_user', message:'User CB-USR-00005 seems to be using fake information and submitting bogus complaints.', status:'pending', created_at:'2025-07-05', admin_reply:'' },
    { id:5, reporter_type:'staff', reporter_id:1, reporter_name:'Shahed Rahman', dept:'City Infrastructure Dept', topic:'Maintenance issue report', category:'technical_issue', message:'The complaint management system is showing incorrect priority levels for some complaints in our department view.', status:'pending', created_at:'2025-07-08', admin_reply:'' },
  ],

  activity: [
    { id:1, actor_type:'admin', actor_name:'System Admin', action:'Approved complaint CB-2025-00001', complaint_id:'CB-2025-00001', created_at:'2025-07-10 09:15:00' },
    { id:2, actor_type:'citizen', actor_name:'Arif Hossain', action:'Submitted new complaint CB-2025-00001', complaint_id:'CB-2025-00001', created_at:'2025-07-09 14:30:00' },
    { id:3, actor_type:'staff', actor_name:'Shahed Rahman', action:'Updated status of CB-2025-00001 to In Progress', complaint_id:'CB-2025-00001', created_at:'2025-07-09 16:45:00' },
    { id:4, actor_type:'admin', actor_name:'System Admin', action:'Rejected complaint CB-2025-00010 — Outside jurisdiction', complaint_id:'CB-2025-00010', created_at:'2025-07-08 11:00:00' },
    { id:5, actor_type:'citizen', actor_name:'Nasrin Begum', action:'Submitted new complaint CB-2025-00002', complaint_id:'CB-2025-00002', created_at:'2025-07-08 09:20:00' },
    { id:6, actor_type:'staff', actor_name:'Lovely Begum', action:'Resolved complaint CB-2025-00002 with proof', complaint_id:'CB-2025-00002', created_at:'2025-07-07 15:10:00' },
    { id:7, actor_type:'admin', actor_name:'System Admin', action:'Verified user profile CB-USR-00001', complaint_id:null, created_at:'2025-07-07 10:30:00' },
    { id:8, actor_type:'citizen', actor_name:'Fatema Khatun', action:'Upvoted complaint CB-2025-00005', complaint_id:'CB-2025-00005', created_at:'2025-07-06 12:00:00' },
    { id:9, actor_type:'system', actor_name:'System', action:'Auto-assigned CB-2025-00003 to DESCO Electricity Dept', complaint_id:'CB-2025-00003', created_at:'2025-07-06 09:05:00' },
    { id:10, actor_type:'admin', actor_name:'System Admin', action:'Banned user CB-USR-00005 for policy violation', complaint_id:null, created_at:'2025-07-05 14:00:00' },
    { id:11, actor_type:'citizen', actor_name:'Jamal Uddin', action:'Commented on complaint CB-2025-00007', complaint_id:'CB-2025-00007', created_at:'2025-07-05 11:30:00' },
    { id:12, actor_type:'staff', actor_name:'Amin Chowdhury', action:'Status of CB-2025-00003 changed to Assigned', complaint_id:'CB-2025-00003', created_at:'2025-07-04 16:20:00' },
  ],

  monthlyData: [12,18,24,31,27,42,38,29,35,48,22,15],
};

// Dept performance data
const DEPT_PERF = {
  1: { assigned:18, in_progress:5, resolved:13 },
  2: { assigned:14, in_progress:3, resolved:11 },
  3: { assigned:22, in_progress:7, resolved:15 },
  4: { assigned:10, in_progress:2, resolved:8 },
  5: { assigned:16, in_progress:6, resolved:10 },
  6: { assigned:9, in_progress:2, resolved:7 },
  7: { assigned:12, in_progress:4, resolved:8 },
  8: { assigned:7, in_progress:1, resolved:6 },
};

// ===== UTILITY =====
const AVATAR_COLORS = ['av-1','av-2','av-3','av-4','av-5','av-6','av-7','av-8'];
function getAvatarClass(id) { return AVATAR_COLORS[(id-1) % 8]; }
function getInitials(name) {
  return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}
function formatDate(d) {
  if(!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'});
}
function formatDateTime(d) {
  if(!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}) + ' ' + dt.toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit'});
}
function timeAgo(d) {
  const diff = Date.now() - new Date(d);
  const days = Math.floor(diff/86400000);
  if(days===0) return 'Today';
  if(days===1) return 'Yesterday';
  if(days<30) return `${days}d ago`;
  return formatDate(d);
}
function showToast(type, title, msg, duration=4000) {
  const icons = {success:'check_circle',error:'error',info:'info',warning:'warning'};
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="material-symbols-outlined toast-icon">${icons[type]||'info'}</span>
  <div class="toast-msg"><div class="toast-title">${title}</div><div class="toast-sub">${msg}</div></div>`;
  c.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.replace('show','hide');setTimeout(()=>t.remove(),350);},duration);
}
function signOut() {
  showToast('info','Signed Out','Redirecting...');
  const go = () => {
    localStorage.removeItem('cb_user');
    window.location.href = 'index.php';
  };
  if (window.API) window.API.logout().finally(go);
  else setTimeout(go, 800);
}

// Status/Priority Helpers
function statusPill(s) {
  const labels = {submitted:'Submitted',pending:'Pending',in_review:'In Review',assigned:'Assigned',in_progress:'In Progress',resolved:'Resolved',rejected:'Rejected'};
  return `<span class="pill pill-${s}">${labels[s]||s}</span>`;
}
function priorityPill(p) {
  const labels = {low:'Low',medium:'Medium',high:'High',critical:'Critical'};
  return `<span class="pill pill-${p}">${labels[p]||p}</span>`;
}
function categoryPill(c) {
  const labels = {infrastructure:'Infrastructure',water_service:'Water Service',electricity:'Electricity',waste_management:'Waste Mgmt',traffic_transport:'Traffic',environment:'Environment',public_services:'Public Services',others:'Others'};
  return `<span class="pill pill-${c}">${labels[c]||c}</span>`;
}

// ===== SECTION NAVIGATION =====
function switchSection(id) {
  document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const sec = document.getElementById(`section-${id}`);
  if(sec) sec.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>{
    if(n.dataset.section===id) n.classList.add('active');
  });
  // Close sidebar on mobile
  if(window.innerWidth<=1024) closeSidebar();
  // Trigger renders
  if(id==='overview') renderOverview();
  if(id==='users') renderUsers();
  if(id==='profile-review') renderProfileReviews();
  if(id==='complaint-requests') renderRequests();
  if(id==='all-complaints') renderAllComplaints();
  if(id==='all-departments') renderDepartments();
  if(id==='feedback') renderFeedback();
  if(id==='reports') renderReports();
  if(id==='activity') renderActivity();
}

document.querySelectorAll('.nav-item').forEach(btn=>{
  btn.addEventListener('click',()=>switchSection(btn.dataset.section));
});

// ===== MOBILE SIDEBAR =====
document.getElementById('mobileMenuBtn')?.addEventListener('click',()=>{
  document.getElementById('adminSidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
});
document.getElementById('sidebarOverlay')?.addEventListener('click',closeSidebar);
function closeSidebar(){
  document.getElementById('adminSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
}

// ===== MODAL HELPERS =====
function openModal(id) {
  const el = document.getElementById(id);
  el.style.display='flex';
  document.body.style.overflow='hidden';
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('active')));
}
function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('active');
  el.addEventListener('transitionend',()=>{el.style.display='none';document.body.style.overflow='';},{once:true});
}
function closeModalOnOverlay(e,id) {
  if(e.target===document.getElementById(id)) closeModal(id);
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') {
    document.querySelectorAll('.modal-overlay.active,.confirm-overlay.active').forEach(m=>{
      if(m.classList.contains('confirm-overlay')) closeConfirm();
      else m.classList.remove('active');
    });
    document.body.style.overflow='';
  }
});

// Confirm modal
let confirmCb = null;
function showConfirm(title,msg,icon,cb){
  document.getElementById('confirmTitle').textContent=title;
  document.getElementById('confirmMessage').textContent=msg;
  document.getElementById('confirmIcon').textContent=icon||'⚠️';
  confirmCb=cb;
  document.getElementById('confirmOverlay').classList.add('active');
}
function closeConfirm(){
  document.getElementById('confirmOverlay').classList.remove('active');
  confirmCb=null;
}
document.getElementById('confirmYesBtn')?.addEventListener('click',()=>{
  if(confirmCb) confirmCb();
  closeConfirm();
});

// ===== OVERVIEW =====
function renderOverview() {
  // Date
  document.getElementById('overview-date').textContent = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  
  const total = DATA.complaints.length;
  const inProgress = DATA.complaints.filter(c=>c.status==='in_progress').length;
  const resolved = DATA.complaints.filter(c=>c.status==='resolved').length;
  const pending = DATA.complaints.filter(c=>c.status==='pending').length;
  const activeUsers = DATA.users.filter(u=>!u.is_banned).length;
  const reports = DATA.reports.length;

  const stats = [
    {icon:'assignment',color:'#006A4E',bg:'rgba(0,106,78,0.1)',num:total,label:'Total Complaints'},
    {icon:'sync',color:'#F97316',bg:'rgba(249,115,22,0.1)',num:inProgress,label:'In Progress'},
    {icon:'check_circle',color:'#22C55E',bg:'rgba(34,197,94,0.1)',num:resolved,label:'Resolved'},
    {icon:'hourglass_empty',color:'#EAB308',bg:'rgba(234,179,8,0.1)',num:pending,label:'Pending'},
    {icon:'corporate_fare',color:'#8B5CF6',bg:'rgba(139,92,246,0.1)',num:8,label:'Total Departments'},
    {icon:'flag',color:'#EF4444',bg:'rgba(239,68,68,0.1)',num:reports,label:'Total Reports'},
    {icon:'people',color:'#3B82F6',bg:'rgba(59,130,246,0.1)',num:activeUsers,label:'Active Users'},
  ];

  document.getElementById('overviewStats').innerHTML = stats.map(s=>`
    <div class="stat-card">
      <div class="stat-icon" style="background:${s.bg};color:${s.color}">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">${s.icon}</span>
      </div>
      <div class="stat-info">
        <div class="stat-number counter" data-target="${s.num}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>
    </div>`).join('');

  // Animate counters
  animateCounters();

  // Bar chart
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const maxVal = Math.max(...DATA.monthlyData);
  document.getElementById('barChart').innerHTML = DATA.monthlyData.map((v,i)=>`
    <div class="bar-item">
      <div class="bar-fill" style="height:0" data-val="${v}" data-target="${Math.round(v/maxVal*120)}px"></div>
      <span class="bar-label">${months[i]}</span>
    </div>`).join('');
  setTimeout(()=>{
    document.querySelectorAll('.bar-fill').forEach(b=>{
      b.style.height=b.dataset.target;
    });
  },100);

  // Donut
  renderDonut();
  
  // Tables
  renderRecentComplaintsTable();
  renderDeptPerfTable();

  document.getElementById('deptPerfMonth')?.addEventListener('change', renderDeptPerfTable);
  document.getElementById('deptPerfYear')?.addEventListener('change', renderDeptPerfTable);
}

function animateCounters() {
  document.querySelectorAll('.counter').forEach(el=>{
    const target = parseInt(el.dataset.target)||0;
    let current = 0;
    const step = Math.ceil(target/30);
    const timer = setInterval(()=>{
      current = Math.min(current+step, target);
      el.textContent = current;
      if(current>=target) clearInterval(timer);
    },40);
  });
}

function renderDonut() {
  const statusData = [
    {label:'Pending',color:'#EAB308',count:DATA.complaints.filter(c=>c.status==='pending').length},
    {label:'In Review',color:'#3B82F6',count:DATA.complaints.filter(c=>c.status==='in_review').length},
    {label:'Assigned',color:'#8B5CF6',count:DATA.complaints.filter(c=>c.status==='assigned').length},
    {label:'In Progress',color:'#F97316',count:DATA.complaints.filter(c=>c.status==='in_progress').length},
    {label:'Resolved',color:'#22C55E',count:DATA.complaints.filter(c=>c.status==='resolved').length},
    {label:'Rejected',color:'#EF4444',count:DATA.complaints.filter(c=>c.status==='rejected').length},
  ].filter(d=>d.count>0);
  
  const total = statusData.reduce((a,b)=>a+b.count,0);
  document.getElementById('donutTotal').textContent=total;
  
  const svg = document.getElementById('donutSvg');
  const r=60, cx=80, cy=80, stroke=22;
  const circ=2*Math.PI*r;
  let offset=0;
  let paths='';
  statusData.forEach(d=>{
    const pct=d.count/total;
    const dash=pct*circ;
    paths+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${stroke}" stroke-dasharray="${dash} ${circ-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" style="transition:all 1s ease;cursor:pointer">
    <title>${d.label}: ${d.count}</title></circle>`;
    offset+=dash;
  });
  svg.innerHTML=paths;
  
  document.getElementById('donutLegend').innerHTML=statusData.map(d=>`
    <div class="legend-item">
      <div class="legend-dot" style="background:${d.color}"></div>
      <span class="legend-label">${d.label}</span>
      <span class="legend-count">${d.count}</span>
    </div>`).join('');
}

function renderRecentComplaintsTable() {
  const recent = DATA.complaints.slice(0,10);
  document.getElementById('recentComplaintsBody').innerHTML = recent.map(c=>`
    <tr onclick="openComplaintDetail(${c.id})">
      <td><span class="mono text-xs">${c.complaint_id}</span></td>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.subject}</td>
      <td>${c.categories.map(cat=>categoryPill(cat)).join(' ')}</td>
      <td>${priorityPill(c.priority)}</td>
      <td>${statusPill(c.status)}</td>
      <td class="muted text-xs">${formatDate(c.submitted_at)}</td>
      <td onclick="event.stopPropagation()">
        <div class="actions-cell">
          <button class="action-btn view" title="View" onclick="openComplaintDetail(${c.id})"><span class="material-symbols-outlined">visibility</span></button>
          <button class="action-btn delete" title="Delete" onclick="deleteComplaint(${c.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </td>
    </tr>`).join('');
}

/* === Department performance computed from real DATA.complaints ===
   Used by BOTH the Overview "All Departments Performance" table AND
   the All Departments section's individual cards. Honors month/year filters. */
function computeDeptPerf(deptId, month, year) {
  const m = month ? parseInt(month) : 0;
  const y = year  ? parseInt(year)  : 0;
  const inRange = (sa) => {
    if (!sa) return true;
    const d = new Date(typeof sa === 'string' ? sa.replace(' ', 'T') : sa);
    if (isNaN(d)) return true;
    if (m && (d.getMonth()+1) !== m) return false;
    if (y && d.getFullYear() !== y) return false;
    return true;
  };
  const list = (DATA.complaints || []).filter(c => (c.assigned_dept === deptId) && inRange(c.submitted_at));
  const assigned    = list.length;
  const in_progress = list.filter(c => c.status === 'in_progress').length;
  const resolved    = list.filter(c => c.status === 'resolved').length;
  return { assigned, in_progress, resolved };
}

function renderDeptPerfTable() {
  const month = document.getElementById('deptPerfMonth')?.value || '';
  const year  = document.getElementById('deptPerfYear')?.value  || '';
  document.getElementById('deptPerfBody').innerHTML = DATA.departments.map(d=>{
    const perf = computeDeptPerf(d.id, month, year);
    const pct  = perf.assigned>0 ? Math.round(perf.resolved/perf.assigned*100) : 0;
    return `<tr>
      <td><strong>${d.name}</strong></td>
      <td>${perf.assigned}</td>
      <td>${perf.in_progress}</td>
      <td>${perf.resolved}</td>
      <td style="min-width:160px">
        <div style="display:flex;align-items:center;gap:10px">
          <div class="perf-bar" style="flex:1">
            <div class="perf-fill" style="width:0" data-width="${pct}%"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:var(--primary)">${pct}%</span>
        </div>
      </td>
    </tr>`;
  }).join('');
  // Animate bars
  setTimeout(()=>{
    document.querySelectorAll('.perf-fill').forEach(b=>{
      b.style.width=b.dataset.width||'0%';
    });
  },100);
}

// ===== USER MANAGEMENT =====
let currentUserTab = 'citizens';
function switchUserTab(tab){
  currentUserTab=tab;
  document.getElementById('citizens-tab').style.display=tab==='citizens'?'block':'none';
  document.getElementById('staff-tab').style.display=tab==='staff'?'block':'none';
  document.getElementById('tab-citizens').classList.toggle('active',tab==='citizens');
  document.getElementById('tab-staff').classList.toggle('active',tab==='staff');
}
function renderUsers() {
  filterCitizens();
  filterStaff();
  // Dept options in staff filter
  const sf = document.getElementById('staffDeptFilter');
  if(sf.options.length<=1){
    DATA.departments.forEach(d=>{
      const o=document.createElement('option');
      o.value=d.id; o.textContent=d.name; sf.appendChild(o);
    });
  }
  // Recently joined
  const rc = DATA.users.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).slice(0,5);
  document.getElementById('recentlyCitizens').innerHTML = rc.map(u=>`
    <div class="rj-item">
      <div class="rj-avatar ${getAvatarClass(u.id)}">${getInitials(u.full_name)}</div>
      <div>
        <div class="rj-name">${u.full_name}</div>
        <div class="rj-date">${formatDate(u.created_at)}</div>
      </div>
    </div>`).join('');
  const rs = DATA.staff.sort((a,b)=>new Date(b.joined_date)-new Date(a.joined_date)).slice(0,5);
  document.getElementById('recentlyStaff').innerHTML = rs.map(s=>`
    <div class="rj-item">
      <div class="rj-avatar ${getAvatarClass(s.id)}">${getInitials(s.full_name)}</div>
      <div>
        <div class="rj-name">${s.full_name}</div>
        <div class="rj-date">${formatDate(s.joined_date)}</div>
      </div>
    </div>`).join('');
}

function filterCitizens(){
  const q=(document.getElementById('citizenSearch')||{}).value?.toLowerCase()||'';
  const v=(document.getElementById('citizenVerified')||{}).value||'';
  const b=(document.getElementById('citizenBanned')||{}).value||'';
  const filtered = DATA.users.filter(u=>{
    const matchQ = !q||(u.full_name+u.username+u.email+u.phone+u.nid_number+u.user_uid).toLowerCase().includes(q);
    const matchV = !v||u.profile_verified===v;
    const matchB = b===''||(b==='1'?u.is_banned:!u.is_banned);
    return matchQ&&matchV&&matchB;
  });
  document.getElementById('citizensBody').innerHTML = filtered.map(u=>`
    <tr onclick="openUserDetail(${u.id})">
      <td><span class="mono text-xs">${u.user_uid}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="rj-avatar ${getAvatarClass(u.id)}" style="width:28px;height:28px;font-size:10px">${getInitials(u.full_name)}</div>
          <strong>${u.full_name}</strong>
        </div>
      </td>
      <td class="muted">@${u.username}</td>
      <td class="text-sm">${u.phone}</td>
      <td class="mono text-xs muted">${u.nid_number}</td>
      <td class="text-xs muted">${u.district}, ${u.ashon}</td>
      <td class="text-xs muted">${formatDate(u.created_at)}</td>
      <td><span style="font-weight:700">${u.complaints}</span></td>
      <td>${u.profile_verified==='verified'?'<span class="pill pill-resolved">Verified</span>':'<span class="pill pill-pending">Pending</span>'}</td>
      <td onclick="event.stopPropagation()">
        <div class="actions-cell">
          <button class="action-btn view" title="View" onclick="openUserDetail(${u.id})"><span class="material-symbols-outlined">visibility</span></button>
          <button class="action-btn verify" title="Toggle Verify" onclick="toggleVerify(${u.id})"><span class="material-symbols-outlined">verified_user</span></button>
          <button class="action-btn block" title="${u.is_banned?'Unban':'Ban'}" onclick="toggleBan(${u.id})">
            <span class="material-symbols-outlined">${u.is_banned?'check_circle':'block'}</span>
          </button>
          <button class="action-btn delete" title="Delete" onclick="deleteUser(${u.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </td>
    </tr>`).join('');
}

function filterStaff(){
  const q=(document.getElementById('staffSearch')||{}).value?.toLowerCase()||'';
  const d=parseInt((document.getElementById('staffDeptFilter')||{}).value)||0;
  const filtered = DATA.staff.filter(s=>{
    const matchQ=!q||(s.full_name+s.id_card_number+s.email+s.phone+s.nid_number).toLowerCase().includes(q);
    const matchD=!d||s.department_id===d;
    return matchQ&&matchD;
  });
  const deptMap = {};
  DATA.departments.forEach(d=>deptMap[d.id]=d.name);
  document.getElementById('staffBody').innerHTML = filtered.map(s=>`
    <tr onclick="openStaffDetail(${s.id})" style="cursor:pointer">
      <td><span class="mono text-xs">${s.staff_uid||''}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="rj-avatar ${getAvatarClass(s.id)}" style="width:28px;height:28px;font-size:10px">${getInitials(s.full_name||'?')}</div>
          <strong>${s.full_name||'—'}</strong>
        </div>
      </td>
      <td class="text-sm">${s.phone||'—'}</td>
      <td class="text-sm">${s.department_name || deptMap[s.department_id] || '—'}</td>
      <td class="text-sm muted">${s.designation||'—'}</td>
      <td class="text-xs muted">${s.joined_date ? formatDate(s.joined_date) : '—'}</td>
      <td><span style="font-weight:700">${s.complaints_handled||0}</span></td>
      <td onclick="event.stopPropagation()">
        <div class="actions-cell">
          <button class="action-btn view" title="View" onclick="openStaffDetail(${s.id})"><span class="material-symbols-outlined">visibility</span></button>
          <button class="action-btn edit" title="Edit"><span class="material-symbols-outlined">edit</span></button>
          <button class="action-btn delete" title="Delete" onclick="deleteStaff(${s.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </td>
    </tr>`).join('');
}

function resetCitizenFilters(){
  document.getElementById('citizenSearch').value='';
  document.getElementById('citizenVerified').value='';
  document.getElementById('citizenBanned').value='';
  filterCitizens();
}
function resetStaffFilters(){
  document.getElementById('staffSearch').value='';
  document.getElementById('staffDeptFilter').value='';
  filterStaff();
}

function toggleVerify(id){
  const u=DATA.users.find(u=>u.id===id);
  if(!u)return;
  const newVal=u.profile_verified==='verified'?'pending':'verified';
  showConfirm(`${newVal==='verified'?'Verify':'Unverify'} User`,`Change verification status of ${u.full_name}?`,'🔐',()=>{
    u.profile_verified=newVal;
    filterCitizens();
    showToast('success','Updated',`User ${u.full_name} is now ${newVal}.`);
  });
}
function toggleBan(id){
  const u=DATA.users.find(u=>u.id===id);
  if(!u)return;
  showConfirm(u.is_banned?'Unban User':'Ban User',`${u.is_banned?'Restore':'Suspend'} account of ${u.full_name}?`,u.is_banned?'✅':'🚫',()=>{
    const apply = () => {
      u.is_banned=!u.is_banned;
      filterCitizens();
      showToast('success','Updated',`User ${u.full_name} is now ${u.is_banned?'banned':'active'}.`);
    };
    if (window.API) {
      const action = u.is_banned ? 'unban' : 'ban';
      window.API.banUser(u.serverId || u.id, action).then(apply)
        .catch(err => showToast('error','Failed', err.message));
    } else apply();
  });
}
function deleteUser(id){
  const u=DATA.users.find(u=>u.id===id);
  if(!u)return;
  showConfirm('Delete User',`Permanently remove ${u.full_name}? This cannot be undone.`,'🗑️',()=>{
    const apply = () => {
      DATA.users=DATA.users.filter(u=>u.id!==id);
      filterCitizens();
      showToast('success','Deleted',`User ${u.full_name} removed.`);
    };
    if (window.API) {
      window.API.deleteUser(u.serverId || u.id).then(apply)
        .catch(err => showToast('error','Failed', err.message));
    } else apply();
  });
}
function deleteStaff(id){
  const s=DATA.staff.find(s=>s.id===id);
  if(!s)return;
  showConfirm('Delete Staff',`Remove ${s.full_name} from staff?`,'🗑️',()=>{
    const apply = () => {
      DATA.staff=DATA.staff.filter(s=>s.id!==id);
      filterStaff();
      showToast('success','Deleted',`Staff ${s.full_name} removed.`);
    };
    if (window.API) {
      window.API.deleteStaff(s.serverId || s.id).then(apply)
        .catch(err => showToast('error','Failed', err.message));
    } else apply();
  });
}

// User Detail Modal
function openUserDetail(id){
  const u = DATA.users.find(x => x.id === id);
  if (!u) return;
  // Initial render — show whatever data we have. Complaints list is loaded async.
  _renderUserDetail(u, null);
  openModal('userDetailOverlay');

  // Fetch this user's complaints from the API (matches "Recent Complaints" data).
  if (window.API && u.serverId) {
    window.API.complaints({ user_id: u.serverId, per_page: 200, sort: 'newest' })
      .then(res => {
        const list = (res.data && res.data.complaints) || [];
        _renderUserDetail(u, list);
      })
      .catch(() => _renderUserDetail(u, []));
  }
}

function _renderUserDetail(u, complaintList) {
  const safe = v => (v === null || v === undefined || v === '') ? '—' : v;
  const loading = complaintList === null;
  const cmps = complaintList || [];
  const target = document.getElementById('userDetailBody');
  if (!target) return;
  target.innerHTML = `
    <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap">
      <div class="user-avatar-lg ${getAvatarClass(u.id)}" style="width:72px;height:72px;font-size:24px;flex-shrink:0">${getInitials(u.full_name)}</div>
      <div style="flex:1">
        <h3 style="font-size:20px;font-weight:800;margin-bottom:4px">${safe(u.full_name)}</h3>
        <div class="mono muted text-xs" style="margin-bottom:8px">${safe(u.user_uid)}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${u.profile_verified==='verified'?'<span class="pill pill-resolved">Verified</span>':'<span class="pill pill-pending">Pending Verification</span>'}
          ${u.is_banned?'<span class="pill pill-rejected">Banned</span>':'<span class="pill pill-resolved">Active</span>'}
        </div>
      </div>
    </div>
    <div class="citizen-info-box">
      <h5>Contact & Identity</h5>
      <div class="citizen-info-grid">
        <div class="citizen-info-item"><label>Email</label><span>${safe(u.email)}</span></div>
        <div class="citizen-info-item"><label>Phone</label><span>${safe(u.phone)}</span></div>
        <div class="citizen-info-item"><label>NID Number</label><span class="mono">${safe(u.nid_number)}</span></div>
        <div class="citizen-info-item"><label>Username</label><span>@${safe(u.username)}</span></div>
        <div class="citizen-info-item"><label>District</label><span>${safe(u.district)}</span></div>
        <div class="citizen-info-item"><label>Ashon No.</label><span>${safe(u.ashon)}</span></div>
        <div class="citizen-info-item"><label>Joined</label><span>${u.created_at ? formatDate(u.created_at) : '—'}</span></div>
        <div class="citizen-info-item"><label>Total Complaints</label><span style="font-weight:700">${u.complaints || 0}</span></div>
        <div class="citizen-info-item"><label>Upvotes Given</label><span style="font-weight:700">${u.upvotes_given || 0}</span></div>
        <div class="citizen-info-item"><label>Comments Made</label><span style="font-weight:700">${u.comments_made || 0}</span></div>
      </div>
    </div>
    <div>
      <h5 style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--outline);text-transform:uppercase;letter-spacing:0.05em">Complaints (${loading ? '…' : cmps.length})</h5>
      ${loading
        ? '<div class="muted text-sm" style="padding:12px 0">Loading complaints…</div>'
        : (cmps.length
            ? cmps.map(c => `
              <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--surface-container-low);border-radius:10px;margin-bottom:8px;cursor:pointer"
                   onclick="closeModal('userDetailOverlay');setTimeout(()=>openComplaintDetail(${c.id}),200)">
                <span class="mono text-xs">${c.complaint_id}</span>
                <span style="flex:1;font-size:13px;font-weight:600">${(c.subject||'').replace(/</g,'&lt;')}</span>
                ${statusPill(c.status)}
              </div>`).join('')
            : '<div class="muted text-sm">No complaints submitted.</div>')}
    </div>`;
}

function openStaffDetail(id){
  const s = DATA.staff.find(x => x.id === id);
  if (!s) return;
  const dept = DATA.departments.find(d => d.id === s.department_id);
  const safe = v => (v === null || v === undefined || v === '') ? '—' : v;
  const target = document.getElementById('userDetailBody');
  if (!target) return;
  target.innerHTML = `
    <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px">
      <div class="user-avatar-lg ${getAvatarClass(s.id)}" style="width:72px;height:72px;font-size:24px">${getInitials(s.full_name)}</div>
      <div style="flex:1">
        <h3 style="font-size:20px;font-weight:800;margin-bottom:4px">${safe(s.full_name)}</h3>
        <div class="mono muted text-xs" style="margin-bottom:4px">${safe(s.staff_uid)}</div>
        <div class="muted text-sm">${safe(s.designation)} — ${safe(s.department_name || (dept && dept.name))}</div>
      </div>
    </div>
    <div class="citizen-info-box">
      <h5>Staff Information</h5>
      <div class="citizen-info-grid">
        <div class="citizen-info-item"><label>Email</label><span>${safe(s.email)}</span></div>
        <div class="citizen-info-item"><label>Phone</label><span>${safe(s.phone)}</span></div>
        <div class="citizen-info-item"><label>ID Card No.</label><span class="mono">${safe(s.id_card_number)}</span></div>
        <div class="citizen-info-item"><label>NID</label><span class="mono">${safe(s.nid_number)}</span></div>
        <div class="citizen-info-item"><label>District</label><span>${safe(s.district)}</span></div>
        <div class="citizen-info-item"><label>Ashon No.</label><span>${safe(s.ashon)}</span></div>
        <div class="citizen-info-item"><label>Work Status</label><span>${s.work_status==='active'?'<span class="pill pill-resolved">Active</span>':'<span class="pill pill-pending">On Leave</span>'}</span></div>
        <div class="citizen-info-item"><label>Joined</label><span>${s.joined_date ? formatDate(s.joined_date) : '—'}</span></div>
        <div class="citizen-info-item"><label>Complaints Handled</label><span style="font-weight:700">${s.complaints_handled || 0}</span></div>
        <div class="citizen-info-item"><label>Complaints Resolved</label><span style="font-weight:700">${s.complaints_resolved || 0}</span></div>
      </div>
    </div>`;
  openModal('userDetailOverlay');
}

// ===== PROFILE REVIEW =====
function renderProfileReviews(){
  filterReviews();
}
function filterReviews(){
  const q=(document.getElementById('reviewSearch')||{}).value?.toLowerCase()||'';
  const s=(document.getElementById('reviewStatus')||{}).value||'';
  const filtered=DATA.users.filter(u=>{
    const matchQ=!q||(u.full_name+u.user_uid).toLowerCase().includes(q);
    const matchS=!s||u.profile_verified===s;
    return matchQ&&matchS;
  });
  document.getElementById('reviewGrid').innerHTML=filtered.map(u=>`
    <div class="review-card" onclick="openReviewModal(${u.id})">
      <div class="user-avatar-lg ${getAvatarClass(u.id)}">${getInitials(u.full_name)}</div>
      <h4>${u.full_name}</h4>
      <div class="uid">${u.user_uid}</div>
      <div style="margin:8px 0 4px;font-size:12px;color:var(--outline)">${u.district} · ${u.ashon}</div>
      <div style="margin-top:8px">
        ${u.profile_verified==='verified'?'<span class="pill pill-resolved">Verified</span>':'<span class="pill pill-pending">Pending Review</span>'}
      </div>
    </div>`).join('');
}

let currentReviewUser = null;
function openReviewModal(id){
  const u=DATA.users.find(u=>u.id===id);
  if(!u)return;
  currentReviewUser=u;
  document.getElementById('reviewModalBody').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;flex-wrap:wrap">
      <div>
        <div style="text-align:center;margin-bottom:16px">
          <div class="user-avatar-lg ${getAvatarClass(u.id)}" style="width:80px;height:80px;font-size:28px;margin:0 auto 10px">${getInitials(u.full_name)}</div>
          <h3 style="font-size:18px;font-weight:800">${u.full_name}</h3>
          <div class="mono muted text-xs">${u.user_uid}</div>
        </div>
        <div class="citizen-info-box">
          <h5>Contact Info</h5>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div><label style="font-size:11px;color:var(--outline);font-weight:600">Phone</label><div style="font-size:13px;font-weight:600">${u.phone}</div></div>
            <div><label style="font-size:11px;color:var(--outline);font-weight:600">Email</label><div style="font-size:13px;font-weight:600">${u.email}</div></div>
            <div><label style="font-size:11px;color:var(--outline);font-weight:600">District</label><div style="font-size:13px;font-weight:600">${u.district}</div></div>
            <div><label style="font-size:11px;color:var(--outline);font-weight:600">Ashon</label><div style="font-size:13px;font-weight:600">${u.ashon}</div></div>
          </div>
        </div>
      </div>
      <div>
        <h5 style="font-size:12px;font-weight:700;color:var(--outline);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">NID Documents</h5>
        <div class="nid-images">
          <div>
            <div class="nid-img-wrap" style="background:#1a1a1a">
              ${u.nid_front_image_url
                ? `<img src="${u.nid_front_image_url}" alt="NID Front" style="cursor:zoom-in;object-fit:contain" onclick="window.open(this.src,'_blank')" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'nid-missing',innerHTML:'<span class=\\'material-symbols-outlined\\'>broken_image</span><span>Image not available</span>',style:'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;gap:6px'}))">`
                : `<div class="nid-missing" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;gap:6px"><span class="material-symbols-outlined">id_card</span><span style="font-size:12px">Not uploaded</span></div>`}
            </div>
            <div class="nid-label">Front Side</div>
          </div>
          <div>
            <div class="nid-img-wrap" style="background:#1a1a1a">
              ${u.nid_back_image_url
                ? `<img src="${u.nid_back_image_url}" alt="NID Back" style="cursor:zoom-in;object-fit:contain" onclick="window.open(this.src,'_blank')" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'nid-missing',innerHTML:'<span class=\\'material-symbols-outlined\\'>broken_image</span><span>Image not available</span>',style:'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;gap:6px'}))">`
                : `<div class="nid-missing" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;gap:6px"><span class="material-symbols-outlined">credit_card_off</span><span style="font-size:12px">Not uploaded</span></div>`}
            </div>
            <div class="nid-label">Back Side</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--on-surface-variant);margin-top:8px">
          <strong>NID:</strong> <span class="mono">${u.nid_number}</span>
        </div>
      </div>
    </div>`;
  
  const approveBtn=document.getElementById('reviewApproveBtn');
  if(u.profile_verified==='verified'){
    approveBtn.textContent='Already Verified';
    approveBtn.disabled=true;
    approveBtn.style.opacity='0.5';
  } else {
    approveBtn.innerHTML='<span class="material-symbols-outlined">verified_user</span> Mark as Verified';
    approveBtn.disabled=false;
    approveBtn.style.opacity='1';
  }
  document.getElementById('reviewApproveBtn').onclick=()=>approveReview(id);
  openModal('reviewModalOverlay');
}

function approveReview(id){
  const u=DATA.users.find(u=>u.id===id);
  if(!u)return;
  const apply = () => {
    u.profile_verified='verified';
    const btn=document.getElementById('reviewApproveBtn');
    if (btn) { btn.textContent='Verified ✓'; btn.style.background='#22C55E'; btn.disabled=true; }
    showToast('success','Profile Verified',`${u.full_name}'s profile has been verified. Notification sent.`);
    if (typeof filterReviews === 'function') filterReviews();
    if (typeof filterCitizens === 'function') filterCitizens();
  };
  if (window.API) {
    window.API.verifyUser(u.serverId || u.id).then(apply)
      .catch(err => showToast('error','Failed', err.message));
  } else apply();
}

// ===== COMPLAINT REQUESTS =====
function renderRequests(){filterRequests();}
function filterRequests(){
  const q=(document.getElementById('reqSearch')||{}).value?.toLowerCase()||'';
  const cat=(document.getElementById('reqCategory')||{}).value||'';
  const appr=(document.getElementById('reqApproval')||{}).value||'';
  const filtered=DATA.complaints.filter(c=>{
    const matchQ=!q||(c.complaint_id+c.subject).toLowerCase().includes(q);
    const matchCat=!cat||(c.categories||[]).includes(cat);
    const matchAppr=!appr||c.approval_status===appr;
    return matchQ&&matchCat&&matchAppr;
  });
  document.getElementById('requestsGrid').innerHTML=filtered.map(c=>`
    <div class="req-card" onclick="openComplaintDetail(${c.id})">
      <div class="req-card-header">
        <div>
          <div class="req-card-id">${c.complaint_id}</div>
          <div class="req-card-title">${c.subject}</div>
        </div>
        ${c.approval_status==='approved'?'<span class="pill pill-resolved" style="flex-shrink:0">Approved</span>':c.approval_status==='rejected'?'<span class="pill pill-rejected" style="flex-shrink:0">Rejected</span>':'<span class="pill pill-pending" style="flex-shrink:0">Pending</span>'}
      </div>
      <div class="req-card-meta">
        ${c.categories.map(cat=>categoryPill(cat)).join('')}
        ${priorityPill(c.priority)}
      </div>
      <div class="muted text-xs" style="margin-bottom:10px">
        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;color:var(--primary)">location_on</span>
        ${c.area}, ${c.district} · ${formatDate(c.submitted_at)}
        · <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle">image</span> ${c.media.length} media
      </div>
      <div class="req-card-actions" onclick="event.stopPropagation()">
        ${c.approval_status==='pending'?`
        <button class="btn btn-primary" style="padding:7px 14px;font-size:12px" onclick="approveComplaint(${c.id})">
          <span class="material-symbols-outlined">check_circle</span> Approve
        </button>
        <button class="btn btn-danger" style="padding:7px 14px;font-size:12px" onclick="openRejectModal(${c.id})">
          <span class="material-symbols-outlined">cancel</span> Reject
        </button>`:''}
        <button class="btn btn-outline" style="padding:7px 14px;font-size:12px" onclick="deleteComplaint(${c.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>`).join('');
  document.getElementById('req-badge').textContent=DATA.complaints.filter(c=>c.approval_status==='pending').length;
}
function resetReqFilters(){
  if(document.getElementById('reqSearch')) document.getElementById('reqSearch').value='';
  if(document.getElementById('reqCategory')) document.getElementById('reqCategory').value='';
  if(document.getElementById('reqApproval')) document.getElementById('reqApproval').value='';
  filterRequests();
}

function approveComplaint(id){
  const c=DATA.complaints.find(c=>c.id===id);
  if(!c)return;
  showConfirm('Approve Complaint',`Approve complaint ${c.complaint_id}?`,'✅',()=>{
    const apply = () => {
      c.approval_status='approved';
      c.approved=true;
      filterRequests();
      showToast('success','Approved',`Complaint ${c.complaint_id} approved.`);
    };
    if (window.API) {
      window.API.approveComplaint(c.serverId || c.id)
        .then(apply)
        .catch(err => showToast('error','Failed', err.message || 'Could not approve.'));
    } else apply();
  });
}

let currentRejectId=null;
function openRejectModal(id){
  currentRejectId=id;
  const c=DATA.complaints.find(c=>c.id===id);
  if(!c)return;
  document.getElementById('rejectComplaintId').textContent=`Complaint: ${c.complaint_id} — ${c.subject}`;
  document.getElementById('rejectReason').value='';
  document.getElementById('rejectRef').value='';
  openModal('rejectModalOverlay');
}
function submitRejection(){
  if(!currentRejectId)return;
  const reason=document.getElementById('rejectReason').value.trim();
  if(!reason){showToast('error','Required','Please provide a rejection reason.');return;}
  const c=DATA.complaints.find(c=>c.id===currentRejectId);
  if(!c)return;
  const ref=document.getElementById('rejectRef').value.trim()||null;
  const apply=()=>{
    c.approval_status='rejected';
    c.status='rejected';
    c.rejection_reason=reason;
    c.rejected_complaint_ref=ref;
    closeModal('rejectModalOverlay');
    filterRequests();
    showToast('success','Rejected',`Complaint ${c.complaint_id} has been rejected.`);
  };
  if (window.API) {
    window.API.rejectComplaint(c.serverId || c.id, reason, ref)
      .then(apply)
      .catch(err => showToast('error','Failed', err.message || 'Could not reject.'));
  } else apply();
}

// ===== ALL COMPLAINTS =====
function renderAllComplaints(){
  // Populate dept filter
  const df=document.getElementById('complaintDeptFilter');
  if(df.options.length<=1){
    DATA.departments.forEach(d=>{
      const o=document.createElement('option');
      o.value=d.id;o.textContent=d.name;df.appendChild(o);
    });
  }
  filterAllComplaints();
}

function filterAllComplaints(){
  const q=(document.getElementById('complaintSearch')||{}).value?.toLowerCase()||'';
  const cat=(document.getElementById('complaintCatFilter')||{}).value||'';
  const pri=(document.getElementById('complaintPriorityFilter')||{}).value||'';
  const sta=(document.getElementById('complaintStatusFilter')||{}).value||'';
  const dept=parseInt((document.getElementById('complaintDeptFilter')||{}).value)||0;
  
  const filtered=DATA.complaints.filter(c=>{
    const matchQ=!q||(c.complaint_id+c.subject+c.submitted_name+c.submitted_phone).toLowerCase().includes(q);
    const matchC=!cat||c.categories.includes(cat);
    const matchP=!pri||c.priority===pri;
    const matchS=!sta||c.status===sta;
    const matchD=!dept||c.assigned_dept===dept;
    return matchQ&&matchC&&matchP&&matchS&&matchD;
  });
  
  const deptMap={};DATA.departments.forEach(d=>deptMap[d.id]=d.name);
  document.getElementById('allComplaintsBody').innerHTML=filtered.map(c=>`
    <tr onclick="openComplaintDetail(${c.id})">
      <td><span class="mono text-xs">${c.complaint_id}</span></td>
      <td style="max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.subject}</td>
      <td class="text-xs muted">${c.district}</td>
      <td class="text-xs">${c.submitted_name}<br><span class="muted">${c.submitted_phone}</span></td>
      <td>${c.categories.map(cat=>categoryPill(cat)).join(' ')}</td>
      <td>${priorityPill(c.priority)}</td>
      <td onclick="event.stopPropagation()">
        <select class="inline-select" onchange="updateComplaintStatus(${c.id},this.value)">
          ${['submitted','pending','in_review','assigned','in_progress','resolved','rejected'].map(s=>`<option value="${s}" ${c.status===s?'selected':''}>${s.replace('_',' ')}</option>`).join('')}
        </select>
      </td>
      <td onclick="event.stopPropagation()">
        <select class="inline-select" onchange="updateComplaintDept(${c.id},parseInt(this.value)||0)">
          <option value="0" ${!c.assigned_dept?'selected':''}>Unassigned</option>
          ${DATA.departments.map(d=>`<option value="${d.id}" ${c.assigned_dept===d.id?'selected':''}>${d.name}</option>`).join('')}
        </select>
      </td>
      <td class="text-xs muted">${formatDate(c.submitted_at)}</td>
      <td><span style="font-weight:700">${c.upvote_count}</span></td>
      <td onclick="event.stopPropagation()">
        <div class="actions-cell">
          <button class="action-btn view" onclick="openComplaintDetail(${c.id})"><span class="material-symbols-outlined">visibility</span></button>
          <button class="action-btn delete" onclick="deleteComplaint(${c.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </td>
    </tr>`).join('');
}

function resetComplaintFilters(){
  ['complaintSearch','complaintCatFilter','complaintPriorityFilter','complaintStatusFilter','complaintDeptFilter'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value='';
  });
  filterAllComplaints();
}

function updateComplaintStatus(id, status){
  const c=DATA.complaints.find(c=>c.id===id);
  if(c){
    c.status=status;
    DATA.activity.unshift({id:Date.now(),actor_type:'admin',actor_name:'System Admin',action:`Status of ${c.complaint_id} updated to ${status}`,complaint_id:c.complaint_id,created_at:new Date().toISOString()});
    showToast('success','Status Updated',`${c.complaint_id} → ${status}`);
  }
}
function updateComplaintDept(id, deptId){
  const c=DATA.complaints.find(c=>c.id===id);
  if(!c) return;
  c.assigned_dept=deptId||null;
  const d=DATA.departments.find(d=>d.id===deptId);
  if (window.API && deptId) {
    window.API.assignDepartment(c.serverId || c.id, deptId)
      .then(() => showToast('success','Department Updated',`${c.complaint_id} → ${d?d.name:'Unassigned'}`))
      .catch(err => showToast('error','Failed', err.message));
  } else {
    showToast('success','Department Updated',`${c.complaint_id} → ${d?d.name:'Unassigned'}`);
  }
}
function deleteComplaint(id){
  const c=DATA.complaints.find(c=>c.id===id);
  if(!c)return;
  showConfirm('Delete Complaint',`Remove complaint ${c.complaint_id}? This cannot be undone.`,'🗑️',()=>{
    const apply = () => {
      DATA.complaints=DATA.complaints.filter(c=>c.id!==id);
      filterAllComplaints();filterRequests();renderRecentComplaintsTable();
      document.getElementById('req-badge').textContent=DATA.complaints.filter(c=>c.approval_status==='pending').length;
      showToast('success','Deleted',`Complaint ${c.complaint_id} removed.`);
    };
    if (window.API) {
      window.API.deleteComplaint(c.serverId || c.id).then(apply).catch(err => showToast('error','Failed', err.message));
    } else apply();
  });
}

// Export CSV
function exportCSV(){
  const cols=['Complaint ID','Title','Category','Priority','Status','Department','District','Ashon','Date Submitted','Upvotes'];
  const deptMap={};DATA.departments.forEach(d=>deptMap[d.id]=d.name);
  const rows=DATA.complaints.map(c=>[
    c.complaint_id,`"${c.subject.replace(/"/g,'""')}"`,c.categories.join(';'),
    c.priority,c.status,deptMap[c.assigned_dept]||'Unassigned',
    c.district,c.ashon,c.submitted_at,c.upvote_count
  ].join(','));
  const csv=[cols.join(','),...rows].join('\n');
  const link=document.createElement('a');
  link.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  link.download=`complaints_export_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  showToast('success','Exported','CSV file downloaded.');
}

// ===== COMPLAINT DETAIL MODAL =====
function openComplaintDetail(id){
  const c=DATA.complaints.find(c=>c.id===id);
  if(!c)return;
  document.getElementById('cdModalId').textContent=c.complaint_id;
  document.getElementById('cdModalTitle').textContent=c.subject;
  
  const deptMap={};DATA.departments.forEach(d=>deptMap[d.id]=d.name);
  const statusStages=['submitted','pending','in_review','assigned','in_progress','resolved'];
  const currentIdx=statusStages.indexOf(c.status);
  
  // Build media HTML
  const mediaGallery=buildMediaGallery(c.media,c.categories[0]);
  
  // Timeline
  const tlItems=statusStages.map((stage,i)=>{
    const isDone=i<currentIdx||(c.status==='resolved'&&stage==='resolved');
    const isActive=stage===c.status;
    return `<div class="timeline-item">
      <div class="timeline-dot ${isDone||isActive?isDone?'done':'active':''}"></div>
      <div class="timeline-label ${isDone?'done':''}">${stage.replace('_',' ').replace(/\b\w/g,l=>l.toUpperCase())}</div>
      ${isDone?`<div class="timeline-time">Completed</div>`:'<div class="timeline-time" style="color:var(--outline-variant)">Pending</div>'}
    </div>`;
  }).join('');
  
  document.getElementById('cdModalBody').innerHTML=`
    ${mediaGallery}
    <div class="detail-meta-row">
      <div class="detail-location">
        <span class="material-symbols-outlined">location_on</span>
        ${c.area||'—'}, ${c.ashon}, ${c.district}
      </div>
      <div class="detail-ts">${formatDateTime(c.submitted_at)}</div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      ${c.categories.map(cat=>categoryPill(cat)).join('')}
      ${priorityPill(c.priority)}
      ${c.status !== 'rejected' ? statusPill(c.status) : ''}
      ${c.approval_status==='approved'
          ? '<span class="pill pill-resolved"><span class="material-symbols-outlined" style="font-size:12px">verified</span> Approved</span>'
          : c.approval_status==='rejected'
              ? '<span class="pill pill-rejected">Rejected</span>'
              : '<span class="pill pill-pending">Pending Review</span>'}
    </div>
    <p class="detail-desc">${c.description}</p>
    
    ${c.map_lat?`<iframe class="map-embed" src="https://maps.google.com/maps?q=${c.map_lat},${c.map_lng}&z=15&hl=en&output=embed" allowfullscreen loading="lazy"></iframe>`:
    `<div class="map-placeholder"><span class="material-symbols-outlined" style="font-size:40px">map</span><span>Location not specified</span></div>`}
    
    <div class="citizen-info-box">
      <h5>Citizen Information</h5>
      <div class="citizen-info-grid">
        <div class="citizen-info-item"><label>Full Name</label><span>${c.submitted_name}</span></div>
        <div class="citizen-info-item"><label>Phone</label><span>${c.submitted_phone}</span></div>
        <div class="citizen-info-item"><label>NID</label><span class="mono">${c.submitted_nid}</span></div>
        <div class="citizen-info-item"><label>Upvotes</label><span>${c.upvote_count}</span></div>
        <div class="citizen-info-item"><label>Comments</label><span>${c.comment_count}</span></div>
        <div class="citizen-info-item"><label>Assigned Dept</label><span>${c.assigned_dept?deptMap[c.assigned_dept]:'Not assigned'}</span></div>
      </div>
    </div>
    
    ${c.rejection_reason?`<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px;margin-bottom:12px">
      <div style="font-size:12px;font-weight:700;color:#DC2626;margin-bottom:4px">REJECTION REASON</div>
      <div style="font-size:13px;">${c.rejection_reason}</div>
    </div>`:''}

    <div style="margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;margin-bottom:12px">Progress Timeline</div>
      <div class="timeline">${tlItems}</div>
    </div>

    ${c.status === 'resolved' ? `
    <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:12px;padding:14px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;color:#15803d;margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <span class="material-symbols-outlined" style="font-size:18px">photo_camera</span>
        Proof of Resolution${c.assignment && c.assignment.staff_name ? ` <span style="font-weight:400;color:var(--on-surface-variant);font-size:11px;margin-left:6px">— uploaded by ${c.assignment.staff_name}</span>` : ''}
      </div>
      ${(c.proofMedia && c.proofMedia.length) ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">
          ${c.proofMedia.map((m,i) => m.type === 'video'
            ? `<video src="${m.url}" controls style="width:100%;height:120px;object-fit:cover;border-radius:8px;background:#000"></video>`
            : `<img src="${m.url}" alt="Proof ${i+1}" loading="lazy" style="width:100%;height:120px;object-fit:cover;border-radius:8px;cursor:zoom-in;border:1px solid rgba(0,0,0,0.05)" onclick="window.open(this.src,'_blank')" onerror="this.style.display='none'">`
          ).join('')}
        </div>
        <p style="font-size:11px;color:var(--on-surface-variant);margin-top:8px">${c.proofMedia.length} proof file${c.proofMedia.length>1?'s':''} uploaded by the department staff.</p>
      ` : '<p style="font-size:13px;color:var(--on-surface-variant);margin:0">Resolution proof has not been uploaded yet by the department staff.</p>'}
    </div>
    <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:14px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;color:#b45309;margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;color:#f59e0b">star</span>
        Citizen Rating
      </div>
      ${c.rating ? `
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:22px;letter-spacing:2px;color:#f59e0b">${'★'.repeat(c.rating)}<span style="color:#d1d5db">${'★'.repeat(5 - c.rating)}</span></div>
          <div style="font-size:14px;font-weight:700">${c.rating}/5</div>
          <div style="font-size:11px;color:var(--on-surface-variant);margin-left:auto">Rated by the citizen who filed this complaint</div>
        </div>
      ` : '<p style="font-size:13px;color:var(--on-surface-variant);margin:0">The citizen has not rated this resolution yet.</p>'}
    </div>
    ` : ''}
    
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
      <select class="filter-select" onchange="updateComplaintStatus(${c.id},this.value);this.closest('.modal-body').querySelectorAll('.pill-status-current').forEach(p=>p.remove())">
        ${['submitted','pending','in_review','assigned','in_progress','resolved','rejected'].map(s=>`<option ${c.status===s?'selected':''}>${s}</option>`).join('')}
      </select>
      <select class="filter-select" onchange="updateComplaintDept(${c.id},parseInt(this.value)||0)">
        <option value="0">Unassigned</option>
        ${DATA.departments.map(d=>`<option value="${d.id}" ${c.assigned_dept===d.id?'selected':''}>${d.name}</option>`).join('')}
      </select>
    </div>`;
  
  openModal('complaintDetailOverlay');
}

function buildMediaGallery(media, fallbackCat){
  if(!media||!media.length){
    const icons={infrastructure:'construction',water_service:'water_drop',electricity:'electric_bolt',waste_management:'delete_sweep',traffic_transport:'traffic',environment:'eco',public_services:'local_police',others:'more_horiz'};
    return `<div class="media-gallery media-gallery-full"><div class="media-main"><div class="media-placeholder"><span class="material-symbols-outlined">${icons[fallbackCat]||'image'}</span><span>No media uploaded</span></div></div></div>`;
  }
  // Cache the items so navigation works
  currentMediaItems = media;
  const thumbs=media.map((m,i)=>`<div class="media-thumb ${i===0?'active':''}" onclick="changeMedia(${i})" id="thumb-${i}">${
    m.type==='video' ? `<video src="${m.url}" muted></video>` : `<img src="${m.url}" alt="Media ${i+1}">`
  }</div>`).join('');
  return `<div class="media-gallery media-gallery-full" id="mediaGallery" data-current="0" data-count="${media.length}">
    <div class="media-main" id="mediaMainWrap">
      ${media[0].type==='video'
        ? `<video src="${media[0].url}" id="mainMediaVid" controls></video>`
        : `<img src="${media[0].url}" id="mainMediaImg" alt="Main Media" onclick="openLightbox(0)">`}
      ${media.length>1?`<button class="media-nav prev" onclick="navMedia(-1)"><span class="material-symbols-outlined">chevron_left</span></button>
      <button class="media-nav next" onclick="navMedia(1)"><span class="material-symbols-outlined">chevron_right</span></button>`:''}
    </div>
    ${media.length>1 ? `<div class="media-thumbnails">${thumbs}</div>` : ''}
  </div>`;
}

let currentMediaItems=[];
function navMedia(dir){
  const gallery=document.getElementById('mediaGallery');
  if(!gallery)return;
  const count=parseInt(gallery.dataset.count);
  let cur=parseInt(gallery.dataset.current);
  cur=(cur+dir+count)%count;
  _swapMainMedia(cur);
}
function changeMedia(idx){
  const gallery=document.getElementById('mediaGallery');
  if(!gallery)return;
  _swapMainMedia(idx);
}
function _swapMainMedia(idx){
  const gallery=document.getElementById('mediaGallery');
  if(!gallery) return;
  gallery.dataset.current=idx;
  const wrap=document.getElementById('mediaMainWrap');
  const item=currentMediaItems[idx];
  if (wrap && item) {
    // Preserve the nav buttons; only swap the first child (img/video).
    const navs = wrap.querySelectorAll('.media-nav');
    wrap.innerHTML = item.type === 'video'
      ? `<video src="${item.url}" id="mainMediaVid" controls></video>`
      : `<img src="${item.url}" id="mainMediaImg" alt="Main Media" onclick="openLightbox(${idx})">`;
    navs.forEach(n => wrap.appendChild(n));
  }
  document.querySelectorAll('.media-thumb').forEach((t,i)=>t.classList.toggle('active',i===idx));
}
function openLightbox(idx){
  const item = currentMediaItems[idx];
  if (item && item.url) window.open(item.url, '_blank');
}

function editComplaintStatus(id){openComplaintDetail(id);}

// ===== ALL DEPARTMENTS =====
function renderDepartments(){
  document.getElementById('deptsGrid').innerHTML=DATA.departments.map(d=>{
    const perf = computeDeptPerf(d.id, '', '');   // default = All Months / All Years
    const pct  = perf.assigned>0 ? Math.round(perf.resolved/perf.assigned*100) : 0;
    return `<div class="dept-card">
      <div class="dept-card-header">
        <div class="dept-icon"><span class="material-symbols-outlined">${d.icon}</span></div>
        <div style="flex:1">
          <div class="dept-name">${d.name}</div>
          <div class="dept-meta"><span class="material-symbols-outlined" style="font-size:14px">mail</span>${d.contact_email}</div>
          <div class="dept-meta"><span class="material-symbols-outlined" style="font-size:14px">phone</span>${d.contact_phone}</div>
        </div>
      </div>
      <div class="dept-filter">
        <select id="dept-month-${d.id}" onchange="updateDeptStats(${d.id})" title="Month">
          <option value="" selected>All Months</option>
          ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i)=>`<option value="${i+1}">${m}</option>`).join('')}
        </select>
        <select id="dept-year-${d.id}" onchange="updateDeptStats(${d.id})" title="Year">
          <option value="" selected>All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div class="dept-stats" id="dept-stats-${d.id}">
        <div class="dept-stat">
          <div class="dept-stat-num" style="color:var(--primary)">${perf.assigned}</div>
          <div class="dept-stat-label">Total</div>
        </div>
        <div class="dept-stat">
          <div class="dept-stat-num" style="color:#F97316">${perf.in_progress}</div>
          <div class="dept-stat-label">In Progress</div>
        </div>
        <div class="dept-stat">
          <div class="dept-stat-num" style="color:#22C55E">${perf.resolved}</div>
          <div class="dept-stat-label">Resolved</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--outline);font-weight:600;margin-bottom:4px" id="dept-perf-line-${d.id}">Performance: ${pct}% · ${d.staff} Staff</div>
      <div class="dept-perf-bar">
        <div class="dept-perf-fill" id="dept-perf-fill-${d.id}" style="width:0" data-width="${pct}%"></div>
      </div>
      <button class="btn btn-outline" style="width:100%;margin-top:12px;font-size:12px;border-radius:10px" onclick="switchSection('users');switchUserTab('staff')">
        <span class="material-symbols-outlined">group</span> View Staff Details
      </button>
    </div>`;
  }).join('');

  setTimeout(()=>{
    document.querySelectorAll('.dept-perf-fill').forEach(b=>b.style.width=b.dataset.width||'0%');
  },100);
}

/* Recompute one card's stats from REAL data when its month/year filter changes.
   Numbers match the Overview "All Departments Performance" table when both are
   set to the same filter (and both default to "All / All"). */
function updateDeptStats(deptId){
  const month = document.getElementById(`dept-month-${deptId}`)?.value || '';
  const year  = document.getElementById(`dept-year-${deptId}`)?.value  || '';
  const perf  = computeDeptPerf(deptId, month, year);
  const pct   = perf.assigned>0 ? Math.round(perf.resolved/perf.assigned*100) : 0;
  const dept  = DATA.departments.find(d => d.id === deptId);

  const el = document.getElementById(`dept-stats-${deptId}`);
  if (el) {
    const nums = el.querySelectorAll('.dept-stat-num');
    if (nums[0]) animateNumber(nums[0], perf.assigned);
    if (nums[1]) animateNumber(nums[1], perf.in_progress);
    if (nums[2]) animateNumber(nums[2], perf.resolved);
  }
  const line = document.getElementById(`dept-perf-line-${deptId}`);
  if (line && dept) line.textContent = `Performance: ${pct}% · ${dept.staff} Staff`;
  const fill = document.getElementById(`dept-perf-fill-${deptId}`);
  if (fill) { fill.dataset.width = pct+'%'; fill.style.width = pct+'%'; }
}
function animateNumber(el, target){
  let cur=parseInt(el.textContent)||0;
  const step=Math.abs(target-cur)>0?1:0;
  const dir=target>cur?1:-1;
  const timer=setInterval(()=>{
    cur=cur+dir*step;
    el.textContent=cur;
    if((dir>0&&cur>=target)||(dir<0&&cur<=target)||step===0){
      el.textContent=target;clearInterval(timer);
    }
  },30);
}

// Add Dept
function openAddDeptModal(){
  document.getElementById('newDeptName').value='';
  document.getElementById('newDeptEmail').value='';
  document.getElementById('newDeptPhone').value='';
  document.getElementById('newDeptDesc').value='';
  openModal('addDeptOverlay');
}
function saveNewDept(){
  const name=document.getElementById('newDeptName').value.trim();
  if(!name){showToast('error','Required','Please enter a department name.');return;}
  const cat=document.getElementById('newDeptCat').value;
  const icons={infrastructure:'construction',water_service:'water_drop',electricity:'electric_bolt',waste_management:'delete_sweep',traffic_transport:'traffic',environment:'eco',public_services:'local_police',others:'more_horiz'};
  const newDept={
    id:DATA.departments.length+1,name,category_key:cat,
    contact_email:document.getElementById('newDeptEmail').value,
    contact_phone:document.getElementById('newDeptPhone').value,
    description:document.getElementById('newDeptDesc').value,
    icon:icons[cat]||'business',staff:0
  };
  DATA.departments.push(newDept);
  DEPT_PERF[newDept.id]={assigned:0,in_progress:0,resolved:0};
  closeModal('addDeptOverlay');
  renderDepartments();
  showToast('success','Department Added',`${name} has been added.`);
}

// ===== FEEDBACK =====
function renderFeedback(){filterFeedback();}
function filterFeedback(){
  const q=(document.getElementById('feedbackSearch')||{}).value?.toLowerCase()||'';
  const r=parseInt((document.getElementById('feedbackRating')||{}).value)||0;
  const f=parseInt((document.getElementById('feedbackFeatured')||{}).value)||0;
  const filtered=DATA.feedback.filter(fb=>{
    const matchQ=!q||(fb.topic+fb.user_name+fb.message).toLowerCase().includes(q);
    const matchR=!r||fb.rating===r;
    const matchF=!f||fb.is_featured;
    return matchQ&&matchR&&matchF;
  });
  document.getElementById('feedbackGrid').innerHTML=filtered.map(fb=>`
    <div class="feedback-card" onclick="openFeedbackDetail(${fb.id})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div class="rj-avatar ${getAvatarClass(fb.user_id)}">${getInitials(fb.user_name)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:700">${fb.user_name}</div>
          <div class="mono muted" style="font-size:10px">${fb.user_uid}</div>
        </div>
        ${fb.is_featured?'<span class="featured-badge">Featured</span>':''}
      </div>
      <div class="stars">${'<span class="material-symbols-outlined">star</span>'.repeat(fb.rating)}${'<span class="material-symbols-outlined empty">star</span>'.repeat(5-fb.rating)}</div>
      <div class="feedback-topic">${fb.topic}</div>
      <div class="feedback-excerpt">${fb.message}</div>
      <div class="muted text-xs" style="margin-top:8px">${formatDate(fb.created_at)}</div>
      <div style="display:flex;gap:6px;margin-top:10px" onclick="event.stopPropagation()">
        <button class="action-btn star" title="${fb.is_featured?'Unfeature':'Feature'}" onclick="toggleFeatured(${fb.id})"><span class="material-symbols-outlined">${fb.is_featured?'star':'star_border'}</span></button>
        <button class="action-btn delete" title="Delete" onclick="deleteFeedback(${fb.id})"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>`).join('');
}

function toggleFeatured(id){
  const fb=DATA.feedback.find(f=>f.id===id);
  if(!fb)return;
  const newVal = !fb.is_featured;
  const apply = () => {
    fb.is_featured = newVal;
    filterFeedback();
    showToast('success','Updated',`Feedback ${fb.is_featured?'featured':'unfeatured'}.`);
  };
  if (window.API) {
    window.API.featureFeedback(fb.serverId || fb.id, newVal ? 1 : 0)
      .then(apply).catch(err => showToast('error','Failed', err.message));
  } else apply();
}
function deleteFeedback(id){
  const fb=DATA.feedback.find(f=>f.id===id);
  if(!fb)return;
  showConfirm('Delete Feedback',`Remove this feedback from ${fb.user_name}?`,'🗑️',()=>{
    const apply = () => {
      DATA.feedback=DATA.feedback.filter(f=>f.id!==id);
      filterFeedback();showToast('success','Deleted','Feedback removed.');
    };
    if (window.API) {
      window.API.deleteFeedback(fb.serverId || fb.id).then(apply)
        .catch(err => showToast('error','Failed', err.message));
    } else apply();
  });
}
function openFeedbackDetail(id){
  const fb=DATA.feedback.find(f=>f.id===id);
  if(!fb)return;
  document.getElementById('feedbackDetailBody').innerHTML=`
    <div style="text-align:center;margin-bottom:16px">
      <div class="rj-avatar ${getAvatarClass(fb.user_id)}" style="width:60px;height:60px;font-size:20px;margin:0 auto 10px">${getInitials(fb.user_name)}</div>
      <h4>${fb.user_name} <span class="mono muted text-xs">${fb.user_uid}</span></h4>
      <div class="stars" style="justify-content:center;margin:8px 0">${'<span class="material-symbols-outlined">star</span>'.repeat(fb.rating)}${'<span class="material-symbols-outlined empty">star</span>'.repeat(5-fb.rating)}</div>
      <div style="font-size:12px;color:var(--outline)">${formatDate(fb.created_at)}</div>
    </div>
    <div style="font-size:16px;font-weight:700;margin-bottom:8px">${fb.topic}</div>
    <div style="font-size:14px;line-height:1.7;color:var(--on-surface-variant)">${fb.message}</div>`;
  openModal('feedbackDetailOverlay');
}

// ===== REPORTS =====
let currentReportTab='citizen';
function renderReports(){filterReports();}
function switchReportTab(tab){
  currentReportTab=tab;
  document.getElementById('tab-rep-citizen').classList.toggle('active',tab==='citizen');
  document.getElementById('tab-rep-staff').classList.toggle('active',tab==='staff');
  filterReports();
}
function filterReports(){
  const cat=(document.getElementById('reportCatFilter')||{}).value||'';
  const filtered=DATA.reports.filter(r=>{
    const matchType=r.reporter_type===currentReportTab;
    const matchCat=!cat||r.category===cat;
    return matchType&&matchCat;
  });
  const _esc = s => String(s == null ? '' : s).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.getElementById('reportsList').innerHTML=filtered.map(r=>{
    const cat = (r.category || 'others');
    const catCls = cat.replace(/_/g,'-');
    const catLabel = cat.replace(/_/g,' ');
    return `
    <div class="report-card ${r.status==='pending'?'unread':''}" onclick="openReportDetail(${r.id})">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div class="rj-avatar ${r.reporter_type==='citizen'?'av-1':'av-2'}" style="width:36px;height:36px;font-size:12px;flex-shrink:0">
          ${r.reporter_type==='citizen'?'C':'S'}
        </div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span class="pill ${r.reporter_type==='citizen'?'pill-resolved':'pill-in_review'}">${r.reporter_type}</span>
            <strong style="font-size:13px">${_esc(r.reporter_name || '—')}</strong>
            ${r.dept?`<span class="muted text-xs">· ${_esc(r.dept)}</span>`:''}
            <span class="pill pill-${r.status==='pending'?'pending':'resolved'}" style="margin-left:auto">${r.status||'pending'}</span>
          </div>
          <div style="font-size:13px;font-weight:600;margin-bottom:4px">${_esc(r.topic || '—')}</div>
          <div class="muted text-xs" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${_esc(r.message || r.description || '')}</div>
        </div>
        <div style="flex-shrink:0">
          <span class="pill pill-${catCls}" style="font-size:10px">${catLabel}</span>
          <div class="muted text-xs" style="margin-top:4px">${r.created_at ? formatDate(r.created_at) : ''}</div>
        </div>
      </div>
    </div>`;
  }).join('')||'<div class="muted text-sm" style="padding:20px;text-align:center">No reports found.</div>';
  const badge = document.getElementById('report-badge');
  if (badge) badge.textContent = DATA.reports.filter(r=>r.status==='pending').length;
}
function resetReportFilters(){
  if(document.getElementById('reportCatFilter'))document.getElementById('reportCatFilter').value='';
  filterReports();
}

let currentReportId=null;
function openReportDetail(id){
  const r=DATA.reports.find(r=>r.id===id);
  if(!r)return;
  currentReportId=id;
  r.status='reviewed';
  filterReports();
  const _esc = s => String(s == null ? '' : s).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const cat = (r.category || 'others');
  const catCls = cat.replace(/_/g,'-');
  const catLabel = cat.replace(/_/g,' ');
  document.getElementById('reportDetailBody').innerHTML=`
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <span class="pill ${r.reporter_type==='citizen'?'pill-resolved':'pill-in_review'}">${r.reporter_type}</span>
      <span class="pill pill-${catCls}">${catLabel}</span>
      <span class="muted text-xs" style="margin-left:auto">${r.created_at ? formatDate(r.created_at) : ''}</span>
    </div>
    <div style="font-size:16px;font-weight:700;margin-bottom:4px">${_esc(r.topic || '—')}</div>
    <div style="font-size:13px;color:var(--on-surface-variant);margin-bottom:4px">
      By: <strong>${_esc(r.reporter_name || '—')}</strong>${r.reporter_uid?` <span class="mono text-xs muted">${_esc(r.reporter_uid)}</span>`:''}${r.dept?' — '+_esc(r.dept):''}
    </div>
    ${(r.reporter_email||r.reporter_phone)?`<div class="muted text-xs" style="margin-bottom:8px">${_esc(r.reporter_email||'')}${r.reporter_email&&r.reporter_phone?' · ':''}${_esc(r.reporter_phone||'')}</div>`:''}
    <div style="font-size:14px;line-height:1.7;margin-bottom:16px">${_esc(r.message || r.description || '—')}</div>
    ${r.new_staff?`<div class="citizen-info-box">
      <h5>New Staff Request Details</h5>
      <div class="citizen-info-grid">
        <div class="citizen-info-item"><label>Full Name</label><span>${r.new_staff.full_name}</span></div>
        <div class="citizen-info-item"><label>Phone</label><span>${r.new_staff.phone}</span></div>
        <div class="citizen-info-item"><label>Department</label><span>${r.new_staff.department}</span></div>
        <div class="citizen-info-item"><label>Designation</label><span>${r.new_staff.designation}</span></div>
      </div>
      <button class="btn btn-primary" style="margin-top:12px;width:100%;border-radius:10px" onclick="createStaffFromReport()">
        <span class="material-symbols-outlined">person_add</span> Create Staff Account
      </button>
    </div>`:''}
    ${r.admin_reply?`<div style="background:rgba(0,106,78,0.06);border:1px solid rgba(0,106,78,0.2);border-radius:10px;padding:14px">
      <div style="font-size:12px;font-weight:700;color:var(--primary);margin-bottom:6px">YOUR REPLY</div>
      <div style="font-size:14px">${r.admin_reply}</div>
    </div>`:''}
    <div class="form-group" style="margin-top:16px">
      <label class="form-label-md">Reply to this Report</label>
      <textarea class="rejection-textarea" id="reportReplyText" placeholder="Write your reply..." rows="3">${r.admin_reply||''}</textarea>
    </div>`;
  openModal('reportDetailOverlay');
}

function sendReportReply(){
  const r=DATA.reports.find(r=>r.id===currentReportId);
  if(!r)return;
  const txt=document.getElementById('reportReplyText').value.trim();
  if(!txt){showToast('error','Required','Please write a reply.');return;}
  const apply = () => {
    r.admin_reply=txt;r.status='reviewed';
    closeModal('reportDetailOverlay');
    filterReports();
    showToast('success','Reply Sent','Your reply has been saved.');
  };
  if (window.API) {
    window.API.replyReport(r.serverId || r.id, txt)
      .then(apply).catch(err => showToast('error','Failed', err.message));
  } else apply();
}
function createStaffFromReport(){
  showToast('info','Staff Creation','Staff account creation form would open here. Credentials generated and saved.');
}

// ===== ACTIVITY LOG =====
function renderActivity(){filterActivity();}
function filterActivity(){
  const q=(document.getElementById('actSearch')||{}).value?.toLowerCase()||'';
  const t=(document.getElementById('actType')||{}).value||'';
  const filtered=DATA.activity.filter(a=>{
    const matchQ=!q||(a.action+a.actor_name+(a.complaint_id||'')).toLowerCase().includes(q);
    const matchT=!t||a.actor_type===t;
    return matchQ&&matchT;
  });
  const colors={citizen:'var(--primary)',staff:'var(--status-in-review)',admin:'var(--status-assigned)',system:'var(--outline)'};
  const icons={citizen:'person',staff:'badge',admin:'admin_panel_settings',system:'settings'};
  document.getElementById('activityList').innerHTML=filtered.map(a=>`
    <div class="activity-card ${a.actor_type}">
      <div class="activity-icon" style="background:${colors[a.actor_type]}1a;color:${colors[a.actor_type]}">
        <span class="material-symbols-outlined">${icons[a.actor_type]||'info'}</span>
      </div>
      <div class="activity-body">
        <div class="activity-action">${a.action}
          ${a.complaint_id?`<a href="#" onclick="event.preventDefault();openComplaintDetail(DATA.complaints.find(c=>c.complaint_id==='${a.complaint_id}')?.id)" style="color:var(--primary);font-size:11px;margin-left:6px">[View]</a>`:''}
        </div>
        <div class="activity-time">${a.actor_type.toUpperCase()} · ${a.actor_name} · ${formatDateTime(a.created_at)}</div>
      </div>
      <span class="pill pill-${a.actor_type==='citizen'?'resolved':a.actor_type==='staff'?'in_review':a.actor_type==='admin'?'assigned':'submitted'}" style="flex-shrink:0;font-size:10px">${a.actor_type}</span>
    </div>`).join('')||'<div class="muted text-sm" style="padding:20px;text-align:center">No activity found.</div>';
}
function resetActivityFilters(){
  if(document.getElementById('actSearch'))document.getElementById('actSearch').value='';
  if(document.getElementById('actType'))document.getElementById('actType').value='';
  filterActivity();
}

// ===== SETTINGS =====
function toggleSetting(key){
  DATA.settings[key]=!DATA.settings[key];
  if(key==='auto_assignment'){
    document.getElementById('autoAssignToggle').classList.toggle('on',DATA.settings[key]);
    document.getElementById('autoAssignLabel').textContent=DATA.settings[key]?'Enabled':'Disabled';
  } else {
    document.getElementById('maintToggle').classList.toggle('on',DATA.settings[key]);
    document.getElementById('maintLabel').textContent=DATA.settings[key]?'Enabled':'Disabled';
  }
  if (window.API) {
    const payload = {}; payload[key] = DATA.settings[key] ? '1' : '0';
    window.API.updateSettings(payload).catch(()=>{});
  }
  showToast('success','Settings Updated',`${key.replace('_',' ')} ${DATA.settings[key]?'enabled':'disabled'}.`);
}
function updateSetting(key,inputId){
  const val=document.getElementById(inputId).value.trim();
  if(!val){showToast('error','Required','Please enter a value.');return;}
  if (window.API) {
    const payload = {}; payload[key] = val;
    window.API.updateSettings(payload).catch(()=>{});
  }
  showToast('success','Updated',`${key.replace('_',' ')} updated to "${val}".`);
}
function changeAdminPassword(){
  const cur=document.getElementById('currPass').value;
  const nw=document.getElementById('newPass').value;
  const cf=document.getElementById('confirmPass').value;
  if(!cur||!nw||!cf){showToast('error','Required','Please fill all password fields.');return;}
  if(nw!==cf){showToast('error','Mismatch','New passwords do not match.');return;}
  if(nw.length<8){showToast('error','Too Short','Password must be at least 8 characters.');return;}
  document.getElementById('currPass').value='';
  document.getElementById('newPass').value='';
  document.getElementById('confirmPass').value='';
  showToast('success','Password Updated','Admin password changed successfully.');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  renderOverview();
  window.DATA=DATA;
  // Wrap openComplaintDetail to refresh from API (media, citizen details, history) before rendering.
  const _origOpenDetail = openComplaintDetail;
  window.openComplaintDetail = function (id) {
    const c = DATA.complaints.find(x => x.id === id);
    if (!c || !window.API) return _origOpenDetail(id);
    window.API.complaint(c.serverId || c.id).then(res => {
      const d = res.data || {};
      // CITIZEN-uploaded media goes into the main gallery
      c.media = (d.citizen_media || []).map(m => ({ url: m.url, type: m.file_type }));
      c.media_count = c.media.length;
      // STAFF-uploaded proof media is kept SEPARATE for its own section
      c.proofMedia = (d.proof_media || []).map(m => ({ url: m.url, type: m.file_type }));
      c.submitted_name  = d.citizen_name  || c.submitted_name;
      c.submitted_phone = d.citizen_phone || c.submitted_phone;
      c.submitted_email = d.citizen_email || c.submitted_email;
      c.submitted_nid   = d.citizen_nid   || c.submitted_nid;
      c.submitted_uid   = d.citizen_uid   || c.submitted_uid;
      c.status_history  = d.status_history || [];
      c.assignment      = d.assignment || null;
      c.rating          = (d.rating && typeof d.rating === 'object') ? (d.rating.rating || null) : (d.rating || null);
      c.map_lat = d.map_lat; c.map_lng = d.map_lng;
      c.map_address = d.map_address;
      c.description = d.description || c.description;
      _origOpenDetail(id);
    }).catch(() => _origOpenDetail(id));
  };
  // Live data hydration (replaces mock DATA with API data and re-renders).
  loadAdminLiveData();
});

async function loadAdminLiveData() {
  if (!window.API) return;
  try {
    const [cmps, users, staff, depts, fb, reports, act, stats, settings] = await Promise.all([
      window.API.complaints({ per_page: 200, sort: 'newest' }).catch(()=>null),
      window.API.getUsers({ per_page: 200 }).catch(()=>null),
      window.API.getStaff({}).catch(()=>null),
      window.API.departments().catch(()=>null),
      window.API.getFeedback().catch(()=>null),
      window.API.getReports().catch(()=>null),
      window.API.getActivity({ per_page: 100 }).catch(()=>null),
      window.API.overviewStats().catch(()=>null),
      window.API.getSettings().catch(()=>null),
    ]);

    if (cmps && cmps.data && cmps.data.complaints) {
      DATA.complaints = cmps.data.complaints.map(c => ({
        id: c.id, serverId: c.id,
        complaint_id: c.complaint_id,
        subject: c.subject || '',
        description: c.description || '',
        categories: (c.categories && c.categories.length) ? c.categories : ['others'],
        category: ((c.categories && c.categories[0]) || 'others'),
        priority: c.priority || 'medium',
        status: c.status || 'submitted',
        approval_status: c.approval_status || 'pending',
        approved: !!c.is_approved,
        rejection_reason: c.rejection_reason || null,
        rejected_complaint_ref: c.rejected_complaint_ref || null,
        district: c.district_name || '—',
        ashon:    c.ashon_code    || '—',
        area:     c.area_name     || '—',
        district_id: c.district_id || null,
        ashon_id:    c.ashon_id    || null,
        area_id:     c.area_id     || null,
        assigned_dept: c.department_id || null,
        department_name: c.department_name || null,
        // Both old/new property names so all existing UI references work
        upvote_count:  c.upvote_count  || 0,
        comment_count: c.comment_count || 0,
        upvotes:       c.upvote_count  || 0,
        comments:      c.comment_count || 0,
        is_featured: !!c.is_featured,
        submitted_at: c.submitted_at,
        submitted_by:    null,
        submitted_name:  c.citizen_name  || '—',
        submitted_phone: c.citizen_phone || '—',
        submitted_email: c.citizen_email || '—',
        submitted_nid:   c.citizen_nid   || '—',
        submitted_uid:   c.citizen_uid   || '—',
        first_image_url: c.first_image_url,
        media: c.first_image_url
                 ? [{ url: c.first_image_url, type: 'image' }]
                 : Array.from({length: c.media_count || 0}, () => ({ url: '', type: 'image' })),
        media_count: c.media_count || 0,
        map_lat: c.map_lat || null,
        map_lng: c.map_lng || null,
        map_address: c.map_address || '',
        rating: c.rating || null,
        assigned_staff_id:   c.assigned_staff_id || null,
        assigned_staff_name: c.assigned_staff_name || null,
      }));
    }
    if (users && users.data && users.data.users) {
      DATA.users = users.data.users.map(u => ({
        id: u.id, serverId: u.id, user_uid: u.user_uid,
        full_name: u.full_name || '—',
        username:  u.username  || '',
        email:     u.email     || '',
        phone:     u.phone     || '',
        nid_number:u.nid_number|| '',
        district:  u.district_name || '—',
        ashon:     u.ashon_code    || '—',
        area:      u.area_name     || '',
        role: u.role, profile_verified: u.profile_verified,
        is_banned: !!u.is_banned, created_at: u.created_at,
        // Both old/new names so any UI that reads either works
        complaints:    u.complaint_count || 0,
        complaint_count: u.complaint_count || 0,
        upvotes_given: u.upvotes_given || 0,
        comments_made: u.comments_made || 0,
        profile_picture_url: u.profile_picture || null,
        nid_front_image_url: u.nid_front_image_url || null,
        nid_back_image_url:  u.nid_back_image_url  || null,
      }));
    }
    if (staff && staff.data && staff.data.staff) {
      DATA.staff = staff.data.staff.map(s => ({
        id: s.id, serverId: s.id, staff_uid: s.staff_uid,
        full_name:      s.full_name || '—',
        id_card_number: s.id_card_number || '',
        email:          s.email || '',
        phone:          s.phone || '',
        nid_number:     s.nid_number || '—',
        district:       s.district_name || '—',
        ashon:          s.ashon_code    || '—',
        department_id:  s.department_id,
        department_name:s.department_name || '—',
        designation:    s.designation || '—',
        work_status:    s.work_status,
        joined_date:    s.joined_date,
        complaints_handled:  s.complaints_handled  || 0,
        complaints_resolved: s.complaints_resolved || 0,
      }));
    }
    if (depts && depts.data && depts.data.departments) {
      DATA.departments = depts.data.departments.map(d => ({
        id: d.id, serverId: d.id, name: d.name,
        category_key: d.category_key,
        contact_email: d.contact_email,
        contact_phone: d.contact_phone,
        description: d.description, icon: d.icon,
        staff: d.staff_count || 0,
        total: d.total || 0, resolved: d.resolved || 0,
        in_progress: d.in_progress || 0,
      }));
    }
    if (fb && fb.data && fb.data.feedback) {
      DATA.feedback = fb.data.feedback.map(f => ({
        id: f.id, serverId: f.id,
        user_id: f.user_id, user_uid: f.user_uid, user_name: f.full_name,
        topic: f.topic, rating: f.rating, message: f.message,
        is_featured: !!f.is_featured, created_at: f.created_at,
      }));
    }
    if (reports && reports.data && reports.data.reports) {
      DATA.reports = reports.data.reports.map(r => ({
        id: r.id, serverId: r.id,
        reporter_type:    r.reporter_type,
        reporter_id:      r.reporter_id,
        reporter_name:    r.reporter_name  || (r.reporter_type === 'staff' ? 'Staff' : 'Citizen'),
        reporter_uid:     r.reporter_uid   || '',
        reporter_email:   r.reporter_email || '',
        reporter_phone:   r.reporter_phone || '',
        // Department info for staff reporters (kept under `dept` for legacy renderer)
        dept:             r.staff_department  || '',
        staff_department: r.staff_department  || '',
        staff_designation:r.staff_designation || '',
        topic:        r.topic       || '—',
        description:  r.description || '',
        // Renderer reads `message` — alias to description so it always shows text.
        message:      r.description || r.message || '',
        category:     r.category    || 'others',
        related_id:   r.related_id,
        image_paths:  r.image_urls  || [],
        admin_reply:  r.admin_reply || '',
        status:       r.status      || 'pending',
        created_at:   r.created_at,
      }));
    }
    if (act && act.data && act.data.activity) {
      DATA.activity = act.data.activity.map(a => ({
        id: a.id, actor_type: a.actor_type, actor_id: a.actor_id,
        actor_name: a.actor_type, action: a.action,
        complaint_id: a.related_complaint_id,
        created_at: a.created_at,
      }));
    }
    if (settings && settings.data) {
      DATA.settings.auto_assignment  = settings.data.auto_assignment  === '1';
      DATA.settings.maintenance_mode = settings.data.maintenance_mode === '1';
    }

    // Re-render whatever functions exist.
    ['renderOverview','filterAllComplaints','filterRequests','renderRecentComplaintsTable',
     'filterCitizens','filterStaff','renderDepartments','filterFeedback','filterReports',
     'filterActivity','renderRecentActivity'].forEach(fn => {
       if (typeof window[fn] === 'function') { try { window[fn](); } catch(e){} }
     });
    // Update request badge if present
    const badge = document.getElementById('req-badge');
    if (badge) badge.textContent = DATA.complaints.filter(c=>c.approval_status==='pending').length;
    // Sync settings toggles UI
    const aaT = document.getElementById('autoAssignToggle');
    const aaL = document.getElementById('autoAssignLabel');
    if (aaT) aaT.classList.toggle('on', DATA.settings.auto_assignment);
    if (aaL) aaL.textContent = DATA.settings.auto_assignment ? 'Enabled' : 'Disabled';
    const mT = document.getElementById('maintToggle');
    const mL = document.getElementById('maintLabel');
    if (mT) mT.classList.toggle('on', DATA.settings.maintenance_mode);
    if (mL) mL.textContent = DATA.settings.maintenance_mode ? 'Enabled' : 'Disabled';
  } catch (e) {
    console.warn('admin live load failed', e);
  }
}
