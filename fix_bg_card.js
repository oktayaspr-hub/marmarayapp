const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', 'utf8');

content = content.replace(/var\(--bg-card\)/g, 'var(--panel-bg)');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', content, 'utf8');
