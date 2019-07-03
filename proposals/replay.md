One option is to use pure sql database:

```graphql
type Replay {
  id: Int!
  puzzle: Puzzle
  user: User!
  created_at: Timestamp!
  updated_at: Timestamp!
  #dialogues: [ReplayDialogue]
}

type ReplayKeyword {
  replayId: Int!
  keywordId: Int!
  keyword: String!
}

type ReplayMilestone {
  replayId: Int!
  milestoneId: Int!
  name: String!
}

# type MilestoneBoolExprType = {
#   T: "and" | "or",
#   V: (MilestoneBoolExprType | Int)[],
# }
#
# As tests:
#
# {
#   _and: [1, 2, 3],
# }
# {
#   _and: [
#     { _or: [1, 4] },
#     { _or: [2, 8] },
#     3,
#   ]
# }

type ReplayDialogue {
  id: Int!
  replay_id: Int!
  #replay: Replay!
  question: String!
  answer: String!
  depends_on: Json! # MilestoneBoolExprType
  milestones: Json! # Array<Int as ReplayMilestone_milestoneId>
  keywords: ReplayKeyword[]!
}

type ReplayDialogueKeyword {
  id: Int!
  dialogue_id: Int!
  #dialogue: ReplayDialogue!
  keyword_id: Int!
  #keyword: ReplayKeyword!
}

type ReplayPlaygroundDialogue {
  id: Int!
  dialogue_id: Int!
  #dialogue: ReplayDialogue!
  playground_id: Int!
  #playground: ReplayPlayground!
  created_at: Timestamp!
}

type ReplayPlayground {
  id: Int!
  status: Int!  # Whether the replay is finished for the current user.
  created_at: Timestamp!
  updated_at: Timestamp!
  #dialogues: [ReplayPlaygroundDialogue]
  #replay: Replay!
  replay_id: Int!
  #user: User!
  user_id: Int!
}
```

Another option is to store keywords and questions in json fields.

```graphql
type Replay {
  id: Int!
  puzzle: Puzzle
  user: User!
  questions: Json!
  created_at: Timestamp!
  updated_at: Timestamp!
}

type ReplayPlayground {
  id: Int!
  replay: Replay!
  user: User!
  status: Int!  # Whether the replay is finished for the current user.
  data: Json!
}
```
