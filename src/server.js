const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Author = require('./resolvers/Author')
const Book = require('./resolvers/Book')

const resolvers = {
    Query,
    Mutation,
    Author,
    Book,
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
            prisma,
        }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))