const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'utf8');

// Remove CANLI badge from Halkalı Yönü
content = content.replace(
    '<div class="live-badge-pill" style="transform: scale(0.9); margin: 0; padding: 4px 12px; height: 28px; background: white; border-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">\n                            <span class="live-dot-anim"></span>\n                            <span class="live-badge-label" style="font-weight: 800; letter-spacing: 1px;">CANLI</span>\n                        </div>',
    ''
);

// Remove CANLI badge from Gebze Yönü
content = content.replace(
    '<div class="live-badge-pill" style="transform: scale(0.9); margin: 0; padding: 4px 12px; height: 28px; background: white; border-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">\n                            <span class="live-dot-anim"></span>\n                            <span class="live-badge-label" style="font-weight: 800; letter-spacing: 1px;">CANLI</span>\n                        </div>',
    ''
);

// Make Yenikapi default and load it initially
// Find DOMContentLoaded block
const initStr = 'document.addEventListener("DOMContentLoaded", () => {';
const initReplacement = 'document.addEventListener("DOMContentLoaded", () => {\n    if(dropdown) { dropdown.value = "Yenikapı"; setTimeout(() => { dropdown.dispatchEvent(new Event("change")); }, 100); }';
content = content.replace(initStr, initReplacement);

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', content, 'utf8');
