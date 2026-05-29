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

// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let currentGlow = THEMES[0].glow;

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnParticle() {
    return { x: Math.random()*canvas.width, y: canvas.height+10, vx: (Math.random()-.5)*.6, vy: -(Math.random()*1.2+.4), size: Math.random()*2.5+.5, alpha: Math.random()*.5+.2, life: 1, decay: Math.random()*.003+.001 };
}
for (let i=0; i<60; i++) { const p=spawnParticle(); p.y=Math.random()*canvas.height; particles.push(p); }

function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x+=p.vx; p.y+=p.vy; p.life-=p.decay;
        if (p.life<=0||p.y<-10) { particles[i]=spawnParticle(); return; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle=`rgba(${currentGlow},${p.alpha*p.life})`; ctx.fill();
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
        playerVars: { autoplay:1, mute:1, loop:1, playlist:t.id, controls:0, showinfo:0, rel:0, modestbranding:1, iv_load_policy:3, start:t.start, playsinline:1, enablejsapi:1, disablekb:1, fs:0, cc_load_policy:0 },
        events: {
            onReady(e) { ready=true; e.target.setVolume(0); e.target.playVideo(); setTimeout(()=>document.getElementById('loading').classList.add('hidden'),1200); },
            onStateChange(e) { if(e.data===YT.PlayerState.ENDED){player.seekTo(THEMES[cur].start);player.playVideo();} },
            onError() { document.getElementById('loading').classList.add('hidden'); }
        }
    });
}

// ── IRIS TRANSITION ──
const irisOverlay = document.getElementById('iris-overlay');
const irisRing    = document.getElementById('iris-ring');

function setTheme(idx, originEl) {
    if (idx===cur||transitioning) return;
    transitioning = true;
    const t = THEMES[idx];
    if (originEl) {
        const sw = document.createElement('div'); sw.className='shockwave';
        originEl.appendChild(sw); setTimeout(()=>sw.remove(), 600);
    }
    let ox=50, oy=50;
    if (originEl) {
        const r = originEl.getBoundingClientRect();
        ox=((r.left+r.width/2)/window.innerWidth)*100;
        oy=((r.top+r.height/2)/window.innerHeight)*100;
    }
    const hex=t.accent.replace('#','');
    const cr=parseInt(hex.substring(0,2),16), cg=parseInt(hex.substring(2,4),16), cb_v=parseInt(hex.substring(4,6),16);
    irisRing.style.background=`radial-gradient(circle at ${ox}% ${oy}%,rgba(${cr},${cg},${cb_v},0) 0%,rgba(${cr},${cg},${cb_v},.55) 48%,rgba(${cr},${cg},${cb_v},.9) 51%,rgba(${cr},${cg},${cb_v},.55) 54%,rgba(${cr},${cg},${cb_v},0) 62%)`;
    irisRing.style.backgroundSize='300% 300%';
    irisOverlay.style.transition='none';
    irisOverlay.style.clipPath=`circle(0% at ${ox}% ${oy}%)`;
    irisOverlay.getBoundingClientRect();
    irisOverlay.classList.remove('opening'); irisOverlay.classList.add('closing');
    irisOverlay.style.clipPath=`circle(150% at ${ox}% ${oy}%)`;
    irisRing.classList.add('active');
    setTimeout(()=>{
        cur=idx; currentGlow=t.glow;
        document.documentElement.style.setProperty('--a', t.accent);
        document.documentElement.style.setProperty('--g', t.gold);
        document.documentElement.style.setProperty('--bg', t.border);
        document.querySelectorAll('.sw-btn').forEach((el,i)=>el.classList.toggle('on',i===idx));
        if(ready){player.loadVideoById({videoId:t.id,startSeconds:t.start});player.setVolume(0);}
        irisOverlay.classList.remove('closing'); irisOverlay.classList.add('opening');
        irisOverlay.style.clipPath=`circle(0% at ${ox}% ${oy}%)`;
        irisRing.classList.remove('active');
    },560);
    setTimeout(()=>{
        irisOverlay.style.transition='none'; irisOverlay.classList.remove('opening'); transitioning=false;
    },1280);
}

// ── MODALS ──
function openFacebookModal()  { document.getElementById('facebook-modal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeFacebookModal() { document.getElementById('facebook-modal').classList.remove('open'); document.body.style.overflow=''; }
function openShopModal()      { document.getElementById('shop-modal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeShopModal()     { document.getElementById('shop-modal').classList.remove('open'); document.body.style.overflow=''; }
function openDonateModal()    { document.getElementById('donate-modal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeDonateModal()   { document.getElementById('donate-modal').classList.remove('open'); document.body.style.overflow=''; }
function openContactModal()   { document.getElementById('contact-modal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeContactModal()  { document.getElementById('contact-modal').classList.remove('open'); document.body.style.overflow=''; }

document.addEventListener('keydown', e => {
    if (e.key==='Escape') { closeShopModal(); closeDonateModal(); closeFacebookModal(); closeContactModal(); }
});

// ── CREDIT ──
function toggleCredit() {
    const el = document.getElementById('creditWm');
    el.classList.toggle('open');
}
document.addEventListener('click', function(e) {
    const el = document.getElementById('creditWm');
    if (el && !el.contains(e.target)) el.classList.remove('open');
});

// ── COPY TEXT ──
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const old = btn.querySelector('.copy-icon');
        if (old) { old.textContent = '✓'; setTimeout(()=>old.textContent='⎘', 2000); }
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Đã copy: ' + text;
        document.body.appendChild(toast);
        setTimeout(()=>toast.remove(), 1900);
    });
}

function copyEmail(email, e) { e.preventDefault(); copyText(email, e.currentTarget); }

// ── RIPPLE ──
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const r=this.getBoundingClientRect(), s=Math.max(r.width,r.height)*1.5;
        const rp=document.createElement('span');
        rp.className='ripple';
        rp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
        this.appendChild(rp); setTimeout(()=>rp.remove(),700);
    });
});