// ==================================
//  ENTHU TECH IoT DASHBOARD - JS
// ==================================

// ---- DATA ----
const DEVICES = [
    { id: 1, name: 'Living Room Sensor', type: 'Temperature & Humidity', icon: '🌡️', location: 'Living Room', status: 'online', temp: 27.4, humid: 58, battery: 82, lastSeen: 'Just now', tag: 'sensor', color: 'rgba(108,99,255,0.12)' },
    { id: 2, name: 'Kitchen Monitor', type: 'Multi-Sensor', icon: '🍳', location: 'Kitchen', status: 'online', temp: 31.2, humid: 65, battery: 65, lastSeen: '1 min ago', tag: 'sensor', color: 'rgba(255,107,53,0.12)' },
    { id: 3, name: 'Bedroom Climate', type: 'Temperature Sensor', icon: '🛏️', location: 'Bedroom', status: 'online', temp: 24.1, humid: 52, battery: 91, lastSeen: 'Just now', tag: 'sensor', color: 'rgba(0,212,255,0.1)' },
    { id: 4, name: 'Garage Node', type: 'Motion + Temp', icon: '🚗', location: 'Garage', status: 'offline', temp: null, humid: null, battery: 12, lastSeen: '3 hrs ago', tag: 'sensor', color: 'rgba(74,78,106,0.15)' },
    { id: 5, name: 'Smart AC Unit', type: 'Actuator', icon: '❄️', location: 'Living Room', status: 'online', temp: null, humid: null, power: 1800, battery: null, lastSeen: 'Just now', tag: 'actuator', color: 'rgba(0,229,160,0.1)' },
    { id: 6, name: 'Garden Irrigation', type: 'Smart Valve', icon: '🌿', location: 'Garden', status: 'online', temp: 33.0, humid: 40, battery: 78, lastSeen: '5 min ago', tag: 'actuator', color: 'rgba(0,229,160,0.08)' },
    { id: 7, name: 'Rooftop Weather', type: 'Weather Station', icon: '🛰️', location: 'Rooftop', status: 'online', temp: 36.5, humid: 39, battery: 100, lastSeen: 'Just now', tag: 'sensor', color: 'rgba(108,99,255,0.1)' },
    { id: 8, name: 'Entrance Security', type: 'Motion + Camera', icon: '🔒', location: 'Entrance', status: 'online', temp: null, humid: null, battery: 55, lastSeen: '2 min ago', tag: 'sensor', color: 'rgba(255,71,87,0.08)' },
];

const ACTIVITY = [
    { color: '#00E5A0', text: '<strong>Living Room Sensor</strong> reported 27.4°C', time: 'Just now' },
    { color: '#6C63FF', text: '<strong>Smart AC Unit</strong> turned on automatically', time: '4 min ago' },
    { color: '#FF6B35', text: '<strong>Rooftop Weather</strong> – temperature above 36°C threshold', time: '12 min ago' },
    { color: '#00D4FF', text: '<strong>Garden Irrigation</strong> started scheduled cycle', time: '22 min ago' },
    { color: '#FF4757', text: '<strong>Garage Node</strong> went offline', time: '3 hrs ago' },
    { color: '#00E5A0', text: '<strong>Kitchen Monitor</strong> humidity normalised', time: '4 hrs ago' },
];

const AUTOMATIONS = [
    { icon: '🌙', name: 'Night Mode', desc: 'Dim all lights and lower AC at 10 PM', status: 'enabled', trigger: 'Time-based' },
    { icon: '🌡️', name: 'Over-temp Alert', desc: 'Send notification if any room exceeds 35°C', status: 'enabled', trigger: 'Sensor-based' },
    { icon: '💧', name: 'Auto Irrigation', desc: 'Water garden every morning at 6 AM for 15 mins', status: 'enabled', trigger: 'Time-based' },
    { icon: '🔒', name: 'Security Lock', desc: 'Lock doors automatically when nobody is home', status: 'disabled', trigger: 'Presence-based' },
];

