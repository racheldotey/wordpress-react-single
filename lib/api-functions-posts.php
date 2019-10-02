<?php
/**
 * Add fields to the WP REST API /posts
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// If this function already exists something is wrong
if (!function_exists('rachel_register_api_fields')) :

    /* Add extra content to the API JSON output */
    function rachel_register_api_fields() {
        // Add Author Name
        register_rest_field(
            'post',
            'author_name',
            array(
                'get_callback'      => 'rachel_get_author_name',
                'update_callback'   => null,
                'schema'            => null
            )
        );

        // Add Featured Image
        register_rest_field(
            'post',
            'featured_image_src',
            array(
                'get_callback'      => 'rachel_get_image_src',
                'update_callback'   => null,
                'schema'            => null
            )
        );

        // Add Published Date
        register_rest_field(
            'post',
            'published_date',
            array(
                'get_callback'      => 'rachel_published_date',
                'update_callback'   => null,
                'schema'            => null
            )
        );
    }

    // Select and format author display name
    function rachel_get_author_name($object, $field_name, $request) {
        return get_the_author_meta('display_name');
    }

    // Select and format featured image url
    // If no featured image exists, return 0
    function rachel_get_image_src($object, $field_name, $request) {
        if ($object['featured_media'] == 0) {
            return $object['featured_media'];
        }
        $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'thumbnail', true);
        return $feat_img_array[0];
    }

    // Select and format post pulbished date
    function rachel_published_date($object, $field_name, $request) {
        return get_the_time('F j, Y');
    }

    // Add our improvement to the REST API Init
    add_action('rest_api_init', 'rachel_register_api_fields');

endif;