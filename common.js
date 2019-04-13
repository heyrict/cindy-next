export function getQueryStr(qs) {
  if (!qs) return {};

  qs = qs.substring(1);
  let qsList = qs.split('&');
  let i;
  let qObj = {};
  let p;
  for (i = 0; i < qsList.length; i += 1) {
    p = decodeURI(qsList[i]).split('=');
    qObj[p[0]] = p[1];
  }
  return qObj;
}
