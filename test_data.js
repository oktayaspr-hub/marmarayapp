/**
 * MarmarayApp - Web Port of APK Real-Time Algorithm
 * Calculates ara trenler (Pendik, Ataköy), weekend times, and precision snapping.
 */

const STATIONS = [
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

const webIdxToApkId = (idx) => 43 - idx;

const apkStations = [
  { id: 1,  name: "Halkalı" },
  { id: 2,  name: "Mustafa Kemal" },
  { id: 3,  name: "Küçükçekmece" },
  { id: 4,  name: "Florya" },
  { id: 5,  name: "Florya Akvaryum" },
  { id: 6,  name: "Yeşilköy" },
  { id: 7,  name: "Yeşilyurt" },
  { id: 8,  name: "Ataköy" },
  { id: 9,  name: "Bakırköy" },
  { id: 10, name: "Yenimahalle" },
  { id: 11, name: "Zeytinburnu" },
  { id: 12, name: "Kazlıçeşme" },
  { id: 13, name: "Yenikapı" },
  { id: 14, name: "Sirkeci" },
  { id: 15, name: "Üsküdar" },
  { id: 16, name: "Ayrılık Çeşmesi" },
  { id: 17, name: "Söğütlüçeşme" },
  { id: 18, name: "Feneryolu" },
  { id: 19, name: "Göztepe" },
  { id: 20, name: "Erenköy" },
  { id: 21, name: "Suadiye" },
  { id: 22, name: "Bostancı" },
  { id: 23, name: "Küçükyalı" },
  { id: 24, name: "İdealtepe" },
  { id: 25, name: "Süreyya Plajı" },
  { id: 26, name: "Maltepe" },
  { id: 27, name: "Cevizli" },
  { id: 28, name: "Atalar" },
  { id: 29, name: "Başak" },
  { id: 30, name: "Kartal" },
  { id: 31, name: "Yunus" },
  { id: 32, name: "Pendik" },
  { id: 33, name: "Kaynarca" },
  { id: 34, name: "Tersane" },
  { id: 35, name: "Güzelyalı" },
  { id: 36, name: "Aydıntepe" },
  { id: 37, name: "İçmeler" },
  { id: 38, name: "Tuzla" },
  { id: 39, name: "Çayırova" },
  { id: 40, name: "Fatih" },
  { id: 41, name: "Osmangazi" },
  { id: 42, name: "Darıca" },
  { id: 43, name: "Gebze" }
];

const OFFSETS = {
  "H": {
    "2": 5, "3": 2, "4": 14, "5": 12, "6": 9, "7": 7, "8": 4, "9": 2, "10": 0, "11": 12, "12": 10,
    "13": 6, "14": 3, "15": 14, "16": 10, "17": 7, "18": 4, "19": 2, "20": 0, "21": 12, "22": 10,
    "23": 7, "24": 5, "25": 3, "26": 1, "27": 13, "28": 11, "29": 9, "30": 7, "31": 4, "32": 1,
    "33": 13, "34": 11, "35": 9, "36": 7, "37": 5, "38": 2, "39": 13, "40": 11, "41": 9, "42": 7, "43": 5
  },
  "G": {
    "1": 13, "2": 1, "3": 3, "4": 6, "5": 8, "6": 11, "7": 13, "8": 1, "9": 4, "10": 6, "11": 9, "12": 11,
    "13": 0, "14": 3, "15": 7, "16": 11, "17": 14, "18": 1, "19": 3, "20": 5, "21": 8, "22": 10, "23": 13,
    "24": 0, "25": 2, "26": 4, "27": 7, "28": 9, "29": 11, "30": 13, "31": 1, "32": 4, "33": 7, "34": 9,
    "35": 11, "36": 13, "37": 0, "38": 3, "39": 6, "40": 9, "41": 11, "42": 13
  }
};

const INTERVALS_H_TO_G = [
  0, 3, 2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 4, 3, 4, 4, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2
];
const INTERVALS_G_TO_H = [
  0, 2, 2, 2, 2, 4, 3, 2, 2, 2, 3, 2, 4, 3, 4, 4, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2
];

const INTERVALS_G2H = [0, ...[...INTERVALS_G_TO_H].slice(1).reverse()];
const INTERVALS_H2G = INTERVALS_H_TO_G;
const buildCum = (arr) => { const c = [0]; for (let i = 1; i < arr.length; i++) c.push(c[i-1] + arr[i]); return c; };
const CUM_G2H = buildCum(INTERVALS_G2H);
const CUM_H2G = buildCum(INTERVALS_H2G);
const TOTAL_G2H = CUM_G2H[CUM_G2H.length - 1];
const TOTAL_H2G = CUM_H2G[CUM_H2G.length - 1];

const calculateDistances = () => {
  const cumulativeHalkaliToGebze = [0];
  for (let i = 1; i < apkStations.length; i++) {
    cumulativeHalkaliToGebze.push(cumulativeHalkaliToGebze[i - 1] + INTERVALS_H_TO_G[i]);
  }
  const cumulativeGebzeToHalkali = new Array(apkStations.length).fill(0);
  for (let i = apkStations.length - 2; i >= 0; i--) {
    cumulativeGebzeToHalkali[i] = cumulativeGebzeToHalkali[i + 1] + INTERVALS_G_TO_H[i + 1];
  }
  return { cumulativeHalkaliToGebze, cumulativeGebzeToHalkali };
};

const snapToOffset = (estimatedMinutes, offset) => {
  if (offset === undefined || offset === null) return estimatedMinutes;
  const diff = estimatedMinutes - offset;
  const multiples = Math.round(diff / 15);
  return multiples * 15 + offset;
};

const getCalendarDayTrainRuns = (day, direction) => {
  const runs = [];
  
  if (direction === 'Gebze') {
    runs.push({ depMinutes: 6 * 60 + 1, destination: "Pendik", originId: 11, isIntermediate: true }); 
    runs.push({ depMinutes: 6 * 60 + 0, destination: "Pendik", originId: 15, isIntermediate: true }); 
    runs.push({ depMinutes: 6 * 60 + 1, destination: "Pendik", originId: 21, isIntermediate: true }); 
    runs.push({ depMinutes: 6 * 60 + 0, destination: "Pendik", originId: 27, isIntermediate: true }); 

    const startFull = 5 * 60 + 58; 
    const endFull = 23 * 60 + 28;
    for (let m = startFull; m <= endFull; m += 15) {
      runs.push({ depMinutes: m, destination: "Gebze", originId: 1, isIntermediate: false });
    }

    if (day === 5 || day === 6 || day === 0) {
      runs.push({ depMinutes: 23 * 60 + 58, destination: "Gebze", originId: 1, isIntermediate: false });
      if (day === 6 || day === 0) {
        runs.push({ depMinutes: 28, destination: "Gebze", originId: 1, isIntermediate: false });
        runs.push({ depMinutes: 58, destination: "Gebze", originId: 1, isIntermediate: false });
        runs.push({ depMinutes: 88, destination: "Gebze", originId: 1, isIntermediate: false });
      }
    }

    if (day !== 0) {
      const startShort = 6 * 60 + 9;
      const endShort = 21 * 60 + 54;
      for (let m = startShort; m <= endShort; m += 15) {
        runs.push({ depMinutes: m, destination: "Pendik", originId: 8, isIntermediate: true }); 
      }
    }

  } else {
    runs.push({ depMinutes: 6 * 60 + 0, destination: "Ataköy", originId: 30, isIntermediate: true }); 
    runs.push({ depMinutes: 6 * 60 + 0, destination: "Ataköy", originId: 23, isIntermediate: true }); 
    runs.push({ depMinutes: 6 * 60 + 0, destination: "Ataköy", originId: 17, isIntermediate: true }); 
    runs.push({ depMinutes: 5 * 60 + 59, destination: "Ataköy", originId: 13, isIntermediate: true }); 

    const startFull = 6 * 60 + 5;  
    const endFull = 23 * 60 + 20;  
    for (let m = startFull; m <= endFull; m += 15) {
      runs.push({ depMinutes: m, destination: "Halkalı", originId: 43, isIntermediate: false });
    }

    if (day === 5 || day === 6 || day === 0) {
      runs.push({ depMinutes: 23 * 60 + 50, destination: "Halkalı", originId: 43, isIntermediate: false }); 
      if (day === 6 || day === 0) {
        runs.push({ depMinutes: 20, destination: "Halkalı", originId: 43, isIntermediate: false });
        runs.push({ depMinutes: 50, destination: "Halkalı", originId: 43, isIntermediate: false });
        runs.push({ depMinutes: 80, destination: "Halkalı", originId: 43, isIntermediate: false });
      }
    }

    if (day !== 0) {
      const startShort = 6 * 60 + 9;
      const endShort = 22 * 60 + 39;
      for (let m = startShort; m <= endShort; m += 15) {
        const destination = (m > 20 * 60 + 50) ? "Zeytinburnu" : "Ataköy";
        runs.push({ depMinutes: m, destination: destination, originId: 32, isIntermediate: true }); 
      }
    }
  }

  return runs.sort((a, b) => a.depMinutes - b.depMinutes);
};

const getLiveTrainsForStation = (selectedStationId, direction, date = new Date()) => {
  const { cumulativeHalkaliToGebze, cumulativeGebzeToHalkali } = calculateDistances();
  const stationIndex = apkStations.findIndex(s => s.id === selectedStationId);
  if (stationIndex === -1) return [];

  const currentDay = date.getDay();
  const yesterday = (currentDay + 6) % 7;
  const tomorrow = (currentDay + 1) % 7;

  const allRuns = [
    ...getCalendarDayTrainRuns(yesterday, direction).map(r => ({ ...r, depMinutes: r.depMinutes - 24 * 60 })),
    ...getCalendarDayTrainRuns(currentDay, direction),
    ...getCalendarDayTrainRuns(tomorrow, direction).map(r => ({ ...r, depMinutes: r.depMinutes + 24 * 60 })),
  ];

  const currentMinutes = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  const upcoming = [];

  for (const run of allRuns) {
    let estimatedTravelTime = 0;
    
    if (direction === 'Gebze') {
      const originIndex = apkStations.findIndex(s => s.id === run.originId);
      if (stationIndex < originIndex) continue; 
      
      const destIndex = apkStations.findIndex(s => s.name === run.destination);
      if (stationIndex > destIndex && destIndex !== -1) continue;

      estimatedTravelTime = cumulativeHalkaliToGebze[stationIndex] - cumulativeHalkaliToGebze[originIndex];
    } else {
      const originIndex = apkStations.findIndex(s => s.id === run.originId);
      if (stationIndex > originIndex) continue; 
      
      const destIndex = apkStations.findIndex(s => s.name === run.destination);
      if (stationIndex < destIndex && destIndex !== -1) continue; 

      estimatedTravelTime = cumulativeGebzeToHalkali[stationIndex] - cumulativeGebzeToHalkali[originIndex];
    }

    const estimatedArrival = run.depMinutes + estimatedTravelTime;
    
    let actualArrival = estimatedArrival;
    const baseOffset = (direction === 'Gebze') ? OFFSETS.G[String(selectedStationId)] : OFFSETS.H[String(selectedStationId)];
    
    if (baseOffset !== undefined) {
      let trainOffset = baseOffset;
      if (run.isIntermediate) {
        trainOffset = (baseOffset + 8) % 15;
      }
      actualArrival = snapToOffset(estimatedArrival, trainOffset);
    }

    const LINGER_MINUTES = 45 / 60;
    if (actualArrival > currentMinutes - LINGER_MINUTES) {
      upcoming.push({
        arrivalMinutes: actualArrival,
        departureTimeMinutes: run.depMinutes,
        destination: run.destination,
      });
    }
  }

  return upcoming.sort((a, b) => a.arrivalMinutes - b.arrivalMinutes);
};

const getNextTrains = (stationIdx, direction) => {
  const apkId = webIdxToApkId(stationIdx);
  const apkDirection = direction === 'G2H' ? 'Halkalı' : 'Gebze';
  
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  const rawUpcoming = getLiveTrainsForStation(apkId, apkDirection, now);
  
  return rawUpcoming.slice(0, 5).map(t => ({
    remainingMin: Math.ceil(t.arrivalMinutes - currentMins),
    timeStr: minsToHHMM(t.arrivalMinutes),
    destination: t.destination,
    arrivalMin: t.arrivalMinutes
  }));
};

const minsToHHMM = (mins) => {
  const h = Math.floor(mins / 60) % 24;
  const mn = Math.floor(mins % 60);
  return String(h).padStart(2,'0') + ':' + String(mn).padStart(2,'0');
};

const FARE_DATA = [
  { range:"1-7 Durak",   min:1,  max:7,  full:37.40,  student:18.13, teacher:26.58 },
  { range:"8-14 Durak",  min:8,  max:14, full:47.74,  student:22.32, teacher:32.92 },
  { range:"15-21 Durak", min:15, max:21, full:55.11,  student:26.58, teacher:38.72 },
  { range:"22-28 Durak", min:22, max:28, full:63.56,  student:30.23, teacher:45.08 },
  { range:"29-35 Durak", min:29, max:35, full:74.24,  student:35.53, teacher:53.03 },
  { range:"36-43 Durak", min:36, max:43, full:82.17,  student:37.13, teacher:57.29 }
];

const calculateFare = (idxA, idxB) => {
  const diff = Math.abs(idxA - idxB);
  return FARE_DATA.find(f => diff >= f.min && diff <= f.max) || FARE_DATA[FARE_DATA.length-1];
};

const travelTime = (fromIdx, toIdx) => {
  if (fromIdx < toIdx) {
    return CUM_G2H[toIdx] - CUM_G2H[fromIdx];
  } else {
    const ri = STATIONS.length - 1;
    return CUM_H2G[ri - fromIdx] - CUM_H2G[ri - toIdx];
  }
};

const getTrainPosition = (direction, elapsedMins) => {
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

const G2H_WEEKDAY = [];
const H2G_WEEKDAY = [];
const G2H_WEEKEND = [];
const H2G_WEEKEND = [];
console.log(getNextTrains(0, 'G2H'));

console.log(getNextTrains(30, 'G2H'));
console.log(getNextTrains(30, 'H2G'));
