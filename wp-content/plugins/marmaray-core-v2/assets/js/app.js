/**
 * MarmarayApp - app.js v4
 * - Gerçek TCDD sefer tablosu (data.js)
 * - S-harita zoom/pan + tren popup (tıklamada sonraki duraklar)
 * - Hover tooltip: yön + sonraki durak
 * - İstasyon seçici her zaman CANLI göstergesi
 * - Güzergah hattı tüm 43 durak
 */

import {
  STATIONS, CUM_G2H, CUM_H2G, TOTAL_G2H, TOTAL_H2G,
  getNextTrains, getTrainPosition, minsToHHMM,
  G2H_WEEKDAY, H2G_WEEKDAY, G2H_WEEKEND, H2G_WEEKEND
} from './data.js';

// ============================================================
// MAP LAYOUT (S-şekli, 1200x440)
// Satır 1 (üst)   : Halkalı(42) → Üsküdar(28) — soldan sağa
// Satır 2 (orta)  : Sirkeci(29) → Cevizli(16) — sağdan sola
// Satır 3 (alt)   : Maltepe(17) → Gebze(0)    — soldan sağa
// ============================================================
const MAP_W  = 1200, MAP_H = 440;
const ROW1_Y = 80,  ROW2_Y = 220, ROW3_Y = 360;
const LX = 80, RX = 1120;

const ROW1 = Array.from({length:15}, (_,i) => 42-i); // 42..28
const ROW2 = Array.from({length:14}, (_,i) => 29-i); // 29..16
const ROW3 = Array.from({length:17}, (_,i) => 17-i).concat([0]); // 17..0

const getCoord = (idx) => {
  let p = ROW1.indexOf(idx);
  if (p !== -1) return { x: LX + p * (RX-LX)/(ROW1.length-1), y: ROW1_Y };
  p = ROW2.indexOf(idx);
  if (p !== -1) return { x: RX - p * (RX-LX)/(ROW2.length-1), y: ROW2_Y };
  p = ROW3.indexOf(idx);
  if (p !== -1) return { x: LX + p * (RX-LX)/(ROW3.length-1), y: ROW3_Y };
  return { x: LX, y: ROW1_Y };
};

const lerp = (fromIdx, toIdx, t) => {
  // Sağ kavis: idx 28↔29
  if ((fromIdx===28&&toIdx===29)||(fromIdx===29&&toIdx===28)) {
    const cx=RX+75, cy=(ROW1_Y+ROW2_Y)/2, r=75;
    const a = fromIdx===28 ? -Math.PI/2 + t*Math.PI : Math.PI/2 - t*Math.PI;
    return { x: cx+r*Math.cos(a), y: cy+r*Math.sin(a) };
  }
  // Sol kavis: idx 16↔17
  if ((fromIdx===16&&toIdx===17)||(fromIdx===17&&toIdx===16)) {
    const cx=LX-75, cy=(ROW2_Y+ROW3_Y)/2, r=75;
    const a = fromIdx===16 ? Math.PI/2+t*Math.PI : 1.5*Math.PI - t*Math.PI;
    return { x: cx+r*Math.cos(a), y: cy+r*Math.sin(a) };
  }
  const p1=getCoord(fromIdx), p2=getCoord(toIdx);
  return { x: p1.x+(p2.x-p1.x)*t, y: p1.y+(p2.y-p1.y)*t };
};

// ============================================================
// SVG TRACK DRAWING
// ============================================================
const buildSVG = () => {
  const c = 'var(--map-track)';
  const r1s=getCoord(ROW1[0]), r1e=getCoord(ROW1[ROW1.length-1]);
  const r2s=getCoord(ROW2[0]), r2e=getCoord(ROW2[ROW2.length-1]);
  const r3s=getCoord(ROW3[0]), r3e=getCoord(ROW3[ROW3.length-1]);
  return `<svg width="${MAP_W}" height="${MAP_H}" style="position:absolute;top:0;left:0;pointer-events:none;" id="track-svg">
    <line x1="${r1s.x}" y1="${ROW1_Y}" x2="${r1e.x}" y2="${ROW1_Y}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <path d="M${r1e.x} ${ROW1_Y} Q${RX+90} ${(ROW1_Y+ROW2_Y)/2} ${r2s.x} ${ROW2_Y}" fill="none" stroke="${c}" stroke-width="7"/>
    <line x1="${r2s.x}" y1="${ROW2_Y}" x2="${r2e.x}" y2="${ROW2_Y}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <path d="M${r2e.x} ${ROW2_Y} Q${LX-90} ${(ROW2_Y+ROW3_Y)/2} ${r3s.x} ${ROW3_Y}" fill="none" stroke="${c}" stroke-width="7"/>
    <line x1="${r3s.x}" y1="${ROW3_Y}" x2="${r3e.x}" y2="${ROW3_Y}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
  </svg>`;
};

