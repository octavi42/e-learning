const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const getData = async () => {
    try {
        prisma.answer.findMany().then((data) => {
            console.log(data)
        }
        )
    } catch (error) {
        console.error(error)
    }
}

getData().finally(() => {
    prisma.$disconnect()
})