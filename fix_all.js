const fs = require('fs');

const DISTRICT_MAP = {
    "Adalar": [
        { name: "Şehir Hatları (Büyükada / Heybeliada / Kınalıada)", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray'a binerek Bostancı istasyonunda inin." }, { type: "walk", dest: "Bostancı İskelesi", text: "Bostancı'da inip sahildeki iskeleye kısa bir yürüyüş yapın." }, { type: "vapur", dest: "Adalar", text: "İskeleden Adalar vapuruna binerek hedefinize ulaşın." } ] }
    ],
    "Arnavutköy": [
        { name: "M11 İstanbul Havalimanı - Arnavutköy Metrosu", steps: [ { type: "marmaray", dest: "Halkalı", text: "Marmaray ile Halkalı istasyonuna gidin." }, { type: "aktarim", dest: "M11 Metro", text: "Halkalı'dan M11 Metrosuna aktarma yapın." }, { type: "metro", dest: "Arnavutköy", text: "M11 ile Arnavutköy veya Taşoluk durağında inin." } ] }
    ],
    "Ataşehir": [
        { name: "M8 Bostancı - Dudullu Metrosu (Ataşehir)", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancı'da inip M8 Metrosuna aktarma yapın." }, { type: "metro", dest: "Ataşehir / İçerenköy", text: "M8 ile Ataşehir veya İçerenköy duraklarında inin." } ] },
        { name: "M4 Kadıköy - Sabiha Gökçen Metrosu (Yenisahra)", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." }, { type: "metro", dest: "Yenisahra", text: "M4 ile Yenisahra durağında inin." } ] }
    ],
    "Avcılar": [
        { name: "Metrobüs (Avcılar)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın (Beylikdüzü yönü)." }, { type: "metrobus", dest: "Avcılar Merkez / Üniversite Kampüsü", text: "Metrobüs ile Avcılar Merkez durağında inin." } ] }
    ],
    "Bağcılar": [
        { name: "M1B Yenikapı - Kirazlı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapı'da M1B Metrosuna aktarma yapın." }, { type: "metro", dest: "Bağcılar / Kirazlı", text: "M1B ile Bağcılar Meydan veya Kirazlı durağında inin." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın." }, { type: "tramvay", dest: "Bağcılar", text: "T1 ile Bağcılar son durağında inin." } ] },
        { name: "M3 Kirazlı - Kayaşehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakırköy Sahil - Kayaşehir (M3) Metrosuna aktarma yapın." }, { type: "metro", dest: "Kirazlı / Yeni Mahalle", text: "M3 ile Bağcılar sınırları içindeki duraklarda inin." } ] }
    ],
    "Bahçelievler": [
        { name: "M1A Yenikapı - Atatürk Havalimanı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapı'da M1A Metrosuna aktarma yapın." }, { type: "metro", dest: "Bahçelievler / Şirinevler", text: "M1A ile Bahçelievler veya Şirinevler durağında inin." } ] },
        { name: "M9 Ataköy - Olimpiyat Metrosu (Yenibosna)", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonuna gidin." }, { type: "aktarim", dest: "M9 Metro", text: "Ataköy'de M9 Metrosuna aktarma yapın." }, { type: "metro", dest: "Yenibosna / Çobançeşme", text: "M9 ile Yenibosna, Çobançeşme duraklarında inin." } ] }
    ],
    "Bakırköy": [
        { name: "M3 Bakırköy Sahil - Kayaşehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakırköy Sahil veya İncirli yönüne giden M3 Metrosuna aktarma yapın." }, { type: "metro", dest: "İncirli", text: "M3 ile İncirli (Bakırköy) durağında inin." } ] },
        { name: "M1A Yenikapı - Atatürk Havalimanı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapı'da M1A Metrosuna aktarma yapın." }, { type: "metro", dest: "İncirli / Bakırköy", text: "M1A ile İncirli veya Bakırköy-İncirli durağında inin." } ] }
    ],
    "Başakşehir": [
        { name: "M3 Bakırköy - Kayaşehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakırköy Sahil - Kayaşehir Metrosuna aktarma yapın." }, { type: "metro", dest: "Başakşehir / Kayaşehir", text: "M3 ile Başakşehir Metrokent veya Kayaşehir Merkez durağında inin." } ] },
        { name: "M9 Ataköy - Olimpiyat Metrosu", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." }, { type: "aktarim", dest: "M9 Metro", text: "M9 Metrosuna aktarma yapın." }, { type: "metro", dest: "Olimpiyat / İkitelli Sanayi", text: "M9 ile Olimpiyat veya Ziya Gökalp durağında inin." } ] }
    ],
    "Bayrampaşa": [
        { name: "M1A/M1B Yenikapı - Havalimanı / Kirazlı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1A/M1B Metro", text: "Yenikapı'da M1 Metrosuna aktarma yapın." }, { type: "metro", dest: "Bayrampaşa - Maltepe / Sağmalcılar", text: "M1 ile Bayrampaşa veya Sağmalcılar durağında inin." } ] },
        { name: "T4 Topkapı - Mescid-i Selam Tramvayı", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin, M1 ile Topkapı'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'da T4 Tramvayına aktarma yapın." }, { type: "tramvay", dest: "Vatan / Edirnekapı", text: "T4 ile Bayrampaşa sınırlarında inin." } ] }
    ],
    "Beşiktaş": [
        { name: "M2 Yenikapı - Hacıosman Metrosu (Levent)", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da M2 Metrosuna aktarma yapın." }, { type: "metro", dest: "Levent / 4. Levent", text: "M2 ile Levent veya 4. Levent durağında inin." } ] },
        { name: "M7 Yıldız - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapın." }, { type: "metro", dest: "Yıldız / Fulya", text: "M7 ile Yıldız veya Fulya durağında inin." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın (Kabataş yönü)." }, { type: "tramvay", dest: "Kabataş", text: "T1 ile Kabataş durağında inip Beşiktaş'a yürüyebilir veya otobüse binebilirsiniz." } ] },
        { name: "Şehir Hatları (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "walk", dest: "Üsküdar İskelesi", text: "Üsküdar İskelesine yürüyün." }, { type: "vapur", dest: "Beşiktaş", text: "Üsküdar'dan Beşiktaş vapuruna veya motoruna binin." } ] }
    ],
    "Beykoz": [
        { name: "Şehir Hatları (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "walk", dest: "Üsküdar Meydan", text: "Üsküdar meydanına çıkın." }, { type: "vapur", dest: "Beykoz", text: "Üsküdar'dan Beykoz otobüslerine (15 vb.) veya Boğaz hattı vapuruna binin." } ] }
    ],
    "Beylikdüzü": [
        { name: "Metrobüs (Beylikdüzü Merkez / Güzelyurt)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın (Beylikdüzü yönü)." }, { type: "metrobus", dest: "Beylikdüzü / Cumhuriyet Mah.", text: "Metrobüs ile Beylikdüzü Belediye veya Cumhuriyet Mah. durağında inin." } ] }
    ],
    "Beyoğlu": [
        { name: "M2 Yenikapı - Hacıosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da M2 Metrosuna aktarma yapın." }, { type: "metro", dest: "Taksim / Şişhane", text: "M2 ile Taksim veya Şişhane durağında inin." } ] },
        { name: "T2 Taksim - Tünel Nostaljik Tramvay", steps: [ { type: "marmaray", dest: "Yenikapı", text: "M2 ile Taksim'e gidin." }, { type: "aktarim", dest: "T2 Tramvay", text: "Taksim Meydanı'nda Nostaljik Tramvaya binin." }, { type: "tramvay", dest: "İstiklal Caddesi", text: "İstiklal Caddesi boyunca ilerleyin." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın (Kabataş yönü)." }, { type: "tramvay", dest: "Karaköy / Tophane", text: "T1 ile Karaköy, Tophane veya Fındıklı durağında inin." } ] }
    ],
    "Büyükçekmece": [
        { name: "Metrobüs (TÜYAP)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın." }, { type: "metrobus", dest: "Beylikdüzü Son Durak (TÜYAP)", text: "Metrobüs ile son durak TÜYAP'ta inin, Büyükçekmece'ye minibüs veya otobüsle geçin." } ] }
    ],
    "Çatalca": [
        { name: "Otobüs Aktarması (Halkalı'dan)", steps: [ { type: "marmaray", dest: "Halkalı", text: "Marmaray ile Halkalı son durağına gidin." }, { type: "walk", dest: "Otobüs Durakları", text: "Halkalı Meydanı otobüs duraklarına geçin." }, { type: "vapur", dest: "Çatalca", text: "Halkalı'dan Çatalca yönüne giden İETT otobüslerine (örn. 401) binin." } ] }
    ],
    "Çekmeköy": [
        { name: "M5 Üsküdar - Samandıra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapın." }, { type: "metro", dest: "Çekmeköy", text: "M5 ile Çekmeköy durağında inin." } ] },
        { name: "M8 Bostancı - Dudullu Metrosu (Modoko)", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancı'da M8 Metrosuna aktarma yapın." }, { type: "metro", dest: "Dudullu / Modoko", text: "M8 ile Dudullu veya Modoko durağında inip Çekmeköy'e geçebilirsiniz." } ] }
    ],
    "Esenler": [
        { name: "M1B Yenikapı - Kirazlı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapı'da M1B Metrosuna aktarma yapın." }, { type: "metro", dest: "Esenler / Otogar", text: "M1B ile Esenler veya Otogar durağında inin." } ] }
    ],
    "Esenyurt": [
        { name: "Metrobüs (Haramidere / Saadetdere)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın." }, { type: "metrobus", dest: "Haramidere", text: "Metrobüs ile Haramidere Sanayi veya Saadetdere durağında inin." } ] }
    ],
    "Eyüpsultan": [
        { name: "T5 Eminönü - Alibeyköy Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "walk", dest: "Eminönü", text: "Sirkeci'den Eminönü Tramvay durağına kısa bir yürüyüş yapın." }, { type: "tramvay", dest: "Eyüpsultan Merkez", text: "T5 ile Eyüpsultan Teleferik veya Alibeyköy durağında inin." } ] },
        { name: "M7 Yıldız - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Yenikapı'ya gidip M2 ile Mecidiyeköy'e geçin, oradan M7'ye aktarma yapın." }, { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna binin (Mahmutbey yönü)." }, { type: "metro", dest: "Alibeyköy / Veysel Karani", text: "M7 ile Alibeyköy veya Veysel Karani durağında inin." } ] }
    ],
    "Fatih": [
        { name: "M1A/M1B Yenikapı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1 Metro", text: "Yenikapı'da M1 Metrosuna aktarma yapın." }, { type: "metro", dest: "Aksaray / Emniyet - Fatih", text: "M1 ile Aksaray veya Emniyet-Fatih durağında inin." } ] },
        { name: "M2 Yenikapı - Hacıosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da M2 Metrosuna aktarma yapın." }, { type: "metro", dest: "Vezneciler / Haliç", text: "M2 ile Vezneciler veya Haliç durağında inin." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın (Bağcılar yönü)." }, { type: "tramvay", dest: "Sultanahmet / Beyazıt / Aksaray", text: "T1 ile Fatih sınırları içindeki duraklarda inin." } ] }
    ],
    "Gaziosmanpaşa": [
        { name: "T4 Topkapı - Mescid-i Selam Tramvayı", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin, M1 ile Topkapı'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'da T4 Tramvayına aktarma yapın." }, { type: "tramvay", dest: "Bosna Çukurçeşme / Ali Fuat Başgil", text: "T4 ile Gaziosmanpaşa duraklarında inin." } ] },
        { name: "M7 Yıldız - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Yenikapı'dan M2 ile Mecidiyeköy'e, oradan M7'ye geçin." }, { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna binin (Mahmutbey yönü)." }, { type: "metro", dest: "Karadeniz Mahallesi / Yeni Mahalle", text: "M7 ile Karadeniz Mah. veya Yeni Mahalle durağında inin." } ] }
    ],
    "Güngören": [
        { name: "M1B Yenikapı - Kirazlı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapı'da M1B Metrosuna aktarma yapın." }, { type: "metro", dest: "Esenler", text: "M1B ile Esenler durağında inip Güngören'e yürüyebilirsiniz." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın (Bağcılar yönü)." }, { type: "tramvay", dest: "Güngören / Merter", text: "T1 ile Güngören veya Merter Tekstil Merkezi durağında inin." } ] },
        { name: "M3 Bakırköy - Kayaşehir Metrosu", steps: [ { type: "marmaray", dest: "Bakırköy", text: "Marmaray ile Bakırköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakırköy Sahil - Kayaşehir Metrosuna aktarma yapın." }, { type: "metro", dest: "Haznedar / İlkyuva", text: "M3 ile Haznedar veya İlkyuva durağında inin." } ] }
    ],
    "Kadıköy": [
        { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." }, { type: "metro", dest: "Kadıköy / Göztepe / Kozyatağı", text: "M4 ile Kadıköy, Göztepe, Kozyatağı vb. duraklarda inin." } ] },
        { name: "M8 Bostancı - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancı'da M8 Metrosuna aktarma yapın." }, { type: "metro", dest: "Bostancı / Ayşe Kadın", text: "M8 ile Bostancı veya Ayşe Kadın durağında inin." } ] },
        { name: "T3 Kadıköy - Moda Nostaljik Tramvay", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Ayrılık Çeşmesi'nden M4 ile Kadıköy'e gidin." }, { type: "aktarim", dest: "T3 Tramvay", text: "Kadıköy Meydanı'nda T3 Tramvayına binin." }, { type: "tramvay", dest: "Moda", text: "T3 ile Moda semtini gezebilirsiniz." } ] }
    ],
    "Kağıthane": [
        { name: "M7 Yıldız - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapın." }, { type: "metro", dest: "Kağıthane / Çağlayan", text: "M7 ile Kağıthane veya Çağlayan durağında inin." } ] },
        { name: "M11 İstanbul Havalimanı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidip M2 ile Gayrettepe'ye geçin." }, { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 Metrosuna aktarma yapın." }, { type: "metro", dest: "Kağıthane", text: "M11 ile Kağıthane durağında inin." } ] }
    ],
    "Kartal": [
        { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." }, { type: "metro", dest: "Kartal / Yakacık", text: "M4 ile Kartal veya Yakacık-Adnan Kahveci durağında inin." } ] }
    ],
    "Küçükçekmece": [
        { name: "M9 Ataköy - Olimpiyat Metrosu", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." }, { type: "aktarim", dest: "M9 Metro", text: "M9 Metrosuna aktarma yapın." }, { type: "metro", dest: "Atatürk Mahallesi / Bahariye", text: "M9 ile Atatürk Mahallesi veya Bahariye durağında inin." } ] },
        { name: "Metrobüs (Sefaköy / Cennet)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın." }, { type: "metrobus", dest: "Sefaköy / Cennet Mah.", text: "Metrobüs ile Sefaköy veya Cennet Mahallesi durağında inin." } ] }
    ],
    "Maltepe": [
        { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." }, { type: "metro", dest: "Maltepe / Küçükyalı", text: "M4 ile Maltepe, Küçükyalı veya Huzurevi durağında inin." } ] },
        { name: "M8 Bostancı - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancı'da M8 Metrosuna aktarma yapın." }, { type: "metro", dest: "Emin Ali Paşa", text: "M8 ile Emin Ali Paşa durağında inin." } ] }
    ],
    "Pendik": [
        { name: "M4 Kadıköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrılık Çeşmesi", text: "Marmaray ile Ayrılık Çeşmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapın." }, { type: "metro", dest: "Pendik / Tavşantepe / Sabiha Gökçen", text: "M4 ile Pendik, Tavşantepe, Kurtköy veya Sabiha Gökçen durağında inin." } ] },
        { name: "M10 Pendik - Sabiha Gökçen Metrosu (Yapım Aşamasında)", steps: [ { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." }, { type: "aktarim", dest: "M10 Metro", text: "Gelecekte M10 Metrosuna aktarma yapabilirsiniz." }, { type: "metro", dest: "Kaynarca Merkez", text: "M10 ile Pendik içlerine seyahat edin." } ] }
    ],
    "Sancaktepe": [
        { name: "M5 Üsküdar - Samandıra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapın." }, { type: "metro", dest: "Sarıgazi / Samandıra Merkez", text: "M5 ile Sarıgazi, Sancaktepe veya Samandıra Merkez durağında inin." } ] }
    ],
    "Sarıyer": [
        { name: "M2 Yenikapı - Hacıosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da M2 Metrosuna aktarma yapın." }, { type: "metro", dest: "İTÜ Ayazağa / Hacıosman", text: "M2 ile İTÜ Ayazağa, Darüşşafaka veya Hacıosman durağında inin." } ] },
        { name: "F3 Seyrantepe - Vadi İstanbul Füniküleri", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidip M2 ile Seyrantepe'ye geçin." }, { type: "aktarim", dest: "F3 Füniküler", text: "Seyrantepe'de F3 Fünikülerine aktarma yapın." }, { type: "metro", dest: "Vadi İstanbul", text: "F3 ile Vadi İstanbul'da inin." } ] }
    ],
    "Silivri": [
        { name: "Metrobüs + Otobüs (TÜYAP'tan)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapın." }, { type: "metrobus", dest: "Beylikdüzü Son Durak", text: "Metrobüs ile TÜYAP'ta inip Silivri yönüne giden otobüslere (300G vb.) binin." } ] }
    ],
    "Sultanbeyli": [
        { name: "M5 Üsküdar - Sultanbeyli Metrosu (Yapım Aşamasında)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapın." }, { type: "metro", dest: "Sultanbeyli", text: "M5 ile gelecekte Sultanbeyli Merkez durağında inebilirsiniz." } ] }
    ],
    "Sultangazi": [
        { name: "T4 Topkapı - Mescid-i Selam Tramvayı", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidin, M1 ile Topkapı'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapı'da T4 Tramvayına aktarma yapın." }, { type: "tramvay", dest: "Mescid-i Selam", text: "T4 ile Cumhuriyet, 50. Yıl veya Mescid-i Selam durağında inin." } ] }
    ],
    "Şile": [
        { name: "Otobüs (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "walk", dest: "Üsküdar Peronlar", text: "Marmaray çıkışındaki İETT peronlarına yürüyün." }, { type: "vapur", dest: "Şile", text: "139 veya 139A (Şile/Ağva) numaralı otobüslere binin." } ] }
    ],
    "Şişli": [
        { name: "M2 Yenikapı - Hacıosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapı'da M2 Metrosuna aktarma yapın." }, { type: "metro", dest: "Şişli-Mecidiyeköy / Osmanbey", text: "M2 ile Şişli-Mecidiyeköy veya Osmanbey durağında inin." } ] },
        { name: "M7 Yıldız - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'de M7 Metrosuna aktarma yapın." }, { type: "metro", dest: "Mecidiyeköy / Çağlayan", text: "M7 ile Mecidiyeköy'de veya Şişli sınırlarında inin." } ] }
    ],
    "Tuzla": [
        { name: "Marmaray (Tuzla Sınırları)", steps: [ { type: "marmaray", dest: "Aydıntepe / İçmeler / Tuzla", text: "Marmaray'dan Aydıntepe, İçmeler veya Tuzla istasyonlarından birinde inerek ilçeye ulaşabilirsiniz." } ] }
    ],
    "Ümraniye": [
        { name: "M5 Üsküdar - Samandıra Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapın." }, { type: "metro", dest: "Ümraniye / Çarşı / Yamanevler", text: "M5 ile Ümraniye, Çarşı veya Yamanevler durağında inin." } ] },
        { name: "M8 Bostancı - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancı", text: "Marmaray ile Bostancı istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancı'da M8 Metrosuna aktarma yapın." }, { type: "metro", dest: "Dudullu / İMES", text: "M8 ile Dudullu, İMES veya Parseller durağında inin." } ] }
    ],
    "Üsküdar": [
        { name: "M5 Üsküdar - Samandıra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "aktarim", dest: "M5 Metro", text: "Marmaray'dan çıkıp M5 Metrosuna binin." }, { type: "metro", dest: "Fıstıkağacı / Bağlarbaşı", text: "M5 ile Fıstıkağacı, Bağlarbaşı veya Altunizade durağında inin." } ] }
    ],
    "Zeytinburnu": [
        { name: "M1A Yenikapı - Havalimanı Metrosu", steps: [ { type: "marmaray", dest: "Yenikapı", text: "Marmaray ile Yenikapı istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapı'da M1A Metrosuna aktarma yapın." }, { type: "metro", dest: "Zeytinburnu / Merter", text: "M1A ile Zeytinburnu veya Merter durağında inin." } ] },
        { name: "T1 Kabataş - Bağcılar Tramvayı", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayına aktarma yapın (Bağcılar yönü)." }, { type: "tramvay", dest: "Zeytinburnu / Akşemsettin", text: "T1 ile Zeytinburnu, Akşemsettin veya Mithatpaşa durağında inin." } ] },
        { name: "Marmaray (Kazlıçeşme / Zeytinburnu)", steps: [ { type: "marmaray", dest: "Kazlıçeşme / Zeytinburnu", text: "Marmaray'dan Kazlıçeşme veya Zeytinburnu istasyonunda inerek direkt ilçeye ulaşabilirsiniz." } ] }
    ]
};

let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

const startIdx = content.indexOf('const DISTRICT_MAP = {');
const endIdx = content.indexOf('};', startIdx) + 2;

const newStr = 'const DISTRICT_MAP = ' + JSON.stringify(DISTRICT_MAP, null, 4) + ';';

content = content.substring(0, startIdx) + newStr + content.substring(endIdx);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
