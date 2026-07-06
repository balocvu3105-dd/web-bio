const THEMES = [
    {
        id: 'optr9r9VkoQ', start: 12,
        accent: '#00e5ff', gold: '#ffd54f', border: 'rgba(0,229,255,0.32)', glow: '0,229,255',
        name: 'Cartethyia',
        elIcon: `<img src="assets/icons/Aero.avif" alt="Aero" style="width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 0 4px rgba(0,229,255,0.8))">`,
        avatar: 'assets/icons/cartethyia-avatar.jpg'
    },
    {
        id: 'H8gGJgMvr9w', start: 8,
        accent: '#ffaa44', gold: '#ffe082', border: 'rgba(255,160,60,0.32)', glow: '255,160,60',
        name: 'Aemeath',
        elIcon: `<img src="assets/icons/Fusion.avif" alt="Fusion" style="width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 0 4px rgba(255,160,60,0.8))">`,
        avatar: 'assets/icons/cartethyia-avatar.jpg'
    },
    {
        id: 'qUD2e2OS1zw', start: 8,
        accent: '#aaddff', gold: '#fff0e8', border: 'rgba(150,210,255,0.32)', glow: '150,210,255',
        name: 'Hiyuki',
        elIcon: `<img src="assets/icons/Glacio.avif" alt="Glacio" style="width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 0 4px rgba(150,210,255,0.8))">`,
        avatar: 'assets/icons/cartethyia-avatar.jpg'
    },
    {
        id: 'Hi1z3nFl0Ls', start: 8,
        accent: '#cc44ff', gold: '#ffcc44', border: 'rgba(180,60,255,0.32)', glow: '180,60,255',
        name: 'Phrolova',
        elIcon: `<img src="assets/icons/Havoc.avif" alt="Havoc" style="width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 0 4px rgba(180,60,255,0.8))">`,
        avatar: 'assets/icons/cartethyia-avatar.jpg'
    },
];

let player, cur = 0, ready = false, transitioning = false;
let gearOpen = false;

// ── BUILD THEME BUTTONS ──
function buildThemeButtons() {
    const list = document.getElementById('themeList');
    if (!list) return;
    list.innerHTML = '';
    THEMES.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'sw-btn' + (i === 0 ? ' on' : '');
        btn.innerHTML = `<div class="el-icon">${t.elIcon}</div><span class="sn">${t.name}</span>`;
        btn.onclick = () => { setTheme(i, btn); toggleGear(false); };
        list.appendChild(btn);
    });
}
buildThemeButtons();

function toggleGear(forceClose) {
    const panel = document.getElementById('gearPanel');
    const btn = document.querySelector('.gear-btn');
    if (!panel || !btn) return;
    if (forceClose === false || gearOpen) {
        gearOpen = false;
        panel.classList.remove('open');
        btn.classList.remove('open');
    } else {
        gearOpen = true;
        panel.classList.add('open');
        btn.classList.add('open');
    }
}
// Close gear when clicking outside
document.addEventListener('click', function(e) {
    const gw = document.getElementById('gearWrap');
    if (gw && !gw.contains(e.target)) { toggleGear(false); }
});

