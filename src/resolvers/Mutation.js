async function addAuthor(parent, args, context, info) {
    return await context.prisma.author.create({
        data: {
            name: args.name
        }
    })
}

async function addBook(parent, args, context, info) {
    return await context.prisma.book.create({
        data: {
            title: args.title,
            author: { connect: { id: args.authorId } }
        }
    })
}

module.exports = {
    addAuthor,
    addBook
}