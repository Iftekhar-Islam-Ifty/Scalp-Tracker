/* ============================================================
   IFTEKHAR'S SCALP TREATMENT TRACKER — script.js
   Prescription: Dr. Sabrina Shahrin, 10 June 2026
   Diagnosis: Scalp Psoriasis
   Start Date: 11 June 2026
   ============================================================ */

'use strict';

// ── CONSTANTS ──────────────────────────────────────────────
// const START_DATE = new Date('2026-06-11');
// const FOLLOW_UP = new Date('2026-08-11');
// নতুন আপডেটেড কোড (এটি দিয়ে রিপ্লেস করুন):
const START_DATE = new Date(2026, 5, 11);  // জাভাস্ক্রিপ্টে মাস ০ থেকে শুরু হয় (৫ = June)
const FOLLOW_UP  = new Date(2026, 7, 11);  // 7 = August
const TOTAL_DAYS = 61; // 2 months

// Phase breakdown for Prosalic
// const PHASE1_END = new Date('2026-06-25'); // 15 days, 2x/day
// const PHASE2_END = new Date('2026-07-20'); // next 25 days, 1x/day
const PHASE1_END = new Date(2026, 5, 25);  // 5 = June
const PHASE2_END = new Date(2026, 5, 20);  // 5 = June

const DAYS_BN = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'];
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ── MEDICINE DATA ──────────────────────────────────────────
const MEDICINES = [
  {
    id: 'prosalic',
    name: 'Prosalic Scalp Solution',
    type: 'solution',
    icon: '🧪',
    badge: 'badge-solution',
    category: 'Scalp Treatment',
    activeIngredient: 'Salicylic Acid 3% + Betamethasone Dipropionate 0.05%',
    purpose: 'Scalp Psoriasis-এর প্রধান চিকিৎসা',
    whyPrescribed: 'Scalp Psoriasis নিশ্চিত হওয়ার পর Dr. Sabrina এটি প্রথম সারির treatment হিসেবে দিয়েছেন। Salicylic Acid মোটা plaque গলায়, Betamethasone inflammation ও চুলকানি কমায়।',
    howItWorks: 'Salicylic Acid keratolytic — মৃত চামড়ার স্তর ভেঙে দেয়, ফলে steroid ভেতরে পৌঁছাতে পারে। Betamethasone potent topical steroid — immune cell-এর overactivity কমায় যা Psoriasis-এর মূল কারণ।',
    area: 'মাথার সব আক্রান্ত জায়গা — সামনে, পাশে, পিছনে',
    method: 'চুল সরিয়ে সরাসরি scalp-এ লাগান। ১৫–২০ মিনিট রেখে ধুয়ে ফেলুন।',
    expectedResults: '২–৩ সপ্তাহে চুলকানি কমবে। ৪–৬ সপ্তাহে scaling উল্লেখযোগ্যভাবে কমবে।',
    precautions: 'চোখে লাগাবেন না। মুখের চামড়ায় লাগাবেন না। Hair colour দেওয়ার ৪৮ ঘণ্টা আগে-পরে ব্যবহার করবেন না। Long-term continuous steroid avoid করুন।',
    sideEffects: 'Scalp-এ হালকা জ্বলা (শুরুতে স্বাভাবিক), skin thinning (দীর্ঘমেয়াদে)',
    schedule: [
      { time: 'morning', label: 'সকাল', phase: 'Phase 1 (দিন ১–১৫): সকাল + রাত' },
      { time: 'night', label: 'রাত', phase: 'Phase 2 (দিন ১৬–৪০): শুধু রাত' }
    ],
    phases: [
      { name: 'Phase 1', days: '১–১৫ দিন', freq: 'দিনে ২ বার (সকাল + রাত)', start: '2026-06-11', end: '2026-06-25' },
      { name: 'Phase 2', days: '১৬–৪০ দিন', freq: 'দিনে ১ বার (শুধু রাত)', start: '2026-06-26', end: '2026-07-20' }
    ],
    endDate: '2026-07-20'
  },
  {
    id: 'bistar',
    name: 'Bistar 2% Shampoo',
    type: 'shampoo',
    icon: '🧴',
    badge: 'badge-shampoo',
    category: 'Medicated Shampoo',
    activeIngredient: 'Coal Tar 2%',
    purpose: 'Scalp Psoriasis-এ scaling ও cell growth নিয়ন্ত্রণ',
    whyPrescribed: 'Coal Tar দশকের বেশি সময় ধরে Scalp Psoriasis-এর proven treatment। এটি Seborrheic Dandruff shampoo থেকে সম্পূর্ণ আলাদা — সরাসরি Psoriasis-এর cell turnover কমায়।',
    howItWorks: 'Coal Tar skin cell-এর অস্বাভাবিক দ্রুত growth ধীর করে, inflammation কমায়, antifungal ও antibacterial property আছে।',
    area: 'পুরো মাথার scalp',
    method: 'চুল ভেজান। Shampoo লাগান। ৫ মিনিট রেখে ধুয়ে ফেলুন। সাধারণ conditioner ব্যবহার করা যাবে।',
    expectedResults: '৩–৪ সপ্তাহে scaling কমতে শুরু করবে। ২ মাসে উল্লেখযোগ্য উন্নতি।',
    precautions: 'চোখে গেলে সাথে সাথে পানি দিন। Color করা চুলে একটু বেশি সতর্ক থাকুন। Sunlight-এ বের হওয়ার আগে ভালো করে ধুয়ে নিন।',
    sideEffects: 'Slight tar গন্ধ (স্বাভাবিক), চুল সাময়িক কিছুটা dry হতে পারে',
    schedule: [{ time: 'anytime', label: 'যেকোনো সময়' }],
    frequency: 'সপ্তাহে ২ দিন',
    endDate: '2026-08-10'
  },
  {
    id: 'fixal',
    name: 'T. Fixal 120mg',
    type: 'tablet',
    icon: '💊',
    badge: 'badge-tablet',
    category: 'Oral Medicine',
    activeIngredient: 'Fexofenadine HCl 120mg',
    purpose: 'চুলকানি নিয়ন্ত্রণ, রাতে ভালো ঘুম',
    whyPrescribed: 'Scalp Psoriasis-এর তীব্র চুলকানি নিয়ন্ত্রণের জন্য। রাতে দেওয়া হয়েছে কারণ রাতে চুলকানি বাড়ে এবং ঘুমের মধ্যে অজান্তে চুলকালে ক্ষত বাড়ে।',
    howItWorks: 'Non-sedating antihistamine — histamine receptor block করে চুলকানি কমায়। ঘুমে কম ঘুম পাড়ায় না কিন্তু inflammation-driven itch কমায়।',
    dose: 'রাতে ১টি ট্যাবলেট (120mg total)',
    timing: [{ time: 'night', label: 'রাতে ১টি', dose: '1 × 120mg' }],
    expectedResults: 'প্রথম রাত থেকেই চুলকানি কম। ১ সপ্তাহে উল্লেখযোগ্য পার্থক্য।',
    precautions: 'খাবার সাথে বা পরে খান। Juice (grapefruit/orange/apple) এড়িয়ে চলুন — absorption কমায়। Antacid খেলে Fixal-এর ২ ঘণ্টা আগে বা পরে খান।',
    sideEffects: 'মাথাব্যথা (কদাচিৎ), বমি ভাব (খুব কম)',
    endDate: '2026-08-10'
  },
  {
    id: 'biovel',
    name: 'T. Biovel',
    type: 'tablet',
    icon: '🌿',
    badge: 'badge-supplement',
    category: 'Supplement',
    activeIngredient: 'Betaine + Methionine + B-Vitamins (লিভার সাপোর্ট)',
    purpose: 'Liver support, cellular health, steroid-এর সময় protection',
    whyPrescribed: 'Topical steroid ব্যবহারকালীন cellular ও liver support এবং সামগ্রিক nutritional ও metabolic support।',
    howItWorks: 'Betaine ও Methionine liver-এ methylation process সচল রাখে। B-vitamins cellular energy ও nerve function সমর্থন করে।',
    dose: 'সকালে ১টি ট্যাবলেট',
    timing: [{ time: 'morning', label: 'সকালে ১টি', dose: '1 tab' }],
    expectedResults: 'সাধারণ শক্তি ও metabolism সহায়তা — পরোক্ষভাবে treatment সাপোর্ট করে।',
    precautions: 'সকালে খাবারের সাথে খান। নিয়মিত খাওয়া জরুরি।',
    sideEffects: 'সাধারণত কোনো পার্শ্বপ্রতিক্রিয়া নেই',
    endDate: '2026-08-10'
  }
];

