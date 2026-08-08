<?php
get_header();
?>

<main id="primary" class="site-main app-main page-wrapper-center">
    <div class="page-wrapper" style="max-width: 900px; padding: 20px;">
        <header class="page-header" style="text-align: center; margin-bottom: 40px;">
            <h1 class="page-title" style="color: var(--primary-color); font-size: 2.5rem; font-weight: 700;">
                <?php 
                if ( is_category() ) {
                    single_cat_title();
                } else {
                    echo 'Blog & Haberler';
                }
                ?>
            </h1>
            <?php if ( category_description() ) : ?>
                <div class="archive-description" style="color: #666; font-size: 1.1rem; margin-top: 10px;">
                    <?php echo category_description(); ?>
                </div>
            <?php endif; ?>
        </header>

        <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) :
                    the_post();
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('blog-card'); ?> style="background: var(--card-bg, #fff); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <a href="<?php the_permalink(); ?>" class="post-thumbnail" style="display: block; height: 200px; overflow: hidden;">
                                <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;')); ?>
                            </a>
                        <?php endif; ?>
                        
                        <div class="blog-card-content" style="padding: 20px;">
                            <header class="entry-header">
                                <?php the_title( sprintf( '<h2 class="entry-title" style="font-size: 1.2rem; margin-bottom: 10px; line-height: 1.4;"><a href="%s" rel="bookmark" style="color: var(--text-color); text-decoration: none;">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
                            </header>

                            <div class="entry-summary" style="color: #666; font-size: 0.95rem; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                                <?php the_excerpt(); ?>
                            </div>

                            <a href="<?php the_permalink(); ?>" class="read-more-btn" style="display: inline-block; padding: 8px 16px; background: var(--primary-color, #0056b3); color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 0.9rem;">Devamını Oku</a>
                        </div>
                    </article>
                    <?php
                endwhile;
            else :
                echo '<p style="text-align:center; width:100%;">Henüz yazı bulunmamaktadır.</p>';
            endif;
            ?>
        </div>
        
        <div class="pagination" style="margin-top: 40px; text-align: center;">
            <?php 
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => '« Önceki',
                'next_text' => 'Sonraki »',
            ) ); 
            ?>
        </div>
    </div>
</main>

<style>
.blog-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important; }
.blog-card:hover .post-thumbnail img { transform: scale(1.05); }
</style>

<?php
get_footer();
