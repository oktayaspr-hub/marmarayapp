(function() {
    'use strict';

    if (!window.msmSettings || !document.getElementById('marmarayapp-app-root')) return;

    const sData = window.msmSettings;
    const stations = sData.stations; // array of {id, name, offset}
    
    // Convert offsets to numbers
    stations.forEach(s => s.offset = parseInt(s.offset, 10) || 0);

    const getStationByIdx = (idx) => stations[idx];
    
    const LINGER_MINUTES = 45 / 60; // 45 seconds
    
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
            const startShort_G = 6 * 60 + 9;
            const endShort_G = 21 * 60 + 54;
            for (let m = startShort_G; m <= endShort_G; m += 15) {
                runs.push({ depMinutes: m, destination: "Pendik", originId: 8, isIntermediate: true }); 
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
            const startShort_H = 6 * 60 + 9;
            const endShort_H = 22 * 60 + 39;
            for (let m = startShort_H; m <= endShort_H; m += 15) {
                const destination = (m > 20 * 60 + 50) ? "Zeytinburnu" : "Ataköy";
                runs.push({ depMinutes: m, destination: destination, originId: 32, isIntermediate: true }); 
            }
        }
        return runs.sort((a, b) => a.depMinutes - b.depMinutes);
    };

    const getLiveTrainsForStation = (stationIdx, direction, date) => {
        const station = stations[stationIdx];
        if (!station) return [];
        
        const apkDirection = direction === 'G2H' ? 'Halkalı' : 'Gebze';
        const currentMinutes = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
        
        const currentDay = date.getDay();
        const yesterday = (currentDay + 6) % 7;
        const tomorrow = (currentDay + 1) % 7;

        const allRuns = [
            ...getCalendarDayTrainRuns(yesterday, apkDirection).map(r => ({ ...r, depMinutes: r.depMinutes - 24 * 60 })),
            ...getCalendarDayTrainRuns(currentDay, apkDirection),
            ...getCalendarDayTrainRuns(tomorrow, apkDirection).map(r => ({ ...r, depMinutes: r.depMinutes + 24 * 60 })),
        ];

        let upcoming = [];
        
        for (const run of allRuns) {
            let estimatedTravelTime = 0;
            const originStation = stations.find(s => parseInt(s.id, 10) === run.originId);
            if (!originStation) continue;
            const originIndex = stations.indexOf(originStation);
            
            if (apkDirection === 'Gebze') {
                if (stationIdx < originIndex) continue;
                const destStation = stations.find(s => s.name === run.destination);
                const destIndex = destStation ? stations.indexOf(destStation) : -1;
                if (stationIdx > destIndex && destIndex !== -1) continue;
                
                estimatedTravelTime = station.offset - originStation.offset;
            } else {
                if (stationIdx > originIndex) continue;
                const destStation = stations.find(s => s.name === run.destination);
                const destIndex = destStation ? stations.indexOf(destStation) : -1;
                if (stationIdx < destIndex && destIndex !== -1) continue;
                
                estimatedTravelTime = originStation.offset - station.offset;
            }
            
            const estimatedArrival = run.depMinutes + estimatedTravelTime;
            let actualArrival = estimatedArrival;
            
            // Try to find official offset if it exists (legacy compatibility)
            const OFFSETS_H = {"2":5,"3":2,"4":14,"5":12,"6":9,"7":7,"8":4,"9":2,"10":0,"11":12,"12":10,"13":6,"14":3,"15":14,"16":10,"17":7,"18":4,"19":2,"20":0,"21":12,"22":10,"23":7,"24":5,"25":3,"26":1,"27":13,"28":11,"29":9,"30":7,"31":4,"32":1,"33":13,"34":11,"35":9,"36":7,"37":5,"38":2,"39":13,"40":11,"41":9,"42":7,"43":5};
            const OFFSETS_G = {"1":13,"2":1,"3":3,"4":6,"5":8,"6":11,"7":13,"8":1,"9":4,"10":6,"11":9,"12":11,"13":0,"14":3,"15":7,"16":11,"17":14,"18":1,"19":3,"20":5,"21":8,"22":10,"23":13,"24":0,"25":2,"26":4,"27":7,"28":9,"29":11,"30":13,"31":1,"32":4,"33":7,"34":9,"35":11,"36":13,"37":0,"38":3,"39":6,"40":9,"41":11,"42":13};
            
            const baseOffset = apkDirection === 'Gebze' ? OFFSETS_G[String(station.id)] : OFFSETS_H[String(station.id)];
            
            if (baseOffset !== undefined) {
                let trainOffset = baseOffset;
                if (run.isIntermediate) {
                    trainOffset = (baseOffset + 8) % 15;
                }
                actualArrival = snapToOffset(estimatedArrival, trainOffset);
            }
            
            if (actualArrival > currentMinutes - LINGER_MINUTES) {
                upcoming.push({ arrival: actualArrival, dest: run.destination });
            }
        }
        
        upcoming.sort((a, b) => a.arrival - b.arrival);
        
        // Return next 5
        let results = [];
        for (let i = 0; i < Math.min(5, upcoming.length); i++) {
            let arr = upcoming[i].arrival;
            results.push({
                destination: upcoming[i].dest,
                arrivalMinutes: arr,
                remainingMin: arr - currentMinutes,
                timeStr: String(Math.floor(arr / 60) % 24).padStart(2, '0') + ':' + String(Math.floor(arr % 60)).padStart(2, '0')
            });
        }
        return results;
    };

    const getNextTrains = (stationIdx, direction) => {
        const now = new Date();
        return getLiveTrainsForStation(stationIdx, direction, now);
    };

    const countHtml = (m) => {
        if (m <= 0) {
            // PERONDA
            return `<div class="marmarayapp-next__count" style="background:${sData.color_at_station_bg}; color:${sData.color_at_station_text};">
                <strong class="marmarayapp-next__now" style="color:${sData.color_at_station_text}">${sData.text_at_station}</strong>
                <span class="marmarayapp-next__sub" style="color:${sData.color_at_station_text}; opacity:0.8;">şu an</span>
            </div>`;
        }
        if (m <= 2) {
            // YAKLAŞIYOR
            const mCeil = Math.ceil(m);
            return `<div class="marmarayapp-next__count" style="background:${sData.color_approaching_bg}; color:${sData.color_approaching_text};">
                <strong style="color:${sData.color_approaching_text}">${mCeil}<span class="marmarayapp-next__unit" style="color:${sData.color_approaching_text}">dk</span></strong>
                <span class="marmarayapp-next__sub" style="color:${sData.color_approaching_text}">${sData.text_approaching}</span>
            </div>`;
        }
        // NORMAL SÜRE
        const mCeil = Math.ceil(m);
        return `<div class="marmarayapp-next__count">
            <strong>${mCeil}<span class="marmarayapp-next__unit">dk</span></strong>
            <span class="marmarayapp-next__sub">sonra kalkıyor</span>
        </div>`;
    };

    const buildTrainsHtml = (trains, dirName) => {
        if (!trains || !trains.length) {
            return `<div class="marmarayapp-empty">Şu anda yaklaşan sefer görünmüyor.</div>`;
        }
        const first = trains[0];
        const rest = trains.slice(1);
        
        let color = dirName === 'Halkalı Yönü' ? '#e03131' : '#1971c2'; // Varsayılan renkler

        let html = `
            <div class="marmarayapp-next" style="border-left-color: ${color}">
                <div class="marmarayapp-next__info">
                    <div class="marmarayapp-next__dest">${first.destination}</div>
                    <div class="marmarayapp-next__time">${first.timeStr}</div>
                </div>
                ${countHtml(first.remainingMin)}
            </div>
            <div class="marmarayapp-next__dest-text">Son durak <strong>${first.destination}</strong></div>
        `;

        if (rest.length > 0) {
            html += `<div class="marmarayapp-rows__head">SONRAKİ SEFERLER</div><ul class="marmarayapp-rows">`;
            rest.forEach(t => {
                let status = '';
                if (t.remainingMin <= 0) {
                    status = sData.text_at_station;
                } else if (t.remainingMin <= 2) {
                    status = `${Math.ceil(t.remainingMin)} dk ${sData.text_approaching}`;
                } else {
                    status = `${Math.ceil(t.remainingMin)} dk`;
                }
                
                html += `<li class="marmarayapp-row">
                    <span class="marmarayapp-row__dest">${t.destination}</span>
                    <span class="marmarayapp-row__min">${status}</span>
                    <span class="marmarayapp-row__at">${t.timeStr}</span>
                </li>`;
            });
            html += `</ul>`;
        }
        return html;
    };

    let selectedIdx = null;

    const renderStationCards = (idx) => {
        const h2g = getNextTrains(idx, 'H2G');
        const g2h = getNextTrains(idx, 'G2H');

        const redBody = document.getElementById('card-red-body');
        const blueBody = document.getElementById('card-blue-body');

        if (redBody) redBody.innerHTML = buildTrainsHtml(g2h, 'Halkalı Yönü');
        if (blueBody) blueBody.innerHTML = buildTrainsHtml(h2g, 'Gebze Yönü');
    };

    const init = () => {
        const select = document.getElementById('marmarayapp-station-select');
        if (!select) return;

        // Populate select using dynamic stations
        select.innerHTML = '<option value="" disabled selected>Biniş İstasyonu Seçin</option>';
        stations.forEach((st, idx) => {
            let opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = st.name;
            select.appendChild(opt);
        });

        select.addEventListener('change', (e) => {
            selectedIdx = parseInt(e.target.value, 10);
            renderStationCards(selectedIdx);
        });

        // Set initial selection if exists in query or localStorage
        let initIdx = 16; // Söğütlüçeşme default
        select.value = initIdx;
        selectedIdx = initIdx;
        renderStationCards(selectedIdx);

        setInterval(() => {
            if (selectedIdx !== null) {
                renderStationCards(selectedIdx);
            }
        }, 1000);
    };

    document.addEventListener('DOMContentLoaded', init);

})();