// ── STATE ──────────────────────────────────────────────────
let state = {
  currentPage: 'dashboard',
  shampooDay1: 1, // 0=Sun … 6=Sat
  shampooDay2: 4,
  logs: {},        // { 'YYYY-MM-DD': { medId: 'taken'|'missed', ... } }
  scalpLogs: {},   // { 'YYYY-MM-DD': { itching, dandruff, scaling, pain, notes } }
  photos: [],      // [{ id, date, dataUrl }]
  reminders: { morning: false, night: false, shampoo: false, followup: false },
  installPrompt: null,
  logViewMode: 'daily'
};

// ── PERSISTENCE ────────────────────────────────────────────
function save() {
  const s = { ...state };
  delete s.installPrompt;
  localStorage.setItem('iftekhar_tracker', JSON.stringify(s));
}
function load() {
  try {
    const raw = localStorage.getItem('iftekhar_tracker');
    if (raw) {
      const saved = JSON.parse(raw);
      state = { ...state, ...saved };
    }
  } catch (e) { }
}

// ── HELPERS ────────────────────────────────────────────────
function today() {
  const d = new Date();
  return fmtDate(d);
}
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
// function parseDate(s) {
//   const [y, m, d] = s.split('-').map(Number);
//   return new Date(y, m - 1, d);
// }
function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d); // এটি অলরেডি লোকাল ডেট তৈরি করছে, যা পারফেক্ট
}
function daysBetween(a, b) {
  return Math.floor((b - a) / 86400000);
}
function todayDate() { return new Date(); }
function treatmentDay() {
  return Math.max(1, daysBetween(START_DATE, todayDate()) + 1);
}
function treatmentProgress() {
  const d = Math.min(treatmentDay(), TOTAL_DAYS);
  return Math.round((d / TOTAL_DAYS) * 100);
}
function daysRemaining() {
  return Math.max(0, TOTAL_DAYS - treatmentDay() + 1);
}
function formatDisplayDate(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function todayBn() {
  const d = new Date();
  return `${DAYS_BN[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function isShampooDay(dateStr) {
  const d = parseDate(dateStr);
  return d.getDay() === state.shampooDay1 || d.getDay() === state.shampooDay2;
}
function isProsalicMorning(dateStr) {
  const d = parseDate(dateStr);
  return d <= PHASE1_END;
}
function isProsalicActive(dateStr) {
  const d = parseDate(dateStr);
  return d >= START_DATE && d <= parseDate('2026-07-20');
}
// function getMedsForDay(dateStr) {
//   const d = parseDate(dateStr);
//   if (d < START_DATE) return [];
//   const meds = [];
//   MEDICINES.forEach(m => {
//     const end = parseDate(m.endDate);
//     if (d > end) return;
//     if (m.id === 'prosalic') {
//       if (d <= PHASE1_END) {
//         meds.push({ ...m, timeSlot: 'morning', instanceId: m.id+'_morning' });
//         meds.push({ ...m, timeSlot: 'night',   instanceId: m.id+'_night' });
//       } else if (d <= parseDate('2026-07-20')) {
//         meds.push({ ...m, timeSlot: 'night', instanceId: m.id+'_night' });
//       }
//     } else if (m.id === 'bistar') {
//       if (isShampooDay(dateStr)) {
//         meds.push({ ...m, timeSlot: 'anytime', instanceId: m.id });
//       }
//     } else if (m.id === 'fixal') {
//       meds.push({ ...m, timeSlot: 'night', instanceId: m.id });
//     } else if (m.id === 'biovel') {
//       meds.push({ ...m, timeSlot: 'morning', instanceId: m.id });
//     }
//   });
//   return meds;
// }

function getMedsForDay(dateStr) {
  const d = parseDate(dateStr);
  if (d < START_DATE) return [];
  const meds = [];

  MEDICINES.forEach(m => {
    // সেফটি চেক: যদি কোনো কারণে endDate না থাকে, তবে ডিফোল্ট অ্যান্ড ডেট ধরে নেবে
    const targetEndDate = m.endDate ? parseDate(m.endDate) : parseDate('2026-08-10');
    if (d > targetEndDate) return;

    if (m.id === 'prosalic') {
      if (d <= PHASE1_END) {
        meds.push({ ...m, timeSlot: 'morning', instanceId: m.id + '_morning' });
        meds.push({ ...m, timeSlot: 'night', instanceId: m.id + '_night' });
      } else if (d <= parseDate('2026-07-20')) {
        meds.push({ ...m, timeSlot: 'night', instanceId: m.id + '_night' });
      }
    } else if (m.id === 'bistar') {
      if (isShampooDay(dateStr)) {
        meds.push({ ...m, timeSlot: 'anytime', instanceId: m.id });
      }
    } else if (m.id === 'fixal') {
      // ফিক্সাল ট্যাবলেটের জন্য সঠিকভাবে ইন্সট্যান্স সেট করা হলো
      meds.push({ ...m, timeSlot: 'night', instanceId: m.id });
    } else if (m.id === 'biovel') {
      // বায়োভেল ট্যাবলেটের জন্য সঠিকভাবে ইন্সট্যান্স সেট করা হলো
      meds.push({ ...m, timeSlot: 'lunch', instanceId: m.id });
    }
  });
  return meds;
}

function getStatusForInstance(dateStr, instanceId) {
  return (state.logs[dateStr] || {})[instanceId] || 'pending';
}
function setStatus(dateStr, instanceId, status) {
  if (!state.logs[dateStr]) state.logs[dateStr] = {};
  state.logs[dateStr][instanceId] = status;
  save();
}
function getDayCompletion(dateStr) {
  const meds = getMedsForDay(dateStr);
  if (!meds.length) return null;
  const taken = meds.filter(m => getStatusForInstance(dateStr, m.instanceId) === 'taken').length;
  return { taken, total: meds.length, pct: Math.round((taken / meds.length) * 100) };
}
function getOverallAdherence() {
  let total = 0, taken = 0;
  const d = new Date(START_DATE);
  const now = todayDate();
  while (d <= now) {
    const ds = fmtDate(d);
    const meds = getMedsForDay(ds);
    meds.forEach(m => {
      total++;
      if (getStatusForInstance(ds, m.instanceId) === 'taken') taken++;
    });
    d.setDate(d.getDate() + 1);
  }
  return total ? Math.round((taken / total) * 100) : 0;
}

// ── ROUTING ───────────────────────────────────────────────
function navigate(page) {
  state.currentPage = page;
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
  const titles = {
    dashboard: 'Dashboard',
    medicines: 'Medicines',
    routine: 'Daily Routine',
    progress: 'Progress',
    log: 'Log & Calendar'
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  renderPage(page);
}

function renderPage(page) {
  const main = document.getElementById('main-content');
  const renderers = {
    dashboard: renderDashboard,
    medicines: renderMedicines,
    routine: renderRoutine,
    progress: renderProgress,
    log: renderLog
  };
  main.innerHTML = '';
  if (renderers[page]) renderers[page](main);
}

// ── DASHBOARD ─────────────────────────────────────────────
function renderDashboard(el) {
  const tDay = treatmentDay();
  const pct = treatmentProgress();
  const rem = daysRemaining();
  const todayStr = today();
  const todayMeds = getMedsForDay(todayStr);
  const comp = getDayCompletion(todayStr);
  const adh = getOverallAdherence();

  // Phase banner
  const now = todayDate();
  let phaseBanner = '';
  if (now <= PHASE1_END) {
    phaseBanner = `<div class="phase-banner phase-active">
      <span class="phase-icon">🔥</span>
      <div>
        <div class="phase-title">Phase 1 চলছে (দিন ১–১৫)</div>
        <div class="phase-desc">Prosalic সকাল + রাত ২ বার — ${Math.max(0, daysBetween(now, PHASE1_END))} দিন বাকি এই phase-এ</div>
      </div>
    </div>`;
  } else if (now <= parseDate('2026-07-20')) {
    phaseBanner = `<div class="phase-banner phase-active">
      <span class="phase-icon">📉</span>
      <div>
        <div class="phase-title">Phase 2 চলছে (দিন ১৬–৪০)</div>
        <div class="phase-desc">Prosalic এখন শুধু রাতে ১ বার — Dose কমানো হয়েছে</div>
      </div>
    </div>`;
  } else {
    phaseBanner = `<div class="phase-banner phase-upcoming">
      <span class="phase-icon">✅</span>
      <div>
        <div class="phase-title">Prosalic Course সম্পন্ন</div>
        <div class="phase-desc">অন্যান্য medicines চলছে। Follow-up: ${formatDisplayDate(FOLLOW_UP)}</div>
      </div>
    </div>`;
  }

  // Today med items
  let todayMedHtml = '';
  if (!todayMeds.length) {
    todayMedHtml = `<div class="empty-state"><div class="empty-icon">🎉</div><div class="empty-text">আজ কোনো medicine নেই</div></div>`;
  } else {
    const sorted = [...todayMeds].sort((a, b) => {
      const order = { morning: 0, anytime: 1, night: 2 };
      return (order[a.timeSlot] || 1) - (order[b.timeSlot] || 1);
    });
    todayMedHtml = sorted.map(m => {
      const status = getStatusForInstance(todayStr, m.instanceId);
      const chipClass = { morning: 'chip-morning',  night: 'chip-night', anytime: 'chip-anytime' }[m.timeSlot] || 'chip-anytime';
      const chipLabel = { morning: 'সকাল', lunch:'দুপুর', night: 'রাত', anytime: 'যেকোনো সময়' }[m.timeSlot] || '';
      const btnClass = { taken: 'taken', missed: 'missed', pending: '' }[status] || '';
      const btnIcon = { taken: '✓', missed: '✗', pending: '◯' }[status] || '◯';
      const itemClass = status === 'taken' ? 'item-taken' : '';
      return `<div class="today-med-item ${itemClass}" data-medid="${m.id}" data-iid="${m.instanceId}">
        <div class="med-type-badge ${m.badge}">${m.icon}</div>
        <div class="med-info">
          <div class="med-name">${m.name}</div>
          <div class="med-detail">
            <span class="med-timing-chip ${chipClass}">${chipLabel}</span>
            ${m.id === 'fixal' ? ' · ১টি' : ''}${m.id === 'biovel' ? ' · ১টি' : ''}
          </div>
        </div>
        <button class="take-btn ${btnClass}" data-action="toggle" data-iid="${m.instanceId}" data-date="${todayStr}">
          ${btnIcon}
        </button>
      </div>`;
    }).join('');
  }

  // Install banner
  const installHtml = state.installPrompt ? `<div class="install-banner" id="install-banner">
    <span style="font-size:1.5rem">📱</span>
    <div class="install-text">
      <div class="install-title">Home Screen-এ যোগ করুন</div>
      <div class="install-sub">App হিসেবে সরাসরি ব্যবহার করুন</div>
    </div>
    <button class="install-btn" id="do-install">Install</button>
    <button class="dismiss-btn" id="dismiss-install">✕</button>
  </div>` : '';

  el.innerHTML = `<div class="page">
    ${installHtml}

    <div class="dash-hero card">
      <div class="dash-hero-top">
        <div>
          <div class="dash-hero-date">${todayBn()}</div>
          <div class="dash-hero-title">Scalp Psoriasis Treatment</div>
          <div style="font-size:.75rem;opacity:.7;margin-top:.2rem">Dr. Sabrina Shahrin · Scalp Ps</div>
        </div>
        <div class="dash-hero-days">
          <div class="dash-hero-daynum">${tDay}</div>
          <div class="dash-hero-daylabel">/ ${TOTAL_DAYS} দিন</div>
        </div>
      </div>
      <div class="dash-progress-row">
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="progress-pct">${pct}%</div>
      </div>
    </div>

    ${phaseBanner}

    <div class="stats-row">
      <div class="stat-card stat-done">
        <div class="stat-num">${comp ? comp.taken : 0}</div>
        <div class="stat-label">আজ নেওয়া</div>
      </div>
      <div class="stat-card stat-pend">
        <div class="stat-num">${comp ? comp.total - comp.taken : todayMeds.length}</div>
        <div class="stat-label">বাকি আছে</div>
      </div>
      <div class="stat-card stat-miss">
        <div class="stat-num">${rem}</div>
        <div class="stat-label">দিন বাকি</div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-label">আজকের Treatment (${todayStr})</div>
      <div class="card">${todayMedHtml}</div>
    </div>

    <div class="page-section">
      <div class="section-label">সামগ্রিক Adherence</div>
      <div class="card card-pad">
        <div class="adherence-row">
          <div class="adherence-ring">
            <svg class="ring-svg" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="36" fill="none" stroke="#e2e8f0" stroke-width="8"/>
              <circle cx="45" cy="45" r="36" fill="none" stroke="#2eb8a0" stroke-width="8"
                stroke-dasharray="${2 * Math.PI * 36}" stroke-dashoffset="${2 * Math.PI * 36 * (1 - adh / 100)}"
                stroke-linecap="round" transform="rotate(-90 45 45)"/>
              <text x="45" y="49" text-anchor="middle" class="ring-num" font-size="18" font-weight="800" fill="#1a2744">${adh}%</text>
            </svg>
            <div style="font-size:.72rem;color:var(--text-soft);text-align:center">Adherence</div>
          </div>
          <div style="flex:1;padding-left:1rem">
            <div style="margin-bottom:.5rem">
              <div style="font-size:.75rem;color:var(--text-soft)">Follow-up তারিখ</div>
              <div style="font-size:.9rem;font-weight:700">${formatDisplayDate(FOLLOW_UP)}</div>
            </div>
            <div style="margin-bottom:.5rem">
              <div style="font-size:.75rem;color:var(--text-soft)">Treatment শেষ</div>
              <div style="font-size:.9rem;font-weight:700">~${formatDisplayDate(new Date('2026-08-10'))}</div>
            </div>
            <div>
              <div style="font-size:.75rem;color:var(--text-soft)">Doctor</div>
              <div style="font-size:.88rem;font-weight:700">Dr. Sabrina Shahrin</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-section">
      <div class="section-label">Treatment Timeline</div>
      <div class="card card-pad">
        <div class="timeline">
          ${renderTimelineItems()}
        </div>
      </div>
    </div>
  </div>`;

  // Bind toggle buttons
  el.querySelectorAll('[data-action="toggle"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const iid = btn.dataset.iid;
      const date = btn.dataset.date;
      const cur = getStatusForInstance(date, iid);
      const next = cur === 'pending' ? 'taken' : cur === 'taken' ? 'missed' : 'pending';
      setStatus(date, iid, next);
      showToast(next === 'taken' ? '✓ নেওয়া হয়েছে' : next === 'missed' ? '✗ Missed হিসেবে চিহ্নিত' : '↩ পূর্বে ফিরেছে');
      renderPage('dashboard');
    });
  });
  el.querySelectorAll('.today-med-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.closest('[data-action="toggle"]')) return;
      const id = item.dataset.medid;
      const med = MEDICINES.find(m => m.id === id);
      if (med) openMedModal(med);
    });
  });

  if (state.installPrompt) {
    document.getElementById('do-install')?.addEventListener('click', () => {
      state.installPrompt.prompt();
      state.installPrompt = null;
      save();
      renderPage('dashboard');
    });
    document.getElementById('dismiss-install')?.addEventListener('click', () => {
      state.installPrompt = null;
      renderPage('dashboard');
    });
  }
}

function renderTimelineItems() {
  const now = todayDate();
  const items = [
    { date: '10 Jun 2026', title: 'Dr. Sabrina Shahrin Consultation', desc: 'Scalp Psoriasis নিশ্চিত diagnosis', cls: 'tl-past' },
    { date: '11 Jun 2026', title: 'Treatment শুরু', desc: 'Prosalic + Bistar + Fixal + Biovel শুরু', cls: now >= parseDate('2026-06-11') ? 'tl-past' : 'tl-future' },
    { date: '25 Jun 2026', title: 'Phase 1 শেষ', desc: 'Prosalic dose কমবে → দিনে ১ বার', cls: now >= parseDate('2026-06-25') ? 'tl-past' : (now >= parseDate('2026-06-11') ? 'tl-active' : 'tl-future') },
    { date: '20 Jul 2026', title: 'Prosalic Course সম্পন্ন', desc: '৪০ দিনের Scalp Solution course শেষ', cls: now >= parseDate('2026-07-20') ? 'tl-past' : 'tl-future' },
    { date: '10–11 Aug 2026', title: 'Follow-up Appointment', desc: 'Dr. Sabrina Shahrin-কে দেখানো', cls: 'tl-future', highlight: true },
    { date: '10 Aug 2026', title: 'Treatment সম্পন্ন (Target)', desc: '২ মাসের course শেষ', cls: 'tl-future' }
  ];

  return items.map(i => `
    <div class="timeline-item ${i.cls}">
      <div class="timeline-dot"></div>
      <div class="tl-title">${i.title}${i.highlight ? ' 📅' : ''}</div>
      <div class="tl-sub">${i.desc}</div>
      <div class="tl-date">${i.date}</div>
    </div>`).join('');
}

// ── MEDICINES PAGE ────────────────────────────────────────
function renderMedicines(el) {
  let html = `<div class="page">`;

  // Group by category
  const categories = [...new Set(MEDICINES.map(m => m.category))];
  categories.forEach(cat => {
    const meds = MEDICINES.filter(m => m.category === cat);
    html += `<div class="section-label">${cat}</div>`;
    meds.forEach(m => {
      html += renderMedCard(m);
    });
  });

  html += `</div>`;
  el.innerHTML = html;

  // Expand/collapse
  el.querySelectorAll('.med-full-header').forEach(h => {
    h.addEventListener('click', () => {
      const body = h.nextElementSibling;
      const chevron = h.querySelector('.med-full-chevron');
      const open = body.classList.toggle('open');
      chevron.classList.toggle('open', open);
    });
  });
  el.querySelectorAll('.med-full-header').forEach(h => {
    h.addEventListener('click', e => {
      if (e.target.closest('[data-action="toggle"]')) return;
    });
  });
}

function renderMedCard(m) {
  const phasesHtml = m.phases ? m.phases.map(p =>
    `<div class="info-row">
       <span class="info-icon">📅</span>
       <span class="info-label">${p.name}</span>
       <span class="info-val">${p.freq} <span style="color:var(--text-soft)">(${p.days})</span></span>
     </div>`
  ).join('') : '';

  const tagsHtml = [
    m.type === 'shampoo' ? '<span class="tag tag-scaling">Scaling কমায়</span>' : '',
    m.type === 'solution' ? '<span class="tag tag-psoriasis">Psoriasis</span>' : '',
    m.id === 'fixal' ? '<span class="tag tag-itch">Itch Relief</span>' : '',
    m.id === 'biovel' ? '<span class="tag tag-supplement">Supplement</span>' : ''
  ].filter(Boolean).join('');

  return `<div class="med-full-card">
    <div class="med-full-header">
      <span class="med-full-icon">${m.icon}</span>
      <div>
        <div class="med-full-name">${m.name}</div>
        <div class="med-full-sub">${m.category} · ${m.activeIngredient.substring(0, 40)}...</div>
      </div>
      <span class="med-full-chevron">▼</span>
    </div>
    <div class="med-full-body">
      <div style="margin-bottom:.75rem">${tagsHtml}</div>

      <div class="info-row"><span class="info-icon">🧬</span><span class="info-label">উপাদান</span><span class="info-val">${m.activeIngredient}</span></div>
      <div class="info-row"><span class="info-icon">🎯</span><span class="info-label">উদ্দেশ্য</span><span class="info-val">${m.purpose}</span></div>
      <div class="info-row"><span class="info-icon">⚙️</span><span class="info-label">কীভাবে কাজ করে</span><span class="info-val">${m.howItWorks}</span></div>
      ${m.area ? `<div class="info-row"><span class="info-icon">📍</span><span class="info-label">প্রয়োগের জায়গা</span><span class="info-val">${m.area}</span></div>` : ''}
      ${m.method ? `<div class="info-row"><span class="info-icon">🖐</span><span class="info-label">ব্যবহার পদ্ধতি</span><span class="info-val">${m.method}</span></div>` : ''}
      ${m.frequency ? `<div class="info-row"><span class="info-icon">🔁</span><span class="info-label">কতবার</span><span class="info-val">${m.frequency}</span></div>` : ''}
      ${phasesHtml}
      <div class="divider" style="margin:.5rem 0"></div>
      <div class="info-row"><span class="info-icon">✨</span><span class="info-label">প্রত্যাশিত ফলাফল</span><span class="info-val">${m.expectedResults}</span></div>
      <div class="info-row"><span class="info-icon">📖</span><span class="info-label">ডাক্তার কেন দিলেন</span><span class="info-val">${m.whyPrescribed}</span></div>
      <div class="info-row"><span class="info-icon">⚠️</span><span class="info-label">সতর্কতা</span><span class="info-val">${m.precautions}</span></div>
      <div class="info-row"><span class="info-icon">💡</span><span class="info-label">পার্শ্বপ্রতিক্রিয়া</span><span class="info-val">${m.sideEffects}</span></div>
      <div class="info-row"><span class="info-icon">📆</span><span class="info-label">Course শেষ</span><span class="info-val">${m.endDate}</span></div>
    </div>
  </div>`;
}

// // ── ROUTINE PAGE ──────────────────────────────────────────
// function renderRoutine(el) {
//   const todayStr = today();
//   const meds = getMedsForDay(todayStr);
//   const morning = meds.filter(m => m.timeSlot === 'morning');
//   const anytime = meds.filter(m => m.timeSlot === 'anytime');
//   const night = meds.filter(m => m.timeSlot === 'night');

//   const shampooThisWeek = getShampooWeekDays();

//   const blockHtml = (icon, name, sub, items, extra = '') => {
//     const count = items.length;
//     const doneCount = items.filter(m => getStatusForInstance(todayStr, m.instanceId) === 'taken').length;
//     const itemsHtml = items.map(m => {
//       const status = getStatusForInstance(todayStr, m.instanceId);
//       const done = status === 'taken';
//       return `<div class="routine-item">
//         <span class="routine-med-icon">${m.icon}</span>
//         <div class="routine-info">
//           <div class="routine-name">${m.name}</div>
//           <div class="routine-desc">${m.id === 'fixal' ? '১টি ট্যাবলেট' : m.id === 'biovel' ? '১টি ট্যাবলেট' : m.id === 'prosalic' ? 'Scalp-এ লাগান, ১৫ মিনিট রাখুন' : m.id === 'bistar' ? '৫ মিনিট রেখে ধুয়ে ফেলুন' : ''}</div>
//         </div>
//         <button class="routine-check ${done ? 'done' : ''}" data-action="rtoggle" data-iid="${m.instanceId}" data-date="${todayStr}">
//           ${done ? '✓' : ''}
//         </button>
//       </div>`;
//     }).join('') || `<div style="padding:.75rem 1rem;font-size:.82rem;color:var(--text-soft)">এই সময়ে কোনো treatment নেই</div>`;

//     return `<div class="time-block card">
//       <div class="time-block-header">
//         <span class="time-icon">${icon}</span>
//         <div>
//           <div class="time-name">${name}</div>
//           <div class="time-sub">${sub}</div>
//         </div>
//         ${count ? `<div class="time-count">${doneCount}/${count}</div>` : ''}
//       </div>
//       ${itemsHtml}
//       ${extra}
//     </div>`;
//   };

//   const shampooWeekHtml = `<div class="shampoo-sched">
//     <div class="shampoo-sched-title">🗓 এই সপ্তাহের Shampoo Schedule</div>
//     <div class="shampoo-days">${shampooThisWeek}</div>
//   </div>`;

//   // Shampoo picker
//   const pickerHtml = `<div class="card card-pad" style="margin-bottom:.75rem">
//     <div class="section-label" style="margin-bottom:.6rem">Shampoo-র দিন বেছে নিন (সপ্তাহে ২টি)</div>
//     <div class="day-picker">
//       ${DAYS_EN.map((d, i) => `<button class="day-pick-btn ${(i === state.shampooDay1 || i === state.shampooDay2) ? 'selected' : ''}" data-day="${i}">${DAYS_BN[i]}</button>`).join('')}
//     </div>
//   </div>`;

//   el.innerHTML = `<div class="page">
//     <div class="section-label">আজকের Routine — ${todayStr}</div>
//     ${blockHtml('☀️', 'সকাল', '৭টা – ৯টা', morning)}
//     ${blockHtml('🌤', 'দুপুর / বিকেল', 'যদি Shampoo দিন হয়', anytime, isShampooDay(todayStr) ? '' : '')}
//     ${blockHtml('🌙', 'রাত', 'ঘুমানোর আগে', night)}
//     ${shampooWeekHtml}
//     ${pickerHtml}

//     <div class="card card-pad">
//       <div class="section-label" style="margin-bottom:.6rem">Hair Colour সতর্কতা</div>
//       <div class="warn-box">
//         <span class="warn-icon">⚠️</span>
//         <span>Hair colour দেওয়ার ৪৮ ঘণ্টা আগে ও পরে Prosalic Solution ব্যবহার করবেন না। Treatment চলাকালীন hair colour যতটা সম্ভব এড়িয়ে চলুন।</span>
//       </div>
//     </div>
//   </div>`;

//   el.querySelectorAll('[data-action="rtoggle"]').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const iid = btn.dataset.iid;
//       const date = btn.dataset.date;
//       const cur = getStatusForInstance(date, iid);
//       setStatus(date, iid, cur === 'taken' ? 'pending' : 'taken');
//       showToast(cur !== 'taken' ? '✓ সম্পন্ন' : '↩ পূর্বে ফিরেছে');
//       renderPage('routine');
//     });
//   });

//   el.querySelectorAll('.day-pick-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const day = parseInt(btn.dataset.day);
//       if (day === state.shampooDay1 || day === state.shampooDay2) {
//         // deselect
//         if (day === state.shampooDay1) state.shampooDay1 = -1;
//         else state.shampooDay2 = -1;
//         // normalize
//         const selected = [state.shampooDay1, state.shampooDay2].filter(d => d >= 0);
//         state.shampooDay1 = selected[0] ?? 1;
//         state.shampooDay2 = selected[1] ?? 4;
//       } else {
//         // assign
//         if (state.shampooDay1 < 0) state.shampooDay1 = day;
//         else state.shampooDay2 = day;
//       }
//       save();
//       renderPage('routine');
//     });
//   });
// }

// ── ROUTINE PAGE (UPDATED) ──────────────────────────────────────────
function renderRoutine(el) {
  const todayStr = today();
  const meds = getMedsForDay(todayStr);
  
  // এখানে দুপুরের ফিল্টারটি (lunch) নতুন যুক্ত করা হলো
  const morning = meds.filter(m => m.timeSlot === 'morning');
  const lunch   = meds.filter(m => m.timeSlot === 'lunch'); // 👈 নতুন ফিল্টার
  const anytime = meds.filter(m => m.timeSlot === 'anytime');
  const night   = meds.filter(m => m.timeSlot === 'night');

  const shampooThisWeek = getShampooWeekDays();

  const blockHtml = (icon, name, sub, items, extra = '') => {
    const count = items.length;
    const doneCount = items.filter(m => getStatusForInstance(todayStr, m.instanceId) === 'taken').length;
    const itemsHtml = items.map(m => {
      const status = getStatusForInstance(todayStr, m.instanceId);
      const done = status === 'taken';
      return `<div class="routine-item">
        <span class="routine-med-icon">${m.icon}</span>
        <div class="routine-info">
          <div class="routine-name">${m.name}</div>
          <div class="routine-desc">${m.id === 'fixal' ? '১টি ট্যাবলেট' : m.id === 'biovel' ? '১টি ট্যাবলেট' : m.id === 'prosalic' ? 'Scalp-এ লাগান, ১৫ মিনিট রাখুন' : m.id === 'bistar' ? '৫ মিনিট রেখে ধুয়ে ফেলুন' : ''}</div>
        </div>
        <button class="routine-check ${done ? 'done' : ''}" data-action="rtoggle" data-iid="${m.instanceId}" data-date="${todayStr}">
          ${done ? '✓' : ''}
        </button>
      </div>`;
    }).join('') || `<div style="padding:.75rem 1rem;font-size:.82rem;color:var(--text-soft)">এই 시간에 কোনো treatment নেই</div>`;

    return `<div class="time-block card">
      <div class="time-block-header">
        <span class="time-icon">${icon}</span>
        <div>
          <div class="time-name">${name}</div>
          <div class="time-sub">${sub}</div>
        </div>
        ${count ? `<div class="time-count">${doneCount}/${count}</div>` : ''}
      </div>
      ${itemsHtml}
      ${extra}
    </div>`;
  };

  const shampooWeekHtml = `<div class="shampoo-sched">
    <div class="shampoo-sched-title">🗓 এই সপ্তাহের Shampoo Schedule</div>
    <div class="shampoo-days">${shampooThisWeek}</div>
  </div>`;

  // Shampoo picker
  const pickerHtml = `<div class="card card-pad" style="margin-bottom:.75rem">
    <div class="section-label" style="margin-bottom:.6rem">Shampoo-র দিন বেছে নিন (সপ্তাহে ২টি)</div>
    <div class="day-picker">
      ${DAYS_EN.map((d, i) => `<button class="day-pick-btn ${(i === state.shampooDay1 || i === state.shampooDay2) ? 'selected' : ''}" data-day="${i}">${DAYS_BN[i]}</button>`).join('')}
    </div>
  </div>`;

  // UI রেন্ডারিং - এখানে দুপুরের ব্লকটি (lunch) সকাল আর শ্যাম্পুর মাঝখানে বসানো হয়েছে
  el.innerHTML = `<div class="page">
    <div class="section-label">আজকের Routine — ${todayStr}</div>
    ${blockHtml('☀️', 'সকাল', '৭টা – ৯টা', morning)}
    ${blockHtml('🌤', 'দুপুর', 'দুপুরের খাবারের পর', lunch)} 
    ${blockHtml('🧴', 'যেকোনো সময় / শ্যাম্পু', 'যদি Shampoo দিন হয়', anytime, isShampooDay(todayStr) ? '' : '')}
    ${blockHtml('🌙', 'রাত', 'ঘুমানোর আগে', night)}
    ${shampooWeekHtml}
    ${pickerHtml}

    <div class="card card-pad">
      <div class="section-label" style="margin-bottom:.6rem">Hair Colour সতর্কতা</div>
      <div class="warn-box">
        <span class="warn-icon">⚠️</span>
        <span>Hair colour দেওয়ার ৪৮ ঘণ্টা আগে ও পরে Prosalic Solution ব্যবহার করবেন না। Treatment চলাকালীন hair colour যতটা সম্ভব এড়িয়ে চলুন।</span>
      </div>
    </div>
  </div>`;

  el.querySelectorAll('[data-action="rtoggle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const iid = btn.dataset.iid;
      const date = btn.dataset.date;
      const cur = getStatusForInstance(date, iid);
      setStatus(date, iid, cur === 'taken' ? 'pending' : 'taken');
      showToast(cur !== 'taken' ? '✓ সম্পন্ন' : '↩ পূর্বে ফিরেছে');
      renderPage('routine');
    });
  });

  el.querySelectorAll('.day-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = parseInt(btn.dataset.day);
      if (day === state.shampooDay1 || day === state.shampooDay2) {
        // deselect
        if (day === state.shampooDay1) state.shampooDay1 = -1;
        else state.shampooDay2 = -1;
        // normalize
        const selected = [state.shampooDay1, state.shampooDay2].filter(d => d >= 0);
        state.shampooDay1 = selected[0] ?? 1;
        state.shampooDay2 = selected[1] ?? 4;
      } else {
        // assign
        if (state.shampooDay1 < 0) state.shampooDay1 = day;
        else state.shampooDay2 = day;
      }
      save();
      renderPage('routine');
    });
  });
}

