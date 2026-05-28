
const THEMES = [
    { id: 'optr9r9VkoQ', start: 12, accent: '#00e5ff', gold: '#ffd54f', border: 'rgba(0,229,255,0.32)',    glow: '0,229,255',   name: 'Cartethyia' },
    { id: 'H8gGJgMvr9w', start: 8,  accent: '#ffaa44', gold: '#ffe082', border: 'rgba(255,160,60,0.32)',   glow: '255,160,60',  name: 'Aemeath' },
    { id: 'qUD2e2OS1zw', start: 8,  accent: '#aaddff', gold: '#fff0e8', border: 'rgba(150,210,255,0.32)',  glow: '150,210,255', name: 'Hiyuki' },
    { id: 'Hi1z3nFl0Ls', start: 8,  accent: '#cc44ff', gold: '#ffcc44', border: 'rgba(180,60,255,0.32)',   glow: '180,60,255',  name: 'Phrolova' },
];

let player, cur = 0, ready = false, transitioning = false;

// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let currentGlow = THEMES[0].glow;

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnParticle() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 1.2 + 0.4),
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        life: 1,
        decay: Math.random() * 0.003 + 0.001,
    };
}

for (let i = 0; i < 60; i++) {
    const p = spawnParticle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
}

function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.y < -10) {
            particles[i] = spawnParticle();
            return;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentGlow}, ${p.alpha * p.life})`;
        ctx.fill();
    });
    requestAnimationFrame(animParticles);
}
animParticles();

// ── YOUTUBE ──
function onYouTubeIframeAPIReady() {
    const div = document.createElement('div');
    div.id = 'yt-player';
    document.getElementById('yt-wrap').appendChild(div);
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
                setTimeout(() => document.getElementById('loading').classList.add('hidden'), 1200);
            },
            onStateChange(e) {
                if (e.data === YT.PlayerState.ENDED) {
                    player.seekTo(THEMES[cur].start);
                    player.playVideo();
                }
            },
            onError() { document.getElementById('loading').classList.add('hidden') }
        }
    });
}

// ── IRIS WIPE TRANSITION ──
const irisOverlay = document.getElementById('iris-overlay');
const irisRing    = document.getElementById('iris-ring');

function setTheme(idx, originEl) {
    if (idx === cur || transitioning) return;
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
    let ox = 50, oy = 50; // default: giữa màn hình
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
    // Reset về 0 ngay lập tức (không transition), rồi trigger closing
    irisOverlay.style.transition = 'none';
    irisOverlay.style.clipPath   = `circle(0% at ${ox}% ${oy}%)`;

    // Force reflow để browser nhận ra trạng thái ban đầu
    irisOverlay.getBoundingClientRect();

    irisOverlay.classList.remove('opening');
    irisOverlay.classList.add('closing');
    // 150% đảm bảo phủ cả góc xa nhất dù origin ở rìa
    irisOverlay.style.clipPath = `circle(150% at ${ox}% ${oy}%)`;

    // Glow ring xuất hiện khi iris đang lan ra
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
        if (ready) {
            player.loadVideoById({ videoId: t.id, startSeconds: t.start });
            player.setVolume(0);
        }

        // ── 7. PHASE C — Iris MỞ: circle thu nhỏ về origin để lộ theme mới ──
        irisOverlay.classList.remove('closing');
        irisOverlay.classList.add('opening');
        irisOverlay.style.clipPath = `circle(0% at ${ox}% ${oy}%)`;

        // Glow ring mờ dần khi iris thu lại
        irisRing.classList.remove('active');

    }, 560);

    // ── 8. Cleanup ──
    setTimeout(() => {
        irisOverlay.style.transition = 'none';
        irisOverlay.classList.remove('opening');
        transitioning = false;
    }, 1280);
}


// ── FACEBOOK MODAL ──
function openFacebookModal() {
    document.getElementById('facebook-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeFacebookModal() {
    document.getElementById('facebook-modal').classList.remove('open');
    document.body.style.overflow = '';
}


// ── CREDIT WATERMARK ──
function toggleCredit() {
    const el = document.getElementById('creditWm');
    el.classList.toggle('open');
}
// Close when clicking outside
document.addEventListener('click', function(e) {
    const el = document.getElementById('creditWm');
    if (el && !el.contains(e.target)) el.classList.remove('open');
});

// ── SHOP MODAL ──
function openShopModal() {
    document.getElementById('shop-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeShopModal() {
    document.getElementById('shop-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// ── DONATE MODAL ──
function openDonateModal() {
    document.getElementById('donate-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeDonateModal() {
    document.getElementById('donate-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close modals on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeShopModal();
        closeDonateModal();
        closeFacebookModal();
    }
});

// ── RIPPLE ──
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const r  = this.getBoundingClientRect();
        const s  = Math.max(r.width, r.height) * 1.5;
        const rp = document.createElement('span');
        rp.className  = 'ripple';
        rp.style.cssText =
            `width:${s}px;height:${s}px;` +
            `left:${e.clientX - r.left - s/2}px;` +
            `top:${e.clientY  - r.top  - s/2}px`;
        this.appendChild(rp);
        setTimeout(() => rp.remove(), 700);
    });
});
