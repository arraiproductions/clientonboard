import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Test database connection
        await prisma.$connect()

        // Try to count users
        const userCount = await prisma.user.count()

        // Find admin user
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@arrai.com' },
            select: { email: true, name: true, role: true }
        })

        return NextResponse.json({
            status: 'success',
            database: 'connected',
            userCount,
            adminExists: !!admin,
            admin: admin || 'not found',
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            code: error.code,
            timestamp: new Date().toISOString()
        }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
