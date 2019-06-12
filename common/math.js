export const fontSizeToEm = (size, appendPx = false, fallback) => {
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
