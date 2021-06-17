<?php get_header() ?>

<div class="container">
    <div class="row">

        <?php
        // Start the loop.
        while (have_posts()) : the_post();
        ?>
            <div class="col-12 text-center">
                <?php the_title('<h1>', '</h1>') ?>
            </div>
            <div class="col-12 image">
                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()) ?>" class="img-fluid" alt="">
            </div>
            <div class="col-12 content">
                <?php the_content() ?>
            </div>
        <?php
        endwhile;
        ?>
    </div>
</div>

<?php get_footer() ?>