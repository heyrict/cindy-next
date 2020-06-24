#! /bin/bash
docker run -d --net=host --name hasura-cindy-next \
        --log-opt max-size=10m \
        -e HASURA_GRAPHQL_DATABASE_URL=postgres://cindy:cindy@localhost:5432/cindy \
        -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
        -e HASURA_GRAPHQL_CONSOLE_ASSETS_DIR=/srv/console-assets \
        -e SUBSCRIPTION_SERVER_WEBHOOK="http://localhost:3001/webhook/subscriptions" \
        -e PYTHON_SERVER_WEBHOOK="http://localhost:3002/webhook" \
        -e HASURA_GRAPHQL_JWT_SECRET='{
           "type": "RS256",
           "jwk_url": "http://localhost:3001/webhook/jwks",
           "claims_namespace": "https://www.cindythink.com/jwt/claims",
           "claims_format": "json"
        }' \
        -e HASURA_GRAPHQL_ADMIN_SECRET="CINDYTHINK_HASURA_ADMIN_SECRET" \
        -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \
        hasura/graphql-engine:latest
