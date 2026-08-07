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
        <label>Başlangıç İstasyonu</label>
        <select id="rota-origin">
            <option value="">Marmaray İstasyonu Seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>Varış İstasyonu</label>
        <select id="rota-dest">
            <option value="">Marmaray İstasyonu Seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>Gidilecek Semt (Hedef İlçe)</label>
        <select id="rota-district">
            <option value="">İstanbul İlçeleri...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Belirtilen varış istasyonundan seçtiğiniz semte gitmek için kullanılabilecek önerilen güncel ulaşım alternatifleridir. Yürüme süreleri ortalamadır.
        </div>
    </div>
</div>

<script>
    const ROTA_STATIONS = [
      {id:'gebze',name:'Gebze'},{id:'darica',name:'Darıca'},{id:'osmangazi',name:'Osmangazi'},{id:'fatih',name:'Fatih'},{id:'cayirova',name:'Çayırova'},
      {id:'tuzla',name:'Tuzla'},{id:'icmeler',name:'İçmeler'},{id:'aydintepe',name:'Aydıntepe'},{id:'guzelyali',name:'Güzelyalı'},{id:'tersane',name:'Tersane'},
      {id:'kaynarca',name:'Kaynarca'},{id:'pendik',name:'Pendik'},{id:'yunus',name:'Yunus'},{id:'kartal',name:'Kartal'},{id:'basak',name:'Başak'},
      {id:'atalar',name:'Atalar'},{id:'cevizli',name:'Cevizli'},{id:'maltepe',name:'Maltepe'},{id:'sureyyaplaji',name:'Süreyya Plajı'},{id:'idealtepe',name:'İdealtepe'},
      {id:'kucukyali',name:'Küçükyalı'},{id:'bostanci',name:'Bostancı'},{id:'suadiye',name:'Suadiye'},{id:'erenkoy',name:'Erenköy'},{id:'goztepe',name:'Göztepe'},
      {id:'feneryolu',name:'Feneryolu'},{id:'sogutlucesme',name:'Söğütlüçeşme'},{id:'ayrilikcesmesi',name:'Ayrılıkçeşmesi'},{id:'uskudar',name:'Üsküdar'},{id:'sirkeci',name:'Sirkeci'},
      {id:'yenikapi',name:'Yenikapı'},{id:'kazlicesme',name:'Kazlıçeşme'},{id:'zeytinburnu',name:'Zeytinburnu'},{id:'yenimahalle',name:'Yenimahalle'},{id:'bakirkoy',name:'Bakırköy'},
      {id:'atakoy',name:'Ataköy'},{id:'yesilyurt',name:'Yeşilyurt'},{id:'yesilkoy',name:'Yeşilköy'},{id:'floryaakvaryum',name:'Florya Akvaryum'},{id:'florya',name:'Florya'},
      {id:'kucukcekmece',name:'Küçükçekmece'},{id:'mustafakemal',name:'Mustafa Kemal'},{id:'halkali',name:'Halkalı'}
    ];
    
    const DISTRICTS = [
        "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy",
        "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece",
        "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa",
        "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik",
        "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli",
        "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
    ];
    
    const rotaOriginSel = document.getElementById('rota-origin');
    const rotaDestSel = document.getElementById('rota-dest');
    const rotaDistSel = document.getElementById('rota-district');
    
    ROTA_STATIONS.forEach((s) => {
        rotaOriginSel.innerHTML += `<option value="${s.name}">${s.name}</option>`;
        rotaDestSel.innerHTML += `<option value="${s.name}">${s.name}</option>`;
    });
    
    DISTRICTS.forEach((d) => {
        rotaDistSel.innerHTML += `<option value="${d}">${d}</option>`;
    });
    
    document.getElementById('rota-calc-btn').addEventListener('click', () => {
        const start = rotaOriginSel.value;
        const end = rotaDestSel.value;
        const dist = rotaDistSel.value;
        
        if(!start || !end || !dist) {
            alert('Lütfen başlangıç istasyonu, varış istasyonu ve gidilecek semti seçiniz.');
            return;
        }
        if(start === end) {
            alert('Başlangıç ve varış istasyonu aynı olamaz.');
            return;
        }
        
        let html = '';
        
        html += `
        <div class="route-step">
            <div class="step-icon marmaray">M</div>
            <div class="step-content">
                <div class="step-title">${start} İstasyonundan Marmaray'a Binin</div>
                <div class="step-desc">Yön: ${end} istikametine doğru ilerleyin.</div>
            </div>
        </div>
        `;
        
        html += `
        <div class="route-step">
            <div class="step-icon walk">Y</div>
            <div class="step-content">
                <div class="step-title">${end} İstasyonunda İnin</div>
                <div class="step-desc">Turnikelerden çıkarak istasyonu terk edin.</div>
            </div>
        </div>
        `;
        
        // Dynamic simulated routing for the district
        const distRoutes = {
            "Beşiktaş": [{icon:"metro", type:"Metro", desc:"M2 veya bağlantılı otobüs hatlarını kullanarak aktarma yapın."}],
            "Beyoğlu": [{icon:"metro", type:"Metro", desc:"M2 Yenikapı - Hacıosman metrosuna aktarma yapın ve Taksim durağında inin."}],
            "Kadıköy": [{icon:"walk", type:"Yürüme", desc:"Ayrılıkçeşmesi veya Söğütlüçeşme durağından kısa yürüme mesafesindedir."}],
            "Fatih": [{icon:"tramvay", type:"Tramvay", desc:"Sirkeci durağında T1 Kabataş-Bağcılar tramvayına aktarma yapabilirsiniz."}],
            "Avcılar": [{icon:"metrobus", type:"Metrobüs", desc:"Söğütlüçeşme veya Küçükçekmece duraklarından Metrobüse aktarma yapabilirsiniz."}]
        };
        
        const r = distRoutes[dist] || [{icon:"walk", type:"Aktarma", desc:"Bulunduğunuz noktadan "+dist+" hedefine İETT otobüsleri veya minibüsler ile ulaşabilirsiniz."}];
        
        html += `
        <div class="route-step">
            <div class="step-icon ${r[0].icon}">${r[0].icon.charAt(0).toUpperCase()}</div>
            <div class="step-content">
                <div class="step-title">${dist} Yönüne Gidiş</div>
                <div class="step-desc">${r[0].desc}</div>
            </div>
        </div>
        `;
        
        document.getElementById('rota-steps-list').innerHTML = html;
        document.getElementById('rota-result-container').style.display = 'block';
    });
</script>
