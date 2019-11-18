const norm_countdown = (s: string) => {
  return s.replace(
    /\/countdown\(([^)]+)\)\//g,
    "<span class='btn disabled countdownobj' until='$1'>CountDownObject</span>",
  );
};

export default norm_countdown;
