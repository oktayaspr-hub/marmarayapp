<?php
/**
 * Plugin Name: Marmaray Auto-Translator Pro
 * Description: Google Translate tabanl, ozel isimleri koruyan ve mevcut tema butonuyla entegre calisan ceviri eklentisi.
 * Version: 1.0.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function marmaray_translator_enqueue_scripts() {
    wp_enqueue_style( 'marmaray-translator-css', plugin_dir_url( __FILE__ ) . 'assets/css/translator.css', array(), '1.0.0' );
    wp_enqueue_script( 'marmaray-translator-js', plugin_dir_url( __FILE__ ) . 'assets/js/translator.js', array(), '1.0.0', true );

    $default_words = "MarmarayApp, Marmaray, Halkalı, Mustafa Kemal, Küçükçekmece, Florya, Florya Akvaryum, Yeşilköy, Yeşilyurt, Ataköy, Bakırköy, Yenimahalle, Zeytinburnu, Kazlıçeşme, Yenikapı, Sirkeci, Üsküdar, Ayrılık Çeşmesi, Söğütlüçeşme, Feneryolu, Göztepe, Erenköy, Suadiye, Bostancı, Küçükyalı, İdealtepe, Süreyya Plajı, Maltepe, Cevizli, Atalar, Başak, Kartal, Yunus, Pendik, Kaynarca, Tersane, Güzelyalı, Aydıntepe, İçmeler, Tuzla, Çayırova, Fatih, Osmangazi, Darıca, Gebze";
    
    $saved_words = get_option('marmaray_translator_words', $default_words);
    $protected_words = array_map('trim', explode(',', $saved_words));

    wp_localize_script( 'marmaray-translator-js', 'marmarayTranslatorConfig', array(
        'protectedWords' => $protected_words
    ));
}
add_action( 'wp_enqueue_scripts', 'marmaray_translator_enqueue_scripts' );

// Settings Page
add_action('admin_menu', 'marmaray_translator_menu');
function marmaray_translator_menu() {
    add_options_page('Çeviri Ayarları', 'Çeviri (Translator)', 'manage_options', 'marmaray-translator', 'marmaray_translator_options_page');
}

function marmaray_translator_options_page() {
    if (isset($_POST['marmaray_translator_words'])) {
        update_option('marmaray_translator_words', sanitize_text_field(stripslashes($_POST['marmaray_translator_words'])));
        echo '<div class="updated"><p>Ayarlar kaydedildi!</p></div>';
    }
    $words = get_option('marmaray_translator_words', "MarmarayApp, Marmaray, Halkalı, Mustafa Kemal, Küçükçekmece, Florya, Florya Akvaryum, Yeşilköy, Yeşilyurt, Ataköy, Bakırköy, Yenimahalle, Zeytinburnu, Kazlıçeşme, Yenikapı, Sirkeci, Üsküdar, Ayrılık Çeşmesi, Söğütlüçeşme, Feneryolu, Göztepe, Erenköy, Suadiye, Bostancı, Küçükyalı, İdealtepe, Süreyya Plajı, Maltepe, Cevizli, Atalar, Başak, Kartal, Yunus, Pendik, Kaynarca, Tersane, Güzelyalı, Aydıntepe, İçmeler, Tuzla, Çayırova, Fatih, Osmangazi, Darıca, Gebze");
    ?>
    <div class="wrap">
        <h1>Marmaray Çeviri Ayarları</h1>
        <p>Google Translate'in İngilizceye çevirmesini <b>istemediğiniz</b> kelimeleri (özel isimleri) aralarına virgül koyarak aşağıya yazın.</p>
        <form method="post" action="">
            <textarea name="marmaray_translator_words" rows="6" style="width:100%; max-width:600px;"><?php echo esc_textarea($words); ?></textarea>
            <br><br>
            <input type="submit" class="button-primary" value="Ayarları Kaydet">
        </form>
    </div>
    <?php
}

function marmaray_translator_footer_html() {
    ?>
    <div id="google_translate_element" style="display:none;"></div>
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'tr', 
                includedLanguages: 'tr,en', 
                autoDisplay: false
            }, 'google_translate_element');
        }
    </script>
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <?php
}
add_action( 'wp_footer', 'marmaray_translator_footer_html' );
