// ============================================
// PSYCHONUTRI — DASHBOARD.JS
// Master Dashboard, Charts, Progress
// ============================================

const MODULE_META = {
  shadow:   { name: 'Feed Your Shadow',        icon: '🌑', color: '#8b4a6e', badge: 'first_shadow',    page: 'pages/shadow.html' },
  moodlab:  { name: 'The Mood Lab',             icon: '🧪', color: '#38bdf8', badge: 'mood_master',     page: 'pages/moodlab.html' },
  craving:  { name: 'The Craving Decoder',      icon: '🔥', color: '#fb923c', badge: 'craving_decoder', page: 'pages/craving.html' },
  plate:    { name: 'Your Plate, Personality',  icon: '🍽️', color: '#4ade80', badge: 'plate_pro',       page: 'pages/plate.html' },
  nutripath:{ name: 'NutriPath',                icon: '🧭', color: '#2dd4bf', badge: 'path_walker',     page: 'pages/nutripath.html' },
  mirror:   { name: 'The Mirror Meal',          icon: '🪞', color: '#f472b6', badge: 'mirror_seen',     page: 'pages/mirror.html' },
};

function renderDashboard() {
  const p = Profile.get();
  const container = document.getElementById('dashboard-root');
  if (!container) return;

  const completed = p.completedModules.length;
  const total = Object.keys(MODULE_META).length;
  const pct = Math.round((completed / total) * 100);
  const xpToNext = 100 - (p.xp % 100);

  container.innerHTML = `
    <div class="db-hero">
      <div class="db-hero-left">
        <div class="db-level-badge">Level ${p.level}</div>
        <div class="db-title">${Profile.getLevelName(p.level)}</div>
        <div class="db-sub">${p.xp} XP total · ${p.streak} day streak</div>
        <div class="db-xp-bar-wrap">
          <div class="db-xp-label"><span>XP Progress</span><span>${p.xp % 100}/100 → Level ${p.level + 1}</span></div>
          <div class="db-xp-bar"><div class="db-xp-fill" style="width:${p.xp % 100}%"></div></div>
        </div>
      </div>
      <div class="db-hero-right">
        <div class="db-ring-wrap">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ringGrad)" stroke-width="8"
              stroke-dasharray="${2 * Math.PI * 50}" stroke-dashoffset="${2 * Math.PI * 50 * (1 - pct / 100)}"
              stroke-linecap="round" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 1.5s ease"/>
            <defs><linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#f0c060"/>
            </linearGradient></defs>
          </svg>
          <div class="db-ring-text"><span class="db-ring-num">${pct}%</span><span class="db-ring-lbl">Complete</span></div>
        </div>
      </div>
    </div>

    <div class="db-stats-row">
      <div class="db-stat"><div class="db-stat-n" data-count="${completed}" data-suffix="">${completed}</div><div class="db-stat-l">Modules Done</div></div>
      <div class="db-stat"><div class="db-stat-n" data-count="${p.xp}" data-suffix=" XP">${p.xp} XP</div><div class="db-stat-l">Total XP</div></div>
      <div class="db-stat"><div class="db-stat-n" data-count="${p.streak}" data-suffix="">${p.streak}</div><div class="db-stat-l">Day Streak</div></div>
      <div class="db-stat"><div class="db-stat-n" data-count="${p.badges.length}" data-suffix="">${p.badges.length}</div><div class="db-stat-l">Badges</div></div>
    </div>

    <div class="db-section-title">Your Modules</div>
    <div class="db-modules-grid">
      ${Object.entries(MODULE_META).map(([id, m]) => {
        const done = p.completedModules.includes(id);
        const score = p.scores[id] || 0;
        const arch = p.archetypes[id] || '';
        return `
        <a href="${m.page}" class="db-module-card ${done ? 'done' : ''}" style="--mc:${m.color}">
          <div class="db-mc-icon">${m.icon}</div>
          <div class="db-mc-name">${m.name}</div>
          ${arch ? `<div class="db-mc-arch">${arch}</div>` : '<div class="db-mc-arch" style="opacity:0.3">Not completed</div>'}
          ${done ? `<div class="db-mc-score">${score} pts</div><div class="db-mc-done">✓</div>` : `<div class="db-mc-cta">Start →</div>`}
        </a>`;
      }).join('')}
    </div>

    ${Object.keys(p.archetypes).length > 0 ? `
    <div class="db-section-title">Your Shadow Map</div>
    <div class="db-map-wrap">
      <canvas id="radarChart" width="300" height="300"></canvas>
    </div>` : ''}

    <div class="db-section-title">Badges (${p.badges.length}/${Object.keys(BADGES).length})</div>
    <div class="db-badges-grid">
      ${Object.entries(BADGES).map(([id, b]) => {
        const unlocked = p.badges.includes(id);
        return `<div class="db-badge ${unlocked ? 'unlocked' : 'locked'}">
          <div class="db-badge-icon">${b.icon}</div>
          <div class="db-badge-name">${b.name}</div>
          <div class="db-badge-desc">${b.desc}</div>
        </div>`;
      }).join('')}
    </div>

    ${completed === total ? `
    <div class="db-master-card">
      <div style="font-size:3rem;margin-bottom:1rem">🏆</div>
      <div class="db-master-title">PsychoNutri Master</div>
      <div class="db-master-sub">You have completed all 6 modules. Your psychological nutrition profile is complete.</div>
      <canvas id="shareCardCanvas" style="border-radius:8px;margin-top:1.5rem;max-width:100%"></canvas>
      <button onclick="generateAndDownload()" class="db-download-btn">⬇ Download Profile Card</button>
    </div>` : ''}
  `;

  // Draw radar chart if scores exist
  if (Object.keys(p.archetypes).length > 0) {
    setTimeout(() => drawRadar(), 300);
  }

  // Generate share card if all complete
  if (completed === total) {
    setTimeout(() => {
      generateShareCard('shareCardCanvas', {
        module: 'MASTER PROFILE',
        archetype: Profile.getLevelName(p.level),
        quote: 'You have faced all six shadows. Your relationship with food has been transformed.',
        score: p.xp,
        level: p.level,
        levelName: Profile.getLevelName(p.level),
        bgFrom: '#0a0610', bgTo: '#1a0d26', accent: '#f0c060'
      });
    }, 500);
  }
}

