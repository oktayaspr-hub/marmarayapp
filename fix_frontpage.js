const fs = require('fs');
let text = fs.readFileSync('wp-content/themes/marmaray-v2/front-page.php', 'utf8');

text = text.replace('style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px;"', 'class="station-picker-header-grid"');
text = text.replace('var(--primary)', 'var(--primary-color)');

fs.writeFileSync('wp-content/themes/marmaray-v2/front-page.php', text, 'utf8');
