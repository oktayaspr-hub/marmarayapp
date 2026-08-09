<?php
require_once 'wp-load.php';

// Check if category exists or create it
$cat_name = 'Blog';
$cat_id = get_cat_ID($cat_name);
if (!$cat_id) {
    $cat_id = wp_insert_category(array('cat_name' => $cat_name, 'category_nicename' => 'blog'));
}

// Get all posts and assign them to this category
$posts = get_posts(array('post_type' => 'post', 'numberposts' => -1));
foreach ($posts as $post) {
    wp_set_post_categories($post->ID, array($cat_id), false);
}
echo "Category ID: " . $cat_id;
