const express = require('express');
const router = express.Router();

// GET /api/achievements - Get all achievements
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Achievements endpoint - Database not connected',
    data: []
  });
});

// GET /api/achievements/:id - Get achievement by ID
router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Achievement endpoint - Database not connected',
    data: null
  });
});

// POST /api/achievements - Create new achievement
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Create achievement endpoint - Database not connected'
  });
});

// PUT /api/achievements/:id - Update achievement
router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Update achievement endpoint - Database not connected'
  });
});

// DELETE /api/achievements/:id - Delete achievement
router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Delete achievement endpoint - Database not connected'
  });
});

module.exports = router;
