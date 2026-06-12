/* ============================================================
   ABOUT PAGE — JAVASCRIPT
============================================================ */
'use strict';

/* ============================================================
   NAVBAR SCROLL & HAMBURGER
============================================================ */
(function initNavbar() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }, { passive: true });

  // Initial state — page might not start at top
  if (window.scrollY > 50) nav.classList.add('nav-scrolled');

  // Hamburger toggle
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
})();

function closeMobileMenu() {
  document.getElementById('nav-hamburger').classList.remove('open');
  document.getElementById('nav-mobile-menu').classList.remove('open');
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Trigger counters when platform stats come into view
        if (entry.target.querySelector('[data-target]')) {
          triggerCounters(entry.target);
        }
        // Trigger progress bars
        if (entry.target.id === 'resolution-bar' || entry.target.closest('.stat-card-body')) {
          triggerProgressBars();
        }
        // Trigger category stat bars
        if (entry.target.classList.contains('map-left') || entry.target.closest('.map-left')) {
          triggerCatBars();
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   ANIMATED COUNTERS
============================================================ */
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const update = () => {
    current += step;
    if (current < target) {
      if (target >= 1000) {
        el.textContent = (current / 1000).toFixed(1) + 'k+';
      } else {
        el.textContent = Math.ceil(current) + suffix;
      }
      requestAnimationFrame(update);
    } else {
      if (target === 12500) el.textContent = '12.5k+';
      else if (target === 8200) el.textContent = '8.2k+';
      else el.textContent = target + suffix;
    }
  };
  update();
}

let countersTriggered = false;
function triggerCounters(container) {
  if (countersTriggered) return;
  countersTriggered = true;
  container.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    animateCounter(el, target);
  });
  // Also trigger the progress bars
  setTimeout(triggerProgressBars, 300);
}

/* ============================================================
   PROGRESS BARS
============================================================ */
let barsTriggered = false;
function triggerProgressBars() {
  if (barsTriggered) return;
  barsTriggered = true;
  const resBar = document.getElementById('resolution-bar');
  const satBar = document.getElementById('satisfaction-bar');
  if (resBar) setTimeout(() => { resBar.style.width = '65.6%'; }, 200);
  if (satBar) setTimeout(() => { satBar.style.width = '94%'; }, 400);
}

/* ============================================================
   CATEGORY STATS
============================================================ */
const categoryData = [
  { name: 'Infrastructure', count: 3240, color: '#1976D2', icon: 'construction', cls: 'cat-infra' },
  { name: 'Water Service', count: 2180, color: '#0097A7', icon: 'water_drop', cls: 'cat-water' },
  { name: 'Electricity', count: 1920, color: '#F57F17', icon: 'electric_bolt', cls: 'cat-elec' },
  { name: 'Waste Management', count: 1640, color: '#2E7D32', icon: 'delete_sweep', cls: 'cat-waste' },
  { name: 'Traffic & Transit', count: 1380, color: '#7B1FA2', icon: 'traffic', cls: 'cat-traffic' },
  { name: 'Environment', count: 980, color: '#00695C', icon: 'eco', cls: 'cat-env' },
  { name: 'Public Services', count: 760, color: '#E65100', icon: 'local_police', cls: 'cat-public' },
  { name: 'Others', count: 400, color: '#6B7280', icon: 'more_horiz', cls: 'cat-other' },
];

const maxCount = Math.max(...categoryData.map(c => c.count));

async function loadAboutLiveData() {
  if (!window.API) return;
  try {
    const [stats, depts] = await Promise.all([
      window.API.overviewStats(),
      window.API.departmentStats(),
    ]);
    const pub = stats.data.public || {};
    // Update counters' data-target attributes so the IntersectionObserver picks them up
    const map = {
      'stat-total':       pub.total_complaints || 0,
      'stat-resolved':    pub.resolved || 0,
      'stat-citizens':    pub.citizens_count || 0,
      'stat-departments': pub.departments_count || 0,
    };
    document.querySelectorAll('[data-target]').forEach(el => {
      const key = el.id;
      if (map[key] !== undefined) el.setAttribute('data-target', map[key]);
    });
    // Resolution / satisfaction bars
    const resBar = document.getElementById('resolution-bar');
    const satBar = document.getElementById('satisfaction-bar');
    if (resBar) resBar.dataset.target = (pub.resolution_rate || 0) + '%';
    if (satBar) satBar.dataset.target = '94%';

    // Department list
    if (depts && depts.data && depts.data.departments) {
      const ICON_MAP = {
        infrastructure:'construction', water_service:'water_drop', electricity:'electric_bolt',
        waste_management:'delete_sweep', traffic_transport:'traffic', environment:'eco',
        public_services:'local_police', others:'more_horiz'
      };
      const COLOR_MAP = {
        infrastructure:'#1976D2', water_service:'#0097A7', electricity:'#F57F17',
        waste_management:'#2E7D32', traffic_transport:'#7B1FA2', environment:'#00695C',
        public_services:'#E65100', others:'#6B7280'
      };
      categoryData.length = 0;
      depts.data.departments.forEach(d => {
        categoryData.push({
          name: d.name.replace(/ Department$/, ''),
          count: d.total || 0,
          color: COLOR_MAP[d.category_key] || '#6B7280',
          icon:  ICON_MAP[d.category_key] || 'category',
          cls:   'cat-' + (d.category_key || 'other').slice(0,5),
        });
      });
      renderCategoryStats();
    }
  } catch (e) {
    console.warn('Failed to load about live data:', e);
  }
}

