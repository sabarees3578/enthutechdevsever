// =============================
//  WELCOME PAGE - JAVASCRIPT
// =============================

// Particle Canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.life = 0;
    this.maxLife = 100 + Math.random() * 200;
    this.size = 1 + Math.random() * 2;
    this.colors = ['rgba(108,99,255,', 'rgba(0,212,255,', 'rgba(0,229,160,'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
      this.reset();
  }
  draw() {
    const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha + ')';
    ctx.fill();
  }
}

// Init particles
for (let i = 0; i < 80; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ---- Tab switching ----
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
  }
}

// ---- Auth Handlers ----
function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  text.classList.add('hidden');
  loader.classList.remove('hidden');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
}

function handleDemoLogin() {
  window.location.href = 'dashboard.html';
}

function handleRegister(e) {
  e.preventDefault();
  window.location.href = 'dashboard.html';
}

// ---- Password Toggle ----
function togglePass(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

// ---- Animated Counters ----
function animateCounter(id, target, suffix = '', duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = (target / duration) * 16;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }
  }, 16);
}

setTimeout(() => {
  animateCounter('counterDevices', 12400, '+');
  animateCounter('counterUsers', 3800, '+');
}, 500);

// ---- Live Preview Values ----
function updateLiveValues() {
  const temp = (26 + Math.random() * 5).toFixed(1);
  const humid = Math.floor(55 + Math.random() * 15);
  const power = (2.8 + Math.random() * 0.8).toFixed(1);
  document.getElementById('liveTemp').textContent = temp + '°C';
  document.getElementById('liveHumid').textContent = humid + '%';
  document.getElementById('livePower').textContent = power + ' kW';
}
setInterval(updateLiveValues, 3000);
