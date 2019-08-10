const CHAT_REGEX = new RegExp('^chat://(.+)$');

export const normLinkHook = (node: Element) => {
  if (
    node.hasAttribute('href') &&
    CHAT_REGEX.test(node.getAttribute('href') as string)
  ) {
    const channelName = (node.getAttribute('href') as string).replace(
      CHAT_REGEX,
      '$1',
    );
    node.removeAttribute('href');
    node.setAttribute('data-event', 'open-channel');
    node.setAttribute('data-target', decodeURIComponent(channelName));
  }
};
