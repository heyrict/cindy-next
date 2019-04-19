const norm_countdown = string => {
  return string.replace(
    /\/countdown\(([^)]+)\)\//g,
    "<span class='btn disabled countdownobj' until='$1'>CountDownObject</span>",
  );
};

export default norm_countdown;
