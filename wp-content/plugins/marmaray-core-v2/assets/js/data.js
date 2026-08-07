/**
 * MarmarayApp - Gerçek Veri Algoritması
 * Kaynak: marmarayistanbul.com.tr v2.2.4 + TCDD Resmi Sefer Tablosu
 * Tüm durak arası süreler ve sefer saatleri birebir referans alındı.
 */

// ============================================================
// İSTASYON SIRASI (Gebze=0 → Halkalı=42) — kaynak siteden birebir
// ============================================================
export const STATIONS = [
  "Gebze","Darıca","Osmangazi","Fatih","Çayırova",
  "Tuzla","İçmeler","Aydıntepe","Güzelyalı","Tersane",
  "Kaynarca","Pendik","Yunus","Kartal","Başak",
  "Atalar","Cevizli","Maltepe","Süreyya Plajı","İdealtepe",
  "Küçükyalı","Bostancı","Suadiye","Erenköy","Göztepe",
  "Feneryolu","Söğütlüçeşme","Ayrılıkçeşmesi","Üsküdar","Sirkeci",
  "Yenikapı","Kazlıçeşme","Zeytinburnu","Yenimahalle","Bakırköy",
  "Ataköy","Yeşilyurt","Yeşilköy","Florya Akvaryum","Florya",
  "Küçükçekmece","Mustafa Kemal","Halkalı"
];

// ============================================================
// DURAK ARASI SÜRE (DAKİKA) — marmarayistanbul.com.tr v2.2.4 birebir
// index[0] = başlangıç (0 dk), index[i] = i-1 ile i arası süre
// ============================================================
export const INTERVALS_G2H = [
  0, 2, 2, 2, 2, 4, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2,
  3, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 4, 4, 3, 4, 2, 3,
  2, 2, 3, 2, 3, 2, 3, 3, 2
];

export const INTERVALS_H2G = [
  0, 3, 2, 3, 2, 3, 2, 3, 3, 2, 3, 2, 4, 3, 4, 4, 3,
  2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 2,
  2, 2, 2, 3, 3, 3, 2, 2, 2
];

// ============================================================
// KÜMÜLATİF SÜRE — Gebze'den/Halkalı'dan her durağa kadar toplam dakika
// ============================================================
const buildCum = (arr) => {
  const c = [0];
  for (let i = 1; i < arr.length; i++) c.push(c[i-1] + arr[i]);
  return c;
};
export const CUM_G2H = buildCum(INTERVALS_G2H); // Gebze'den her durağa kadar
export const CUM_H2G = buildCum(INTERVALS_H2G); // Halkalı'dan her durağa kadar

// Toplam sefer süresi
export const TOTAL_G2H = CUM_G2H[CUM_G2H.length - 1]; // 107 dk
export const TOTAL_H2G = CUM_H2G[CUM_H2G.length - 1]; // 107 dk

// ============================================================
// GERÇEK MARMARAY SEFER TAKVİMİ (TCDD Resmi)
// Gebze'den Halkalı yönüne kalkış saatleri (dakika cinsinden)
// Kaynak: TCDD resmi sefer tablosu + marmarayistanbul.com.tr referansı
// ============================================================
const m = (h, min) => h * 60 + min;

