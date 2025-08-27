const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_clubs_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4',
  timezone: '+00:00'
});

// Create promise wrapper
const promisePool = pool.promise();

// Test connection
const testConnection = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT 1 as test');
    console.log('✅ Database connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Users table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        avatar VARCHAR(500),
        role ENUM('admin', 'club_leader', 'club_vice_leader', 'member', 'guest') DEFAULT 'member',
        department VARCHAR(100),
        academicYear INT,
        phone VARCHAR(20),
        bio TEXT,
        interests JSON,
        isActive BOOLEAN DEFAULT true,
        isVerified BOOLEAN DEFAULT false,
        lastLoginAt TIMESTAMP NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role),
        INDEX idx_department (department)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Clubs table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS clubs (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category ENUM('academic', 'cultural', 'sports', 'technology', 'arts', 'business', 'environmental', 'political', 'religious', 'other') NOT NULL,
        status ENUM('active', 'pending', 'suspended', 'archived') DEFAULT 'pending',
        logo VARCHAR(500),
        coverImage VARCHAR(500),
        leaderId VARCHAR(36) NOT NULL,
        viceLeaderId VARCHAR(36),
        memberCount INT DEFAULT 0,
        maxMembers INT,
        meetingFrequency ENUM('daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semesterly', 'yearly', 'on_demand') DEFAULT 'weekly',
        meetingLocation VARCHAR(255),
        meetingTime VARCHAR(100),
        tags JSON,
        socialLinks JSON,
        isPublic BOOLEAN DEFAULT true,
        joiningRequirements JSON,
        annualFee DECIMAL(10,2),
        contactEmail VARCHAR(255),
        contactPhone VARCHAR(20),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (leaderId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (viceLeaderId) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_leader (leaderId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Memberships table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS memberships (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        clubId VARCHAR(36) NOT NULL,
        role ENUM('leader', 'vice_leader', 'officer', 'committee_member', 'member') DEFAULT 'member',
        status ENUM('pending', 'approved', 'rejected', 'suspended', 'left') DEFAULT 'pending',
        joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approvedAt TIMESTAMP NULL,
        approvedBy VARCHAR(36),
        rejectedAt TIMESTAMP NULL,
        rejectedBy VARCHAR(36),
        rejectionReason TEXT,
        isActive BOOLEAN DEFAULT true,
        lastActivityAt TIMESTAMP NULL,
        contributionScore INT DEFAULT 0,
        attendanceCount INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (clubId) REFERENCES clubs(id) ON DELETE CASCADE,
        FOREIGN KEY (approvedBy) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (rejectedBy) REFERENCES users(id) ON DELETE SET NULL,
        UNIQUE KEY unique_user_club (userId, clubId),
        INDEX idx_user (userId),
        INDEX idx_club (clubId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Events table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(36) PRIMARY KEY,
        clubId VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        type ENUM('meeting', 'workshop', 'competition', 'social', 'fundraiser', 'conference', 'trip', 'other') NOT NULL,
        startDate DATETIME NOT NULL,
        endDate DATETIME NOT NULL,
        location VARCHAR(255),
        maxAttendees INT,
        currentAttendees INT DEFAULT 0,
        isPublic BOOLEAN DEFAULT true,
        isRecurring BOOLEAN DEFAULT false,
        recurrencePattern JSON,
        coverImage VARCHAR(500),
        tags JSON,
        budget DECIMAL(10,2),
        status ENUM('draft', 'published', 'cancelled', 'completed') DEFAULT 'draft',
        createdBy VARCHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (clubId) REFERENCES clubs(id) ON DELETE CASCADE,
        FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_club (clubId),
        INDEX idx_type (type),
        INDEX idx_status (status),
        INDEX idx_dates (startDate, endDate)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Event Attendance table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS event_attendance (
        id VARCHAR(36) PRIMARY KEY,
        eventId VARCHAR(36) NOT NULL,
        userId VARCHAR(36) NOT NULL,
        status ENUM('registered', 'attended', 'no_show', 'cancelled') DEFAULT 'registered',
        registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        attendedAt TIMESTAMP NULL,
        guestCount INT DEFAULT 0,
        notes TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_event_user (eventId, userId),
        INDEX idx_event (eventId),
        INDEX idx_user (userId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Announcements table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS announcements (
        id VARCHAR(36) PRIMARY KEY,
        clubId VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        type ENUM('general', 'event', 'important', 'urgent', 'news') DEFAULT 'general',
        priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
        isPublished BOOLEAN DEFAULT false,
        publishedAt TIMESTAMP NULL,
        expiresAt TIMESTAMP NULL,
        createdBy VARCHAR(36) NOT NULL,
        readBy JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (clubId) REFERENCES clubs(id) ON DELETE CASCADE,
        FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_club (clubId),
        INDEX idx_type (type),
        INDEX idx_priority (priority),
        INDEX idx_published (isPublished)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Achievements table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category ENUM('participation', 'leadership', 'creativity', 'service', 'excellence', 'milestone') NOT NULL,
        points INT DEFAULT 0,
        icon VARCHAR(500),
        rarity ENUM('common', 'uncommon', 'rare', 'epic', 'legendary') DEFAULT 'common',
        requirements JSON,
        isActive BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_rarity (rarity),
        INDEX idx_active (isActive)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // User Achievements table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        achievementId VARCHAR(36) NOT NULL,
        earnedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress INT DEFAULT 0,
        isCompleted BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (achievementId) REFERENCES achievements(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_achievement (userId, achievementId),
        INDEX idx_user (userId),
        INDEX idx_achievement (achievementId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Notifications table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        type ENUM('membership_approved', 'membership_rejected', 'event_reminder', 'event_cancelled', 'announcement', 'achievement_earned', 'system_update') NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        data JSON,
        isRead BOOLEAN DEFAULT false,
        readAt TIMESTAMP NULL,
        expiresAt TIMESTAMP NULL,
        actionUrl VARCHAR(500),
        priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user (userId),
        INDEX idx_type (type),
        INDEX idx_read (isRead),
        INDEX idx_priority (priority)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // User Settings table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        theme ENUM('light', 'dark', 'system') DEFAULT 'system',
        language VARCHAR(10) DEFAULT 'en',
        timezone VARCHAR(50) DEFAULT 'UTC',
        emailNotifications BOOLEAN DEFAULT true,
        pushNotifications BOOLEAN DEFAULT true,
        smsNotifications BOOLEAN DEFAULT false,
        privacyLevel ENUM('public', 'club_members', 'private') DEFAULT 'club_members',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_settings (userId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database tables:', error.message);
  }
};

// Export both pool and promise pool
module.exports = {
  pool,
  promisePool,
  testConnection,
  initializeDatabase
};

// Initialize database on module load
if (require.main === module) {
  initializeDatabase();
}
