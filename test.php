<?php
// Mock WordPress functions
function plugins_url($path = '', $plugin = '') {
    return '/wp-content/plugins/marmaray-core-v2/' . $path;
}
function esc_url($url) { return $url; }
define('WP_PLUGIN_DIR', __DIR__ . '/wp-content/plugins');

?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>MarmarayApp V3.0 Local Test</title>
    <link rel="stylesheet" href="/wp-content/plugins/marmaray-core-v2/assets/css/app.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body { background: #0f172a; color: white; font-family: 'Outfit', sans-serif; padding: 20px; }
    </style>
</head>
<body>

<div class="page-wrapper">
    <h1>Marmaray Saatleri (V3.0)</h1>
    <?php include(__DIR__ . '/wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php'); ?>
    
    <hr style="margin: 50px 0; border-color: rgba(255,255,255,0.1);">
    
    <h1>Ücret Hesapla (V3.0)</h1>
    <?php include(__DIR__ . '/wp-content/plugins/marmaray-core-v2/marmaray_ucret_view.php'); ?>
    
    <hr style="margin: 50px 0; border-color: rgba(255,255,255,0.1);">
    
    <h1>Rota Planla (V3.0)</h1>
    <?php include(__DIR__ . '/wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php'); ?>
</div>

<script src="/wp-content/plugins/marmaray-core-v2/assets/js/app.js" type="module"></script>
</body>
</html>
