<?php
// Script to fix images in batch files and live DB
require_once('../../../wp-load.php'); // Load WordPress environment

$content_dir = __DIR__ . '/wp-content/plugins/marmaray-core-v2/content/';
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
    'Sirkeci' => 'marmaray_train_station_1786232407160.jpg' // User specifically requested this
];

foreach ($files as $file) {
    $data = include $file;
    $station_name = $data['name'];
    
    if (isset($image_mapping[$station_name])) {
        $new_image = $image_mapping[$station_name];
        
        // 1. Update the batch file content
        $file_content = file_get_contents($file);
        // Replace the image line
        $file_content = preg_replace("/'image'\s*=>\s*'.*?'/", "'image' => '{$new_image}'", $file_content);
        file_put_contents($file, $file_content);
        echo "Updated batch file for $station_name\n";
        
        // 2. Update Live WordPress Post if it exists
        $post = get_page_by_path($data['slug'], OBJECT, 'post');
        if ($post) {
            $post_id = $post->ID;
            $upload_dir = wp_upload_dir();
            $plugin_image_path = __DIR__ . '/wp-content/plugins/marmaray-core-v2/assets/images/' . $new_image;
            
            if (file_exists($plugin_image_path)) {
                $filename = basename($plugin_image_path);
                $new_filename = $post_id . '_fixed_' . $filename; // Ensure it's unique
                $dest_path = $upload_dir['path'] . '/' . $new_filename;
                
                if (copy($plugin_image_path, $dest_path)) {
                    // Delete old thumbnail
                    $old_thumb_id = get_post_thumbnail_id($post_id);
                    if ($old_thumb_id) {
                        wp_delete_attachment($old_thumb_id, true);
                    }
                    
                    // Attach new image
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
                    update_post_meta($attach_id, '_wp_attachment_image_alt', $station_name . ' İstasyonu');
                    
                    echo "Updated live site thumbnail for $station_name\n";
                }
            } else {
                echo "Image not found at $plugin_image_path\n";
            }
        }
    }
}
echo "Done!\n";
