import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";
import favicon from "../../static/images/favicon.ico";

import "../sass/main.scss";
import Header from "./Header";
import Footer from "./Footer";

export default class Body extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {_.get(this.props, "pageContext.frontmatter.title", null) &&
              _.get(this.props, "pageContext.frontmatter.title", null) + " - "}
            {_.get(this.props, "pageContext.site.siteMetadata.title", null)}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />
          <meta
            name="description"
            content={
              _.get(this.props, "pageContext.frontmatter.excerpt", null) ||
              _.get(
                this.props,
                "pageContext.site.siteMetadata.description",
                null
              )
            }
          />
          <link rel="icon" href={favicon} />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i%26Display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <div id="page" className="site">
          <Header {...this.props} />
          <main id="content" className="site-content">
            {this.props.children}
          </main>
          <Footer {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}
