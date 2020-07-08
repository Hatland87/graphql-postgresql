const db = require('../database/dbConnect')
const fs = require('fs')

fs.readFile('data/courses.txt',(err, data) => {
  if (err) {
    throw err;
  }
  const arr = data.toString().split('\n');

  for (line of arr) {
    sendToDB(line.split(',', 2))
  }

})

async function sendToDB(line) {

    try {
      await db.query('BEGIN')
      const queryText = 'INSERT INTO "public"."Course" (code, name) VALUES($1, $2)'
      await db.query(queryText, line)
      await db.query('COMMIT')
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}