const ALERTS_DATA = [
    { level: 'critical', icon: '🌡️', title: 'Temperature Alert – Node-3', desc: 'Rooftop temperature exceeded the configured threshold of 35°C. Current reading: 36.5°C', time: '12 min ago' },
    { level: 'warning', icon: '⚡', title: 'High Power Consumption – AC Unit', desc: 'Smart AC Unit is drawing 1800W, which is above the 1500W warning threshold.', time: '30 min ago' },
    { level: 'info', icon: '🔋', title: 'Low Battery – Garage Node', desc: 'Garage Node battery is at 12%. Please replace or charge soon.', time: '1 hour ago' },
    { level: 'info', icon: '📡', title: 'Device came back online', desc: 'Entrance Security Camera reconnected after brief disconnection.', time: '2 hours ago' },
];

const TEAM_DATA = [
    { initials: 'JD', name: 'John Doe', role: 'Admin', status: 'active', color: 'linear-gradient(135deg,#6C63FF,#00D4FF)' },
    { initials: 'SA', name: 'Sara Ahmed', role: 'Engineer', status: 'active', color: 'linear-gradient(135deg,#00E5A0,#00B4D8)' },
    { initials: 'RK', name: 'Rohan Kumar', role: 'Viewer', status: 'inactive', color: 'linear-gradient(135deg,#FF6B35,#FF4757)' },
    { initials: 'PM', name: 'Priya M.', role: 'Engineer', status: 'active', color: 'linear-gradient(135deg,#FFD32A,#FF6B35)' },
];

const QUICK_CONTROLS = [
    { name: 'Smart AC', location: 'Living Room', icon: '❄️', on: true },
    { name: 'Garden Light', location: 'Garden', icon: '💡', on: false },
    { name: 'Irrigation', location: 'Garden', icon: '🌿', on: true },
    { name: 'Security', location: 'Entrance', icon: '🔒', on: true },
];

