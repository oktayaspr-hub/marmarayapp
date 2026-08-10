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

    // ACTION 2: IMPORT BATCH WITH INTERNAL LINKING AND SEO ENGINE
    if (isset($_GET['run_v7_import']) && $_GET['run_v7_import'] === 'oktay') {
        $content_dir = plugin_dir_path(__FILE__) . 'content/';
        $files = glob($content_dir . 'batch-*\.php');
        
        $imported_count = 0;
        
        // --- STEP 2.1: PREPARE STATIONS FOR INTERNAL LINKING ---
        $stations_map = [];
        $station_data = [];
        foreach ($files as $file) {
            $data = include $file;
            $stations_map[$data['name']] = $data['slug'];
            $station_data[] = $data; 
        }
        
        // Sort station names by length descending to match longer names first
        uasort($stations_map, function($a, $b) use ($stations_map) {
            $name_a = array_search($a, $stations_map);
            $name_b = array_search($b, $stations_map);
            return mb_strlen($name_b) - mb_strlen($name_a);
        });

        // New Images mapping (AI generated specifically for these missing ones)
        $new_images = [
            'Ataköy' => 'atakoy_marmaray_1786294255776.jpg',
            'Bakırköy' => 'bakirkoy_marmaray_1786294267903.jpg',
            'Florya Akvaryum' => 'florya_akvaryum_marmaray_1786294277921.jpg',
            'Halkalı' => 'halkali_marmaray_1786294290840.jpg',
            'Ayrılık Çeşmesi' => 'ayrilikcesmesi_marmaray_1786294867794.jpg',
            'Erenköy' => 'erenkoy_marmaray_1786294888376.jpg',
            'Göztepe' => 'goztepe_marmaray_1786294900435.jpg',
            'Kazlıçeşme' => 'kazlicesme_marmaray_1786294914199.jpg',
            'Söğütlüçeşme' => 'sogutlucesme_marmaray_1786294933785.jpg',
            'Yenikapı' => 'yenikapi_marmaray_1786294944459.jpg',
            'Zeytinburnu' => 'zeytinburnu_marmaray_1786294956250.jpg',
            'Kartal' => 'kartal_marmaray_1786294974210.jpg',
            'Maltepe' => 'maltepe_marmaray_1786294984968.jpg',
            'Suadiye' => 'suadiye_marmaray_1786294994724.jpg',
            'Gebze' => 'gebze_marmaray_1786295013544.jpg',
            'Fatih' => 'fatih_marmaray_new_1786296595238.jpg',
            'Tersane' => 'tersane_marmaray_new_1786296608438.jpg'
        ];

        foreach ($station_data as $data) {
            
            // Check if post already exists
            $existing = get_page_by_path($data['slug'], OBJECT, 'post');
            if ($existing) continue; // Skip if already imported
            
            // --- INTERNAL LINKING ENGINE ---
            $content = $data['content'];
            $current_station = $data['name'];
            
            foreach ($stations_map as $station_name => $slug) {
                if ($station_name === $current_station) continue; // Don't link to itself
                
                $search1 = preg_quote($station_name . ' Marmaray İstasyonu', '/');
                $search2 = preg_quote($station_name . ' İstasyonu', '/');
                $search3 = preg_quote($station_name . ' Marmaray', '/');
                
                // Matches outside existing tags
                $regex = '/(?!(?:[^<]+>|[^>]+<\/a>))\b(' . $search1 . '|' . $search2 . '|' . $search3 . ')\b/ui';
                
                // Replace only the first occurrence to avoid keyword stuffing
                $content = preg_replace($regex, '<a href="https://www.marmarayapp.com/' . $slug . '/" title="' . $station_name . ' Marmaray İstasyonu">$1</a>', $content, 1);
            }
            
            // Insert Post
            $post_id = wp_insert_post([
                'post_title' => $data['title'],
                'post_name' => $data['slug'],
                'post_content' => $content,
                'post_status' => 'publish',
                'post_type' => 'post'
            ]);
            
            // Set Category
            wp_set_object_terms($post_id, 'blog', 'category');
            
            // --- RANK MATH SEO SNIPPET ENGINE ---
            update_post_meta($post_id, 'rank_math_focus_keyword', $data['keyword']);
            
            $station_name = $data['name'];
            $keyword = mb_convert_case($data['keyword'], MB_CASE_TITLE, "UTF-8");
            
            // Dynamic Unique Snippet 
            $desc = "{$station_name} Marmaray İstasyonu seferleri, güncel tren saatleri ve canlı takip ekranı! {$keyword} güzergahındaki aktarma noktaları ve SSS rehberi ile yolculuğunuzu MarmarayApp ile planlayın.";
            
            update_post_meta($post_id, 'rank_math_description', $desc);
            
            // --- IMAGE REPLACEMENT ENGINE ---
            if (isset($new_images[$data['name']])) {
                $data['image'] = $new_images[$data['name']];
            }
            
            // Handle Image (Featured Image)
            $upload_dir = wp_upload_dir();
            $artifact_path = plugin_dir_path(__FILE__) . 'assets/images/' . $data['image'];
            
            if (file_exists($artifact_path)) {
                $filename = basename($artifact_path);
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
                    update_post_meta($attach_id, '_wp_attachment_image_alt', $data['name'] . ' Marmaray İstasyonu');
                }
            }
            $imported_count++;
        }
        
        echo "<h1>TÜM MAKALELER (İÇ LİNKLEME VE ÖZGÜN SEO SNIPPET'LARI İLE) YÜKLENDİ!</h1>";
        echo "<p>Toplam <strong>{$imported_count}</strong> adet makale sisteme kusursuz olarak entegre edildi.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazıları İncele</a>";
        exit;
    }

    // ACTION 3: FIX IMAGES ON LIVE POSTS AND BATCH FILES
    if (isset($_GET['run_v7_fix_images']) && $_GET['run_v7_fix_images'] === 'oktay') {
        $content_dir = plugin_dir_path(__FILE__) . 'content/';
        $files = glob($content_dir . 'batch-*\.php');
        
        $image_mapping = [
            'Ataköy' => 'atakoy_marmaray_1786294255776.jpg',
            'Bakırköy' => 'bakirkoy_marmaray_1786294267903.jpg',
            'Florya Akvaryum' => 'florya_akvaryum_marmaray_1786294277921.jpg',
            'Halkalı' => 'halkali_marmaray_1786294290840.jpg',
            'Ayrılık Çeşmesi' => 'ayrilikcesmesi_marmaray_1786294867794.jpg',
            'Erenköy' => 'erenkoy_marmaray_1786294888376.jpg',
            'Göztepe' => 'goztepe_marmaray_1786294900435.jpg',
            'Kazlıçeşme' => 'kazlicesme_marmaray_1786294914199.jpg',
            'Söğütlüçeşme' => 'sogutlucesme_marmaray_1786294933785.jpg',
            'Yenikapı' => 'yenikapi_marmaray_1786294944459.jpg',
            'Zeytinburnu' => 'zeytinburnu_marmaray_1786294956250.jpg',
            'Kartal' => 'kartal_marmaray_1786294974210.jpg',
            'Maltepe' => 'maltepe_marmaray_1786294984968.jpg',
            'Suadiye' => 'suadiye_marmaray_1786294994724.jpg',
            'Gebze' => 'gebze_marmaray_1786295013544.jpg',
            'Sirkeci' => 'marmaray_train_station_1786232407160.jpg', // ONLY Sirkeci uses this now
            'Fatih' => 'fatih_marmaray_new_1786296595238.jpg',
            'Tersane' => 'tersane_marmaray_new_1786296608438.jpg'
        ];

        $updated_count = 0;
        foreach ($files as $file) {
            $data = include $file;
            $station_name = $data['name'];
            
            if (isset($image_mapping[$station_name])) {
                $new_image = $image_mapping[$station_name];
                
                // 1. Update Batch File
                $file_content = file_get_contents($file);
                $file_content = preg_replace("/'image'\s*=>\s*'.*?'/", "'image' => '{$new_image}'", $file_content);
                file_put_contents($file, $file_content);
                
                // 2. Update Live DB
                $post = get_page_by_path($data['slug'], OBJECT, 'post');
                if ($post) {
                    $post_id = $post->ID;
                    $upload_dir = wp_upload_dir();
                    $plugin_image_path = plugin_dir_path(__FILE__) . 'assets/images/' . $new_image;
                    
                    if (file_exists($plugin_image_path)) {
                        $filename = basename($plugin_image_path);
                        $new_filename = $post_id . '_fixed_' . $filename;
                        $dest_path = $upload_dir['path'] . '/' . $new_filename;
                        
                        if (copy($plugin_image_path, $dest_path)) {
                            // Delete old thumb
                            $old_thumb_id = get_post_thumbnail_id($post_id);
                            if ($old_thumb_id) {
                                wp_delete_attachment($old_thumb_id, true);
                            }
                            
                            $attachment = [
                                'guid'           => $upload_dir['url'] . '/' . $new_filename,
                                'post_mime_type' => 'image/jpeg',
                                'post_title'     => $station_name . ' Marmaray İstasyonu',
                                'post_content'   => '',
                                'post_status'    => 'inherit'
                            ];
                            $attach_id = wp_insert_attachment($attachment, $dest_path, $post_id);
                            require_once(ABSPATH . 'wp-admin/includes/image.php');
                            $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
                            wp_update_attachment_metadata($attach_id, $attach_data);
                            set_post_thumbnail($post_id, $attach_id);
                            update_post_meta($attach_id, '_wp_attachment_image_alt', $station_name . ' Marmaray İstasyonu');
                            $updated_count++;
                        }
                    }
                }
            }
        }
        echo "<h1>GÖRSELLER BAŞARIYLA TEMİZLENDİ VE GÜNCELLENDİ!</h1>";
        echo "<p>Sirkeci hariç tekrar eden tüm görseller kaldırıldı. Toplam <strong>{$updated_count}</strong> makalenin kapak fotoğrafı ve kaynak dosyası güncellendi.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazıları İncele</a>";
        exit;
    }
}
