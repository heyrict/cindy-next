import os

import requests

ENDPOINT = 'http://localhost:8080/v1/graphql'
ADMIN_SECRET = os.environ.get('HASURA_GRAPHQL_ADMIN_SECRET')


def post(data):
    response = requests.post(
        ENDPOINT,
        json=data,
        headers={
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET,
        }).json()
    if response.get('errors'):
        raise Exception(response.get('errors'))
    return response['data']


def query(query_str, variables=None):
    if variables:
        return post({
            'query': query_str,
            'variables': variables,
        })
    return post({'query': query_str})
