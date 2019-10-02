<?php
/**
 * The main functions file
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

require_once dirname(__FILE__) . '/lib/api-functions-posts.php';

/* Enqueue styles and scripts */
function rachel_scripts()
{

    // Load our main stylesheet.
    wp_enqueue_style('bootstrap-style', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    wp_enqueue_style('rachel-style-dist', get_template_directory_uri() . '/dist/style.css');
    wp_enqueue_style('rachel-style', get_template_directory_uri() . '/style.css');

    // Load scripts
    //wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.2.1.slim.min.js', '20171006', false );	
    wp_enqueue_script('scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js', array('jquery'), '1.0', false);
    //wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js', array( 'jquery' ), '20171006', false );
    //wp_enqueue_script( 'bootstrap-script', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js', array( 'jquery' ), '20171006', false );

    wp_enqueue_script('rachel-script', get_template_directory_uri() . '/dist/app.js', array(), '1.0', true);

    $url = trailingslashit(home_url());
    $path = trailingslashit(parse_url($url, PHP_URL_PATH));

    wp_scripts()->add_data('rachel-script', 'data', sprintf('var ThemeVariables = %s;', wp_json_encode(array(
        'title' => get_bloginfo('name', 'display'),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw(get_rest_url(null, '/wp/v2/')),
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
