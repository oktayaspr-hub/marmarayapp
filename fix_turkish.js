const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

const map = {
    'Åž': 'Ş', 'ÅŸ': 'ş',
    'Ã‡': 'Ç', 'Ã§': 'ç',
    'Ä°': 'İ', 'Ä±': 'ı',
    'Ã–': 'Ö', 'Ã¶': 'ö',
    'Ãœ': 'Ü', 'Ã¼': 'ü',
    'Äž': 'Ğ', 'ÄŸ': 'ğ'
};

for (const [bad, good] of Object.entries(map)) {
    content = content.split(bad).join(good);
}

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
