<?php
/**
 * Front Page Template
 */
get_header(); ?>

    <!-- ===================== MAIN ===================== -->
    <main class="app-container">

        <!-- HERO -->
        <div class="hero">
            <h1>Marmaray <span class="highlight">CanlÄ± Takip</span> Panosu</h1>
            <p class="subtitle">
                TÃ¼m duraklar iÃ§in anlÄ±k tren kalkÄ±ÅŸ saatleri ve gÃ¼zergah durumu.
                Durak seÃ§erek HalkalÄ± ve Gebze yÃ¶nÃ¼ saatlerini gÃ¶rÃ¼n.
            </p>
        </div>

        <!-- Ä°STASYON SEÃ‡Ä°CÄ° & KARTLAR (haritanÄ±n Ã¼stÃ¼nde) -->
        <div class="station-picker-section">
            <div class="station-picker-header">
                <div class="picker-left">
                    <label for="station-select">
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                       <label for="station-dropdown">Ä°stasyon SeÃ§in:</label>
                    <select class="station-dropdown" id="station-dropdown">
                        <option value="">Durak SeÃ§iniz</option>
                    </select>
                </div>
                <div class="live-badge-pill" id="global-live-badge">
                    <span class="live-dot-anim"></span>
                    <span class="live-badge-label">CANLI</span>
                </div>
            </div>
            <div id="station-cards" style="display:none;"></div>
        </div>

        <div class="ad-slot">
            REKLAM ALANI (BU ALANA REKLAM VEREBÄ°LÄ°RSÄ°NÄ°Z.)
        </div>


        <!-- ===================== S-MAP GLASS PANEL ===================== -->
        <div class="map-glass-panel">

            <!-- TCDD KÄ±rmÄ±zÄ± BaÅŸlÄ±k BandÄ± -->
            <div class="map-tcdd-header">
                <div class="tcdd-logos">
                    <img src="/wp-content/plugins/marmaray-core-v2/assets/images/trainx.png" alt="TrainX Logo" onerror="this.style.display='none'" style="max-height: 40px; margin-left: 10px; filter: invert(1) brightness(2); mix-blend-mode: screen;">
                </div>
                <div class="map-live-info" style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.4;">
                    <span id="current-date" style="display: flex; align-items: center; gap: 6px;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span id="current-date-val">--.--.----</span>
                    </span>
                    <span id="current-time" style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span id="current-time-val">--:--:--</span>
                    </span>
                </div>
                <div class="map-destination-badge" id="map-dest-badge">
                    CANLI MARMARAY TAKÄ°BÄ°
                </div>
            </div>

            <!-- Harita hint + zoom kontrolÃ¼ -->
            <div class="map-hint-bar">
                <span style="display: flex; align-items: center;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Ä°stasyona tÄ±klayarak veya aÅŸaÄŸÄ±dan seÃ§erek seferleri gÃ¶rÃ¼ntÃ¼leyin.
                </span>
                <span class="legend-item"><span class="legend-dot red-dot"></span> Gebze YÃ¶nÃ¼</span>
                <span class="legend-item"><span class="legend-dot blue-dot"></span> HalkalÄ±Ä± YÃ¶nÃ¼</span>
            </div>

            <!-- S-Åekilli Harita (zoom/pan destekli) -->
            <div class="map-wrapper" id="map-wrapper">
                <div id="marmaray-map-scale">
                    <div id="marmaray-map"></div>
                </div>
                <!-- Station Hover Tooltip -->
                <div class="station-tooltip" id="station-tooltip">
                    <div class="tooltip-name" id="tooltip-name">Ä°stasyon</div>
                    <div class="tooltip-dirs">
                        <span class="tooltip-dir blue-dir" id="tooltip-halkali">â† HalkalÄ±Ä±: -- dk</span>
                        <span class="tooltip-dir red-dir" id="tooltip-gebze">Gebze: -- dk â†’</span>
                    </div>
                </div>
                <!-- Train Click Popup -->
                <div class="train-popup" id="train-popup">
                    <button class="train-popup-close" id="train-popup-close">âœ•</button>
                    <div class="train-popup-body" id="train-popup-body">
                        <!-- Doldurulacak -->
                    </div>
                </div>
            </div>
        </div>

        <!-- GÃœZERGAH HATTI ALT HARÄ°TA - TÃœM 43 DURAK -->
        <div class="transfer-section">
            <h2 class="section-title">Marmaray GÃ¼zergah HattÄ±Ä±</h2>
            <div class="transfer-map-scroll" id="transfer-map-scroll">
                <div class="transfer-stations-row" id="transfer-row">
                    <!-- JS ile doldurulur -->
                </div>
            </div>
        </div>

        <!-- Ä°STANBUL HIZLI ULAÅIM SÄ°STEMÄ° HARÄ°TASI -->
        <div class="transfer-section">
            <h2 class="section-title">Ä°stanbul HÄ±zlÄ± UlaÅŸÄ±m Sistemi</h2>
            <div class="map-wrapper" id="istanbul-map-wrapper" style="height: 600px; background: white; border-radius: 8px; overflow: hidden; position: relative; cursor: grab;">
                <div id="istanbul-map-scale" style="width: 100%; height: 100%; transform-origin: top left; display: flex; align-items: center; justify-content: center;">
                    <img src="<?php echo esc_url( plugins_url( '/assets/images/', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>istanbul-hizli-ulasim-agi.png" alt="Ä°stanbul HÄ±zlÄ± UlaÅŸÄ±m Sistemi HaritasÄ±" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" id="istanbul-map-img">
                </div>
                <div class="map-controls" style="position: absolute; bottom: 15px; right: 15px;">
                    <button class="map-ctrl-btn" id="ist-zoom-out" title="UzaklaÅŸtÄ±r">âˆ’</button>
                    <button class="map-ctrl-btn" id="ist-zoom-reset" title="SÄ±fÄ±rla">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                    </button>
                    <button class="map-ctrl-btn" id="ist-zoom-in" title="YakÄ±nlaÅŸtÄ±r">+</button>
                </div>
            </div>
        </div>
        
        <div class="ad-slot">
            REKLAM ALANI (BU ALANA REKLAM VEREBÄ°LÄ°RSÄ°NÄ°Z.)
        </div>

    </main>

<?php get_footer(); ?>
