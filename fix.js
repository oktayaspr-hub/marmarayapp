const fs = require('fs');
['wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'wp-content/plugins/marmaray-core-v2/assets/css/app.css'].forEach(file => {
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/mrt-/g, 'marmarayapp-');
    text = text.replace(/mrt__/g, 'marmarayapp__');
    text = text.replace(/mrt\b/g, 'marmarayapp');
    fs.writeFileSync(file, text, 'utf8');
});
console.log('Fixed classes');
