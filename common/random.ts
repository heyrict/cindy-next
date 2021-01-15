export const randomUUID = () =>
  process.browser && window.crypto
    ? Array.from(window.crypto.getRandomValues(new Uint8Array(4)), v =>
        v.toString(16),
      ).join('')
    : Math.random().toString(36).substring(2, 10);
