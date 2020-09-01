--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."userCharacter" DROP CONSTRAINT "userCharacter_fk1";
ALTER TABLE ONLY public."userCharacter" DROP CONSTRAINT "userCharacter_fk0";
ALTER TABLE ONLY public."characterVow" DROP CONSTRAINT "characterVow_fk1";
ALTER TABLE ONLY public."characterVow" DROP CONSTRAINT "characterVow_fk0";
ALTER TABLE ONLY public."characterLog" DROP CONSTRAINT "characterLog_fk1";
ALTER TABLE ONLY public."characterLog" DROP CONSTRAINT "characterLog_fk0";
ALTER TABLE ONLY public."characterAsset" DROP CONSTRAINT "characterAsset_fk1";
ALTER TABLE ONLY public."characterAsset" DROP CONSTRAINT "characterAsset_fk0";
ALTER TABLE ONLY public.vow DROP CONSTRAINT vow_pk;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
ALTER TABLE ONLY public.log DROP CONSTRAINT log_pk;
ALTER TABLE ONLY public."character" DROP CONSTRAINT character_pk;
ALTER TABLE ONLY public.asset DROP CONSTRAINT asset_pk;
ALTER TABLE public.vow ALTER COLUMN "vowId" DROP DEFAULT;
ALTER TABLE public."userCharacter" ALTER COLUMN "characterId" DROP DEFAULT;
ALTER TABLE public."userCharacter" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."user" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.log ALTER COLUMN "logId" DROP DEFAULT;
ALTER TABLE public."characterVow" ALTER COLUMN "vowId" DROP DEFAULT;
ALTER TABLE public."characterVow" ALTER COLUMN "characterId" DROP DEFAULT;
ALTER TABLE public."characterLog" ALTER COLUMN "logId" DROP DEFAULT;
ALTER TABLE public."characterLog" ALTER COLUMN "characterId" DROP DEFAULT;
ALTER TABLE public."characterAsset" ALTER COLUMN "assetId" DROP DEFAULT;
ALTER TABLE public."characterAsset" ALTER COLUMN "characterId" DROP DEFAULT;
ALTER TABLE public."character" ALTER COLUMN "characterId" DROP DEFAULT;
ALTER TABLE public.asset ALTER COLUMN "assetId" DROP DEFAULT;
DROP SEQUENCE public."vow_vowId_seq";
DROP TABLE public.vow;
DROP SEQUENCE public."user_userId_seq";
DROP SEQUENCE public."userCharacter_userId_seq";
DROP SEQUENCE public."userCharacter_characterId_seq";
DROP TABLE public."userCharacter";
DROP TABLE public."user";
DROP SEQUENCE public."log_logId_seq";
DROP TABLE public.log;
DROP SEQUENCE public."character_characterId_seq";
DROP SEQUENCE public."characterVow_vowId_seq";
DROP SEQUENCE public."characterVow_characterId_seq";
DROP TABLE public."characterVow";
DROP SEQUENCE public."characterLog_logId_seq";
DROP SEQUENCE public."characterLog_characterId_seq";
DROP TABLE public."characterLog";
DROP SEQUENCE public."characterAsset_characterId_seq";
DROP SEQUENCE public."characterAsset_assetId_seq";
DROP TABLE public."characterAsset";
DROP TABLE public."character";
DROP SEQUENCE public."asset_assetId_seq";
DROP TABLE public.asset;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: asset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset (
    "assetId" integer NOT NULL,
    "assetName" character varying(255) NOT NULL,
    "uniqueName" character varying(255),
    health integer DEFAULT 0 NOT NULL,
    option1 boolean DEFAULT false NOT NULL,
    option2 boolean DEFAULT false NOT NULL,
    option3 boolean DEFAULT false NOT NULL
);


--
-- Name: asset_assetId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."asset_assetId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: asset_assetId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."asset_assetId_seq" OWNED BY public.asset."assetId";


