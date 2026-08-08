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

// Enforce 12 posts per page for blog category
add_action('pre_get_posts', 'marmaray_blog_posts_per_page');
function marmaray_blog_posts_per_page($query) {
    if (!is_admin() && $query->is_main_query() && ($query->is_category('blog') || $query->is_home())) {
        $query->set('posts_per_page', 12);
    }
}

// Hide admin bar on frontend for app-like experience
add_filter('show_admin_bar', '__return_false');

