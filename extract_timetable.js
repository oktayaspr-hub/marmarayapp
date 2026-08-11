import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const STATIONS = [
    "Halkalı", "Mustafa Kemal", "Küçükçekmece", "Florya", "Florya Akvaryum", "Yeşilköy",
    "Yeşilyurt", "Ataköy", "Bakırköy", "Yenimahalle", "Zeytinburnu", "Kazlıçeşme",
    "Yenikapı", "Sirkeci", "Üsküdar", "Ayrılık Çeşmesi", "Söğütlüçeşme", "Feneryolu",
    "Göztepe", "Erenköy", "Suadiye", "Bostancı", "Küçükyalı", "İdealtepe",
    "Süreyya Plajı", "Maltepe", "Cevizli", "Atalar", "Başak", "Kartal",
    "Yunus", "Pendik", "Kaynarca", "Tersane", "Güzelyalı", "Aydıntepe",
    "İçmeler", "Tuzla", "Çayırova", "Fatih", "Osmangazi", "Darıca", "Gebze"
];

const apkStations = STATIONS.map((name, i) => ({ id: i + 1, name }));

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
    let matchName = stationName;
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
            
            let h = Math.floor(actualArrival / 60) % 24;
            let m = actualArrival % 60;
            results.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
        }
        
        const unique = [...new Set(results)].sort();
        if (direction === 'Gebze') schedule.gebze = unique;
        else schedule.halkali = unique;
    });

    return schedule;
};

const formatTimetableHTML = (stationName, scheduleWeekday, scheduleWeekend, stationIndex) => {
    const focusKeyword = `${stationName} Marmaray İstasyonu Saatleri`;
    
    const createGrid = (times) => {
        let gridHtml = '<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 25px;">';
        if (times.length === 0) return '<div style="padding: 15px; color: #666; font-style: italic;">Bu yönde sefer bulunmamaktadır.</div>';
        
        times.forEach(t => {
            gridHtml += `<span style="background: #ffffff; border: 1px solid #dcdcdc; padding: 6px 12px; border-radius: 4px; font-weight: 500; color: #333; font-size: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">${t}</span>`;
        });
        gridHtml += '</div>';
        return gridHtml;
    };
    
    const firstH = scheduleWeekday.halkali[0] || '-';
    const lastH = scheduleWeekday.halkali[scheduleWeekday.halkali.length-1] || '-';
    const firstG = scheduleWeekday.gebze[0] || '-';
    const lastG = scheduleWeekday.gebze[scheduleWeekday.gebze.length-1] || '-';
    
    const totalRuns = scheduleWeekday.halkali.length + scheduleWeekday.gebze.length;
    
    let content = `
<p><strong>${focusKeyword}</strong> rehberine hoş geldiniz! İstanbul'un en önemli ulaşım ağlarından biri olan Marmaray projesinin ${stationIndex + 1}. durağı olan ${stationName} istasyonu, günlük on binlerce yolcunun güvenle ve hızla seyahat etmesini sağlamaktadır. Bu makalede, ${stationName} istasyonundan geçen trenlerin hafta içi ve hafta sonu kalkış vakitlerini detaylı bir şekilde inceleyebilirsiniz.</p>

<p>${stationName} istasyonundan bineceğiniz trenlerle Asya ve Avrupa yakası arasında kesintisiz, konforlu bir yolculuk yapabilirsiniz. Düzenli ve planlı ulaşım için aşağıdaki <strong>${focusKeyword}</strong> tablolarını rehber edinebilirsiniz. İstasyonumuzda her 15 dakikada bir sefer düzenlenmekte olup, yoğun saatlerde bu süre daha da kısalabilmektedir.</p>

<h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 8px; margin-top: 30px;">Hafta İçi ${focusKeyword}</h2>
<p>Hafta içi günlerinde (Pazartesi, Salı, Çarşamba, Perşembe, Cuma) iş ve okul trafiğinin en yoğun olduğu anlarda bile Marmaray kesintisiz hizmet vermektedir. Aşağıda <strong>Halkalı</strong> ve <strong>Gebze</strong> yönüne giden trenlerin güncel saat listesini bulabilirsiniz.</p>

<h3 style="color: #ff2222; margin-top: 20px; font-size: 18px; display: flex; align-items: center;"><span style="font-size: 24px; margin-right: 8px;">▶</span> Halkalı Yönü Seferleri (Hafta İçi)</h3>
${createGrid(scheduleWeekday.halkali)}

<h3 style="color: #0056b3; margin-top: 20px; font-size: 18px; display: flex; align-items: center;"><span style="font-size: 24px; margin-right: 8px;">▶</span> Gebze Yönü Seferleri (Hafta İçi)</h3>
${createGrid(scheduleWeekday.gebze)}


<h2 style="color: #ff2222; border-bottom: 2px solid #ff2222; padding-bottom: 8px; margin-top: 40px;">Hafta Sonu ${focusKeyword}</h2>
<p>Cumartesi ve Pazar günleri İstanbul'un tadını çıkarmak isteyenler için Marmaray ek seferlerle gece geç saatlere kadar hizmet vermektedir. Hafta sonu planlarınızı yaparken aşağıdaki <strong>${focusKeyword}</strong> verilerini referans alabilirsiniz.</p>

<h3 style="color: #ff2222; margin-top: 20px; font-size: 18px; display: flex; align-items: center;"><span style="font-size: 24px; margin-right: 8px;">▶</span> Halkalı Yönü Seferleri (Hafta Sonu)</h3>
${createGrid(scheduleWeekend.halkali)}

<h3 style="color: #0056b3; margin-top: 20px; font-size: 18px; display: flex; align-items: center;"><span style="font-size: 24px; margin-right: 8px;">▶</span> Gebze Yönü Seferleri (Hafta Sonu)</h3>
${createGrid(scheduleWeekend.gebze)}

<h2 style="color: #333; margin-top: 40px;">Özet Tablo: ${stationName} Marmaray İlk ve Son Tren Saatleri</h2>
<p>${stationName} durağından gün içinde toplam <strong>${totalRuns}</strong> adet tren geçmektedir. Hızlıca göz atmak isterseniz ilk ve son tren saatleri aşağıdaki özet tabloda verilmiştir.</p>
<div style="overflow-x:auto;">
<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 16px; text-align: left; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
    <thead>
        <tr>
            <th style="background-color: #0056b3; color: white; padding: 15px; border: 1px solid #004494;">Yön</th>
            <th style="background-color: #0056b3; color: white; padding: 15px; border: 1px solid #004494;">İlk Tren</th>
            <th style="background-color: #0056b3; color: white; padding: 15px; border: 1px solid #004494;">Son Tren</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: #f9f9f9; transition: background-color 0.3s;">
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 700; color: #ff2222;">Halkalı Yönü</td>
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 600;">${firstH}</td>
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 600;">${lastH}</td>
        </tr>
        <tr style="transition: background-color 0.3s;">
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 700; color: #0056b3;">Gebze Yönü</td>
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 600;">${firstG}</td>
            <td style="padding: 15px; border: 1px solid #ddd; font-weight: 600;">${lastG}</td>
        </tr>
    </tbody>
</table>
</div>

<h2 style="color: #333; margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Sıkça Sorulan Sorular (SSS)</h2>
<div style="margin-top: 20px;">
    <h4 style="color: #0056b3; margin-bottom: 5px;">1. ${stationName} istasyonundan ilk tren saat kaçta kalkıyor?</h4>
    <p style="margin-top: 0; color: #555;">${stationName} durağından Halkalı yönüne giden ilk tren <strong>${firstH}</strong> saatinde, Gebze yönüne giden ilk tren ise <strong>${firstG}</strong> saatinde hareket etmektedir.</p>

    <h4 style="color: #0056b3; margin-bottom: 5px; margin-top: 20px;">2. ${stationName} istasyonundan son tren saat kaçta geçiyor?</h4>
    <p style="margin-top: 0; color: #555;">Gece geç saatlerde seyahat edecekler için Halkalı yönüne son sefer <strong>${lastH}</strong>, Gebze yönüne ise <strong>${lastG}</strong> saatindedir. Cuma ve Cumartesi günleri ek seferler olabileceğini unutmayın.</p>

    <h4 style="color: #0056b3; margin-bottom: 5px; margin-top: 20px;">3. Sefer sıklığı nedir? Trenler kaç dakikada bir geliyor?</h4>
    <p style="margin-top: 0; color: #555;">Marmaray seferleri günün yoğun saatlerinde (sabah 07:00-09:00 ve akşam 16:00-19:00 arası) 8 dakikada bir düzenlenirken, diğer normal saatlerde standart olarak 15 dakikada bir sefer yapılmaktadır.</p>
</div>

<p style="margin-top: 30px; font-size: 14px; color: #777; border-top: 1px solid #eee; padding-top: 15px;"><em>Not: Bu sayfadaki <strong>${focusKeyword}</strong> verileri tamamen bilgilendirme amaçlıdır. TCDD'nin anlık operasyonel değişiklikleri, bakım çalışmaları veya arızalar sebebiyle sefer sürelerinde sapmalar yaşanabilir. Lütfen güncel duyuruları ve istasyon panolarını takip etmeyi ihmal etmeyin.</em></p>
`;
    return content;
};

