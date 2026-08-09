const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', 'utf8');

const oldStr = '.station-picker-header-grid { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; padding: 0 10%; margin-bottom: 25px; }';
const newStr = '.station-picker-header-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; gap: 20px; padding: 0; margin-bottom: 25px; }';

content = content.replace(oldStr, newStr);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', content, 'utf8');