// ============================================================
// İSTASYON DÜĞÜMLERİ
// ============================================================
const buildNodes = () => {
  let h = '';
  STATIONS.forEach((name, i) => {
    const { x, y } = getCoord(i);
    const onRow2 = ROW2.includes(i);
    const ly = onRow2 ? y-18 : y+16;
    h += `<div class="station-node" id="stn-${i}" data-idx="${i}" data-name="${name}" style="left:${x}px;top:${y}px;"></div>
          <div class="station-label" style="left:${x+5}px;top:${ly}px;">${name}</div>`;
  });
  return h;
};

// ============================================================
// HOVER TOOLTIP (yön + sonraki durak)
// ============================================================
const showStationTooltip = (idx, el) => {
  const tip = document.getElementById('station-tooltip');
  if (!tip) return;
  const name = STATIONS[idx];
  const g2h  = getNextTrains(idx, 'G2H');
  const h2g  = getNextTrains(idx, 'H2G');

  // Sonraki durak: G2H'de idx+1, H2G'de idx-1
  const halNextStation = idx < STATIONS.length-1 ? STATIONS[idx+1] : '(Son durak)';
  const gebNextStation = idx > 0                  ? STATIONS[idx-1] : '(Son durak)';

  const isSelected = el && el.classList.contains('station-selected');
  document.getElementById('tooltip-name').textContent = isSelected ? `Başlangıç Noktanız: ${name}` : name;
  document.getElementById('tooltip-halkali').textContent =
    g2h.length ? `← Halkalı  •  ${g2h[0].remainingMin} dk  •  Sonraki: ${halNextStation}` : '← Halkalı: sefer yok';
  document.getElementById('tooltip-gebze').textContent =
    h2g.length ? `Gebze →  •  ${h2g[0].remainingMin} dk  •  Sonraki: ${gebNextStation}` : 'Gebze →: sefer yok';

  const wr = document.getElementById('map-wrapper').getBoundingClientRect();
  const er = el.getBoundingClientRect();
  let left = er.left - wr.left + 22, top = er.top - wr.top - 10;
  if (left + 260 > document.getElementById('map-wrapper').offsetWidth) left -= 270;
  if (top < 0) top = 10;
  tip.style.left = left+'px'; tip.style.top = top+'px';
  tip.classList.add('visible');
};
const hideStationTooltip = () => {
  document.getElementById('station-tooltip')?.classList.remove('visible');
};

// ============================================================
// CANLI BADGE (her zaman görünür)
// ============================================================
const updateLiveBadge = () => {
  const el = document.getElementById('live-badge-text');
  if (el) el.textContent = 'CANLI';
};

