const fs = require('fs');
let text = fs.readFileSync('wp-content/themes/marmaray-v2/front-page.php', 'utf8');

const map = {
    'Ä±': 'ı', 'Ä°': 'İ',
    'Ã§': 'ç', 'Ã‡': 'Ç',
    'ÅŸ': 'ş', 'Åž': 'Ş',
    'Ã¼': 'ü', 'Ãœ': 'Ü',
    'Ã¶': 'ö', 'Ã–': 'Ö',
    'ÄŸ': 'ğ', 'Äž': 'Ğ',
    'Ã¢': 'â', 'Ã®': 'î',
    'Krmz BaYlk Band': 'Kırmızı Başlık Bandı',
    'REKLAM VEREBLRSNZ.': 'REKLAM VEREBİLİRSİNİZ.',
    'BU ALANA REKLAM VEREBLRSNZ': 'BU ALANA REKLAM VEREBİLİRSİNİZ'
};

for (const [bad, good] of Object.entries(map)) {
    text = text.split(bad).join(good);
}

fs.writeFileSync('wp-content/themes/marmaray-v2/front-page.php', text, 'utf8');
console.log('Encoding fixed for front-page');
