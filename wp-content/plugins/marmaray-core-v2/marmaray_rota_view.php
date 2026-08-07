
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
        <label>BaÅŸlangÄ±Ã§ Ä°stasyonu:</label>
        <select id="rota-origin">
            <option value="">Ä°stasyon seÃ§iniz...</option>
        </select>
    </div>
    
    <div class="input-group">
        <label>VarÄ±ÅŸ Ä°lÃ§esi:</label>
        <select id="rota-district">
            <option value="">Ä°lÃ§e seÃ§iniz...</option>
        </select>
    </div>

    <div class="input-group" id="semt-group" style="display:none;">
        <label>VarÄ±ÅŸ Semti Yerine Uygun Rotalar:</label>
        <select id="rota-neighborhood">
            <option value="">Uygun rota seÃ§iniz...</option>
        </select>
    </div>
    
    <button class="primary-btn" id="rota-calc-btn">Rota Planla</button>
    
    <div id="rota-result-container" style="display:none;">
        <div class="route-result-card" id="rota-steps-list">
            <!-- Rota AdÄ±mlarÄ± Buraya Gelecek -->
        </div>
        <div class="module-alert">
            <strong>Bilgi:</strong> Sizi, Ä°stanbul'un yoÄŸun trafiÄŸine takÄ±lmadan en hÄ±zlÄ± ve konforlu raylÄ± sistem / metrobÃ¼s / vapur aÄŸÄ± ile hedefinize ulaÅŸtÄ±rÄ±yoruz. Bu gÃ¼zergahtan sonra, son noktanÄ±za varmak Ã¼zere yÃ¼rÃ¼yerek, otobÃ¼s, minibÃ¼s veya taksi ile devam etmek tamamen sizin tercihinizdir. RotanÄ±zÄ± tam olarak oluÅŸturmak iÃ§in, navigasyon uygulamanÄ±zdan yardÄ±m almayÄ± unutmayÄ±n.
        </div>
    </div>
</div>