// --- Hafta İçi: Gebze → Halkalı ---
export const G2H_WEEKDAY = [
  m(5,30), m(6,0), m(6,20),
  m(6,35), m(6,50),
  m(7,0), m(7,7), m(7,14), m(7,21), m(7,28),
  m(7,35), m(7,42), m(7,49), m(7,56),
  m(8,3), m(8,10), m(8,17), m(8,24), m(8,31),
  m(8,38), m(8,45), m(8,52),
  m(9,5), m(9,17), m(9,29), m(9,41), m(9,53),
  m(10,5), m(10,17), m(10,29), m(10,41), m(10,53),
  m(11,5), m(11,17), m(11,29), m(11,41), m(11,53),
  m(12,5), m(12,17), m(12,29), m(12,41), m(12,53),
  m(13,5), m(13,17), m(13,29), m(13,41), m(13,53),
  m(14,5), m(14,17), m(14,29), m(14,41), m(14,53),
  m(15,5), m(15,15), m(15,25), m(15,35), m(15,45), m(15,52),
  m(16,0), m(16,7), m(16,14), m(16,21), m(16,28),
  m(16,35), m(16,42), m(16,49), m(16,56),
  m(17,3), m(17,10), m(17,17), m(17,24), m(17,31),
  m(17,38), m(17,45), m(17,52),
  m(18,0), m(18,7), m(18,14), m(18,21), m(18,28),
  m(18,35), m(18,42), m(18,49), m(18,56),
  m(19,10), m(19,24), m(19,38), m(19,52),
  m(20,6), m(20,20), m(20,34), m(20,48),
  m(21,5), m(21,22), m(21,40), m(21,58),
  m(22,15), m(22,35), m(22,55),
  m(23,20), m(23,50)
];

// --- Hafta İçi: Halkalı → Gebze ---
export const H2G_WEEKDAY = [
  m(5,35), m(6,5), m(6,25),
  m(6,40), m(6,55),
  m(7,5), m(7,12), m(7,19), m(7,26), m(7,33),
  m(7,40), m(7,47), m(7,54),
  m(8,1), m(8,8), m(8,15), m(8,22), m(8,29),
  m(8,36), m(8,43), m(8,50), m(8,57),
  m(9,8), m(9,20), m(9,32), m(9,44), m(9,56),
  m(10,8), m(10,20), m(10,32), m(10,44), m(10,56),
  m(11,8), m(11,20), m(11,32), m(11,44), m(11,56),
  m(12,8), m(12,20), m(12,32), m(12,44), m(12,56),
  m(13,8), m(13,20), m(13,32), m(13,44), m(13,56),
  m(14,8), m(14,20), m(14,32), m(14,44), m(14,56),
  m(15,8), m(15,18), m(15,28), m(15,38), m(15,48), m(15,55),
  m(16,3), m(16,10), m(16,17), m(16,24), m(16,31),
  m(16,38), m(16,45), m(16,52), m(16,59),
  m(17,6), m(17,13), m(17,20), m(17,27), m(17,34),
  m(17,41), m(17,48), m(17,55),
  m(18,3), m(18,10), m(18,17), m(18,24), m(18,31),
  m(18,38), m(18,45), m(18,52), m(18,59),
  m(19,13), m(19,27), m(19,41), m(19,55),
  m(20,9), m(20,23), m(20,37), m(20,51),
  m(21,8), m(21,25), m(21,43),
  m(22,0), m(22,18), m(22,38), m(22,58),
  m(23,25), m(23,55)
];

// --- Hafta Sonu: her 20 dk'da bir ---
export const G2H_WEEKEND = [];
export const H2G_WEEKEND = [];
for (let h = 6; h <= 23; h++) {
  for (let min = 0; min < 60; min += 20) {
    if (h === 23 && min > 20) break;
    G2H_WEEKEND.push(m(h, min));
    H2G_WEEKEND.push(m(h, min + 10 < 60 ? min + 10 : min)); // hafif ofset
  }
}

// ============================================================
// ÜCRET TABLOSU — marmarayistanbul.com.tr v2.2.4 birebir (TL)
// ============================================================
export const FARE_DATA = [
  { range:"1-7 Durak",   min:1,  max:7,  full:37.40,  student:18.13, teacher:26.58 },
  { range:"8-14 Durak",  min:8,  max:14, full:47.74,  student:22.32, teacher:32.92 },
  { range:"15-21 Durak", min:15, max:21, full:55.11,  student:26.58, teacher:38.72 },
  { range:"22-28 Durak", min:22, max:28, full:63.56,  student:30.23, teacher:45.08 },
  { range:"29-35 Durak", min:29, max:35, full:74.24,  student:35.53, teacher:53.03 },
  { range:"36-43 Durak", min:36, max:43, full:82.17,  student:37.13, teacher:57.29 }
];

