
CREATE TABLE "public"."sui_hei_replay"(
  "id" serial NOT NULL,
  "title" varchar(255) NOT NULL,
  "milestones" jsonb NOT NULL,
  "puzzle_id" integer,
  "user_id" integer NOT NULL,
  "created" timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("puzzle_id") REFERENCES "public"."sui_hei_puzzle"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("user_id") REFERENCES "public"."sui_hei_user"("id") ON UPDATE restrict ON DELETE restrict
);

CREATE TABLE "public"."sui_hei_replay_dialogue"(
  "id" serial NOT NULL,
  "replay_id" integer NOT NULL,
  "question" text NOT NULL,
  "answer" text NOT NULL,
  "good" boolean NOT NULL,
  "true" boolean NOT NULL,
  "keywords" jsonb NOT NULL,
  "milestones" jsonb NOT NULL,
  "dependency" text NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("replay_id") REFERENCES "public"."sui_hei_replay"("id") ON UPDATE restrict ON DELETE cascade
);
