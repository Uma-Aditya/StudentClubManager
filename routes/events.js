const express = require('express');
const router = express.Router();

// GET /api/events - Get all events
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Events endpoint - Database not connected',
    data: []
  });
});

// GET /api/events/:id - Get event by ID
router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Event endpoint - Database not connected',
    data: null
  });
});

// POST /api/events - Create new event
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Create event endpoint - Database not connected'
  });
});

// PUT /api/events/:id - Update event
router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Update event endpoint - Database not connected'
  });
});

// DELETE /api/events/:id - Delete event
router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Delete event endpoint - Database not connected'
  });
});

module.exports = router;
