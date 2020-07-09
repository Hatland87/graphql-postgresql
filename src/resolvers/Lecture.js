function course (parent, args, context) {
  return context.prisma.course.findOne({ where: { courseid: parent.id }})
}

function teacher (parent, args, context) {
  return context.prisma.teacher.findOne({ where: { id: parent.id }})
}

function semester (parent, args, context) {
  return context.prisma.semester.findOne({ where: { id: parent.id }})
}

module.exports = {
  course,
}