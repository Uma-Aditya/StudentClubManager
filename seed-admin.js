const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { promisePool } = require('./config/database');

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const [existingAdmins] = await promisePool.execute(
      'SELECT id FROM users WHERE role = "admin" LIMIT 1'
    );

    if (existingAdmins.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const adminId = uuidv4();
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await promisePool.execute(
      `INSERT INTO users (id, email, password, firstName, lastName, role, department, isActive, isVerified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [adminId, 'admin@test.com', hashedPassword, 'Admin', 'User', 'admin', 'IT', true, true]
    );

    // Create user settings
    await promisePool.execute(
      `INSERT INTO user_settings (id, userId) VALUES (?, ?)`,
      [uuidv4(), adminId]
    );

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@test.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};

// Run the seed function
createAdminUser().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
