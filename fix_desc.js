const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

content = content.replace('.step-desc { font-size: 1rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.5; }\n.step-desc { font-size: 0.95rem; color: var(--text-secondary); margin-top: 6px; font-weight: 500; line-height: 1.5; }', '.step-desc { font-size: 1rem; color: var(--text-secondary); margin-top: 6px; font-weight: 500; line-height: 1.5; }');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', content, 'utf8');
