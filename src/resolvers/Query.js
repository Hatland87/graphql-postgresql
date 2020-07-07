async function courses(parent, args, context, info) {
    return await context.prisma.course.findMany()
}

async function lectures(parent, args, context, info) {
    return await context.prisma.lecture.findMany()
}

async function semesters(parent, args, context, info) {
    return await context.prisma.semester.findMany()
}

async function teachers(parent, args, context, info) {
    return await context.prisma.teacher.findMany()
}

module.exports = {
    courses,
    lectures,
    semesters,
    teachers
}