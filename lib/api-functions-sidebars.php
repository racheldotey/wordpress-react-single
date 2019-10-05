<?php
/**
 * Add new route to the WP REST API /sidebars
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// If this function already exists something is wrong
if (!class_exists('rachel_add_api_sidebars')) :

    class rachel_add_api_sidebars extends WP_REST_Controller {

        const THEME_API_NAMESPACE = 'rachel/v2';
        const THEME_API_BASE = 'sidebars';

        public function register_routes() {
            /**
             * Registers REST API Route
             * GET /sidebars/sidebar_name
             */
            register_rest_route(self::THEME_API_NAMESPACE, '/' . self::THEME_API_BASE . '/(?P<name>[a-zA-Z0-9_-]+)', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_sidebar_by_name'),
               )
           ));
        }

        /**
         * Get sidebar by sidebar name
         */
        public function get_sidebar_by_name($request) {

            global $wp_registered_sidebars, $wp_registered_widgets, $sidebars_widgets;
            
            $params = $request->get_params();
            $name = $params['name'];

            // If a sidebar is not set or has no widgets
            // Return an empty array
            if (!isset($wp_registered_sidebars[$name]) || !isset($sidebars_widgets[$name])) {
	            return array();
            }

            $sidebar = $wp_registered_sidebars[$name];
            $sidebar['widgets'] = $sidebars_widgets[$name];

            // Get WP Rendered sidebar HTML
            ob_start();
            dynamic_sidebar($name);
            $sidebar['rendered'] = ob_get_clean();

            return new WP_REST_Response( $sidebar, 200 );
        }
    }
    
    // Add our improvement to the REST API Init
    $AddAPIMenus = new rachel_add_api_sidebars();
    add_filter('rest_api_init', array($AddAPIMenus, 'register_routes'));

endif;