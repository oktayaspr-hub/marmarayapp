<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Güncel Marmaray sefer saatleri, duraklar arası ücret hesaplama ve canlı sefer takibi.">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'light-theme' ); ?>>
<?php wp_body_open(); ?>
<div class="sticky-wrapper">
    <!-- ===================== APP DOWNLOAD BANNER ===================== -->
    <div class="app-download-banner">
        <div class="app-banner-content">
            <div class="app-banner-text">
                <span class="app-banner-title">MarmarayApp Cebinizde!</span>
                <span class="app-banner-desc">Türkiye'nin ilk ve tek Marmaray canlı takip uygulamamızı ücretsiz olarak hemen indirin!</span>
            </div>
            <div class="app-banner-buttons">
                <a href="#" class="app-store-btn play-store-btn" title="Google Play'den İndirin">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                    <span>Google Play</span>
                </a>
                <a href="#" class="app-store-btn apple-store-btn" title="App Store'dan İndirin">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.69C20.06,16.76 19.6,18.23 18.71,19.5M12,6.3C11.89,4.45 13.31,2.83 15.11,2.7C15.24,4.68 13.53,6.43 12,6.3Z"/></svg>
                    <span>App Store</span>
                </a>
            </div>
        </div>
    </div>
    
    <!-- ===================== GLASS HEADER NAVBAR ===================== -->
    <header class="glass-header" id="main-header">
        <div class="logo">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <img src="<?php echo esc_url( plugins_url( 'assets/images/marmaray_logo_new.png', WP_PLUGIN_DIR . '/marmaray-core-v2/marmaray-core.php' ) ); ?>" alt="MarmarayApp Logo" width="110" height="110" style="background: transparent;">
                <span><span style="color:#0056b3;">Marmaray</span><span class="highlight">App</span></span>
            </a>
        </div>

        <nav class="main-nav" id="main-nav">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="active">Ana Sayfa</a>
            <a href="<?php echo esc_url( home_url( '/marmaray-saatleri' ) ); ?>">Marmaray Saatleri</a>
            <a href="<?php echo esc_url( home_url( '/rota-planla' ) ); ?>">Rota Planla</a>
            <a href="<?php echo esc_url( home_url( '/ucret-hesapla' ) ); ?>">Ücret Hesapla</a>
            <a href="<?php echo esc_url( home_url( '/category/blog' ) ); ?>">Blog</a>
            <a href="<?php echo esc_url( home_url( '/iletisim' ) ); ?>">İletişim</a>
        </nav>

        <div class="nav-actions">
            <div class="custom-lang-select" id="custom-lang-select" onclick="this.classList.toggle('active')">
                <div class="lang-current">
                    <img src="https://flagcdn.com/tr.svg" alt="TR"> <span>TR</span>
                </div>
                <div class="lang-options">
                    <div class="lang-option" onclick="document.querySelector('.lang-current img').src='https://flagcdn.com/tr.svg'; document.querySelector('.lang-current span').innerText='TR'">
                        <img src="https://flagcdn.com/tr.svg" alt="TR"> <span>TR</span>
                    </div>
                    <div class="lang-option" onclick="document.querySelector('.lang-current img').src='https://flagcdn.com/gb.svg'; document.querySelector('.lang-current span').innerText='EN'">
                        <img src="https://flagcdn.com/gb.svg" alt="EN"> <span>EN</span>
                    </div>
                </div>
            </div>
            <button class="action-btn" id="theme-toggle" title="Tema Değiştir">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            </button>
            <button class="action-btn hamburger" id="mobile-toggle" title="Menü">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>
        </div>
    </header>

    <!-- ===================== LIVE ANNOUNCEMENT BANNER ===================== -->
    <div class="announcement-banner">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" style="font-weight: bold;">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
        </svg>
        <marquee scrollamount="4" style="max-width:800px;">
            <strong style="font-weight:900;">Duyuru:</strong> Tren hızı, istasyon trafiği ve yolcu yoğunluğuna bağlı olarak sefer saatlerinde mikro farklılıklar olabilir. İyi yolculuklar dileriz.
        </marquee>
    </div>
</div>
