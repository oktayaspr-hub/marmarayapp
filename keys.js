const fs = require('fs');
const content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');
const match = content.match(/const DISTRICT_MAP = \{([\s\S]*?)\};\n/m);
if(match) {
    const keys = match[1].split('\n').filter(l => l.trim().startsWith('"')).map(l => l.split(':')[0].trim());
    console.log(keys);
}
