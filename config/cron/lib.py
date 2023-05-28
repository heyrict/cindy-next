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
    import tweepy
    API_KEY = os.environ.get("API_KEY")
    API_KEY_SECRET = os.environ.get("API_KEY_SECRET")
    BEARER_TOKEN = os.environ.get("BEARER_TOKEN")
    ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
    ACCESS_TOKEN_SECRET = os.environ.get("ACCESS_TOKEN_SECRET")

    t = tweepy.Client(BEARER_TOKEN, API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    auth = tweepy.OAuth1UserHandler(API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    tapi = tweepy.API(auth)
    return (t, tapi)


with open(os.path.join(FILEDIR, "settings.yml")) as f:
    settings = yaml.safe_load(f)

timezone = pytz.timezone(settings.get('timezone', 'UTC'))
