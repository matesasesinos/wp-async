<?php

/**
 * Template Name: Test Javascript Front
 */
get_header() ?>

<div class="container">
    <div class="row" id="page">
        <div class="col-12 mb-3">
            <?php
            // Start the loop.
            while (have_posts()) : the_post();
                the_title('<h1>','</h1>');
            endwhile;
            ?>
        </div>
        <div id="loading">Cargando...</div>
    </div>
    <div class="row">
        <div class="col-12 text-center">
            <div class="d-grid gap-2"><button id="load-more" class="btn btn-primary btn-lg">Load More</button></div>
        </div>
    </div>
</div>

<?php get_footer() ?>