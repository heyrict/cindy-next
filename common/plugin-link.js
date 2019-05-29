const CHAT_REGEX = new RegExp('^chat://(.+)$');
const CHAT_HREF_REGEX = new RegExp('href="chat://([^"]+)"');

export const normLinkHook = node => {
  if (node.hasAttribute('href') && CHAT_REGEX.test(node.getAttribute('href'))) {
    const channelName = node.getAttribute('href').replace(CHAT_REGEX, '$1');
    node.removeAttribute('href');
    node.setAttribute('data-event', 'open-channel');
    node.setAttribute('data-target', channelName);
  }
};

// Unclean method used in server side
export const normLink = string =>
  string.replace(CHAT_HREF_REGEX, 'href="javascript:openChat(\'$1\');"');
