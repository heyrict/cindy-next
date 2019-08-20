export function getCookie(c_name, c_str = document.cookie) {
  var c_start, c_end;
  if (c_str.length > 0) {
    c_start = c_str.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = c_str.indexOf(';', c_start);
      if (c_end == -1) c_end = c_str.length;
      return unescape(c_str.substring(c_start, c_end));
    }
  }
  return '';
}

export function setCookie(
  c_name,
  c_value,
  c_expiry /* seconds */,
  c_path = '/',
) {
  let expiry_str = '';
  const path_str = `;path=${c_path}`;
  if (c_expiry) {
    let expiry_date = new Date();
    expiry_date.setTime(expiry_date.getTime() + c_expiry * 1000);
    expiry_str = `;expires=${expiry_date.toGMTString()};max-age=${c_expiry}`;
  }
  document.cookie = `${c_name}=${c_value}${expiry_str}${path_str}`;
}