function getShampooWeekDays() {
  const now = new Date();
  const dow = now.getDay();
  const start = new Date(now); start.setDate(now.getDate() - dow);
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const ds = fmtDate(d);
    const isToday = ds === today();
    const sDay = d.getDay() === state.shampooDay1 || d.getDay() === state.shampooDay2;
    const done = sDay && getStatusForInstance(ds, 'bistar') === 'taken';
    let cls = 'sday-none';
    if (sDay && isToday) cls = 'sday-today';
    else if (done) cls = 'sday-done';
    else if (sDay) cls = 'sday-active';
    html += `<div class="shampoo-day ${cls}">${DAYS_BN[d.getDay()]} ${d.getDate()}</div>`;
  }
  return html;
}

// ── PROGRESS PAGE ─────────────────────────────────────────
function renderProgress(el) {
  const todayStr = today();
  const existing = state.scalpLogs[todayStr] || { itching: 5, dandruff: 5, scaling: 5, pain: 3, notes: '' };

  const photos = state.photos.slice().reverse().slice(0, 9);
  const photoGridHtml = photos.length ? photos.map(p => `
    <div class="photo-thumb" data-pid="${p.id}">
      <img src="${p.dataUrl}" alt="Scalp photo" loading="lazy"/>
      <div class="photo-thumb-date">${p.date}</div>
      <button class="photo-del-btn" data-del="${p.id}">✕</button>
    </div>`).join('') : `<div style="font-size:.8rem;color:var(--text-soft);grid-column:1/-1;text-align:center;padding:.5rem">কোনো ছবি নেই — উপরে + বাটন চাপুন</div>`;

  // Last 7 days scalp trend
  const trendHtml = renderScalpTrend();

  el.innerHTML = `<div class="page">
    <div class="section-label">আজকের Scalp অবস্থা — ${todayStr}</div>
    <div class="card">
      <div class="scalp-log-form">
        ${renderSlider('itching', 'চুলকানি 😤', existing.itching, 'itch')}
        ${renderSlider('dandruff', 'Dandruff/Flaking ❄️', existing.dandruff, 'dand')}
        ${renderSlider('scaling', 'Scaling/Plaque 🔷', existing.scaling, 'scal')}
        ${renderSlider('pain', 'ব্যথা/জ্বলা 🔥', existing.pain, 'pain')}
        <div>
          <div style="font-size:.85rem;font-weight:700;margin-bottom:.4rem">নোট</div>
          <textarea id="scalp-notes" rows="2"
            style="width:100%;border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:.65rem;font-size:.85rem;font-family:inherit;resize:none"
            placeholder="আজ কেমন লাগছে? কোনো পরিবর্তন?">${existing.notes || ''}</textarea>
        </div>
        <button class="submit-btn" id="save-scalp">আজকের অবস্থা সেভ করুন</button>
      </div>
    </div>

    <div class="section-label">Scalp Trend (শেষ ৭ দিন)</div>
    <div class="card card-pad">${trendHtml}</div>

    <div class="section-label">Scalp Photos</div>
    <div class="card card-pad">
      <div class="photo-upload-area" id="photo-upload-area">
        <div class="photo-upload-icon">📷</div>
        <div class="photo-upload-text">ছবি তুলতে বা গ্যালারি থেকে আপলোড করতে ট্যাপ করুন</div>
        <input type="file" id="photo-input" accept="image/*" style="display:none" multiple capture="environment"/>
      </div>
      <div class="photo-grid" id="photo-grid">${photoGridHtml}</div>
    </div>

    ${state.photos.length >= 2 ? `<div class="section-label">Photo Comparison</div>
    <div class="card card-pad">
      <div class="compare-grid">
        <div class="compare-card">
          <img src="${state.photos[0].dataUrl}" alt="First photo"/>
          <div class="compare-card-label">প্রথম ছবি<br/>${state.photos[0].date}</div>
        </div>
        <div class="compare-card">
          <img src="${state.photos[state.photos.length - 1].dataUrl}" alt="Latest photo"/>
          <div class="compare-card-label">সর্বশেষ ছবি<br/>${state.photos[state.photos.length - 1].date}</div>
        </div>
      </div>
    </div>` : ''}
  </div>`;

  // Sliders live update
  ['itch', 'dand', 'scal', 'pain'].forEach(id => {
    const sl = el.querySelector(`#sl-${id}`);
    const vl = el.querySelector(`#vl-${id}`);
    if (sl && vl) sl.addEventListener('input', () => { vl.textContent = sl.value; });
  });

  // Save scalp log
  el.querySelector('#save-scalp').addEventListener('click', () => {
    state.scalpLogs[todayStr] = {
      itching: +el.querySelector('#sl-itch').value,
      dandruff: +el.querySelector('#sl-dand').value,
      scaling: +el.querySelector('#sl-scal').value,
      pain: +el.querySelector('#sl-pain').value,
      notes: el.querySelector('#scalp-notes').value
    };
    save();
    showToast('✓ Scalp log সেভ হয়েছে');
  });

  // Photo upload
  el.querySelector('#photo-upload-area').addEventListener('click', () => {
    el.querySelector('#photo-input').click();
  });
  el.querySelector('#photo-input').addEventListener('change', e => {
    const files = [...e.target.files];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        state.photos.push({ id: Date.now() + '_' + Math.random().toString(36).slice(2), date: todayStr, dataUrl: ev.target.result });
        save();
        renderPage('progress');
      };
      reader.readAsDataURL(file);
    });
  });

  // Delete photo
  el.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const pid = btn.dataset.del;
      state.photos = state.photos.filter(p => p.id !== pid);
      save();
      renderPage('progress');
    });
  });
}

