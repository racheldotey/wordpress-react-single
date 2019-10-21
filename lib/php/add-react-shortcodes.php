<?php
/**
 * Add WordPress shortcodes to create on page anchor navigation
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// If this function already exists something is wrong
if (!function_exists('rachel_scroll_to_hash_component')) :

    function rachel_scroll_to_hash_component( $atts, $content = "&nbsp;" ) {
        $atts = shortcode_atts( array(
            'to' => '#to-not-set'
        ), $atts, 'scroll-to-hash' );
    
        return "<ScrollToHash to='{$atts['to']}'>{$content}</ScrollToHash>";
    }

    // Add shortcode to navigate to hash links
    add_shortcode( 'scroll-to-hash', 'rachel_scroll_to_hash_component' );

endif;