const express = require('express');
const router = express.Router();

// GET /api/notifications - Get all notifications
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Notifications endpoint - Database not connected',
    data: []
  });
});

// GET /api/notifications/:id - Get notification by ID
router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Notification endpoint - Database not connected',
    data: null
  });
});

// POST /api/notifications - Create new notification
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Create notification endpoint - Database not connected'
  });
});

// PUT /api/notifications/:id - Update notification
router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Update notification endpoint - Database not connected'
  });
});

// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Delete notification endpoint - Database not connected'
  });
});

module.exports = router;
