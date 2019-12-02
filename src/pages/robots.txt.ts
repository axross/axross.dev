import { NextPageContext } from "next";
import * as React from "react";
import getURL from "../utility/getURL";

export default class extends React.Component {
  render() {
    return null;
  }

  static async getInitialProps(context: NextPageContext): Promise<any> {
    const sitemapUrl = getURL(context);

    sitemapUrl.pathname = "/sitemap.xml";

    context.res?.setHeader("content-type", "text/plain");
    context.res?.write(`Sitemap: ${sitemapUrl.href}\n`);
    context.res?.end();

    return;
  }
}
