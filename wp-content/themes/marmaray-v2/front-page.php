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
              <div class="station-picker-header station-picker-header-grid">
                  
                  <!-- Sol Kısım: Seçici -->
                  <div class="picker-col picker-left" style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px;">
                      <label for="station-dropdown" style="font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; gap: 8px; margin: 0; cursor: pointer;">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          Biniş İstasyonu Seçin:
                      </label>
                      <select class="station-dropdown" id="station-dropdown" style="width: 100%; max-width: 300px;">
                          <option value="">Seçiniz...</option>
                      </select>
                  </div>

                  <!-- Orta Kısım: Estetik Mesaj -->
                  <div class="picker-col picker-middle" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                      <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary-color); letter-spacing: 0.5px;">Seyahat Planınızı Yapın</div>
                      <div style="font-size: 0.95rem; opacity: 0.7; font-weight: 500;">İstasyon seçerek tren saatlerini ve aktarmaları görüntüleyin</div>
                  </div>

                  <!-- Sağ Kısım: CANLI Badge -->
                  <div class="picker-col picker-right" style="display: flex; justify-content: flex-end;">
                      <div class="live-badge-pill" id="global-live-badge" style="transform: scale(1.1);">
                          <span class="live-dot-anim"></span>
                          <span class="live-badge-label" style="font-weight: 800; letter-spacing: 1px;">CANLI</span>
                      </div>
                  </div>

              </div>
            <div id="station-cards" style="display:none;"></div>
        </div>

        <div class="ad-slot" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 20px;">
            <strong style="font-size: 1.6rem; font-weight: 800;">SPONSORLU REKLAM ALANI</strong>
            <span style="font-size: 1.1rem; font-weight: 300; letter-spacing: 2px;">BU ALANA REKLAM VEREBİLİRSİNİZ</span>
        </div>


        <!-- ===================== S-MAP GLASS PANEL ===================== -->
        <div class="map-glass-panel">

            <!-- TCDD Kırmızı Başlık Bandı -->
            <div class="map-tcdd-header" style="justify-content: space-between; padding: 0 15px;">
                <div class="map-live-info" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; line-height: 1.4; padding-left: 20px;">
                    <span id="current-date" style="display: flex; align-items: center; gap: 6px;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span id="current-date-val">--.--.----</span>
                    </span>
                    <span id="current-time" style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span id="current-time-val">--:--:--</span>
                    </span>
                </div>
                <div class="map-destination-badge" id="map-dest-badge" style="display: flex; align-items: center; gap: 8px;">
                    <span class="live-dot-anim" style="background: #ef4444;"></span>
                    CANLI MARMARAY TAKİBİ
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
        
        <div class="ad-slot" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 20px;">
            <strong style="font-size: 1.6rem; font-weight: 800;">SPONSORLU REKLAM ALANI</strong>
            <span style="font-size: 1.1rem; font-weight: 300; letter-spacing: 2px;">BU ALANA REKLAM VEREBİLİRSİNİZ</span>
        </div>

    </main>

<?php get_footer(); ?>
