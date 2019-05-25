SET xmloption = content;
CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);
CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
CREATE TABLE public.sui_hei_award (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "groupName" character varying(255) NOT NULL,
    description text NOT NULL,
    requisition text NOT NULL
);
CREATE SEQUENCE public.sui_hei_award_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_award_id_seq OWNED BY public.sui_hei_award.id;
CREATE TABLE public.sui_hei_awardapplication (
    id integer NOT NULL,
    status integer NOT NULL,
    comment text NOT NULL,
    reason text NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    reviewed timestamp with time zone,
    applier_id integer NOT NULL,
    award_id integer NOT NULL,
    reviewer_id integer
);
CREATE SEQUENCE public.sui_hei_awardapplication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_awardapplication_id_seq OWNED BY public.sui_hei_awardapplication.id;
CREATE TABLE public.sui_hei_bookmark (
    id integer NOT NULL,
    value double precision NOT NULL,
    puzzle_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_bookmark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_bookmark_id_seq OWNED BY public.sui_hei_bookmark.id;
CREATE TABLE public.sui_hei_chatmessage (
    id integer NOT NULL,
    content text NOT NULL,
    created timestamp with time zone DEFAULT now(),
    "editTimes" integer NOT NULL,
    chatroom_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_chatmessage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_chatmessage_id_seq OWNED BY public.sui_hei_chatmessage.id;
CREATE TABLE public.sui_hei_chatroom (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    created date DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    private boolean NOT NULL
);
CREATE SEQUENCE public.sui_hei_chatroom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_chatroom_id_seq OWNED BY public.sui_hei_chatroom.id;
CREATE TABLE public.sui_hei_comment (
    id integer NOT NULL,
    content text NOT NULL,
    spoiler boolean NOT NULL,
    puzzle_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_comment_id_seq OWNED BY public.sui_hei_comment.id;
CREATE TABLE public.sui_hei_dialogue (
    id integer NOT NULL,
    question text NOT NULL,
    "questionEditTimes" integer NOT NULL,
    answer text NOT NULL,
    "answerEditTimes" integer NOT NULL,
    good boolean NOT NULL,
    "true" boolean NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    answeredtime timestamp with time zone,
    puzzle_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_dialogue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_dialogue_id_seq OWNED BY public.sui_hei_dialogue.id;
CREATE TABLE public.sui_hei_directmessage (
    id integer NOT NULL,
    content text NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    receiver_id integer NOT NULL,
    sender_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_directmessage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_directmessage_id_seq OWNED BY public.sui_hei_directmessage.id;
CREATE TABLE public.sui_hei_event (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    status integer NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    page_link character varying(200) NOT NULL,
    page_src text NOT NULL,
    user_id integer NOT NULL,
    banner_img_url character varying(200) NOT NULL
);
CREATE SEQUENCE public.sui_hei_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_event_id_seq OWNED BY public.sui_hei_event.id;
CREATE TABLE public.sui_hei_eventaward (
    id integer NOT NULL,
    award_id integer NOT NULL,
    event_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_eventaward_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_eventaward_id_seq OWNED BY public.sui_hei_eventaward.id;
CREATE TABLE public.sui_hei_favoritechatroom (
    id integer NOT NULL,
    chatroom_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_favoritechatroom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_favoritechatroom_id_seq OWNED BY public.sui_hei_favoritechatroom.id;
CREATE TABLE public.sui_hei_hint (
    id integer NOT NULL,
    content text NOT NULL,
    created timestamp with time zone NOT NULL,
    puzzle_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_hint_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_hint_id_seq OWNED BY public.sui_hei_hint.id;
CREATE TABLE public.sui_hei_puzzle (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    yami integer NOT NULL,
    genre integer NOT NULL,
    content text NOT NULL,
    solution text NOT NULL,
    content_safe boolean NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone NOT NULL,
    status integer NOT NULL,
    memo text NOT NULL,
    user_id integer NOT NULL,
    anonymous boolean NOT NULL,
    dazed_on date NOT NULL,
    grotesque boolean NOT NULL
);
CREATE SEQUENCE public.sui_hei_puzzle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_puzzle_id_seq OWNED BY public.sui_hei_puzzle.id;
CREATE TABLE public.sui_hei_schedule (
    id integer NOT NULL,
    content text NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    scheduled timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_schedule_id_seq OWNED BY public.sui_hei_schedule.id;
CREATE TABLE public.sui_hei_star (
    id integer NOT NULL,
    value double precision NOT NULL,
    puzzle_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_star_id_seq OWNED BY public.sui_hei_star.id;
CREATE TABLE public.sui_hei_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    nickname character varying(255) NOT NULL,
    profile text NOT NULL,
    credit integer NOT NULL,
    hide_bookmark boolean NOT NULL,
    current_award_id integer,
    last_read_dm_id integer
);
CREATE TABLE public.sui_hei_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_user_groups_id_seq OWNED BY public.sui_hei_user_groups.id;
CREATE SEQUENCE public.sui_hei_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_user_id_seq OWNED BY public.sui_hei_user.id;
CREATE TABLE public.sui_hei_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_user_user_permissions_id_seq OWNED BY public.sui_hei_user_user_permissions.id;
CREATE TABLE public.sui_hei_useraward (
    id integer NOT NULL,
    created date DEFAULT now() NOT NULL,
    award_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.sui_hei_useraward_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sui_hei_useraward_id_seq OWNED BY public.sui_hei_useraward.id;
ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_award ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_award_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_awardapplication ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_awardapplication_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_bookmark ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_bookmark_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_chatmessage ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_chatmessage_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_chatroom ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_chatroom_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_comment ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_comment_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_dialogue ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_dialogue_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_directmessage ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_directmessage_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_event ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_event_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_eventaward ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_eventaward_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_favoritechatroom ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_favoritechatroom_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_hint ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_hint_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_puzzle ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_puzzle_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_schedule ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_schedule_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_star ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_star_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_user ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_user_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_user_groups ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_user_groups_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_user_user_permissions_id_seq'::regclass);
ALTER TABLE ONLY public.sui_hei_useraward ALTER COLUMN id SET DEFAULT nextval('public.sui_hei_useraward_id_seq'::regclass);
ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
ALTER TABLE ONLY public.sui_hei_award
    ADD CONSTRAINT sui_hei_award_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_awardapplication
    ADD CONSTRAINT sui_hei_awardapplication_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_bookmark
    ADD CONSTRAINT sui_hei_bookmark_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_chatmessage
    ADD CONSTRAINT sui_hei_chatmessage_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_chatroom
    ADD CONSTRAINT sui_hei_chatroom_name_key UNIQUE (name);
ALTER TABLE ONLY public.sui_hei_chatroom
    ADD CONSTRAINT sui_hei_chatroom_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_comment
    ADD CONSTRAINT sui_hei_comment_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_dialogue
    ADD CONSTRAINT sui_hei_dialogue_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_directmessage
    ADD CONSTRAINT sui_hei_directmessage_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_event
    ADD CONSTRAINT sui_hei_event_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_eventaward
    ADD CONSTRAINT sui_hei_eventaward_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_favoritechatroom
    ADD CONSTRAINT sui_hei_favoritechatroom_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_hint
    ADD CONSTRAINT sui_hei_hint_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_puzzle
    ADD CONSTRAINT sui_hei_puzzle_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_schedule
    ADD CONSTRAINT sui_hei_schedule_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_star
    ADD CONSTRAINT sui_hei_star_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_user_groups
    ADD CONSTRAINT sui_hei_user_groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_user_groups
    ADD CONSTRAINT sui_hei_user_groups_user_id_group_id_3e3ddec8_uniq UNIQUE (user_id, group_id);
ALTER TABLE ONLY public.sui_hei_user
    ADD CONSTRAINT sui_hei_user_nickname_key UNIQUE (nickname);
ALTER TABLE ONLY public.sui_hei_user
    ADD CONSTRAINT sui_hei_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_user_user_permissions
    ADD CONSTRAINT sui_hei_user_user_permis_user_id_permission_id_062a5bb1_uniq UNIQUE (user_id, permission_id);
ALTER TABLE ONLY public.sui_hei_user_user_permissions
    ADD CONSTRAINT sui_hei_user_user_permissions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sui_hei_user
    ADD CONSTRAINT sui_hei_user_username_key UNIQUE (username);
ALTER TABLE ONLY public.sui_hei_useraward
    ADD CONSTRAINT sui_hei_useraward_pkey PRIMARY KEY (id);
CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
CREATE INDEX sui_hei_awardapplication_applier_id_00be222b ON public.sui_hei_awardapplication USING btree (applier_id);
CREATE INDEX sui_hei_awardapplication_award_id_aa0cc08a ON public.sui_hei_awardapplication USING btree (award_id);
CREATE INDEX sui_hei_awardapplication_reviewer_id_4c609c4f ON public.sui_hei_awardapplication USING btree (reviewer_id);
CREATE INDEX sui_hei_bookmark_puzzle_id_0211175c ON public.sui_hei_bookmark USING btree (puzzle_id);
CREATE INDEX sui_hei_bookmark_user_id_475bb3c8 ON public.sui_hei_bookmark USING btree (user_id);
CREATE INDEX sui_hei_chatmessage_chatroom_id_d15d65e3 ON public.sui_hei_chatmessage USING btree (chatroom_id);
CREATE INDEX sui_hei_chatmessage_user_id_87bd67f6 ON public.sui_hei_chatmessage USING btree (user_id);
CREATE INDEX sui_hei_chatroom_name_b0f36b4b_like ON public.sui_hei_chatroom USING btree (name varchar_pattern_ops);
CREATE INDEX sui_hei_chatroom_user_id_23e4cf24 ON public.sui_hei_chatroom USING btree (user_id);
CREATE INDEX sui_hei_comment_puzzle_id_32dbe3f7 ON public.sui_hei_comment USING btree (puzzle_id);
CREATE INDEX sui_hei_comment_user_id_e0e82347 ON public.sui_hei_comment USING btree (user_id);
CREATE INDEX sui_hei_dialogue_puzzle_id_d736d013 ON public.sui_hei_dialogue USING btree (puzzle_id);
CREATE INDEX sui_hei_dialogue_user_id_7dba009f ON public.sui_hei_dialogue USING btree (user_id);
CREATE INDEX sui_hei_directmessage_receiver_id_6fe1b1da ON public.sui_hei_directmessage USING btree (receiver_id);
CREATE INDEX sui_hei_directmessage_sender_id_47575dca ON public.sui_hei_directmessage USING btree (sender_id);
CREATE INDEX sui_hei_event_user_id_574c9deb ON public.sui_hei_event USING btree (user_id);
CREATE INDEX sui_hei_eventaward_award_id_1593f1e9 ON public.sui_hei_eventaward USING btree (award_id);
CREATE INDEX sui_hei_eventaward_event_id_ee7fc23d ON public.sui_hei_eventaward USING btree (event_id);
CREATE INDEX sui_hei_favoritechatroom_chatroom_id_a416c6fc ON public.sui_hei_favoritechatroom USING btree (chatroom_id);
CREATE INDEX sui_hei_favoritechatroom_user_id_123a5e18 ON public.sui_hei_favoritechatroom USING btree (user_id);
CREATE INDEX sui_hei_hint_puzzle_id_b4edfab8 ON public.sui_hei_hint USING btree (puzzle_id);
CREATE INDEX sui_hei_puzzle_user_id_946a9f35 ON public.sui_hei_puzzle USING btree (user_id);
CREATE INDEX sui_hei_schedule_user_id_6fb7eb62 ON public.sui_hei_schedule USING btree (user_id);
CREATE INDEX sui_hei_star_puzzle_id_8db2a6e5 ON public.sui_hei_star USING btree (puzzle_id);
CREATE INDEX sui_hei_star_user_id_68775e93 ON public.sui_hei_star USING btree (user_id);
CREATE INDEX sui_hei_user_current_award_id_3d1f767d ON public.sui_hei_user USING btree (current_award_id);
CREATE INDEX sui_hei_user_groups_group_id_c3cf2d84 ON public.sui_hei_user_groups USING btree (group_id);
CREATE INDEX sui_hei_user_groups_user_id_995095f6 ON public.sui_hei_user_groups USING btree (user_id);
CREATE INDEX sui_hei_user_last_read_dm_id_b9786238 ON public.sui_hei_user USING btree (last_read_dm_id);
CREATE INDEX sui_hei_user_nickname_269f1fc5_like ON public.sui_hei_user USING btree (nickname varchar_pattern_ops);
CREATE INDEX sui_hei_user_user_permissions_permission_id_19bc3f00 ON public.sui_hei_user_user_permissions USING btree (permission_id);
CREATE INDEX sui_hei_user_user_permissions_user_id_2c881b71 ON public.sui_hei_user_user_permissions USING btree (user_id);
CREATE INDEX sui_hei_user_username_873d30f0_like ON public.sui_hei_user USING btree (username varchar_pattern_ops);
CREATE INDEX sui_hei_useraward_award_id_8d4a868f ON public.sui_hei_useraward USING btree (award_id);
CREATE INDEX sui_hei_useraward_user_id_1145009e ON public.sui_hei_useraward USING btree (user_id);
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_awardapplication
    ADD CONSTRAINT sui_hei_awardapplica_reviewer_id_4c609c4f_fk_sui_hei_u FOREIGN KEY (reviewer_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_awardapplication
    ADD CONSTRAINT sui_hei_awardapplication_applier_id_00be222b_fk_sui_hei_user_id FOREIGN KEY (applier_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_awardapplication
    ADD CONSTRAINT sui_hei_awardapplication_award_id_aa0cc08a_fk_sui_hei_award_id FOREIGN KEY (award_id) REFERENCES public.sui_hei_award(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_bookmark
    ADD CONSTRAINT sui_hei_bookmark_puzzle_id_0211175c_fk_sui_hei_puzzle_id FOREIGN KEY (puzzle_id) REFERENCES public.sui_hei_puzzle(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_bookmark
    ADD CONSTRAINT sui_hei_bookmark_user_id_475bb3c8_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_chatmessage
    ADD CONSTRAINT sui_hei_chatmessage_chatroom_id_d15d65e3_fk_sui_hei_chatroom_id FOREIGN KEY (chatroom_id) REFERENCES public.sui_hei_chatroom(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_chatmessage
    ADD CONSTRAINT sui_hei_chatmessage_user_id_87bd67f6_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_chatroom
    ADD CONSTRAINT sui_hei_chatroom_user_id_23e4cf24_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_comment
    ADD CONSTRAINT sui_hei_comment_puzzle_id_32dbe3f7_fk_sui_hei_puzzle_id FOREIGN KEY (puzzle_id) REFERENCES public.sui_hei_puzzle(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_comment
    ADD CONSTRAINT sui_hei_comment_user_id_e0e82347_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_dialogue
    ADD CONSTRAINT sui_hei_dialogue_puzzle_id_d736d013_fk_sui_hei_puzzle_id FOREIGN KEY (puzzle_id) REFERENCES public.sui_hei_puzzle(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_dialogue
    ADD CONSTRAINT sui_hei_dialogue_user_id_7dba009f_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_directmessage
    ADD CONSTRAINT sui_hei_directmessage_receiver_id_6fe1b1da_fk_sui_hei_user_id FOREIGN KEY (receiver_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_directmessage
    ADD CONSTRAINT sui_hei_directmessage_sender_id_47575dca_fk_sui_hei_user_id FOREIGN KEY (sender_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_event
    ADD CONSTRAINT sui_hei_event_user_id_574c9deb_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_eventaward
    ADD CONSTRAINT sui_hei_eventaward_award_id_1593f1e9_fk_sui_hei_award_id FOREIGN KEY (award_id) REFERENCES public.sui_hei_award(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_eventaward
    ADD CONSTRAINT sui_hei_eventaward_event_id_ee7fc23d_fk_sui_hei_event_id FOREIGN KEY (event_id) REFERENCES public.sui_hei_event(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_favoritechatroom
    ADD CONSTRAINT sui_hei_favoritechat_chatroom_id_a416c6fc_fk_sui_hei_c FOREIGN KEY (chatroom_id) REFERENCES public.sui_hei_chatroom(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_favoritechatroom
    ADD CONSTRAINT sui_hei_favoritechatroom_user_id_123a5e18_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_hint
    ADD CONSTRAINT sui_hei_hint_puzzle_id_b4edfab8_fk_sui_hei_puzzle_id FOREIGN KEY (puzzle_id) REFERENCES public.sui_hei_puzzle(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_puzzle
    ADD CONSTRAINT sui_hei_puzzle_user_id_946a9f35_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_schedule
    ADD CONSTRAINT sui_hei_schedule_user_id_6fb7eb62_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_star
    ADD CONSTRAINT sui_hei_star_puzzle_id_8db2a6e5_fk_sui_hei_puzzle_id FOREIGN KEY (puzzle_id) REFERENCES public.sui_hei_puzzle(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_star
    ADD CONSTRAINT sui_hei_star_user_id_68775e93_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user
    ADD CONSTRAINT sui_hei_user_current_award_id_3d1f767d_fk_sui_hei_useraward_id FOREIGN KEY (current_award_id) REFERENCES public.sui_hei_useraward(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user_groups
    ADD CONSTRAINT sui_hei_user_groups_group_id_c3cf2d84_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user_groups
    ADD CONSTRAINT sui_hei_user_groups_user_id_995095f6_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user
    ADD CONSTRAINT sui_hei_user_last_read_dm_id_b9786238_fk_sui_hei_d FOREIGN KEY (last_read_dm_id) REFERENCES public.sui_hei_directmessage(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user_user_permissions
    ADD CONSTRAINT sui_hei_user_user_pe_permission_id_19bc3f00_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_user_user_permissions
    ADD CONSTRAINT sui_hei_user_user_pe_user_id_2c881b71_fk_sui_hei_u FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_useraward
    ADD CONSTRAINT sui_hei_useraward_award_id_8d4a868f_fk_sui_hei_award_id FOREIGN KEY (award_id) REFERENCES public.sui_hei_award(id) DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE ONLY public.sui_hei_useraward
    ADD CONSTRAINT sui_hei_useraward_user_id_1145009e_fk_sui_hei_user_id FOREIGN KEY (user_id) REFERENCES public.sui_hei_user(id) DEFERRABLE INITIALLY DEFERRED;
