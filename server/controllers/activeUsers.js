import fetch from 'isomorphic-unfetch';

const METRIKA_API = 'https://api-metrika.yandex.com/stat/v1/data';

const getAPIURL = params =>
  `${METRIKA_API}?${Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')}`;

const activeUsersCache = new Object({ time: -1, data: null });

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes;

export const postActiveUsers = async (req, res) => {
  // Ignore request body as we only have one set of parameters.
  const now = new Date();
  if (now.getTime() - activeUsersCache.time < CACHE_TIME) {
    res.status(200).send(activeUsersCache.data);
    return;
  }

  try {
    const params = req.body;
    fetch(getAPIURL(params), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        activeUsersCache.time = now.getTime();
        activeUsersCache.data = data;
        res.status(200).send(data);
      });
  } catch (e) {
    res.status(500).json(e);
  }
};
