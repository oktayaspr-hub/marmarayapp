<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_v31');

function marmaray_blog_importer_v31() {
    if (isset($_GET['insert_blog_v31']) && $_GET['insert_blog_v31'] === 'oktay') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $updates = [
            'feneryolu-marmaray-istasyonu-kalamis-fenerbahce' => 'feneryolu.jpg',
            'idealtepe-marmaray-istasyonu-sahil-keyfi' => 'idealtepe.jpg',
            'sureyya-plaji-marmaray-istasyonu' => 'sureyya.jpg',
            'cevizli-marmaray-istasyonu-adliye-avm' => 'cevizli.jpg',
            'atalar-marmaray-istasyonu-yeni-yasam' => 'atalar.jpg',
            'basak-marmaray-istasyonu-adliye' => 'basak.jpg',
            'yunus-marmaray-istasyonu' => 'yunus.jpg',
            'pendik-marmaray-istasyonu-yht' => 'pendik.jpg',
            'kaynarca-marmaray-istasyonu' => 'kaynarca.jpg',
            'tersane-marmaray-istasyonu' => 'tersane.jpg'
        ];

        foreach ($updates as $slug => $img_name) {
            $existing = get_page_by_path($slug, OBJECT, 'post');
            if ($existing) {
                $image_path = MARMARAYAPP_DIR . 'assets/images/blog/' . $img_name;
                if (file_exists($image_path)) {
                    $filename = basename($image_path) . '-' . time() . '.jpg';
                    $upload_file = wp_upload_bits($filename, null, file_get_contents($image_path));
                    
                    if (!$upload_file['error']) {
                        $wp_filetype = wp_check_filetype($filename, null);
                        $attachment = [
                            'post_mime_type' => $wp_filetype['type'],
                            'post_title'     => preg_replace('/\.[^.]+$/', '', $filename),
                            'post_content'   => '',
                            'post_status'    => 'inherit'
                        ];
                        $attach_id = wp_insert_attachment($attachment, $upload_file['file'], $existing->ID);
                        $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file['file']);
                        wp_update_attachment_metadata($attach_id, $attach_data);
                        set_post_thumbnail($existing->ID, $attach_id);
                    }
                }
            }
        }
        
        echo "<h1>Aşama 3: 10 Makalenin Öne Çıkan Görselleri Başarıyla Özgünleştirildi!</h1><a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
