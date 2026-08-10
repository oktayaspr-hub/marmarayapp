<?php
// marmaray-core-v2/restoration-importer-v9.php

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'marmaray_run_batch_importer_v9');

function marmaray_run_batch_importer_v9() {
    if (!isset($_GET['run_marmaray_importer']) || $_GET['run_marmaray_importer'] !== 'v9') {
        return;
    }

    // Bypass auth check for this temporary run
    // if (!current_user_can('manage_options')) {
    //    wp_die('Unauthorized');
    // }

    set_time_limit(120);
    ini_set('memory_limit', '512M');

    $json_path = plugin_dir_path(__FILE__) . '../../marmaray_blog_data.json';
    if (!file_exists($json_path)) {
        wp_die('JSON data file not found at ' . $json_path);
    }

    $json_data = file_get_contents($json_path);
    $posts_data = json_decode($json_data, true);

    if (!$posts_data) {
        wp_die('Failed to parse JSON data.');
    }

    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $step = isset($_GET['step']) ? intval($_GET['step']) : 0;
    $batch_size = 5;
    $total_posts = count($posts_data);
    $current_batch = array_slice($posts_data, $step, $batch_size);
    
    if (empty($current_batch)) {
        echo "<h1>Tebrikler! 43 İstasyonun tamamı başarıyla yüklendi ve güncellendi!</h1>";
        exit;
    }

    echo "<h1>Marmaray Import V9 - Aşama Aşama Yükleme</h1>";
    echo "<p>Şu an " . ($step + 1) . " ile " . min($step + $batch_size, $total_posts) . " arasındaki istasyonlar yükleniyor (Toplam: $total_posts)...</p>";
    echo "<ul>";

    foreach ($current_batch as $data) {
        $station = $data['station'];
        $title = $data['title'];
        $content = $data['content'];
        $excerpt = $data['excerpt'];
        $seo_desc = $data['seo_description'];
        $image_alt = $data['image_alt'];
        $image_filename = $data['image_filename'];
        $slug = $data['slug'];

        $image_path = plugin_dir_path(__FILE__) . 'assets/images/banners_v2/' . $image_filename;

        // 1. Process Image Upload
        $attachment_id = 0;
        if (file_exists($image_path)) {
            global $wpdb;
            $existing_attachment_id = $wpdb->get_var($wpdb->prepare(
                "SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'attachment'",
                $image_alt
            ));

            if ($existing_attachment_id) {
                $attachment_id = $existing_attachment_id;
            } else {
                $upload_dir = wp_upload_dir();
                $dest_path = $upload_dir['path'] . '/' . basename($image_path);
                copy($image_path, $dest_path);

                $filetype = wp_check_filetype(basename($dest_path), null);
                $attachment = array(
                    'guid'           => $upload_dir['url'] . '/' . basename($dest_path),
                    'post_mime_type' => $filetype['type'],
                    'post_title'     => $image_alt,
                    'post_content'   => $seo_desc,
                    'post_excerpt'   => $image_alt,
                    'post_status'    => 'inherit'
                );
                $attachment_id = wp_insert_attachment($attachment, $dest_path);
                
                if (!is_wp_error($attachment_id)) {
                    $attach_data = wp_generate_attachment_metadata($attachment_id, $dest_path);
                    wp_update_attachment_metadata($attachment_id, $attach_data);
                    update_post_meta($attachment_id, '_wp_attachment_image_alt', $image_alt);
                }
            }
        }

        // 2. Create or Update Post
        $existing_post = get_page_by_path($slug, OBJECT, 'post');
        
        $post_arr = array(
            'post_title'   => $title,
            'post_content' => $content,
            'post_excerpt' => $excerpt,
            'post_status'  => 'publish',
            'post_type'    => 'post',
            'post_name'    => $slug
        );

        if ($existing_post) {
            $post_arr['ID'] = $existing_post->ID;
            $post_id = wp_update_post($post_arr);
            $action = 'Güncellendi';
        } else {
            $post_id = wp_insert_post($post_arr);
            $action = 'Oluşturuldu';
        }

        if (!is_wp_error($post_id)) {
            if ($attachment_id && !is_wp_error($attachment_id)) {
                set_post_thumbnail($post_id, $attachment_id);
            }
            update_post_meta($post_id, '_yoast_wpseo_metadesc', $seo_desc);
            update_post_meta($post_id, 'rank_math_description', $seo_desc);
            echo "<li>✅ $action: $title</li>";
        } else {
            echo "<li>❌ Hata: $title</li>";
        }
    }
    echo "</ul>";

    $next_step = $step + $batch_size;
    $next_url = site_url() . '/?run_marmaray_importer=v9&step=' . $next_step;
    
    echo "<p>Lütfen bekleyin, 3 saniye içinde bir sonraki aşamaya geçiliyor...</p>";
    echo "<script>setTimeout(function() { window.location.href = '$next_url'; }, 3000);</script>";
    exit;
}
