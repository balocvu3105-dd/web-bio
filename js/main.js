// ── MAIN APPLICATION LOGIC (TABS, GRIDS, FILTERS, MODALS, CALCULATOR) ──
// Được viết độc lập 100%, không làm thay đổi bất kỳ file gốc nào (index.html, style.css, script.js)

let currentTab = 'resonators';
let resSearchQuery = '';
let currentResElement = 'all';
let weaponSearchQuery = '';
let currentWeaponType = 'all';
let echoSearchQuery = '';
let currentEchoCost = 'all';

// Helper để lấy dữ liệu từ global scope (tránh lỗi do const WUWA_DATA không nằm trên window)
function getWuwaData() {
    if (typeof WUWA_DATA !== 'undefined') return WUWA_DATA;
    if (typeof window.WUWA_DATA !== 'undefined') return window.WUWA_DATA;
    return null;
}

// ── TAB SWITCHING ──
function switchTab(tabId) {
    currentTab = tabId;
    
    // Update content area
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update sidebar items
    document.querySelectorAll('.sidebar .sb-item').forEach(item => {
        const onclickAttr = item.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${tabId}'`) || onclickAttr.includes(`"${tabId}"`)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ── RESONATORS FILTER & RENDER ──
function filterResonators() {
    const searchInput = document.getElementById('search-resonator');
    resSearchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    applyResonatorFilters();
}

function filterElement(element, btnEl) {
    currentResElement = element;
    
    const filterGroup = document.querySelector('#tab-resonators .filter-group');
    if (filterGroup) {
        filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (btnEl) btnEl.classList.add('active');
    }
    
    applyResonatorFilters();
}

function applyResonatorFilters() {
    const data = getWuwaData();
    if (!data || !data.resonators) return;
    
    const filtered = data.resonators.filter(res => {
        const matchName = res.name.toLowerCase().includes(resSearchQuery);
        const matchElement = currentResElement === 'all' || res.element.toLowerCase() === currentResElement.toLowerCase();
        return matchName && matchElement;
    });
    
    renderResonators(filtered);
}

function renderResonators(list) {
    const grid = document.getElementById('resonators-grid');
    if (!grid) return;
    
    if (!list || list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,.5); font-style: italic;">Không tìm thấy Resonator nào phù hợp</div>`;
        return;
    }
    
    grid.innerHTML = list.map(res => {
        const stars = '★'.repeat(res.rarity);
        const avatarUrl = res.avatar || 'assets/icons/cartethyia-avatar.jpg';
        const elIconUrl = `assets/icons/${res.element}.avif`;
        
        return `
            <div class="grid-card" onclick="openResonatorInfo('${res.id}')">
                <div class="card-img-wrap">
                    <img src="${avatarUrl}" alt="${res.name}" class="card-img" onerror="this.src='assets/icons/cartethyia-avatar.jpg'">
                    <div class="card-el-badge" title="${res.element}">
                        <img src="${elIconUrl}" alt="${res.element}" style="width:18px;height:18px;object-fit:contain" onerror="this.style.display='none'">
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-name">${res.name}</div>
                    <div class="card-stars">${stars}</div>
                    <div class="card-weapon">✦ ${res.weapon} ✦</div>
                </div>
            </div>
        `;
    }).join('');
}

// ── WEAPONS FILTER & RENDER ──
function filterWeapons() {
    const searchInput = document.getElementById('search-weapon');
    weaponSearchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    applyWeaponFilters();
}

function filterWeaponType(type, btnEl) {
    // Tự động tương thích với nút lọc trong bản gốc index.html ('Sword' -> Broadblade, 'Sword4' -> Sword)
    let actualType = type;
    if (type === 'Sword' && btnEl && btnEl.innerText.toLowerCase().includes('broadblade')) {
        actualType = 'Broadblade';
    } else if (type === 'Sword4') {
        actualType = 'Sword';
    }
    
    currentWeaponType = actualType;
    
    const filterGroup = document.querySelector('#tab-weapons .filter-group');
    if (filterGroup) {
        filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (btnEl) btnEl.classList.add('active');
    }
    
    applyWeaponFilters();
}

function applyWeaponFilters() {
    const data = getWuwaData();
    if (!data || !data.weapons) return;
    
    const filtered = data.weapons.filter(w => {
        const matchName = w.name.toLowerCase().includes(weaponSearchQuery);
        const matchType = currentWeaponType === 'all' || w.type.toLowerCase() === currentWeaponType.toLowerCase();
        return matchName && matchType;
    });
    
    renderWeapons(filtered);
}

function renderWeapons(list) {
    const grid = document.getElementById('weapons-grid');
    if (!grid) return;
    
    if (!list || list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,.5); font-style: italic;">Không tìm thấy Vũ Khí nào phù hợp</div>`;
        return;
    }
    
    grid.innerHTML = list.map(w => {
        const stars = '★'.repeat(w.rarity);
        
        return `
            <div class="grid-card" onclick="openWeaponInfo('${w.id}')">
                <div class="card-img-wrap" style="background:linear-gradient(135deg, rgba(255,213,79,.4), rgba(0,229,255,.3))">
                    <div style="width:100%;height:100%;border-radius:50%;background:#030d1a;display:flex;align-items:center;justify-content:center;font-size:36px">⚔️</div>
                    <div class="card-el-badge" style="font-size:10px;color:var(--g);font-weight:700">W</div>
                </div>
                <div class="card-info">
                    <div class="card-name">${w.name}</div>
                    <div class="card-stars">${stars}</div>
                    <div class="card-weapon">${w.type} • ATK ${w.atk}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ── ECHOES FILTER & RENDER ──
function filterEchoes() {
    const searchInput = document.getElementById('search-echo');
    echoSearchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    applyEchoFilters();
}

function filterEchoCost(cost, btnEl) {
    currentEchoCost = cost;
    
    const filterGroup = document.querySelector('#tab-echoes .filter-group');
    if (filterGroup) {
        filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (btnEl) btnEl.classList.add('active');
    }
    
    applyEchoFilters();
}

function applyEchoFilters() {
    const data = getWuwaData();
    if (!data || !data.echoes) return;
    
    const filtered = data.echoes.filter(echo => {
        const matchName = echo.name.toLowerCase().includes(echoSearchQuery);
        const matchCost = currentEchoCost === 'all' || String(echo.cost) === String(currentEchoCost);
        return matchName && matchCost;
    });
    
    renderEchoes(filtered);
}

function renderEchoes(list) {
    const grid = document.getElementById('echoes-grid');
    if (!grid) return;
    
    if (!list || list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,.5); font-style: italic;">Không tìm thấy Echo nào phù hợp</div>`;
        return;
    }
    
    grid.innerHTML = list.map(echo => {
        const sonataText = echo.sonata.join(' • ');
        
        return `
            <div class="grid-card" onclick="openEchoInfo('${echo.id}')">
                <div class="card-img-wrap" style="background:linear-gradient(135deg, rgba(180,60,255,.4), rgba(0,229,255,.4))">
                    <div style="width:100%;height:100%;border-radius:50%;background:#030d1a;display:flex;align-items:center;justify-content:center;font-size:36px">👻</div>
                    <div class="card-el-badge" style="font-size:11px;color:#cc44ff;font-weight:800">${echo.cost}C</div>
                </div>
                <div class="card-info">
                    <div class="card-name">${echo.name}</div>
                    <div class="card-stars" style="color:#00e5ff">Cost ${echo.cost}</div>
                    <div class="card-weapon" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${sonataText}">${sonataText}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ── INFO PANEL MODALS ──
function openResonatorInfo(resId) {
    const data = getWuwaData();
    if (!data || !data.resonators) return;
    const res = data.resonators.find(r => r.id === resId);
    if (!res) return;
    
    const panelInner = document.getElementById('panel-inner');
    const panel = document.getElementById('info-panel');
    if (!panelInner || !panel) return;
    
    const stars = '★'.repeat(res.rarity);
    const avatarUrl = res.avatar || 'assets/icons/cartethyia-avatar.jpg';
    
    const skillsHtml = res.skills.map(s => `
        <div style="background:rgba(255,255,255,.04);padding:14px 18px;border-radius:12px;border-left:3px solid var(--a);border-top:1px solid rgba(255,255,255,.05)">
            <strong style="color:var(--g);display:block;margin-bottom:6px;font-size:14px">${s.name}</strong>
            <span style="color:rgba(255,255,255,.85);font-size:13.5px;line-height:1.5;display:block">${s.desc}</span>
        </div>
    `).join('');
    
    panelInner.innerHTML = `
        <div class="info-header">
            <img src="${avatarUrl}" class="info-av" alt="${res.name}" onerror="this.src='assets/icons/cartethyia-avatar.jpg'">
            <div class="info-title">
                <h2>${res.name}</h2>
                <div class="info-sub">${stars} • <span style="color:var(--a)">${res.element}</span> • ${res.weapon} • ${res.role}</div>
            </div>
        </div>
        <div class="info-body">
            <p style="font-style:italic;color:rgba(255,255,255,.75);border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:16px;line-height:1.6">${res.desc}</p>
            
            <h4>✦ Chỉ Số Cơ Bản (Lv. 90)</h4>
            <div class="info-stats">
                <div class="stat-item"><span>HP</span><span>${res.stats.hp}</span></div>
                <div class="stat-item"><span>Tấn Công (ATK)</span><span>${res.stats.atk}</span></div>
                <div class="stat-item"><span>Phòng Thủ (DEF)</span><span>${res.stats.def}</span></div>
                <div class="stat-item"><span>Tỷ lệ Bạo Kích (CR)</span><span>${res.stats.critRate}</span></div>
                <div class="stat-item"><span>Sát thương Bạo Kích (CD)</span><span>${res.stats.critDMG}</span></div>
            </div>
            
            <h4>✦ Kỹ Năng & Cơ Chế Nổi Bật</h4>
            <div style="display:flex;flex-direction:column;gap:12px">
                ${skillsHtml}
            </div>
        </div>
    `;
    
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openWeaponInfo(weaponId) {
    const data = getWuwaData();
    if (!data || !data.weapons) return;
    const w = data.weapons.find(item => item.id === weaponId);
    if (!w) return;
    
    const panelInner = document.getElementById('panel-inner');
    const panel = document.getElementById('info-panel');
    if (!panelInner || !panel) return;
    
    const stars = '★'.repeat(w.rarity);
    
    panelInner.innerHTML = `
        <div class="info-header">
            <div style="width:110px;height:110px;border-radius:20px;background:linear-gradient(135deg, rgba(255,213,79,.3), rgba(0,229,255,.2));border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-size:54px;box-shadow:0 0 20px rgba(255,213,79,.2)">⚔️</div>
            <div class="info-title">
                <h2>${w.name}</h2>
                <div class="info-sub">${stars} • ${w.type}</div>
            </div>
        </div>
        <div class="info-body">
            <h4>✦ Chỉ Số Cơ Bản (Lv. 90)</h4>
            <div class="info-stats">
                <div class="stat-item"><span>Tấn Công Cơ Bản (ATK)</span><span>${w.atk}</span></div>
                <div class="stat-item"><span>Chỉ Số Phụ</span><span>${w.subStat}</span></div>
            </div>
            
            <h4>✦ Hiệu Ứng Vũ Khí: <span style="color:var(--g)">${w.effect}</span></h4>
            <div style="background:rgba(255,255,255,.04);padding:16px;border-radius:12px;border-left:3px solid var(--g);line-height:1.6;color:rgba(255,255,255,.88)">
                ${w.desc}
            </div>
        </div>
    `;
    
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openEchoInfo(echoId) {
    const data = getWuwaData();
    if (!data || !data.echoes) return;
    const echo = data.echoes.find(e => e.id === echoId);
    if (!echo) return;
    
    const panelInner = document.getElementById('panel-inner');
    const panel = document.getElementById('info-panel');
    if (!panelInner || !panel) return;
    
    const sonataBadges = echo.sonata.map(s => `<span style="background:rgba(0,229,255,.15);border:1px solid rgba(0,229,255,.4);color:var(--a);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600">${s}</span>`).join(' ');
    
    panelInner.innerHTML = `
        <div class="info-header">
            <div style="width:110px;height:110px;border-radius:20px;background:linear-gradient(135deg, rgba(180,60,255,.3), rgba(0,229,255,.2));border:2px solid #cc44ff;display:flex;align-items:center;justify-content:center;font-size:54px;box-shadow:0 0 20px rgba(180,60,255,.2)">👻</div>
            <div class="info-title">
                <h2>${echo.name}</h2>
                <div class="info-sub" style="color:#00e5ff">Cost ${echo.cost} Echo</div>
            </div>
        </div>
        <div class="info-body">
            <h4>✦ Sonata Effect (Hòa Âm)</h4>
            <div style="display:flex;flex-wrap:wrap;gap:8px;padding:4px 0">
                ${sonataBadges}
            </div>
            
            <h4>✦ Kỹ Năng Echo: <span style="color:#cc44ff">${echo.skill}</span></h4>
            <div style="background:rgba(255,255,255,.04);padding:16px;border-radius:12px;border-left:3px solid #cc44ff;line-height:1.6;color:rgba(255,255,255,.88)">
                ${echo.desc}
            </div>
        </div>
    `;
    
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeInfoPanel() {
    const panel = document.getElementById('info-panel');
    if (panel) {
        panel.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Đóng info panel khi bấm ra ngoài hoặc bấm Escape (tương thích không cần sửa script.js)
document.addEventListener('click', function(e) {
    const panel = document.getElementById('info-panel');
    if (panel && panel.classList.contains('open') && e.target === panel) {
        closeInfoPanel();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInfoPanel();
    }
});

// ── CALCULATOR LOGIC ──
function initCalc() {
    const charSelect = document.getElementById('calc-char-select');
    const data = getWuwaData();
    if (!charSelect || !data || !data.resonators) return;
    
    charSelect.innerHTML = data.resonators.map(res => {
        return `<option value="${res.id}">${res.name} (${res.element} - ${res.role})</option>`;
    }).join('');
    
    updateCalc();
}

function updateCalc() {
    const charSelect = document.getElementById('calc-char-select');
    const resultsContainer = document.getElementById('calc-results');
    const data = getWuwaData();
    if (!charSelect || !resultsContainer || !data) return;
    
    const charId = charSelect.value;
    const res = data.resonators.find(r => r.id === charId) || data.resonators[0];
    if (!res) return;
    
    const lvlFrom = parseInt(document.getElementById('calc-lvl-from').value) || 1;
    const lvlTo = parseInt(document.getElementById('calc-lvl-to').value) || 90;
    const atk = parseFloat(document.getElementById('calc-atk').value) || 0;
    const cr = Math.min(Math.max(parseFloat(document.getElementById('calc-cr').value) || 0, 0), 100) / 100;
    const cd = Math.max(parseFloat(document.getElementById('calc-cd').value) || 150, 100) / 100;
    const dmgBonus = (parseFloat(document.getElementById('calc-dmg-bonus').value) || 0) / 100;
    
    const expectedCritMult = (1 - cr) * 1 + cr * cd;
    const totalDmgMult = expectedCritMult * (1 + dmgBonus);
    const avgDmg = Math.round(atk * 5.0 * totalDmgMult * 0.5 * 0.9);
    const critDmgHit = Math.round(atk * 5.0 * cd * (1 + dmgBonus) * 0.5 * 0.9);
    const nonCritHit = Math.round(atk * 5.0 * (1 + dmgBonus) * 0.5 * 0.9);
    
    let credits = 0;
    let xpPotions = 0;
    let bossMats = 0;
    let flowers = 0;
    
    if (lvlTo > lvlFrom) {
        const diff = lvlTo - lvlFrom;
        credits = Math.round(diff * 18500 + 50000);
        xpPotions = Math.round(diff * 4.2);
        bossMats = lvlTo >= 80 ? 46 : (lvlTo >= 70 ? 26 : (lvlTo >= 60 ? 16 : 8));
        flowers = lvlTo >= 80 ? 60 : (lvlTo >= 70 ? 40 : (lvlTo >= 60 ? 25 : 12));
    }
    
    let resourceHtml = '';
    if (lvlTo <= lvlFrom) {
        resourceHtml = `<div style="color:#ff6633;font-style:italic">⚠️ Cấp độ mục tiêu phải lớn hơn cấp độ hiện tại để ước tính nguyên liệu nâng cấp.</div>`;
    } else {
        resourceHtml = `
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:8px">
                <div style="background:rgba(0,0,0,.3);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between">
                    <span style="color:rgba(255,255,255,.7)">🪙 Shell Credits:</span>
                    <strong style="color:#ffd54f">${credits.toLocaleString()}</strong>
                </div>
                <div style="background:rgba(0,0,0,.3);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between">
                    <span style="color:rgba(255,255,255,.7)">🧪 Resonance Potion (Cao cấp):</span>
                    <strong style="color:#00e5ff">${xpPotions} bình</strong>
                </div>
                <div style="background:rgba(0,0,0,.3);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between">
                    <span style="color:rgba(255,255,255,.7)">👹 Nguyên liệu Boss Đột Phá:</span>
                    <strong style="color:#ff6633">${bossMats} cái</strong>
                </div>
                <div style="background:rgba(0,0,0,.3);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between">
                    <span style="color:rgba(255,255,255,.7)">🌸 Hoa Đặc Sản Khu Vực:</span>
                    <strong style="color:#66ff66">${flowers} đóa</strong>
                </div>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,229,255,.2);padding-bottom:14px">
            <div>
                <div style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:rgba(0,229,255,.7);margin-bottom:4px">Ước Tính Sát Thương Kỳ Vọng</div>
                <div class="res-big">${avgDmg.toLocaleString()} <span style="font-size:14px;color:rgba(255,255,255,.6);font-weight:400">DMG / hit</span></div>
            </div>
            <div style="text-align:right;font-size:13px;color:rgba(255,255,255,.8)">
                <div>⚡ Khi Bạo Kích: <strong style="color:#ffd54f">${critDmgHit.toLocaleString()}</strong></div>
                <div style="margin-top:4px">🛡️ Không Bạo Kích: <strong style="color:rgba(255,255,255,.6)">${nonCritHit.toLocaleString()}</strong></div>
                <div style="margin-top:4px;font-size:11px;color:rgba(0,229,255,.6)">Hệ số CR x CD: ${(expectedCritMult * 100).toFixed(1)}%</div>
            </div>
        </div>
        
        <div style="margin-top:6px">
            <div style="font-size:13px;font-weight:700;color:var(--g);margin-bottom:8px">📦 Ước Tính Nguyên Liệu Nâng Cấp (${res.name}: Lv.${lvlFrom} → Lv.${lvlTo}):</div>
            ${resourceHtml}
        </div>
    `;
}

// ── INITIALIZE ON LOAD ──
document.addEventListener('DOMContentLoaded', () => {
    applyResonatorFilters();
    applyWeaponFilters();
    applyEchoFilters();
    initCalc();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    applyResonatorFilters();
    applyWeaponFilters();
    applyEchoFilters();
    initCalc();
}