function renderSlider(key, label, val, id) {
  const emojis = ['😊', '😌', '😐', '😕', '😣', '😖', '😣', '😖', '😣', '😖', '😫'];
  return `<div class="symptom-slider-wrap">
    <div class="symptom-label-row">
      <span class="symptom-name">${label}</span>
      <span class="symptom-val" id="vl-${id}">${val}</span>
    </div>
    <input type="range" id="sl-${id}" min="0" max="10" value="${val}"/>
    <div class="emoji-row">${[0, 2, 5, 7, 10].map(n => `<span class="emoji-level">${emojis[n]}</span>`).join('')}</div>
  </div>`;
}

function renderScalpTrend() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(fmtDate(d));
  }
  const hasData = days.some(d => state.scalpLogs[d]);
  if (!hasData) return `<div style="text-align:center;color:var(--text-soft);font-size:.83rem;padding:.5rem">এখনো Scalp log নেই — প্রতিদিন লগ করুন</div>`;

  const metrics = ['itching', 'dandruff', 'scaling'];
  const colors = ['#e05252', '#2eb8a0', '#f5a623'];
  const labels = ['চুলকানি', 'Dandruff', 'Scaling'];

  const maxH = 80;
  const barW = 8;
  const gap = 3;
  const grpW = metrics.length * (barW + gap) + 6;
  const svgW = days.length * grpW + 20;

  let svgBars = '';
  days.forEach((d, di) => {
    const log = state.scalpLogs[d];
    metrics.forEach((m, mi) => {
      const val = log ? (log[m] || 0) : 0;
      const h = (val / 10) * maxH;
      const x = 10 + di * grpW + mi * (barW + gap);
      const y = maxH - h + 10;
      svgBars += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${colors[mi]}" opacity="${log ? 1 : 0.2}"/>`;
    });
    const label = d.slice(8);
    svgBars += `<text x="${10 + di * grpW + grpW / 2 - 5}" y="${maxH + 25}" font-size="9" fill="#8898aa" text-anchor="middle">${label}</text>`;
  });

  return `<svg width="100%" viewBox="0 0 ${svgW} ${maxH + 35}" style="overflow:visible">
    <line x1="10" y1="${maxH + 10}" x2="${svgW - 10}" y2="${maxH + 10}" stroke="#e2e8f0" stroke-width="1"/>
    ${svgBars}
  </svg>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.25rem">
    ${metrics.map((m, i) => `<div style="display:flex;align-items:center;gap:.3rem;font-size:.72rem;color:var(--text-soft)">
      <span style="width:8px;height:8px;border-radius:2px;background:${colors[i]};display:inline-block"></span>${labels[i]}</div>`).join('')}
  </div>`;
}

