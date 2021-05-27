const siteMetadata = require("./site-metadata.json");
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);

module.exports = {
  pathPrefix: "/",
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        functions: {
          "getPaletteKey($key)": function (sassKey) {
            function hexToRgb(hex) {
              // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
              let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
              hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
              });

              let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                hex
              );
              return result
                ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                  }
                : null;
            }
            let sassParams = siteMetadata.palettes[siteMetadata.palette].sass;
            let key = sassKey.getValue();
            let value = sassParams[key];
            let colorRegExp = /^#(?:[a-f\d]{3}){1,2}$/i;
            let result;
            if (colorRegExp.test(value)) {
              result = hexToRgb(value);
              result = new sass.types.Color(result.r, result.g, result.b);
            } else {
              result = sassUtils.castToSass(value);
            }
            return result;
          },
        },
      },
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {},
    },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
      },
    },
    {
      resolve: "gatsby-plugin-crisp-chat",
      options: {
        websiteId: "9e29edc0-b863-4764-920d-6061916680a2",
        enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
        defer: true, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
        enableImprovedAccessibility: false, // Optional. Sets aria-label attribute on pop-up icon for screen readers. Defaults to true.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-12409780-1",
        head: true,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        pageTransitionDelay: 0,
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        defer: false,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "example.com",
      },
    },
  ],
};