const slugify = (text) => text.toLowerCase().replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

const blogPosts = [];

for (let i = 0; i < STATIONS.length; i++) {
    const station = STATIONS[i];
    const rawSlug = station.toLowerCase()
      .replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ç/g, 'c')
      .replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ı/g, 'i')
      .replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
      
    const imgFilename = `banner_${rawSlug}.png`;

    const weekday = getStationSchedule(station, 1); // Monday
    const weekend = getStationSchedule(station, 0); // Sunday

    const htmlContent = formatTimetableHTML(station, weekday, weekend, i);
    
    // SEO Data
    const focusKeyword = `${station} Marmaray İstasyonu Saatleri`;
    const title = focusKeyword;
    const seoDescription = `${station} Marmaray İstasyonu saatleri, güncel Halkalı ve Gebze yönü tren kalkış vakitleri. Hafta içi ve hafta sonu ${station} istasyonu sefer tarifesi tablosu.`;
    const altText = focusKeyword;
    const slug = slugify(focusKeyword);

    blogPosts.push({
        station: station,
        title: title,
        content: htmlContent,
        excerpt: seoDescription,
        seo_description: seoDescription,
        image_alt: altText,
        image_filename: imgFilename,
        slug: slug,
        focus_keyword: focusKeyword
    });
}

const outputPath = path.join(process.cwd(), 'wp-content', 'plugins', 'marmaray-core-v2', 'marmaray_blog_data.json');
fs.writeFileSync(outputPath, JSON.stringify(blogPosts, null, 2), 'utf8');
console.log('Successfully generated ' + outputPath + ' with 600+ word SEO content per station');