// ── LOG PAGE ──────────────────────────────────────────────
function renderLog(el) {
  const mode = state.logViewMode || 'daily';

  el.innerHTML = `<div class="page">
    <div class="log-tabs card" style="margin-bottom:.25rem">
      <button class="log-tab ${mode === 'daily' ? 'active' : ''}" data-mode="daily">দৈনিক</button>
      <button class="log-tab ${mode === 'weekly' ? 'active' : ''}" data-mode="weekly">সাপ্তাহিক</button>
      <button class="log-tab ${mode === 'monthly' ? 'active' : ''}" data-mode="monthly">মাসিক</button>
    </div>
    <div id="log-content">${renderLogContent(mode)}</div>
  </div>`;

  el.querySelectorAll('.log-tab').forEach(t => {
    t.addEventListener('click', () => {
      state.logViewMode = t.dataset.mode;
      el.querySelectorAll('.log-tab').forEach(x => x.classList.toggle('active', x.dataset.mode === t.dataset.mode));
      el.querySelector('#log-content').innerHTML = renderLogContent(t.dataset.mode);
      bindLogExpand(el);
    });
  });
  bindLogExpand(el);
}

function bindLogExpand(el) {
  el.querySelectorAll('.log-day-header').forEach(h => {
    h.addEventListener('click', () => {
      h.classList.toggle('open-hdr');
      const body = h.nextElementSibling;
      body.classList.toggle('open');
    });
  });
}

