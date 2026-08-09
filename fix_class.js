const fs = require('fs');
let text = fs.readFileSync('wp-content/themes/marmaray-v2/front-page.php', 'utf8');

text = text.replace('class="station-picker-header" class="station-picker-header-grid"', 'class="station-picker-header station-picker-header-grid"');

fs.writeFileSync('wp-content/themes/marmaray-v2/front-page.php', text, 'utf8');
