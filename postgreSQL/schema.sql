CREATE TABLE "public"."Course" (
  id SERIAL PRIMARY KEY NOT NULL,
  code VARCHAR(16) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Teacher" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR UNIQUE NOT NULL 
);

CREATE TABLE "public"."Semester" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE "public"."Lecture" (
  id SERIAL PRIMARY KEY NOT NULL,
  timeOfRecording TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  audioLink VARCHAR(255) NOT NULL,
  cameraLink VARCHAR(255) NOT NULL,
  screenLink VARCHAR(255) NOT NULL,
  combinedLink VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."LectureMeta" (
  PRIMARY KEY (courseId, lectureId, semesterId, teacherId),
  courseId INTEGER NOT NULL,
  lectureId INTEGER NOT NULL,
  semesterId INTEGER NOT NULL,
  teacherId INTEGER NOT NULL,
  FOREIGN KEY (courseId) REFERENCES "public"."Course"(id),
  FOREIGN KEY (lectureId) REFERENCES "public"."Lecture"(id),
  FOREIGN KEY (semesterId) REFERENCES "public"."Semester"(id),
  FOREIGN KEY (teacherId) REFERENCES "public"."Teacher"(id)
);

CREATE TABLE "public"."UncategorizedLecture" (
  id SERIAL PRIMARY KEY NOT NULL,
  timeOfRecording TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  teacher VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  audioLink VARCHAR(255) NOT NULL,
  cameraLink VARCHAR(255) NOT NULL,
  screenLink VARCHAR(255) NOT NULL,
  combinedLink VARCHAR(255) NOT NULL
);