function renderLogContent(mode) {
  if (mode === 'daily') return renderDailyLog();
  if (mode === 'weekly') return renderWeeklyLog();
  if (mode === 'monthly') return renderMonthlyLog();
  return '';
}

function renderDailyLog() {
  const days = [];
  const d = new Date(START_DATE);
  const now = todayDate();
  while (d <= now) { days.push(fmtDate(d)); d.setDate(d.getDate() + 1); }
  days.reverse();
  if (!days.length) return `<div class="empty-state"><div class="empty-icon">📅</div><div class="empty-text">এখনো কোনো দিন শুরু হয়নি</div></div>`;

  return days.map(ds => {
    const meds = getMedsForDay(ds);
    if (!meds.length) return '';
    const comp = getDayCompletion(ds);
    const pillCls = comp.pct === 100 ? 'pill-100' : comp.pct >= 50 ? 'pill-mid' : comp.taken > 0 ? 'pill-low' : 'pill-zero';
    const pillTxt = comp.pct === 100 ? '✓ সম্পন্ন' : `${comp.taken}/${comp.total}`;
    const dayNum = daysBetween(START_DATE, parseDate(ds)) + 1;
    const scalpL = state.scalpLogs[ds];

    const medsHtml = meds.map(m => {
      const s = getStatusForInstance(ds, m.instanceId);
      return `<div class="log-item-row">
        <span class="log-dot ${s === 'taken' ? 'dot-taken' : s === 'missed' ? 'dot-missed' : 'dot-pending'}"></span>
        <span>${m.name} (${m.timeSlot === 'morning' ? 'সকাল' : m.timeSlot === 'night' ? 'রাত' : 'যেকোনো সময়'}) — ${s === 'taken' ? 'নেওয়া হয়েছে' : s === 'missed' ? 'মিস হয়েছে' : 'অপেক্ষায়'}</span>
      </div>`;
    }).join('');

    const scalpHtml = scalpL ? `<div style="margin-top:.5rem;padding-top:.5rem;border-top:1px solid var(--border)">
      <div style="font-size:.72rem;font-weight:700;color:var(--text-soft);margin-bottom:.3rem">SCALP LOG</div>
      <div style="font-size:.8rem;display:grid;grid-template-columns:1fr 1fr;gap:.2rem">
        <span>চুলকানি: <b>${scalpL.itching}/10</b></span>
        <span>Dandruff: <b>${scalpL.dandruff}/10</b></span>
        <span>Scaling: <b>${scalpL.scaling}/10</b></span>
        <span>ব্যথা: <b>${scalpL.pain}/10</b></span>
      </div>
      ${scalpL.notes ? `<div style="font-size:.78rem;color:var(--text-mid);margin-top:.3rem">${scalpL.notes}</div>` : ''}
    </div>` : '';

    return `<div class="log-day-card">
      <div class="log-day-header">
        <div>
          <div class="log-day-date">দিন ${dayNum} — ${ds}</div>
          <div class="log-day-sub">${DAYS_BN[parseDate(ds).getDay()]}</div>
        </div>
        <span class="log-day-pill ${pillCls}">${pillTxt}</span>
      </div>
      <div class="log-day-body">
        ${medsHtml}${scalpHtml}
      </div>
    </div>`;
  }).join('');
}

