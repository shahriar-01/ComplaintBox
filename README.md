<div align="center">

# 📦 ComplaintBox

### A Bangladesh-Based Citizen Complaint Management System

A full-stack web platform where **citizens** can report city issues — roads, garbage, drainage, water supply, electricity, traffic, environment, and public services — and **government authorities** can track, manage, and resolve them efficiently.

**Team:** Lemon Tea &nbsp;|&nbsp; **Type:** DBMS Lab Project

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
- [User Roles](#-user-roles)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Demo Login Credentials](#-demo-login-credentials)
- [Pages Overview](#-pages-overview)
- [Limitations](#-limitations)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 📖 About the Project

**ComplaintBox** is a citizen-facing civic issue reporting platform tailored specifically for **Bangladesh**. It is built around Bangladesh's real administrative geography — **64 Districts**, their **Ashon (constituency) Numbers**, and local **Areas** — so every complaint can be precisely located and routed to the correct government department.

The platform connects three types of users:

- 🧑‍💼 **Citizens** — report issues, track progress, upvote/comment on public complaints, and rate resolutions.
- 🏢 **Department Staff** — manage and resolve complaints assigned to their department.
- 🛠️ **Admins** — oversee the entire system, approve complaints, manage users/staff/departments, and view analytics.

A complaint goes through a clear lifecycle:

```
submitted → pending → in_review → assigned → in_progress → resolved
                                                      ↘ rejected
```

Every status change is recorded in a full audit trail, and resolved complaints require **photo/video proof** uploaded by staff before being marked complete.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (no frameworks) |
| **Backend** | PHP 8+ (plain PHP — no Laravel/Symfony) |
| **Database** | MySQL 8+ (InnoDB engine, UTF8MB4 charset) |
| **Server** | Apache (XAMPP / WAMP / standard LAMP stack) |
| **API Style** | Plain PHP files returning JSON |
| **Auth** | PHP native sessions + BCrypt (`password_hash` / `password_verify`) |
| **File Uploads** | PHP `move_uploaded_file()` |
| **Maps** | Google Maps JavaScript API + Places Autocomplete + Embed API |
| **Icons** | Material Symbols Outlined (Google) |
| **Fonts** | Plus Jakarta Sans (headings), Inter (body/UI) |

> ⚠️ No external CSS frameworks (no Bootstrap/Tailwind). All layouts use hand-written CSS Grid & Flexbox.

---

## 🎨 Design System

A light, green-dominant theme with red accents for alerts, designed to feel clean, modern, and "civic-tech" rather than generic.

| Token | Color | Usage |
|---|---|---|
| `--primary` | `#006A4E` | Brand green — buttons, links, accents |
| `--secondary` | `#F42A41` | Red — alerts, urgent actions |
| `--tertiary` | `#2D4739` | Deep green-gray — gradients |
| `--surface` | `#F5F5F0` | Page background |
| `--on-surface` | `#1A1C19` | Primary text |

**Status colors:** Submitted (gray), Pending (amber), In Review (blue), Assigned (purple), In Progress (orange), Resolved (green), Rejected (red).

**Priority colors:** Low (gray), Medium (blue), High (orange), Critical (red).

**UI principles:**
- Light theme throughout, mobile-first responsive design
- Pill-shaped buttons (`border-radius: 9999px`), rounded cards (16–24px), rounded modals (24px)
- Glassmorphism navbar & modals, smooth `cubic-bezier(0.22, 1, 0.36, 1)` transitions
- Hover lift animations, scroll-reveal effects, animated counters, pulsing map markers
- Material Symbols Outlined icons only — **no emoji in the UI**
- All UI text in English (no Bangla text in the interface itself)

---

## 👥 User Roles

| Role | Access | Dashboard |
|---|---|---|
| **Citizen** | Register, submit complaints, track status, comment, upvote, rate resolutions | `citizen-dashboard.php` |
| **Department Staff** | Manage assigned complaints, update status, upload resolution proof | `staff-dashboard.php` |
| **Admin** | Full system control — users, staff, departments, complaints, reports, settings | `admin-dashboard.php` |

A single unified login endpoint authenticates all three roles and redirects to the correct dashboard based on role.

---

## ✨ Features

### 🌐 Public Pages
- **Landing Page** — animated hero with live stats, "How It Works" steps, category showcase, featured testimonials
- **Recent Complaints** — public feed of approved complaints with full filtering (category, priority, status, district, ashon, date, search), upvotes, and detail modal with media gallery + map
- **About Page** — platform mission, animated stats, interactive Bangladesh map with priority-colored markers, FAQ accordion, core values
- **Contact Page** — department directory (all 8 departments), support info, 5-star feedback form

### 🔐 Authentication
- Combined Sign In / Register modal with tab switcher
- Demo autofill buttons (Citizen / Admin / Staff)
- Phone validation (Bangladeshi format `01XXXXXXXXX`), strong password rules
- NID upload (front & back) for citizen profile verification
- BCrypt password hashing, server-side session auth
- Ban detection on login with a clear suspension message

### 🧑‍💼 Citizen Dashboard
- **Overview** — personalized greeting, 5 stat cards (Total / In Progress / Pending / Resolved / Rejected), recent activity feed, trending complaints
- **New Complaint (3-step modal)**
  1. **Details** — multi-category selection, cascading District → Ashon → Area dropdowns, subject/description with character counters, priority selector
  2. **Media & Location** — drag-and-drop image/video upload (max 10 files), interactive Google Maps pin (click-to-pin + search)
  3. **Preview & Submit** — live preview card, generates `CB-YYYY-NNNNN` ID, auto-assigns department if enabled
- **My Complaints** — horizontal cards with a **6-stage vertical progress tracker**, full filter bar, rejection reason popup with link to similar complaint, edit/delete pending complaints, star-rate resolved complaints
- **My Comments** — view, edit, and soft-delete own comments
- **Notifications** — read/unread states, "Mark All as Read"
- **Profile Settings** — avatar, personal info, NID upload, password change, report-an-issue modal
- **Profile verification gate** — unverified users are blocked from submitting complaints until admin approval

### 🏢 Department Staff Dashboard
- **Overview** — department-specific complaint stats
- **All Complaints** — complaints filtered to the staff's own department, with filters and detail view
- **Assigned Staff** — table of department staff, complaint assignment / reassignment / removal
- **Update Status** — searchable complaint selector, status dropdown, **mandatory proof upload when marking Resolved**, notes visible to the citizen, automatic status history + notification
- **Activity Log** — chronological logs with "Reports to Admin" filter
- **Messages from Admin** — admin replies to staff reports
- **Report Modal** — report fake complaints, technical issues, or request a new staff member

### 🛠️ Admin Dashboard
- **Overview** — 7 stat cards, animated monthly volume bar chart, status-distribution donut chart, recent complaints table, department performance table with progress bars
- **All Complaints** — full table with multi-filter, inline editing with confirmation modal, approve/reject (with reason + duplicate reference), assign/reassign department, soft delete, **CSV export**
- **User Management** — view/edit citizens, verify profiles, ban/unban, soft delete
- **Staff Management** — create/edit/delete staff accounts, assign complaints
- **Department Management** — view/edit the 8 departments
- **Feedback Messages** — view feedback, toggle `is_featured` (controls homepage testimonials)
- **All Reports** — view & reply to citizen/staff reports
- **Recent Activity** — system-wide audit log
- **Settings** — toggle auto-assignment, maintenance mode, site name, support email

---

## 🗂 Project Structure

```
complaintbox/
│
├── index.php                  → Landing Page
├── recent-complaints.php      → Recent Complaints Page
├── about.php                  → About Page
├── contact.php                → Contact Page
├── citizen-dashboard.php      → Citizen Dashboard
├── staff-dashboard.php        → Department Staff Dashboard
├── admin-dashboard.php        → Admin Dashboard
│
├── css/
│   ├── global.css             → CSS variables, reset, typography, utilities
│   ├── navbar.css             → Shared navbar styles
│   ├── footer.css             → Shared footer styles
│   ├── modals.css             → All modal styles
│   ├── cards.css              → Shared complaint card styles
│   └── [page-name].css        → Page-specific styles
│
├── js/
│   ├── global.js              → Auth state, session, shared utilities
│   ├── data.js                → Mock data (districts, ashons, areas, etc.)
│   ├── auth.js                → Login / register / signout logic
│   ├── modal-auth.js          → Auth modal logic
│   └── [page-name].js         → Page-specific logic
│
├── api/                        → All backend endpoints (return JSON)
│   ├── auth/                  → login, register, logout, session
│   ├── complaints/            → CRUD, approve/reject, assign, status update
│   ├── comments/               → add, edit, delete, fetch
│   ├── upvotes/                → toggle-upvote
│   ├── ratings/                → submit-rating
│   ├── notifications/          → get, mark-read, mark-all-read
│   ├── users/                  → CRUD, ban, verify, profile update
│   ├── staff/                  → CRUD, assign, reassign, remove
│   ├── departments/             → CRUD
│   ├── districts/               → districts, ashons, areas
│   ├── reports/                 → get, submit, reply
│   ├── feedback/                → CRUD, feature toggle
│   ├── activity/                → activity log
│   ├── stats/                   → overview & department stats
│   └── settings/                → get/update site settings
│
├── includes/                   → Shared backend helpers
│   ├── db.php                  → PDO database connection
│   ├── auth-check.php          → Session validation
│   ├── response.php            → JSON response helpers
│   ├── upload.php               → File upload handler
│   └── uid-generator.php        → Generates CB-USR-, CB-STF-, CB-YYYY- IDs
│
├── uploads/                     → User-uploaded files
│   ├── complaints/               → Complaint media
│   ├── proofs/                   → Staff resolution proof
│   ├── nid/                      → Citizen NID images
│   ├── profiles/                 → Profile pictures
│   └── reports/                  → Report attachments
│
└── database/
    └── complaintbox.sql          → Full MySQL schema + seed data
```

---

## 🗄 Database Schema

The database has **19 tables**, normalized up to **BCNF**, with full referential integrity and an extensive indexing strategy.

### Core Tables

| Table | Purpose |
|---|---|
| `districts` | All 64 Bangladesh districts |
| `ashon_numbers` | Constituencies (e.g. "Dhaka-09"), linked to a district |
| `areas` | Local neighborhoods (e.g. "Khilgaon"), linked to an ashon |
| `departments` | The 8 government departments handling complaint categories |
| `users` | Citizen & admin accounts |
| `department_staff` | Staff accounts, linked to a department |
| `complaints` | Central table — every reported issue |
| `complaint_categories` | Many-to-many: a complaint can belong to multiple categories |
| `complaint_media` | Images/videos attached to complaints (citizen or staff-uploaded proof) |
| `complaint_status_history` | Full audit trail of status changes |
| `complaint_assignments` | Links complaints to assigned staff members |
| `upvotes` | Citizen upvotes on complaints (one per user per complaint) |
| `comments` | Citizen discussion threads on complaints |
| `complaint_ratings` | 1–5 star rating on resolved complaints (one per complaint) |
| `notifications` | In-app notifications for citizens & staff |
| `reports` | Citizen/staff reports (fake complaints, technical issues, staff requests) |
| `feedback_messages` | Homepage testimonials, toggled via `is_featured` |
| `activity_log` | System-wide audit log of all significant actions |
| `site_settings` | Key-value config (maintenance mode, auto-assignment, etc.) |

### Complaint ID Format

| ID Type | Format | Example |
|---|---|---|
| Citizen | `CB-USR-XXXXXX` | `CB-USR-A7F3K2` |
| Staff | `CB-STF-XXXXXX` | `CB-STF-INFRA1` |
| Complaint | `CB-YYYY-NNNNN` | `CB-2025-00042` |

### Complaint Categories (8)

`infrastructure` · `water_service` · `electricity` · `waste_management` · `traffic_transport` · `environment` · `public_services` · `others`

### Key Design Notes

- **Normalized to BCNF**: `upvotes` enforces `UNIQUE(complaint_id, user_id)`; `complaint_ratings` enforces `UNIQUE(complaint_id)`.
- **Geographic hierarchy**: `districts → ashon_numbers → areas`, referenced via foreign keys (never stored as raw text).
- **Soft deletes**: `is_deleted` flags preserve history across `users`, `complaints`, `staff`, `comments`, and `feedback_messages`.
- **Composite indexes** on the most common multi-column filters:
  - `complaints(district_id, status)`
  - `complaints(status, priority)`
  - `complaints(approval_status, is_deleted)`
  - `complaint_categories(complaint_id, category)`
  - `notifications(recipient_type, recipient_id, is_read)`
  - `activity_log(actor_type, created_at)`

### Seed Data Included

- All 64 districts with their ashon numbers and areas
- 8 departments (one per category)
- 1 admin account, 8 staff accounts (one per department), 5 demo citizens
- 20+ demo complaints across all statuses, priorities, and categories
- Demo comments, upvotes, notifications, feedback, reports, and activity logs

---

## 🔌 API Endpoints

All endpoints live under `/api/` and return JSON. Methods use PDO **prepared statements** exclusively to prevent SQL injection.

| Group | Endpoint | Method | Description |
|---|---|---|---|
| **Auth** | `auth/login.php` | POST | Login (citizen/admin/staff), starts session |
| | `auth/register.php` | POST | Register a new citizen |
| | `auth/logout.php` | POST | Destroy session |
| | `auth/session.php` | GET | Get current session user |
| **Complaints** | `complaints/get-complaints.php` | GET | List complaints (with filters) |
| | `complaints/get-complaint.php` | GET | Single complaint detail |
| | `complaints/create-complaint.php` | POST | Submit new complaint (with media) |
| | `complaints/update-complaint.php` | POST | Edit own complaint (if pending) |
| | `complaints/delete-complaint.php` | POST | Soft delete |
| | `complaints/approve-complaint.php` | POST | Admin: approve |
| | `complaints/reject-complaint.php` | POST | Admin: reject (with reason) |
| | `complaints/assign-department.php` | POST | Admin: assign/reassign department |
| | `complaints/update-status.php` | POST | Staff: update status (+ proof upload) |
| **Comments** | `comments/get-comments.php` | GET | Fetch comments for a complaint |
| | `comments/add-comment.php` | POST | Add a comment |
| | `comments/edit-comment.php` | POST | Edit own comment |
| | `comments/delete-comment.php` | POST | Soft delete own comment |
| **Upvotes** | `upvotes/toggle-upvote.php` | POST | Toggle upvote |
| **Ratings** | `ratings/submit-rating.php` | POST | Rate a resolved complaint |
| **Notifications** | `notifications/get-notifications.php` | GET | Fetch notifications |
| | `notifications/mark-read.php` | POST | Mark one as read |
| | `notifications/mark-all-read.php` | POST | Mark all as read |
| **Users** | `users/get-users.php` | GET | Admin: list citizens |
| | `users/get-user.php` | GET | Admin: single user |
| | `users/update-user.php` | POST | Admin: edit user |
| | `users/delete-user.php` | POST | Admin: soft delete user |
| | `users/ban-user.php` | POST | Admin: ban/unban |
| | `users/verify-user.php` | POST | Admin: verify profile |
| | `users/update-profile.php` | POST | Citizen: update own profile |
| **Staff** | `staff/get-staff.php` | GET | List department staff |
| | `staff/get-staff-member.php` | GET | Single staff member |
| | `staff/create-staff.php` | POST | Admin: create staff |
| | `staff/update-staff.php` | POST | Update staff info |
| | `staff/delete-staff.php` | POST | Admin: soft delete |
| | `staff/assign-complaint.php` | POST | Assign complaint to staff |
| | `staff/reassign-complaint.php` | POST | Reassign |
| | `staff/remove-assignment.php` | POST | Remove assignment |
| **Departments** | `departments/get-departments.php` | GET | List departments |
| | `departments/get-department.php` | GET | Single department + stats |
| | `departments/create-department.php` | POST | Admin: add department |
| | `departments/update-department.php` | POST | Admin: edit department |
| **Districts** | `districts/get-districts.php` | GET | All 64 districts |
| | `districts/get-ashons.php` | GET | Ashons by district |
| | `districts/get-areas.php` | GET | Areas by ashon |
| **Reports** | `reports/get-reports.php` | GET | Admin: list reports |
| | `reports/submit-report.php` | POST | Submit a report |
| | `reports/reply-report.php` | POST | Admin: reply |
| **Feedback** | `feedback/get-feedback.php` | GET | List feedback |
| | `feedback/submit-feedback.php` | POST | Submit feedback |
| | `feedback/feature-feedback.php` | POST | Admin: toggle featured |
| | `feedback/edit-feedback.php` | POST | Admin: edit |
| | `feedback/delete-feedback.php` | POST | Admin: soft delete |
| **Activity** | `activity/get-activity.php` | GET | Activity log |
| **Stats** | `stats/get-overview-stats.php` | GET | Dashboard stats |
| | `stats/get-department-stats.php` | GET | Department performance |
| **Settings** | `settings/get-settings.php` | GET | Site settings |
| | `settings/update-settings.php` | POST | Admin: update settings |

---

## 🚀 Getting Started

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) or WAMP (Apache + MySQL + PHP 8+)
- A modern web browser
- (Optional) A Google Maps API key for the interactive map features

### Installation

1. **Install XAMPP** and start the **Apache** and **MySQL** modules.

2. **Copy the project** into your server's web root:
   ```
   Windows:    C:/xampp/htdocs/complaintbox/
   Mac/Linux:  /opt/lampp/htdocs/complaintbox/
   ```

3. **Create the database**
   - Open `http://localhost/phpmyadmin`
   - Click **New** → name the database `complaintbox` → **Create**
   - Click **Import** → select `database/complaintbox.sql` → **Go**
   - All tables and seed data will be created automatically.

4. **Configure the database connection**
   Open `includes/db.php` and confirm the credentials match your setup (defaults shown):
   ```php
   $host    = 'localhost';
   $dbname  = 'complaintbox';
   $db_user = 'root';
   $db_pass = '';
   ```

5. **Set uploads folder permissions** (Mac/Linux only)
   ```bash
   chmod -R 755 uploads/
   ```

6. **(Optional) Add your Google Maps API key**
   Find the placeholder in the relevant JS files:
   ```js
   const GMAPS_API_KEY = 'YOUR_API_KEY';
   ```

7. **Open the app**
   ```
   http://localhost/complaintbox/index.php
   ```
   Use the demo login buttons to explore all three roles.

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Redirects To |
|---|---|---|---|
| **Citizen** | `citizen@demo.complaintbox.bd` | `Demo@1234` | `citizen-dashboard.php` |
| **Admin** | `admin@complaintbox.gov.bd` | `Admin@1234` | `admin-dashboard.php` |
| **Staff** | `staff@infra.complaintbox.bd` | `Staff@1234` | `staff-dashboard.php` |

> The "Demo Login" buttons in the Sign In modal auto-fill these credentials for quick testing.

---

## 🖥 Pages Overview

| # | Page | File | Description |
|---|---|---|---|
| 1 | Landing Page | `index.php` | Hero, stats, how it works, testimonials |
| 2 | Recent Complaints | `recent-complaints.php` | Public, filterable complaint feed |
| 3 | About | `about.php` | Mission, interactive map, FAQ |
| 4 | Contact | `contact.php` | Department directory + feedback form |
| 5 | Citizen Dashboard | `citizen-dashboard.php` | Submit & track complaints |
| 6 | Staff Dashboard | `staff-dashboard.php` | Manage department complaints |
| 7 | Admin Dashboard | `admin-dashboard.php` | Full system administration |

---

## ⚠️ Limitations

- No real-time push notifications (polling-based only)
- No email/SMS alerts for complaint status changes
- Local filesystem storage for uploads (not cloud-based)
- Search uses basic `LIKE` queries, not full-text search
- English-only UI (no Bangla translation)
- Web-only — no native mobile app
- No automated duplicate-complaint detection

---

## 🔮 Future Improvements

- Real-time notifications via WebSocket/SSE
- SMS & email notification gateway integration
- Cloud storage (e.g. AWS S3) for uploaded media
- MySQL full-text search on complaint subject/description
- Bangla language support (i18n)
- Native Android/iOS app
- AI-based duplicate complaint detection
- GIS heat-map analytics for district-level reporting
- Public REST API for third-party/NGO integration

---

## 📄 License

This project was developed as part of a **DBMS Lab academic project** by **Team Lemon Tea**.
