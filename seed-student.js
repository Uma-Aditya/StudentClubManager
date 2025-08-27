const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { promisePool } = require('./config/database');

const createStudentUser = async () => {
  try {
    // Check if student already exists
    const [existingStudents] = await promisePool.execute(
      'SELECT id FROM users WHERE email = "student@test.com" LIMIT 1'
    );

    if (existingStudents.length > 0) {
      console.log('✅ Student user already exists');
      return;
    }

    // Create student user
    const studentId = uuidv4();
    const hashedPassword = await bcrypt.hash('student123', 10);

    await promisePool.execute(
      `INSERT INTO users (id, email, password, firstName, lastName, role, department, academicYear, isActive, isVerified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [studentId, 'student@test.com', hashedPassword, 'John', 'Student', 'member', 'Computer Science', 3, true, true]
    );

    // Create user settings
    await promisePool.execute(
      `INSERT INTO user_settings (id, userId) VALUES (?, ?)`,
      [uuidv4(), studentId]
    );

    console.log('✅ Student user created successfully');
    console.log('📧 Email: student@test.com');
    console.log('🔑 Password: student123');
    console.log('👤 Role: member');

  } catch (error) {
    console.error('❌ Error creating student user:', error.message);
  }
};

// Run the seed function
createStudentUser().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
