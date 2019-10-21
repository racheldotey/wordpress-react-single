<?php
/**
 * The main functions file
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

require_once dirname(__FILE__) . '/lib/php/add-react-shortcodes.php';
require_once dirname(__FILE__) . '/lib/php/api-functions-posts.php';
require_once dirname(__FILE__) . '/lib/php/api-functions-menus.php';
require_once dirname(__FILE__) . '/lib/php/api-functions-sidebars.php';

/* Enqueue styles and scripts */
function rachel_scripts() {

    // Load our main stylesheet.
    wp_enqueue_style('rachel-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('rachel-style-dist', get_template_directory_uri() . '/lib/style.css');

    // Load scripts
    wp_enqueue_script('rachel-script', get_template_directory_uri() . '/lib/app.js', array(), '1.0', true);

    $url = trailingslashit(home_url());
    $path = trailingslashit(parse_url($url, PHP_URL_PATH));

    wp_scripts()->add_data('rachel-script', 'data', sprintf('var ThemeVariables = %s;', wp_json_encode(array(
        'title' => get_bloginfo('name', 'display'),
        'tagline' => get_bloginfo('description', 'display'),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw(get_rest_url(null, '/wp/v2/')),
            'apitheme' => esc_url_raw(get_rest_url(null, '/rachel/v2/')),
            'root' => esc_url_raw($url)
        ),
        'show_on_front' => get_option('show_on_front'), // 'posts' or 'page'
        'page_on_front' => get_option('page_on_front') // ID if static page is set for front page
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



if (!function_exists('rachel_add_custom_sidebars')) :
    // Register Sidebars
    function rachel_add_custom_sidebars() {

        register_sidebar(
            array(
                'id' => 'footer-sidebar',
                'class' => 'footer-sidebar',
                'name' => __('Footer Widget Area', 'rachel_react_single'),
                'description' => __('Widget area to appear in the footer area.', 'rachel_react_single'),
                'before_title' => '<h5 class="widget-title">',
                'after_title' => '</h5>',
                'before_widget' => '<li class="widget-container %s">',
                'after_widget' => '</li>'
            )
        );

        register_sidebar(
            array(
                'id' => 'blog-sidebar',
                'class' => 'blog-sidebar',
                'name' => __('Blog Sidebar', 'rachel_react_single'),
                'description' => __('Sidebar widget area to appear in the blog section.', 'rachel_react_single'),
                'before_title' => '<h5 class="widget-title">',
                'after_title' => '</h5>',
                'before_widget' => '<div class="widget-container %s">',
                'after_widget' => '</div>'
            )
        );

        register_sidebar(
            array(
                'id' => 'policy-sidebar',
                'class' => 'policy-sidebar',
                'name' => __('Policy Sidebar', 'rachel_react_single'),
                'description' => __('Sidebar widget area to appear in the policy section.', 'rachel_react_single'),
                'before_title' => '<h5 class="widget-title">',
                'after_title' => '</h5>',
                'before_widget' => '<div class="widget-container %s">',
                'after_widget' => '</div>'
            )
        );

        register_sidebar(
            array(
                'id' => 'not-found-sidebar',
                'class' => 'not-found-sidebar',
                'name' => __('Page Not Found Sidebar', 'rachel_react_single'),
                'description' => __('Sidebar widget area to appear on the 404 Page Not Found page.', 'rachel_react_single'),
                'before_title' => '<h5 class="widget-title">',
                'after_title' => '</h5>',
                'before_widget' => '<div class="widget-container %s">',
                'after_widget' => '</div>'
            )
        );
    }
    add_action('widgets_init', 'rachel_add_custom_sidebars');
endif;
