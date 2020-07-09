async function addCourses(parent, args, context, info) {
    return await context.prisma.course.create({
        data: {
            code: args.code,
            name: args.name
        }
    })
}

async function addSemester(parent, args, context, info) {
    return await context.prisma.semester.create({
        data: {
            name: args.name
        }
    })
}

async function addTeacher(parent, args, context, info) {
    return await context.prisma.teacher.create({
        data: {
            name: args.name
        }
    })
}

async function addLecture(parent, args, context, info) {
    return await context.prisma.lecture.create({
        data: {
            duration: args.duration,
            time: args.title,
            title: args.title,
            course: { connect: { id: args.courseId } },
            semester: { connect: { id: args.semesterId } },
            teacher: { connect: { id: args.teacherId } },
        }
    })
}

module.exports = {
}