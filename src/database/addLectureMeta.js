/*
    Takes courses from ntnu.no and adds it to the database
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addLectureMeta')

async function addLectureMeta(courseId, lectureId, semesterId, teacherId) {

    try {
      await db.query('BEGIN')
      debug('Input:', courseId, lectureId, semesterId, teacherId)
      const queryText = 'INSERT INTO "public"."LectureMeta" (courseId, lectureId, semesterId, teacherId) VALUES($1, $2, $3, $4)'
      const res = await db.query(queryText, [courseId, lectureId, semesterId, teacherId])
      await db.query('COMMIT')
      debug('Response after adding', res.rows)
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}

module.exports = { addLectureMeta }