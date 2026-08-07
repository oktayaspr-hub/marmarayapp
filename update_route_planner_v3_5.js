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

.route-result-card { background: var(--panel-bg); border-radius: 16px; padding: 25px; margin-top: 30px; border: 1px solid var(--border); }
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
        <label>Aktarma Noktası / Hedef Rota:</label>
        <select id="rota-neighborhood">
            <option value="">Hedef hat seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Sizi gitmek istediğiniz bölgeye ulaştıracak <b>en hızlı ana omurga raylı sisteme</b> yönlendiriyoruz. Bıraktığımız noktadan sonra son hedefinize ulaşmak için minibüs, otobüs veya yaya gibi ek ulaşım seçeneklerini değerlendirmeniz gerekebilir. Tüm sorumluluk kullanıcıya aittir.
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

    // Advanced Transit Mapping
    const DISTRICT_MAP = {
        "Adalar": [
            { name: "Şehir Hatları (Büyükada / Heybeliada)", dest: "Bostancı", logo: LOGOS.vapur, type: "Vapur", desc: "Marmaray'dan Bostancı'da inerek İDO veya Şehir Hatları iskelesinden Adalar motor/vapurlarına aktarma yapın." }
        ],
        "Arnavutköy": [
            { name: "M11 İstanbul Havalimanı Metrosu", dest: "Halkalı", logo: LOGOS.metro, type: "M11 Metro", desc: "Marmaray ile Halkalı'ya geçin, oradan M11 Havalimanı metrosu ile Arnavutköy'e ulaşabilirsiniz." }
        ],
        "Ataşehir": [
            { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", dest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro", desc: "Ayrılıkçeşmesi istasyonunda M4 Metrosuna geçip Yenisahra veya Kozyatağı'nda inerek Ataşehir'e geçin." },
            { name: "M8 Bostancı - Parseller Metrosu", dest: "Bostancı", logo: LOGOS.metro, type: "M8 Metro", desc: "Bostancı istasyonunda inip M8 Metrosuna geçiş yapın ve İçerenköy veya Kayışdağı duraklarında inin." }
        ],
        "Avcılar": [
            { name: "Metrobüs (Avcılar Merkez/Cihangir)", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Marmaray'dan Küçükçekmece'de inerek Metrobüs'e aktarma yapın ve Avcılar yönüne doğru devam edin." }
        ],
        "Bağcılar": [
            { name: "M1B Yenikapı - Kirazlı Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "M1B Metro", desc: "Yenikapı'da inerek M1B Kirazlı metrosuna geçin ve Bağcılar Meydan'a veya Kirazlı'ya ulaşın." },
            { name: "T1 Kabataş - Bağcılar Tramvayı", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Sirkeci'de inip T1 tramvay hattına geçerek Bağcılar son durağa kadar seyahat edebilirsiniz." }
        ],
        "Bahçelievler": [
            { name: "M1A Yenikapı - Havalimanı Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "M1A Metro", desc: "Yenikapı'da inip M1A metrosuna aktarma yapın ve Şirinevler veya Yenibosna duraklarında inin." },
            { name: "Metrobüs (Şirinevler / Yenibosna)", dest: "Söğütlüçeşme", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Söğütlüçeşme'de Metrobüse aktarma yaparak Bahçelievler, Şirinevler veya Yenibosna duraklarında inin." }
        ],
        "Bakırköy": [
            { name: "M3 Bakırköy Sahil - Kayaşehir Metrosu", dest: "Bakırköy", logo: LOGOS.metro, type: "M3 Metro", desc: "Marmaray Bakırköy istasyonundan M3 metrosuna geçerek İncirli veya Haznedar yönüne gidebilirsiniz." },
            { name: "Bakırköy Merkez (Yürüme)", dest: "Bakırköy", logo: LOGOS.walk, type: "Yürüme", desc: "Bakırköy istasyonundan çıkarak doğrudan ilçe merkezine yürüyebilirsiniz." }
        ],
        "Başakşehir": [
            { name: "M3 Bakırköy Sahil - Kayaşehir Metrosu", dest: "Bakırköy", logo: LOGOS.metro, type: "M3 Metro", desc: "Bakırköy'de inip doğrudan M3 metrosuna aktarma yapın ve Başakşehir yönüne doğru gidin." },
            { name: "M9 Ataköy - Olimpiyat Metrosu", dest: "Ataköy", logo: LOGOS.metro, type: "M9 Metro", desc: "Ataköy istasyonundan M9 metrosuna binerek İkitelli Sanayi veya Olimpiyat yönüne gidebilirsiniz." }
        ],
        "Bayrampaşa": [
            { name: "M1A / M1B Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "Metro", desc: "Yenikapı istasyonunda inerek M1A veya M1B hattına aktarma yapıp Bayrampaşa-Maltepe veya Sağmalcılar'da inin." }
        ],
        "Beşiktaş": [
            { name: "M2 Yenikapı - Hacıosman Metrosu (Levent)", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'da inip M2 Hacıosman metrosuna binerek Levent, 4. Levent veya Gayrettepe'ye gidebilirsiniz." },
            { name: "M7 Yıldız - Mahmutbey Metrosu (Yıldız / Mecidiyeköy)", dest: "Yenikapı", logo: LOGOS.metro, type: "M7 Metro", desc: "Yenikapı'dan M2 ile Mecidiyeköy'e geçip oradan M7 metrosuna aktarma yaparak Yıldız durağında (Beşiktaş) inebilirsiniz." },
            { name: "Şehir Hatları Vapuru (Beşiktaş İskelesi)", dest: "Üsküdar", logo: LOGOS.vapur, type: "Vapur", desc: "Üsküdar istasyonunda inip Vapur ile karşıya geçerek Beşiktaş Meydan'a doğrudan ulaşabilirsiniz." }
        ],
        "Beykoz": [
            { name: "İETT Otobüsleri (Kıyı Şeridi)", dest: "Üsküdar", logo: LOGOS.walk, type: "Otobüs", desc: "Marmaray ile Üsküdar'da inerek sahil boyu (15 serisi) İETT otobüsleri veya dolmuşlarıyla Beykoz'a geçebilirsiniz." }
        ],
        "Beylikdüzü": [
            { name: "Metrobüs (Beylikdüzü / TÜYAP)", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece'de inip Metrobüse aktarma yapın, Beylikdüzü Belediye veya TÜYAP (son durak) istasyonlarında inin." }
        ],
        "Beyoğlu": [
            { name: "M2 Yenikapı - Hacıosman Metrosu (Taksim / Şişhane)", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna binerek Şişhane veya Taksim durağında inin." },
            { name: "T1 Kabataş - Bağcılar Tramvayı (Karaköy / Tophane)", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Sirkeci'den T1 Tramvay hattına geçerek Karaköy, Tophane veya Kabataş duraklarında inin." },
            { name: "Şehir Hatları Vapuru (Kasımpaşa / Hasköy)", dest: "Üsküdar", logo: LOGOS.vapur, type: "Vapur", desc: "Üsküdar'dan Haliç Hattı vapurlarına binerek Kasımpaşa iskelesinde inebilirsiniz." }
        ],
        "Fatih": [
            { name: "T1 Kabataş - Bağcılar Tramvayı (Sultanahmet)", dest: "Sirkeci", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Sirkeci'de T1 tramvayına aktarma yaparak Sultanahmet, Beyazıt veya Laleli'ye gidin." },
            { name: "M1 / M2 Metrosu (Aksaray / Vezneciler)", dest: "Yenikapı", logo: LOGOS.metro, type: "Metro", desc: "Yenikapı istasyonundan Aksaray Meydanı'na yürüyebilir veya M2 ile Vezneciler'e çıkabilirsiniz." },
            { name: "Fatih Merkez (Yürüme / Otobüs)", dest: "Sirkeci", logo: LOGOS.walk, type: "Yürüme / Otobüs", desc: "Sirkeci'den Eminönü'ne yürüyebilir veya otobüs aktarmasıyla Fatih'in iç bölgelerine ulaşabilirsiniz." }
        ],
        "Kadıköy": [
            { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", dest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "M4 Metro", desc: "Ayrılıkçeşmesi'nde M4 Metrosuna aktarma yaparak Kadıköy merkeze bir durakta ulaşın." },
            { name: "T3 Kadıköy - Moda Tramvayı", dest: "Ayrılıkçeşmesi", logo: LOGOS.metro, type: "T3 Tramvay", desc: "Ayrılıkçeşmesi'nden Kadıköy rıhtıma inerek T3 Nostaljik Moda Tramvayına binin." },
            { name: "Metrobüs (Söğütlüçeşme / Fikirtepe)", dest: "Söğütlüçeşme", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Söğütlüçeşme'de inerek direkt Metrobüs hatlarına veya ilçe merkezine yürüyebilirsiniz." },
            { name: "Şehir Hatları Vapuru (Kadıköy İskelesi)", dest: "Ayrılıkçeşmesi", logo: LOGOS.vapur, type: "Vapur", desc: "Ayrılıkçeşmesi'nden Kadıköy rıhtıma geçerek vapur iskelesine ulaşabilirsiniz." }
        ],
        "Kağıthane": [
            { name: "M7 Yıldız - Mahmutbey Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "M7 Metro", desc: "Yenikapı'dan M2 metrosu ile Mecidiyeköy'e gidin, oradan M7 metrosuna aktarma yaparak Kağıthane veya Nurtepe'de inin." },
            { name: "M11 Havalimanı Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "M11 Metro", desc: "Yenikapı'dan M2 ile Gayrettepe'ye gidin, M11 metrosuna geçerek Kağıthane durağında inin." }
        ],
        "Kartal": [
            { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", dest: "Kartal", logo: LOGOS.metro, type: "M4 Metro", desc: "Kartal'da inerek kısa bir minibüs veya yürüyüş ile D-100 üzerindeki M4 Kartal metro durağına çıkabilirsiniz." },
            { name: "Kartal Merkez (Yürüme)", dest: "Kartal", logo: LOGOS.walk, type: "Yürüme", desc: "Kartal Marmaray istasyonundan inerek doğrudan merkez çarşıya ve sahile yürüyebilirsiniz." }
        ],
        "Küçükçekmece": [
            { name: "Metrobüs (Cennet Mah. / Sefaköy)", dest: "Küçükçekmece", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Küçükçekmece'de inip Metrobüs ile Cennet Mahallesi veya Sefaköy yönüne gidebilirsiniz." },
            { name: "Küçükçekmece Merkez (Yürüme)", dest: "Küçükçekmece", logo: LOGOS.walk, type: "Yürüme", desc: "Küçükçekmece istasyonunda inerek ilçe merkezine kolayca yürüyebilirsiniz." }
        ],
        "Pendik": [
            { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", dest: "Pendik", logo: LOGOS.metro, type: "M4 Metro", desc: "Pendik'te inerek M4 Tavşantepe-Sabiha Gökçen metrosuna geçebilir ve Kurtköy/Havalimanı yönüne gidebilirsiniz." },
            { name: "M10 Pendik Merkez - Sabiha Gökçen", dest: "Pendik", logo: LOGOS.metro, type: "M10 Metro", desc: "Marmaray Pendik istasyonundan doğrudan M10 Pendik Merkez metrosuna binerek kuzeye gidebilirsiniz." }
        ],
        "Sarıyer": [
            { name: "M2 Yenikapı - Hacıosman Metrosu", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna binip son durak Hacıosman'da inerek oradan Sarıyer otobüslerine binin." }
        ],
        "Şişli": [
            { name: "M2 Yenikapı - Hacıosman Metrosu (Mecidiyeköy / Şişli)", dest: "Yenikapı", logo: LOGOS.metro, type: "M2 Metro", desc: "Yenikapı'dan M2 metrosuna aktarma yapıp Şişli-Mecidiyeköy veya Osmanbey durağında inin." },
            { name: "Metrobüs (Mecidiyeköy / Zincirlikuyu)", dest: "Söğütlüçeşme", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Anadolu Yakasından geliyorsanız Söğütlüçeşme'de Metrobüse binip Zincirlikuyu veya Mecidiyeköy'e gidebilirsiniz." }
        ],
        "Üsküdar": [
            { name: "M5 Üsküdar - Çekmeköy Metrosu", dest: "Üsküdar", logo: LOGOS.metro, type: "M5 Metro", desc: "Üsküdar istasyonundan M5 Metrosuna geçerek Altunizade, Ümraniye ve Çekmeköy yönüne seyahat edebilirsiniz." },
            { name: "Şehir Hatları Vapuru (Üsküdar İskelesi)", dest: "Üsküdar", logo: LOGOS.vapur, type: "Vapur", desc: "Üsküdar istasyonunda inerek doğrudan vapurlara ve Boğaz hatlarına ulaşabilirsiniz." }
        ],
        "Zeytinburnu": [
            { name: "T1 Kabataş - Bağcılar Tramvayı", dest: "Zeytinburnu", logo: LOGOS.metro, type: "T1 Tramvay", desc: "Zeytinburnu istasyonunda (veya Kazlıçeşme'de) inerek T1 Tramvayına aktarma yapabilirsiniz." },
            { name: "Metrobüs (Cevizlibağ / Zeytinburnu)", dest: "Zeytinburnu", logo: LOGOS.metrobus, type: "Metrobüs", desc: "Zeytinburnu istasyonunda inip Metrobüse aktarma yaparak D-100 üzerindeki Cevizlibağ ve Zeytinburnu duraklarına gidin." }
        ]
    };
    
    const ALL_DISTRICTS = [
        "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy",
        "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece",
        "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa",
        "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik",
        "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli",
        "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
    ];
    
    // Varsayılan İlçe Hatları
    ALL_DISTRICTS.forEach(d => {
        if(!DISTRICT_MAP[d]) {
            DISTRICT_MAP[d] = [
                { name: d + " Merkezi (İETT / Minibüs)", dest: "Yenikapı", logo: LOGOS.walk, type: "Yerel Ulaşım", desc: "Size en yakın Marmaray veya Metro durağında inerek İETT otobüsleri ve yerel minibüsler ile " + d + " hedefine ulaşabilirsiniz." }
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
        rotaNeighSel.innerHTML = '<option value="">Hedef hat seçiniz...</option>';
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
            alert('Lütfen başlangıç istasyonu, ilçe ve hedef hattı eksiksiz seçiniz.');
            return;
        }
        
        const neighData = DISTRICT_MAP[dist].find(n => n.name === neigh);
        if(!neighData) return;
        
        const end = neighData.dest;
        
        if(start === end) {
            alert('Başlangıç istasyonu ile aktarma istasyonu aynı. Doğrudan hattınıza yönlendiriliyorsunuz.');
        }
        
        let html = '';
        
        html += \`
        <div class="route-step">
            <div class="step-icon"><img src="\${LOGOS.marmaray}" alt="Marmaray"></div>
            <div class="step-content">
                <div class="step-title">\${start} İstasyonundan Marmaray'a Binin</div>
                <div class="step-desc">TCDD Marmaray hattı ile <strong>\${end}</strong> istikametine ilerleyin.</div>
            </div>
        </div>
        \`;
        
        if(start !== end) {
            html += \`
            <div class="route-step">
                <div class="step-icon walk"><img src="\${LOGOS.walk}" style="opacity:0.6;" alt="Yürüme"></div>
                <div class="step-content">
                    <div class="step-title">\${end} İstasyonunda İnin ve Çıkış Yapın</div>
                    <div class="step-desc">Marmaray'dan inerek yönlendirme tabelalarını takip edin ve aktarma noktasına ilerleyin.</div>
                </div>
            </div>
            \`;
        }
        
        html += \`
        <div class="route-step" style="margin-bottom:0;">
            <div class="step-icon"><img src="\${neighData.logo}" alt="\${neighData.type}"></div>
            <div class="step-content">
                <div class="step-title">\${neighData.name} Hattına Geçin (\${neighData.type})</div>
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
