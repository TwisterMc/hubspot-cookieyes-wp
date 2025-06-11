# HubSpot CookieYes Integration for WordPress

A WordPress plugin that seamlessly integrates HubSpot's consent management with CookieYes cookie consent banner.

## Description

This plugin bridges the gap between HubSpot and CookieYes consent management systems, ensuring that user privacy preferences are consistently maintained across both platforms. When a user interacts with the CookieYes consent banner, their preferences are automatically synchronized with HubSpot's consent management system.

## Features

- Automatically integrates CookieYes consent preferences with HubSpot
- Loads early in the page lifecycle for optimal functionality
- Includes security features like nonce verification
- Provides error logging for easier troubleshooting
- Zero configuration required - works out of the box

## Requirements

- WordPress 5.0 or higher
- HubSpot tracking code installed on your site or the [HubSpot WordPress plugin](https://wordpress.org/plugins/leadin/)
- CookieYes plugin installed and configured
- PHP 7.4 or higher

## Installation

1. Upload the `hubspot-cookieyes-wp` directory to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Ensure both HubSpot tracking code and CookieYes are properly configured on your site

## Technical Details

The plugin works by injecting a small JavaScript snippet into your page's `<head>` section. This script:
- Listens for CookieYes consent changes
- Maps CookieYes categories to HubSpot consent types
- Updates HubSpot's consent tracking accordingly

## Security

- Uses WordPress nonces for script security
- Implements proper file permissions checking
- Sanitizes all outputs

## Credits

The integration approach is based on the official CookieYes documentation: [Integrating HubSpot Consent API with CookieYes](https://www.cookieyes.com/documentation/integrating-hubspot-consent-api-with-cookieyes/).

## License

This plugin is licensed under the GPL v3 or later.