// ---- CLOCK ----
function updateClock() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const el = document.getElementById('topbarClock');
    if (el) el.textContent = `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

// ---- PAGE NAVIGATION ----
function setPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const page = document.getElementById('page-' + id);
    if (page) page.classList.add('active');
    if (el) el.classList.add('active');
    const titleMap = {
        dashboard: 'Dashboard', devices: 'Devices', analytics: 'Analytics',
        automations: 'Automations', alerts: 'Alerts', datalog: 'Data Log',
        team: 'Team', settings: 'Settings'
    };
    const t = document.getElementById('pageTitle');
    if (t) t.textContent = titleMap[id] || id;

    // Lazy init pages
    if (id === 'analytics') initAnalyticsCharts();
    if (id === 'devices') renderDevices('all');
    if (id === 'automations') renderAutomations();
    if (id === 'alerts') renderAlerts();
    if (id === 'datalog') renderDataLog();
    if (id === 'team') renderTeam();
    if (id === 'settings') renderSettings();

    closeSidebar();
}

// ---- NOTIFICATIONS ----
function toggleNotif() {
    const panel = document.getElementById('notifPanel');
    panel.classList.toggle('hidden');
}
function markAllRead() {
    document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
    const badge = document.querySelector('.notif-badge');
    if (badge) badge.textContent = '0';
    document.getElementById('notifPanel').classList.add('hidden');
}
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notifPanel');
    const btn = document.getElementById('notifBtn');
    if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.add('hidden');
    }
});

// ---- SIDEBAR TOGGLE ----
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}
function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.add('open');
    overlay.classList.add('show');
}
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

// ---- MODAL ----
function showAddDevice() {
    document.getElementById('addDeviceModal').classList.remove('hidden');
}
function closeModal() {
    document.getElementById('addDeviceModal').classList.add('hidden');
}

// ---- THEME TOGGLE ----
let lightMode = false;
function toggleTheme() {
    lightMode = !lightMode;
    if (lightMode) {
        document.documentElement.style.setProperty('--bg-primary', '#f0f2f8');
        document.documentElement.style.setProperty('--bg-secondary', '#e4e8f0');
        document.documentElement.style.setProperty('--bg-card', '#fff');
        document.documentElement.style.setProperty('--bg-sidebar', '#fff');
        document.documentElement.style.setProperty('--text-primary', '#1a1d30');
        document.documentElement.style.setProperty('--text-secondary', '#5a5f7a');
        document.documentElement.style.setProperty('--text-muted', '#9093a8');
        document.documentElement.style.setProperty('--border', 'rgba(0,0,0,0.08)');
    } else {
        document.documentElement.style.setProperty('--bg-primary', '#0a0d1a');
        document.documentElement.style.setProperty('--bg-secondary', '#0f1326');
        document.documentElement.style.setProperty('--bg-card', '#141828');
        document.documentElement.style.setProperty('--bg-sidebar', '#0c1020');
        document.documentElement.style.setProperty('--text-primary', '#EAEAF4');
        document.documentElement.style.setProperty('--text-secondary', '#8B8FA8');
        document.documentElement.style.setProperty('--text-muted', '#4A4E6A');
        document.documentElement.style.setProperty('--border', 'rgba(255,255,255,0.07)');
    }
}

// ===============================
//  CHARTS
// ===============================
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }, tooltip: {
            backgroundColor: 'rgba(20,24,40,0.95)',
            borderColor: 'rgba(108,99,255,0.3)',
            borderWidth: 1,
            titleColor: '#EAEAF4',
            bodyColor: '#8B8FA8',
            padding: 10,
            cornerRadius: 10,
        }
    },
    scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false }, ticks: { color: '#4A4E6A', font: { family: 'Poppins', size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false }, ticks: { color: '#4A4E6A', font: { family: 'Poppins', size: 10 } } },
    }
};

function makeLabels(count, unit = 'h') {
    return Array.from({ length: count }, (_, i) => {
        const d = new Date();
        d.setHours(d.getHours() - (count - 1 - i));
        return d.getHours() + ':00';
    });
}

function randomArray(n, min, max) {
    return Array.from({ length: n }, () => +(min + Math.random() * (max - min)).toFixed(1));
}

// Main Chart
let mainChart;
function initMainChart() {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    const labels = makeLabels(24);
    const tempData = randomArray(24, 24, 34);
    const humidData = randomArray(24, 45, 75);

    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: tempData,
                    borderColor: '#6C63FF',
                    backgroundColor: 'rgba(108,99,255,0.08)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                },
                {
                    label: 'Humidity (%)',
                    data: humidData,
                    borderColor: '#00D4FF',
                    backgroundColor: 'rgba(0,212,255,0.06)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                }
            ]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: { color: '#8B8FA8', font: { family: 'Poppins', size: 11 }, usePointStyle: true, pointStyleWidth: 8, boxHeight: 6 }
                }
            }
        }
    });
}

function setChartRange(btn, range) {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const counts = { day: 24, week: 7, month: 30 };
    const n = counts[range] || 24;
    const labels = range === 'week'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : range === 'month'
            ? Array.from({ length: 30 }, (_, i) => `${i + 1}`)
            : makeLabels(24);
    if (mainChart) {
        mainChart.data.labels = labels;
        mainChart.data.datasets[0].data = randomArray(n, 24, 34);
        mainChart.data.datasets[1].data = randomArray(n, 45, 75);
        mainChart.update('active');
    }
}

// Power Chart
let powerChart;
let powerData = randomArray(20, 2.0, 4.5);
function initPowerChart() {
    const ctx = document.getElementById('powerChart');
    if (!ctx) return;
    const labels = Array.from({ length: 20 }, (_, i) => '');
    powerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                data: powerData,
                borderColor: '#00E5A0',
                backgroundColor: 'rgba(0,229,160,0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2,
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                x: { display: false },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#4A4E6A', font: { family: 'Poppins', size: 9 } }, min: 0, max: 6 }
            }
        }
    });
}

// Update power chart live
setInterval(() => {
    if (!powerChart) return;
    const newVal = +(2.0 + Math.random() * 2.5).toFixed(2);
    powerData.push(newVal);
    powerData.shift();
    powerChart.data.datasets[0].data = [...powerData];
    powerChart.update('none');
    const pv = document.getElementById('powerTotal');
    if (pv) pv.textContent = newVal.toFixed(1);
}, 2000);

// Gauge via Canvas arc
function drawGauge(canvasId, value, min, max, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H - 2;
    const r = Math.min(W, H) - 16;
    const startA = Math.PI;
    const endA = 2 * Math.PI;
    const pct = Math.min(Math.max((value - min) / (max - min), 0), 1);
    const valueA = startA + pct * Math.PI;

    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, r / 2, startA, endA);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Fill
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, color + '99');
    grad.addColorStop(1, color);
    ctx.beginPath();
    ctx.arc(cx, cy, r / 2, startA, valueA);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
}

let gaugeTemp = 28.4, gaugeHumid = 62, gaugePower = 3.2, gaugeAir = 72;

function updateGauges() {
    gaugeTemp = +(26 + Math.random() * 5).toFixed(1);
    gaugeHumid = Math.round(55 + Math.random() * 15);
    gaugePower = +(2.5 + Math.random() * 2).toFixed(1);
    gaugeAir = Math.round(60 + Math.random() * 30);

    drawGauge('tempGauge', gaugeTemp, 15, 45, '#6C63FF');
    drawGauge('humidGauge', gaugeHumid, 0, 100, '#00D4FF');
    drawGauge('powerGauge', gaugePower, 0, 6, '#00E5A0');
    drawGauge('airGauge', gaugeAir, 0, 100, '#FFD32A');

    const airLabel = gaugeAir > 80 ? 'Good' : gaugeAir > 60 ? 'Fair' : 'Poor';
    const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    el('gaugeTemp', gaugeTemp + '°C');
    el('gaugeHumid', gaugeHumid + '%');
    el('gaugePower', gaugePower + ' kW');
    el('gaugeAir', airLabel);
}

// ---- DEVICE LIST (dashboard widget) ----
function renderDeviceList() {
    const container = document.getElementById('deviceList');
    if (!container) return;
    container.innerHTML = DEVICES.slice(0, 5).map(d => `
    <div class="device-list-item">
      <div class="device-list-icon" style="background:${d.color}">${d.icon}</div>
      <div class="device-list-info">
        <div class="device-list-name">${d.name}</div>
        <div class="device-list-location">${d.location}</div>
      </div>
      <div class="device-list-status ${d.status === 'online' ? 'dot-online' : 'dot-offline'}">
        <span>●</span> ${d.status}
      </div>
      <div class="device-list-val">${d.temp ? d.temp + '°C' : d.power ? d.power + 'W' : '—'}</div>
    </div>
  `).join('');
}

// ---- QUICK CONTROLS ----
function renderQuickControls() {
    const container = document.getElementById('quickControls');
    if (!container) return;
    container.innerHTML = QUICK_CONTROLS.map((c, i) => `
    <div class="control-item">
      <div class="control-top">
        <span style="font-size:1.3rem">${c.icon}</span>
        <label class="toggle">
          <input type="checkbox" id="ctrl${i}" ${c.on ? 'checked' : ''} onchange="toggleControl(${i},this)">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div>
        <div class="control-name">${c.name}</div>
        <div class="control-loc">${c.location}</div>
        <div class="control-status ${c.on ? 'on' : ''}" id="ctrlStatus${i}">${c.on ? 'Active' : 'Off'}</div>
      </div>
    </div>
  `).join('');
}

function toggleControl(i, el) {
    QUICK_CONTROLS[i].on = el.checked;
    const s = document.getElementById('ctrlStatus' + i);
    if (s) { s.textContent = el.checked ? 'Active' : 'Off'; s.className = 'control-status' + (el.checked ? ' on' : ''); }
}

// ---- ACTIVITY ----
function renderActivity() {
    const container = document.getElementById('activityList');
    if (!container) return;
    container.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </div>
  `).join('');
}

