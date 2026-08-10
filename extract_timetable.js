import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STATIONS } from './wp-content/plugins/marmaray-core-v2/assets/js/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to re-implement the distance logic here because the methods in data.js aren't all exported
const apkStations = [
  { id: 1,  name: "Halkalı" }, { id: 2,  name: "Mustafa Kemal" }, { id: 3,  name: "Küçükçekmece" },
  { id: 4,  name: "Florya" }, { id: 5,  name: "Florya Akvaryum" }, { id: 6,  name: "Yeşilköy" },
  { id: 7,  name: "Yeşilyurt" }, { id: 8,  name: "Ataköy" }, { id: 9,  name: "Bakırköy" },
  { id: 10, name: "Yenimahalle" }, { id: 11, name: "Zeytinburnu" }, { id: 12, name: "Kazlıçeşme" },
  { id: 13, name: "Yenikapı" }, { id: 14, name: "Sirkeci" }, { id: 15, name: "Üsküdar" },
  { id: 16, name: "Ayrılık Çeşmesi" }, { id: 17, name: "Söğütlüçeşme" }, { id: 18, name: "Feneryolu" },
  { id: 19, name: "Göztepe" }, { id: 20, name: "Erenköy" }, { id: 21, name: "Suadiye" },
  { id: 22, name: "Bostancı" }, { id: 23, name: "Küçükyalı" }, { id: 24, name: "İdealtepe" },
  { id: 25, name: "Süreyya Plajı" }, { id: 26, name: "Maltepe" }, { id: 27, name: "Cevizli" },
  { id: 28, name: "Atalar" }, { id: 29, name: "Başak" }, { id: 30, name: "Kartal" },
  { id: 31, name: "Yunus" }, { id: 32, name: "Pendik" }, { id: 33, name: "Kaynarca" },
  { id: 34, name: "Tersane" }, { id: 35, name: "Güzelyalı" }, { id: 36, name: "Aydıntepe" },
  { id: 37, name: "İçmeler" }, { id: 38, name: "Tuzla" }, { id: 39, name: "Çayırova" },
  { id: 40, name: "Fatih" }, { id: 41, name: "Osmangazi" }, { id: 42, name: "Darıca" },
  { id: 43, name: "Gebze" }
];

const OFFSETS = {
  "H": { "2": 5, "3": 2, "4": 14, "5": 12, "6": 9, "7": 7, "8": 4, "9": 2, "10": 0, "11": 12, "12": 10, "13": 6, "14": 3, "15": 14, "16": 10, "17": 7, "18": 4, "19": 2, "20": 0, "21": 12, "22": 10, "23": 7, "24": 5, "25": 3, "26": 1, "27": 13, "28": 11, "29": 9, "30": 7, "31": 4, "32": 1, "33": 13, "34": 11, "35": 9, "36": 7, "37": 5, "38": 2, "39": 13, "40": 11, "41": 9, "42": 7, "43": 5 },
  "G": { "1": 13, "2": 1, "3": 3, "4": 6, "5": 8, "6": 11, "7": 13, "8": 1, "9": 4, "10": 6, "11": 9, "12": 11, "13": 0, "14": 3, "15": 7, "16": 11, "17": 14, "18": 1, "19": 3, "20": 5, "21": 8, "22": 10, "23": 13, "24": 0, "25": 2, "26": 4, "27": 7, "28": 9, "29": 11, "30": 13, "31": 1, "32": 4, "33": 7, "34": 9, "35": 11, "36": 13, "37": 0, "38": 3, "39": 6, "40": 9, "41": 11, "42": 13 }
};
const INTERVALS_H_TO_G = [ 0, 3, 2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 4, 3, 4, 4, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2 ];
const INTERVALS_G_TO_H = [ 0, 2, 2, 2, 2, 4, 3, 2, 2, 2, 3, 2, 4, 3, 4, 4, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2 ];

const cumulativeHalkaliToGebze = [0];
for (let i = 1; i < apkStations.length; i++) cumulativeHalkaliToGebze.push(cumulativeHalkaliToGebze[i - 1] + INTERVALS_H_TO_G[i]);

const cumulativeGebzeToHalkali = new Array(apkStations.length).fill(0);
for (let i = apkStations.length - 2; i >= 0; i--) cumulativeGebzeToHalkali[i] = cumulativeGebzeToHalkali[i + 1] + INTERVALS_G_TO_H[i + 1];

const snapToOffset = (estimatedMinutes, offset) => {
  if (offset === undefined || offset === null) return estimatedMinutes;
  const diff = estimatedMinutes - offset;
  return Math.round(diff / 15) * 15 + offset;
};

const getCalendarDayTrainRuns = (day, direction) => {
  const runs = [];
  if (direction === 'Gebze') {
    const startFull = 5 * 60 + 58; 
    const endFull = 23 * 60 + 28;
    for (let m = startFull; m <= endFull; m += 15) runs.push({ depMinutes: m, destination: "Gebze", originId: 1, isIntermediate: false });
    if (day === 5 || day === 6 || day === 0) {
      runs.push({ depMinutes: 23 * 60 + 58, destination: "Gebze", originId: 1, isIntermediate: false });
      if (day === 6 || day === 0) {
        runs.push({ depMinutes: 28, destination: "Gebze", originId: 1, isIntermediate: false });
        runs.push({ depMinutes: 58, destination: "Gebze", originId: 1, isIntermediate: false });
        runs.push({ depMinutes: 88, destination: "Gebze", originId: 1, isIntermediate: false });
      }
    }
  } else {
    const startFull = 6 * 60 + 5;  
    const endFull = 23 * 60 + 20;  
    for (let m = startFull; m <= endFull; m += 15) runs.push({ depMinutes: m, destination: "Halkalı", originId: 43, isIntermediate: false });
    if (day === 5 || day === 6 || day === 0) {
      runs.push({ depMinutes: 23 * 60 + 50, destination: "Halkalı", originId: 43, isIntermediate: false }); 
      if (day === 6 || day === 0) {
        runs.push({ depMinutes: 20, destination: "Halkalı", originId: 43, isIntermediate: false });
        runs.push({ depMinutes: 50, destination: "Halkalı", originId: 43, isIntermediate: false });
        runs.push({ depMinutes: 80, destination: "Halkalı", originId: 43, isIntermediate: false });
      }
    }
  }
  return runs.sort((a, b) => a.depMinutes - b.depMinutes);
};

