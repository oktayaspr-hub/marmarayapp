const fs = require('fs');

const content = `
<style>
.app-module-card { background: var(--glass-bg, #ffffff); border-radius: 20px; padding: 30px; border: 1px solid var(--glass-border, rgba(0,0,0,0.1)); box-shadow: var(--shadow-lg, 0 8px 32px rgba(0,0,0,0.05)); backdrop-filter: blur(20px); }
.app-module-card label { display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; font-size: 1.05rem; }
.app-module-card select { width: 100%; padding: 16px; border: 2px solid var(--border, rgba(0,0,0,0.08)); border-radius: 12px; background: #ffffff; font-size: 1.1rem; color: var(--text-primary); transition: all 0.3s; font-family: 'Outfit', sans-serif; margin-bottom: 20px; }
.app-module-card select:focus { border-color: var(--accent-blue); outline: none; box-shadow: 0 0 0 3px rgba(0,86,179,0.1); }
.primary-btn { width: 100%; padding: 18px; background: var(--accent-blue, #0056b3); color: white; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: 800; cursor: pointer; margin-top: 10px; transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.primary-btn:hover { background: #004494; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,86,179,0.3); }

.route-result-card { background: #ffffff; border-radius: 16px; padding: 25px; margin-top: 30px; border: 1px solid var(--border, rgba(0,0,0,0.08)); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.fare-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border, rgba(0,0,0,0.05)); font-size: 1.15rem; }
.fare-row:last-child { border-bottom: none; font-size: 1.3rem; font-weight: 800; color: var(--accent-blue, #0056b3); }
.fare-label { font-weight: 600; color: var(--text-secondary); }
.fare-value { font-weight: 800; color: var(--text-primary); }
.fare-value.free { color: #28a745; font-size: 1.5rem; }

.module-alert { background: rgba(0, 86, 179, 0.05); border-left: 4px solid var(--accent-blue, #0056b3); padding: 15px 20px; border-radius: 0 12px 12px 0; font-size: 0.95rem; margin-top: 25px; color: var(--text-secondary); line-height: 1.6; }
.module-alert strong { color: var(--accent-blue, #0056b3); }
</style>

<div class="app-module-card">
    <div>
        <label>Başlangıç İstasyonu:</label>
        <select id="ucret-origin">
            <option value="">Seçiniz...</option>
        </select>
    </div>
    
    <div>
        <label>Varış İstasyonu:</label>
        <select id="ucret-dest">
            <option value="">Seçiniz...</option>
        </select>
    </div>

    <div>
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
        <div class="route-result-card" id="ucret-result-box">
            <!-- Dinamik Sonuç -->
        </div>
        
        <div class="module-alert">
            <strong>Bilgi:</strong> İadeler otomatik olarak gerçekleşmemektedir. "Gittiğin Kadar Öde" sistemi gereği, Marmaray turnikeleri giriş esnasında kartınızdan <b>en uzun mesafe (tam parkur) ücretini</b> çeker. Yolculuğunuz sonunda istasyondan çıkış yaparken, bindiğiniz ve indiğiniz istasyonlar arasındaki net ücret hesaplanır ve kalan bakiye iade hakkınız doğar. En yakın <b>İadematik</b> cihazına giderek İstanbulkart'ınızı veya QR kodunuzu okutup iadenizi (para üstünü) almayı kesinlikle unutmayın! Aksi takdirde sistem sizden tam parkur ücreti tahsil etmiş sayılacaktır.
        </div>
    </div>
</div>

<script>
    const MARMARAY_STATIONS = [
      "Halkalı", "Mustafa Kemal", "Küçükçekmece", "Florya", "Florya Akvaryum", "Yeşilköy", "Yeşilyurt", 
      "Ataköy", "Bakırköy", "Yenimahalle", "Zeytinburnu", "Kazlıçeşme", "Yenikapı", "Sirkeci", 
      "Üsküdar", "Ayrılıkçeşmesi", "Söğütlüçeşme", "Feneryolu", "Göztepe", "Erenköy", "Suadiye", 
      "Bostancı", "Küçükyalı", "İdealtepe", "Süreyya Plajı", "Maltepe", "Cevizli", "Atalar", 
      "Başak", "Kartal", "Yunus", "Pendik", "Kaynarca", "Tersane", "Güzelyalı", "Aydıntepe", 
      "İçmeler", "Tuzla", "Çayırova", "Fatih", "Osmangazi", "Darıca", "Gebze"
    ];

    const TAM_TIERS = [17.70, 22.68, 26.15, 30.12, 35.32, 39.18];
    const IND_TIERS = [8.64, 10.74, 12.65, 14.54, 16.92, 18.81];

    const originSel = document.getElementById('ucret-origin');
    const destSel = document.getElementById('ucret-dest');
    
    MARMARAY_STATIONS.forEach((s, idx) => {
        originSel.innerHTML += \`<option value="\${idx}">\${s}</option>\`;
        destSel.innerHTML += \`<option value="\${idx}">\${s}</option>\`;
    });

    document.getElementById('ucret-calc-btn').addEventListener('click', () => {
        const originIdx = originSel.value;
        const destIdx = destSel.value;
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
</script>
`;

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_ucret_view.php', content, 'utf8');
