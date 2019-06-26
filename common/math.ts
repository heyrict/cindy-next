export const fontSizeToEm = (
  size: string,
  appendPx = false,
  fallback?: undefined,
) => {
  const sizeInInt = parseInt(size);
  if (sizeInInt === NaN || sizeInInt > 7 || sizeInInt < 1) {
    return fallback;
  }
  const result =
    0.00223611 * sizeInInt ** 6 -
    0.0530417 * sizeInInt ** 5 +
    0.496319 * sizeInInt ** 4 -
    2.30479 * sizeInInt ** 3 +
    5.51644 * sizeInInt ** 2 -
    6.16717 * sizeInInt +
    3.14;
  return appendPx ? `${result}em` : result;
};

export const hash = (str: string | null | undefined): number => {
  var chr;
  var hash = 0;
  if (!str || str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
