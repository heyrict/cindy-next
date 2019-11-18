Cindy-Next
==============
<img align="right" height="192" width="192" src="https://github.com/heyrict/cindy-realtime/blob/master/react-boilerplate/app/images/icon-512x512.png" />

This project is a total rewrite of [heyrict/cindy-realtime](https://github.com/heyrict/cindy-realtime), basically containing:

- Hasura graphql backend for database API.
- Next.js nodejs backend for webpage hosting.

This is a project started in homage to [latethin](http://sui-hei.net) created by [kamisugi(上杉)](http://sui-hei.net/mondai/profile/1).

Cindy is a website specially designed for playing lateral thinking games, with python django as the backend, and nodejs as the frontend.
It also used a lot of new features like GraphQL API, WebSocket for auto-updating.

You can access the **[website](https://www.cindythink.com/)**, or find useful informations in the unofficial **[wiki](https://wiki3.jp/cindy-lat)(Japanese only)**.

The name of `Cindy` stands for **Cindy Is Not Dead Yet**,
which comes from the popular original character of [Cindy](http://sui-hei.net/app/webroot/pukiwiki/index.php?%E3%82%B7%E3%83%B3%E3%83%87%E3%82%A3).

Requisitories
-----------
- Postgresql (you can opt to use mysql server using mysql.cnf)

    ```bash
    # Debian-based systems
    apt-get install postgresql
    ```

- node \> v12.13.0, nodejs manager (latest `npm` or `yarn`). Note that the project is developed with `yarn`.

    ```bash
    # Use npm
    npm install
    # Use yarn
    yarn
    ```

- Docker CE
- hasura/graphql-engine. It will be automatically installed at your first run of `docker-run`.
- Python 3.x >= 3.6

Environment Variables
--------
### For apollo server

| env              | description                       | default                                     |
|------------------|-----------------------------------|---------------------------------------------|
| PORT             | port to use                       | 3001                                        |
| PGDB             | Postgres database URL             | postgres://cindy:cindy@localhost:5432/cindy |
| AUTH_PRIVATE_KEY | Private key for authorization     | Content of `private.pem`                    |
| AUTH_PUBLIC_KEY  | Public key for authorization      | Content of `public.pem`                     |
| AUTH_KEY_ID      | Key identifier for the key        | Hash of \$AUTH_PUBLIC_KEY                   |
| NODE_ENV         | Node env (development/production) |                                             |

### For next server

| env  | description | default |
|------|-------------|---------|
| PORT | port to use | 3000    |

### For python server (twitter)

| env                | description                          | default |
|--------------------|--------------------------------------|---------|
| PORT               | port to use                          | 3002    |
| NUM_WORKERS        | number of workers                    | 2       |
| TOKEN              | twitter token                        |         |
| TOKEN_SECRET       | twitter token secret                 |         |
| CONSUMER_KEY       | twitter consumer key                 |         |
| CONSUMER_SECRET    | twitter consumer secret              |         |
| TWEET_WITH_PICTURE | whether to render picture in twitter | False   |

Hard-coded configurations
--------
### Global settings
All variables describe here should be exported directly or indirectly from [./settings.js](./settings.js)

| variable                        | description                                                                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GRAPHQL_SERVER / GRAPHQL_CLIENT | Object of `{ ENDPOINT: string, LIVEQUERY: string, SUBSCRIPTION: string }`                                                                                                                                                  |
| DEFAULT_LOCALE                  | Locale fallback if requested locale is not provided in APPLOCALES. Default value is `ja`.                                                                                                                                  |
| APPLOCALES                      | `Array<string>` of Supported locales. Currently supported translations are `en` and `ja`.                                                                                                                                  |
| MAX_DAZED_DAYS_BY_GENRE         | Cindy have a trandition of automatically solving out-dated unsolved puzzles as `dazed` puzzles. This feature should be manually registered as a cron job. This is the designed time limit for different genres of puzzles. |
| MAX_DAZED_DAYS_LONGTERM_YAMI    | Puzzles of long-term yami are designed to have a longer time limit.                                                                                                                                                        |
| DOMAIN_REGEXP                   | Regular expression matching in-site urls. In-site urls are handled differently from cross-site urls.                                                                                                                       |
| SCRIPTS                         | scripts prepending to HTML head tag. Basically used for tracking or ad services                                                                                                                                            |

### Hard-coded award settings
Awards are hard-coded in script files as custom logic of checking awards are hard to implement with database only.
**This config must be adjusted to satisfy your awards in the database!**

These variables are defined in [components/AwardChecker/constants.ts](./components/AwardChecker/constants.ts)

| variable                    | type                                                            |
|-----------------------------|-----------------------------------------------------------------|
| PuzzleCountAwards           | { [id: number]: /* count */ number }                            |
| QuestionCountAwards         | { [id: number]: /* count */ number }                            |
| TrueAnswerCountAwards       | { [id: number]: /* count */ number }                            |
| GoodQuestionCountAwards     | { [id: number]: /* count */ number }                            |
| StarSumAwards               | { [id: number]: /* count */ number }                            |
| StarByPuzzleAwards          | { [id: number]: { starCount: number, puzzleCount: number }}     |
| PuzzleByGenreAwards         | { [id: number]: { genre: number, count: number }}               |
| PuzzleByYamiAwards          | { [id: number]: /* count */ number }                            |
| PuzzleByYamiQuestionsAwards | { [id: number]: /* count */ number }                            |
| MixedAwards                 | { [id: number]: { questionCount: number, puzzleCount: number }} |
| SpecialAwards               | Array\</* id */ number\>                                        |

Patrons
--------
- [アシカ](https://www.cindythink.com/profile/show/36)
- 3 more anonymous patrons
