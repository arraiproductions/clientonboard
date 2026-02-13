import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@arrai.com' }
    })

    if (user) {
        console.log('✅ User found!')
        console.log('Email:', user.email)
        console.log('Password hash length:', user.password?.length)
        console.log('Password hash:', user.password)
        console.log('Role:', user.role)
    } else {
        console.log('❌ User not found')
    }

    await prisma.$disconnect()
}

checkUser()
