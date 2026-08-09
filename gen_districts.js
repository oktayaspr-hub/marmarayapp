const fs = require('fs');

const DISTRICT_MAP = {
    "Adalar": [
        { name: "Þehir Hatlarý (Büyükada / Heybeliada / Kýnalýada)", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray'a binerek Bostancý istasyonunda inin." }, { type: "walk", dest: "Bostancý Ýskelesi", text: "Bostancý'da inip sahildeki iskeleye kýsa bir yürüyüþ yapýn." }, { type: "vapur", dest: "Adalar", text: "Ýskeleden Adalar vapuruna binerek hedefinize ulaþýn." } ] }
    ],
    "Arnavutköy": [
        { name: "M11 Ýstanbul Havalimaný - Arnavutköy Metrosu", steps: [ { type: "marmaray", dest: "Halkalý", text: "Marmaray ile Halkalý istasyonuna gidin." }, { type: "aktarim", dest: "M11 Metro", text: "Halkalý'dan M11 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Arnavutköy", text: "M11 ile Arnavutköy veya Taþoluk duraðýnda inin." } ] }
    ],
    "Ataþehir": [
        { name: "M8 Bostancý - Dudullu Metrosu (Ataþehir)", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray ile Bostancý istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancý'da inip M8 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Ataþehir / Ýçerenköy", text: "M8 ile Ataþehir veya Ýçerenköy duraklarýnda inin." } ] },
        { name: "M4 Kadýköy - Sabiha Gökçen Metrosu (Yenisahra)", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Marmaray ile Ayrýlýk Çeþmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Yenisahra", text: "M4 ile Yenisahra duraðýnda inin." } ] }
    ],
    "Avcýlar": [
        { name: "Metrobüs (Avcýlar)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn (Beylikdüzü yönü)." }, { type: "metrobus", dest: "Avcýlar Merkez / Üniversite Kampüsü", text: "Metrobüs ile Avcýlar Merkez duraðýnda inin." } ] }
    ],
    "Baðcýlar": [
        { name: "M1B Yenikapý - Kirazlý Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapý'da M1B Metrosuna aktarma yapýn." }, { type: "metro", dest: "Baðcýlar / Kirazlý", text: "M1B ile Baðcýlar Meydan veya Kirazlý duraðýnda inin." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn." }, { type: "tramvay", dest: "Baðcýlar", text: "T1 ile Baðcýlar son duraðýnda inin." } ] },
        { name: "M3 Kirazlý - Kayaþehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakýrköy", text: "Marmaray ile Bakýrköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakýrköy Sahil - Kayaþehir (M3) Metrosuna aktarma yapýn." }, { type: "metro", dest: "Kirazlý / Yeni Mahalle", text: "M3 ile Baðcýlar sýnýrlarý içindeki duraklarda inin." } ] }
    ],
    "Bahçelievler": [
        { name: "M1A Yenikapý - Atatürk Havalimaný Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapý'da M1A Metrosuna aktarma yapýn." }, { type: "metro", dest: "Bahçelievler / Þirinevler", text: "M1A ile Bahçelievler veya Þirinevler duraðýnda inin." } ] },
        { name: "M9 Ataköy - Olimpiyat Metrosu (Yenibosna)", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonuna gidin." }, { type: "aktarim", dest: "M9 Metro", text: "Ataköy'de M9 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Yenibosna / Çobançeþme", text: "M9 ile Yenibosna, Çobançeþme duraklarýnda inin." } ] }
    ],
    "Bakýrköy": [
        { name: "M3 Bakýrköy Sahil - Kayaþehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakýrköy", text: "Marmaray ile Bakýrköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakýrköy Sahil veya Ýncirli yönüne giden M3 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Ýncirli", text: "M3 ile Ýncirli (Bakýrköy) duraðýnda inin." } ] },
        { name: "M1A Yenikapý - Atatürk Havalimaný Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapý'da M1A Metrosuna aktarma yapýn." }, { type: "metro", dest: "Ýncirli / Bakýrköy", text: "M1A ile Ýncirli veya Bakýrköy-Ýncirli duraðýnda inin." } ] }
    ],
    "Baþakþehir": [
        { name: "M3 Bakýrköy - Kayaþehir Merkez Metrosu", steps: [ { type: "marmaray", dest: "Bakýrköy", text: "Marmaray ile Bakýrköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakýrköy Sahil - Kayaþehir Metrosuna aktarma yapýn." }, { type: "metro", dest: "Baþakþehir / Kayaþehir", text: "M3 ile Baþakþehir Metrokent veya Kayaþehir Merkez duraðýnda inin." } ] },
        { name: "M9 Ataköy - Olimpiyat Metrosu", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." }, { type: "aktarim", dest: "M9 Metro", text: "M9 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Olimpiyat / Ýkitelli Sanayi", text: "M9 ile Olimpiyat veya Ziya Gökalp duraðýnda inin." } ] }
    ],
    "Bayrampaþa": [
        { name: "M1A/M1B Yenikapý - Havalimaný / Kirazlý Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1A/M1B Metro", text: "Yenikapý'da M1 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Bayrampaþa - Maltepe / Saðmalcýlar", text: "M1 ile Bayrampaþa veya Saðmalcýlar duraðýnda inin." } ] },
        { name: "T4 Topkapý - Mescid-i Selam Tramvayý", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidin, M1 ile Topkapý'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapý'da T4 Tramvayýna aktarma yapýn." }, { type: "tramvay", dest: "Vatan / Edirnekapý", text: "T4 ile Bayrampaþa sýnýrlarýnda inin." } ] }
    ],
    "Beþiktaþ": [
        { name: "M2 Yenikapý - Hacýosman Metrosu (Levent)", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapý'da M2 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Levent / 4. Levent", text: "M2 ile Levent veya 4. Levent duraðýnda inin." } ] },
        { name: "M7 Yýldýz - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Yýldýz / Fulya", text: "M7 ile Yýldýz veya Fulya duraðýnda inin." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn (Kabataþ yönü)." }, { type: "tramvay", dest: "Kabataþ", text: "T1 ile Kabataþ duraðýnda inip Beþiktaþ'a yürüyebilir veya otobüse binebilirsiniz." } ] },
        { name: "Þehir Hatlarý (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "walk", dest: "Üsküdar Ýskelesi", text: "Üsküdar Ýskelesine yürüyün." }, { type: "vapur", dest: "Beþiktaþ", text: "Üsküdar'dan Beþiktaþ vapuruna veya motoruna binin." } ] }
    ],
    "Beykoz": [
        { name: "Þehir Hatlarý (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "walk", dest: "Üsküdar Meydan", text: "Üsküdar meydanýna çýkýn." }, { type: "vapur", dest: "Beykoz", text: "Üsküdar'dan Beykoz otobüslerine (15 vb.) veya Boðaz hattý vapuruna binin." } ] }
    ],
    "Beylikdüzü": [
        { name: "Metrobüs (Beylikdüzü Merkez / Güzelyurt)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn (Beylikdüzü yönü)." }, { type: "metrobus", dest: "Beylikdüzü / Cumhuriyet Mah.", text: "Metrobüs ile Beylikdüzü Belediye veya Cumhuriyet Mah. duraðýnda inin." } ] }
    ],
    "Beyoðlu": [
        { name: "M2 Yenikapý - Hacýosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapý'da M2 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Taksim / Þiþhane", text: "M2 ile Taksim veya Þiþhane duraðýnda inin." } ] },
        { name: "T2 Taksim - Tünel Nostaljik Tramvay", steps: [ { type: "marmaray", dest: "Yenikapý", text: "M2 ile Taksim'e gidin." }, { type: "aktarim", dest: "T2 Tramvay", text: "Taksim Meydaný'nda Nostaljik Tramvaya binin." }, { type: "tramvay", dest: "Ýstiklal Caddesi", text: "Ýstiklal Caddesi boyunca ilerleyin." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn (Kabataþ yönü)." }, { type: "tramvay", dest: "Karaköy / Tophane", text: "T1 ile Karaköy, Tophane veya Fýndýklý duraðýnda inin." } ] }
    ],
    "Büyükçekmece": [
        { name: "Metrobüs (TÜYAP)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn." }, { type: "metrobus", dest: "Beylikdüzü Son Durak (TÜYAP)", text: "Metrobüs ile son durak TÜYAP'ta inin, Büyükçekmece'ye minibüs veya otobüsle geçin." } ] }
    ],
    "Çatalca": [
        { name: "Otobüs Aktarmasý (Halkalý'dan)", steps: [ { type: "marmaray", dest: "Halkalý", text: "Marmaray ile Halkalý son duraðýna gidin." }, { type: "walk", dest: "Otobüs Duraklarý", text: "Halkalý Meydaný otobüs duraklarýna geçin." }, { type: "vapur", dest: "Çatalca", text: "Halkalý'dan Çatalca yönüne giden ÝETT otobüslerine (örn. 401) binin." } ] }
    ],
    "Çekmeköy": [
        { name: "M5 Üsküdar - Samandýra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Çekmeköy", text: "M5 ile Çekmeköy duraðýnda inin." } ] },
        { name: "M8 Bostancý - Dudullu Metrosu (Modoko)", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray ile Bostancý istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancý'da M8 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Dudullu / Modoko", text: "M8 ile Dudullu veya Modoko duraðýnda inip Çekmeköy'e geçebilirsiniz." } ] }
    ],
    "Esenler": [
        { name: "M1B Yenikapý - Kirazlý Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapý'da M1B Metrosuna aktarma yapýn." }, { type: "metro", dest: "Esenler / Otogar", text: "M1B ile Esenler veya Otogar duraðýnda inin." } ] }
    ],
    "Esenyurt": [
        { name: "Metrobüs (Haramidere / Saadetdere)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn." }, { type: "metrobus", dest: "Haramidere", text: "Metrobüs ile Haramidere Sanayi veya Saadetdere duraðýnda inin." } ] }
    ],
    "Eyüpsultan": [
        { name: "T5 Eminönü - Alibeyköy Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "walk", dest: "Eminönü", text: "Sirkeci'den Eminönü Tramvay duraðýna kýsa bir yürüyüþ yapýn." }, { type: "tramvay", dest: "Eyüpsultan Merkez", text: "T5 ile Eyüpsultan Teleferik veya Alibeyköy duraðýnda inin." } ] },
        { name: "M7 Yýldýz - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Yenikapý'ya gidip M2 ile Mecidiyeköy'e geçin, oradan M7'ye aktarma yapýn." }, { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna binin (Mahmutbey yönü)." }, { type: "metro", dest: "Alibeyköy / Veysel Karani", text: "M7 ile Alibeyköy veya Veysel Karani duraðýnda inin." } ] }
    ],
    "Fatih": [
        { name: "M1A/M1B Yenikapý Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1 Metro", text: "Yenikapý'da M1 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Aksaray / Emniyet - Fatih", text: "M1 ile Aksaray veya Emniyet-Fatih duraðýnda inin." } ] },
        { name: "M2 Yenikapý - Hacýosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapý'da M2 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Vezneciler / Haliç", text: "M2 ile Vezneciler veya Haliç duraðýnda inin." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn (Baðcýlar yönü)." }, { type: "tramvay", dest: "Sultanahmet / Beyazýt / Aksaray", text: "T1 ile Fatih sýnýrlarý içindeki duraklarda inin." } ] }
    ],
    "Gaziosmanpaþa": [
        { name: "T4 Topkapý - Mescid-i Selam Tramvayý", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidin, M1 ile Topkapý'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapý'da T4 Tramvayýna aktarma yapýn." }, { type: "tramvay", dest: "Bosna Çukurçeþme / Ali Fuat Baþgil", text: "T4 ile Gaziosmanpaþa duraklarýnda inin." } ] },
        { name: "M7 Yýldýz - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Yenikapý'dan M2 ile Mecidiyeköy'e, oradan M7'ye geçin." }, { type: "aktarim", dest: "M7 Metro", text: "M7 Metrosuna binin (Mahmutbey yönü)." }, { type: "metro", dest: "Karadeniz Mahallesi / Yeni Mahalle", text: "M7 ile Karadeniz Mah. veya Yeni Mahalle duraðýnda inin." } ] }
    ],
    "Güngören": [
        { name: "M1B Yenikapý - Kirazlý Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1B Metro", text: "Yenikapý'da M1B Metrosuna aktarma yapýn." }, { type: "metro", dest: "Esenler", text: "M1B ile Esenler duraðýnda inip Güngören'e yürüyebilirsiniz." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn (Baðcýlar yönü)." }, { type: "tramvay", dest: "Güngören / Merter", text: "T1 ile Güngören veya Merter Tekstil Merkezi duraðýnda inin." } ] },
        { name: "M3 Bakýrköy - Kayaþehir Metrosu", steps: [ { type: "marmaray", dest: "Bakýrköy", text: "Marmaray ile Bakýrköy istasyonunda inin." }, { type: "aktarim", dest: "M3 Metro", text: "Bakýrköy Sahil - Kayaþehir Metrosuna aktarma yapýn." }, { type: "metro", dest: "Haznedar / Ýlkyuva", text: "M3 ile Haznedar veya Ýlkyuva duraðýnda inin." } ] }
    ],
    "Kadýköy": [
        { name: "M4 Kadýköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Marmaray ile Ayrýlýk Çeþmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Kadýköy / Göztepe / Kozyataðý", text: "M4 ile Kadýköy, Göztepe, Kozyataðý vb. duraklarda inin." } ] },
        { name: "M8 Bostancý - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray ile Bostancý istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancý'da M8 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Bostancý / Ayþe Kadýn", text: "M8 ile Bostancý veya Ayþe Kadýn duraðýnda inin." } ] },
        { name: "T3 Kadýköy - Moda Nostaljik Tramvay", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Ayrýlýk Çeþmesi'nden M4 ile Kadýköy'e gidin." }, { type: "aktarim", dest: "T3 Tramvay", text: "Kadýköy Meydaný'nda T3 Tramvayýna binin." }, { type: "tramvay", dest: "Moda", text: "T3 ile Moda semtini gezebilirsiniz." } ] }
    ],
    "Kaðýthane": [
        { name: "M7 Yýldýz - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'den M7 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Kaðýthane / Çaðlayan", text: "M7 ile Kaðýthane veya Çaðlayan duraðýnda inin." } ] },
        { name: "M11 Ýstanbul Havalimaný Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidip M2 ile Gayrettepe'ye geçin." }, { type: "aktarim", dest: "M11 Metro", text: "Gayrettepe'den M11 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Kaðýthane", text: "M11 ile Kaðýthane duraðýnda inin." } ] }
    ],
    "Kartal": [
        { name: "M4 Kadýköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Marmaray ile Ayrýlýk Çeþmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Kartal / Yakacýk", text: "M4 ile Kartal veya Yakacýk-Adnan Kahveci duraðýnda inin." } ] }
    ],
    "Küçükçekmece": [
        { name: "M9 Ataköy - Olimpiyat Metrosu", steps: [ { type: "marmaray", dest: "Ataköy", text: "Marmaray ile Ataköy istasyonunda inin." }, { type: "aktarim", dest: "M9 Metro", text: "M9 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Atatürk Mahallesi / Bahariye", text: "M9 ile Atatürk Mahallesi veya Bahariye duraðýnda inin." } ] },
        { name: "Metrobüs (Sefaköy / Cennet)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn." }, { type: "metrobus", dest: "Sefaköy / Cennet Mah.", text: "Metrobüs ile Sefaköy veya Cennet Mahallesi duraðýnda inin." } ] }
    ],
    "Maltepe": [
        { name: "M4 Kadýköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Marmaray ile Ayrýlýk Çeþmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Maltepe / Küçükyalý", text: "M4 ile Maltepe, Küçükyalý veya Huzurevi duraðýnda inin." } ] },
        { name: "M8 Bostancý - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray ile Bostancý istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancý'da M8 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Emin Ali Paþa", text: "M8 ile Emin Ali Paþa duraðýnda inin." } ] }
    ],
    "Pendik": [
        { name: "M4 Kadýköy - Sabiha Gökçen Metrosu", steps: [ { type: "marmaray", dest: "Ayrýlýk Çeþmesi", text: "Marmaray ile Ayrýlýk Çeþmesi istasyonuna gidin." }, { type: "aktarim", dest: "M4 Metro", text: "M4 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Pendik / Tavþantepe / Sabiha Gökçen", text: "M4 ile Pendik, Tavþantepe, Kurtköy veya Sabiha Gökçen duraðýnda inin." } ] },
        { name: "M10 Pendik - Sabiha Gökçen Metrosu (Yapým Aþamasýnda)", steps: [ { type: "marmaray", dest: "Pendik", text: "Marmaray ile Pendik istasyonunda inin." }, { type: "aktarim", dest: "M10 Metro", text: "Gelecekte M10 Metrosuna aktarma yapabilirsiniz." }, { type: "metro", dest: "Kaynarca Merkez", text: "M10 ile Pendik içlerine seyahat edin." } ] }
    ],
    "Sancaktepe": [
        { name: "M5 Üsküdar - Samandýra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Sarýgazi / Samandýra Merkez", text: "M5 ile Sarýgazi, Sancaktepe veya Samandýra Merkez duraðýnda inin." } ] }
    ],
    "Sarýyer": [
        { name: "M2 Yenikapý - Hacýosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapý'da M2 Metrosuna aktarma yapýn." }, { type: "metro", dest: "ÝTÜ Ayazaða / Hacýosman", text: "M2 ile ÝTÜ Ayazaða, Darüþþafaka veya Hacýosman duraðýnda inin." } ] },
        { name: "F3 Seyrantepe - Vadi Ýstanbul Füniküleri", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidip M2 ile Seyrantepe'ye geçin." }, { type: "aktarim", dest: "F3 Füniküler", text: "Seyrantepe'de F3 Fünikülerine aktarma yapýn." }, { type: "metro", dest: "Vadi Ýstanbul", text: "F3 ile Vadi Ýstanbul'da inin." } ] }
    ],
    "Silivri": [
        { name: "Metrobüs + Otobüs (TÜYAP'tan)", steps: [ { type: "marmaray", dest: "Küçükçekmece", text: "Marmaray ile Küçükçekmece istasyonunda inin." }, { type: "aktarim", dest: "Metrobüs", text: "Küçükçekmece'den Metrobüs'e aktarma yapýn." }, { type: "metrobus", dest: "Beylikdüzü Son Durak", text: "Metrobüs ile TÜYAP'ta inip Silivri yönüne giden otobüslere (300G vb.) binin." } ] }
    ],
    "Sultanbeyli": [
        { name: "M5 Üsküdar - Sultanbeyli Metrosu (Yapým Aþamasýnda)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Sultanbeyli", text: "M5 ile gelecekte Sultanbeyli Merkez duraðýnda inebilirsiniz." } ] }
    ],
    "Sultangazi": [
        { name: "T4 Topkapý - Mescid-i Selam Tramvayý", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidin, M1 ile Topkapý'ya geçin." }, { type: "aktarim", dest: "T4 Tramvay", text: "Topkapý'da T4 Tramvayýna aktarma yapýn." }, { type: "tramvay", dest: "Mescid-i Selam", text: "T4 ile Cumhuriyet, 50. Yýl veya Mescid-i Selam duraðýnda inin." } ] }
    ],
    "Þile": [
        { name: "Otobüs (Üsküdar'dan)", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "walk", dest: "Üsküdar Peronlar", text: "Marmaray çýkýþýndaki ÝETT peronlarýna yürüyün." }, { type: "vapur", dest: "Þile", text: "139 veya 139A (Þile/Aðva) numaralý otobüslere binin." } ] }
    ],
    "Þiþli": [
        { name: "M2 Yenikapý - Hacýosman Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M2 Metro", text: "Yenikapý'da M2 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Þiþli-Mecidiyeköy / Osmanbey", text: "M2 ile Þiþli-Mecidiyeköy veya Osmanbey duraðýnda inin." } ] },
        { name: "M7 Yýldýz - Mahmutbey Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý'ya gidip M2 ile Mecidiyeköy'e geçin." }, { type: "aktarim", dest: "M7 Metro", text: "Mecidiyeköy'de M7 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Mecidiyeköy / Çaðlayan", text: "M7 ile Mecidiyeköy'de veya Þiþli sýnýrlarýnda inin." } ] }
    ],
    "Tuzla": [
        { name: "Marmaray (Tuzla Sýnýrlarý)", steps: [ { type: "marmaray", dest: "Aydýntepe / Ýçmeler / Tuzla", text: "Marmaray'dan Aydýntepe, Ýçmeler veya Tuzla istasyonlarýndan birinde inerek ilçeye ulaþabilirsiniz." } ] }
    ],
    "Ümraniye": [
        { name: "M5 Üsküdar - Samandýra Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonuna gidin." }, { type: "aktarim", dest: "M5 Metro", text: "Üsküdar'da M5 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Ümraniye / Çarþý / Yamanevler", text: "M5 ile Ümraniye, Çarþý veya Yamanevler duraðýnda inin." } ] },
        { name: "M8 Bostancý - Dudullu Metrosu", steps: [ { type: "marmaray", dest: "Bostancý", text: "Marmaray ile Bostancý istasyonuna gidin." }, { type: "aktarim", dest: "M8 Metro", text: "Bostancý'da M8 Metrosuna aktarma yapýn." }, { type: "metro", dest: "Dudullu / ÝMES", text: "M8 ile Dudullu, ÝMES veya Parseller duraðýnda inin." } ] }
    ],
    "Üsküdar": [
        { name: "M5 Üsküdar - Samandýra Merkez Metrosu", steps: [ { type: "marmaray", dest: "Üsküdar", text: "Marmaray ile Üsküdar istasyonunda inin." }, { type: "aktarim", dest: "M5 Metro", text: "Marmaray'dan çýkýp M5 Metrosuna binin." }, { type: "metro", dest: "Fýstýkaðacý / Baðlarbaþý", text: "M5 ile Fýstýkaðacý, Baðlarbaþý veya Altunizade duraðýnda inin." } ] }
    ],
    "Zeytinburnu": [
        { name: "M1A Yenikapý - Havalimaný Metrosu", steps: [ { type: "marmaray", dest: "Yenikapý", text: "Marmaray ile Yenikapý istasyonuna gidin." }, { type: "aktarim", dest: "M1A Metro", text: "Yenikapý'da M1A Metrosuna aktarma yapýn." }, { type: "metro", dest: "Zeytinburnu / Merter", text: "M1A ile Zeytinburnu veya Merter duraðýnda inin." } ] },
        { name: "T1 Kabataþ - Baðcýlar Tramvayý", steps: [ { type: "marmaray", dest: "Sirkeci", text: "Marmaray ile Sirkeci istasyonunda inin." }, { type: "aktarim", dest: "T1 Tramvay", text: "Sirkeci'den T1 Tramvayýna aktarma yapýn (Baðcýlar yönü)." }, { type: "tramvay", dest: "Zeytinburnu / Akþemsettin", text: "T1 ile Zeytinburnu, Akþemsettin veya Mithatpaþa duraðýnda inin." } ] },
        { name: "Marmaray (Kazlýçeþme / Zeytinburnu)", steps: [ { type: "marmaray", dest: "Kazlýçeþme / Zeytinburnu", text: "Marmaray'dan Kazlýçeþme veya Zeytinburnu istasyonunda inerek direkt ilçeye ulaþabilirsiniz." } ] }
    ]
};

let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

const regex = /const DISTRICT_MAP = \{[\s\S]*?    \};\n/m;
const newStr = 'const DISTRICT_MAP = ' + JSON.stringify(DISTRICT_MAP, null, 4) + ';\n';

content = content.replace(regex, newStr);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
console.log('DISTRICT_MAP replaced successfully');
