CREATE TABLE "public"."Course"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "code" text NOT NULL,
    "name" text NOT NULL
);

CREATE TABLE "public"."Semester"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" text NOT NULL
);

CREATE TABLE "public"."Teacher"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" text NOT NULL
);

CREATE TABLE "public"."Lecture"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "audiolink" VARCHAR(255) NOT NULL ,
    "cameralink" VARCHAR(255) NOT NULL ,
    "combinedlink" VARCHAR(255) NOT NULL ,
    "courseid" integer NOT NULL ,
    "duration" integer NOT NULL ,
    "screenlink" VARCHAR(255) NOT NULL ,
    "semesterid" integer NOT NULL ,
    "timeofrecording" TIMESTAMP NOT NULL ,
    "title" VARCHAR(255) NOT NULL,
    FOREIGN KEY ("courseid") REFERENCES "public"."Course"("id") ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY ("semesterid")REFERENCES "public"."Semester"("id") ON DELETE CASCADE  ON UPDATE CASCADE
);

CREATE TABLE "public"."UncategorizedLecture"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "audiolink" text NOT NULL ,
    "cameralink" text NOT NULL ,
    "combinedlink" text NOT NULL ,
    "course" text NOT NULL ,
    "duration" text NOT NULL ,
    "screenlink" text NOT NULL ,
    "semesterid" integer NOT NULL ,
    "teachers" text NOT NULL ,
    "timeofrecording" timestamp(3) NOT NULL ,
    "title" text NOT NULL,
    FOREIGN KEY ("semesterid")REFERENCES "public"."Semester"("id") ON DELETE CASCADE  ON UPDATE CASCADE
);

CREATE TABLE "public"."_LectureToTeacher"
(
    "A" integer NOT NULL ,
    "B" integer NOT NULL,
    FOREIGN KEY ("A")REFERENCES "public"."Lecture"("id") ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY ("B")REFERENCES "public"."Teacher"("id") ON DELETE CASCADE  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Semester.name" ON "public"."Semester"("name");

CREATE UNIQUE INDEX "Teacher.name" ON "public"."Teacher"("name");

CREATE UNIQUE INDEX "_LectureToTeacher_AB_unique" ON "public"."_LectureToTeacher"("A","B");

CREATE  INDEX "_LectureToTeacher_B_index" ON "public"."_LectureToTeacher"("B");