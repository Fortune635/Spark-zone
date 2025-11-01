// backend/controllers/worldsController.js
const { pool } = require('../server');
// Note: You'd implement validation (e.g., Joi) here

exports.getAllWorlds = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM worlds ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching worlds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createWorld = async (req, res) => {
    const { name, description, image_url } = req.body;
    // req.userId is available from middleware
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    try {
        const queryText = 'INSERT INTO worlds (name, description, image_url) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(queryText, [name, description, image_url]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating world:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ... updateWorld and deleteWorld functions would follow a similar pattern
