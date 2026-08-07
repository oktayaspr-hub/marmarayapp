const fs = require('fs');
let c = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray-core.php', 'latin1');
// Instead of messing with latin1, I'll just do a global replace for the emails and titles since they are ascii

c = c.replace(/iletisim@marmarayapp\.com/g, 'destek@marmarayapp.com');
c = c.replace(/'title' => 'Sponsorluk',/g, "'title' => 'Reklam ve Sponsorluk',");
c = c.replace(/sponsorluk@marmarayapp\.com/g, 'info@marmarayapp.com');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/marmaray-core.php', c, 'latin1');
