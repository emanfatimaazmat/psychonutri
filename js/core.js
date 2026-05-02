// ============================================
// PSYCHONUTRI — CORE.JS
// Progress, Gamification, Storage, Animations
// ============================================

// ── STORAGE HELPERS ──────────────────────────
const Store = {
  get: (key) => { try { return JSON.parse(localStorage.getItem('pn_' + key)); } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem('pn_' + key, JSON.stringify(val)); } catch {} },
  update: (key, fn) => { Store.set(key, fn(Store.get(key))); }
};

// ── USER PROFILE ─────────────────────────────
const Profile = {
  init() {
    if (!Store.get('profile')) {
      Store.set('profile', {
        xp: 0, level: 1, streak: 0,
        lastVisit: null,
        completedModules: [],
        badges: [],
        archetypes: {},
        scores: {},
        totalSessions: 0
      });
    }
    this.checkStreak();
    return Store.get('profile');
  },

  get() { return Store.get('profile') || this.init(); },

  update(fn) {
    const p = this.get();
    const updated = fn(p);
    Store.set('profile', updated);
    return updated;
  },

  addXP(amount) {
    return this.update(p => {
      p.xp += amount;
      const newLevel = Math.floor(p.xp / 100) + 1;
      if (newLevel > p.level) {
        p.level = newLevel;
        showLevelUp(newLevel);
      }
      return p;
    });
  },

  completeModule(moduleId, score, archetype) {
    return this.update(p => {
      if (!p.completedModules.includes(moduleId)) {
        p.completedModules.push(moduleId);
        p.xp += 50;
      }
      p.scores[moduleId] = score;
      if (archetype) p.archetypes[moduleId] = archetype;
      p.totalSessions++;
      return p;
    });
  },

  unlockBadge(badgeId) {
    return this.update(p => {
      if (!p.badges.includes(badgeId)) {
        p.badges.push(badgeId);
        showBadgeUnlock(badgeId);
      }
      return p;
    });
  },

  checkStreak() {
    this.update(p => {
      const today = new Date().toDateString();
      const last = p.lastVisit;
      if (last === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      p.streak = (last === yesterday) ? p.streak + 1 : 1;
      p.lastVisit = today;
      return p;
    });
  },

  getLevelName(level) {
    const names = ['Seeker', 'Awakened', 'Shadow Reader', 'Mind Feeder', 'Oracle', 'Psycho Sage'];
    return names[Math.min(level - 1, names.length - 1)];
  }
};

// ── BADGES ───────────────────────────────────
const BADGES = {
  first_shadow: { icon: '🌑', name: 'Shadow Initiate', desc: 'Completed Feed Your Shadow' },
  mood_master: { icon: '🧪', name: 'Lab Technician', desc: 'Analysed brain chemistry' },
  craving_decoder: { icon: '🔥', name: 'Craving Cracker', desc: 'Decoded a craving' },
  plate_pro: { icon: '🍽️', name: 'Plate Reader', desc: 'Discovered food personality' },
  path_walker: { icon: '🧭', name: 'Path Walker', desc: 'Completed NutriPath journey' },
  mirror_seen: { icon: '🪞', name: 'Mirror Gazer', desc: 'Faced the mirror meal' },
  all_complete: { icon: '🏆', name: 'PsychoNutri Master', desc: 'Completed all 6 modules' },
  streak_3: { icon: '🔥', name: '3-Day Streak', desc: 'Visited 3 days in a row' },
  streak_7: { icon: '⚡', name: 'Week Warrior', desc: 'Visited 7 days in a row' },
};

// ── TOAST NOTIFICATIONS ──────────────────────
function showToast(msg, type = 'info', duration = 3500) {
  const existing = document.getElementById('pn-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'pn-toast';
  const colors = { info: '#38bdf8', success: '#4ade80', xp: '#f0c060', badge: '#c084fc' };
  toast.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;z-index:9999;
    background:#1a1a2e;border:1px solid ${colors[type] || colors.info};
    color:#f0ebe0;padding:0.9rem 1.4rem;border-radius:12px;
    font-family:'Inter',sans-serif;font-size:0.88rem;line-height:1.5;
    box-shadow:0 8px 30px rgba(0,0,0,0.5);max-width:280px;
    animation:toastIn 0.4s ease;
  `;
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toastOut 0.4s ease forwards'; setTimeout(() => toast.remove(), 400); }, duration);
}

function showLevelUp(level) {
  showToast(`⚡ Level Up! You are now <strong>${Profile.getLevelName(level)}</strong> (Level ${level})`, 'xp', 4000);
}

function showBadgeUnlock(badgeId) {
  const b = BADGES[badgeId];
  if (b) showToast(`${b.icon} Badge Unlocked: <strong>${b.name}</strong><br><span style="opacity:0.6;font-size:0.78rem">${b.desc}</span>`, 'badge', 4500);
}

// ── XP FLASH ─────────────────────────────────
function flashXP(amount, x, y) {
  const el = document.createElement('div');
  el.textContent = '+' + amount + ' XP';
  el.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;z-index:9998;
    color:#f0c060;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;
    pointer-events:none;animation:xpFloat 1.2s ease forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ── TYPEWRITER ────────────────────────────────
function typeWriter(el, text, speed = 28, callback) {
  el.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'animation:blink 0.7s step-end infinite;opacity:0.7';
  el.appendChild(cursor);
  const interval = setInterval(() => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
      cursor.remove();
      if (callback) callback();
    }
  }, speed);
}

// ── ANIMATED COUNTER ─────────────────────────
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const from = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * ease) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── SCROLL REVEAL ─────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Counter animation
        const counter = e.target.querySelector('[data-count]');
        if (counter && !counter.dataset.counted) {
          counter.dataset.counted = true;
          animateCounter(counter, parseInt(counter.dataset.count), 1800, counter.dataset.suffix || '');
        }
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── CUSTOM CURSOR ─────────────────────────────
function initCursor(color = '#f0c060') {
  if (window.matchMedia('(pointer:coarse)').matches) return; // skip on mobile
  const cursor = document.createElement('div');
  const trail = document.createElement('div');
  cursor.id = 'pn-cursor';
  trail.id = 'pn-trail';
  cursor.style.cssText = `position:fixed;width:10px;height:10px;border-radius:50%;background:${color};pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:transform 0.1s,opacity 0.3s;mix-blend-mode:difference`;
  trail.style.cssText = `position:fixed;width:28px;height:28px;border-radius:50%;border:1.5px solid ${color};pointer-events:none;z-index:99998;transform:translate(-50%,-50%);opacity:0.4;transition:left 0.12s ease,top 0.12s ease`;
  document.body.appendChild(cursor);
  document.body.appendChild(trail);
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
  document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
}

// ── PARTICLES ─────────────────────────────────
function initParticles(containerId, colors, count = 25) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;border-radius:50%;
      width:${Math.random() * 4 + 1}px;height:${Math.random() * 4 + 1}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;bottom:0;
      --dx:${(Math.random() - 0.5) * 100}px;
      --op:${Math.random() * 0.2 + 0.05};
      animation:pFloat linear infinite;
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 15}s;
    `;
    c.appendChild(p);
  }
}

// ── LOADING SCREEN ────────────────────────────
function initLoader(title, subtitle, color) {
  const loader = document.createElement('div');
  loader.id = 'pn-loader';
  loader.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:#08060a;display:flex;flex-direction:column;
    align-items:center;justify-content:center;text-align:center;
    font-family:'Syne',sans-serif;
  `;
  loader.innerHTML = `
    <div style="font-size:3rem;margin-bottom:1rem;animation:spin 2s linear infinite">${title}</div>
    <div style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:${color};margin-bottom:2rem">${subtitle}</div>
    <div style="width:180px;height:2px;background:rgba(255,255,255,0.08);border-radius:1px;overflow:hidden">
      <div id="loader-bar" style="height:100%;width:0%;background:${color};border-radius:1px;transition:width 0.3s ease"></div>
    </div>
  `;
  document.body.appendChild(loader);
  let prog = 0;
  const interval = setInterval(() => {
    prog += Math.random() * 15;
    if (prog >= 100) { prog = 100; clearInterval(interval); }
    const bar = document.getElementById('loader-bar');
    if (bar) bar.style.width = prog + '%';
  }, 150);
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });
}

// ── AMBIENT AUDIO ─────────────────────────────
const Audio = {
  ctx: null,
  nodes: [],
  playing: false,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  },

  playTone(freq, type = 'sine', vol = 0.03, duration = 4) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  },

  startAmbient(type = 'shadow') {
    if (!this.ctx) this.init();
    if (this.playing) return;
    this.playing = true;
    const configs = {
      shadow: { freqs: [55, 82, 110], type: 'sine', vol: 0.025 },
      lab: { freqs: [220, 330, 440], type: 'triangle', vol: 0.02 },
      craving: { freqs: [110, 165, 220], type: 'sawtooth', vol: 0.015 },
    };
    const cfg = configs[type] || configs.shadow;
    const loop = () => {
      if (!this.playing) return;
      const freq = cfg.freqs[Math.floor(Math.random() * cfg.freqs.length)];
      this.playTone(freq + Math.random() * 10, cfg.type, cfg.vol, 4);
      setTimeout(loop, 3000 + Math.random() * 2000);
    };
    loop();
  },

  stop() { this.playing = false; }
};

// ── PROGRESS BAR (top) ────────────────────────
function initTopProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `position:fixed;top:0;left:0;height:2px;z-index:10000;background:linear-gradient(90deg,#7c3aed,#f0c060);transition:width 0.3s;width:0%`;
  document.body.appendChild(bar);
  document.addEventListener('scroll', () => {
    const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  });
}

// ── TOOLTIP ───────────────────────────────────
function initTooltips() {
  document.querySelectorAll('[data-tip]').forEach(el => {
    el.style.position = 'relative';
    el.style.cursor = 'help';
    el.addEventListener('mouseenter', function () {
      const tip = document.createElement('div');
      tip.className = 'pn-tip';
      tip.textContent = this.dataset.tip;
      tip.style.cssText = `
        position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
        background:#1a1a2e;border:1px solid rgba(240,192,96,0.3);color:#e8d5b0;
        padding:0.5rem 0.8rem;border-radius:8px;font-size:0.78rem;line-height:1.5;
        white-space:nowrap;max-width:220px;white-space:normal;z-index:9990;
        box-shadow:0 4px 20px rgba(0,0,0,0.4);animation:tipIn 0.2s ease;
      `;
      this.appendChild(tip);
    });
    el.addEventListener('mouseleave', function () {
      const tip = this.querySelector('.pn-tip');
      if (tip) tip.remove();
    });
  });
}

// ── SHARE CARD CANVAS ─────────────────────────
function generateShareCard(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 600; canvas.height = 340;
  // Background
  const grad = ctx.createLinearGradient(0, 0, 600, 340);
  grad.addColorStop(0, data.bgFrom || '#0d0810');
  grad.addColorStop(1, data.bgTo || '#1a0d26');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 340);
  // Border
  ctx.strokeStyle = data.accent || '#c9a96e';
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, 598, 338);
  // Top label
  ctx.fillStyle = data.accent || '#c9a96e';
  ctx.font = '500 11px Inter, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('PSYCHONUTRI · ' + (data.module || 'PROFILE').toUpperCase(), 30, 35);
  // Archetype
  ctx.fillStyle = data.accent || '#c9a96e';
  ctx.font = 'bold 32px Syne, sans-serif';
  ctx.fillText(data.archetype || 'The Shadow Self', 30, 90);
  // Quote
  ctx.fillStyle = 'rgba(240,235,224,0.6)';
  ctx.font = 'italic 15px Crimson Text, serif';
  const words = (data.quote || '').split(' ');
  let line = '', y = 130;
  words.forEach(w => {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > 540) { ctx.fillText(line, 30, y); line = w + ' '; y += 22; }
    else line = test;
  });
  ctx.fillText(line, 30, y);
  // Score
  ctx.fillStyle = data.accent || '#c9a96e';
  ctx.font = 'bold 20px Syne, sans-serif';
  ctx.fillText((data.score || '0') + ' Points', 30, 260);
  // Level
  ctx.fillStyle = 'rgba(240,235,224,0.4)';
  ctx.font = '13px Inter, sans-serif';
  ctx.fillText('Level ' + (data.level || 1) + ' · ' + (data.levelName || 'Seeker'), 30, 285);
  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, 305); ctx.lineTo(570, 305); ctx.stroke();
  // Footer
  ctx.fillStyle = 'rgba(240,235,224,0.25)';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('psychonutri.github.io  ·  Nutrition meets Psychology', 30, 325);
  return canvas;
}

function downloadCard(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || 'psychonutri-profile.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ── GLOBAL CSS INJECTOR ───────────────────────
function injectGlobalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pFloat { 0%{transform:translateY(100vh);opacity:0} 10%{opacity:var(--op)} 90%{opacity:calc(var(--op)*0.4)} 100%{transform:translateY(-5vh) translateX(var(--dx));opacity:0} }
    @keyframes toastIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
    @keyframes toastOut { to{opacity:0;transform:translateX(20px)} }
    @keyframes xpFloat { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-50px)} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes tipIn { from{opacity:0;transform:translateX(-50%) translateY(4px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .reveal { opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease }
    .reveal.visible { opacity:1;transform:none }
    * { cursor: none !important }
    a, button { cursor: none !important }
  `;
  document.head.appendChild(style);
}

// ── INIT ON LOAD ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectGlobalStyles();
  Profile.init();
  initScrollReveal();
  initTopProgress();
  setTimeout(initTooltips, 500);
});
