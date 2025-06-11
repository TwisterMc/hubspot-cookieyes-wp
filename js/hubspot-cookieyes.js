'use strict';

// IIFE to avoid global scope pollution
(function(window, document) {
    // Ensure we're running in a browser context
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // Disable HubSpot's default cookie banner
    window.disableHubSpotCookieBanner = true;
    window._hsp = window._hsp || [];

    // Updates HubSpot consent settings with input validation
    const setHubSpotConsent = (consentDetails) => {
        if (!consentDetails || typeof consentDetails !== 'object') {
            console.error('Invalid consent details provided');
            return;
        }

        // Ensure all required properties are boolean
        const sanitizedConsent = {
            analytics: Boolean(consentDetails.analytics),
            advertisement: Boolean(consentDetails.advertisement),
            functionality: Boolean(consentDetails.functionality)
        };

        window._hsp.push(["setHubSpotConsent", sanitizedConsent]);
    };

    // Maps CookieYes categories to HubSpot's consent format with validation
    const getConsentDetails = ({ analytics, advertisement, functional } = {}) => ({
        analytics: Boolean(analytics),
        advertisement: Boolean(advertisement),
        functionality: Boolean(functional),
    });

    // Validate CookieYes event detail
    const validateEventDetail = (detail, type) => {
        if (!detail || typeof detail !== 'object') {
            console.error(`Invalid ${type} event detail:`, detail);
            return false;
        }
        return true;
    };

    // Event listener for CookieYes banner load
    document.addEventListener("cookieyes_banner_load", (event) => {
        if (!validateEventDetail(event.detail, 'banner_load')) {
            return;
        }

        const categories = event.detail.categories;
        if (!categories || typeof categories !== 'object') {
            console.error('Invalid categories object:', categories);
            return;
        }

        setHubSpotConsent(
            getConsentDetails({
                analytics: categories.analytics,
                advertisement: categories.advertisement,
                functional: categories.functional,
            })
        );
    });

    // Event listener for CookieYes consent update
    document.addEventListener("cookieyes_consent_update", (event) => {
        if (!validateEventDetail(event.detail, 'consent_update')) {
            return;
        }

        const accepted = event.detail.accepted;
        if (!Array.isArray(accepted)) {
            console.error('Invalid accepted categories array:', accepted);
            return;
        }

        const acceptedCategories = new Set(accepted);

        const consentDetails = {
            analytics: acceptedCategories.has("analytics"),
            advertisement: acceptedCategories.has("advertisement"),
            functionality: acceptedCategories.has("functional"),
        };

        setHubSpotConsent(consentDetails);
    });
})(window, document);
