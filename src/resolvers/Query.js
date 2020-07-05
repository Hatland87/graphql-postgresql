async function books(parent, args, context, info) {
    return await context.prisma.book.findMany()
}

async function authors(parent, args, context, info) {
    return await context.prisma.author.findMany()
}

module.exports = {
    books,
    authors
}