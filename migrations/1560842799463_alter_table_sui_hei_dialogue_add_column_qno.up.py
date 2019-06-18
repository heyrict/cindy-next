import os

import requests
from tqdm import tqdm

ENDPOINT = 'http://localhost:8080/v1/graphql'
ADMIN_SECRET = os.environ.get('HASURA_GRAPHQL_ADMIN_SECRET')

GET_PUZZLES_QUERY = """query _GetPuzzles{
  sui_hei_puzzle {
    id
  }
}"""

GET_DIALOGUES_QUERY = """query _GetDialogues($puzzleId: Int!){
  sui_hei_dialogue(where: { puzzle_id: { _eq: $puzzleId } }, order_by: { id: asc }) {
    id
  }
}"""

SET_QNO_MUTATION = """mutation _SetDialogueQno($dialogueId: Int!, $qno: Int!){
  update_sui_hei_dialogue(
    where: { id: { _eq: $dialogueId } },
    _set: { qno: $qno }
  ) {
    affected_rows
  }
}"""


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


puzzles = post({'query': GET_PUZZLES_QUERY})['sui_hei_puzzle']

for index, puzzle in tqdm(list(enumerate(puzzles, 1))):
    puzzleId = puzzle['id']
    dialogues = post({
        'query': GET_DIALOGUES_QUERY,
        'variables': {
            'puzzleId': puzzleId
        }
    })['sui_hei_dialogue']

    for qno, dialogue in enumerate(dialogues, 1):
        dialogueId = dialogue['id']
        post({
            'query': SET_QNO_MUTATION,
            'variables': {
                'dialogueId': dialogueId,
                'qno': qno,
            }
        })
