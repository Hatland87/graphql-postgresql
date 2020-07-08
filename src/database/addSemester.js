const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addSemester')

async function addSemester(semester) {

  debug('Adding', semester, 'to database')

  try {
    await db.query('BEGIN')
    const queryText = 'INSERT INTO "public"."Semester" (name) VALUES($1) RETURNING id'
    const res = await db.query(queryText, [semester])
    await db.query('COMMIT')
    debug('Response after adding', res.rows)
    return res

  } catch (e) {
    await db.query('ROLLBACK')
    throw e
  }
}

module.exports = { addSemester }