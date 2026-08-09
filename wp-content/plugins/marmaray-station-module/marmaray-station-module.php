<?php
/**
 * Plugin Name: Marmaray İstasyon ve Sefer Modülü
 * Description: Marmaray sefer saatlerini, istasyonları, "Yaklaşıyor", "Peronda" metin ve renklerini yöneten modül.
 * Version: 1.0.0
 * Author: MarmarayApp
 */

if (!defined('ABSPATH')) {
    exit;
}

// Varsayılan Ayarları Tanımla
function msm_get_default_settings() {
    return array(
        'text_approaching' => 'yaklaşıyor',
        'text_at_station' => 'PERONDA',
        'color_approaching_bg' => '#f8f9fa',
        'color_approaching_text' => '#495057',
        'color_at_station_bg' => '#1c7ed6', // Mavi
        'color_at_station_text' => '#ffffff', // Beyaz
        'stations' => json_encode(array(
            array('id' => '1', 'name' => 'Halkalı', 'offset' => 0),
            array('id' => '2', 'name' => 'Mustafa Kemal', 'offset' => 3),
            array('id' => '3', 'name' => 'Küçükçekmece', 'offset' => 5),
            array('id' => '4', 'name' => 'Florya', 'offset' => 8),
            array('id' => '5', 'name' => 'Florya Akvaryum', 'offset' => 10),
            array('id' => '6', 'name' => 'Yeşilköy', 'offset' => 13),
            array('id' => '7', 'name' => 'Yeşilyurt', 'offset' => 15),
            array('id' => '8', 'name' => 'Ataköy', 'offset' => 17),
            array('id' => '9', 'name' => 'Bakırköy', 'offset' => 20),
            array('id' => '10', 'name' => 'Yenimahalle', 'offset' => 22),
            array('id' => '11', 'name' => 'Zeytinburnu', 'offset' => 24),
            array('id' => '12', 'name' => 'Kazlıçeşme', 'offset' => 27),
            array('id' => '13', 'name' => 'Yenikapı', 'offset' => 32),
            array('id' => '14', 'name' => 'Sirkeci', 'offset' => 35),
            array('id' => '15', 'name' => 'Üsküdar', 'offset' => 39),
            array('id' => '16', 'name' => 'Ayrılık Çeşmesi', 'offset' => 44),
            array('id' => '17', 'name' => 'Söğütlüçeşme', 'offset' => 47),
            array('id' => '18', 'name' => 'Feneryolu', 'offset' => 49),
            array('id' => '19', 'name' => 'Göztepe', 'offset' => 51),
            array('id' => '20', 'name' => 'Erenköy', 'offset' => 53),
            array('id' => '21', 'name' => 'Suadiye', 'offset' => 55),
            array('id' => '22', 'name' => 'Bostancı', 'offset' => 58),
            array('id' => '23', 'name' => 'Küçükyalı', 'offset' => 61),
            array('id' => '24', 'name' => 'İdealtepe', 'offset' => 63),
            array('id' => '25', 'name' => 'Süreyya Plajı', 'offset' => 65),
            array('id' => '26', 'name' => 'Maltepe', 'offset' => 67),
            array('id' => '27', 'name' => 'Cevizli', 'offset' => 70),
            array('id' => '28', 'name' => 'Atalar', 'offset' => 72),
            array('id' => '29', 'name' => 'Başak', 'offset' => 74),
            array('id' => '30', 'name' => 'Kartal', 'offset' => 76),
            array('id' => '31', 'name' => 'Yunus', 'offset' => 79),
            array('id' => '32', 'name' => 'Pendik', 'offset' => 82),
            array('id' => '33', 'name' => 'Kaynarca', 'offset' => 85),
            array('id' => '34', 'name' => 'Tersane', 'offset' => 87),
            array('id' => '35', 'name' => 'Güzelyalı', 'offset' => 89),
            array('id' => '36', 'name' => 'Aydıntepe', 'offset' => 91),
            array('id' => '37', 'name' => 'İçmeler', 'offset' => 93),
            array('id' => '38', 'name' => 'Tuzla', 'offset' => 96),
            array('id' => '39', 'name' => 'Çayırova', 'offset' => 101),
            array('id' => '40', 'name' => 'Fatih', 'offset' => 103),
            array('id' => '41', 'name' => 'Osmangazi', 'offset' => 105),
            array('id' => '42', 'name' => 'Darıca', 'offset' => 108),
            array('id' => '43', 'name' => 'Gebze', 'offset' => 110)
        ))
    );
}

