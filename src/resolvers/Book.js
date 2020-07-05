function author(parent, args, context) {
  return context.prisma.author.findOne({ where: { id: parent.id }})
}

module.exports = {
  author,
}