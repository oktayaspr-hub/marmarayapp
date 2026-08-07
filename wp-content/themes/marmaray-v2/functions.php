<?php
/**
 * MarmarayApp Theme Functions
 */

function marmaray_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'marmaray_theme_setup');

function marmaray_theme_enqueue_assets() {
    // Fonts
    wp_enqueue_style('marmaray-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap', array(), null);
    
    // Theme stylesheet
    wp_enqueue_style('marmaray-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'marmaray_theme_enqueue_assets');
