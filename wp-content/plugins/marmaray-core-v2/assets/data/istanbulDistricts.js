export const ISTANBUL_DISTRICTS = [
  { 
    id: 'adalar', 
    name: 'Adalar', 
    hasDirectRail: false, 
    nodes: ['Adalar (Vapur İskelesi)'], 
    note: 'Bu ilçeye Şehir Hatları Vapuru ile ulaşım sağlanmaktadır.',
    targetLocations: []
  },
  { 
    id: 'arnavutkoy', 
    name: 'Arnavutköy', 
    hasDirectRail: true, 
    nodes: ['Arnavutköy Metro (M11)'],
    targetLocations: [
      { id: 'arnavutkoy_m11', name: 'Arnavutköy Merkez (M11 Havalimanı Metrosu)', node: 'Arnavutköy Metro (M11)' }
    ]
  },
  { 
    id: 'atasehir', 
    name: 'Ataşehir', 
    hasDirectRail: true, 
    nodes: ['Kozyatağı (M4/M8)', 'Bostancı (M8)'],
    targetLocations: [
      { id: 'kozyatagi', name: 'Kozyatağı / E-5 (M4/M8 Metro)', node: 'Kozyatağı (M4/M8)' },
      { id: 'bostanci_m8', name: 'Bostancı Köprüsü / Ataşehir Girişi (M8 Metro)', node: 'Bostancı (M8)' }
    ]
  },
  { 
    id: 'avcilar', 
    name: 'Avcılar', 
    hasDirectRail: true, 
    nodes: ['Avcılar (Metrobüs)', 'Mustafa Kemal'],
    targetLocations: [
      { id: 'avcilar_metrobus', name: 'Avcılar Merkez / Çarşı (Metrobüs)', node: 'Avcılar (Metrobüs)' },
      { id: 'mustafa_kemal', name: 'Mustafa Kemal Sahil (Marmaray)', node: 'Mustafa Kemal' }
    ]
  },
  { 
    id: 'bagcilar', 
    name: 'Bağcılar', 
    hasDirectRail: true, 
    nodes: ['Kirazlı (M1B/M3)', 'Bağcılar Meydan (M1B)'],
    targetLocations: [
      { id: 'kirazli', name: 'Kirazlı Aktarma Merkezi (M1B / M3 Metro)', node: 'Kirazlı (M1B/M3)' },
      { id: 'bagcilar_meydan', name: 'Bağcılar Meydan (M1B Metro)', node: 'Bağcılar Meydan (M1B)' }
    ]
  },
  { 
    id: 'bahcelievler', 
    name: 'Bahçelievler', 
    hasDirectRail: true, 
    nodes: ['Bahçelievler (M1A/Metrobüs)', 'Yenibosna (M1A/M9/Metrobüs)'],
    targetLocations: [
      { id: 'bahcelievler_m1a', name: 'Bahçelievler Merkez (M1A Metro / Metrobüs)', node: 'Bahçelievler (M1A/Metrobüs)' },
      { id: 'yenibosna', name: 'Yenibosna (M1A / M9 Metro / Metrobüs)', node: 'Yenibosna (M1A/M9/Metrobüs)' }
    ]
  },
  { 
    id: 'bakirkoy', 
    name: 'Bakırköy', 
    hasDirectRail: true, 
    nodes: ['Bakırköy', 'Florya', 'Ataköy'],
    targetLocations: [
      { id: 'bakirkoy_meydan', name: 'Bakırköy Özgürlük Meydanı / Çarşı (Marmaray)', node: 'Bakırköy' },
      { id: 'atakoy_marina', name: 'Ataköy Marina / Sahil (Marmaray)', node: 'Ataköy' },
      { id: 'florya_sahil', name: 'Florya / Sahil & Akvaryum (Marmaray)', node: 'Florya' }
    ]
  },
  { 
    id: 'basaksehir', 
    name: 'Başakşehir', 
    hasDirectRail: true, 
    nodes: ['Başakşehir Metrokent (M3)', 'Kayaşehir (M3)'],
    targetLocations: [
      { id: 'metrokent', name: 'Başakşehir Metrokent (M3 Metro)', node: 'Başakşehir Metrokent (M3)' },
      { id: 'kayasehir', name: 'Kayaşehir / Şehir Hastanesi (M3 Metro)', node: 'Kayaşehir (M3)' }
    ]
  },
  { 
    id: 'bayrampasa', 
    name: 'Bayrampaşa', 
    hasDirectRail: true, 
    nodes: ['Bayrampaşa-Maltepe (M1A)', 'Sağmalcılar (M1A)'],
    targetLocations: [
      { id: 'bayrampasa_m1a', name: 'Bayrampaşa - Maltepe (M1A Metro)', node: 'Bayrampaşa-Maltepe (M1A)' },
      { id: 'sagmalcilar', name: 'Sağmalcılar / Forum İstanbul (M1A Metro)', node: 'Sağmalcılar (M1A)' }
    ]
  },
  { 
    id: 'besiktas', 
    name: 'Beşiktaş', 
    hasDirectRail: true, 
    nodes: ['Beşiktaş Vapur', 'Levent (M2/M6)', 'Yıldız (M7)'],
    targetLocations: [
      { id: 'levent', name: 'Levent / Nisbetiye (M2 / M6 Metro)', node: 'Levent (M2/M6)' },
      { id: 'yildiz', name: 'Yıldız / Ihlamurdere (M7 Metro)', node: 'Yıldız (M7)' }
    ]
  },
  { 
    id: 'beykoz', 
    name: 'Beykoz', 
    hasDirectRail: false, 
    nodes: ['Beykoz (Vapur İskelesi)'], 
    note: 'Bu ilçeye Şehir Hatları Vapuru ve otobüs aktarması ile ulaşım sağlanmaktadır.',
    targetLocations: []
  },
  { 
    id: 'beylikduzu', 
    name: 'Beylikdüzü', 
    hasDirectRail: true, 
    nodes: ['Beylikdüzü Sondurak (Metrobüs)'],
    targetLocations: [
      { id: 'beylikduzu_mb', name: 'Beylikdüzü Sondurak / Meydan (Metrobüs)', node: 'Beylikdüzü Sondurak (Metrobüs)' }
    ]
  },
  { 
    id: 'beyoglu', 
    name: 'Beyoğlu', 
    hasDirectRail: true, 
    nodes: ['Taksim (M2/F1)', 'Şişhane (M2/F2)', 'Karaköy (T1/Vapur)'],
    targetLocations: [
      { id: 'taksim', name: 'Taksim Meydanı / İstiklal (M2 Metro / F1 Füniküler)', node: 'Taksim (M2/F1)' },
      { id: 'sishane', name: 'Şişhane / Galata Kulesi (M2 Metro / F2 Tünel)', node: 'Şişhane (M2/F2)' },
      { id: 'karakoy', name: 'Karaköy / Galataport (T1 Tramvay)', node: 'Karaköy (T1/Vapur)' }
    ]
  },
  { 
    id: 'buyukcekmece', 
    name: 'Büyükçekmece', 
    hasDirectRail: false, 
    nodes: ['Tüyap Beylikdüzü (Metrobüs)'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'tuyap', name: 'Tüyap / Büyükçekmece Girişi (Metrobüs)', node: 'Tüyap Beylikdüzü (Metrobüs)' }
    ]
  },
  { 
    id: 'catalca', 
    name: 'Çatalca', 
    hasDirectRail: false, 
    nodes: ['Halkalı'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'halkali_catalca', name: 'Halkalı Aktarma Noktası (Marmaray)', node: 'Halkalı' }
    ]
  },
  { 
    id: 'cekmekoy', 
    name: 'Çekmeköy', 
    hasDirectRail: true, 
    nodes: ['Çekmeköy (M5)'],
    targetLocations: [
      { id: 'cekmekoy_m5', name: 'Çekmeköy Merkez (M5 Metro)', node: 'Çekmeköy (M5)' }
    ]
  },
  { 
    id: 'esenler', 
    name: 'Esenler', 
    hasDirectRail: true, 
    nodes: ['Esenler Otogar (M1A)', 'Esenler (M1B)'],
    targetLocations: [
      { id: 'otogar', name: 'Büyük İstanbul Otogarı (M1A Metro)', node: 'Esenler Otogar (M1A)' },
      { id: 'esenler_meydan', name: 'Esenler Meydan (M1B Metro)', node: 'Esenler (M1B)' }
    ]
  },
  { 
    id: 'esenyurt', 
    name: 'Esenyurt', 
    hasDirectRail: false, 
    nodes: ['Haramidere (Metrobüs)', 'Saadetdere (Metrobüs)'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'haramidere', name: 'Haramidere / Torium (Metrobüs)', node: 'Haramidere (Metrobüs)' },
      { id: 'saadetdere', name: 'Saadetdere (Metrobüs)', node: 'Saadetdere (Metrobüs)' }
    ]
  },
  { 
    id: 'eyupsultan', 
    name: 'Eyüpsultan', 
    hasDirectRail: true, 
    nodes: ['Eyüpsultan (T5)', 'Alibeyköy (M7/T5)'],
    targetLocations: [
      { id: 'eyup_camii', name: 'Eyüpsultan Camii & İskele (T5 Tramvay)', node: 'Eyüpsultan (T5)' },
      { id: 'alibeykoy', name: 'Alibeyköy (M7 Metro / T5 Tramvay)', node: 'Alibeyköy (M7/T5)' }
    ]
  },
  { 
    id: 'fatih', 
    name: 'Fatih', 
    hasDirectRail: true, 
    nodes: ['Sirkeci', 'Eminönü (T1/Vapur)', 'Yenikapı', 'Aksaray (M1)', 'Vezneciler'],
    targetLocations: [
      { id: 'sirkeci', name: 'Sirkeci (Marmaray / T1 Tramvay)', node: 'Sirkeci' },
      { id: 'sultanahmet_eminonu', name: 'Sultanahmet & Eminönü (T1 Tramvay)', node: 'Eminönü (T1/Vapur)' },
      { id: 'yenikapi', name: 'Yenikapı (Marmaray / M1 / M2 Hub)', node: 'Yenikapı' },
      { id: 'aksaray', name: 'Aksaray & Ulubatlı (M1A / M1B Metro)', node: 'Aksaray (M1)' },
      { id: 'vezneciler', name: 'Vezneciler & Beyazıt (M2 Metro)', node: 'Vezneciler' }
    ]
  },
  { 
    id: 'gaziosmanpasa', 
    name: 'Gaziosmanpaşa', 
    hasDirectRail: true, 
    nodes: ['Karadeniz Mahallesi (M7/T4)', 'Taşköprü (T4)'],
    targetLocations: [
      { id: 'karadeniz_mah', name: 'Karadeniz Mahallesi (M7 Metro / T4 Tramvay)', node: 'Karadeniz Mahallesi (M7/T4)' },
      { id: 'taskopru', name: 'Taşköprü / GOP Merkez (T4 Tramvay)', node: 'Taşköprü (T4)' }
    ]
  },
  { 
    id: 'gungoren', 
    name: 'Güngören', 
    hasDirectRail: true, 
    nodes: ['Zeytinburnu', 'Merter (M1A/Metrobüs)'],
    targetLocations: [
      { id: 'gungoren_zeytinburnu', name: 'Zeytinburnu Aktarma (Marmaray / T1 Tramvay)', node: 'Zeytinburnu' },
      { id: 'merter', name: 'Merter Tekstil Merkezi (M1A Metro / Metrobüs)', node: 'Merter (M1A/Metrobüs)' }
    ]
  },
  { 
    id: 'kadikoy', 
    name: 'Kadıköy', 
    hasDirectRail: true, 
    nodes: ['Söğütlüçeşme', 'Kadıköy (M4)', 'Ayrılık Çeşmesi', 'Bostancı'],
    targetLocations: [
      { id: 'sogutlucesme', name: 'Söğütlüçeşme & Kadıköy Stadı (Marmaray / Metrobüs)', node: 'Söğütlüçeşme' },
      { id: 'kadikoy_rihtim', name: 'Kadıköy Rıhtım / Çarşı (M4 Metro)', node: 'Kadıköy (M4)' },
      { id: 'ayrilik_cesmesi', name: 'Ayrılık Çeşmesi / Tepe Nautilus (Marmaray / M4)', node: 'Ayrılık Çeşmesi' },
      { id: 'bostanci_sahil', name: 'Bostancı Sahil & İskele (Marmaray / M8)', node: 'Bostancı' }
    ]
  },
  { 
    id: 'kagithane', 
    name: 'Kağıthane', 
    hasDirectRail: true, 
    nodes: ['Kağıthane (M7/M11)'],
    targetLocations: [
      { id: 'kagithane_m7', name: 'Kağıthane Merkez (M7 Metro / M11 Havalimanı)', node: 'Kağıthane (M7/M11)' }
    ]
  },
  { 
    id: 'kartal', 
    name: 'Kartal', 
    hasDirectRail: true, 
    nodes: ['Kartal', 'Kartal Metro (M4)'],
    targetLocations: [
      { id: 'kartal_sahil', name: 'Kartal Sahil & Çarşı (Marmaray)', node: 'Kartal' },
      { id: 'kartal_e5', name: 'Kartal E-5 / Köprü (M4 Metro)', node: 'Kartal Metro (M4)' }
    ]
  },
  { 
    id: 'kucukcekmece', 
    name: 'Küçükçekmece', 
    hasDirectRail: true, 
    nodes: ['Halkalı', 'Küçükçekmece', 'Sefaköy (Metrobüs)'],
    targetLocations: [
      { id: 'halkali_marmaray', name: 'Halkalı Marmaray Garı', node: 'Halkalı' },
      { id: 'kucukcekmece_marmaray', name: 'Küçükçekmece Göl & Sahil (Marmaray)', node: 'Küçükçekmece' },
      { id: 'sefakoy', name: 'Sefaköy (Metrobüs)', node: 'Sefaköy (Metrobüs)' }
    ]
  },
  { 
    id: 'maltepe', 
    name: 'Maltepe', 
    hasDirectRail: true, 
    nodes: ['Maltepe', 'Maltepe Metro (M4)', 'Küçükyalı'],
    targetLocations: [
      { id: 'maltepe_sahil', name: 'Maltepe Sahil & Çarşı (Marmaray)', node: 'Maltepe' },
      { id: 'maltepe_e5', name: 'Maltepe E-5 / Piazza (M4 Metro)', node: 'Maltepe Metro (M4)' },
      { id: 'kucukyali', name: 'Küçükyalı Sahil (Marmaray)', node: 'Küçükyalı' }
    ]
  },
  { 
    id: 'pendik', 
    name: 'Pendik', 
    hasDirectRail: true, 
    nodes: ['Pendik', 'Pendik Metro (M4)', 'Sabiha Gökçen Havalimanı (M4)'],
    targetLocations: [
      { id: 'pendik_sahil', name: 'Pendik Sahil / YHT Garı (Marmaray)', node: 'Pendik' },
      { id: 'pendik_e5', name: 'Pendik E-5 Köprüsü (M4 Metro)', node: 'Pendik Metro (M4)' },
      { id: 'sabiha_gokcen', name: 'Sabiha Gökçen Havalimanı (M4 Metro)', node: 'Sabiha Gökçen Havalimanı (M4)' }
    ]
  },
  { 
    id: 'sancaktepe', 
    name: 'Sancaktepe', 
    hasDirectRail: true, 
    nodes: ['Samandıra Merkez (M5)', 'Sancaktepe (M5)'],
    targetLocations: [
      { id: 'samandira', name: 'Samandıra Merkez (M5 Metro)', node: 'Samandıra Merkez (M5)' },
      { id: 'sancaktepe_m5', name: 'Sancaktepe Şehir Hastanesi (M5 Metro)', node: 'Sancaktepe (M5)' }
    ]
  },
  { 
    id: 'sariyer', 
    name: 'Sarıyer', 
    hasDirectRail: true, 
    nodes: ['Hacıosman (M2)', 'İTÜ-Ayazağa (M2)', 'Seyrantepe (M2)'],
    targetLocations: [
      { id: 'haciosman', name: 'Hacıosman Otobüs Aktarma (M2 Metro)', node: 'Hacıosman (M2)' },
      { id: 'itu_maslak', name: 'İTÜ Maslak / İstinyePark (M2 Metro)', node: 'İTÜ-Ayazağa (M2)' },
      { id: 'seyrantepe', name: 'Seyrantepe / Rams Park Stadı (M2 Metro)', node: 'Seyrantepe (M2)' }
    ]
  },
  { 
    id: 'sile', 
    name: 'Şile', 
    hasDirectRail: false, 
    nodes: ['Çekmeköy (M5)'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'sile_cekmekoy', name: 'Çekmeköy Otobüs Aktarması (M5 Metro)', node: 'Çekmeköy (M5)' }
    ]
  },
  { 
    id: 'silivri', 
    name: 'Silivri', 
    hasDirectRail: false, 
    nodes: ['Beylikdüzü Sondurak (Metrobüs)'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'silivri_mb', name: 'Beylikdüzü Metrobüs Aktarması', node: 'Beylikdüzü Sondurak (Metrobüs)' }
    ]
  },
  { 
    id: 'sisli', 
    name: 'Şişli', 
    hasDirectRail: true, 
    nodes: ['Şişli-Mecidiyeköy (M2/M7/Metrobüs)', 'Gayrettepe (M2/M11)', 'Osmanbey (M2)'],
    targetLocations: [
      { id: 'mecidiyekoy', name: 'Mecidiyeköy / Cevahir (M2 / M7 Metro / Metrobüs)', node: 'Şişli-Mecidiyeköy (M2/M7/Metrobüs)' },
      { id: 'gayrettepe', name: 'Gayrettepe / Zincirlikuyu (M2 / M11 Metro / Metrobüs)', node: 'Gayrettepe (M2/M11)' },
      { id: 'osmanbey', name: 'Osmanbey / Nişantaşı (M2 Metro)', node: 'Osmanbey (M2)' }
    ]
  },
  { 
    id: 'sultanbeyli', 
    name: 'Sultanbeyli', 
    hasDirectRail: false, 
    nodes: ['Samandıra Merkez (M5)', 'Pendik'], 
    note: 'Bu ilçeye doğrudan raylı sistem bulunmamaktadır, size en yakın istasyon rotası çizilmiştir.',
    targetLocations: [
      { id: 'sultanbeyli_m5', name: 'Samandıra M5 Metro Aktarması', node: 'Samandıra Merkez (M5)' },
      { id: 'sultanbeyli_pendik', name: 'Pendik Marmaray Aktarması', node: 'Pendik' }
    ]
  },
  { 
    id: 'sultangazi', 
    name: 'Sultangazi', 
    hasDirectRail: true, 
    nodes: ['Mescid-i Selam (T4)', 'Sultançiftliği (T4)'],
    targetLocations: [
      { id: 'mescid_selam', name: 'Mescid-i Selam (T4 Tramvay)', node: 'Mescid-i Selam (T4)' },
      { id: 'sultanciftligi', name: 'Sultançiftliği / Sultangazi (T4 Tramvay)', node: 'Sultançiftliği (T4)' }
    ]
  },
  { 
    id: 'tuzla', 
    name: 'Tuzla', 
    hasDirectRail: true, 
    nodes: ['Tuzla', 'İçmeler'],
    targetLocations: [
      { id: 'tuzla_sahil', name: 'Tuzla Sahil / Marina (Marmaray)', node: 'Tuzla' },
      { id: 'icmeler', name: 'İçmeler / Aydınlı (Marmaray)', node: 'İçmeler' }
    ]
  },
  { 
    id: 'umraniye', 
    name: 'Ümraniye', 
    hasDirectRail: true, 
    nodes: ['Ümraniye (M5)', 'Yamanevler (M5)', 'Dudullu (M5/M8)'],
    targetLocations: [
      { id: 'umraniye_carsii', name: 'Ümraniye Çarşı / Santral (M5 Metro)', node: 'Ümraniye (M5)' },
      { id: 'yamanevler', name: 'Yamanevler / Canpark AVM (M5 Metro)', node: 'Yamanevler (M5)' },
      { id: 'dudullu', name: 'Dudullu Aktarma (M5 / M8 Metro)', node: 'Dudullu (M5/M8)' }
    ]
  },
  { 
    id: 'uskudar', 
    name: 'Üsküdar', 
    hasDirectRail: true, 
    nodes: ['Üsküdar', 'Altunizade (M5/Metrobüs)'],
    targetLocations: [
      { id: 'uskudar_sahil', name: 'Üsküdar Sahil / Kız Kulesi (Marmaray / M5)', node: 'Üsküdar' },
      { id: 'altunizade', name: 'Altunizade / Çamlıca (M5 Metro / Metrobüs)', node: 'Altunizade (M5/Metrobüs)' }
    ]
  },
  { 
    id: 'zeytinburnu', 
    name: 'Zeytinburnu', 
    hasDirectRail: true, 
    nodes: ['Zeytinburnu', 'Kazlıçeşme'],
    targetLocations: [
      { id: 'zeytinburnu_marmaray', name: 'Zeytinburnu Marmaray / T1 Tramvay Aktarması', node: 'Zeytinburnu' },
      { id: 'kazlicesme', name: 'Kazlıçeşme Marmaray / Olivium', node: 'Kazlıçeşme' }
    ]
  }
];
