<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_shortcode('marmaray_ucret', 'marmaray_ucret_sc');
function marmaray_ucret_sc() {
    ob_start();
    ?>
    <style>
    .ucret-wrapper { max-width: 600px; margin: 0 auto; font-family: system-ui,-apple-system,sans-serif; }
    .ucret-wrapper .input-group { margin-bottom: 15px; }
    .ucret-wrapper label { display: block; font-weight: 600; color: #2f3640; margin-bottom: 8px; }
    .ucret-wrapper select { width: 100%; padding: 12px; border: 1px solid #dcdde1; border-radius: 8px; background: #f5f6fa; font-size: 1rem; color: #2f3640; }
    .ucret-wrapper .fare-btn { width: 100%; padding: 14px; background: #e84118; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .ucret-wrapper .fare-btn:hover { background: #c23616; }
    .ucret-wrapper .fare-result-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 25px; border: 1px solid #e1e1e1; }
    .ucret-wrapper .fare-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f2f6; }
    .ucret-wrapper .fare-row:last-child { border-bottom: none; font-weight: 800; font-size: 1.2rem; color: #2f3640; }
    .ucret-wrapper .fare-val { font-weight: bold; }
    .ucret-wrapper .fare-val.text-danger { color: #e84118; }
    .ucret-wrapper .fare-val.text-success { color: #4cd137; }
    .ucret-wrapper .info-box { background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; border-left: 4px solid #ffeeba; }
    </style>
    
    <div class="ucret-wrapper">
        <h3 style="margin-top:0; color:#2f3640;">Ücret Hesapla (Gittiðin Kadar Öde)</h3>
        <div class="input-group">
            <label>Nereden (Kalkýþ Ýstasyonu)</label>
            <select id="ucret-origin">
                <option value="">Seçiniz...</option>
            </select>
        </div>
        <div class="input-group">
            <label>Nereye (Varýþ Ýstasyonu)</label>
            <select id="ucret-dest">
                <option value="">Seçiniz...</option>
            </select>
        </div>
        <div class="input-group">
            <label>Yolcu Tipi</label>
            <select id="ucret-type">
                <option value="tam">Tam</option>
                <option value="ogrenci">Öðrenci</option>
                <option value="indirimli">Ýndirimli (Öðretmen/Yaþlý)</option>
                <option value="ucretsiz">Ücretsiz (65+ / Engelli)</option>
            </select>
        </div>
        <button class="fare-btn" id="ucret-calc-btn">Hesapla</button>
        
        <div id="ucret-result-container" style="display:none;">
            <div class="fare-result-card">
                <div class="fare-row">
                    <span>Ýlk Giriþte Kesilen (En Uzun Mesafe)</span>
                    <span class="fare-val text-danger" id="ucret-max">-</span>
                </div>
                <div class="fare-row">
                    <span>Ýade Cihazýndan Geri Alýnan</span>
                    <span class="fare-val text-success" id="ucret-refund">+</span>
                </div>
                <div class="fare-row">
                    <span>Net Ödenen Ücret</span>
                    <span class="fare-val" id="ucret-net"></span>
                </div>
            </div>
            
            <div class="info-box">
                <strong>Önemli Uyarý:</strong> Ýade tutarýný alabilmek için, istasyondan çýkýþ yaptýktan sonra "Ýade Cihazlarýna" Ýstanbulkart'ýnýzý mutlaka okutmanýz gerekmektedir. Aksi takdirde en uzak mesafe ücreti (ilk giriþte kesilen tutar) tahsil edilmiþ olur.
            </div>
        </div>
    </div>
    
    <script type="module">
        import { STATIONS } from '/wp-content/plugins/marmaray-core-v2/assets/js/data.js';
        
        const originSel = document.getElementById('ucret-origin');
        const destSel = document.getElementById('ucret-dest');
        STATIONS.forEach((s, idx) => {
            originSel.innerHTML += <option value="\">\</option>;
            destSel.innerHTML += <option value="\">\</option>;
        });
        
        document.getElementById('ucret-calc-btn').addEventListener('click', () => {
            const origin = originSel.value;
            const dest = destSel.value;
            const type = document.getElementById('ucret-type').value;
            if(!origin || !dest) {
                alert('Lütfen kalkýþ ve varýþ istasyonlarýný seçiniz.');
                return;
            }
            if(origin === dest) {
                alert('Kalkýþ ve varýþ istasyonu ayný olamaz.');
                return;
            }
            
            const prices = {
                tam: [17.70, 22.67, 26.14, 29.89, 34.87, 39.17, 39.17],
                ogrenci: [8.64, 10.14, 12.01, 14.39, 16.89, 17.70, 17.70],
                ucretsiz: [0, 0, 0, 0, 0, 0, 0],
                indirimli: [12.67, 15.05, 17.18, 19.93, 22.31, 24.19, 24.19],
            };
            
            const dist = Math.abs(parseInt(dest) - parseInt(origin));
            let tier = 0;
            if (dist >= 1 && dist <= 7) tier = 0;
            else if (dist >= 8 && dist <= 14) tier = 1;
            else if (dist >= 15 && dist <= 21) tier = 2;
            else if (dist >= 22 && dist <= 28) tier = 3;
            else if (dist >= 29 && dist <= 35) tier = 4;
            else if (dist >= 36) tier = 5;
            
            const maxPrice = prices[type][5];
            const actualPrice = prices[type][tier];
            const refund = maxPrice - actualPrice;
            
            document.getElementById('ucret-max').textContent = maxPrice.toFixed(2) + ' TL';
            document.getElementById('ucret-refund').textContent = '+' + refund.toFixed(2) + ' TL';
            document.getElementById('ucret-net').textContent = actualPrice.toFixed(2) + ' TL';
            
            document.getElementById('ucret-result-container').style.display = 'block';
        });
    </script>
    <?php
    return ob_get_clean();
}

// [marmaray_rota_planla]
add_shortcode('marmaray_rota_planla', 'marmaray_rota_sc');
function marmaray_rota_sc() {
    ob_start();
    ?>
    <style>
    .rota-wrapper { max-width: 600px; margin: 0 auto; font-family: system-ui,-apple-system,sans-serif; }
    .rota-wrapper .input-group { margin-bottom: 15px; }
    .rota-wrapper label { display: block; font-weight: 600; color: #2f3640; margin-bottom: 8px; }
    .rota-wrapper select { width: 100%; padding: 12px; border: 1px solid #dcdde1; border-radius: 8px; background: #f5f6fa; font-size: 1rem; color: #2f3640; }
    .rota-wrapper .fare-btn { width: 100%; padding: 14px; background: #0097e6; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .rota-wrapper .fare-btn:hover { background: #007bb5; }
    .rota-wrapper .result-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 25px; border: 1px solid #e1e1e1; }
    .rota-wrapper .route-step { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .rota-wrapper .step-icon { width: 30px; height: 30px; border-radius: 50%; background: #f5f6fa; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; font-size: 0.8rem; }
    .rota-wrapper .step-icon.marmaray { background: #e84118; color: white; }
    .rota-wrapper .step-icon.metro { background: #0097e6; color: white; }
    .rota-wrapper .step-icon.walk { background: #44bd32; color: white; }
    .rota-wrapper .step-icon.vapur { background: #8c7ae6; color: white; }
    .rota-wrapper .step-icon.tramvay { background: #e1b12c; color: white; }
    .rota-wrapper .step-icon.metrobus { background: #c23616; color: white; }
    .rota-wrapper .step-content { flex: 1; }
    .rota-wrapper .step-title { font-weight: bold; color: #2f3640; }
    .rota-wrapper .step-desc { font-size: 0.85rem; color: #7f8fa6; margin-top: 4px; }
    </style>
    
    <div class="rota-wrapper">
        <h3 style="margin-top:0; color:#2f3640;">Marmaray Rota Planlayýcý</h3>
        <p style="font-size:0.9rem; color:#7f8fa6; margin-bottom: 20px;">
            Marmaray'dan Ýstanbul'un diðer ilçelerine (Metro, Metrobüs, Vapur, Tramvay vb.) en hýzlý nasýl gidebileceðinizi öðrenin.
        </p>
        
        <div class="input-group">
            <label>Nereden (Marmaray Ýstasyonu)</label>
            <select id="rota-origin">
                <option value="">Ýstasyon Seçiniz...</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>Nereye (Hedef Ýlçe)</label>
            <select id="rota-dest">
                <option value="">Ýlçe Seçiniz...</option>
            </select>
        </div>
        
        <div class="input-group" id="rota-target-group" style="display:none;">
            <label>Hedef Konum</label>
            <select id="rota-target">
                <option value="">Konum Seçiniz...</option>
            </select>
        </div>
        
        <button class="fare-btn" id="rota-calc-btn">Rotayý Planla</button>
        
        <div id="rota-result-container" style="display:none;">
            <div class="result-card" id="rota-result">
            </div>
        </div>
    </div>
    
    <script type="module">
        import { STATIONS } from '/wp-content/plugins/marmaray-core-v2/assets/js/data.js';
        import { ISTANBUL_DISTRICTS } from '/wp-content/plugins/marmaray-core-v2/assets/data/istanbulDistricts.js';
        import { calculateRoute } from '/wp-content/plugins/marmaray-core-v2/assets/utils/router.js';
        
        const originSel = document.getElementById('rota-origin');
        const destSel = document.getElementById('rota-dest');
        const targetSel = document.getElementById('rota-target');
        const targetGroup = document.getElementById('rota-target-group');
        
        STATIONS.forEach(s => {
            originSel.innerHTML += <option value="\">\</option>;
        });
        
        ISTANBUL_DISTRICTS.forEach(d => {
            destSel.innerHTML += <option value="\">\</option>;
        });
        
        destSel.addEventListener('change', () => {
            const distObj = ISTANBUL_DISTRICTS.find(d => d.id === destSel.value);
            if (distObj && distObj.targetLocations) {
                targetSel.innerHTML = '<option value="">Konum Seçiniz...</option>';
                distObj.targetLocations.forEach(loc => {
                    targetSel.innerHTML += <option value="\">\</option>;
                });
                targetGroup.style.display = 'block';
            } else {
                targetSel.innerHTML = '<option value="">Konum Seçiniz...</option>';
                targetGroup.style.display = 'none';
            }
        });
        
        document.getElementById('rota-calc-btn').addEventListener('click', async () => {
            const origin = originSel.value;
            const dest = destSel.value;
            const target = targetSel.value;
            
            if(!origin || !dest) {
                alert('Lütfen kalkýþ ve hedef seçiniz.');
                return;
            }
            if(targetGroup.style.display !== 'none' && !target) {
                alert('Lütfen hedef konumu seçiniz.');
                return;
            }
            
            const btn = document.getElementById('rota-calc-btn');
            btn.textContent = 'Hesaplanýyor...';
            
            try {
                // Translation mock for the router
                const t = (k) => k; 
                
                const res = await calculateRoute(origin, dest, "fastest", target, t);
                const resEl = document.getElementById('rota-result');
                
                if (res.error) {
                    resEl.innerHTML = <div style="color:#e84118; font-weight:bold;">\</div>;
                } else if (res.info) {
                    resEl.innerHTML = <div style="color:#4cd137; font-weight:bold;">Seçtiðiniz Marmaray istasyonu zaten hedeflediðiniz konumda!</div>;
                } else if (res.path) {
                    let html = <div style="margin-bottom:15px; font-weight:bold; font-size:1.1rem; border-bottom:1px solid #e1e1e1; padding-bottom:10px;">Toplam Süre: Yaklaþýk \ dk</div>;
                    
                    res.path.forEach((step, idx) => {
                        let iconClass = 'walk';
                        let iconText = 'Y';
                        if (step.line.includes('Marmaray')) { iconClass = 'marmaray'; iconText = 'M'; }
                        else if (step.line.includes('Metrobus')) { iconClass = 'metrobus'; iconText = 'MB'; }
                        else if (step.line.includes('Vapur')) { iconClass = 'vapur'; iconText = 'V'; }
                        else if (step.line.includes('Tramvay')) { iconClass = 'tramvay'; iconText = 'T'; }
                        else if (step.line.includes('Metro')) { iconClass = 'metro'; iconText = 'M'; }
                        
                        html += 
                        <div class="route-step">
                            <div class="step-icon \">\</div>
                            <div class="step-content">
                                <div class="step-title">\</div>
                                <div class="step-desc">\ - \ dk</div>
                            </div>
                        </div>;
                    });
                    resEl.innerHTML = html;
                }
                document.getElementById('rota-result-container').style.display = 'block';
            } catch(e) {
                console.error(e);
                alert("Rota hesaplanýrken bir hata oluþtu.");
            }
            
            btn.textContent = 'Rotayý Planla';
        });
    </script>
    <?php
    return ob_get_clean();
}
