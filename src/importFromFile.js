const fs = require('fs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

prisma.author.create({
  data: {
    name: "Ole Jonny"
  }
})

fs.readFile('data/courses.txt',(err, data) => {
  if (err) {
    throw err
  }
  const arr = data.toString().split('\n')

  console.log(arr.length)
})