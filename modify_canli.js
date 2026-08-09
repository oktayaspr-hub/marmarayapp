const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'utf8');

content = content.replace(
  '<div class="live-badge-pill" style="transform: scale(0.9); margin: 0; padding: 4px 12px; height: 28px;">',
  '<div class="live-badge-pill" style="transform: scale(0.9); margin: 0; padding: 4px 12px; height: 28px; background: white; border-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', content, 'utf8');
