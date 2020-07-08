const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addLectureToTeacher')

async function addLectureToTeacher(lecture, teacher) {

  debug('Adding', lecture, teacher, 'to database')

  try {
    await db.query('BEGIN')
    const queryText = 'INSERT INTO "public"."_LectureToTeacher" ("A", "B") VALUES($1, $2)'
    const res = await db.query(queryText, [lecture, teacher])
    await db.query('COMMIT')
    debug('Response after adding', res.rows)
    return res

  } catch (e) {
    await db.query('ROLLBACK')
    throw e
  }
}

module.exports = { addLectureToTeacher }