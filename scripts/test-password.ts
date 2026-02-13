import bcrypt from 'bcryptjs'

// Hash from the database (visible in Prisma Studio)
const hashFromDB = '$2a$10$kHvjKIBnRdDr7DiM/nQHeNa...' // Replace with full hash if visible

// Test password
const testPassword = 'admin123'

async function verifyPassword() {
    console.log('Testing if hash matches password "admin123"...')

    // If we can't see the full hash, let's just create a new one
    console.log('\nGenerating new hash for "admin123":')
    const newHash = await bcrypt.hash('admin123', 10)
    console.log('New hash:', newHash)

    const isValid = await bcrypt.compare('admin123', newHash)
    console.log('Does it match "admin123"?', isValid)
}

verifyPassword()
