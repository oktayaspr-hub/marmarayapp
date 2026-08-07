<?php
/**
 * The template for displaying all single pages
 */

get_header();
?>

<main id="primary" class="site-main app-main page-wrapper-center">
    <div class="page-wrapper">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header" style="text-align: center;">
                    <?php the_title( '<h1 class="page-title">', '</h1>' ); ?>
                </header><!-- .entry-header -->

                <div class="entry-content">
                    <?php
                    the_content();
                    ?>
                </div><!-- .entry-content -->
            </article><!-- #post-<?php the_ID(); ?> -->
            <?php
        endwhile; // End of the loop.
        ?>
    </div>
</main><!-- #primary -->

<?php
get_footer();
