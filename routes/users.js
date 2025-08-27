const express = require('express');
const router = express.Router();

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Users endpoint - Database not connected',
    data: []
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'User endpoint - Database not connected',
    data: null
  });
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Create user endpoint - Database not connected'
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Update user endpoint - Database not connected'
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Delete user endpoint - Database not connected'
  });
});

module.exports = router;
