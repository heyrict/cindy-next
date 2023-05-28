import json
import logging
import os

from gql import gql, Client
from gql.transport.websockets import WebsocketsTransport

import tweepy

logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))
logger = logging.getLogger(__name__)

WS_ENDPOINT = os.environ.get("WS_ENDPOINT", "ws://127.0.0.1:8000/graphql")

LOCALE = "ja"
API_KEY = os.environ.get("API_KEY")
API_KEY_SECRET = os.environ.get("API_KEY_SECRET")
BEARER_TOKEN = os.environ.get("BEARER_TOKEN")
ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.environ.get("ACCESS_TOKEN_SECRET")
ANONYMOUS_USER_DISPLAY = os.environ.get(
    "ANONYMOUS_USER_DISPLAY", "Anonymous User"
)
TWEET_WITH_PICTURE = os.environ.get("TWEET_WITH_PICTURE", False)

MESSAGES = getattr(__import__("templates"), LOCALE)

PUZZLE_SUBSCRIPTION = """
subscription _PuzzleSub {
  puzzleSub(filter: { status: { eq: UNDERGOING } }) {
    op
    data {
      id
      title
      content
      anonymous
      user {
        id
        nickname
      }
    }
  }
}
"""


def add_puzzle_callback(puzzle):
    puzzle_user = puzzle["user"]
    msg = MESSAGES.ADD_PUZZLE_TWEET % {
        "id": puzzle["id"],
        "title": puzzle["title"],
        "user_nickname": ANONYMOUS_USER_DISPLAY if puzzle["anonymous"]\
                    else puzzle_user["nickname"],
    } # yapf: disable

    logger.info(
        "Puzzle Added with id=%d title=%s", puzzle["id"], puzzle["title"]
    )

    t = tweepy.Client(BEARER_TOKEN, API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    auth = tweepy.OAuth1UserHandler(API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    tapi = tweepy.API(auth)

    params = {'text': msg}

    if TWEET_WITH_PICTURE:
        from imaging.puzzle_rendering import render, textify

        imgpath = render(puzzle["title"], textify(puzzle["content"]))
        media = tapi.media_upload(imgpath)
        if media is not None:
            params['media_ids'] = [media.media_id]
        else:
            raise RuntimeError("Failed to upload image to twitter")

    t.create_tweet(**params)


if __name__ == '__main__':
    transport = WebsocketsTransport(url=WS_ENDPOINT)

    client = Client(
        transport=transport,
        fetch_schema_from_transport=False,
    )

    query = gql(PUZZLE_SUBSCRIPTION)

    for data in client.subscribe(query):
        op = data['puzzleSub'].get("op")
        logger.info(f"Puzzle <{data['puzzleSub']['data']['id']}> is {op}")
        if op == 'CREATED':
            add_puzzle_callback(data['puzzleSub']["data"])
