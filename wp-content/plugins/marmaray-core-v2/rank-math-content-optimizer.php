<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_rank_math_content_optimizer');

function marmaray_rank_math_content_optimizer() {
    if (isset($_GET['optimize_content_v1']) && $_GET['optimize_content_v1'] === 'oktay') {
        
        $args = [
            'post_type' => 'post',
            'posts_per_page' => -1,
            'category_name' => 'blog'
        ];
        
        $posts_list = get_posts($args);
        $count = 0;
        
        $faq_block = <<<EOT
<div id="marmaray-faq-section" style="margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
    <!-- marmaray-faq -->
    <h3>Marmaray Hakkında Sıkça Sorulan Sorular (SSS)</h3>
    <p>Yolculuğunuzu planlarken en çok merak edilen soruların cevaplarını sizin için derledik. Marmaray hattını kullanırken aşağıdaki resmi bilgilere dikkat ederek çok daha rahat, güvenli ve konforlu bir seyahat geçirebilirsiniz.</p>
    
    <h4>1. Marmaray Seferleri Saat Kaçta Başlar ve Biter?</h4>
    <p>Marmaray trenleri genellikle sabah 06:00 itibarıyla ilk seferlerine başlamakta ve gece 23:59'a kadar karşılıklı seferlerine devam etmektedir. Hafta sonu, Cuma ve Cumartesi geceleri ise sabaha kadar ek seferler (gece metrosu) düzenlenebilmektedir. Ancak saatler bulunduğunuz istasyona göre değişiklik gösterebileceği için, sitemiz üzerinden canlı saatleri ve varış sürelerini takip etmeniz en güvenilir yoldur.</p>

    <h4>2. Bilet Fiyatları ve İstanbulkart Kullanımı Nasıldır?</h4>
    <p>Marmaray'da "Gittiğin Kadar Öde" adı verilen bir elektronik ücret toplama sistemi geçerlidir. Turnikelerden ilk giriş yaptığınızda İstanbulkart'ınızdan hattın en uzun mesafe tam ücreti düşülür. İndiğiniz istasyondaki çıkış turnikelerinden geçtikten hemen sonra karşınıza çıkan iade cihazlarına (turuncu renkli validatörler) kartınızı okutarak aradaki mesafe farkını kartınıza iade almayı kesinlikle unutmayın! Aksi takdirde, sadece bir veya iki durak gitmiş olsanız bile en uzun mesafe ücreti ödemiş olursunuz.</p>

    <h4>3. Bisiklet ve Scooter ile Marmaray'a Binilir mi?</h4>
    <p>Evet, TCDD kuralları gereği Marmaray'da bisiklet ve katlanabilir elektrikli scooter ile seyahat edebilirsiniz. Pazar günleri ve resmi tatillerde gün boyu hiçbir saat kısıtlaması olmadan; diğer günlerde (hafta içi ve cumartesi) ise yoğun saatler (07:00-09:00 ve 16:00-20:00) dışında bisikletinizle hiçbir ek ücret ödemeden trene binebilirsiniz. Katlanabilir bisikletler ise her saat başı kabul edilmektedir. Yolcu yoğunluğunun az olduğu ilk veya son vagonları tercih etmeniz önerilir.</p>

    <h4>4. Evcil Hayvanımla Seyahat Edebilir miyim?</h4>
    <p>Görme engelli yolculara refakat eden eğitimli rehber köpekler her zaman ve her vagona kabul edilmektedir. Diğer evcil hayvanlar (küçük boy köpekler, kediler ve kuşlar) ise yalnızca kendi taşıma çantalarında veya kafeslerinde olmak ve kafes ölçülerinin belirli sınırları aşmaması şartıyla yolcu beraberinde taşınabilmektedir. Sürüngenler veya kafessiz taşınan hayvanların trene alınması yasaktır.</p>

    <h4>5. İstasyonda veya Trende Eşyamı Kaybettim, Ne Yapmalıyım?</h4>
    <p>Tren içerisinde vagonlarda veya istasyon sınırları içerisinde unuttuğunuz eşyalarınız için zaman kaybetmeden en yakın istasyon güvenlik görevlisine başvurabilir veya TCDD Taşımacılık A.Ş. Müşteri Hizmetleri ile iletişime geçebilirsiniz. Bulunan eşyalar güvenlik kameraları incelenerek kayıt altına alınmakta ve belirli bir süre Marmaray Kayıp Eşya Bürosunda güvenle muhafaza edilmektedir.</p>
</div>
EOT;
        
        foreach ($posts_list as $pt) {
            $keyword = get_post_meta($pt->ID, 'rank_math_focus_keyword', true);
            if (empty($keyword)) {
                $title_lower = mb_strtolower($pt->post_title, 'UTF-8');
                if(strpos($title_lower, 'marmaray') !== false) {
                    $parts = explode('marmaray', $title_lower);
                    $keyword = trim($parts[0]) . ' marmaray';
                } else {
                    $words = explode(' ', $title_lower);
                    $keyword = implode(' ', array_slice($words, 0, 2));
                }
                update_post_meta($pt->ID, 'rank_math_focus_keyword', $keyword);
            }
            
            $content = $pt->post_content;
            $modified = false;
            
            // 1. Inject SEO Intro
            if (stripos($content, $keyword) === false) {
                $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
                $intro = "<p><strong>" . $pretty_keyword . "</strong> hakkında en güncel saatler, aktarma detayları ve istasyon rehberimize hoş geldiniz. Marmaray ulaşımınızı kolaylaştırmak için <strong>" . mb_strtolower($keyword, 'UTF-8') . "</strong> seferlerini sitemizdeki canlı takip ekranı üzerinden saniye saniye izleyebilir, güncel duyurulardan haberdar olabilirsiniz.</p>\n";
                $content = $intro . $content;
                $modified = true;
            }
            
            // 2. Inject Keyword into First H2
            if (stripos($content, '<h2>') !== false && stripos($content, '>'.$keyword) === false && stripos($content, $keyword.'<') === false) {
                $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
                $content = preg_replace('/<h2>/', '<h2>' . $pretty_keyword . ' ve ', $content, 1);
                $modified = true;
            }
            
            // 3. Add Internal Link
            if (stripos($content, 'marmaray-saatleri') === false) {
                $content .= "\n<h3>Marmaray Canlı Sefer Takibi</h3>\n<p>Daha fazla bilgi almak ve tüm istasyonların anlık kalkış sürelerini görmek için <a href=\"" . home_url('/marmaray-saatleri') . "\">Marmaray canlı saatler</a> sayfamızı ziyaret edin. Akıllı harita üzerinden tüm trenleri izleyebilirsiniz.</p>";
                $modified = true;
            }
            
            // 4. Inject 400-word FAQ Block
            if (strpos($content, '<!-- marmaray-faq -->') === false) {
                $content .= "\n" . $faq_block;
                $modified = true;
            }
            
            if ($modified) {
                wp_update_post([
                    'ID' => $pt->ID,
                    'post_content' => $content
                ]);
            }
            
            // 5. Update SEO Meta
            $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
            $desc = "En güncel " . mb_strtolower($keyword, 'UTF-8') . " saatleri, istasyon bilgileri ve aktarma detayları. " . $pretty_keyword . " için canlı sefer takibi yapın.";
            update_post_meta($pt->ID, 'rank_math_description', $desc);
            
            // 6. Update Image ALT
            $thumb_id = get_post_thumbnail_id($pt->ID);
            if ($thumb_id) {
                update_post_meta($thumb_id, '_wp_attachment_image_alt', $pretty_keyword . ' istasyonu güncel görseli');
            }
            
            $count++;
        }
        
        echo "<h1>SEO Kelime Sayısı ve İçerik Optimizasyonu Tamamlandı!</h1>";
        echo "<p>Toplam <strong>" . $count . "</strong> makaleye, arama motorlarında sizi ön plana çıkaracak özel 400 kelimelik zengin 'Sıkça Sorulan Sorular' modülü ve diğer SEO iyileştirmeleri eklendi.</p>";
        echo "<p>Lütfen Rank Math skorlarınızı ve yazılarınızın içindeki o harika SSS modülünü kontrol edin!</p>";
        echo "<a href='/wp-admin/edit.php'>Yazılara Git ve Skorları Gör</a>";
        exit;
    }
}