// ---- DEVICES PAGE ----
let currentFilter = 'all';
function renderDevices(filter) {
    currentFilter = filter;
    const container = document.getElementById('devicesGrid');
    if (!container) return;
    let list = DEVICES;
    if (filter === 'online') list = DEVICES.filter(d => d.status === 'online');
    else if (filter === 'offline') list = DEVICES.filter(d => d.status === 'offline');
    else if (filter === 'sensor') list = DEVICES.filter(d => d.tag === 'sensor');
    else if (filter === 'actuator') list = DEVICES.filter(d => d.tag === 'actuator');

    container.innerHTML = list.map(d => `
    <div class="device-card">
      <div class="device-card-header">
        <div class="device-card-icon" style="background:${d.color}">${d.icon}</div>
        <div class="device-card-status ${d.status === 'online' ? 'status-online' : 'status-offline'}">
          ● ${d.status === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>
      <div class="device-card-name">${d.name}</div>
      <div class="device-card-type">${d.type}</div>
      <div class="device-card-location">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${d.location}
      </div>
      <div class="device-card-data">
        ${d.temp != null ? `<div class="device-data-point"><span class="device-data-val" style="color:#6C63FF">${d.temp}°C</span><span class="device-data-lbl">Temp</span></div>` : ''}
        ${d.humid != null ? `<div class="device-data-point"><span class="device-data-val" style="color:#00D4FF">${d.humid}%</span><span class="device-data-lbl">Humidity</span></div>` : ''}
        ${d.power != null ? `<div class="device-data-point"><span class="device-data-val" style="color:#00E5A0">${d.power}W</span><span class="device-data-lbl">Power</span></div>` : ''}
        ${d.battery != null ? `<div class="device-data-point"><span class="device-data-val" style="color:${d.battery > 30 ? '#00E5A0' : '#FF4757'}">${d.battery}%</span><span class="device-data-lbl">Battery</span></div>` : ''}
      </div>
      <div class="device-card-footer">
        <span class="device-last-seen">Last seen: ${d.lastSeen}</span>
        <label class="toggle">
          <input type="checkbox" ${d.status === 'online' ? 'checked' : ''} onchange="">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
  `).join('');
}