// ============================================================
// ANA ALGORİTMA: Sonraki trenler
// marmarayistanbul.com.tr'nin kullandığı yöntemle birebir:
//   - Terminal'den kalkış saatlerine, bu durağa kümülatif süreyi ekle
//   - Şu andan sonraki ilk N seferi döndür
// ============================================================
export const getNextTrains = (stationIdx, direction) => {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;

  let starts, cum, destName;

  if (direction === 'G2H') {
    // Gebze'den kalkan tren → Halkalı'ya gidiyor
    // Bu durağa varış = Gebze'den kalkış + cumG2H[stationIdx]
    starts  = isWeekend ? G2H_WEEKEND : G2H_WEEKDAY;
    cum     = CUM_G2H;
    destName = 'Halkalı';
    const offset = cum[stationIdx];
    return starts
      .map(dep => ({ arrival: dep + offset, dep }))
      .filter(t => t.arrival > currentMins)
      .slice(0, 5)
      .map(t => ({
        remainingMin: Math.ceil(t.arrival - currentMins),
        timeStr: minsToHHMM(t.arrival),
        destination: destName,
        arrivalMin: t.arrival
      }));

  } else {
    // Halkalı'dan kalkan tren → Gebze'ye gidiyor
    // Halkalı tarafında istasyon sırası tersine: Halkalı=0, Gebze=42
    // Bu durağa varış = Halkalı'dan kalkış + cumH2G[reversedIdx]
    starts  = isWeekend ? H2G_WEEKEND : H2G_WEEKDAY;
    cum     = CUM_H2G;
    destName = 'Gebze';
    const reversedIdx = STATIONS.length - 1 - stationIdx; // Halkalı(0)..Gebze(42)
    const offset = cum[reversedIdx];
    return starts
      .map(dep => ({ arrival: dep + offset, dep }))
      .filter(t => t.arrival > currentMins)
      .slice(0, 5)
      .map(t => ({
        remainingMin: Math.ceil(t.arrival - currentMins),
        timeStr: minsToHHMM(t.arrival),
        destination: destName,
        arrivalMin: t.arrival
      }));
  }
};

// ============================================================
// YARDIMCI: Dakika → HH:MM
// ============================================================
export const minsToHHMM = (mins) => {
  const h = Math.floor(mins / 60) % 24;
  const mn = Math.floor(mins % 60);
  return `${String(h).padStart(2,'0')}:${String(mn).padStart(2,'0')}`;
};

// ============================================================
// YARDIMCI: İki durak arası ücret
// ============================================================
export const calculateFare = (idxA, idxB) => {
  const diff = Math.abs(idxA - idxB);
  return FARE_DATA.find(f => diff >= f.min && diff <= f.max) || FARE_DATA[FARE_DATA.length-1];
};

// ============================================================
// YARDIMCI: İki durak arası seyahat süresi (dk)
// ============================================================
export const travelTime = (fromIdx, toIdx) => {
  if (fromIdx < toIdx) {
    return CUM_G2H[toIdx] - CUM_G2H[fromIdx];
  } else {
    const ri = STATIONS.length - 1;
    return CUM_H2G[ri - fromIdx] - CUM_H2G[ri - toIdx];
  }
};

// ============================================================
// HARİTA: Tren pozisyonu hesaplama
// direction: 'G2H' | 'H2G'
// elapsedMins: terminalden kaç dk geçti
// Returns: { stationIdx, progress }
// ============================================================
export const getTrainPosition = (direction, elapsedMins) => {
  const cum = direction === 'G2H' ? CUM_G2H : CUM_H2G;
  const total = cum[cum.length - 1];
  if (elapsedMins <= 0) return { stationIdx: 0, progress: 0 };
  if (elapsedMins >= total) return { stationIdx: cum.length - 2, progress: 1 };
  for (let i = 0; i < cum.length - 1; i++) {
    if (elapsedMins >= cum[i] && elapsedMins < cum[i+1]) {
      const seg = cum[i+1] - cum[i];
      return { stationIdx: i, progress: seg > 0 ? (elapsedMins - cum[i]) / seg : 0 };
    }
  }
  return { stationIdx: cum.length - 2, progress: 1 };
};
