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
  id: Int!
  keyword: String!
}

type ReplayDialogue {
  id: Int!
  replay_id: Int!
  #replay: Replay!
  question: String!
  answer: String!
  #depends_on: [ReplayQuestion]
  #keywords: [ReplayKeyword]!
}

type ReplayDialogueDependency {
  id: Int!
  dialogue_id: Int!
  #dialogue: ReplayDialogue!
  depends_on_id: Int!
  #depends_on: ReplayDialogue!
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