// ============================================================
// TREN POPUP (tıklamada: sonraki duraklar + kaç dakika)
// ============================================================
const showTrainPopup = (trainEl, dir, elapsed) => {
  const popup  = document.getElementById('train-popup');
  const bodyEl = document.getElementById('train-popup-body');
  if (!popup || !bodyEl) return;

  const isG2H = dir === 'G2H';
  const cum    = isG2H ? CUM_G2H : CUM_H2G;
  const now    = new Date();
  const curMins = now.getHours()*60 + now.getMinutes() + now.getSeconds()/60;

  const { stationIdx } = getTrainPosition(dir, elapsed);

  let rows = '';
  const limit = Math.min(stationIdx + 7, cum.length);
  for (let i = stationIdx; i < limit; i++) {
    const offsetMins = cum[i] - cum[stationIdx];
    const absArrival = curMins + offsetMins;
    const realIdx    = isG2H ? i : (STATIONS.length-1-i);
    const sName      = STATIONS[realIdx];
    const isHere     = i === stationIdx;
    const minsLabel  = isHere ? 'Şu an' : (offsetMins < 1 ? '< 1 dk' : Math.ceil(offsetMins)+' dk');

    rows += `
      <div class="popup-arrival-row ${isHere ? 'next-arr' : ''}">
        <span class="popup-station-name">${isHere ? '📍 ' : ''}${sName}</span>
        <span>
          <span class="popup-mins ${isHere ? '' : ''}">${minsLabel}</span>
          ${!isHere ? `<span class="popup-time-str">${minsToHHMM(absArrival)}</span>` : ''}
        </span>
      </div>`;
  }

  bodyEl.innerHTML = rows || '<p style="color:var(--text-muted);padding:10px 0;text-align:center;">Son durağa ulaşıldı</p>';

  // Konumlandır
  const wr = document.getElementById('map-wrapper');
  const wR = wr.getBoundingClientRect(), tR = trainEl.getBoundingClientRect();
  let left = tR.left - wR.left + 30, top = tR.top - wR.top - 15;
  if (left + 295 > wr.offsetWidth) left = left - 310;
  if (top < 0) top = 10;
  popup.style.left = left+'px'; popup.style.top = top+'px';
  popup.classList.add('visible');
};
const hideTrainPopup = () => document.getElementById('train-popup')?.classList.remove('visible');

// ============================================================
// CANLI TRENLER (harita üzerinde)
// ============================================================
const renderLiveTrains = () => {
  const mapEl = document.getElementById('marmaray-map');
  if (!mapEl) return;
  mapEl.querySelectorAll('.train-node').forEach(e=>e.remove());

  const now = new Date();
  const curMins = now.getHours()*60 + now.getMinutes() + now.getSeconds()/60;
  const isWeekend = now.getDay()===0 || now.getDay()===6;
  const g2hSched = isWeekend ? G2H_WEEKEND : G2H_WEEKDAY;
  const h2gSched = isWeekend ? H2G_WEEKEND : H2G_WEEKDAY;
  
  const frag = document.createDocumentFragment();

  const processSchedule = (sched, totalDuration, dir) => {
    sched.forEach(depMins => {
      let active = false, elapsed = 0;
      if (depMins <= curMins && curMins <= depMins + totalDuration) {
        active = true; elapsed = curMins - depMins;
      } else if (depMins > 20*60 && curMins < 4*60) {
        // Night rollover
        const adjustedNow = curMins + 24*60;
        if (depMins <= adjustedNow && adjustedNow <= depMins + totalDuration) {
          active = true; elapsed = adjustedNow - depMins;
        }
      }
      
      if (active) {
        const { stationIdx, progress } = getTrainPosition(dir, elapsed);
        const fromStn = dir === 'G2H' ? stationIdx : STATIONS.length - 1 - stationIdx;
        const toStn = dir === 'G2H' ? stationIdx + 1 : fromStn - 1;
        if (dir === 'G2H' ? toStn >= STATIONS.length : toStn < 0) return;
        
        const coord = lerp(fromStn, toStn, progress);
        const coordNext = lerp(fromStn, toStn, Math.min(1, progress + 0.05));
        const coordPrev = lerp(fromStn, toStn, Math.max(0, progress - 0.05));
        const angle = Math.atan2(coordNext.y - coordPrev.y, coordNext.x - coordPrev.x) * 180 / Math.PI;

        const el = document.createElement('div');
        el.className = `train-node ${dir === 'G2H' ? 'train-g2h' : 'train-h2g'}`;
        el.style.left = coord.x+'px'; el.style.top = coord.y+'px';
        el.style.setProperty('--angle', angle + 'deg');
        el.innerHTML = '<svg viewBox="0 0 24 24" class="train-arrow"><polygon points="8,4 20,12 8,20" fill="black"/></svg>';
        el.dataset.dir = dir; el.dataset.elapsed = elapsed.toFixed(3);
        
        const nextIdx = dir === 'G2H' ? Math.min(stationIdx+1, STATIONS.length-1) : Math.max(STATIONS.length-1-stationIdx-1, 0);
        const dirName = dir === 'G2H' ? 'Halkalı Yönü' : 'Gebze Yönü';
        el.title = `→ ${dirName} | Sonraki: ${STATIONS[nextIdx]}`;
        frag.appendChild(el);
      }
    });
  };

  processSchedule(g2hSched, TOTAL_G2H, 'G2H');
  processSchedule(h2gSched, TOTAL_H2G, 'H2G');

  mapEl.appendChild(frag);

  // Tren tıklama → popup
  mapEl.querySelectorAll('.train-node').forEach(node => {
    // Hover: yön + sonraki durak tooltip
    node.addEventListener('mouseenter', () => {
      const tip = document.getElementById('station-tooltip');
      if (!tip) return;
      document.getElementById('tooltip-name').textContent = node.title.split('|')[0].trim();
      document.getElementById('tooltip-halkali').textContent = node.title.split('|')[1]?.trim() || '';
      document.getElementById('tooltip-gebze').textContent = '';
      const wr = document.getElementById('map-wrapper').getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      tip.style.left = (nr.left-wr.left+24)+'px';
      tip.style.top  = (nr.top-wr.top-10)+'px';
      tip.classList.add('visible');
    });
    node.addEventListener('mouseleave', hideStationTooltip);
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      showTrainPopup(node, node.dataset.dir, parseFloat(node.dataset.elapsed));
    });
  });
};

