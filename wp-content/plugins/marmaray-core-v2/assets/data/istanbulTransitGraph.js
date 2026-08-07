// Graph Representation of Istanbul's Primary Transit Lines
// Vehicles: 'marmaray', 'metro', 'metrobus', 'tram', 'ferry', 'walk'

export const TRANSIT_GRAPH = {
  // MARMARAY CORE STATIONS
  'Halkalı': [
    { target: 'Mustafa Kemal', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Mustafa Kemal': [
    { target: 'Halkalı', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Küçükçekmece', distanceKm: 2.4, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Küçükçekmece': [
    { target: 'Mustafa Kemal', distanceKm: 2.4, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Florya', distanceKm: 2.8, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Florya': [
    { target: 'Küçükçekmece', distanceKm: 2.8, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Florya Akvaryum', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Florya Akvaryum': [
    { target: 'Florya', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yeşilköy', distanceKm: 2.0, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Yeşilköy': [
    { target: 'Florya Akvaryum', distanceKm: 2.0, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yeşilyurt', distanceKm: 1.8, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Yeşilyurt': [
    { target: 'Yeşilköy', distanceKm: 1.8, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Ataköy', distanceKm: 2.3, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Ataköy': [
    { target: 'Yeşilyurt', distanceKm: 2.3, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Bakırköy', distanceKm: 2.5, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Bakırköy': [
    { target: 'Ataköy', distanceKm: 2.5, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yenimahalle', distanceKm: 1.9, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Yenimahalle': [
    { target: 'Bakırköy', distanceKm: 1.9, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Zeytinburnu', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Zeytinburnu': [
    { target: 'Yenimahalle', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Kazlıçeşme', distanceKm: 2.0, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Merter (M1A/Metrobüs)', distanceKm: 1.8, durationMin: 3, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' }
  ],
  'Kazlıçeşme': [
    { target: 'Zeytinburnu', distanceKm: 2.0, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yenikapı', distanceKm: 4.5, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Yenikapı': [
    { target: 'Kazlıçeşme', distanceKm: 4.5, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Sirkeci', distanceKm: 3.2, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yenikapı (M2)', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Yenikapı (M1A/M1B)', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' }
  ],
  'Sirkeci': [
    { target: 'Yenikapı', distanceKm: 3.2, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Üsküdar', distanceKm: 3.8, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Eminönü (T1/Vapur)', distanceKm: 0.5, durationMin: 5, line: 'Aktarma Yürüme', vehicleType: 'walk' }
  ],
  'Üsküdar': [
    { target: 'Sirkeci', distanceKm: 3.8, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Ayrılık Çeşmesi', distanceKm: 4.1, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Üsküdar (M5)', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Üsküdar Vapur İskelesi', distanceKm: 0.2, durationMin: 3, line: 'Aktarma Yürüme', vehicleType: 'walk' }
  ],
  'Ayrılık Çeşmesi': [
    { target: 'Üsküdar', distanceKm: 4.1, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Söğütlüçeşme', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Kadıköy (M4)', distanceKm: 1.8, durationMin: 3, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],
  'Söğütlüçeşme': [
    { target: 'Ayrılık Çeşmesi', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Feneryolu', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Söğütlüçeşme (Metrobüs)', distanceKm: 0.2, durationMin: 4, line: 'Aktarma', vehicleType: 'walk' }
  ],
  'Feneryolu': [
    { target: 'Söğütlüçeşme', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Göztepe', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Göztepe': [
    { target: 'Feneryolu', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Erenköy', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Erenköy': [
    { target: 'Göztepe', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Suadiye', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Suadiye': [
    { target: 'Erenköy', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Bostancı', distanceKm: 1.7, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Bostancı': [
    { target: 'Suadiye', distanceKm: 1.7, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Küçükyalı', distanceKm: 2.4, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Bostancı (M8)', distanceKm: 0.2, durationMin: 4, line: 'M8 Bostancı-Parseller', vehicleType: 'metro' },
    { target: 'Bostancı Vapur İskelesi', distanceKm: 0.3, durationMin: 5, line: 'Aktarma Yürüme', vehicleType: 'walk' }
  ],
  'Küçükyalı': [
    { target: 'Bostancı', distanceKm: 2.4, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'İdealtepe', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'İdealtepe': [
    { target: 'Küçükyalı', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Süreyya Plajı', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Süreyya Plajı': [
    { target: 'İdealtepe', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Maltepe', distanceKm: 1.3, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Maltepe': [
    { target: 'Süreyya Plajı', distanceKm: 1.3, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Cevizli', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Cevizli': [
    { target: 'Maltepe', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Atalar', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Atalar': [
    { target: 'Cevizli', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Başak', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Başak': [
    { target: 'Atalar', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Kartal', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Kartal': [
    { target: 'Başak', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Yunus', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Yunus': [
    { target: 'Kartal', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Pendik', distanceKm: 2.5, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Pendik': [
    { target: 'Yunus', distanceKm: 2.5, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Kaynarca', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Kaynarca': [
    { target: 'Pendik', distanceKm: 2.2, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Tersane', distanceKm: 1.9, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Tersane': [
    { target: 'Kaynarca', distanceKm: 1.9, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Güzelyalı', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Güzelyalı': [
    { target: 'Tersane', distanceKm: 1.6, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Aydıntepe', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Aydıntepe': [
    { target: 'Güzelyalı', distanceKm: 1.4, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'İçmeler', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'İçmeler': [
    { target: 'Aydıntepe', distanceKm: 1.5, durationMin: 2, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Tuzla', distanceKm: 3.5, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Tuzla': [
    { target: 'İçmeler', distanceKm: 3.5, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Çayırova', distanceKm: 4.2, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Çayırova': [
    { target: 'Tuzla', distanceKm: 4.2, durationMin: 5, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Fatih-GTÜ', distanceKm: 2.8, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Fatih-GTÜ': [
    { target: 'Çayırova', distanceKm: 2.8, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Osmangazi', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Osmangazi': [
    { target: 'Fatih-GTÜ', distanceKm: 2.1, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Darıca', distanceKm: 2.6, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Darıca': [
    { target: 'Osmangazi', distanceKm: 2.6, durationMin: 3, line: 'Marmaray', vehicleType: 'marmaray' },
    { target: 'Gebze', distanceKm: 3.1, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' }
  ],
  'Gebze': [
    { target: 'Darıca', distanceKm: 3.1, durationMin: 4, line: 'Marmaray', vehicleType: 'marmaray' }
  ],

  // M2 METRO (Yenikapı - Hacıosman)
  'Yenikapı (M2)': [
    { target: 'Yenikapı', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Vezneciler', distanceKm: 1.7, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Vezneciler': [
    { target: 'Yenikapı (M2)', distanceKm: 1.7, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Şişhane (M2/F2)', distanceKm: 2.1, durationMin: 4, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Şişhane (M2/F2)': [
    { target: 'Vezneciler', distanceKm: 2.1, durationMin: 4, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Taksim (M2/F1)', distanceKm: 1.8, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Taksim (M2/F1)': [
    { target: 'Şişhane (M2/F2)', distanceKm: 1.8, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Osmanbey (M2)', distanceKm: 1.9, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Osmanbey (M2)': [
    { target: 'Taksim (M2/F1)', distanceKm: 1.9, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Şişli-Mecidiyeköy (M2/M7/Metrobüs)', distanceKm: 1.6, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Şişli-Mecidiyeköy (M2/M7/Metrobüs)': [
    { target: 'Osmanbey (M2)', distanceKm: 1.6, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Gayrettepe (M2/M11)', distanceKm: 2.0, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Mecidiyeköy (M7)', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' }
  ],
  'Gayrettepe (M2/M11)': [
    { target: 'Şişli-Mecidiyeköy (M2/M7/Metrobüs)', distanceKm: 2.0, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Levent (M2/M6)', distanceKm: 1.8, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Levent (M2/M6)': [
    { target: 'Gayrettepe (M2/M11)', distanceKm: 1.8, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: '4. Levent', distanceKm: 1.5, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  '4. Levent': [
    { target: 'Levent (M2/M6)', distanceKm: 1.5, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'İTÜ-Ayazağa (M2)', distanceKm: 3.2, durationMin: 4, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Seyrantepe (M2)', distanceKm: 2.0, durationMin: 4, line: 'M2 Seyrantepe Şube', vehicleType: 'metro' }
  ],
  'İTÜ-Ayazağa (M2)': [
    { target: '4. Levent', distanceKm: 3.2, durationMin: 4, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Atatürk Oto Sanayi', distanceKm: 1.5, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Atatürk Oto Sanayi': [
    { target: 'İTÜ-Ayazağa (M2)', distanceKm: 1.5, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Darüşşafaka', distanceKm: 1.4, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Darüşşafaka': [
    { target: 'Atatürk Oto Sanayi', distanceKm: 1.4, durationMin: 2, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' },
    { target: 'Hacıosman (M2)', distanceKm: 1.6, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Hacıosman (M2)': [
    { target: 'Darüşşafaka', distanceKm: 1.6, durationMin: 3, line: 'M2 Yenikapı-Hacıosman', vehicleType: 'metro' }
  ],
  'Seyrantepe (M2)': [
    { target: '4. Levent', distanceKm: 2.0, durationMin: 4, line: 'M2 Seyrantepe Şube', vehicleType: 'metro' }
  ],

  // M4 METRO (Kadıköy - Sabiha Gökçen)
  'Kadıköy (M4)': [
    { target: 'Ayrılık Çeşmesi', distanceKm: 1.8, durationMin: 3, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' },
    { target: 'Kadıköy (M4/Vapur)', distanceKm: 0.1, durationMin: 2, line: 'Aktarma', vehicleType: 'walk' }
  ],
  'Bostancı (M8)': [
    { target: 'Bostancı', distanceKm: 0.2, durationMin: 4, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Kozyatağı (M4/M8)', distanceKm: 4.5, durationMin: 7, line: 'M8 Bostancı-Parseller', vehicleType: 'metro' }
  ],
  'Kozyatağı (M4/M8)': [
    { target: 'Bostancı (M8)', distanceKm: 4.5, durationMin: 7, line: 'M8 Bostancı-Parseller', vehicleType: 'metro' },
    { target: 'Dudullu (M5/M8)', distanceKm: 6.2, durationMin: 10, line: 'M8 Bostancı-Parseller', vehicleType: 'metro' },
    { target: 'Kadıköy (M4)', distanceKm: 7.2, durationMin: 11, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' },
    { target: 'Maltepe Metro (M4)', distanceKm: 6.0, durationMin: 9, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],
  'Maltepe Metro (M4)': [
    { target: 'Kozyatağı (M4/M8)', distanceKm: 6.0, durationMin: 9, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' },
    { target: 'Kartal Metro (M4)', distanceKm: 5.2, durationMin: 8, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],
  'Kartal Metro (M4)': [
    { target: 'Maltepe Metro (M4)', distanceKm: 5.2, durationMin: 8, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' },
    { target: 'Pendik Metro (M4)', distanceKm: 4.5, durationMin: 7, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],
  'Pendik Metro (M4)': [
    { target: 'Kartal Metro (M4)', distanceKm: 4.5, durationMin: 7, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' },
    { target: 'Sabiha Gökçen Havalimanı (M4)', distanceKm: 8.5, durationMin: 12, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],
  'Sabiha Gökçen Havalimanı (M4)': [
    { target: 'Pendik Metro (M4)', distanceKm: 8.5, durationMin: 12, line: 'M4 Kadıköy-Sabiha Gökçen', vehicleType: 'metro' }
  ],

  // M5 METRO (Üsküdar - Samandıra)
  'Üsküdar (M5)': [
    { target: 'Üsküdar', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Altunizade (M5/Metrobüs)', distanceKm: 3.5, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],
  'Altunizade (M5/Metrobüs)': [
    { target: 'Üsküdar (M5)', distanceKm: 3.5, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Ümraniye (M5)', distanceKm: 3.2, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Söğütlüçeşme (Metrobüs)', distanceKm: 4.2, durationMin: 6, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Ümraniye (M5)': [
    { target: 'Altunizade (M5/Metrobüs)', distanceKm: 3.2, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Yamanevler (M5)', distanceKm: 2.1, durationMin: 3, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],
  'Yamanevler (M5)': [
    { target: 'Ümraniye (M5)', distanceKm: 2.1, durationMin: 3, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Dudullu (M5/M8)', distanceKm: 4.8, durationMin: 7, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],
  'Dudullu (M5/M8)': [
    { target: 'Yamanevler (M5)', distanceKm: 4.8, durationMin: 7, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Çekmeköy (M5)', distanceKm: 3.4, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Kozyatağı (M4/M8)', distanceKm: 6.2, durationMin: 10, line: 'M8 Bostancı-Parseller', vehicleType: 'metro' }
  ],
  'Çekmeköy (M5)': [
    { target: 'Dudullu (M5/M8)', distanceKm: 3.4, durationMin: 5, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Samandıra Merkez (M5)', distanceKm: 4.0, durationMin: 6, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' },
    { target: 'Sancaktepe (M5)', distanceKm: 2.5, durationMin: 4, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],
  'Samandıra Merkez (M5)': [
    { target: 'Çekmeköy (M5)', distanceKm: 4.0, durationMin: 6, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],
  'Sancaktepe (M5)': [
    { target: 'Çekmeköy (M5)', distanceKm: 2.5, durationMin: 4, line: 'M5 Üsküdar-Samandıra', vehicleType: 'metro' }
  ],

  // M7 METRO (Yıldız - Mahmutbey)
  'Yıldız (M7)': [
    { target: 'Beşiktaş Vapur', distanceKm: 1.2, durationMin: 4, line: 'Aktarma Yürüme', vehicleType: 'walk' },
    { target: 'Mecidiyeköy (M7)', distanceKm: 2.8, durationMin: 4, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' }
  ],
  'Mecidiyeköy (M7)': [
    { target: 'Yıldız (M7)', distanceKm: 2.8, durationMin: 4, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Kağıthane (M7/M11)', distanceKm: 3.5, durationMin: 5, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Şişli-Mecidiyeköy (M2/M7/Metrobüs)', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' }
  ],
  'Kağıthane (M7/M11)': [
    { target: 'Mecidiyeköy (M7)', distanceKm: 3.5, durationMin: 5, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Alibeyköy (M7/T5)', distanceKm: 4.2, durationMin: 6, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Arnavutköy Metro (M11)', distanceKm: 22.0, durationMin: 25, line: 'M11 Havalimanı Metrosu', vehicleType: 'metro' }
  ],
  'Alibeyköy (M7/T5)': [
    { target: 'Kağıthane (M7/M11)', distanceKm: 4.2, durationMin: 6, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Karadeniz Mahallesi (M7/T4)', distanceKm: 5.1, durationMin: 7, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Eyüpsultan (T5)', distanceKm: 3.0, durationMin: 6, line: 'T5 Eminönü-Alibeyköy', vehicleType: 'tram' }
  ],
  'Karadeniz Mahallesi (M7/T4)': [
    { target: 'Alibeyköy (M7/T5)', distanceKm: 5.1, durationMin: 7, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' },
    { target: 'Kirazlı (M1B/M3)', distanceKm: 6.5, durationMin: 9, line: 'M7 Yıldız-Mahmutbey', vehicleType: 'metro' }
  ],

  // M1A / M1B METROS
  'Yenikapı (M1A/M1B)': [
    { target: 'Yenikapı', distanceKm: 0.1, durationMin: 3, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Aksaray (M1)', distanceKm: 1.2, durationMin: 2, line: 'M1A/M1B Yenikapı', vehicleType: 'metro' }
  ],
  'Aksaray (M1)': [
    { target: 'Yenikapı (M1A/M1B)', distanceKm: 1.2, durationMin: 2, line: 'M1A/M1B Yenikapı', vehicleType: 'metro' },
    { target: 'Bayrampaşa-Maltepe (M1A)', distanceKm: 2.1, durationMin: 3, line: 'M1A/M1B Yenikapı', vehicleType: 'metro' }
  ],
  'Bayrampaşa-Maltepe (M1A)': [
    { target: 'Aksaray (M1)', distanceKm: 2.1, durationMin: 3, line: 'M1A/M1B Yenikapı', vehicleType: 'metro' },
    { target: 'Sağmalcılar (M1A)', distanceKm: 1.5, durationMin: 2, line: 'M1A/M1B', vehicleType: 'metro' }
  ],
  'Sağmalcılar (M1A)': [
    { target: 'Bayrampaşa-Maltepe (M1A)', distanceKm: 1.5, durationMin: 2, line: 'M1A/M1B', vehicleType: 'metro' },
    { target: 'Esenler Otogar (M1A)', distanceKm: 1.8, durationMin: 3, line: 'M1A/M1B', vehicleType: 'metro' }
  ],
  'Esenler Otogar (M1A)': [
    { target: 'Sağmalcılar (M1A)', distanceKm: 1.8, durationMin: 3, line: 'M1A/M1B', vehicleType: 'metro' },
    { target: 'Merter (M1A/Metrobüs)', distanceKm: 3.5, durationMin: 5, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' },
    { target: 'Esenler (M1B)', distanceKm: 2.0, durationMin: 3, line: 'M1B Kirazlı', vehicleType: 'metro' }
  ],
  'Esenler (M1B)': [
    { target: 'Esenler Otogar (M1A)', distanceKm: 2.0, durationMin: 3, line: 'M1B Kirazlı', vehicleType: 'metro' },
    { target: 'Bağcılar Meydan (M1B)', distanceKm: 3.1, durationMin: 4, line: 'M1B Kirazlı', vehicleType: 'metro' }
  ],
  'Bağcılar Meydan (M1B)': [
    { target: 'Esenler (M1B)', distanceKm: 3.1, durationMin: 4, line: 'M1B Kirazlı', vehicleType: 'metro' },
    { target: 'Kirazlı (M1B/M3)', distanceKm: 1.5, durationMin: 2, line: 'M1B Kirazlı', vehicleType: 'metro' }
  ],
  'Kirazlı (M1B/M3)': [
    { target: 'Bağcılar Meydan (M1B)', distanceKm: 1.5, durationMin: 2, line: 'M1B Kirazlı', vehicleType: 'metro' },
    { target: 'Başakşehir Metrokent (M3)', distanceKm: 12.0, durationMin: 18, line: 'M3 Kirazlı-Metrokent', vehicleType: 'metro' },
    { target: 'Kayaşehir (M3)', distanceKm: 15.0, durationMin: 22, line: 'M3 Kirazlı-Kayaşehir', vehicleType: 'metro' }
  ],
  'Merter (M1A/Metrobüs)': [
    { target: 'Esenler Otogar (M1A)', distanceKm: 3.5, durationMin: 5, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' },
    { target: 'Zeytinburnu', distanceKm: 1.8, durationMin: 3, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' },
    { target: 'Bahçelievler (M1A/Metrobüs)', distanceKm: 2.2, durationMin: 3, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' }
  ],
  'Bahçelievler (M1A/Metrobüs)': [
    { target: 'Merter (M1A/Metrobüs)', distanceKm: 2.2, durationMin: 3, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' },
    { target: 'Yenibosna (M1A/M9/Metrobüs)', distanceKm: 3.0, durationMin: 4, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' }
  ],
  'Yenibosna (M1A/M9/Metrobüs)': [
    { target: 'Bahçelievler (M1A/Metrobüs)', distanceKm: 3.0, durationMin: 4, line: 'M1A Atatürk Havalimanı', vehicleType: 'metro' },
    { target: 'Sefaköy (Metrobüs)', distanceKm: 3.5, durationMin: 5, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],

  // METROBÜS & WESTERN EXTENSIONS
  'Söğütlüçeşme (Metrobüs)': [
    { target: 'Söğütlüçeşme', distanceKm: 0.2, durationMin: 4, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Altunizade (M5/Metrobüs)', distanceKm: 4.2, durationMin: 6, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Şişli-Mecidiyeköy (M2/M7/Metrobüs)', distanceKm: 8.5, durationMin: 12, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Sefaköy (Metrobüs)': [
    { target: 'Yenibosna (M1A/M9/Metrobüs)', distanceKm: 3.5, durationMin: 5, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Avcılar (Metrobüs)', distanceKm: 7.5, durationMin: 10, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Avcılar (Metrobüs)': [
    { target: 'Sefaköy (Metrobüs)', distanceKm: 7.5, durationMin: 10, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Haramidere (Metrobüs)', distanceKm: 5.2, durationMin: 7, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Haramidere (Metrobüs)': [
    { target: 'Avcılar (Metrobüs)', distanceKm: 5.2, durationMin: 7, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Saadetdere (Metrobüs)', distanceKm: 2.0, durationMin: 3, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Saadetdere (Metrobüs)': [
    { target: 'Haramidere (Metrobüs)', distanceKm: 2.0, durationMin: 3, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Beylikdüzü Sondurak (Metrobüs)', distanceKm: 4.5, durationMin: 6, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Beylikdüzü Sondurak (Metrobüs)': [
    { target: 'Saadetdere (Metrobüs)', distanceKm: 4.5, durationMin: 6, line: 'Metrobüs', vehicleType: 'metrobus' },
    { target: 'Tüyap Beylikdüzü (Metrobüs)', distanceKm: 1.5, durationMin: 2, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],
  'Tüyap Beylikdüzü (Metrobüs)': [
    { target: 'Beylikdüzü Sondurak (Metrobüs)', distanceKm: 1.5, durationMin: 2, line: 'Metrobüs', vehicleType: 'metrobus' }
  ],

  // FERRIES & WATERWAYS
  'Eminönü (T1/Vapur)': [
    { target: 'Sirkeci', distanceKm: 0.5, durationMin: 5, line: 'Aktarma Yürüme', vehicleType: 'walk' },
    { target: 'Karaköy (T1/Vapur)', distanceKm: 1.2, durationMin: 6, line: 'T1 Kabataş-Bağcılar', vehicleType: 'tram' },
    { target: 'Üsküdar Vapur İskelesi', distanceKm: 3.5, durationMin: 15, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Kadıköy (M4/Vapur)', distanceKm: 5.8, durationMin: 20, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Adalar (Vapur İskelesi)', distanceKm: 18.0, durationMin: 70, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Karaköy (T1/Vapur)': [
    { target: 'Eminönü (T1/Vapur)', distanceKm: 1.2, durationMin: 6, line: 'T1 Kabataş-Bağcılar', vehicleType: 'tram' },
    { target: 'Kadıköy (M4/Vapur)', distanceKm: 5.5, durationMin: 20, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Beşiktaş Vapur': [
    { target: 'Üsküdar Vapur İskelesi', distanceKm: 2.2, durationMin: 10, line: 'Motor / Vapur', vehicleType: 'ferry' },
    { target: 'Kadıköy (M4/Vapur)', distanceKm: 6.2, durationMin: 25, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Beykoz (Vapur İskelesi)', distanceKm: 15.0, durationMin: 45, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Yıldız (M7)', distanceKm: 1.2, durationMin: 4, line: 'Aktarma Yürüme', vehicleType: 'walk' }
  ],
  'Üsküdar Vapur İskelesi': [
    { target: 'Üsküdar', distanceKm: 0.2, durationMin: 3, line: 'Aktarma Yürüme', vehicleType: 'walk' },
    { target: 'Eminönü (T1/Vapur)', distanceKm: 3.5, durationMin: 15, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Beşiktaş Vapur', distanceKm: 2.2, durationMin: 10, line: 'Motor / Vapur', vehicleType: 'ferry' },
    { target: 'Beykoz (Vapur İskelesi)', distanceKm: 16.0, durationMin: 50, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Bostancı Vapur İskelesi', distanceKm: 12.0, durationMin: 30, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Kadıköy (M4/Vapur)': [
    { target: 'Kadıköy (M4)', distanceKm: 0.1, durationMin: 2, line: 'Aktarma', vehicleType: 'walk' },
    { target: 'Eminönü (T1/Vapur)', distanceKm: 5.8, durationMin: 20, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Karaköy (T1/Vapur)', distanceKm: 5.5, durationMin: 20, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Adalar (Vapur İskelesi)', distanceKm: 14.0, durationMin: 55, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Beşiktaş Vapur', distanceKm: 6.2, durationMin: 25, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Bostancı Vapur İskelesi': [
    { target: 'Bostancı', distanceKm: 0.3, durationMin: 5, line: 'Aktarma Yürüme', vehicleType: 'walk' },
    { target: 'Üsküdar Vapur İskelesi', distanceKm: 12.0, durationMin: 30, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Adalar (Vapur İskelesi)', distanceKm: 7.0, durationMin: 30, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Adalar (Vapur İskelesi)': [
    { target: 'Bostancı Vapur İskelesi', distanceKm: 7.0, durationMin: 30, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Eminönü (T1/Vapur)', distanceKm: 18.0, durationMin: 70, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Kadıköy (M4/Vapur)', distanceKm: 14.0, durationMin: 55, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],
  'Beykoz (Vapur İskelesi)': [
    { target: 'Üsküdar Vapur İskelesi', distanceKm: 16.0, durationMin: 50, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' },
    { target: 'Beşiktaş Vapur', distanceKm: 15.0, durationMin: 45, line: 'Şehir Hatları Vapuru', vehicleType: 'ferry' }
  ],

  // MISC CONNECTORS
  'Arnavutköy Metro (M11)': [
    { target: 'Kağıthane (M7/M11)', distanceKm: 22.0, durationMin: 25, line: 'M11 Havalimanı Metrosu', vehicleType: 'metro' }
  ],
  'Kavacık Transfer Point': [
    { target: 'Üsküdar', distanceKm: 12.0, durationMin: 18, line: 'Otobüs / Minibüs Bağlantısı', vehicleType: 'walk' }
  ],
  'Eyüpsultan (T5)': [
    { target: 'Alibeyköy (M7/T5)', distanceKm: 3.0, durationMin: 6, line: 'T5 Eminönü-Alibeyköy', vehicleType: 'tram' }
  ],
  'Taşköprü (T4)': [
    { target: 'Karadeniz Mahallesi (M7/T4)', distanceKm: 2.5, durationMin: 5, line: 'T4 Topkapı-Mescid-i Selam', vehicleType: 'tram' },
    { target: 'Sultançiftliği (T4)', distanceKm: 4.0, durationMin: 7, line: 'T4 Topkapı-Mescid-i Selam', vehicleType: 'tram' }
  ],
  'Sultançiftliği (T4)': [
    { target: 'Taşköprü (T4)', distanceKm: 4.0, durationMin: 7, line: 'T4 Topkapı-Mescid-i Selam', vehicleType: 'tram' },
    { target: 'Mescid-i Selam (T4)', distanceKm: 2.1, durationMin: 4, line: 'T4 Topkapı-Mescid-i Selam', vehicleType: 'tram' }
  ],
  'Mescid-i Selam (T4)': [
    { target: 'Sultançiftliği (T4)', distanceKm: 2.1, durationMin: 4, line: 'T4 Topkapı-Mescid-i Selam', vehicleType: 'tram' }
  ],
  'Başakşehir Metrokent (M3)': [
    { target: 'Kirazlı (M1B/M3)', distanceKm: 12.0, durationMin: 18, line: 'M3 Kirazlı-Metrokent', vehicleType: 'metro' },
    { target: 'Kayaşehir (M3)', distanceKm: 3.5, durationMin: 5, line: 'M3 Metrokent-Kayaşehir', vehicleType: 'metro' }
  ],
  'Kayaşehir (M3)': [
    { target: 'Başakşehir Metrokent (M3)', distanceKm: 3.5, durationMin: 5, line: 'M3 Metrokent-Kayaşehir', vehicleType: 'metro' }
  ]
};

// District Node Alias Maps (Virtual Hub nodes mapped to actual Graph Nodes)
export const NODE_ALIASES = {
  'Halkalı (Marmaray)': 'Halkalı',
  'Mustafa Kemal (Marmaray)': 'Mustafa Kemal',
  'Küçükçekmece (Marmaray)': 'Küçükçekmece',
  'Florya (Marmaray)': 'Florya',
  'Ataköy (Marmaray/M9)': 'Ataköy',
  'Bakırköy (Marmaray)': 'Bakırköy',
  'Zeytinburnu (Marmaray/M1A/T1/Metrobüs)': 'Zeytinburnu',
  'Kazlıçeşme (Marmaray)': 'Kazlıçeşme',
  'Yenikapı (Marmaray/M1/M2)': 'Yenikapı',
  'Sirkeci (Marmaray)': 'Sirkeci',
  'Üsküdar (Marmaray/M5/Vapur)': 'Üsküdar',
  'Ayrılık Çeşmesi (Marmaray/M4)': 'Ayrılık Çeşmesi',
  'Söğütlüçeşme (Marmaray/Metrobüs)': 'Söğütlüçeşme',
  'Bostancı (Marmaray/M8)': 'Bostancı',
  'Küçükyalı (Marmaray)': 'Küçükyalı',
  'Maltepe (Marmaray)': 'Maltepe',
  'Kartal (Marmaray)': 'Kartal',
  'Pendik (Marmaray)': 'Pendik',
  'Pendik YHT (Marmaray)': 'Pendik',
  'İçmeler (Marmaray)': 'İçmeler',
  'Tuzla (Marmaray)': 'Tuzla',
  
  // Ferry and Metro Aliases
  'Bostancı Vapur': 'Bostancı Vapur İskelesi',
  'Karaköy Vapur': 'Karaköy (T1/Vapur)',
  'Eminönü Vapur': 'Eminönü (T1/Vapur)',
  'Beşiktaş Vapur': 'Beşiktaş Vapur',
  'Samandıra (M5)': 'Samandıra Merkez (M5)',
  'Beylerbeyi (Vapur)': 'Üsküdar Vapur İskelesi'
};
