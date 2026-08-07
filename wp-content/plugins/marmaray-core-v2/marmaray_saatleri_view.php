<style>
.app-module-card { background: var(--bg-card); border-radius: 20px; padding: 30px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.05); backdrop-filter: blur(10px); }
.app-module-card label { display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; font-size: 1.05rem; }
.app-module-card select { width: 100%; padding: 16px; border: 2px solid var(--border-color); border-radius: 12px; background: var(--bg-main); font-size: 1.1rem; color: var(--text-primary); transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.schedule-tables { display: flex; gap: 20px; margin-top: 30px; }
.schedule-col { flex: 1; background: var(--bg-main); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); }
.schedule-header { background: var(--accent-blue); color: white; padding: 15px; text-align: center; font-weight: 800; font-size: 1.2rem; }
.schedule-list { max-height: 400px; overflow-y: auto; padding: 10px; }
.schedule-item { padding: 12px; border-bottom: 1px solid var(--border-color); text-align: center; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
.schedule-item:last-child { border-bottom: none; }
.schedule-list { max-height: 400px; overflow-y: auto; background: var(--panel-bg); }
.schedule-item:nth-child(even) { background: rgba(0, 0, 0, 0.03); }
@media (max-width: 768px) { .schedule-tables { flex-direction: column; } }
</style>

<div class="app-module-card">
    <div class="input-group">
        <label>İstasyon Seçiniz:</label>
        <select id="saat-origin">
            <option value="">İstasyon Seçiniz...</option>
        </select>
    </div>
    
    <div class="schedule-tables" id="schedule-container" style="display:none;">
        <div class="schedule-col">
            <div class="schedule-header" style="background: linear-gradient(135deg, var(--accent-blue), #003d82);">Halkalı Yönü</div>
            <div class="schedule-list" id="halkali-list"></div>
        </div>
        <div class="schedule-col">
            <div class="schedule-header" style="background: linear-gradient(135deg, var(--accent), #990000);">Gebze Yönü</div>
            <div class="schedule-list" id="gebze-list"></div>
        </div>
    </div>
</div>

<script>
    const SAAT_STATIONS = [
      {id:'gebze',name:'Gebze'},{id:'darica',name:'Darıca'},{id:'osmangazi',name:'Osmangazi'},{id:'fatih',name:'Fatih'},{id:'cayirova',name:'Çayırova'},
      {id:'tuzla',name:'Tuzla'},{id:'icmeler',name:'İçmeler'},{id:'aydintepe',name:'Aydıntepe'},{id:'guzelyali',name:'Güzelyalı'},{id:'tersane',name:'Tersane'},
      {id:'kaynarca',name:'Kaynarca'},{id:'pendik',name:'Pendik'},{id:'yunus',name:'Yunus'},{id:'kartal',name:'Kartal'},{id:'basak',name:'Başak'},
      {id:'atalar',name:'Atalar'},{id:'cevizli',name:'Cevizli'},{id:'maltepe',name:'Maltepe'},{id:'sureyyaplaji',name:'Süreyya Plajı'},{id:'idealtepe',name:'İdealtepe'},
      {id:'kucukyali',name:'Küçükyalı'},{id:'bostanci',name:'Bostancı'},{id:'suadiye',name:'Suadiye'},{id:'erenkoy',name:'Erenköy'},{id:'goztepe',name:'Göztepe'},
      {id:'feneryolu',name:'Feneryolu'},{id:'sogutlucesme',name:'Söğütlüçeşme'},{id:'ayrilikcesmesi',name:'Ayrılıkçeşmesi'},{id:'uskudar',name:'Üsküdar'},{id:'sirkeci',name:'Sirkeci'},
      {id:'yenikapi',name:'Yenikapı'},{id:'kazlicesme',name:'Kazlıçeşme'},{id:'zeytinburnu',name:'Zeytinburnu'},{id:'yenimahalle',name:'Yenimahalle'},{id:'bakirkoy',name:'Bakırköy'},
      {id:'atakoy',name:'Ataköy'},{id:'yesilyurt',name:'Yeşilyurt'},{id:'yesilkoy',name:'Yeşilköy'},{id:'floryaakvaryum',name:'Florya Akvaryum'},{id:'florya',name:'Florya'},
      {id:'kucukcekmece',name:'Küçükçekmece'},{id:'mustafakemal',name:'Mustafa Kemal'},{id:'halkali',name:'Halkalı'}
    ];
    
    const originSel = document.getElementById('saat-origin');
    SAAT_STATIONS.forEach(s => {
        originSel.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
    
    originSel.addEventListener('change', () => {
        const id = originSel.value;
        if(!id) {
            document.getElementById('schedule-container').style.display = 'none';
            return;
        }
        
        const idx = SAAT_STATIONS.findIndex(s=>s.id === id);
        
        let halkaliHtml = '';
        let gebzeHtml = '';
        
        let baseTime = new Date();
        baseTime.setHours(6, 0, 0, 0);
        
        for(let i=0; i<72; i++) {
            let hTime = new Date(baseTime.getTime() + (i * 15 * 60000) + (idx * 3 * 60000));
            let gTime = new Date(baseTime.getTime() + (i * 15 * 60000) + ((42 - idx) * 3 * 60000));
            
            if(hTime.getHours() >= 6 && hTime.getHours() <= 23) {
                halkaliHtml += `<div class="schedule-item">${hTime.getHours().toString().padStart(2,'0')}:${hTime.getMinutes().toString().padStart(2,'0')}</div>`;
            }
            if(gTime.getHours() >= 6 && gTime.getHours() <= 23) {
                gebzeHtml += `<div class="schedule-item">${gTime.getHours().toString().padStart(2,'0')}:${gTime.getMinutes().toString().padStart(2,'0')}</div>`;
            }
        }
        
        if (idx === 0) halkaliHtml = `<div class="schedule-item">Son Durak</div>`;
        if (idx === 42) gebzeHtml = `<div class="schedule-item">Son Durak</div>`;
        
        document.getElementById('halkali-list').innerHTML = halkaliHtml;
        document.getElementById('gebze-list').innerHTML = gebzeHtml;
        document.getElementById('schedule-container').style.display = 'flex';
    });
</script>

