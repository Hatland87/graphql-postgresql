async function semester(parent, args, context, info) {
    return await context.prisma.semester.findMany({ where: { name: { contains: args.name} }})
}

async function semesters(parent, args, context, info) {
    return await context.prisma.semester.findMany()
}

async function course(parent, args, context, info) {
    return await context.prisma.course.findMany({ 
        where: { 
            code: {
                startsWith: args.code,
            }
        }
    })
}

async function courses(parent, args, context, info) {
    return await context.prisma.course.findMany()
}

async function teacher(parent, args, context, info) {
    return await context.prisma.teacher.findMany({ 
        where: { 
            name: { startsWith: args.name } 
        }
    })
}

async function teachers(parent, args, context, info) {
    return await context.prisma.teacher.findMany()
}

module.exports = {
    semester,
    semesters,
    course,
    courses,
    teacher,
    teachers
}