/*
    Takes name of teacher(s) and looks up if they are already in the database, adds them if not
    When there is multiple teachers, they are usualy separated with ',' 'og' '/'
*/

const db = require('../database/dbConnect')
const { addTeacher } = require('./addTeacher')
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
    res = await addTeacher(name)
  } 

  debug('Function response', res.rows[0].id)
  return res.rows[0].id
}

module.exports = { findTeacher }