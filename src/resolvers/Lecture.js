function course (parent, args, context) {
  return context.prisma.course.findOne({ where: { id: parent.courseid }})
}

function teacher (parent, args, context) {
  return context.prisma.teacher.findMany({ 
    where: { 
      course: {
        every: {
          id: parent.id 
        }
      }
    }
  })
}

function semester (parent, args, context) {
  return context.prisma.semester.findOne({ where: { semesterid: parent.id }})
}

module.exports = {
  course,
  teacher,
  semester,
}