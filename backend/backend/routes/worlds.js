// backend/routes/worlds.js
const express = require('express');
const worldsController = require('../controllers/worldsController');
const router = express.Router();

// Middleware to log requests (optional)
router.use((req, res, next) => {
    console.log(`World Route: ${req.method} ${req.originalUrl}`);
    next();
});

// GET /api/worlds - Get all worlds
router.get('/', worldsController.getAllWorlds);

// POST /api/worlds - Create a new world (Requires authentication)
router.post('/', worldsController.createWorld);

// PUT /api/worlds/:id - Update a world
router.put('/:id', worldsController.updateWorld);

// DELETE /api/worlds/:id - Delete a world
router.delete('/:id', worldsController.deleteWorld);

module.exports = router;
