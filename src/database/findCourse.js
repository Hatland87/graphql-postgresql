/*
    Takes course name from webscraper and checks if the course exists in the database
    If the course code is equal to the first or the two first words in input, we return the courseId for table Course in database,
    if else, we return false

    INPUT
      course - String

    OUTPUT
      corseId OR false
*/
const db = require('../database/dbConnect')
const debug = require('debug')('server:database:findCourse')

async function findCourse(str) {

  debug('Input:', str)
  const queryText = 'SELECT * FROM "public"."Course" WHERE CODE LIKE $1'
  const res1 = await db.query(queryText, str.split(' ',1))
  const res2 = await db.query(queryText, [str.split(' ',2).join('')])
  debug(str.split(' ',1), 'query returs', res1.rows[0])
  debug([str.split(' ',2).join('')], 'query returs', res2.rows[0])

  if (res1.rows[0]) {
    return res1.rows[0].id

  } else if (res1.rows[0]) {
    return res2.rows[0].id
    
  } else {
    return false
  }
}

module.exports = { findCourse }