function filterDevices(filter, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDevices(filter);
}

// ---- AUTOMATIONS ----
function renderAutomations() {
    const container = document.getElementById('automationsList');
    if (!container) return;
    container.innerHTML = AUTOMATIONS.map((a, i) => `
    <div class="automation-card">
      <div class="auto-icon">${a.icon}</div>
      <div class="auto-info">
        <div class="auto-name">${a.name}</div>
        <div class="auto-desc">${a.desc}</div>
        <div class="auto-trigger" style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;">Trigger: ${a.trigger}</div>
      </div>
      <div class="auto-status ${a.status}">● ${a.status.charAt(0).toUpperCase() + a.status.slice(1)}</div>
      <label class="toggle">
        <input type="checkbox" ${a.status === 'enabled' ? 'checked' : ''} onchange="AUTOMATIONS[${i}].status=this.checked?'enabled':'disabled';renderAutomations()">
        <span class="toggle-slider"></span>
      </label>
    </div>
  `).join('');
}

// ---- ALERTS ----
function renderAlerts() {
    const container = document.getElementById('alertsList');
    if (!container) return;
    container.innerHTML = ALERTS_DATA.map((a, i) => `
    <div class="alert-card ${a.level}" id="alertCard${i}">
      <div class="alert-icon">${a.icon}</div>
      <div class="alert-info">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.desc}</div>
        <div class="alert-time">${a.time}</div>
      </div>
      <button class="alert-dismiss" onclick="dismissAlert(${i})">Dismiss</button>
    </div>
  `).join('');
}

