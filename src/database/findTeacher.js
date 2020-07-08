/*
    Takes name of teacher(s) and looks up if they are already in the database, adds them if not
    When there is multiple teachers, they are usualy separated with ',' 'og' '/'
*/



require('dotenv').config()
const db = require('../database/dbConnect')
const debug = require('debug')('server:database:findTeacher')


async function findTeacher(name) {
  debug('Input:', name)

  // if there are multiple teacher separated with '\' or '/' or ',' or 'og'
  // changes all separators to ',' and creates an array with names
  name = name.replace('\\',',')
  name = name.replace('/',',')
  name = name.replace('og',',')
  name = name.replace('m.fl.','')
  if (name.includes(',')) {
    name = name.split(',')
  } else {
    name = [name]
  }

  const teacherId = []
  for (i in name) {
    name[i] = name[i].trim()
    debug('Find id for', name[i])
    teacherId.push(await findOneTeacherInDatabase(name[i]))
  }
  
  return teacherId
}

async function findOneTeacherInDatabase(name) {
  
  const queryText = 'SELECT * FROM "public"."Teacher" WHERE NAME LIKE $1'
  let res = await db.query(queryText, [name])
  debug('Result of query:', res.rows)

  // if teacher not in database, add teacher to database
  if (res.rows.length == 0) {
    res = await addTeacherToDatabase(name)
  } 

  debug('Function response', res.rows[0].id)
  return res.rows[0].id
}

async function addTeacherToDatabase(name) {

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

module.exports = { findTeacher }