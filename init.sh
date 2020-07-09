#!/bin/bash

# create postgreSQL server
docker-compose up -d

# wait for the database to be ready
sleep 2

# create database tables from schema file
psql -h localhost -d bookstore -U user -f postgreSQL/schema2.sql

# reads the database tabels and translate from SQL to Prisma data model
npx prisma introspect

# reads Prisma schema and grenerate Prisma Client library
npx prisma generate

# imports courses
DEBUG=server* node src/database/addCourseFromFile.js 

# import lectures
DEBUG=server* node src/webscraper/forelesninger.js 