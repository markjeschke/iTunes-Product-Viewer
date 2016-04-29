# iTunes Product Viewer

This `itunesProductViewer.js` jQuery plug-in, will allow you to quickly add app information, such as icons, descriptions, author, pricing, and screenshots to any webpage.

## Installation

Add these JavaScript files to your JavaScript directory, and place them at the `<head>` of your HTML page. If you place them after, the JavaScript within the `<body>` will execute before the data becomes available.

* `jquery.js`
* `itunesProductView.js`

** Here's how to add a single app to your webpage **

Be sure to place the required `div` and `JavaScript` code within the `<body>` tags.

```html
<div class="app-1"></div>
```

```js
<script>
  $('.app-1').itunesProductViewer({
  	// Enter the product ID of the app that you'd like to show.
    lookupID: '1067609060',
    // Enter your affiliate token provided by Apple.
    affiliateToken: '10l3KX',
    // Campaign Text informs where your affiliate clicks originated from and/or which app was associated with your affiliate token.
    campaignText: 'martin-web-page', 
    // The following options allow you to show and hide specific content, such as the app's icon, description, and pricing, etc.
    // They are set to true by default, if you don't include them.
    appIconDimensions: 175,
    showAuthorName: true,
    showAppIcon: true,
    showCurrency: true,
    showDescription: true,
    showDeviceInfo: true,
    showGenre: true,
    showPriceText: true,
    showPrice: true,
    showProductName: true,
    showScreenshots: true,
    showSellerUrl: true,
    showVersionInfo: true,
    showVersionNumber: true
    }
  });
</script>
```
** Here's how to add two apps to your webpage **

The name of the class is arbitrary. But, it needs to be consistent inside of the JavaScript.

```html
<div class="fast-break-highlights-app"></div>
<div class="drumkick-app"></div>
```

```js
<script>
  $('.fast-break-highlights-app').itunesProductViewer({
    lookupID: '1067609060', // Martin's app ID
    affiliateToken: '10l3KX', // Affiliate tokens are provided by Apple.
    campaignText: 'martin-web-page', // This is a method for tracking where your affiliate clicks originate from.
    appIconDimensions: 175,
    showAppIcon: true,
    showAuthorName: false,
    showCurrency: true,
    showDescription: false,
    showDeviceInfo: false,
    showGenre: false,
    showPriceText: false,
    showPrice: false,
    showProductName: true,
    showScreenshots: false,
    showSellerUrl: false,
    showVersionInfo: false
  });

  $('.drumkick-app').itunesProductViewer({
    lookupID: '589674071', // Mark's app
    affiliateToken: '10l3KX',
    campaignText: 'web'
  });
</script>
```
```html
</body>
```