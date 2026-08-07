const fs = require('fs');

let content = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', 'utf8');

const newRender = \  const renderStationCards = (idx) => {
    const el = document.getElementById('station-cards');
    if (!el) return;
    const name = STATIONS[idx];
    const g2h = getNextTrains(idx, 'G2H');
    const h2g = getNextTrains(idx, 'H2G');

    const fmtShort = (m) => {
        m = parseInt(m, 10) || 0;
        if (m < 60) return m + ' dk';
        const h = Math.floor(m / 60), r = m % 60;
        return r ? (h + ' sa ' + r + ' dk') : (h + ' sa');
    };

    const countHtml = (m) => {
        m = parseInt(m, 10) || 0;
        if (m <= 0) {
            return '<div class="mrt-next__count"><strong class="mrt-next__now">Þimdi</strong><span class="mrt-next__sub">peronda</span></div>';
        }
        if (m < 60) {
            return '<div class="mrt-next__count"><strong>' + m + '<span class="mrt-next__unit">dk</span></strong><span class="mrt-next__sub">' + (m <= 2 ? 'yaklaþýyor' : 'sonra kalkýyor') + '</span></div>';
        }
        return '<div class="mrt-next__count mrt-next__count--long"><strong>' + fmtShort(m) + '</strong><span class="mrt-next__sub">sonra kalkýyor</span></div>';
    };

    const buildTrainsHtml = (trains) => {
        if (!trains || !trains.length) {
            return '<div class="mrt-empty mrt-empty--error"><p class="mrt-empty__txt">Þu anda yaklaþan sefer görünmüyor.</p></div>';
        }
        const first = trains[0];
        const rest = trains.slice(1);
        const soon = (parseInt(first.remainingMin, 10) || 0) <= 2;
        let html = '<div class="mrt-next' + (soon ? ' is-soon' : '') + '">' +
            '<span class="mrt-next__tag">Sýradaki tren</span>' +
            '<div class="mrt-next__body">' +
            countHtml(first.remainingMin) +
            '<div class="mrt-next__clock"><strong>' + first.timeStr + '</strong><span class="mrt-next__sub">kalkýþ saati</span></div>' +
            '</div>' +
            '<div class="mrt-next__dest">Son durak <b>' + first.destination + '</b></div>' +
            '</div>';
        if (rest.length) {
            html += '<div class="mrt-rows__head">Sonraki seferler</div><ul class="mrt-rows">';
            rest.forEach(t => {
                html += '<li class="mrt-row">' +
                    '<span class="mrt-row__dest">' + t.destination + '</span>' +
                    '<span class="mrt-row__min">' + fmtShort(t.remainingMin) + '</span>' +
                    '<span class="mrt-row__at">' + t.timeStr + '</span>' +
                    '</li>';
            });
            html += '</ul>';
        }
        return html;
    };

    el.innerHTML = \<div class="mrt" style="margin-top: 20px;">
        <div class="mrt__panel">
            <div class="mrt__head" style="border-bottom: 0;">
                <div class="mrt__topline">
                    <h2 class="mrt__station">\</h2>
                    <div class="mrt__live">
                        <div class="mrt__pulse"></div> CANLI
                    </div>
                </div>
            </div>
            <div class="mrt__grid">
                <div class="mrt__dir mrt__dir--h">
                    <div class="mrt__dirhead">
                        <svg class="mrt__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <div class="mrt__dirname">Halkalý Yönü</div>
                    </div>
                    <div class="mrt__list" id="halkali-trains">
                        \
                    </div>
                </div>
                <div class="mrt__dir mrt__dir--g">
                    <div class="mrt__dirhead">
                        <div class="mrt__dirname">Gebze Yönü</div>
                        <svg class="mrt__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <div class="mrt__list" id="gebze-trains">
                        \
                    </div>
                </div>
            </div>
        </div>
    </div>\;
    el.style.display = 'block';

    document.querySelectorAll('.station-node').forEach(n=>n.classList.remove('station-selected'));
    document.getElementById(\stn-\\)?.classList.add('station-selected');

    const globalLive = document.getElementById('global-live-badge');
    if (globalLive) globalLive.style.display = 'none';
  };
\

const regex = /const renderStationCards = \([^]*?globalLive\.style\.display = 'none';\n  };/g;

content = content.replace(regex, newRender.trim());

fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/js/app.js', content, 'utf8');
console.log('Done!');
