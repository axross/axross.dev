import * as React from "react";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import LocaleString from "../entities/LocaleString";
import getLocale from "../utility/getLocale";

interface Props {
  locale: LocaleString;
}

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang={this.props.locale.split("-")[0]}>
        <Head />

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const locale = getLocale(context.query);

    return { ...initialProps, locale };
  }
}

export default MyDocument;
