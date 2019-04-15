export const webhookPost = (endpoint, body) =>
  fetch(endpoint, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  }).then(res => res.json());
