const fs = require('fs');
let text = fs.readFileSync('wp-content/themes/marmaray-v2/front-page.php', 'utf8');

const regex = /<div class="ad-slot">[\s\S]*?<\/div>/g;
const replacement = \<div class="ad-slot" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 20px;">
            <strong style="font-size: 1.6rem; font-weight: 800;">SPONSORLU REKLAM ALANI</strong>
            <span style="font-size: 1.1rem; font-weight: 300; letter-spacing: 2px;">BU ALANA REKLAM VEREBİLİRSİNİZ</span>
        </div>\;

text = text.replace(regex, replacement);

fs.writeFileSync('wp-content/themes/marmaray-v2/front-page.php', text, 'utf8');
console.log('Ads fixed');
