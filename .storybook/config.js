import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.(j|t)sx?
const req = require.context('../stories', true, /.stories.(js|ts)x?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