--
-- Name: character; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."character" (
    "characterId" integer NOT NULL,
    "characterName" character varying(255) NOT NULL,
    experience integer DEFAULT 0 NOT NULL,
    edge integer DEFAULT 0 NOT NULL,
    heart integer DEFAULT 0 NOT NULL,
    iron integer DEFAULT 0 NOT NULL,
    shadow integer DEFAULT 0 NOT NULL,
    wits integer DEFAULT 0 NOT NULL,
    health integer DEFAULT 5 NOT NULL,
    spirit integer DEFAULT 5 NOT NULL,
    supply integer DEFAULT 5 NOT NULL,
    momentum integer DEFAULT 2 NOT NULL,
    "maxMomentum" integer DEFAULT 10 NOT NULL,
    "resetMomentum" integer DEFAULT 2 NOT NULL,
    bond integer DEFAULT 0 NOT NULL,
    wounded boolean DEFAULT false NOT NULL,
    shaken boolean DEFAULT false NOT NULL,
    unprepared boolean DEFAULT false NOT NULL,
    encumbered boolean DEFAULT false NOT NULL,
    maimed boolean DEFAULT false NOT NULL,
    corrupted boolean DEFAULT false NOT NULL,
    cursed boolean DEFAULT false NOT NULL,
    tormented boolean DEFAULT false NOT NULL,
    location character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: characterAsset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."characterAsset" (
    "characterId" integer NOT NULL,
    "assetId" integer NOT NULL
);


--
-- Name: characterAsset_assetId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterAsset_assetId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterAsset_assetId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterAsset_assetId_seq" OWNED BY public."characterAsset"."assetId";


--
-- Name: characterAsset_characterId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterAsset_characterId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterAsset_characterId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterAsset_characterId_seq" OWNED BY public."characterAsset"."characterId";


--
-- Name: characterLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."characterLog" (
    "characterId" integer NOT NULL,
    "logId" integer NOT NULL
);


--
-- Name: characterLog_characterId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterLog_characterId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterLog_characterId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterLog_characterId_seq" OWNED BY public."characterLog"."characterId";


--
-- Name: characterLog_logId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterLog_logId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterLog_logId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterLog_logId_seq" OWNED BY public."characterLog"."logId";


--
-- Name: characterVow; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."characterVow" (
    "characterId" integer NOT NULL,
    "vowId" integer NOT NULL
);


--
-- Name: characterVow_characterId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterVow_characterId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterVow_characterId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterVow_characterId_seq" OWNED BY public."characterVow"."characterId";


--
-- Name: characterVow_vowId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."characterVow_vowId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characterVow_vowId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."characterVow_vowId_seq" OWNED BY public."characterVow"."vowId";


--
-- Name: character_characterId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."character_characterId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: character_characterId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."character_characterId_seq" OWNED BY public."character"."characterId";


--
-- Name: log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.log (
    "logId" integer NOT NULL,
    note character varying(255) NOT NULL,
    roll integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: log_logId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."log_logId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: log_logId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."log_logId_seq" OWNED BY public.log."logId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastLogIn" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: userCharacter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userCharacter" (
    "userId" integer NOT NULL,
    "characterId" integer NOT NULL
);


--
-- Name: userCharacter_characterId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userCharacter_characterId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userCharacter_characterId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userCharacter_characterId_seq" OWNED BY public."userCharacter"."characterId";


--
-- Name: userCharacter_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userCharacter_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userCharacter_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userCharacter_userId_seq" OWNED BY public."userCharacter"."userId";


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: vow; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vow (
    "vowId" integer NOT NULL,
    name character varying(255) NOT NULL,
    rank integer NOT NULL,
    progress integer NOT NULL,
    status character varying(255) NOT NULL
);


--
-- Name: vow_vowId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."vow_vowId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vow_vowId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."vow_vowId_seq" OWNED BY public.vow."vowId";


--
-- Name: asset assetId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset ALTER COLUMN "assetId" SET DEFAULT nextval('public."asset_assetId_seq"'::regclass);


--
-- Name: character characterId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."character" ALTER COLUMN "characterId" SET DEFAULT nextval('public."character_characterId_seq"'::regclass);


--
-- Name: characterAsset characterId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterAsset" ALTER COLUMN "characterId" SET DEFAULT nextval('public."characterAsset_characterId_seq"'::regclass);


--
-- Name: characterAsset assetId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterAsset" ALTER COLUMN "assetId" SET DEFAULT nextval('public."characterAsset_assetId_seq"'::regclass);


--
-- Name: characterLog characterId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterLog" ALTER COLUMN "characterId" SET DEFAULT nextval('public."characterLog_characterId_seq"'::regclass);


--
-- Name: characterLog logId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterLog" ALTER COLUMN "logId" SET DEFAULT nextval('public."characterLog_logId_seq"'::regclass);


--
-- Name: characterVow characterId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterVow" ALTER COLUMN "characterId" SET DEFAULT nextval('public."characterVow_characterId_seq"'::regclass);


--
-- Name: characterVow vowId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterVow" ALTER COLUMN "vowId" SET DEFAULT nextval('public."characterVow_vowId_seq"'::regclass);


--
-- Name: log logId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.log ALTER COLUMN "logId" SET DEFAULT nextval('public."log_logId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Name: userCharacter userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userCharacter" ALTER COLUMN "userId" SET DEFAULT nextval('public."userCharacter_userId_seq"'::regclass);


--
-- Name: userCharacter characterId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userCharacter" ALTER COLUMN "characterId" SET DEFAULT nextval('public."userCharacter_characterId_seq"'::regclass);


--
-- Name: vow vowId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vow ALTER COLUMN "vowId" SET DEFAULT nextval('public."vow_vowId_seq"'::regclass);


--
-- Data for Name: asset; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.asset ("assetId", "assetName", "uniqueName", health, option1, option2, option3) FROM stdin;
\.


--
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."character" ("characterId", "characterName", experience, edge, heart, iron, shadow, wits, health, spirit, supply, momentum, "maxMomentum", "resetMomentum", bond, wounded, shaken, unprepared, encumbered, maimed, corrupted, cursed, tormented, location, "createdAt") FROM stdin;
\.


--
-- Data for Name: characterAsset; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."characterAsset" ("characterId", "assetId") FROM stdin;
\.


--
-- Data for Name: characterLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."characterLog" ("characterId", "logId") FROM stdin;
\.


--
-- Data for Name: characterVow; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."characterVow" ("characterId", "vowId") FROM stdin;
\.


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.log ("logId", note, roll, "createdAt") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" ("userId", username, email, password, "createdAt", "lastLogIn") FROM stdin;
\.


--
-- Data for Name: userCharacter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."userCharacter" ("userId", "characterId") FROM stdin;
\.


--
-- Data for Name: vow; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vow ("vowId", name, rank, progress, status) FROM stdin;
\.


--
-- Name: asset_assetId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."asset_assetId_seq"', 1, false);


--
-- Name: characterAsset_assetId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterAsset_assetId_seq"', 1, false);


--
-- Name: characterAsset_characterId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterAsset_characterId_seq"', 1, false);


--
-- Name: characterLog_characterId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterLog_characterId_seq"', 1, false);


--
-- Name: characterLog_logId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterLog_logId_seq"', 1, false);


--
-- Name: characterVow_characterId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterVow_characterId_seq"', 1, false);


--
-- Name: characterVow_vowId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."characterVow_vowId_seq"', 1, false);


--
-- Name: character_characterId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."character_characterId_seq"', 1, false);


--
-- Name: log_logId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."log_logId_seq"', 1, false);


--
-- Name: userCharacter_characterId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userCharacter_characterId_seq"', 1, false);


--
-- Name: userCharacter_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userCharacter_userId_seq"', 1, false);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_userId_seq"', 1, false);


--
-- Name: vow_vowId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."vow_vowId_seq"', 1, false);


--
-- Name: asset asset_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT asset_pk PRIMARY KEY ("assetId");


--
-- Name: character character_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."character"
    ADD CONSTRAINT character_pk PRIMARY KEY ("characterId");


--
-- Name: log log_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pk PRIMARY KEY ("logId");


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY ("userId");


--
-- Name: vow vow_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vow
    ADD CONSTRAINT vow_pk PRIMARY KEY ("vowId");


--
-- Name: characterAsset characterAsset_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterAsset"
    ADD CONSTRAINT "characterAsset_fk0" FOREIGN KEY ("characterId") REFERENCES public."character"("characterId") ON DELETE CASCADE;


--
-- Name: characterAsset characterAsset_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterAsset"
    ADD CONSTRAINT "characterAsset_fk1" FOREIGN KEY ("assetId") REFERENCES public.asset("assetId") ON DELETE CASCADE;


--
-- Name: characterLog characterLog_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterLog"
    ADD CONSTRAINT "characterLog_fk0" FOREIGN KEY ("characterId") REFERENCES public."character"("characterId") ON DELETE CASCADE;


--
-- Name: characterLog characterLog_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterLog"
    ADD CONSTRAINT "characterLog_fk1" FOREIGN KEY ("logId") REFERENCES public.log("logId") ON DELETE CASCADE;


--
-- Name: characterVow characterVow_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterVow"
    ADD CONSTRAINT "characterVow_fk0" FOREIGN KEY ("characterId") REFERENCES public."character"("characterId") ON DELETE CASCADE;


--
-- Name: characterVow characterVow_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."characterVow"
    ADD CONSTRAINT "characterVow_fk1" FOREIGN KEY ("vowId") REFERENCES public.vow("vowId") ON DELETE CASCADE;


--
-- Name: userCharacter userCharacter_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userCharacter"
    ADD CONSTRAINT "userCharacter_fk0" FOREIGN KEY ("userId") REFERENCES public."user"("userId") ON DELETE CASCADE;


--
-- Name: userCharacter userCharacter_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userCharacter"
    ADD CONSTRAINT "userCharacter_fk1" FOREIGN KEY ("characterId") REFERENCES public."character"("characterId") ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

