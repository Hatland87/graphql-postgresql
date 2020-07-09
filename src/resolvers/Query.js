async function semester(parent, args, context, info) {
    return await context.prisma.semester.findMany({
        where: {
            name: { contains: args.name }
        }
    })
}

async function teacher(parent, args, context, info) {
    return await context.prisma.teacher.findMany({
        where: {
            name: { contains: args.name }
        }
    })
}

async function allTeachers(parent, args, context, info) {
    return await context.prisma.teacher.findMany()
}


module.exports = {
    semester,
    teacher,
    allTeachers
}