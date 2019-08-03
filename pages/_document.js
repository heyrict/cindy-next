import Document, { Head, Main, NextScript } from 'next/document';

import { hash } from 'common/math';
import { SCRIPTS } from 'settings';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale },
    } = context;

    return {
      ...props,
      locale,
    };
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`;

    return (
      <html>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          {SCRIPTS.map(s => (
            <script key={hash(s)} dangerouslySetInnerHTML={{ __html: s }} />
          ))}
        </Head>
        <body>
          <Main />
          <script async src={polyfill} />
          <NextScript />
        </body>
      </html>
    );
  }
}
