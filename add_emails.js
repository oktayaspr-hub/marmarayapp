const fs = require('fs');
let c = fs.readFileSync('wp-content/themes/marmaray-v2/footer.php', 'latin1');
c = c.replace('<a href="<?php echo esc_url( home_url( \'/sponsorluk\' ) ); ?>">Sponsorluk</a>', '<a href="<?php echo esc_url( home_url( \'/sponsorluk\' ) ); ?>">Sponsorluk</a>\n                <div style="margin-top: 15px; font-size: 0.9rem;">\n                    <a href="mailto:iletisim@marmarayapp.com" style="display:block; margin-bottom:5px; opacity:0.8;">iletisim@marmarayapp.com</a>\n                    <a href="mailto:reklam@marmarayapp.com" style="display:block; opacity:0.8;">reklam@marmarayapp.com</a>\n                </div>');
fs.writeFileSync('wp-content/themes/marmaray-v2/footer.php', c, 'latin1');
