<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_shortcode('marmaray_ucret', 'marmaray_ucret_sc');
function marmaray_ucret_sc() { ob_start(); include(plugin_dir_path(__FILE__) . 'marmaray_ucret_view.php'); return ob_get_clean(); }

// [marmaray_rota_planla]
add_shortcode('marmaray_rota_planla', 'marmaray_rota_sc');
function marmaray_rota_sc() { ob_start(); include(plugin_dir_path(__FILE__) . 'marmaray_rota_view.php'); return ob_get_clean(); }

add_shortcode('marmaray_saatleri', 'marmaray_saatleri_sc');
function marmaray_saatleri_sc() { ob_start(); include(plugin_dir_path(__FILE__) . 'marmaray_saatleri_view.php'); return ob_get_clean(); }

