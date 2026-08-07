const fs = require('fs');

let rotaContent = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

// The file currently has a style block, then a div.app-module-card, then a script.
// We need to inject tabs into div.app-module-card.

const TABS_HTML = `
    <div class="module-tabs">
        <button class="module-tab active" id="tab-rota">Rota Planla</button>
        <button class="module-tab" id="tab-ucret">Ücret Hesapla</button>
    </div>
`;

const UCRET_HTML = `
    <div id="ucret-section" style="display:none; margin-top: 20px;">
        <div class="input-group">
            <label>Başlangıç İstasyonu:</label>
            <select id="ucret-origin">
                <option value="">Seçiniz...</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>Varış İstasyonu:</label>
            <select id="ucret-dest">
                <option value="">Seçiniz...</option>
            </select>
        </div>

        <div class="input-group">
            <label>Yolcu Tipi:</label>
            <select id="ucret-type">
                <option value="">Seçiniz...</option>
                <option value="tam">Tam</option>
                <option value="indirimli">İndirimli (Öğrenci / Öğretmen vb.)</option>
                <option value="abonman">Abonman</option>
                <option value="ucretsiz">Ücretsiz (65 Yaş, Engelli, Basın vb.)</option>
            </select>
        </div>
        
        <button class="primary-btn" id="ucret-calc-btn">Ücret Hesapla</button>
        
        <div id="ucret-result-container" style="display:none;">
            <div class="route-result-card" id="ucret-result-box"></div>
            <div class="module-alert">
                <strong>Bilgi:</strong> İadeler otomatik olarak gerçekleşmemektedir. "Gittiğin Kadar Öde" sistemi gereği, Marmaray turnikeleri giriş esnasında kartınızdan <b>en uzun mesafe (tam parkur) ücretini</b> çeker. Yolculuğunuz sonunda istasyondan çıkış yaparken, bindiğiniz ve indiğiniz istasyonlar arasındaki net ücret hesaplanır ve kalan bakiye iade hakkınız doğar. En yakın <b>İadematik</b> cihazına giderek İstanbulkart'ınızı veya QR kodunuzu okutup iadenizi (para üstünü) almayı kesinlikle unutmayın! Aksi takdirde sistem sizden tam parkur ücreti tahsil etmiş sayılacaktır.
            </div>
        </div>
    </div>
`;

const TABS_CSS = `
.module-tabs { display: flex; gap: 10px; margin-bottom: 25px; background: rgba(0,0,0,0.03); padding: 5px; border-radius: 12px; }
.module-tab { flex: 1; padding: 12px; text-align: center; font-weight: 700; color: var(--text-secondary); cursor: pointer; border-radius: 8px; border: none; background: transparent; transition: all 0.3s; font-size: 1.05rem; }
.module-tab.active { background: white; color: var(--accent-blue); box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.fare-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border, rgba(0,0,0,0.05)); font-size: 1.15rem; }
.fare-row:last-child { border-bottom: none; font-size: 1.3rem; font-weight: 800; color: var(--accent-blue, #0056b3); }
.fare-label { font-weight: 600; color: var(--text-secondary); }
.fare-value { font-weight: 800; color: var(--text-primary); }
.fare-value.free { color: #28a745; font-size: 1.5rem; }
`;

