import fetch from 'isomorphic-unfetch';

const METRIKA_API = 'https://api-metrika.yandex.com/stat/v1/data/bytime';

const getAPIURL = params =>
  `${METRIKA_API}?${Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')}`;

export const postActiveUsers = async (req, res) => {
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
        res.status(200).send(data);
      });
  } catch (e) {
    res.status(500).json(e);
  }
};
