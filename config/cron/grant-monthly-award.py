from datetime import datetime, timedelta

from imaging import render
from lib import query, timezone, tweeter_auth

monthly_awards = [
    64,  # "★鶴"
    65,  # "★鶯"
    66,  # "★燕"
    67,  # "★蝶"
    68,  # "★鰹"
    69,  # "★蝸牛"
    70,  # "★蝉"
    71,  # "★鈴虫"
    72,  # "★蜻蛉"
    73,  # "★啄木鳥"
    74,  # "★鷹"
    75,  # "★狼"
]

monthly_collection_awards = [
    78,  # "★花"
    79,  # "★鳥"
    80,  # "★風★"
    81,  # "★★月★★"
]

LOCALE = "ja"
MESSAGES = getattr(__import__("templates"), LOCALE)

AWARD_BY_ID_QUERY = '''
query($id: Int!) {
  award(id: $id) {
    id
    name
  }
}
'''

MONTHLY_AWARDS_COUNT_QUERY = '''
query($userId: Int!, $monthlyAwards: [Int!]) {
  userAwards(
    filter: {
      userId: { eq: $userId }
      awardId: { eqAny: $monthlyAwards }
    }
  ) {
    id
  }
}
'''

PUZZLE_STAR_RANKING_QUERY = '''
query($year: Int!, $month: Int!) {
  puzzleStarRanking(
    limit: 10
    offset: 0
    year: $year
    month: $month
  ) {
    id
    genre
    title
    status
    yami
    content
    user {
      id
      nickname
    }
    starCount
    starSum
  }
}
'''

ADD_USERAWARD_MUTATION = '''
mutation($awardId: Int!, $userId: Int!) {
  addUserAward(objects: {
    awardId: $awardId
    userId: $userId
  }) {
    id
  }
}
'''


def grant_collection_award(user):
    monthly_award_count = len(
        query(
            MONTHLY_AWARDS_COUNT_QUERY, {
                'userId': user['id'],
                'monthlyAwards': monthly_awards,
            }
        )
    )

    if monthly_award_count % 3 == 0 and monthly_award_count > 0:
        award_data = query(AWARD_BY_ID_QUERY, {
            'id': monthly_collection_awards[int(monthly_award_count / 3) - 1]
        })['award'] # yapf: disable

        try:
            query(ADD_USERAWARD_MUTATION, {
                'userId': user['id'],
                'awardId': award_data['id'],
            }) # yapf: disable
        except Exception as e:
            print('[Error]: [grant_collection_award]: %s' % e)

        params = {
            'status': MESSAGES.BOM_COLLECTION_ADD_MESSAGE % {
                'nickname': user['nickname'],
                'count': monthly_award_count,
                'award_name': award_data['name'],
            }
        }
        t = tweeter_auth()
        t.statuses.update(**params)


def grant_monthly_award():
    now = datetime.now(tz=timezone)
    target_year = now.year - 1 if now.month == 1 else now.year
    target_month = 12 if now.month == 1 else now.month - 1

    puzzles_data = query(
        PUZZLE_STAR_RANKING_QUERY, {
            'year': target_year,
            'month': target_month,
        }
    )['puzzleStarRanking']

    # iterate through list to get ranks and best puzzles
    best_puzzles = []
    ranks = []
    last_count = -1
    last_sum = -1
    best_count = -1
    best_sum = -1

    for i, puzzle in enumerate(puzzles_data):
        puzzle_count = puzzle['starCount']
        puzzle_sum = puzzle['starSum']
        if i == 0:
            best_puzzles.append(puzzle)
            ranks.append(1)
            best_count = puzzle_count
            best_sum = puzzle_sum
        elif puzzle_count == best_count and puzzle_sum == best_sum:
            best_puzzles.append(puzzle)
            ranks.append(1)
        elif puzzle_count == last_count and puzzle_sum == last_sum:
            ranks.append(ranks[-1])
        else:
            ranks.append(i + 1)
        last_count = puzzle_count
        last_sum = puzzle_sum

    award_data = query(AWARD_BY_ID_QUERY, {
        'id': monthly_awards[target_month - 1]
    })['award'] # yapf: disable

    status_message = MESSAGES.BOM_TWEET_MESSAGE % {
        'user_nickname': ', '.join([p['user']['nickname'] for p in best_puzzles]),
        'award_name': award_data['name'],
        'year': target_year,
        'month': target_month,
        'ranking': ''.join([
            MESSAGES.BOM_RANKING_MESSAGE % {
                'no': rank,
                'user_nickname': puzzle['user']['nickname'],
                'star__sum': puzzle['starSum'],
                'star__count': puzzle['starCount'],
                'title': puzzle['title'],
                'id': puzzle['id'],
            } for rank, puzzle in zip(ranks, puzzles_data)
        ]),
    } # yapf: disable
    print('[Info]: [grant_monthly_award]: %s' % status_message)
    status_messages = status_message.split('\n\n', 1)
    imgpath = render(*status_messages)
    with open(imgpath, 'rb') as f:
        imgdata = f.read()
    params = {
        'status': MESSAGES.BOM_TWEET_MESSAGE_SHORT % {
            'header': status_messages[0]
        },
        'media[]': imgdata,
    }

    # grant awards
    for puzzle in best_puzzles:
        user = puzzle['user']
        try:
            query(
                ADD_USERAWARD_MUTATION, {
                    'userId': user['id'],
                    'awardId': award_data['id'],
                }
            )
        except Exception as e:
            print('[Error]: [grant_monthly_award]: %s' % e)

        grant_collection_award(user)

    t = tweeter_auth()
    t.statuses.update_with_media(**params)


if __name__ == "__main__":
    grant_monthly_award()
