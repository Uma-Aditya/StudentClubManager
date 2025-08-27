const express = require('express');
const router = express.Router();

// GET /api/announcements - Get all announcements
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Announcements endpoint - Database not connected',
    data: []
  });
});

// GET /api/announcements/:id - Get announcement by ID
router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Announcement endpoint - Database not connected',
    data: null
  });
});

// POST /api/announcements - Create new announcement
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Create announcement endpoint - Database not connected'
  });
});

// PUT /api/announcements/:id - Update announcement
router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Update announcement endpoint - Database not connected'
  });
});

// DELETE /api/announcements/:id - Delete announcement
router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Delete announcement endpoint - Database not connected'
  });
});

module.exports = router;
