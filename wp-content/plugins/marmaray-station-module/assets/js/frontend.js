(function() {
    'use strict';

    if (!window.msmSettings || !document.getElementById('marmarayapp-app-root')) return;

    const sData = window.msmSettings;
    const stations = sData.stations; // array of {id, name, offset}
    
    // Convert offsets to numbers
    stations.forEach(s => s.offset = parseInt(s.offset, 10) || 0);

    const getStationByIdx = (idx) => stations[idx];
    
    const LINGER_MINUTES = 45 / 60; // 45 seconds
    
    const snapToOffset = (estimatedMins, offset) => {
        const cycle = 15;
        const estMod = estimatedMins % cycle;
        let diff = offset - estMod;
        if (diff < -7.5) diff += cycle;
        if (diff > 7.5) diff -= cycle;
        return estimatedMins + diff;
    };

    // Train definitions
    // Main line: Halkalı (offset 0) to Gebze (offset 110)
    // Inner line: Ataköy (offset 17) to Pendik (offset 82)
    
    const getLiveTrainsForStation = (stationIdx, direction, date) => {
        const station = stations[stationIdx];
        const currentMinutes = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
        
        let upcoming = [];
        
        // Generate for a 4 hour window to handle day crossovers
        for (let hour = -1; hour <= 3; hour++) {
            let evalHour = date.getHours() + hour;
            let dayOffset = 0;
            if (evalHour < 0) { evalHour += 24; dayOffset = -24 * 60; }
            if (evalHour > 23) { evalHour -= 24; dayOffset = 24 * 60; }
            
            for (let min = 0; min < 60; min += 15) {
                // H2G Main (Leaves Halkalı at 0, 15, 30, 45)
                if (direction === 'H2G') {
                    // Main: Halkalı -> Gebze
                    let arrivalMins = evalHour * 60 + min + station.offset + dayOffset;
                    if (arrivalMins > currentMinutes - LINGER_MINUTES) {
                        upcoming.push({ arrival: arrivalMins, dest: 'Gebze' });
                    }
                    
                    // Inner 1: Ataköy -> Pendik (Leaves Ataköy at 8, 23, 38, 53)
                    if (stationIdx >= 7 && stationIdx <= 31) {
                        let innerStartMins = evalHour * 60 + min + 8 + dayOffset;
                        let travelTime = station.offset - 17; // Ataköy offset is 17
                        let innerArrival = innerStartMins + travelTime;
                        if (innerArrival > currentMinutes - LINGER_MINUTES) {
                            upcoming.push({ arrival: innerArrival, dest: 'Pendik' });
                        }
                    }
                    
                    // Inner 2: Zeytinburnu -> Maltepe (Leaves Zeytinburnu at 4, 19, 34, 49)
                    if (stationIdx >= 10 && stationIdx <= 25) {
                        let innerStartMins = evalHour * 60 + min + 4 + dayOffset;
                        let travelTime = station.offset - 24; // Zeytinburnu offset is 24
                        let innerArrival = innerStartMins + travelTime;
                        if (innerArrival > currentMinutes - LINGER_MINUTES) {
                            upcoming.push({ arrival: innerArrival, dest: 'Maltepe' });
                        }
                    }
                } 
                // G2H (Leaves Gebze at 0, 15, 30, 45)
                else {
                    // Main: Gebze -> Halkalı
                    let travelTimeFromGebze = 110 - station.offset;
                    let arrivalMins = evalHour * 60 + min + travelTimeFromGebze + dayOffset;
                    if (arrivalMins > currentMinutes - LINGER_MINUTES) {
                        upcoming.push({ arrival: arrivalMins, dest: 'Halkalı' });
                    }
                    
                    // Inner 1: Pendik -> Ataköy (Leaves Pendik at 8, 23, 38, 53)
                    if (stationIdx >= 7 && stationIdx <= 31) {
                        let innerStartMins = evalHour * 60 + min + 8 + dayOffset;
                        let travelTimeFromPendik = 82 - station.offset; // Pendik offset is 82
                        let innerArrival = innerStartMins + travelTimeFromPendik;
                        if (innerArrival > currentMinutes - LINGER_MINUTES) {
                            upcoming.push({ arrival: innerArrival, dest: 'Ataköy' });
                        }
                    }
                    
                    // Inner 2: Maltepe -> Zeytinburnu (Leaves Maltepe at 4, 19, 34, 49)
                    if (stationIdx >= 10 && stationIdx <= 25) {
                        let innerStartMins = evalHour * 60 + min + 4 + dayOffset;
                        let travelTimeFromMaltepe = 67 - station.offset; // Maltepe offset is 67
                        let innerArrival = innerStartMins + travelTimeFromMaltepe;
                        if (innerArrival > currentMinutes - LINGER_MINUTES) {
                            upcoming.push({ arrival: innerArrival, dest: 'Zeytinburnu' });
                        }
                    }
                }
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
