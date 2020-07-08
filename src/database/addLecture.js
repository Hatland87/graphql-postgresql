/*
    Takes courses from ntnu.no and adds it to the database
*/

const db = require('../database/dbConnect')
const debug = require('debug')('server:database:addLecture')

async function addLecture({timeOfRecording, duration, title, audioLink, cameraLink, screenLink, combinedLink}) {
    
    try {
      await db.query('BEGIN')
      const queryText = 'INSERT INTO "public"."Lecture" (timeOfRecording, duration, title, audioLink, cameraLink, screenLink, combinedLink) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id'
      const res = await db.query(queryText, [timeOfRecording, duration, title, audioLink, cameraLink, screenLink, combinedLink])
      await db.query('COMMIT')
      debug('Response after adding', res.rows[0])
      return res.rows[0].id
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
}

module.exports = { addLecture }