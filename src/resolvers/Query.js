async function teacher(parent, args, context, info) {
    return await context.prisma.teacher.findMany({
        where: {
            name: {
                contains: args.name
            }
        }
    })
}

async function teachers(parent, args, context, info) {
    return await context.prisma.teacher.findMany()
}

module.exports = {
    teacher,
    teachers
}