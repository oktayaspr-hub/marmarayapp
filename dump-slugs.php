<?php
require 'wp-load.php';
$posts = get_posts(['post_type' => 'post', 'posts_per_page' => -1, 'category_name' => 'blog']);
$slugs = [];
foreach($posts as $p) {
    $slugs[] = $p->post_name;
}
echo json_encode($slugs);
