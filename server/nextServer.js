import next from 'next';
import { parse } from 'url';

import express from 'express';

const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
const { supportedLanguages, getLocaleDataScript } = require('./intl');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const { DEFAULT_LOCALE } = require('../settings');
const app = next({ dev });

app.prepare().then(() => {
  const server = express();
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const acceptedLocale = req.acceptsLanguages(...supportedLanguages);
    const locale = acceptedLocale || DEFAULT_LOCALE;
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    //req.messages = dev ? {} : getMessages(locale);
    app.render(req, res, pathname || '/', query);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
