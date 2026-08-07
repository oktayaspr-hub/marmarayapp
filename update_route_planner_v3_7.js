const fs = require('fs');

let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

// Update label
content = content.replace('<label>Varış Semti (Hedef Rota):</label>', '<label>Varış Semti Yerine Uygun Rotalar:</label>');
content = content.replace('<option value="">Hedef seçiniz...</option>', '<option value="">Uygun rota seçiniz...</option>');
content = content.replace('rotaNeighSel.innerHTML = \'<option value="">Hedef hat / semt seçiniz...</option>\';', 'rotaNeighSel.innerHTML = \'<option value="">Uygun rota seçiniz...</option>\';');

// Create the massive DISTRICT_MAP JSON string
const massiveMap = `const DISTRICT_MAP = {
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
};`;

content = content.replace(/const DISTRICT_MAP = \{[\s\S]*?const ALL_DISTRICTS/g, massiveMap + '\n\n    const ALL_DISTRICTS');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
