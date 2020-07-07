CREATE TABLE "public"."Course" (
  id SERIAL PRIMARY KEY NOT NULL,
  code VARCHAR(16) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Teacher" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "public"."Semester" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "public"."Lecture" (
  id SERIAL PRIMARY KEY NOT NULL,
  timeOfRecording TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  "semesterId" INTEGER NOT NULL,
  "teacherId" INTEGER NOT NULL,
  "courseId" INTEGER NOT NULL,
  FOREIGN KEY ("semesterId") REFERENCES "public"."Semester"(id),
  FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"(id),
  FOREIGN KEY ("courseId") REFERENCES "public"."Course"(id)
);