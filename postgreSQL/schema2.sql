CREATE TABLE "public"."Course" (
"code" text  NOT NULL ,"id" SERIAL,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Semester" (
"id" SERIAL,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Teacher" (
"id" SERIAL,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Lecture" (
"audiolink" text  NOT NULL ,"cameralink" text  NOT NULL ,"combinedlink" text  NOT NULL ,"courseid" integer  NOT NULL ,"duration" integer  NOT NULL ,"id" SERIAL,"screenlink" text  NOT NULL ,"semesterid" integer  NOT NULL ,"timeofrecording" timestamp(3)  NOT NULL ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."UncategorizedLecture" (
"audiolink" text  NOT NULL ,"cameralink" text  NOT NULL ,"combinedlink" text  NOT NULL ,"course" text  NOT NULL ,"duration" text  NOT NULL ,"id" SERIAL,"screenlink" text  NOT NULL ,"semesterid" integer  NOT NULL ,"teachers" text  NOT NULL ,"timeofrecording" timestamp(3)  NOT NULL ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_LectureToTeacher" (
"A" integer  NOT NULL ,"B" integer  NOT NULL )

CREATE UNIQUE INDEX "Semester.name" ON "public"."Semester"("name")

CREATE UNIQUE INDEX "Teacher.name" ON "public"."Teacher"("name")

CREATE UNIQUE INDEX "_LectureToTeacher_AB_unique" ON "public"."_LectureToTeacher"("A","B")

CREATE  INDEX "_LectureToTeacher_B_index" ON "public"."_LectureToTeacher"("B")

ALTER TABLE "public"."Lecture" ADD FOREIGN KEY ("courseid")REFERENCES "public"."Course"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Lecture" ADD FOREIGN KEY ("semesterid")REFERENCES "public"."Semester"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."UncategorizedLecture" ADD FOREIGN KEY ("semesterid")REFERENCES "public"."Semester"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LectureToTeacher" ADD FOREIGN KEY ("A")REFERENCES "public"."Lecture"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LectureToTeacher" ADD FOREIGN KEY ("B")REFERENCES "public"."Teacher"("id") ON DELETE CASCADE  ON UPDATE CASCADE