#! /bin/bash
docker run -d --net=host \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://cindy:cindy@localhost:5432/cindy \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=false \
       -e HASURA_GRAPHQL_JWT_SECRET='{
          "type": "RS256",
          "jwk_url": "http://localhost:3000/webhook/jwks",
          "claims_namespace": "https://www.cindythink.com/jwt/claims",
          "claims_format": "json"
       }' \
       -e HASURA_GRAPHQL_ADMIN_SECRET="CINDYTHINK_HASURA_ADMIN_SECRET" \
       -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \
       -e HASURA_GRAPHQL_CONSOLE_ASSETS_DIR=/srv/console-assets \
       hasura/graphql-engine:latest
