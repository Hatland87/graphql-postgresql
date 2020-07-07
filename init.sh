#!/bin/bash
# create postgreSQL server
docker-compose up -d

# create database tables from schema file
psql -h localhost -d bookstore -U user -f postgreSQL/schema.sql

# reads the database tabels and translate from SQL to Prisma data model
npx prisma introspect

# reads Prisma schema and grenerate Prisma Client library
npx prisma generate