const getStationSchedule = (stationName, day) => {
    // Normalizing names to match apkStations
    let matchName = stationName;
    if (matchName === 'Ayrılıkçeşmesi') matchName = 'Ayrılık Çeşmesi';
    const apkStation = apkStations.find(s => s.name === matchName);
    if (!apkStation) return { gebze: [], halkali: [] };

    const selectedStationId = apkStation.id;
    const stationIndex = selectedStationId - 1;
    
    const schedule = { gebze: [], halkali: [] };

    ['Gebze', 'Halkalı'].forEach(direction => {
        const runs = getCalendarDayTrainRuns(day, direction);
        const results = [];
        
        for (const run of runs) {
            let estimatedTravelTime = 0;
            if (direction === 'Gebze') {
              const originIndex = run.originId - 1;
              if (stationIndex < originIndex) continue; 
              estimatedTravelTime = cumulativeHalkaliToGebze[stationIndex] - cumulativeHalkaliToGebze[originIndex];
            } else {
              const originIndex = run.originId - 1;
              if (stationIndex > originIndex) continue; 
              estimatedTravelTime = cumulativeGebzeToHalkali[stationIndex] - cumulativeGebzeToHalkali[originIndex];
            }

            const estimatedArrival = run.depMinutes + estimatedTravelTime;
            const baseOffset = (direction === 'Gebze') ? OFFSETS.G[String(selectedStationId)] : OFFSETS.H[String(selectedStationId)];
            
            let actualArrival = estimatedArrival;
            if (baseOffset !== undefined) {
              actualArrival = snapToOffset(estimatedArrival, baseOffset);
            }
            
            // Format time
            let h = Math.floor(actualArrival / 60) % 24;
            let m = actualArrival % 60;
            results.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
        }
        
        // Remove duplicates and sort
        const unique = [...new Set(results)].sort();
        if (direction === 'Gebze') schedule.gebze = unique;
        else schedule.halkali = unique;
    });

    return schedule;
};

const formatTimetableHTML = (stationName, scheduleWeekday, scheduleWeekend) => {
    return `
<h2>${stationName} Marmaray İstasyonu Hafta İçi Sefer Saatleri</h2>
<table class="marmaray-table">
  <thead>
    <tr>
      <th>Halkalı Yönü</th>
      <th>Gebze Yönü</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${scheduleWeekday.halkali.join(', ')}</td>
      <td>${scheduleWeekday.gebze.join(', ')}</td>
    </tr>
  </tbody>
</table>

<h2>${stationName} Marmaray İstasyonu Hafta Sonu Sefer Saatleri</h2>
<table class="marmaray-table">
  <thead>
    <tr>
      <th>Halkalı Yönü</th>
      <th>Gebze Yönü</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${scheduleWeekend.halkali.join(', ')}</td>
      <td>${scheduleWeekend.gebze.join(', ')}</td>
    </tr>
  </tbody>
</table>
`;
};

const slugify = (text) => text.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

const blogPosts = [];

for (const station of STATIONS) {
    const slug = station.toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_');
      
    const imgFilename = `banner_${slug}.png`;

    const weekday = getStationSchedule(station, 1); // Monday
    const weekend = getStationSchedule(station, 0); // Sunday

    const htmlContent = formatTimetableHTML(station, weekday, weekend);
    
    // SEO Data
    const title = `${station} Marmaray İstasyonu Saatleri`;
    const seoDescription = `${station} Marmaray istasyonu güncel sefer saatleri, Halkalı ve Gebze yönü tren kalkış vakitleri. Hafta içi ve hafta sonu ${station} Marmaray saat tablosu.`;
    const altText = `${station} Marmaray İstasyonu`;

    blogPosts.push({
        station: station,
        title: title,
        content: `
<p>${station} Marmaray İstasyonu, İstanbul'un en önemli ulaşım ağlarından biri olan Marmaray projesinin kilit duraklarından biridir. Günlük on binlerce yolcuya hizmet veren istasyon, hem Anadolu yakası hem de Avrupa yakası ulaşımında kritik bir aktarma merkezidir.</p>
<p>Aşağıdaki tablolardan <strong>${station} Marmaray istasyonu güncel sefer saatlerini</strong>, Halkalı yönü ve Gebze yönü için ayrı ayrı inceleyebilirsiniz.</p>
${htmlContent}
<p><em>Not: Sefer saatleri resmi verilere dayanmaktadır ancak olağandışı durumlarda (arıza, bakım vb.) gecikmeler yaşanabilmektedir. Lütfen istasyondaki anlık duyuruları takip ediniz.</em></p>
`,
        excerpt: seoDescription,
        seo_description: seoDescription,
        image_alt: altText,
        image_filename: imgFilename,
        slug: slugify(`${station} marmaray istasyonu saatleri`)
    });
}

fs.writeFileSync('marmaray_blog_data.json', JSON.stringify(blogPosts, null, 2));
console.log('Successfully generated marmaray_blog_data.json');
