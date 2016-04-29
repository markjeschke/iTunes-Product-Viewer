(function ($) {
    'use strict';
    $.fn.itunesProductViewer = function( options ) {
        // Grab the values from the data attributes in the <div> HTML markup.
        var $this = $(this),
            lookupID = $this.data('app-link') ? $(this).data('app-link') : '589674071',
            affiliateToken = $this.data('affiliate-token') ? $(this).data('affiliate-token') : '10l3KX',
            campaignText = $this.data('campaign-text') ? $(this).data('campaign-text') : 'itunesProductViewer',
            entity = $this.data('entity') ? $(this).data('entity') : 'software';

        var settings = $.extend({
            // These are the defaults when these options aren't explicitly set within main.js.
            affiliateToken: affiliateToken,
            campaignText: campaignText,
            entity: entity,
            lookupID: lookupID,
            appIconDimensions: 175,
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
        }, options );
        // Call the fetchData function.
        fetchData ($this, settings);
        // Grab options based upon the settings variable.
        return $this;
    };
    
    function fetchData ($instance, settings) {

        $.getJSON('https://itunes.apple.com/lookup?id=' + settings.lookupID + '&callback=?', function(data) {
            // Store paths and array lengths in their own variable.
            var resultCount = data.resultCount, // Grab the result count
                html = '<ul class="app-viewer">\n',
                affiliateTokenUrl,
                appIconDimensions = settings.appIconDimensions,
                authorName,
                campaignTextUrl,
                fileSizeBytes,
                genre,
                itunesProductUrl,
                iconSize512,
                ipadScreenshotUrls, // This is an array, hence the following count variable.
                ipadScreenshotUrlsCount,
                productDescription,
                productName,
                productPriceText,
                productPriceValue,
                productCurrency,
                productVersion,
                supportedDevices, // This is an array, hence the following count variable.
                supportedDevicesCount,
                screenshotUrls, // This is an array, hence the following count variable.
                screenshotUrlsCount,
                sellerUrl,
                userRatingCount,
                // Fill values from the settings object
                affiliateToken = settings.affiliateToken,
                campaignText = settings.campaignText,
                showDescription = settings.showDescription,
                showDeviceInfo = settings.showDeviceInfo,
                showPriceText = settings.showPriceText,
                showPrice = settings.showPrice,
                showScreenshots = settings.showScreenshots,
                showSellerUrl = settings.showSellerUrl,
                showUserRatingCount = settings.showUserRatingCount,
                showVersionInfo = settings.showVersionInfo,
                affiliateUrl = affiliateTokenUrl + campaignTextUrl,
                appIconBorderRadius = appIconDimensions/5; // This retains the app's rounded corner aspect ratio.

            if (affiliateToken === '' || affiliateToken === null) {
                affiliateTokenUrl = '';
            } else {
                affiliateTokenUrl = '&at=' + affiliateToken;
                if (campaignText === '' || campaignText === null) {
                    campaignTextUrl = '';
                } else {
                    campaignTextUrl = '&ct=' + campaignText;
                }
                affiliateUrl = affiliateTokenUrl + campaignTextUrl;
            }

            // Cycle through the JSON feed and parse the attributes.
            for (var n = 0; n < resultCount; n++) {
                productName = data.results[n].trackName;
                authorName = data.results[n].artistName;
                itunesProductUrl = data.results[n].trackViewUrl + affiliateUrl;
                sellerUrl = data.results[n].sellerUrl;
                iconSize512 = data.results[n].artworkUrl512;
                productPriceValue = data.results[n].formattedPrice;
                productCurrency = data.results[n].currency;
                fileSizeBytes = data.results[n].fileSizeBytes;
                genre = data.results[n].primaryGenreName;
                productVersion = data.results[n].version;

                html += '<li>\n';

                // Show app name
                var showProductName = settings.showProductName ? html += '<h2 class="product-name"><a href="' + itunesProductUrl + '" target="_blank" title="Get ' + productName + ' on the App Store, now!">' + productName + '</a></h2>' : settings.showProductName;

                // Show author or company name
                var showAuthorName = settings.showAuthorName ? html += '<p class="author-name">By ' + authorName + '</p>' : settings.showAuthorName;

                // Show app icon
                var showAppIcon = settings.showAppIcon ? html += '<a href="' + itunesProductUrl + '" target="_blank" title="Image icon of ' + productName + '"><img class="icon" style="border-radius:' + appIconBorderRadius + 'px;" src="' + iconSize512 + '" width="' + appIconDimensions + '" height="' + appIconDimensions + '" alt="Image icon of ' + productName + '" /></a>' : settings.showAppIcon;

                // Show currency, such as USD
                var showCurrency = settings.showCurrency ? settings.showCurrency : productCurrency = '';

                // Show price
                if (showPrice) {
                    if (showPriceText) {
                        productPriceText = 'Price: ';
                    } else {
                        productPriceText = '';
                    }
                    html += '<p class="price">' + productPriceText + productPriceValue + ' ' + productCurrency + '</p>';
                }

                // Show app genre/category
                var showGenre = settings.showGenre ? html += '<p class="category">Category: ' + genre + '</p>' : settings.showGenre;

                // Show app version number
                var showVersionNumber = settings.showVersionNumber ? html += '<p class="version">Version: ' + productVersion + '</p>' : settings.showVersionNumber;

                // Show user rating count for this app version
                if (showUserRatingCount) {
                    userRatingCount = data.results[n].userRatingCountForCurrentVersion;
                    var peoplePlural = 'people have';
                    if (userRatingCount === undefined || userRatingCount < 1) {
                        userRatingCount = 0;
                    } else if (userRatingCount === 1) {
                        peoplePlural = 'person has';
                    }
                    html += '<p>' + userRatingCount + ' ' + peoplePlural + ' rated this version.</p>';
                }

                // Show file size
                var showFileSize = settings.showFileSize ? html += '<p>Size: ' + bytesToSize(fileSizeBytes) + '</p>' : settings.showFileSize;
                
                // Show app seller URL
                if (showSellerUrl) {
                    if (sellerUrl != null) {
                        html += '<a href="' + sellerUrl + '" target="_blank" title="Learn more on the ' + productName + ' website.">' + authorName + ' Web Site</a></p>';
                    }
                }

                // Show what's new in this app version
                if (showVersionInfo) {
                    productDescription = data.results[n].description + '<br /><br /><h4>What\'s new in version ' + productVersion + ':</h4><p> ' + data.results[n].releaseNotes;
                } else {
                    productDescription = data.results[n].description;
                }

                // Find all of the \n and \r in the product description that HTML can't format, and replace them with <br /> tags.
                productDescription = productDescription.replace(/(?:\n)/g, '<br />');
                productDescription = productDescription.replace(/(?:•)/g, '•');

                // Show App Description
                if (showDescription) {
                    // Display app description and its latest version.
                    html += '<h3>Description</h3>';
                    html += '<p>' + productDescription + '</p>';
                }

                // Show Screenshots
                if (showScreenshots) {
                    if (screenshotUrls != '') {
                        // If the app contains iPhone screenshots, display them.
                        screenshotUrls = data.results[n].screenshotUrls;
                        screenshotUrlsCount = screenshotUrls.length;
                        // Cycle through the array of images.
                        for (var i = 0; i < screenshotUrlsCount; i++) {
                            html += '<img class="screenshots" src="' + screenshotUrls[i] + '" width="320" height="auto" alt="Screenshot ' + [i] + ' of ' + productName + '" />';
                        }
                    }

                    // If the app contains iPad screenshot, display them.
                    ipadScreenshotUrls = data.results[n].ipadScreenshotUrls;
                    if (ipadScreenshotUrls != '' || ipadScreenshotUrls != undefined) {
                        ipadScreenshotUrlsCount = ipadScreenshotUrls.length;

                        // Cycle through the array of images.
                        for (var s = 0; s < ipadScreenshotUrlsCount; s++){
                            html += '<img class="screenshots" src="' + ipadScreenshotUrls[s] + '" width="480" height="360" alt="iPad Screenshot ' + (s+1) + ' of ' + productName + '" />';
                        }
                    }
                }

                // Show Device info
                if (showDeviceInfo) {
                    // List Supported iOS devices.
                    supportedDevices = data.results[n].supportedDevices;
                    supportedDevicesCount = supportedDevices.length;
                    html += '<h4>Supported Devices</h4>';
                    html += '<ul>';
                    for (var d = 0; d < supportedDevicesCount; d++) {
                        html += supportedDevices[d] + '<br />';
                    }
                    html += '</ul>'; // Close unordered list.
                }

            } // End for loop.

            if (resultCount === 0) {
                $instance.html('Couldn\'t find any apps to display');
            } else {
                htmlOutput($instance, html); // Inject the html output into the htmlOutput function.
            }

        }); // end getJSON()

        // Output and display the HTML with the parsed data.
        function htmlOutput($instance, html) {
            // When this function is called, close the unordered list.
            html += '</ul>';
            // Display the JSON content in the HTML within the 'content' class div.
            $instance.html(html);
        }

        // Convert the app's file size bytes into a format that's user-friendly, displaying its size in kilobytes (KB), megabytes <MB), etc.
        function bytesToSize(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            if (i == 0) return bytes + ' ' + sizes[i];
            return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        }

    } // End fetchData function.
}( jQuery ));
