const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all nextweekservice
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM next_week_service ORDER BY created_at DESC LIMIT 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new next_week_service
router.post('/', async (req, res) => {
    console.log(req.body);
    const { occasion_title, theme_title, preacher_title, bible_reading_1, bible_reading_2, bible_reading_3, suggested_hymns } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO next_week_service (occasion_title, theme_title, preacher_title, bible_reading_1, bible_reading_2, bible_reading_3, suggested_hymns) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [occasion_title, theme_title, preacher_title, bible_reading_1, bible_reading_2, bible_reading_3, suggested_hymns]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update an next_week_service
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { occasion_title, theme_title, preacher_title, bible_reading_1, bible_reading_2, bible_reading_3, suggested_hymns } = req.body;
    try {
        const result = await pool.query(
            'UPDATE next_week_service SET occasion_title = $1, theme_title= $2, preacher_title = $3, bible_reading_1 = $4, bible_reading_2 = $5, bible_reading_3 = $6, suggested_hymns = $7 WHERE id = $8 RETURNING *',
            [occasion_title, theme_title, preacher_title, bible_reading_1, bible_reading_2, bible_reading_3, suggested_hymns, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete an next_week_service
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM next_week_service WHERE id = $1', [id]);
        res.send('next_week_service deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
