import os

import pytz
import requests
import yaml

FILEDIR = os.path.dirname(os.path.abspath(__file__))
ENDPOINT = 'http://localhost:8000/graphql'
ADMIN_SECRET = os.environ.get('ADMIN_SECRET')


def post(data):
    response = requests.post(
        ENDPOINT,
        json=data,
        headers={
            'content-type': 'application/json',
            'x-cindy-admin-secret': ADMIN_SECRET,
        }
    ).json()
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


def argmax(values):
    return max(enumerate(values), key=lambda x: x[1])[0]


def tweeter_auth():
    from twitter import OAuth, Twitter
    TOKEN = os.environ.get("TOKEN")
    TOKEN_SECRET = os.environ.get("TOKEN_SECRET")
    CONSUMER_KEY = os.environ.get("CONSUMER_KEY")
    CONSUMER_SECRET = os.environ.get("CONSUMER_SECRET")

    auth = OAuth(TOKEN, TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
    return Twitter(auth=auth)


with open(os.path.join(FILEDIR, "settings.yml")) as f:
    settings = yaml.safe_load(f)

timezone = pytz.timezone(settings.get('timezone', 'UTC'))