function dismissAlert(i) {
    const card = document.getElementById('alertCard' + i);
    if (card) { card.style.opacity = '0'; card.style.transition = 'opacity 0.3s'; setTimeout(() => card.remove(), 300); }
}

// ---- DATA LOG ----
function renderDataLog() {
    const table = document.getElementById('datalogTable');
    if (!table) return;
    const rows = [];
    const now = new Date();
    for (let i = 0; i < 20; i++) {
        const d = new Date(now - i * 5 * 60000);
        const device = DEVICES[Math.floor(Math.random() * DEVICES.length)];
        const temp = device.temp ? (device.temp + (Math.random() - 0.5)).toFixed(1) : '—';
        const humid = device.humid ? Math.round(device.humid + (Math.random() - 0.5) * 4) + '%' : '—';
        rows.push(`<tr>
      <td>${device.name}</td>
      <td>${d.toLocaleTimeString()}</td>
      <td>${device.location}</td>
      <td>${temp !== '—' ? temp + '°C' : '—'}</td>
      <td>${humid}</td>
      <td><span style="color:${device.status === 'online' ? 'var(--accent-green)' : 'var(--text-muted)'}">● ${device.status}</span></td>
    </tr>`);
    }
    table.innerHTML = `
    <thead><tr>
      <th>Device</th><th>Timestamp</th><th>Location</th><th>Temp</th><th>Humidity</th><th>Status</th>
    </tr></thead>
    <tbody>${rows.join('')}</tbody>`;
}

// ---- TEAM ----
function renderTeam() {
    const container = document.getElementById('teamGrid');
    if (!container) return;
    container.innerHTML = TEAM_DATA.map(m => `
    <div class="team-card">
      <div class="team-avatar" style="background:${m.color}">${m.initials}</div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
      <div class="team-status ${m.status}">● ${m.status.charAt(0).toUpperCase() + m.status.slice(1)}</div>
    </div>
  `).join('');
}

// ---- SETTINGS ----
function renderSettings() {
    const container = document.getElementById('settingsGrid');
    if (!container) return;
    container.innerHTML = `
    <div class="settings-section">
      <div class="settings-section-title">General</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Platform Name</div><div class="settings-row-desc">Displayed across the dashboard</div></div>
        <input class="form-input" style="width:200px;padding:8px 12px" value="Smart Home Hub" />
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Timezone</div><div class="settings-row-desc">Used for timestamps and automations</div></div>
        <select class="form-input" style="width:200px;padding:8px 12px">
          <option>Asia/Kolkata (IST)</option>
          <option>UTC</option>
          <option>America/New_York</option>
        </select>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Data Refresh Rate</div><div class="settings-row-desc">How often widgets update</div></div>
        <select class="form-input" style="width:200px;padding:8px 12px">
          <option>Every 2 seconds</option>
          <option>Every 5 seconds</option>
          <option>Every 10 seconds</option>
        </select>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title">Notifications</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Email Alerts</div><div class="settings-row-desc">Get notified when thresholds are exceeded</div></div>
        <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Push Notifications</div><div class="settings-row-desc">Browser push notifications</div></div>
        <label class="toggle"><input type="checkbox"><span class="toggle-slider"></span></label>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Weekly Reports</div><div class="settings-row-desc">Summary emailed every Monday</div></div>
        <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title">API Access</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">API Key</div><div class="settings-row-desc">Use this key in your device firmware</div></div>
        <div style="display:flex;gap:8px;align-items:center">
          <input class="form-input" style="width:220px;padding:8px 12px;color:var(--accent-purple)" value="ET-a4f2c91b3d8e7f0a" readonly />
          <button class="btn-secondary" style="padding:8px 14px" onclick="alert('API Key copied!')">Copy</button>
        </div>
      </div>
    </div>`;
}

