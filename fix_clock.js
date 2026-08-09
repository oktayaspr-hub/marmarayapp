const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'utf8');

// Replace everything inside marmarayapp-next__clock after </strong>
content = content.replace(/<div class="marmarayapp-next__clock"><strong>' \+ first\.timeStr \+ '<\/strong><span class="marmarayapp-next__sub">kalk.*?saati<\/span><\/div>' \+/g, 
  '<div class="marmarayapp-next__clock"><strong>\' + first.timeStr + \'</strong></div>\' +');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', content, 'utf8');
