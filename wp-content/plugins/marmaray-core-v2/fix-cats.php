<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_assign_blog_cat');
function marmaray_assign_blog_cat() {
    if (isset($_GET['fix_cats'])) {
        $cat_id = get_cat_ID('Blog');
        if (!$cat_id) {
            $cat_id = wp_insert_category(['cat_name' => 'Blog', 'category_nicename' => 'blog']);
        }
        
        $slugs = ['yenikapi-marmaray-istasyonu-saatler-ve-aktarmalar', 'pendik-marmaray-istasyonu-yht-aktarma-saatleri', 'ayrilikcesmesi-marmaray-kadikoy-metrosu-gecisi'];
        foreach ($slugs as $slug) {
            $post = get_page_by_path($slug, OBJECT, 'post');
            if ($post) {
                wp_set_post_categories($post->ID, [$cat_id], false);
            }
        }
    }
}
