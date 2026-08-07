const fs = require('fs');

let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php', 'utf8');

content = content.replace(/<label>İstasyon Seçiniz<\/label>/g, '<label>İstasyon Seçiniz:</label>');

// Add zebra striping and white background to the CSS block
content = content.replace('.schedule-item:last-child { border-bottom: none; }', 
`.schedule-item:last-child { border-bottom: none; }
.schedule-list { max-height: 400px; overflow-y: auto; background: var(--panel-bg); }
.schedule-item:nth-child(even) { background: rgba(0, 0, 0, 0.03); }`);

// Replace header styles to use gradients
content = content.replace(/<div class="schedule-header">Halkalı Yönü<\/div>/, 
`<div class="schedule-header" style="background: linear-gradient(135deg, var(--accent-blue), #003d82);">Halkalı Yönü</div>`);

content = content.replace(/<div class="schedule-header" style="background:var\(--accent\)">Gebze Yönü<\/div>/, 
`<div class="schedule-header" style="background: linear-gradient(135deg, var(--accent), #990000);">Gebze Yönü</div>`);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php', content, 'utf8');
