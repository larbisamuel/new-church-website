const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

// Get all latest news
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM latest_news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new latest news
router.post('/', async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO latest_news (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, description, image]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a latest news item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    try {
        const result = await pool.query(
            'UPDATE latest_news SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [title, description, image, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a latest news item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM latest_news WHERE id = $1', [id]);
        res.send('News item deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router; 
