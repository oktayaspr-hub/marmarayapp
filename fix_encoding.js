const fs = require('fs');
let text = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

const map = {
    'Ä±': 'ı', 'Ä°': 'İ',
    'Ã§': 'ç', 'Ã‡': 'Ç',
    'ÅŸ': 'ş', 'Åž': 'Ş',
    'Ã¼': 'ü', 'Ãœ': 'Ü',
    'Ã¶': 'ö', 'Ã–': 'Ö',
    'ÄŸ': 'ğ', 'Äž': 'Ğ',
    'Ã¢': 'â', 'Ã®': 'î'
};

for (const [bad, good] of Object.entries(map)) {
    text = text.split(bad).join(good);
}

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', text, 'utf8');
console.log('Encoding fixed');
