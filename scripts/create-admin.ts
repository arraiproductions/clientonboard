import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
})

async function main() {
    try {
        console.log('🔍 Testing database connection...')

        // Test connection
        await prisma.$connect()
        console.log('✅ Database connected!')

        console.log('🔐 Creating admin user...')
        const hashedPassword = await bcrypt.hash('admin123', 10)

        const admin = await prisma.user.upsert({
            where: { email: 'admin@arrai.com' },
            update: {
                password: hashedPassword,
                role: 'SUPER_ADMIN'
            },
            create: {
                email: 'admin@arrai.com',
                name: 'Admin User',
                password: hashedPassword,
                role: 'SUPER_ADMIN'
            }
        })

        console.log('✅ Success! Admin user created:')
        console.log('   Email:', admin.email)
        console.log('   Password: admin123')
        console.log('\n🎉 You can now login!')

    } catch (error) {
        console.error('❌ Error:', error)
        throw error
    }
}

main()
    .catch((e) => {
        console.error('Fatal error:', e.message)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