// Menüye Ekle
add_action('admin_menu', 'msm_add_admin_menu');
function msm_add_admin_menu() {
    add_submenu_page(
        'marmaray-core',
        'İstasyon ve Sefer Modülü',
        'İstasyon ve Sefer',
        'manage_options',
        'marmaray-station-module',
        'msm_settings_page'
    );
}

// Ayarları Kaydetme (AJAX)
add_action('wp_ajax_msm_save_settings', 'msm_save_settings');
function msm_save_settings() {
    if (!current_user_can('manage_options')) wp_die();
    
    $settings = array(
        'text_approaching' => sanitize_text_field($_POST['text_approaching']),
        'text_at_station' => sanitize_text_field($_POST['text_at_station']),
        'color_approaching_bg' => sanitize_hex_color($_POST['color_approaching_bg']),
        'color_approaching_text' => sanitize_hex_color($_POST['color_approaching_text']),
        'color_at_station_bg' => sanitize_hex_color($_POST['color_at_station_bg']),
        'color_at_station_text' => sanitize_hex_color($_POST['color_at_station_text']),
        'stations' => stripslashes($_POST['stations']), // JSON
    );
    
    update_option('msm_settings', $settings);
    wp_send_json_success('Ayarlar kaydedildi.');
}

// Admin Sayfası HTML
function msm_settings_page() {
    $settings = get_option('msm_settings', msm_get_default_settings());
    ?>
    <div class="wrap">
        <h1>Marmaray İstasyon ve Sefer Modülü</h1>
        
        <div style="display:flex; gap: 20px; margin-top:20px;">
            <!-- Metin ve Renk Ayarları -->
            <div style="flex: 1; background: #fff; padding: 20px; border: 1px solid #ccd0d4; border-radius: 4px;">
                <h2>Görünüm Ayarları</h2>
                
                <table class="form-table">
                    <tr>
                        <th><label>YAKLAŞIYOR Metni</label></th>
                        <td><input type="text" id="text_approaching" value="<?php echo esc_attr($settings['text_approaching']); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th><label>YAKLAŞIYOR Arkaplan Rengi</label></th>
                        <td><input type="color" id="color_approaching_bg" value="<?php echo esc_attr($settings['color_approaching_bg']); ?>"></td>
                    </tr>
                    <tr>
                        <th><label>YAKLAŞIYOR Yazı Rengi</label></th>
                        <td><input type="color" id="color_approaching_text" value="<?php echo esc_attr($settings['color_approaching_text']); ?>"></td>
                    </tr>
                    
                    <tr>
                        <th colspan="2"><hr></th>
                    </tr>
                    
                    <tr>
                        <th><label>PERONDA Metni</label></th>
                        <td><input type="text" id="text_at_station" value="<?php echo esc_attr($settings['text_at_station']); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th><label>PERONDA Arkaplan Rengi</label></th>
                        <td><input type="color" id="color_at_station_bg" value="<?php echo esc_attr($settings['color_at_station_bg']); ?>"></td>
                    </tr>
                    <tr>
                        <th><label>PERONDA Yazı Rengi</label></th>
                        <td><input type="color" id="color_at_station_text" value="<?php echo esc_attr($settings['color_at_station_text']); ?>"></td>
                    </tr>
                </table>
                <br>
                <button id="msm_save_btn" class="button button-primary">Ayarları Kaydet</button>
                <span id="msm_save_msg" style="margin-left:10px; color:green; display:none;">Kaydedildi!</span>
            </div>
            
            <!-- İstasyon Ayarları -->
            <div style="flex: 2; background: #fff; padding: 20px; border: 1px solid #ccd0d4; border-radius: 4px;">
                <h2>İstasyonlar ve Süreler (Halkalı'dan Gebze'ye Sırayla)</h2>
                <p class="description">Halkalı'dan başlayarak her istasyonun kalkıştan kaç dakika sonra ulaşıldığını (Offset) giriniz.</p>
                <table class="wp-list-table widefat fixed striped" id="msm_stations_table">
                    <thead>
                        <tr>
                            <th style="width:50px;">ID</th>
                            <th>İstasyon Adı</th>
                            <th style="width:120px;">Offset (Dakika)</th>
                            <th style="width:80px;">İşlem</th>
                        </tr>
                    </thead>
                    <tbody id="msm_stations_body">
                        <!-- JS ile doldurulacak -->
                    </tbody>
                </table>
                <br>
                <button id="msm_add_station_btn" class="button">Yeni İstasyon Ekle</button>
            </div>
        </div>
    </div>

    <script>
    jQuery(document).ready(function($) {
        let stations = <?php echo $settings['stations']; ?>;
        
        function renderStations() {
            let html = '';
            stations.forEach((st, index) => {
                html += `
                    <tr>
                        <td><input type="text" style="width:100%" class="st-id" value="${st.id}" data-idx="${index}"></td>
                        <td><input type="text" style="width:100%" class="st-name" value="${st.name}" data-idx="${index}"></td>
                        <td><input type="number" style="width:100%" class="st-offset" value="${st.offset}" data-idx="${index}"></td>
                        <td><button class="button msm-remove-st" data-idx="${index}">Sil</button></td>
                    </tr>
                `;
            });
            $('#msm_stations_body').html(html);
        }
        
        renderStations();
        
        $(document).on('change', '.st-id', function() { stations[$(this).data('idx')].id = $(this).val(); });
        $(document).on('change', '.st-name', function() { stations[$(this).data('idx')].name = $(this).val(); });
        $(document).on('change', '.st-offset', function() { stations[$(this).data('idx')].offset = parseInt($(this).val()) || 0; });
        
        $(document).on('click', '.msm-remove-st', function(e) {
            e.preventDefault();
            stations.splice($(this).data('idx'), 1);
            renderStations();
        });
        
        $('#msm_add_station_btn').on('click', function(e) {
            e.preventDefault();
            stations.push({ id: '', name: 'Yeni İstasyon', offset: 0 });
            renderStations();
        });
        
        $('#msm_save_btn').on('click', function(e) {
            e.preventDefault();
            $(this).prop('disabled', true).text('Kaydediliyor...');
            
            let data = {
                action: 'msm_save_settings',
                text_approaching: $('#text_approaching').val(),
                text_at_station: $('#text_at_station').val(),
                color_approaching_bg: $('#color_approaching_bg').val(),
                color_approaching_text: $('#color_approaching_text').val(),
                color_at_station_bg: $('#color_at_station_bg').val(),
                color_at_station_text: $('#color_at_station_text').val(),
                stations: JSON.stringify(stations)
            };
            
            $.post(ajaxurl, data, function(response) {
                $('#msm_save_btn').prop('disabled', false).text('Ayarları Kaydet');
                $('#msm_save_msg').show().fadeOut(3000);
            });
        });
    });
    </script>
    <?php
}

// Frontend Assets
add_action('wp_enqueue_scripts', 'msm_enqueue_frontend_scripts', 99);
function msm_enqueue_frontend_scripts() {
    wp_enqueue_script('msm-frontend-js', plugin_dir_url(__FILE__) . 'assets/js/frontend.js', array(), '1.0', true);
    
    $settings = get_option('msm_settings', msm_get_default_settings());
    wp_localize_script('msm-frontend-js', 'msmSettings', array(
        'text_approaching' => $settings['text_approaching'],
        'text_at_station' => $settings['text_at_station'],
        'color_approaching_bg' => $settings['color_approaching_bg'],
        'color_approaching_text' => $settings['color_approaching_text'],
        'color_at_station_bg' => $settings['color_at_station_bg'],
        'color_at_station_text' => $settings['color_at_station_text'],
        'stations' => json_decode($settings['stations'], true)
    ));
}
