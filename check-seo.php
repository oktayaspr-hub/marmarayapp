<?php
require 'wp-load.php';

$posts = get_posts(['post_type' => 'post', 'posts_per_page' => 10, 'category_name' => 'blog']);

foreach($posts as $p) {
    $keyword = get_post_meta($p->ID, 'rank_math_focus_keyword', true);
    $desc = get_post_meta($p->ID, 'rank_math_description', true);
    $word_count = str_word_count(strip_tags($p->post_content));
    $url_len = strlen(home_url('/' . $p->post_name . '/'));
    
    echo "ID: " . $p->ID . "\n";
    echo "Title: " . $p->post_title . "\n";
    echo "Slug: " . $p->post_name . "\n";
    echo "URL Length: " . $url_len . "\n";
    echo "Focus Keyword: '" . $keyword . "'\n";
    echo "Description: '" . $desc . "'\n";
    echo "Word Count: " . $word_count . "\n";
    
    $kw_count = substr_count(strtolower(strip_tags($p->post_content)), strtolower($keyword));
    echo "Keyword in Content Count: " . $kw_count . "\n";
    echo "---------------------------------\n";
}
