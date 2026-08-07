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

.route-result-card { background: var(--bg-main); border-radius: 16px; padding: 25px; margin-top: 30px; border: 1px solid var(--border-color); }
.route-step { display: flex; align-items: flex-start; margin-bottom: 20px; position: relative; }
.route-step:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: -10px; width: 2px; background: var(--border-color); z-index: 1; }
.step-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-right: 20px; font-size: 0.9rem; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.step-icon.marmaray { background: var(--accent-red); color: white; }
.step-icon.metro { background: #0097e6; color: white; }
.step-icon.walk { background: #44bd32; color: white; }
.step-icon.vapur { background: #8c7ae6; color: white; }
.step-icon.tramvay { background: #e1b12c; color: white; }
.step-icon.metrobus { background: #e84118; color: white; }
.step-content { flex: 1; padding-top: 5px; }
.step-title { font-weight: 800; color: var(--text-primary); font-size: 1.1rem; }
.step-desc { font-size: 0.95rem; color: var(--text-secondary); margin-top: 6px; font-weight: 500; }

.module-alert { background: rgba(0, 86, 179, 0.05); border-left: 4px solid var(--primary-color); padding: 15px 20px; border-radius: 0 12px 12px 0; font-size: 0.95rem; margin-top: 25px; color: var(--text-secondary); line-height: 1.6; }
.module-alert strong { color: var(--primary-color); }
</style>

<div class="app-module-card">
    <div class="input-group">
        <label>Nereden (Marmaray İstasyonu)</label>
        <select id="rota-origin">
            <option value="">İstasyon Seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>Nereye (Hedef İlçe)</label>
        <select id="rota-dest">
            <option value="">İlçe Seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group" id="rota-target-group" style="display:none;">
        <label>Hedef Konum</label>
        <select id="rota-target">
            <option value="">Konum Seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rotayı Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-result">
        </div>
        
        <div class="module-alert">
            <strong>Bilgi:</strong> Sistemimiz ulaşım rotanızı temel raylı ağlar (Metro, Tramvay, Metrobüs ve Marmaray) üzerinden optimize ederek oluşturmaktadır. Seçtiğiniz semte tam ulaşım sağlayabilmek için kendi güzergahınız üzerinde ek olarak otobüs, minibüs, vapur veya taksi gibi diğer ulaşım araçlarını kullanmanız gerekebilir.
        </div>
    </div>
</div>

<script type="module">
    import { STATIONS } from '<?php echo esc_url( plugins_url( 'assets/js/data.js', __FILE__ ) ); ?>';
    import { ISTANBUL_DISTRICTS } from '<?php echo esc_url( plugins_url( 'assets/data/istanbulDistricts.js', __FILE__ ) ); ?>';
    import { calculateRoute } from '<?php echo esc_url( plugins_url( 'assets/utils/router.js', __FILE__ ) ); ?>';
    
    const originSel = document.getElementById('rota-origin');
    const destSel = document.getElementById('rota-dest');
    const targetSel = document.getElementById('rota-target');
    const targetGroup = document.getElementById('rota-target-group');
    
    STATIONS.forEach(s => {
        originSel.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
    
    ISTANBUL_DISTRICTS.forEach(d => {
        destSel.innerHTML += `<option value="${d.id}">${d.name}</option>`;
    });
    
    destSel.addEventListener('change', () => {
        const distObj = ISTANBUL_DISTRICTS.find(d => d.id === destSel.value);
        if (distObj && distObj.targetLocations) {
            targetSel.innerHTML = '<option value="">Konum Seçiniz...</option>';
            distObj.targetLocations.forEach(loc => {
                targetSel.innerHTML += `<option value="${loc.id}">${loc.name}</option>`;
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
            alert('Lütfen kalkış ve hedef seçiniz.');
            return;
        }
        if(targetGroup.style.display !== 'none' && !target) {
            alert('Lütfen hedef konumu seçiniz.');
            return;
        }
        
        const btn = document.getElementById('rota-calc-btn');
        btn.textContent = 'Hesaplanıyor...';
        
        try {
            const t = (k) => k; 
            const res = await calculateRoute(origin, dest, "fastest", target, t);
            const resEl = document.getElementById('rota-result');
            
            if (res.error) {
                resEl.innerHTML = `<div style="color:var(--accent-red); font-weight:bold;">${res.error}</div>`;
            } else if (res.info) {
                resEl.innerHTML = `<div style="color:#4cd137; font-weight:bold;">Seçtiğiniz Marmaray istasyonu zaten hedeflediğiniz konumda!</div>`;
            } else if (res.path) {
                let html = `<div style="margin-bottom:25px; font-weight:900; font-size:1.3rem; border-bottom:2px dashed var(--border-color); padding-bottom:15px; color:var(--text-primary);">Toplam Süre: Yaklaşık ${res.totalDuration} dk</div>`;
                
                res.path.forEach((step, idx) => {
                    let iconClass = 'yuruyus';
                    if (step.line.includes('Marmaray')) { iconClass = 'marmaray'; }
                    else if (step.line.includes('Metrobus')) { iconClass = 'marmaray'; }
                    else if (step.line.includes('Vapur')) { iconClass = 'marmaray'; }
                    else if (step.line.includes('Tramvay')) { iconClass = 'trenvay'; }
                    else if (step.line.includes('Metro')) { iconClass = 'metro'; }
                    
                    html += `
                    <div class="route-step">
                        <img src="<?php echo esc_url( plugins_url( 'assets/images/' . $iconClass . 'logo.svg', __FILE__ ) ); ?>" class="step-icon-img" style="width:40px; height:40px; margin-right:20px; z-index:2; border-radius:50%; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                        <div class="step-content">
                            <div class="step-title">${step.instruction}</div>
                            <div class="step-desc">${step.line} - ${step.duration} dk</div>
                        </div>
                    </div>`;
                });
                resEl.innerHTML = html;
            }
            document.getElementById('rota-result-container').style.display = 'block';
        } catch(e) {
            console.error(e);
            alert("Rota hesaplanırken bir hata oluştu.");
        }
        
        btn.textContent = 'Rotayı Planla';
    });
</script>