<script>
    const ROTA_STATIONS = [
      {id:'gebze',name:'Gebze'},{id:'darica',name:'DarÄ±ca'},{id:'osmangazi',name:'Osmangazi'},{id:'fatih',name:'Fatih'},{id:'cayirova',name:'Ã‡ayÄ±rova'},
      {id:'tuzla',name:'Tuzla'},{id:'icmeler',name:'Ä°Ã§meler'},{id:'aydintepe',name:'AydÄ±ntepe'},{id:'guzelyali',name:'GÃ¼zelyalÄ±'},{id:'tersane',name:'Tersane'},
      {id:'kaynarca',name:'Kaynarca'},{id:'pendik',name:'Pendik'},{id:'yunus',name:'Yunus'},{id:'kartal',name:'Kartal'},{id:'basak',name:'BaÅŸak'},
      {id:'atalar',name:'Atalar'},{id:'cevizli',name:'Cevizli'},{id:'maltepe',name:'Maltepe'},{id:'sureyyaplaji',name:'SÃ¼reyya PlajÄ±'},{id:'idealtepe',name:'Ä°dealtepe'},
      {id:'kucukyali',name:'KÃ¼Ã§Ã¼kyalÄ±'},{id:'bostanci',name:'BostancÄ±'},{id:'suadiye',name:'Suadiye'},{id:'erenkoy',name:'ErenkÃ¶y'},{id:'goztepe',name:'GÃ¶ztepe'},
      {id:'feneryolu',name:'Feneryolu'},{id:'sogutlucesme',name:'SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme'},{id:'ayrilikcesmesi',name:'AyrÄ±lÄ±kÃ§eÅŸmesi'},{id:'uskudar',name:'ÃœskÃ¼dar'},{id:'sirkeci',name:'Sirkeci'},
      {id:'yenikapi',name:'YenikapÄ±'},{id:'kazlicesme',name:'KazlÄ±Ã§eÅŸme'},{id:'zeytinburnu',name:'Zeytinburnu'},{id:'yenimahalle',name:'Yenimahalle'},{id:'bakirkoy',name:'BakÄ±rkÃ¶y'},
      {id:'atakoy',name:'AtakÃ¶y'},{id:'yesilyurt',name:'YeÅŸilyurt'},{id:'yesilkoy',name:'YeÅŸilkÃ¶y'},{id:'floryaakvaryum',name:'Florya Akvaryum'},{id:'florya',name:'Florya'},
      {id:'kucukcekmece',name:'KÃ¼Ã§Ã¼kÃ§ekmece'},{id:'mustafakemal',name:'Mustafa Kemal'},{id:'halkali',name:'HalkalÄ±'}
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

    // V3.6 Ã‡ok AdÄ±mlÄ± (Multi-Step) Transit Entegrasyon AlgoritmasÄ±
    const DISTRICT_MAP = {
    "Adalar": [
        {
            name: "Åehir HatlarÄ± (BÃ¼yÃ¼kada / Heybeliada / KÄ±nalÄ±ada)",
            steps: [
                { type: "marmaray", dest: "BostancÄ±", text: "Marmaray'a binerek BostancÄ± istasyonunda inin." },
                { type: "walk", dest: "BostancÄ± Ä°skelesi", text: "BostancÄ±'da inip sahildeki iskeleye kÄ±sa bir yÃ¼rÃ¼yÃ¼ÅŸ yapÄ±n." },
                { type: "vapur", dest: "Adalar", text: "Ä°skeleden Adalar vapuruna binerek hedefinize ulaÅŸÄ±n." }
            ]
        }
    ],
    "ArnavutkÃ¶y": [
        {
            name: "M11 Ä°stanbul HavalimanÄ± - ArnavutkÃ¶y Metrosu",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "YenikapÄ±'da inip M2 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "Gayrettepe", text: "M2 ile Gayrettepe duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 HavalimanÄ± Metrosuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "ArnavutkÃ¶y", text: "M11 ile ArnavutkÃ¶y veya TaÅŸoluk duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "AtaÅŸehir": [
        {
            name: "M4 KadÄ±kÃ¶y - Sabiha GÃ¶kÃ§en Metrosu (Yenisahra/KozyataÄŸÄ±)",
            steps: [
                { type: "marmaray", dest: "AyrÄ±lÄ±k Ã‡eÅŸmesi", text: "Marmaray ile AyrÄ±lÄ±k Ã‡eÅŸmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro", text: "Turnikelerden M4 Metro katÄ±na geÃ§in." },
                { type: "metro", dest: "Yenisahra / KozyataÄŸÄ±", text: "M4 metrosuna binip Yenisahra veya KozyataÄŸÄ± duraÄŸÄ±nda inerek AtaÅŸehir'e geÃ§in." }
            ]
        },
        {
            name: "M8 BostancÄ± - Parseller Metrosu (Ä°Ã§erenkÃ¶y/KayÄ±ÅŸdaÄŸÄ±)",
            steps: [
                { type: "marmaray", dest: "BostancÄ±", text: "Marmaray ile BostancÄ± istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "Ä°stasyondan doÄŸrudan M8 Metrosuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Ä°Ã§erenkÃ¶y / KayÄ±ÅŸdaÄŸÄ±", text: "M8 metrosuna binip Ä°Ã§erenkÃ¶y, KÃ¼Ã§Ã¼kbakkalkÃ¶y veya KayÄ±ÅŸdaÄŸÄ± duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "AvcÄ±lar": [
        {
            name: "MetrobÃ¼s (AvcÄ±lar Merkez / Cihangir)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece istasyonunda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Turnikelerden Ã§Ä±karak KÃ¼Ã§Ã¼kÃ§ekmece MetrobÃ¼s duraÄŸÄ±na geÃ§iÅŸ yapÄ±n." },
                { type: "metrobus", dest: "AvcÄ±lar Merkez", text: "BeylikdÃ¼zÃ¼ yÃ¶nÃ¼ne giden MetrobÃ¼se binip AvcÄ±lar KampÃ¼s veya Cihangir duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "BaÄŸcÄ±lar": [
        {
            name: "M1B YenikapÄ± - KirazlÄ± Metrosu (BaÄŸcÄ±lar Meydan)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna kadar gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "YenikapÄ±'da inip M1 Metro katÄ±na yÃ¼rÃ¼yÃ¼n." },
                { type: "metro", dest: "BaÄŸcÄ±lar Meydan / KirazlÄ±", text: "M1B YenikapÄ±-KirazlÄ± metrosuna binerek BaÄŸcÄ±lar Meydan veya KirazlÄ± duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "T1 KabataÅŸ - BaÄŸcÄ±lar TramvayÄ± (GÃ¼neÅŸtepe/Yavuz Selim)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den Ã§Ä±karak T1 Tramvay duraÄŸÄ±na geÃ§in." },
                { type: "metro", dest: "BaÄŸcÄ±lar Merkez", text: "T1 KabataÅŸ-BaÄŸcÄ±lar tramvayÄ±na binip GÃ¼neÅŸtepe veya BaÄŸcÄ±lar Merkez'de inin." }
            ]
        }
    ],
    "BahÃ§elievler": [
        {
            name: "M1A YenikapÄ± - HavalimanÄ± Metrosu (Åirinevler / Yenibosna)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "YenikapÄ±'da inip M1 Metro alanÄ±na geÃ§in." },
                { type: "metro", dest: "Åirinevler / Yenibosna", text: "M1A metrosuna binip Åirinevler veya Yenibosna'da inin." }
            ]
        },
        {
            name: "MetrobÃ¼s (Åirinevler / Yenibosna)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Marmaray'dan Ã§Ä±kÄ±p minibÃ¼s veya kÄ±sa bir yÃ¼rÃ¼yÃ¼ÅŸ ile CevizlibaÄŸ/Zeytinburnu metrobÃ¼sÃ¼ne geÃ§in (Veya SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme/KÃ¼Ã§Ã¼kÃ§ekmece'den doÄŸrudan metrobÃ¼se binin)." },
                { type: "metrobus", dest: "Åirinevler", text: "MetrobÃ¼se binerek Åirinevler veya Yenibosna duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "BakÄ±rkÃ¶y": [
        {
            name: "M3 BakÄ±rkÃ¶y Sahil - KayaÅŸehir Metrosu (Ä°ncirli)",
            steps: [
                { type: "marmaray", dest: "BakÄ±rkÃ¶y", text: "Marmaray ile BakÄ±rkÃ¶y istasyonunda inin." },
                { type: "aktarim", dest: "M3 Metro", text: "Marmaray'dan inerek doÄŸrudan M3 Metro hattÄ±na aktarma yapÄ±n." },
                { type: "metro", dest: "Ä°ncirli / Haznedar", text: "M3 Metrosu ile Ä°ncirli veya Haznedar duraÄŸÄ±na geÃ§in." }
            ]
        },
        {
            name: "BakÄ±rkÃ¶y Merkez (YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "BakÄ±rkÃ¶y", text: "Marmaray ile doÄŸrudan BakÄ±rkÃ¶y istasyonunda inin." },
                { type: "walk", dest: "BakÄ±rkÃ¶y Ã‡arÅŸÄ±", text: "Ä°stasyondan Ã§Ä±karak Ã–zgÃ¼rlÃ¼k MeydanÄ± veya Ä°ncirli yÃ¶nÃ¼ne yÃ¼rÃ¼yÃ¼n." }
            ]
        }
    ],
    "BaÅŸakÅŸehir": [
        {
            name: "M3 BakÄ±rkÃ¶y Sahil - KayaÅŸehir Metrosu (Metrokent)",
            steps: [
                { type: "marmaray", dest: "BakÄ±rkÃ¶y", text: "Marmaray ile BakÄ±rkÃ¶y istasyonunda inin." },
                { type: "aktarim", dest: "M3 Metro", text: "BakÄ±rkÃ¶y istasyonundan M3 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "BaÅŸakÅŸehir Metrokent", text: "M3 metrosuna binip BaÅŸakÅŸehir Metrokent veya Åehir Hastanesi duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M9 AtakÃ¶y - Olimpiyat Metrosu (Bahariye/Masko)",
            steps: [
                { type: "marmaray", dest: "AtakÃ¶y", text: "Marmaray ile AtakÃ¶y istasyonunda inin." },
                { type: "aktarim", dest: "M9 Metro", text: "AtakÃ¶y istasyonundan doÄŸrudan M9 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "Masko / Olimpiyat", text: "M9 metrosuna binip Ä°kitelli Sanayi, Masko veya Olimpiyat duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "BayrampaÅŸa": [
        {
            name: "M1A / M1B Metrosu (BayrampaÅŸa / SaÄŸmalcÄ±lar)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "YenikapÄ±'da inip M1 Metro katÄ±na yÃ¼rÃ¼yÃ¼n." },
                { type: "metro", dest: "BayrampaÅŸa - Maltepe", text: "M1A/M1B metrosuna binip BayrampaÅŸa-Maltepe veya SaÄŸmalcÄ±lar duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "T4 TopkapÄ± - Mescid-i Selam TramvayÄ±",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "TopkapÄ±", text: "YenikapÄ±'dan M1 Metrosu ile TopkapÄ±'ya geÃ§in." },
                { type: "aktarim", dest: "T4 Tramvay", text: "TopkapÄ±'da inip T4 Tramvay Ä°stasyonuna yÃ¼rÃ¼yÃ¼n." },
                { type: "metro", dest: "SaÄŸmalcÄ±lar / Bosna Ã‡ukurÃ§eÅŸme", text: "T4 TramvayÄ± ile SaÄŸmalcÄ±lar veya Bosna Ã‡ukurÃ§eÅŸme duraÄŸÄ±na gidin." }
            ]
        }
    ],
    "BeÅŸiktaÅŸ": [
        {
            name: "M2 YenikapÄ± - HacÄ±osman Metrosu (Levent / Gayrettepe)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "YenikapÄ±'da inip M2 HacÄ±osman metrosu katÄ±na geÃ§in." },
                { type: "metro", dest: "Levent / Gayrettepe", text: "M2 metrosuna binip Gayrettepe, Levent veya 4. Levent duraklarÄ±nda inin." }
            ]
        },
        {
            name: "M7 YÄ±ldÄ±z - Mahmutbey Metrosu (YÄ±ldÄ±z / Barbaros)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "MecidiyekÃ¶y", text: "YenikapÄ±'dan M2 metrosu ile ÅiÅŸli-MecidiyekÃ¶y'e geÃ§in." },
                { type: "aktarim", dest: "M7 Metro", text: "MecidiyekÃ¶y'de inip M7 YÄ±ldÄ±z metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "YÄ±ldÄ±z (BeÅŸiktaÅŸ)", text: "M7 metrosu ile YÄ±ldÄ±z duraÄŸÄ±nda (Barbaros BulvarÄ±) inin." }
            ]
        },
        {
            name: "Åehir HatlarÄ± Vapuru (BeÅŸiktaÅŸ Merkez)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "Åehir HatlarÄ±", text: "ÃœskÃ¼dar'da inip sahildeki iskelelere yÃ¼rÃ¼yÃ¼n." },
                { type: "vapur", dest: "BeÅŸiktaÅŸ Ä°skelesi", text: "ÃœskÃ¼dar - BeÅŸiktaÅŸ motoru veya vapuruyla BeÅŸiktaÅŸ Meydan'a doÄŸrudan geÃ§in." }
            ]
        }
    ],
    "Beykoz": [
        {
            name: "Åehir HatlarÄ± Vapuru (Beykoz / Ã‡ubuklu Ä°skelesi)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "Åehir HatlarÄ±", text: "ÃœskÃ¼dar'da inip sahildeki iskelelere yÃ¼rÃ¼yÃ¼n." },
                { type: "vapur", dest: "Beykoz Ä°skelesi", text: "BoÄŸaz hattÄ± vapurlarÄ±na binerek Beykoz, Ã‡ubuklu veya KanlÄ±ca iskelelerinde inin." }
            ]
        },
        {
            name: "Ä°ETT OtobÃ¼sleri (KÄ±yÄ± Åeridi)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "Ä°ETT", text: "ÃœskÃ¼dar MeydanÄ±ndaki otobÃ¼s duraklarÄ±na geÃ§in." },
                { type: "walk", dest: "Beykoz Merkez", text: "15 serisi sahil otobÃ¼sleri veya dolmuÅŸlarÄ±yla Beykoz'a geÃ§iÅŸ yapÄ±n." }
            ]
        }
    ],
    "BeylikdÃ¼zÃ¼": [
        {
            name: "MetrobÃ¼s (BeylikdÃ¼zÃ¼ Son Durak / TÃœYAP)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece istasyonunda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Yaya geÃ§idini kullanarak MetrobÃ¼s duraÄŸÄ±na gidin." },
                { type: "metrobus", dest: "BeylikdÃ¼zÃ¼ Son Durak", text: "BeylikdÃ¼zÃ¼ yÃ¶nÃ¼ne giden MetrobÃ¼se binip Cumhuriyet Mah. veya TÃœYAP'ta inin." }
            ]
        }
    ],
    "BeyoÄŸlu": [
        {
            name: "M2 YenikapÄ± - HacÄ±osman Metrosu (Taksim / ÅiÅŸhane)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "YenikapÄ±'da inip M2 HacÄ±osman metrosu katÄ±na geÃ§in." },
                { type: "metro", dest: "Taksim / ÅiÅŸhane", text: "M2 metrosuna binerek ÅiÅŸhane veya Taksim duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "T1 KabataÅŸ - BaÄŸcÄ±lar TramvayÄ± (KarakÃ¶y / FÄ±ndÄ±klÄ±)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den Ã§Ä±karak T1 Tramvay duraÄŸÄ±na geÃ§in." },
                { type: "metro", dest: "KarakÃ¶y / Tophane / KabataÅŸ", text: "T1 TramvayÄ± ile KarakÃ¶y, Tophane, FÄ±ndÄ±klÄ± veya KabataÅŸ duraklarÄ±nda inin." }
            ]
        },
        {
            name: "Åehir HatlarÄ± Vapuru (KasÄ±mpaÅŸa / HaskÃ¶y)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "Åehir HatlarÄ±", text: "ÃœskÃ¼dar iskelesine geÃ§in." },
                { type: "vapur", dest: "KasÄ±mpaÅŸa Ä°skelesi", text: "HaliÃ§ HattÄ± vapurlarÄ±na binerek KasÄ±mpaÅŸa veya HaskÃ¶y iskelesinde inin." }
            ]
        }
    ],
    "BÃ¼yÃ¼kÃ§ekmece": [
        {
            name: "MetrobÃ¼s (TÃœYAP) SonrasÄ± MinibÃ¼s",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece istasyonunda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "MetrobÃ¼s duraÄŸÄ±na aktarma yapÄ±n." },
                { type: "metrobus", dest: "TÃœYAP (Son Durak)", text: "MetrobÃ¼s ile BeylikdÃ¼zÃ¼ Son Durak (TÃœYAP) istasyonunda inin." },
                { type: "walk", dest: "BÃ¼yÃ¼kÃ§ekmece Sahil", text: "TÃœYAP'tan kalkan minibÃ¼s veya otobÃ¼slerle BÃ¼yÃ¼kÃ§ekmece sahile / merkeze inin." }
            ]
        }
    ],
    "Ã‡atalca": [
        {
            name: "MetrobÃ¼s / OtobÃ¼s (TÃœYAP AktarmalÄ±)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece'de inin." },
                { type: "metrobus", dest: "TÃœYAP", text: "MetrobÃ¼s ile TÃœYAP son duraÄŸa gidin." },
                { type: "walk", dest: "Ã‡atalca", text: "TÃœYAP'tan Ã‡atalca yÃ¶nÃ¼ne giden halk otobÃ¼sleri veya minibÃ¼slere aktarma yapÄ±n." }
            ]
        }
    ],
    "Ã‡ekmekÃ¶y": [
        {
            name: "M5 ÃœskÃ¼dar - Ã‡ekmekÃ¶y Metrosu",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "ÃœskÃ¼dar istasyonundan M5 Metrosuna doÄŸrudan aktarma yapÄ±n." },
                { type: "metro", dest: "Ã‡ekmekÃ¶y", text: "M5 metrosu ile Madenler veya Ã‡ekmekÃ¶y son duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "Esenler": [
        {
            name: "M1B YenikapÄ± - KirazlÄ± Metrosu (Esenler Otogar)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonunda inin." },
                { type: "aktarim", dest: "M1 Metro", text: "YenikapÄ±'dan M1B metrosuna geÃ§in." },
                { type: "metro", dest: "Esenler Otogar", text: "M1B metrosu ile Esenler veya Otogar duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "Esenyurt": [
        {
            name: "MetrobÃ¼s (Haramidere / Saadetdere)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece'de inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "MetrobÃ¼se aktarma yapÄ±n." },
                { type: "metrobus", dest: "Haramidere", text: "MetrobÃ¼s ile Haramidere, Saadetdere veya GÃ¼zelyurt duraÄŸÄ±nda inerek Esenyurt'a yÃ¼rÃ¼yÃ¼n veya minibÃ¼se binin." }
            ]
        }
    ],
    "EyÃ¼psultan": [
        {
            name: "T5 EminÃ¶nÃ¼ - AlibeykÃ¶y TramvayÄ±",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "EminÃ¶nÃ¼ Tramvay", text: "Sirkeci'den EminÃ¶nÃ¼ meydanÄ±na yÃ¼rÃ¼yÃ¼p T5 Tramvay duraÄŸÄ±na geÃ§in." },
                { type: "metro", dest: "EyÃ¼psultan Merkez", text: "T5 TramvayÄ± ile EyÃ¼psultan Teleferik veya AlibeykÃ¶y duraklarÄ±nda inin." }
            ]
        },
        {
            name: "M7 YÄ±ldÄ±z - Mahmutbey Metrosu (AlibeykÃ¶y)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "MecidiyekÃ¶y", text: "YenikapÄ±'dan M2 ile MecidiyekÃ¶y'e geÃ§in." },
                { type: "aktarim", dest: "M7 Metro", text: "MecidiyekÃ¶y'den M7 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "AlibeykÃ¶y / YeÅŸilpÄ±nar", text: "M7 metrosu ile AlibeykÃ¶y, Ã‡Ä±rÃ§Ä±r veya YeÅŸilpÄ±nar'da inin." }
            ]
        }
    ],
    "Fatih": [
        {
            name: "T1 KabataÅŸ - BaÄŸcÄ±lar TramvayÄ± (Sultanahmet / BeyazÄ±t)",
            steps: [
                { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'de T1 tramvayÄ±na aktarma yapÄ±n." },
                { type: "metro", dest: "Sultanahmet / BeyazÄ±t", text: "T1 ile Sultanahmet, Ã‡emberlitaÅŸ veya BeyazÄ±t (KapalÄ±Ã§arÅŸÄ±) duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M1 / M2 Metrosu (Aksaray / Vezneciler)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonunda inin." },
                { type: "aktarim", dest: "YenikapÄ± Ã‡Ä±kÄ±ÅŸ", text: "YenikapÄ±'dan M2 veya M1 metrosuna geÃ§in veya dÄ±ÅŸarÄ± Ã§Ä±kÄ±n." },
                { type: "metro", dest: "Aksaray / Vezneciler", text: "M2 ile Vezneciler'e gidebilir veya yÃ¼rÃ¼me mesafesindeki Aksaray MeydanÄ±'na geÃ§ebilirsiniz." }
            ]
        }
    ],
    "GaziosmanpaÅŸa": [
        {
            name: "T4 TopkapÄ± - Mescid-i Selam TramvayÄ±",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M1 Metro", text: "YenikapÄ±'da inip M1 Metro katÄ±na yÃ¼rÃ¼yÃ¼n." },
                { type: "metro", dest: "TopkapÄ±", text: "M1A/M1B Metrosuna binip TopkapÄ± duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "T4 Tramvay", text: "TopkapÄ±'dan yÃ¼rÃ¼yerek T4 Tramvay Ä°stasyonuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "SaÄŸmalcÄ±lar / Bosna Ã‡ukurÃ§eÅŸme", text: "T4 TramvayÄ± ile SaÄŸmalcÄ±lar, Bosna Ã‡ukurÃ§eÅŸme veya Ali Fuat BaÅŸgil duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M7 YÄ±ldÄ±z - Mahmutbey Metrosu (Karadeniz Mah.)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "MecidiyekÃ¶y", text: "YenikapÄ±'dan M2 ile MecidiyekÃ¶y'e geÃ§in." },
                { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "Karadeniz Mahallesi", text: "M7 ile Karadeniz Mahallesi veya KÃ¢zÄ±m Karabekir duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "GÃ¼ngÃ¶ren": [
        {
            name: "M1A YenikapÄ± - HavalimanÄ± Metrosu (Merter / Zeytinburnu)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonunda inin." },
                { type: "aktarim", dest: "M1 Metro", text: "M1A metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "Merter", text: "M1A metrosu ile Merter duraÄŸÄ±nda inin (GÃ¼ngÃ¶ren merkez iÃ§in T1 TramvayÄ±na aktarma yapabilirsiniz)." }
            ]
        },
        {
            name: "T1 KabataÅŸ - BaÄŸcÄ±lar TramvayÄ± (GÃ¼ngÃ¶ren Merkez)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Zeytinburnu'ndan dÄ±ÅŸarÄ± Ã§Ä±kÄ±p T1 TramvayÄ±na (BaÄŸcÄ±lar yÃ¶nÃ¼) binin." },
                { type: "metro", dest: "GÃ¼ngÃ¶ren", text: "T1 TramvayÄ± ile GÃ¼ngÃ¶ren, AkÄ±ncÄ±lar veya SoÄŸanlÄ± duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "KadÄ±kÃ¶y": [
        {
            name: "M4 KadÄ±kÃ¶y - Sabiha GÃ¶kÃ§en Metrosu / T3 Moda TramvayÄ±",
            steps: [
                { type: "marmaray", dest: "AyrÄ±lÄ±k Ã‡eÅŸmesi", text: "Marmaray ile AyrÄ±lÄ±k Ã‡eÅŸmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "KadÄ±kÃ¶y RÄ±htÄ±m", text: "1 durak giderek KadÄ±kÃ¶y son durakta inin (Buradan T3 Moda TramvayÄ±na veya vapurlara geÃ§ebilirsiniz)." }
            ]
        },
        {
            name: "MetrobÃ¼s (SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme / Fikirtepe)",
            steps: [
                { type: "marmaray", dest: "SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme", text: "Marmaray ile SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme istasyonunda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme MetrobÃ¼s baÅŸlangÄ±Ã§ duraÄŸÄ±na geÃ§in." },
                { type: "metrobus", dest: "Fikirtepe", text: "MetrobÃ¼se binerek Fikirtepe veya UzunÃ§ayÄ±r duraklarÄ±nda inin." }
            ]
        },
        {
            name: "Åehir HatlarÄ± Vapuru (KadÄ±kÃ¶y Ä°skelesi)",
            steps: [
                { type: "marmaray", dest: "AyrÄ±lÄ±k Ã‡eÅŸmesi", text: "Marmaray ile AyrÄ±lÄ±k Ã‡eÅŸmesi istasyonunda inin." },
                { type: "aktarim", dest: "M4 Metro / YÃ¼rÃ¼me", text: "KadÄ±kÃ¶y rÄ±htÄ±ma inerek vapur iskelesine ulaÅŸÄ±n." },
                { type: "vapur", dest: "KadÄ±kÃ¶y Ä°skelesi", text: "Åehir HatlarÄ± Vapuru ile BeÅŸiktaÅŸ, KarakÃ¶y veya EminÃ¶nÃ¼'ne geÃ§ebilirsiniz." }
            ]
        }
    ],
    "KaÄŸÄ±thane": [
        {
            name: "M7 YÄ±ldÄ±z - Mahmutbey Metrosu (KaÄŸÄ±thane Merkez)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "MecidiyekÃ¶y", text: "YenikapÄ±'dan M2 metrosu ile MecidiyekÃ¶y'e gidin." },
                { type: "aktarim", dest: "M7 Metro", text: "MecidiyekÃ¶y'de inip M7 metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "KaÄŸÄ±thane / Nurtepe", text: "M7 metrosu ile KaÄŸÄ±thane veya Nurtepe duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M11 HavalimanÄ± Metrosu",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "Gayrettepe", text: "YenikapÄ±'dan M2 ile Gayrettepe'ye gidin." },
                { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "KaÄŸÄ±thane", text: "M11 metrosu ile KaÄŸÄ±thane duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "Kartal": [
        {
            name: "M4 KadÄ±kÃ¶y - Sabiha GÃ¶kÃ§en Metrosu (E-5 HattÄ±)",
            steps: [
                { type: "marmaray", dest: "Kartal", text: "Marmaray ile Kartal istasyonunda inin." },
                { type: "aktarim", dest: "MinibÃ¼s / YÃ¼rÃ¼me", text: "Ä°stasyondan Ã§Ä±karak kÄ±sa bir minibÃ¼s yolculuÄŸu ile D-100 Ã¼zerindeki M4 Metro hattÄ±na (Kartal duraÄŸÄ±) Ã§Ä±kÄ±n." },
                { type: "metro", dest: "Kartal / SoÄŸanlÄ±k", text: "M4 metrosuna binerek E-5 Ã¼zerindeki Kartal, SoÄŸanlÄ±k veya YakacÄ±k duraklarÄ±nda inin." }
            ]
        },
        {
            name: "Kartal Merkez Sahil (YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "Kartal", text: "Marmaray ile doÄŸrudan Kartal istasyonunda inin." },
                { type: "walk", dest: "Kartal Merkez", text: "Ä°stasyondan Ã§Ä±karak Kartal Ã§arÅŸÄ±ya ve sahile doÄŸrudan yÃ¼rÃ¼yÃ¼n." }
            ]
        }
    ],
    "KÃ¼Ã§Ã¼kÃ§ekmece": [
        {
            name: "KÃ¼Ã§Ã¼kÃ§ekmece Merkez (Marmaray / YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile doÄŸrudan KÃ¼Ã§Ã¼kÃ§ekmece istasyonunda inin." },
                { type: "walk", dest: "KÃ¼Ã§Ã¼kÃ§ekmece Sahil", text: "Ä°stasyondan Ã§Ä±karak gÃ¶l kenarÄ±na veya merkez Ã§arÅŸÄ±ya doÄŸrudan yÃ¼rÃ¼yÃ¼n." }
            ]
        },
        {
            name: "MetrobÃ¼s (Cennet Mah. / SefakÃ¶y)",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece istasyonunda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Turnikelerden Ã§Ä±karak KÃ¼Ã§Ã¼kÃ§ekmece MetrobÃ¼s duraÄŸÄ±na geÃ§iÅŸ yapÄ±n." },
                { type: "metrobus", dest: "SefakÃ¶y", text: "ÅiÅŸli yÃ¶nÃ¼ne giden MetrobÃ¼se binip Cennet Mahallesi, Florya veya SefakÃ¶y duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M9 AtakÃ¶y - Olimpiyat Metrosu (HalkalÄ± Caddesi)",
            steps: [
                { type: "marmaray", dest: "AtakÃ¶y", text: "Marmaray ile AtakÃ¶y istasyonunda inin." },
                { type: "aktarim", dest: "M9 Metro", text: "AtakÃ¶y'den doÄŸrudan M9 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "HalkalÄ± Caddesi", text: "M9 metrosu ile 15 Temmuz veya HalkalÄ± Caddesi duraklarÄ±nda inin." }
            ]
        }
    ],
    "Maltepe": [
        {
            name: "M4 KadÄ±kÃ¶y - Sabiha GÃ¶kÃ§en Metrosu (E-5 HattÄ±)",
            steps: [
                { type: "marmaray", dest: "Maltepe", text: "Marmaray ile Maltepe istasyonunda inin." },
                { type: "aktarim", dest: "MinibÃ¼s", text: "Maltepe merkezden minibÃ¼sler ile D-100 Ã¼zerindeki M4 Metro hattÄ±na (Maltepe veya Huzurevi duraÄŸÄ±) Ã§Ä±kÄ±n." },
                { type: "metro", dest: "Maltepe E-5", text: "M4 metrosuna binerek E-5 Ã¼zerindeki Maltepe, Huzurevi veya KÃ¼Ã§Ã¼kyalÄ± duraklarÄ±nda inin." }
            ]
        },
        {
            name: "M8 BostancÄ± - Parseller Metrosu",
            steps: [
                { type: "marmaray", dest: "BostancÄ±", text: "Marmaray ile BostancÄ± istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "BostancÄ± istasyonundan doÄŸrudan M8 Metrosuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Emin Ali PaÅŸa", text: "M8 metrosu ile Emin Ali PaÅŸa veya AyÅŸe KadÄ±n duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "Maltepe Merkez (Marmaray / YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "Maltepe", text: "Marmaray ile doÄŸrudan Maltepe istasyonunda inin." },
                { type: "walk", dest: "Maltepe Sahil", text: "Ä°stasyondan Ã§Ä±karak Maltepe Ã§arÅŸÄ±ya ve sahile doÄŸrudan yÃ¼rÃ¼yÃ¼n." }
            ]
        }
    ],
    "Pendik": [
        {
            name: "M4 KadÄ±kÃ¶y - Sabiha GÃ¶kÃ§en Metrosu (E-5 / KurtkÃ¶y)",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." },
                { type: "aktarim", dest: "M10 Metro", text: "Pendik Merkez'den doÄŸrudan metro aÄŸÄ±na geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Pendik (M4 AktarmasÄ±)", text: "Metro ile E-5 hattÄ±na (Pendik M4 veya TavÅŸantepe) geÃ§in." }
            ]
        },
        {
            name: "M10 Pendik Merkez - Sabiha GÃ¶kÃ§en Metrosu",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." },
                { type: "aktarim", dest: "M10 Metro", text: "Pendik istasyonundan doÄŸrudan M10 Metrosuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Sabiha GÃ¶kÃ§en", text: "M10 metrosu ile doÄŸrudan kuzey yÃ¶nÃ¼ne (Fevzi Ã‡akmak, Sabiha GÃ¶kÃ§en HavalimanÄ±) gidin." }
            ]
        },
        {
            name: "Pendik Merkez Sahil (YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "Pendik", text: "Marmaray ile doÄŸrudan Pendik istasyonunda inin." },
                { type: "walk", dest: "Pendik Ã‡arÅŸÄ±", text: "Ä°stasyondan Ã§Ä±karak Pendik Ã§arÅŸÄ±ya ve sahile (Ä°DO Ä°skelesi) yÃ¼rÃ¼yÃ¼n." }
            ]
        }
    ],
    "Sancaktepe": [
        {
            name: "M5 ÃœskÃ¼dar - Ã‡ekmekÃ¶y Metrosu (SarÄ±gazi/Sancaktepe)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "ÃœskÃ¼dar istasyonundan M5 Metrosuna doÄŸrudan aktarma yapÄ±n." },
                { type: "metro", dest: "SarÄ±gazi / Sancaktepe", text: "M5 metrosu ile Madenler, SarÄ±gazi veya Sancaktepe duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "SarÄ±yer": [
        {
            name: "M2 YenikapÄ± - HacÄ±osman Metrosu (HacÄ±osman / AyazaÄŸa)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "YenikapÄ±'da inip M2 HacÄ±osman metrosu katÄ±na geÃ§in." },
                { type: "metro", dest: "HacÄ±osman", text: "M2 metrosuna binip Ä°TÃœ AyazaÄŸa veya son durak HacÄ±osman'da inerek oradan SarÄ±yer otobÃ¼slerine binin." }
            ]
        },
        {
            name: "Åehir HatlarÄ± Vapuru (Ä°stinye / SarÄ±yer Ä°skelesi)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar veya Sirkeci'de inin." },
                { type: "aktarim", dest: "Åehir HatlarÄ±", text: "Sahildeki iskelelere yÃ¼rÃ¼yÃ¼n." },
                { type: "vapur", dest: "BoÄŸaz HattÄ±", text: "BoÄŸaz hattÄ± vapurlarÄ±na binerek Emirgan, Ä°stinye veya SarÄ±yer iskelelerinde inin." }
            ]
        }
    ],
    "Silivri": [
        {
            name: "MetrobÃ¼s (TÃœYAP) SonrasÄ± OtobÃ¼s",
            steps: [
                { type: "marmaray", dest: "KÃ¼Ã§Ã¼kÃ§ekmece", text: "Marmaray ile KÃ¼Ã§Ã¼kÃ§ekmece'de inin." },
                { type: "metrobus", dest: "TÃœYAP", text: "MetrobÃ¼s ile TÃœYAP son duraÄŸa gidin." },
                { type: "walk", dest: "Silivri", text: "TÃœYAP'tan Silivri yÃ¶nÃ¼ne giden 300 serisi Ä°ETT otobÃ¼sleri veya minibÃ¼slere aktarma yapÄ±n." }
            ]
        }
    ],
    "Sultanbeyli": [
        {
            name: "M5 Metrosu SonrasÄ± OtobÃ¼s",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "metro", dest: "Sancaktepe", text: "M5 Metrosuna aktarma yapÄ±p Sancaktepe son durakta inin." },
                { type: "walk", dest: "Sultanbeyli Merkez", text: "Sancaktepe duraÄŸÄ±ndan kalkan otobÃ¼s veya minibÃ¼slerle Sultanbeyli merkeze geÃ§in." }
            ]
        }
    ],
    "Sultangazi": [
        {
            name: "T4 TopkapÄ± - Mescid-i Selam TramvayÄ±",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "metro", dest: "TopkapÄ±", text: "M1A/M1B Metrosuna binip TopkapÄ± duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "T4 Tramvay", text: "TopkapÄ±'dan yÃ¼rÃ¼yerek T4 Tramvay Ä°stasyonuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Mescid-i Selam", text: "T4 TramvayÄ± ile SultanÃ§iftliÄŸi veya Mescid-i Selam duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M7 YÄ±ldÄ±z - Mahmutbey Metrosu (Mahmutbey)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ±'ya gidin." },
                { type: "metro", dest: "MecidiyekÃ¶y", text: "YenikapÄ±'dan M2 ile MecidiyekÃ¶y'e geÃ§in." },
                { type: "aktarim", dest: "M7 Metro", text: "MecidiyekÃ¶y'den M7 Metrosuna aktarma yapÄ±n." },
                { type: "metro", dest: "Mahmutbey", text: "M7 ile Mahmutbey son durakta inip Sultangazi yÃ¶nÃ¼ne giden ulaÅŸÄ±m araÃ§larÄ±na binin." }
            ]
        }
    ],
    "Åile": [
        {
            name: "M5 Metrosu SonrasÄ± Ä°ETT (139 Serisi)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "metro", dest: "Ã‡ekmekÃ¶y", text: "M5 Metrosuna aktarma yapÄ±p Ã‡ekmekÃ¶y duraÄŸÄ±nda inin." },
                { type: "walk", dest: "Åile Yolu", text: "Ã‡ekmekÃ¶y'den kalkan 139A / 139T otobÃ¼sleri ile Åile veya AÄŸva'ya devam edin." }
            ]
        }
    ],
    "ÅiÅŸli": [
        {
            name: "M2 YenikapÄ± - HacÄ±osman Metrosu (MecidiyekÃ¶y / ÅiÅŸli)",
            steps: [
                { type: "marmaray", dest: "YenikapÄ±", text: "Marmaray ile YenikapÄ± istasyonuna gidin." },
                { type: "aktarim", dest: "M2 Metro", text: "YenikapÄ±'da inip M2 HacÄ±osman metrosu katÄ±na geÃ§in." },
                { type: "metro", dest: "ÅiÅŸli / MecidiyekÃ¶y", text: "M2 metrosuna binip Osmanbey veya ÅiÅŸli-MecidiyekÃ¶y duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "MetrobÃ¼s (MecidiyekÃ¶y / Zincirlikuyu)",
            steps: [
                { type: "marmaray", dest: "SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme", text: "EÄŸer Anadolu YakasÄ±'ndan geliyorsanÄ±z, Marmaray ile SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme'ye gidin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "SÃ¶ÄŸÃ¼tlÃ¼Ã§eÅŸme'den MetrobÃ¼s aktarmasÄ± yapÄ±n." },
                { type: "metrobus", dest: "MecidiyekÃ¶y / Zincirlikuyu", text: "MetrobÃ¼s ile Zincirlikuyu, MecidiyekÃ¶y veya Ã‡aÄŸlayan duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "Tuzla": [
        {
            name: "Tuzla Merkez Sahil (Marmaray / YÃ¼rÃ¼me)",
            steps: [
                { type: "marmaray", dest: "Tuzla", text: "Marmaray ile doÄŸrudan Tuzla istasyonunda inin." },
                { type: "walk", dest: "Tuzla Sahil", text: "Ä°stasyondan Ã§Ä±karak Tuzla Marina, Ã§arÅŸÄ± ve sahile otobÃ¼s/minibÃ¼s ile ulaÅŸÄ±n." }
            ]
        },
        {
            name: "Ä°Ã§meler / AydÄ±ntepe (Marmaray)",
            steps: [
                { type: "marmaray", dest: "Ä°Ã§meler", text: "Marmaray ile Ä°Ã§meler veya AydÄ±ntepe istasyonlarÄ±nda inerek sanayi ve iÅŸ merkezlerine ulaÅŸÄ±n." }
            ]
        }
    ],
    "Ãœmraniye": [
        {
            name: "M5 ÃœskÃ¼dar - Ã‡ekmekÃ¶y Metrosu (Ãœmraniye / Ã‡arÅŸÄ±)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "ÃœskÃ¼dar istasyonundan M5 Metrosuna doÄŸrudan aktarma yapÄ±n." },
                { type: "metro", dest: "Ãœmraniye / Ã‡arÅŸÄ±", text: "M5 metrosu ile Ãœmraniye, Ã‡arÅŸÄ± veya Yamanevler duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "M8 BostancÄ± - Parseller Metrosu (Dudullu)",
            steps: [
                { type: "marmaray", dest: "BostancÄ±", text: "Marmaray ile BostancÄ± istasyonunda inin." },
                { type: "aktarim", dest: "M8 Metro", text: "BostancÄ± istasyonundan doÄŸrudan M8 Metrosuna geÃ§iÅŸ yapÄ±n." },
                { type: "metro", dest: "Dudullu / Parseller", text: "M8 metrosu ile Dudullu veya Parseller duraÄŸÄ±nda inin." }
            ]
        }
    ],
    "ÃœskÃ¼dar": [
        {
            name: "M5 ÃœskÃ¼dar - Ã‡ekmekÃ¶y Metrosu (Altunizade / BaÄŸlarbaÅŸÄ±)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "aktarim", dest: "M5 Metro", text: "ÃœskÃ¼dar istasyonundan M5 Metrosuna doÄŸrudan aktarma yapÄ±n." },
                { type: "metro", dest: "Altunizade", text: "M5 metrosuyla FÄ±stÄ±kaÄŸacÄ±, BaÄŸlarbaÅŸÄ± veya Altunizade duraÄŸÄ±nda inin." }
            ]
        },
        {
            name: "Åehir HatlarÄ± Vapuru (ÃœskÃ¼dar Ä°skelesi)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "walk", dest: "ÃœskÃ¼dar Sahil", text: "Ä°stasyondan Ã§Ä±kÄ±p sahile yÃ¼rÃ¼yerek BoÄŸaz hatlarÄ±na veya merkez iÃ§i ulaÅŸÄ±ma geÃ§in." }
            ]
        },
        {
            name: "MetrobÃ¼s (Altunizade)",
            steps: [
                { type: "marmaray", dest: "ÃœskÃ¼dar", text: "Marmaray ile ÃœskÃ¼dar istasyonunda inin." },
                { type: "metro", dest: "Altunizade", text: "M5 Metrosuna aktarma yapÄ±p Altunizade duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Altunizade'den MetrobÃ¼s hattÄ±na geÃ§iÅŸ yapÄ±n." }
            ]
        }
    ],
    "Zeytinburnu": [
        {
            name: "T1 KabataÅŸ - BaÄŸcÄ±lar TramvayÄ± (Zeytinburnu Merkez)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu duraÄŸÄ±nda inin (veya KazlÄ±Ã§eÅŸme'de)." },
                { type: "aktarim", dest: "T1 Tramvay", text: "Ä°stasyondan Ã§Ä±kÄ±p T1 TramvayÄ±na aktarma yapÄ±n." },
                { type: "metro", dest: "MithatpaÅŸa", text: "T1 TramvayÄ± ile MithatpaÅŸa veya AkÄ±ncÄ±lar duraÄŸÄ±nda inerek Zeytinburnu iÃ§lerine ulaÅŸÄ±n." }
            ]
        },
        {
            name: "MetrobÃ¼s (CevizlibaÄŸ / Zeytinburnu)",
            steps: [
                { type: "marmaray", dest: "Zeytinburnu", text: "Marmaray ile Zeytinburnu duraÄŸÄ±nda inin." },
                { type: "aktarim", dest: "MetrobÃ¼s", text: "Zeytinburnu'ndan dÄ±ÅŸarÄ± Ã§Ä±kÄ±p MetrobÃ¼se aktarma yapÄ±n." },
                { type: "metrobus", dest: "CevizlibaÄŸ", text: "MetrobÃ¼s ile CevizlibaÄŸ veya Merter duraklarÄ±nda inin." }
            ]
        }
    ]
};

    const ALL_DISTRICTS = [
        "Adalar", "ArnavutkÃ¶y", "AtaÅŸehir", "AvcÄ±lar", "BaÄŸcÄ±lar", "BahÃ§elievler", "BakÄ±rkÃ¶y",
        "BaÅŸakÅŸehir", "BayrampaÅŸa", "BeÅŸiktaÅŸ", "Beykoz", "BeylikdÃ¼zÃ¼", "BeyoÄŸlu", "BÃ¼yÃ¼kÃ§ekmece",
        "Ã‡atalca", "Ã‡ekmekÃ¶y", "Esenler", "Esenyurt", "EyÃ¼psultan", "Fatih", "GaziosmanpaÅŸa",
        "GÃ¼ngÃ¶ren", "KadÄ±kÃ¶y", "KaÄŸÄ±thane", "Kartal", "KÃ¼Ã§Ã¼kÃ§ekmece", "Maltepe", "Pendik",
        "Sancaktepe", "SarÄ±yer", "Silivri", "Sultanbeyli", "Sultangazi", "Åile", "ÅiÅŸli",
        "Tuzla", "Ãœmraniye", "ÃœskÃ¼dar", "Zeytinburnu"
    ];
    
    ALL_DISTRICTS.forEach(d => {
        if(!DISTRICT_MAP[d]) {
            DISTRICT_MAP[d] = [
                { 
                    name: d + " Merkez (En Uygun Ä°stasyon AktarmasÄ±)", 
                    steps: [
                        { type: "marmaray", dest: "En Uygun Ä°stasyon", text: "Marmaray'a binerek " + d + " ilÃ§esine coÄŸrafi olarak en yakÄ±n istasyonda inin." },
                        { type: "aktarim", dest: "Yerel UlaÅŸÄ±m", text: "Ä°stasyondan Ã§Ä±karak otobÃ¼s (Ä°ETT) veya minibÃ¼s duraklarÄ±na yÃ¶nelin." },
                        { type: "walk", dest: d, text: "Toplu taÅŸÄ±ma ile " + d + " hedefinize rahatÃ§a ulaÅŸÄ±n." }
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
        rotaNeighSel.innerHTML = '<option value="">Uygun rota seÃ§iniz...</option>';
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
            alert('LÃ¼tfen baÅŸlangÄ±Ã§ istasyonu, ilÃ§e ve hedefi eksiksiz seÃ§iniz.');
            return;
        }
        
        const neighData = DISTRICT_MAP[dist].find(n => n.name === neigh);
        if(!neighData) return;
        
        let html = '';
        
        // Dinamik AdÄ±m DÃ¶ngÃ¼sÃ¼
        neighData.steps.forEach((step, index) => {
            const isLast = (index === neighData.steps.length - 1);
            let logoSrc = LOGOS[step.type]; if(!logoSrc) { logoSrc = step.type.toLowerCase().includes('metro') ? LOGOS.metro : LOGOS.walk; }
            
            // AktarÄ±m Ã¶zel opacity ve style
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
</script>
