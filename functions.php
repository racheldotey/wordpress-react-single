<?php
/**
 * The main functions file
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

require_once dirname(__FILE__) . '/lib/api-functions-posts.php';
require_once dirname(__FILE__) . '/lib/api-functions-menus.php';

/* Enqueue styles and scripts */
function rachel_scripts()
{

    // Load our main stylesheet.
    wp_enqueue_style('rachel-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('rachel-style-dist', get_template_directory_uri() . '/dist/style.css');

    // Load scripts
    wp_enqueue_script('rachel-script', get_template_directory_uri() . '/dist/app.js', array(), '1.0', true);

    $url = trailingslashit(home_url());
    $path = trailingslashit(parse_url($url, PHP_URL_PATH));

    wp_scripts()->add_data('rachel-script', 'data', sprintf('var ThemeVariables = %s;', wp_json_encode(array(
        'title' => get_bloginfo('name', 'display'),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw(get_rest_url(null, '/wp/v2/')),
            'apitheme' => esc_url_raw(get_rest_url(null, '/rachel/v2/')),
            'root' => esc_url_raw($url),
        )
    ))));
}
add_action('wp_enqueue_scripts', 'rachel_scripts');
/* END: Enqueue styles and scripts */



if (!function_exists('rachel_register_menus')) :
    // Add theme support for menus
    function rachel_register_menus() {
        register_nav_menus(
            array(
                'header-menu' => __('Header Menu'),
                'footer-menu' => __('Footer Menu'),
                'terms-menu' => __('Terms and Conditions Menu'),
                'blog-menu' => __('Blog Menu')
            )
        );
    }
    add_action('init', 'rachel_register_menus');
endif;
