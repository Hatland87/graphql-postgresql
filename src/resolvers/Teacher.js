function lectures (parent, args, context) {
  return context.prisma.lecture.findMany({ 
    where: {
      teacher: {
        every: {
          id: parent.id
        }
      }
    }
  })
}

module.exports = {
  lectures
}