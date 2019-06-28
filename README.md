Cindy-Next
==============
<img align="right" height="192" width="192" src="https://github.com/heyrict/cindy-realtime/blob/master/react-boilerplate/app/images/icon-512x512.png" />

This project is a total rewrite of [heyrict/cindy-realtime](https://github.com/heyrict/cindy-realtime), featuring:

- Hasura graphql backend for database API.
- Next.js nodejs backend for webpage hosting.
- (to be implemented) Python flask backend for side-effects and/or serving machine-learning models.

This is a project started in homage to [latethin](http://sui-hei.net) created by [kamisugi(上杉)](http://sui-hei.net/mondai/profile/1).

Cindy is a website specially designed for playing lateral thinking games, with python django as the backend, and nodejs as the frontend.
It also used a lot of new features like GraphQL as WebAPI, WebSocket for auto-updating.

You can access the **[website](https://www.cindythink.com/ja/)**, or find useful informations in the unofficial **[wiki](https://wiki3.jp/cindy-lat)**.

The name of `Cindy` stands for **Cindy Is Not Dead Yet**,
which comes from the popular original character of [Cindy](http://sui-hei.net/app/webroot/pukiwiki/index.php?%E3%82%B7%E3%83%B3%E3%83%87%E3%82%A3).

Requisitories
-----------
- Postgresql (you can opt to use mysql server using mysql.cnf)

    ```bash
    # Debian-based systems
    apt-get install postgresql
    ```

- nodejs manager (latest `npm` or `yarn`). Note that the project is developed with `yarn`.

    ```bash
    # Use npm
    npm install
    # Use yarn
    yarn
    ```

- Docker CE
- hasura/graphql-engine. It will be automatically installed at your first run of `docker-run`.

Environment Variables
--------

| env              | description                       | default                                     |
|------------------|-----------------------------------|---------------------------------------------|
| PGDB             | Postgres database URL             | postgres://cindy:cindy@localhost:5432/cindy |
| AUTH_PRIVATE_KEY | Private key for authorization     | Content of `private.pem`                    |
| AUTH_PUBLIC_KEY  | Public key for authorization      | Content of `public.pem`                     |
| AUTH_KEY_ID      | Key identifier for the key        | Hash of \$AUTH_PUBLIC_KEY                   |
| NODE_ENV         | Node env (development/production) |                                             |
