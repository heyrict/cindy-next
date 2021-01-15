import json
import logging
import os

from gql import gql, Client
from gql.transport.websockets import WebsocketsTransport

from twitter import OAuth, Twitter

logger = logging.Logger(__name__)
logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

WS_ENDPOINT = os.environ.get("WS_ENDPOINT", "ws://127.0.0.1:8000/graphql")

LOCALE = "ja"
TOKEN = os.environ.get("TOKEN")
TOKEN_SECRET = os.environ.get("TOKEN_SECRET")
CONSUMER_KEY = os.environ.get("CONSUMER_KEY")
CONSUMER_SECRET = os.environ.get("CONSUMER_SECRET")
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
        "Puzzle Added with id=%d title=%s", (puzzle["id"], puzzle["title"])
    )

    auth = OAuth(TOKEN, TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
    t = Twitter(auth=auth)

    params = {'status': msg}

    if TWEET_WITH_PICTURE:
        from imaging.puzzle_rendering import render, textify

        imgpath = render(puzzle["title"], textify(puzzle["content"]))
        with open(imgpath, 'rb') as f:
            imgdata = f.read()
        params['media[]'] = imgdata
        t.statuses.update_with_media(**params)
    else:
        t.statuses.update(**params)


if __name__ == '__main__':
    transport = WebsocketsTransport(url=WS_ENDPOINT)

    client = Client(
        transport=transport,
        fetch_schema_from_transport=True,
    )

    query = gql(PUZZLE_SUBSCRIPTION)

    for data in client.subscribe(query):
        logger.debug("Subscription received: %s", data)
        op = data.get("op")
        if op == 'CREATED':
            add_puzzle_callback(data["data"])
