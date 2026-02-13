import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetPassword() {
    console.log('🔄 Resetting admin password...')

    // Generate a fresh hash for "admin123"
    const newHash = await bcrypt.hash('admin123', 10)

    console.log('Generated hash:', newHash)

    const updated = await prisma.user.update({
        where: { email: 'admin@arrai.com' },
        data: {
            password: newHash
        }
    })

    console.log('✅ Password updated!')
    console.log('Email:', updated.email)
    console.log('\nYou can now login with:')
    console.log('Email: admin@arrai.com')
    console.log('Password: admin123')

    await prisma.$disconnect()
}

resetPassword()
