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
                      <div style="font-size: 1.25rem; font-weight: 900; color: var(--primary-color); letter-spacing: 0.5px;">Yolculuk Planınızı Yapın</div>
                      <div style="font-size: 0.95rem; opacity: 0.8; font-weight: 500; margin-top: 4px;">Binmek istediğiniz istasyonu seçerek canlı Marmaray saatlerini görüntüleyin.</div>
                  </div>

                  <!-- Sağ Kısım: CANLI Badge -->
                  <div class="picker-col picker-right" style="display: flex; justify-content: flex-end;">
                      <div class="live-badge-pill" id="global-live-badge" style="transform: scale(1.8); transform-origin: right center;">
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
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span id="current-date-val" style="font-size: 80%;">--.--.----</span>
                    </span>
                    <span id="current-time" style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span id="current-time-val" style="font-size: 80%;">--:--:--</span>
                    </span>
                </div>
                <div class="map-destination-badge" id="map-dest-badge" style="display: flex; align-items: center; gap: 8px;">
                    <span class="live-dot-anim"></span>
                    YAPAY ZEKA İLE SİNYALİZASYON
                </div>
            </div>

            <!-- Harita hint + zoom kontrolü -->
            <div class="map-hint-bar">
                <span style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor" style="margin-right: 6px;">
                        <path d="M256 0c70.69 0 134.69 28.66 181.02 74.98C483.34 121.3 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.69 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-9.96 161.03c0-4.28.76-8.26 2.27-11.91 1.5-3.63 3.77-6.94 6.79-9.91 3-2.95 6.29-5.2 9.84-6.7 3.57-1.5 7.41-2.28 11.52-2.28 4.12 0 7.96.78 11.49 2.27 3.54 1.51 6.78 3.76 9.75 6.73 2.95 2.97 5.16 6.26 6.64 9.91 1.49 3.63 2.22 7.61 2.22 11.89 0 4.17-.73 8.08-2.21 11.69-1.48 3.6-3.68 6.94-6.65 9.97-2.94 3.03-6.18 5.32-9.72 6.84-3.54 1.51-7.38 2.29-11.52 2.29-4.22 0-8.14-.76-11.75-2.26-3.58-1.51-6.86-3.79-9.83-6.79-2.94-3.02-5.16-6.34-6.63-9.97-1.48-3.62-2.21-7.54-2.21-11.77zm13.4 178.16c-1.11 3.97-3.35 11.76 3.3 11.76 1.44 0 3.27-.81 5.46-2.4 2.37-1.71 5.09-4.31 8.13-7.75 3.09-3.5 6.32-7.65 9.67-12.42 3.33-4.76 6.84-10.22 10.49-16.31.37-.65 1.23-.87 1.89-.48l12.36 9.18c.6.43.73 1.25.35 1.86-5.69 9.88-11.44 18.51-17.26 25.88-5.85 7.41-11.79 13.57-17.8 18.43l-.1.06c-6.02 4.88-12.19 8.55-18.51 11.01-17.58 6.81-45.36 5.7-53.32-14.83-5.02-12.96-.9-27.69 3.06-40.37l19.96-60.44c1.28-4.58 2.89-9.62 3.47-14.33.97-7.87-2.49-12.96-11.06-12.96h-17.45c-.76 0-1.38-.62-1.38-1.38l.08-.48 4.58-16.68c.16-.62.73-1.04 1.35-1.02l89.12-2.79c.76-.03 1.41.57 1.44 1.33l-.07.43-37.76 124.7zm158.3-244.93c-41.39-41.39-98.58-67-161.74-67-63.16 0-120.35 25.61-161.74 67-41.39 41.39-67 98.58-67 161.74 0 63.16 25.61 120.35 67 161.74 41.39 41.39 98.58 67 161.74 67 63.16 0 120.35-25.61 161.74-67 41.39-41.39 67-98.58 67-161.74 0-63.16-25.61-120.35-67-161.74z"/>
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
