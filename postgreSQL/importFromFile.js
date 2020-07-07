require('dotenv').config()
const { Pool, Client } = require('pg')
const fs = require('fs')
const { env } = require('process')

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
})


fs.readFile('data/courses.txt',(err, data) => {
  if (err) {
    throw err;
  }
  const arr = data.toString().split('\n');

  for (line of arr) {
    sendToDB(line.split(',', 2))
  }

})

function sendToDB(line) {
  (async () => {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const queryText = 'INSERT INTO "public"."Course" (code, name) VALUES($1, $2)'
      await client.query(queryText, line)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
}

// psql -h localhost -d bookstore -U user -c 'SELECT * FROM "public"."Course"'