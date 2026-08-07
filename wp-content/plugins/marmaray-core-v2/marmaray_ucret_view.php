<style>
.app-module-card {
    background: var(--bg-card);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.05);
    backdrop-filter: blur(10px);
}
.app-module-card .input-group { margin-bottom: 20px; }
.app-module-card label { display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; font-size: 1.05rem; }
.app-module-card select { width: 100%; padding: 16px; border: 2px solid var(--border-color); border-radius: 12px; background: var(--bg-main); font-size: 1.1rem; color: var(--text-primary); transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.app-module-card select:focus { border-color: var(--primary-color); outline: none; box-shadow: 0 0 0 3px rgba(0,86,179,0.1); }
.app-module-card .primary-btn { width: 100%; padding: 18px; background: var(--primary-color); color: white; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: 800; cursor: pointer; margin-top: 10px; transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.app-module-card .primary-btn:hover { background: #004494; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,86,179,0.3); }

.fare-result-card { background: var(--bg-main); border-radius: 16px; padding: 25px; margin-top: 30px; border: 1px solid var(--border-color); }
.fare-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px dashed var(--border-color); align-items: center; }
.fare-row:last-child { border-bottom: none; font-weight: 900; font-size: 1.4rem; color: var(--text-primary); margin-top: 10px; padding-bottom: 0; }
.fare-val { font-weight: 800; font-size: 1.2rem; }
.text-danger { color: var(--accent-red); }
.text-success { color: #4cd137; }

.module-alert { background: rgba(232, 65, 24, 0.05); border-left: 4px solid var(--accent-red); padding: 15px 20px; border-radius: 0 12px 12px 0; font-size: 0.95rem; margin-top: 25px; color: var(--text-secondary); line-height: 1.6; }
.module-alert strong { color: var(--accent-red); }
</style>

<div class="app-module-card">
    <div class="input-group">
        <label>Başlangıç İstasyonu</label>
        <select id="ucret-origin">
            <option value="">İstasyon Seçiniz...</option>
        </select>
    </div>
    <div class="input-group">
        <label>Varış İstasyonu</label>
        <select id="ucret-dest">
            <option value="">İstasyon Seçiniz...</option>
        </select>
    </div>
    <div class="input-group">
        <label>Bilet Tipi / Yolcu</label>
        <select id="ucret-type">
            <option value="tam">Tam Bilet</option>
            <option value="ogrenci">Öğrenci</option>
            <option value="indirimli">İndirimli (Öğretmen / 60 Yaş)</option>
            <option value="abonman">Abonman (Aylık Mavi Kart)</option>
        </select>
    </div>
    <button class="primary-btn" id="ucret-calc-btn">Ücreti Hesapla</button>
    
    <div id="ucret-result-container" style="display:none;">
        <div class="fare-result-card">
            <div class="fare-row">
                <span>İlk Girişte Kesilen Tutar (En Uzak Mesafe)</span>
                <span class="fare-val text-danger" id="ucret-max">-</span>
            </div>
            <div class="fare-row">
                <span>İade Cihazından Geri Alınan</span>
                <span class="fare-val text-success" id="ucret-refund">+</span>
            </div>
            <div class="fare-row">
                <span>Net Ödenen Ücret</span>
                <span class="fare-val" id="ucret-net"></span>
            </div>
        </div>
        
        <div class="module-alert">
            <strong>Önemli Uyarı:</strong> İade tutarını alabilmek için, istasyondan çıkış yaptıktan sonra turuncu renkli "İade Cihazlarına" İstanbulkart'ınızı mutlaka okutmanız gerekmektedir. Aksi takdirde en uzak mesafe ücreti (ilk girişte kesilen tutar) kartınızdan tahsil edilmiş olur. Resmi TCDD verisi değildir.
        </div>
    </div>
</div>

<script type="module">
    import { STATIONS } from '<?php echo esc_url( plugins_url( 'assets/js/data.js', __FILE__ ) ); ?>';
    
    const originSel = document.getElementById('ucret-origin');
    const destSel = document.getElementById('ucret-dest');
    STATIONS.forEach((s) => {
        originSel.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        destSel.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
    
    document.getElementById('ucret-calc-btn').addEventListener('click', () => {
        const origin = originSel.value;
        const dest = destSel.value;
        const type = document.getElementById('ucret-type').value;
        if(!origin || !dest) {
            alert('Lütfen başlangıç ve varış istasyonlarını seçiniz.');
            return;
        }
        if(origin === dest) {
            alert('Başlangıç ve varış istasyonu aynı olamaz.');
            return;
        }
        
        const prices = {
            tam: [17.70, 22.67, 26.14, 29.89, 34.87, 39.17, 39.17],
            ogrenci: [8.64, 10.14, 12.01, 14.39, 16.89, 17.70, 17.70],
            abonman: [0, 0, 0, 0, 0, 0, 0],
            indirimli: [12.67, 15.05, 17.18, 19.93, 22.31, 24.19, 24.19],
        };
        
        const idxO = STATIONS.findIndex(s=>s.id===origin);
        const idxD = STATIONS.findIndex(s=>s.id===dest);
        const stops = Math.abs(idxO - idxD);
        
        let tier = 0;
        if(stops >= 1 && stops <= 7) tier = 0;
        else if(stops >= 8 && stops <= 14) tier = 1;
        else if(stops >= 15 && stops <= 21) tier = 2;
        else if(stops >= 22 && stops <= 28) tier = 3;
        else if(stops >= 29 && stops <= 35) tier = 4;
        else if(stops >= 36 && stops <= 43) tier = 5;
        else tier = 6;
        
        const maxFare = prices[type][6];
        const netFare = prices[type][tier];
        const refund = maxFare - netFare;
        
        document.getElementById('ucret-max').textContent = type === 'abonman' ? '1 Biniş' : maxFare.toFixed(2) + ' ₺';
        document.getElementById('ucret-refund').textContent = type === 'abonman' ? 'Yok' : refund.toFixed(2) + ' ₺';
        document.getElementById('ucret-net').textContent = type === 'abonman' ? 'Geçerli' : netFare.toFixed(2) + ' ₺';
        
        document.getElementById('ucret-result-container').style.display = 'block';
    });
</script>
