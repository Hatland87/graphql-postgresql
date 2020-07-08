/*
    If the lecturecode can't be determend by findLecture.js, this wil add the lecture to a seperate table for uncategorized lectures
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addUncategorized')

async function addUncategorized({audiolink, cameralink, combinedlink, course, duration, screenlink, teacher, timeOfRecording, title}, semesterId) {
    
    try {
      await db.query('BEGIN')
      const queryText = 'INSERT INTO "public"."UncategorizedLecture" (audiolink, cameralink, combinedlink, course, duration, screenlink, semesterid, teachers, timeOfRecording, title) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id'
      const res = await db.query(queryText, [audiolink, cameralink, combinedlink, course, duration, screenlink, semesterId, teacher, timeOfRecording, title])
      await db.query('COMMIT')
      debug('Response after adding', res.rows[0])
      return res.rows[0].id
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}

module.exports = { addUncategorized }