import logging
from datetime import datetime

from lib import query

lgr = logging.Logger(__name__)

MARK_DAZED_PUZZZLES_MUTATION = '''
mutation($date: date!) {
  update_puzzle(
    where: { dazedOn: { _lte: $date }, status: { _eq: 0 } }
    _set: { status: 2 }
  ) {
    returning {
      id
      title
    }
  }
}
'''


def mark_dazed_puzzles():
    now = datetime.now()

    dazed_puzzles = query(MARK_DAZED_PUZZZLES_MUTATION, {
        'date': now.date().isoformat(),
    })['update_puzzle']
    for puzzle in dazed_puzzles:
        lgr.debug(
            "[INFO]: [mark_dazed_puzzles]: [ID: %(id)d] '%(title)s' is marked as dazed",
            puzzle)


if __name__ == "__main__":
    mark_dazed_puzzles()