const UCRET_JS = `
    const TAM_TIERS = [17.70, 22.68, 26.15, 30.12, 35.32, 39.18];
    const IND_TIERS = [8.64, 10.74, 12.65, 14.54, 16.92, 18.81];

    const uOriginSel = document.getElementById('ucret-origin');
    const uDestSel = document.getElementById('ucret-dest');
    
    ROTA_STATIONS.forEach((s, idx) => {
        uOriginSel.innerHTML += \`<option value="\${idx}">\${s.name}</option>\`;
        uDestSel.innerHTML += \`<option value="\${idx}">\${s.name}</option>\`;
    });

    document.getElementById('ucret-calc-btn').addEventListener('click', () => {
        const originIdx = uOriginSel.value;
        const destIdx = uDestSel.value;
        const type = document.getElementById('ucret-type').value;

        if(originIdx === "" || destIdx === "" || type === "") {
            alert('Lütfen başlangıç istasyonunu, varış istasyonunu ve yolcu tipini seçiniz.');
            return;
        }

        if(originIdx === destIdx) {
            alert('Başlangıç ve varış istasyonu aynı olamaz.');
            return;
        }

        const stops = Math.abs(parseInt(originIdx) - parseInt(destIdx));
        let tierIndex = 0;
        
        if(stops >= 1 && stops <= 7) tierIndex = 0;
        else if(stops >= 8 && stops <= 14) tierIndex = 1;
        else if(stops >= 15 && stops <= 21) tierIndex = 2;
        else if(stops >= 22 && stops <= 28) tierIndex = 3;
        else if(stops >= 29 && stops <= 35) tierIndex = 4;
        else tierIndex = 5;

        let html = '';

        if(type === 'abonman' || type === 'ucretsiz') {
            html = \`
                <div class="fare-row">
                    <span class="fare-label">Gidilen İstasyon Sayısı:</span>
                    <span class="fare-value">\${stops} İstasyon</span>
                </div>
                <div class="fare-row" style="justify-content: center; margin-top: 15px;">
                    <span class="fare-value free">ÜCRETSİZ</span>
                </div>
            \`;
        } else {
            let maxFare = (type === 'tam') ? TAM_TIERS[5] : IND_TIERS[5];
            let netFare = (type === 'tam') ? TAM_TIERS[tierIndex] : IND_TIERS[tierIndex];
            let refund = maxFare - netFare;

            html = \`
                <div class="fare-row">
                    <span class="fare-label">Gidilen Durak:</span>
                    <span class="fare-value">\${stops} İstasyon</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">Turnikeden Çekilecek (Max):</span>
                    <span class="fare-value">\${maxFare.toFixed(2)} TL</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">İadematikten Alınacak (İade):</span>
                    <span class="fare-value" style="color: #ff9800;">\${refund.toFixed(2)} TL</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">Net Yolculuk Ücreti:</span>
                    <span class="fare-value">\${netFare.toFixed(2)} TL</span>
                </div>
            \`;
        }

        document.getElementById('ucret-result-box').innerHTML = html;
        document.getElementById('ucret-result-container').style.display = 'block';
    });

    document.getElementById('tab-rota').addEventListener('click', () => {
        document.getElementById('tab-rota').classList.add('active');
        document.getElementById('tab-ucret').classList.remove('active');
        document.getElementById('rota-section').style.display = 'block';
        document.getElementById('ucret-section').style.display = 'none';
    });
    
    document.getElementById('tab-ucret').addEventListener('click', () => {
        document.getElementById('tab-ucret').classList.add('active');
        document.getElementById('tab-rota').classList.remove('active');
        document.getElementById('ucret-section').style.display = 'block';
        document.getElementById('rota-section').style.display = 'none';
    });
`;

rotaContent = rotaContent.replace('</style>', TABS_CSS + '\n</style>');
rotaContent = rotaContent.replace('<div class="app-module-card">', '<div class="app-module-card">\n' + TABS_HTML + '\n<div id="rota-section">');
rotaContent = rotaContent.replace('</div>\n</div>\n\n<script>', '</div>\n</div>\n' + UCRET_HTML + '\n</div>\n\n<script>');
rotaContent = rotaContent.replace('</script>', UCRET_JS + '\n</script>');

// Fix metro logo if step type matches
rotaContent = rotaContent.replace("let logoSrc = LOGOS[step.type] || LOGOS.walk;", "let logoSrc = LOGOS[step.type];\n            if(!logoSrc) { logoSrc = step.type.toLowerCase().includes('metro') ? LOGOS.metro : LOGOS.walk; }");


fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', rotaContent, 'utf8');
