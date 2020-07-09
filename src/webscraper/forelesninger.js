/* 
    Gets all lectures from forelesning.gjovik.ntnu.no
    Runing at regular intervall
    
    TODO:
      - send results to handlers for adding lecture to database
      - abort when an lecture is already in the database
*/ 

const { JSDOM } = require('jsdom');
const { findCourse } = require('../database/findCourse');
const { findSemester } = require('../database/findSemester');
const { findTeacher } = require('../database/findTeacher');
const { addLecture } = require('../database/addLecture');
const { addLectureToTeacher } = require('../database/addLectureToTeacher');
const { addUncategorized } = require('../database/addUncategorized');
const debug = require('debug')('server:webscraper:forelesning')

openPage(1)

function openPage(pageNumber) {
  debug('Opening page number', pageNumber)
  JSDOM.fromURL(`https://forelesning.gjovik.ntnu.no/publish/index.php?page=${pageNumber}`).then(dom => {

    grabPage(dom)

    // if there is 4 links at the top
    if (dom.window.document.getElementsByClassName('paginator')[0].getElementsByTagName('a').length <= 4) {
      openPage(pageNumber + 1)
    }
    
  });
}

async function grabPage(dom) {
  const page = dom.window.document.getElementsByClassName("lecture")
  for (row = 0; row < page.length; row++) {
    const links = page[row].getElementsByTagName('td')[5].innerHTML.split('"')
    const baseURL = 'https://forelesning.gjovik.ntnu.no/publish/'
    
    const courseObj = {
    timeOfRecording: page[row].getElementsByTagName('td')[0].innerHTML,
    duration: page[row].getElementsByTagName('td')[1].innerHTML.split(' ')[0], // remove ' min'
    teacher: page[row].getElementsByTagName('td')[2].innerHTML,
    title: page[row].getElementsByTagName('td')[3].innerHTML,
    course: page[row].getElementsByTagName('td')[4].innerHTML,
    audiolink: baseURL + links[1],
    cameralink: baseURL + links[5],
    screenlink: baseURL + links[9],
    combinedlink: baseURL + links[13]
    }

    debug('Adding element', row+1)
    const courseId = await findCourse(courseObj.course)
    const semesterId = await findSemester(courseObj.timeOfRecording)
    const teacherId = await findTeacher(courseObj.teacher)
    
    if (courseId) {
      const lectureId = await addLecture(courseObj, courseId, semesterId)
      debug('Added', courseObj)
      for (i in teacherId) {
        await addLectureToTeacher(lectureId, teacherId[i])
      }
    } else {
      addUncategorized(courseObj, semesterId)
      debug('Added to uncategorized', courseObj)
    }

  }
}