function renderCategoryStats() {
  const list = document.getElementById('category-stats-list');
  if (!list) return;
  const max = Math.max(1, ...categoryData.map(c => c.count));
  list.innerHTML = categoryData.map((cat, i) => `
    <div class="cat-stat-row reveal" style="transition-delay:${i * 60}ms">
      <div class="cat-stat-icon ${cat.cls}">
        <span class="material-symbols-outlined">${cat.icon}</span>
      </div>
      <div class="cat-stat-info">
        <div class="cat-stat-name">${cat.name}</div>
        <div class="cat-stat-bar-wrap">
          <div class="cat-stat-bar" 
               id="cat-bar-${i}" 
               style="background:${cat.color}; width:0"></div>
        </div>
      </div>
      <div class="cat-stat-count">${cat.count.toLocaleString()}</div>
    </div>
  `).join('');

  // Re-observe new elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  list.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

let catBarsTriggered = false;
function triggerCatBars() {
  if (catBarsTriggered) return;
  catBarsTriggered = true;
  categoryData.forEach((cat, i) => {
    const bar = document.getElementById(`cat-bar-${i}`);
    if (bar) {
      const pct = (cat.count / maxCount) * 100;
      setTimeout(() => { bar.style.width = pct + '%'; }, i * 80);
    }
  });
}

// Observe map-left for cat bars trigger
(function observeMapLeft() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) triggerCatBars();
    });
  }, { threshold: 0.2 });
  const mapLeft = document.querySelector('.map-left');
  if (mapLeft) observer.observe(mapLeft);
})();

/* ============================================================
   BANGLADESH MAP — MARKERS
============================================================ */
const districtMarkers = [
  {
    city: 'Dhaka', x: '48%', y: '49%', priority: 'critical',
    data: { Infrastructure: 845, Water: 623, Electricity: 412, Others: 284 }, total: 2164
  },
  {
    city: 'Chattogram', x: '69%', y: '82%', priority: 'high',
    data: { Infrastructure: 524, Water: 318, Electricity: 267, Others: 142 }, total: 1251
  },
  {
    city: 'Sylhet', x: '70%', y: '22%', priority: 'medium',
    data: { Infrastructure: 213, Water: 147, Electricity: 98, Others: 67 }, total: 525
  },
  {
    city: 'Khulna', x: '34.5%', y: '71%', priority: 'high',
    data: { Infrastructure: 312, Water: 198, Electricity: 134, Others: 89 }, total: 733
  },
  {
    city: 'Rajshahi', x: '21%', y: '35%', priority: 'medium',
    data: { Infrastructure: 245, Water: 163, Electricity: 118, Others: 54 }, total: 580
  },
  {
    city: 'Barishal', x: '47.5%', y: '74%', priority: 'medium',
    data: { Infrastructure: 187, Water: 134, Electricity: 76, Others: 43 }, total: 440
  },
  {
    city: 'Rangpur', x: '30%', y: '3%', priority: 'low',
    data: { Infrastructure: 156, Water: 98, Electricity: 67, Others: 35 }, total: 356
  },
  {
    city: 'Mymensingh', x: '48%', y: '26%', priority: 'medium',
    data: { Infrastructure: 198, Water: 112, Electricity: 89, Others: 51 }, total: 450
  },
];

const priorityColors = {
  critical: 'var(--priority-critical)',
  high: 'var(--priority-high)',
  medium: 'var(--priority-medium)',
  low: 'var(--priority-low)'
};

