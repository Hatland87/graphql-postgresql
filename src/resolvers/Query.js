async function allCourses(parent, args, context, info) {
    return await context.prisma.course.findMany()
}

async function course(parent, args, context, info) {
    return await context.prisma.course.findMany({
        where: {
                code: { contains: args.code },
                name: { contains: args.name },
        }
    })
}

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
    allCourses,
    course,
    semester,
    allTeachers,
    teacher,
}