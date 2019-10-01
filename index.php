<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage React Single Page by Rachel
 * @since React Single Page by Rachel 1.0
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <link rel="shortcut icon" href="<?php echo home_url() ?>/wp-content/themes/rachel-react-single/dist/images/favicon.ico" type="image/x-icon">
        <title>DEV</title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div id="page">
            <div id="content" style="width: 100%; text-align:center; position: absolute; top: 50%; transform: translateY(-50%);">
                <div class="loader-gif" style="margin:auto;">
                    <h3 style="margin-bottom:0;">One moment please...</h3>
                    <img src="<?php echo home_url() ?>/wp-content/themes/rachel-react-single/dist/images/loader-ring-large.gif" alt="Loader">
                    <h3 style="margin-top:0;">while we load something amazing!</h3>
                </div>
            </div>
            <?php wp_footer(); ?>
        </div>			
    </body>
</html>