const fs = require('fs');

let content = `
<style>
.app-module-card {
    background: var(--glass-bg);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(20px);
}
.app-module-card .input-group { margin-bottom: 20px; }
.app-module-card label { display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; font-size: 1.05rem; }
.app-module-card select { width: 100%; padding: 16px; border: 2px solid var(--border); border-radius: 12px; background: var(--panel-bg); font-size: 1.1rem; color: var(--text-primary); transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.app-module-card select:focus { border-color: var(--accent-blue); outline: none; box-shadow: 0 0 0 3px rgba(0,86,179,0.1); }
.app-module-card .primary-btn { width: 100%; padding: 18px; background: var(--accent-blue); color: white; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: 800; cursor: pointer; margin-top: 10px; transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.app-module-card .primary-btn:hover { background: #004494; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,86,179,0.3); }

.route-result-card { background: var(--panel-bg2); border-radius: 16px; padding: 25px; margin-top: 30px; border: 1px solid var(--border); }
.route-step { display: flex; align-items: flex-start; margin-bottom: 25px; position: relative; }
.route-step:not(:last-child)::after { content: ''; position: absolute; left: 24px; top: 50px; bottom: -15px; width: 2px; background: var(--border); z-index: 1; }
.step-icon { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; margin-right: 20px; z-index: 2; box-shadow: var(--shadow-sm); overflow: hidden; border: 2px solid var(--border); flex-shrink: 0; }
.step-icon img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
.step-icon.walk { border: none; }
.step-content { flex: 1; padding-top: 8px; }
.step-title { font-weight: 800; color: var(--text-primary); font-size: 1.15rem; }
.step-desc { font-size: 0.95rem; color: var(--text-secondary); margin-top: 6px; font-weight: 500; line-height: 1.5; }

.module-alert { background: rgba(0, 86, 179, 0.05); border-left: 4px solid var(--accent-blue); padding: 15px 20px; border-radius: 0 12px 12px 0; font-size: 0.95rem; margin-top: 25px; color: var(--text-secondary); line-height: 1.6; }
.module-alert strong { color: var(--accent-blue); }
</style>

<div class="app-module-card">
    <div class="input-group">
        <label>Başlangıç İstasyonu:</label>
        <select id="rota-origin">
            <option value="">İstasyon seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>Varış İlçesi:</label>
        <select id="rota-district">
            <option value="">İlçe seçiniz...</option>
        </select>
    </div>

    <div class="input-group" id="semt-group" style="display:none;">
        <label>Varış Semti:</label>
        <select id="rota-neighborhood">
            <option value="">Semt seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Seçilen semte en hızlı ve mantıklı ulaşım ağları (Metro, Metrobüs, Tramvay, Vapur vb.) kullanılarak optimize edilmiş güncel rota önerisidir.
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
    
    // Logos
    const LOGOS = {
        marmaray: "<?php echo esc_url( plugins_url( 'assets/images/marmaray.png', __FILE__ ) ); ?>",
        metro: "<?php echo esc_url( plugins_url( 'assets/images/metro.png', __FILE__ ) ); ?>",
        metrobus: "<?php echo esc_url( plugins_url( 'assets/images/metrobus.png', __FILE__ ) ); ?>",
        vapur: "<?php echo esc_url( plugins_url( 'assets/images/vapur.png', __FILE__ ) ); ?>",
        walk: "<?php echo esc_url( plugins_url( 'assets/images/walk.png', __FILE__ ) ); ?>"
    };

    // Neighborhood routing mapping
    const DISTRICT_MAP = {
        "Adalar": [
            { name: "Büyükada", dest: "Bostancı", logo: LOGOS.vapur, type: "Şehir Hatları Vapuru", desc: "Bostancı istasyonunda inip Bostancı İskelesi'nden Büyükada vapuruna binin." },
            { name: "Heybeliada", dest: "Bostancı", logo: LOGOS.vapur, type: "Şehir Hatları Vapuru", desc: "Bostancı istasyonunda inip Bostancı İskelesi'nden Heybeliada vapuruna binin." }
        ],
        "Avcılar": [
            { name: "Merkez", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece istasyonunda Metrobüs'e aktarma yaparak Avcılar Merkez durağında inin." },
            { name: "Cihangir", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece istasyonundan Metrobüs'e aktarma yaparak Avcılar Cihangir durağında inin." }
        ],
        "Bahçelievler": [
            { name: "Şirinevler", dest: "Bakırköy", logo: LOGOS.metro, type: "M1A Metro", desc: "Bakırköy istasyonundan İncirli durağına giderek M1A metrosu ile Şirinevler'e ulaşabilirsiniz." },
            { name: "Yenibosna", dest: "Bakırköy", logo: LOGOS.metro, type: "M1A Metro", desc: "Bakırköy istasyonundan İncirli durağına geçip M1A metrosu ile Yenibosna'ya gidin." }
        ],
        "Bakırköy": [
            { name: "İncirli", dest: "Bakırköy", logo: LOGOS.walk, type: "Yürüme", desc: "Bakırköy istasyonundan İncirli'ye kısa bir yürüyüş veya otobüs ile ulaşabilirsiniz." },
            { name: "Zeytinlik", dest: "Bakırköy", logo: LOGOS.walk, type: "Yürüme", desc: "Bakırköy istasyonundan çıkarak doğrudan Zeytinlik (Merkez) semtine geçebilirsiniz." }
        ],
        "Beşiktaş": [
            { name: "Levent", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 Yenikapı-Hacıosman metrosuna aktarma yapıp Levent durağında inin." },
            { name: "Ortaköy", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay + Otobüs", desc: "Sirkeci'den T1 Tramvayı ile Kabataş'a, oradan sahil otobüsleri ile Ortaköy'e geçin." },
            { name: "Merkez", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay + Otobüs", desc: "Sirkeci'den T1 Tramvayı ile Kabataş'a, ardından Beşiktaş merkeze kısa bir otobüs yolculuğu yapın." }
        ],
        "Beylikdüzü": [
            { name: "Kavaklı", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece'den Metrobüs'e aktarma yapıp Beylikdüzü son durakta inin." },
            { name: "Cumhuriyet", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece'den Metrobüs'e aktarma yapıp Cumhuriyet Mahallesi durağında inin." }
        ],
        "Beyoğlu": [
            { name: "Taksim", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna aktarma yapıp Taksim durağında inin." },
            { name: "Şişhane", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna aktarma yapıp Şişhane durağında inin." },
            { name: "Karaköy", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Sirkeci'den T1 Tramvayına binip Karaköy durağında inin." }
        ],
        "Fatih": [
            { name: "Sultanahmet", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Sirkeci istasyonunda inerek T1 Kabataş-Bağcılar tramvayı ile Sultanahmet'e ulaşın." },
            { name: "Aksaray", dest: "Yenikapı", logo: LOGOS.walk, type: "Yürüme / T1 Tramvay", desc: "Yenikapı istasyonundan Aksaray Meydanı'na kısa bir yürüyüş ile geçebilirsiniz." },
            { name: "Eminönü", dest: "Sirkeci", logo: LOGOS.walk, type: "Yürüme", desc: "Sirkeci istasyonundan Eminönü Meydanı'na yürüyerek ulaşabilirsiniz." }
        ],
        "Kadıköy": [
            { name: "Moda", dest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro + Yürüme", desc: "M4 metrosuyla Kadıköy'e inip Moda'ya yürüyebilir veya tramvaya binebilirsiniz." },
            { name: "Bostancı", dest: "Bostancı", logo: LOGOS.walk, type: "Yürüme", desc: "Bostancı istasyonunda inerek direkt semt merkezine çıkabilirsiniz." },
            { name: "Fikirtepe", dest: "Söğütlüçeşme", logo: LOGOS.walk, type: "Yürüme", desc: "Söğütlüçeşme istasyonundan Fikirtepe'ye yürüme mesafesindedir." }
        ],
        "Pendik": [
            { name: "Kurtköy", dest: "Pendik", logo: LOGOS.metro, type: "M4 Metro", desc: "Pendik'te inip M4 Tavşantepe-Sabiha Gökçen metrosuna aktarma yaparak Kurtköy'e ulaşın." },
            { name: "Kaynarca", dest: "Kaynarca", logo: LOGOS.walk, type: "Yürüme", desc: "Kaynarca istasyonunda inerek semte yaya olarak devam edin." }
        ],
        "Şişli": [
            { name: "Mecidiyeköy", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna aktarma yapıp Şişli-Mecidiyeköy durağında inin." },
            { name: "Nişantaşı", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna binip Osmanbey durağında inin." }
        ],
        "Üsküdar": [
            { name: "Çengelköy", dest: "Üsküdar", logo: LOGOS.walk, type: "Otobüs", desc: "Üsküdar'da inip sahilden kalkan 15 serisi otobüslerle Çengelköy'e geçin." },
            { name: "Altunizade", dest: "Üsküdar", logo: LOGOS.metro, type: "M5 Metro", desc: "Üsküdar'da inip M5 Üsküdar-Çekmeköy metrosuyla Altunizade durağında inin." }
        ],
        "Zeytinburnu": [
            { name: "Merkezefendi", dest: "Zeytinburnu", logo: LOGOS.walk, type: "Otobüs/Minibüs", desc: "Zeytinburnu istasyonunda inerek minibüs veya otobüs aktarması ile Merkezefendi'ye ulaşın." },
            { name: "Cevizlibağ", dest: "Kazlıçeşme", logo: LOGOS.metrobus, type: "Otobüs / Metrobüs", desc: "Kazlıçeşme'de inip Cevizlibağ yönüne giden otobüslere binebilirsiniz." }
        ]
    };
    
    // Add default neighborhoods for unmapped districts
    const ALL_DISTRICTS = [
        "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy",
        "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece",
        "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa",
        "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik",
        "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli",
        "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
    ];
    
    ALL_DISTRICTS.forEach(d => {
        if(!DISTRICT_MAP[d]) {
            DISTRICT_MAP[d] = [
                { name: d + " Merkez", dest: "Yenikapı", logo: LOGOS.walk, type: "İETT Otobüsü", desc: "Marmaray'dan inerek İETT otobüs hatları ile " + d + " merkezine ulaşabilirsiniz." }
            ];
        }
    });

    const rotaOriginSel = document.getElementById('rota-origin');
    const rotaDistSel = document.getElementById('rota-district');
    const rotaNeighSel = document.getElementById('rota-neighborhood');
    const semtGroup = document.getElementById('semt-group');
    
    ROTA_STATIONS.forEach((s) => {
        rotaOriginSel.innerHTML += \`<option value="\${s.name}">\${s.name}</option>\`;
    });
    
    Object.keys(DISTRICT_MAP).sort().forEach((d) => {
        rotaDistSel.innerHTML += \`<option value="\${d}">\${d}</option>\`;
    });
    
    rotaDistSel.addEventListener('change', () => {
        const dist = rotaDistSel.value;
        rotaNeighSel.innerHTML = '<option value="">Semt seçiniz...</option>';
        if(dist && DISTRICT_MAP[dist]) {
            DISTRICT_MAP[dist].forEach(n => {
                rotaNeighSel.innerHTML += \`<option value="\${n.name}">\${n.name}</option>\`;
            });
            semtGroup.style.display = 'block';
        } else {
            semtGroup.style.display = 'none';
        }
    });
    
    document.getElementById('rota-calc-btn').addEventListener('click', () => {
        const start = rotaOriginSel.value;
        const dist = rotaDistSel.value;
        const neigh = rotaNeighSel.value;
        
        if(!start || !dist || !neigh) {
            alert('Lütfen başlangıç istasyonu, ilçe ve semti eksiksiz seçiniz.');
            return;
        }
        
        const neighData = DISTRICT_MAP[dist].find(n => n.name === neigh);
        if(!neighData) return;
        
        const end = neighData.dest;
        
        if(start === end) {
            alert('Başlangıç istasyonu ile inilecek aktarma istasyonu aynı. Doğrudan semte yönlendiriliyorsunuz.');
        }
        
        let html = '';
        
        html += \`
        <div class="route-step">
            <div class="step-icon"><img src="\${LOGOS.marmaray}" alt="Marmaray"></div>
            <div class="step-content">
                <div class="step-title">\${start} İstasyonundan Marmaray'a Binin</div>
                <div class="step-desc">TCDD Marmaray hattı ile \${end} istikametine ilerleyin.</div>
            </div>
        </div>
        \`;
        
        html += \`
        <div class="route-step">
            <div class="step-icon walk"><img src="\${LOGOS.walk}" alt="Yürüme"></div>
            <div class="step-content">
                <div class="step-title">\${end} İstasyonunda İnin ve Turnikelerden Çıkın</div>
                <div class="step-desc">İstasyondan çıkarak aktarma noktasına ilerleyin.</div>
            </div>
        </div>
        \`;
        
        html += \`
        <div class="route-step">
            <div class="step-icon"><img src="\${neighData.logo}" alt="\${neighData.type}"></div>
            <div class="step-content">
                <div class="step-title">\${neigh} Yönüne Aktarma (\${neighData.type})</div>
                <div class="step-desc">\${neighData.desc}</div>
            </div>
        </div>
        \`;
        
        document.getElementById('rota-steps-list').innerHTML = html;
        document.getElementById('rota-result-container').style.display = 'block';
    });
</script>
`;

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
