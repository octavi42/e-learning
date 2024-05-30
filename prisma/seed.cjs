const {PrismaClient} = require('@prisma/client')
const { users, categories, questions, answers } = require('./data.cjs')

const prisma = new PrismaClient()

const load = async () => {
    try {
        await prisma.user.createMany({
            data: users
        })
        console.log('Users created')

        await prisma.category.createMany({
            data: categories
        })
        console.log('Categories created')

        await prisma.question.createMany({
            data: questions
        })
        console.log('Questions created')

        await prisma.answer.createMany({
            data: answers
        })
        console.log('Answers created')
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

load() 