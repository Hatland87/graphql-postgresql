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

async function allLectures(parent, args, context, info) {
    return await context.prisma.lecture.findMany()
}

async function lecture(parent, args, context, info) {
    return await context.prisma.lecture.findMany()
}

async function allSemesters(parent, args, context, info) {
    return await context.prisma.semester.findMany()
}

async function semester(parent, args, context, info) {
    return await context.prisma.semester.findMany({
        where: {
            name: { contains: args.name }
        }
    })
}

async function allTeachers(parent, args, context, info) {
    return await context.prisma.teacher.findMany()
}

async function teacher(parent, args, context, info) {
    return await context.prisma.teacher.findMany({
        where: {
            name: { contains: args.name }
        }
    })
}

module.exports = {
    allCourses,
    course,
    allLectures,
    lecture,
    allSemesters,
    semester,
    allTeachers,
    teacher,
}