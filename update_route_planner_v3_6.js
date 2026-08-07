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
        <label>Varış Semti (Hedef Rota):</label>
        <select id="rota-neighborhood">
            <option value="">Hedef seçiniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota Adımları Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Sizi İstanbul'un yoğun trafiğine takılmadan <b>en hızlı ve konforlu raylı sistem / metrobüs / vapur ağı</b> ile hedefinize ulaştırıyoruz. Bu güzergahtan sonra son noktanıza yürüyerek, minibüs veya taksi ile devam etmek tamamen sizin tercihinizdir. Tüm sorumluluk kullanıcıya aittir.
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
                name: "Büyükada / Heybeliada / Kınalıada (Vapur)",
                steps: [
                    { type: "marmaray", dest: "Bostancı", text: "Marmaray'a binerek Bostancı istasyonunda inin." },
                    { type: "walk", dest: "Bostancı İskelesi", text: "Bostancı'da inip sahildeki Şehir Hatları / İDO vapur iskelesine kısa bir yürüyüş yapın." },
                    { type: "vapur", dest: "Adalar", text: "İskeleden Adalar vapuruna veya motorlarına binerek hedefinize ulaşın." }
                ]
            }
        ],
        "Avcılar": [
            {
                name: "Avcılar Merkez (Metrobüs)",
                steps: [
                    { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." },
                    { type: "aktarim", dest: "Metrobüs Aktarma", text: "Turnikelerden çıkarak yaya üst geçidi ile Küçükçekmece Metrobüs durağına geçiş yapın." },
                    { type: "metrobus", dest: "Avcılar Merkez Üniversite Kampüsü", text: "Beylikdüzü yönüne giden Metrobüse binip Avcılar Merkez durağında inin." }
                ]
            }
        ],
        "Bağcılar": [
            {
                name: "Bağcılar Meydan (M1B Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna kadar gidin." },
                    { type: "aktarim", dest: "M1 Metro Hattı", text: "Yenikapı'da inip M1 Metro katına yürüyün ve turnikelerden geçin." },
                    { type: "metro", dest: "Bağcılar Meydan", text: "M1B Yenikapı-Kirazlı metrosuna binerek Bağcılar Meydan durağında inin." }
                ]
            },
            {
                name: "Güneştepe / Yavuz Selim (T1 Tramvay)",
                steps: [
                    { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                    { type: "aktarim", dest: "T1 Tramvay Hattı", text: "Sirkeci'den çıkarak T1 Tramvay durağına yürüyün." },
                    { type: "metro", dest: "Bağcılar Son Durak", text: "T1 Kabataş-Bağcılar tramvayına binip Güneştepe, Yavuz Selim veya Bağcılar Merkez'de inin." }
                ]
            }
        ],
        "Bahçelievler": [
            {
                name: "Şirinevler / Yenibosna (M1A Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "aktarim", dest: "M1 Metro Hattı", text: "Yenikapı'da inip M1 Metro alanına geçin." },
                    { type: "metro", dest: "Şirinevler / Yenibosna", text: "M1A Yenikapı-Atatürk Havalimanı metrosuna binip Şirinevler veya Yenibosna'da inin." }
                ]
            }
        ],
        "Bakırköy": [
            {
                name: "Bakırköy Merkez (Marmaray / Yürüme)",
                steps: [
                    { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile doğrudan Bakırköy istasyonunda inin." },
                    { type: "walk", dest: "Bakırköy Çarşı", text: "İstasyondan çıkarak Bakırköy Meydan veya Sahil yönüne doğrudan yürüyün." }
                ]
            },
            {
                name: "İncirli (M3 Metro)",
                steps: [
                    { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." },
                    { type: "aktarim", dest: "M3 Metro Hattı", text: "Marmaray'dan inerek yeni M3 Metro hattına aktarma yapın." },
                    { type: "metro", dest: "İncirli", text: "M3 Bakırköy-Kayaşehir Metrosu ile İncirli durağına geçin." }
                ]
            }
        ],
        "Başakşehir": [
            {
                name: "Başakşehir Metrokent / Çam ve Sakura (M3)",
                steps: [
                    { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." },
                    { type: "aktarim", dest: "M3 Metro Hattı", text: "Bakırköy istasyonundan doğrudan M3 Metrosuna geçiş yapın." },
                    { type: "metro", dest: "Başakşehir Metrokent", text: "M3 Bakırköy-Kayaşehir metrosuna binip Başakşehir veya Şehir Hastanesi duraklarında inin." }
                ]
            }
        ],
        "Beşiktaş": [
            {
                name: "Beşiktaş Merkez (Vapur Aktarmalı)",
                steps: [
                    { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                    { type: "aktarim", dest: "Şehir Hatları", text: "Üsküdar'da inip sahildeki iskelelere yürüyün." },
                    { type: "vapur", dest: "Beşiktaş İskelesi", text: "Üsküdar - Beşiktaş motoru veya vapuruyla Beşiktaş merkeze geçin." }
                ]
            },
            {
                name: "Levent / Gayrettepe (M2 Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "aktarim", dest: "M2 Metro Hattı", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                    { type: "metro", dest: "Levent / Gayrettepe", text: "M2 metrosuna binip Gayrettepe, Levent veya 4. Levent duraklarında inin." }
                ]
            },
            {
                name: "Yıldız / Mecidiyeköy (M7 Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "metro", dest: "Mecidiyeköy", text: "M2 metrosu ile Şişli-Mecidiyeköy'e geçin." },
                    { type: "aktarim", dest: "M7 Metro Hattı", text: "Mecidiyeköy'de inip M7 Yıldız-Mahmutbey metrosuna aktarma yapın." },
                    { type: "metro", dest: "Yıldız (Beşiktaş)", text: "M7 metrosu ile Yıldız (Beşiktaş) durağında inin." }
                ]
            }
        ],
        "Beylikdüzü": [
            {
                name: "Beylikdüzü Son Durak (TÜYAP) / Metrobüs",
                steps: [
                    { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece (veya Florya) istasyonunda inin." },
                    { type: "aktarim", dest: "Metrobüs Hattı", text: "Yaya geçidini kullanarak Metrobüs durağına gidin." },
                    { type: "metrobus", dest: "Beylikdüzü Son Durak", text: "Beylikdüzü istikametine giden Metrobüse binip Cumhuriyet Mah. veya TÜYAP (Sondurak) da inin." }
                ]
            },
            {
                name: "Beylikdüzü (Alternatif Tramvay-Metrobüs)",
                steps: [
                    { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu istasyonunda inin." },
                    { type: "aktarim", dest: "T1 / Metrobüs", text: "Zeytinburnu'ndan dışarı çıkıp T1 Tramvayı ile Cevizlibağ'a gidin." },
                    { type: "metrobus", dest: "Beylikdüzü Son Durak", text: "Cevizlibağ'da inerek Metrobüse aktarma yapın ve Beylikdüzü yönüne devam edin." }
                ]
            }
        ],
        "Gaziosmanpaşa": [
            {
                name: "Sağmalcılar / Bosna Çukurçeşme (T4 Tramvay)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "aktarim", dest: "Yenikapı Metro", text: "Yenikapı'da inip M1 Metro katına yürüyün ve turnikelerden geçin." },
                    { type: "metro", dest: "Topkapı", text: "M1A/M1B Metrosuna binip Topkapı durağında inin." },
                    { type: "aktarim", dest: "Topkapı Tramvay", text: "Topkapı'dan yürüyerek T4 Tramvay İstasyonuna geçiş yapın." },
                    { type: "metro", dest: "Sağmalcılar / Ali Fuat Başgil", text: "T4 Topkapı-Mescidi Selam Tramvayı ile Sağmalcılar, Bosna Çukurçeşme veya Ali Fuat Başgil durağında inin." }
                ]
            }
        ],
        "Kadıköy": [
            {
                name: "Kadıköy Merkez / Moda (M4 & T3)",
                steps: [
                    { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonunda inin." },
                    { type: "aktarim", dest: "M4 Kadıköy Metrosu", text: "M4 Kadıköy-Sabiha Gökçen metrosuna aktarma yapın." },
                    { type: "metro", dest: "Kadıköy", text: "1 durak giderek Kadıköy son durakta inin (Buradan T3 Moda Tramvayına veya vapurlara geçebilirsiniz)." }
                ]
            },
            {
                name: "Fikirtepe / Uzunçayır (Metrobüs)",
                steps: [
                    { type: "marmaray", dest: "Söğütlüçeşme", text: "Marmaray ile Söğütlüçeşme istasyonunda inin." },
                    { type: "aktarim", dest: "Metrobüs Hattı", text: "Söğütlüçeşme Metrobüs başlangıç durağına geçin." },
                    { type: "metrobus", dest: "Fikirtepe / Uzunçayır", text: "Metrobüse binerek Fikirtepe veya Uzunçayır duraklarında inin." }
                ]
            }
        ],
        "Sarıyer": [
            {
                name: "Hacıosman / Ayazağa (M2 Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "aktarim", dest: "M2 Metro Hattı", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                    { type: "metro", dest: "Hacıosman", text: "M2 metrosuna binip İTÜ Ayazağa veya son durak Hacıosman'da inerek kuzey semtlerine ulaşın." }
                ]
            }
        ],
        "Şişli": [
            {
                name: "Mecidiyeköy / Şişli Merkez (M2 Metro)",
                steps: [
                    { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." },
                    { type: "aktarim", dest: "M2 Metro Hattı", text: "Yenikapı'da inip M2 Hacıosman metrosu katına geçin." },
                    { type: "metro", dest: "Şişli / Mecidiyeköy", text: "M2 metrosuna binip Şişli-Mecidiyeköy durağında inin." }
                ]
            },
            {
                name: "Zincirlikuyu / Çağlayan (Metrobüs)",
                steps: [
                    { type: "marmaray", dest: "Söğütlüçeşme", text: "Eğer Anadolu Yakası'ndan geliyorsanız, Marmaray ile Söğütlüçeşme'ye gidin." },
                    { type: "aktarim", dest: "Metrobüs Hattı", text: "Söğütlüçeşme'den Metrobüs aktarması yapın." },
                    { type: "metrobus", dest: "Zincirlikuyu / Çağlayan", text: "Metrobüs ile Zincirlikuyu, Mecidiyeköy veya Çağlayan durağında inin." }
                ]
            }
        ],
        "Üsküdar": [
            {
                name: "Üsküdar Merkez / Boğaz Hattı (Marmaray / Vapur)",
                steps: [
                    { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                    { type: "walk", dest: "Üsküdar Sahil", text: "İstasyondan çıkıp sahile yürüyerek Boğaz hatlarına veya merkez içi ulaşıma geçin." }
                ]
            },
            {
                name: "Altunizade / Ümraniye Yönü (M5 Metro)",
                steps: [
                    { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." },
                    { type: "aktarim", dest: "M5 Metro Hattı", text: "Üsküdar'da inip M5 Üsküdar-Çekmeköy Metrosuna aktarma yapın." },
                    { type: "metro", dest: "Altunizade", text: "M5 metrosuyla Altunizade veya Bağlarbaşı durağında inin." }
                ]
            }
        ]
    };
    
    // Eksik İlçeler İçin Jenerik Ama Zeki Şablonlar
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
        rotaOriginSel.innerHTML += \`<option value="\${s.name}">\${s.name}</option>\`;
    });
    
    Object.keys(DISTRICT_MAP).sort().forEach((d) => {
        rotaDistSel.innerHTML += \`<option value="\${d}">\${d}</option>\`;
    });
    
    rotaDistSel.addEventListener('change', () => {
        const dist = rotaDistSel.value;
        rotaNeighSel.innerHTML = '<option value="">Hedef hat / semt seçiniz...</option>';
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
            alert('Lütfen başlangıç istasyonu, ilçe ve hedefi eksiksiz seçiniz.');
            return;
        }
        
        const neighData = DISTRICT_MAP[dist].find(n => n.name === neigh);
        if(!neighData) return;
        
        let html = '';
        
        // Dinamik Adım Döngüsü
        neighData.steps.forEach((step, index) => {
            const isLast = (index === neighData.steps.length - 1);
            let logoSrc = LOGOS[step.type] || LOGOS.walk;
            
            // Aktarım özel opacity ve style
            let iconClass = 'step-icon';
            if(step.type === 'walk' || step.type === 'aktarim') iconClass += ' walk';
            
            html += \`
            <div class="route-step" \${isLast ? 'style="margin-bottom:0;"' : ''}>
                <div class="\${iconClass}"><img src="\${logoSrc}" \${step.type==='aktarim'?'style="opacity:0.7"':''} alt="\${step.type}"></div>
                <div class="step-content">
                    <div class="step-title">\${step.dest}</div>
                    <div class="step-desc">\${step.text}</div>
                </div>
            </div>
            \`;
        });
        
        document.getElementById('rota-steps-list').innerHTML = html;
        document.getElementById('rota-result-container').style.display = 'block';
    });
</script>
`;

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
