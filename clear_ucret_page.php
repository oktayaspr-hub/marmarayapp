<?php
require_once('wp-load.php');

$page = get_page_by_path('ucret-hesapla');
if ($page) {
    $page->post_content = '[marmaray_ucret]';
    wp_update_post($page);
    echo "Updated ucret-hesapla page.";
} else {
    echo "Page not found.";
}
?>