// ============================================================
// İSTASYON KARTI (seçili durak)
// ============================================================
let selectedIdx = null;

  const renderStationCards = (idx) => {
    const el = document.getElementById('station-cards');
    if (!el) return;
    const name = STATIONS[idx];
    const g2h = getNextTrains(idx, 'G2H');
    const h2g = getNextTrains(idx, 'H2G');

    const fmtShort = (m) => {
        m = parseInt(m, 10) || 0;
        if (m < 60) return m + ' dk';
        const h = Math.floor(m / 60), r = m % 60;
        return r ? (h + ' sa ' + r + ' dk') : (h + ' sa');
    };

    const countHtml = (m) => {
        m = parseInt(m, 10) || 0;
        if (m <= 0) {
            return '<div class="marmarayapp-next__count"><strong class="marmarayapp-next__now">Şimdi</strong><span class="marmarayapp-next__sub">peronda</span></div>';
        }
        if (m < 60) {
            return '<div class="marmarayapp-next__count"><strong>' + m + '<span class="marmarayapp-next__unit">dk</span></strong><span class="marmarayapp-next__sub">' + (m <= 2 ? 'yaklaşıyor' : 'sonra kalkıyor') + '</span></div>';
        }
        return '<div class="marmarayapp-next__count marmarayapp-next__count--long"><strong>' + fmtShort(m) + '</strong><span class="marmarayapp-next__sub">sonra kalkıyor</span></div>';
    };

    const buildTrainsHtml = (trains) => {
        if (!trains || !trains.length) {
            return '<div class="marmarayapp-empty marmarayapp-empty--error"><p class="marmarayapp-empty__txt">Şu anda yaklaşan sefer görünmüyor.</p></div>';
        }
        const first = trains[0];
        const rest = trains.slice(1, 5);
        const soon = (parseInt(first.remainingMin, 10) || 0) <= 2;
        let html = '<div class="marmarayapp-next' + (soon ? ' is-soon' : '') + '">' +
            '<span class="marmarayapp-next__tag">Sıradaki tren</span>' +
            '<div class="marmarayapp-next__body">' +
            countHtml(first.remainingMin) +
            '<div class="marmarayapp-next__clock"><strong>' + first.timeStr + '</strong></div>' +
            '</div>' +
            '<div class="marmarayapp-next__dest">Son durak <b>' + first.destination + '</b></div>' +
            '</div>';
        if (rest.length) {
            html += '<div class="marmarayapp-rows__head">Sonraki seferler</div><ul class="marmarayapp-rows">';
            rest.forEach(t => {
                html += '<li class="marmarayapp-row">' +
                    '<span class="marmarayapp-row__dest">' + t.destination + '</span>' +
                    '<span class="marmarayapp-row__min">' + fmtShort(t.remainingMin) + '</span>' +
                    '<span class="marmarayapp-row__at">' + t.timeStr + '</span>' +
                    '</li>';
            });
            html += '</ul>';
        }
        return html;
    };

    el.innerHTML = `<div class="marmarayapp" style="margin-top: 20px;">
        <div class="marmarayapp__panel">
            <div class="marmarayapp__grid">
                <div class="marmarayapp__dir marmarayapp__dir--h">
                    <div class="marmarayapp__dirhead" style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center;">
                            <svg class="marmarayapp__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right: 8px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            <div class="marmarayapp__dirname">Halkalı Yönü</div>
                        </div>
                        
                    </div>
                    <div class="marmarayapp__list" id="halkali-trains">
                        ${buildTrainsHtml(g2h)}
                    </div>
                </div>
                <div class="marmarayapp__dir marmarayapp__dir--g">
                    <div class="marmarayapp__dirhead" style="display: flex; justify-content: space-between; align-items: center;">
                        
                        <div style="display: flex; align-items: center;">
                            <div class="marmarayapp__dirname">Gebze Yönü</div>
                            <svg class="marmarayapp__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-left: 8px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </div>
                    <div class="marmarayapp__list" id="gebze-trains">
                        ${buildTrainsHtml(h2g)}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    el.style.display = 'block';

    document.querySelectorAll('.station-node').forEach(n=>n.classList.remove('station-selected'));
    document.getElementById(`stn-${idx}`)?.classList.add('station-selected');

    const globalLive = document.getElementById('global-live-badge');
    if (globalLive) globalLive.style.display = 'flex';
  };

const liveCountdownTick = () => {
  if (selectedIdx === null) return;
  const g2h = getNextTrains(selectedIdx,'G2H');
  const h2g = getNextTrains(selectedIdx,'H2G');
  document.getElementById('card-blue-mins')?.textContent != null &&
    (document.getElementById('card-blue-mins').textContent = g2h.length ? g2h[0].remainingMin : '-');
  document.getElementById('card-red-mins')?.textContent != null &&
    (document.getElementById('card-red-mins').textContent = h2g.length ? h2g[0].remainingMin : '-');
};

// ============================================================
// GÜZERGAH HATTI — tüm 43 durak + aktarma ikonları
// ============================================================
const TRANSFERS = {
  42:[{c:'m11',l:'M11'},{c:'yht',l:'YHT'}],
  40:[{c:'metrobus',l:'Metrobüs'}],
  38:[],
  37:[],
  36:[],
  35:[{c:'m9',l:'M9'}],
  34:[{c:'yht',l:'YHT'}],
  32:[{c:'tram',l:'T1'}],
  30:[{c:'m1',l:'M1'},{c:'m2',l:'M2'},{c:'ido',l:'İDO'}],
  29:[{c:'tram',l:'T1'},{c:'vapur',l:'Vapur'}],
  28:[{c:'m5',l:'M5'},{c:'vapur',l:'Vapur'}],
  27:[{c:'m4',l:'M4'}],
  26:[{c:'metrobus',l:'Metrobüs'},{c:'yht',l:'YHT'}],
  21:[{c:'vapur',l:'Vapur'}],
  13:[{c:'m4',l:'M4'}],
  11:[{c:'yht',l:'YHT'}],
  0: [{c:'yht',l:'YHT'}]
};

const renderTransferRow = () => {
  const row = document.getElementById('transfer-row');
  if (!row) return;
  row.innerHTML = '';
  // Halkalı(42) → Gebze(0) sırayla
  for (let i=42; i>=0; i--) {
    const icons = TRANSFERS[i] || [];
    const col = document.createElement('div');
    col.className = 'transfer-col';
    col.innerHTML = `
      <div class="t-icons-top">
        ${icons.map(ic=>`<span class="t-icon ${ic.c}">${ic.l}</span>`).join('')}
      </div>
      <div class="t-dot"></div>
      <div class="t-label">${STATIONS[i]}</div>`;
    row.appendChild(col);
  }
};

// ============================================================
// ZOOM & PAN
// ============================================================
let scale=1, panX=0, panY=0, isPanning=false, stPX=0, stPY=0;

const applyTf = () => {
  const el = document.getElementById('marmaray-map-scale');
  if (el) el.style.transform = `translate(${panX}px,${panY}px) scale(${scale})`;
};
const clamp = () => {
  const w = document.getElementById('map-wrapper');
  if (!w) return;
  panX = Math.min(0, Math.max(w.offsetWidth  - MAP_W*scale, panX));
  panY = Math.min(0, Math.max(w.offsetHeight - MAP_H*scale, panY));
};

const setupZoom = () => {
  // --- Marmaray Map ---
  const w = document.getElementById('map-wrapper');
  if (w) {
    w.addEventListener('wheel', e => {
      e.preventDefault();
      const d = e.deltaY < 0 ? 1.12 : 0.89;
      const ns = Math.min(3, Math.max(0.55, scale*d));
      const r = w.getBoundingClientRect();
      panX = e.clientX - r.left - (e.clientX - r.left - panX)*(ns/scale);
      panY = e.clientY - r.top  - (e.clientY - r.top  - panY)*(ns/scale);
      scale = ns; clamp(); applyTf();
    }, {passive:false});

    w.addEventListener('mousedown', e => {
      if (e.target.classList.contains('station-node') || e.target.classList.contains('train-node')) return;
      isPanning=true; stPX=e.clientX-panX; stPY=e.clientY-panY;
    });
    window.addEventListener('mousemove', e => {
      if (!isPanning) return;
      panX=e.clientX-stPX; panY=e.clientY-stPY; clamp(); applyTf();
    });
    window.addEventListener('mouseup', () => isPanning=false);

    let ltd=0;
    w.addEventListener('touchstart', e => {
      if (e.touches.length===1) { isPanning=true; stPX=e.touches[0].clientX-panX; stPY=e.touches[0].clientY-panY; }
      else if (e.touches.length===2) { isPanning=false; const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; ltd=Math.sqrt(dx*dx+dy*dy); }
    },{passive:true});
    w.addEventListener('touchmove', e => {
      if (e.touches.length===1&&isPanning) { panX=e.touches[0].clientX-stPX; panY=e.touches[0].clientY-stPY; clamp(); applyTf(); }
      else if (e.touches.length===2) { const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; const nd=Math.sqrt(dx*dx+dy*dy); scale=Math.min(3,Math.max(0.55,scale*(nd/ltd))); ltd=nd; clamp(); applyTf(); }
    },{passive:true});
    w.addEventListener('touchend', ()=>isPanning=false);

    document.getElementById('zoom-in')?.addEventListener('click', ()=>{ scale=Math.min(3,scale*1.2); clamp(); applyTf(); });
    document.getElementById('zoom-out')?.addEventListener('click', ()=>{ scale=Math.max(0.55,scale/1.2); clamp(); applyTf(); });
    document.getElementById('zoom-reset')?.addEventListener('click', ()=>{ scale=1; panX=0; panY=0; applyTf(); });
  }

  // --- Istanbul Map ---
  const istW = document.getElementById('istanbul-map-wrapper');
  if (istW) {
    let istScale=1, istPanX=0, istPanY=0, istIsPanning=false, istStPX=0, istStPY=0;
    const istScaleEl = document.getElementById('istanbul-map-scale');
    const imgEl = document.getElementById('istanbul-map-img');
    const istApply = () => { istScaleEl.style.transform = `translate(${istPanX}px,${istPanY}px) scale(${istScale})`; };
    const istClamp = () => {
      const minX = Math.min(0, istW.offsetWidth - istW.offsetWidth * istScale);
      const minY = Math.min(0, istW.offsetHeight - istW.offsetHeight * istScale);
      istPanX = Math.max(minX, Math.min(0, istPanX));
      istPanY = Math.max(minY, Math.min(0, istPanY));
    };

    istW.addEventListener('wheel', e => {
      e.preventDefault();
      const d = e.deltaY < 0 ? 1.12 : 0.89;
      const ns = Math.min(4, Math.max(0.3, istScale*d));
      const r = istW.getBoundingClientRect();
      istPanX = e.clientX - r.left - (e.clientX - r.left - istPanX)*(ns/istScale);
      istPanY = e.clientY - r.top  - (e.clientY - r.top  - istPanY)*(ns/istScale);
      istScale = ns; istClamp(); istApply();
    }, {passive:false});

    istW.addEventListener('mousedown', e => {
      istIsPanning=true; istStPX=e.clientX-istPanX; istStPY=e.clientY-istPanY;
    });
    window.addEventListener('mousemove', e => {
      if (!istIsPanning) return;
      istPanX=e.clientX-istStPX; istPanY=e.clientY-istStPY; istClamp(); istApply();
    });
    window.addEventListener('mouseup', () => istIsPanning=false);

    document.getElementById('ist-zoom-in')?.addEventListener('click', ()=>{ istScale=Math.min(4,istScale*1.2); istClamp(); istApply(); });
    document.getElementById('ist-zoom-out')?.addEventListener('click', ()=>{ istScale=Math.max(0.3,istScale/1.2); istClamp(); istApply(); });
    document.getElementById('ist-zoom-reset')?.addEventListener('click', ()=>{ istScale=1; istPanX=0; istPanY=0; istApply(); });
  }
};

// ============================================================
// TEMA DEĞİŞTİRME
// ============================================================
const setupTheme = () => {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!btn) return;
  const moon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sun  = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`;
  btn.addEventListener('click', ()=>{
    html.dataset.theme = html.dataset.theme==='dark' ? 'light' : 'dark';
    btn.innerHTML = html.dataset.theme==='dark' ? moon : sun;
  });
};

