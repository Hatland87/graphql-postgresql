/*
    If the lecturecode can't be determend by findLecture.js, this wil add the lecture to a seperate table for uncategorized lectures
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addUncategorized')

async function addUncategorized({timeOfRecording, duration, teacher, title, course, audioLink, cameraLink, screenLink, combinedLink}) {
    
    try {
      await db.query('BEGIN')
      const queryText = 'INSERT INTO "public"."UncategorizedLecture" (timeOfRecording, duration, teacher, title, course, audioLink, cameraLink, screenLink, combinedLink) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id'
      const res = await db.query(queryText, [timeOfRecording, duration, teacher, title, course, audioLink, cameraLink, screenLink, combinedLink])
      await db.query('COMMIT')
      debug('Response after adding', res.rows[0])
      return res.rows[0].id
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}

module.exports = { addUncategorized }