// ── PARTICLES & WATER RIPPLES (OOP ARCHITECTURE) ──
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
let currentGlow = THEMES[0].glow;

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * this.canvasWidth;
        this.y = initial ? Math.random() * this.canvasHeight : this.canvasHeight + 10;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 1.2 + 0.4);
        this.size = Math.random() * 2.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.life = 1;
        this.decay = Math.random() * 0.003 + 0.001;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -10) {
            this.reset(false);
        }
    }

    draw(ctx, glowColor) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowColor}, ${this.alpha * this.life})`;
        ctx.fill();
    }
}

class WaterRipple {
    constructor(x, y, maxRadius, alpha, speed) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
        this.alpha = alpha;
        this.speed = speed;
        this.isDead = false;
    }

    update() {
        this.radius += this.speed;
        this.alpha -= 0.005; // Mờ đi chậm để sóng lan xa
        if (this.alpha <= 0 || this.radius >= this.maxRadius) {
            this.isDead = true;
        }
    }

    draw(ctx, glowColor) {
        // Vòng sóng ngoài
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${glowColor}, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Vòng sóng trong tạo độ sâu mặt nước
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.68, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${glowColor}, ${this.alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

class VisualEngine {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.ripples = [];
        this.particleCount = 60;
    }

    init() {
        if (!this.canvas || !this.ctx) return;
        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }

        window.addEventListener('click', e => this.spawnRipple(e.clientX, e.clientY));
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles.forEach(p => {
            p.canvasWidth = this.canvas.width;
            p.canvasHeight = this.canvas.height;
        });
    }

    spawnRipple(x, y) {
        // Gợn sóng chính
        this.ripples.push(new WaterRipple(x, y, 240, 0.8, 1.4));
        // Gợn sóng phụ rớt nối đuôi
        setTimeout(() => {
            this.ripples.push(new WaterRipple(x, y, 160, 0.5, 1.1));
        }, 250);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(p => {
            p.update();
            p.draw(this.ctx, currentGlow);
        });

        // Update and draw ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const r = this.ripples[i];
            r.update();
            if (r.isDead) {
                this.ripples.splice(i, 1);
            } else {
                r.draw(this.ctx, currentGlow);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

const visualEngine = new VisualEngine(canvas, ctx);
visualEngine.init();

// ── YOUTUBE ──
function onYouTubeIframeAPIReady() {
    const wrap = document.getElementById('yt-wrap');
    if (!wrap) return;
    const div = document.createElement('div');
    div.id = 'yt-player';
    wrap.appendChild(div);
    const t = THEMES[0];
    player = new YT.Player('yt-player', {
        videoId: t.id,
        playerVars: {
            autoplay: 1, mute: 1, loop: 1, playlist: t.id,
            controls: 0, showinfo: 0, rel: 0, modestbranding: 1,
            iv_load_policy: 3, start: t.start, playsinline: 1,
            enablejsapi: 1, disablekb: 1, fs: 0, cc_load_policy: 0
        },
        events: {
            onReady(e) {
                ready = true;
                e.target.setVolume(0);
                e.target.playVideo();
                setTimeout(() => {
                    const l = document.getElementById('loading');
                    if (l) l.classList.add('hidden');
                }, 1200);
            },
            onStateChange(e) {
                if (e.data === YT.PlayerState.ENDED && player) {
                    player.seekTo(THEMES[cur].start);
                    player.playVideo();
                }
            },
            onError() {
                const l = document.getElementById('loading');
                if (l) l.classList.add('hidden');
            }
        }
    });
}

// ── IRIS WIPE TRANSITION ──
const irisOverlay = document.getElementById('iris-overlay');
const irisRing    = document.getElementById('iris-ring');

function setTheme(idx, originEl) {
    if (idx === cur || transitioning || !irisOverlay || !irisRing) return;
    transitioning = true;

    const t = THEMES[idx];

    // ── 1. Shockwave trên nút bấm ──
    if (originEl) {
        const sw = document.createElement('div');
        sw.className = 'shockwave';
        originEl.appendChild(sw);
        setTimeout(() => sw.remove(), 600);
    }

    // ── 2. Tính origin point (% của viewport) từ nút bấm ──
    let ox = 50, oy = 50;
    if (originEl) {
        const r = originEl.getBoundingClientRect();
        ox = ((r.left + r.width  / 2) / window.innerWidth)  * 100;
        oy = ((r.top  + r.height / 2) / window.innerHeight) * 100;
    }

    // ── 3. Parse màu accent theme MỚI cho glow ring ──
    const hex  = t.accent.replace('#','');
    const cr   = parseInt(hex.substring(0,2), 16);
    const cg   = parseInt(hex.substring(2,4), 16);
    const cb_v = parseInt(hex.substring(4,6), 16);

    // ── 4. Glow ring = radial gradient SVG overlay theo màu theme mới ──
    irisRing.style.background =
        `radial-gradient(circle at ${ox}% ${oy}%,` +
        `rgba(${cr},${cg},${cb_v},0) 0%,` +
        `rgba(${cr},${cg},${cb_v},0.55) 48%,` +
        `rgba(${cr},${cg},${cb_v},0.9) 51%,` +
        `rgba(${cr},${cg},${cb_v},0.55) 54%,` +
        `rgba(${cr},${cg},${cb_v},0) 62%)`;
    irisRing.style.backgroundSize = '300% 300%';

    // ── 5. PHASE A — Iris ĐÓNG: circle phóng to từ origin phủ toàn màn ──
    irisOverlay.style.transition = 'none';
    irisOverlay.style.clipPath   = `circle(0% at ${ox}% ${oy}%)`;

    irisOverlay.getBoundingClientRect();

    irisOverlay.classList.remove('opening');
    irisOverlay.classList.add('closing');
    irisOverlay.style.clipPath = `circle(150% at ${ox}% ${oy}%)`;

    irisRing.classList.add('active');

    // ── 6. PHASE B — Tại đỉnh: apply theme mới ──
    setTimeout(() => {
        cur          = idx;
        currentGlow  = t.glow;
        document.documentElement.style.setProperty('--a',  t.accent);
        document.documentElement.style.setProperty('--g',  t.gold);
        document.documentElement.style.setProperty('--bg', t.border);
        document.querySelectorAll('.sw-btn').forEach((el, i) =>
            el.classList.toggle('on', i === idx));
        if (ready && player) {
            player.loadVideoById({ videoId: t.id, startSeconds: t.start });
            player.setVolume(0);
        }

        // ── 7. PHASE C — Iris MỞ: circle thu nhỏ về origin để lộ theme mới ──
        irisOverlay.classList.remove('closing');
        irisOverlay.classList.add('opening');
        irisOverlay.style.clipPath = `circle(0% at ${ox}% ${oy}%)`;

        irisRing.classList.remove('active');

    }, 560);

    // ── 8. Cleanup ──
    setTimeout(() => {
        irisOverlay.style.transition = 'none';
        irisOverlay.classList.remove('opening');
        transitioning = false;
    }, 1280);
}

// ── MODALS ──
function openFacebookModal()  { const m = document.getElementById('facebook-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeFacebookModal() { const m = document.getElementById('facebook-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }
function openShopModal()      { const m = document.getElementById('shop-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeShopModal()     { const m = document.getElementById('shop-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }
function openDonateModal()    { const m = document.getElementById('donate-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDonateModal()   { const m = document.getElementById('donate-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }
function openContactModal()   { const m = document.getElementById('contact-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeContactModal()  { const m = document.getElementById('contact-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }
function openYoutubeModal()   { const m = document.getElementById('youtube-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeYoutubeModal()  { const m = document.getElementById('youtube-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }
function openLdshopModal()    { const m = document.getElementById('ldshop-modal'); if (m) m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLdshopModal()   { const m = document.getElementById('ldshop-modal'); if (m) m.classList.remove('open'); document.body.style.overflow=''; }

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeShopModal();
        closeLdshopModal();
        closeDonateModal();
        closeFacebookModal();
        closeContactModal();
        closeYoutubeModal();
        toggleGear(false);
    }
});

// ── CREDIT ──
function toggleCredit() {
    const el = document.getElementById('creditWm');
    if (el) el.classList.toggle('open');
}
document.addEventListener('click', function(e) {
    const el = document.getElementById('creditWm');
    if (el && !el.contains(e.target)) el.classList.remove('open');
});

// ── COPY TEXT ──
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const old = btn ? btn.querySelector('.copy-icon') : null;
        if (old) { old.textContent = '✓'; setTimeout(()=>old.textContent='⎘', 2000); }
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Đã copy: ' + text;
        document.body.appendChild(toast);
        setTimeout(()=>toast.remove(), 1900);
    }).catch(err => {
        // Fallback for non-https or older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        alert('Đã copy: ' + text);
    });
}

function copyEmail(email, e) { if (e) e.preventDefault(); copyText(email, e ? e.currentTarget : null); }

// ── RIPPLE ──
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const r = this.getBoundingClientRect();
        const s = Math.max(r.width, r.height) * 1.5;
        const rp = document.createElement('span');
        rp.className = 'ripple';
        rp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s/2}px;top:${e.clientY - r.top - s/2}px`;
        this.appendChild(rp);
        setTimeout(() => rp.remove(), 700);
    });
});

// ── ANTI STUCK LOADING FALLBACK ──
window.addEventListener("load", () => {
    setTimeout(() => {
        const loading = document.getElementById("loading");
        if (loading && !loading.classList.contains("hidden")) {
            loading.classList.add("hidden");
        }
    }, 3000);
});