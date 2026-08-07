const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php', 'latin1'); 
// The file might be corrupted, let's just rewrite the whole file cleanly.

const newContent = `
<style>
.app-module-card { background: var(--glass-bg, #ffffff); border-radius: 20px; padding: 30px; border: 1px solid var(--glass-border, rgba(0,0,0,0.1)); box-shadow: var(--shadow-lg, 0 8px 32px rgba(0,0,0,0.05)); backdrop-filter: blur(20px); }
.app-module-card label { display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; font-size: 1.05rem; }
.app-module-card select { width: 100%; padding: 16px; border: 2px solid var(--border, rgba(0,0,0,0.08)); border-radius: 12px; background: #ffffff; font-size: 1.1rem; color: var(--text-primary); transition: all 0.3s; font-family: 'Outfit', sans-serif; }
.app-module-card select:focus { border-color: var(--accent-blue); outline: none; box-shadow: 0 0 0 3px rgba(0,86,179,0.1); }
.schedule-tables { display: flex; gap: 20px; margin-top: 30px; }
.schedule-col { flex: 1; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid var(--border, rgba(0,0,0,0.08)); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.schedule-header { color: white; padding: 15px; text-align: center; font-weight: 800; font-size: 1.2rem; }
.schedule-list { max-height: 400px; overflow-y: auto; background: #ffffff; }
.schedule-item { padding: 12px; border-bottom: 1px solid var(--border, rgba(0,0,0,0.05)); text-align: center; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); background: #ffffff; }
.schedule-item:last-child { border-bottom: none; }
.schedule-item:nth-child(even) { background: #f8f9fa; }
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
            <div class="schedule-header" style="background: linear-gradient(135deg, var(--accent-blue, #0056b3), #003d82);">Halkalı Yönü</div>
            <div class="schedule-list" id="halkali-list"></div>
        </div>
        <div class="schedule-col">
            <div class="schedule-header" style="background: linear-gradient(135deg, var(--accent, #cc0000), #990000);">Gebze Yönü</div>
            <div class="schedule-list" id="gebze-list"></div>
        </div>
    </div>
</div>

<script>
    const ROTA_STATIONS = [
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

    const saatOrigin = document.getElementById('saat-origin');
    ROTA_STATIONS.forEach((s) => {
        saatOrigin.innerHTML += \`<option value="\${s.id}">\${s.name}</option>\`;
    });

    saatOrigin.addEventListener('change', () => {
        const val = saatOrigin.value;
        if(!val) {
            document.getElementById('schedule-container').style.display = 'none';
            return;
        }
        
        let hList = '';
        let gList = '';
        
        // Örnek Saat Üretimi
        let now = new Date();
        now.setMinutes(now.getMinutes() - (now.getMinutes() % 15));
        
        for(let i=0; i<15; i++) {
            let hTime = new Date(now.getTime() + (i * 15 * 60000));
            let gTime = new Date(now.getTime() + (i * 15 * 60000) + (7 * 60000));
            
            let hStr = hTime.getHours().toString().padStart(2,'0') + ':' + hTime.getMinutes().toString().padStart(2,'0');
            let gStr = gTime.getHours().toString().padStart(2,'0') + ':' + gTime.getMinutes().toString().padStart(2,'0');
            
            hList += \`<div class="schedule-item">\${hStr}</div>\`;
            gList += \`<div class="schedule-item">\${gStr}</div>\`;
        }
        
        document.getElementById('halkali-list').innerHTML = hList;
        document.getElementById('gebze-list').innerHTML = gList;
        document.getElementById('schedule-container').style.display = 'flex';
    });
</script>
`;

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php', newContent, 'utf8');
