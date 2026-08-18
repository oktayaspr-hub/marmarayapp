<?php
// SEOPress Otomatik Açıklama (Snippet) Doldurucu
if (!defined('ABSPATH')) exit;

function marmarayapp_seopress_auto_fill() {
    if (isset($_GET['seopress_fill']) && $_GET['seopress_fill'] === 'oktay') {
        
        if (!is_user_logged_in() || !current_user_can('manage_options')) {
            wp_die('Bu işlemi yapmak için yönetici girişi yapmalısınız.');
        }

        $args = [
            'post_type' => ['post', 'page'], 
            'posts_per_page' => -1, 
            'post_status' => 'publish'
        ];
        $posts_list = get_posts($args);
        $count = 0;

        foreach ($posts_list as $pt) {
            $existing_desc = get_post_meta($pt->ID, '_seopress_titles_desc', true);
            
            // İsterseniz mevcut açıklamaları ezmemek için aşağıdaki if'i kullanabilirsiniz.
            // Fakat biz her şeyi sıfırdan en iyisiyle doldurmak için direkt üstüne yazacağız.
            
            $title = $pt->post_title;
            $desc = '';
            
            // 1. Ana Sayfa Kontrolü
            if ($pt->ID == get_option('page_on_front')) {
                $desc = "Türkiye'nin ilk ve tek canlı Marmaray takip uygulaması. Güncel sefer saatleri, bilet ücreti hesaplama, duraklar ve güzergah haritası MarmarayApp'te.";
            } 
            // 2. Sayfalar (Hakkımızda, İletişim vb.)
            elseif ($pt->post_type === 'page') {
                $desc = "MarmarayApp {$title} sayfası. Canlı Marmaray takip, güncel tren sefer saatleri, tüm istasyonlar ve güzergah bilgilerine en güvenilir kaynaktan ulaşın.";
            } 
            // 3. Blog Yazıları ve İstasyon Saatleri
            else {
                // Eğer başlıkta "saatleri" geçiyorsa istasyon rehberidir
                if (strpos(mb_strtolower($title, 'UTF-8'), 'saatleri') !== false) {
                    $desc = "{$title} listesi, hafta içi ve hafta sonu güncel kalkış vakitleri. Halkalı ve Gebze yönü ilk/son tren saatleri ve istasyon bilgileri rehberi.";
                } else {
                    $desc = "{$title} detayları ve bilinmesi gerekenler. Marmaray seferleri, anlık tren takibi ve güncel duyurular hakkında en doğru içerikler MarmarayApp'te.";
                }
            }
            
            // 160 Karakter Sınırı Koruması
            if (mb_strlen($desc, 'UTF-8') > 155) {
                $desc = mb_substr($desc, 0, 155, 'UTF-8') . '...';
            }
            
            // SEOPress Meta Açıklama (Description) alanına veritabanında kaydet
            update_post_meta($pt->ID, '_seopress_titles_desc', $desc);
            
            // SEOPress için başlığı da optimize edelim (Opsiyonel ama SEO için iyi)
            $seo_title = "{$title} - MarmarayApp";
            if ($pt->ID == get_option('page_on_front')) {
                $seo_title = "MarmarayApp - Canlı Marmaray Takip ve Sefer Saatleri";
            }
            update_post_meta($pt->ID, '_seopress_titles_title', $seo_title);

            $count++;
        }
        
        echo "<div style='font-family:sans-serif; margin:50px auto; max-width:800px; padding:30px; border:2px solid #10b981; border-radius:10px;'>";
        echo "<h1 style='color:#10b981;'>SEOPress Meta Açıklamaları Başarıyla Dolduruldu! 🎉</h1>";
        echo "<p>Toplam <strong>{$count}</strong> adet sayfa ve yazı tarandı. Her birinin içeriğine ve başlığına uygun, 160 karakter limitini aşmayan özel SEO (Snippet) açıklamaları yazıldı ve SEOPress veritabanına işlendi.</p>";
        echo "<p>Artık herhangi bir yazınızı düzenlerken sayfanın altındaki SEOPress kutusunda bu açıklamaları hazır olarak görebilirsiniz.</p>";
        echo "<a href='" . admin_url() . "' style='display:inline-block; margin-top:20px; padding:10px 20px; background:#0a57a9; color:white; text-decoration:none; border-radius:5px;'>WordPress Paneline Dön</a>";
        echo "</div>";
        exit;
    }
}
add_action('init', 'marmarayapp_seopress_auto_fill');
