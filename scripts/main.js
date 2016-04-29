$(document).ready(function(){
    'use strict';

    // Target the DOM element with the desired className.
    $('.app-1').itunesProductViewer({

        // App ID examples

        // Fastbreak Highlights: 1067609060
        // Netflix: 363590051
        // Fitbit: 462638897
        // DrumKick: 589674071

        // Add your app ID number here.

        //lookupID: '1067609060',

        /*
        Replace this affiliate token with your own. If you don't have an affiliate token, you can apply for one from Apple. It's free: http://www.apple.com/itunes/affiliates/
        One reason why you'd want an affiliate token, is because Apple will pay you 7% commission for each sale, as a way of thanking you for sending folks to the App Store from your link.
        */
        //affiliateToken: '10l3KX', 

        /*
        Campaign text allows you to track where your affiliate clicks are originated. It's not required, but it will provide better analytics about your customers and how you're sending them to the App Store.
        */
        //campaignText: 'itunes-product-viewer',

        appIconDimensions: 175, // Set the icon size in pixels. The default is 175x175.

        // The following settings options aren't required.
        // They are set to 'true' by default.
        showAuthorName: true,
        showAppIcon: true,
        showCurrency: true,
        showDescription: true,
        showDeviceInfo: true,
        showFileSize: true,
        showGenre: true,
        showPriceText: true,
        showPrice: true,
        showProductName: true,
        showScreenshots: true,
        showSellerUrl: true,
        showUserRatingCount: true,
        showVersionInfo: true,
        showVersionNumber: true
    });

    $('.app-2').itunesProductViewer({
        showCurrency: false
    });

    $('.app-3').itunesProductViewer();
});
