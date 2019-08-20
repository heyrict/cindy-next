from tqdm import tqdm

from lib import query

BATCH_SIZE = 10
TAG_ID = 2  # first puzzle
USER_ID = 1

USER_COUNT_QUERY = '''
query {
  sui_hei_user_aggregate {
    aggregate {
      count
    }
  }
}
'''

USER_FIRST_PUZZLE_QUERY = '''
query($limit: Int!, $offset: Int!) {
  sui_hei_user(
    order_by: { id: asc }
    limit: $limit
    offset: $offset
  ) {
    id
    sui_hei_puzzles(
      where: { status: { _eq: 1 } }
      order_by: { id: asc }
      limit: 1
    ) {
      id
      title
    }
  }
}
'''

ADD_PUZZLE_TAG_MUTATION = '''
mutation($puzzleId: Int!, $tagId: Int!, $userId: Int!) {
  insert_sui_hei_puzzle_tag(objects: {
    puzzle_id: $puzzleId
    tag_id: $tagId
    user_id: $userId
  }) {
    affected_rows
  }
}
'''

if __name__ == '__main__':
    num_users = query(USER_COUNT_QUERY)['sui_hei_user_aggregate']['aggregate'][
        'count']
    for offset in tqdm(range(0, num_users, BATCH_SIZE)):
        users = query(USER_FIRST_PUZZLE_QUERY, {
            'limit': BATCH_SIZE,
            'offset': offset,
        })['sui_hei_user']
        for user in users:
            if len(user['sui_hei_puzzles']) == 0:
                continue
            assert len(user['sui_hei_puzzles']) <= 1
            puzzle = user['sui_hei_puzzles'][0]
            try:
                query(ADD_PUZZLE_TAG_MUTATION, {
                    'puzzleId': puzzle['id'],
                    'tagId': TAG_ID,
                    'userId': USER_ID,
                })
            except Exception as e:
                if str(e).find("sui_hei_puzzle_tag_puzzle_id_tag_id_key") > 0:
                    continue
                else:
                    raise e
