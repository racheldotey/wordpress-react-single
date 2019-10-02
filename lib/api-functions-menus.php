<?php
/**
 * Add new route to the WP REST API /menus
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// If this function already exists something is wrong
if (!class_exists('rachel_add_api_menus')) :

    class rachel_add_api_menus {

        const API_NAMESPACE = 'wp/v2';
        const THEME_NAMESPACE = 'rachel/v2';

        public function register_routes() {
            /**
             * Registers REST API Route
             * GET /menu/menu_location_slug
             */
            register_rest_route(self::THEME_NAMESPACE, '/menu/(?P<location>[a-zA-Z0-9_-]+)', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_menu_by_location_slug'),
               )
           ));
        }

        /**
         * Get menu for the corresponding location
         */
        public function get_menu_by_location_slug($request) {

            $params = $request->get_params();
            $location = $params['location'];
            $locations = get_nav_menu_locations();

            // If a menu for this location cannot be found
            // Return an empty array
            if (!isset($locations[ $location ])) {
	            return array();
            }

            $wp_menu = wp_get_nav_menu_object($locations[ $location ]);
            $menu_items = wp_get_nav_menu_items($wp_menu->term_id);

            // Reverse the array to get item children
			$rev_items = array_reverse($menu_items);
			$rev_menu = array();
			$cache = array();
            
			foreach ($rev_items as $item) :

				$formatted = array(
					'ID' => abs($item->ID),
					'order' => (int) $item->menu_order,
					'parent' => abs($item->menu_item_parent),
					'title' => $item->title,
					'url' => $item->url,
					'target' => $item->target,
					'classes' => implode(' ', $item->classes),
					'type' => $item->object,
					'children' => array(),
				);

				if (array_key_exists($item->ID , $cache)) {
					$formatted['children'] = array_reverse($cache[ $item->ID ]);
				}

				if ($item->menu_item_parent != 0) {
					if (array_key_exists($item->menu_item_parent , $cache)) {
						array_push($cache[ $item->menu_item_parent ], $formatted);
					} else {
						$cache[ $item->menu_item_parent ] = array($formatted);
					}
				} else {
					array_push($rev_menu, $formatted);
				}

			endforeach;

			return array_reverse ($rev_menu);
        }
    }
    
    // Add our improvement to the REST API Init
    $AddAPIMenus = new rachel_add_api_menus();
    add_filter('rest_api_init', array($AddAPIMenus, 'register_routes'));

endif;