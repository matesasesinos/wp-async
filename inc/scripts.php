<?php

//Load script with attr

/**
 * Ref: https://developer.wordpress.org/reference/functions/wp_enqueue_script/
 */
function module_enqueue_scripts()
{
  wp_enqueue_script('app-main', get_template_directory_uri() . '/js/app.js', '', '1.2', true);
  /**
   * Variables passed to JS
   */
  wp_localize_script('app-main', 'test_vars', [
    'per_page' => get_option('posts_per_page')
  ]);
}
add_action('wp_enqueue_scripts', 'module_enqueue_scripts');

/**
 * Add attribute to script link:
 * Ref code: https://wordpress.stackexchange.com/questions/359599/add-extra-parameter-in-script-tag-using-script-loader-tag
 * Ref WP Hook: https://developer.wordpress.org/reference/hooks/script_loader_tag/
 */
add_filter('script_loader_tag', 'add_module_to_script', 10, 3);

function add_module_to_script($tag, $handle, $src)
{
  if ('app-main' === $handle) {
    $tag = '<script src="' . esc_url($src) . '" id="app-main" type="module"></script>';
  }

  return $tag;
}
