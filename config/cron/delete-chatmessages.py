import logging
from datetime import datetime, timedelta
from typing import TypedDict
from typing_extensions import NotRequired

from lib import query, settings, timezone

lgr = logging.Logger(__name__)

CHATROOM_CLEANUP_MUTATION = '''
mutation _CRON_CLEANUP_CHATROOM_MESSAGES($chatroomId: Int!, $date: DateTime!) {
  deleteChatmessages(filter: {
    chatroomId: { eq: $chatroomId }
    created: { lt: $date }
  }) {
    affectedRows
  }
}
'''


class ChatroomCleanupEntry(TypedDict):
    chatroom_id: int
    days: NotRequired[int]


def cleanup_chatrooms():
    now = datetime.now(tz=timezone)
    entries: list[ChatroomCleanupEntry] | None = settings.get(
        'chatroom_cleaup_days'
    )

    if entries is not None:
        for entry in entries:
            days = timedelta(days=entry.get('days', 0))
            delete_before = now - days
            result = query(
                CHATROOM_CLEANUP_MUTATION, {
                    'chatroomId': entry['chatroom_id'],
                    'date': delete_before.isoformat(timespec="microseconds"),
                }
            )
            deleted_count = result['deleteChatmessages']['affectedRows']
            lgr.info(
                "[INFO]: [cleanup_chatrooms]: [Chatroom ID: %(id)d] %(count)d messsages deleted",
                {
                    "id": entry['chatroom_id'],
                    "count": deleted_count,
                }
            )


if __name__ == "__main__":
    cleanup_chatrooms()
