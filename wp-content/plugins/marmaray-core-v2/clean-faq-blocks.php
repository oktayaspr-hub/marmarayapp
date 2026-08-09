<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_clean_faq_blocks');

function marmaray_clean_faq_blocks() {
    if (isset($_GET['clean_faqs']) && $_GET['clean_faqs'] === 'oktay') {
        
        $args = [
            'post_type' => 'post',
            'posts_per_page' => -1,
            'category_name' => 'blog'
        ];
        
        $posts_list = get_posts($args);
        $count = 0;
        
        foreach ($posts_list as $pt) {
            $content = $pt->post_content;
            
            // Remove the FAQ block using regex
            $new_content = preg_replace('/<div id="marmaray-faq-section".*?<\/div>/s', '', $content);
            
            if ($new_content !== $content) {
                wp_update_post([
                    'ID' => $pt->ID,
                    'post_content' => trim($new_content)
                ]);
                $count++;
            }
        }
        
        echo "<h1>Kopya SSS Blokları Temizlendi!</h1>";
        echo "<p>Toplam <strong>" . $count . "</strong> makaleden statik SSS blokları silindi. Şimdi bu makalelere özgün içerik girebiliriz.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