function renderWeeklyLog() {
  const weeks = {};
  const d = new Date(START_DATE);
  const now = todayDate();
  while (d <= now) {
    const ds = fmtDate(d);
    const weekStart = new Date(d); weekStart.setDate(d.getDate() - d.getDay());
    const wk = fmtDate(weekStart);
    if (!weeks[wk]) weeks[wk] = [];
    weeks[wk].push(ds);
    d.setDate(d.getDate() + 1);
  }
  return Object.entries(weeks).reverse().map(([wk, days]) => {
    let t = 0, tk = 0;
    days.forEach(ds => { const c = getDayCompletion(ds); if (c) { t += c.total; tk += c.taken; } });
    const pct = t ? Math.round((tk / t) * 100) : 0;
    const weekEnd = new Date(parseDate(wk)); weekEnd.setDate(weekEnd.getDate() + 6);
    const pillCls = pct === 100 ? 'pill-100' : pct >= 50 ? 'pill-mid' : tk > 0 ? 'pill-low' : 'pill-zero';
    return `<div class="log-day-card">
      <div class="log-day-header">
        <div>
          <div class="log-day-date">${formatDisplayDate(parseDate(wk))} – ${formatDisplayDate(weekEnd)}</div>
          <div class="log-day-sub">${days.length} দিন tracked</div>
        </div>
        <span class="log-day-pill ${pillCls}">${pct}%</span>
      </div>
      <div class="log-day-body">
        <div style="font-size:.83rem">মোট ${tk}/${t} medicine নেওয়া হয়েছে</div>
      </div>
    </div>`;
  }).join('') || `<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-text">এখনো কোনো ডেটা নেই</div></div>`;
}

