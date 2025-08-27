const jwt = require('jsonwebtoken');
const { promisePool } = require('../config/database');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const [users] = await promisePool.execute(
      'SELECT id, email, firstName, lastName, role, department, academicYear, avatar, isActive FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    const user = users[0];

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Middleware to check if user has specific role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Convert single role to array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to check if user is admin
const requireAdmin = requireRole('admin');

// Middleware to check if user is club leader or admin
const requireClubLeader = requireRole(['admin', 'club_leader']);

// Middleware to check if user is club leader, vice leader, or admin
const requireClubLeadership = requireRole(['admin', 'club_leader', 'club_vice_leader']);

// Middleware to check if user owns the resource or is admin
const requireOwnership = (resourceTable, resourceIdField = 'id') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const resourceId = req.params[resourceIdField] || req.body[resourceIdField];

      if (!resourceId) {
        return res.status(400).json({
          success: false,
          message: 'Resource ID required'
        });
      }

      // Check if user owns the resource
      const [resources] = await promisePool.execute(
        `SELECT * FROM ${resourceTable} WHERE ${resourceIdField} = ? AND userId = ?`,
        [resourceId, req.user.id]
      );

      if (resources.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You do not own this resource'
        });
      }

      next();

    } catch (error) {
      console.error('Ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during ownership check'
      });
    }
  };
};

// Middleware to check if user is member of a club
const requireClubMembership = (clubIdField = 'clubId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const clubId = req.params[clubIdField] || req.body[clubIdField];

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: 'Club ID required'
        });
      }

      // Check if user is a member of the club
      const [memberships] = await promisePool.execute(
        `SELECT * FROM memberships WHERE clubId = ? AND userId = ? AND status = 'approved'`,
        [clubId, req.user.id]
      );

      if (memberships.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not a member of this club'
        });
      }

      next();

    } catch (error) {
      console.error('Club membership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during club membership check'
      });
    }
  };
};

// Middleware to check if user is leader of a specific club
const requireSpecificClubLeadership = (clubIdField = 'clubId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const clubId = req.params[clubIdField] || req.body[clubIdField];

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: 'Club ID required'
        });
      }

      // Check if user is a leader of the club
      const [clubs] = await promisePool.execute(
        `SELECT * FROM clubs WHERE id = ? AND (leaderId = ? OR viceLeaderId = ?)`,
        [clubId, req.user.id, req.user.id]
      );

      if (clubs.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not a leader of this club'
        });
      }

      next();

    } catch (error) {
      console.error('Club leadership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during club leadership check'
      });
    }
  };
};

// Middleware to check if user is the owner of a club
const requireClubOwnership = (clubIdField = 'clubId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const clubId = req.params[clubIdField] || req.body[clubIdField];

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: 'Club ID required'
        });
      }

      // Check if user is the owner of the club
      const [clubs] = await promisePool.execute(
        `SELECT * FROM clubs WHERE id = ? AND leaderId = ?`,
        [clubId, req.user.id]
      );

      if (clubs.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not the owner of this club'
        });
      }

      next();

    } catch (error) {
      console.error('Club ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during club ownership check'
      });
    }
  };
};

// Middleware to check if user is the creator of an event
const requireEventOwnership = (eventIdField = 'eventId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const eventId = req.params[eventIdField] || req.body[eventIdField];

      if (!eventId) {
        return res.status(400).json({
          success: false,
          message: 'Event ID required'
        });
      }

      // Check if user is the creator of the event
      const [events] = await promisePool.execute(
        `SELECT * FROM events WHERE id = ? AND createdBy = ?`,
        [eventId, req.user.id]
      );

      if (events.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not the creator of this event'
        });
      }

      next();

    } catch (error) {
      console.error('Event ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during event ownership check'
      });
    }
  };
};

// Middleware to check if user is the creator of an announcement
const requireAnnouncementOwnership = (announcementIdField = 'announcementId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const announcementId = req.params[announcementIdField] || req.body[announcementIdField];

      if (!announcementId) {
        return res.status(400).json({
          success: false,
          message: 'Announcement ID required'
        });
      }

      // Check if user is the creator of the announcement
      const [announcements] = await promisePool.execute(
        `SELECT * FROM announcements WHERE id = ? AND createdBy = ?`,
        [announcementId, req.user.id]
      );

      if (announcements.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You are not the creator of this announcement'
        });
      }

      next();

    } catch (error) {
      console.error('Announcement ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during announcement ownership check'
      });
    }
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireClubLeader,
  requireClubLeadership,
  requireSpecificClubLeadership,
  requireOwnership,
  requireClubMembership,
  requireClubOwnership,
  requireEventOwnership,
  requireAnnouncementOwnership
};
