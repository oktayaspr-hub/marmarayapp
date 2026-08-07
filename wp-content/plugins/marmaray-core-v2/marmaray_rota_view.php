
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

.module-tabs { display: flex; gap: 10px; margin-bottom: 25px; background: rgba(0,0,0,0.03); padding: 5px; border-radius: 12px; }
.module-tab { flex: 1; padding: 12px; text-align: center; font-weight: 700; color: var(--text-secondary); cursor: pointer; border-radius: 8px; border: none; background: transparent; transition: all 0.3s; font-size: 1.05rem; }
.module-tab.active { background: white; color: var(--accent-blue); box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.fare-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border, rgba(0,0,0,0.05)); font-size: 1.15rem; }
.fare-row:last-child { border-bottom: none; font-size: 1.3rem; font-weight: 800; color: var(--accent-blue, #0056b3); }
.fare-label { font-weight: 600; color: var(--text-secondary); }
.fare-value { font-weight: 800; color: var(--text-primary); }
.fare-value.free { color: #28a745; font-size: 1.5rem; }

</style>

<div class="app-module-card">

    <div class="module-tabs">
        <button class="module-tab active" id="tab-rota">Rota Planla</button>
        <button class="module-tab" id="tab-ucret">Ücret Hesapla</button>
    </div>

<div id="rota-section">
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
        <label>Varış Semti Yerine Uygun Rotalar:</label>
        <select id="rota-neighborhood">
            <option value="">Uygun rota seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Sizi, İstanbul'un yoğun trafiğine takılmadan en hızlı ve konforlu raylı sistem / metrobüs / vapur ağı ile hedefinize ulaştırıyoruz. Bu güzergahtan sonra, son noktanıza varmak üzere yürüyerek, otobüs, minibüs veya taksi ile devam etmek tamamen sizin tercihinizdir. Rotanızı tam olarak oluşturmak için, navigasyon uygulamanızdan yardım almayı unutmayın.
        </div>
    </div>
</div>

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
        walk: "<?php echo esc_url( plugins_url( 'assets/images/walk.png', __FILE__ ) ); ?>",
        aktarim: "<?php echo esc_url( plugins_url( 'assets/images/aktarim.png', __FILE__ ) ); ?>"
    };

    // V3.6 Çok Adımlı (Multi-Step) Transit Entegrasyon Algoritması
    const DISTRICT_MAP = {
    "Adalar": [
        {
            name: "Şehir Hatları (Büyükada / Heybeliada / Kınalıada)",
            steps: [
                { type: "marmaray", dest: "Bostancı", text: "Marmaray'a binerek Bostancı istasyonunda inin." },
                { type: "walk", dest: "Bostancı İskelesi", text: "Bostancı'da inip sahildeki iskeleye kısa bir yürüyüş yapın." },
                { type: "vapur", dest: "Adalar", text: "İskeleden Adalar vapuruna binerek hedefinize ulaşın." }
            ]
        }
    ],
    "Arnavutköy": [
        {
            name: "M11 İstanbul Havalimanı - Arnavutköy Metrosu",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da inip M2 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Gayrettepe", text: "M2 ile Gayrettepe durağında inin." },
                { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 Havalimanı Metrosuna geçiş yapın." },
                { type: "metro", dest: "Arnavutköy", text: "M11 ile Arnavutköy veya Taşoluk durağında inin." }
            ]
        }
    ],
    "Ataşehir": [
        {
            name: "M4 Kadıköy - Sabiha Gökçen Metrosu (Yenisahra/Kozyatağı)",
            steps: [
                { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro", text: "Turnikelerden M4 Metro katına geçin." },
                { type: "metro", dest: "Yenisahra / Kozyatağı", text: "M4 metrosuna binip Yenisahra veya Kozyatağı durağında inerek Ataşehir'e geçin." }
            ]
        },
        {
            name: "M8 Bostancı - Parseller Metrosu (İçerenköy/Kayışdağı)",
            steps: [
                { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "İstasyondan doğrudan M8 Metrosuna geçiş yapın." },
                { type: "metro", dest: "İçerenköy / Kayışdağı", text: "M8 metrosuna binip İçerenköy, Küçükbakkalköy veya Kayışdağı durağında inin." }
            ]
        }
    ],
    "Avcılar": [
        {
            name: "Metrobüs (Avcılar Merkez / Cihangir)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Turnikelerden çıkarak Küçükçekmece Metrobüs durağına geçiş yapın." },
                { type: "metrobus", dest: "Avcılar Merkez", text: "Beylikdüzü yönüne giden Metrobüse binip Avcılar Kampüs veya Cihangir durağında inin." }
            ]
        }
    ],
    "Bağcılar": [
        {
            name: "M1B Yenikapı - Kirazlı Metrosu (Bağcılar Meydan)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna kadar gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'da inip M1 Metro katına yürüyün." },
                { type: "metro", dest: "Bağcılar Meydan / Kirazlı", text: "M1B Yenikapı-Kirazlı metrosuna binerek Bağcılar Meydan veya Kirazlı durağında inin." }
            ]
        },
        {
            name: "T1 Kabataş - Bağcılar Tramvayı (Güneştepe/Yavuz Selim)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den çıkarak T1 Tramvay durağına geçin." },
                { type: "metro", dest: "Bağcılar Merkez", text: "T1 Kabataş-Bağcılar tramvayına binip Güneştepe veya Bağcılar Merkez'de inin." }
            ]
        }
    ],
    "Bahçelievler": [
        {
            name: "M1A Yenikapı - Havalimanı Metrosu (Şirinevler / Yenibosna)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'da inip M1 Metro alanına geçin." },
                { type: "metro", dest: "Şirinevler / Yenibosna", text: "M1A metrosuna binip Şirinevler veya Yenibosna'da inin." }
            ]
        },
        {
            name: "Metrobüs (Şirinevler / Yenibosna)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu durağında inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Marmaray'dan çıkıp minibüs veya kısa bir yürüyüş ile Cevizlibağ/Zeytinburnu metrobüsüne geçin (Veya Söğütlüçeşme/Küçükçekmece'den doğrudan metrobüse binin)." },
                { type: "metrobus", dest: "Şirinevler", text: "Metrobüse binerek Şirinevler veya Yenibosna durağında inin." }
            ]
        }
    ],
    "Bakırköy": [
        {
            name: "M3 Bakırköy Sahil - Kayaşehir Metrosu (İncirli)",
            steps: [
                { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." },
                { type: "aktarim", dest: "M3 Metro", text: "Marmaray'dan inerek doğrudan M3 Metro hattına aktarma yapın." },
                { type: "metro", dest: "İncirli / Haznedar", text: "M3 Metrosu ile İncirli veya Haznedar durağına geçin." }
            ]
        },
        {
            name: "Bakırköy Merkez (Yürüme)",
            steps: [
                { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile doğrudan Bakırköy istasyonunda inin." },
                { type: "walk", dest: "Bakırköy Çarşı", text: "İstasyondan çıkarak Özgürlük Meydanı veya İncirli yönüne yürüyün." }
            ]
        }
    ],
    "Başakşehir": [
        {
            name: "M3 Bakırköy Sahil - Kayaşehir Metrosu (Metrokent)",
            steps: [
                { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." },
                { type: "aktarim", dest: "M3 Metro", text: "Bakırköy istasyonundan M3 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Başakşehir Metrokent", text: "M3 metrosuna binip Başakşehir Metrokent veya Şehir Hastanesi durağında inin." }
            ]
        },
        {
            name: "M9 Ataköy - Olimpiyat Metrosu (Bahariye/Masko)",
            steps: [
                { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." },
                { type: "aktarim", dest: "M9 Metro", text: "Ataköy istasyonundan doğrudan M9 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Masko / Olimpiyat", text: "M9 metrosuna binip İkitelli Sanayi, Masko veya Olimpiyat durağında inin." }
            ]
        }
    ],
    "Bayrampaşa": [
        {
            name: "M1A / M1B Metrosu (Bayrampaşa / Sağmalcılar)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'da inip M1 Metro katına yürüyün." },
                { type: "metro", dest: "Bayrampaşa - Maltepe", text: "M1A/M1B metrosuna binip Bayrampaşa-Maltepe veya Sağmalcılar durağında inin." }
            ]
        },
        {
            name: "T4 Topkapı - Mescid-i Selam Tramvayı",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Topkapı", text: "Yenikapı'dan M1 Metrosu ile Topkapı'ya geçin." },
                { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'da inip T4 Tramvay İstasyonuna yürüyün." },
                { type: "metro", dest: "Sağmalcılar / Bosna Çukurçeşme", text: "T4 Tramvayı ile Sağmalcılar veya Bosna Çukurçeşme durağına gidin." }
            ]
        }
    ],
    "Beşiktaş": [
        {
            name: "M2 Yenikapı - Hacıosman Metrosu (Levent / Gayrettepe)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                { type: "metro", dest: "Levent / Gayrettepe", text: "M2 metrosuna binip Gayrettepe, Levent veya 4. Levent duraklarında inin." }
            ]
        },
        {
            name: "M7 Yıldız - Mahmutbey Metrosu (Yıldız / Barbaros)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Mecidiyeköy", text: "Yenikapı'dan M2 metrosu ile Şişli-Mecidiyeköy'e geçin." },
                { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'de inip M7 Yıldız metrosuna aktarma yapın." },
                { type: "metro", dest: "Yıldız (Beşiktaş)", text: "M7 metrosu ile Yıldız durağında (Barbaros Bulvarı) inin." }
            ]
        },
        {
            name: "Şehir Hatları Vapuru (Beşiktaş Merkez)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "Şehir Hatları", text: "Üsküdar'da inip sahildeki iskelelere yürüyün." },
                { type: "vapur", dest: "Beşiktaş İskelesi", text: "Üsküdar - Beşiktaş motoru veya vapuruyla Beşiktaş Meydan'a doğrudan geçin." }
            ]
        }
    ],
    "Beykoz": [
        {
            name: "Şehir Hatları Vapuru (Beykoz / Çubuklu İskelesi)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "Şehir Hatları", text: "Üsküdar'da inip sahildeki iskelelere yürüyün." },
                { type: "vapur", dest: "Beykoz İskelesi", text: "Boğaz hattı vapurlarına binerek Beykoz, Çubuklu veya Kanlıca iskelelerinde inin." }
            ]
        },
        {
            name: "İETT Otobüsleri (Kıyı Şeridi)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "İETT", text: "Üsküdar Meydanındaki otobüs duraklarına geçin." },
                { type: "walk", dest: "Beykoz Merkez", text: "15 serisi sahil otobüsleri veya dolmuşlarıyla Beykoz'a geçiş yapın." }
            ]
        }
    ],
    "Beylikdüzü": [
        {
            name: "Metrobüs (Beylikdüzü Son Durak / TÜYAP)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Yaya geçidini kullanarak Metrobüs durağına gidin." },
                { type: "metrobus", dest: "Beylikdüzü Son Durak", text: "Beylikdüzü yönüne giden Metrobüse binip Cumhuriyet Mah. veya TÜYAP'ta inin." }
            ]
        }
    ],
    "Beyoğlu": [
        {
            name: "M2 Yenikapı - Hacıosman Metrosu (Taksim / Şişhane)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                { type: "metro", dest: "Taksim / Şişhane", text: "M2 metrosuna binerek Şişhane veya Taksim durağında inin." }
            ]
        },
        {
            name: "T1 Kabataş - Bağcılar Tramvayı (Karaköy / Fındıklı)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den çıkarak T1 Tramvay durağına geçin." },
                { type: "metro", dest: "Karaköy / Tophane / Kabataş", text: "T1 Tramvayı ile Karaköy, Tophane, Fındıklı veya Kabataş duraklarında inin." }
            ]
        },
        {
            name: "Şehir Hatları Vapuru (Kasımpaşa / Hasköy)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "Şehir Hatları", text: "Üsküdar iskelesine geçin." },
                { type: "vapur", dest: "Kasımpaşa İskelesi", text: "Haliç Hattı vapurlarına binerek Kasımpaşa veya Hasköy iskelesinde inin." }
            ]
        }
    ],
    "Büyükçekmece": [
        {
            name: "Metrobüs (TÜYAP) Sonrası Minibüs",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Metrobüs durağına aktarma yapın." },
                { type: "metrobus", dest: "TÜYAP (Son Durak)", text: "Metrobüs ile Beylikdüzü Son Durak (TÜYAP) istasyonunda inin." },
                { type: "walk", dest: "Büyükçekmece Sahil", text: "TÜYAP'tan kalkan minibüs veya otobüslerle Büyükçekmece sahile / merkeze inin." }
            ]
        }
    ],
    "Çatalca": [
        {
            name: "Metrobüs / Otobüs (TÜYAP Aktarmalı)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece'de inin." },
                { type: "metrobus", dest: "TÜYAP", text: "Metrobüs ile TÜYAP son durağa gidin." },
                { type: "walk", dest: "Çatalca", text: "TÜYAP'tan Çatalca yönüne giden halk otobüsleri veya minibüslere aktarma yapın." }
            ]
        }
    ],
    "Çekmeköy": [
        {
            name: "M5 Üsküdar - Çekmeköy Metrosu",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "Üsküdar istasyonundan M5 Metrosuna doğrudan aktarma yapın." },
                { type: "metro", dest: "Çekmeköy", text: "M5 metrosu ile Madenler veya Çekmeköy son durağında inin." }
            ]
        }
    ],
    "Esenler": [
        {
            name: "M1B Yenikapı - Kirazlı Metrosu (Esenler Otogar)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonunda inin." },
                { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'dan M1B metrosuna geçin." },
                { type: "metro", dest: "Esenler Otogar", text: "M1B metrosu ile Esenler veya Otogar durağında inin." }
            ]
        }
    ],
    "Esenyurt": [
        {
            name: "Metrobüs (Haramidere / Saadetdere)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece'de inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Metrobüse aktarma yapın." },
                { type: "metrobus", dest: "Haramidere", text: "Metrobüs ile Haramidere, Saadetdere veya Güzelyurt durağında inerek Esenyurt'a yürüyün veya minibüse binin." }
            ]
        }
    ],
    "Eyüpsultan": [
        {
            name: "T5 Eminönü - Alibeyköy Tramvayı",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "Eminönü Tramvay", text: "Sirkeci'den Eminönü meydanına yürüyüp T5 Tramvay durağına geçin." },
                { type: "metro", dest: "Eyüpsultan Merkez", text: "T5 Tramvayı ile Eyüpsultan Teleferik veya Alibeyköy duraklarında inin." }
            ]
        },
        {
            name: "M7 Yıldız - Mahmutbey Metrosu (Alibeyköy)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Mecidiyeköy", text: "Yenikapı'dan M2 ile Mecidiyeköy'e geçin." },
                { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Alibeyköy / Yeşilpınar", text: "M7 metrosu ile Alibeyköy, Çırçır veya Yeşilpınar'da inin." }
            ]
        }
    ],
    "Fatih": [
        {
            name: "T1 Kabataş - Bağcılar Tramvayı (Sultanahmet / Beyazıt)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'de T1 tramvayına aktarma yapın." },
                { type: "metro", dest: "Sultanahmet / Beyazıt", text: "T1 ile Sultanahmet, Çemberlitaş veya Beyazıt (Kapalıçarşı) durağında inin." }
            ]
        },
        {
            name: "M1 / M2 Metrosu (Aksaray / Vezneciler)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonunda inin." },
                { type: "aktarim", dest: "Yenikapı Çıkış", text: "Yenikapı'dan M2 veya M1 metrosuna geçin veya dışarı çıkın." },
                { type: "metro", dest: "Aksaray / Vezneciler", text: "M2 ile Vezneciler'e gidebilir veya yürüme mesafesindeki Aksaray Meydanı'na geçebilirsiniz." }
            ]
        }
    ],
    "Gaziosmanpaşa": [
        {
            name: "T4 Topkapı - Mescid-i Selam Tramvayı",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'da inip M1 Metro katına yürüyün." },
                { type: "metro", dest: "Topkapı", text: "M1A/M1B Metrosuna binip Topkapı durağında inin." },
                { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'dan yürüyerek T4 Tramvay İstasyonuna geçiş yapın." },
                { type: "metro", dest: "Sağmalcılar / Bosna Çukurçeşme", text: "T4 Tramvayı ile Sağmalcılar, Bosna Çukurçeşme veya Ali Fuat Başgil durağında inin." }
            ]
        },
        {
            name: "M7 Yıldız - Mahmutbey Metrosu (Karadeniz Mah.)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Mecidiyeköy", text: "Yenikapı'dan M2 ile Mecidiyeköy'e geçin." },
                { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Karadeniz Mahallesi", text: "M7 ile Karadeniz Mahallesi veya Kâzım Karabekir durağında inin." }
            ]
        }
    ],
    "Güngören": [
        {
            name: "M1A Yenikapı - Havalimanı Metrosu (Merter / Zeytinburnu)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonunda inin." },
                { type: "aktarim", dest: "M1 Metro", text: "M1A metrosuna aktarma yapın." },
                { type: "metro", dest: "Merter", text: "M1A metrosu ile Merter durağında inin (Güngören merkez için T1 Tramvayına aktarma yapabilirsiniz)." }
            ]
        },
        {
            name: "T1 Kabataş - Bağcılar Tramvayı (Güngören Merkez)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu durağında inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Zeytinburnu'ndan dışarı çıkıp T1 Tramvayına (Bağcılar yönü) binin." },
                { type: "metro", dest: "Güngören", text: "T1 Tramvayı ile Güngören, Akıncılar veya Soğanlı durağında inin." }
            ]
        }
    ],
    "Kadıköy": [
        {
            name: "M4 Kadıköy - Sabiha Gökçen Metrosu / T3 Moda Tramvayı",
            steps: [
                { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Kadıköy Rıhtım", text: "1 durak giderek Kadıköy son durakta inin (Buradan T3 Moda Tramvayına veya vapurlara geçebilirsiniz)." }
            ]
        },
        {
            name: "Metrobüs (Söğütlüçeşme / Fikirtepe)",
            steps: [
                { type: "marmaray", dest: "Söğütlüçeşme", text: "Marmaray ile Söğütlüçeşme istasyonunda inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Söğütlüçeşme Metrobüs başlangıç durağına geçin." },
                { type: "metrobus", dest: "Fikirtepe", text: "Metrobüse binerek Fikirtepe veya Uzunçayır duraklarında inin." }
            ]
        },
        {
            name: "Şehir Hatları Vapuru (Kadıköy İskelesi)",
            steps: [
                { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro / Yürüme", text: "Kadıköy rıhtıma inerek vapur iskelesine ulaşın." },
                { type: "vapur", dest: "Kadıköy İskelesi", text: "Şehir Hatları Vapuru ile Beşiktaş, Karaköy veya Eminönü'ne geçebilirsiniz." }
            ]
        }
    ],
    "Kağıthane": [
        {
            name: "M7 Yıldız - Mahmutbey Metrosu (Kağıthane Merkez)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Mecidiyeköy", text: "Yenikapı'dan M2 metrosu ile Mecidiyeköy'e gidin." },
                { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'de inip M7 metrosuna aktarma yapın." },
                { type: "metro", dest: "Kağıthane / Nurtepe", text: "M7 metrosu ile Kağıthane veya Nurtepe durağında inin." }
            ]
        },
        {
            name: "M11 Havalimanı Metrosu",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Gayrettepe", text: "Yenikapı'dan M2 ile Gayrettepe'ye gidin." },
                { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Kağıthane", text: "M11 metrosu ile Kağıthane durağında inin." }
            ]
        }
    ],
    "Kartal": [
        {
            name: "M4 Kadıköy - Sabiha Gökçen Metrosu (E-5 Hattı)",
            steps: [
                { type: "marmaray", dest: "Kartal", text: "Marmaray ile Kartal istasyonunda inin." },
                { type: "aktarim", dest: "Minibüs / Yürüme", text: "İstasyondan çıkarak kısa bir minibüs yolculuğu ile D-100 üzerindeki M4 Metro hattına (Kartal durağı) çıkın." },
                { type: "metro", dest: "Kartal / Soğanlık", text: "M4 metrosuna binerek E-5 üzerindeki Kartal, Soğanlık veya Yakacık duraklarında inin." }
            ]
        },
        {
            name: "Kartal Merkez Sahil (Yürüme)",
            steps: [
                { type: "marmaray", dest: "Kartal", text: "Marmaray ile doğrudan Kartal istasyonunda inin." },
                { type: "walk", dest: "Kartal Merkez", text: "İstasyondan çıkarak Kartal çarşıya ve sahile doğrudan yürüyün." }
            ]
        }
    ],
    "Küçükçekmece": [
        {
            name: "Küçükçekmece Merkez (Marmaray / Yürüme)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile doğrudan Küçükçekmece istasyonunda inin." },
                { type: "walk", dest: "Küçükçekmece Sahil", text: "İstasyondan çıkarak göl kenarına veya merkez çarşıya doğrudan yürüyün." }
            ]
        },
        {
            name: "Metrobüs (Cennet Mah. / Sefaköy)",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Turnikelerden çıkarak Küçükçekmece Metrobüs durağına geçiş yapın." },
                { type: "metrobus", dest: "Sefaköy", text: "Şişli yönüne giden Metrobüse binip Cennet Mahallesi, Florya veya Sefaköy durağında inin." }
            ]
        },
        {
            name: "M9 Ataköy - Olimpiyat Metrosu (Halkalı Caddesi)",
            steps: [
                { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." },
                { type: "aktarim", dest: "M9 Metro", text: "Ataköy'den doğrudan M9 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Halkalı Caddesi", text: "M9 metrosu ile 15 Temmuz veya Halkalı Caddesi duraklarında inin." }
            ]
        }
    ],
    "Maltepe": [
        {
            name: "M4 Kadıköy - Sabiha Gökçen Metrosu (E-5 Hattı)",
            steps: [
                { type: "marmaray", dest: "Maltepe", text: "Marmaray ile Maltepe istasyonunda inin." },
                { type: "aktarim", dest: "Minibüs", text: "Maltepe merkezden minibüsler ile D-100 üzerindeki M4 Metro hattına (Maltepe veya Huzurevi durağı) çıkın." },
                { type: "metro", dest: "Maltepe E-5", text: "M4 metrosuna binerek E-5 üzerindeki Maltepe, Huzurevi veya Küçükyalı duraklarında inin." }
            ]
        },
        {
            name: "M8 Bostancı - Parseller Metrosu",
            steps: [
                { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "Bostancı istasyonundan doğrudan M8 Metrosuna geçiş yapın." },
                { type: "metro", dest: "Emin Ali Paşa", text: "M8 metrosu ile Emin Ali Paşa veya Ayşe Kadın durağında inin." }
            ]
        },
        {
            name: "Maltepe Merkez (Marmaray / Yürüme)",
            steps: [
                { type: "marmaray", dest: "Maltepe", text: "Marmaray ile doğrudan Maltepe istasyonunda inin." },
                { type: "walk", dest: "Maltepe Sahil", text: "İstasyondan çıkarak Maltepe çarşıya ve sahile doğrudan yürüyün." }
            ]
        }
    ],
    "Pendik": [
        {
            name: "M4 Kadıköy - Sabiha Gökçen Metrosu (E-5 / Kurtköy)",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." },
                { type: "aktarim", dest: "M10 Metro", text: "Pendik Merkez'den doğrudan metro ağına geçiş yapın." },
                { type: "metro", dest: "Pendik (M4 Aktarması)", text: "Metro ile E-5 hattına (Pendik M4 veya Tavşantepe) geçin." }
            ]
        },
        {
            name: "M10 Pendik Merkez - Sabiha Gökçen Metrosu",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." },
                { type: "aktarim", dest: "M10 Metro", text: "Pendik istasyonundan doğrudan M10 Metrosuna geçiş yapın." },
                { type: "metro", dest: "Sabiha Gökçen", text: "M10 metrosu ile doğrudan kuzey yönüne (Fevzi Çakmak, Sabiha Gökçen Havalimanı) gidin." }
            ]
        },
        {
            name: "Pendik Merkez Sahil (Yürüme)",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile doğrudan Pendik istasyonunda inin." },
                { type: "walk", dest: "Pendik Çarşı", text: "İstasyondan çıkarak Pendik çarşıya ve sahile (İDO İskelesi) yürüyün." }
            ]
        }
    ],
    "Sancaktepe": [
        {
            name: "M5 Üsküdar - Çekmeköy Metrosu (Sarıgazi/Sancaktepe)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "Üsküdar istasyonundan M5 Metrosuna doğrudan aktarma yapın." },
                { type: "metro", dest: "Sarıgazi / Sancaktepe", text: "M5 metrosu ile Madenler, Sarıgazi veya Sancaktepe durağında inin." }
            ]
        }
    ],
    "Sarıyer": [
        {
            name: "M2 Yenikapı - Hacıosman Metrosu (Hacıosman / Ayazağa)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                { type: "metro", dest: "Hacıosman", text: "M2 metrosuna binip İTÜ Ayazağa veya son durak Hacıosman'da inerek oradan Sarıyer otobüslerine binin." }
            ]
        },
        {
            name: "Şehir Hatları Vapuru (İstinye / Sarıyer İskelesi)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar veya Sirkeci'de inin." },
                { type: "aktarim", dest: "Şehir Hatları", text: "Sahildeki iskelelere yürüyün." },
                { type: "vapur", dest: "Boğaz Hattı", text: "Boğaz hattı vapurlarına binerek Emirgan, İstinye veya Sarıyer iskelelerinde inin." }
            ]
        }
    ],
    "Silivri": [
        {
            name: "Metrobüs (TÜYAP) Sonrası Otobüs",
            steps: [
                { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece'de inin." },
                { type: "metrobus", dest: "TÜYAP", text: "Metrobüs ile TÜYAP son durağa gidin." },
                { type: "walk", dest: "Silivri", text: "TÜYAP'tan Silivri yönüne giden 300 serisi İETT otobüsleri veya minibüslere aktarma yapın." }
            ]
        }
    ],
    "Sultanbeyli": [
        {
            name: "M5 Metrosu Sonrası Otobüs",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "metro", dest: "Sancaktepe", text: "M5 Metrosuna aktarma yapıp Sancaktepe son durakta inin." },
                { type: "walk", dest: "Sultanbeyli Merkez", text: "Sancaktepe durağından kalkan otobüs veya minibüslerle Sultanbeyli merkeze geçin." }
            ]
        }
    ],
    "Sultangazi": [
        {
            name: "T4 Topkapı - Mescid-i Selam Tramvayı",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "metro", dest: "Topkapı", text: "M1A/M1B Metrosuna binip Topkapı durağında inin." },
                { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'dan yürüyerek T4 Tramvay İstasyonuna geçiş yapın." },
                { type: "metro", dest: "Mescid-i Selam", text: "T4 Tramvayı ile Sultançiftliği veya Mescid-i Selam durağında inin." }
            ]
        },
        {
            name: "M7 Yıldız - Mahmutbey Metrosu (Mahmutbey)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin." },
                { type: "metro", dest: "Mecidiyeköy", text: "Yenikapı'dan M2 ile Mecidiyeköy'e geçin." },
                { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapın." },
                { type: "metro", dest: "Mahmutbey", text: "M7 ile Mahmutbey son durakta inip Sultangazi yönüne giden ulaşım araçlarına binin." }
            ]
        }
    ],
    "Şile": [
        {
            name: "M5 Metrosu Sonrası İETT (139 Serisi)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "metro", dest: "Çekmeköy", text: "M5 Metrosuna aktarma yapıp Çekmeköy durağında inin." },
                { type: "walk", dest: "Şile Yolu", text: "Çekmeköy'den kalkan 139A / 139T otobüsleri ile Şile veya Ağva'ya devam edin." }
            ]
        }
    ],
    "Şişli": [
        {
            name: "M2 Yenikapı - Hacıosman Metrosu (Mecidiyeköy / Şişli)",
            steps: [
                { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                { type: "metro", dest: "Şişli / Mecidiyeköy", text: "M2 metrosuna binip Osmanbey veya Şişli-Mecidiyeköy durağında inin." }
            ]
        },
        {
            name: "Metrobüs (Mecidiyeköy / Zincirlikuyu)",
            steps: [
                { type: "marmaray", dest: "Söğütlüçeşme", text: "Eğer Anadolu Yakası'ndan geliyorsanız, Marmaray ile Söğütlüçeşme'ye gidin." },
                { type: "aktarim", dest: "Metrobüs", text: "Söğütlüçeşme'den Metrobüs aktarması yapın." },
                { type: "metrobus", dest: "Mecidiyeköy / Zincirlikuyu", text: "Metrobüs ile Zincirlikuyu, Mecidiyeköy veya Çağlayan durağında inin." }
            ]
        }
    ],
    "Tuzla": [
        {
            name: "Tuzla Merkez Sahil (Marmaray / Yürüme)",
            steps: [
                { type: "marmaray", dest: "Tuzla", text: "Marmaray ile doğrudan Tuzla istasyonunda inin." },
                { type: "walk", dest: "Tuzla Sahil", text: "İstasyondan çıkarak Tuzla Marina, çarşı ve sahile otobüs/minibüs ile ulaşın." }
            ]
        },
        {
            name: "İçmeler / Aydıntepe (Marmaray)",
            steps: [
                { type: "marmaray", dest: "İçmeler", text: "Marmaray ile İçmeler veya Aydıntepe istasyonlarında inerek sanayi ve iş merkezlerine ulaşın." }
            ]
        }
    ],
    "Ümraniye": [
        {
            name: "M5 Üsküdar - Çekmeköy Metrosu (Ümraniye / Çarşı)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "Üsküdar istasyonundan M5 Metrosuna doğrudan aktarma yapın." },
                { type: "metro", dest: "Ümraniye / Çarşı", text: "M5 metrosu ile Ümraniye, Çarşı veya Yamanevler durağında inin." }
            ]
        },
        {
            name: "M8 Bostancı - Parseller Metrosu (Dudullu)",
            steps: [
                { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "Bostancı istasyonundan doğrudan M8 Metrosuna geçiş yapın." },
                { type: "metro", dest: "Dudullu / Parseller", text: "M8 metrosu ile Dudullu veya Parseller durağında inin." }
            ]
        }
    ],
    "Üsküdar": [
        {
            name: "M5 Üsküdar - Çekmeköy Metrosu (Altunizade / Bağlarbaşı)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "Üsküdar istasyonundan M5 Metrosuna doğrudan aktarma yapın." },
                { type: "metro", dest: "Altunizade", text: "M5 metrosuyla Fıstıkağacı, Bağlarbaşı veya Altunizade durağında inin." }
            ]
        },
        {
            name: "Şehir Hatları Vapuru (Üsküdar İskelesi)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "walk", dest: "Üsküdar Sahil", text: "İstasyondan çıkıp sahile yürüyerek Boğaz hatlarına veya merkez içi ulaşıma geçin." }
            ]
        },
        {
            name: "Metrobüs (Altunizade)",
            steps: [
                { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                { type: "metro", dest: "Altunizade", text: "M5 Metrosuna aktarma yapıp Altunizade durağında inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Altunizade'den Metrobüs hattına geçiş yapın." }
            ]
        }
    ],
    "Zeytinburnu": [
        {
            name: "T1 Kabataş - Bağcılar Tramvayı (Zeytinburnu Merkez)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu durağında inin (veya Kazlıçeşme'de)." },
                { type: "aktarim", dest: "T1 Tramvay", text: "İstasyondan çıkıp T1 Tramvayına aktarma yapın." },
                { type: "metro", dest: "Mithatpaşa", text: "T1 Tramvayı ile Mithatpaşa veya Akıncılar durağında inerek Zeytinburnu içlerine ulaşın." }
            ]
        },
        {
            name: "Metrobüs (Cevizlibağ / Zeytinburnu)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu durağında inin." },
                { type: "aktarim", dest: "Metrobüs", text: "Zeytinburnu'ndan dışarı çıkıp Metrobüse aktarma yapın." },
                { type: "metrobus", dest: "Cevizlibağ", text: "Metrobüs ile Cevizlibağ veya Merter duraklarında inin." }
            ]
        }
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
    
    ALL_DISTRICTS.forEach(d => {
        if(!DISTRICT_MAP[d]) {
            DISTRICT_MAP[d] = [
                { 
                    name: d + " Merkez (En Uygun İstasyon Aktarması)", 
                    steps: [
                        { type: "marmaray", dest: "En Uygun İstasyon", text: "Marmaray'a binerek " + d + " ilçesine coğrafi olarak en yakın istasyonda inin." },
                        { type: "aktarim", dest: "Yerel Ulaşım", text: "İstasyondan çıkarak otobüs (İETT) veya minibüs duraklarına yönelin." },
                        { type: "walk", dest: d, text: "Toplu taşıma ile " + d + " hedefinize rahatça ulaşın." }
                    ]
                }
            ];
        }
    });

    const rotaOriginSel = document.getElementById('rota-origin');
    const rotaDistSel = document.getElementById('rota-district');
    const rotaNeighSel = document.getElementById('rota-neighborhood');
    const semtGroup = document.getElementById('semt-group');
    
    ROTA_STATIONS.forEach((s) => {
        rotaOriginSel.innerHTML += `<option value="${s.name}">${s.name}</option>`;
    });
    
    Object.keys(DISTRICT_MAP).sort().forEach((d) => {
        rotaDistSel.innerHTML += `<option value="${d}">${d}</option>`;
    });
    
    rotaDistSel.addEventListener('change', () => {
        const dist = rotaDistSel.value;
        rotaNeighSel.innerHTML = '<option value="">Uygun rota seçiniz...</option>';
        if(dist && DISTRICT_MAP[dist]) {
            DISTRICT_MAP[dist].forEach(n => {
                rotaNeighSel.innerHTML += `<option value="${n.name}">${n.name}</option>`;
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
            alert('Lütfen başlangıç istasyonu, ilçe ve hedefi eksiksiz seçiniz.');
            return;
        }
        
        const neighData = DISTRICT_MAP[dist].find(n => n.name === neigh);
        if(!neighData) return;
        
        let html = '';
        
        // Dinamik Adım Döngüsü
        neighData.steps.forEach((step, index) => {
            const isLast = (index === neighData.steps.length - 1);
            let logoSrc = LOGOS[step.type];
            if(!logoSrc) { logoSrc = step.type.toLowerCase().includes('metro') ? LOGOS.metro : LOGOS.walk; }
            
            // Aktarım özel opacity ve style
            let iconClass = 'step-icon';
            if(step.type === 'walk' || step.type === 'aktarim') iconClass += ' walk';
            
            html += `
            <div class="route-step" ${isLast ? 'style="margin-bottom:0;"' : ''}>
                <div class="${iconClass}"><img src="${logoSrc}" ${step.type==='aktarim'?'style="opacity:0.7"':''} alt="${step.type}"></div>
                <div class="step-content">
                    <div class="step-title">${step.dest}</div>
                    <div class="step-desc">${step.text}</div>
                </div>
            </div>
            `;
        });
        
        document.getElementById('rota-steps-list').innerHTML = html;
        document.getElementById('rota-result-container').style.display = 'block';
    });

    const TAM_TIERS = [17.70, 22.68, 26.15, 30.12, 35.32, 39.18];
    const IND_TIERS = [8.64, 10.74, 12.65, 14.54, 16.92, 18.81];

    const uOriginSel = document.getElementById('ucret-origin');
    const uDestSel = document.getElementById('ucret-dest');
    
    ROTA_STATIONS.forEach((s, idx) => {
        uOriginSel.innerHTML += `<option value="${idx}">${s.name}</option>`;
        uDestSel.innerHTML += `<option value="${idx}">${s.name}</option>`;
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
            html = `
                <div class="fare-row">
                    <span class="fare-label">Gidilen İstasyon Sayısı:</span>
                    <span class="fare-value">${stops} İstasyon</span>
                </div>
                <div class="fare-row" style="justify-content: center; margin-top: 15px;">
                    <span class="fare-value free">ÜCRETSİZ</span>
                </div>
            `;
        } else {
            let maxFare = (type === 'tam') ? TAM_TIERS[5] : IND_TIERS[5];
            let netFare = (type === 'tam') ? TAM_TIERS[tierIndex] : IND_TIERS[tierIndex];
            let refund = maxFare - netFare;

            html = `
                <div class="fare-row">
                    <span class="fare-label">Gidilen Durak:</span>
                    <span class="fare-value">${stops} İstasyon</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">Turnikeden Çekilecek (Max):</span>
                    <span class="fare-value">${maxFare.toFixed(2)} TL</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">İadematikten Alınacak (İade):</span>
                    <span class="fare-value" style="color: #ff9800;">${refund.toFixed(2)} TL</span>
                </div>
                <div class="fare-row">
                    <span class="fare-label">Net Yolculuk Ücreti:</span>
                    <span class="fare-value">${netFare.toFixed(2)} TL</span>
                </div>
            `;
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

</script>
