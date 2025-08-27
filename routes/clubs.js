const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, query } = require('express-validator');
const { promisePool } = require('../config/database');
const { 
  authenticateToken, 
  requireAdmin, 
  requireClubLeader, 
  requireClubOwnership 
} = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/clubs
// @desc    Get all clubs with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['academic', 'cultural', 'sports', 'technology', 'arts', 'business', 'environmental', 'political', 'religious', 'other']).withMessage('Invalid category'),
  query('status').optional().isIn(['active', 'pending', 'suspended', 'archived']).withMessage('Invalid status'),
  query('search').optional().trim().isLength({ max: 100 }).withMessage('Search term too long'),
  query('tags').optional().isArray().withMessage('Tags must be an array'),
  query('maxMembers').optional().isInt({ min: 1 }).withMessage('Max members must be a positive integer'),
  query('meetingFrequency').optional().isIn(['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semesterly', 'yearly', 'on_demand']).withMessage('Invalid meeting frequency')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      category,
      status,
      search,
      tags,
      maxMembers,
      meetingFrequency
    } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    let params = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (tags && tags.length > 0) {
      whereClause += ' AND JSON_OVERLAPS(tags, ?)';
      params.push(JSON.stringify(tags));
    }

    if (maxMembers) {
      whereClause += ' AND maxMembers <= ?';
      params.push(maxMembers);
    }

    if (meetingFrequency) {
      whereClause += ' AND meetingFrequency = ?';
      params.push(meetingFrequency);
    }

    // Get total count
    const [countResult] = await promisePool.execute(
      `SELECT COUNT(*) as total FROM clubs ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get clubs with pagination
    const [clubs] = await promisePool.execute(
      `SELECT 
        c.*,
        u.firstName as leaderFirstName,
        u.lastName as leaderLastName,
        u.avatar as leaderAvatar,
        COUNT(m.id) as memberCount
       FROM clubs c
       LEFT JOIN users u ON c.leaderId = u.id
       LEFT JOIN memberships m ON c.id = m.clubId AND m.status = 'approved'
       ${whereClause}
       GROUP BY c.id
       ORDER BY c.createdAt DESC
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      success: true,
      data: clubs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    });

  } catch (error) {
    console.error('Get clubs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching clubs'
    });
  }
});

// @route   GET /api/clubs/:id
// @desc    Get club by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [clubs] = await promisePool.execute(
      `SELECT 
        c.*,
        u.firstName as leaderFirstName,
        u.lastName as leaderLastName,
        u.avatar as leaderAvatar,
        u.email as leaderEmail,
        u.phone as leaderPhone,
        COUNT(m.id) as memberCount
       FROM clubs c
       LEFT JOIN users u ON c.leaderId = u.id
       LEFT JOIN memberships m ON c.id = m.clubId AND m.status = 'approved'
       WHERE c.id = ?
       GROUP BY c.id`,
      [id]
    );

    if (clubs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    const club = clubs[0];

    // Get club members
    const [members] = await promisePool.execute(
      `SELECT 
        m.*,
        u.firstName,
        u.lastName,
        u.avatar,
        u.department,
        u.academicYear
       FROM memberships m
       JOIN users u ON m.userId = u.id
       WHERE m.clubId = ? AND m.status = 'approved'
       ORDER BY m.role DESC, m.joinedAt ASC`,
      [id]
    );

    // Get recent events
    const [events] = await promisePool.execute(
      `SELECT * FROM events 
       WHERE clubId = ? AND status = 'published' AND startDate >= NOW()
       ORDER BY startDate ASC
       LIMIT 5`,
      [id]
    );

    // Get recent announcements
    const [announcements] = await promisePool.execute(
      `SELECT * FROM announcements 
       WHERE clubId = ? AND isPublished = true
       ORDER BY createdAt DESC
       LIMIT 5`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...club,
        members,
        events,
        announcements
      }
    });

  } catch (error) {
    console.error('Get club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching club'
    });
  }
});