function drawRadar() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const p = Profile.get();
  const modules = Object.keys(MODULE_META);
  const scores = modules.map(id => (p.scores[id] || 0));
  const maxScore = Math.max(...scores, 30);
  const cx = 150, cy = 150, r = 100;
  const n = modules.length;

  ctx.clearRect(0, 0, 300, 300);

  // Grid circles
  [0.25, 0.5, 0.75, 1].forEach(ratio => {
    ctx.beginPath();
    ctx.arc(cx, cy, r * ratio, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Axis lines
  modules.forEach((_, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.stroke();
  });

  // Data polygon
  ctx.beginPath();
  modules.forEach((id, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    const val = Math.max(0.1, (p.scores[id] || 0) / maxScore);
    const x = cx + Math.cos(a) * r * val;
    const y = cy + Math.sin(a) * r * val;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(124,58,237,0.2)';
  ctx.fill();
  ctx.strokeStyle = '#f0c060';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Icons
  modules.forEach((id, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * (r + 18);
    const y = cy + Math.sin(a) * (r + 18);
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(MODULE_META[id].icon, x, y);
  });
}

function generateAndDownload() {
  const p = Profile.get();
  generateShareCard('shareCardCanvas', {
    module: 'MASTER PROFILE',
    archetype: Profile.getLevelName(p.level),
    quote: 'You have faced all six shadows. Your relationship with food has been transformed.',
    score: p.xp,
    level: p.level,
    levelName: Profile.getLevelName(p.level),
    bgFrom: '#0a0610', bgTo: '#1a0d26', accent: '#f0c060'
  });
  setTimeout(() => downloadCard('shareCardCanvas', 'psychonutri-master-profile.png'), 300);
}

function resetProfile() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
}

document.addEventListener('DOMContentLoaded', renderDashboard);
