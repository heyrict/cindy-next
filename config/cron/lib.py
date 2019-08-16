import os
from datetime import datetime

import pytz
import requests
import yaml
from twitter import OAuth, Twitter

FILEDIR = os.path.dirname(os.path.abspath(__file__))
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


def query(query, variables=None):
    if variables:
        return post({
            'query': query,
            'variables': variables,
        })
    return post({'query': query})


def argmax(values):
    return max(enumerate(values), key=lambda x: x[1])[0]


def tweeter_auth():
    TOKEN = os.environ.get("TOKEN")
    TOKEN_SECRET = os.environ.get("TOKEN_SECRET")
    CONSUMER_KEY = os.environ.get("CONSUMER_KEY")
    CONSUMER_SECRET = os.environ.get("CONSUMER_SECRET")
    TWEET_WITH_PICTURE = os.environ.get("TWEET_WITH_PICTURE", False)

    auth = OAuth(TOKEN, TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
    return Twitter(auth=auth)


with open(os.path.join(FILEDIR, "settings.yml")) as f:
    settings = yaml.load(f.read())

timezone = pytz.timezone(settings.get('timezone', 'UTC'))
