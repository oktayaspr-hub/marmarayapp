/**
 * Marmaray Live Board — Frontend JS (v2.3.1 "Peron")
 *
 * SUNUCU YÜKÜ KORUMASI:
 * - Tek, kendini-zamanlayan polling döngüsü (setInterval + serbest setTimeout
 *   birikmesi yok → "retry amplification" sızıntısı giderildi — kilitlenmelerin
 *   baş sebebiydi).
 * - Üstel backoff: hata oldukça aralık 60→120→240→300 sn'ye açılır.
 * - Arka plan sekmesi duraklatma (document.hidden) → boşuna istek yok.
 * - Devre kesici: ardışık N hatadan sonra durur, kullanıcıya "Yenile" sunar.
 * - Sefer yokken seyrek polling (5 dk).
 *
 * GÜVENLİK: Veri gizlidir. Her istek rotating endpoint id + nonce ile korunur;
 * nonce süresi dolarsa sayfa yenilemeden tazelenir (refresh). Yanıt cache'lenmez.
 */
(function () {
    'use strict';

    var isDev = location.hostname === 'localhost' ||
                location.hostname === '127.0.0.1' ||
                location.hostname.indexOf('staging') !== -1;

    // Zamanlama parametreleri (ms)
    var POLL_OK    = 60000;   // başarı: 60 sn
    var POLL_EMPTY = 300000;  // yaklaşan sefer yoksa: 5 dk
    var BACKOFF    = 60000;   // ilk hata aralığı
    var BACKOFF_MAX = 300000; // backoff tavanı: 5 dk
    var MAX_FAILS  = 5;       // bu kadar ardışık hatadan sonra dur

    function restBase() {
        return (window.marmarayConfig && window.marmarayConfig.restUrl) || '/wp-json/x7m/v1/';
    }

    // ---- Yardımcılar -------------------------------------------------------

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function fmtShort(m) {
        m = parseInt(m, 10) || 0;
        if (m < 60) return m + ' dk';
        var h = Math.floor(m / 60), r = m % 60;
        return r ? (h + ' sa ' + r + ' dk') : (h + ' sa');
    }

    var CLOCK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>';

    function countHtml(m) {
        m = parseInt(m, 10) || 0;
        if (m <= 0) {
            return '<div class="mrt-next__count">' +
                '<strong class="mrt-next__now">Şimdi</strong>' +
                '<span class="mrt-next__sub">peronda</span>' +
                '</div>';
        }
        if (m < 60) {
            return '<div class="mrt-next__count">' +
                '<strong>' + m + '<span class="mrt-next__unit">dk</span></strong>' +
                '<span class="mrt-next__sub">' + (m <= 2 ? 'yaklaşıyor' : 'sonra kalkıyor') + '</span>' +
                '</div>';
        }
        return '<div class="mrt-next__count mrt-next__count--long">' +
            '<strong>' + escapeHtml(fmtShort(m)) + '</strong>' +
            '<span class="mrt-next__sub">sonra kalkıyor</span>' +
            '</div>';
    }

    function buildTrainsHtml(trains) {
        if (!trains || !trains.length) {
            return emptyHtml('Şu anda yaklaşan sefer görünmüyor.', false);
        }

        var first = trains[0];
        var rest = trains.slice(1);
        var soon = (parseInt(first.m, 10) || 0) <= 2;

        var html = '<div class="mrt-next' + (soon ? ' is-soon' : '') + '">' +
            '<span class="mrt-next__tag">Sıradaki tren</span>' +
            '<div class="mrt-next__body">' +
            countHtml(first.m) +
            '<div class="mrt-next__clock"><strong>' + escapeHtml(first.t) + '</strong>' +
            '<span class="mrt-next__sub">kalkış saati</span></div>' +
            '</div>' +
            '<div class="mrt-next__dest">Son durak <b>' + escapeHtml(first.d) + '</b></div>' +
            '</div>';

        if (rest.length) {
            html += '<div class="mrt-rows__head">Sonraki seferler</div><ul class="mrt-rows">';
            rest.forEach(function (t) {
                html += '<li class="mrt-row">' +
                    '<span class="mrt-row__dest">' + escapeHtml(t.d) + '</span>' +
                    '<span class="mrt-row__min">' + escapeHtml(fmtShort(t.m)) + '</span>' +
                    '<span class="mrt-row__at">' + escapeHtml(t.t) + '</span>' +
                    '</li>';
            });
            html += '</ul>';
        }
        return html;
    }

    function emptyHtml(msg, isError) {
        return '<div class="mrt-empty' + (isError ? ' mrt-empty--error' : '') + '">' +
            CLOCK_SVG +
            '<p class="mrt-empty__txt">' + escapeHtml(msg) + '</p>' +
            '</div>';
    }

    function retryHtml(msg) {
        return '<div class="mrt-empty mrt-empty--error">' +
            CLOCK_SVG +
            '<p class="mrt-empty__txt">' + escapeHtml(msg) + '</p>' +
            '<button type="button" class="mrt-retry">Yenile</button>' +
            '</div>';
    }

    // ---- Bir board'u yönet -------------------------------------------------

    function initBoard(root) {
        if (root.dataset.mrtReady) return;
        root.dataset.mrtReady = '1';
        root.classList.add('mrt-js'); // mobilde tek-yön seçici CSS'ini etkinleştirir

        var station = root.dataset.station;
        var config;
        try {
            config = JSON.parse(root.dataset.config || '{}');
        } catch (e) {
            if (isDev) console.error('Marmaray: config parse hatası', e);
            return;
        }
        if (!config.h || !config.g) {
            if (isDev) console.warn('Marmaray: config eksik', station);
            return;
        }

        var containers = {
            h: root.querySelector('#halkali-trains'),
            g: root.querySelector('#gebze-trains')
        };
        var clockEl = root.querySelector('#mrt-current-time');

        var state = { h: [], g: [] };
        var clockTimer = null;
        var countdownTimer = null;
        var boundaryTimer = null;
        var pollTimer = null;        // tek bekleyen polling zamanlayıcısı
        var inFlight = false;
        var fails = 0;
        var stopped = false;         // devre kesici
        var refreshInFlight = null;  // eşzamanlı nonce yenilemeyi tekille

        function render(dir) {
            if (containers[dir]) containers[dir].innerHTML = buildTrainsHtml(state[dir]);
        }

        function updateClock() {
            if (!clockEl) return;
            var n = new Date();
            clockEl.textContent =
                String(n.getHours()).padStart(2, '0') + ':' +
                String(n.getMinutes()).padStart(2, '0') + ':' +
                String(n.getSeconds()).padStart(2, '0');
        }

        // Bağlantı sorununda mevcut saatleri silme; yalnızca ekran boşsa uyar
        function softError(dir, msg) {
            if (state[dir] && state[dir].length) return;
            if (containers[dir]) containers[dir].innerHTML = emptyHtml(msg, true);
        }

        // Nonce süresi dolduğunda sayfa yenilemeden yeni token al (tekil istek)
        function refreshNonce() {
            if (refreshInFlight) return refreshInFlight;
            refreshInFlight = fetch(restBase() + 'refresh', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ station: station })
            }).then(function (res) {
                return res.ok ? res.json() : false;
            }).then(function (data) {
                if (data && data.success && data.config) {
                    config.h = data.config.h;
                    config.g = data.config.g;
                    root.dataset.config = JSON.stringify(config);
                    return true;
                }
                return false;
            }).catch(function () {
                return false;
            }).then(function (result) {
                refreshInFlight = null;
                return result;
            });
            return refreshInFlight;
        }

        // Tek yön için veri çek; {ok, count} döner (asla reject etmez)
        function fetchDir(dir, isRetry) {
            var cfg = config[dir];
            if (!cfg) return Promise.resolve({ ok: false, count: 0 });

            return fetch(restBase() + 't/' + cfg.id + '?n=' + encodeURIComponent(cfg.n), {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            }).then(function (res) {
                // Nonce süresi dolmuş → bir kez yenile ve tekrar dene
                if (res.status === 403 && !isRetry) {
                    return refreshNonce().then(function (ok) {
                        return ok ? fetchDir(dir, true) : { ok: false, count: 0 };
                    });
                }
                if (!res.ok) throw new Error('API ' + res.status);
                return res.json().then(function (data) {
                    if (data && data.s && data.tr) {
                        state[dir] = data.tr;
                        render(dir);
                        return { ok: true, count: data.tr.length };
                    }
                    return { ok: true, count: 0 };
                });
            }).catch(function (err) {
                if (isDev) console.error('Marmaray: güncelleme hatası', dir, err);
                softError(dir, 'Bağlantı sorunu, tekrar denenecek…');
                return { ok: false, count: 0 };
            });
        }

        // Sonraki turu zamanla (her zaman tek bekleyen zamanlayıcı)
        function schedule(delay) {
            clearTimeout(pollTimer);
            if (stopped) return;
            pollTimer = setTimeout(cycle, delay);
        }

        // Bir polling turu (iki yön birlikte)
        function cycle() {
            if (stopped) return;
            // Arka plan sekmesinde istek atma; hafif nabız bırak
            if (document.hidden) { schedule(POLL_OK); return; }
            if (inFlight) return;
            inFlight = true;

            Promise.all([fetchDir('h'), fetchDir('g')]).then(function (r) {
                inFlight = false;
                var allOk = r[0].ok && r[1].ok;

                if (allOk) {
                    fails = 0;
                    var hasTrains = r[0].count > 0 || r[1].count > 0;
                    schedule(hasTrains ? POLL_OK : POLL_EMPTY);
                } else {
                    fails++;
                    if (fails >= MAX_FAILS) { trip(); return; }
                    schedule(Math.min(BACKOFF_MAX, BACKOFF * Math.pow(2, fails - 1)));
                }
            });
        }

        // Devre kesici: dur ve kullanıcıya "Yenile" sun
        function trip() {
            stopped = true;
            ['h', 'g'].forEach(function (dir) {
                if (state[dir] && state[dir].length) return; // veri varsa dokunma
                var c = containers[dir];
                if (!c) return;
                c.innerHTML = retryHtml('Saatler şu an alınamıyor.');
                var btn = c.querySelector('.mrt-retry');
                if (btn) btn.addEventListener('click', function () {
                    stopped = false;
                    fails = 0;
                    schedule(0);
                });
            });
        }

        function decrement() {
            ['h', 'g'].forEach(function (dir) {
                state[dir].forEach(function (t) {
                    var m = parseInt(t.m, 10) || 0;
                    if (m > 0) t.m = m - 1;
                });
                render(dir);
            });
        }

        function cleanup() {
            clearInterval(clockTimer);
            clearInterval(countdownTimer);
            clearTimeout(boundaryTimer);
            clearTimeout(pollTimer);
        }

        // İstasyon seçici (yalnızca selector versiyonunda)
        var select = root.querySelector('#mrt-station-select');
        if (select) {
            select.addEventListener('change', function () {
                var url = new URL(window.location.href);
                url.searchParams.set('station', this.value);
                window.location.href = url.toString();
            });
        }

        // Mobil yön seçici (alan tasarrufu): aynı anda tek yön göster
        var toggleBtns = root.querySelectorAll('.mrt__toggle-btn');
        toggleBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var dir = btn.dataset.dir;
                toggleBtns.forEach(function (b) {
                    b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
                });
                var h = root.querySelector('.mrt__dir--h');
                var g = root.querySelector('.mrt__dir--g');
                if (h) h.classList.toggle('is-active', dir === 'h');
                if (g) g.classList.toggle('is-active', dir === 'g');
            });
        });

        // Sekme tekrar görünür olduğunda hemen tazele (durmadıysa)
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden && !stopped) schedule(0);
        });

        // Saat: her saniye
        updateClock();
        clockTimer = setInterval(updateClock, 1000);

        // Geri sayım: dakikanın tam başına senkron (yalnızca istemci, istek yok)
        boundaryTimer = setTimeout(function () {
            decrement();
            countdownTimer = setInterval(decrement, 60000);
        }, (60 - new Date().getSeconds()) * 1000);

        // İlk polling turunu hemen başlat
        schedule(0);

        window.addEventListener('beforeunload', cleanup);

        if (isDev) console.log('Marmaray Live aktif:', station);
    }

    function initAll() {
        document.querySelectorAll('.mrt').forEach(initBoard);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
