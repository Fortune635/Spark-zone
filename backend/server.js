// backend/server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Database Connection Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json()); // For parsing application/json
app.use((req, res, next) => {
    // Basic User ID Simulation (Middleware to simulate authentication)
    req.userId = req.headers['x-user-id'] || '1'; // Default to user 1 for unauthenticated testing
    next();
});

// Import Routes
const worldsRouter = require('./routes/worlds');
const generateRouter = require('./routes/generate');

// Use Routes
app.use('/api/worlds', worldsRouter);
app.use('/api/generate', generateRouter);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Spark Zone Backend is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = { pool }; // Export pool for use in controllers
