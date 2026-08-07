<?php
/**
 * Front Page Template
 */
get_header(); ?>

    <!-- ===================== LIVE ANNOUNCEMENT BANNER ===================== -->
    <div class="announcement-banner">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" style="font-weight: bold;">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
        </svg>
        <marquee scrollamount="4" style="max-width:800px;">
            <strong style="font-weight:900;">Duyuru:</strong> Tren hızı, istasyon trafiği ve yolcu yoğunluğuna bağlı olarak sefer saatlerinde mikro farklılıklar olabilir. İyi yolculuklar dileriz.
        </marquee>
    </div>

    <!-- ===================== MAIN ===================== -->
    <main class="app-main">
        
        <!-- İSTASYON SEÇİCİ & CANLI SAAT -->
        <div class="station-picker-section">
            <div class="station-picker-header">
                <div class="picker-left">
                    <label for="station-dropdown">
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                       <label for="station-dropdown">İstasyon Seçin:</label>
                    <select class="station-dropdown" id="station-dropdown">
                        <option value="">Durak Seçiniz</option>
                    </select>
                </div>
                <div class="live-badge-pill" id="global-live-badge">
                    <span class="live-dot"></span> CANLI
                </div>
                <div class="map-live-info" id="live-time">
                    <div class="tcdd-logos">
                        <img src="<?php echo esc_url( plugins_url( 'assets/images/tc_ulastirma_bakanligi_logo.png', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>" alt="TC Ulaştırma Bakanlığı">
                        <img src="<?php echo esc_url( plugins_url( 'assets/images/tcdd_logo.png', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>" alt="TCDD">
                    </div>
                    <span id="current-date-time">--.--.---- --:--:--</span>
                </div>
                <div class="map-destination-badge" id="map-dest-badge">
                    İSTEDİĞİNİZ TRENE TIKLAYINIZ
                </div>
            </div>

            <!-- SEFERLER TABLOSU -->
            <div class="departures-board" id="departures-board">
                <div class="board-header">
                    <div class="col-time">Zaman</div>
                    <div class="col-dest">Yön</div>
                    <div class="col-countdown">Kalan</div>
                </div>
                <div class="board-body" id="board-body">
                    <!-- İstasyon seçilmediğinde varsayılan mesaj -->
                    <div class="empty-state">Lütfen seferleri görüntülemek için bir istasyon seçin.</div>
                </div>
            </div>
        </div>

        <div class="ad-slot">
            REKLAM ALANI (BU ALANA REKLAM VEREBİLİRSİNİZ.)
        </div>

        <!-- YENİ İNTERAKTİF HARİTA (SVG) -->
        <div class="transfer-section">
            <h2 class="section-title">Canlı Marmaray Haritası</h2>
            <div class="interactive-map-container" id="interactive-map-container">
                <div class="map-loading" id="map-loading">Harita Yükleniyor...</div>
                
                <svg id="marmaray-svg-map" width="100%" height="100%"></svg>
                
                <!-- Station Hover Tooltip -->
                <div class="station-tooltip" id="station-tooltip">
                    <div class="tooltip-name" id="tooltip-name">İstasyon</div>
                    <div class="tooltip-dirs">
                        <span class="tooltip-dir blue-dir" id="tooltip-halkali">← Halkalı: -- dk</span>
                        <span class="tooltip-dir red-dir" id="tooltip-gebze">Gebze: -- dk →</span>
                    </div>
                </div>
                <!-- Train Click Popup -->
                <div class="train-popup" id="train-popup">
                    <button class="train-popup-close" id="train-popup-close">✕</button>
                    <div class="train-popup-body" id="train-popup-body">
                        <!-- Doldurulacak -->
                    </div>
                </div>
            </div>
        </div>

        <!-- GÜZERGAH HATTI ALT HARİTA - TÜM 43 DURAK -->
        <div class="transfer-section">
            <h2 class="section-title">Marmaray Güzergah Hattı</h2>
            <div class="transfer-map-scroll" id="transfer-map-scroll">
                <div class="transfer-stations-row" id="transfer-row">
                    <!-- JS ile doldurulur -->
                </div>
            </div>
        </div>

        <!-- İSTANBUL HIZLI ULAŞIM SİSTEMİ HARİTASI -->
        <div class="transfer-section">
            <h2 class="section-title">İstanbul Hızlı Ulaşım Sistemi</h2>
            <div class="map-wrapper" id="istanbul-map-wrapper" style="height: 600px; background: white; border-radius: 8px; overflow: hidden; position: relative; cursor: grab;">
                <div id="istanbul-map-scale" style="width: 100%; height: 100%; transform-origin: top left; display: flex; align-items: center; justify-content: center;">
                    <img src="<?php echo esc_url( plugins_url( 'assets/images/istanbul-hizli-ulasim-agi.png', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>" alt="İstanbul Hızlı Ulaşım Sistemi Haritası" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" id="istanbul-map-img">
                </div>
                <div class="map-controls" style="position: absolute; bottom: 15px; right: 15px;">
                    <button class="map-ctrl-btn" id="ist-zoom-out" title="Uzaklaştır">−</button>
                    <button class="map-ctrl-btn" id="ist-zoom-reset" title="Sıfırla">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                    </button>
                    <button class="map-ctrl-btn" id="ist-zoom-in" title="Yakınlaştır">+</button>
                </div>
            </div>
        </div>

        <div class="ad-slot">
            REKLAM ALANI (BU ALANA REKLAM VEREBİLİRSİNİZ.)
        </div>

    </main>

<?php get_footer(); ?>
