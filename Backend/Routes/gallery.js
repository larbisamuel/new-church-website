const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all gallery items
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new gallery item
router.post('/', async (req, res) => {
    const { title, description, image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO gallery (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, description, image_url]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a gallery item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE gallery SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [title, description, image_url, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a gallery item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM gallery WHERE id = $1', [id]);
        res.send('Gallery item deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
