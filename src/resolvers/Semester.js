function lectures (parent, args, context) {
  return context.prisma.lecture.findMany({ where: { id: parent.semesterid }})
}

module.exports = {
  lectures,
}