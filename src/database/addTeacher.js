const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addTeacher')

async function addTeacher(name) {

  try {
    await db.query('BEGIN')
    debug('Adding', name, 'to database')
    const queryText = 'INSERT INTO "public"."Teacher" (name) VALUES($1) RETURNING id'
    const res = await db.query(queryText, [name])
    await db.query('COMMIT')
    debug('Response after adding', res.rows)
    return res

  } catch (e) {
    await db.query('ROLLBACK')
    throw e
  }
}

module.exports = { addTeacher }