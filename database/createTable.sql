CREATE TABLE "user" (
	"userId" serial NOT NULL,
	"username" varchar(255) NOT NULL,
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
	"experience" int NOT NULL DEFAULT 0,
	"edge" int NOT NULL DEFAULT 0,
	"heart" int NOT NULL DEFAULT 0,
	"iron" int NOT NULL DEFAULT 0,
	"shadow" int NOT NULL DEFAULT 0,
	"wits" int NOT NULL DEFAULT 0,
	"health" int NOT NULL DEFAULT 5,
	"spirit" int NOT NULL DEFAULT 5,
	"supply" int NOT NULL DEFAULT 5,
	"momentum" int NOT NULL DEFAULT 2,
	"maxMomentum" int NOT NULL DEFAULT 10,
	"resetMomentum" int NOT NULL DEFAULT 2,
	"bond" int NOT NULL DEFAULT 0,
	"wounded" bool NOT NULL DEFAULT FALSE,
	"shaken" bool NOT NULL DEFAULT FALSE,
	"unprepared" bool NOT NULL DEFAULT FALSE,
	"encumbered" bool NOT NULL DEFAULT FALSE,
	"maimed" bool NOT NULL DEFAULT FALSE,
	"corrupted" bool NOT NULL DEFAULT FALSE,
	"cursed" bool NOT NULL DEFAULT FALSE,
	"tormented" bool NOT NULL DEFAULT FALSE,
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



CREATE TABLE "asset" (
	"assetId" serial NOT NULL,
	"assetName" varchar(255) NOT NULL,
	"uniqueName" varchar(255),
	"health" int NOT NULL DEFAULT 0,
	"option1" bool NOT NULL DEFAULT FALSE,
	"option2" bool NOT NULL DEFAULT FALSE,
	"option3" bool NOT NULL DEFAULT FALSE,
	CONSTRAINT "asset_pk" PRIMARY KEY ("assetId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "characterAsset" (
	"characterId" serial NOT NULL,
	"assetId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "log" (
	"logId" serial NOT NULL,
	"note" varchar(255) NOT NULL,
	"roll" int,
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





ALTER TABLE "userCharacter" ADD CONSTRAINT "userCharacter_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE;
ALTER TABLE "userCharacter" ADD CONSTRAINT "userCharacter_fk1" FOREIGN KEY ("characterId") REFERENCES "character"("characterId") ON DELETE CASCADE;


ALTER TABLE "characterVow" ADD CONSTRAINT "characterVow_fk0" FOREIGN KEY ("characterId") REFERENCES "character"("characterId") ON DELETE CASCADE;
ALTER TABLE "characterVow" ADD CONSTRAINT "characterVow_fk1" FOREIGN KEY ("vowId") REFERENCES "vow"("vowId") ON DELETE CASCADE;


ALTER TABLE "characterAsset" ADD CONSTRAINT "characterAsset_fk0" FOREIGN KEY ("characterId") REFERENCES "character"("characterId") ON DELETE CASCADE;
ALTER TABLE "characterAsset" ADD CONSTRAINT "characterAsset_fk1" FOREIGN KEY ("assetId") REFERENCES "asset"("assetId") ON DELETE CASCADE;


ALTER TABLE "characterLog" ADD CONSTRAINT "characterLog_fk0" FOREIGN KEY ("characterId") REFERENCES "character"("characterId") ON DELETE CASCADE;
ALTER TABLE "characterLog" ADD CONSTRAINT "characterLog_fk1" FOREIGN KEY ("logId") REFERENCES "log"("logId") ON DELETE CASCADE;
