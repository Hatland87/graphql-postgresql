const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Course = require('./resolvers/Course')
const Lecture = require('./resolvers/Lecture')
const Semester = require('./resolvers/Semester')
const Teacher = require('./resolvers/Teacher')

const resolvers = {
    Query,
    Course,
    Lecture,
    Semester,
    Teacher
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