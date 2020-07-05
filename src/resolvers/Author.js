function books(parent, args, context) {
  return context.prisma.book.findMany({ where: { id: parent.id }})
}

module.exports = {
  books
}