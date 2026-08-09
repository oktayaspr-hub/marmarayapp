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
        
        foreach ($posts_list as $pt) {
            $keyword = get_post_meta($pt->ID, 'rank_math_focus_keyword', true);
            if (empty($keyword)) {
                // Try to infer from title
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
            
            // 1. Inject SEO Intro Paragraph with EXACT Focus Keyword (if not present)
            if (stripos($content, $keyword) === false) {
                $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
                $intro = "<p><strong>" . $pretty_keyword . "</strong> hakkında en güncel saatler, aktarma detayları ve istasyon rehberimize hoş geldiniz. Marmaray ulaşımınızı kolaylaştırmak için <strong>" . mb_strtolower($keyword, 'UTF-8') . "</strong> seferlerini sitemizdeki canlı takip ekranı üzerinden saniye saniye izleyebilir, güncel duyurulardan haberdar olabilirsiniz.</p>\n";
                $content = $intro . $content;
                $modified = true;
            }
            
            // 2. Inject Keyword into First H2 (if not present)
            if (stripos($content, '<h2>') !== false && stripos($content, '>'.$keyword) === false && stripos($content, $keyword.'<') === false) {
                $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
                $content = preg_replace('/<h2>/', '<h2>' . $pretty_keyword . ' ve ', $content, 1);
                $modified = true;
            }
            
            // 3. Add Internal Link (SEO requirement)
            if (stripos($content, 'marmaray-saatleri') === false) {
                $content .= "\n<h3>Marmaray Canlı Sefer Takibi</h3>\n<p>Daha fazla bilgi almak ve tüm istasyonların anlık kalkış sürelerini görmek için <a href=\"" . home_url('/marmaray-saatleri') . "\">Marmaray canlı saatler</a> sayfamızı ziyaret edin. Akıllı harita üzerinden tüm trenleri izleyebilirsiniz.</p>";
                $modified = true;
            }
            
            if ($modified) {
                wp_update_post([
                    'ID' => $pt->ID,
                    'post_content' => $content
                ]);
            }
            
            // 4. Set Rank Math SEO Description (if not set properly or just update it)
            $pretty_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
            $desc = "En güncel " . mb_strtolower($keyword, 'UTF-8') . " saatleri, istasyon bilgileri ve aktarma detayları. " . $pretty_keyword . " için canlı sefer takibi yapın.";
            update_post_meta($pt->ID, 'rank_math_description', $desc);
            
            // 5. Update Image ALT Text
            $thumb_id = get_post_thumbnail_id($pt->ID);
            if ($thumb_id) {
                update_post_meta($thumb_id, '_wp_attachment_image_alt', $pretty_keyword . ' istasyonu güncel görseli');
            }
            
            $count++;
        }
        
        echo "<h1>SEO Optimizasyon Tamamlandı!</h1>";
        echo "<p>Toplam <strong>" . $count . "</strong> makalenin içeriği, görselleri ve meta açıklamaları Rank Math 100/100 kriterlerine göre yeniden optimize edildi.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazılara Git ve Skorları Gör</a>";
        exit;
    }
}
