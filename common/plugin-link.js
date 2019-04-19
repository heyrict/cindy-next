const norm_link = string => {
  const _norm_chat = s =>
    s.replace(/^chat:\/\/(.+)$/, "javascript:OpenChat('$1');");

  return _norm_chat(string);
};

export default norm_link;
