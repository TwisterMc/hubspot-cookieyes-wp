<?php
/**
 * Plugin Name: HubSpot CookieYes Integration
 * Description: Integrates HubSpot consent management with CookieYes
 * Version: 1.0.0
 * Author: Thomas McMahon
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: hubspot-cookieyes
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Load plugin textdomain.
 */
function hscy_load_textdomain() {
    load_plugin_textdomain( 'hubspot-cookieyes', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}
add_action( 'init', 'hscy_load_textdomain' );

/**
 * Output the HubSpot CookieYes integration script directly in head.
 *
 * This function outputs the JavaScript inline in the head to ensure it loads
 * as early as possible, which is critical for cookie consent functionality.
 *
 * @since 1.0.0
 *
 * @return void
 */
function hscy_output_early_script() {
    $js_file = plugin_dir_path( __FILE__ ) . 'js/hubspot-cookieyes.js';
    
    if ( ! file_exists( $js_file ) || ! is_readable( $js_file ) ) {
        error_log( 
            sprintf(
                /* translators: %s: JavaScript file path */
                esc_html__( 'HubSpot CookieYes Integration: JavaScript file not found or not readable at %s', 'hubspot-cookieyes' ),
                $js_file
            )
        );
        return;
    }

    // Generate a nonce for the script with descriptive action
    $nonce = wp_create_nonce( 'hscy_output_script' );
    
    // Read file content safely
    $content = file_get_contents( $js_file );
    if ( $content === false ) {
        error_log( esc_html__( 'HubSpot CookieYes Integration: Failed to read JavaScript file', 'hubspot-cookieyes' ) );
        return;
    }

    // Output script with nonce and proper escaping
    printf(
        '<script nonce="%s">%s</script>%s',
        esc_attr( $nonce ),
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Static file content, already sanitized
        $content,
        PHP_EOL
    );
}

// Add to wp_head with priority 0 to ensure it's as early as possible
add_action( 'wp_head', 'hscy_output_early_script', 0 );