// ---- ANALYTICS CHARTS ----
let analyticsInited = false;
function initAnalyticsCharts() {
    if (analyticsInited) return;
    analyticsInited = true;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Temp trend
    const tc = document.getElementById('analyticsTempChart');
    if (tc) new Chart(tc, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Avg Temp (°C)',
                data: [28, 30, 27, 32, 31, 29, 33],
                borderColor: '#6C63FF',
                backgroundColor: 'rgba(108,99,255,0.1)',
                fill: true, tension: 0.4, pointRadius: 5,
                pointBackgroundColor: '#6C63FF', borderWidth: 2,
            }]
        },
        options: { ...chartDefaults, plugins: { ...chartDefaults.plugins, legend: { display: true, labels: { color: '#8B8FA8', font: { family: 'Poppins' } } } } }
    });

    // Humidity donut
    const hc = document.getElementById('analyticsHumidChart');
    if (hc) new Chart(hc, {
        type: 'doughnut',
        data: {
            labels: ['< 40%', '40–60%', '60–80%', '> 80%'],
            datasets: [{ data: [10, 35, 45, 10], backgroundColor: ['#00D4FF', '#6C63FF', '#00E5A0', '#FF6B35'], borderWidth: 0, hoverOffset: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'right', labels: { color: '#8B8FA8', font: { family: 'Poppins', size: 11 }, padding: 16, usePointStyle: true } }, tooltip: chartDefaults.plugins.tooltip } }
    });

    // Activity bar
    const ac = document.getElementById('analyticsActivityChart');
    if (ac) new Chart(ac, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                { label: 'Events', data: [120, 95, 140, 88, 200, 160, 175], backgroundColor: 'rgba(108,99,255,0.6)', borderRadius: 6, borderSkipped: false },
                { label: 'Alerts', data: [3, 1, 5, 2, 4, 1, 2], backgroundColor: 'rgba(255,71,87,0.5)', borderRadius: 6, borderSkipped: false }
            ]
        },
        options: { ...chartDefaults, plugins: { ...chartDefaults.plugins, legend: { display: true, labels: { color: '#8B8FA8', font: { family: 'Poppins' } } } } }
    });

    // Power pie
    const pc = document.getElementById('analyticsPowerChart');
    if (pc) new Chart(pc, {
        type: 'doughnut',
        data: {
            labels: ['Living Room', 'Kitchen', 'Bedroom', 'Garden', 'Other'],
            datasets: [{ data: [35, 25, 18, 12, 10], backgroundColor: ['#6C63FF', '#00D4FF', '#00E5A0', '#FFD32A', '#FF6B35'], borderWidth: 0, hoverOffset: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'right', labels: { color: '#8B8FA8', font: { family: 'Poppins', size: 11 }, padding: 14, usePointStyle: true } }, tooltip: chartDefaults.plugins.tooltip } }
    });
}

// ---- LIVE DATA UPDATE ----
let liveDataDevices = DEVICES.map(d => ({ ...d }));
function updateLiveDeviceData() {
    liveDataDevices.forEach(d => {
        if (d.status === 'online' && d.temp != null) {
            d.temp = +(d.temp + (Math.random() - 0.5) * 0.4).toFixed(1);
        }
        if (d.status === 'online' && d.humid != null) {
            d.humid = Math.max(30, Math.min(95, d.humid + Math.round((Math.random() - 0.5) * 2)));
        }
    });
    const onlineEl = document.getElementById('onlineCount');
    if (onlineEl) onlineEl.textContent = liveDataDevices.filter(d => d.status === 'online').length;
}
setInterval(updateLiveDeviceData, 3000);
setInterval(updateGauges, 2500);

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    renderDeviceList();
    renderQuickControls();
    renderActivity();
    initMainChart();
    initPowerChart();
    updateGauges();

    // Animate summary cards on load
    document.querySelectorAll('.summary-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + i * 80);
    });
});
