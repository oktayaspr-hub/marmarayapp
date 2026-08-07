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
.step-icon img { width: 100%; height: 100%; object-fit: contain; padding: 5px; }
.step-icon.walk { background: #44bd32; color: white; border: none; font-weight: bold; font-size: 1.2rem; }
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
        <label>Varış İstasyonu:</label>
        <select id="rota-dest">
            <option value="">İstasyon seçiniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>Gidilecek Semt:</label>
        <select id="rota-district">
            <option value="">İlçe seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Seçilen ilçeye en hızlı ve mantıklı ulaşım ağları (Metro, Metrobüs, Tramvay, Vapur vb.) kullanılarak optimize edilmiş güncel rota önerisidir.
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
    
    // Logos
    const LOGOS = {
        marmaray: "<?php echo esc_url( plugins_url( 'assets/images/marmaray_logo_new.png', __FILE__ ) ); ?>",
        metro: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Metro_%C4%B0stanbul_logo.svg/200px-Metro_%C4%B0stanbul_logo.svg.png",
        metrobus: "https://upload.wikimedia.org/wikipedia/tr/0/05/%C4%B0ETT_logo.png",
        vapur: "https://sehirhatlari.istanbul/images/logo.svg",
        tramvay: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Metro_%C4%B0stanbul_logo.svg/200px-Metro_%C4%B0stanbul_logo.svg.png"
    };

    const rotaOriginSel = document.getElementById('rota-origin');
    const rotaDestSel = document.getElementById('rota-dest');
    const rotaDistSel = document.getElementById('rota-district');
    
    ROTA_STATIONS.forEach((s) => {
        rotaOriginSel.innerHTML += \`<option value="\${s.name}">\${s.name}</option>\`;
        rotaDestSel.innerHTML += \`<option value="\${s.name}">\${s.name}</option>\`;
    });
    
    DISTRICTS.forEach((d) => {
        rotaDistSel.innerHTML += \`<option value="\${d}">\${d}</option>\`;
    });
    
    // Mapping Districts to best transfer logic
    const distRoutes = {
        "Adalar": { bestDest: "Bostancı", logo: LOGOS.vapur, type: "Şehir Hatları Vapuru", desc: "Bostancı istasyonunda inerek Şehir Hatları İskelesi'nden Adalar vapuruna veya motorlara aktarma yapabilirsiniz." },
        "Arnavutköy": { bestDest: "Halkalı", logo: LOGOS.metro, type: "M11 Metro", desc: "Halkalı istasyonunda inerek M11 (Gayrettepe - İstanbul Havalimanı - Halkalı) metro hattına aktarma yapıp Arnavutköy yönüne gidebilirsiniz." },
        "Ataşehir": { bestDest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro", desc: "Ayrılıkçeşmesi istasyonunda M4 Kadıköy-Sabiha Gökçen Metrosu'na aktarma yapıp Yenisahra veya Kozyatağı durağında inebilirsiniz." },
        "Avcılar": { bestDest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece istasyonunda inerek doğrudan Metrobüs hattına aktarma yapabilir ve Avcılar yönüne gidebilirsiniz." },
        "Bağcılar": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1B Metro", desc: "Yenikapı istasyonunda inerek M1B Yenikapı-Kirazlı metro hattına aktarma yapıp Bağcılar'a ulaşabilirsiniz." },
        "Bahçelievler": { bestDest: "Bakırköy", logo: LOGOS.metro, type: "M3 veya M1A", desc: "Bakırköy istasyonundan M3 metrosuna geçerek İncirli'ye ulaşabilir veya Ataköy'den M9'a aktarma yapabilirsiniz." },
        "Bakırköy": { bestDest: "Bakırköy", logo: LOGOS.walk, type: "Yürüme", desc: "Bakırköy istasyonunda inerek ilçe merkezine kısa bir yürüyüşle ulaşabilirsiniz." },
        "Başakşehir": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1B + M3 Metro", desc: "Yenikapı'dan M1B metrosuna binip Kirazlı'da M3 Başakşehir metrosuna aktarma yapın." },
        "Bayrampaşa": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1A/M1B Metro", desc: "Yenikapı istasyonunda inerek M1A/M1B metro hattına aktarma yapıp Bayrampaşa durağında inebilirsiniz." },
        "Beşiktaş": { bestDest: "Sirkeci", logo: LOGOS.tramvay, type: "T1 Tramvay + Otobüs", desc: "Sirkeci istasyonunda T1 Tramvayına aktarma yapıp Kabataş'a gidin, oradan kısa bir otobüs veya yürüyüş ile Beşiktaş'a ulaşın." },
        "Beykoz": { bestDest: "Üsküdar", logo: LOGOS.metrobus, type: "İETT Otobüsleri", desc: "Üsküdar istasyonunda inerek 15 numaralı İETT sahil hatlarına aktarma yapın." },
        "Beylikdüzü": { bestDest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece istasyonunda Metrobüs hattına aktarma yapıp Beylikdüzü yönüne devam edin." },
        "Beyoğlu": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı istasyonundan M2 Yenikapı-Hacıosman metrosuna aktarma yapıp Şişhane veya Taksim durağında inin." },
        "Büyükçekmece": { bestDest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece istasyonunda Metrobüs hattına aktarma yapıp Beylikdüzü Son Durak'ta inerek otobüs aktarması yapın." },
        "Çatalca": { bestDest: "Halkalı", logo: LOGOS.metrobus, type: "İETT Otobüsleri", desc: "Halkalı istasyonunda inip Çatalca yönüne giden İETT hatlarını kullanın." },
        "Çekmeköy": { bestDest: "Üsküdar", logo: LOGOS.metro, type: "M5 Metro", desc: "Üsküdar istasyonunda inip M5 Üsküdar-Çekmeköy metro hattına aktarma yapın." },
        "Esenler": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1B Metro", desc: "Yenikapı istasyonundan M1B metrosuna aktarma yapıp Esenler Otogar durağında inebilirsiniz." },
        "Esenyurt": { bestDest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs + İETT", desc: "Küçükçekmece'de Metrobüse aktarma yapıp Avcılar veya Beylikdüzü'nden Esenyurt otobüslerine binin." },
        "Eyüpsultan": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1/M2 + T5 Tramvay", desc: "Yenikapı'dan metro ile Cibali veya Alibeyköy yönüne giderek T5 Eminönü-Alibeyköy tramvayına aktarma yapın." },
        "Fatih": { bestDest: "Sirkeci", logo: LOGOS.tramvay, type: "T1 Tramvay", desc: "Sirkeci istasyonunda inerek T1 Kabataş-Bağcılar tramvay hattına aktarma yapın." },
        "Gaziosmanpaşa": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1A/M1B + T4 Tramvay", desc: "Yenikapı'dan metroya binip Topkapı durağında T4 Topkapı-Mescidi Selam tramvayına aktarma yapın." },
        "Güngören": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1A Metro + T1 Tramvay", desc: "Yenikapı'dan M1A metrosuna binip Zeytinburnu'nda T1 tramvayına aktarma yapın." },
        "Kadıköy": { bestDest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro", desc: "Ayrılıkçeşmesi istasyonunda M4 metrosuna aktarma yapıp bir durak sonra Kadıköy merkeze ulaşın." },
        "Kağıthane": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M2 + M7 Metro", desc: "Yenikapı'dan M2 metrosuna binip Mecidiyeköy'de M7 Yıldız-Mahmutbey metrosuna aktarma yapın." },
        "Kartal": { bestDest: "Kartal", logo: LOGOS.walk, type: "Yürüme", desc: "Kartal istasyonunda inerek ilçe merkezine yürüyerek ulaşabilirsiniz." },
        "Küçükçekmece": { bestDest: "Küçükçekmece", logo: LOGOS.walk, type: "Yürüme", desc: "Küçükçekmece istasyonunda inerek merkeze kısa bir yürüme ile ulaşabilirsiniz." },
        "Maltepe": { bestDest: "Maltepe", logo: LOGOS.walk, type: "Yürüme", desc: "Maltepe istasyonunda inerek sahil veya merkeze yürüyerek ulaşabilirsiniz." },
        "Pendik": { bestDest: "Pendik", logo: LOGOS.walk, type: "Yürüme", desc: "Pendik istasyonunda inerek merkez çarşıya yürüyerek ulaşabilirsiniz." },
        "Sancaktepe": { bestDest: "Üsküdar", logo: LOGOS.metro, type: "M5 Metro", desc: "Üsküdar istasyonundan M5 metrosuna aktarma yaparak Sancaktepe yönüne gidebilirsiniz." },
        "Sarıyer": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı istasyonundan M2 Yenikapı-Hacıosman metrosuna aktarma yapıp Hacıosman son durakta inerek otobüs kullanın." },
        "Silivri": { bestDest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs + İETT", desc: "Metrobüs ile Tüyap son durağa gidip oradan Silivri otobüslerine aktarma yapın." },
        "Sultanbeyli": { bestDest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro + İETT", desc: "M4 metrosu ile Kartal veya Pendik'e giderek Sultanbeyli otobüs/minibüslerine aktarma yapın." },
        "Sultangazi": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M1A/M1B + T4 Tramvay", desc: "Yenikapı'dan Topkapı'ya geçip T4 Topkapı-Mescidi Selam tramvayına aktarma yapın." },
        "Şile": { bestDest: "Üsküdar", logo: LOGOS.metrobus, type: "İETT Otobüsleri", desc: "Üsküdar istasyonundan İETT'nin 139 veya 139A numaralı Şile-Ağva otobüslerine aktarma yapın." },
        "Şişli": { bestDest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı istasyonundan M2 Yenikapı-Hacıosman metrosuna aktarma yapıp Şişli-Mecidiyeköy durağında inin." },
        "Tuzla": { bestDest: "Tuzla", logo: LOGOS.walk, type: "Yürüme", desc: "Tuzla istasyonunda inerek ilçe merkezine ulaşabilirsiniz." },
        "Ümraniye": { bestDest: "Üsküdar", logo: LOGOS.metro, type: "M5 Metro", desc: "Üsküdar istasyonundan M5 Üsküdar-Çekmeköy metrosuna aktarma yaparak Ümraniye'ye ulaşın." },
        "Üsküdar": { bestDest: "Üsküdar", logo: LOGOS.walk, type: "Yürüme", desc: "Üsküdar istasyonunda inerek meydana ve sahil yoluna doğrudan ulaşabilirsiniz." },
        "Zeytinburnu": { bestDest: "Zeytinburnu", logo: LOGOS.tramvay, type: "T1 Tramvay / Yürüme", desc: "Zeytinburnu veya Kazlıçeşme istasyonunda inerek T1 tramvayı veya otobüs aktarması yapabilirsiniz." }
    };
    
    document.getElementById('rota-calc-btn').addEventListener('click', () => {
        const start = rotaOriginSel.value;
        const endOriginal = rotaDestSel.value;
        const dist = rotaDistSel.value;
        
        if(!start || !dist) {
            alert('Lütfen başlangıç istasyonunu ve gidilecek semti seçiniz.');
            return;
        }
        
        const routeData = distRoutes[dist];
        if(!routeData) return;
        
        const end = routeData.bestDest; // Automatically override dest station based on fastest district transfer
        rotaDestSel.value = end;
        
        if(start === end) {
            alert('Başlangıç istasyonu ile inilecek aktarma istasyonu aynı. Doğrudan ilçeye yönlendiriliyorsunuz.');
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
            <div class="step-icon walk">Y</div>
            <div class="step-content">
                <div class="step-title">\${end} İstasyonunda İnin ve Turnikelerden Çıkın</div>
                <div class="step-desc">İstasyondan çıkarak aktarma noktasına ilerleyin.</div>
            </div>
        </div>
        \`;
        
        html += \`
        <div class="route-step">
            <div class="step-icon">\${routeData.logo === LOGOS.walk ? 'Y' : \`<img src="\${routeData.logo}" alt="\${routeData.type}">\`}</div>
            <div class="step-content">
                <div class="step-title">\${dist} Yönüne Gidiş (\${routeData.type})</div>
                <div class="step-desc">\${routeData.desc}</div>
            </div>
        </div>
        \`;
        
        document.getElementById('rota-steps-list').innerHTML = html;
        document.getElementById('rota-result-container').style.display = 'block';
    });
</script>
`;

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
