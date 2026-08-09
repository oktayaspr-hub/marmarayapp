const fs = require('fs');
let text = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');
text = text.replace(/Åž/g, 'Ş');
text = text.replace(/ÅŸ/g, 'ş');
fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', text, 'utf8');
