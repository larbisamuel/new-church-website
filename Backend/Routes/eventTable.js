const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all events
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM event_table ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new event
router.post('/', async (req, res) => {
    const { date, activity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO event_table (date, activity) VALUES ($1, $2) RETURNING *',
            [date, activity]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update an event
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { date, activity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE event_table SET date = $1, activity = $2 WHERE id = $3 RETURNING *',
            [date, activity, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM event_table WHERE id = $1', [id]);
        res.send('Event deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
