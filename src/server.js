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

const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });
  prisma.on('query', e => {
    e.timestamp;
    e.query;
    e.params;
    e.duration;
    e.target;
    console.log(e);
  })

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
            prisma,
        }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))