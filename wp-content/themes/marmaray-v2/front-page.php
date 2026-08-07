<?php
/**
 * Front Page Template
 */
get_header(); ?>

    <!-- ===================== MAIN ===================== -->
    <main class="app-container">

        <!-- HERO -->
        <div class="hero">
            <h1>Marmaray <span class="highlight">Canlı Takip</span> Panosu</h1>
            <p class="subtitle">
                Tüm duraklar için anlık tren kalkış saatleri ve güzergah durumu.
                Durak seçerek Halkalı ve Gebze yönü saatlerini görün.
            </p>
        </div>

        <!-- İSTASYON SEÇİCİ & KARTLAR (haritanın üstünde) -->
        <div class="station-picker-section">
            <div class="station-picker-header">
                <div class="picker-left">
                    <label for="station-select">
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
                    <span class="live-dot-anim"></span>
                    <span class="live-badge-label">CANLI</span>
                </div>
            </div>
            <div id="station-cards" style="display:none;"></div>
        </div>

        <div class="ad-slot">
            REKLAM ALANI (BU ALANA REKLAM VEREBİLİRSİNİZ.)
        </div>


        <!-- ===================== S-MAP GLASS PANEL ===================== -->
        <div class="map-glass-panel">

            <!-- TCDD Kırmızı Başlık Bandı -->
            <div class="map-tcdd-header">
                <div class="tcdd-logos">
                    <img src="https://marmarayadminapi.tcddtasimacilik.gov.tr/imgmarmaray/Ula%C5%9Ft%C4%B1rma_Bakanl%C4%B1%C4%9F%C4%B1_Hover.png" alt="T.C. Ulaştırma Bakanlığı" onerror="this.style.display='none'">
                    <img src="https://marmarayadminapi.tcddtasimacilik.gov.tr/imgmarmaray/Tcdd_Hover.png" alt="TCDD" onerror="this.style.display='none'">
                </div>
                <div class="map-live-info">
                    <span id="current-date-time">--.--.---- --:--:--</span>
                </div>
                <div class="map-destination-badge" id="map-dest-badge">
                    İSTEDİĞİNİZ TRENE TIKLAYINIZ
                </div>
            </div>

            <!-- Harita hint + zoom kontrolü -->
            <div class="map-hint-bar">
                <span style="display: flex; align-items: center;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    İstasyona tıklayarak veya aşağıdan seçerek seferleri görüntüleyin.
                </span>
                <span class="legend-item"><span class="legend-dot red-dot"></span> Gebze Yönü</span>
                <span class="legend-item"><span class="legend-dot blue-dot"></span> Halkalıı Yönü</span>
            </div>

            <!-- S-Şekilli Harita (zoom/pan destekli) -->
            <div class="map-wrapper" id="map-wrapper">
                <div id="marmaray-map-scale">
                    <div id="marmaray-map"></div>
                </div>
                <!-- Station Hover Tooltip -->
                <div class="station-tooltip" id="station-tooltip">
                    <div class="tooltip-name" id="tooltip-name">İstasyon</div>
                    <div class="tooltip-dirs">
                        <span class="tooltip-dir blue-dir" id="tooltip-halkali">← Halkalıı: -- dk</span>
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
            <h2 class="section-title">Marmaray Güzergah Hattıı</h2>
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
                    <img src="<?php echo esc_url( plugins_url( '/assets/images/', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>istanbul-hizli-ulasim-agi.png" alt="İstanbul Hızlı Ulaşım Sistemi Haritası" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" id="istanbul-map-img">
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
