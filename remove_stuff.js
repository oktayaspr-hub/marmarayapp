const fs = require('fs');
let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'utf8');

// 1. Remove h2 and update live badge
const oldHeader = \<div class="marmarayapp__topline">
                    <h2 class="marmarayapp__station">\</h2>
                    <div class="marmarayapp__live">
                        <div class="marmarayapp__pulse"></div> CANLI
                    </div>
                </div>\;
const newHeader = \<div class="marmarayapp__topline" style="justify-content: flex-end;">
                    <div class="live-badge-pill" id="global-live-badge" style="transform: scale(1.1); margin: 0;">
                        <span class="live-dot-anim"></span>
                        <span class="live-badge-label" style="font-weight: 800; letter-spacing: 1px;">CANLI</span>
                    </div>
                </div>\;
content = content.replace(oldHeader, newHeader);

// 2. Remove kalkış saati
const oldClock1 = \'<div class="marmarayapp-next__clock"><strong>' + first.timeStr + '</strong><span class="marmarayapp-next__sub">kalkıÅŸ saati</span></div>' +\;
const oldClock2 = \'<div class="marmarayapp-next__clock"><strong>' + first.timeStr + '</strong><span class="marmarayapp-next__sub">kalkış saati</span></div>' +\;
const oldClock3 = \'<div class="marmarayapp-next__clock"><strong>' + first.timeStr + '</strong><span class="marmarayapp-next__sub">kalkÃ½Ã¾ saati</span></div>' +\;
const newClock = \'<div class="marmarayapp-next__clock"><strong>' + first.timeStr + '</strong></div>' +\;

content = content.replace(oldClock1, newClock).replace(oldClock2, newClock).replace(oldClock3, newClock);
// In case of encoding weirdness
content = content.replace(/<span class="marmarayapp-next__sub">kalk.*?saati<\/span>/g, '');

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', content, 'utf8');