// ============================================================
// HAMBURGER MENÜ
// ============================================================
const setupMenu = () => {
  document.getElementById('mobile-toggle')?.addEventListener('click', ()=>{
    document.getElementById('main-nav')?.classList.toggle('open');
  });
};

// ============================================================
// SAAT
// ============================================================
const updateClock = () => {
  const el = document.getElementById('current-date-time');
  const dVal = document.getElementById('current-date-val');
  const tVal = document.getElementById('current-time-val');
  const n = new Date();
  const dateStr = n.toLocaleDateString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'});
  const timeStr = n.toLocaleTimeString('tr-TR',{hour12:false});
  
  if (el) {
      el.textContent = `${dateStr} ${timeStr}`;
  }
  if (dVal && tVal) {
      dVal.textContent = dateStr;
      tVal.textContent = timeStr;
  }
};

// ============================================================
// HARİTA INIT
// ============================================================
const initMap = () => {
  const mapEl = document.getElementById('marmaray-map');
  if (!mapEl) return;
  mapEl.innerHTML = buildSVG() + buildNodes();

  document.querySelectorAll('.station-node').forEach(node => {
    node.addEventListener('mouseenter', ()=> showStationTooltip(parseInt(node.dataset.idx), node));
    node.addEventListener('mouseleave', hideStationTooltip);
    node.addEventListener('click', ()=>{
      const idx = parseInt(node.dataset.idx);
      selectedIdx = idx;
      renderStationCards(idx);
      const sel = document.getElementById('station-dropdown');
      if (sel) sel.value = idx;
    });
  });
};

