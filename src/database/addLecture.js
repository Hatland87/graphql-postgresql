/*
    Takes courses from ntnu.no and adds it to the database
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addLecture')

async function addLecture({audiolink, cameralink, combinedlink, duration, screenlink, timeOfRecording, title}, courseId, semesterId) {
    
    try {
      await db.query('BEGIN')
      const queryText = 'INSERT INTO "public"."Lecture" (audiolink, cameralink, combinedlink, courseId, duration, screenlink, semesterId, timeOfRecording, title) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id'
      const res = await db.query(queryText, [audiolink, cameralink, combinedlink, courseId, duration, screenlink, semesterId, timeOfRecording, title])
      await db.query('COMMIT')
      debug('Response after adding', res.rows[0])
      return res.rows[0].id
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}

module.exports = { addLecture }