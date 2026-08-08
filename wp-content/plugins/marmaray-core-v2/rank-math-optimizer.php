<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_rank_math_setup');

function marmaray_rank_math_setup() {
    if (isset($_GET['setup_rankmath']) && $_GET['setup_rankmath'] === 'oktay') {
        
        if (!class_exists('RankMath')) {
            echo "<h1>Rank Math eklentisi aktif değil! Lütfen önce eklentiyi aktifleştirin.</h1>";
            exit;
        }

        // 1. General Settings
        $general = get_option('rank-math-options-general', []);
        $general['attachment_redirect_urls'] = 'on'; // Redirect attachments to parent post
        $general['strip_category_base'] = 'on'; // Remove /category/ from URLs for cleaner SEO
        $general['breadcrumbs'] = 'on'; // Enable breadcrumbs
        $general['toc_plugin'] = '';
        update_option('rank-math-options-general', $general);

        // 2. Titles & Meta
        $titles = get_option('rank-math-options-titles', []);
        
        // Homepage
        $titles['homepage_title'] = 'MarmarayApp - Canlı Marmaray Takip ve Sefer Saatleri';
        $titles['homepage_description'] = 'Türkiye\'nin ilk ve tek Marmaray canlı takip uygulaması. Güncel sefer saatleri, duraklar arası ücret hesaplama ve rota planlama.';
        
        // Global Meta
        $titles['title_separator'] = '-';
        $titles['capitalize_titles'] = 'on';

        // Posts (Makaleler)
        $titles['pt_post_title'] = '%title% - %sitename%';
        $titles['pt_post_description'] = '%excerpt%';
        $titles['pt_post_custom_robots'] = 'on';
        $titles['pt_post_robots'] = ['index', 'follow'];

        // Pages (Sayfalar)
        $titles['pt_page_title'] = '%title% - %sitename%';
        $titles['pt_page_description'] = '%excerpt%';
        
        // Categories
        $titles['tax_category_title'] = '%term% Arşivi - %sitename%';
        $titles['tax_category_description'] = '%term_description%';
        
        update_option('rank-math-options-titles', $titles);

        // 3. Sitemap
        $sitemap = get_option('rank-math-options-sitemap', []);
        $sitemap['include_images'] = 'on'; // Include images in sitemap
        $sitemap['pt_post_sitemap'] = 'on';
        $sitemap['pt_page_sitemap'] = 'on';
        $sitemap['tax_category_sitemap'] = 'on';
        update_option('rank-math-options-sitemap', $sitemap);

        // Enable necessary modules in Rank Math
        $modules = get_option('rank_math_modules', []);
        $required_modules = ['sitemap', 'seo-analysis', 'rich-snippet'];
        foreach($required_modules as $mod) {
            if (!in_array($mod, $modules)) {
                $modules[] = $mod;
            }
        }
        update_option('rank_math_modules', $modules);

        // Force flush rewrite rules because we changed category base
        flush_rewrite_rules(false);

        echo "<h1>Rank Math Özel MarmarayApp SEO Ayarları Başarıyla Uygulandı!</h1>";
        echo "<p>Eklenti ayarları sitenize özel optimize edildi. Lütfen WordPress Yöneticisi üzerinden Rank Math panosuna gidip Google Search Console bağlantınızı yapmayı unutmayın.</p>";
        echo "<a href='/wp-admin/admin.php?page=rank-math'>Rank Math Paneline Git</a>";
        exit;
    }

