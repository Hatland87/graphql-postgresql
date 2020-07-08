#!/bin/bash

# create postgreSQL server
docker-compose up -d

# wait for the database to be ready
sleep 2

# map your data model to the database schema
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental

# This command reads your Prisma schema and generates your Prisma Client library into node_modules/@prisma/client
npx prisma generate

# imports courses
node src/database/addCourseFromFile.js 

# import lectures
DEBUG=server:webscraper:forelesning node src/webscraper/forelesninger.js 