// ============================================================
// DROPDOWN
// ============================================================
const initDropdown = () => {
  const sel = document.getElementById('station-dropdown');
  if (!sel) return;
  sel.innerHTML = '<option value="" disabled selected>Durak seçiniz...</option>';
  STATIONS.forEach((name,i)=>{
    const o = document.createElement('option');
    o.value=i; o.textContent=name; sel.appendChild(o);
  });
  sel.addEventListener('change', ()=>{
    const idx = parseInt(sel.value);
    selectedIdx = idx;
    renderStationCards(idx);
  });
};

// ============================================================
// BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', ()=>{
  initMap();
  initDropdown();
  const dropdown = document.getElementById('station-dropdown');
  if(dropdown) {
      // Find Yenikapı index (usually 21 in STATIONS array)
      const yenikapiIdx = STATIONS.findIndex(s => s === "Yenikapı");
      if(yenikapiIdx !== -1) {
          dropdown.value = yenikapiIdx;
          setTimeout(() => { dropdown.dispatchEvent(new Event('change')); }, 100);
      }
  }
  setupZoom();
  setupTheme();
  setupMenu();
  updateClock();
  renderLiveTrains();
  renderTransferRow();

  // Popup kapat
  document.getElementById('train-popup-close')?.addEventListener('click', hideTrainPopup);
  document.getElementById('map-wrapper')?.addEventListener('click', e=>{
    if (!e.target.closest('.train-popup')&&!e.target.classList.contains('train-node')) hideTrainPopup();
    if (!e.target.closest('.station-tooltip')&&!e.target.classList.contains('station-node')&&!e.target.classList.contains('train-node')) hideStationTooltip();
  });

  // Her saniye
  setInterval(()=>{ updateClock(); renderLiveTrains(); liveCountdownTick(); }, 1000);
});
