comands run so far:

    npx prisma init

    docker-compose up

    psql -h localhost -d bookstore -U user -f postgreSQL/schema.sql

    npx prisma introspect -> reads the database schema and translate from SQL to Prisma data model

    npx prisma generate -> reads Prisma schema and grenerate Prisma Client library