// @route   POST /api/clubs
// @desc    Create a new club
// @access  Private (Club leaders and admins)
router.post('/', [
  authenticateToken,
  requireClubLeader,
  body('name').trim().isLength({ min: 3, max: 255 }).withMessage('Club name must be between 3 and 255 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').isIn(['academic', 'cultural', 'sports', 'technology', 'arts', 'business', 'environmental', 'political', 'religious', 'other']).withMessage('Invalid category'),
  body('meetingFrequency').isIn(['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semesterly', 'yearly', 'on_demand']).withMessage('Invalid meeting frequency'),
  body('meetingLocation').optional().trim().isLength({ max: 255 }).withMessage('Meeting location too long'),
  body('meetingTime').optional().trim().isLength({ max: 100 }).withMessage('Meeting time too long'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean'),
  body('joiningRequirements').optional().isArray().withMessage('Joining requirements must be an array'),
  body('annualFee').optional().isFloat({ min: 0 }).withMessage('Annual fee must be a positive number'),
  body('contactEmail').optional().isEmail().withMessage('Invalid contact email'),
  body('contactPhone').optional().trim().isLength({ max: 20 }).withMessage('Contact phone too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      description,
      category,
      meetingFrequency,
      meetingLocation,
      meetingTime,
      tags = [],
      socialLinks = {},
      isPublic = true,
      joiningRequirements = [],
      annualFee,
      contactEmail,
      contactPhone
    } = req.body;

    const clubId = uuidv4();

    // Insert new club
    const [result] = await promisePool.execute(
      `INSERT INTO clubs (
        id, name, description, category, meetingFrequency, meetingLocation, 
        meetingTime, tags, socialLinks, isPublic, joiningRequirements, 
        annualFee, contactEmail, contactPhone, leaderId, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        clubId, name, description, category, meetingFrequency, meetingLocation,
        meetingTime, JSON.stringify(tags), JSON.stringify(socialLinks), isPublic,
        JSON.stringify(joiningRequirements), annualFee, contactEmail, contactPhone,
        req.user.id, 'pending'
      ]
    );

    // Get the created club
    const [clubs] = await promisePool.execute(
      'SELECT * FROM clubs WHERE id = ?',
      [clubId]
    );

    res.status(201).json({
      success: true,
      message: 'Club created successfully',
      data: clubs[0]
    });

  } catch (error) {
    console.error('Create club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating club'
    });
  }
});

// @route   PUT /api/clubs/:id
// @desc    Update club
// @access  Private (Club owner or admin)
router.put('/:id', [
  authenticateToken,
  requireClubOwnership('id'),
  body('name').optional().trim().isLength({ min: 3, max: 255 }).withMessage('Club name must be between 3 and 255 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').optional().isIn(['academic', 'cultural', 'sports', 'technology', 'arts', 'business', 'environmental', 'political', 'religious', 'other']).withMessage('Invalid category'),
  body('meetingFrequency').optional().isIn(['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semesterly', 'yearly', 'on_demand']).withMessage('Invalid meeting frequency'),
  body('meetingLocation').optional().trim().isLength({ max: 255 }).withMessage('Meeting location too long'),
  body('meetingTime').optional().trim().isLength({ max: 100 }).withMessage('Meeting time too long'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean'),
  body('joiningRequirements').optional().isArray().withMessage('Joining requirements must be an array'),
  body('annualFee').optional().isFloat({ min: 0 }).withMessage('Annual fee must be a positive number'),
  body('contactEmail').optional().isEmail().withMessage('Invalid contact email'),
  body('contactPhone').optional().trim().isLength({ max: 20 }).withMessage('Contact phone too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updateFields = req.body;

    // Remove fields that shouldn't be updated
    delete updateFields.id;
    delete updateFields.leaderId;
    delete updateFields.status;
    delete updateFields.createdAt;
    delete updateFields.updatedAt;

    // Convert arrays and objects to JSON strings
    if (updateFields.tags) {
      updateFields.tags = JSON.stringify(updateFields.tags);
    }
    if (updateFields.socialLinks) {
      updateFields.socialLinks = JSON.stringify(updateFields.socialLinks);
    }
    if (updateFields.joiningRequirements) {
      updateFields.joiningRequirements = JSON.stringify(updateFields.joiningRequirements);
    }

    // Build UPDATE query
    const setClause = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateFields);

    if (setClause.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    // Update club
    await promisePool.execute(
      `UPDATE clubs SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id]
    );

    // Get updated club
    const [clubs] = await promisePool.execute(
      'SELECT * FROM clubs WHERE id = ?',
      [id]
    );

    if (clubs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    res.json({
      success: true,
      message: 'Club updated successfully',
      data: clubs[0]
    });

  } catch (error) {
    console.error('Update club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating club'
    });
  }
});

// @route   DELETE /api/clubs/:id
// @desc    Delete club
// @access  Private (Club owner or admin)
router.delete('/:id', [
  authenticateToken,
  requireClubOwnership('id')
], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if club has members
    const [memberships] = await promisePool.execute(
      'SELECT COUNT(*) as count FROM memberships WHERE clubId = ?',
      [id]
    );

    if (memberships[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete club with active members. Please transfer ownership or remove all members first.'
      });
    }

    // Delete club
    await promisePool.execute(
      'DELETE FROM clubs WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Club deleted successfully'
    });

  } catch (error) {
    console.error('Delete club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting club'
    });
  }
});

// @route   PUT /api/clubs/:id/status
// @desc    Update club status (admin only)
// @access  Private (Admin only)
router.put('/:id/status', [
  authenticateToken,
  requireAdmin,
  body('status').isIn(['active', 'pending', 'suspended', 'archived']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Update club status
    await promisePool.execute(
      'UPDATE clubs SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    res.json({
      success: true,
      message: `Club status updated to ${status}`
    });

  } catch (error) {
    console.error('Update club status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating club status'
    });
  }
});

// @route   GET /api/clubs/:id/members
// @desc    Get club members
// @access  Private
router.get('/:id/members', [
  authenticateToken
], async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20, role, status = 'approved' } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE clause
    let whereClause = 'WHERE m.clubId = ?';
    let params = [id];

    if (role) {
      whereClause += ' AND m.role = ?';
      params.push(role);
    }

    if (status) {
      whereClause += ' AND m.status = ?';
      params.push(status);
    }

    // Get total count
    const [countResult] = await promisePool.execute(
      `SELECT COUNT(*) as total FROM memberships m ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get members with pagination
    const [members] = await promisePool.execute(
      `SELECT 
        m.*,
        u.firstName,
        u.lastName,
        u.avatar,
        u.department,
        u.academicYear,
        u.email
       FROM memberships m
       JOIN users u ON m.userId = u.id
       ${whereClause}
       ORDER BY m.role DESC, m.joinedAt ASC
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      success: true,
      data: members,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    });

  } catch (error) {
    console.error('Get club members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching club members'
    });
  }
});

module.exports = router;
