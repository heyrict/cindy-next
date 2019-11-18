import json
import logging
import os

import gunicorn.app.base
from gunicorn.six import iteritems
from twitter import OAuth, Twitter

from query import post

logger = logging.Logger(__name__)

LOCALE = "ja"
PORT = os.environ.get("PORT", 3002)
NUM_WORKERS = os.environ.get("NUM_WORKERS", 2)
TOKEN = os.environ.get("TOKEN")
TOKEN_SECRET = os.environ.get("TOKEN_SECRET")
CONSUMER_KEY = os.environ.get("CONSUMER_KEY")
CONSUMER_SECRET = os.environ.get("CONSUMER_SECRET")
ANONYMOUS_USER_DISPLAY = os.environ.get("ANONYMOUS_USER_DISPLAY",
                                        "Anonymous User")
TWEET_WITH_PICTURE = os.environ.get("TWEET_WITH_PICTURE", False)

MESSAGES = getattr(__import__("templates"), LOCALE)

GET_USER_QUERY = """
query _GetUserQuery($userId: Int!){
  sui_hei_user_by_pk(id: $userId) {
    id
    nickname
  }
}
"""


def add_puzzle_callback(event):
    puzzle = event["data"]["new"]
    puzzle_user = post({
        "query": GET_USER_QUERY,
        "variables": {
            'userId': puzzle["user_id"],
        }
    })["sui_hei_user_by_pk"]
    msg = MESSAGES.ADD_PUZZLE_TWEET % {
        "id": puzzle["id"],
        "title": puzzle["title"],
        "user_nickname": ANONYMOUS_USER_DISPLAY if puzzle["anonymous"]\
                    else puzzle_user["nickname"],
    } # yapf: disable

    logger.info("Puzzle Added with id=%d title=%s"\
                % (puzzle["id"], puzzle["title"]))

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


def handler_app(environ, start_response):
    if (environ['REQUEST_METHOD'] != 'POST'
            or environ['CONTENT_TYPE'] != 'application/json'):
        status = '500 Internal Server Error'
        response_headers = [('Content-Type', 'application/json')]
        response_body = b'{"errors": [{ "message": "INVALID CONTENT" }]}'
        start_response(status, response_headers)
        return [response_body]

    response_headers = [('Content-Type', 'application/json')]
    try:
        body = None
        data = json.load(environ['wsgi.input'])
        trigger = data["trigger"]["name"]

        if trigger == "send_twitter_on_puzzle_insert":
            add_puzzle_callback(data["event"])
        else:
            raise Exception("trigger [" + trigger + "] not handled")

        if body is None:
            body = '{"status": "success"}'

        status = '200 OK'
        start_response(status, response_headers)
        return [body.encode()]
    except Exception as e:
        status = '500 Internal Server Error'
        start_response(status, response_headers)
        body = '{"errors": [{"message": "' + str(e) + '"}]}'
        return [body.encode()]


class StandaloneApplication(gunicorn.app.base.BaseApplication):
    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super(StandaloneApplication, self).__init__()

    def load_config(self):
        config = dict((key, value) for key, value in iteritems(self.options)
                      if key in self.cfg.settings and value is not None)
        for key, value in iteritems(config):
            self.cfg.set(key.lower(), value)

    def load(self):
        return self.application


if __name__ == '__main__':
    options = {
        'bind': '%s:%s' % ('127.0.0.1', PORT),
        'workers': NUM_WORKERS,
    }
    StandaloneApplication(handler_app, options).run()
