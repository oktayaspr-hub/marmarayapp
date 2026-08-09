<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_restoration_importer_v7');

function marmaray_restoration_importer_v7() {
    
    // ACTION 1: DELETE ALL BLOG POSTS (Clean Slate)
    if (isset($_GET['run_v7_delete_all']) && $_GET['run_v7_delete_all'] === 'oktay') {
        $args = [
            'post_type' => 'post',
            'post_status' => 'any',
            'posts_per_page' => -1,
            'category_name' => 'blog'
        ];
        $posts = get_posts($args);
        $deleted_count = 0;
        foreach ($posts as $post) {
            // Delete post and its thumbnail attachment
            $thumb_id = get_post_thumbnail_id($post->ID);
            if($thumb_id) {
                wp_delete_attachment($thumb_id, true);
            }
            wp_delete_post($post->ID, true); // true = force delete (bypass trash)
            $deleted_count++;
        }
        echo "<h1>TÜM ESKİ MAKALELER SİLİNDİ!</h1>";
        echo "<p>Toplam <strong>{$deleted_count}</strong> adet çöp makale ve bağlı görselleri sunucudan kalıcı olarak silindi.</p>";
        echo "<p>Şimdi yeni makaleleri yüklemek için diğer linke tıklayın.</p>";
        exit;
    }

    // ACTION 2: IMPORT PHASE 1 BATCH
    if (isset($_GET['run_v7_import']) && $_GET['run_v7_import'] === 'oktay') {
        $content_dir = plugin_dir_path(__FILE__) . 'content/';
        $files = glob($content_dir . 'batch-1-*.php');
        
        $imported_count = 0;
        
        foreach ($files as $file) {
            $data = include $file;
            
            // Check if post already exists
            $existing = get_page_by_path($data['slug'], OBJECT, 'post');
            if ($existing) continue; // Skip if already imported
            
            // Insert Post
            $post_id = wp_insert_post([
                'post_title' => $data['title'],
                'post_name' => $data['slug'],
                'post_content' => $data['content'],
                'post_status' => 'publish',
                'post_type' => 'post'
            ]);
            
            // Set Category
            wp_set_object_terms($post_id, 'blog', 'category');
            
            // Set Rank Math Meta
            update_post_meta($post_id, 'rank_math_focus_keyword', $data['keyword']);
            $desc = mb_convert_case($data['keyword'], MB_CASE_TITLE, "UTF-8") . " sefer saatleri, durak haritası, M9 metro, İDO, metrobüs aktarmaları ve SSS rehberi. MarmarayApp ile yolculuğunuzu planlayın.";
            update_post_meta($post_id, 'rank_math_description', $desc);
            
            // Handle Image (Featured Image)
            $upload_dir = wp_upload_dir();
            $artifact_path = plugin_dir_path(__FILE__) . 'assets/images/' . $data['image'];
            
            if (file_exists($artifact_path)) {
                $filename = basename($artifact_path);
                // To avoid duplicate filename conflicts, prefix with post id
                $new_filename = $post_id . '_' . $filename;
                $dest_path = $upload_dir['path'] . '/' . $new_filename;
                
                if (copy($artifact_path, $dest_path)) {
                    $attachment = [
                        'guid'           => $upload_dir['url'] . '/' . $new_filename,
                        'post_mime_type' => 'image/jpeg',
                        'post_title'     => $data['name'] . ' Marmaray İstasyonu',
                        'post_content'   => '',
                        'post_status'    => 'inherit'
                    ];
                    $attach_id = wp_insert_attachment($attachment, $dest_path, $post_id);
                    require_once(ABSPATH . 'wp-admin/includes/image.php');
                    $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
                    wp_update_attachment_metadata($attach_id, $attach_data);
                    set_post_thumbnail($post_id, $attach_id);
                    update_post_meta($attach_id, '_wp_attachment_image_alt', $data['name'] . ' İstasyonu');
                }
            }
            $imported_count++;
        }
        
        echo "<h1>AŞAMA 1 BAŞARIYLA YÜKLENDİ!</h1>";
        echo "<p>Toplam <strong>{$imported_count}</strong> adet kusursuz Mega Makale (Halkalı, Mustafa Kemal, Küçükçekmece, Florya, Florya Akvaryum, Yeşilköy, Yeşilyurt, Ataköy, Bakırköy, Yenimahalle) sisteme entegre edildi ve görselleri atandı.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazıları İncele</a>";
        exit;
    }
}
