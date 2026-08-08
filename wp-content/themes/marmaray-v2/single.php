<?php
get_header();
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
                        <span class="posted-on">Yayınlanma: <?php echo get_the_date(); ?></span>
                    </div>
                </header>

                <div class="entry-content blog-content" style="line-height: 1.8; font-size: 1.1rem; color: var(--text-color);">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        endwhile; 
        ?>
    </div>
</main>

<?php
get_footer();