function renderMapMarkers() {
  const layer = document.getElementById('map-markers-layer');
  const tooltip = document.getElementById('map-tooltip');
  if (!layer) return;

  layer.innerHTML = districtMarkers.map((m, i) => `
    <div class="district-marker marker-${m.priority}" 
         style="left:${m.x}; top:${m.y}"
         data-index="${i}"
         data-city="${m.city}">
      <div class="marker-dot"></div>
      <div class="marker-label">${m.city}</div>
    </div>
  `).join('');

  // Hover events for tooltip
  layer.querySelectorAll('.district-marker').forEach(marker => {
    marker.addEventListener('mouseenter', (e) => {
      const idx = parseInt(marker.dataset.index);
      const data = districtMarkers[idx];
      showMapTooltip(marker, data);
    });
    marker.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

function showMapTooltip(markerEl, data) {
  const tooltip = document.getElementById('map-tooltip');
  const ttCity = document.getElementById('tt-city-name');
  const ttRows = document.getElementById('tt-rows');
  const ttTotal = document.getElementById('tt-total');

  ttCity.textContent = data.city;
  ttTotal.textContent = data.total.toLocaleString();

  const colorMap = {
    Infrastructure: '#1976D2',
    Water: '#0097A7',
    Electricity: '#F57F17',
    Others: '#6B7280'
  };

  ttRows.innerHTML = Object.entries(data.data).map(([key, val]) => `
    <div class="tooltip-row">
      <div class="tooltip-row-label">
        <div class="dot" style="background:${colorMap[key] || '#6B7280'}"></div>
        ${key}
      </div>
      <span class="tooltip-row-val">${val}</span>
    </div>
  `).join('');

  // Position tooltip
  const wrap = document.getElementById('bd-map-wrap');
  const wrapRect = wrap.getBoundingClientRect();
  const markerRect = markerEl.getBoundingClientRect();

  let left = markerRect.left - wrapRect.left + 20;
  let top = markerRect.top - wrapRect.top - 10;

  // Boundary checks
  if (left + 230 > wrapRect.width) left = markerRect.left - wrapRect.left - 230;
  if (top + 160 > wrapRect.height) top = markerRect.top - wrapRect.top - 160;
  if (top < 0) top = 10;

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
  tooltip.classList.add('visible');
}

/* ============================================================
   FAQ ACCORDION
============================================================ */
const faqData = [
  {
    q: 'Who can use ComplaintBox?',
    a: 'ComplaintBox is designed for all Bangladeshi citizens. To submit a complaint, you need to create a verified account using your National ID card (NID). Viewing public complaints on the Recent Complaints page does not require an account.'
  },
  {
    q: 'How do I submit a complaint?',
    a: 'After registering and completing NID verification, navigate to your Citizen Dashboard and click "New Complaint". Fill in the category, location (with GPS pin), description, and priority level. You can also upload supporting photos and videos. Your complaint will be reviewed by an admin before going public.'
  },
  {
    q: 'How long does it take to resolve a complaint?',
    a: 'Resolution times vary depending on the nature and priority of the complaint. Critical and high-priority complaints are typically escalated faster. On average, our platform maintains a 45-minute first-response time from the relevant department, though full resolution can take days to weeks for complex infrastructure issues.'
  },
  {
    q: 'Can I track the status of my complaint?',
    a: 'Yes. Every complaint goes through a 7-stage pipeline: Submitted → Pending → In Review → Assigned → In Progress → Resolved (or Rejected). You can track the exact stage of your complaint in real time from your Citizen Dashboard, along with timestamps, department notes, and notifications.'
  },
  {
    q: 'What happens after a complaint is resolved?',
    a: 'When a department marks a complaint as resolved, they are required to upload proof-of-resolution images or videos. You will receive a notification and can then rate the quality of resolution from 1–5 stars. Your feedback helps improve department performance metrics.'
  },
  {
    q: 'Why was my complaint rejected?',
    a: 'Complaints can be rejected if they are duplicates of existing complaints, contain inappropriate content, are outside the platform\'s jurisdiction, or cannot be verified. If rejected, you will receive a notification explaining the reason, along with a reference ID if it\'s a duplicate.'
  },
  {
    q: 'Can I edit or delete my complaint after submitting?',
    a: 'You can edit your complaint only if it is still in the "Submitted" or "Pending" stage and has not yet been reviewed. Once a complaint moves to "In Review" or beyond, it can no longer be edited. You can request deletion from your dashboard at any stage, which will soft-delete the complaint from public view.'
  },
  {
    q: 'Is my personal information visible to others?',
    a: 'No. Your personal information (name, phone number, NID) is strictly private and visible only to the admin. Department staff can only see the complaint content, location, and media — never your personal identity. Public users can see complaint details but not who submitted them.'
  },
  {
    q: 'How does the auto-assignment system work?',
    a: 'When you submit a complaint and select a category (e.g., "Water Service"), our system automatically identifies the relevant department and assigns the complaint to them. This speeds up the process significantly. Admins can always override or reassign complaints manually if needed.'
  },
  {
    q: 'How can I contact support if I face an issue with the platform?',
    a: 'You can reach our support team via the helpline at 16123, by email at support@complaintbox.gov.bd, or through the Contact page on this website. Our support team is available Sunday through Thursday, 9:00 AM to 5:00 PM.'
  }
];

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = faqData.map((item, i) => `
    <div class="faq-item reveal" style="transition-delay:${i * 50}ms" data-index="${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span class="faq-q-text">${item.q}</span>
        <span class="material-symbols-outlined faq-chevron">expand_more</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region">
        <div class="faq-answer-inner">${item.a}</div>
      </div>
    </div>
  `).join('');

  // Re-observe for reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.05 });
  list.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Accordion behavior
  list.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ============================================================
   CTA BUTTONS
============================================================ */
function initCTAButtons() {
  const reportBtn = document.getElementById('cta-report-btn');
  const faqBtn = document.getElementById('cta-faq-btn');

  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      // Check session
      const session = getSession();
      if (session && session.role === 'citizen') {
        window.location.href = 'citizen-dashboard.html';
      } else {
        window.AuthModal ? window.AuthModal.open('signin') : openFallbackModal();
      }
    });
  }

  if (faqBtn) {
    faqBtn.addEventListener('click', () => {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* ============================================================
   SESSION HELPER
============================================================ */
function getSession() {
  try { return JSON.parse(localStorage.getItem('cb_user')); }
  catch { return null; }
}

function openFallbackModal() {
  // Graceful fallback if AuthModal not loaded
  console.log('Auth modal not available — include modals.js');
}

/* ============================================================
   NAVBAR AUTH STATE
============================================================ */
function updateNavAuthState() {
  const session = getSession();
  const signinBtn = document.getElementById('nav-signin-btn');
  if (!signinBtn || !session) return;

  const initials = session.fullName
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  signinBtn.outerHTML = `
    <div style="position:relative" id="nav-user-wrap">
      <button id="nav-avatar-btn" style="
        display:flex; align-items:center; gap:8px;
        background:var(--primary-container); color:white;
        border:none; border-radius:9999px; padding:8px 16px 8px 8px;
        cursor:pointer; font-family:'Inter',sans-serif; font-weight:600;
        font-size:14px; transition:all 0.2s;
      ">
        <span style="
          width:28px; height:28px; border-radius:50%;
          background:var(--primary-fixed); color:var(--primary);
          display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:11px;
        ">${initials}</span>
        ${session.fullName.split(' ')[0]}
        <span class="material-symbols-outlined" style="font-size:16px">expand_more</span>
      </button>
      <div id="nav-dropdown" style="
        display:none; position:absolute; right:0; top:calc(100% + 8px);
        background:white; border-radius:16px; padding:8px;
        box-shadow:0 20px 40px rgba(0,0,0,0.15);
        border:1px solid var(--outline-variant); min-width:180px; z-index:100;
      ">
        <a href="${session.role === 'admin' ? 'admin-dashboard.html' : session.role === 'staff' ? 'staff-dashboard.html' : 'citizen-dashboard.html'}"
          style="display:flex; align-items:center; gap:10px; padding:10px 14px;
            border-radius:10px; color:var(--on-surface); text-decoration:none;
            font-family:'Inter',sans-serif; font-size:14px; font-weight:500; transition:background 0.2s;"
          onmouseover="this.style.background='var(--surface-container)'"
          onmouseout="this.style.background='transparent'">
          <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">dashboard</span>
          My Dashboard
        </a>
        <button id="nav-signout-btn" style="
          width:100%; display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:10px; border:none; background:transparent;
          color:var(--error); cursor:pointer; font-family:'Inter',sans-serif;
          font-size:14px; font-weight:500; transition:background 0.2s;"
          onmouseover="this.style.background='#fff5f5'"
          onmouseout="this.style.background='transparent'">
          <span class="material-symbols-outlined" style="font-size:18px">logout</span>
          Sign Out
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const avatarBtn = document.getElementById('nav-avatar-btn');
    const dropdown = document.getElementById('nav-dropdown');
    const signoutBtn = document.getElementById('nav-signout-btn');

    avatarBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => {
      if (dropdown) dropdown.style.display = 'none';
    });
    signoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('cb_user');
      window.location.href = 'index.html';
    });
  }, 50);
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCategoryStats();
  loadAboutLiveData();
  renderMapMarkers();
  renderFAQ();
  initCTAButtons();
  updateNavAuthState();

  // Observe platform stat card for counters + bars
  const platformSection = document.querySelector('.about-platform');
  if (platformSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger counters
          const statEls = platformSection.querySelectorAll('[data-target]');
          statEls.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCounter(el, target);
          });
          triggerProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(platformSection);
  }
});
