/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const withPrefix = require("./src/utils/withPrefix").default;

exports.onRenderBody = function ({ setHeadComponents, setPostBodyComponents }) {
  setHeadComponents([
    <script>
      window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)}
      ;ga.l=+new Date; ga('create', 'UA-12409780-1', 'auto'); ga('send',
      'pageview');
    </script>,
    <script async src='https://www.google-analytics.com/analytics.js'></script>
  ]);

  setPostBodyComponents([
    <React.Fragment>
      <script src={withPrefix("assets/js/plugins.js")} />
      <script src={withPrefix("assets/js/main.js")} />
      <script src={withPrefix("assets/js/page-load.js")} />
      <script src={withPrefix("assets/js/page-unload.js")} />
    </React.Fragment>,
  ]);
};
