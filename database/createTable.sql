CREATE TABLE "user" (
	"userId" serial NOT NULL,
	"userName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"lastLogIn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "character" (
	"characterId" serial NOT NULL,
	"characterName" varchar(255) NOT NULL,
	"exprience" int NOT NULL DEFAULT 0,
	"stat" int [],
	"momentum" int [] NOT NULL DEFAULT ARRAY [2, 10, 2],
	"health" int NOT NULL DEFAULT 5,
	"spirit" int NOT NULL DEFAULT 5,
	"supply" int NOT NULL DEFAULT 5,
	"debilities" bool [] NOT NULL DEFAULT ARRAY [FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE],
	"bond" varchar(255) [],
	"asset" varchar(255) [] NOT NULL,
	"equipment" varchar(255) [],
	"location" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "character_pk" PRIMARY KEY ("characterId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userCharacter" (
	"userId" serial NOT NULL,
	"characterId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "vow" (
	"vowId" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"rank" int NOT NULL,
	"progress" int NOT NULL,
	"status" varchar(255) NOT NULL,
	CONSTRAINT "vow_pk" PRIMARY KEY ("vowId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "characterVow" (
	"characterId" serial NOT NULL,
	"vowId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "log" (
	"logId" serial NOT NULL,
	"note" varchar(255) NOT NULL,
	"roll" int NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "log_pk" PRIMARY KEY ("logId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "characterLog" (
	"characterId" serial NOT NULL,
	"logId" serial NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "userCharacter" ADD CONSTRAINT "userCharacter_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
ALTER TABLE "userCharacter" ADD CONSTRAINT "userCharacter_fk1" FOREIGN KEY ("characterId") REFERENCES "character"("characterId");


ALTER TABLE "characterVow" ADD CONSTRAINT "characterVow_fk0" FOREIGN KEY ("characterId") REFERENCES "character"("characterId");
ALTER TABLE "characterVow" ADD CONSTRAINT "characterVow_fk1" FOREIGN KEY ("vowId") REFERENCES "vow"("vowId");


ALTER TABLE "characterLog" ADD CONSTRAINT "characterLog_fk0" FOREIGN KEY ("characterId") REFERENCES "character"("characterId");
ALTER TABLE "characterLog" ADD CONSTRAINT "characterLog_fk1" FOREIGN KEY ("logId") REFERENCES "log"("logId");
