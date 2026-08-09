<?php
$file = 'wp-content/themes/marmaray-v2/functions.php';
$content = file_get_contents($file);
$content = preg_replace('#// Rank Math Homepage Overrides.*#s', '', $content);
$content = trim($content) . "\n\n" . <<<'EOT'
// Rank Math Homepage Overrides
add_filter( 'rank_math/frontend/title', function( $title ) {
    if ( is_front_page() || is_home() ) {
        return 'MarmarayApp - Canlı Marmaray Takip ve Sefer Saatleri';
    }
    return $title;
});

add_filter( 'rank_math/frontend/description', function( $description ) {
    if ( is_front_page() || is_home() ) {
        return 'Marmaray sefer saatleri, canlı Marmaray takip, tüm istasyon bilgileri, güncel Marmaray duyuruları ve daha fazlası yalnızca MarmarayApp\'de!';
    }
    return $description;
});

add_action('wp_head', function() {
    if ( is_front_page() || is_home() ) {
        echo '<meta name="keywords" content="marmaray, saatleri, canlı, en son, durak, marmaray saatleri, marmaray üsküdar, marmaray yenikapı, marmaray gebze, marmaray halkalı">';
    }
}, 1);
EOT;
file_put_contents($file, $content);
echo "Done.";
