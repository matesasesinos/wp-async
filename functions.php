<?php

/**
 * functions theme
 */

if (!function_exists('theme_setup')) {
    function theme_setup()
    {

        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');

        add_action('after_setup_theme', 'theme_language');
        add_action('wp_enqueue_scripts', 'styles');

        require_functions();
    }

    function theme_language()
    {
        load_theme_textdomain('theme-test', get_template_directory() . '/languages');
    }

    function require_functions()
    {
        require get_template_directory() . '/inc/scripts.php';
        require get_template_directory() . '/inc/entities.php';
        require get_template_directory() . '/inc/posts-utilities.php';
    }

    function styles()
    {
        wp_enqueue_style('boostrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css');
    }

    theme_setup();
}
