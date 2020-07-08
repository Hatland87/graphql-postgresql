/*
    Takes the time of recording of a lecture and determens the semester the lecture belongs to, eg. V2019, H2016, with H for fall and V for spring
    When the semester is determined, we check if the semster is in the database, if not it wil be added and returs the database table id

    INPUT
      timeOfRecording - DateTime
    
    OUTPUT
      semesterId - Int
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:findSemester')

async function findSemester(timeOfRecording) {

  const semester = springOrFall(timeOfRecording)
  debug('Semester:', semester)
  const queryText = 'SELECT * FROM "public"."Semester" WHERE NAME LIKE $1'
  let res = await db.query(queryText, [semester])
  debug('Result of query:', res.rows)

  // if semester not in database, add semester to database
  if (res.rows.length == 0) {
    res = await addSemesterToDatabase(semester)
  } 
  return res.rows[0].id
}

async function addSemesterToDatabase(semester) {

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

function springOrFall (timeOfRecording) {
  // format: YYYY-MM-DD HH:MM
  const year = parseInt(timeOfRecording.split('-')[0])
  const mounth = parseInt(timeOfRecording.split('-')[1])

  if (mounth < 8) {
    // before august
    return 'V' + year
  } else {
    return 'H' + year
  }
}

module.exports = { findSemester }