function renderMonthlyLog() {
  const months = {};
  const d = new Date(START_DATE);
  const now = todayDate();
  while (d <= now) {
    const ds = fmtDate(d);
    const mk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[mk]) months[mk] = [];
    months[mk].push(ds);
    d.setDate(d.getDate() + 1);
  }
  return Object.entries(months).reverse().map(([mk, days]) => {
    let t = 0, tk = 0;
    days.forEach(ds => { const c = getDayCompletion(ds); if (c) { t += c.total; tk += c.taken; } });
    const pct = t ? Math.round((tk / t) * 100) : 0;
    const [y, m] = mk.split('-');
    const pillCls = pct === 100 ? 'pill-100' : pct >= 50 ? 'pill-mid' : tk > 0 ? 'pill-low' : 'pill-zero';
    return `<div class="log-day-card">
      <div class="log-day-header">
        <div>
          <div class="log-day-date">${MONTHS[parseInt(m) - 1]} ${y}</div>
          <div class="log-day-sub">${days.length} দিন tracked</div>
        </div>
        <span class="log-day-pill ${pillCls}">${pct}%</span>
      </div>
      <div class="log-day-body">
        <div style="font-size:.83rem">মোট ${tk}/${t} medicine নেওয়া হয়েছে</div>
        <div style="font-size:.8rem;margin-top:.3rem;color:var(--text-mid)">Adherence: ${pct}%</div>
      </div>
    </div>`;
  }).join('') || `<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-text">এখনো কোনো ডেটা নেই</div></div>`;
}

// ── MODAL ─────────────────────────────────────────────────
function openMedModal(m) {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  box.innerHTML = `
    <div class="modal-handle"></div>
    <button class="modal-close" id="modal-close">✕</button>
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem">
      <span style="font-size:2rem">${m.icon}</span>
      <div>
        <div class="modal-title">${m.name}</div>
        <div class="modal-sub">${m.category} · ${m.activeIngredient}</div>
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">কেন দেওয়া হয়েছে</div>
      <div style="font-size:.85rem">${m.whyPrescribed}</div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">কীভাবে কাজ করে</div>
      <div style="font-size:.85rem">${m.howItWorks}</div>
    </div>
    ${m.method ? `<div class="modal-section">
      <div class="modal-section-title">ব্যবহার পদ্ধতি</div>
      <div style="font-size:.85rem">${m.method}</div>
    </div>` : ''}
    <div class="modal-section">
      <div class="modal-section-title">প্রত্যাশিত ফলাফল</div>
      <div style="font-size:.85rem">${m.expectedResults}</div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">সতর্কতা</div>
      <div class="warn-box"><span class="warn-icon">⚠️</span><span style="font-size:.82rem">${m.precautions}</span></div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">সম্ভাব্য পার্শ্বপ্রতিক্রিয়া</div>
      <div style="font-size:.85rem">${m.sideEffects}</div>
    </div>`;

  overlay.classList.remove('hidden');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ── SETTINGS / REMINDERS ─────────────────────────────────
function openSettings() {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  box.innerHTML = `
    <div class="modal-handle"></div>
    <button class="modal-close" id="modal-close">✕</button>
    <div class="modal-title">⚙️ Settings</div>
    <div class="modal-sub" style="margin-bottom:1rem">Reminders & Preferences</div>
    <div class="card" style="margin-bottom:1rem">
      ${renderToggle('morning', 'সকালের Reminder', 'সকাল ৮টায় সতর্কতা')}
      ${renderToggle('night', 'রাতের Reminder', 'রাত ১০টায় সতর্কতা')}
      ${renderToggle('shampoo', 'Shampoo Reminder', 'Shampoo-র দিন সতর্কতা')}
      ${renderToggle('followup', 'Follow-up Reminder', '১০ আগস্ট ২০২৬')}
    </div>
    <div class="card card-pad" style="margin-bottom:1rem">
      <div style="font-size:.85rem;font-weight:700;margin-bottom:.5rem">Shampoo দিন</div>
      <div style="font-size:.82rem;color:var(--text-mid)">বর্তমান: ${DAYS_BN[state.shampooDay1]} ও ${DAYS_BN[state.shampooDay2]}</div>
      <div style="font-size:.75rem;color:var(--text-soft);margin-top:.25rem">Routine page থেকে পরিবর্তন করুন</div>
    </div>
    <button class="submit-btn" style="background:var(--red);box-shadow:none" id="clear-data">সব ডেটা মুছে ফেলুন</button>`;

  overlay.classList.remove('hidden');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  overlay.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => {
      const key = t.dataset.key;
      state.reminders[key] = !state.reminders[key];
      t.classList.toggle('on', state.reminders[key]);
      if (state.reminders[key]) scheduleReminder(key);
      save();
    });
  });

  document.getElementById('clear-data')?.addEventListener('click', () => {
    if (confirm('সব ডেটা মুছে ফেলবেন? এটি undo করা যাবে না।')) {
      localStorage.removeItem('iftekhar_tracker');
      location.reload();
    }
  });
}

function renderToggle(key, label, sub) {
  const on = state.reminders[key];
  return `<div class="settings-item">
    <div><div class="settings-label">${label}</div><div class="settings-sub">${sub}</div></div>
    <div class="toggle ${on ? 'on' : ''}" data-key="${key}"></div>
  </div>`;
}

function scheduleReminder(key) {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(perm => {
    if (perm !== 'granted') return;
    const msgs = {
      morning: 'সকালের medicine নেওয়ার সময় হয়েছে! Biovel ২টি + Prosalic (Phase 1)',
      night: 'রাতের medicine নেওয়ার সময় হয়েছে! Fixal ২টি + Prosalic',
      shampoo: 'আজ Bistar Shampoo ব্যবহারের দিন!',
      followup: 'Dr. Sabrina Shahrin-এর Follow-up ১০ আগস্ট ২০২৬'
    };
    showToast('🔔 Reminder চালু হয়েছে');
    // Immediate demo notification
    setTimeout(() => {
      new Notification("Iftekhar's Treatment", {
        body: msgs[key],
        icon: 'icons/icon-192.png'
      });
    }, 2000);
  });
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast-el');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast-el';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── PWA INSTALL ───────────────────────────────────────────
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  state.installPrompt = e;
  if (state.currentPage === 'dashboard') renderPage('dashboard');
});

// ── SERVICE WORKER ────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { });
  });
}

// ── INIT ──────────────────────────────────────────────────
// document.addEventListener('DOMContentLoaded', () => {
//   load();

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear(); // 👈 এই লাইনটি নতুন যোগ করুন (শুধু একবারের জন্য)
  load();

  // ── এই ২ লাইনের কোডটি নতুন যোগ করুন ──
  state.currentPage = 'dashboard'; 
  save();

  // Splash
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    navigate('dashboard');
  }, 1900);

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
  });

  // Settings & Notifications
  document.getElementById('settings-btn').addEventListener('click', openSettings);
  document.getElementById('notif-btn').addEventListener('click', () => {
    if (!('Notification' in window)) { showToast('এই browser-এ notification সাপোর্ট নেই'); return; }
    Notification.requestPermission().then(p => {
      showToast(p === 'granted' ? '🔔 Notification চালু হয়েছে' : '❌ Permission দেওয়া হয়নি');
    });
  });
});
