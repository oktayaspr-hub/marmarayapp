require 'wp-load.php'; echo count(get_posts(['post_type' => 'post', 'posts_per_page' => -1, 'post_status' => 'publish']));
