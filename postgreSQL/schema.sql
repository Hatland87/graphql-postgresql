CREATE TABLE "public"."Course" (
  id SERIAL PRIMARY KEY NOT NULL,
  code VARCHAR(16) NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Lecture" (
  id SERIAL PRIMARY KEY NOT NULL,
  time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  teacher VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  "courseId" INTEGER NOT NULL,
  FOREIGN KEY ("courseId") REFERENCES "public"."Course"(id)
);