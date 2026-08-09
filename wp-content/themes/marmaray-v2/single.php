<?php
get_header();

// Ayarları Çek
$show_comments = get_option( 'marmarayapp_blog_comments', 1 );
$show_author   = get_option( 'marmarayapp_blog_author', 1 );
$show_date     = get_option( 'marmarayapp_blog_date', 1 );
?>

<main id="primary" class="site-main app-main page-wrapper-center">
    <div class="page-wrapper" style="max-width: 900px;">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('blog-single-article'); ?> style="padding: 20px;">
                <header class="entry-header" style="text-align: center; margin-bottom: 30px;">
                    <?php 
                    if ( has_post_thumbnail() ) {
                        echo '<div class="post-thumbnail" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">';
                        the_post_thumbnail('full', array('style' => 'width: 100%; height: auto; display: block;'));
                        echo '</div>';
                    }
                    ?>
                    <?php the_title( '<h1 class="page-title" style="color: var(--primary-color); font-size: 2.2rem; margin-bottom: 10px;">', '</h1>' ); ?>
                    
                    <div class="entry-meta" style="color: #666; font-size: 0.9rem;">
                        <?php if ( $show_author ) : ?>
                            <span class="posted-by" style="margin-right: 15px;"><i class="dashicons dashicons-admin-users"></i> Yazar: MarmarayApp Editörü</span>
                        <?php endif; ?>
                        
                        <?php if ( $show_date ) : ?>
                            <span class="posted-on"><i class="dashicons dashicons-calendar-alt"></i> Yayınlanma: <?php echo get_the_date(); ?></span>
                        <?php endif; ?>
                    </div>
                </header>

                <div class="entry-content blog-content" style="line-height: 1.8; font-size: 1.1rem; color: var(--text-color);">
                    <?php the_content(); ?>
                </div>
                
                <?php if ( $show_comments && ( comments_open() || get_comments_number() ) ) : ?>
                    <div class="comments-area" style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #eee;">
                        <?php comments_template(); ?>
                    </div>
                <?php endif; ?>
            </article>
            <?php
        endwhile; 
        ?>
    </div>
</main>

<?php
get_footer();
