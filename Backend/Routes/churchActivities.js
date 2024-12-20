const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all church activities
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM church_activities ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new church activity
router.post('/', async (req, res) => {
    const { title, time } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO church_activities (title, time) VALUES ($1, $2) RETURNING *',
            [title, time]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a church activity
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, time } = req.body;
    try {
        const result = await pool.query(
            'UPDATE church_activities SET title = $1, time = $2 WHERE id = $3 RETURNING *',
            [title, time, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a church activity
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM church_activities WHERE id = $1', [id]);
        res.send('Church activity deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
